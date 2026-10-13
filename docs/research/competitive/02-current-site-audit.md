# 02 · Current site audit: why the Astro build "feels like a blog site"

Audited 13 October 2026 against the dev server at `http://localhost:4321/` (commit `0d634ce`, working tree clean). Method: live browsing at 1440×900 and 390×844 with in-page measurement (computed styles, bounding boxes, text-node positions, image naturals), full-page headless Chrome captures at both widths, a read of the code listed below, and a pixel inventory of every file in `src/assets/` (sharp: dimensions, alpha, mean corner colour, mean luminance). The audit only looked at the site. Nothing was changed.

Code read: `src/styles/tokens.css`, `src/styles/base.css`, `src/pages/index.astro`, `src/components/sections/{Hero,RateBoard,ProofStrip,AssuranceLedger,CategoryTile,ProductCard,TrayGrid,OccasionFeature,PlumBand,StoreCard,JournalCard,ProductGallery}.astro`, `src/components/ui/{Plate,SectionHead,Eyebrow}.astro`, `src/components/layout/{SiteHeader,MobileActionBar,UtilityStrip}.astro`, `docs/design-spec.md` (all of it, especially §0, §1, §4, §8, §11).

---

## Pages visited

| URL                                           | Desktop 1440    | Mobile 390      | Scroll height (desktop)                                             |
| --------------------------------------------- | --------------- | --------------- | ------------------------------------------------------------------- |
| `/`                                           | yes, whole page | yes, whole page | 12,046–12,346 px (13.4–13.7 screens); mobile 16,909 px (20 screens) |
| `/jewellery/`                                 | yes             | n/a             | 6,674 px                                                            |
| `/jewellery/necklaces/`                       | yes             | yes             | 6,169 px; mobile 8,292 px                                           |
| `/jewellery/necklaces/kolkata-fringe-choker/` | yes             | yes             | 4,461 px; mobile 6,093 px                                           |
| `/collections/`                               | yes             | n/a             | 4,323 px                                                            |
| `/gold-rate/`                                 | yes             | n/a             | 5,576 px                                                            |
| `/stores/`                                    | yes             | n/a             | 4,467 px                                                            |
| `/about/`                                     | yes             | n/a             | 7,623 px                                                            |

## Key measurements (home page unless stated)

| Measure                                                     | Desktop 1440×900                                                                                                                                                                                              | Mobile 390×844                                                                                  |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Sections inside `<main>`                                    | 14 (hero, proof strip, Diwali offer, rate board, by piece, trays, promises, collections, occasions, old-gold band, story, stores, journal, FAQ + enquiry)                                                     | same 14                                                                                         |
| Section heights (px)                                        | 873 · 127 · 331 · **1,123** · 830 · 1,032 · 793 · **1,110** · 1,009 · 529 · 672 · 941 · 807 · 759                                                                                                             | 1,119 · 303 · 444 · 740 · 896 · 1,748 · 1,316 · 1,775 · 1,245 · 795 · 769 · 1,122 · 1,539 · 866 |
| Sections on the same ivory `#FAF7F2`                        | **12 of 14** (2 on plum `#4B2849`; footer `#2E1A2D`)                                                                                                                                                          | same                                                                                            |
| Section boundaries drawn as a 1 px `#E6E0D6` rule           | 9 of 13 boundaries (7 × `.section--ruled`, plus the proof strip and offer borders)                                                                                                                            | same                                                                                            |
| Sections opening with eyebrow → 40 px H2 → (lead) → content | 12 of 14 (13 eyebrows, 12 H2s on one page)                                                                                                                                                                    | same                                                                                            |
| H2 sizes                                                    | all 12 identical: 40 px, weight 500, left aligned, `#1C1418` (ivory on plum)                                                                                                                                  | 26 px, all identical                                                                            |
| Content width                                               | one container width only: 1,280 px, 80 px gutters on every section                                                                                                                                            | 16 px gutters                                                                                   |
| Full-bleed images                                           | **0**                                                                                                                                                                                                         | 0                                                                                               |
| Widest image                                                | 672 px (story image, 47 % of viewport)                                                                                                                                                                        | 353 px                                                                                          |
| Image area as % of page area                                | **14 %**                                                                                                                                                                                                      | about 15 %                                                                                      |
| Image coverage per screen (%)                               | 30 · 1 · 0 · 19 · 55 · 0 · 0 · 25 · 16 · 23 · 0 · 23 · 0 · (footer)                                                                                                                                           | 15 · 32 · 0 · 24 · 22 · 51 · 5 · 0 · 0 · 0 · 40 · 18 · 3 · 22 · 6 · 51 · 20 · 0 · 0 · 0 · 0     |
| Screens with no image at all                                | **5 of 13** content screens                                                                                                                                                                                   | **8 of 20**                                                                                     |
| Words in `<main>`                                           | 1,825 (61 · 129 · 89 · 72 · 108 · 241 · 166 · 81 · 204 · 76 · 164 · 183 · 251 per screen)                                                                                                                     | 1,809                                                                                           |
| Rendered image sizes                                        | hero 568×711 (4:5 crop of a 3:2 source, 777w rendition); category tiles 280×111; product plates 299×299 (360w rendition); occasion portraits 282×470; story 672×448; journal covers 384×256                   | hero 353×442, starting at y = 701 (143 px visible above the fold)                               |
| Type                                                        | H1 Cormorant Garamond 500, 67.4 px / 70 px; H2 40 px; H3 24 px; body IBM Plex Sans 17 px / 1.6; eyebrow Plex 500 12 px uppercase 0.14em. **H1 : body = 3.96 : 1; H2 : body = 2.35 : 1**                       | H1 36.9 px; H1 : body = 2.3 : 1                                                                 |
| Motion                                                      | **0** CSS animations; 223 elements with transitions, every one `color` / `border-color` / `background-color` at 150 ms; no transforms, no scroll-linked effects, no reveal, no video, 0 CSS background images | same                                                                                            |
| Shadows / radius                                            | 1 box-shadow (`.hero__frame`, used as a 1 px outline); 1 radius (`.hero__badge-dot` 50 %)                                                                                                                     | same                                                                                            |
| Weight (last build in `dist/`)                              | home CSS ≈ 12 KB gz over 16 files; JS ≈ 2.2 KB gz (2 modules); fonts 37.6 + 45.7 KB woff2; `index.html` 18.5 KB gz; zero third-party requests                                                                 | same                                                                                            |
| PDP (`kolkata-fringe-choker`)                               | plate 670×670 CSS px from a 600 px source (1.12× CSS, 1.4× at DPR 1.25, 2.2× on a DPR 2 screen); right column about 2.5× taller than the image, leaving the left half empty below 850 px                      | plate 353×353, inset 16 px                                                                      |

