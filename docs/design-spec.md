# Classic Jewels & Diamonds — Design Specification

Build-ready merge of the three design directions (editorial-luxury, souq-heritage, conversion-minimal), the two judge panels, and the SEO research. Everything below is a decision, not an option, unless marked **[owner]** (fact the owner must confirm before that string ships) or **[verify]** (claim engineers must test in the build).

---

## 0. Decisions log

> **Superseded.** The visual direction below was replaced by `docs/design-system-v2.md` (Night vitrine, 13 October 2026). This section is kept as history.

**Spine.** Combined judge totals: souq-heritage 64, editorial-luxury 63, conversion-minimal 61. Both judges said souq-heritage "set in Bodoni, scrim removed, would tie or beat spec 1". So: **souq-heritage is the spine** (thesis = the counter: ivory page, white tray, gold hairline, plum velvet; IA; SEO formulas; rate board as plum signboard; old gold as an offer; C-ring motif; honest empty states), **set in editorial-luxury's typographic and compositional grammar** (Bodoni Moda + IBM Plex Sans, plates on a contact-sheet tray, numbered 01–06 ledger, typographic 5/7 hero, numbered collections index, margin notes), **on conversion-minimal's plumbing** (baked rates + idle refetch, CORS/proxy, H1-first mobile DOM, card-as-single-link with `data-wa` button, client-side filter on one canonical URL, ship-gates).

Taken, by source:

- **souq-heritage →** thesis wording; plum rate board, five rows, `AED / g`, source line, print state, H2 "The board, as it reads in the shop."; C-ring motif (reduced to three uses); old-gold plum band and "How buying works" band; title/alt templates; `/jewellery/{category}/{slug}/`; JSON-LD set (Breadcrumb, CollectionPage, ItemList, Product with additionalProperty, no fabricated price); no-image and sold states; enquiry block with "Copy reference" and certificate request; 12-glyph monoline SVG sprite; `inert` main behind the drawer; 404 with no redirect script.
- **editorial-luxury →** Bodoni Moda + Plex Sans; plate/contact-sheet grid (gap 1px on rule, white cells); numbered 01–06 assurance ledger; typographic 5/7 hero with no backdrop photo; numbered collections index; inherited taglines demoted to margin notes; stacked 1/1 plates with sticky spec column on product pages (no carousel); logical CSS properties for `/ar`; `#BE8658` demoted to rules/glyphs/≥24px with a darker text derivative; olive golds retired; `<dialog>` mobile nav; self-hosted ≤1 KB beacon instead of GA; copy voice ("Shop 6, inside the car-park building.", "Bring old gold. Leave with its full weight.").
- **conversion-minimal →** build-time baked rate values + `requestIdleCallback` refetch + "as of {build date}" failure state; CORS / same-origin requirement for `gold-rates.php` named; `min-width: 6ch` numeral cells; no-JS price fallback; mobile hero DOM order H1 → image; whole-card anchor + `data-wa` button; client-side filter/sort over `data-*` keeping one canonical URL; mega-nav panel carrying today's rates; coins & bars band copy ("ask for the coin premium before you come in"); per-collection facts row; ship-gates (placeholders never ship, journal only at ≥3 posts, hours and canonical email blocked until confirmed); computed price line pattern; Plex Sans Arabic reserved for `/ar`; owner export rule for clamping near-white to `#FFFFFF`; tightest budgets (CSS ≤ 25–28 KB, JS ≤ 8 KB).

Rejected, with reason:

- Fraunces (souq): both judges flag it as the 2021–24 indie-DTC serif; reads trendy beside 22K filigree. → Bodoni Moda.
- Bodoni Moda Italic file (editorial): ~50 KB for three taglines and pull-quotes. → roman only; margin notes set in Bodoni roman 400, `font-synthesis: none`.
- Pinned `opsz` per token (editorial, souq): hairlines designed for 56–144px break up at the mobile clamp floor. → `font-optical-sizing: auto` everywhere; never set `font-variation-settings: "opsz"`.
- Hero plate upscaled from a 600×600 source (editorial): LCP would be an upscale. → hero image is the brand's 1488×962 asset (3/2 desktop, 4/5 mobile, two pre-cropped sources), replaced by shop photography after the reshoot; mobile LCP is the H1.
- Hero led by the wedding portrait (conversion): nearest of the three to woman-with-necklace. → see above.
- Occasion tiles with text on a 60 % plum scrim (souq) and tiles 2/4 offset 48 px (editorial): template pattern / decoration without function. → four plain 3/5 portraits, caption below, no overlay, no offset.
- 240 px ghost C-ring at 6 % on every plum band, C-ring rotating on FAQ open, rate-board loading glyph (souq): ornament; no loading state exists once values are baked. → C-ring restricted to favicon/app icon, prose and trust-list marker, 404 glyph.
- Ivory/white section alternation (editorial §6 vs §4): contradiction. → the page is ivory; white appears only as trays and plates (content objects), plum only as two bands plus footer. No section-level surface alternation.
- `mix-blend-mode: multiply` on product JPGs (all three): caps diamond speculars at ivory and promotes every cell to a composited layer. → product JPGs only ever sit on `--surface-0` cells; never on ivory, parchment or plum.
- Image hover `scale(1.02)` (editorial) and second-image crossfade (souq, conversion): stock micro-interaction / no second photos exist. → hover is a 1 px gold underline on the name only; no transforms on images.
- Prebuilt facet links piece × karat × weight band (editorial): hundreds of thin duplicate URLs. → client-side filter over `data-*` on one canonical collection/category URL; state in the URL hash.
- 3×2 assurance grid (conversion) and trust strip (souq): icon-row minus icons / less distinctive. → numbered ledger, rows linking to `/promise/…` pages with the labels rewritten away from Malabar's verbatim names (SEO finding).
- `/jewellery/{sku}/` (editorial): discards the category keyword. → `/jewellery/{category}/{slug}/`.
- 6/6 product split (conversion): the only 50/50 composition. → 7/5.
- Delta-vs-yesterday arrow (souq): feed has no history. → delta rendered at build only when the `rates` collection holds the previous trading day; never computed client-side.
- "Open daily 10:00–22:00 [TBC]" (souq), "ground floor" / "park upstairs" (all three): invented. → hours and parking details render only from `site.ts` content; copy states only that the shop is inside the Mariyam Plaza multistorey car-park building, behind RAK Bank.
- GA4 deferred (souq): ~100 KB third-party JS, likeliest cause of a failed 95. → first-party ≤ 1 KB beacon or nothing.
- FAQPage JSON-LD (souq, conversion): feature removed by Google 7 May 2026. → FAQs as semantic `<details>`; no FAQPage. WebSite without SearchAction (removed Nov 2024).
- "Book a viewing" form with endpoint TBD (conversion): scope creep. → one contact form, host-function endpoint, native submit fallback.
- Headlines "Twelve ways to work gold" / "Collections named for where the work is done" (editorial, souq): false for Kids, Customised, Diamonds, Gemstone. → Diamonds and Gemstone become material hubs; Customised becomes `/custom-jewellery/`; collections set is nine (+ Kerala **[owner]**), H2 "By origin, by style, by stone."
- H1 "Gold weighed in front of you. Diamonds certified before you ask." (editorial): second sentence unverifiable, no "Dubai" term. → "Gold weighed in front of you. Priced at today's Dubai rate."
- "Thirty years in the Souq" (editorial), "30+ years in Deira" (brief): group site says 35 years in gold, 16 in the UAE. → number comes from `site.claims.yearsInGold` **[owner]**; headline avoids a number: "Gold traders first. Jewellers since 2024."
- "For the day that needs it", "In the window / on the tray / on the counter this week" (all three): vague or implies weekly ops. → "Wedding sets. Anniversary diamonds. Birthday gold. Festival coins." and "Nine pieces from Shop 6, weighed and ready to quote." (`featured: true` is a content flag, not a schedule).
- "Every 22K piece carries the Dubai hallmark" (conversion): UAE scheme is DCL/Bareeq; brief confirms 916 stamping only. → "Every piece carries the UAE hallmark; 22K is stamped 916, 18K 750."
- "Temple: Lakshmi and nakshi work" (conversion): conflates techniques. → all collection descriptors live in content and ship only after **[owner]** verification; drafts provided in §7.
- Collection wordmarks greyscale at 70 % (conversion): de-brands the only collection assets. → wordmarks shown in a white "stamp" cell at full colour until resupplied as single-colour SVG.
- Focus ring `#BE8658` (conversion): 2.7–3.1:1. → plum on light, champagne on plum.
- Sticky utility strip + sticky header + fixed bottom bar on mobile (conversion): ~150 px of chrome. → on mobile only the 56 px bottom bar persists; the header is static; the utility strip scrolls away. Desktop header sticky.
- Buttons/inputs with 2 px radius (souq, conversion): → radius 0 everywhere; the only curve on the site is the C-ring.
- "Cards accepted: … PayPal" (conversion): PayPal is not a card. → "Payment in store: Visa, Mastercard, American Express, Maestro, PayPal, cash."
- 36 px utility strip packing rate, date, phone, address with no truncation (editorial): → explicit breakpoint rule in §6.

---

## 1. Thesis

> **Superseded** by `docs/design-system-v2.md` §1.

Classic Jewels & Diamonds is a two-year-old counter standing on the Classic Group's decades of gold trading, scrap buying and refining in Dubai. The site behaves like that counter at Shop 6, Mariyam Plaza: an ivory page (the shop), white trays with hairline dividers (where the pieces lie), plum velvet only where something is presented (the rate board, the old-gold offer, the footer), and one bronze hairline as the thread back to the fascia. Hierarchy comes from Bodoni Moda's stem/hairline contrast against IBM Plex Sans, from 1 px rules, from numbered lists and from asymmetric 5/7 placements, never from boxes, shadows, washes or motion. Every section states a gold fact a Deira buyer checks before walking in: karat, hallmark, grams, today's AED rate, exchange terms, Shop 6. The daily rate is the masthead number of the site. Material precision is the luxury; there is no mood-board luxury.

---

## 2. Colour tokens

> **Superseded** by `docs/design-system-v2.md` §2 and `src/styles/tokens.css`.

`#4B2849` is kept verbatim as `--plum-700` (fascia and logo). `#BE8658` is kept verbatim as `--gold-600` but demoted to rules, glyphs, eyebrow rules and ≥ 24 px display use; its text role moves to `--gold-700`. `#C2AF68` / `#BDAA67` are retired (brassy beside photographed 22K). Champagne `--gold-300` is the on-plum accent.

