# classicjewels.ae

The website of Classic Jewels & Diamonds: 22K and 18K gold jewellery, certified diamonds and gold coins and bars, sold from four branches in Dubai, Sharjah and Abu Dhabi. Built as a static site with [Astro 7](https://docs.astro.build), TypeScript and plain CSS. No framework, no CSS library, no third-party scripts unless the owner turns on tracking.

The site is enquiry-led: there is no cart. Every piece, collection, offer and store page converts through WhatsApp links with a pre-filled message, the landline, or the contact form. The daily Dubai gold rate is baked into every page at build time and refreshed in the browser.

## Quick start

```bash
npm install
npm run dev
```

Opens `http://localhost:4321/`. In development the gold-rate feed is proxied to the live host, so the rate board works without PHP.

| Command                       | What it does                                                                                                                      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                 | Dev server with hot reload                                                                                                        |
| `npm run build`               | Production build to `dist/`                                                                                                       |
| `npm run preview`             | Serve `dist/` locally                                                                                                             |
| `npm run check`               | Type-check pages, components and content                                                                                          |
| `npm run lint` / `format`     | ESLint / Prettier                                                                                                                 |
| `npm run validate`            | check + lint + format check (what CI runs)                                                                                        |
| `npm run audit`               | After a build: one h1, title and description lengths, canonicals, broken links, alt text, JSON-LD, no inline scripts, banned copy |
| `npm run rates:snapshot`      | Fetch today's gold rate into `src/content/rates/`                                                                                 |
| `npm run assets:fetch-legacy` | Pull photography and logos from the previous site                                                                                 |
| `npm run assets:placeholders` | Generate stand-in images for any missing asset path                                                                               |
| `npm run assets:brand`        | Regenerate favicons, app icons and the default share image                                                                        |
| `npm run lighthouse`          | Lighthouse (mobile) reports for the key pages, into `./lighthouse/`                                                               |

Requires Node 22 (`.nvmrc`).

## How it is organised

```
src/
  data/site.ts          Brand, group, branches, contact, promises: the single source of truth
  content/              Editable content, validated by src/content.config.ts
    products/           One Markdown file per piece
    collections/        The twelve design collections
    categories/         Product types (necklaces, rings, coins & bars …)
    occasions/          Wedding, anniversary, birthday, festivals
    offers/             Campaign offers with start and end dates (expired ones are not built)
    journal/            Articles
    faqs/               Question groups, one JSON file per page
    rates/              Daily gold-rate snapshots (written by the snapshot script)
  pages/                One file per route; dynamic routes read the content collections
  layouts/BaseLayout.astro
  components/
    layout/             Utility strip, header (mega nav + drawer), footer, mobile action bar
    sections/           Hero, rate board, tray grid, product card, ledger, FAQ, enquiry block …
    ui/                 Button, Eyebrow, Icon, Logo, Plate, Breadcrumbs, SectionHead
    seo/                <Seo>, <JsonLd>, <Analytics>
  lib/                  routes, content queries, schema.org builders, gold-rate parsing, formatting
  scripts/              The only client-side JavaScript: nav.ts, rate.ts, form.ts, filter.ts
  styles/               tokens.css (design tokens) and base.css (reset, typography, utilities)
public/                 robots.txt, .htaccess (Apache), _headers/_redirects (Netlify), icons, api/contact.php
scripts/                Node maintenance scripts (assets, rates, lighthouse)
docs/                   Design spec, content guide, deployment, launch checklist, research
```

Three rules keep it maintainable:

1. **Facts live in one place.** Phone numbers, addresses, hours, branches, the six promises and the Google rating are in `src/data/site.ts`. Pages, footer and structured data read from it.
2. **Content is data.** Pieces, collections and articles are files under `src/content/` with a typed schema. A wrong field fails the build with the file name and line. See `docs/content-guide.md`.
3. **Design is tokens.** Colours, type scale, spacing and motion are custom properties in `src/styles/tokens.css`. Components only reference tokens. The reasoning is in `docs/design-spec.md`.

## SEO and performance, by construction

- One `<h1>` per page, unique `<title>` (≤ 60 chars) and description (≤ 160) passed to `BaseLayout`, self-canonical, Open Graph and Twitter cards, `robots` meta per page.
- JSON-LD on every page: `Organization`, `WebSite` and the flagship `JewelryStore`; one `JewelryStore` per branch on the store pages; `BreadcrumbList`, `ItemList`, `Product` (without price, by design) and `Article` where relevant. Builders are typed in `src/lib/schema.ts`.
- `sitemap-index.xml` generated at build, referenced from `robots.txt`. Legacy URLs are redirected in `.htaccess` and `_redirects`.
- Images go through `astro:assets`: AVIF and WebP, responsive widths, explicit dimensions (no layout shift), lazy-loaded below the fold. Product photos are only ever shown on a white plate.
- Two self-hosted variable fonts with metric-matched fallbacks; preloaded.
- Under 10 KB of JavaScript on any page. The rate board is server-rendered and only patched in place when the feed reports a newer value.
- Security headers, caching and compression in `public/.htaccess` (and `_headers` for Netlify/Cloudflare). The build never inlines scripts, so the Content-Security-Policy can stay strict; `npm run audit` fails if one ever appears. CI runs the audit and Lighthouse on every push (thresholds in `lighthouserc.json`).

## The gold rate

`src/lib/gold-rate.ts` parses the feed at `/gold-rates.php` (the store's rate subscription, served from the production host). At build time `src/lib/rates.ts` takes the newest snapshot in `src/content/rates/` or the live feed, whichever is newer, and bakes it into the utility strip, the proof strip, the rate board and product gold-value lines. In the browser `src/scripts/rate.ts` fetches the same endpoint once the page is idle and replaces the figures if they changed.

`.github/workflows/rates.yml` runs the snapshot three times a day and commits the file, which triggers a rebuild on hosts that deploy from git. Keep the feed on the same origin as the site, or set `PUBLIC_GOLD_RATE_ENDPOINT` to a same-origin proxy: the feed has no CORS headers.

## Tracking

Nothing loads until `PUBLIC_GTM_ID` is set. Then `src/components/seo/Analytics.astro` loads Google Tag Manager as a bundled module (no inline script, so the Content-Security-Policy stays strict). Configure GA4, Meta Pixel and TikTok Pixel inside the container and update the privacy policy.

## Deploying

See `docs/deployment.md`. In short: `npm run build`, upload `dist/` to the Apache web root (the `.htaccess` comes with it), keep `gold-rates.php` where it is, and set the recipient address in `public/api/contact.php`.

Before the first launch, work through `docs/launch-checklist.md`; it lists every fact the owner still has to confirm.
