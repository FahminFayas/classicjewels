# Working on classicjewels.ae

Astro 7 static site for Classic Jewels & Diamonds (four jewellery branches in Dubai, Sharjah and Abu Dhabi, part of the Classic Group). Read `README.md` first, then `docs/design-system-v2.md` (Night vitrine) for the design system, components and page compositions. It supersedes the visual rules of `docs/design-spec.md`, which still holds the URL and SEO contract.

## Conventions that matter

- **Facts in one place.** Phones, addresses, branches, hours, promises, the Google rating: `src/data/site.ts`. Never type a phone number or address into a page. Branch hours come from each listing on Google (`hours.source`) and are captioned as such until `hours.confirmed`.
- **Owner decisions (15 October 2026).** Plum is never a background, only the accent on light grounds; rate figures roll digit by digit on a change and never crossfade; hours are shown with their Google source; the home hero switches pieces with a dim-and-light, never a crossfade. See `docs/design-system-v2.md` §0.
- **Content is data.** Pieces, collections, categories, occasions, offers, articles and FAQs are files under `src/content/`, validated by `src/content.config.ts`. Add content there, not in components. `docs/content-guide.md` explains each field.
- **Tokens only.** No raw colours, font sizes or spacing in component CSS; use the custom properties in `src/styles/tokens.css` and the per-tone variables `base.css` derives from them (`--fg`, `--body`, `--accent`, `--btn-*` …). Every section declares one tone (`<Section tone>`, `data-tone`); components never branch on it. Radius is 0; no shadows; no transforms on images, cards or buttons; gradients only as `mask-image` alpha ramps; motion only as `docs/design-system-v2.md` §3.8 allows (inside `prefers-reduced-motion: no-preference`, static state finished). Scroll-driven animations write `animation-timeline: var(--tl-view)` (or `var(--tl-scroll)`), never a literal `view()`: the minifier folds a literal into the `animation` shorthand and the effect dies in the build (`npm run audit` catches it).
- **Routes from `src/lib/routes.ts`.** Never hard-code an internal path; never link to `#`.
- **SEO per page.** One `<h1>`; `title` (≤ 60, no brand suffix) and `description` (70–160) passed to `BaseLayout`, with `ground` set to the tone family of the first section (`stage` or `ivory`); `<Breadcrumbs>` on every non-home page; JSON-LD through the builders in `src/lib/schema.ts` (no `FAQPage`, no fabricated prices or ratings).
- **Images through `astro:assets`.** `<Picture formats={['avif','webp']}>` with widths filtered to the source width; never drawn wider than the source. Velvet photographs only via `<StageImage>` on the stage, studio cut-outs only via `<Plate>` (the image's `ground` field says which); one `priority` image per page. `fit`/`position` values are sharp keywords, never percentages.
- **Copy voice.** A jeweller across the counter: specific, plain, British English. No "Welcome to", "Discover", "Elevate", "timeless", "luxury", "exquisite", em dashes, emoji, invented hours, prices or statistics. Unconfirmed store facts are phrased generically; see the `TODO(owner)` markers and `docs/launch-checklist.md`.
- **Astro 7 strictness.** Close every tag, no block inside `<p>`, no nested `<a>`, `import { z } from 'astro/zod'`, don't pass `layout` together with `densities` to `<Image>`.

## Commands

```bash
npm run dev          # dev server (gold-rate feed is proxied to the live host)
npm run check        # astro check: run before every commit
npm run validate     # check + lint + format check + functions check (CI)
npm run build        # production build to dist/
npm run audit        # after a build: no inline scripts, one h1, links, JSON-LD, banned copy
npm run rates:snapshot
npm run fonts:subset # re-subset the self-hosted fonts (stop the dev server first; budget 90 KB)
npm run audit:design -- / /gold-rate/   # headless Chrome audit at 1440 and 390, shots in .shots/
npm run lighthouse   # Lighthouse mobile on the key pages (needs Chrome; builds must exist)
```

Use `astro dev --background` when a dev server must keep running across commands (`astro dev stop` / `status` / `logs` to manage it). Builds and the dev server lock files under `src/assets/`; stop the server before running the asset scripts.

## Where things are

- Layout and chrome: `src/layouts/BaseLayout.astro`, `src/components/layout/`
- Page sections: `src/components/sections/`; primitives: `src/components/ui/`
- Design system: `docs/design-system-v2.md`; tokens `src/styles/tokens.css`, global patterns `src/styles/base.css`, shared types `src/lib/tones.ts`
- Client scripts (the only JS, bundled, no inline scripts, 15 KB per page at most): `src/scripts/` (`nav.ts`, `rate.ts`, `karat.ts`, `motion.ts`, `piece-morph.ts`, `hero.ts`, `estimator.ts`, `form.ts`, `filter.ts`, `open-now.ts`); the digit roll is `src/lib/roll.ts`; branch hours are read only through `src/lib/hours.ts`
- Hosting: Cloudflare Pages (`wrangler.toml`, `functions/`, `.github/workflows/deploy.yml`), see `docs/deployment.md` and `docs/hosting-decision.md`; the Apache path (`public/.htaccess`, `public/api/contact.php`) still works
- Design prototypes live in `docs/design/prototypes/` (reference only; never under `public/`)
- Gold rate pipeline: `src/lib/gold-rate.ts`, `src/lib/rates.ts`, `scripts/snapshot-rate.mjs`, `.github/workflows/rates.yml`
- Server files: `public/.htaccess` (Apache), `public/_headers` + `_redirects` (Netlify/Cloudflare), `public/api/contact.php`
- Research behind the copy: `docs/research/`