```css
:root {
  /* Surfaces: the page is ivory; white is a tray or plate; plum is a band. */
  --surface-0: #ffffff; /* trays, plates, wordmark stamps, inputs — equals photo white */
  --surface-1: #faf7f2; /* page ivory: body, header, every section by default */
  --surface-2: #f3eee6; /* parchment: spec-table heads, FAQ answers, table stripes */
  --surface-plum: #4b2849; /* rate board, old-gold band, "how buying works" band */
  --surface-plum-deep: #2e1a2d; /* utility strip, footer, mobile drawer */

  /* Ink */
  --ink-900: #1c1418;
  --ink-700: #4a3f46;
  --ink-500: #6b5f66;
  --ink-300: #b8afb3; /* 300 = non-text only */
  --ink-on-plum: #faf7f2;
  --ink-on-plum-muted: #d9ccd6;

  /* Plum scale */
  --plum-900: #2e1a2d;
  --plum-700: #4b2849;
  --plum-500: #6b3f68;
  --plum-300: #b498b2;
  --plum-100: #eadfe9;
  --plum-050: #f6f0f5;

  /* Gold scale */
  --gold-800: #6f4a24;
  --gold-700: #8a5c32;
  --gold-600: #be8658;
  --gold-500: #cda678;
  --gold-300: #dcc29a;
  --gold-100: #f1e6d3;

  /* Rules */
  --rule-1: #e6e0d6; /* default hairline, tray dividers */
  --rule-2: #cfc6b8; /* table borders, section dividers on parchment */
  --rule-input: #8f858b; /* input borders (≥3:1 on all light surfaces) */
  --rule-gold: #be8658; /* eyebrow rule, rate-board inner rules, footer top rule */
  --rule-on-plum: rgb(250 247 242 / 0.22);

  /* Semantic */
  --ok: #2e6b4f;
  --err: #a3362b;
  --ok-on-plum: #8fd1b0;
  --err-on-plum: #f3a89c;
  --focus: #4b2849;
  --focus-on-plum: #dcc29a;
  --link: #4b2849;
  --link-hover: #8a5c32;
}
```

Verified contrast (WCAG 2.x, computed):

| Pair                                   | Ratio                  | Use                                                                                                  |
| -------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------- |
| ink-900 / surface-0, -1, -2            | 18.1, 16.9, 15.6       | headings, body                                                                                       |
| ink-700 / surface-1                    | 9.4                    | lead, secondary body                                                                                 |
| ink-500 / surface-0, -1, -2            | 6.1, 5.7, 5.3          | meta, captions, breadcrumbs (AA at any size)                                                         |
| plum-700 / surface-0, -1, -2, plum-050 | 12.4, 11.6, 10.7, 11.0 | links, buttons, eyebrow on plum-050                                                                  |
| plum-500 / surface-1                   | 7.8                    | hover link on ivory                                                                                  |
| gold-700 / surface-0, -1, -2           | 5.7, 5.4, 5.0          | eyebrows, gold text, link hover (AA small text)                                                      |
| gold-800 / surface-1                   | 7.3                    | gold text inside parchment tables                                                                    |
| gold-600 / surface-0, -1               | 3.1, 2.9               | **non-text only** on light: eyebrow rule, glyphs ≥ 24 px, hairlines (decorative, no 3:1 requirement) |
| ink-on-plum / plum-700, -900           | 11.6, 15.1             | headings and body on plum                                                                            |
| ink-on-plum-muted / plum-700, -900     | 8.0, 10.4              | secondary text on plum                                                                               |
| gold-300 / plum-700, -900              | 7.2, 9.4               | rate numerals, eyebrows, focus ring on plum                                                          |
| gold-500 / plum-700                    | 5.5                    | small gold text on plum (units, dates)                                                               |
| gold-600 / plum-700, -900              | 4.0, 5.2               | hairlines and ≥ 24 px on plum                                                                        |
| rule-input / surface-1, -2             | 3.3, 3.1               | input borders (UI boundary minimum met)                                                              |
| ok, err / surface-0                    | 6.3, 6.7               | form validation                                                                                      |
| ok-on-plum, err-on-plum / plum-700     | 7.0, 6.4               | rate delta on the board                                                                              |

Rules: body text never in gold-600 or gold-500. Focus rings never gold on light. Plum text never on gold surfaces. No colour exists outside this file; components reference tokens only.

---

## 3. Typography

> **Superseded** by `docs/design-system-v2.md` §2.3 and §4 (Cormorant Garamond and IBM Plex Sans; Bodoni Moda is no longer used).

**Display: Bodoni Moda** (variable, OFL; axes `wght` 400–900, `opsz` 6–96). Roman only. Didone stem/hairline contrast is the grammar of printed jewellery catalogues; the `opsz` axis, left on `auto`, keeps hairlines solid at 20 px on 1× Android and razor-thin at 72 px.
**Text/UI: IBM Plex Sans** (variable, OFL; `wght` 100–700; `wdth` axis instanced to 100 and dropped). Continuity with the current identity; tabular lining figures for every rate, weight and table.
**Reserved for `/ar`:** IBM Plex Sans Arabic (not shipped on `/en`). Bodoni has no Arabic; `/ar` display sizes use Plex Sans Arabic 500 until an Arabic display face is chosen.

Files (self-hosted, `/public/fonts/`, woff2, latin + latin-ext subset):

- `bodoni-moda-var.woff2` — `wght 400–900, opsz 6–96`, features kept: `kern, liga, lnum, pnum, tnum, onum` **[verify: assert `tnum` present after subsetting; if absent, rate numerals still align via fixed-width cells, see §6]**
- `plex-sans-var.woff2` — `wght 100–700`, `wdth` instanced at 100 via `fonttools varLib.instancer`, features `kern, liga, tnum, lnum, pnum, ss01` (slashed zero off).
- Budget: both files ≤ 140 KB combined, both `<link rel="preload" as="font" type="font/woff2" crossorigin>` in `<head>`. `font-display: swap`. Metric-matched local fallbacks generated with `fontpie` and committed to `src/styles/fonts.css`: `"Bodoni Fallback"` from Georgia and `"Plex Fallback"` from Arial, each with `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override`, so the swap produces 0 CLS. `font-synthesis: none` on `html`. `font-optical-sizing: auto` on `html`; `font-variation-settings` is never set.

Fluid scale (360 → 1280 px viewport; `rem` = 16 px):

| Token            | Face / weight           | `font-size`                                        | Tracking | Leading | Use                                                                      |
| ---------------- | ----------------------- | -------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------ |
| `--t-display`    | Bodoni 500              | `clamp(2.5rem, 1.7rem + 3.6vw, 4.5rem)` (40→72)    | −0.012em | 1.0     | home H1, hub H1                                                          |
| `--t-h1`         | Bodoni 500              | `clamp(2.125rem, 1.55rem + 2.5vw, 3.5rem)` (34→56) | −0.008em | 1.05    | every other H1                                                           |
| `--t-h2`         | Bodoni 500              | `clamp(1.625rem, 1.3rem + 1.4vw, 2.5rem)` (26→40)  | −0.004em | 1.12    | section H2                                                               |
| `--t-h3`         | Bodoni 600              | `clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)` (20→24)  | 0        | 1.25    | tile names, FAQ questions, card titles in collections index              |
| `--t-numeral-xl` | Bodoni 500, `tnum lnum` | `clamp(2.5rem, 1.6rem + 3.8vw, 4.5rem)` (40→72)    | 0        | 1.0     | rate board figures                                                       |
| `--t-numeral`    | Plex 500, `tnum lnum`   | 1.125rem                                           | 0        | 1.2     | spec tables, card fact lines, utility strip rate, mega-nav rates         |
| `--t-lead`       | Plex 400                | `clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)`     | 0        | 1.5     | standfirsts; colour ink-700                                              |
| `--t-body`       | Plex 400                | `clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)`          | 0        | 1.6     | prose; `max-inline-size: 68ch`                                           |
| `--t-title`      | Plex 500                | 1.0625rem                                          | 0        | 1.35    | product names on cards, nav links, buttons                               |
| `--t-small`      | Plex 400/500            | 0.875rem                                           | 0.004em  | 1.5     | meta, breadcrumbs, captions, footer; colour ink-500                      |
| `--t-caption`    | Plex 400                | 0.8125rem                                          | 0.01em   | 1.45    | image captions, table footnotes                                          |
| `--t-eyebrow`    | Plex 500, uppercase     | 0.75rem                                            | 0.14em   | 1       | section eyebrows                                                         |
| `--t-note`       | Bodoni 400              | 1.125rem                                           | 0        | 1.4     | margin notes (the three inherited taglines, one pull-quote per page max) |
| `--t-ledger-no`  | Bodoni 400, `tnum`      | `--t-h2` size                                      | 0        | 1       | "01"–"06" in ledgers, "01"–"09" in collection index                      |

Eyebrow: colour `--gold-700` on light, `--gold-300` on plum; `::before` is a 24 × 1 px rule in `--rule-gold` (`--gold-300` on plum), `margin-inline-end: 12px`, vertically centred; `margin-block-end: var(--space-3)`. Eyebrows are the only uppercase text on the site. Headlines are sentence case, end with a full stop when they are a sentence. Body measure 68ch. Numerals in running text use `font-variant-numeric: lining-nums`; in tables and fact lines `tabular-nums lining-nums`. `text-wrap: balance` on H1/H2 (progressive); `text-wrap: pretty` on body where supported. Hyphenation off. No letter-spaced small caps outside the eyebrow.

Margin note: Bodoni 400 `--t-note`, colour `--ink-500`, preceded by the C-ring glyph (12 px, `--gold-600`), placed in the 2-column gutter to the inline-start of a 7/12 text block on ≥ 1024 px, above the block on mobile. Only the three inherited taglines and one pull-quote per page may use it.

---

## 4. Spacing, layout, grid, radius, hairlines, aspect ratios, image treatment

> **Superseded** by `docs/design-system-v2.md` §2, §3 and §5.2 (`StageImage`, `Plate`, `Panorama`).

**Spacing** (4 px base): `--space-1: .25rem; -2: .5rem; -3: .75rem; -4: 1rem; -5: 1.5rem; -6: 2rem; -7: 3rem; -8: 4rem; -9: 6rem; -10: 8rem`. Section rhythm `--section-y: clamp(3.5rem, 2.5rem + 5vw, 7rem)`. Within a section, head → content gap `--space-7`; content → section link `--space-6`.

**Containers**: `--container: 80rem` (1280 px) for all content; `--container-wide: 90rem` for tray grids and the hero; `--prose: 68ch`. Gutter `--gutter: clamp(1rem, 0.5rem + 2.5vw, 2.5rem)` (16 px at 360). Containers use `padding-inline: var(--gutter)`; never a horizontal page scroll.

**Grid**: 12 columns ≥ 1024 px; 6 at 640–1023; 4 below 640. `gap: clamp(1rem, 0.75rem + 1.25vw, 1.5rem)`. Compositions are asymmetric by rule: text 5 / media 7, or 7 / 5 reversed; never 50/50; the 404 page is the only centred layout. Text columns start at column 1 (never centred). Breakpoints: 480, 640, 900, 1024, 1280 (`em`-based media queries).

**Surfaces**: `body` is `--surface-1`. Sections do not alternate backgrounds. White exists only as: tray grids, plates, wordmark stamps, inputs, the mega-nav panel. Plum exists only as: utility strip, rate board, old-gold band, "how buying works" band, mobile drawer, footer. Maximum two `--surface-plum` bands per page (home: rate board + old gold; collection: "how buying works" only; rate page: the board only). Adjacent sections on the same surface are divided by a full-bleed 1 px `--rule-1`, never by a surface swap.

**Radius**: 0 on everything (images, cards, tables, buttons, inputs, chips, dialogs). The only curve is the C-ring.

