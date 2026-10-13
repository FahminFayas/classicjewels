# Astro 7 technical notes for this build

> Verified against node_modules/astro 7.3.8 and docs.astro.build on 13 October 2026. Read this before touching astro.config.mjs, fonts, images or content collections.

## Summary

Astro 7.3.8 research for the Classic Jewels rebuild, verified against node_modules/astro/dist (7.3.8), docs.astro.build, npm registry (2026-10-13) and a live probe of https://classicjewels.ae/gold-rates.php. Everything required by the brief is supported natively: top-level stable `fonts` API (since 6.0) with `<Font>` from 'astro:assets' emitting self-hosted @font-face + :root variable + optional preload links; responsive `<Image>/<Picture>` with `layout`/`priority` and CSP-safe `data-astro-image*` attributes plus `@layer astro.images` CSS when `image.responsiveStyles: true`; content layer collections (`src/content.config.ts`, `glob()`/`file()` from 'astro/loaders', `z` from 'astro/zod' = Zod 4, `image()` helper, `reference()`, `getEntries()`, `render()`); `astro:env` with `envField` defaults; `@astrojs/sitemap` 3.7.4; `vite.server.proxy` passes straight through to Vite 8. Critical compatibility findings: (a) TypeScript latest is 7.0.2 (Go port) and is NOT accepted by @astrojs/check (^5||^6) or typescript-eslint (<6.1) → pin typescript@5.9.3; (b) eslint-plugin-astro 3.2.1 requires ESLint 10 and Node ^22.22.3||^24.16.0 — the machine runs Node v22.17.0, so upgrade Node (22.23.3 or 24.21.0) before adding lint; (c) the gold-rate feed returns JSON with Content-Type text/html and NO CORS headers (OPTIONS → 406), so the browser widget only works same-origin or via a proxy; the Vite proxy covers dev only, and production needs a host-level proxy/function or a build-time fetch. Astro 7 vs 5 traps: Rust compiler (unclosed tags/invalid nesting are build errors), `compressHTML: 'jsx'` default strips inter-element whitespace, Sätteri replaces remark/rehype by default, `src/fetch.ts` is reserved, `Astro.glob()`/`output:'hybrid'`/legacy collections/`<ViewTransitions>` are gone, `z` from 'astro:content' is deprecated, `import.meta.env` is never coerced, endpoints like robots.txt.ts cannot have trailing slashes even with trailingSlash:'always'.

## Recommendations

- Before adding lint tooling, upgrade Node to 22.23.3 (or 24.21.0 LTS) and add .nvmrc + package.json engines >=22.22.3; eslint-plugin-astro 3.2.1 will not run reliably on the installed v22.17.0.
- Pin typescript@~5.9.3 (not 7.0.2) so @astrojs/check 0.9.10 and typescript-eslint 8.71.2 both resolve; run `astro check && astro build` as the build script.
- Use `fontProviders.local()` with woff2 files resolved from @fontsource-variable/bodoni-moda and @fontsource-variable/ibm-plex-sans package specifiers (latin wght normal+italic only) — zero network at build, self-hosted at /_astro/fonts/, metric-matched fallbacks generated automatically; place `<Font cssVariable="--font-display" preload={[{ weight: '400 900', style: 'normal' }]} />` and `<Font cssVariable="--font-text" />` in BaseHead; preload only the display regular face.
- Set image: { service: sharpImageService({ avif:{quality:55}, webp:{quality:78} }), layout: 'constrained', objectFit: 'cover', responsiveStyles: true } and use <Picture formats={['avif','webp']}> with explicit `sizes` for grids; add `priority` to exactly one hero image per page; declare `aspect-ratio` in component CSS for CLS 0; the existing 600×600 product JPGs cannot be upscaled, so render them ≤300 CSS px in grids and request originals for hero/PDP.
- Model content as: categories (single YAML via file()), collections + occasions (Markdown via glob), products (JSON via glob with co-located images and image() schema), journal (Markdown); reference() between them; typo-proof with z.enum (karat, metal) so 'Annivesary'-style errors cannot recur.
- Set trailingSlash:'always' + build.format:'directory'; build canonical as new URL(Astro.url.pathname, Astro.site); generate robots.txt from src/pages/robots.txt.ts using `site`; configure sitemap({ filter, serialize }) and omit changefreq/priority; keep every noindex/thank-you page out via filter.
- Decide the production path for /gold-rates.php now: the feed has no CORS and text/html content-type, so ship a build-time snapshot rendered in HTML plus a same-origin client refresh behind a host-level proxy/function; treat the Vite proxy as dev-only.
- Keep compressHTML at the v7 'jsx' default only if the team accepts {' '} discipline for inline runs; otherwise set compressHTML: true (lossless) to avoid lost spaces in rich copy.
- Use `import { z } from 'astro/zod'` everywhere (Zod 4 API: z.email(), { error }), never 'astro:content'; never create src/fetch.ts for anything but advanced routing; close every tag and never nest block elements inside <p> (Rust compiler errors / no auto-repair).
- Store brand constants (address, phones, socials, trust promises, hours, Google Maps link, the conflicting emails flagged for owner confirmation) in a typed src/data/site.ts; reserve astro:env for deploy-varying values (endpoints, analytics id, form endpoint).

## Findings

### 1. astro.config.mjs — copy-pasteable baseline

_Confidence: high_