---

## First impression in the first 5 seconds

**Desktop.** An ivory page with a 36 px dark-plum strip reading "22K today AED 465.25 / g · 13 October", a 72 px header of seven 17 px Plex text links, then a four-line Cormorant headline ("Gold and diamond jewellers in Dubai, Sharjah and Abu Dhabi.") on the left and a bordered 568×711 portrait of two rose-gold diamond rings on textured blue paper on the right, with a small white "UAE HALLMARKED · 916 & 750" tag. Three CTAs, then a hairline-ruled four-cell fact strip. Nothing moves. It reads as the article header of an editorial theme (Ghost, Substack, a magazine template): serif headline, sans standfirst, lots of ivory, hairlines. None of the things that make Classic distinctive appear in the first viewport: no 22K yellow gold, no Indian or Gulf design, no velvet, no shop, no counter, no people.

**Mobile.** 32 px plum rate strip, 56 px header with "Menu", then eyebrow, a 4-line 37 px H1, a 4-line lead, two stacked buttons and a text link. The first image starts at 701 px of an 844 px screen. About 83 % of the first screen is text. It looks like a blog post opening on a phone.

---

## 1. Ranked causes of the "blog" feeling, with evidence

### 1. Imagery is small, boxed and subordinate to text

- No image on any page is full-bleed. The widest on the home page is 672 px (47 % of a 1440 viewport). Every image sits inside the single 1,280 px container (`tokens.css:95-98`: `--container` and `--container-wide` are both `80rem`, so trays cannot widen either).
- Images cover 14 % of the home page; 5 of 13 desktop screens and 8 of 20 mobile screens contain no image at all. The only screen above 50 % imagery is the occasions row (55 %).
- The hero image is framed like a figure in an article: 1 px `#E6E0D6` border on a white frame (`Hero.astro:180-185`), cropped from a 3:2 landscape into a 4:5 portrait (`Hero.astro:271-281`), which throws away about 47 % of the source width.
- Product photos render at 299×299 inside hairline tray cells; category cut-outs at 280×111 with the piece itself about 110 px tall (the piece sits in the left 40 % of each 800×318 file, `CategoryTile.astro:64-83` covers the 5:2 box).
- Spec origin: `design-spec.md` §0 line 22 (hero must not exceed its source), §4 lines 181-185 (container, 5/7 splits, surfaces), §6.18 line 330 and §11 line 525 ("Captions below images; no text on images anywhere"), §0 line 24 (no overlay on occasion tiles).

### 2. One surface, one rhythm, for 13 screens

- 12 of 14 home sections sit on the same ivory `#FAF7F2`; the spec forbids section-level alternation (`design-spec.md:26`, `:185`; "Maximum two `--surface-plum` bands per page").
- 12 of 14 sections open the same way: 12 px gold uppercase eyebrow with a 24 px rule, a 40 px Cormorant H2 written as a sentence with a full stop, an optional 20 px lead, then content, with a right-aligned "All … →" text link (`SectionHead.astro:39-58`). Twelve H2s on one page, all identical in size, weight, colour and alignment.
- Sections are separated by the same 1 px `#E6E0D6` rule (`base.css:418-421`) at the same `--section-y` padding (`clamp(3.5rem, …, 7rem)`), left-aligned to the same 80 px edge. There is no change of scale, density, colour or pace between the hero and the footer. Scrolling feels like paging through one long document.
- The only two plum moments are a 1,123 px table (rate board) and a two-column text band (old gold), both text.

### 3. Zero motion, by rule

- 0 CSS animations; all 223 transitions are 150 ms colour or border changes (`tokens.css:111-115`, `base.css:204-216`, `base.css:255-258`). No hover on images (`design-spec.md:28`), no scroll reveal, parallax, carousel, video or page transition (`design-spec.md:452-453`, §11 lines 519-520).
- The live gold rate, the one genuinely dynamic thing the site owns, is replaced in place "without animation" (`design-spec.md:319`). The site therefore never signals that it is alive.

### 4. The page explains instead of shows

- 1,825 words of body copy on the home page, averaging 130 words per screen and peaking at 251 (FAQ) and 241 (promises ledger).
- Whole sections are lists of text: the six-row promises ledger (`AssuranceLedger.astro`, 793 px), the twelve-row collections index (1,110 px, `index.astro:220-237`, no imagery although every collection has a wordmark and a product photo), four store rows with no photo or map (941 px), six FAQ rows.
- The rate board spends 1,123 px on five numbers plus two footnote paragraphs.
- This follows the thesis directly: "Hierarchy comes from … 1 px rules, from numbered lists … never from boxes, shadows, washes or motion … Material precision is the luxury; there is no mood-board luxury" (`design-spec.md:55`). That is a sound brief for a reference site and a recipe for a document.

### 5. Literal blog components on the home page and key templates