**Shadows**: none, anywhere, in any state. Elevation = a hairline or a surface change. The sticky desktop header gains `border-block-end: 1px solid var(--rule-1)` after 8 px of scroll (CSS `scroll-state()` where supported; otherwise a 200-byte `IntersectionObserver` sentinel inside `nav.ts`).

**Hairlines**: 1 px, token colours only. Tray grid technique: `display: grid; gap: 1px; background: var(--rule-1);` cells `background: var(--surface-0)`. Grid outer edge: 1 px `--rule-1` border so the tray reads as an object on the ivory. Tables: `border-collapse: collapse; border-block: 1px solid var(--rule-2)`, row rules `--rule-1`, head on `--surface-2`.

**Z-index scale**: `--z-sticky: 10` (header), `--z-bar: 20` (mobile action bar), `--z-nav: 30` (mega panel), `--z-dialog: 40` (drawer, gallery dialog), `--z-skip: 50`.

**Aspect ratios and renditions** (astro:assets, AVIF then WebP, `sizes` on every `<img>`, `width`/`height` attributes always, `loading="lazy" decoding="async"` on everything below the fold; never render a width larger than the source — a build-time check throws on upscale):

| Asset                       | Ratio                                                                      | Source                              | Widths served                                         |
| --------------------------- | -------------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------- |
| Product plate               | 1/1                                                                        | 600² now; 2000² after reshoot       | 320, 480, 600 (now); 320, 480, 640, 960, 1280 (after) |
| Category cutout (PNG alpha) | 5/2 box, `object-fit: contain`, 24 px inset                                | 800×318                             | 400, 800 (AVIF/WebP with alpha)                       |
| Occasion portrait           | 3/5, `object-position: 50% 20%`                                            | 784×1280                            | 392, 640, 784                                         |
| Hero / about lifestyle      | 3/2 desktop, 4/5 mobile (two committed crops `hero-32.jpg`, `hero-45.jpg`) | 1488×962                            | 640, 960, 1280, 1488                                  |
| Collection wordmark         | in a 160×56 white stamp cell, `max-inline-size: 120px`                     | 300×104 PNG                         | 240, 300; replaced by single-colour SVG when supplied |
| Journal / news              | 3/2                                                                        | ≥ 1600 wide                         | 480, 800, 1200                                        |
| Map image                   | 4/3                                                                        | static render, owner-approved       | 480, 800                                              |
| OG image                    | 1200×630                                                                   | one per section, generated at build | 1200                                                  |

**Plate component** (`<Plate>`): a `--surface-0` cell with `padding: 8%` (10 % in the hero), `aspect-ratio: 1`, `object-fit: contain`. Because photo white equals cell white, the metal lies on the tray with no visible rectangle. The owner's export rule: clamp any background pixel ≥ `#F8F8F8` to `#FFFFFF`; the build warns when a product image's corner samples are < `#FAFAFA`. Product JPGs are never placed on ivory, parchment or plum. Lifestyle and portrait photographs (non-white backgrounds) sit directly on ivory with no cell.

**Logical properties** throughout (`margin-inline`, `padding-block`, `inset-inline-start`, `border-inline-end`, `text-align: start`), so `/ar` is `<html dir="rtl">` plus fonts.

---

## 5. Site map, URL structure, SEO contract

Conventions: lowercase, hyphenated, trailing slash, no `.html`, British spelling in slugs (`jewellery`). `<html lang="en-AE">`. Self-canonical on every page. `hreflang="en-ae"` + `x-default` now; `ar-ae` added only when native Arabic copy ships. Exactly one `<h1>`. `<title>` ≤ 60 chars, meta description ≤ 155 chars with one concrete fact and one CTA. Breadcrumb `<nav aria-label="Breadcrumb">` in HTML mirrors `BreadcrumbList`. `robots: index, follow` (both legacy robots metas deleted). OG: `og:title`, `og:description`, `og:image` (section OG image; product image on piece pages), `og:type`. Twitter card `summary_large_image`. `@astrojs/sitemap` → `/sitemap-index.xml` split pages / jewellery / journal with `lastmod` from content; `/robots.txt` with `Sitemap:` line. 301 map from every old URL (`index.php?page=…`, `/ar`, `/classic.png` assets) in the host's redirects file. Security headers at the host: `Content-Security-Policy: default-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'`, HSTS (1 year, preload), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), geolocation=(), microphone=()`.

### 5.1 Pages

| URL                                 | H1                                                          | Primary intent / keyword                      | Template              | `<title>`                                                        |
| ----------------------------------- | ----------------------------------------------------------- | --------------------------------------------- | --------------------- | ---------------------------------------------------------------- |
| `/`                                 | Gold weighed in front of you. Priced at today's Dubai rate. | brand; "gold jewellers deira"                 | Home                  | Classic Jewels & Diamonds – Gold Jewellers in Deira, Dubai       |
| `/gold-rate/`                       | Today's Gold Rate in Dubai                                  | "gold rate dubai today", 22k/21k/18k rate     | Rate                  | Today's Gold Rate in Dubai – 24K, 22K, 21K, 18K (AED/g)          |
| `/jewellery/`                       | Gold and diamond jewellery, by the gram                     | "gold jewellery deira"                        | Catalogue             | Gold & Diamond Jewellery in Deira, Dubai \| Classic Jewels       |
| `/jewellery/necklaces/`             | Gold necklaces                                              | "gold necklace dubai"                         | Category              | Gold Necklaces in Dubai \| Classic Jewels Deira                  |
| `/jewellery/earrings/`              | Gold earrings                                               | "gold earrings dubai"                         | Category              | Gold Earrings in Dubai \| Classic Jewels Deira                   |
| `/jewellery/rings/`                 | Gold rings                                                  | "gold ring dubai"                             | Category              | Gold Rings in Dubai \| Classic Jewels Deira                      |
| `/jewellery/pendants/`              | Gold pendants                                               | "gold pendant dubai"                          | Category              | Gold Pendants in Dubai \| Classic Jewels Deira                   |
| `/jewellery/bangles/`               | Gold bangles                                                | "gold bangles dubai"                          | Category              | Gold Bangles in Dubai \| Classic Jewels Deira                    |
| `/jewellery/bracelets/`             | Gold bracelets                                              | "gold bracelet dubai"                         | Category              | Gold Bracelets in Dubai \| Classic Jewels Deira                  |
| `/jewellery/chains/`                | Gold chains                                                 | "gold chain dubai"                            | Category              | Gold Chains in Dubai \| Classic Jewels Deira                     |
| `/jewellery/anklets/`               | Gold anklets                                                | "gold anklet dubai"                           | Category              | Gold Anklets in Dubai \| Classic Jewels Deira                    |
| `/jewellery/{category}/{slug}/`     | {Piece name}                                                | piece name + karat + category                 | Product               | {Name} – {Karat} Gold {Category} \| Classic Jewels, Deira        |
| `/gold-jewellery/`                  | 22K and 18K gold jewellery in Dubai                         | "22k gold jewellery dubai"                    | Hub                   | 22K Gold Jewellery in Dubai \| Classic Jewels Deira              |
| `/diamond-jewellery/`               | Diamond jewellery, tested and certified                     | "diamond jewellery dubai"                     | Hub                   | Diamond Jewellery in Dubai \| Classic Jewels & Diamonds          |
| `/uncut-diamond-jewellery/`         | Uncut (polki) diamond jewellery                             | "polki jewellery dubai"                       | Hub                   | Polki & Uncut Diamond Jewellery Dubai \| Classic Jewels          |
| `/gemstone-jewellery/`              | Gemstone jewellery in 22K and 18K gold                      | "gemstone jewellery dubai"                    | Hub                   | Gemstone Jewellery in Dubai \| Classic Jewels Deira              |
| `/gold-coins-and-bars/`             | Gold coins and bars in Deira, Dubai                         | "gold coins dubai", "pamp gold bar dubai"     | Hub                   | Buy Gold Coins & Bars in Deira, Dubai \| Classic Jewels          |
| `/collections/`                     | Collections                                                 | navigational                                  | CollectionIndex       | Jewellery Collections \| Classic Jewels Deira                    |
| `/collections/kolkata/`             | Kolkata jewellery                                           | "kolkata gold jewellery dubai"                | Collection            | Kolkata Gold Jewellery in Dubai \| Classic Jewels                |
| `/collections/rajkot/`              | Rajkot jewellery                                            | "rajkot jewellery dubai"                      | Collection            | Rajkot Gold Jewellery in Dubai \| Classic Jewels                 |
| `/collections/antique/`             | Antique jewellery                                           | "antique gold jewellery dubai"                | Collection            | Antique Gold Jewellery in Dubai \| Classic Jewels                |
| `/collections/temple/`              | Temple jewellery                                            | "temple jewellery dubai"                      | Collection            | Temple Jewellery in Dubai \| Classic Jewels Deira                |
| `/collections/kuwait/`              | Kuwaiti-style gold                                          | "kuwaiti gold design dubai"                   | Collection            | Kuwaiti Gold Jewellery in Dubai \| Classic Jewels                |
| `/collections/singapore/`           | Singapore chains and sets                                   | "singapore chain dubai"                       | Collection            | Singapore Gold Chains in Dubai \| Classic Jewels                 |
| `/collections/turkish/`             | Turkish gold                                                | "turkish gold dubai"                          | Collection            | Turkish Gold Jewellery in Dubai \| Classic Jewels                |
| `/collections/italian/`             | Italian 18K chains                                          | "italian gold chain dubai"                    | Collection            | Italian Gold Chains in Dubai \| Classic Jewels                   |
| `/collections/kids/`                | Children's gold jewellery                                   | "kids gold bangles dubai"                     | Collection            | Kids' Gold Jewellery in Dubai \| Classic Jewels                  |
| `/collections/kerala/` **[owner]**  | Kerala jewellery                                            | "kerala gold jewellery dubai"                 | Collection            | Kerala Gold Jewellery in Dubai \| Classic Jewels                 |
| `/occasions/`                       | Jewellery by occasion                                       | navigational                                  | OccasionIndex         | Gold for Weddings, Anniversaries & Festivals \| Classic Jewels   |
| `/occasions/wedding/`               | Bridal gold sets                                            | "bridal gold set dubai"                       | Occasion              | Bridal Gold Sets in Dubai \| Classic Jewels Deira                |
| `/occasions/anniversary/`           | Anniversary jewellery                                       | "anniversary gold gift dubai"                 | Occasion              | Anniversary Gold & Diamond Gifts Dubai \| Classic Jewels         |
| `/occasions/birthday/`              | Birthday gold                                               | "birthday gold gift dubai"                    | Occasion              | Birthday Gold Gifts in Dubai \| Classic Jewels Deira             |
| `/occasions/festivals/`             | Gold for Diwali, Dhanteras, Akshaya Tritiya and Eid         | "gold for diwali dubai", "eid gold dubai"     | Occasion              | Gold for Diwali, Dhanteras & Eid in Dubai \| Classic Jewels      |
| `/gifts/`                           | Gold gifts that hold their value                            | "gold gift dubai"                             | Occasion              | Gold Gifts in Dubai \| Classic Jewels Deira                      |
| `/custom-jewellery/`                | Custom gold jewellery, made in Deira                        | "custom gold jewellery dubai"                 | Service               | Custom Gold Jewellery in Dubai \| Classic Jewels Deira           |
| `/gold-exchange/`                   | Exchange old gold at 0% deduction                           | "exchange old gold dubai"                     | Service               | Exchange Old Gold in Dubai, 0% Deduction \| Classic Jewels       |
| `/visit/`                           | Visit the shop: Gold Souq Extension, Deira                  | "gold souq extension", "jewellery shop deira" | Visit                 | Jewellery Shop, Gold Souq Extension Deira \| Classic Jewels      |
| `/promise/`                         | Our terms, in writing                                       | brand + promise                               | Page                  | Our Promises: Hallmark, Diamonds, Returns \| Classic Jewels      |
| `/promise/uae-hallmark/`            | The UAE hallmark on every piece                             | "916 hallmark meaning"                        | Page                  | 916 Hallmarked Gold: What It Means \| Classic Jewels             |
| `/promise/certified-diamonds/`      | Diamonds tested in-store, certified on request              | "certified diamonds dubai"                    | Page                  | Tested & Certified Diamonds \| Classic Jewels Deira              |
| `/promise/returns-and-maintenance/` | 14 days to return. Lifetime maintenance.                    | "jewellery return policy dubai"               | Page                  | Lifetime Maintenance & 14-Day Returns \| Classic Jewels          |
| `/promise/gold-exchange-terms/`     | Gold exchange terms                                         | "0 deduction gold exchange terms"             | Page                  | 0% Deduction Gold Exchange Terms \| Classic Jewels               |
| `/about/`                           | About Classic Jewels & Diamonds                             | brand                                         | Page                  | About Classic Jewels & Diamonds \| Classic Group, Dubai          |
| `/contact/`                         | Contact Classic Jewels & Diamonds                           | brand + contact                               | Contact               | Contact Classic Jewels & Diamonds, Deira                         |
| `/contact/sent/`                    | Message received                                            | — (noindex)                                   | Page                  | Message received \| Classic Jewels                               |
| `/journal/`                         | Journal                                                     | informational hub                             | ArticleIndex          | Journal: Gold Rates, Hallmarks & Buying Guides \| Classic Jewels |
| `/journal/{slug}/`                  | {Article headline}                                          | tourist/informational clusters                | Article (BlogPosting) | per article, ≤ 60                                                |
| `/news/`                            | News and events                                             | brand                                         | ArticleIndex          | News & Events \| Classic Jewels & Diamonds                       |
| `/news/{slug}/`                     | {Headline}                                                  | brand                                         | Article (NewsArticle) | per item                                                         |
| `/gallery/`                         | Gallery                                                     | brand                                         | Gallery               | Gallery \| Classic Jewels & Diamonds, Deira                      |
| `/privacy/`                         | Privacy policy                                              | legal                                         | Legal                 | Privacy Policy \| Classic Jewels & Diamonds                      |
| `/terms/`                           | Terms of use                                                | legal                                         | Legal                 | Terms \| Classic Jewels & Diamonds                               |
| `/404`                              | Nothing at this address.                                    | — (noindex)                                   | NotFound              | Page not found \| Classic Jewels                                 |
| `/ar/…`                             | reserved, mirrored 1:1                                      | Arabic clusters                               | —                     | ships only after native review                                   |

