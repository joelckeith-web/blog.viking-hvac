import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";
import path from "path";
import { runPreflight } from "../lib/preflight";
import { buildWeatherContext } from "../lib/weather";
import { generateBlogPost } from "../lib/content-generator";
import { runContentGate, ContentGateError } from "../lib/content-gate";
import { verifyContent, ContentVerifyError } from "../lib/content-verify";
import { pushPostToGitHub } from "../lib/github";
import type { GeneratedBlog } from "../lib/types";

const shouldPush = process.argv.includes("--push");

async function main() {
  console.log("=== Viking HVAC Weather-Triggered Blog Generator ===\n");

  // Validate every external dependency BEFORE the expensive Claude call.
  // If a key is dead or rate-limited, fail fast with a remediation message
  // instead of burning a full generation cycle to discover it deep in the SDK.
  await runPreflight();

  // Step 1: Build weather context
  console.log("Fetching weather data for Chandler, AZ...");
  const context = await buildWeatherContext();
  console.log(`Mode: ${context.mode}`);
  console.log(`Week: ${context.weekLabel}`);
  console.log(`Dominant hazard: ${context.dominantHazard}`);
  console.log(`Affected services: ${context.affectedServices.join(", ")}`);
  console.log(`Historical: ${context.historicalSummary}`);
  console.log(`Forecast: ${context.forecastSummary}\n`);

  // Step 2: Generate content
  console.log("Generating blog post with Claude...");
  const blog = await generateBlogPost(context);
  console.log(`Title: ${blog.frontmatter.title}`);
  console.log(`Category: ${blog.frontmatter.category}`);
  console.log(`Tags: ${blog.frontmatter.tags.join(", ")}`);
  console.log(`FAQs: ${blog.frontmatter.schema.faqItems.length} items\n`);

  // Step 3: CONTENT GATE — deterministic validation. A failed gate means the
  // post never exists rather than existing wrong. (Prompt guardrails alone
  // produced the July 2026 SRP incident; this is the enforcement layer.)
  console.log("Running deterministic content gate...");
  const gateViolations = runContentGate(blog, context);
  if (gateViolations.length > 0) {
    saveRejectedDraft(blog, "gate", gateViolations);
    throw new ContentGateError(gateViolations);
  }
  console.log("Gate: PASS");

  // Step 4: VERIFICATION AGENT — independent model checks the draft against
  // viking-truth.json + the actual weather payload. Fails closed.
  console.log("Running verification agent...");
  const verdict = await verifyContent(blog, context);
  if (!verdict.pass) {
    saveRejectedDraft(blog, "verify", verdict.violations);
    throw new ContentVerifyError(verdict.violations);
  }
  console.log("Verify: PASS");

  // Step 5: Save locally
  const postsDir = path.join(process.cwd(), "content/posts");
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  const filePath = path.join(process.cwd(), blog.filePath);
  fs.writeFileSync(filePath, blog.markdownContent);
  console.log(`Saved locally: ${filePath}`);

  // Step 6: Push to GitHub if --push flag
  if (shouldPush) {
    console.log("\nPushing to GitHub...");
    const githubUrl = await pushPostToGitHub(blog);
    console.log(`Pushed: ${githubUrl}`);
  }

  console.log("\nDone!");
}

/** Preserve a blocked draft + its violations for human review — the workflow
 *  uploads rejected/ as an artifact, so a blocked run loses nothing. */
function saveRejectedDraft(
  blog: GeneratedBlog,
  stage: "gate" | "verify",
  violations: unknown
) {
  const dir = path.join(process.cwd(), "rejected");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const base = path.basename(blog.filePath, ".md");
  fs.writeFileSync(path.join(dir, `${base}.md`), blog.markdownContent);
  fs.writeFileSync(
    path.join(dir, `${base}.${stage}-violations.json`),
    JSON.stringify(violations, null, 2)
  );
  console.error(`Rejected draft preserved: rejected/${base}.md`);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