// astro.config.mjs
// @ts-check
import { defineConfig, fontProviders, sharpImageService, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

export default defineConfig({
site: 'https://classicjewels.ae', // z.string().url() — must include scheme; used by sitemap, Astro.site, import.meta.env.SITE
output: 'static', // default; 'hybrid' now throws (removed)
trailingSlash: 'always', // pair with build.format 'directory' (docs: directory => 'always')
build: {
format: 'directory', // default: /about/index.html; Astro.url.pathname has trailing slash in dev+build
inlineStylesheets: 'auto', // default: <style> inlined when < vite build.assetsInlineLimit (4 kB), else external
assets: '_astro', // default hashed asset dir (also fonts: /_astro/fonts/)
},
compressHTML: 'jsx', // v7 default. Alternatives: true (lossless whitespace removal, v6 behaviour) | false
image: {
service: sharpImageService({ // === { entrypoint: 'astro/assets/services/sharp', config: {...} }
avif: { quality: 55, effort: 4 }, // sharp AvifOptions; component `quality` prop overrides per image
webp: { quality: 78 }, // sharp WebpOptions
jpeg: { quality: 80, mozjpeg: true },
// kernel?: 'lanczos3' | ...; limitInputPixels?: number; png?: PngOptions
}),
layout: 'constrained', // default layout for every <Image>/<Picture>; 'fixed' | 'full-width' | 'none'
objectFit: 'cover', // default fit when layout != none
objectPosition: 'center',
responsiveStyles: true, // injects @layer astro.images CSS (no inline styles) and swaps in ResponsiveImage/ResponsivePicture
// breakpoints: [640, 750, 828, 1080, 1280, 1668, 2048, 2560], // default list for the local sharp service (LIMITED_RESOLUTIONS)
// domains: [], remotePatterns: [], // only needed to optimise remote images
// dangerouslyProcessSVG: false,
},
fonts: [ /* see finding 2 _/ ],
env: { schema: { /_ see finding 6 _/ } },
integrations: [sitemap({ /_ see finding 5 */ })],
vite: {
server: {
proxy: {
'/gold-rates.php': {
target: 'https://classicjewels.ae',
changeOrigin: true, // sets Host header to target
secure: true,
headers: { 'User-Agent': BROWSER_UA, Accept: 'application/json' },
// rewrite: (p) => p, bypass, configure(proxy, options), proxyTimeout, followRedirects also available (Vite ProxyOptions = http-proxy ServerOptions)
},
},
},
},
// experimental: { svgOptimizer: svgoOptimizer() }, // optional, import { svgoOptimizer } from 'astro/config'
// experimental: { incrementalBuild: true }, // 7.2+, needs cacheKey from getStaticPaths; not needed for this size
});

Schema facts (dist/core/config/schemas/base.js + defaults.js): compressHTML default 'jsx'; trailingSlash default 'ignore'; build.format default 'directory'; build.concurrency default 1; scopedStyleStrategy default 'attribute' (scoped selectors become `.x[data-astro-cid-xxxxxxxx]`, +1 attribute specificity — write tokens/global CSS with this in mind; 'where' gives zero added specificity); image.service default sharp; image.responsiveStyles default false; image.endpoint.route '/_image' (dev only); security.csp default false; legacy.collectionsBackwardsCompat default false; fetchFile default 'fetch' (set to null if you ever want a non-routing src/fetch.ts); prerenderConflictBehavior 'warn'. Astro does not touch `vite.server.proxy` (no references in dist/core/create-vite.js) — Vite handles it natively in `astro dev`; it has no effect in `astro build`/`astro preview`.

Sources: node_modules/astro/dist/core/config/schemas/base.js, defaults.js; dist/types/public/config.d.ts; dist/config/entrypoint.js; node_modules/vite/dist/node/index.d.ts (ProxyOptions / ServerOptions$3 lines 593-800)

### 1b. Gold-rate feed probe and production architecture

_Confidence: high_

Live probe 2026-10-13 (curl): GET https://classicjewels.ae/gold-rates.php → HTTP 200 both with a Chrome UA and with curl's default UA; body {"msg":"Subscription Valid","gold_rate_date":"2026-10-13","gold_rate_24k":"505.75","gold_rate_22k":"468.25","gold_rate_21k":"449.00","gold_rate_18k":"384.75","gold_rate_14k":"300.25"}; response headers: Server: Apache, Content-Type: text/html; charset=UTF-8 (NOT application/json), no Access-Control-Allow-Origin, no Cache-Control; OPTIONS preflight → 406 Not Acceptable. Consequences: (1) browser fetch from any other origin (localhost:4321 included) is blocked by CORS → the Vite dev proxy above is required; (2) `fetch()` in Astro frontmatter at build time works fine (server-side, no CORS) → a build-time snapshot of the rate (with date) is the robust default; (3) in production the client widget can only call the feed same-origin — if the new static site replaces the PHP host there is no /gold-rates.php any more. Options: keep the PHP on a sub-path/subdomain the static host rewrites to (Cloudflare Pages `_redirects` proxy, Netlify `/* 200` rewrite, Vercel rewrites), a 20-line Worker/function that fetches the feed with the browser UA and returns `application/json` + `Cache-Control: public, max-age=300` + `Access-Control-Allow-Origin`, or a scheduled daily rebuild. Parse defensively: `const txt = await res.text(); const data = JSON.parse(txt)` and validate with a zod schema (values are strings; `Number(v)`; unit is AED/gram by inference — confirm with owner). Keep the endpoint path in astro:env `PUBLIC_GOLD_RATE_ENDPOINT` (default '/gold-rates.php').

Sources: curl probe of https://classicjewels.ae/gold-rates.php (headers, body, OPTIONS)

### 2. Fonts API (stable since 6.0) — config, providers, CSS output

_Confidence: high_

Status: `fonts` is a top-level config key (zod FontFamilySchema, docs `@version 6.0.0`); `experimental.fonts` was removed in v6. Strict schema keys: name, cssVariable (must start with --), provider, weights ([Weight,...] string|number, variable range as "400 900"), styles (['normal'|'italic'|'oblique']), subsets, formats (['woff2'|'woff'|'otf'|'ttf'|'eot']), fallbacks (string[]), optimizedFallbacks (bool), display ('auto'|'block'|'swap'|'fallback'|'optional'), stretch, featureSettings, variationSettings, unicodeRange, options (provider-specific). Defaults (dist/assets/fonts/constants.js): weights ['400'], styles ['normal','italic'], subsets ['latin'], formats ['woff2'], fallbacks ['sans-serif'], optimizedFallbacks true, font-display 'swap'.