Not built: per-karat rate pages, per-facet pages, `/products/`, `/blog/` (301 → `/journal/`), `/shop/`.

### 5.2 Primary navigation

Header: Jewellery (mega) · Collections · Occasions · Gold rate · Coins & bars · Our story · Visit. Right: Call (text link, ≥ 1024), WhatsApp (secondary button). Mega panel under "Jewellery": column 1 "By piece" (8 categories + "All jewellery"); column 2 "By material" (22K & 18K gold, Diamond, Uncut diamond, Gemstone, Coins & bars); column 3 "By collection" (9–10); column 4 plum-050 rate panel: 22K / 24K / 21K / 18K baked values, date, link "Today's rate". Footer columns: Jewellery (categories + hubs) · Collections · Services (Gold exchange, Custom, Gifts, Occasions) · The shop (Visit, Contact, About, Promise, Journal, News, Gallery) · Legal.

### 5.3 Content collections (`src/content/`, zod-typed; all copy strings live here, not in components)

- `site` (singleton `site.ts`): `name, legalName, registrationNo, trn [owner], email [owner, single], phoneLandline '+97142551288', phoneWhatsApp '+971505661416', address{streetAddress 'Shop No. 6, Mariyam Plaza (Multistorey Car Parking Building), Gold Souq Extension, behind RAK Bank', locality 'Deira', region 'Dubai', country 'AE'}, plazaSpellingNote, geo{lat,lng ≥5dp} [owner], mapsCid '14419653802905195883', mapsShort, hours: OpeningHours[] | null [owner], social{instagram,tiktok,facebook,x,threads}, claims{yearsInGold [owner], foundingYear 2024, bareeq: boolean [owner], planetTaxFree: boolean [owner], diamondLabs: string[] [owner]}, payment['Visa','Mastercard','American Express','Maestro','PayPal','Cash'], pricing{mode: 'quote' | 'indicative' [owner], vatRate 0.05}`.
- `categories` (8): `slug, name, plural, cutout, intro (150–300 words), faqs[3], metaDescription`.
- `materials` (5): `slug, name, hubIntro, faqs, metaDescription`.
- `collections` (9–10): `slug, name, origin, descriptor (≤ 90 chars) [owner], karatRange, weightRangeG, makingChargeBasis, intro (150–300 words) [owner], wordmark, heroImage?, faqs[3], metaDescription, live: boolean`.
- `products`: `sku, name, slug (= name-kebab + '-' + sku lower), category, material, collections[], occasions[], karat (24|22|21|18), fineness (999|916|875|750), grossWeightG, netGoldWeightG?, stones[{type, weightCt?, count?}], certification ('tested-in-store' | lab name + no.), finish, size?, images[] (≥1), description (2–4 sentences), featured: boolean, availability ('in-store' | 'sold' | 'made-to-order'), makingChargeAEDPerG? (Option B only), publishedAt, updatedAt`.
- `occasions` (4) + `gifts`: `slug, name, portrait, intro, picks (product skus), faqs`.
- `promises` (4): `slug, title, statement, covers[], excludes[], howToClaim, terms (body, ≥ 80 words) [owner]` — a promise page is built only when `terms` is present; otherwise the ledger row links to `/promise/`.
- `rates`: one JSON per date `{date, k24, k22, k21, k18, k14, fetchedAt}` written by the daily job (§9); the latest entry feeds every rate surface; history grows in git.
- `journal`, `news`: `title, slug, standfirst, author{name, role}, publishedAt, updatedAt, cover, body (MDX), related[]`.
- `faq` (site-level): `id, question, answer, surfaces[]`.
- `gallery`: `image, caption, taken?`.

### 5.4 JSON-LD per template (one `<script type="application/ld+json">` per page, `@graph`, stable `@id`s)

- Every page: `WebSite {@id #website, name, alternateName 'Classic Jewels', url}` (no SearchAction) + `JewelryStore {@id #store}` with name, legalName **[owner]**, url, logo (ImageObject ≥ 112 px on white), image[] (shopfront, interior), telephone, contactPoint (sales, WhatsApp number, availableLanguage **[owner]**), email **[owner]**, address, geo **[owner]**, hasMap `https://www.google.com/maps?cid=14419653802905195883`, openingHoursSpecification (from `site.hours`; omitted when null), priceRange 'AED 300–50,000+', currenciesAccepted 'AED', paymentAccepted, areaServed, foundingDate '2024', parentOrganization {Organization 'Classic Group of Companies', url}, sameAs[], slogan 'Every Jewel Has A Tale', hasMerchantReturnPolicy {applicableCountry 'AE', returnPolicyCategory MerchantReturnFiniteReturnWindow, merchantReturnDays 14, returnMethod ReturnInStore, returnFees FreeReturn}. Never aggregateRating/review.
- Non-home pages: `BreadcrumbList`.
- Category, hub, collection, occasion: `CollectionPage` + `ItemList` (ListItem name/image/url).
- Product: `Product {name, image[], description, sku, brand{Brand}, category 'Jewellery > {Category}', material '{Colour} gold {karat}K ({fineness})', weight{QuantitativeValue, unitCode GRM}, additionalProperty [Karat, Fineness, Net gold weight, Stones, Certificate], itemCondition NewCondition, isRelatedTo collection URL}`. Option A (default `pricing.mode: 'quote'`): no `offers`; README documents the Search Console "offers/review/aggregateRating" warning. Option B (`'indicative'`): visible "Today's indicative price" line and `offers {price, priceCurrency 'AED', availability InStoreOnly, priceValidUntil (today), seller #store, availableAtOrFrom #store, url}`. Never an Offer without price; never price 0.
- Journal: `BlogPosting`; News: `NewsArticle` (author{name,url}, datePublished/dateModified ISO 8601 with offset, image ≥ 50 k px, 16/9 + 4/3 + 1/1 renditions). Gallery: `ImageGallery`. Rate page: `WebPage` + `BreadcrumbList` (+ `Dataset` optional, no rich result claimed). No `FAQPage` anywhere.

Alt-text template (products): `{name}, {karat}K gold {category}, {grossWeightG} g, Classic Jewels Deira`. Lifestyle/place images: literal description of what is shown (no keywords stuffed). Decorative glyphs: `aria-hidden="true"`.

---

## 6. Component inventory with states

> **Superseded** by `docs/design-system-v2.md` §5.

All interactive elements: `:focus-visible { outline: 2px solid var(--focus); outline-offset: 3px }` (`--focus-on-plum` on plum); minimum 44 × 44 px hit area; `cursor: pointer` only on real controls. Icons: one inline SVG sprite (`/src/assets/icons.svg`, 12 monoline glyphs at 1.25 px stroke, `currentColor`): whatsapp, phone, map-pin, arrow-right, arrow-up-right, plus, minus, menu, close, copy, check, external. The C-ring glyph: `<circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.25" pathLength="100" stroke-dasharray="89 11" transform="rotate(50 8 8)"/>` (40° gap centred at 4 o'clock; designer matches the gap angle to the logo's C aperture).

