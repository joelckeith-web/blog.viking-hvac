/**
 * Agent verification layer — the second gate, for what a regex can't judge.
 *
 * Runs AFTER the deterministic gate passes. A separate, cheap model reads the
 * draft against viking-truth.json and the actual weather payload and rejects
 * anything that contradicts the truth file, asserts unsupported specifics, or
 * tells a weather story the payload doesn't support (e.g. "after yesterday's
 * dust storm" when historical.hadSevereWeather is false).
 *
 * Verdict is forced through a tool call so the output is machine-readable —
 * no parsing, no "the model said it looked fine".
 */

import Anthropic from "@anthropic-ai/sdk";
import type { GeneratedBlog, WeatherContext } from "./types";
import truth from "./viking-truth.json";

const VERIFY_MODEL = process.env.VERIFY_MODEL || "claude-haiku-4-5";

export interface VerifyViolation {
  rule: string;
  excerpt: string;
  reason: string;
}

export interface VerifyVerdict {
  pass: boolean;
  violations: VerifyViolation[];
}

export class ContentVerifyError extends Error {
  violations: VerifyViolation[];
  constructor(violations: VerifyViolation[]) {
    super(
      `Verification agent BLOCKED publish — ${violations.length} violation(s):\n` +
        violations
          .map((v) => `  [${v.rule}] "${v.excerpt}" — ${v.reason}`)
          .join("\n")
    );
    this.name = "ContentVerifyError";
    this.violations = violations;
  }
}

export async function verifyContent(
  blog: GeneratedBlog,
  context: WeatherContext
): Promise<VerifyVerdict> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const response = await client.messages.create({
    model: VERIFY_MODEL,
    max_tokens: 2000,
    temperature: 0,
    tools: [
      {
        name: "submit_verdict",
        description: "Submit the fact-safety verdict for the draft post.",
        input_schema: {
          type: "object" as const,
          required: ["pass", "violations"],
          properties: {
            pass: {
              type: "boolean",
              description: "true ONLY if the draft contains no unverifiable or contradicted claims",
            },
            violations: {
              type: "array",
              items: {
                type: "object",
                required: ["rule", "excerpt", "reason"],
                properties: {
                  rule: {
                    type: "string",
                    enum: [
                      "contradicts-truth",
                      "unsupported-specific",
                      "weather-mismatch",
                      "implied-customer-story",
                      "banned-topic",
                      "other",
                    ],
                  },
                  excerpt: { type: "string", description: "Verbatim quote from the draft (≤200 chars)" },
                  reason: { type: "string" },
                },
              },
            },
          },
        },
      },
    ],
    tool_choice: { type: "tool", name: "submit_verdict" },
    system: `You are the fact-safety verifier for an auto-generated HVAC blog. This account has already had a real incident: the generator invented utility rebate details and the utility phoned the client. Your ONLY job is to catch unverifiable or contradicted claims. Marketing tone, qualitative statements ("significant savings", "most systems"), and how-to guidance are all FINE. Specific claims that cannot be traced to the truth file or the weather payload are NOT.

REJECT (pass=false) if the draft:
1. Contradicts the truth file in any way (company name, founding year, owners, license, city, service list).
2. Asserts a specific factual claim — number, program, credential, guarantee — not present in the truth file's identity/allowedVerbatim or in the weather payload.
3. Tells a weather story the payload does not support (claims an event occurred when historical data shows none; cites temperatures/dates not in the payload).
4. Implies real customer engagements or outcomes ("we recently helped...", "a Chandler homeowner we served...").
5. Mentions utility companies, rebates, tax credits, prices, or financing terms.

Judge only what is IN the draft. Do not reject for style, length, repetition, or SEO quality.`,
    messages: [
      {
        role: "user",
        content: `TRUTH FILE (the only permitted company facts):
${JSON.stringify(truth, null, 1)}

WEATHER PAYLOAD (the only permitted weather facts):
${JSON.stringify(
  {
    mode: context.mode,
    weekLabel: context.weekLabel,
    dominantHazard: context.dominantHazard,
    historical: context.historical,
    forecastSummary: context.forecast.summary,
    periods: context.forecast.periods,
    alerts: context.forecast.alerts,
  },
  null,
  1
)}

DRAFT POST (frontmatter + body):
${blog.markdownContent}

Submit your verdict.`,
      },
    ],
  });

  const toolUse = response.content.find((b) => b.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    // Fail CLOSED: no verdict = no publish.
    return {
      pass: false,
      violations: [
        {
          rule: "other",
          excerpt: "(no verdict returned)",
          reason: "Verifier did not return a structured verdict — failing closed.",
        },
      ],
    };
  }

  return toolUse.input as VerifyVerdict;
}
