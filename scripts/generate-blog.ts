import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";
import path from "path";
import { runPreflight } from "../lib/preflight";
import { buildWeatherContext } from "../lib/weather";
import { generateBlogPost } from "../lib/content-generator";
import { pushPostToGitHub } from "../lib/github";

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

  // Step 3: Save locally
  const postsDir = path.join(process.cwd(), "content/posts");
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  const filePath = path.join(process.cwd(), blog.filePath);
  fs.writeFileSync(filePath, blog.markdownContent);
  console.log(`Saved locally: ${filePath}`);

  // Step 4: Push to GitHub if --push flag
  if (shouldPush) {
    console.log("\nPushing to GitHub...");
    const githubUrl = await pushPostToGitHub(blog);
    console.log(`Pushed: ${githubUrl}`);
  }

  console.log("\nDone!");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