1. **SkipLink** — `--surface-0`, plum text, visible on focus at top-start. States: hidden, focused.
2. **UtilityStrip** (`--surface-plum-deep`, 36 px ≥ 768, 32 px below; not sticky) — start: "22K today AED {k22} / g · {d Mon}" (`--gold-300` numerals, `--t-numeral` size 0.875rem, `tabular-nums`, `<time datetime>`); end (≥ 768): "+971 4 255 1288 · Shop 6, Gold Souq Extension, Deira". Truncation: < 768 hide the end group; < 400 hide the date. States: live (baked), refreshed (island updated silently), stale (`gold_rate_date` older than 2 calendar days → "last updated {d Mon}" in `--ink-on-plum-muted`), failed-at-build (strip shows "Today's rate at the shop: +971 4 255 1288", no empty slot). `aria-live="off"`.
3. **SiteHeader** (`--surface-1`, 72 px ≥ 1024, 56 px below; sticky ≥ 1024 only) — logo lockup (plum on ivory SVG **[owner to supply vector]**; interim: 40 px plum square with the white monogram, as on the fascia); nav; Call; WhatsApp secondary button; "Menu" button < 1024 (`aria-expanded`, `aria-controls`). States: top, scrolled (1 px rule), mega-open, drawer-open, current page (1 px `--gold-600` underline, `text-underline-offset: .35em`), focus.
4. **MegaNav** (`--surface-0`, 1 px `--rule-1` top and bottom, four columns per §5.2) — opens on hover intent (120 ms) and on click/Enter; Esc closes; arrow keys move within a column; `aria-haspopup="true"`. States: closed, open, keyboard-open, reduced-motion (no fade).
5. **MobileDrawer** (`<dialog>`, full height, `--surface-plum-deep`, slides from inline-end 240 ms; `inert` on `main`; scroll-locked) — Bodoni `--t-h3` links; accordion groups (By piece / By material / By collection) using `<details>`; rate line repeated at the foot; bottom row Call · WhatsApp · Visit. States: closed, open, group-expanded, reduced-motion (no slide).
6. **Hero** (5/7; variants: home, hub, collection, occasion, service) — eyebrow, H1, lead, two buttons, media column. Mobile DOM order: text block then media. LCP: desktop = hero image (`fetchpriority="high"`, `loading="eager"`, `<link rel="preload" imagesrcset imagesizes>`); mobile = H1 text. States: none; `media: 'image' | 'plate' | 'none'` (typographic hero spans 7/12 with a margin note in the gutter).
7. **RateBoard** (`--surface-plum`; variants: `band` (home), `full` (rate page), `mini` (mega-nav, plum-050), `line` (utility strip), `value` (PDP)) — `<table>` with `<caption>` (visually hidden on band), rows 24K / 22K / 21K / 18K / 14K: karat label (`--t-h3`, Bodoni, `--ink-on-plum`), fineness (`--t-small`, `--gold-500`), figure (`--t-numeral-xl`, Bodoni, `--gold-300`, `tabular-nums`, cell `min-inline-size: 6ch; text-align: end`), unit "AED / g" (`--t-small`, `--gold-500`), delta column (only when the previous trading day exists in `rates`: "+2.50" in `--ok-on-plum` / "−1.25" in `--err-on-plum`, computed at build). Inner rules `--rule-on-plum`; outer 1 px `--rule-gold` top and bottom. Footnote: "Indicative. AED per gram, as posted on our board at Shop 6. Your price = rate × net gold weight + making charge + 5 % VAT, quoted per piece." `<time datetime="{date}">Updated {d Mon yyyy}</time>`. States: baked (default, no spinner ever), refreshed (figures replaced in place without animation; `aria-live="polite"` on the date only), stale (date in `--ink-on-plum-muted`, footnote prefixed "Last posted"), build-fetch-failed (board shows last `rates` entry with "as of {date}"; if none, board collapses to "Today's rate: call +971 4 255 1288"), print (`@media print`: plum removed, black table on white, address and URL in the footer line).
8. **AssuranceLedger** (two ruled columns ≥ 900, one below; rows 01–06; variant `condensed` = three rows on PDP) — row: number (`--t-ledger-no`, `--gold-600`), title (`--t-h3`), one-line fact (`--t-body`, `--ink-700`), arrow glyph; the whole row is one link to its `/promise/` page (or `/promise/` when that page is not built). States: default, hover (title underline `--gold-700`), focus.
9. **CategoryTile** (`--surface-1`, 5/2 cutout box, name `--t-title`, count `--t-small` "14 pieces") — whole tile is one anchor. States: default, hover (name underline), focus, empty (count hidden; tile still links). Coins & bars has no cutout: a typographic tile with the coin plate at 1/1 in a 5/2 box.
10. **CollectionIndex** (numbered list, 5/7 with stamps) — rows "01 Kolkata — descriptor — 22K"; stamps column: 3-column tray of `WordmarkStamp` cells. States per row: default, hover, focus, not-live (hidden at build).
11. **WordmarkStamp** — 160 × 56 `--surface-0` cell with 1 px `--rule-1`, wordmark `max-inline-size: 120px` centred, `alt="{Collection} collection"`. State: `svg` (recoloured `--plum-700`) once supplied.
12. **TrayGrid** — §4 technique; 2 columns < 640, 3 < 1024, 4 ≥ 1024; `data-category`, `data-karat`, `data-weight` on cells for filtering.
13. **ProductCard** — `<a href>` wrapping: Plate, name (`--t-title`, `--ink-900`), fact line (`--t-numeral` 0.9375rem: "22K · 18.4 g · Kolkata"), value line (`--t-small`, `--ink-500`: "Gold value today ≈ AED 8,530" baked; omitted when `netGoldWeightG` missing), and a `<button data-wa="{sku}">Enquire</button>` (text button, stops propagation; `form.ts` builds the wa.me URL from `data-*`). States: default, hover (name underline `--gold-700`), focus (ring on the card), sold (`--ink-500` chip "Sold · ask for similar", value hidden), made-to-order (chip "Made to order"), no-image (`--plum-050` plate with the C-ring at 48 px and the name only), rate-stale (value line omitted at build).
14. **ProductGallery** — ≥ 1024: stacked 1/1 plates in column 1–7, no carousel; < 1024: horizontal scroll-snap strip (`scroll-snap-type: x mandatory`, 100 % cells, "1 / 4" counter in `--t-small`, no arrows). Tap opens the full-size image in a native `<dialog>` (`gallery.ts`, ≤ 1 KB). States: single-image (no counter), multi, dialog-open.
15. **SpecTable** (`--surface-2` head column, rows: Karat and hallmark "22K · 916", Gross weight, Net gold weight, Stones, Certificate, Finish, Size, Reference) — rows with missing values are omitted, never "—".
16. **PriceLine** (PDP, under SpecTable) — Option A: "Priced at today's 22K rate × net gold weight, plus making charge and 5 % VAT, quoted in store." with "today's 22K rate" linking to `/gold-rate/`; baked "Gold value today: AED {n} ({net g} × {rate})" when net weight exists. Option B: "Today's indicative price: AED {n} (incl. VAT) · valid {date}". No-JS: baked values stand. States: baked, refreshed, omitted (no net weight), stale.
17. **EnquiryBlock** — primary "Enquire on WhatsApp" (`https://wa.me/971505661416?text=` + URL-encoded `Hello Classic Jewels, I'm interested in {name} (ref {sku}, {karat}K, {grossWeightG} g). Is it available today? {url}`), secondary "Call +971 4 255 1288", text link "Visit Shop 6", text button "Copy reference" (clipboard; fallback selects the SKU text), text link "Request the certificate" (WhatsApp prefill naming the certificate). States: default, copied (check glyph + "Copied" 2 s, `aria-live="polite"`), sold (primary becomes "Ask for a similar piece").
18. **OccasionFeature** — 3/5 portrait, caption below: eyebrow (occasion), one fact line, arrow link. 4-up ≥ 1024, 2×2 below. No overlay, no text on image. States: default, hover (caption link underline), focus.
19. **PlumBand** (`--surface-plum`; variants: old-gold (two columns: Exchange | Coins & bars), how-buying-works (four numbered steps), rate (wraps RateBoard)) — eyebrow `--gold-300`, H2 `--ink-on-plum`, body `--ink-on-plum-muted`, buttons: primary on plum = `--surface-1` fill with plum text; secondary = 1 px `--gold-300` outline, `--gold-300` text. States: static.
20. **StoryBand** (7/5 image/text, ivory, margin note in gutter) — static.
21. **VisitBlock** — `<address>` (NAP byte-identical to footer and JSON-LD), `HoursTable` (renders only from `site.hours`; "Today" row highlighted by `nav.ts` using `Intl` day; when `hours` is null the block shows "Call +971 4 255 1288 for today's hours"), MapImage 4/3 linking to the Maps short link (`rel="noopener"`), parking note (fixed string, §7), buttons "Get directions" (primary) / "WhatsApp". States: hours-present, hours-null.
22. **FAQ** — `<details>` rows on 1 px `--rule-1`; `<summary>` Bodoni `--t-h3` with `::after` plus/minus glyph; answer in `--surface-2` padding `--space-5`. States: closed, open, focus, reduced-motion (no height transition; none is used anyway).
23. **JournalCard** — 3/2 image, eyebrow (date + reading time), `--t-h3` title, two-line standfirst (`-webkit-line-clamp: 2`). States: default, hover (title underline), focus.
24. **Breadcrumbs** — `--t-small`, `--ink-500`, "/" separators `aria-hidden`, current item `aria-current="page"` plain text.
25. **Buttons** — primary: `--plum-700` fill, `--ink-on-plum` text, `--t-title`, 48 px min-height, `padding-inline: var(--space-5)`, radius 0; hover `--plum-900`; active `--plum-900` + 1 px inset `--rule-gold`; disabled `--ink-300` on `--surface-2`, `aria-disabled`. Secondary: 1 px `--plum-700` outline, plum text; hover `--plum-050` fill. Text button: underline on hover only. WhatsApp: primary with the whatsapp glyph at inline-start, label "WhatsApp" or "Enquire on WhatsApp"; never green.
26. **Links** — `--link`, `text-decoration: underline 1px var(--rule-2)`, `text-underline-offset: .15em`; hover `--link-hover` with underline `--gold-600`. External links get the `external` glyph.
27. **Form fields** — label above (`--t-small` 500), input 48 px, `--surface-0`, 1 px `--rule-input`, radius 0; focus 2 px plum; error 1 px `--err` + message below with the `err` colour and `aria-describedby`; required marked in the label text ("Phone (required)"), no asterisk alone. Textarea 6 rows. Honeypot field `name="company"` visually hidden; time-trap hidden `ts` field.
28. **ContactForm** — fields: Name, Phone or email, Message, Piece reference (optional, prefilled from `?ref=`), honeypot. `method="post" action="/api/contact"` (host function emails `site.email`); no-JS → redirect to `/contact/sent/`; with `form.ts` → inline success. States: default, submitting (button label "Sending…", `aria-busy`), sent, error (inline, retains input), honeypot-rejected (silent 200).
29. **Filters** (category/collection pages; `filter.ts` part of the 8 KB) — chip row (`<button aria-pressed>`) for category / karat / weight band + `<select>` sort (weight ↑↓, newest); hides non-matching tray cells; state in `location.hash` (`#karat=22&cat=bangles`), no new URLs, no history entries; "{n} pieces shown · Clear". No-JS: chips are in-page anchors to category sub-headings. States: idle, filtered, empty ("No pieces match. Ask us on WhatsApp — we have more in the trays than online."), reduced-motion (no fade).
30. **Footer** (`--surface-plum-deep`, 1 px `--rule-gold` top) — white logo, five columns (§5.2), `<address>`, hours (if present), phone + WhatsApp, single email **[owner]**, social text links with glyphs, "Payment in store: Visa, Mastercard, American Express, Maestro, PayPal, cash.", legal row "Classic Jewels & Diamonds · Registration no. 1921575 · © {build year}". No newsletter field.
31. **MobileActionBar** (< 1024, fixed bottom, 56 px + `env(safe-area-inset-bottom)`, `--surface-1`, 1 px `--rule-1` top) — three equal cells: WhatsApp · Call · Visit (glyph + label). States: default, hidden (drawer open; any input focused; `visualViewport` height drop > 150 px), focus.
32. **NotFound** — the only centred layout: C-ring 64 px `--gold-600`, H1 "Nothing at this address.", lead "The shop is still at Shop 6, Mariyam Plaza. Try the pieces, today's rate, or message us.", three links + WhatsApp. No redirect script; `noindex`.
33. **OGImage** (build-time, 1200 × 630) — ivory ground, plum logo lockup, Bodoni title, bronze rule; product variant: plate at left 630², title at right.

