/**
 * Content-gate regression test.
 *
 * The gate must:
 *  1. FAIL the two known-bad LIVE posts from the 2026-07-13 fabrication audit
 *     (misattributed Energy Star stat; Section 179 tax content + scaffolding).
 *  2. PASS a clean synthetic post whose numbers all come from the payload.
 *
 * Run: npx tsx scripts/test-gate.ts
 */
import fs from "fs";
import path from "path";
import { runContentGate } from "../lib/content-gate";
import type { GeneratedBlog, WeatherContext } from "../lib/types";

const fakeContext: WeatherContext = {
  mode: "pre-event",
  historical: {
    totalPrecipitation: 0,
    peakWindGust: 22,
    hadSevereWeather: false,
    severeEvents: [],
    summary: "Hot and dry over the past 48 hours.",
  },
  forecast: {
    location: "Chandler, AZ",
    fetchedAt: "2026-07-13T12:00:00Z",
    weekRange: "July 13-19, 2026",
    periods: [
      {
        number: 1,
        name: "Monday",
        startTime: "2026-07-13T06:00:00-07:00",
        endTime: "2026-07-13T18:00:00-07:00",
        isDaytime: true,
        temperature: 114,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: { unitCode: "wmoUnit:percent", value: 0 },
        windSpeed: "10 mph",
        windDirection: "W",
        icon: "",
        shortForecast: "Sunny and very hot",
        detailedForecast: "Sunny, with a high near 114.",
      },
    ],
    alerts: [],
    summary: {
      dominantCondition: "extreme heat",
      highTemp: 114,
      lowTemp: 88,
      precipitationDays: 0,
      stormRisk: false,
      freezeRisk: false,
      hailRisk: false,
      highWindRisk: false,
      heavyRainRisk: false,
      dustStormRisk: false,
      extremeHeatRisk: true,
      relevantServices: ["Air Conditioning"],
      weatherStory: "Extreme heat continues.",
    },
  },
  historicalSummary: "Hot and dry.",
  forecastSummary: "Highs near 114 all week.",
  dominantHazard: "extreme heat",
  affectedServices: ["air-conditioning"],
  weekLabel: "July 13-19, 2026",
};

function asBlog(markdown: string): GeneratedBlog {
  return {
    frontmatter: {} as GeneratedBlog["frontmatter"],
    markdownContent: markdown,
    filePath: "content/posts/test.md",
  };
}

let failures = 0;

function expectViolations(
  label: string,
  markdown: string,
  expectedRules: string[]
) {
  const violations = runContentGate(asBlog(markdown), fakeContext);
  const rules = new Set(violations.map((v) => v.rule));
  const missing = expectedRules.filter((r) => !rules.has(r));
  if (violations.length === 0 || missing.length > 0) {
    failures++;
    console.error(
      `✗ ${label}: expected rules [${expectedRules.join(", ")}], got [${[...rules].join(", ")}]`
    );
  } else {
    console.log(
      `✓ ${label}: BLOCKED with ${violations.length} violation(s) [${[...rules].join(", ")}]`
    );
  }
}

function expectClean(label: string, markdown: string) {
  const violations = runContentGate(asBlog(markdown), fakeContext);
  if (violations.length > 0) {
    failures++;
    console.error(`✗ ${label}: expected PASS, got ${violations.length} violation(s):`);
    for (const v of violations) console.error(`    [${v.rule}] "${v.excerpt}"`);
  } else {
    console.log(`✓ ${label}: PASS (0 violations)`);
  }
}

// ── 1. Known-bad live posts from the audit must FAIL ──
const post = (name: string) =>
  fs.readFileSync(path.join(process.cwd(), "content/posts", name), "utf8");

expectViolations(
  "F15 extreme-heat post (misattributed Energy Star 20-30% stat)",
  post("2026-07-06-extreme-heat-warning-hits-chandler-is-your-ac-ready-for-114-f.md"),
  ["percent"]
);

expectViolations(
  "F3/F17 tax-incentives stub (Section 179 + scaffolding)",
  post("2025-12-15-tax-incentives-commercial-hvac-upgrades-planning-year-end.md"),
  ["program-terms", "scaffolding"]
);

expectViolations(
  "F1 high-efficiency post (invented APS/SRP rebate tables)",
  post("2025-10-27-high-efficiency-ac-systems-arizona-worth-cost.md"),
  ["currency", "program-terms", "utility-name"]
);

// ── 2. Synthetic bad snippets — one per rule ──
expectViolations("dollar figure", "A new AC unit costs $8,500 installed.", ["currency"]);
expectViolations("unsourced attribution", "According to industry studies, most systems fail early.\n\nNext paragraph.", ["unsourced-attribution"]);
expectViolations("customer story", "We recently helped a homeowner in Ocotillo restore cooling.", ["customer-story"]);
expectViolations("review count", "With 240+ 5-star reviews, Viking is trusted valley-wide.", ["credential-reviews"]);
expectViolations("experience years", "Our team brings 40 years of combined experience.", ["credential-experience"]);
expectViolations("wrong founding year", "Serving Chandler since 2010, Viking knows the desert.", ["credential-founded"]);
expectViolations("unpayload temperature", "Last week's 123°F scorcher stressed every system.", ["weather-number"]);
expectViolations("unlisted internal URL", "See our [guide](https://viking-hvac.com/heating-services) today.", ["unlisted-internal-url"]);

// ── 3. Clean content must PASS ──
expectClean(
  "clean post (payload temps, allowed claims, pool URLs)",
  `With highs near 114°F forecast this week ([National Weather Service Phoenix](https://forecast.weather.gov/MapClick.php?lat=33.3062&lon=-111.8413)), Chandler homeowners should check their cooling before the heat peaks. Viking Heating and Air Conditioning, a family-owned company serving the East Valley since 2016, offers 24/7 emergency service backed by a 100% satisfaction guarantee.

Most systems show warning signs before failing outright. Weak airflow, warm spots, and short cycling are all worth a professional look — schedule through our [contact page](https://www.viking-hvac.com/contact-us) or explore [preventative maintenance](https://www.viking-hvac.com/preventative-maintenance).

Winds around 10 mph will keep dust manageable, but filters still work harder in summer. Changing them regularly is the cheapest protection you can buy.`
);

console.log(failures === 0 ? "\nALL TESTS PASSED" : `\n${failures} TEST(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
