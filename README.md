# Viking HVAC Blog — Weather-Triggered Content System

Automated blog content system for [Viking Heating and Air Conditioning](https://www.viking-hvac.com) that generates weather-triggered HVAC content for Chandler, AZ and the Greater Phoenix area.

## How It Works

1. **Vercel Cron** triggers weekly at Sunday midnight UTC (5PM MST)
2. **NWS API** fetches historical (48h) + 7-day forecast for Chandler, AZ (station KCHD)
3. **Weather mode** classified: pre-event, post-event, or combined
4. **Claude AI** generates a 1,500-2,200 word SEO-optimized blog post with AEO summary box
5. **GitHub API** commits the post as a markdown file to `main`
6. **Vercel** rebuilds the site automatically (~60 seconds)

## Local Development

```bash
npm install
npm run dev            # Start dev server at http://localhost:3000
npm run generate       # Generate a post locally
npm run generate:push  # Generate and push to GitHub
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description | Example |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Claude API key | `sk-ant-...` |
| `GITHUB_TOKEN` | GitHub PAT with `repo` scope | `ghp_...` |
| `GITHUB_OWNER` | GitHub username/org | `joelckeith-web` |
| `GITHUB_REPO` | Repository name | `blog.viking-hvac` |
| `GITHUB_BRANCH` | Branch to push to | `main` |
| `NEXT_PUBLIC_SITE_URL` | Blog URL | `https://blog.viking-hvac.com` |
| `NEXT_PUBLIC_MAIN_SITE_URL` | Main site URL | `https://www.viking-hvac.com` |
| `CRON_SECRET` | Secret for cron endpoint auth | `openssl rand -hex 32` |

## Weather-to-Service Mapping

| Weather Condition | HVAC Services | Urgency |
|---|---|---|
| Extreme Heat (105°F+) | AC, Installation, Maintenance | High |
| Heat (95°F+) | AC, Thermostat, Air Quality | Medium |
| Cold Snap (35°F-) | Heating, Installation, Maintenance | High |
| Dust Storm / Haboob | Air Quality, Maintenance, Ductwork | High |
| Monsoon / Thunderstorm | Repairs, Air Quality, Commercial | High |
| Wind (30+ mph) | Repairs, Ductwork, Commercial | Medium |
| Rain | Repairs, Air Quality, Maintenance | Low |
| Mild / Clear | Maintenance, Installation, Swamp Cooler | Low |

## Tech Stack

- **Next.js 15.5.x** (App Router) — must use 15.2.4+ to avoid CVE-2025-66478
- **Tailwind CSS 4** (via `@tailwindcss/postcss`)
- **Claude Sonnet** (content generation via `@anthropic-ai/sdk`)
- **NWS API** (weather data — free, no key needed)
- **Vercel Pro** (hosting + cron jobs)

## Architecture (Matches Property Pros Muncie Template)

```
lib/
  site-config.ts      — All client info, services, neighborhoods, sameAs, keyFacts
  types.ts            — TypeScript types (BlogFrontmatter, WeatherContext, etc.)
  weather.ts          — NWS API: historical observations + 7-day forecast + mode classification
  content-generator.ts — Claude AI prompts: system prompt, user prompt, response parser
  posts.ts            — Markdown file reader (gray-matter frontmatter parsing)
  github.ts           — GitHub API: push generated posts to main branch
components/
  Header.tsx          — Nav bar with phone, service links, mobile menu
  Footer.tsx          — Geo-footer with neighborhoods, services, service areas
  SchemaMarkup.tsx    — JSON-LD: HVACBusiness, BlogPosting, FAQPage, WebSite
  PostCard.tsx        — Blog listing card
app/
  page.tsx            — Blog homepage (post grid)
  blog/[slug]/page.tsx — Individual post page with CTA banner
  api/cron/generate-blog/route.ts — Cron endpoint
  api/posts/route.ts  — Posts API
  sitemap.ts          — Dynamic sitemap
  robots.ts           — Robots.txt
scripts/
  generate-blog.ts    — CLI: npm run generate / npm run generate:push
```