---

## 7. Page compositions

> **Superseded** by `docs/design-system-v2.md` §6 and §8 (the URL structure in §5 of this file still stands).

Copy below is final unless marked **[owner]**. `{years}` = `site.claims.yearsInGold`. Rate figures in examples are placeholders for the baked value and must never be hard-coded.

### 7.1 Home

1. SkipLink · UtilityStrip · SiteHeader.
2. **Hero** (ivory, 5/7, media = `hero-32.jpg` / `hero-45.jpg`). Eyebrow: "Gold & diamond jewellers · Gold Souq Extension, Deira". H1 (`--t-display`): "Gold weighed in front of you. Priced at today's Dubai rate." Lead: "22K and 18K jewellery, tested diamonds and 24K coins from Shop 6, Mariyam Plaza, behind RAK Bank. We are the jewellery house of the Classic Group, gold traders and refiners in Dubai for {years} years." Buttons: primary "WhatsApp the shop" (prefill: "Hello Classic Jewels, I'd like to ask about a piece."); secondary "Today's gold rate" (`#rate`). Image caption (`--t-caption`): from content, describes the photo literally.
3. **RateBoard band** (plum, `id="rate"`). Eyebrow: "Today's rate · Dubai · AED per gram". H2: "The board, as it reads in the shop." Five rows; date; footnote (§6.7). Links: "How a piece is priced" → `/gold-rate/#pricing`; "Exchange old gold" → `/gold-exchange/`.
4. **AssuranceLedger** (ivory). Eyebrow: "Our terms, in writing". H2: "Six things you can hold us to." Rows:
   01 "The UAE hallmark on every piece" — "22K is stamped 916, 18K 750, 21K 875. Fineness and weight are printed on your invoice."
   02 "Diamonds tested in-store, certified on request" — "Every stone is tested before it reaches the tray. Certificates from {diamondLabs} come with the invoice." **[owner: labs]**
   03 "Old gold exchanged at 0 % deduction" — "Weighed and tested in front of you, credited at the day's rate against a new piece. Terms on the exchange page."
   04 "14 days to return" — "Unworn, with the original invoice and certificate." **[owner: confirm]**
   05 "Lifetime cleaning, polishing and stone-tightening" — "Free, for as long as you own the piece."
   06 "Exchange for any other piece" — "Of equal or higher value, at the day's rate." **[owner: confirm]**
5. **By piece** (ivory). Eyebrow: "By piece". H2: "Necklaces to anklets, by the gram." Sub: "Every listing states karat, hallmark and gross weight." Eight CategoryTiles 4×2 (2×4 mobile). Below, a ruled text row: "Also: 22K & 18K gold · Diamond · Uncut diamond · Gemstone · Coins & bars."
6. **From the trays** (white tray on ivory). Eyebrow: "From the trays". H2: "Nine pieces from Shop 6, weighed and ready to quote." Nine ProductCards (`featured: true`, build fails if fewer than 6). Link: "All jewellery".
7. **Collections** (ivory, 5/7). Eyebrow: "Collections". H2: "By origin, by style, by stone." Sub: "Named for the place whose goldsmiths set the style, for a tradition, or for who will wear it." CollectionIndex 01–09 (10 with Kerala). Draft descriptors **[owner to verify each]**: Kolkata — "Hand-pierced filigree, chokers and sita haar, 22K"; Rajkot — "Lightweight die-struck sets and chains, mirror polish, 22K"; Antique — "Oxidised nakshi and kundan-set work, 22K"; Temple — "Deity motifs, haram and jhumka, 22K"; Kuwait — "Broad bangles and heavy chains, 21K and 22K"; Singapore — "Fine machine chains, light on the gram, 22K"; Turkish — "Rope and mesh work, 18K and 22K"; Italian — "Hollow 18K chains and bracelets"; Kids — "Bangles, chains and anklets sized for children, 22K"; Kerala — "Palakka, mulla mottu and nagapadam, 22K". Right: WordmarkStamp tray 3×3 (3×4).
8. **Occasions** (ivory, rule above). Eyebrow: "Occasions". H2: "Wedding sets. Anniversary diamonds. Birthday gold. Festival coins." Four OccasionFeatures; captions: "Wedding — 22K bridal sets, bangles and haram"; "Anniversary — 18K diamond pieces with certificates"; "Birthday — pendants, chains and kids' bangles"; "Festivals — coins and Lakshmi pendants for Dhanteras, Diwali, Akshaya Tritiya and Eid". Link: "All occasions".
9. **Old-gold band** (plum, two columns). Column 1 — eyebrow "Old gold"; H2 "Bring old gold. Leave with its full weight."; body "We weigh and test it in front of you and credit every gram at the day's rate against a new piece, with 0 % deduction. The Classic Group has bought and refined scrap gold in Dubai for {years} years; we price old gold the way traders do."; secondary button "How exchange works". Column 2 — eyebrow "Coins and bars"; H3 "24K coins and PAMP bars at the day's rate."; body "Coins in 22K and 24K from 1 g; PAMP Suisse bars with the assay card. Priced near the rate with no making charge. Ask for the coin premium before you come in."; secondary button "Ask today's coin price" (WhatsApp prefill).
10. **Story** (ivory, 7/5). Eyebrow: "Classic Group". H2: "Gold traders first. Jewellers since 2024." Body: "The Classic Group has traded, bought and refined gold in Dubai for {years} years. In 2024 we opened Classic Jewels & Diamonds at Shop 6 to sell what we know best: honest weight, correct karat, stones with paperwork." Link: "Our story". Margin note: "Every jewel has a tale."
11. **Visit** (ivory, 5/7, rule above). Eyebrow: "Visit". H2: "Shop 6, Mariyam Plaza. Behind RAK Bank." `<address>`; HoursTable; "Parking: the shop is inside the Mariyam Plaza multistorey car-park building itself."; MapImage; buttons "Get directions" / "Call +971 4 255 1288".
12. **Journal** (ivory, rule above; rendered only when ≥ 3 published posts). Eyebrow: "Journal". H2: "Notes on gold, rates and hallmarks." Three JournalCards. Link: "All articles".
13. **FAQ** (ivory, rule above). H2: "Questions we answer at the counter." Six items from `faq` tagged `home`: how a piece is priced; how often the rate changes; what 916 means; what you need to exchange old gold; whether diamonds come with certificates; whether tourists can reclaim VAT (**[owner: Planet]**).
14. Footer · MobileActionBar.

### 7.2 Catalogue index `/jewellery/`

Hero (typographic, 7/12, no media): eyebrow "Jewellery"; H1 "Gold and diamond jewellery, by the gram."; lead "Every piece lists karat, hallmark and gross weight. Prices follow today's Dubai rate plus a making charge quoted per piece." → CategoryTile grid (8 + 5 material text tiles) → Filters + TrayGrid of all `in-store` and `made-to-order` pieces (newest first) → condensed ledger → FAQ (3) → EnquiryBlock (generic prefill).

### 7.3 Category page `/jewellery/{category}/`

Breadcrumbs → Hero (5/7, media = category cutout in a 5/2 box on the right, or the first product plate): eyebrow "By piece"; H1 "Gold {plural}"; lead = `categories.intro` first sentence; secondary button "Enquire on WhatsApp" → Filters (karat 22K/18K/21K, collection, weight band; sort) → TrayGrid → prose block (`categories.intro`, 150–300 words, H2 "Choosing a {singular} in Deira") → "Also by collection" chip row → FAQ (3 from `categories.faqs`) → condensed ledger → EnquiryBlock (prefill "Hello Classic Jewels, I'm looking for a gold {singular}. What do you have in 22K this week?").

### 7.4 Material hubs `/gold-jewellery/`, `/diamond-jewellery/`, `/uncut-diamond-jewellery/`, `/gemstone-jewellery/`, `/gold-coins-and-bars/`

Breadcrumbs → Hero (5/7, plate media): H1 per §5.1; leads: gold — "916-hallmarked 22K and 750-hallmarked 18K, priced at the day's rate plus making charge."; diamond — "Set in 18K gold, tested in-store, certified by {diamondLabs}."; uncut — "Polki set in 22K and 18K; stones tested, settings hallmarked."; gemstone — "Emerald, ruby, sapphire and navaratna in 22K and 18K, stones tested."; coins — "22K and 24K coins from 1 g and PAMP Suisse bars, priced near the rate with no making charge." → explanatory prose (150–300 words, H2s: "22K or 18K", "How it is priced", "What is on the invoice"; coins page: H2s "Weights we stock" (1 g, 5 g, 10 g, 1 tola, 50 g, 100 g **[owner]**), "Coin premium", "Verifying a bar") → Filters + TrayGrid (`material = slug`) → FAQ (3) → EnquiryBlock. Coins page prefill: "Hello Classic Jewels, what is today's price for a {weight} {karat} coin / PAMP bar?"

### 7.5 Collection index `/collections/`

Hero (typographic): H1 "Collections"; lead "Nine ways of working gold, each with its own weight, finish and karat." (count from content). CollectionIndex full width (rows show stamp, descriptor, karat range, "{n} pieces") → FAQ (2) → EnquiryBlock.

### 7.6 Collection detail `/collections/{slug}/`

Breadcrumbs → Hero (5/7, media = `heroImage` plate or WordmarkStamp enlarged on ivory when no image): eyebrow "Collection · {karatRange}"; H1 "{Name} jewellery"; lead = first sentence of `intro`; stamp → **Facts row** (ruled, four cells: Karat "{karatRange}" · Typical gross weight "{weightRangeG} g" · Making charge "{makingChargeBasis}" · Hallmark "916 / 750") → Filters + TrayGrid → prose (`intro`, H2 "{Name} work: origin, technique, weight") → **How buying works** plum band: eyebrow "At the counter"; H2 "Weighed, rated, hallmarked, invoiced."; steps 01 "We weigh the piece in front of you." 02 "We apply the day's rate per gram for its karat." 03 "We quote the making charge for the work." 04 "You leave with the hallmark on the piece and the weight, fineness and rate on the invoice." → FAQ (3) → "Not seeing it? We make to order." EnquiryBlock (prefill "Hello Classic Jewels, I'd like to see {Name} pieces. What's in the trays this week?") → Related collections (three WordmarkStamps + names).

### 7.7 Product detail `/jewellery/{category}/{slug}/`

