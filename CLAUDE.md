# Working on classicjewels.ae

Astro 7 static site for Classic Jewels & Diamonds (four jewellery branches in Dubai, Sharjah and Abu Dhabi, part of the Classic Group). Read `README.md` first, then `docs/design-spec.md` for the design system and page compositions.

## Conventions that matter

- **Facts in one place.** Phones, addresses, branches, hours, promises, the Google rating: `src/data/site.ts`. Never type a phone number or address into a page.
- **Content is data.** Pieces, collections, categories, occasions, offers, articles and FAQs are files under `src/content/`, validated by `src/content.config.ts`. Add content there, not in components. `docs/content-guide.md` explains each field.
- **Tokens only.** No raw colours, font sizes or spacing in component CSS; use the custom properties in `src/styles/tokens.css`. Radius is 0, there are no shadows, no hover transforms, no gradients.
- **Routes from `src/lib/routes.ts`.** Never hard-code an internal path; never link to `#`.
- **SEO per page.** One `<h1>`; `title` (≤ 60, no brand suffix) and `description` (70–160) passed to `BaseLayout`; `<Breadcrumbs>` on every non-home page; JSON-LD through the builders in `src/lib/schema.ts` (no `FAQPage`, no fabricated prices or ratings).
- **Images through `astro:assets`.** `<Picture formats={['avif','webp']}>` with widths filtered to the source width (see `CategoryTile.astro`); product photos only via `<Plate>`/`<ProductCard>`; one `priority` image per page. `fit`/`position` values are sharp keywords, never percentages.
- **Copy voice.** A jeweller across the counter: specific, plain, British English. No "Welcome to", "Discover", "Elevate", "timeless elegance", em dashes, emoji, invented hours, prices or statistics. Unconfirmed store facts are phrased generically; see the `TODO(owner)` markers and `docs/launch-checklist.md`.
- **Astro 7 strictness.** Close every tag, no block inside `<p>`, no nested `<a>`, `import { z } from 'astro/zod'`, don't pass `layout` together with `densities` to `<Image>`.

## Commands

```bash
npm run dev          # dev server (gold-rate feed is proxied to the live host)
npm run check        # astro check: run before every commit
npm run validate     # check + lint + format check (CI)
npm run build        # production build to dist/
npm run rates:snapshot
```

Use `astro dev --background` when a dev server must keep running across commands (`astro dev stop` / `status` / `logs` to manage it). Builds and the dev server lock files under `src/assets/`; stop the server before running the asset scripts.

## Where things are

- Layout and chrome: `src/layouts/BaseLayout.astro`, `src/components/layout/`
- Page sections: `src/components/sections/`; primitives: `src/components/ui/`
- Client scripts (the only JS): `src/scripts/` (`nav.ts`, `rate.ts`, `form.ts`, `filter.ts`)
- Gold rate pipeline: `src/lib/gold-rate.ts`, `src/lib/rates.ts`, `scripts/snapshot-rate.mjs`, `.github/workflows/rates.yml`
- Server files: `public/.htaccess` (Apache), `public/_headers` + `_redirects` (Netlify/Cloudflare), `public/api/contact.php`
- Research behind the copy: `docs/research/`
