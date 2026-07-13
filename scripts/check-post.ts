/**
 * Single-post gate check (legacy mode) — the per-file QC tool used during
 * remediation. Prints violations for ONE post and exits non-zero if any.
 *
 * Run: npx tsx scripts/check-post.ts content/posts/<file>.md
 */
import fs from "fs";
import path from "path";
import { runContentGate } from "../lib/content-gate";
import type { GeneratedBlog, WeatherContext } from "../lib/types";

const stubContext = {
  mode: "pre-event",
  historical: { totalPrecipitation: 0, peakWindGust: 0, hadSevereWeather: false, severeEvents: [], summary: "" },
  forecast: {
    location: "", fetchedAt: "", weekRange: "", periods: [], alerts: [],
    summary: {
      dominantCondition: "", highTemp: 0, lowTemp: 0, precipitationDays: 0,
      stormRisk: false, freezeRisk: false, hailRisk: false, highWindRisk: false,
      heavyRainRisk: false, dustStormRisk: false, extremeHeatRisk: false,
      relevantServices: [], weatherStory: "",
    },
  },
  historicalSummary: "", forecastSummary: "", dominantHazard: "", affectedServices: [], weekLabel: "",
} as unknown as WeatherContext;

const INCENTIVE_EXEMPT = new Set(["2025-10-27-arizona-ac-rebates-tax-credits.md"]);
const INCENTIVE_RULES = new Set(["currency", "program-terms", "utility-name", "percent"]);

const target = process.argv[2];
if (!target) {
  console.error("Usage: npx tsx scripts/check-post.ts content/posts/<file>.md");
  process.exit(2);
}

const abs = path.isAbsolute(target) ? target : path.join(process.cwd(), target);
const markdown = fs.readFileSync(abs, "utf8");
const blog = { frontmatter: {}, markdownContent: markdown, filePath: target } as GeneratedBlog;

let violations = runContentGate(blog, stubContext, { legacy: true });
if (INCENTIVE_EXEMPT.has(path.basename(abs))) {
  violations = violations.filter((v) => !INCENTIVE_RULES.has(v.rule));
}

if (violations.length === 0) {
  console.log(`CLEAN: ${path.basename(abs)}`);
  process.exit(0);
}
console.log(`${violations.length} violation(s) in ${path.basename(abs)}:`);
for (const v of violations) {
  console.log(`  [${v.rule}] "${v.excerpt}"`);
}
process.exit(1);
