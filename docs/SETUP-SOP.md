# Weather-Triggered Blog System — Setup SOP

**Version:** 3.0
**Last Updated:** March 10, 2026
**Purpose:** Step-by-step instructions for deploying this automated blog system for a new client.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Repository Setup](#2-repository-setup)
3. [Environment Configuration](#3-environment-configuration)
4. [Vercel Deployment](#4-vercel-deployment)
5. [DNS / Subdomain Setup](#5-dns--subdomain-setup)
6. [Google Indexing API Setup](#6-google-indexing-api-setup)
7. [Client Customization Checklist](#7-client-customization-checklist)
8. [Testing the Pipeline](#8-testing-the-pipeline)
9. [Scheduling & Automation](#9-scheduling--automation)
10. [Ongoing Maintenance](#10-ongoing-maintenance)

---

## 1. Prerequisites

Before you begin, ensure you have the following:

- **GitHub account** with ability to create repos and generate Personal Access Tokens
- **Vercel Pro account** (required for Cron Jobs)
- **Anthropic API key** — sign up at https://console.anthropic.com
- **Access to client's DNS provider** (GoDaddy, Cloudflare, Namecheap, etc.)
- **Cursor IDE** with Claude Code CLI (for development and pushing)
- **Client website audit complete** — you need:
  - Brand colors (hex codes)
  - Service page URLs (verified from sitemap)
  - Contact info (phone, address, hours)
  - Social media links
  - Service areas list
  - Google Business Profile CID (for Entity Bridge)
  - Facebook page URL

---

## 2. Repository Setup

### 2.1 Clone or Fork the Template

```bash
# Option A: Clone the template
git clone https://github.com/YOUR_ORG/property-pros-blog.git client-name-blog
cd client-name-blog
rm -rf .git
git init

# Option B: Use GitHub template feature (if configured)
# Click "Use this template" on the GitHub repo page
```

### 2.2 Create GitHub Repository

```bash
# Create new repo on GitHub (main branch only — NO dev branch needed)
gh repo create client-name-blog --private --source=. --push
```

### 2.3 Generate GitHub Personal Access Token (Fine-Grained)

Use a **fine-grained token** (not classic) — it's more secure and can be scoped to specific repos.

1. Go to **github.com → Settings → Developer settings → Personal access tokens → Fine-grained tokens**
2. Click **"Generate new token"**
3. Configure:
   - **Token name:** `blog-automation` (one token can cover all blog projects)
   - **Expiration:** 90 days (set a calendar reminder to rotate)
   - **Resource owner:** Your GitHub account/org
   - **Repository access:** Select **"Only select repositories"** → choose ALL blog repos (e.g., `blog.viking-hvac`, `blog.propertyprosmuncie`, future projects)
   - **Permissions → Repository permissions:**
     - **Contents:** Read and write (this is the ONLY permission needed)
4. Click **"Generate token"** and copy it immediately
5. Use the same token across all blog project Vercel deployments as `GITHUB_TOKEN`

**Key advantages of one shared fine-grained token:**
- Single token to manage across all blog projects
- Minimal permissions (Contents only — not full repo access)
- Easy to add new repos later (edit token → add repo)
- When it expires, update once in each Vercel project

**Token format:** Fine-grained tokens start with `github_pat_` (vs classic tokens that start with `ghp_`)

---

## 3. Environment Configuration

### 3.1 Get API Keys

#### Anthropic API Key
1. Go to https://console.anthropic.com
2. Create a new API key
3. Name it: `client-name-blog`
4. Copy the key (starts with `sk-ant-`)

#### Cron Secret
Generate a random secret for Vercel cron authorization:
```bash
openssl rand -hex 32
```

### 3.2 Create `.env.local`

Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

Required variables:
| Variable | Description | Example |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Claude API key | `sk-ant-...` |
| `GITHUB_TOKEN` | Fine-grained GitHub PAT (Contents: R/W) | `github_pat_...` |
| `GITHUB_OWNER` | GitHub username or org | `joelckeith-web` |
| `GITHUB_REPO` | Repository name | `blog.viking-hvac` |
| `GITHUB_BRANCH` | Target branch (use `main`) | `main` |
| `NEXT_PUBLIC_SITE_URL` | Blog subdomain URL | `https://blog.viking-hvac.com` |
| `NEXT_PUBLIC_MAIN_SITE_URL` | Client's main site | `https://www.viking-hvac.com` |
| `CRON_SECRET` | Random secret for cron auth | (generated above) |

Optional (for Google Indexing API):
| Variable | Description |
|----------|-------------|
| `GOOGLE_INDEXING_CLIENT_EMAIL` | Service account email |
| `GOOGLE_INDEXING_PRIVATE_KEY` | Service account private key (PEM) |

---

## 4. Vercel Deployment

### 4.1 Import Project

1. Go to https://vercel.com/new
2. Import the GitHub repository
3. Framework Preset: **Next.js**
4. Build Command: `next build` (default)
5. Output Directory: leave default

### 4.2 Configure Environment Variables

In Vercel project settings → Environment Variables, add ALL variables from `.env.local`.

**Important:** Set variables for **Production**, **Preview**, and **Development** environments.

### 4.3 Configure Cron

The `vercel.json` file already contains the framework preset and cron schedule:
```json
{
  "framework": "nextjs",
  "crons": [{
    "path": "/api/cron/generate-blog",
    "schedule": "0 22 * * 0"
  }]
}
```

This runs every Monday at midnight UTC (Sunday 5:00 PM MST). Adjust the schedule as needed for the client's timezone.

**Cron schedule reference:**
- `0 0 * * 1` = Monday midnight UTC / Sunday 5 PM MST (weekly, current default)
- `0 13 * * 1` = Monday 6:00 AM MST (13:00 UTC)
- `0 22 * * 0` = Sunday 5:00 PM ET (10 PM UTC)
- `0 14 * * 0` = Sunday 10:00 AM ET (2 PM UTC)

### 4.4 Configure Custom Domain

1. In Vercel project → Settings → Domains
2. Add: `blog.clientsite.com`
3. Vercel will provide DNS records (see Section 5)

### 4.5 Set Git Branch for Production

1. In Vercel project → Settings → Git
2. Production Branch: `main`
3. All blog posts push directly to `main` → Vercel auto-deploys

---

## 5. DNS / Subdomain Setup

See the detailed guide: [CNAME-DNS-SETUP.md](./CNAME-DNS-SETUP.md)

**Quick version:**

1. In client's DNS provider, add a CNAME record:
   - **Name:** `blog`
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** 300 (or Auto)

2. In Vercel, add the domain `blog.clientsite.com`
3. Vercel will auto-provision an SSL certificate
4. Verify: visit `https://blog.clientsite.com` — should load the blog

---

## 6. Google Indexing API Setup (Optional)

Enables automatic index pinging after each blog post is published. Posts get indexed within minutes instead of days.

### 6.1 Create Google Cloud Project

1. Go to https://console.cloud.google.com
2. Create a new project: `client-name-blog-indexing`
3. Enable the **Indexing API**: APIs & Services → Library → Search "Indexing API" → Enable

### 6.2 Create Service Account

1. APIs & Services → Credentials → Create Credentials → Service Account
2. Name: `blog-indexing`
3. Role: None needed (Indexing API uses Search Console verification)
4. Create a key: JSON format → Download

### 6.3 Add to Search Console

1. Go to Google Search Console for the blog domain
2. Settings → Users and permissions → Add user
3. Enter the service account email (e.g., `blog-indexing@project.iam.gserviceaccount.com`)
4. Permission: **Owner**

### 6.4 Configure Environment Variables

Add to `.env.local` and Vercel:
```
GOOGLE_INDEXING_CLIENT_EMAIL=blog-indexing@project.iam.gserviceaccount.com
GOOGLE_INDEXING_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Note:** If not configured, the system simply skips the indexing ping — it's non-blocking.

---

## 7. Client Customization Checklist

For each new client, update these files:

### 7.1 `lib/site-config.ts` — Critical
- [ ] Company name and legal name
- [ ] Main website URL
- [ ] Blog URL (subdomain)
- [ ] Phone number(s)
- [ ] Address (street, city, state, zip)
- [ ] Business hours
- [ ] Tagline and description
- [ ] **sameAs URLs** (Google Maps CID, Facebook, LinkedIn, and any other verified profiles)
- [ ] **Neighborhoods** array for geo-anchor footer
- [ ] Service areas list
- [ ] All service page URLs (verify from sitemap!)
- [ ] All service subpage URLs
- [ ] Key page URLs (about, contact, gallery, testimonials)
- [ ] Social media links
- [ ] Weather-to-service mapping (adjust services per client)

### 7.2 `lib/weather.ts` — Location
- [ ] Update latitude/longitude for client's city
- [ ] Update NWS station ID (find at https://www.weather.gov/wrh/stationlookup)
- [ ] Update NWS User-Agent email
- [ ] Tip: Find coords at https://www.latlong.net

### 7.3 `tailwind.config.ts` & `styles/globals.css` — Brand Colors & Styles (Tailwind CSS 3)
- [ ] Update `tailwind.config.ts` → `theme.extend.colors.brand` with client brand colors
- [ ] Update `tailwind.config.ts` → `theme.extend.typography.DEFAULT.css` with brand colors for prose
- [ ] Update `globals.css` → `.btn-primary` uses `bg-brand-accent` (verify accent color)
- [ ] Update `globals.css` → `.btn-secondary` border/text uses `brand-accent`
- [ ] Update `globals.css` → `.prose blockquote` border uses `brand-accent`
- [ ] Note: **Always use TW3 with `tailwind.config.ts`** — do NOT use TW4 (see issue 11.4)

### 7.5 `components/Header.tsx` — Navigation
- [ ] Logo (replace PP placeholder with client logo)
- [ ] Navigation links to match client site
- [ ] Services dropdown items

### 7.6 `components/Footer.tsx` — Footer
- [ ] Company info matches client
- [ ] Service list matches
- [ ] Service areas match

### 7.7 `lib/content-generator.ts` — AI Prompts
- [ ] System prompt references correct company name
- [ ] External authority sources are relevant to client's industry
- [ ] Category enum matches client's services
- [ ] CTA uses correct phone number
- [ ] Geo-footer links use correct neighborhoods

### 7.8 `vercel.json` — Schedule
- [ ] Cron schedule appropriate for client's timezone

---

## 8. Testing the Pipeline

### 8.1 Local Test (No API Keys Needed for Weather)

```bash
# Install dependencies
npm install

# Test weather context build
npx tsx -e "
import { buildWeatherContext } from './lib/weather';
buildWeatherContext().then(ctx => {
  console.log('Mode:', ctx.mode);
  console.log('Week:', ctx.weekLabel);
  console.log('Hazard:', ctx.dominantHazard);
  console.log('Services:', ctx.affectedServices);
  console.log('Historical:', ctx.historicalSummary);
});
"
```

### 8.2 Full Local Test (Requires Anthropic API Key)

```bash
# Generate a blog post locally
npm run generate

# Check the output
ls content/posts/
cat content/posts/*.md | head -60
```

### 8.3 Test GitHub Push

```bash
# Generate and push directly to main
npm run generate:push

# Verify on GitHub — Vercel will auto-deploy
```

### 8.4 Test Cron Endpoint

After deploying to Vercel:
```bash
# Hit the cron endpoint manually
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  https://blog.clientsite.com/api/cron/generate-blog
```

### 8.5 End-to-End Verification

1. Trigger cron → blog auto-published to `main` branch
2. Vercel auto-deploys → blog post appears on live site
3. Google Indexing API pinged (if configured)
4. Check JSON-LD schemas with Google's Rich Results Test
5. Verify the "Immediate Action Summary" box renders correctly
6. Verify the Service Area Geo-Link Footer renders
7. Verify sitemap at `blog.clientsite.com/sitemap.xml`
8. Check the `sameAs` array in LocalBusiness schema

---

## 9. Scheduling & Automation

### How It Works (No Human-in-the-Loop)

The system is fully automated:

1. **Vercel Cron** fires every Sunday at 5:00 PM ET
2. **NWS API** is queried for historical (48h) + 7-day forecast data
3. **Weather Mode** is classified: `pre-event`, `post-event`, or `combined`
4. **Claude API** generates a mode-specific blog post
5. **GitHub API** pushes the markdown file directly to `main` branch
6. **Vercel** auto-deploys from `main` within ~60 seconds
7. **Google Indexing API** (optional) pings Google for immediate crawl

### Adjusting the Schedule

Edit `vercel.json` to change the cron schedule:
```json
{
  "crons": [{
    "path": "/api/cron/generate-blog",
    "schedule": "0 22 * * 0"
  }]
}
```

Common schedules:
- `0 22 * * 0` — Sunday 5PM ET (weekly, recommended)
- `0 22 * * 0,3` — Sunday + Wednesday 5PM ET (twice weekly)
- `0 14 * * 1` — Monday 10AM ET

### Manual Generation

You can also trigger generation manually at any time:

```bash
# Generate locally to review first
npm run generate

# Generate and push directly to main (auto-deploys)
npm run generate:push
```

### Connections Required

| Service | Purpose | Required? |
|---------|---------|-----------|
| NWS API | Weather data | Yes (free, no key) |
| Anthropic API | Blog generation | Yes |
| GitHub API | Push commits | Yes |
| Vercel | Hosting + Cron | Yes (Pro plan) |
| Google Indexing API | Fast indexing | Optional |

---

## 10. Ongoing Maintenance

### Automated Weekly Workflow
1. **Monday midnight UTC (Sunday 5 PM MST):** Cron fires → weather fetched → blog generated → pushed to main → deployed → indexed
2. **No human intervention needed** — system runs fully autonomously

### Monthly Tasks
- Review blog analytics (Google Search Console, GA4)
- Verify all internal links still work
- Check that weather API is returning data correctly
- Review generated content quality — adjust AI prompts if needed
- Verify `sameAs` URLs are still valid

### Quarterly Tasks
- Update service page URLs if client's site changes
- Review and update external authority sources
- Check for Next.js / dependency updates
- Review SEO performance and adjust keyword targeting
- Update neighborhood list if service area expands

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Cron not firing | Check Vercel dashboard → Cron Jobs tab. Verify `CRON_SECRET` matches. |
| Weather API error | NWS API occasionally has outages. Check https://api.weather.gov status. The cron will retry next week. |
| Blog content too short | Adjust word count range in `content-generator.ts` system prompt. |
| GitHub push fails (403) | Fine-grained PAT missing Contents: R/W permission. Edit token at github.com → Settings → Developer settings. See 11.17. |
| GitHub push fails (401) | Token expired. Regenerate and update in Vercel env vars. |
| Cron returns HTML not JSON | Wrong endpoint path. Verify `vercel.json` path matches `app/api/cron/*/route.ts`. See 11.18. |
| CLI script: API key undefined | Missing `dotenv` or eager client init. See 11.15. |
| Build fails on Vercel | Check build logs. Common issues: missing env vars, TypeScript errors in generated content. |
| SEO schemas not showing | Test with https://search.google.com/test/rich-results — check for JSON-LD errors. |
| Indexing API not working | Verify service account is added as Owner in Search Console. Check env vars. |
| Wrong weather mode | Check `determineWeatherMode()` thresholds in `lib/weather.ts`. |

---

## 11. Known Build Issues & Fixes (Lessons Learned)

This section documents issues encountered during the Viking HVAC build that apply to **all future client projects**. Address these proactively when setting up a new project to avoid deployment failures.

### 11.1 Next.js Version — CVE-2025-66478

**Problem:** Vercel blocks deployment of Next.js versions affected by CVE-2025-66478 (includes 15.2.3 and earlier minor patches).

**Fix:** Always use Next.js **15.2.4 or later** (recommended: latest 15.5.x). When initializing a new project:

```bash
# Use the latest patched version
npm install next@15.5 eslint-config-next@15.5
```

**Template rule:** The `package.json` template should pin `next` to `"15.5.x"` or later, never `"15.2.3"`.

### 11.2 Vercel Framework Detection — "No Output Directory named public"

**Problem:** If Vercel doesn't detect the project as Next.js, it looks for a `public/` output directory instead of `.next/`. Build succeeds but deployment fails with:
```
Error: No Output Directory named "public" found after the Build completed.
```

**Fix:** Add `"framework": "nextjs"` to `vercel.json`:
```json
{
  "framework": "nextjs",
  "crons": [...]
}
```

**Also:** In Vercel project settings (Settings → General → Framework Preset), manually select **Next.js** as the framework. This is a belt-and-suspenders approach — do both.

### 11.3 Git Identity Not Configured

**Problem:** First commit fails with `Author identity unknown` on fresh machines or new user profiles.

**Fix:** Set git identity in the repo before committing:
```bash
git config user.name "Your Name"
git config user.email "your@email.com"
```

**Note:** Do NOT use `--global` flag unless you want this identity for all repos on the machine.

### 11.4 Tailwind CSS — Use v3, NOT v4

**Problem:** The initial Viking HVAC build used Tailwind CSS v4 with `@tailwindcss/postcss`, `@import "tailwindcss"`, and `@theme` blocks for color configuration. While TW4 compiled without errors, the deployed site had **visibly wrong colors and missing prose styling** compared to the Property Pros template (which uses TW3). The root causes:

1. **TW4 generates CSS differently** — colors use `var()` indirection and can convert to `oklch()`, producing subtly different rendered colors than the hex values specified.
2. **TW4's `@theme` approach** doesn't integrate with `@tailwindcss/typography` the same way TW3's `tailwind.config.ts` does — typography customizations (heading colors, link colors, blockquote borders) were weaker or missing.
3. **TW4's `@plugin` syntax** loads plugins but doesn't provide the same deep configuration as TW3's `plugins: [require("@tailwindcss/typography")]` with `typography` theme overrides.

**Fix:** Use **Tailwind CSS v3** with `tailwind.config.ts` to exactly match the Property Pros template:

```bash
# Install TW3 stack (NOT TW4)
npm install -D tailwindcss@3 autoprefixer @tailwindcss/typography@0.5
```

Use this `postcss.config.mjs`:
```js
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
export default config;
```

Use this `globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
  body { @apply bg-white text-brand-text; }
}

@layer components {
  .btn-primary { @apply inline-block bg-brand-accent text-white font-semibold px-6 py-3 rounded-md hover:bg-brand-accent-hover transition-colors; }
  .btn-secondary { @apply inline-block border-2 border-brand-accent text-brand-accent font-semibold px-6 py-3 rounded-md hover:bg-brand-accent hover:text-white transition-colors; }
  /* ... additional component classes */
}
```

Create `tailwind.config.ts` with brand colors in `theme.extend.colors.brand`:
```ts
import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#CLIENT_PRIMARY",
          "dark-secondary": "#CLIENT_DARKER",
          accent: "#CLIENT_ACCENT",
          "accent-hover": "#CLIENT_ACCENT_DARKER",
          "accent-light": "rgba(R, G, B, 0.08)",
          text: "#333333",
          "text-secondary": "#555555",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#333333",
            a: { color: "#CLIENT_ACCENT", "&:hover": { color: "#CLIENT_ACCENT_DARKER" } },
            h1: { color: "#CLIENT_PRIMARY" },
            h2: { color: "#CLIENT_PRIMARY" },
            h3: { color: "#CLIENT_DARKER" },
            strong: { color: "#CLIENT_DARKER" },
            blockquote: { borderLeftColor: "#CLIENT_ACCENT" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
```

**Template rule:** Always use TW3 + `tailwind.config.ts` + `@tailwindcss/typography`. Do NOT use TW4 `@theme`/`@plugin`/`@tailwindcss/postcss` — it produces different output.

### 11.5 Package.json — Required Dependencies

**Problem:** Missing dependencies cause build failures. Here is the complete dependency list that works:

```json
{
  "dependencies": {
    "next": "^15.5.12",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "gray-matter": "^4.0.3",
    "react-markdown": "^9.0.1",
    "rehype-raw": "^7.0.0",
    "rehype-slug": "^6.0.0",
    "remark-gfm": "^4.0.0",
    "@anthropic-ai/sdk": "^0.39.0",
    "date-fns": "^4.1.0",
    "feed": "^4.2.2"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.7.0",
    "tsx": "^4.19.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.15",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.5.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.5.12"
  }
}
```

**Critical:** Use `tailwindcss@3` (NOT v4). See issue 11.4 for why.

### 11.6 Wix-Based Client Sites — Brand Color Extraction

**Problem:** Many home service clients use Wix. Wix renders dynamically, so you can't extract brand colors from HTML source or crawl data.

**Fix:** Ask the client for their Canva Brand Kit or Wix Site Colors:
- **Canva:** Settings → Brand Kit → Colors (screenshot works)
- **Wix:** Dashboard → Site Design → Colors
- **Fallback:** Use browser DevTools on the rendered site, or ask the client directly

### 11.7 Google Maps CID Extraction

**Problem:** The CID number isn't always visible in the Google Maps URL. Sometimes the URL uses hex format (`0x...`) instead of decimal.

**Fix:** If the URL contains a hex CID (e.g., `0x258b892e09a78bb1`), convert to decimal:
```bash
python3 -c "print(int('0x258b892e09a78bb1', 16))"
# Output: 2705406831989590961
```

The sameAs URL format is: `https://www.google.com/maps?cid=DECIMAL_NUMBER`

### 11.8 Empty GitHub Repo — No Template Cloning Needed

**Problem:** When creating a new client blog, you may be tempted to clone the Property Pros repo. This creates unnecessary git history and potential merge conflicts.

**Fix:** Create an empty repo on GitHub first, clone it locally, then build/copy files into it:
```bash
# Create empty repo on GitHub, then:
git clone https://github.com/org/blog.clientsite.git
cd blog.clientsite
# Copy template files or build from scratch
```

### 11.9 npm Install in Wrong Directory

**Problem:** If you create `package.json` before `cd`-ing into the project directory, `npm install` runs in the parent directory and installs `node_modules` in the wrong place.

**Fix:** Always verify your working directory before running `npm install`:
```bash
pwd  # Should be /path/to/blog.clientsite
ls package.json  # Should exist in current directory
npm install
```

### 11.10 NWS Weather Station Selection

**Problem:** Using the wrong NWS station results in inaccurate weather data for the client's area.

**Fix:**
1. Go to https://www.weather.gov/wrh/stationlookup
2. Search by state → find the closest station to the client's city
3. Use the **4-letter station code** (e.g., KCHD for Chandler, KMIE for Muncie)
4. For the NWS forecast office (used in weather stories), go to https://www.weather.gov and enter the client's city — the URL shows the office code

**Arizona stations:** KCHD (Chandler), KPHX (Phoenix Sky Harbor), KSDL (Scottsdale), KFFZ (Mesa/Falcon Field)

### 11.11 Missing `@tailwindcss/typography` Plugin — Unstyled Blog Content

**Problem:** The blog post page used `prose` and `prose-lg` CSS classes to style markdown content (headings, paragraphs, links, lists, blockquotes). Without the `@tailwindcss/typography` plugin installed, these classes do absolutely nothing — all blog text renders as unstyled, same-size, same-color text. This is the single biggest quality difference between a polished and an amateur-looking blog.

**Fix:** Always install the typography plugin:
```bash
npm install -D @tailwindcss/typography@0.5
```

And add it to `tailwind.config.ts`:
```ts
plugins: [require("@tailwindcss/typography")],
```

Customize prose colors in `theme.extend.typography.DEFAULT.css` to match the client's brand (headings, links, blockquotes — see 11.4 for the full config pattern).

**How to verify:** After building, check the deployed blog post page. Headings should be larger and colored, links should be the accent color, blockquotes should have a colored left border. If everything looks like plain unstyled text, the typography plugin is missing.

### 11.12 Links Opening in New Tabs — `target="_blank"` Overuse

**Problem:** During initial development, all external links (to the client's main site services, contact page, about page, etc.) were given `target="_blank" rel="noopener noreferrer"`. This caused every navigation link to the main site to open a new browser tab, creating a frustrating user experience. The blog and main site should feel like one connected site, not separate destinations.

**Fix:** Remove `target="_blank"` from ALL links pointing to the client's main site domain. Links should open in the same tab for seamless navigation.

**Rule:** Only use `target="_blank"` for links to truly external third-party sites (e.g., social media profiles in the footer). Links to `client-site.com/*` from `blog.client-site.com` should NEVER use `target="_blank"`.

**Files to check:** `Header.tsx`, `Footer.tsx`, `ServiceAreaFooter.tsx`, `app/page.tsx`, `app/blog/[slug]/page.tsx`, `app/not-found.tsx` — search for `target="_blank"` and remove from any main-site link.

### 11.13 Client Logo — Use Image, Not Text

**Problem:** The initial header used a text-based logo (`VIKING HVAC` in styled spans). This looks generic and doesn't match the client's actual branding. Every client has a logo image that should be used.

**Fix:** Use Next.js `Image` component with the client's logo URL. For Wix-hosted clients, the logo is typically available as a static asset on `static.wixstatic.com`:

```tsx
import Image from "next/image";

<Link href={siteConfig.mainSiteUrl} className="flex items-center shrink-0">
  <Image
    src="CLIENT_LOGO_URL"
    alt="Client Name"
    width={200}
    height={50}
    className="h-12 w-auto"
    priority
  />
</Link>
```

**Important:** Add the image host domain to `next.config.ts`:
```ts
images: {
  domains: ["blog.clientsite.com", "static.wixstatic.com"],
},
```

**Where to find logos:**
- **Wix sites:** View page source → search for `.png` or `.svg` URLs on `static.wixstatic.com`
- **WordPress sites:** Usually at `/wp-content/uploads/` — check header source
- **Ask the client** for a high-res PNG/SVG version

### 11.14 Blog Structure Must Match Property Pros Template Exactly

**Problem:** The Viking HVAC blog was initially built with a different component structure than the Property Pros template — featured post layout, different card design, missing sidebar, no breadcrumbs, no FAQ section, no related posts. Even though both were "blogs," the Viking version looked significantly lower quality.

**Fix:** Every new client blog must match the Property Pros architecture 1:1. Required structural elements:

**Homepage (`app/page.tsx`):**
- Left-aligned hero section with `max-w-3xl` inner container
- Service category pills/tags in the hero
- Simple 3-column grid of BlogCards (no featured post variant)
- Light-background CTA section at bottom
- "Blog Coming Soon" empty state with SVG icon

**Blog Post Page (`app/blog/[slug]/page.tsx`):**
- Dark header with breadcrumb navigation (Home / Blog / Category)
- Category badge + date + reading time + weather indicator
- Main content + sidebar layout (`lg:flex lg:gap-12`)
- Sidebar: sticky contact card + services list
- Service Area geo-footer links below content
- Expandable FAQ section (using `<details>` elements)
- In-post CTA with dual buttons
- Tags as rounded pills
- "More From Our Blog" related posts section (3-column grid)

**BlogCard/PostCard (`components/PostCard.tsx`):**
- Gradient image placeholder (dark-to-darker)
- Weather icon for weather-triggered posts
- Per-category colored badges (not all the same color)
- Title links to post, hover color change
- Reading time + weather week in footer

**Header (`components/Header.tsx`):**
- Dark utility bar (phone + license info)
- White sticky nav bar with logo image
- Services dropdown on hover
- "Schedule Service" CTA button

**Footer (`components/Footer.tsx`):**
- 4-column grid: About (with social SVG icons), Services, Service Areas, Contact (with SVG icons)
- Accent-colored section headings
- Bottom bar with copyright + links

**Additional required components:**
- `ServiceAreaFooter.tsx` — geo-link footer for blog posts
- `SchemaMarkup.tsx` — separate named exports: `LocalBusinessSchema`, `WebSiteSchema`, `ArticleSchema`, `FaqSchema`, `BreadcrumbSchema`
- `app/not-found.tsx` — branded 404 page

### 11.15 CLI Scripts — `dotenv` Required for `.env.local` Loading

**Problem:** The `scripts/generate-blog.ts` script runs via `npx tsx` outside of Next.js. Unlike `next dev` or `next build`, tsx does NOT auto-load `.env.local`. The Anthropic API key is undefined, causing `401 Unauthorized` errors from Claude.

**Fix:** Install `dotenv` and load `.env.local` explicitly at the TOP of CLI scripts:

```bash
npm install dotenv
```

```ts
// scripts/generate-blog.ts — MUST be first two lines
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
```

**Critical timing issue:** The Anthropic client must be lazily initialized AFTER dotenv loads. If you create the client at module scope (`const anthropic = new Anthropic()`), it reads the API key at import time — before dotenv runs. Use a factory function instead:

```ts
// lib/content-generator.ts — WRONG (reads key at import time)
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// lib/content-generator.ts — CORRECT (reads key at call time)
function getAnthropicClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}
```

**Template rule:** Always use lazy client initialization in `content-generator.ts` so both Next.js (auto-loads env) and CLI scripts (dotenv) work correctly.

### 11.16 Multi-Station Weather Monitoring — Regional Coverage

**Problem:** Using a single NWS station (e.g., KCHD for Chandler) misses weather events that hit nearby areas. A dust storm may be detected at Mesa's station but not Chandler's, leading to missed content triggers.

**Fix:** Configure multiple NWS observation stations in `lib/weather.ts` to cover the full service area:

```ts
const VALLEY_STATIONS = [
  { id: "KCHD", name: "Chandler" },
  { id: "KFFZ", name: "Mesa/Falcon Field" },
  { id: "KIWA", name: "Gilbert/Phoenix-Mesa Gateway" },
  { id: "KPHX", name: "Phoenix Sky Harbor" },
];
```

- Fetch all stations in parallel via `Promise.allSettled` (gracefully handles individual station failures)
- Aggregate using worst-case logic: highest wind gust, highest temp, any severe events from ANY station
- Average precipitation across reporting stations
- Reference "Phoenix East Valley" (or the client's broader service area) in summary text

**For new clients:** Look up all NWS stations within the service area at https://www.weather.gov/wrh/stationlookup. Typical coverage: 2-4 stations for a metro area, 1 station for small towns.

### 11.17 GitHub PAT Permissions — Fine-Grained Token Gotcha

**Problem:** After creating a fine-grained GitHub PAT and setting it in Vercel, the cron endpoint returned:
```
GitHub API error 403: Resource not accessible by personal access token
```

The token was created but the **Contents** permission was not set to **Read and write** — it defaulted to "No access."

**Fix:** When creating or editing a fine-grained token:
1. Go to **Repository permissions** (not Account permissions)
2. Find **Contents** and explicitly set to **Read and write**
3. This is the only permission needed — do not add others

**How to verify:** Test the token before deploying:
```bash
curl -H "Authorization: Bearer github_pat_YOUR_TOKEN" \
  https://api.github.com/repos/OWNER/REPO/contents/README.md
```
If this returns the file contents, the token works. If it returns 403, the Contents permission is missing.

**Template rule:** Always test the PAT with a simple API call before setting it in Vercel. The cron endpoint generates a full blog post before attempting the push — a PAT failure wastes an Anthropic API call.

### 11.18 End-to-End Cron Testing — Correct Endpoint Path

**Problem:** The cron endpoint path in `vercel.json` must exactly match the API route directory structure. A mismatch (e.g., `/api/cron/generate` vs `/api/cron/generate-blog`) returns the HTML homepage instead of triggering the API route, with no obvious error message.

**Fix:** Verify the path matches:
- `vercel.json` path: `/api/cron/generate-blog`
- File location: `app/api/cron/generate-blog/route.ts`

**Test command (run after deploy):**
```bash
curl -s "https://blog-CLIENTSITE.vercel.app/api/cron/generate-blog" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

**Expected success response:**
```json
{
  "success": true,
  "post": { "title": "...", "slug": "...", "weatherMode": "..." },
  "weather": { "mode": "...", "dominantHazard": "..." },
  "githubUrl": "https://github.com/..."
}
```

If you get HTML back instead of JSON, the path is wrong. If you get `{"error":"Unauthorized"}`, the `CRON_SECRET` doesn't match.

---

## 12. New Client Setup — Quick Start Checklist

Use this checklist when duplicating for a new client. It incorporates all lessons learned above.

### Pre-Build
- [ ] Gather all client info (see Section 7)
- [ ] Run Apify Website Content Crawler on client's site → save JSON
- [ ] Run Apify Sitemap URL Extractor → save JSON
- [ ] Extract Google Maps CID (convert hex to decimal if needed)
- [ ] Get brand colors from Canva/Wix/client
- [ ] Look up NWS station at weather.gov/wrh/stationlookup
- [ ] Get lat/long from latlong.net

### Build
- [ ] Create empty GitHub repo
- [ ] Clone locally
- [ ] Initialize with Next.js **15.5.x+** (not 15.2.3!)
- [ ] Include `"framework": "nextjs"` in `vercel.json`
- [ ] Use **Tailwind v3** with `tailwind.config.ts` (NOT TW4 — see 11.4)
- [ ] Install `@tailwindcss/typography@0.5` (critical for prose styling — see 11.11)
- [ ] Use `postcss.config.mjs` with `tailwindcss: {}` and `autoprefixer: {}`
- [ ] Use `@tailwind base/components/utilities` and `@layer` in globals.css
- [ ] Configure brand colors in `tailwind.config.ts` `theme.extend.colors.brand`
- [ ] Use client's actual logo image in Header (not text — see 11.13)
- [ ] Add logo image domain to `next.config.ts` `images.domains`
- [ ] Remove `target="_blank"` from all main-site links (see 11.12)
- [ ] Match Property Pros component structure exactly (see 11.14)
- [ ] Install `dotenv` and use lazy API client init (see 11.15)
- [ ] Configure multi-station weather if client covers a metro area (see 11.16)
- [ ] Set git user.name and user.email before first commit
- [ ] Customize all files per Section 7 checklist
- [ ] Verify build passes locally: `npx next build`
- [ ] Commit and push

### Deploy
- [ ] Import repo in Vercel
- [ ] Set Framework Preset to **Next.js** in Vercel settings
- [ ] Add all 8 required environment variables (see Section 3.2)
- [ ] Use shared fine-grained GitHub PAT with Contents: R/W (see 2.3, 11.17)
- [ ] Test PAT with curl before deploying (see 11.17)
- [ ] Add custom domain (blog.clientsite.com)
- [ ] Configure DNS CNAME → cname.vercel-dns.com
- [ ] Verify deployment succeeds
- [ ] Test cron endpoint with curl — verify JSON response (see 11.18)
- [ ] Confirm blog post appears on live site after cron push

### Post-Deploy
- [ ] Add blog property in Google Search Console
- [ ] Submit sitemap: blog.clientsite.com/sitemap.xml
- [ ] (Optional) Set up Google Indexing API
- [ ] Add "Blog" link to client's main site navigation
- [ ] Generate 12-month content calendar
- [ ] Store crawl data, calendar, and SOPs in `docs/` folder