- Home section 13 is a blog index: three 3:2 cover cards with "13 October 2026 · 5 min read", a two-line serif title and a clamped two-line excerpt (`JournalCard.astro:35-41`, `index.astro:352-369`). All four journal posts share the same `pubDate: 2026-10-13`, so the dates look auto-generated.
- `/gold-rate/` is a documentation article: a typographic hero, the board, then a sticky "On this page" table of contents (`gold-rate.astro:143-148`) beside long H2 prose with a worked-example table.
- `/about/` is a centred 68ch long-read with margin-note pull quotes ("Where elegance meets eternity.") in the left gutter (`about.astro:139`, `:168`, `:322`).
- About 15 of the 22 `<Hero>` instances in `src/pages` pass no media (typographic hero: eyebrow, H1, lead, buttons): `/jewellery/`, `/collections/`, `/gold-rate/`, `/stores/`, `/journal/`, `/occasions/`, `/offers/`, `/our-promise/`, `/gold-exchange/`, `/contact/`, store detail pages and the legal pages. Index pages open like article headers.
- Breadcrumbs above every H1, eyebrow kickers above every H2, FAQ accordions at the foot of every template: the furniture of an editorial CMS theme.

### 6. Typography is bookish, flat and uniform

- Display face is **Cormorant Garamond** 500 (`tokens.css:58`, commit `0d634ce`), the face `design-spec.md` §11 line 524 blacklists by name, replacing the specified Bodoni Moda. At 500 weight its hairlines are thin and its x-height small, so headlines read as literary book type (wedding stationery, a novelist's blog) rather than a jeweller's display.
- Scale contrast is low: H1 67 px against 17 px body (3.96 : 1) and every H2 at 40 px (2.35 : 1). There is no outsized display moment anywhere: no 120–200 px word, no giant numeral except the board figures (72 px max), no italic, no tracking contrast, no colour in headlines.
- Every headline is a sentence-case sentence with a full stop ("Necklaces to anklets, by the gram.", "Six promises, with their conditions."), which is article-headline voice.
- The only typographic texture is the 12 px uppercase eyebrow, repeated 13 times.

### 7. Three unrelated photographic worlds on one page, two of them stock-looking

- Product shots (p01–p09): white or teal busts on crushed indigo/violet velvet, corners `#0E0D1A` to `#44385E`.
- Lifestyle and editorial: teal paper (`#85979D`), mint box (`#91B9B4`, `#8EBBB8`), peach plaster (`#B58F7D`), pink-violet shell (`#D1B0BC`), a henna hand, a bride's bouquet, a gift box. These read as stock still-lifes and none of them uses the plum `#4B2849` / bronze `#BE8658` palette.
- The hero file is named `story/store-lifestyle.jpg` but shows two rose-gold rings on blue paper (alt text says so, `index.astro:101`). The spec intended the brand's own place photograph there until a reshoot (`design-spec.md:22`). A stock-like still life in the hero slot is the single strongest "blog cover image" signal.
- Small category and product cut-outs sit on a third ground, lilac `#E9E5E9`/`#EAE5E9`. On `/jewellery/` one tray mixes nine dark velvet squares, five lilac squares and white cells.

### 8. The product photography fights the "white plate" system it was built for

- The tray and Plate system assumes white-sweep product photos ("photo white equals cell white", `design-spec.md:208`). The real photos are dark velvet, so `Plate.astro:38` bleeds them edge to edge inside white `#FFFFFF` cells with `#E6E0D6` outlines (`base.css:558-581`), on an ivory page. Result: dark postage stamps pasted into a white table, the look of a document with inline thumbnails.
- `Plate.astro:66-67` (`max-inline-size` plus `margin-inline: auto` inside the flex-column card) gives the plate no intrinsic size before its lazy image loads: measured 0×0 for six of eight plates before scroll. In a fast-scroll capture five of eight home cells and two `/jewellery/` cells rendered as text-only cards, and rows shift when images arrive.

### 9. Thin catalogue, shown with complete honesty

- 16 products: 9 necklaces and one each of the other seven categories. The home "From the trays" section shows 8 featured pieces, all necklaces.
- Category tiles print "1 piece" seven times on the home page and on `/jewellery/`; collection rows print "1 piece", "2 pieces", "Ask in store".
- No product has `weightGrams` (0 of 16), so "Gold value today ≈ AED …" never renders and the headline "by the gram" is not backed by a single gram on screen.
- Every product has one image, so the PDP gallery is a single 670 px plate next to a long text column.

### 10. Hero composition and copy are SEO sentences, not a moment

- H1 "Gold and diamond jewellers in Dubai, Sharjah and Abu Dhabi." is a keyword line. The lead is 30 words. Three CTAs plus a text link compete (`index.astro:92-112`).
- `.hero--flagship` is a 6fr / 6fr grid (`Hero.astro:316-318`): the 50/50 split the spec itself rejects (`design-spec.md:32`). It also carries a white badge with `backdrop-filter: blur(8px)` and raw `rgba(255,255,255,.95)` (`Hero.astro:221-222`) and a `box-shadow` (`Hero.astro:273`): evidence that someone already tried to make it feel luxurious within the old grammar, and it reads as a stuck-on label rather than a hero.

### 11. Chrome and affordances are documentation chrome

- Navigation is seven 17 px Plex 500 text links (`--t-title`, `SiteHeader.astro:313-318`); the mega menu is four columns of text plus a mini rate table (`SiteHeader.astro:83-142`), with no imagery.
- Primary affordances are underlined text links ("Explore jewellery trays →", "All jewellery →", "Our story →") and outlined rectangles. Hairlines are the only structure. This is the visual language of a docs site.

---

## Site profile (template fields)

### Hero (home)

- Composition: 6/6 split on desktop, text left (eyebrow, 4-line H1, 30-word lead, WhatsApp primary, "Today's gold rate" secondary, text link), image right in a bordered 4:5 frame capped at `100svh − header − 96px`. Mobile: text first, image below the fold.
- Media: `store-lifestyle.jpg` 1488×962 shown at 568×711; badge "UAE HALLMARKED · 916 & 750".
- Copy approach: geographic keyword H1, factual lead ("Weighed in front of you, priced at today's Dubai rate…").
- CTA: "WhatsApp the showroom" (plum fill), "Today's gold rate" (outline, anchors to `#rate`).

### Navigation and mega menu

- 36 px plum-deep utility strip (rate, date, branches, phone; scrolls away), 72 px ivory header sticky on desktop with a hairline after scroll; logo (raster PNG), "Jewellery +" mega trigger, Collections, Occasions, Gold rate, Coins & bars, Our story, Stores; phone link and outlined WhatsApp button.
- Mega panel: By piece (8 + All), By material (4), By collection (12, two columns), mini rate board on `#F6F0F5`. Hover intent 120 ms, keyboard support, no imagery.
- Mobile: `<dialog>` drawer on plum-deep with `<details>` groups; 56 px fixed bottom bar WhatsApp · Call · Stores.

### Visual language

- Palette: ivory `#FAF7F2` page, white `#FFFFFF` trays, parchment `#F3EEE6`, plum `#4B2849` bands, plum-deep `#2E1A2D` strip/footer, ink `#1C1418`/`#4A3F46`/`#6B5F66`, gold text `#8A5C32`, bronze rules `#BE8658`, hairline `#E6E0D6`, champagne numerals `#DCC29A` on plum.
- Type: Cormorant Garamond 500 headings (67/40/24 px), IBM Plex Sans 400/500 body 17 px, eyebrow 12 px uppercase 0.14em.
- Imagery: dark velvet product busts; lilac cut-outs; pastel stock still-lifes and lifestyle portraits.
- Grid: 12 columns, 1,280 px container, 5/7 and 7/5 splits, 4-up tray, 2-column ledgers.
- Radius 0, no shadows, no texture, no gradients, 1 px hairlines everywhere.

### Motion and interaction

- Hover: colour change and a 1 px underline on names (`.card:hover .card__link`, `.tile:hover .tile__name`). Buttons darken. No image hover, no lift.
- No carousels (PDP uses native scroll-snap only below 1024 px), no scroll effects, no page transitions, no loaders. Smooth anchor scroll under no-preference.
- Rate refresh on `requestIdleCallback`, figures replaced silently.

### How products are presented

- Cards: 1:1 plate (bleed velvet photo), Plex 17 px name, fact line "22K · Kolkata", chip ("New"), "Enquire on WhatsApp" link with a prefilled message; whole card links to the PDP.
- Listing: filter chips for karat and collection plus a sort select, state in the URL hash, "{n} pieces shown".
- PDP: 7/5 split, single plate left; right: eyebrow, H1 53 px, "22K · hallmark 916", description, spec table on parchment, price-formula note, WhatsApp + Call, "Copy reference", "Reserve to view" list of four branches each with a WhatsApp link, three ledger promises, care note; "More necklaces" tray below.
- Price display: none (quote mode); rate formula explained.

### Trust and conversion devices

- WhatsApp everywhere with piece-specific prefill; call links; mobile action bar.
- Live 22K rate in the utility strip, proof strip, rate board, mega menu and rate page.
- Proof strip: 22K today, Google 4.9 from 680 reviews (links out), 0 % deduction on exchange, four branches.
- Six written promises with conditions; Diwali offer block (10 % deposit locks the rate).
- Store list with directions, phone, WhatsApp, hours flagged "(as listed on Google)" or "call ahead".
- No certification logos, no reviews on-site (correctly; no fabricated ratings), no appointment booking, no map.

### Mobile experience

- First screen is text (H1 is the LCP by design). Page is 20 screens long; the category tiles become 2×4 thumbnails; the tray is 2-up at about 175 px; the journal stacks three full-width cover cards; footer is two columns of text links.
- Fixed bottom bar is the best mobile element: always one tap to WhatsApp or Call.

### Performance feel

- Very light: about 12 KB CSS and 2.2 KB JS gzipped on the home page, two woff2 files (83 KB), AVIF/WebP renditions, no third parties. Feels instant locally. There is roughly 16 KB of CSS and 5.8 KB of JS headroom inside the spec's own budget (`design-spec.md:475`), enough for a restrained motion layer.

### Strengths

1. A real, honest data spine: baked daily rate with idle refresh, stale and failure states, rate history in git.
2. Conversion plumbing that fits an enquiry-led jeweller: piece-specific WhatsApp prefill, Copy reference, Reserve to view at a named branch, mobile action bar.
3. Clean information architecture and SEO contract (category and collection URLs, one H1, breadcrumbs, JSON-LD per branch and per product, no fabricated offers).
4. Accessibility done properly: dialog drawer with `inert`, keyboard mega menu, plum/champagne focus rings, 44 px targets, reduced-motion tokens.
5. Exceptionally light pages with zero third-party JavaScript.
6. Copy with real facts and a consistent voice ("Bring old gold. Leave with its full weight.").

### Weaknesses

1. No visual hero moment and no full-bleed media; imagery is 14 % of the page.
2. One surface, one section template, one H2 size repeated twelve times; no pacing.
3. No motion at all, including on the one live number the brand owns.
4. Stock-looking, off-palette lifestyle photography; hero image is not Classic's shop or its core product.
5. Velvet product photos forced into white tray cells; mixed grounds in grids; thin and necklace-heavy catalogue with "1 piece" counts on show.
6. Blog furniture on core pages: journal cards on the home page, TOC sidebar on the rate page, long-read About, typographic heroes on every index.

---

## 2. What is genuinely good and must be preserved

| Area                     | Where                                                                                                                                                                                                                                                                                                               | Why it must survive the redesign                                                                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gold-rate pipeline       | `src/lib/gold-rate.ts` (parse/fetch), `src/lib/rates.ts` (`getRates`, `isStale`, `rateDelta`), `src/scripts/rate.ts` (idle refetch, `data-rate` / `data-rate-calc` hooks, sessionStorage), `scripts/snapshot-rate.mjs`, `.github/workflows/rates.yml`, `src/content/rates/*.json`                                   | Values are correct without JavaScript, indexable, and survive feed failure. Any new rate visual (big numerals, ticker, calculator) should read the same baked values and the same `data-rate` hooks. |
| Content collections      | `src/content.config.ts` (213 lines, zod), `src/content/{products,categories,collections,occasions,offers,journal,faqs,rates}`                                                                                                                                                                                       | Content-as-data lets a new design swap templates without touching copy. Add fields (e.g. `heroImage`, `mood`, `gallery[]`, `weightGrams`) rather than inventing a new store.                         |
| Single source of facts   | `src/data/site.ts` (406 lines: four branches with status, hours with `confirmed` flag, phones, WhatsApp greeting, reviews 4.9 / 680, promises, group facts)                                                                                                                                                         | Prevents invented hours, phone typos and inconsistent NAP across branches.                                                                                                                           |
| Routes and URL structure | `src/lib/routes.ts`; `/jewellery/{category}/{slug}/`, `/collections/{slug}/`, `/stores/{slug}/`                                                                                                                                                                                                                     | Keeps SEO equity and the no-hard-coded-paths convention.                                                                                                                                             |
| SEO and JSON-LD          | `src/lib/schema.ts` (Organization, JewelryStore per branch, Product without fabricated offers, ItemList, BreadcrumbList, Article, WebSite without SearchAction); per-page title/description in `BaseLayout`; PDP head measured: WebSite, Organization, JewelryStore, Product, BreadcrumbList; description 148 chars | Correct and conservative (no FAQPage, no aggregateRating). An immersive design must keep one H1 per page and real text in the DOM, not text baked into images or canvas.                             |
| Accessibility            | `SiteHeader.astro` (dialog drawer, `inert`, `aria-expanded`, keyboard mega), focus tokens `--focus` / `--focus-on-plum`, `--tap: 2.75rem`, `prefers-reduced-motion` zeroing `--dur-*` (`tokens.css:125-131`)                                                                                                        | Motion added later must hang off these tokens and switch off under reduced motion.                                                                                                                   |
| Performance discipline   | Never-upscale helpers (`Hero.astro:55-57` `widthsFor`, `Plate.astro:43` `safeWidths`, `CategoryTile.astro:21-23`), AVIF + WebP, explicit sizes, one priority image, zero third parties                                                                                                                              | The redesign can spend more (video poster, a small motion script) but should keep a written budget and the upscale guard.                                                                            |
| Conversion devices       | `src/lib/whatsapp.ts` (`whatsappForProduct`, `whatsappGeneral`), PDP "Copy reference" and "Reserve to view" per branch, `MobileActionBar.astro`, client-side `filter.ts` with hash state                                                                                                                            | These are the enquiry funnel. Restyle, do not remove.                                                                                                                                                |
| Copy facts and voice     | Hero lead, promises, old-gold band, rate footnotes, offer copy, `docs/research/facts-and-sources.md`                                                                                                                                                                                                                | Factual lines are an asset; they need less space, not replacement.                                                                                                                                   |
| Proof strip idea         | `ProofStrip.astro`                                                                                                                                                                                                                                                                                                  | Rate, Google rating, 0 % deduction, branch count: four verifiable facts. Keep the content, change the presentation.                                                                                  |

---

## 3. Image asset inventory (`src/assets`, 2.8 MB, measured)

Background colour = mean of the four 6×6 px corners. L = mean luminance 0–255. "Max credible display" assumes a DPR 2 phone and DPR 1–2 desktop; no upscaling.

### Product photography

| File(s)                                                                                                                              | Pixels         | KB    | Background                         | What it shows                                                      | Max credible display                    | What it can support in an immersive design                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------- | ----- | ---------------------------------- | ------------------------------------------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `products/p01.jpg`                                                                                                                   | 600×600        | 43    | `#44385E` (L 100), lightest velvet | Kolkata fringe choker on cream bust                                | 300 CSS px sharp at 2×; up to 600 at 1× | Dark "vitrine" tiles where the page surface matches the velvet so the bust floats; a 3–4 item horizontal rail at 300–420 px; PDP plate at ≤ 600 px. Not a hero, not full-bleed, no zoom-on-hover. |
| `products/p02.jpg`                                                                                                                   | 600×600        | 36    | `#1B153E` (L 38), darkest          | Rajkot graduated necklace on teal bust                             | same                                    | Best candidate for a dark spotlight composition (deep navy field, teal bust).                                                                                                                     |
| `products/p03.jpg`                                                                                                                   | 600×600        | 43    | `#201E39`                          | Antique pearl-drop bib, white bust                                 | same                                    | As above.                                                                                                                                                                                         |
| `products/p04.jpg`                                                                                                                   | 600×600        | 32    | `#121224`                          | Italian flat collar, white bust                                    | same                                    | As above.                                                                                                                                                                                         |
| `products/p05.jpg`                                                                                                                   | 600×600        | 39    | `#0E0D1A`                          | Turkish filigree, white bust                                       | same                                    | As above.                                                                                                                                                                                         |
| `products/p06.jpg`                                                                                                                   | 600×600        | 36    | `#302B65` (L 95), visibly violet   | Ruby and emerald necklace                                          | same                                    | Needs a radial vignette to sit on a plum-black surface.                                                                                                                                           |
| `products/p07.jpg`                                                                                                                   | 600×600        | 29    | `#0F0E1E`                          | Bespoke bridal necklace                                            | same                                    | As p05.                                                                                                                                                                                           |
| `products/p08.jpg`                                                                                                                   | 600×600        | 42    | `#161430`                          | Temple long haar with bell pendant                                 | same                                    | As above.                                                                                                                                                                                         |
| `products/p09.jpg`                                                                                                                   | 600×600        | 48    | `#110E24`                          | Three-line rani haar                                               | same                                    | As above.                                                                                                                                                                                         |
| `collections/{antique,customised,gemstone,italian,kolkata,kuwait,rajkot,temple,turkish}.jpg`, `story/hero.jpg`, `story/workshop.jpg` | 600×600        | 29–48 | identical to p01–p09               | **Duplicates** of the product shots (same corner and mean colours) | n/a                                     | No extra coverage. A collection page can only show the same velvet bust again.                                                                                                                    |
| `products/{ring,earrings,bangles,bracelet,chain,pendant,anklet}.jpg`, `collections/{diamonds,kids,singapore}.jpg`                    | 300–556 square | 6–20  | lilac `#EAE5E9` (L 217–229)        | Studio cut-outs on flat lilac                                      | 150–278 CSS px at 2×                    | The flat lilac can be keyed to transparency at build (threshold on `#EAE5E9`) to make floating cut-outs that sit on any surface, including plum. Small: thumbnails, chips, mega-menu imagery.     |

The product set is dark (L 38–100) and consistent in staging: velvet backdrop, bust, low-key light. That consistency is the best visual asset the brand has. It argues for a **dark display surface** for product sections (plum-black near `#14112A`–`#1A1430`, close to the velvet corners) rather than white cells, with a soft radial vignette so the varying velvet edges dissolve.

### Category cut-outs

| File(s)                                                                               | Pixels  | KB     | Background                                                           | Composition                                                                     | Max credible display                                                           | Support                                                                                                                                                                      |
| ------------------------------------------------------------------------------------- | ------- | ------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `categories/{necklaces,earrings,rings,pendants,bangles,bracelets,chains,anklets}.png` | 800×318 | 19–110 | opaque lilac `#E9E5E9` (no alpha despite PNG; spec §4 assumed alpha) | Piece occupies roughly the left 320×318; right 60 % empty, made for banner text | Full file at 400 CSS px (2×) or 800 (1×); cropped piece about 160 CSS px at 2× | Banner rows with the name set large in the empty right side; or key the lilac out and float the piece on a dark tile. Not suitable for full-bleed or for large square tiles. |

### Occasion portraits

| File                        | Pixels   | KB  | Background / palette  | Shows                                 | Max credible display                 | Support                                                                                                                                                                                    |
| --------------------------- | -------- | --- | --------------------- | ------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `occasions/wedding.jpg`     | 784×1280 | 92  | `#B7B1AB` warm grey   | Groom placing a ring, bride's bouquet | 392×640 CSS px at 2×; 784 wide at 1× | Tall panels: a four-panel strip across 1440 is 360 px each, inside the 2× limit. Can carry text over a bottom scrim, and expanding-panel hover (360 → about 560 px stays under 784 at 1×). |
| `occasions/anniversary.jpg` | 784×1280 | 114 | `#C6BBAA`             | Hands with a gift box                 | same                                 | same                                                                                                                                                                                       |
| `occasions/birthday.jpg`    | 784×1280 | 105 | `#B79ABD` pink-violet | Pink stones on a shell                | same                                 | same; colour clashes most with plum                                                                                                                                                        |
| `occasions/festivals.jpg`   | 784×1280 | 117 | `#94BDAA` mint        | Henna hand with red nails and a ring  | same                                 | same; strongest cultural cue in the set                                                                                                                                                    |

All four read as stock. They can carry the "experiential" occasions chapter for now; a grade toward warm plum/bronze would help them cohere.

### Story, banners and journal

| File                        | Pixels            | KB    | Background / palette                                                 | Shows                                                            | Max credible display                 | Support                                                                                                                                                                                                  |
| --------------------------- | ----------------- | ----- | -------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `story/store-lifestyle.jpg` | 1488×962          | 246   | `#66818C` blue-grey                                                  | Two rose-gold diamond rings on textured blue paper (not a store) | 1488 CSS px at 1×; 744 at 2×         | Technically enough for a full-bleed 1440 hero at DPR 1 and a soft background at DPR 2 under an overlay. Content and colour are off-brand (rose gold, blue); use only as an interim, darkened and graded. |
| `story/about-2.jpg`         | 1920×488          | 62    | `#899EA6` grey-blue                                                  | Five white-metal solitaire rings in a row                        | 1440×366 full-bleed at 1×; 960 at 2× | Cinematic ultra-wide band (e.g. diamonds chapter), text over the soft upper field. White metal, not gold.                                                                                                |
| `story/banner-about.jpg`    | 1920×478          | 166   | `#141732` navy leather, L 42                                         | Small gold sun pendant centred on dark leather                   | 1440×358 full-bleed                  | **The most on-brand wide asset**: dark field, gold object, room for white or champagne type on both sides. Good for a full-bleed rate or heritage band.                                                  |
| `story/banner-contact.jpg`  | 1920×478          | 39    | `#987967` peach plaster                                              | Rings, stones, a draped chain                                    | 1440×358 full-bleed                  | Warm full-bleed divider; colour is peach, needs a plum grade.                                                                                                                                            |
| `story/about-1.jpg`         | 900×529           | 37    | `#98B5AB` mint                                                       | Rose-gold pavé ball pendants on a mint box                       | 450 CSS px at 2×; 900 at 1×          | Half-width editorial image only.                                                                                                                                                                         |
| `story/about-3.jpg`         | 750×750           | 36    | `#9ECAC7` teal                                                       | Oval pendant set on a teal box                                   | 375 at 2×                            | Square inset only.                                                                                                                                                                                       |
| `journal/*.jpg`             | 717–750 × 478–500 | 30–74 | peach `#BB937C`, grey-blue `#A8B8C0`, navy `#222647`, teal `#91C4C2` | Still lifes                                                      | ≤ 375 CSS px at 2×                   | Card covers only. `gold-sun-pendant.jpg` (navy) is the only one on-palette.                                                                                                                              |

### Brand marks

| File                          | Pixels                         | Notes                                                                                                                                                                              |
| ----------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `brand/logo-dark.png`         | 250×66, alpha                  | Raster only; cannot be scaled up for a large wordmark moment.                                                                                                                      |
| `brand/logo-white.png`        | 265×66, alpha                  | same                                                                                                                                                                               |
| `brand/monogram.png`          | 200×200, opaque plum `#4B2849` | The C monogram. A large animated or masked C-ring needs the SVG (owner TODO: vector logo). The C-ring in `design-spec.md:311` is already drawn as SVG and can be used at any size. |
| `collections/wordmarks/*.png` | 300×104, alpha, greyscale      | Collection logotypes; can be recoloured champagne on dark via CSS `filter` or replaced by SVG.                                                                                     |

**Bottom line on assets.** Only four files can go full-bleed at 1440 without upscaling at DPR 1: `store-lifestyle.jpg` (1488 w) and the three 1920 w banners. None is sharp full-bleed on a DPR 2 screen, so all four should be used under an overlay, a grade or with type over a dark field, not as crisp hero photography. Everything product-related is 600 px or smaller. An immersive redesign must get its drama from **surface, scale of type, composition, motion and the live rate**, and present the 600 px product shots small and lit (vitrine), not big. A reshoot (spec §10) or at least a phone-shot set of the four shopfronts would unlock true full-bleed moments.

---

## 4. Design-spec rules: what to relax, what to keep

### Relax (these are what make it read as a document)

| Rule                                                                            | Where                                      | Proposed change                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Why                                                                                              |
| ------------------------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| "Sections do not alternate backgrounds"; max two plum bands per page            | `design-spec.md:26`, `:185`                | Allow chapters: a dark plum-black display surface (velvet-matched, about `#16112A`) for product and rate chapters, ivory for reading chapters, plum for offers.                                                                                                                                                                                                                                                                                                         | Pacing comes from surface change; the velvet photos only look good on dark.                      |
| Product JPGs "only ever sit on `--surface-0` cells; never on … plum"            | `design-spec.md:27`, `:208`, §11 line 535  | Reverse it for the current photography: velvet shots sit on the dark surface, edge-to-edge, with a radial vignette to hide edge variation. Keep white cells for future white-sweep shots and keyed cut-outs.                                                                                                                                                                                                                                                            | The rule was written for photography that was never delivered.                                   |
| No gradients, washes                                                            | §1 line 55, §11 line 513                   | Permit radial vignettes and dark scrims as functional tools (blend velvet edges, make type legible over banners). Still no decorative blobs or purple-to-blue gradients.                                                                                                                                                                                                                                                                                                | Without a vignette the varying velvet tones (`#0E0D1A` to `#44385E`) show as mismatched squares. |
| No text on images, captions below, no overlays                                  | §0 line 24, §6.18 line 330, §11 line 525   | Allow type over the three 1920 banners and the occasion portraits, with a measured contrast check on the scrim.                                                                                                                                                                                                                                                                                                                                                         | Full-bleed media with type over it is the main device of an experiential page.                   |
| Motion "Never" list: scroll reveals, parallax, counters, hover image transforms | §0 line 28, §8 lines 452-453, §11 line 520 | Allow: masked headline reveals and image clip reveals on enter (CSS `animation-timeline: view()` with an IntersectionObserver fallback), slow parallax on full-bleed banners only, a digit roll on the rate figures **only when the value actually changes** or on first view, hover that lights a velvet tile (brightness or vignette lift, not scale on 600 px images), View Transitions between listing and PDP. All behind `prefers-reduced-motion: no-preference`. | Signals life and craft; costs a few KB.                                                          |
| 5/7 or 7/5 always, never 50/50, never centred, text starts at column 1          | §4 line 183, §0 line 32, §11 line 534      | Allow centred display moments (rate figure, a collection title), full-bleed compositions, and overlaps (type crossing an image edge).                                                                                                                                                                                                                                                                                                                                   | Asymmetry everywhere becomes its own monotony.                                                   |
| One container width for everything                                              | `tokens.css:95-98`                         | Restore a real `--container-wide` and add a full-bleed track for rails, banners and the tray.                                                                                                                                                                                                                                                                                                                                                                           | 80 px gutters on all 14 sections is what makes every screen look the same.                       |
| Typographic hero with no media on index pages                                   | §6.6 line 318, §7.2, §7.5, §7.8            | Give every index a visual opener: a velvet product rail, a banner, or the rate as a giant numeral.                                                                                                                                                                                                                                                                                                                                                                      | The article-header opener is the most repeated blog signal.                                      |
| No carousels; desktop gallery stacked                                           | §0 lines 13-14, §6.14, §11 line 519        | Allow user-driven horizontal rails (scroll-snap, arrows, no autoplay) for trays and collections on desktop.                                                                                                                                                                                                                                                                                                                                                             | A tray you scroll sideways feels like a counter; a 4-up grid feels like search results.          |
| Type scale tops out at 72 px; eyebrows are the only uppercase; roman only       | §3 lines 152-171                           | Add a true display size (clamp to about 9–12 rem) for one word or number per chapter, allow an italic accent, and choose the display face on purpose (Bodoni Moda per spec, or a higher-contrast Didone), retiring Cormorant at 500.                                                                                                                                                                                                                                    | Headline contrast is the cheapest source of drama available with small photos.                   |
| Journal on home, FAQ on every template                                          | §7.1 items 12-13                           | Move the journal off the home page (or to a single link); keep FAQs on rate, exchange and PDP where they answer buying questions.                                                                                                                                                                                                                                                                                                                                       | Removes the literal blog index from the brand's front door.                                      |
| C-ring limited to favicon, list marker, 404                                     | §0 line 25, §11 line 526                   | Allow the C-ring as one large brand motif (e.g. drawn on load around the rate, or a mask for an image reveal).                                                                                                                                                                                                                                                                                                                                                          | It is the brand's only ownable shape and already exists as SVG.                                  |

### Keep (these protect trust, speed and honesty)

- No autoplay sliders, no auto-advancing anything; every movement user-initiated or scroll-linked and short (≤ 600 ms), all off under reduced motion.
- No count-ups or fake live numbers for anything that is not the real baked rate; no invented hours, stock, prices, ratings or statistics; Option A pricing (no fabricated offers in JSON-LD); no FAQPage.
- Never upscale a source image (keep the build-time guard); one LCP image per page with `fetchpriority`; explicit `width`/`height` (and give `Plate` an intrinsic size so it never collapses to 0×0 before load).
- Zero third-party JS: no GA4, no Maps iframe, no chat widget; WhatsApp stays a plum button, never the green bubble.
- Accessibility gates: one H1, real text in the DOM, focus rings, 44 px targets, keyboard mega and drawer, `inert` behind dialogs, contrast table.
- Copy voice and the anti-slop list for words ("Welcome to", "Discover", "Elevate", "timeless elegance", em dashes, emoji).
- Tokens only, radius 0, no drop shadows, no glassmorphism (remove the blurred badge in `Hero.astro:221-222`).
- Content-as-data, facts in `site.ts`, routes from `routes.ts`, one canonical URL per category with hash filters.
- A written budget; raise it deliberately (e.g. JS ≤ 15 KB gz for a motion module, one poster-backed muted video only if real footage of the shop exists).

---

## Carry-forward patterns from the current build (ranked)

These are the current site's own steal-worthy patterns: what to keep and amplify rather than redesign away.

1. **The live rate as the masthead number.**
   _Why it works:_ it is the one fact every Dubai gold buyer checks before walking in, it changes daily, and Classic publishes it with provenance (Dubai Jewellery Group rate, date, formula).
   _How to adapt:_ make it the hero's visual anchor: a very large champagne numeral on a dark velvet-toned field, with a quiet digit roll only when a refetched value differs from the baked one, "Updated 09:20" beside it, and karat switching (22K/24K/21K/18K) as large tabs. Keep the baked value and `data-rate` hooks so it is correct with no JS.

2. **Piece-specific WhatsApp prefill plus "Reserve to view" at a named branch.**
   _Why it works:_ converts an enquiry-led catalogue into a concrete action ("hold this piece at Safari Mall") without e-commerce.
   _How to adapt:_ a sticky enquiry dock on the PDP (desktop right rail, mobile bottom sheet) with the four branches as small photo or map cards; on listing cards, reveal "Enquire" on hover/focus over the dark tile.

3. **The old-gold offer: "Bring old gold. Leave with its full weight."**
   _Why it works:_ a concrete, differentiating promise grounded in the group's trading history.
   _How to adapt:_ turn the band into an interactive estimator (grams × karat × today's baked rate = indicative credit), clearly labelled indicative, on a dark chapter with the `banner-about.jpg` sun-pendant field. Real data, genuinely experiential, no fabrication.

4. **The proof strip (rate, Google 4.9 / 680, 0 % deduction, four branches).**
   _Why it works:_ four verifiable facts, each linked to its evidence.
   _How to adapt:_ integrate into the hero foot on the dark surface, larger numerals, staggered reveal on load; keep the outbound link to the Google listing.

5. **Consistent velvet product staging (p01–p09).**
   _Why it works:_ nine pieces shot identically read as one display case, which is rare for a small jeweller.
   _How to adapt:_ present them as a lit vitrine: dark surface matched to the velvet, vignette, 300–420 px tiles in a horizontal rail, name and karat set in champagne beneath; never enlarge beyond 600 px.

6. **Numbered collections index with wordmarks.**
   _Why it works:_ twelve named traditions (Kolkata, Rajkot, Temple, Kuwaiti, Turkish …) are a real differentiator against generic gold shops.
   _How to adapt:_ make it an image-led chapter list: hovering or focusing a row reveals that collection's velvet piece and recoloured wordmark at the side; on mobile a horizontal card rail.

7. **Occasions as portraits with a caption.**
   _Why it works:_ the only human imagery on the site; maps to how customers shop (wedding, festival).
   _How to adapt:_ four full-height panels across the width with type over a bottom scrim, expanding on hover/focus; festival panel tied to the live offer (Diwali 2026).

8. **Mobile action bar (WhatsApp · Call · Stores).**
   _Why it works:_ one tap to the three ways the shop converts, without a floating bubble.
   _How to adapt:_ keep as is; restyle to the dark surface on dark chapters.

9. **Hash-state filters on one canonical URL.**
   _Why it works:_ SEO-safe filtering with no new URLs.
   _How to adapt:_ keep the logic; restyle chips for the dark tray and add a short fade on filter (reduced-motion aware).

---

## Defects found in passing (worth fixing in any direction)

1. `Plate.astro:66-67`: plates have no intrinsic size before load (measured 0×0 for lazy plates), so tray rows collapse and shift, and fast captures show text-only cards. Give `.plate` `inline-size: 100%` (keep the max) or an explicit `aspect-ratio` box that does not depend on the image.
2. `tokens.css:58`: display face is Cormorant Garamond, contrary to `design-spec.md` §3 (Bodoni Moda) and blacklisted in §11 line 524. Both fontsource packages are installed (`package.json`).
3. `Hero.astro:221-222`, `:273`, `:316-318`: raw `rgba()` colour, `backdrop-filter: blur`, a `box-shadow` and a 6fr/6fr split: each breaks a convention in `CLAUDE.md` or the spec.
4. `index.astro:101`: hero image is `store-lifestyle.jpg`, which shows rings on paper, not a store; the alt text is accurate but the asset name and spec intent are not.
5. No product has `weightGrams` (0 of 16), so the "Gold value today" line never renders and "by the gram" claims are unsupported on screen.
6. All four journal posts carry `pubDate: 2026-10-13`; three appear on the home page with identical dates.
7. Ten files in `src/assets/collections/` and `story/{hero,workshop}.jpg` duplicate product shots, inflating the apparent asset count.
8. `design-spec.md` still describes a single shop (Shop 6, Mariyam Plaza) while `site.ts` and the pages describe four branches; the spec needs a revision before it governs a redesign.
