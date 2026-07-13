/**
 * Deterministic content gate — runs on every generated post BEFORE it is
 * saved or pushed. A regex cannot be argued out of its opinion.
 *
 * Why this exists: the system prompt has said "Do NOT fabricate statistics"
 * since day one (content-generator.ts) and the generator invented APS rebate
 * tables, fake prices, and misattributed statistics anyway. An SRP Senior
 * Program Manager phoned the client about it in July 2026. Prompt-level
 * guardrails are advisory; this gate is enforcement.
 *
 * Every rule maps to a verified fabrication class from the 2026-07-13 audit.
 * On violation the post is NOT published — the run fails loudly and the
 * rejected draft is preserved for human review.
 */

import type { GeneratedBlog, WeatherContext } from "./types";
import truth from "./viking-truth.json";
import { siteConfig } from "./site-config";

export interface GateViolation {
  rule: string;
  excerpt: string;
  detail: string;
}

export class ContentGateError extends Error {
  violations: GateViolation[];
  constructor(violations: GateViolation[]) {
    super(
      `Content gate BLOCKED publish — ${violations.length} violation(s):\n` +
        violations
          .map((v) => `  [${v.rule}] "${v.excerpt}" — ${v.detail}`)
          .join("\n")
    );
    this.name = "ContentGateError";
    this.violations = violations;
  }
}

/** Numbers the post is allowed to use in weather claims: everything present
 *  in the actual weather payload, plus the config thresholds the trigger
 *  itself asserts (e.g. the 105°F extreme-heat threshold). */
function collectAllowedNumbers(context: WeatherContext): Set<string> {
  const allowed = new Set<string>();
  const payload = JSON.stringify(context);
  for (const m of payload.matchAll(/\d+(?:\.\d+)?/g)) allowed.add(m[0]);
  for (const entry of Object.values(siteConfig.weatherServiceMap)) {
    const threshold = (entry as { threshold?: number }).threshold;
    if (threshold !== undefined) allowed.add(String(threshold));
  }
  return allowed;
}

/** Allowed internal-link URL pool (normalized) — the generator prompt says
 *  "ONLY these URLs"; this enforces it so link rot can't be minted. */
function collectAllowedUrls(): Set<string> {
  const urls: string[] = [];
  for (const s of siteConfig.services) {
    urls.push(s.url);
    for (const sub of s.subpages) urls.push(sub.url);
  }
  for (const l of siteConfig.locationPages.residential) urls.push(l.url);
  for (const l of siteConfig.locationPages.commercial) urls.push(l.url);
  for (const u of Object.values(siteConfig.keyPages)) urls.push(u);
  urls.push(siteConfig.mainSiteUrl, siteConfig.blogUrl);
  return new Set(urls.map(normalizeUrl));
}

