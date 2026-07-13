/**
 * Legacy content sweep — runs the deterministic gate (legacy mode: no
 * weather-number check) across EVERY existing post and writes a full
 * violation inventory. This is the remediation work-list generator and,
 * after remediation, the completeness check (target: zero violations).
 *
 * Run: npx tsx scripts/legacy-sweep.ts [--out inventory.json]
 */
import fs from "fs";
import path from "path";
import { runContentGate } from "../lib/content-gate";
import type { GeneratedBlog, WeatherContext } from "../lib/types";

// Minimal stub — legacy mode never touches the weather payload.
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

const outFlag = process.argv.indexOf("--out");
const outPath = outFlag !== -1 ? process.argv[outFlag + 1] : "legacy-sweep-inventory.json";

const postsDir = path.join(process.cwd(), "content/posts");
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md")).sort();

/** The hand-corrected rebates post (rewritten 2026-07-12 against SRP's official
 *  application form after the SRP incident) is the designated INTERIM canonical
 *  incentives surface — every other post links to it instead of restating
 *  figures. It is exempt from the incentive-class rules ONLY; every other rule
 *  (banned phrases, credentials, stories, scaffolding) still applies to it. */
const INCENTIVE_EXEMPT = new Set(["2025-10-27-arizona-ac-rebates-tax-credits.md"]);
const INCENTIVE_RULES = new Set(["currency", "program-terms", "utility-name", "percent"]);

const inventory: Array<{
  file: string;
  violationCount: number;
  rules: Record<string, number>;
  violations: ReturnType<typeof runContentGate>;
}> = [];

let totalViolations = 0;
for (const file of files) {
  const markdown = fs.readFileSync(path.join(postsDir, file), "utf8");
  const blog = { frontmatter: {}, markdownContent: markdown, filePath: `content/posts/${file}` } as GeneratedBlog;
  let violations = runContentGate(blog, stubContext, { legacy: true });
  if (INCENTIVE_EXEMPT.has(file)) {
    violations = violations.filter((v) => !INCENTIVE_RULES.has(v.rule));
  }
  const rules: Record<string, number> = {};
  for (const v of violations) rules[v.rule] = (rules[v.rule] || 0) + 1;
  if (violations.length > 0) inventory.push({ file, violationCount: violations.length, rules, violations });
  totalViolations += violations.length;
}

inventory.sort((a, b) => b.violationCount - a.violationCount);
fs.writeFileSync(outPath, JSON.stringify(inventory, null, 1));

console.log(`Swept ${files.length} posts — ${inventory.length} flagged, ${totalViolations} total violations`);
console.log(`Inventory: ${outPath}\n`);
for (const p of inventory) {
  console.log(
    `  ${String(p.violationCount).padStart(4)}  ${p.file}  [${Object.entries(p.rules).map(([r, n]) => `${r}:${n}`).join(", ")}]`
  );
}
process.exit(0);