Breadcrumbs (Home / Jewellery / {Category} / {Name}) → 7/5: column 1–7 ProductGallery; column 8–12 sticky (`top: 88px`): eyebrow "{Collection} · {Category}"; H1 "{Name}"; `description`; SpecTable; PriceLine; EnquiryBlock; condensed ledger (rows 01, 02, 04); below full width: "Also in {Collection}" TrayGrid of four; FAQ (2: "Can I see it before I decide?", "Does the price include VAT?"). Mobile order: breadcrumbs, eyebrow, H1, gallery strip, description, SpecTable, PriceLine, EnquiryBlock, ledger, also-in. Sold state: H1 keeps the page, gallery stays, PriceLine replaced by "Sold. Ask for a similar piece.", JSON-LD omits offers.

### 7.8 Gold rate page `/gold-rate/`

Breadcrumbs → Hero (typographic, 7/12): eyebrow "Gold rate · Dubai"; H1 "Today's Gold Rate in Dubai"; lead "AED per gram for 24K, 22K, 21K, 18K and 14K, as posted on our board at Shop 6, Gold Souq Extension, Deira. Updated {d Mon yyyy}." → RateBoard `full` (plum band, `<caption>` "Gold rate in Dubai, AED per gram, {date}") → prose sections (68ch, each H2 an anchor): "How the rate is set" (Dubai Jewellery Group recommended retail rate per gram, derived from market data plus a retail margin, posted on member boards and supervised by Dubai Economy's consumer protection department; we post the latest rate from our board and refresh the site during the day) · "What you pay for a piece" (`id="pricing"`: "Price = rate × net gold weight + making charge + 5 % VAT." Worked example from the baked rate: "An 8 g 22K bangle at AED {k22}/g is AED {8×k22} in gold, plus the making charge for the work, plus VAT.") · "Coins and bars" (two lines, link) · "Exchanging old gold" (two lines, link) · "Rate history" (table of the last 7 then 30 days from `rates`; section rendered only when ≥ 7 entries; monthly tables added later) · "Questions" (FAQ `<details>`: how often it changes; why shop price differs from spot; which karat to buy; is gold cheaper in Dubai than India (answer limited to rate and VAT facts); can tourists reclaim VAT **[owner: Planet]**) → EnquiryBlock (prefill "Hello Classic Jewels, I'd like a quote at today's rate for …"). Print stylesheet active.

### 7.9 About `/about/`

Hero (5/7, media = about lifestyle 3/2): eyebrow "Classic Group · Deira"; H1 "About Classic Jewels & Diamonds"; lead "A jewellery house opened in 2024 by a group that has traded, bought and refined gold in Dubai for {years} years." → prose with H2s: "Gold traders first" (group: bullion, scrap buying, refining; sister companies **[owner]**), "The shop" (Shop 6, 2024, what is on the trays), "How we sell" (weigh, rate, making charge, hallmark, invoice), "The people" (named staff, roles, photo **[owner]**), "Our terms" (ledger). Margin notes: "Where elegance meets eternity." beside "The shop"; "A treasure as unique as you." beside "The people". → Visit block (compact) → EnquiryBlock.

### 7.10 Promise index and pages `/promise/`, `/promise/{slug}/`

Index: H1 "Our terms, in writing"; lead "Six commitments, each with its conditions stated."; full AssuranceLedger; link row to the four pages. Each page: Breadcrumbs → typographic hero: eyebrow "Promise 0{n}"; H1 per §5.1; `statement` as lead → H2 "What it covers" (list with C-ring markers) → H2 "What it does not cover" → H2 "How to claim it" (bring invoice; WhatsApp or visit) → H2 "Terms" (`terms` body **[owner]**) → FAQ (2) → EnquiryBlock. Hallmark page adds H2 "Reading the stamp" (999 / 916 / 875 / 750 table, DCL inspection note, Bareeq mention only if `claims.bareeq`).

### 7.11 Visit `/visit/`

Breadcrumbs → Hero (5/7, media = shopfront photo when available, else MapImage): eyebrow "Visit"; H1 "Visit the shop: Gold Souq Extension, Deira"; lead "Shop 6, Mariyam Plaza, the multistorey car-park building behind RAK Bank, Gold Souq Extension, Deira, Dubai."; buttons "Get directions" / "WhatsApp" → ruled 2-column: `<address>` + phones + email; HoursTable (or null state) → H2 "Getting here": "By metro: Gold Souq station (Green Line), then on foot to the Gold Souq Extension **[verify route and minutes]**." "By car: park inside the Mariyam Plaza multistorey car park; the shop is in the same building." "By taxi: ask for RAK Bank, Gold Souq Extension." → H2 "What to bring": "To exchange old gold: the gold and your Emirates ID or passport. For a VAT refund: your passport; we issue the tax-free tag with the invoice **[owner: Planet registration]**." → MapImage 4/3 → FAQ (3: Friday hours, nearest parking, note on 'Maryam' spelling used by Ithra Dubai) → EnquiryBlock.

### 7.12 Contact `/contact/`

Hero (typographic): H1 "Contact Classic Jewels & Diamonds"; lead "WhatsApp is fastest during shop hours. Calls go to the counter. Messages sent here are answered by email or phone." → three ruled cells: WhatsApp (+971 50 566 1416, button), Call (+971 4 255 1288), Visit (address, directions link) → ContactForm (7/12) with the privacy line "We use your details only to reply." → Footer. `/contact/sent/`: H1 "Message received", one line, links to jewellery and rate; `noindex`.

### 7.13 Custom jewellery `/custom-jewellery/`

Breadcrumbs → Hero (5/7, media = a made-to-order plate or the counter photo): eyebrow "Made to order"; H1 "Custom gold jewellery, made in Deira"; lead "Bring a sketch, a photo or an heirloom. We agree the karat, the weight and the making charge before any work begins."; buttons "Send a photo on WhatsApp" (prefill "Hello Classic Jewels, I'd like to make a custom piece. I can send a photo or sketch.") / "Call" → numbered ledger: 01 "Brief" — "A sketch, a reference photo or a piece to remake." 02 "Quote" — "Karat, estimated weight, making charge and timeline, in writing." 03 "Make" — "{timeline} **[owner]**; a photo before final polish." 04 "Collect" — "Hallmarked, weighed in front of you, invoiced." → TrayGrid of `made-to-order` examples (if ≥ 3) → H2 "Remaking old gold" (link to exchange: old gold credited at full weight toward the new piece) → FAQ (3) → EnquiryBlock.

### 7.14 Gold exchange `/gold-exchange/`

Breadcrumbs → Hero (typographic 7/12, margin note none): eyebrow "Old gold"; H1 "Exchange old gold at 0 % deduction"; lead "Bring any gold jewellery. We test and weigh it in front of you and credit its full gold weight at the day's rate against a new piece."; buttons "Ask about exchange" (WhatsApp) / "Today's rate" → ledger 01–04: "Bring it" — "Any karat, any condition, with or without a receipt." 02 "We test it" — "{method} **[owner: XRF / touchstone]**, at the counter." 03 "We weigh it" — "On the certified scale, stones and non-gold parts excluded **[owner]**." 04 "We credit it" — "Full gold weight × the day's rate for its karat, against any new piece; no deduction for wear, design or making." → H2 "The terms" (`promises/gold-exchange-terms`: exchange vs cash **[owner]**, which karats, exclusions) → H2 "Why we can do this" ("The Classic Group has bought and refined scrap gold in Dubai for {years} years. Old gold goes to our refinery; we do not need to discount it.") → RateBoard `band` → FAQ (3) → EnquiryBlock.

### 7.15 Occasions index, occasion pages, gifts

Index: H1 "Jewellery by occasion"; four OccasionFeatures full width + gifts tile. Occasion page: Breadcrumbs → Hero (5/7, portrait 3/5 right): H1 per §5.1; leads — wedding "22K bridal sets, bangles and haram for Indian, Pakistani and Arab weddings, hallmarked 916 and priced at the day's rate."; anniversary "18K diamond pieces with certificates, and 22K classics."; birthday "Pendants, chains and children's bangles, weighed and invoiced."; festivals "Coins, Lakshmi pendants and 22K sets for Dhanteras, Diwali, Akshaya Tritiya and Eid, reserved on WhatsApp and collected in Deira." → TrayGrid of `picks` → prose 150–250 words (festival page: H2 "Dates this year" from content) → FAQ (3) → EnquiryBlock. Gifts: H1 "Gold gifts that hold their value"; lead "Coins, pendants, kids' bangles and 18K diamond pieces, gift-boxed with the invoice and certificate."; same structure.

### 7.16 Journal index and article

Index: H1 "Journal"; lead "Buying guides and rate notes from a Deira counter."; JournalCards in a 3-column ruled grid (1 column mobile), newest first; no pagination until 24 posts. Article: Breadcrumbs → eyebrow "{d Mon yyyy} · {n} min read"; H1; standfirst (`--t-lead`); byline "{author}, {role}, Classic Jewels & Diamonds"; cover 3/2; body `--prose` with H2/H3, tables for rates, images with captions, `<aside>` margin note for one pull-quote; "Updated {date}" when `updatedAt` differs; related: three cards + links to the relevant category and `/gold-rate/`; EnquiryBlock. News mirrors this with eyebrow "News".

### 7.17 Gallery

H1 "Gallery"; lead "The shop, the trays, the pieces."; mixed tray grid (1/1 cells; portrait images cropped by `object-fit: cover` to 1/1 with `object-position` from content); each links to the full-size file; `ImageGallery` JSON-LD.

### 7.18 Legal pages

Typographic hero: H1; "Last updated {date}"; `--prose` body with numbered H2s; legal name, registration no. 1921575, address; terms page restates the 14-day return and exchange terms verbatim from `promises`. Footer only; no enquiry block.

### 7.19 404

Per §6.32.

---

## 8. Motion, interaction, accessibility

> **Superseded in part** by `docs/design-system-v2.md` §3.8 (motion policy): every motion ban below is replaced; the accessibility rules stand.

- Every transition is wrapped in `@media (prefers-reduced-motion: no-preference)`; otherwise it is instant. Allowed transitions: `opacity` and `transform` only. Durations: 150 ms (underline, button fill), 200 ms (mega panel opacity), 240 ms (drawer `translateX`). Easing `cubic-bezier(.2,.7,.2,1)`.
- Never: scroll reveals, parallax, counters/number count-ups, autoplay sliders, hover image transforms, cursor effects, skeleton shimmer, loading spinners.
- Rate refresh replaces text in place; the figure cells are fixed width so nothing moves.
- `scroll-behavior: smooth` only under no-preference; anchors offset by the sticky header height via `scroll-padding-block-start`.
- Keyboard: full operation of mega-nav (Enter/Space open, Esc close, arrows), drawer (`<dialog>` native focus trap, Esc), FAQ (`<details>`), filters (`aria-pressed`), gallery dialog (Esc, focus return). Tab order follows DOM; no `tabindex > 0`.
- Landmarks: `header`, `nav[aria-label]` (Primary, Breadcrumb, Footer), `main`, `aside` (margin notes), `footer`. One `h1`; heading levels never skip.
- Images: products use the alt template; lifestyle alt describes content; decorative `alt=""`. Rate figures carry `<abbr title="United Arab Emirates dirham">AED</abbr>` once per table.
- Colour is never the only signal: sold chips have text, validation has text, current nav has underline.
- Touch targets ≥ 44 px; the mobile action bar cells ≥ 56 px.
- Text resizes to 200 % without loss; containers use `rem`/`ch`; no fixed heights on text containers except the rate board rows (`min-block-size` with `em` units so they grow with text).
- Language: `lang="en-AE"`; Arabic numerals in Latin digits on `/en`.
- WhatsApp links use `https://wa.me/` with `rel="noopener"`; `tel:` links for phones; the WhatsApp message is URL-encoded once (no double-encoding of `&`).
- Forms: labels bound by `for`, errors by `aria-describedby`, success announced via `aria-live="polite"`.
- Lighthouse accessibility ≥ 100 and axe clean are CI gates.

---

## 9. Performance budget

Targets: Lighthouse mobile ≥ 95 (performance, a11y, best practices, SEO); LCP < 2.0 s on simulated 4G; CLS 0; INP < 200 ms; TBT < 100 ms. Lighthouse CI runs on home, a category, a product, the rate page, visit (`lighthouserc.json`).

| Page type                         | HTML (gz) | CSS (gz) | JS (gz) | Fonts    | Images above fold       | Requests (first view) | Transfer (first view) |
| --------------------------------- | --------- | -------- | ------- | -------- | ----------------------- | --------------------- | --------------------- |
| Home                              | ≤ 45 KB   | ≤ 28 KB  | ≤ 8 KB  | ≤ 140 KB | hero ≤ 90 KB AVIF @960w | ≤ 22                  | ≤ 420 KB              |
| Category / hub / collection       | ≤ 40 KB   | ≤ 28 KB  | ≤ 8 KB  | ≤ 140 KB | first 4 plates ≤ 120 KB | ≤ 22                  | ≤ 400 KB              |
| Product                           | ≤ 35 KB   | ≤ 28 KB  | ≤ 8 KB  | ≤ 140 KB | first plate ≤ 70 KB     | ≤ 16                  | ≤ 330 KB              |
| Gold rate                         | ≤ 35 KB   | ≤ 28 KB  | ≤ 8 KB  | ≤ 140 KB | none (text LCP)         | ≤ 10                  | ≤ 230 KB              |
| Visit / contact / about / promise | ≤ 35 KB   | ≤ 28 KB  | ≤ 8 KB  | ≤ 140 KB | ≤ 90 KB                 | ≤ 14                  | ≤ 300 KB              |
| Journal article                   | ≤ 40 KB   | ≤ 28 KB  | ≤ 8 KB  | ≤ 140 KB | cover ≤ 80 KB           | ≤ 14                  | ≤ 320 KB              |

Rules:

- One CSS file, critical by construction (no inlining split); component-scoped styles compiled by Astro; tokens in `src/styles/tokens.css`; no runtime CSS.
- JS: `rate.ts` (≤ 2 KB), `nav.ts` (≤ 2.5 KB: drawer, mega keyboard, sticky rule, action-bar hide, today's-hours row), `form.ts` (≤ 1.5 KB: WhatsApp URL from `data-*`, copy reference, contact form enhancement), `filter.ts` (≤ 1.5 KB, loaded only on grid pages), `gallery.ts` (≤ 0.5 KB, product pages only). All `type="module"`, deferred, no framework, no polyfills. Total on any page ≤ 8 KB gz.
- Rate pipeline: a scheduled job (GitHub Actions cron at 05:20, 09:50, 14:20 UTC = 09:20, 13:50, 18:20 GST, after the reported DJG slots; cadence **[verify]**) fetches `https://classicjewels.ae/gold-rates.php`, validates the shape, writes `src/content/rates/{date}.json`, commits, and the host rebuilds. The build bakes the latest entry into every rate surface. `rate.ts` runs on `requestIdleCallback` (fallback `setTimeout` 2 s), fetches the same URL, and replaces figures only when `gold_rate_date` is newer or any value differs; result cached in `sessionStorage` for 30 min. The feed must be same-origin (keep `/gold-rates.php` served from `classicjewels.ae`, or proxy it at the host as `/gold-rates.php` → provider) or carry `Access-Control-Allow-Origin: https://classicjewels.ae`; without one of these the island is a no-op and baked values stand. **[owner: confirm the "Subscription Valid" provider permits public display.]**
- Fonts: two preloaded woff2, `font-display: swap`, metric fallbacks (§3); no `unicode-range` splitting beyond latin/latin-ext; no third-party font hosts.
- Images: astro:assets AVIF (quality 60) + WebP (quality 78) fallback; `sizes` matched to the grid; `loading="lazy"` on everything except the LCP candidate; explicit `width`/`height`; no upscaling; sprite inline once per page.
- Third parties: zero. No GA4, no Maps iframe, no chat widget, no tag manager, no CDN font. Optional first-party beacon ≤ 1 KB (`navigator.sendBeacon` to `/api/hit` with path + event `whatsapp_click|call_click|directions_click`), loaded after `load`, no cookies, no consent banner needed.
- Caching: immutable hashed assets (1 year), HTML `max-age=0, must-revalidate`; Brotli at the host.
- CI gates: bundle-size check on CSS/JS; Lighthouse CI thresholds; HTML validation; axe; link check (no `#` hrefs, no dead internal links — the current site has 204).

---

## 10. Art-direction guide for future photography

Purpose: replace the 600² product shots and the four stock-like portraits with assets that carry the plate/tray grammar.

- **Products (plates)**: seamless pure white sweep, two diffused heads plus one small hard specular at 15° above front for polish; 2000 × 2000 sRGB minimum, JPG q85 for the pipeline; camera at the same focal length and distance for every piece in a collection so weights read proportionally across a tray; angles: front, three-quarter, and a scale shot on a hand or neck form in the same light; one macro of the hallmark stamp (916 / 750) per piece; no props, no reflections, no gradient vignette, no grey corners (clamp to #FFFFFF); file names `{sku}-01.jpg`, `{sku}-02.jpg`, `{sku}-stamp.jpg`.
- **Coins and bars**: on plum velvet (match `--plum-700` under tungsten-balanced light), PAMP assay card visible and legible, weight marking in focus.
- **Place (the shop)**: fascia and signage at Mariyam Plaza, the entrance behind RAK Bank, the car-park building exterior, the lift lobby signage, the counter and velvet trays, the certified scale with a piece on it, the physical rate board, hands weighing gold. 3800–4200 K, no blue cast, no HDR, no arabesque backdrops. These become the hero, Visit, About, Google Business Profile and OG images.
- **People**: hands, wrists, necks and ears of staff or real customers (with consent), never stock; crops 3/5 and 4/5; keep headroom; raw plaster, sand linen or plum velvet backgrounds; window light; no smile-at-camera, no gold-dust bokeh, no purple lighting, no AI renders.
- **Collections**: one hero plate per collection shot identically; resupply the wordmarks as single-colour SVG.
- **Rate board**: photograph the physical board daily for a month for the journal piece on how the rate moves.
- Deliverables: sRGB, no embedded sharpening, originals archived; the build only ever consumes files under `src/assets/`.

---

## 11. Anti-slop blacklist with replacements

| Blacklisted                                                                                                   | Replacement pattern used here                                                                       |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Gradient blobs, glassmorphism, purple-to-blue gradients, blurred backdrops                                    | Flat `--surface-1` page, white trays, two plum bands, bronze hairlines                              |
| Three (or six) identical feature cards with icon circles                                                      | Numbered 01–06 ledger, two ruled columns, one verifiable fact per row, each row a link to its terms |
| Centred hero with headline over a stock woman-with-necklace                                                   | Left-aligned 5/7 typographic hero with the brand's own place photo; mobile LCP is the H1            |
| "Welcome to", "Discover", "Elevate", "Unleash", "Experience the", "Timeless elegance", "Crafted with passion" | Lines that state a fact: karat, hallmark, grams, rate, Shop 6                                       |
| Lorem ipsum, placeholder hours, invented parking directions                                                   | All strings from content; hours render only when supplied; parking states only the verified fact    |
| Drop-shadow card soup, rounded cards, hover lift                                                              | Shadowless tray grid with 1 px dividers, radius 0, hover = underline                                |
| Hero slider, product carousel, autoplay anything                                                              | Static hero; stacked plates on desktop; native scroll-snap strip on mobile                          |
| Parallax, scroll reveals, counters, number count-ups                                                          | Static sections; figures replace in place in fixed-width cells                                      |
| Emoji icons, icon fonts                                                                                       | 12-glyph monoline SVG sprite in `currentColor`; the C-ring from the logo                            |
| Green WhatsApp FAB bubble                                                                                     | Plum primary button with the glyph; full-width mobile action bar; piece-specific prefilled message  |
| Pill buttons, gradient CTAs                                                                                   | 0-radius plum buttons, 48 px, one hover state (darker fill)                                         |
| Inter + Playfair / Cormorant / Fraunces                                                                       | Bodoni Moda (roman, optical sizing auto) + IBM Plex Sans (the brand's existing face)                |
| Text over a dark scrim on photos                                                                              | Captions below images; no text on images anywhere                                                   |
| Decorative watermarks, ghost logos, pattern tiles                                                             | None; the C-ring appears only as favicon, list marker, 404 glyph                                    |
| Google Maps iframe, GA4 tag, chat widget                                                                      | Static map image linking to the Maps short link; first-party beacon or nothing                      |
| Generic alt text ("jewellery image")                                                                          | `{name}, {karat}K gold {category}, {weight} g, Classic Jewels Deira`                                |
| Same `<title>` on every page, keyword-stuffed meta                                                            | Per-page title ≤ 60 with Deira/Dubai modifier; description ≤ 155 with one fact and one CTA          |
| Facet-spam URLs                                                                                               | One canonical URL per category/collection; filters in the hash                                      |
| "Pieces this week" / "On the tray this week"                                                                  | "Nine pieces from Shop 6, weighed and ready to quote." (`featured` flag, no schedule)               |
| Fabricated prices, price 0, Offer without price                                                               | Option A no offers; Option B baked indicative price with `priceValidUntil` and InStoreOnly          |
| Malabar-verbatim promise labels                                                                               | Classic-specific statements with conditions on `/promise/` pages                                    |
| 50/50 splits, centred stacks                                                                                  | 5/7 or 7/5 on every page; 404 is the only centred layout                                            |
| Product JPGs floating on tinted backgrounds with blend modes                                                  | White plate cells only; ivory and plum never carry a white-ground JPG                               |

---

Owner confirmations blocking specific strings (consolidated): opening hours incl. Friday; single canonical email; geo coordinates ≥ 5 dp; legal name, licence and TRN; defensible years figure (35 in gold / 16 in UAE vs "30+"); Planet Tax Free registration; Bareeq status; diamond labs issued; exact exchange terms (cash vs exchange, test method, exclusions), 14-day return and "easy exchange" conditions; Kerala collection live or not; the nine collection descriptors; custom-jewellery timeline; coin weights stocked; rate-feed redistribution rights; indicative-pricing (Option B) yes/no; "Mariyam" vs "Maryam" spelling (GBP spelling used in structured data); vector logo supply.