function normalizeUrl(u: string): string {
  return u
    .trim()
    .replace(/^http:\/\//, "https://")
    .replace(/^https:\/\/www\./, "https://")
    .replace(/\/+$/, "")
    .toLowerCase();
}

function paragraphContaining(content: string, index: number): string {
  const start = content.lastIndexOf("\n\n", index);
  const end = content.indexOf("\n\n", index);
  return content.slice(start === -1 ? 0 : start, end === -1 ? content.length : end);
}

function excerptAt(content: string, index: number, len: number): string {
  const from = Math.max(0, index - 30);
  return content.slice(from, index + len + 30).replace(/\s+/g, " ").trim();
}

export function runContentGate(
  blog: GeneratedBlog,
  context: WeatherContext
): GateViolation[] {
  const content = blog.markdownContent; // includes frontmatter + FAQ answers
  const violations: GateViolation[] = [];
  const allowedVerbatim = truth.allowedVerbatim.map((s) => s.toLowerCase());

  // ── 1. Dollar amounts — banned outright (fabricated-pricing class, F1/F5-F10/F14)
  for (const m of content.matchAll(/\$\s?\d[\d,]*(?:\.\d+)?/g)) {
    violations.push({
      rule: "currency",
      excerpt: excerptAt(content, m.index!, m[0].length),
      detail:
        "Dollar figures are banned on generated posts. Viking's price book is not available here; nothing may be quoted.",
    });
  }

  // ── 2. Percentages — banned unless the figure is inside an allowedVerbatim claim
  for (const m of content.matchAll(/\d+(?:\.\d+)?(?:\s*[-–]\s*\d+(?:\.\d+)?)?\s*%/g)) {
    const token = m[0].replace(/\s+/g, "").toLowerCase();
    const ok = allowedVerbatim.some((a) => a.replace(/\s+/g, "").includes(token));
    if (!ok) {
      violations.push({
        rule: "percent",
        excerpt: excerptAt(content, m.index!, m[0].length),
        detail:
          "Percentage/statistic not in viking-truth.json allowedVerbatim (fabricated-statistic class, e.g. the misattributed Energy Star 20-30% claim).",
      });
    }
  }

  // ── 3. Incentive/utility program terms — banned (the SRP-incident class)
  const programTerms =
    /\b(rebates?|tax credits?|incentives?|cool cash|section 179d?|25c|inflation reduction act|bonus depreciation)\b/gi;
  for (const m of content.matchAll(programTerms)) {
    violations.push({
      rule: "program-terms",
      excerpt: excerptAt(content, m.index!, m[0].length),
      detail:
        "Incentive/program content is banned on the blog; the main site's incentives page is the only permitted surface (truth.bannedTopics.incentives).",
    });
  }
  for (const m of content.matchAll(/\b(SRP|APS)\b/g)) {
    violations.push({
      rule: "utility-name",
      excerpt: excerptAt(content, m.index!, m[0].length),
      detail: "Utility names are banned in generated content (truth.bannedTopics.utilities).",
    });
  }

  // ── 4. Attribution without a source link (fabricated-attribution class, F13/F15)
  const attribution =
    /(according to|studies show|research (?:shows|indicates)|industry (?:data|studies|research)|experts (?:say|recommend|agree))/gi;
  for (const m of content.matchAll(attribution)) {
    const para = paragraphContaining(content, m.index!);
    if (!/https?:\/\//.test(para)) {
      violations.push({
        rule: "unsourced-attribution",
        excerpt: excerptAt(content, m.index!, m[0].length),
        detail: "Attribution phrase with no source URL in the same paragraph.",
      });
    }
  }

  // ── 5. Customer stories (fabricated-case-study class, F11/F12)
  const stories = [
    /\b(?:we|our team)\s+(?:recently\s+)?(?:worked with|helped)\s+(?:a|an|one)\b/gi,
    /\bone of our (?:customers|clients|homeowners)\b/gi,
    /\b(?:thousands|hundreds) of (?:homeowners|customers|clients)\b/gi,
    /\bcase stud(?:y|ies)\b/gi,
  ];
  for (const re of stories) {
    for (const m of content.matchAll(re)) {
      violations.push({
        rule: "customer-story",
        excerpt: excerptAt(content, m.index!, m[0].length),
        detail: "Customer stories/case studies are banned — none can be verified from this repo.",
      });
    }
  }

  // ── 6. Credential figures (unverified-credential class: review counts, experience years)
  for (const m of content.matchAll(/\b\d+\+?\s*(?:5-star\s+)?reviews?\b/gi)) {
    violations.push({
      rule: "credential-reviews",
      excerpt: excerptAt(content, m.index!, m[0].length),
      detail: "Review-count claims are pendingVerification in viking-truth.json — banned until verified.",
    });
  }
  for (const m of content.matchAll(/\b\d+\+?\s*years?(?:\s+of)?(?:\s+combined)?\s+experience\b/gi)) {
    violations.push({
      rule: "credential-experience",
      excerpt: excerptAt(content, m.index!, m[0].length),
      detail: "Years-of-experience claims are pendingVerification — banned until verified.",
    });
  }
  for (const m of content.matchAll(/\bsince\s+(\d{4})\b/gi)) {
    if (Number(m[1]) !== truth.identity.foundedYear) {
      violations.push({
        rule: "credential-founded",
        excerpt: excerptAt(content, m.index!, m[0].length),
        detail: `"since ${m[1]}" contradicts verified foundedYear ${truth.identity.foundedYear}.`,
      });
    }
  }

  // ── 7. Weather numbers must exist in the actual weather payload
  const allowedNumbers = collectAllowedNumbers(context);
  const weatherPatterns: Array<[RegExp, string]> = [
    [/(\d{2,3})\s*(?:°|degrees)/g, "temperature"],
    [/(\d{2,3})\s*mph\b/gi, "wind speed"],
    [/(\d+(?:\.\d+)?)\s*inch(?:es)?\b/gi, "precipitation"],
  ];
  for (const [re, kind] of weatherPatterns) {
    for (const m of content.matchAll(re)) {
      if (!allowedNumbers.has(m[1])) {
        violations.push({
          rule: "weather-number",
          excerpt: excerptAt(content, m.index!, m[0].length),
          detail: `${kind} "${m[1]}" does not appear in the fetched NWS weather payload — unverifiable.`,
        });
      }
    }
  }

  // ── 8. Generator scaffolding leaking into content (F17 class)
  const scaffolding =
    /===\w+===|\[Full FAQ content|\[Write a \d+|LINKS FOUND IN CONTENT|already AEO-formatted/g;
  for (const m of content.matchAll(scaffolding)) {
    violations.push({
      rule: "scaffolding",
      excerpt: excerptAt(content, m.index!, m[0].length),
      detail: "Generator scaffolding/template text leaked into the post body.",
    });
  }

  // ── 9. Internal links must come from the curated pool (link-rot prevention)
  const allowedUrls = collectAllowedUrls();
  for (const m of content.matchAll(/https?:\/\/[^\s)"'<\]]+/g)) {
    const url = m[0];
    if (!/viking-hvac\.com/i.test(url)) continue; // external authority links checked by verify layer
    if (!allowedUrls.has(normalizeUrl(url))) {
      violations.push({
        rule: "unlisted-internal-url",
        excerpt: excerptAt(content, m.index!, Math.min(m[0].length, 60)),
        detail: "viking-hvac.com URL not in the curated site-config link pool — this is how branded 404s got minted.",
      });
    }
  }

  return violations;
}