Providers: `import { fontProviders } from 'astro/config'` → adobe(config), bunny(), fontshare(), fontsource(), google(), googleicons(), local(), npm(options). All providers download at build/dev time (CachedFontFetcher; cache dir node_modules/.astro/fonts for build, .astro/fonts for dev) and emit files to `/_astro/fonts/<hash>.woff2` — so Google/Fontsource fonts are SELF-HOSTED automatically; no third-party request at runtime. `fontsource()`: looks up api.fontsource.org; family name is the plain name ("Bodoni Moda", "IBM Plex Sans"); a trailing " Variable" is retried without it (#18143); a weight range such as "400 900" makes unifont pick the variable file https://cdn.jsdelivr.net/fontsource/fonts/<id>:vf@latest/<subset>-wght-<style>.woff2 (axis slug 'wght' when only wght/ital axes are used, 'standard' when opsz/wdth/slnt are also present, 'full' for custom axes like Fraunces SOFT/WONK). `npm()`: parses node_modules/@fontsource-variable/<slug>/index.css locally but rewrites file URLs to cdn.jsdelivr.net/npm/<pkg>@<version>/ → still needs network at first build. `local()`: zero network; `src` entries can be a project-root-relative path ('./src/assets/fonts/x.woff2') OR a bare package specifier resolved with require.resolve (e.g. '@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-wght-normal.woff2' — the Fontsource `exports` map allows './files/*.woff2'); weight/style are inferred from the first src via fontace when omitted.

Recommended config (2 families, variable, latin only, no network beyond npm install):
fonts: [
{
provider: fontProviders.local(),
name: 'Bodoni Moda',
cssVariable: '--font-display',
fallbacks: ['Didot', 'Times New Roman', 'serif'], // last generic → metric-matched fallback faces generated
options: { variants: [
{ src: ['@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-wght-normal.woff2'], weight: '400 900', style: 'normal' },
{ src: ['@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-wght-italic.woff2'], weight: '400 900', style: 'italic' },
] },
},
{
provider: fontProviders.local(),
name: 'IBM Plex Sans',
cssVariable: '--font-text',
fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
options: { variants: [
{ src: ['@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2'], weight: '100 700', style: 'normal' },
{ src: ['@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-italic.woff2'], weight: '100 700', style: 'italic' },
] },
},
]
Equivalent with the registry provider: { provider: fontProviders.fontsource(), name: 'Bodoni Moda', cssVariable: '--font-display', weights: ['400 900'], styles: ['normal','italic'], subsets: ['latin'], fallbacks: ['serif'] }.

Component: `import { Font } from 'astro:assets'` → `<Font cssVariable="--font-display" preload={[{ weight: '400 900', style: 'normal', subset: 'latin' }]} />` and `<Font cssVariable="--font-text" />` inside <head> (BaseHead.astro). `preload` is boolean | Array<{weight?, style?, subset?}>; a single weight matches a variable range (filter-preloads.js). Throws AstroError FontFamilyNotFound if the cssVariable is not in config. `CssVariable` type is generated in .astro/fonts.d.ts after `astro sync`.

Emitted HTML (minified in build): `<style>@font-face{font-family:"Bodoni Moda-<hash>";src:url("/_astro/fonts/<hash>.woff2") format("woff2");font-display:swap;unicode-range:…;font-weight:400 900;font-style:normal}@font-face{font-family:"Bodoni Moda-<hash> fallback: Times New Roman";src:local("Times New Roman");size-adjust:…;ascent-override:…;descent-override:…;line-gap-override:…}:root{--font-display:"Bodoni Moda-<hash>","Bodoni Moda-<hash> fallback: Times New Roman",…,serif}</style>` plus one `<link rel="preload" href="/_astro/fonts/<hash>.woff2" as="font" type="font/woff2" crossorigin>` per preloaded file. The internal family name is `${name}-${hash}` (resolve-family.js) — never hard-code it; always use `font-family: var(--font-display)` in CSS. Fallback metric faces are generated only when the LAST fallback is a generic family (serif/sans-serif/…) and optimizedFallbacks is true; set `fallbacks: []` to disable.

Sources: node_modules/astro/dist/assets/fonts/{config.js,constants.js,types.d.ts,providers/index.js,providers/local.{js,d.ts},core/collect-component-data.js,core/optimize-fallbacks.js,core/filter-preloads.js,core/resolve-family.js,infra/minifiable-css-renderer.js,utils.js}; components/Font.astro; node_modules/unifont/dist/index.mjs (fontsource + npm providers); https://docs.astro.build/en/guides/fonts/

### 3. astro:assets <Image>/<Picture> — props, output, collections

_Confidence: high_

Imports: `import { Image, Picture, Font, getImage, imageConfig, inferRemoteSize, getConfiguredImageService } from 'astro:assets'; import type { LocalImageProps, RemoteImageProps } from 'astro:assets'; import type { ImageMetadata } from 'astro';`

Props (dist/assets/types.d.ts; identical for Image and Picture): src (ImageMetadata | Promise<{default: ImageMetadata}> | string — remote/public strings need width+height or inferSize), alt (required; '' for decorative; missing → AstroError ImageMissingAlt), width/height (number | `${number}`), format ('avif'|'png'|'webp'|'jpeg'|'jpg'|'svg'; default webp; svg sources stay svg unless image.dangerouslyProcessSVG), quality ('low'=25|'mid'=50|'high'=80|'max'=100|number 0-100; passed to the sharp encoder), priority (boolean; sets loading="eager" decoding="sync" fetchpriority="high"; otherwise loading="lazy" decoding="async" and fetchpriority omitted; explicit `loading`/`decoding`/`fetchpriority` attributes still win because defaults use ??=), layout ('constrained'|'fixed'|'full-width'|'none'; default image.layout), fit ('fill'|'contain'|'cover'|'none'|'scale-down'; sharp map contain→inside, none→outside, scale-down→inside), position (CSS object-position string, default 'center'), background (flatten colour for alpha→jpeg), widths (number[] → `<w>w` srcset) XOR densities ((number|`${n}x`)[] → `<n>x` srcset; densities is deleted when a layout is active), sizes (string; auto when layout set), inferSize (remote only), plus any <img> attribute (class, id, style, data-*, loading, decoding, fetchpriority, draggable…). Picture-only: formats (ImageOutputFormat[], default ['webp']), fallbackFormat (default png, but jpg/jpeg/gif/svg sources keep their own format), pictureAttributes (HTMLAttributes<'picture'>; note `class` goes on <img>, only the scoped astro-xxxx class is copied to <picture>). Width/height/format/quality/fit/position/background are the hashed props (DEFAULT_HASH_PROPS) → each unique combination is one generated file in dist/_astro/.

Auto srcset rules (dist/assets/layout.js, local sharp service uses LIMITED_RESOLUTIONS [640,750,828,1080,1280,1668,2048,2560]): constrained → [width, 2*width, ...breakpoints].filter(w <= min(2*width, originalWidth)); fixed → [width, min(2*width, originalWidth)]; full-width → all breakpoints <= originalWidth. sizes: constrained `(min-width: {width}px) {width}px, 100vw`; fixed `{width}px`; full-width `100vw`. Sharp resizes with withoutEnlargement:true — NEVER upscales. Practical: the 600×600 product JPGs with width={600} give a single 600w candidate (2x = 1200 > 600); render them at ≤ 300 CSS px in grids (width={300} → 300w + 600w) and pass an explicit `sizes="(min-width: 64rem) 20rem, (min-width: 40rem) 45vw, 92vw"`. The 784×1280 occasion portraits and 1488×962 about image are the only sources large enough for full-width/hero use; request the owner's originals for the hero.

HTML output. `<Image src={img} width={600} alt="…" />` (layout constrained, responsiveStyles true): `<img src="/_astro/x.H4sh.webp" srcset="/_astro/x.H1.webp 300w, /_astro/x.H2.webp 600w" sizes="(min-width: 600px) 600px, 100vw" loading="lazy" decoding="async" width="600" height="600" alt="…" data-astro-image="constrained" data-astro-image-fit="cover" data-astro-image-pos="center">` (7.3.8 emits data attributes, not the `style="--fit;--pos"` the older docs show). `<Picture src={img} formats={['avif','webp']} widths={[400,800]} sizes="…" alt="…" />` → `<picture><source srcset="…400w, …800w" type="image/avif" sizes="…"><source srcset="…" type="image/webp" sizes="…"><img src="/_astro/x.jpg" srcset="…" width height loading decoding alt …></picture>` (fallback jpg for a jpg source). The injected CSS when responsiveStyles:true is `@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image="full-width"]){width:100%}:where([data-astro-image="constrained"]){max-width:100%}[data-astro-image-fit="cover"]{object-fit:cover}…[data-astro-image-pos="center"]{object-position:center}…}` — low-priority layered, CSP-safe, overridable by any unlayered author CSS. Set `aspect-ratio`/`width` on the img in component CSS to guarantee CLS 0 while lazy images load.

Use `priority` on exactly one above-the-fold image per page (hero/LCP) and nothing else. For CSS backgrounds/OG images use `const og = await getImage({ src: img, width: 1200, height: 630, format: 'jpeg', quality: 80 })` → og.src (absolute: new URL(og.src, Astro.site)). getImage() is server-only (throws on client). SVGs: `import Mark from '../assets/mark.svg'` then `<Mark class="logo" aria-hidden="true" />` inlines the SVG as a component (astro/assets/runtime createSvgComponent) — use this for the monogram/logo instead of an <img>.

From content collections: schema `({ image }) => z.object({ hero: image(), gallery: z.array(image()).max(8) })`; JSON/YAML/MD entries give paths relative to the entry file (e.g. "./haram-temple.jpg" next to haram-temple.json); after parsing `entry.data.hero` is an ImageMetadata object → `<Image src={entry.data.hero} … />` or `getImage({ src: entry.data.hero })`. Note `image().refine()` is unsupported. Remote URLs in image() are kept as strings. Keep product photos under src/content/products/<slug>/ (co-located) or src/assets/products/ referenced with relative paths; never in public/ (unoptimised, requires width/height).

Sources: node_modules/astro/dist/assets/{types.d.ts,internal.js,layout.js,consts.js,services/service.js,services/sharp.js,utils/generateImageStylesCSS.js,vite-plugin-assets.js}; components/{Image,Picture}.astro; dist/content/config.d.ts (ImageFunction); https://docs.astro.build/en/reference/modules/astro-assets/

### 4. Content collections (content layer) — config, loaders, APIs

_Confidence: high_

Config file: src/content.config.ts (also .js/.mjs/.mts; src/content/config.ts is NOT read unless legacy.collectionsBackwardsCompat). Types generated into .astro/content.d.ts by `astro sync`/dev/build (verified: `npx astro sync` succeeded in this scaffold). Imports:
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod'; // Zod 4.6.7 — `import { z } from 'astro:content'` is deprecated (removed in Astro 8)

glob({ pattern: string | string[], base?: string | URL (relative to project root, default '.'), generateId?: ({ entry, base, data }) => string, retainBody?: boolean (default true), deferRender?: boolean (default false) }). Rules: pattern cannot start with '../' or '/'; negations allowed ('!**/_*'); default id = slug of the path relative to base with extension stripped (nested folders keep '/'; `data.slug` in the file overrides); ids are coerced to string; duplicate ids warn/error per prerenderConflictBehavior. Supported data files: .json (must parse to an object; one entry per file), .yaml/.yml, .toml; content files: .md (rendered by Sätteri; `.mdx` via @astrojs/mdx). file('src/data/x.json' | .yaml, { parser? }) loads a JSON array of objects with unique `id` or an object keyed by id — use this for small lookup tables (trust promises, stores, categories) in ONE file.

APIs: getCollection('products', ({ data, id }) => data.published); getEntry('products', 'necklaces/temple-haram') or getEntry({ collection, id }); getEntries(entry.data.related) resolves an array of references; reference('collections') in a schema accepts "antique" or { collection: 'collections', id: 'antique' } and validates existence at build; render(entry) (import from 'astro:content') returns { Content, headings: MarkdownHeading[], remarkPluginFrontmatter }. Entry shape: { id, collection, data, body?, filePath?, digest, rendered? }. Types: `import type { CollectionEntry, CollectionKey } from 'astro:content'` → CollectionEntry<'products'>. getEntryBySlug/getDataEntryById are removed (throw via createDeprecatedFunction). Routes: `export async function getStaticPaths() { const items = await getCollection('products'); return items.map((p) => ({ params: { slug: p.id }, props: { p } })); }` with src/pages/jewellery/[...slug].astro (rest param needed for ids containing '/'); params must be strings (numbers now throw).

Suggested layout for this site (JSON/YAML, typed, typo-proof via enums):
const categories = defineCollection({ loader: file('src/content/categories.yaml'), schema: ({ image }) => z.object({ id: z.string(), name: z.string(), nameAr: z.string().optional(), blurb: z.string().max(220), cutout: image(), order: z.number().int() }) });
const collections = defineCollection({ loader: glob({ pattern: '_.md', base: './src/content/collections' }), schema: ({ image }) => z.object({ name: z.string(), origin: z.string(), logo: image(), hero: image().optional(), summary: z.string().max(200) }) });
const products = defineCollection({ loader: glob({ pattern: '\**/_.json', base: './src/content/products' }), schema: ({ image }) => z.object({ name: z.string(), sku: z.string().optional(), category: reference('categories'), collection: reference('collections').optional(), occasions: z.array(reference('occasions')).default([]), karat: z.enum(['18K','21K','22K','24K']), metal: z.enum(['gold','diamond','gemstone','polki']), grossWeightG: z.number().positive().optional(), diamondCt: z.number().optional(), hallmark: z.literal('916').or(z.literal('750')).optional(), images: z.array(image()).min(1), priceOnRequest: z.boolean().default(true), published: z.boolean().default(true), updated: z.coerce.date() }) });
const journal = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/journal' }), schema: ({ image }) => z.object({ title: z.string().max(70), description: z.string().min(70).max(160), date: z.coerce.date(), updated: z.coerce.date().optional(), cover: image(), coverAlt: z.string(), tags: z.array(z.string()).default([]), draft: z.boolean().default(false) }) });
export const collections = { categories, collections, products, occasions, journal };
Zod 4 notes: z.email() not z.string().email(); error messages via { error: '…' } not { message }; defaults must match output type (use .prefault() for pre-transform defaults).

Markdown (Sätteri 0.10.5 via @astrojs/markdown-satteri 0.4.3, bundled with astro): GFM, YAML/TOML frontmatter, heading ids (github-slugger, trailing hyphens kept) and smart punctuation (straight quotes → curly, -- → dash) are ON by default; directive/math/headingAttributes/superscript/subscript/wikilinks/definitionList OFF. Customise with `import { satteri } from '@astrojs/markdown-satteri'; markdown: { processor: satteri({ features: { smartPunctuation: false }, mdastPlugins: [], hastPlugins: [] }) }` (install the package explicitly to import it). remark/rehype plugins require `npm i @astrojs/markdown-remark` and `processor: unified({ remarkPlugins, rehypePlugins })`; `markdown.remarkPlugins`/`rehypePlugins` config keys are deprecated.

Sources: node_modules/astro/dist/content/{loaders/glob.js,loaders/glob.d.ts,loaders/file.d.ts,config.d.ts,runtime.d.ts,utils.js,consts.js}; dist/core/config/settings.js (dataEntryTypes); types/content.d.ts; node_modules/@astrojs/markdown-satteri/dist/processor.d.ts; node_modules/satteri/dist/compile.d.ts; https://docs.astro.build/en/guides/content-collections/

### 5. @astrojs/sitemap 3.7.4 + robots.txt

_Confidence: high_

Install: `npm i @astrojs/sitemap@3.7.4` (deps: sitemap ^9, zod ^4.3.6; no astro peer range declared). Requires `site`. Hook: astro:build:done, using routes from astro:routes:resolved — only `type === 'page'` routes with a static pathname (redirects excluded; 404/500 excluded; dynamic SSR routes impossible in static anyway). URL shape: with build.format 'directory' and trailingSlash !== 'never' a trailing '/' is appended → with our config every URL is https://classicjewels.ae/path/. Output: dist/sitemap-index.xml + dist/sitemap-0.xml (entryLimit 45000 per file; `chunks` can split into sitemap-<name>-0.xml). Options (SitemapOptions):
sitemap({
filter: (page) => !page.includes('/drafts/') && !page.endsWith('/thanks/'), // page = absolute href
customPages: [], // extra absolute URLs
customSitemaps: [], // 3.5+: external sitemap URLs added to the index
entryLimit: 45000,
changefreq: 'weekly', priority: 0.7, lastmod: new Date(), // site-wide; Google ignores changefreq/priority — prefer omitting them
serialize: (item) => { if (item.url.endsWith('/privacy-policy/')) return undefined; item.lastmod = lastmodFor(item.url); return item; }, // (item: SitemapItem) => SitemapItem | undefined | Promise<…>; SitemapItem = { url, lastmod?, changefreq?, priority?, links? }
i18n: { defaultLocale: 'en', locales: { en: 'en-AE', ar: 'ar-AE' } }, // only when /ar/ exists; adds xhtml:link alternates
xslURL: undefined, filenameBase: 'sitemap', namespaces: { news: false, xhtml: true, image: false, video: false },
})
Per-page lastmod: build a Map<url, Date> from getCollection('products'/'journal') `updated` fields inside astro.config (content APIs are not available there) — instead compute it in `serialize` from a JSON manifest you write during build, or simply set `lastmod` from git/CI date; keep it honest (Google ignores fake lastmod patterns). Discovery: `<link rel="sitemap" href="/sitemap-index.xml">` in <head> and robots.txt. Generate robots dynamically so it reuses `site`:
// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => new Response(`User-agent: *\nAllow: /\nDisallow: /thanks/\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
Note: endpoints with a file extension (robots.txt.ts, manifest.webmanifest.ts, sitemap-index.xml) are served without a trailing slash even with trailingSlash:'always' (v6 change). The integration logs "`sitemap-index.xml` created at `dist`" on success. Pages carrying <meta name="robots" content="noindex"> are NOT auto-excluded — exclude them in `filter`.

Sources: https://docs.astro.build/en/guides/integrations-guide/sitemap/; https://unpkg.com/@astrojs/sitemap@3.7.4/dist/index.{d.ts,js}; npm view @astrojs/sitemap@3.7.4

### 6. astro:env with envField

_Confidence: high_

import { defineConfig, envField } from 'astro/config';
env: {
schema: {
PUBLIC_GOLD_RATE_ENDPOINT: envField.string({ context: 'client', access: 'public', default: '/gold-rates.php' }),
PUBLIC_WHATSAPP_NUMBER: envField.string({ context: 'client', access: 'public', default: '971505661416' }),
PUBLIC_ANALYTICS_ID: envField.string({ context: 'client', access: 'public', optional: true }),
PUBLIC_FORM_ENDPOINT: envField.string({ context: 'client', access: 'public', optional: true, url: true }),
GOLD_RATE_SOURCE_URL: envField.string({ context: 'server', access: 'public', default: 'https://classicjewels.ae/gold-rates.php', url: true }),
BUILD_SNAPSHOT_RATES: envField.boolean({ context: 'server', access: 'public', default: true }),
},
validateSecrets: false,
},
Field options: string → optional, default, max, min, length, url, includes, startsWith, endsWith; number → optional, default, gt, min, lt, max, int; boolean → optional, default; enum → values, optional, default. context 'client' requires access 'public' (client secrets unsupported). Usage: `import { PUBLIC_GOLD_RATE_ENDPOINT, PUBLIC_WHATSAPP_NUMBER } from 'astro:env/client'` (works in .astro frontmatter AND in client <script> islands — the value is inlined at build), `import { GOLD_RATE_SOURCE_URL, getSecret } from 'astro:env/server'` (frontmatter/endpoints only). With astro:env the PUBLIC_ prefix is NOT required (any name works; keep PUBLIC_ purely as a human signal); it IS required for raw `import.meta.env.X` in client code. Typing: `default` → `string`; `optional: true` → `string | undefined`; missing required var fails `astro dev`/`astro build` with an EnvInvalidVariables error. Types are generated into .astro/env.d.ts by astro sync/dev/build. `.env`, `.env.production`, `.env.<mode>` are loaded from the project root; they are NOT loaded inside astro.config.mjs (use `loadEnv` from 'vite' there if ever needed). Built-ins: import.meta.env.SITE ('https://classicjewels.ae'), BASE_URL ('/'), MODE, DEV, PROD; since v6 import.meta.env values are inlined and never coerced (always strings). Brand constants that never vary by environment (address, phone, socials, trust promises, opening hours) belong in a typed `src/data/site.ts` (`export const site = {...} as const satisfies SiteConfig`), not in env.

Sources: node_modules/astro/dist/env/{config.d.ts,schema.d.ts}; https://docs.astro.build/en/guides/environment-variables/; https://docs.astro.build/en/reference/modules/astro-env/

### 7. Tooling versions verified with npm view (2026-10-13) and compatibility traps

_Confidence: high_

Runtime: Node v22.17.0 installed, npm 11.5.2; astro requires node >=22.12.0. LATEST: astro 7.3.8 (installed), vite 8.3.4 (bundled), @astrojs/compiler-rs 0.5.1, @astrojs/markdown-satteri 0.4.3, zod 4.6.7, sharp 0.35.5 (installed as astro optionalDependency ^0.35.4), @astrojs/check 0.9.10, typescript 7.0.2 (dist-tag latest), typescript@5 → 5.9.3, typescript@6 → 6.0.3, eslint 10.12.0, eslint-plugin-astro 3.2.1, typescript-eslint 8.71.2, @typescript-eslint/parser 8.71.2, eslint-plugin-jsx-a11y 6.10.2, eslint-plugin-jsx-a11y-x 0.2.0, @eslint/js 10.0.1, globals 17.13.0, prettier 3.9.10, prettier-plugin-astro 1.1.1, @astrojs/sitemap 3.7.4, @astrojs/markdown-remark 7.3.2 (only if unified plugins are wanted), unifont 1.0.3 (astro bundles 0.7.5). Fontsource (all exist, all 5.3.0, confirmed file names via jsDelivr): @fontsource-variable/bodoni-moda (files/bodoni-moda-latin-wght-normal.woff2, -wght-italic, plus -opsz-* and -standard-* variants), @fontsource-variable/cormorant-garamond (files/cormorant-garamond-latin-wght-normal.woff2, -wght-italic; cyrillic/vietnamese too), @fontsource-variable/fraunces (files/fraunces-latin-wght-_.woff2, -opsz-_, -soft-_, -wonk-_, -full-* (all axes), -standard-_), @fontsource-variable/ibm-plex-sans (files/ibm-plex-sans-latin-wght-normal.woff2, -wght-italic, -wdth-_, -standard-*). Beware @fontsource-variable/cormorant (different family) and @fontsource/ibm-plex-sans (static weights).

TRAPS: (1) typescript 7.0.2 is the Go-native compiler and is rejected by @astrojs/check (peer ^5.0.0 || ^6.0.0) and typescript-eslint (peer >=4.8.4 <6.1.0) → pin `typescript@~5.9.3` (6.0.3 also within both ranges but 6.x changes defaults; 5.9.3 is the safe choice). (2) eslint-plugin-astro 2.x/3.x: ESM-only, peer eslint >=10, typescript-eslint >=8.61 or @typescript-eslint/parser >=8.61, eslint-plugin-jsx-a11y >=6.10.2; engines node ^22.22.3 || ^24.16.0 || >=26.3.0 — Node 22.17.0 does NOT satisfy it (npm engine-strict=false → warning only, but the plugin targets newer Node APIs). Fix: upgrade Node to 22.23.3 or 24.21.0 (current releases) and add `"engines": { "node": ">=22.22.3" }` + .nvmrc; fallback is eslint 9 + eslint-plugin-astro ~1.7.0 (engines ^18.18||^20.9||>=21.1). (3) eslint-plugin-astro auto-detects the TS parser: it requires '@typescript-eslint/parser' then 'typescript-eslint' from cwd and sets parserOptions.parser; install typescript-eslint and it just works; configs exported: base, recommended, all, jsx-a11y-recommended, jsx-a11y-strict (also 'flat/*' aliases). (4) prettier-plugin-astro needs prettier ^3.5.3 and node >=22.12.

package.json devDependencies to add: "@astrojs/check": "^0.9.10", "@astrojs/sitemap": "^3.7.4", "@eslint/js": "^10.0.1", "@fontsource-variable/bodoni-moda": "^5.3.0", "@fontsource-variable/ibm-plex-sans": "^5.3.0", "eslint": "^10.12.0", "eslint-plugin-astro": "~3.2.1" (author recommends tilde), "eslint-plugin-jsx-a11y": "^6.10.2", "globals": "^17.13.0", "prettier": "^3.9.10", "prettier-plugin-astro": "^1.1.1", "sharp": "^0.35.5", "typescript": "~5.9.3", "typescript-eslint": "^8.71.2". Scripts: "dev": "astro dev", "build": "astro check && astro build", "preview": "astro preview", "check": "astro check", "lint": "eslint .", "format": "prettier --write .", "sync": "astro sync".

// eslint.config.js (package.json has "type":"module")
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
export default tseslint.config(
{ ignores: ['dist/**', '.astro/**', 'node_modules/**'] },
js.configs.recommended,
...tseslint.configs.recommended,
...eslintPluginAstro.configs.recommended,
...eslintPluginAstro.configs['jsx-a11y-recommended'],
{ files: ['src/**/_.ts'], languageOptions: { globals: { ...globals.browser } } },
);
// .prettierrc
{ "plugins": ["prettier-plugin-astro"], "printWidth": 100, "singleQuote": true, "overrides": [{ "files": "_.astro", "options": { "parser": "astro" } }] }
// tsconfig.json — keep { "extends": "astro/tsconfigs/strict", "include": [".astro/types.d.ts", "**/*"], "exclude": ["dist"] } and add compilerOptions { "noUncheckedIndexedAccess": true, "noUnusedLocals": true, "noUnusedParameters": true, "noImplicitReturns": true } ('strictest' also turns on exactOptionalPropertyTypes, which fights Astro Props with optional attrs — opt in deliberately). Base preset already sets moduleResolution Bundler, verbatimModuleSyntax, isolatedModules, jsx preserve, allowImportingTsExtensions.

Sources: npm view (version/peerDependencies/engines) for each package; https://data.jsdelivr.com/v1/package/npm/@fontsource-variable/*@5.3.0/flat; https://github.com/ota-meshi/eslint-plugin-astro README; https://cdn.jsdelivr.net/npm/eslint-plugin-astro@3.2.1/lib/index.mjs; node_modules/astro/tsconfigs/{base,strict,strictest}.json; node -v / npm config get engine-strict

### 8. Astro 7 vs Astro 5 — what trips component/page authors

_Confidence: high_

Compiler (v7, @astrojs/compiler-rs 0.5.1, oxc + Lightning CSS): every non-void element must be closed (`<div>Hello` and `<li>` without `</li>` are build errors; void elements br/img/input/meta/link need no close); invalid nesting is no longer auto-corrected (`<p><div>` stays as written and breaks in the browser — the old Go compiler reordered/auto-closed); unterminated attributes error; scoped CSS output changes cosmetically (named colours → hex, url() quoting) — do not string-match CSS. Whitespace: `compressHTML: 'jsx'` (default) applies JSX rules — line breaks between elements vanish, `<strong>22K</strong>\n<span>gold</span>` renders "22Kgold"; write `{' '}` or keep inline runs on one line; `compressHTML: true` restores lossless v6 behaviour. `<script>`/`<style>` now render in source order (v6). scopedStyleStrategy 'attribute' adds [data-astro-cid-*] to scoped selectors.

Routing/config: `src/fetch.ts` is reserved for the request pipeline (fetchFile; rename or set `fetchFile: null`); `output: 'hybrid'` removed; `.cjs/.cts` config files not allowed; endpoints with extensions (robots.txt.ts, sitemap-_.xml) never get a trailing slash; `Astro` global inside getStaticPaths is deprecated → use import.meta.env.SITE; getStaticPaths params must be strings; Astro.url.pathname may be decoded differently from new URL(Astro.request.url).pathname; `Astro.glob()` removed → `Object.values(import.meta.glob('./x/*.md', { eager: true }))` (import.meta.glob no longer returns a Promise); `<ViewTransitions />` → `<ClientRouter />` from 'astro:transitions'; astro:transitions internals (createAnimationScope, TRANSITION__ constants) removed; import.meta.env.ASSETS_PREFIX deprecated → `build.assetsPrefix` from 'astro:config/server'; `cache`/`routeRules`/`logger` moved out of experimental; experimental keys removed in v6 (fonts, csp, responsiveImages, liveContentCollections, preserveScriptOrder, staticImportMetaEnv, headingIdCompat, failOnPrerenderConflict→prerenderConflictBehavior); `astro dev --background` + `astro dev status|stop|logs` exist (and background mode auto-enables when an AI agent is detected — CLAUDE.md already documents it); /_astro/status health endpoint on dev.

Content: legacy collections removed (src/content/config.ts ignored, `loader` required, no type:'content'|'data', `entry.render()` → `render(entry)`, `entry.slug` → `entry.id`, getEntryBySlug/getDataEntryById gone, `legacy.collectionsBackwardsCompat` is a temporary shim); `z` from 'astro:content' deprecated → 'astro/zod'; Zod 4 API differences; markdown heading ids keep trailing hyphens; Sätteri default (remark/rehype need @astrojs/markdown-remark + processor: unified()); markdown `gfm`/`smartypants` config keys deprecated → satteri({ features }).

Images: default service crops when width+height change aspect ratio (no `fit` needed), never upscales, SVG rasterises when `format` is set (guard with format={src.format === 'svg' ? 'svg' : 'avif'}), getImage() throws on the client, responsive markup uses data-astro-image / data-astro-image-fit / data-astro-image-pos + @layer astro.images CSS (no inline style). Env: import.meta.env inlined and never coerced; non-PUBLIC_ vars no longer rewritten to process.env — use astro:env. Vite 8 (Rolldown) — rollupOptions still accepted via compatibility layer; client asset naming lives at vite.environments.client.build.rollupOptions.output; Vitest requires environment 'node' for .astro rendering. Node 22.12+ required; `astro check` requires typescript ≤6.

Import path cheat-sheet: 'astro/config' → defineConfig, fontProviders, envField, sharpImageService, passthroughImageService, svgoOptimizer, mergeConfig, getViteConfig, memoryCache, sessionDrivers, logHandlers; 'astro:assets' → Image, Picture, Font, getImage, imageConfig, inferRemoteSize, getConfiguredImageService, types LocalImageProps/RemoteImageProps/CssVariable; 'astro' → types ImageMetadata, APIRoute, APIContext, MiddlewareHandler, GetStaticPaths, InferGetStaticPropsType; 'astro/types' → HTMLAttributes<'img'>, ComponentProps, HTMLTag, Polymorphic; 'astro:content' → defineCollection, getCollection, getEntry, getEntries, reference, render, types CollectionEntry/CollectionKey; 'astro/loaders' → glob, file, type Loader; 'astro/zod' → z; 'astro:env/client' | 'astro:env/server'; 'astro:config/server' | 'astro:config/client'; 'astro:transitions' → ClientRouter; 'astro:middleware' → defineMiddleware, sequence; 'astro/errors' → AstroError; '@astrojs/sitemap' → default sitemap, type SitemapItem, ChangeFreqEnum; '@astrojs/markdown-satteri' → satteri.

Sources: https://docs.astro.build/en/guides/upgrade-to/v7/; https://docs.astro.build/en/guides/upgrade-to/v6/; https://astro.build/blog/astro-7/; node_modules/astro/dist/types/public/config.d.ts (compressHTML, fetchFile, legacy); dist/core/errors/errors-data.js; dist/content/runtime.d.ts; dist/config/entrypoint.js; npx astro dev --help

### Build-time + client gold-rate widget pattern (static output)

_Confidence: medium_

// src/lib/gold-rate.ts (server-only; imported from frontmatter)
import { z } from 'astro/zod';
import { GOLD_RATE_SOURCE_URL } from 'astro:env/server';
const RateSchema = z.object({ gold_rate_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), gold_rate_24k: z.coerce.number(), gold_rate_22k: z.coerce.number(), gold_rate_21k: z.coerce.number(), gold_rate_18k: z.coerce.number(), gold_rate_14k: z.coerce.number() });
export type GoldRates = z.infer<typeof RateSchema>;
export async function fetchGoldRates(): Promise<GoldRates | null> {
try { const res = await fetch(GOLD_RATE_SOURCE_URL, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ClassicJewelsSite/1.0)', Accept: 'application/json' } });
if (!res.ok) return null; return RateSchema.parse(JSON.parse(await res.text())); } catch { return null; }
}
Render the snapshot server-side into the header strip (<time datetime="2026-10-13">, AED/g, 24K/22K/21K/18K) so the LCP/SEO HTML already contains numbers; then a ≤1 kB vanilla TS island (`<script>` in GoldRate.astro, module-scoped, no framework) does `fetch(PUBLIC_GOLD_RATE_ENDPOINT)` from 'astro:env/client' on load/visibility, validates, and patches the text nodes with `textContent` (no layout change → CLS 0). In dev the Vite proxy answers; in production the same path must be served same-origin (see finding 1b). Add `<meta name="gold-rate-date">`? No — use JSON-LD only where appropriate; do NOT emit Product `offers` with prices (price on enquiry) — use `Offer` with `availability` and `priceSpecification` omitted or skip Offer entirely to avoid rich-result errors.

Sources: synthesised from finding 1b probe, astro:env docs, Astro static build semantics (fetch in frontmatter runs at build)
