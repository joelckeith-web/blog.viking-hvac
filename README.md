# Viking HVAC Blog — Weather-Triggered Content System

Automated blog content system for [Viking Heating and Air Conditioning](https://www.viking-hvac.com) that generates weather-triggered HVAC content for Chandler, AZ and the Phoenix East Valley.

## How It Works

1. **Vercel Cron** triggers weekly at Sunday midnight UTC (5PM MST)
2. **NWS API** fetches current weather for Chandler, AZ (station KCHD)
3. **Weather analysis** maps conditions to relevant HVAC services
4. **Claude AI** generates a 1,500-2,200 word SEO-optimized blog post
5. **GitHub API** commits the post as a markdown file
6. **Vercel** rebuilds the site automatically

## Local Development

```bash
npm install
npm run dev        # Start dev server at http://localhost:3000
npm run generate   # Generate a post locally
npm run generate:push  # Generate and push to GitHub
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

- `ANTHROPIC_API_KEY` — Claude API key
- `GITHUB_TOKEN` — GitHub personal access token
- `GITHUB_OWNER` — GitHub username/org (joelckeith-web)
- `GITHUB_REPO` — Repository name (blog.viking-hvac)
- `GITHUB_BRANCH` — Branch to push to (main)
- `NEXT_PUBLIC_SITE_URL` — Blog URL (https://blog.viking-hvac.com)
- `NEXT_PUBLIC_MAIN_SITE_URL` — Main site (https://www.viking-hvac.com)
- `CRON_SECRET` — Secret for cron endpoint auth

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

- **Next.js 15** (App Router)
- **Tailwind CSS 4**
- **Claude Sonnet** (content generation)
- **NWS API** (weather data)
- **Vercel** (hosting + cron)
