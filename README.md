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
| `npm run validate`            | check + lint + format check + functions check (what CI runs)                                                                      |
| `npm run audit`               | After a build: one h1, title and description lengths, canonicals, broken links, alt text, JSON-LD, no inline scripts, banned copy |
| `npm run audit:design`        | Headless Chrome at 1440 x 900 and 390 x 844: height, words, H1 count, overflow, upscaled images, contrast; shots in `.shots/`     |
| `npm run lighthouse`          | Lighthouse (mobile) reports for the key pages, into `./lighthouse/`                                                               |
| `npm run rates:snapshot`      | Fetch today's gold rate into `src/content/rates/`                                                                                 |
| `npm run fonts:subset`        | Re-subset the three self-hosted font files to the glyphs the site uses (stop the dev server first)                                |
| `npm run assets:fetch-legacy` | Pull photography and logos from the previous site                                                                                 |
| `npm run assets:placeholders` | Generate stand-in images for any missing asset path                                                                               |
| `npm run assets:brand`        | Regenerate favicon, app icons, manifest and the default share image from the traced mark; `assets:brand:check` reports fidelity   |
| `npm run functions:check`     | Type-check the Cloudflare Pages functions in `functions/`                                                                         |
| `npm run pages:dev`           | Serve `dist/` with the functions locally through Wrangler (port 8788)                                                             |
| `npm run pages:deploy`        | Upload `dist/` to Cloudflare Pages by hand, after pruning the Apache-only files (CI does this on push)                            |

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
    layout/             Header with the rate chip, mega panel and drawer; footer; phone action bar
    home/               HomeHero (the rate and the lit piece) and FactStrip
    sections/           Rate instrument, karat stamps, estimator, case wall, styles line, doors, FAQ …
    ui/                 Section, PageHead, SectionHead, StageImage, Plate, Button, Icon, Breadcrumbs …
    seo/                <Seo>, <JsonLd>, <Analytics>
  lib/                  routes, content queries, schema.org builders, gold-rate parsing, hours, formatting
  scripts/              The only client-side JavaScript: nav, rate, karat, motion, piece-morph, hero,
                        estimator, filter, form, open-now (bundled; no inline scripts)
  styles/               tokens.css (design tokens) and base.css (tones, type, global patterns)
public/                 robots.txt, .htaccess (Apache), _headers/_redirects (Cloudflare/Netlify), icons, api/contact.php
functions/              Cloudflare Pages functions: the rate-feed proxy and the contact endpoint
scripts/                Node maintenance scripts (assets, rates, fonts, audits, lighthouse)
docs/                   Design system v2, content guide, deployment, hosting decision, launch checklist, research
```

Three rules keep it maintainable:

1. **Facts live in one place.** Phone numbers, addresses, hours, branches, the six promises and the Google rating are in `src/data/site.ts`. Pages, footer and structured data read from it.
2. **Content is data.** Pieces, collections and articles are files under `src/content/` with a typed schema. A wrong field fails the build with the file name and line. See `docs/content-guide.md`.
3. **Design is tokens.** Colours, type scale, spacing and motion are custom properties in `src/styles/tokens.css`. Components only reference tokens, through the per-tone variables that `base.css` derives (`--fg`, `--accent`, `--btn-*` …). The design system is `docs/design-system-v2.md` ("Night vitrine"); `docs/design-spec.md` keeps the URL and SEO contract.

## SEO and performance, by construction

- One `<h1>` per page, unique `<title>` (≤ 60 chars) and description (≤ 160) passed to `BaseLayout`, self-canonical, Open Graph and Twitter cards, `robots` meta per page.
- JSON-LD on every page: `Organization`, `WebSite` and the flagship `JewelryStore`; one `JewelryStore` per branch on the store pages; `BreadcrumbList`, `ItemList`, `Product` (without price, by design) and `Article` where relevant. Builders are typed in `src/lib/schema.ts`.
- `sitemap-index.xml` generated at build, referenced from `robots.txt`. Legacy URLs are redirected in `.htaccess` and `_redirects`.
- Images go through `astro:assets`: AVIF and WebP, responsive widths, explicit dimensions (no layout shift), lazy-loaded below the fold, never drawn wider than their source. Velvet photographs sit on the dark stage inside a pool of light (`StageImage`); studio cut-outs on their own lilac plate (`Plate`).
- Two self-hosted variable fonts (Cormorant Garamond with its italic, IBM Plex Sans), subset to 90 KB with metric-matched fallbacks; only the roman is preloaded.
- Under 15 KB of JavaScript on any page (measured from `dist/` in `docs/launch-checklist.md`). The rate is real text baked at build; when the feed reports a newer value the changed digits roll in place.
- Security headers, caching and compression in `public/.htaccess` (and `_headers` for Netlify/Cloudflare). The build never inlines scripts, so the Content-Security-Policy can stay strict; `npm run audit` fails if one ever appears. CI runs the audit and Lighthouse on every push (thresholds in `lighthouserc.json`).

## The gold rate

`src/lib/gold-rate.ts` parses the feed at `/gold-rates.php` (the store's rate subscription, served from the production host). At build time `src/lib/rates.ts` takes the newest snapshot in `src/content/rates/` or the live feed, whichever is newer, and bakes it into the header chip, the hero instrument, the karat stamps, the estimator, the footer and the product cards. In the browser `src/scripts/rate.ts` fetches the same endpoint once the page is idle and rolls the changed digits if the posting is newer; it never simulates a change.

`.github/workflows/rates.yml` runs the snapshot three times a day and commits the file, which triggers a rebuild on hosts that deploy from git. Keep the feed on the same origin as the site, or set `PUBLIC_GOLD_RATE_ENDPOINT` to a same-origin proxy: the feed has no CORS headers.

## Tracking

Nothing loads until `PUBLIC_GTM_ID` is set. Then `src/components/seo/Analytics.astro` loads Google Tag Manager as a bundled module (no inline script, so the Content-Security-Policy stays strict). Configure GA4, Meta Pixel and TikTok Pixel inside the container and update the privacy policy.

## Deploying

Two hosts are supported; the steps are in `docs/deployment.md` and the comparison with sources in `docs/hosting-decision.md`.

- **Cloudflare Pages** (recommended): `.github/workflows/deploy.yml` builds, audits and uploads `dist/` on every push to `main` and after every gold-rate snapshot. `functions/` serves the two paths that are not static files on the site's own origin: `/gold-rates.php` fetches the PHP feed from the old host with a five-minute edge cache, and `/api/contact.php` takes the form with the same rules as the PHP endpoint and emails it through Resend. `wrangler.toml` holds the project settings. One-time setup: the Pages project, two GitHub secrets, one Pages secret, the feed subdomain and DNS.
- **The Apache/PHP host**: `npm run build`, upload `dist/` to the web root (the `.htaccess` comes with it), keep `gold-rates.php` where it is, and set the recipient address in `public/api/contact.php`.

Before the first launch, work through `docs/launch-checklist.md`; it lists every fact the owner still has to confirm.
