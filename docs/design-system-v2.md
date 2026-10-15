# Design system v2: Night vitrine

**Status:** final direction, build-ready. **Date:** 13 October 2026. **Owner of this file:** the design lead. Engineers change it only through the lead.

**What it replaces.** This file supersedes the visual and experience rules of `docs/design-spec.md`: sections 0 to 4, 6 and 7, and every motion ban in section 8. It keeps the URL structure as built in `src/lib/routes.ts`, the SEO contract (one `<h1>`, `title` up to 60 characters with no brand suffix, `description` 70 to 160, self-canonical, breadcrumbs mirrored as `BreadcrumbList`) and the JSON-LD policy of `design-spec.md` §5 (builders in `src/lib/schema.ts`, no `FAQPage`, no `aggregateRating`, no `Offer` without a real price). Page titles and descriptions stay as they are today unless §6 of this file gives a new one.

**Evidence base.** `docs/research/competitive/00-competitive-analysis.md` and files 01 to 08; the three directions in `docs/design/directions/`; the three verdicts in `docs/design/verdicts/`; the prototypes in `docs/design/prototypes/` (moved out of `public/_proto/` in WP6 so they never ship; reference only, not linted or formatted).

Contents

0. The decision
1. Thesis and rules
2. Tokens (`src/styles/tokens.css`)
3. Global patterns (`src/styles/base.css`)
4. Fonts (`astro.config.mjs`, `BaseLayout.astro`)
5. Components
6. Page compositions
7. Client JavaScript
8. Copy
9. Implementation plan
10. Owner asks

Appendix A. Every judge finding and where it is fixed
Appendix B. Acceptance toolkit

---

## 0. The decision

**Night vitrine is the spine.** It won all three verdicts: creative 49/60 (Live gold 44, Ivory maison 43), customer 48/60 (Ivory maison 47, Live gold 45), engineering 46/60 (Ivory maison 45, Live gold 40). It is the only direction whose defects are local, one-file fixes; Ivory maison's defects sit inside its signature motion and Live gold's inside its architecture (a rate drawn by CSS over "000.00" and page-global karat state).

**The idea in one line.** The site becomes the room the photographs were shot in: a dark stage sampled from the velvet, each piece lit in its own pool of light, the day's gold rate as the instrument on the wall, daylight bands to rest the eye, and plum wherever a visitor asks a person for something.

**Grafted from Ivory maison**

| Graft                                                                                                                                            | Where it lands                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Two-level H1: a readable place-name line, then a short display line                                                                              | Home hero (§6.1, §8)                                             |
| Real-text karat control: four numerals stacked in one grid cell, a radio `fieldset`, `:has()` scoped to the instrument; works with no JavaScript | `RateInstrument` (§5.4)                                          |
| The hallmark stamps band (999 / 916 / 875 / 750 with fineness bars and today's rate)                                                             | Home section 5, `/gold-rate/`, `/gold-exchange/` (`KaratStamps`) |
| The one-line campaign band that exists only while an offer runs                                                                                  | `CampaignLine` (home, festivals, offers)                         |
| "Your quote, in three lines"                                                                                                                     | `QuoteLines` (piece page, `/gold-rate/`)                         |
| A dark ground sampled from the photo when a piece is shown alone                                                                                 | `stage` field on products, `StageImage`                          |
| The typeset empty state for a style with no photograph (Kuwaiti)                                                                                 | `TypesetPlate`                                                   |
| `<details name>` FAQ with a `::details-content` transition                                                                                       | `Faq`, base.css                                                  |
| Modal `<dialog>` drawer opened by `commandfor`                                                                                                   | `MobileDrawer`                                                   |
| Ivory header on day-led pages                                                                                                                    | `SiteHeader` `tone`                                              |
| The `.track` named-line grid (bleed / wide / content)                                                                                            | base.css                                                         |
| Demo data only behind `?demo=` in prototypes; never in production                                                                                | §7, WP rules                                                     |

**Grafted from Live gold**

| Graft                                                                                                                                                                                           | Where it lands                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| The chosen karat followed by the header chip, the phone bar and the estimator (scoped: one `html[data-karat]` attribute, no page-wide recolour)                                                 | `karat.ts`, `RateFigure follow` |
| Hallmark stamps on the karat keys, small figures in Plex 500                                                                                                                                    | `RateInstrument` keys           |
| Estimator: − and + steppers up to 500 g, "stamped inside the piece" copy, the spelled-out sum line, a branch `<select>` written into the WhatsApp message, a worked example baked into the HTML | `Estimator`                     |
| "Ask us to call you" and "Which branch has it today?" rows                                                                                                                                      | `PieceTicket`                   |
| Bronze WhatsApp cell in the phone bar                                                                                                                                                           | `MobileActionBar`               |
| An honest "our record starts on 13 October 2026" state until seven snapshots exist                                                                                                              | `RateRecord`                    |
| Route line drawn with `scale` (not stroke repaint), stations aligned to the door dividers                                                                                                       | `BranchDoors`                   |
| "Bar, stamp, necklace" cards that assemble on scroll, as the typographic About chapter until the shoot                                                                                          | `BarToBangle` (About)           |
| Today's per-gram rate under every case                                                                                                                                                          | `ProductCard`                   |

**Owner decisions, 15 October 2026** (applied in WP6; they override anything below that says otherwise)

- **Plum is never a ground.** `#4B2849` appears only as the accent on light grounds: the filled button, links, chips, italic accents and the logo. The grounds are `stage`, `stage-raised`, `ivory`, `parchment` and `white` only; the sections this file calls "plum" (the campaign line, the old-gold split, the enquiry bands, the footer) are built on `parchment` or `stage-raised`. The `plum` and `plum-deep` tones stay defined in `tones.ts` and `base.css` for the button and chip variables but no section declares them.
- **The rate rolls, never crossfades.** When a fetched posting differs from the baked one, every changed digit rolls (`roll.ts`); nothing fades between two figures, and the figures never count up.
- **Hours are shown with their Google source.** Each branch prints the opening hours from its Google listing (`branches[].hours`, `source: 'Google listing, 15 October 2026'`) captioned "As listed on Google, checked {date}" until `hours.confirmed` is set; the doors, `/stores/`, the branch pages and `openingHoursSpecification` all read the same `src/lib/hours.ts`. `open-now.ts` writes "Open now, until 22:30" or "Closed now, opens at 16:00" in Dubai time. This replaces "no hours while unconfirmed" wherever it appears below.
- **The hero's lit switch.** The home hero holds four pieces (p03 and the next three featured velvet pieces). A champagne glint sweeps the pool once the priority image has loaded; the visitor switches pieces with two arrow buttons or the four names; one automatic cycle (seven seconds a piece, paused on hover, focus or a hidden tab) runs once after the glint and then stops for good. A switch dims the case light to the stage colour (200 ms), swaps the piece, and lights it again (400 ms): never a crossfade, and never under reduced motion, where the swap is instant and nothing advances by itself. `hero.ts`, 1.2 KB.

**Fixed** (every weakness and violation raised by the judges is listed with its fix in Appendix A). The headline fixes: no simulated rate anywhere; a solid header whose tone follows the first section (no see-through glass); one masked image per case, fully lit by a quarter of the way into view; panorama never touches plum; no plum fill or text on the stage, so the dark bar's WhatsApp cell is bronze; "Styles" instead of "Traditions" and no degrees on the line; Italian and Singapore labelled as "-style"; the old-gold estimator shows a dirham figure only once the owner confirms the exchange basis (until then it shows fine-gold weight, which is a fact); "no weight deduction" and "0% deduction" disappear from headings until confirmed; home copy at most 750 words; phone home at most 10,500 px; fonts subset to fit 90 KB with only the roman preloaded; `src/assets/collections/kuwait.jpg` (a copy of p09, the Antique Rani Haar) unlinked, and `products/chain.jpg` / `collections/singapore.jpg` (charms resembling another brand's mark) withdrawn.

---

## 1. Thesis and rules

### 1.1 Thesis

Classic is a gold house with bullion roots, four counters and a catalogue photographed on dark velvet, so the site is built as the shop after dark: the street is dark, the cases are lit, and the gold is the brightest thing in sight. Every velvet photograph sits on a stage sampled from its own velvet, inside a pool of light, never larger than its source. Today's rate is the instrument on the wall, set in light Cormorant at 200 px, real text, rolling only when the posted figure really changes. Ivory bands are where the eye rests and where the history is told in one line; plum is where a visitor asks a person, which is also exactly how the owner's store looks (ivory card, plum button, square corners). Drama comes from scale, pacing, light and the live number, never from enlarging a photograph or inventing a fact, and every path ends at a person: WhatsApp, a call, or one of the four doors.

### 1.2 The rules (these replace "one ivory", "no motion" and "no alternating grounds")

1. **The ground follows the photograph.** Velvet photographs (p01 to p09) live on the stage (`--stage-0`, or the photo's own `stage` colour when shown alone) inside a radial mask. Studio cut-outs live on the lilac plate (`--plate-lilac`, their own ground). Occasion portraits live on ivory. A velvet photo never sits on plum; a stage section meets a plum section only across a 1 px bronze seam with text, not a photograph, at the meeting edge.
2. **Every section declares one tone and components follow it.** `data-tone` is `stage`, `stage-raised`, `ivory`, `parchment`, `white`, `plum` or `plum-deep`. Components read the semantic variables (`--fg`, `--body`, `--muted`, `--accent`, `--eyebrow`, `--rule`, `--btn-*`, `--focus-ring`) and never branch on the tone themselves. Two dark sections in a row must differ in tone (`stage` then `stage-raised`), never three; an ivory, parchment or plum band appears at least every 1.5 desktop screens.
3. **One focal object per screen, at display scale.** The rate, a lit case, a hallmark stamp, the styles line, the estimate, a window, a door. The home page holds at most 750 words in `<main>` and never repeats a module type back to back. No eyebrow-plus-40-px-headline template: heading shapes vary (§8.3).
4. **Photographs are lit, never enlarged.** Drawn at most at their source width and at most 600 CSS px (velvet), 392 CSS px (portraits, sharp on 2× screens), half the source width in trays (cut-outs). No zoom on hover, no `scale` above 1, no AI upscaling, no stock models. Exactly one `priority` image per page, and it is never faded in, masked by an animation or given `@starting-style`.
5. **Motion arrives; it never performs.** 160 ms for colour, 320 ms for interface, 600 ms for decoration, on `--ease-out` or `--ease-lux`. Only `opacity`, `translate`, `scale` (of hairlines, wrappers and receding images, never above 1) and, as named exceptions, `stroke-dashoffset` on the sparkline and one registered-property-free sheen on the rate rule. Every scroll effect sits inside `@media (prefers-reduced-motion: no-preference)` and `@supports (animation-timeline: view())`, and its static state is the finished design. Nothing loops, nothing advances by itself, nothing moves the layout.
6. **The rate is real text, everywhere, and says where it came from.** Baked at build from `src/content/rates/` with its source and fetch time, in tabular lining figures, identical on every surface (`data-rate` hooks). It never counts up; digits roll only when a fetched value differs from the baked one. A stale posting says "Last published rate, {date}" and stops rolling.
7. **A person is the primary action.** WhatsApp (prefilled with the piece, code, URL and branch), a call, or a visit. The filled button is plum on light grounds and bronze with stage ink on dark grounds (stage, plum, plum-deep). Every page ends at a person: an `EnquiryBand` or the doors.
8. **Honest by construction.** Facts only from `src/data/site.ts` and `src/content/`; unconfirmed facts phrased generically behind their `TODO(owner)` gates (hours, exchange figure, promise terms); empty states typeset, never a borrowed photograph; schematics labelled as schematic.

### 1.3 Old rules: retired and kept

| Old rule (design-spec.md, CLAUDE.md)                                                                                                                                                                                                        | Status                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| One ivory surface; at most two plum bands; adjacent sections separated only by a hairline                                                                                                                                                   | **Retired.** Tones per rule 2                                                                                                                               |
| No motion: no scroll reveals, no page transitions, no image fades, rate swapped "without animation"                                                                                                                                         | **Retired.** Motion policy per rule 5 and §3.8                                                                                                              |
| No text on images                                                                                                                                                                                                                           | **Retired, narrowly.** Text may sit over the dark field of `story/banner-about.jpg` (the panorama) only, contrast checked (13.11:1 or better); nowhere else |
| Every layout a 5/7 split in one 1,280 px column; `--container-wide` equal to `--container`                                                                                                                                                  | **Retired.** 7/5, 6/6 and centred layouts allowed; `--container-wide` is 96 rem; full-bleed grounds                                                         |
| `--t-display` ceiling of 72 px; Cormorant at 500 for headings                                                                                                                                                                               | **Retired.** Display up to 200 px for one number or line per section; Cormorant 300 at 32 px and above, 400 from 22 to 31 px, never 500 or above            |
| Velvet photos in white tray cells ("photo white equals cell white")                                                                                                                                                                         | **Retired.** Rule 1                                                                                                                                         |
| An eyebrow above every H2; headlines as sentences ending in a full stop                                                                                                                                                                     | **Retired.** Eyebrows optional; headlines name things; only the heritage and closing sentences end in a full stop                                           |
| Journal and FAQ on the home page; FAQ at the foot of every page type                                                                                                                                                                        | **Retired.** FAQ only on `/gold-rate/`, `/gold-exchange/`, piece pages, `/custom-jewellery/`, `/stores/`, `/our-promise/`, `/offers/{slug}/`                |
| Utility strip above the header                                                                                                                                                                                                              | **Retired.** The rate chip in the header replaces it                                                                                                        |
| Radius 0; the C-ring is the only curve                                                                                                                                                                                                      | **Kept**                                                                                                                                                    |
| Tokens only: no raw colours, sizes or spacing in component CSS                                                                                                                                                                              | **Kept.** Per-element `style="--stage:#…"` written from content data is the single allowed exception                                                        |
| No shadows                                                                                                                                                                                                                                  | **Kept**                                                                                                                                                    |
| No hover transforms                                                                                                                                                                                                                         | **Kept for images, cards and buttons.** A 1 px hairline may wipe in with `scale`                                                                            |
| No gradients                                                                                                                                                                                                                                | **Kept as visible colour.** Gradients are allowed only as `mask-image` alpha ramps (photo masks, the sheen, the digit window, the panorama feather)         |
| One H1; titles, descriptions, breadcrumbs, JSON-LD builders; routes from `routes.ts`; facts from `site.ts`; content as data; images through `astro:assets`; CSP (no inline scripts, no third-party scripts); Astro 7 strictness; copy voice | **Kept** unchanged                                                                                                                                          |

---

## 2. Tokens

### 2.1 `src/styles/tokens.css` (complete replacement)

Drop this file in as is. Existing names keep their meaning; values change where noted in §2.4. Deprecated aliases at the end keep untouched components working until WP6 removes them.

```css
/*
 * Design tokens v2: the only place a colour, size, duration, easing, mask or layer is defined.
 * Spec: docs/design-system-v2.md §2. Components read these tokens, or the per-tone semantic
 * variables that base.css derives from them (--fg, --body, --accent, --btn-bg ...). Never a raw
 * value in a component. Per-element custom properties written from content (--stage, --cap) are
 * the one exception.
 */
:root {
  /* ---------- Stage: the dark room, sampled from the velvet corners (OKLCH h ≈ 285) ---------- */
  --stage-0: #0b0918; /* the stage: velvet photographs live here */
  --stage-1: #110e24; /* raised stage: alternate dark sections, mega panel, drawer, phone bar */
  --stage-2: #19152f; /* fields, popovers and keys on the stage */
  --stage-3: #221c3d; /* pressed or selected key on the stage */
  --on-stage: #faf7f2; /* headings, names, numerals in ivory: 18.43:1 on stage-0 */
  --on-stage-body: #ddd5df; /* running text: 13.74:1 (deliberately not white: less halation) */
  --on-stage-muted: #a99fb5; /* captions, meta: 7.80:1 */
  --rule-stage: rgb(190 134 88 / 0.26); /* decorative hairline on the stage */
  --rule-stage-strong: rgb(190 134 88 / 0.7); /* control borders on the stage: 3.57:1 */
  --wash-stage: rgb(220 194 154 / 0.08); /* hover wash on outlined controls on the stage */
  --scrim-stage: rgb(11 9 24 / 0.86); /* popover and dialog backdrop */

  /* ---------- Golds: brand bronze #BE8658 verbatim ---------- */
  --bronze: #be8658; /* eyebrows and labels on dark grounds (6.32:1), hairlines, the filled button on dark */
  --champagne: #dcc29a; /* numerals, italic accents, links and focus on dark grounds (11.46:1) */
  --gold-800: #6f4a24;
  --gold-700: #8a5c32; /* gold text on light grounds: 5.37:1 on ivory */
  --gold-600: #b9814f; /* hover underline colour on light grounds (non-text) */
  --gold-500: #cda678;
  --gold-300: var(--champagne);
  --gold-100: #f1e6d3;

  /* ---------- Daylight surfaces ---------- */
  --surface-0: #ffffff; /* white: plates, inputs on ivory */
  --surface-1: #faf7f2; /* ivory: breath bands, reading pages, the piece ticket */
  --surface-2: #f3eee6; /* parchment: the one warm alternate band */
  --plate-lilac: #eae5e9; /* sampled: the exact ground of every studio cut-out */
  --surface-plum: #4b2849; /* plum band */
  --surface-plum-deep: #2e1a2d; /* footer, estimator panel */

  /* ---------- Ink on light grounds ---------- */
  --ink-900: #1c1418; /* 16.90:1 on ivory */
  --ink-700: #4a3f46; /* 9.40:1 */
  --ink-500: #6b5f66; /* 5.69:1 */
  --ink-300: #b8afb3; /* non-text only */
  --ink-on-plum: #faf7f2; /* 11.57:1 on plum, 15.10:1 on plum-deep */
  --ink-on-plum-muted: #d9ccd6; /* 7.98:1 on plum */

  /* ---------- Plum scale (brand #4B2849 kept verbatim as plum-700) ---------- */
  --plum-900: #2e1a2d;
  --plum-700: #4b2849;
  --plum-500: #6b3f68;
  --plum-300: #b498b2; /* small print on plum-deep only: 6.20:1 */
  --plum-100: #eadfe9;
  --plum-050: #f6f0f5;

  /* ---------- Rules ---------- */
  --rule-1: #e6e0d6; /* decorative hairline on light grounds */
  --rule-2: #cfc6b8; /* stronger decorative hairline on light grounds */
  --rule-input: #8f858b; /* field borders on light grounds: 3.33:1 on ivory */
  --rule-gold: var(--bronze); /* seams, eyebrow ornaments, the rate rule */
  --rule-on-plum: rgb(250 247 242 / 0.22); /* decorative hairline on plum */
  --rule-on-plum-strong: rgb(250 247 242 / 0.5); /* control borders on plum: 4.13:1 */
  --wash-plum: rgb(250 247 242 / 0.08); /* hover wash on outlined controls on plum */

  /* ---------- Semantic ---------- */
  --ok: #2e6b4f;
  --err: #a3362b;
  --ok-on-plum: #8fd1b0;
  --err-on-plum: #f3a89c;
  --ok-on-stage: #8fd1b0;
  --err-on-stage: #f3a89c;
  --focus: #4b2849; /* focus ring on light grounds */
  --focus-on-dark: #dcc29a; /* focus ring on stage, plum and plum-deep */
  --link: #4b2849;
  --link-hover: #8a5c32;

  /* ---------- Typography ---------- */
  /* --font-display and --font-text are declared by Astro's <Font> (self-hosted, subset, with
     metric-matched fallbacks). The display family has a true italic variant. */
  --ff-display: var(--font-display, 'Cormorant Garamond', Georgia, serif);
  --ff-text: var(--font-text, 'IBM Plex Sans', Arial, sans-serif);

  /* Fluid scale; values at 390 / 1024 / 1440 px in docs/design-system-v2.md §2.3 */
  --t-rate: clamp(5.75rem, 2.4rem + 13.5vw, 12.5rem); /* 92 → 200: the rate numeral only */
  --t-display: clamp(3rem, 1.9rem + 5.2vw, 7rem); /* 51 → 105: one word per opener */
  --t-stamp: clamp(4rem, 2.6rem + 6vw, 8rem); /* 65 → 128: hallmark stamps */
  --t-numeral-xl: clamp(2.75rem, 1.6rem + 4.4vw, 6rem); /* 44 → 89: estimate, board figures */
  --t-h2: clamp(2.25rem, 1.5rem + 3.2vw, 4.5rem); /* 37 → 70: section titles */
  --t-band: clamp(2rem, 1.25rem + 3.2vw, 4.25rem); /* 33 → 66: one-line bands */
  --t-hero: clamp(2rem, 1.4rem + 2.8vw, 4.25rem); /* 33 → 63: home H1 display line */
  --t-h1: clamp(2.25rem, 1.55rem + 2.4vw, 3.75rem); /* 36 → 59: page H1 */
  --t-h3: clamp(1.5rem, 1.3rem + 0.9vw, 2.125rem); /* 24 → 34: door names, panel titles */
  --t-numeral: clamp(1.625rem, 1.35rem + 1.1vw, 2.375rem); /* 26 → 37: karat keys, fact numerals */
  --t-name: clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem); /* 20 → 26: case and window names, italic */
  --t-lead: clamp(1.0625rem, 1rem + 0.35vw, 1.25rem); /* 17 → 20 */
  --t-body: 1.0625rem; /* 17 */
  --t-title: 1.0625rem; /* Plex 500 labels inside cards */
  --t-kicker: 1rem; /* home H1 first line: Plex 500, sentence case */
  --t-small: 0.875rem; /* 14 */
  --t-caption: 0.8125rem; /* 13 */
  --t-eyebrow: 0.75rem; /* 12: Plex 500, uppercase, tracked */
  --t-note: 1.125rem; /* Cormorant italic asides */

  --fw-display: 300; /* Cormorant at 32 px and above */
  --fw-display-small: 400; /* Cormorant from 22 to 31 px; never below 22 px */
  --fw-text: 400; /* Plex body; never lighter on dark grounds */
  --fw-text-strong: 500; /* Plex labels, buttons, small figures */

  --lh-numeral: 0.86;
  --lh-display: 1.02;
  --lh-heading: 1.1;
  --lh-text: 1.6;
  --lh-text-stage: 1.65;

  --track-rate: -0.02em;
  --track-display: -0.012em;
  --track-h1: -0.01em;
  --track-h2: -0.012em;
  --track-eyebrow: 0.18em;

  /* ---------- Space (4 px base) ---------- */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
  --space-10: 8rem;
  --section-y: clamp(4rem, 2.6rem + 6.2vw, 9.5rem); /* 66 → 131 */
  --band-y: clamp(5rem, 2.6rem + 10vw, 12rem); /* 81 → 186: one-line bands */
  --slim-y: clamp(2.5rem, 1.8rem + 2.4vw, 4rem); /* 40 → 63: campaign and slim bands */

  /* ---------- Layout ---------- */
  --container: 80rem; /* 1280: reading, grids, forms */
  --container-wide: 96rem; /* 1536: hero, cases, styles line, doors, header */
  --container-narrow: 46rem; /* centred story text */
  --measure: 34rem; /* leads */
  --prose: 68ch; /* long reading */
  --gutter: clamp(1rem, 0.35rem + 2.7vw, 3rem); /* 16 at 390, 44 at 1440 */
  --grid-gap: clamp(1rem, 0.6rem + 1.6vw, 2.5rem); /* 16 → 33 */
  --header-h: 3.5rem; /* 56; 72 from 64em (below) */
  --action-bar-h: 3.5rem; /* 56, plus env(safe-area-inset-bottom) */
  --control-h: 3rem; /* 48: buttons and fields */
  --tap: 2.75rem; /* 44: minimum target for controls */
  --tap-inline: 1.5rem; /* 24: minimum target for links in running lists (WCAG 2.5.8) */
  --radius: 0; /* the only curve on the site is the C-ring */

  /* ---------- Image caps (CSS px; never above the source width) ---------- */
  --cap-velvet: 600px; /* any velvet photograph */
  --cap-hero: 560px; /* home hero piece on desktop */
  --cap-case: 420px; /* a case in a wall */
  --cap-portrait: 392px; /* occasion portraits: sharp on 2× screens */
  --cap-pano: 120rem; /* the 1920 px panorama */

  /* ---------- Motion ---------- */
  --dur-quick: 160ms; /* colour and chip state */
  --dur-ui: 320ms; /* buttons, popovers, drawer, mega panel, crossfades */
  --dur-slow: 600ms; /* underline wipes, image fades, karat numeral crossfade */
  --dur-roll: 640ms; /* one digit of the rate */
  --roll-stagger: 55ms; /* per digit, from the right */
  --dur-sheen: 1800ms; /* the single hairline sheen */
  --dur-page: 240ms; /* cross-document root fade */
  --dur-morph: 320ms; /* the piece growing into its page */
  --dur-enter: var(--dur-ui); /* top-layer entry */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1); /* interface */
  --ease-lux: cubic-bezier(0.19, 1, 0.22, 1); /* decoration (Van Cleef's curve) */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); /* the sheen */
  --ease-wipe: cubic-bezier(0.4, 0, 0.2, 1); /* bars that fill */

  /* ---------- Masks (gradients appear only here, as alpha ramps) ---------- */
  --feather-x: 14%;
  --feather-y: 12%;
  --mask-spot: radial-gradient(
    closest-side,
    #000 52%,
    transparent 100%
  ); /* a piece in its pool of light */
  --mask-pool: radial-gradient(
    closest-side,
    #000 60%,
    transparent 100%
  ); /* the piece page: a wider pool */
  --mask-edge:
    linear-gradient(
      to right,
      transparent,
      #000 var(--feather-x),
      #000 calc(100% - var(--feather-x)),
      transparent
    ),
    linear-gradient(
      to bottom,
      transparent,
      #000 var(--feather-y),
      #000 calc(100% - var(--feather-y)),
      transparent
    );
  --mask-pano: linear-gradient(to bottom, #000 72%, transparent);
  --mask-pano-sides: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent);
  --mask-sheen: linear-gradient(to right, transparent, #000 50%, transparent);
  --mask-digit: linear-gradient(transparent, #000 30%, #000 90%, transparent);

  /* ---------- Layers ---------- */
  --z-raised: 1;
  --z-sticky: 10; /* sticky columns and chapter chips */
  --z-bar: 20; /* phone action bar */
  --z-header: 30;
  --z-dialog: 40; /* fallback when the top layer is unavailable */
  --z-skip: 50;

  /* ---------- Deprecated aliases: WP6 removes them once no component uses them ---------- */
  --ease: var(--ease-out);
  --dur-fast: var(--dur-quick);
  --dur-base: var(--dur-ui);
  --z-nav: var(--z-header);
  --strip-h: 0rem;
}

@media (min-width: 64em) {
  :root {
    --header-h: 4.5rem; /* 72 */
  }
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-quick: 0ms;
    --dur-ui: 0ms;
    --dur-slow: 0ms;
    --dur-roll: 0ms;
    --roll-stagger: 0ms;
    --dur-sheen: 0ms;
    --dur-page: 0ms;
    --dur-morph: 0ms;
  }
}
```

### 2.2 Contrast of every pairing used (WCAG 2.x, computed)

AA needs 4.5:1 for body text, 3:1 for large text (24 px, or 18.7 px bold) and for UI boundaries (1.4.11).

**Text on the stage**

| Text                               | stage-0 `#0b0918` | stage-1 `#110e24` | stage-2 `#19152f` | stage-3 `#221c3d` | Used for                                   |
| ---------------------------------- | ----------------- | ----------------- | ----------------- | ----------------- | ------------------------------------------ |
| `--on-stage` `#faf7f2`             | 18.43             | 17.67             | 16.52             | 15.10             | Headings, names, rate figures in ivory     |
| `--on-stage-body` `#ddd5df`        | 13.74             | 13.18             | 12.32             | 11.26             | Running text, inactive key values          |
| `--on-stage-muted` `#a99fb5`       | 7.80              | 7.48              | 6.99              | 6.39              | Captions, meta                             |
| `--champagne` `#dcc29a`            | 11.46             | 10.99             | 10.28             | 9.39              | Rate numeral, italic accents, links, focus |
| `--bronze` `#be8658`               | 6.32              | 6.06              | 5.67              | 5.18              | Eyebrows, labels                           |
| `--ok-on-stage` / `--err-on-stage` | 11.17 / 10.21     |                   |                   |                   | Form states                                |

A piece shown alone on its own stage colour (p06 `#1b1740`): champagne 9.83, muted 6.69, ivory 15.81.

**Text on light grounds**

| Text             | ivory `#faf7f2` | parchment `#f3eee6` | white | plum-050 `#f6f0f5` | lilac `#eae5e9`                     |
| ---------------- | --------------- | ------------------- | ----- | ------------------ | ----------------------------------- |
| `--ink-900`      | 16.90           | 15.64               | 18.06 | 16.09              | 14.52                               |
| `--ink-700`      | 9.40            | 8.70                | 10.04 | 8.95               | 8.08                                |
| `--ink-500`      | 5.69            | 5.26                | 6.08  | 5.41               | 4.89                                |
| `--gold-700`     | 5.37            | 4.97                | 5.74  | 5.11               | 4.62 (labels 12 px and larger only) |
| `--plum-700`     | 11.57           | 10.70               | 12.36 | 11.01              | 9.94                                |
| `--ok` / `--err` | 5.90 / 6.30     |                     |       |                    |                                     |

**Text on plum**

| Text                             | plum `#4b2849`  | plum-deep `#2e1a2d`       |
| -------------------------------- | --------------- | ------------------------- |
| `--ink-on-plum` `#faf7f2`        | 11.57           | 15.10                     |
| `--ink-on-plum-muted` `#d9ccd6`  | 7.98            | 10.42                     |
| `--champagne`                    | 7.20            | 9.39                      |
| `--plum-300` `#b498b2`           | 4.75 (not used) | 6.20 (footer small print) |
| `--ok-on-plum` / `--err-on-plum` | 7.01 / 6.41     |                           |

**Buttons, chips and panorama**

| Pairing                                                      | Ratio          |
| ------------------------------------------------------------ | -------------- |
| Stage ink `#0b0918` on bronze button                         | 6.32           |
| Stage ink on champagne (button hover, selected chip on dark) | 11.46          |
| Ivory on plum button / on plum-900 hover                     | 11.57 / 15.10  |
| plum-900 on champagne (selected chip on plum-deep)           | 9.39           |
| Ivory on the panorama's dark field (`#141732` to `#26294a`)  | 16.40 to 13.11 |
| `--on-stage-body` on the panorama's lightest dark field      | 9.78           |

**Non-text (1.4.11)**

| Boundary                                                             | Ratio                     |
| -------------------------------------------------------------------- | ------------------------- |
| `--rule-stage-strong` (composites to `#886045`) on stage-0 / stage-1 | 3.57 / 3.53               |
| `--rule-on-plum-strong` on plum / plum-deep                          | 4.13 / 4.12               |
| `--rule-input` on ivory / white / parchment                          | 3.33 / 3.56 / 3.08        |
| Bronze button edge on stage-0 / on plum / on plum-deep               | 6.32 / 3.97 / 5.18        |
| Focus ring: plum on ivory / champagne on stage, plum, plum-deep      | 11.57 / 11.46, 7.20, 9.39 |

**Pairings that are never used for text:** plum on the stage (1.59:1), bronze on plum (3.97:1), bronze on ivory (2.92:1), `--ink-500` or `--gold-700` on lilac below 14 px. `--rule-stage`, `--rule-1`, `--rule-2` and `--rule-on-plum` are decorative only and never the sole boundary of a control.

**Opacity is never used to mute text.** Muted text uses colour tokens. Reveals start at opacity 0 but complete by 45 % of the element's entry (§3.8), and are applied to section heads, cards and doors only, never to body copy longer than three lines.

### 2.3 Type scale

Display is **Cormorant Garamond** (variable 300 to 700, roman and true italic). Text and interface are **IBM Plex Sans** (variable).

| Token                       | 390 px  | 1024 px | 1440 px | Face, weight, leading, tracking                                                                     | Use                                                           |
| --------------------------- | ------- | ------- | ------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `--t-rate`                  | 92      | 177     | 200     | Cormorant 300, `--lh-numeral`, `--track-rate`, lining tabular, `text-box: trim-both cap alphabetic` | The rate numeral only; on desktop `min(var(--t-rate), 22svh)` |
| `--t-stamp`                 | 65      | 103     | 128     | Cormorant 300, 0.85, `--track-rate`, lining tabular                                                 | 999 / 916 / 875 / 750                                         |
| `--t-display`               | 51      | 84      | 105     | Cormorant 300 (italic allowed), `--lh-display`, `--track-display`                                   | One word per opener: a style, a branch, a category            |
| `--t-numeral-xl`            | 44      | 71      | 89      | Cormorant 300, lining tabular                                                                       | The estimate, the gold-rate board                             |
| `--t-h2`                    | 37      | 57      | 70      | Cormorant 300, `--lh-display`, `--track-h2`                                                         | Section titles                                                |
| `--t-band`                  | 33      | 53      | 66      | Cormorant 300, 1.12                                                                                 | One-line bands, the closing line, the footer slogan           |
| `--t-hero`                  | 33      | 51      | 63      | Cormorant 300, 1.04                                                                                 | The home H1's display line                                    |
| `--t-h1`                    | 36      | 49      | 59      | Cormorant 300, `--lh-heading`, `--track-h1`, `text-wrap: balance`                                   | Page H1                                                       |
| `--t-h3`                    | 24      | 30      | 34      | Cormorant 400, 1.2                                                                                  | Door names, panel titles, FAQ questions                       |
| `--t-numeral`               | 26      | 33      | 37      | Cormorant 400, lining tabular                                                                       | Karat key values, fact numerals                               |
| `--t-name`                  | 20      | 24      | 26      | Cormorant 400 italic, 1.2                                                                           | Case and window names                                         |
| `--t-lead`                  | 17      | 20      | 20      | Plex 400, 1.55                                                                                      | Leads                                                         |
| `--t-body`                  | 17      | 17      | 17      | Plex 400, 1.6 (1.65 on dark)                                                                        | Body                                                          |
| `--t-kicker`                | 16      | 16      | 16      | Plex 500, sentence case                                                                             | Home H1 first line                                            |
| `--t-small` / `--t-caption` | 14 / 13 |         |         | Plex 400 or 500                                                                                     | Meta, captions, status lines                                  |
| `--t-eyebrow`               | 12      |         |         | Plex 500, uppercase, `--track-eyebrow`                                                              | Eyebrows, karat labels, key labels                            |

**Rules.** Cormorant never below 20 px and never at 500 or above; below 22 px it is italic names only, at 400. Every number that is a rate, weight, fineness or count uses `font-variant-numeric: lining-nums tabular-nums` (`.fig`). Running headlines keep Cormorant's default old-style figures ("35 years"), which read as book type. Italic marks one accent phrase per heading at most, through `<em>`, coloured `--accent` (plum on light, champagne on dark). Uppercase only for eyebrows and karat labels.

**Scale contrast.** The home first screen sets a 12 px eyebrow, a 16 px kicker, a 63 px display line and a 200 px numeral: a 17:1 range.

### 2.4 Renamed, changed and retired tokens

| Token                    | Change                          | Replacement or note                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--t-display`            | 36→72 becomes 51→105            | Same meaning                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `--t-h1`                 | 30→56 becomes 36→59             | Same meaning                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `--t-h2`                 | 26→40 becomes 37→70             | Same meaning; components that used `--t-h2` for small titles move to `--t-h3`                                                                                                                                                                                                                                                                                                                                                                          |
| `--t-h3`                 | 20→24 becomes 24→34, weight 400 | Same meaning                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `--t-numeral-xl`         | 40→72 becomes 44→89             | Same meaning                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `--t-numeral`            | 18 fixed becomes 26→37          | Small figures move to `.fig` at `--t-small`                                                                                                                                                                                                                                                                                                                                                                                                            |
| `--t-body`               | 16→17 clamp becomes 17 fixed    |                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `--track-eyebrow`        | 0.14em becomes 0.18em           |                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `--section-y`            | 56→112 becomes 66→131           |                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `--container-wide`       | 80rem becomes 96rem             | Restores a real wide track                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--gutter`, `--grid-gap` | Slightly wider at desktop       |                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `--rule-gold`            | `#be8658`                       | Now an alias of `--bronze`                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--gold-300`             | `#dcc29a`                       | Now an alias of `--champagne`                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `--focus-on-plum`        |                                 | **Renamed** `--focus-on-dark` (also used on the stage)                                                                                                                                                                                                                                                                                                                                                                                                 |
| `--ease`                 |                                 | **Retired** → `--ease-out` (alias until WP6)                                                                                                                                                                                                                                                                                                                                                                                                           |
| `--dur-fast`             | 150 ms                          | **Retired** → `--dur-quick` 160 ms (alias until WP6)                                                                                                                                                                                                                                                                                                                                                                                                   |
| `--dur-base`             | 200 ms                          | **Retired** → `--dur-ui` 320 ms (alias until WP6)                                                                                                                                                                                                                                                                                                                                                                                                      |
| `--dur-slow`             | 240 ms becomes 600 ms           | Same name, new meaning (decoration); only `SiteHeader` used it and WP1 rewrites it                                                                                                                                                                                                                                                                                                                                                                     |
| `--z-nav`                |                                 | **Renamed** `--z-header` (alias until WP6)                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--strip-h`              |                                 | **Retired** with the utility strip (0 until WP6)                                                                                                                                                                                                                                                                                                                                                                                                       |
| New                      |                                 | All `--stage-*`, `--on-stage*`, `--rule-stage*`, `--wash-*`, `--scrim-stage`, `--bronze`, `--champagne`, `--plate-lilac`, `--rule-on-plum-strong`, `--ok/err-on-stage`, `--focus-on-dark`, `--t-rate`, `--t-stamp`, `--t-band`, `--t-hero`, `--t-name`, `--t-kicker`, `--fw-*`, `--lh-*`, `--track-rate`, `--band-y`, `--slim-y`, `--container-narrow`, `--measure`, `--tap-inline`, `--cap-*`, all motion and mask tokens, `--z-raised`, `--z-header` |

WP6 removed the five aliases marked "alias until WP6" (`--ease`, `--dur-fast`, `--dur-base`, `--z-nav`, `--strip-h`); nothing referenced them. It also tightened the rhythm so the home page fits closer to its height budget: `--section-y` is now 56 → 96 px (was 66 → 131) and `--band-y` 64 → 133 px (was 81 → 186). Two tokens were added for the hero's lit switch: `--dur-dim` 200 ms and `--dur-lit` 400 ms, both 0 under reduced motion.

Breakpoints (custom properties cannot be used in media queries, so these are the fixed values): **40em** (640), **48em** (768), **64em** (1024, desktop layout and 72 px header), **75em** (1200), **90em** (1440).

---

## 3. Global patterns (`src/styles/base.css`)

### 3.1 What lives here and what does not

`base.css` owns everything two or more components share: the reset, the seven tones, type defaults, links and the underline wipe, buttons, fields and chips, the layout track, section padding, the eyebrow, the stage image, rails, top-layer sheets, the karat follower, the digit roll, the sheen, scroll-driven utilities, view transitions, focus, reduced motion, forced colours and print. Component-specific layout stays in the component's scoped `<style>`. A component never re-declares a tone colour: it reads `--fg`, `--body`, `--muted`, `--accent`, `--eyebrow`, `--numeral`, `--rule`, `--rule-strong`, `--link`, `--wipe`, `--btn-*`, `--chip-*`, `--field-*` and `--focus-ring`.

### 3.2 `src/styles/base.css` (complete replacement)

```css
/*
 * Global styles v2: reset, tones, type, links, buttons, fields, layout tracks, the stage image,
 * rails, sheets, rate figures, motion utilities, view transitions, focus and print.
 * Spec: docs/design-system-v2.md §3. Logical properties throughout (a future /ar build is a
 * dir="rtl" flip). Every animation sits inside prefers-reduced-motion: no-preference.
 */
@import './tokens.css';

/* ============================== Reset ============================== */
[hidden] {
  display: none !important;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  font-synthesis: none;
  font-optical-sizing: auto;
  scroll-padding-block-start: calc(var(--header-h) + var(--space-4));
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

body {
  min-block-size: 100dvh;
  background: var(--surface-1);
  color: var(--ink-700);
  font-family: var(--ff-text);
  font-size: var(--t-body);
  font-weight: var(--fw-text);
  line-height: var(--lh-text);
  font-variant-numeric: lining-nums;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-wrap: break-word;
}

/* Pages that open on the stage paint the overscroll area dark too (BaseLayout sets it). */
body[data-ground='stage'] {
  background: var(--stage-0);
}

img,
picture,
svg,
video {
  display: block;
  max-inline-size: 100%;
}

picture,
figure {
  min-inline-size: 0;
}

img {
  block-size: auto;
}

button,
input,
select,
textarea {
  font: inherit;
  color: inherit;
}

button {
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
}

ul,
ol {
  padding-inline-start: 0;
}

ul[role='list'],
ol[role='list'] {
  list-style: none;
}

address {
  font-style: normal;
}

abbr[title] {
  text-decoration: none;
}

table {
  border-collapse: collapse;
  inline-size: 100%;
}

::selection {
  background: var(--plum-100);
  color: var(--ink-900);
}

/* ============================== Tones ============================== */
/* Light grounds (also the document default, so components outside a Section still resolve). */
:root,
[data-tone='ivory'],
[data-tone='parchment'],
[data-tone='white'] {
  --ground: var(--surface-1);
  --fg: var(--ink-900);
  --body: var(--ink-700);
  --muted: var(--ink-500);
  --accent: var(--plum-700);
  --eyebrow: var(--gold-700);
  --numeral: var(--plum-700);
  --rule: var(--rule-1);
  --rule-strong: var(--rule-2);
  --link: var(--plum-700);
  --link-hover: var(--gold-700);
  --wipe: var(--bronze);
  --focus-ring: var(--focus);
  --btn-bg: var(--plum-700);
  --btn-fg: var(--ink-on-plum);
  --btn-bg-hover: var(--plum-900);
  --btn-fg-hover: var(--ink-on-plum);
  --btn-line: var(--plum-700);
  --btn-line-fg: var(--plum-700);
  --btn-wash: var(--plum-050);
  --chip-line: var(--rule-input);
  --chip-on-bg: var(--plum-700);
  --chip-on-fg: var(--ink-on-plum);
  --field-bg: var(--surface-0);
  --field-line: var(--rule-input);
  --ok-tone: var(--ok);
  --err-tone: var(--err);
}

[data-tone='parchment'] {
  --ground: var(--surface-2);
}

[data-tone='white'] {
  --ground: var(--surface-0);
  --field-bg: var(--surface-1);
}

/* The stage: velvet photographs live here. */
[data-tone='stage'],
[data-tone='stage-raised'] {
  --ground: var(--stage-0);
  --fg: var(--on-stage);
  --body: var(--on-stage-body);
  --muted: var(--on-stage-muted);
  --accent: var(--champagne);
  --eyebrow: var(--bronze);
  --numeral: var(--champagne);
  --rule: var(--rule-stage);
  --rule-strong: var(--rule-stage-strong);
  --link: var(--champagne);
  --link-hover: var(--on-stage);
  --wipe: var(--bronze);
  --focus-ring: var(--focus-on-dark);
  --btn-bg: var(--bronze);
  --btn-fg: var(--stage-0);
  --btn-bg-hover: var(--champagne);
  --btn-fg-hover: var(--stage-0);
  --btn-line: var(--rule-stage-strong);
  --btn-line-fg: var(--on-stage);
  --btn-wash: var(--wash-stage);
  --chip-line: var(--rule-stage-strong);
  --chip-on-bg: var(--champagne);
  --chip-on-fg: var(--stage-0);
  --field-bg: var(--stage-2);
  --field-line: var(--rule-stage-strong);
  --ok-tone: var(--ok-on-stage);
  --err-tone: var(--err-on-stage);
  color-scheme: dark;
}

[data-tone='stage-raised'] {
  --ground: var(--stage-1);
}

/* Plum: where a visitor asks a person. data-surface="plum" is a compatibility alias (WP6 removes). */
[data-tone='plum'],
[data-tone='plum-deep'],
[data-surface='plum'] {
  --ground: var(--surface-plum);
  --fg: var(--ink-on-plum);
  --body: var(--ink-on-plum-muted);
  --muted: var(--ink-on-plum-muted);
  --accent: var(--champagne);
  --eyebrow: var(--champagne);
  --numeral: var(--champagne);
  --rule: var(--rule-on-plum);
  --rule-strong: var(--rule-on-plum-strong);
  --link: var(--champagne);
  --link-hover: var(--ink-on-plum);
  --wipe: var(--champagne);
  --focus-ring: var(--focus-on-dark);
  --btn-bg: var(--bronze);
  --btn-fg: var(--stage-0);
  --btn-bg-hover: var(--champagne);
  --btn-fg-hover: var(--stage-0);
  --btn-line: var(--rule-on-plum-strong);
  --btn-line-fg: var(--ink-on-plum);
  --btn-wash: var(--wash-plum);
  --chip-line: var(--rule-on-plum-strong);
  --chip-on-bg: var(--champagne);
  --chip-on-fg: var(--plum-900);
  --field-bg: transparent;
  --field-line: var(--rule-on-plum-strong);
  --ok-tone: var(--ok-on-plum);
  --err-tone: var(--err-on-plum);
  color-scheme: dark;
}

[data-tone='plum-deep'] {
  --ground: var(--surface-plum-deep);
}

[data-tone],
[data-surface='plum'] {
  background-color: var(--ground);
  color: var(--body);
}

[data-tone^='stage'] ::selection,
[data-tone^='plum'] ::selection {
  background: var(--champagne);
  color: var(--stage-0);
}

/* The bronze seam between a stage section and a plum section (rule 1). */
.seam {
  border-block-start: 1px solid var(--rule-gold);
}

/* ============================== Type ============================== */
h1,
h2,
h3,
.display,
.h-band,
.h-hero {
  font-family: var(--ff-display);
  font-weight: var(--fw-display);
  font-variant-numeric: normal;
  color: var(--fg);
  text-wrap: balance;
  overflow-wrap: break-word;
}

h1 {
  font-size: var(--t-h1);
  line-height: var(--lh-heading);
  letter-spacing: var(--track-h1);
}

h2 {
  font-size: var(--t-h2);
  line-height: var(--lh-display);
  letter-spacing: var(--track-h2);
}

h3 {
  font-size: var(--t-h3);
  font-weight: var(--fw-display-small);
  line-height: 1.2;
}

h4 {
  font-family: var(--ff-text);
  font-size: var(--t-title);
  font-weight: var(--fw-text-strong);
  line-height: 1.35;
  color: var(--fg);
}

.display {
  font-size: var(--t-display);
  line-height: var(--lh-display);
  letter-spacing: var(--track-display);
}

.h-band {
  font-size: var(--t-band);
  line-height: 1.12;
  letter-spacing: var(--track-display);
}

.h-hero {
  font-size: var(--t-hero);
  line-height: 1.04;
  letter-spacing: var(--track-display);
}

/* One accent phrase per heading: true italic, coloured by the tone. */
:is(h1, h2, h3, .display, .h-band, .h-hero) em {
  font-style: italic;
  color: var(--accent);
}

p {
  text-wrap: pretty;
}

[data-tone^='stage'] p {
  line-height: var(--lh-text-stage);
}

.lead {
  font-size: var(--t-lead);
  line-height: 1.55;
  color: var(--body);
  max-inline-size: var(--measure);
}

.small {
  font-size: var(--t-small);
  line-height: 1.5;
  color: var(--muted);
}

.caption {
  font-size: var(--t-caption);
  line-height: 1.45;
  color: var(--muted);
}

.note {
  font-family: var(--ff-display);
  font-size: var(--t-note);
  font-style: italic;
  font-weight: var(--fw-display-small);
  line-height: 1.4;
  color: var(--muted);
}

/* Every rate, weight, fineness and count. */
.fig,
.tabular {
  font-variant-numeric: lining-nums tabular-nums;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--ff-text);
  font-size: var(--t-eyebrow);
  font-weight: var(--fw-text-strong);
  line-height: 1.3;
  letter-spacing: var(--track-eyebrow);
  text-transform: uppercase;
  color: var(--eyebrow);
}

.eyebrow .ornament {
  inline-size: 3rem;
  block-size: 0.5rem;
  flex: none;
  color: var(--wipe);
}

.nowrap {
  white-space: nowrap;
}

/* ============================== Links ============================== */
a {
  color: var(--link);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-decoration-color: var(--rule-strong);
  text-underline-offset: 0.18em;
  transition:
    color var(--dur-quick) var(--ease-out),
    text-decoration-color var(--dur-quick) var(--ease-out);
}

a:hover {
  color: var(--link-hover);
  text-decoration-color: currentColor;
}

.link-quiet {
  text-decoration: none;
}

.link-quiet:hover {
  text-decoration: underline;
  text-decoration-color: var(--wipe);
}

/*
 * The underline wipe: short, single-line links only (nav, "All jewellery", card actions,
 * mega-panel names). Prose links keep the ordinary underline above.
 */
.link-wipe {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-block-size: var(--tap-inline);
  color: var(--link);
  font-weight: var(--fw-text-strong);
  text-decoration: none;
}

.link-wipe::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  inset-block-end: 0.15em;
  block-size: 1px;
  background: var(--wipe);
  scale: 0 1;
  transform-origin: 0 50%;
  transition: scale var(--dur-slow) var(--ease-lux);
}

[dir='rtl'] .link-wipe::after {
  transform-origin: 100% 50%;
}

.link-wipe:is(:hover, :focus-visible)::after,
.link-wipe[aria-current]::after {
  scale: 1 1;
}

.link-wipe:hover {
  color: var(--link-hover);
}

/* ============================== Buttons ============================== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  min-block-size: var(--control-h);
  padding-inline: var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius);
  font-family: var(--ff-text);
  font-size: 0.9375rem;
  font-weight: var(--fw-text-strong);
  line-height: 1.15;
  letter-spacing: 0.01em;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background-color var(--dur-ui) var(--ease-out),
    color var(--dur-ui) var(--ease-out),
    border-color var(--dur-ui) var(--ease-out);
}

.btn .icon {
  inline-size: 1.125rem;
  block-size: 1.125rem;
}

/* Filled: plum on light grounds, bronze with stage ink on dark grounds (resolved by the tone). */
.btn--primary {
  background: var(--btn-bg);
  border-color: var(--btn-bg);
  color: var(--btn-fg);
}

.btn--primary:hover {
  background: var(--btn-bg-hover);
  border-color: var(--btn-bg-hover);
  color: var(--btn-fg-hover);
  text-decoration: none;
}

/* Outlined. */
.btn--secondary {
  background: transparent;
  border-color: var(--btn-line);
  color: var(--btn-line-fg);
}

.btn--secondary:hover {
  background: var(--btn-wash);
  color: var(--btn-line-fg);
  text-decoration: none;
}

/* Text: the underline wipe at button height. */
.btn--text {
  position: relative;
  min-block-size: var(--tap);
  padding-inline: 0;
  color: var(--link);
}

.btn--text::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  inset-block-end: 0.7rem;
  block-size: 1px;
  background: var(--wipe);
  scale: 0 1;
  transform-origin: 0 50%;
  transition: scale var(--dur-slow) var(--ease-lux);
}

.btn--text:is(:hover, :focus-visible)::after {
  scale: 1 1;
}

.btn--compact {
  min-block-size: var(--tap);
  padding-inline: var(--space-4);
  font-size: var(--t-small);
}

.btn--block {
  inline-size: 100%;
}

.btn[aria-disabled='true'],
.btn:disabled {
  background: transparent;
  border-color: var(--rule);
  color: var(--muted);
  cursor: not-allowed;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

@media (max-width: 39.99em) {
  .actions--pair > .btn {
    flex: 1 1 0;
    padding-inline: var(--space-3);
  }
}

/* ============================== Fields and chips ============================== */
.field {
  display: grid;
  align-content: start;
  gap: var(--space-2);
}

.field__label {
  font-size: var(--t-small);
  font-weight: var(--fw-text-strong);
  color: var(--fg);
}

.field__hint {
  font-size: var(--t-small);
  color: var(--muted);
}

.field__error {
  font-size: var(--t-small);
  color: var(--err-tone);
}

.field__input {
  inline-size: 100%;
  min-block-size: var(--control-h);
  padding-inline: var(--space-4);
  padding-block: var(--space-2);
  background: var(--field-bg);
  border: 1px solid var(--field-line);
  border-radius: var(--radius);
  color: var(--fg);
}

textarea.field__input {
  min-block-size: 9rem;
  resize: vertical;
}

/* Underline-only fields: plum forms and the estimator (the store's personalisation style). */
.field--line .field__input {
  padding-inline: 0;
  background: transparent;
  border: 0;
  border-block-end: 1px solid var(--field-line);
}

.field__input:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 0;
  border-color: var(--focus-ring);
}

.field__input[aria-invalid='true'] {
  border-color: var(--err-tone);
}

/* Segmented radio chips (karats, contact method). The input stays focusable and labelled. */
.chips {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  border: 1px solid var(--chip-line);
}

.chip {
  position: relative;
  display: grid;
  place-items: center;
  gap: var(--space-1);
  min-block-size: var(--control-h);
  padding: var(--space-2) var(--space-3);
  color: var(--fg);
  cursor: pointer;
  transition:
    background-color var(--dur-quick) var(--ease-out),
    color var(--dur-quick) var(--ease-out);
}

.chip + .chip {
  border-inline-start: 1px solid var(--chip-line);
}

.chip input {
  position: absolute;
  inset: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}

.chip:has(input:checked) {
  background: var(--chip-on-bg);
  color: var(--chip-on-fg);
}

.chip:has(input:focus-visible) {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
  z-index: var(--z-raised);
}

/* ============================== Layout ============================== */
/* The track: named lines for content (1280), wide (1536) and bleed (edge to edge). */
.track {
  display: grid;
  grid-template-columns:
    [bleed-start] minmax(var(--gutter), 1fr)
    [wide-start] minmax(0, calc((var(--container-wide) - var(--container)) / 2))
    [content-start] min(100% - 2 * var(--gutter), var(--container))
    [content-end] minmax(0, calc((var(--container-wide) - var(--container)) / 2))
    [wide-end] minmax(var(--gutter), 1fr) [bleed-end];
}

.track > * {
  grid-column: content;
  min-inline-size: 0;
}

.track[data-width='wide'] > *,
.track > .wide {
  grid-column: wide;
}

.track[data-width='narrow'] > * {
  grid-column: content;
  justify-self: center;
  inline-size: min(100%, var(--container-narrow));
}

.track > .bleed {
  grid-column: bleed;
}

/* Legacy containers stay for pages that have not migrated yet. */
.container {
  inline-size: 100%;
  max-inline-size: var(--container);
  margin-inline: auto;
  padding-inline: var(--gutter);
}

.container--wide {
  max-inline-size: var(--container-wide);
}

.grid-12 {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: var(--grid-gap);
}

@media (min-width: 40em) {
  .grid-12 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

@media (min-width: 64em) {
  .grid-12 {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
}

.split {
  display: grid;
  gap: var(--grid-gap);
  align-items: start;
}

@media (min-width: 64em) {
  .split {
    grid-template-columns: 5fr 7fr;
    column-gap: calc(var(--grid-gap) * 2);
  }

  .split--7-5 {
    grid-template-columns: 7fr 5fr;
  }

  .split--even {
    grid-template-columns: 1fr 1fr;
  }

  .split--5-6 {
    grid-template-columns: 5fr 6fr;
  }
}

/* Sections: Section.astro emits these. */
.sec {
  position: relative;
}

.sec--section {
  padding-block: var(--section-y);
}

.sec--band {
  padding-block: var(--band-y) calc(var(--band-y) * 0.8);
}

.sec--slim {
  padding-block: var(--slim-y);
}

.sec--ruled {
  border-block-start: 1px solid var(--rule);
}

/* Legacy section classes (WP6 removes). */
.section {
  padding-block: var(--section-y);
}

.section--ruled {
  border-block-start: 1px solid var(--rule);
}

/* ============================== The stage image ============================== */
/*
 * StageImage.astro emits <figure class="stage-img" data-mask data-light style="--cap:420px">.
 * Never drawn wider than --cap (≤ source width). overflow: clip, never hidden, so view()
 * timelines keep working. The figure's box is fixed by aspect-ratio: CLS 0 before load.
 */
.stage-img {
  position: relative;
  inline-size: min(100%, var(--cap, var(--cap-velvet)));
  aspect-ratio: var(--ar, 1);
  margin: 0;
  margin-inline: auto;
  background: var(--stage, transparent);
  overflow: clip;
}

.stage-img picture {
  display: block;
  block-size: 100%;
}

.stage-img img {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  mask-image: var(--mask, none);
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
}

.stage-img[data-mask='spot'] {
  --mask: var(--mask-spot);
}

.stage-img[data-mask='pool'] {
  --mask: var(--mask-pool);
}

.stage-img[data-mask='edge'] img {
  mask-image: var(--mask-edge);
  mask-composite: intersect;
}

/* ============================== Rails ============================== */
/* Horizontal snap rails on phones (occasions, collection cards). Buttons come from motion.ts. */
.rail {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: var(--rail-card, 74%);
  gap: var(--grid-gap);
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scroll-snap-type: inline mandatory;
  scroll-padding-inline: var(--gutter);
  padding-inline: var(--gutter);
  scrollbar-width: none;
}

.rail::-webkit-scrollbar {
  display: none;
}

.rail > * {
  scroll-snap-align: start;
}

.rail__progress {
  position: relative;
  block-size: 1px;
  margin-inline: var(--gutter);
  margin-block-start: var(--space-5);
  background: var(--rule);
}

.rail__progress::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--wipe);
  scale: 0.25 1;
  transform-origin: 0 50%;
}

/* ============================== Top-layer sheets ============================== */
/* Popovers and dialogs (mega panel, rate popover, drawer). Entry only; never on hero content. */
.sheet {
  transition:
    opacity var(--dur-enter) var(--ease-out),
    translate var(--dur-enter) var(--ease-out),
    display var(--dur-enter) allow-discrete,
    overlay var(--dur-enter) allow-discrete;
}

.sheet:not(:popover-open, [open]) {
  opacity: 0;
  translate: 0 -0.5rem;
}

@starting-style {
  .sheet:is(:popover-open, [open]) {
    opacity: 0;
    translate: 0 -0.5rem;
  }
}

.sheet--side:not(:popover-open, [open]) {
  translate: 2rem 0;
}

@starting-style {
  .sheet--side:is(:popover-open, [open]) {
    translate: 2rem 0;
  }
}

/* Only modal dialogs dim the page; popovers (mega panel, rate board) leave it lit. */
dialog.sheet::backdrop {
  background: var(--scrim-stage);
}

/* ============================== Rate figures ============================== */
/*
 * The karat follower: RateFigure karat="follow" prints one span per karat; the visitor's
 * chosen karat (html[data-karat], set by karat.ts) decides which shows. 22K without JS.
 */
.kv {
  display: none;
}

:root:not([data-karat]) .kv[data-k='22k'],
:root[data-karat='24k'] .kv[data-k='24k'],
:root[data-karat='22k'] .kv[data-k='22k'],
:root[data-karat='21k'] .kv[data-k='21k'],
:root[data-karat='18k'] .kv[data-k='18k'] {
  display: inline;
}

/* The live marker: a square turned 45°, never a dot. Hollow when the rate is stale. */
.marker {
  display: inline-block;
  inline-size: 0.4375rem;
  block-size: 0.4375rem;
  background: var(--bronze);
  rotate: 45deg;
  flex: none;
}

.marker[data-stale] {
  background: transparent;
  outline: 1px solid var(--bronze);
  outline-offset: -1px;
}

/* The digit roll (rate.ts builds these only on a real change, never under reduced motion). */
.roll-d {
  position: relative;
  display: inline-block;
  overflow: clip;
  vertical-align: top;
  mask-image: var(--mask-digit);
}

.roll-d__ghost {
  visibility: hidden;
}

.roll-d__reel {
  position: absolute;
  inset: 0 0 auto;
  display: flex;
  flex-direction: column;
  animation: roll-up var(--dur-roll) var(--ease-out) var(--delay, 0ms) both;
}

.roll-d__reel > span {
  display: block;
  block-size: 1lh;
}

.roll-d__reel[data-dir='down'] {
  animation-name: roll-down;
}

@keyframes roll-up {
  from {
    translate: 0 0;
  }
  to {
    translate: 0 -50%;
  }
}

@keyframes roll-down {
  from {
    translate: 0 -50%;
  }
  to {
    translate: 0 0;
  }
}

/* The sheen: one champagne glint along the rate rule, 600 ms after load, and again on a change. */
.sheen-rule {
  position: relative;
  block-size: 1px;
  background: var(--rule-strong);
  overflow: clip;
}

.sheen-rule::after {
  content: '';
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: 34%;
  background: var(--champagne);
  mask-image: var(--mask-sheen);
  opacity: 0;
  translate: -100% 0;
}

/* ============================== Scroll-driven and decorative motion ============================== */
@media (prefers-reduced-motion: no-preference) {
  .sheen-rule::after {
    animation: sheen var(--dur-sheen) var(--ease-in-out) 600ms 1 both;
  }

  .sheen-rule[data-sheen='again']::after {
    animation-name: sheen-again;
    animation-delay: 0ms;
  }

  @supports (animation-timeline: view()) {
    /* Section heads, cards, doors: rise 24 px. Never on first-viewport content. */
    .reveal {
      animation: reveal-rise linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 45%;
    }

    /* The hero piece recedes as you leave it (exit only: LCP untouched). */
    .recede {
      animation: recede linear both;
      animation-timeline: view();
      animation-range: exit 0% exit 100%;
    }

    /* A case light comes on: fully lit by a quarter of the way into view. Opacity only. */
    .stage-img[data-light='scroll'] img {
      animation: light-on linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 25%;
    }

    /* Hairlines that draw (route, styles line, stamp bars). Set transform-origin per use. */
    .draw-x {
      animation: grow-x linear both;
      animation-timeline: view();
      animation-range: entry 40% cover 40%;
    }

    .draw-y {
      animation: grow-y linear both;
      animation-timeline: view();
      animation-range: entry 20% cover 45%;
    }

    /* Rail progress hairline: the rail's own inline scroll. */
    .rail-wrap {
      timeline-scope: --rail;
    }

    .rail-wrap .rail {
      scroll-timeline: --rail inline;
    }

    .rail-wrap .rail__progress::after {
      animation: rail-progress linear both;
      animation-timeline: --rail;
    }
  }

  /* FAQ and hours accordions open smoothly where supported; elsewhere they snap. */
  :root {
    interpolate-size: allow-keywords;
  }

  details::details-content {
    block-size: 0;
    overflow-y: clip;
    transition:
      block-size var(--dur-ui) var(--ease-out),
      content-visibility var(--dur-ui) allow-discrete;
  }

  details[open]::details-content {
    block-size: auto;
  }

  /* Cross-document page transitions (Chrome 126+, Safari 18.2+). Names: hdr, bar, piece. */
  @view-transition {
    navigation: auto;
  }

  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: var(--dur-page);
    animation-timing-function: var(--ease-out);
  }

  ::view-transition-group(piece) {
    animation-duration: var(--dur-morph);
    animation-timing-function: var(--ease-out);
  }
}

@keyframes reveal-rise {
  from {
    opacity: 0;
    translate: 0 1.5rem;
  }
}

@keyframes recede {
  to {
    scale: 0.94;
    opacity: 0.35;
  }
}

@keyframes light-on {
  from {
    opacity: 0.45;
  }
}

@keyframes grow-x {
  from {
    scale: 0 1;
  }
}

@keyframes grow-y {
  from {
    scale: 1 0;
  }
}

/* Explicit end: the progress hairline's resting scale is 0.25, so it needs a stated "to". */
@keyframes rail-progress {
  from {
    scale: 0.06 1;
  }
  to {
    scale: 1 1;
  }
}

@keyframes sheen {
  0% {
    translate: -100% 0;
    opacity: 0;
  }
  12%,
  80% {
    opacity: 1;
  }
  100% {
    translate: 300% 0;
    opacity: 0;
  }
}

@keyframes sheen-again {
  0% {
    translate: -100% 0;
    opacity: 0;
  }
  12%,
  80% {
    opacity: 1;
  }
  100% {
    translate: 300% 0;
    opacity: 0;
  }
}

/* Images that load after motion.ts runs fade in over 600 ms (motion.ts sets the attribute). */
img[data-fade='wait'] {
  opacity: 0;
}

img[data-fade='in'] {
  opacity: 1;
  transition: opacity var(--dur-slow) var(--ease-lux);
}

/* ============================== Focus ============================== */
:focus-visible {
  outline: 2px solid var(--focus-ring, var(--focus));
  outline-offset: 3px;
}

/* ============================== Icons ============================== */
.icon {
  display: inline-block;
  flex: none;
  inline-size: 1.25em;
  block-size: 1.25em;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.25;
  stroke-linecap: round;
  stroke-linejoin: round;
  vertical-align: -0.25em;
}

/* ============================== Prose and lists ============================== */
.prose {
  max-inline-size: var(--prose);
  color: var(--body);
}

.prose > * + * {
  margin-block-start: var(--space-4);
}

.prose > :first-child {
  margin-block-start: 0;
}

.prose > h2 {
  margin-block-start: var(--space-8);
  font-size: var(--t-h3);
  font-weight: var(--fw-display-small);
}

.prose > h3 {
  margin-block-start: var(--space-6);
  font-family: var(--ff-text);
  font-size: var(--t-title);
  font-weight: var(--fw-text-strong);
}

.prose ul,
.prose ol {
  padding-inline-start: 1.25em;
}

.prose li + li {
  margin-block-start: var(--space-2);
}

.prose table {
  font-size: var(--t-small);
  border-block: 1px solid var(--rule-strong);
}

.prose th,
.prose td {
  padding-block: var(--space-2);
  padding-inline: var(--space-3);
  text-align: start;
  border-block-end: 1px solid var(--rule);
}

.prose th {
  background: var(--surface-2);
  font-weight: var(--fw-text-strong);
}

.prose td {
  font-variant-numeric: lining-nums tabular-nums;
}

.prose blockquote {
  padding-inline-start: var(--space-5);
  border-inline-start: 1px solid var(--rule-gold);
  font-family: var(--ff-display);
  font-size: var(--t-note);
  font-style: italic;
  color: var(--body);
}

/* Hairline-divided rows used by ledgers, spec lists, FAQs and footers. */
.rows > * {
  border-block-start: 1px solid var(--rule);
}

.rows > :last-child {
  border-block-end: 1px solid var(--rule);
}

/* Links in running lists (footer, breadcrumbs, quiet rows) get a 24 px target. */
.list-links a {
  display: inline-block;
  min-block-size: var(--tap-inline);
  padding-block: 0.125rem;
}

/* ============================== Utilities ============================== */
.sr-only {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 47.99em) {
  .from-md {
    display: none !important;
  }
}

@media (max-width: 63.99em) {
  .from-lg {
    display: none !important;
  }
}

@media (min-width: 64em) {
  .until-lg {
    display: none !important;
  }
}

/* Legacy tray (TrayGrid). WP6 removes it with the component. */
.tray {
  display: grid;
  gap: 1px;
  padding: 1px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.tray > * {
  background: var(--surface-0);
  outline: 1px solid var(--rule-1);
  min-inline-size: 0;
}

@media (min-width: 40em) {
  .tray {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 64em) {
  .tray {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* ============================== Forced colours and print ============================== */
@media (forced-colors: active) {
  .btn,
  .chip,
  .chips {
    border: 1px solid ButtonText;
  }

  .marker {
    background: CanvasText;
  }
}

@media print {
  [data-tone],
  [data-surface='plum'],
  body,
  body[data-ground='stage'] {
    --fg: #000;
    --body: #000;
    --muted: #000;
    --accent: #000;
    --eyebrow: #000;
    --numeral: #000;
    background: #fff !important;
    color: #000 !important;
  }

  .no-print {
    display: none !important;
  }
}
```

The print block is the one place raw `#000` and `#fff` are allowed (paper is not themed).

### 3.3 Section tones in use

| Tone           | Ground                | Used for                                                                                                           | Rule                                                                 |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `stage`        | `--stage-0`           | Home hero, cases, branches; piece opener; jewellery, velvet category and collection openers; gold-rate opener; 404 | Velvet photos live here                                              |
| `stage-raised` | `--stage-1`           | The second of two consecutive dark sections (styles line, record table); mega panel, drawer, phone bar             | A tonal step between dark rooms                                      |
| `ivory`        | `--surface-1`         | Breath bands, stamps, occasions, the piece ticket, reading pages, studio-cut-out grids                             | Pale cut-outs and portraits                                          |
| `parchment`    | `--surface-2`         | "What to bring", the record table on day pages, FAQ answers                                                        | At most one per page                                                 |
| `white`        | `--surface-0`         | Forms on ivory pages                                                                                               | Rare                                                                 |
| `plum`         | `--surface-plum`      | Estimator band, campaign line, enquiry bands, visit form                                                           | Never adjacent to a velvet photo; 1 px bronze seam against the stage |
| `plum-deep`    | `--surface-plum-deep` | Footer, estimator panel inside a plum band                                                                         |                                                                      |

**Pacing rules.** Never three dark sections in a row; two in a row must be `stage` then `stage-raised` (or the reverse) and must differ in module family. An ivory, parchment or plum band at least every 1.5 desktop screens. No module type twice in a row.

### 3.4 Headings and the eyebrow

- `SectionHead` (§5.2) is the only way a section opens with a heading. It has three shapes: `split` (title left, lead and aside right, on the 12-column grid), `stack` (eyebrow, title, lead in one column) and `centre` (centred, for bands and the styles line). Pages vary the shape (§8.3).
- The eyebrow is optional, 12 px Plex 500 uppercase in `--eyebrow`, with the `Ornament` (a 48 px bronze hairline with a small arch) only at major section starts (at most three per page).
- One `<em>` accent per heading at most. Headings name a thing; only sentence bands end in a full stop.

### 3.5 Buttons

| Variant     | Light ground                                      | Dark ground (stage, plum, plum-deep)                    |
| ----------- | ------------------------------------------------- | ------------------------------------------------------- |
| `primary`   | Plum fill, ivory text; hover plum-900             | Bronze fill, stage ink; hover champagne                 |
| `secondary` | 1 px plum outline, plum text; hover plum-050 wash | 1 px strong rule outline, ivory text; hover wash        |
| `text`      | Plum text, bronze wipe                            | Champagne text, bronze (stage) or champagne (plum) wipe |

48 px tall (44 px `compact`), square, sentence case, 15 px Plex 500, an icon at 18 px when it helps (WhatsApp, phone, map pin). No shine, no padding growth, no transform. One filled button per group; a group is at most two buttons and one text link.

### 3.6 The stage image

`StageImage` (§5.2) is the only way a velvet photograph appears. It renders `<figure class="stage-img">` with a `<Picture formats={['avif','webp']}>`, widths filtered to the source, `--cap` at most the source width, `aspect-ratio` from the image, `overflow: clip`, and one of three masks:

| Mask             | Value                                                   | Use                                                                        |
| ---------------- | ------------------------------------------------------- | -------------------------------------------------------------------------- |
| `spot` (default) | `radial-gradient(closest-side, #000 52%, transparent)`  | Cases, hero, previews: an object floating in a pool of light, no rectangle |
| `pool`           | `… #000 60% …`                                          | The piece page and collection openers: a wider pool for one large photo    |
| `edge`           | 14 % / 12 % linear feather, `mask-composite: intersect` | Future reshoots composed edge to edge                                      |

The figure's background is `var(--stage, transparent)`: transparent inside a stage section (the section ground shows), or the photo's sampled colour when the page passes `stage` (a piece shown alone). Masks are never animated. At most eight masked images in a viewport.

### 3.7 Rails, sheets and accordions

- **Rails** (`.rail`, `.rail-wrap`, `.rail__progress`): phones only, cards at 74 % (occasions) or 44 % (cut-outs), the next card peeking, a bronze progress hairline driven by the rail's own `scroll-timeline` (static at 25 % where unsupported), previous and next buttons added by `motion.ts`.
- **Sheets** (`.sheet`, `.sheet--side`): every popover and dialog. Entry is opacity and an 8 px drop (or a 32 px slide for the drawer) over 320 ms with `@starting-style`; exit animates in Chromium and snaps elsewhere.
- **Accordions** (`details`): exclusive with `<details name>`; the content height animates where `interpolate-size` exists and snaps elsewhere.

### 3.8 Motion policy

| Effect              | Where                                                                                   | Mechanism                                   | Range or duration                                | Static state                         |
| ------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------ | ------------------------------------ |
| Reveal (rise 24 px) | Section heads, cards, doors, windows (never the hero, never body copy over three lines) | `.reveal`, `view()`                         | `entry 0% entry 45%`                             | Visible                              |
| Case light          | `StageImage light="scroll"` in walls                                                    | Opacity 0.45 → 1 on the single masked image | `entry 0% cover 25%`                             | Lit                                  |
| Recede              | Home hero piece                                                                         | `.recede`                                   | `exit 0% exit 100%`                              | Full size                            |
| Draw                | Styles line, route, stamp bars                                                          | `.draw-x` / `.draw-y` (`scale`)             | `entry 40% cover 40%`                            | Drawn                                |
| Rail progress       | Phone rails                                                                             | `scroll-timeline`                           | Scroll position                                  | 25 %                                 |
| Sheen               | The rate rule                                                                           | One masked strip, `translate`               | 1.8 s, 600 ms after load; again on a real change | No sheen                             |
| Digit roll          | Rate figures marked `data-roll`                                                         | `rate.ts` builds reels                      | 640 ms + 55 ms per digit                         | Text swaps                           |
| Karat crossfade     | `RateInstrument` numerals                                                               | Opacity and 0.12 em rise, CSS only          | 600 ms                                           | Swap                                 |
| Image fade          | Lazy images not yet loaded when `motion.ts` runs                                        | `data-fade`                                 | 600 ms                                           | Visible                              |
| Underline wipe      | `.link-wipe`, `.btn--text`, nav                                                         | `scale` on a 1 px pseudo-element            | 600 ms                                           | No underline (colour shows the link) |
| Sheets              | Popovers, dialogs                                                                       | `@starting-style`                           | 320 ms                                           | Instant                              |
| Page transition     | Every navigation                                                                        | `@view-transition`                          | 240 ms root, 320 ms piece morph                  | Normal navigation                    |

**Limits.** At most eight scroll-animated elements in view at once (animate the wrapper, not each child). Only `opacity`, `translate`, `scale` and `stroke-dashoffset` (sparkline, once). Nothing loops. Nothing advances by itself. No parallax. No `@starting-style`, reveal or opacity below 1 on anything in the first viewport at 390 × 844 or 1440 × 900. `overflow: clip`, never `hidden`, on any ancestor of a `view()`-animated element. Declare `animation-timeline` after the `animation` shorthand.

**View transitions.** Three names per page at most: `hdr` (the header element itself), `bar` (the phone bar) and `piece` (the piece page's stage figure; on listing pages `piece-morph.ts` names only the clicked card's figure, on `pageswap`, and clears it on `pageshow`). No `backdrop-filter` anywhere (it was the cause of the see-through header). Prerendering comes from the `Speculation-Rules` header (WP0).

**Reduced motion.** Every duration token is 0 ms; every scroll-driven rule, the sheen, `@view-transition` and the accordion transition sit inside `no-preference`; `rate.ts` and `estimator.ts` check `matchMedia('(prefers-reduced-motion: reduce)')` and swap text instead of building reels. The reduced page is the finished design.

**Writing a scroll-driven animation (WP6).** Pair the `animation` shorthand with `animation-timeline: var(--tl-view)` or `var(--tl-scroll)` (tokens.css), never with a literal `view()` or `scroll(root)`: the CSS minifier folds a literal timeline into the `animation` shorthand, no browser parses the result, and the effect silently dies in the build while working in dev (every scroll effect of WP0 to WP5 shipped dead until the WP6 audit of `dist/`). Named timelines (`--sline`, `--btb`, `--rail`) are safe. `npm run audit` fails a build that contains a folded shorthand.

### 3.9 Focus

2 px ring, 3 px offset, `--focus-ring`: plum on light grounds, champagne on dark grounds. Fields use offset 0. Chips ring the label when their hidden input has focus. Every hover state has a `:focus-visible` twin. Every popover invoker mirrors `aria-expanded`.

---

## 4. Fonts

### 4.1 Faces, files and budget

| Face                       | Role                                  | Weights used | File (after subsetting)                                 | Preload                    |
| -------------------------- | ------------------------------------- | ------------ | ------------------------------------------------------- | -------------------------- |
| Cormorant Garamond, roman  | Display, numerals                     | 300, 400     | `src/assets/fonts/cormorant-garamond-wght-normal.woff2` | **Yes** (the only preload) |
| Cormorant Garamond, italic | Accent phrases, case and window names | 300, 400     | `src/assets/fonts/cormorant-garamond-wght-italic.woff2` | No                         |
| IBM Plex Sans, roman       | Text and interface                    | 400, 500     | `src/assets/fonts/ibm-plex-sans-wght-normal.woff2`      | No                         |

Budget: the three files together **at most 90 KB**. Fontsource ships them at 37.6 + 39.3 + 45.7 = 122.6 KB; subsetting to the glyphs below brings them inside. All three get Astro's metric-matched fallbacks, so nothing shifts on swap.

**Fallback rule.** If the subset set exceeds 90 KB, or a Lighthouse trace shows the italic file delaying LCP, the home H1's accent phrase is set in roman `--accent` colour (the only first-viewport italic) and the italic loads later with the rest of the page.

### 4.2 `scripts/subset-fonts.mjs` (new, WP0)

Run with `npm run fonts:subset` after a font package update. Stop the dev server first (it locks files under `src/assets/`). Commit the output.

```js
// scripts/subset-fonts.mjs
// Subsets the self-hosted variable fonts to the glyphs the site uses and writes them to
// src/assets/fonts/. Keeps the full weight axis. Run after updating a @fontsource-variable package.
import { mkdir, readFile, writeFile } from 'node:fs/promises';

import subsetFont from 'subset-font';

const GLYPHS = [
  ' !"#$%&\'()*+,-./0123456789:;<=>?@',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
  ' ©®·×éü–‘’“”…≈',
].join('');

const FILES = [
  [
    '@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2',
    'cormorant-garamond-wght-normal.woff2',
  ],
  [
    '@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-italic.woff2',
    'cormorant-garamond-wght-italic.woff2',
  ],
  [
    '@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2',
    'ibm-plex-sans-wght-normal.woff2',
  ],
];

const out = new URL('../src/assets/fonts/', import.meta.url);
await mkdir(out, { recursive: true });
let total = 0;
for (const [src, name] of FILES) {
  const input = await readFile(new URL(`../node_modules/${src}`, import.meta.url));
  const subset = await subsetFont(input, GLYPHS, { targetFormat: 'woff2' });
  await writeFile(new URL(name, out), subset);
  total += subset.length;
  console.log(
    `${name}: ${(input.length / 1024).toFixed(1)} KB -> ${(subset.length / 1024).toFixed(1)} KB`,
  );
}
console.log(`total ${(total / 1024).toFixed(1)} KB (budget 90 KB)`);
if (total > 90 * 1024) process.exitCode = 1;
```

`package.json`: add `"subset-font"` to `devDependencies` pinned to an exact version (no caret), and `"fonts:subset": "node scripts/subset-fonts.mjs"` to `scripts`. If the installed `subset-font` supports `variationAxes` ranges, narrow Cormorant to `wght` 300 to 500 and Plex to 400 to 600 for a further saving; otherwise keep the full axis.

### 4.3 `astro.config.mjs` (replace the `fonts` array)

```js
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-display',
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/cormorant-garamond-wght-normal.woff2'],
            weight: '300 700',
            style: 'normal',
          },
          {
            // True italic for accent phrases and names (owner's choice of face, 13 October).
            src: ['./src/assets/fonts/cormorant-garamond-wght-italic.woff2'],
            weight: '300 700',
            style: 'italic',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-text',
      fallbacks: ['Arial', 'Helvetica', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/ibm-plex-sans-wght-normal.woff2'],
            weight: '100 700',
            style: 'normal',
          },
        ],
      },
    },
  ],
```

Also in `astro.config.mjs` (WP0): keep AVIF at q55 unless a side-by-side of the p05 and p07 corners shows banding, in which case set `avif: { quality: 60, effort: 4 }`; add `smartSubsample: true` to the WebP options. Record the result in the WP0 notes.

### 4.4 `BaseLayout.astro` font tags

```astro
<Font cssVariable="--font-display" preload={[{ style: 'normal' }]} />
<Font cssVariable="--font-text" />
```

Astro 7.3's `filterPreloads` matches `style`, so this preloads only the Cormorant roman file. The italic and Plex load on demand with their fallbacks.

---

## 5. Components

### 5.1 Inventory

**Owner** is the work package that writes the file (§9). **Consumers** may import it but never edit it. WP0 creates every shared file, either complete or as a **contract stub** (final `Props` interface, minimal valid markup that renders the real data unstyled), so later packages build against fixed interfaces. A package that needs an interface change asks the lead; it never edits a file it does not own.

| Component                                                                                                         | File                                            | Status                                                     | Owner | Consumers       |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------- | ----- | --------------- |
| `BaseLayout`                                                                                                      | `src/layouts/BaseLayout.astro`                  | Changed                                                    | WP0   | Every page      |
| `Section`                                                                                                         | `src/components/ui/Section.astro`               | New                                                        | WP0   | All             |
| `SectionHead`                                                                                                     | `src/components/ui/SectionHead.astro`           | Changed                                                    | WP0   | All             |
| `PageHead`                                                                                                        | `src/components/ui/PageHead.astro`              | New (replaces `Hero` on inner pages)                       | WP0   | WP3, WP4, WP5   |
| `Eyebrow`                                                                                                         | `src/components/ui/Eyebrow.astro`               | Changed                                                    | WP0   | All             |
| `Ornament`                                                                                                        | `src/components/ui/Ornament.astro`              | New                                                        | WP0   | All             |
| `Button`                                                                                                          | `src/components/ui/Button.astro`                | Changed                                                    | WP0   | All             |
| `MoreLink`                                                                                                        | `src/components/ui/MoreLink.astro`              | New                                                        | WP0   | All             |
| `StageImage`                                                                                                      | `src/components/ui/StageImage.astro`            | New                                                        | WP0   | All             |
| `Plate`                                                                                                           | `src/components/ui/Plate.astro`                 | Changed                                                    | WP0   | WP3, WP5        |
| `TypesetPlate`                                                                                                    | `src/components/ui/TypesetPlate.astro`          | New                                                        | WP0   | WP1, WP3        |
| `Panorama`                                                                                                        | `src/components/ui/Panorama.astro`              | New                                                        | WP0   | WP2, WP5        |
| `GroupLockup`                                                                                                     | `src/components/ui/GroupLockup.astro`           | New                                                        | WP0   | WP1, WP2, WP5   |
| `RateFigure`                                                                                                      | `src/components/ui/RateFigure.astro`            | New                                                        | WP0   | All             |
| `Breadcrumbs`                                                                                                     | `src/components/ui/Breadcrumbs.astro`           | Changed                                                    | WP0   | All inner pages |
| `Icon`, `IconSprite`                                                                                              | `src/components/ui/`                            | Changed                                                    | WP0   | All             |
| `Logo`                                                                                                            | `src/components/ui/Logo.astro`                  | Unchanged                                                  | WP0   | WP1             |
| `OneLineBand`                                                                                                     | `src/components/sections/OneLineBand.astro`     | New                                                        | WP0   | WP2, WP5        |
| `EnquiryBand`                                                                                                     | `src/components/sections/EnquiryBand.astro`     | New (replaces `PlumBand` and page-foot `EnquiryBlock`)     | WP0   | WP3, WP4, WP5   |
| `CampaignLine`                                                                                                    | `src/components/sections/CampaignLine.astro`    | New                                                        | WP0   | WP2, WP5        |
| `QuoteLines`                                                                                                      | `src/components/sections/QuoteLines.astro`      | New                                                        | WP0   | WP3, WP4        |
| `StepStrip`                                                                                                       | `src/components/sections/StepStrip.astro`       | New                                                        | WP0   | WP4, WP5        |
| `OccasionWindow`                                                                                                  | `src/components/sections/OccasionWindow.astro`  | New (replaces `OccasionFeature`)                           | WP0   | WP2, WP5        |
| `SiteHeader`                                                                                                      | `src/components/layout/SiteHeader.astro`        | Changed                                                    | WP1   | BaseLayout      |
| `RateChip`                                                                                                        | `src/components/layout/RateChip.astro`          | New                                                        | WP1   | SiteHeader      |
| `MegaPanel`                                                                                                       | `src/components/layout/MegaPanel.astro`         | New                                                        | WP1   | SiteHeader      |
| `MobileDrawer`                                                                                                    | `src/components/layout/MobileDrawer.astro`      | New                                                        | WP1   | SiteHeader      |
| `MobileActionBar`                                                                                                 | `src/components/layout/MobileActionBar.astro`   | Changed                                                    | WP1   | BaseLayout      |
| `Footer`                                                                                                          | `src/components/layout/Footer.astro`            | Changed                                                    | WP1   | BaseLayout      |
| `UtilityStrip`                                                                                                    | `src/components/layout/UtilityStrip.astro`      | **Retired** (WP1 deletes)                                  | WP1   | None            |
| `HomeHero`                                                                                                        | `src/components/home/HomeHero.astro`            | New                                                        | WP2   | Home            |
| `FactStrip`                                                                                                       | `src/components/home/FactStrip.astro`           | New (replaces `ProofStrip`)                                | WP2   | Home            |
| `ProductCard`                                                                                                     | `src/components/sections/ProductCard.astro`     | Changed (stub props in WP0)                                | WP3   | WP2, WP5        |
| `CaseWall`                                                                                                        | `src/components/sections/CaseWall.astro`        | New (stub in WP0; replaces `TrayGrid`)                     | WP3   | WP2, WP5        |
| `PlateGrid`                                                                                                       | `src/components/sections/PlateGrid.astro`       | New (stub in WP0)                                          | WP3   | WP5             |
| `StylesLine`                                                                                                      | `src/components/sections/StylesLine.astro`      | New (stub in WP0)                                          | WP3   | WP2             |
| `CategoryPlate`                                                                                                   | `src/components/sections/CategoryPlate.astro`   | New (replaces `CategoryTile`)                              | WP3   | WP3             |
| `PieceStage`                                                                                                      | `src/components/sections/PieceStage.astro`      | New (replaces `ProductGallery`)                            | WP3   | WP3             |
| `PieceTicket`                                                                                                     | `src/components/sections/PieceTicket.astro`     | New (replaces `EnquiryBlock` on pieces)                    | WP3   | WP3             |
| `SpecTable`                                                                                                       | `src/components/sections/SpecTable.astro`       | Changed                                                    | WP3   | WP3             |
| `Filters`                                                                                                         | `src/components/sections/Filters.astro`         | Changed                                                    | WP3   | WP3             |
| `RateInstrument`                                                                                                  | `src/components/sections/RateInstrument.astro`  | New (stub in WP0)                                          | WP4   | WP2, WP5        |
| `KaratStamps`                                                                                                     | `src/components/sections/KaratStamps.astro`     | New (stub in WP0)                                          | WP4   | WP2             |
| `Estimator`                                                                                                       | `src/components/sections/Estimator.astro`       | New (stub in WP0)                                          | WP4   | WP2, WP3        |
| `RateRecord`                                                                                                      | `src/components/sections/RateRecord.astro`      | New                                                        | WP4   | WP4             |
| `RateBoard`                                                                                                       | `src/components/sections/RateBoard.astro`       | Changed (history table only)                               | WP4   | WP4             |
| `BranchDoors`                                                                                                     | `src/components/sections/BranchDoors.astro`     | New (stub in WP0; wraps `StoreCard`)                       | WP5   | WP2, WP4        |
| `StoreCard`                                                                                                       | `src/components/sections/StoreCard.astro`       | Changed (door)                                             | WP5   | WP5             |
| `ContactForm`                                                                                                     | `src/components/sections/ContactForm.astro`     | Changed (four steps)                                       | WP5   | WP5             |
| `Faq`                                                                                                             | `src/components/sections/Faq.astro`             | Changed (interface unchanged)                              | WP5   | WP3, WP4        |
| `AssuranceLedger`                                                                                                 | `src/components/sections/AssuranceLedger.astro` | Changed (interface unchanged)                              | WP5   | WP3             |
| `JournalCard`                                                                                                     | `src/components/sections/JournalCard.astro`     | Changed                                                    | WP5   | WP5             |
| `BarToBangle`                                                                                                     | `src/components/sections/BarToBangle.astro`     | New                                                        | WP5   | WP5             |
| `Hero`, `ProofStrip`, `TrayGrid`, `CategoryTile`, `OccasionFeature`, `PlumBand`, `ProductGallery`, `EnquiryBlock` | `src/components/sections/`                      | **Retired**: owners stop using them; WP6 deletes the files |       |                 |

Shared types: `src/lib/tones.ts` (WP0) exports `type Tone = 'stage' | 'stage-raised' | 'ivory' | 'parchment' | 'white' | 'plum' | 'plum-deep'` and `type DisplayKarat = '24k' | '22k' | '21k' | '18k'`.

### 5.2 Primitives (WP0)

#### `BaseLayout.astro` (changed)

```ts
export interface Props extends SeoProps {
  jsonLd?: WithContext<Thing>[];
  mainClass?: string;
  /** Tone of the first section; decides the header tone, theme-color and overscroll ground. */
  ground?: 'stage' | 'ivory';
  /** Piece pages: switches the phone bar to "Ask about this piece". */
  piece?: { name: string; sku: string; url: string };
}
```

Markup outline: `<html lang="en" dir="ltr">`; head as today (Seo, the two `<Font>` tags of §4.4, icons, `<meta name="theme-color">` `#0b0918` for `stage`, `#faf7f2` for `ivory`, site-wide JSON-LD unchanged, `head` slot, Analytics); `<body data-ground={ground}>`; skip link; `<SiteHeader tone={ground} rate stale />`; `<main id="main" tabindex="-1">`; `<Footer />`; `<MobileActionBar piece={piece} />`; `<IconSprite />`; scripts `nav.ts`, `rate.ts`, `karat.ts`, `motion.ts`. `UtilityStrip` is removed. Body padding for the phone bar stays (`--action-bar-h` plus the safe area, below 64em). Default `ground` is `stage`.

#### `Section.astro` (new)

```ts
export interface Props {
  tone: Tone;
  /** section: --section-y; band: --band-y (one-line bands); slim: --slim-y; flush: no padding. */
  pad?: 'section' | 'band' | 'slim' | 'flush';
  /** Default column for children: content (1280), wide (1536) or narrow (736, centred). */
  width?: 'content' | 'wide' | 'narrow';
  /** 1 px bronze seam on top: required where a plum section meets a stage section. */
  seam?: boolean;
  /** 1 px --rule on top: two sections of the same tone in a row. */
  ruled?: boolean;
  as?: 'section' | 'div' | 'aside';
  id?: string;
  /** id of the heading that names the section (aria-labelledby). */
  labelledby?: string;
  class?: string;
  style?: string;
}
```

Markup: `<{as} class="sec sec--{pad} [seam] [sec--ruled] {class}" data-tone={tone} aria-labelledby id style><div class="track" data-width={width}><slot /></div></{as}>`. Children default to the content column; a child with `class="wide"` or `class="bleed"` breaks out. No other styling.

#### `SectionHead.astro` (changed)

```ts
export interface Props {
  eyebrow?: string;
  /** Plain heading text. */
  title: string;
  /** Optional accent phrase, rendered after the title in <em>. */
  accent?: string;
  /** Put the accent on its own line (block) or run it on (inline, default). */
  accentBreak?: boolean;
  as?: 'h1' | 'h2' | 'h3';
  /** h2 (default), display (one word or line per section) or h3. */
  size?: 'h2' | 'display' | 'h3';
  shape?: 'split' | 'stack' | 'centre';
  ornament?: boolean;
  id?: string;
  class?: string;
}
```

Slots: default (the lead, rendered in `<div class="head__lead lead">`; phrasing content only), `aside` (a `MoreLink`). `split`: title in columns 1 to 7, lead and aside in 8 to 12, bottom-aligned, on the 12-column grid from 64em; stacked below. `stack`: one column, max 40 rem. `centre`: centred, lead centred. Bottom margin `--space-8` on desktop, `--space-7` on phones. The heading is `text-wrap: balance`. Optional `.reveal` on the wrapper (never in a first viewport).

#### `PageHead.astro` (new; inner-page opener, replaces `Hero`)

```ts
export interface Props {
  tone: Tone;
  breadcrumbs: BreadcrumbItem[];
  eyebrow?: string;
  title: string;
  accent?: string;
  lead?: string;
  /** text: one column; split: text and media 7/5 (or 5/7 with mediaFirst); centre: centred text. */
  layout?: 'text' | 'split' | 'centre';
  mediaFirst?: boolean;
  /** h1 (default) or display (one word: a style, branch or category name). */
  size?: 'h1' | 'display';
  /** Italic display for style and category names. */
  italic?: boolean;
  id?: string;
}
```

Slots: default (actions, a `.actions` row), `media` (a `StageImage`, `Plate`, `TypesetPlate`, portrait window or route miniature), `aside` (facts). Renders a `Section` with `pad="section"` (top padding `--space-8` on phones), breadcrumbs first, then the grid. The H1 is the page's only H1. On phones media follows the H1 and lead, before the actions, except where §6 says otherwise. Never animated.

#### `Eyebrow.astro`, `Ornament.astro`

`Eyebrow`: `{ as?: 'p' | 'span' | 'div'; ornament?: boolean; class?: string }`; renders `.eyebrow`, optionally prefixed by `<Ornament />`. `Ornament`: an inline SVG (`aria-hidden`, 48 × 8, `viewBox="0 0 48 8"`), a hairline with a small arch at its midpoint, `stroke: currentColor`, `vector-effect: non-scaling-stroke`, colour `--wipe`. Used at major section starts only, at most three per page.

#### `Button.astro` (changed)

```ts
export interface Props extends HTMLAttributes<'a'> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'md' | 'compact';
  block?: boolean;
  icon?: IconName;
  iconEnd?: IconName;
  type?: 'button' | 'submit';
  external?: boolean;
  class?: string;
}
```

Colours come only from the tone (§3.5); there are no tone variants. `external` adds `target="_blank" rel="noopener"` and a visually hidden "(opens WhatsApp)" or "(opens in a new tab)" suffix chosen from the URL host.

#### `MoreLink.astro` (new)

`{ href: string; external?: boolean; icon?: IconName (default 'arrow-right'); class?: string }`, slot = label. Renders `<a class="link-wipe">label <Icon /></a>`. The standard "All jewellery", "How a price is built" link.

#### `StageImage.astro` (new; the only way a velvet photograph is drawn)

```ts
export interface Props {
  image: ImageMetadata;
  alt: string;
  mask?: 'spot' | 'pool' | 'edge' | 'none';
  /** CSS px; clamped to the source width. Default min(image.width, 600). */
  cap?: number;
  /** Sampled ground (#rrggbb) from the product's `stage` field, when the piece is shown alone. */
  stage?: string;
  /** Exactly one per page: the LCP image. */
  priority?: boolean;
  /** scroll: the case light comes on as it enters (walls only). */
  light?: 'static' | 'scroll';
  recede?: boolean;
  /** target: this figure is the piece page's stage (view-transition-name: piece).
      source: a listing card; piece-morph.ts names it on pageswap. */
  morph?: 'target' | 'source';
  /** Destination path for morph="source". */
  href?: string;
  sizes?: string;
  class?: string;
}
```

Rules inside the component:

- `widths = [...new Set([240, 360, 480, cap, image.width].filter((w) => w <= image.width))]`; `formats={['avif', 'webp']}`; `fit="cover"`; no `position` unless a sharp keyword.
- `sizes` default `(min-width: 64em) {cap}px, min({cap}px, 100vw)`.
- `priority` → Astro's `priority` (eager, sync, `fetchpriority="high"`); otherwise `loading="lazy"` and `fetchpriority="low"`.
- `style="--cap:{cap}px;--ar:{w}/{h};--stage:{stage}"` (stage only when passed; the CSP allows style attributes).
- `morph="target"` adds `view-transition-name: piece` to the figure's style; `morph="source"` adds `data-morph-href={href}`.
- `recede` adds class `recede`; `light="scroll"` adds `data-light="scroll"`.
- `cap` is clamped to `image.width`; asking for more logs a build warning naming the image (never an upscale).

#### `Plate.astro` (changed; studio cut-outs only)

```ts
export interface Props {
  image: ImageMetadata;
  alt: string;
  /** CSS px. Default Math.round(image.width / 2) (sharp on 2× screens); openers pass image.width. */
  cap?: number;
  ground?: 'lilac' | 'white';
  sizes?: string;
  priority?: boolean;
  class?: string;
}
```

A square box with `inline-size: min(100%, var(--cap))`, `aspect-ratio: 1`, background `--plate-lilac` (the cut-out's own ground, so no edge shows), `overflow: clip`, the image `object-fit: contain` filling it. Fixes the 0 × 0 collapse: the box has its size before the image loads. Never used for velvet photographs.

#### `TypesetPlate.astro` (new; the honest empty state)

```ts
export interface Props {
  /** The style or piece with no photograph yet, e.g. "Kuwaiti". */
  name: string;
  note?: string; // default "Not photographed yet. Ask us on WhatsApp and we will send pieces from the case."
  whatsappUrl?: string;
  cap?: number; // default 420
}
```

A square on `--stage-1` with a 1 px `--rule-stage` inner frame inset 12 px, the name centred in Cormorant italic 300 at `--t-display`, the note in `--t-small` `--muted`, and a `link-wipe` "Ask on WhatsApp" when `whatsappUrl` is given. Same box size as a `StageImage` of the same `cap`, so it drops into any grid. Never a borrowed photograph.

#### `Panorama.astro` (new)

```ts
export interface Props {
  image: ImageMetadata; // story/banner-about.jpg today; branch photographs later
  alt: string;
  /** Where the dark field is, for text placement and phone crop. */
  field?: 'start' | 'end';
  class?: string;
}
```

Slot: overlay content (eyebrow, H2, lead). Desktop (64em and up): the image runs full bleed up to `--cap-pano` (its 1,920 px source), height from its own aspect ratio (no crop), `mask-image: var(--mask-pano)` feathering the bottom 28 % into the section ground; above 120 rem it is centred with `--mask-pano-sides` added (intersect). The slot sits over the dark field (`field="start"`: columns 1 to 6), contrast 13.11:1 or better. Phones: the image is a 240 px tall band, `object-fit: cover`, `object-position` on the jewel side (`right center` when `field="start"`), and the slot content stacks below it on the section ground, never over the image. Lazy, `fetchpriority="low"`, widths `[960, 1440, 1920]` filtered to the source.

#### `GroupLockup.astro` (new)

`{ size?: 'sm' | 'md'; link?: boolean }`. The C-ring (`Icon name="c-ring"`, 24 or 32 px, `--wipe`) and "A Classic Group house" as an eyebrow. With `link`, the label links to `site.group.url` with `rel="noopener"` (heritage, not a sales link).

#### `RateFigure.astro` (new; the one way a rate number is printed)

```ts
export interface Props {
  rate: GoldRate | null;
  /** A fixed karat, or "follow": the visitor's chosen karat (html[data-karat], 22K default). */
  karat: DisplayKarat | 'follow';
  /** number: "468.25"; aed: "AED 468.25"; label: "22K 468.25" (follow only). */
  format?: 'number' | 'aed' | 'label';
  /** Mark for rate.ts to roll on a real change (instrument, ticket, estimator only). */
  roll?: boolean;
  class?: string;
}
```

Output for a fixed karat: `<span class="fig" data-rate="22k" [data-roll]>468.25</span>` (with "AED " outside the hook for `aed`). For `follow`: four `<span class="kv" data-k="…">` each holding its own `data-rate` hook, only one displayed by the base.css rule. `rate === null`: prints "Ask for today's rate" (no hook). Values always `toFixed(2)` from the baked snapshot.

#### `Breadcrumbs.astro` (changed)

Interface unchanged. Tone-aware colours (`--muted`, current page `--fg`), 13 px, slash separators in `--rule-strong`, every link a 24 px target (`.list-links`). On every page except home.

#### `Icon.astro`, `IconSprite.astro` (changed)

Add `chevron-down`, `arrow-left` and `calendar` to `IconName` and the sprite, 24 × 24, 1.25 stroke, matching the existing set. The live marker is CSS (`.marker`), not an icon.

#### `OneLineBand.astro` (new)

```ts
export interface Props {
  line: string;
  accent?: string; // italic tail, its own clause
  as?: 'h2' | 'p';
  lockup?: boolean; // GroupLockup above the line
  tone?: 'ivory' | 'parchment';
  id?: string;
}
```

Slot: one short sub-line and a `MoreLink`. A `Section` with `pad="band"`, centred, the line in `.h-band` at most 24 ch wide, the sub-line `--t-lead` `--body` at most 40 rem. The line is never revealed word by word; the wrapper may `.reveal`.

#### `EnquiryBand.astro` (new; every page ends at a person)

```ts
export interface Props {
  title: string;
  accent?: string;
  text?: string;
  whatsappUrl: string;
  whatsappLabel?: string; // default "Ask on WhatsApp"
  secondary?: { href: string; label: string; external?: boolean };
  tone?: 'plum' | 'stage'; // default plum
  /** Prints "22K today: AED 468.25 a gram" under the actions. */
  rate?: GoldRate | null;
  rateKarat?: DisplayKarat;
  seam?: boolean; // default true when tone is plum
  id?: string;
}
```

A `Section pad="section"`, centred: H2 at `--t-band` with the accent, the text (`--t-lead`), an `.actions` row (primary WhatsApp with icon, then the secondary), an optional rate line. Never contains a photograph.

#### `CampaignLine.astro` (new)

`{ offer: Offer; tone?: 'plum' | 'ivory'; headingLevel?: 'h2' | 'p' }`. A `Section pad="slim"` (plum by default, `seam`). One row on desktop: label "Until {formatDate(endsOn)}" (eyebrow), the offer `headline` split at its first colon (the clause after the colon in `<em>`), then a text link "See the offer" (`routes.offer(id)`) and a primary "Ask on WhatsApp" (`offer.whatsappMessage`). Three short lines on phones. Rendered only when the page passes an active offer (`getActiveOffers()`); it can never outlive the offer's end date. No countdown, no badge.

#### `QuoteLines.astro` (new)

`{ karat: DisplayKarat; rate: GoldRate | null; title?: string; accent?: string; headingLevel?: 'h2' | 'h3' }`. Default title "Your quote," accent "in three lines". A 5/7 split: the heading left; right, an `<ol class="rows">` of three numbered rows with Cormorant `--t-h3` names: **Gold value**: "Today's {22K} rate, {AED 468.25} a gram, times the gold in the piece. We weigh it in front of you." **Making charge**: "For the work in the piece, quoted for this piece before you decide." **5% VAT**: "On the gold value and the making charge." The rate is a `RateFigure`. Ivory.

#### `StepStrip.astro` (new)

`{ steps: { title: string; text: string }[]; numerals?: boolean; tone?: Tone }` (3 or 4 steps). A row of equal columns (stacked on phones) separated by `--rule`; each step a large Cormorant numeral at `--t-display` in `--numeral` (01, 02 …), a `--t-h3` title and a short text. Rendered as an `<ol>`.

#### `OccasionWindow.astro` (new; replaces `OccasionFeature`)

```ts
export interface Props {
  occasion: Occasion;
  /** Extra line, e.g. the active festival offer. */
  note?: string;
  /** Show the summary under the name (occasion index: yes; home: no). */
  summary?: boolean;
  headingLevel?: 'h2' | 'h3';
  cap?: number; // default 392 (2× sharp from the 784 px source); never above 392
}
```

A link card: the portrait in a window (a 1 px `--rule-strong` frame offset 0.5 rem around it, like a shop-window surround), drawn at most `cap` CSS px wide from the 784 × 1280 source (`widths` `[296, 392, 588, 784]` filtered, `fit="cover"`, `position="top"` as a sharp keyword), its own aspect ratio; below it the name in Cormorant italic `--t-name` (`--t-h3` on the index), the optional note in `--accent`, the optional summary. Hover and focus turn the frame `--accent`; nothing moves or scales. Lives on ivory. Text never sits on the portrait.

### 5.3 Chrome (WP1)

#### `SiteHeader.astro` (changed)

```ts
export interface Props {
  tone: 'stage' | 'ivory';
  rate: GoldRate | null;
  stale: boolean;
  fetchedAt: string | null;
}
```

- **Ground.** Solid, never translucent, no `backdrop-filter`. `data-tone="stage"` (logo-white) or `data-tone="ivory"` (logo-dark), a 1 px `--rule` under it. Sticky on every device (`position: sticky; inset-block-start: 0; z-index: var(--z-header)`), `--header-h` tall (56 / 72 px). The header element carries `view-transition-name: hdr`.
- **Desktop (64em and up), wide track.** Logo (33 px tall, links home) | primary nav centred | `RateChip` and a compact primary "WhatsApp" button (bronze on stage, plum on ivory) on the right.
- **Primary nav** (Plex 15 px, `--body`, current item `--fg` with the wipe shown, `aria-current`): **Jewellery** (a `<button popovertarget="mega" aria-expanded>` with `chevron-down`; the panel holds the link to `/jewellery/`), **Styles** (`/collections/`), **Occasions**, **Gold rate**, **Old gold** (`/gold-exchange/`), **Branches** (`/stores/`), **About**. Every item has the 600 ms underline wipe on hover and focus.
- **Phones.** Logo | `RateChip` (compact) | Menu button (`<button commandfor="drawer" command="show-modal" aria-haspopup="dialog">`, 44 px, `menu` icon and the visible word "Menu" from 40em).
- **States.** Mega panel open: the Jewellery button shows its wipe and `aria-expanded="true"`. Stale rate: the chip's marker is hollow.

#### `RateChip.astro` (new)

`{ rate: GoldRate | null; stale: boolean; fetchedAt: string | null; compact?: boolean }`.

- The chip: `<button popovertarget="rate-pop" aria-expanded="false">` 44 px tall, 1 px `--rule-strong` border: `.marker` (hollow when stale), `RateFigure karat="follow" format="label"` with the karat in Plex 500 12 px uppercase and the value in Cormorant 400 `--numeral`, plus a visually hidden "AED per gram, today's rate". `compact` hides the karat label below 24 rem.
- The popover `#rate-pop` (`popover`, `.sheet`, `data-tone="stage-raised"`, 20 rem wide): a `<p class="eyebrow">Today, AED per gram</p>` (not a heading), four rows (karat, stamp, `RateFigure` value) in `.rows`, the source and time ("Dubai Jewellery Group suggested retail rate, 13 October, 12:02"), "Before making charges and 5% VAT", and a `MoreLink` "Today's gold rate" to `routes.goldRate`. Positioned with anchor positioning under `@supports (position-area: block-end)` (`position-area: block-end span-inline-start`), otherwise fixed under the header at the inline end.
- No rate: the chip reads "Gold rate" and links to `/gold-rate/` instead of opening a popover.

#### `MegaPanel.astro` (new)

`{ categories: Category[]; collections: DesignCollection[]; products: Product[]; rate: GoldRate | null; fetchedAt: string | null }`.

- `<div id="mega" popover class="sheet" data-tone="stage-raised">`, full width under the header (`inset-block-start: var(--header-h)`, `inset-inline: 0`), `--section-y`/2 padding, wide track, a `--rule` under it. Columns enter 120 ms after the panel (transition delay on the column wrapper, `@starting-style`).
- **Four columns.** Column headings are `<p class="eyebrow">`, never headings (the H1 must be the first heading).
  1. **By piece**: the nine categories (`shortName ?? name`) in Cormorant 400 at `--t-h3`, then "All jewellery" (`MoreLink` to `/jewellery/`).
  2. **By style**: the seven place-based styles and the five others (`shortName`), Plex 15 px. Beside the list, a 208 px preview: one `StageImage` per style that has a velvet product (`cap={208}`, `mask="spot"`, lazy), stacked in one grid cell, the default showing the first; `:has(a[data-style="kolkata"]:is(:hover, :focus-visible))` crossfades to that style's preview over 320 ms. Styles without a velvet photograph show a `TypesetPlate cap={208}` (Kuwaiti) or a `Plate` (studio cut-out) of the same size. `nav.ts` keeps the last hovered or focused style lit (`data-active`).
  3. **Visit us**: the four open branches (emirate eyebrow, name as a link to its page, the phone or "Group line", the flagship marked with the C-ring), then "Opening soon" names.
  4. **Today**: four rates (`RateFigure`), source and time, `MoreLink` "Today's gold rate".
- Light-dismiss and Escape are native; focus returns to the Jewellery button. The backdrop is not dimmed (the header stays lit).

#### `MobileDrawer.astro` (new)

`{ categoriesCount: number; collectionsCount: number; rate: GoldRate | null }`.

- `<dialog id="drawer" class="sheet sheet--side" data-tone="stage-raised">` opened with `showModal()` (via `commandfor` where supported, `nav.ts` otherwise), full height, inline-end, `min(100%, 26rem)` wide. The page behind is inert (modal). Backdrop `--scrim-stage`; backdrop click closes (`nav.ts`), Escape closes natively, a Close button (`command="close"`) at the top.
- Contents: nine destinations in Cormorant 300 at 32 px, each with a quiet right-aligned fact only where it is data: "Jewellery · 15 pieces" (count from content), "Styles · 12", "Gold rate · 22K 468.25" (`RateFigure follow`), "Branches · 4 open". Then the four rates as a compact board, then a primary block "WhatsApp us" (bronze) and a secondary "Call +971 4 255 1288". Links have 48 px rows.

#### `MobileActionBar.astro` (changed)

`{ piece?: { name: string; sku: string; url: string } }`.

- Fixed at the bottom below 64em, `data-tone="stage-raised"`, `--action-bar-h` plus `env(safe-area-inset-bottom)`, a 1 px `--rule-gold` hairline on top, `view-transition-name: bar`, `z-index: var(--z-bar)`.
- **Default cells** (grid `1.4fr 1fr 1fr 1fr`, each 56 px tall, icon over a 12 px label): **WhatsApp** (filled `--btn-bg` bronze, stage ink; `whatsappGeneral()`), **Call** (`tel:` landline), **Branches** (`/stores/`), **Rate** (`RateFigure follow` in Cormorant 400 champagne over "22K rate", links to `/gold-rate/`).
- **Piece variant** (grid `2fr 1fr 1fr`): **Ask about this piece** (bronze, `whatsappForProduct(piece)`), **Call**, **Visit** (`routes.contact` with `?piece={sku}`).
- Hidden while a field has focus (existing `nav.ts` behaviour). Every cell is at least 56 × 44 px.

#### `Footer.astro` (changed)

- `data-tone="plum-deep"`, a 1 px `--rule-gold` top rule, wide track, `--section-y` padding.
- **Row 1**: the slogan `site.slogan` as "Every jewel _has a tale._" in `.h-band` (`<p>`, not a heading), then the white logo and a `GroupLockup` line: "A Classic Group house. Jewellers since {site.founded.brandYear}; the group has been {site.group.experience}."
- **Row 2**, four columns (two on phones), headings as `<p class="eyebrow">`: **Branches** (open branches with emirate and phone or "Group line", then "Opening soon: …"); **Today, AED per gram** (four `RateFigure` rows, the time, the source); **Ask us** (WhatsApp, Call, email `site.email`, "Book a visit" to `routes.contact`); **The house** (Jewellery, Styles, Occasions, Gold rate, Old gold, Custom jewellery, Offers, About, Our promise, Journal, Contact).
- **Row 3**: © year, `site.legalName`, "Trade licence {site.registrationNumber}", Privacy policy, Terms, Disclaimer, and the five social profiles as text links to their real URLs (no icons pointing at bare domains). All links in `.list-links` (24 px targets). No dead links.

### 5.4 Gold (WP4)

#### `RateInstrument.astro` (new; stub in WP0)

```ts
export interface Props {
  rate: GoldRate | null;
  stale: boolean;
  fetchedAt: string | null;
  /** hero: home first screen; page: /gold-rate/ opener with a vertical key board; compact: festivals and offer pages. */
  variant?: 'hero' | 'page' | 'compact';
  /** Unique on the page; prefixes radio ids and names. */
  id: string;
  /** Snapshots newest first; the page variant prints the change since the previous day. */
  history?: RateSnapshot[];
}
```

Markup outline:

```html
<div class="inst" data-variant="hero" id="{id}" data-rate-board>
  <p class="inst__label eyebrow">
    <span class="marker" [data-stale]></span>
    <span class="inst__kl" data-k="24k">24K</span>… (four, shown by the same :has rule)
    <span>today, AED per gram</span>
  </p>
  <p class="inst__figs" aria-hidden="true">
    <span class="inst__aed">AED</span>
    <span class="inst__stack">
      <span class="inst__fig fig" data-k="24k" data-rate="24k" data-roll>505.75</span>
      <span class="inst__fig fig" data-k="22k" data-rate="22k" data-roll>468.25</span>
      <span class="inst__fig fig" data-k="21k" data-rate="21k" data-roll>449.00</span>
      <span class="inst__fig fig" data-k="18k" data-rate="18k" data-roll>384.75</span>
    </span>
  </p>
  <div class="sheen-rule" data-sheen></div>
  <fieldset class="inst__keys">
    <legend class="sr-only">Show the rate for</legend>
    <label class="inst__key">
      <input type="radio" name="{id}-k" value="24k" data-karat-input />
      <span class="inst__karat">24K</span>
      <span class="inst__stamp">999</span>
      <span class="inst__val fig" data-rate="24k">505.75</span>
      <span class="sr-only">AED per gram</span>
    </label>
    … 22K (checked), 21K, 18K
  </fieldset>
  <div class="inst__status">
    <p class="small">
      Dubai Jewellery Group suggested retail rate,
      <time datetime="2026-10-13T08:02:43Z" data-rate-time>13 October, 12:02</time>
    </p>
    <p class="small">Before making charges and 5% VAT</p>
    <p class="small inst__delta" data-rate-delta role="status"></p>
  </div>
</div>
```

- **Numerals.** The four figures are stacked in one grid cell (`grid-area: 1 / 1`), so the box is always the widest figure and nothing moves (CLS 0). Without `:has()` only the 22K figure shows; with it (`@supports selector(:has(*))`), `.inst:has(input[value='21k']:checked) .inst__fig[data-k='21k']` shows and the others go to `opacity: 0; visibility: hidden; translate: 0 0.12em`, transitioned over `--dur-slow` on `--ease-lux` (`visibility` with `allow-discrete`). The big figures are `aria-hidden`; the radio labels carry every value for assistive technology, and arrow keys move between karats natively. The 22K radio is `checked` in the HTML and the hero never changes its default on load.
- **Type.** Hero and page: `font-size: min(var(--t-rate), 22svh)` on desktop, `--t-rate` on phones, Cormorant 300 `--numeral` (champagne), `text-box: trim-both cap alphabetic`, `--track-rate`; "AED" Plex 500 12 px top-aligned; compact: `--t-numeral-xl`.
- **Keys.** Four equal columns (four across on phones too, at least 72 × 64 px), separated by `--rule`; the karat in Plex 500 12 px uppercase `--eyebrow`; the stamp in Plex 500 11 px in a 1 px `--rule-strong` box; the value in Cormorant 400 `--t-numeral` `--body`; the selected key gets `--fg` value, a 2 px `--wipe` bar on top (`scale` 0 → 1 over 600 ms) and `background: var(--stage-2)` on the stage. The page variant stacks the keys as four rows in a column beside the numeral, each with its fineness in words and, when history allows, the change since the previous day in neutral ink ("Up AED 2.50 since 12 October"; never red or green).
- **Status block.** Three lines; the third (`data-rate-delta`, `role="status"`) is always rendered and holds its line height (`min-block-size: 1lh`) even when empty, so a refresh never pushes the actions down. Time from `fetchedAt` formatted `formatRateTime()` (Dubai). Stale: the first line reads "Last published rate, {date}", the marker is hollow, nothing rolls.
- **No rate:** the numeral area reads "Call for today's rate" with a `tel:` link; keys are omitted.
- **Sheen:** the `.sheen-rule` runs once 600 ms after load; `rate.ts` re-runs it (`data-sheen="again"`) on a real change.
- **Karat follow:** `karat.ts` mirrors a change of the instrument's radios to `html[data-karat]` (chip, bar, drawer, estimator default).

#### `KaratStamps.astro` (new; stub in WP0)

`{ rate: GoldRate | null; collections: DesignCollection[]; variant?: 'band' | 'compact' }`. Renders content only; the page supplies `Section` and `SectionHead`.

- An `<ol role="list">` of four columns (2 × 2 on phones), each: the karat (eyebrow), the stamp `999`/`916`/`875`/`750` at `--t-stamp` Cormorant 300 `--numeral` (`aria-hidden`, with a visually hidden "stamped 916"), a 3 px bronze bar `scale: {fineness} 1` with `transform-origin: 0 50%` and `.draw-x` (fills from 0 as it enters), the fineness in words ("91.6% gold"), "{RateFigure aed} a gram today", and **"In our cases:"** followed by the collections whose `karats` include that karat, by `order`, up to three `shortName`s then "and {n} more" (24K reads "Coins and bars", from the `gold-coins-bars` category). Columns separated by `--rule`.
- A foot row: "Rates: Dubai Jewellery Group suggested retail rate, {date}, {time}." and a `MoreLink` "How a price is built" (`routes.goldRate` with `#price`), omitted on `/gold-rate/` itself.
- `compact`: no "In our cases" line, stamps at `--t-numeral-xl`.

#### `Estimator.astro` (new; stub in WP0)

```ts
export interface Props {
  rate: GoldRate | null;
  /** panel: form and output on plum-deep (bands and the exchange hero); slim: a one-line teaser band. */
  variant?: 'panel' | 'slim';
  id: string;
  karat?: DisplayKarat; // default 22k; karat.ts may replace it with the visitor's choice
  grams?: number; // default 10
  /** The piece page's slim band names the piece's karat. */
  title?: string;
}
```

Two modes, decided at build from `site.exchange.confirmed` (WP0 adds it, default `false`):

|          | `pending` (until the owner confirms the exchange basis)                                                                   | `confirmed`                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Output   | Fine-gold weight: **"9.16 g"** "of fine gold"                                                                             | **"AED 4,682.50"**                                                                                 |
| Sum line | "10 g of 22K is 91.6% gold: about 9.16 g of fine gold."                                                                   | "10 g × AED 468.25 a gram (22K) = AED 4,682.50" (or the buying rate when `basis` is `buying-rate`) |
| Note     | "We test it at the counter and credit it at the day's rate for its karat. Ask us for the exchange terms before you come." | "An estimate, not an offer. The credit is set at the counter after testing, against a new piece."  |

Markup (`panel`): a `<form class="est" data-estimator data-mode data-rates='{"24k":505.75,…}'>` with no submit button, inside `data-tone="plum-deep"`:

- **Weight**: an underline-only `.field--line` number input (`inputmode="decimal"`, `min="0.5"`, `max={site.exchange.maxGrams}` = 500, `step="0.1"`, value 10, Cormorant 300 `--t-numeral-xl` figures) between − and + buttons (44 px, `aria-label="Less weight"`, `"More weight"`, step 1 g), unit "grams", hint "From your receipt, or your best estimate".
- **Karat**: a `fieldset` with a `legend` "Karat" and hint "stamped inside the piece"; four `.chip` radios showing "22K" and "916".
- **Bring it to**: a `<select>` of the four open branches plus "Not sure yet".
- **Output**: `<output aria-live="polite">` at `--t-numeral-xl` champagne, the sum line (`.small`), the note (`.caption`).
- **Action**: primary "Ask about exchanging it" (bronze) whose `href` is a `wa.me` link; the baked HTML carries the worked example message, so it works without JavaScript: "Hello Classic Jewels, I have about 10 g of 22K old gold and would like to bring it to the {branch} branch to be tested and weighed. What are the exchange terms?" `estimator.ts` rewrites it as inputs change. Secondary text link "How the exchange works" (`routes.goldExchange`), omitted on that page.

`slim`: a `Section tone="plum" pad="slim" seam`: one line, pending: "Have old gold? We test it in front of you and credit it at the day's rate against a new piece." confirmed: "Have old 22K gold? At today's rate, 10 g is about AED 4,682.50 towards this piece." and a `MoreLink` "Work out yours" (`routes.goldExchange#estimator`).

#### `RateRecord.astro` (new)

`{ history: RateSnapshot[] }`. Fewer than seven snapshots: "Our record starts on {formatDate(oldest)}. A 7-day chart appears here once we have seven days of postings." and a ruled table of the days we have (date, 24K, 22K, 21K, 18K, change in 22K since the previous day in neutral ink). Seven or more: an inline SVG sparkline (built at build time, `pathLength="1"`, 1.5 px `--champagne` stroke on `--rule` gridlines, drawn once with `stroke-dashoffset` under `view()` in `no-preference`), a 7-day / 30-day toggle as two radios switching two pre-rendered paths with `:has()`, and the last seven rows in the table. Never interpolated or invented history.

#### `RateBoard.astro` (changed)

Kept for `/gold-rate/` only as the history table renderer inside `RateRecord`, restyled with tokens; the `band` and `mini` variants are retired.

### 5.5 Catalogue (WP3)

#### `ProductCard.astro` (changed; props fixed by WP0)

```ts
export interface Props {
  product: Product;
  collectionName?: string; // the collection's shortName
  rate?: GoldRate | null;
  /** case: velvet photo on the stage; plate: studio cut-out on lilac. Defaults from the image's `ground`. */
  layout?: 'case' | 'plate';
  cap?: number;
  light?: 'static' | 'scroll';
  headingLevel?: 'h2' | 'h3';
  class?: string;
}
```

An `<article class="card" data-karat data-collection data-name data-new>` (filter contract unchanged). Contents, in order: the image (`StageImage mask="spot" morph="source" href light` for `case`, `Plate` for `plate`) inside the card link; the collection eyebrow; the name as a heading link (`--t-name` Cormorant italic, the link stretched over the image and name with a pseudo-element; no nested anchors); the meta line "{22K} · {AED 468.25} a gram today" (`RateFigure`), or "{18K} · stones tested" style facts where the product has `stones`; "Gold value today ≈ {AED x}" only when `goldValue()` returns a value; then a separate `link-wipe` "Ask on WhatsApp" (`whatsappForProduct`) outside the stretched link. Hover and focus: a 1 px `--accent` hairline draws under the image (the "plinth") and the name's wipe shows; the photograph never moves.

#### `CaseWall.astro` (new; stub in WP0)

```ts
export interface Props {
  products: Product[]; // velvet only (build error otherwise)
  rate: GoldRate | null;
  collectionNames: Record<string, string>;
  layout?: 'stagger' | 'grid';
  columns?: 3 | 4;
  cap?: number; // default 420
  light?: 'scroll' | 'static'; // default scroll
  headingLevel?: 'h2' | 'h3';
  id?: string;
  filterable?: boolean;
}
```

Renders `ProductCard layout="case"` cells. `grid`: equal columns (4 at 64em, 3 at 48em, 2 below) with `--grid-gap` × 1.5 row gap. `stagger`: the same grid with every second column dropped `--space-10` on desktop (`position: relative; inset-block-start`, so the reveal's `translate` is free) and the right column dropped `--space-8` on phones; the section's bottom padding grows by the drop. Imports `piece-morph.ts`. At most eight masked images per viewport.

#### `PlateGrid.astro` (new; stub in WP0)

Same props as `CaseWall` minus `light` and `layout`; lilac products only (build error otherwise). `ProductCard layout="plate"` on ivory; one continuous `--plate-lilac` field behind the row so the cut-outs have no edges (cells separated by 1 px ivory gaps). Phones: a `.rail` at 44 % cards.

#### `StylesLine.astro` (new; stub in WP0)

```ts
export interface Props {
  collections: DesignCollection[];
  variant?: 'full' | 'mini';
  /** Collection id to light (mini on collection pages). */
  lit?: string;
}
```

- **Data.** Collections with a `longitude` (WP0 adds it: Italian 12, Turkish 29, Kuwaiti 48, Rajkot 71, Temple 78, Kolkata 88, Singapore 104) plus Dubai at `flagship.map.geo.longitude` (55.3). Positions `--x = (lon − min) / (max − min)` computed at build. Each label: `shortName` in Cormorant italic (`--t-h3` at 400), the content `origin` line in `--t-small` `--muted` ("Kolkata filigree tradition", "Italian-style chains"), karats in `.fig` `--eyebrow`. No degrees anywhere.
- **Desktop (full).** A 1 px bronze axis across the wide track, two `<i>` segments drawn outward from Dubai (`.draw-x`, `transform-origin` at Dubai's `--x`); labels alternate above and below in west-to-east order (first edge-aligned to the start, last to the end); the west group and the east group fade in as two wrappers (four animated elements in all). Dubai is a C-ring marker with "Dubai" and "Our {4} branches" (links to `/stores/`). Every style label links to `routes.collection(id)`.
- **Phones.** A vertical axis at the inline start (`.draw-y`), labels stacked west to east, top to bottom, Dubai in its place.
- **Captions** (visible): "Schematic, west to east. Each style sits roughly where it comes from." and "Also at the counter:" with links to the collections without a longitude (Antique, Gemstone, Diamonds, Kids, Made to order).
- **Mini.** A 240 px tall block (or 120 px horizontal strip on desktop) with names only, the `lit` style in `--accent` with a filled marker, the rest `--muted`, Dubai marked.

#### `CategoryPlate.astro` (new; replaces `CategoryTile`)

`{ category: Category; image?: ImageMetadata; imageAlt?: string; count?: number }`. A link card on ivory: a `Plate` (cap 180) of the category's first studio product image, the category `shortName ?? name` in Cormorant 400 `--t-h3`, a count only when 3 or more ("12 pieces"). Necklaces (velvet) use a `StageImage` on a small stage square instead; coins and bars (no photograph) use a typeset square ("Coins and bars" in Cormorant italic on parchment).

#### `PieceStage.astro` (new; replaces `ProductGallery`)

`{ product: Product; images: { src: ImageMetadata; alt: string }[] }`. The first image as `StageImage` `mask="pool"` `cap={600}` `stage={product.data.stage}` `priority` `morph="target"`; on desktop the stage column is sticky (`inset-block-start: calc(var(--header-h) + var(--space-5))`). Under it the note: "One photograph so far." followed, only when `site.services.morePhotos` is true, by "Ask on WhatsApp for another photograph." (link prefilled). Future extra images: thumbnails as buttons swapping the stage image (`:has()` radios), never a carousel.

#### `PieceTicket.astro` (new; replaces `EnquiryBlock` on piece pages)

`{ product: Product; category: Category; collection?: DesignCollection; rate: GoldRate | null; fetchedAt: string | null; url: string }`. An ivory card (`data-tone="ivory"`, 1 px `--rule-strong` border, `--space-6` padding, square, sticky on desktop beside the stage). In order:

1. Eyebrow: collection `shortName` (link) · category.
2. **H1**: the piece name, `--t-h1`.
3. Facts line: "22K gold · 916 hallmark · Ref CJ-NK-003".
4. Today's rate block: "22K today, per gram" (eyebrow), `RateFigure format="aed" roll` at `--t-numeral-xl`, the source and time (`.caption`), then either "Weight on request. The price is weight × this rate, plus the making charge and 5% VAT." or, when `goldValue()` returns a value, "Gold value today ≈ AED {x} for {g} g of {22K}".
5. Primary (plum): "Ask about this piece on WhatsApp" (`whatsappForProduct`), block width.
6. Secondary: "Call Deira +971 4 255 1288" (`flagship.phone`).
7. Quiet rows (`.rows`, 48 px, arrow icons): "Book a visit to see it" (`routes.contact?piece={sku}`), "Which branch has it today?" (WhatsApp prefilled), "Ask us to call you" (WhatsApp prefilled: "Please call me about the {name} (ref {sku})."; rendered only when `site.services.callback` is true), "Copy the reference {sku}" (`data-copy`, `form.ts`).
8. Small print: "No prices online. Gold is priced by weight at the day's rate, so each piece is quoted on request."

#### `SpecTable.astro`, `Filters.astro` (changed)

- `SpecTable`: interface unchanged; a ruled `<dl>`-style table, label in eyebrow style, value in `--body`, empty rows dropped; weight reads "On request, weighed in front of you" until `weightGrams` exists.
- `Filters`: interface plus `rate: GoldRate | null` and `grids: string[]` (ids of every grid it controls, e.g. the velvet wall and the studio grid). Karat chips (`button aria-pressed`, square, 44 px) each show today's rate ("22K · 468.25"); collection chips; sort select. Hash state on the canonical URL as today. A grid's whole section hides when none of its cards match. Hidden below three pieces.

### 5.6 Places and stories (WP5)

#### `BranchDoors.astro` (new; stub in WP0)

```ts
export interface Props {
  /** full: /stores/; home: home section; compact: rate, exchange, contact and about pages. */
  variant?: 'full' | 'home' | 'compact';
  /** Branch id to light (branch pages). */
  lit?: string;
  showSoon?: boolean; // default true
}
```

- **Data**: `openBranches` sorted by `routeOrder` (WP0 adds it: Madinat Zayed 1, Deira 2, Rolla Mall 3, Safari Mall 4) and `branches` with `status: 'opening-soon'`.
- **Route** (desktop): a 1 px bronze line across the doors' grid, drawn west to east with `.draw-x` (`scale`), a station marker (a square turned 45°; the flagship a C-ring) exactly over each door column's start; the visible caption "Schematic, west to east. Not to scale." Phones: a vertical line at the inline start with one station per door (static, no draw).
- **Door** (`StoreCard`): emirate eyebrow ("Dubai · Flagship" with the C-ring for Deira), the name as an `h3` link to `routes.store(id)` in Cormorant 400 `--t-h3`, then one of: `shortAddress` and the metro and parking lines from `site.ts` (Deira), or "Call or message for the shop number and today's hours." (no own data); on the home page the short address only. Then the hours (WP6, owner decision in §0): the week collapsed into runs by `src/lib/hours.ts`, as a day-by-day list on `/stores/` and one line elsewhere, today's run marked by `nav.ts`, the open-now line written by `open-now.ts`, and "As listed on Google, checked {date}" until `hours.confirmed` (printed once under the four home doors). Then three actions in `.list-links`, each at least 44 px tall: **Call** (`branch.phone` or the landline labelled "Group line +971 4 255 1288"), **Directions** (`branch.map.url`, external), **WhatsApp this branch** (prefilled: "Hello Classic Jewels, I'd like to visit the {name} branch. Could you confirm today's hours?"). Hours only when `hours.confirmed` is true (none today), then with the "checked on" date. `lit` raises that door (`--fg` name, champagne station); the others stay as they are.
- **Opening soon**: one line, "Opening soon: {names}. Dates to follow." from the opening-soon branches' names and `publicNote`.
- Home and compact variants omit the route on phones; full shows it.

#### `ContactForm.astro` (changed)

`{ reference?: string; branch?: string; topic?: string; variant?: 'visit' | 'brief' }`. On plum, underline fields (`.field--line`). **visit**: four numbered steps in one form (all visible; no wizard JavaScript): 1 Branch (four radio cards, the `branch` prop preselected), 2 Reason (radio chips: "A piece I saw", "Old gold", "Bridal", "Made to order", "Coins and bars", "Something else"; `?piece=` prefills "A piece I saw" and the reference field), 3 When (day `<input type="date">`, a time window select "Morning", "Afternoon", "Evening"; a language select only once `site.languages` exists), 4 You (name, WhatsApp number, email optional). Two submit buttons: primary "Send on WhatsApp" (`form.ts` composes `wa.me` with every field; without JavaScript the form posts) and secondary "Send by email" (posts to `contact.php`). Honeypot `website` and `fill_ms` as today. **brief** (custom jewellery): contact-method chips (WhatsApp preselected, Call, Email), "I'd like some guidance" checkbox, a description field, and "Send photos on WhatsApp after you submit". WP5 extends `public/api/contact.php` to accept `contact_method`, `visit_day`, `visit_window`, `language` and to require email only when the method is email.

#### `Faq.astro`, `AssuranceLedger.astro`, `JournalCard.astro`, `BarToBangle.astro`

- `Faq` (interface unchanged): `<details name="faq-{id}">` rows in `.rows`, the question in Cormorant 400 `--t-h3` with a plus icon that turns to minus, the answer in `--body` at most `--prose`. No `FAQPage` JSON-LD.
- `AssuranceLedger` (interface unchanged): tone-aware; `condensed` shows the hallmark, diamonds and returns promises only. The exchange promise ("no weight deduction") is excluded from every surface until `site.exchange.confirmed` is true.
- `JournalCard`: cover at most 375 CSS px, title in Cormorant 400 `--t-h3`, standfirst two lines, the date on the article page only (no "min read").
- `BarToBangle` (About): three cards on the stage, **The bar** (an inline line drawing of a bullion bar engraved "999.9 FINE GOLD", stroke `--champagne`; a drawing, not a photograph), **The stamp** (the four hallmark numbers 999 / 916 / 875 / 750 in Cormorant), **The piece** (p03 `StageImage`). Each card ends with a rate line (24K for the bar, 22K for the piece). On desktop the cards start offset (`--from-x`, `--from-y`, `--from-r` custom properties per card) and settle into a row on a named `view-timeline` (`@supports`, `no-preference`); elsewhere they sit in their row. When shot list item 5 arrives, the three photographs replace the bar drawing and the stamp card.

### 5.7 Home only (WP2)

- `HomeHero.astro`: `{ rate; stale; fetchedAt; pieces: Product[]; collectionNames: Record<string, string> }` (changed in WP6 from a single `piece`: the case holds four pieces, the first lit on load). Composition in §6.1. Uses `RateInstrument variant="hero"`, `StageImage priority recede cap={560} mask="spot"` for the first slot (the other slots are lazy, `fetchpriority="low"` and `display: none` until switched), `FactStrip`, and `hero.ts` for the glint, the arrow and name buttons (44 px, `aria-current`, a polite live region) and the one automatic cycle (§0, owner decisions). Without JavaScript the first piece renders exactly as before and the control row keeps its space but stays hidden.
- `FactStrip.astro`: `{ }` (reads `site.ts` and `branches`). Three cells across the wide track at the foot of the hero (stacked on phones), each a numeral in Cormorant 400 `--t-numeral` `--numeral` and two short lines; the first cell links to `site.reviews.url`.

---

## 6. Page compositions

Conventions for every page: `BaseLayout` with `ground` set to the first section's tone family; `PageHead` with breadcrumbs on every page except home; one H1; one `priority` image (or none); the page ends at a person (`EnquiryBand` or `BranchDoors`) before the footer; `title` and `description` unchanged unless given here; JSON-LD unchanged. Widths are checked at 1440 × 900 and 390 × 844.

### 6.1 Home (`/`, WP2)

`ground="stage"`. Grounds in order: **stage, (plum), ivory, stage, ivory, stage-raised, plum, ivory, stage**, then the plum-deep footer. Targets: at most **750 words** in `<main>` at 1440; at most **9,000 px** tall at 1440 × 900 and **10,500 px** at 390 × 844; never three dark sections in a row; the panorama never touches plum.

| #      | Section, tone                                                       | Desktop (1440)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Phone (390)                                                                                                                                                                                                                                                                                                                                                                                                          | Assets                                                     | Motion                                                                                                                   | Components                                              |
| ------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| 1      | **The rate, lit**, stage                                            | Wide track, 7/5. Left: the two-level H1, `RateInstrument` (200 px numeral, keys with stamps, three-line status), actions (primary "Ask on WhatsApp", secondary "Find a branch"). Right: p03 at 560 px in its pool, caption below (name italic, "22K · Antique · CJ-NK-003", `MoreLink` "See the piece"). `FactStrip` across the foot with a `--rule` above it. `min-block-size: calc(100svh - var(--header-h))`, capped at 60 rem; the next section peeks below 900 px only when the hero is shorter | One column in this order: H1 (kicker on two lines, display line on two), piece at `min(17.5rem, 72vw)` with its name only, the rate label, 92 px numeral, the four keys in one row, the status block, actions as a pair (`.actions--pair`), then `FactStrip` as three ruled rows. **First screen above the bar** (844 − 56 header − 56 bar): H1, piece, numeral and all four keys; the status block starts within it | `products/p03.jpg` (the one `priority` image)              | Sheen once at 600 ms; karat crossfade on a key; roll only on a real change; piece recedes on exit. Nothing here fades in | `HomeHero`, `RateInstrument`, `StageImage`, `FactStrip` |
| 2      | **Campaign line**, plum, slim, seam (only while an offer is active) | One row: label, headline with italic clause, "See the offer", "Ask on WhatsApp"                                                                                                                                                                                                                                                                                                                                                                                                                      | Three short lines, actions as a pair                                                                                                                                                                                                                                                                                                                                                                                 | none                                                       | none                                                                                                                     | `CampaignLine`                                          |
| 3      | **Heritage**, ivory band                                            | Centred: `GroupLockup`, the heritage sentence at `--t-band` (italic tail), one sub-line, `MoreLink` "How the house began"                                                                                                                                                                                                                                                                                                                                                                            | Same, line at 33 px                                                                                                                                                                                                                                                                                                                                                                                                  | none                                                       | Wrapper rises (`.reveal`)                                                                                                | `OneLineBand`                                           |
| 4      | **The cases**, stage                                                | `SectionHead shape="split"` (eyebrow, H2, lead right, `MoreLink` "All jewellery"). `CaseWall layout="stagger" columns={4}` of the featured velvet pieces other than the hero piece (query `getFeaturedProducts(9)`, drop p03: eight today, p01, p02, p04 to p09), at about 313 px each; under it one `.list-links` row "By piece:" with the eight category names linking to their pages                                                                                                              | Head stacked; wall in two columns at about 171 px, right column dropped 64 px; "By piece" row wraps                                                                                                                                                                                                                                                                                                                  | `p01`, `p02`, `p04` to `p09` (lazy, `fetchpriority="low"`) | Case light on scroll (fully lit by 25 % cover); texts rise                                                               | `SectionHead`, `CaseWall`, `ProductCard`                |
| 5      | **The stamp says what's inside**, ivory                             | `SectionHead shape="stack"`; `KaratStamps` four columns with 128 px stamps and fineness bars; foot row with source and `MoreLink` "How a price is built"                                                                                                                                                                                                                                                                                                                                             | 2 × 2, stamps at 65 px                                                                                                                                                                                                                                                                                                                                                                                               | none                                                       | Bars fill on entry                                                                                                       | `SectionHead`, `KaratStamps`                            |
| 6      | **Styles**, stage-raised                                            | `SectionHead shape="centre" size="display"` (no italic); `StylesLine variant="full"` across the wide track; two captions                                                                                                                                                                                                                                                                                                                                                                             | Centred head; vertical line, labels stacked west to east                                                                                                                                                                                                                                                                                                                                                             | none                                                       | Segments draw outward from Dubai; west and east label groups fade in                                                     | `SectionHead`, `StylesLine`                             |
| 7      | **Old gold, on today's scale**, plum, seam                          | 5/6 split. Left: eyebrow, H2, lead (the `site.ts` exchange promise detail), three numbered steps (`.rows`), `MoreLink` "How the exchange works". Right: `Estimator variant="panel"` on plum-deep                                                                                                                                                                                                                                                                                                     | Stacked: copy, then the panel full width                                                                                                                                                                                                                                                                                                                                                                             | none                                                       | Output rolls (confirmed mode) or swaps (pending)                                                                         | `Estimator`                                             |
| 8      | **Occasions**, ivory                                                | `SectionHead shape="split"` with `MoreLink` "All occasions"; four `OccasionWindow`s (about 296 px wide, names only; Festivals carries the active offer note) in one row                                                                                                                                                                                                                                                                                                                              | `.rail` at 74 %, next window peeking, progress hairline, previous and next buttons                                                                                                                                                                                                                                                                                                                                   | `occasions/*.jpg` (interim; shot list item 10)             | Windows rise; frame colour on hover and focus                                                                            | `SectionHead`, `OccasionWindow`                         |
| 9      | **Come in and hold it**, stage                                      | `Panorama field="start"` with eyebrow, H2 and lead over the dark field; then `BranchDoors variant="home"` (route and four doors west to east, opening-soon line); then the closing line (`<p class="h-band">`, centred) and actions ("WhatsApp us" primary, "Call +971 4 255 1288" secondary)                                                                                                                                                                                                        | Panorama as a 240 px band with the head below it; doors stacked on a vertical line; closing line at 33 px; actions as a pair                                                                                                                                                                                                                                                                                         | `story/banner-about.jpg` (lazy)                            | Route draws west to east; doors rise                                                                                     | `Panorama`, `BranchDoors`                               |
| Footer | plum-deep                                                           | §5.3                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | §5.3                                                                                                                                                                                                                                                                                                                                                                                                                 | logo                                                       | none                                                                                                                     | `Footer`                                                |

**Removed from home:** the journal, the FAQ, the six-row promise ledger, the twelve-row collections index, the 1,123 px rate board, the category tiles, the story split with `about-1.jpg`, the stock hero (`story/store-lifestyle.jpg`), `ProofStrip`'s "0% deduction" cell.

**JSON-LD:** unchanged (`itemListSchema` of the featured pieces shown, `jewelryStoreSchema` for the non-flagship open branches).

### 6.2 Jewellery index (`/jewellery/`, WP3)

`ground="stage"`. Title and description unchanged; H1 "Gold and diamond jewellery, by the gram".

1. **Opener, stage**: `PageHead layout="text"`, eyebrow "Jewellery", H1, lead from today's copy (one sentence). Under it `Filters` (karat chips with today's rate, collection chips, sort) controlling both grids.
2. **On the velvet, stage**: `CaseWall layout="grid" columns={4}` of every velvet piece (nine), filterable. No stagger (it is a catalogue, not a moment).
3. **By piece, ivory**: `SectionHead` "By piece" ; a row of `CategoryPlate`s for the nine categories (counts only at 3 or more).
4. **Studio pieces, ivory** (ruled): `PlateGrid` of every studio piece, filterable.
5. **EnquiryBand, plum, seam**: "Ask what we have _in the cases today_", text "We photograph a few pieces; the trays hold many more. Tell us the piece, the karat or the budget and we will send what we have.", WhatsApp `whatsappGeneral()`, secondary "Find a branch".

Phones: chips scroll horizontally (`overflow-x: auto`, 44 px chips), walls two-up, category plates as a `.rail` at 44 %.

### 6.3 Category (`/jewellery/{category}/`, WP3)

The ground follows the category's `ground` field (WP0 adds it; `necklaces` is `velvet`, every other category `lilac`, coins and bars `lilac` with no photograph).

- **Velvet category (necklaces)**, `ground="stage"`: `PageHead layout="split" size="display" italic` with the category name (H1 from content `name`), the intro paragraph, and in the `media` slot a small salon of two or three `StageImage`s at 300 px (the first three pieces, `mask="spot"`, the first of them the page's `priority` image). Then the karat chips (`Filters`), then `CaseWall layout="grid"` (stage). Then `EnquiryBand` (plum, seam): "Ask what we have in _{necklaces}_ today" with `whatsappForRange(name)`.
- **Studio category**, `ground="ivory"`: `PageHead layout="split" size="display" italic`, the cut-out of the first piece on a lilac `Plate` at its native width in the `media` slot (the `priority` image), the intro; then `Filters` and `PlateGrid` (ivory); then `EnquiryBand` (plum).
- **No photographed pieces** (coins and bars): `PageHead layout="text"`, the intro, a typeset parchment square "Coins and bars", today's 24K rate (`RateFigure`), and an `EnquiryBand` "Ask which _weights are in stock_" (WhatsApp prefilled: "what is today's price for gold coins and bars?").
- One piece only: no filters; the card sits alone with "One piece photographed so far. Ask us for more." Counts shown only at 3 or more. No FAQ on category pages.

### 6.4 Piece (`/jewellery/{category}/{slug}/`, WP3)

`ground="stage"`, `piece={{ name, sku, url }}` (phone bar piece variant). Title, description and `productSchema` unchanged.

1. **Opener, stage** (velvet piece): breadcrumbs; wide track, 7/5. Left (columns 1 to 7): `PieceStage` (p0x at 600 px, `mask="pool"`, `stage` from content, `priority`, `morph="target"`, sticky). Right (8 to 12): `PieceTicket` (sticky). For a studio piece the opener is ivory and the stage is a lilac `Plate` at native size (`priority`).
2. **About the piece, stage**: 5/7 split. Left: the description as a Cormorant italic lead (`--t-h3`, 300); right: `SpecTable` (karat and stamp, style and origin, metal colour, finish, stones, certification, weight, occasion, availability, reference). Under both, `AssuranceLedger variant="condensed"` (three promises) in a three-column row.
3. **Your quote, in three lines, ivory**: `QuoteLines karat={piece karat}`.
4. **From the same counter, stage**: `SectionHead` "From the same counter"; `CaseWall layout="grid" columns={3}` of three pieces (same collection first, then same category), `light="static"`.
5. **Slim estimator, plum, seam**: `Estimator variant="slim" karat={piece karat}`.
6. **Before you decide, ivory**: `Faq` from `faqs/product.json`.

Phones: the stage first, full width inside the gutters (at most 600 px), then the ticket edge to edge (no border, ivory band), then the rest in order; the phone bar carries "Ask about this piece".

### 6.5 Collections index (`/collections/`, WP3)

`ground="stage"`. H1 "Collections" (unchanged).

1. **Opener, stage**: `PageHead layout="text"`, eyebrow "Styles", H1, lead "Our counters carry seven goldsmithing styles from west and east of Dubai, and five more collections by stone, by age and by commission."
2. **The line, stage-raised**: `StylesLine variant="full"`.
3. **Every collection, stage**: a grid of collection cards (3 columns desktop, 2 phones): the collection's first velvet piece as a `StageImage` (cap 320), or a lilac `Plate` (Diamonds, Kids), or a `TypesetPlate` (Kuwaiti, Singapore until the owner confirms a photograph); name in Cormorant italic `--t-h3`; `origin`; karats with today's rate for the first karat (`RateFigure`). Each card links to its page.
4. **EnquiryBand**, plum, seam: "Not sure which style? _Tell us the occasion._", WhatsApp general, secondary "Occasions".

### 6.6 Collection (`/collections/{slug}/`, WP3)

`ground="stage"`. A chapter page.

1. **Opener, stage**: `PageHead layout="split" mediaFirst size="display" italic`: media is the collection's first velvet piece (`StageImage mask="pool" cap={520} stage priority`), or a lilac `Plate`, or a `TypesetPlate` (Kuwaiti, Singapore); text: eyebrow = `origin`, H1 = `shortName` collection name as today ("Kolkata Collection"), the `summary` as lead, `StylesLine variant="mini" lit={id}` when the collection has a longitude, the `hallmarks` as a ruled list, and the karats with today's rate per karat (`RateFigure` per karat).
2. **The story, ivory band**: the Markdown body centred at `--container-narrow`, `--t-lead`, Cormorant italic first sentence.
3. **The pieces, stage**: `CaseWall` (velvet) and, if any, an ivory `PlateGrid`; none photographed: one `TypesetPlate` with WhatsApp.
4. **EnquiryBand**, plum, seam: "Ask us for pieces in the _{Kolkata}_ style", `whatsappForRange(name)`, secondary "Book a visit" (`routes.contact?reason=…`).

### 6.7 Occasions index and occasion (`/occasions/`, `/occasions/{slug}/`, WP5)

`ground="ivory"` (portraits are pale-ground images; rule 1).

- **Index**: `PageHead layout="text"` (H1 "Jewellery by occasion", unchanged), four `OccasionWindow`s with `summary` at up to 392 px (2 × 2 on desktop at 64em, one column on phones), the Festivals window carrying the active offer note; `EnquiryBand` "Planning for a date? _Tell us when._"
- **Occasion**: `PageHead layout="split" mediaFirst`: media is the portrait window (`OccasionWindow`'s figure alone, at most 392 px wide, the page's `priority` image); text: H1 (content name or the existing page H1), summary, actions (WhatsApp prefilled with the occasion, "Book a visit"). Then the Markdown body (ivory, `.prose`). Then **suggested pieces**: velvet pieces tagged with the occasion in a stage `CaseWall`; studio pieces in an ivory `PlateGrid`; then the suggested categories as a `.list-links` row. **Wedding** adds a "Styles for a wedding" row linking to the collections its body names (Kolkata, Temple, Antique, Kuwaiti), as text links until bridal photography exists. **Festivals** adds `RateInstrument variant="compact"` (stage section) and `CampaignLine` when an offer is active. Ends with `EnquiryBand` "Book a _{bridal}_ viewing at a branch".

### 6.8 Gold rate (`/gold-rate/`, WP4)

`ground="stage"`. Title and H1 unchanged ("Today's gold rate in Dubai"). The contents sidebar is removed.

1. **The board, stage**: breadcrumbs, eyebrow "Gold rate · Dubai", H1, `RateInstrument variant="page"` (numeral left, the four keys as a vertical board right with fineness and the change since the previous day), actions "Ask on WhatsApp" (`whatsappGoldRate()`) and "Find a branch". The numeral is the LCP candidate; no image.
2. **Karat guide, ivory**: `SectionHead` eyebrow "Karat guide", H2 "What each _karat holds_"; `KaratStamps variant="band"` (no "How a price is built" link).
3. **Our record, stage-raised**: `SectionHead` "Our record"; `RateRecord` (honest "starts on" state until seven snapshots).
4. **How a price is built, ivory** (`id="price"`): `QuoteLines karat="22k"` with title "How a price is built," accent "in three lines", then the sentence "No prices online. Each piece is quoted on request at the day's rate."
5. **Old gold, plum, seam**: the same composition as home section 7.
6. **Buy or exchange at today's rate, stage**: `SectionHead` and `BranchDoors variant="compact"`.
7. **Questions, ivory**: `Faq` from `faqs/gold-rate.json`.

### 6.9 Gold exchange (`/gold-exchange/`, WP4)

`ground="stage"`. **Title** becomes "Exchange Old Gold in Dubai at Today's Rate" and the **H1** "Exchange old gold at today's rate" until `site.exchange.confirmed` is true (the owner may then restore the "0% deduction" wording). Description: "Bring old gold to any of our four branches: tested in front of you, weighed, and credited at the day's rate against a new piece. Work out its fine gold first." (adjust to 70 to 160 characters).

1. **Opener, plum** (header stays stage; seam under the header): breadcrumbs, eyebrow "Old gold", H1, lead (the `site.ts` exchange promise detail), `Estimator variant="panel" id="estimator"` beside it (5/7 on desktop; stacked on phones, H1 first).
2. **Tested in front of you, stage**: `StepStrip` (numerals): 01 "Tested at the counter, in front of you", 02 "Weighed, with stones, springs and other parts set aside", 03 "Credited at the day's rate for its karat, against a new piece".
3. **Read your own hallmark, ivory**: `SectionHead` "Read your _own hallmark_", lead "Look inside the clasp or the band for one of these numbers."; `KaratStamps variant="compact"`.
4. **What to bring, parchment**: three rows: "The pieces", "Any receipts you have", "Your Emirates ID or passport"; then "Ask us for the exchange terms before you come; an offer running at the time can change them."
5. **Questions, ivory**: `Faq` from `faqs/gold-exchange.json`.
6. **Bring it to a branch, stage**: `BranchDoors variant="compact"`.

### 6.10 Custom jewellery (`/custom-jewellery/`, WP5)

`ground="stage"`. Title and H1 unchanged ("Custom gold jewellery, made to order").

1. **Opener, stage**: `PageHead layout="split" mediaFirst`, media p07 (`StageImage mask="pool" cap={520} priority`), H1, lead (the `customised` collection summary: "Bring a sketch, a photo or an heirloom to remake; we design and make it in 22K or 18K."), actions WhatsApp (`whatsappCustom()`) and "Book a consultation" (`routes.contact?reason=custom`).
2. **How it works, ivory**: `StepStrip`: 01 "Bring a sketch, a photo or an heirloom", 02 "Design, weight and making charge agreed in writing", 03 "Cast only when you approve the design", 04 "Made in 22K or 18K".
3. **Tell us about it, plum, seam**: `ContactForm variant="brief"`.
4. **Questions, ivory**: `Faq` from `faqs/custom-jewellery.json`.

### 6.11 Branches (`/stores/`, `/stores/{slug}/`, WP5)

- **Index**, `ground="stage"`: `PageHead` (eyebrow "Branches", H1 "Our branches across the UAE" unchanged, lead "Four branches in Dubai, Sharjah and Abu Dhabi. Message the one nearest you before you come." with counts from data); `BranchDoors variant="full"` (route drawn, every door expanded, Maps by link only, no iframe); the opening-soon row; `Faq` from `faqs/stores.json` (ivory); `EnquiryBand` (plum, seam) "Not sure which branch? _Ask us._"
- **Branch**, `ground="stage"`: `PageHead layout="split" size="display"`: H1 the branch `name`, eyebrow the emirate (and "Flagship" with the C-ring), the `BranchDoors variant="compact" lit={id}` route miniature under the H1; `media` is a parchment **facts plate** (the venue set large in Cormorant italic and the emirate, 3:2) until branch photographs exist (shot list item 1); never another image. Then a **facts ledger** (ivory, `.rows`): address, directions, nearest metro, parking, facilities, phone (or group line), "Open in Google Maps" (external), the hours by day with the break labels, `hours.note`, the "As listed on Google, checked {date}" caption until `hours.confirmed`, the open-now line, and the branch's own Google rating as dated text linked to its listing (WP5, owner decision in §0). Then **Book a visit** (plum, seam): `ContactForm variant="visit" branch={id}`. Then the other doors (stage, `BranchDoors variant="compact"`). JSON-LD `JewelryStore` unchanged.

### 6.12 About (`/about/`, WP5)

`ground="ivory"`. Title and H1 unchanged ("About Classic Jewels & Diamonds").

1. **Opener, ivory**: `PageHead layout="centre"`, `GroupLockup` above the H1, lead = the heritage sentence (from `site.group`).
2. **The group, ivory, ruled**: three ruled chapters from `site.group.divisions` (Classic Bullion: the group's first business; Classic Realty: since 2022; Classic Jewels & Diamonds: since 2024), each a short paragraph; the group's trade line.
3. **From bar to bangle, stage**: `BarToBangle`.
4. **Our terms, ivory**: `AssuranceLedger variant="condensed"` with `MoreLink` "Our promise".
5. **Come in, stage**: `BranchDoors variant="compact"`.

No pull quotes in the margin, no invented milestones.

### 6.13 Contact and visit (`/contact/`, WP5)

`ground="stage"`. Title and H1 unchanged.

1. **Opener, stage**: `PageHead layout="split"`: H1, lead "WhatsApp is fastest. Calls go straight to the counter." In the `aside`, three channels as large rows: WhatsApp (primary button), Call (+971 4 255 1288), Email (`site.email`).
2. **Book a visit, plum, seam**: `ContactForm variant="visit" reference={?piece} topic={?reason}` (query parameters read at runtime by `form.ts`, since the page is static).
3. **Branches, stage-raised**: `BranchDoors variant="compact"`.

### 6.14 Offers (`/offers/`, `/offers/{slug}/`, WP5)

`ground="ivory"`. Index: `PageHead`, then each active offer as a `CampaignLine tone="ivory"` row with its summary; no active offer: "No offers are running today. Ask us about the day's rate." and an `EnquiryBand`. Offer page: `PageHead` (H1 = offer `headline`, eyebrow "Until {endsOn}"), the body (`.prose`), the terms as a ruled list, `RateInstrument variant="compact"` when the offer concerns the rate (Diwali), actions "Ask on WhatsApp" (`whatsappMessage`) and "Find a branch", `Faq` from `faqs/offers.json`. Expired offers are not built (unchanged).

### 6.15 Our promise (`/our-promise/`, WP5)

`ground="ivory"`. `PageHead`, `AssuranceLedger variant="full"` (the exchange row reads its `site.ts` title only when `site.exchange.confirmed`, otherwise "Old gold exchanged at the day's rate" with the detail), the return policy text from `site.returnPolicy` with the statutory line, `Faq` from `faqs/our-promise.json`, `EnquiryBand`.

### 6.16 Journal (`/journal/`, `/journal/{slug}/`, WP5)

`ground="ivory"`. Index: `PageHead layout="text"`, `JournalCard`s in a 3-column grid (1 on phones), no reading time. Article: `PageHead layout="text"` (H1 = headline), the date, the cover at most 750 CSS px (its source width), `.prose` body, a 2 px `--rule-gold` reading-progress hairline fixed under the header (`scroll(root)`, `no-preference` and `@supports` only; hidden otherwise), related collections as a `.list-links` row, `EnquiryBand`.

### 6.17 Legal pages (`/privacy-policy/`, `/terms/`, `/disclaimer/`, WP5)

`ground="ivory"`. `PageHead layout="text"`, `.prose` at `--prose`, no `EnquiryBand` (a `MoreLink` "Contact us" closes the page).

### 6.18 404 and thank-you (WP5)

- **404**, `ground="stage"`, `noindex`: a large C-ring (`Icon c-ring` at 96 px, `--wipe`), H1 "Nothing at this address." (unchanged), the lead "The page may have moved. These are the pages people look for most.", four links as `link-wipe`s: Jewellery, Today's gold rate, Branches, Contact.
- **Thank-you**, `ground="stage"`, `noindex`: H1 "Message received" (unchanged), "We reply during shop hours, usually on WhatsApp." (no promised time), `MoreLink`s to Jewellery and Today's gold rate.

---

## 7. Client JavaScript

**Rules.** Bundled same-origin modules from `src/scripts/` only; no inline scripts (the CSP blocks them and `scripts/audit-dist.mjs` fails the build); no third-party scripts before consent; no libraries; no ClientRouter. **15 KB minified per page in total.** No script hides content before it runs, inserts content above existing content, or is needed to read a fact. Every script checks `matchMedia('(prefers-reduced-motion: reduce)')` before animating. Storage access is wrapped in `try/catch`.

| Script                   | Owner | Loaded by                             | Responsibilities                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Budget (min)            | Without it                                                                                                                                                      |
| ------------------------ | ----- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nav.ts` (changed)       | WP1   | `BaseLayout`                          | Mirror `aria-expanded` on every `popovertarget` invoker (`toggle` event); hover intent for the mega panel (open after 150 ms, close 200 ms after leaving, mouse only, via `showPopover`/`hidePopover`); keep the last previewed style (`data-active`); drawer fallback where `HTMLButtonElement.prototype.commandForElement` is missing (`showModal`, close buttons); backdrop click closes the drawer; hide the phone bar while a field has focus; mark today's row in hours tables (`data-hours-days`)                             | ≤ 1.6 KB (today 2.0)    | Menus open by click (popover and `commandfor` are declarative); on iOS before 26.2 the drawer needs this script, and every page stays reachable from the footer |
| `rate.ts` (changed)      | WP4   | `BaseLayout`                          | As today: idle refresh from `PUBLIC_GOLD_RATE_ENDPOINT`, 30-minute `sessionStorage` cache, never apply an older posting. New: roll changed digits of `[data-roll]` figures (via `roll.ts`), plain text swap elsewhere; update `[data-rate-time]` to "checked {HH:MM}" (Dubai time of the fetch) and `[data-rate-delta]` to "Up/Down AED {x} since {baked time}" only when a value changed; clear `data-stale` markers when a newer date arrives; re-run the sheen (`data-sheen="again"`); dispatch `cj:rates` with the new `perGram` | ≤ 3.6 KB (today 2.7)    | The baked rate, correct for its time, stays                                                                                                                     |
| `karat.ts` (new)         | WP0   | `BaseLayout`                          | On `change` of any `[data-karat-input]`, set `html[data-karat]` and `sessionStorage['cj:karat']`; on load, apply the stored karat to `html` and to estimator radios (never to the hero instrument's default)                                                                                                                                                                                                                                                                                                                         | ≤ 0.4 KB                | Followers show 22K; the instrument still switches by CSS                                                                                                        |
| `motion.ts` (new)        | WP0   | `BaseLayout`                          | Image fade: for `img[loading="lazy"]` not yet `complete` and below the first viewport, set `data-fade="wait"`, then `in` on `load` (never on the `priority` image, never on images already painted); rails: un-hide `[data-rail-prev]`/`[data-rail-next]` buttons and scroll one card per press (`behavior: smooth` unless reduced motion), disabling them at the ends                                                                                                                                                               | ≤ 0.7 KB                | Images appear as they load; rails scroll by touch, trackpad and keyboard                                                                                        |
| `piece-morph.ts` (new)   | WP0   | `CaseWall`, `PlateGrid`, `HomeHero`   | On `pageswap` with a view transition, find the figure whose `data-morph-href` matches the destination path and set `view-transition-name: piece`; clear it on `pageshow` (back/forward cache)                                                                                                                                                                                                                                                                                                                                        | ≤ 0.35 KB               | Plain cross-fade                                                                                                                                                |
| `roll.ts` (new, module)  | WP0   | imported by `rate.ts`, `estimator.ts` | `roll(el, next)`: for each changed character build `.roll-d` (ghost + two-item reel, `data-dir` up or down, `--delay` = position from the right × `--roll-stagger`), restore plain text after `--dur-roll` + stagger; plain swap under reduced motion                                                                                                                                                                                                                                                                                | ≤ 0.5 KB (shared chunk) | n/a                                                                                                                                                             |
| `estimator.ts` (new)     | WP4   | `Estimator` (panel)                   | Read `data-mode`, `data-rates`, fineness; on input (220 ms debounce), steppers, karat and branch change: compute fine-gold grams (pending) or the dirham figure (confirmed), write the output (roll in confirmed mode), the sum line and the WhatsApp `href`; clamp grams to 0.5 to 500; re-run on `cj:rates`; adopt the stored karat on load                                                                                                                                                                                        | ≤ 1.3 KB                | The worked example (10 g of 22K) and its WhatsApp link stay correct                                                                                             |
| `filter.ts` (changed)    | WP3   | `Filters`                             | As today, plus several grids per filter block (`data-filters="grid-velvet grid-studio"`), hiding a grid's section when nothing matches, karat chips                                                                                                                                                                                                                                                                                                                                                                                  | ≤ 1.8 KB                | Plain category links are shown instead (as today)                                                                                                               |
| `form.ts` (changed)      | WP5   | `ContactForm`, `PieceTicket`          | Copy reference (as today); contact form fetch submit (as today); "Send on WhatsApp" composes a `wa.me` message from every visit field; prefill from `?piece=`, `?reason=`, `?branch=`                                                                                                                                                                                                                                                                                                                                                | ≤ 2.2 KB                | The form posts to `contact.php`; copy shows the reference                                                                                                       |
| `open-now.ts` (new, WP5) | WP5   | `StoreCard`, branch pages             | Fills every `[data-open-now]` from its JSON periods in Asia/Dubai time ("Open now, until 22:30", "Closed now, opens at 16:00", "Closed now, opens tomorrow at 10:00"), sets `data-state`, refreshes each minute; 0.8 KB                                                                                                                                                                                                                                                                                                              |
| `hero.ts` (new, WP6)     | WP2   | `HomeHero`                            | The case light: the first glint 400 ms after the priority image loads, the arrow and name buttons (dim 200 ms, swap, lit 400 ms, glint), one automatic cycle of seven seconds a piece that stops after returning to the first piece and pauses on hover, focus or a hidden tab; idle preload of the other three images; nothing under reduced motion; 1.2 KB                                                                                                                                                                         |

**Per-page totals (measured from `dist/` in WP6, 15 October 2026; every `<script src>` plus its static imports):** home 11.6 KB minified / 6.3 KB gzipped (nav, rate, roll, karat, motion, piece-morph, hero, estimator, open-now); branch pages 10.9 / 5.8 KB; `/contact/` 10.8 / 5.8 KB; piece pages 10.4 / 5.5 KB; `/jewellery/` and category pages 10.0 / 5.2 KB; `/gold-rate/` and `/gold-exchange/` 10.0 / 5.3 KB; every other page 7.8 to 8.6 KB minified (4.0 to 4.6 KB gzipped). All inside the 15 KB budget; no inline scripts on any page (`npm run audit`).

**Rate honesty in code.** Production never simulates a refresh. Prototype-only behaviour (fake refreshes, sample data) is allowed only behind a `?demo=` query flag in `public/_proto/` and never ships. The 21K figure 446.25 that appeared in a brief exists in no source and must not appear anywhere; every figure on screen comes from `src/content/rates/*.json` or the live feed.

---

## 8. Copy

### 8.1 Voice

A jeweller across the counter: specific, plain, British English. Never "Welcome to", "Discover", "Elevate", "timeless", "timeless elegance", "luxury", "exquisite", em dashes or emoji. No invented hours, prices, stock, statistics, reviews or promises. Headlines name a thing; only full sentences (the heritage band, the closing line) end in a full stop. Every figure and place name in the strings below is read from data at build; braces mark where.

### 8.2 Home, exact strings

| Section                   | Element                                  | String                                                                                                                                                                                                                                                  |
| ------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 Hero                    | H1 kicker (span, Plex 500 16 px)         | Gold and diamond jewellers in {Dubai, Sharjah and Abu Dhabi}                                                                                                                                                                                            |
|                           | H1 line (span, `.h-hero`)                | Gold by the gram, _at today's rate_                                                                                                                                                                                                                     |
|                           | Instrument label                         | {22K} today, AED per gram                                                                                                                                                                                                                               |
|                           | Keys                                     | 24K · 999 · {505.75} / 22K · 916 · {468.25} / 21K · 875 · {449.00} / 18K · 750 · {384.75}                                                                                                                                                               |
|                           | Status line 1                            | Dubai Jewellery Group suggested retail rate, {13 October}, {12:02}                                                                                                                                                                                      |
|                           | Status line 2                            | Before making charges and 5% VAT                                                                                                                                                                                                                        |
|                           | Status line 3 (only after a real change) | {Down} AED {3.00} since {12:02}                                                                                                                                                                                                                         |
|                           | Stale status line 1                      | Last published rate, {11 October}                                                                                                                                                                                                                       |
|                           | No-rate state                            | Call for today's rate · {+971 4 255 1288}                                                                                                                                                                                                               |
|                           | Primary button                           | Ask on WhatsApp                                                                                                                                                                                                                                         |
|                           | Secondary button                         | Find a branch                                                                                                                                                                                                                                           |
|                           | Piece caption                            | _{Antique Pearl-Drop Bib Necklace}_ / {22K} · {Antique} · {CJ-NK-003} / See the piece                                                                                                                                                                   |
|                           | Fact 1                                   | **{4.9}** on Google, from {680} reviews of our Deira branch / as of {13 October 2026}                                                                                                                                                                   |
|                           | Fact 2                                   | **{4}** branches in {Dubai, Sharjah and Abu Dhabi} / More opening in Abu Dhabi                                                                                                                                                                          |
|                           | Fact 3                                   | **916** the UAE hallmark on 22K / 875 on 21K, 750 on 18K                                                                                                                                                                                                |
| 2 Campaign (while active) | Label                                    | Until {10 November}                                                                                                                                                                                                                                     |
|                           | Line                                     | {Diwali 2026:} _{book the rate, no making charge on selected pieces}_                                                                                                                                                                                   |
|                           | Actions                                  | See the offer · Ask on WhatsApp                                                                                                                                                                                                                         |
| 3 Heritage                | Lockup                                   | A Classic Group house                                                                                                                                                                                                                                   |
|                           | Band (H2)                                | The Classic Group has been {in the gold trade for over 35 years}, _{more than 16 of them in the UAE}._                                                                                                                                                  |
|                           | Sub-line                                 | The group began in bullion, and still works in {bullion trading, scrap gold buying and refining}. In {2024} it opened Classic Jewels & Diamonds at {Gold Souq Extension, Deira}.                                                                        |
|                           | Link                                     | How the house began                                                                                                                                                                                                                                     |
| 4 Cases                   | Eyebrow                                  | On the velvet                                                                                                                                                                                                                                           |
|                           | H2                                       | {Eight} necklaces, {eight} styles _(when every piece is from a different collection; otherwise "{Eight} necklaces from the cases")_                                                                                                                     |
|                           | Lead                                     | Open a piece for its page, or message us for its weight and today's price.                                                                                                                                                                              |
|                           | Aside link                               | All jewellery                                                                                                                                                                                                                                           |
|                           | Card                                     | {COLLECTION} / _{Kolkata Fringe Choker}_ / {22K} · AED {468.25} a gram today / Ask on WhatsApp                                                                                                                                                          |
|                           | Row under the wall                       | By piece: {Rings · Earrings · Pendants · Bangles · Bracelets · Chains · Anklets · Coins and bars}                                                                                                                                                       |
| 5 Stamps                  | Eyebrow                                  | Know your gold                                                                                                                                                                                                                                          |
|                           | H2                                       | The stamp says _what's inside_                                                                                                                                                                                                                          |
|                           | Lead                                     | Every piece carries the UAE hallmark for its karat, and your invoice prints its weight and fineness.                                                                                                                                                    |
|                           | Column (×4)                              | {22K} / {916} / {91.6}% gold / AED {468.25} a gram today / In our cases: {Kolkata, Antique, Rajkot and eight more}                                                                                                                                      |
|                           | 24K use line                             | In our cases: coins and bars                                                                                                                                                                                                                            |
|                           | Foot                                     | Rates: Dubai Jewellery Group suggested retail rate, {13 October}, {12:02}. · How a price is built                                                                                                                                                       |
| 6 Styles                  | Eyebrow                                  | Styles                                                                                                                                                                                                                                                  |
|                           | H2 (display, centred)                    | From Kuwait to Kolkata                                                                                                                                                                                                                                  |
|                           | Lead                                     | Our counters carry {seven} goldsmithing styles, from west and east of Dubai. Choose one to see its pieces.                                                                                                                                              |
|                           | Dubai label                              | Dubai / Our {four} branches                                                                                                                                                                                                                             |
|                           | Caption 1                                | Schematic, west to east. Each style sits roughly where it comes from.                                                                                                                                                                                   |
|                           | Caption 2                                | Also at the counter: {Antique, Gemstone, Diamonds, Kids and Made to order}.                                                                                                                                                                             |
| 7 Old gold                | Eyebrow                                  | Old gold                                                                                                                                                                                                                                                |
|                           | H2                                       | Old gold, _on today's scale_                                                                                                                                                                                                                            |
|                           | Lead                                     | {Old gold is tested in front of you and credited by weight at the day's rate against a new piece.} _(the `site.ts` exchange promise detail)_                                                                                                            |
|                           | Steps                                    | 1 Tested at the counter, in front of you / 2 Weighed, with stones and clasps set aside / 3 Credited at the day's rate for its karat                                                                                                                     |
|                           | Link                                     | How the exchange works                                                                                                                                                                                                                                  |
|                           | Panel title (h3)                         | Your old gold                                                                                                                                                                                                                                           |
|                           | Fields                                   | Weight · grams · "From your receipt, or your best estimate" / Karat · "Stamped inside the piece" / Bring it to · {branches} · Not sure yet                                                                                                              |
|                           | Output, pending                          | {9.16} g of fine gold / {10} g of {22K} is {91.6}% gold: about {9.16} g of fine gold. / We test it at the counter and credit it at the day's rate for its karat. Ask us for the exchange terms before you come.                                         |
|                           | Output, confirmed                        | AED {4,682.50} / {10} g × AED {468.25} a gram ({22K}) = AED {4,682.50} / An estimate, not an offer. The credit is set at the counter after testing, against a new piece.                                                                                |
|                           | Button                                   | Ask about exchanging it                                                                                                                                                                                                                                 |
|                           | WhatsApp message                         | Hello Classic Jewels, I have about {10} g of {22K} old gold and would like to bring it to the {Gold Souq Extension, Deira} branch to be tested and weighed. What are the exchange terms?                                                                |
| 8 Occasions               | Eyebrow                                  | Occasions                                                                                                                                                                                                                                               |
|                           | H2                                       | For the wedding, and every year after                                                                                                                                                                                                                   |
|                           | Aside link                               | All occasions                                                                                                                                                                                                                                           |
|                           | Windows                                  | _Wedding_ / _Anniversary_ / _Birthday_ / _Festivals_ + note "{Diwali} offers until {10 November}" (only while active)                                                                                                                                   |
| 9 Branches                | Eyebrow                                  | Branches                                                                                                                                                                                                                                                |
|                           | H2                                       | Come in _and hold it_                                                                                                                                                                                                                                   |
|                           | Lead                                     | {Four} branches in {Dubai, Sharjah and Abu Dhabi}. Message the one nearest you before you come.                                                                                                                                                         |
|                           | Route caption                            | Schematic, west to east. Not to scale.                                                                                                                                                                                                                  |
|                           | Deira door                               | DUBAI · FLAGSHIP / Gold Souq Extension, Deira / {Shop 6, Mariyam Plaza, behind RAK Bank} / {Gold Souq or Al Ras metro, about ten minutes on foot} / {Covered parking in the same building} / Call {+971 4 255 1288} · Directions · WhatsApp this branch |
|                           | Other doors                              | {SHARJAH} / {Rolla Mall, Sharjah} / Call or message for the shop number and today's hours. / Call the group line {+971 4 255 1288} · Directions · WhatsApp this branch                                                                                  |
|                           | Opening soon                             | Opening soon: {Mohamed bin Zayed City, Abu Dhabi; Musaffah and Al Ain}. Dates to follow.                                                                                                                                                                |
|                           | Closing line                             | Tell us which piece you want to see, _and which branch suits you._                                                                                                                                                                                      |
|                           | Actions                                  | WhatsApp us · Call {+971 4 255 1288}                                                                                                                                                                                                                    |

Word budget (desktop `<main>`): hero 75, campaign 20, heritage 50, cases 140, stamps 85, styles 85, old gold 110, occasions 20, branches 160; total about 745.

### 8.3 Heading shapes on the home page

| Section      | Shape                                  | Italic accent                    |
| ------------ | -------------------------------------- | -------------------------------- |
| Hero         | Two-level H1, left                     | Yes, the end of the display line |
| Heritage     | Centred band sentence                  | Yes, the second clause           |
| Cases        | `split`, left                          | No                               |
| Stamps       | `stack`, left, over four 128 px stamps | Yes, two words                   |
| Styles       | `centre`, display size                 | No                               |
| Old gold     | Left column of a split                 | Yes                              |
| Occasions    | `split`, left                          | No                               |
| Branches     | Over the panorama                      | Yes                              |
| Closing line | Centred band sentence                  | Yes                              |

### 8.4 Chrome strings

| Element                    | String                                                                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nav                        | Jewellery · Styles · Occasions · Gold rate · Old gold · Branches · About                                                                                 |
| Header button              | WhatsApp                                                                                                                                                 |
| Rate chip (screen readers) | {22K} {468.25}, AED per gram, today's rate. Show all karats                                                                                              |
| Rate popover               | Today, AED per gram / {rows} / Dubai Jewellery Group suggested retail rate, {13 October}, {12:02} / Before making charges and 5% VAT / Today's gold rate |
| Mega column labels         | By piece · By style · Visit us · Today                                                                                                                   |
| Drawer                     | Menu · Close · {destinations} · WhatsApp us · Call {+971 4 255 1288}                                                                                     |
| Phone bar                  | WhatsApp · Call · Branches · {468.25} {22K} rate                                                                                                         |
| Phone bar, piece           | Ask about this piece · Call · Visit                                                                                                                      |
| Footer slogan              | Every jewel _has a tale._                                                                                                                                |
| Footer lockup line         | A Classic Group house. Jewellers since {2024}; the group has been {in the gold trade for over 35 years, more than 16 of them in the UAE}.                |
| Footer columns             | Branches · Today, AED per gram · Ask us · The house                                                                                                      |

---

## 9. Implementation plan

### 9.1 Order and ownership rules

```
WP0 Foundations (alone)  ──►  WP1 Chrome ─┐
                              WP2 Home    ├─►  WP6 Integration (alone)
                              WP3 Catalogue│
                              WP4 Gold    │
                              WP5 Places  ┘
```

1. **WP0 runs first and alone.** It may edit any file in the repository, including minimal edits to existing pages and components so that `npm run check` stays green after the schema and token changes (for example a guard where a collection `image` became optional). When WP0 merges, the site builds, every existing page renders on the new tokens, and every shared component exists, complete or as a contract stub.
2. **WP1 to WP5 run in parallel** and edit **only the files they own** (lists below). Everything else is read-only to them. New files are allowed only inside their own folders or file names listed here.
3. **Frozen after WP0** (no package edits them; requests go to the lead, who applies them between merges): `src/styles/tokens.css`, `src/styles/base.css`, `astro.config.mjs`, `src/layouts/BaseLayout.astro`, `src/components/ui/*`, the WP0 sections (`OneLineBand`, `EnquiryBand`, `CampaignLine`, `QuoteLines`, `StepStrip`, `OccasionWindow`), `src/data/site.ts`, `src/content.config.ts`, `src/content/**`, `src/lib/*`, `src/scripts/karat.ts`, `motion.ts`, `piece-morph.ts`, `roll.ts`, `public/_headers`, `public/.htaccess`, `public/speculation-rules.json`, `package.json`, `lighthouserc.json`, `CLAUDE.md`.
4. **Contract stubs.** A stub owned by WP3, WP4 or WP5 keeps its `Props` interface exactly as written in §5. Its owner replaces the internals; consumers build against the interface and accept that the final look arrives when the owner merges.
5. **Every package** ends with the common acceptance checks (§9.9) on the pages it owns, and lists any interface request in its pull request description.

### 9.2 WP0 Foundations

**Goal.** The new ground: tokens, global CSS, fonts, layout, primitives, content fields, shared scripts, stubs, budgets and tools.

**Files owned (create or edit)**

- `src/styles/tokens.css`, `src/styles/base.css` (§2.1, §3.2 verbatim, then adjusted only if `astro check` or a browser shows an error).
- `astro.config.mjs` (§4.3; AVIF banding test and `smartSubsample`).
- `scripts/subset-fonts.mjs`, `src/assets/fonts/*.woff2`, `package.json` (`subset-font` pinned; scripts `fonts:subset`, `audit:design`).
- `scripts/design-audit.mjs` (Appendix B), `.gitignore` (`.shots/`).
- `src/layouts/BaseLayout.astro` (§5.2).
- `src/lib/tones.ts` (new), `src/lib/rates.ts` (add `fetchedAt: string | null` to `RatesAtBuild`, the newest snapshot's `fetchedAt`), `src/lib/format.ts` (add `formatRateTime(iso)` → "12:02" and `formatRateDate(iso)` → "13 October", both Asia/Dubai), `src/lib/content.ts` (add `photoGround(product)`, `splitByGround(products)`, `collectionsWithKarat(collections, karat)`, `firstVelvetProduct(collectionId)`), `src/lib/roll.ts` (new).
- `src/data/site.ts`:
  - `group.experienceLead: 'in the gold trade for over 35 years'`, `group.experienceTail: 'more than 16 of them in the UAE'`, and `experience` built from them (`TODO(owner)` kept).
  - `reviews.of: 'our Deira branch'`.
  - `rate: { source: 'Dubai Jewellery Group', sourceLong: 'Dubai Gold & Jewellery Group', basis: 'suggested retail rate', excludes: 'Before making charges and 5% VAT', vat: 0.05 }`.
  - `exchange: { confirmed: false, basis: 'posted-rate', buyingDiscount: {}, maxGrams: 500 }` with the `TODO(owner)` comment of §5.4.
  - `services: { callback: false, morePhotos: false }` (`TODO(owner)`, ask 12): gates the "Ask us to call you" row and the "Ask on WhatsApp for another photograph" note.
  - `Branch` gains `routeOrder?: number`, `shortAddress?: string`, `metro?: string`; Deira gets `routeOrder: 2`, `shortAddress: 'Shop 6, Mariyam Plaza, behind RAK Bank'`, `metro: 'Gold Souq or Al Ras metro, about ten minutes on foot'`; Madinat Zayed 1, Rolla Mall 3, Safari Mall 4.
- `src/content.config.ts`:
  - products: `images[].ground: z.enum(['velvet', 'lilac']).default('lilac')`; `stage: z.string().regex(/^#[0-9a-f]{6}$/i).optional()`.
  - collections: `shortName: z.string()`; `longitude: z.number().min(-180).max(180).optional()`; `image` and `imageAlt` optional (with a refinement: `imageAlt` required when `image` is present); `imageGround: z.enum(['velvet', 'lilac']).default('velvet')`.
  - categories: `ground: z.enum(['velvet', 'lilac']).default('lilac')`.
- `src/content/**` data edits:
  - `ground: 'velvet'` on the images of the nine p01 to p09 products; `stage: '#1b1740'` on `ruby-emerald-gold-necklace` (p06, the lighter violet velvet).
  - `fine-gold-chain.md`: `draft: true`. **Withdrawn:** `products/chain.jpg` (and `collections/singapore.jpg`, the same photograph) shows charms resembling another brand's interlocking mark; owner ask 9.
  - Collections: `shortName` (Kolkata, Rajkot, Antique, Temple, Turkish, Kuwaiti, Italian, Singapore, Gemstone, Diamonds, Kids, Made to order); `longitude` (Italian 12, Turkish 29, Kuwaiti 48, Rajkot 71, Temple 78, Kolkata 88, Singapore 104: rounded longitudes of Rome, Istanbul, Kuwait City, Rajkot, Madurai, Kolkata and Singapore); `imageGround: 'lilac'` on diamonds and kids; remove `image` and `imageAlt` from `kuwait.md` (the file is p09, the Antique Three-Line Rani Haar) and from `singapore.md`; fix `customised.md` `imageAlt` to "Bespoke 22K gold bridal necklace on a white bust" (the file is p07).
  - Categories: `ground: 'velvet'` on `necklaces`.
- `src/components/ui/`: `Section`, `SectionHead`, `PageHead`, `Eyebrow`, `Ornament`, `Button`, `MoreLink`, `StageImage`, `Plate`, `TypesetPlate`, `Panorama`, `GroupLockup`, `RateFigure`, `Breadcrumbs`, `Icon`, `IconSprite` (complete, §5.2).
- `src/components/sections/`: `OneLineBand`, `EnquiryBand`, `CampaignLine`, `QuoteLines`, `StepStrip`, `OccasionWindow` (complete); contract stubs `RateInstrument`, `KaratStamps`, `Estimator`, `CaseWall`, `PlateGrid`, `StylesLine`, `BranchDoors` (final `Props`, real data rendered as plain lists); `ProductCard` `Props` updated (`layout` optional, defaulting from the image `ground`; `rate` optional).
- `src/components/layout/SiteHeader.astro` and `MobileActionBar.astro`: `Props` only (accept `tone`, `stale`, `fetchedAt`, `piece`), so `BaseLayout` compiles; rendering unchanged until WP1.
- `src/scripts/karat.ts`, `motion.ts`, `piece-morph.ts` (complete, §7).
- `public/_headers`, `public/.htaccess`: the `Speculation-Rules: "/speculation-rules.json"` header and the JSON content type (research file 08 §3.17); `public/speculation-rules.json` (moderate eagerness, excluding `/api/*`, `/thank-you/`, `*.php` and query URLs).
- `lighthouserc.json`: LCP ≤ 2,000 ms as an **error** on `/` and `/jewellery/necklaces/antique-pearl-drop-bib/`; CLS ≤ 0.01 error.
- `src/pages/system.astro` (new, `noindex`, added to `SITEMAP_EXCLUDE`; WP6 deletes it): one section per tone showing headings, eyebrow, buttons, links, chips, fields, `StageImage` (each mask), `Plate`, `TypesetPlate`, `RateFigure` (fixed and follow), `OneLineBand`, `EnquiryBand`, `CampaignLine`, `QuoteLines`, `StepStrip`, `OccasionWindow`, `Panorama`, and every stub.
- `CLAUDE.md`: replace "Radius is 0, there are no shadows, no hover transforms, no gradients" with the v2 wording (radius 0; no shadows; no transforms on images, cards or buttons; gradients only as `mask-image` ramps; motion only per `docs/design-system-v2.md` §3.8) and point "design system" at this file. `docs/content-guide.md`: document the new content fields.

**Acceptance (in addition to §9.9)**

- `npm run fonts:subset` reports a total of 90 KB or less; only the Cormorant roman is preloaded (check `dist/index.html`).
- `npm run build` succeeds; every existing route renders without runtime errors.
- `/system/` shows every primitive correctly on all seven tones at 1440 and 390, with the contrast values of §2.2.
- Reduced motion and no-JavaScript runs of `/system/` show the finished state.
- No `UtilityStrip` in the DOM; the chip area of the old header still renders until WP1.

### 9.3 WP1 Chrome

**Goal.** The header (both tones), rate chip and popover, mega panel, drawer, phone bar and footer.

**Files owned:** `src/components/layout/SiteHeader.astro`, `RateChip.astro` (new), `MegaPanel.astro` (new), `MobileDrawer.astro` (new), `MobileActionBar.astro`, `Footer.astro`; delete `UtilityStrip.astro`; `src/scripts/nav.ts`.

**Reads only:** everything else.

**Deliverables:** §5.3 in full; the chrome strings of §8.4; `view-transition-name: hdr` on the header element and `bar` on the phone bar; no `backdrop-filter`.

**Acceptance**

- Header renders solid in both tones (check `/` and `/about/`); 56 px below 64em, 72 px from 64em; total fixed chrome on a 390 × 844 phone is 112 px plus the safe area.
- Mega panel: opens on click and on hover intent; Escape and light-dismiss close it and return focus to the Jewellery button; column labels are not headings (the page's first heading is its H1); previews load only when the panel opens; a keyboard user can reach every link.
- Drawer: a modal dialog (background inert); opens with `commandfor` and, with `commandForElement` deleted from the prototype in DevTools, through `nav.ts`.
- Rate chip: shows 22K by default and follows a karat choice made on `/` (needs WP4's instrument; test with `/system/` until then); the popover lists four rates, the source and the time; stale state shows the hollow marker.
- Phone bar: four cells with a bronze WhatsApp cell; the piece variant appears on `/system/` with a `piece` prop and on piece pages after WP3.
- Footer: no dead links (`dist` link check), every link at least 24 px tall, socials as text links to the `site.ts` URLs.

### 9.4 WP2 Home

**Goal.** The home page of §6.1 with the copy of §8.2.

**Files owned:** `src/pages/index.astro`; `src/components/home/HomeHero.astro`, `src/components/home/FactStrip.astro` (new folder).

**Reads only:** everything else (consumes `RateInstrument`, `KaratStamps`, `Estimator` from WP4; `CaseWall`, `ProductCard`, `StylesLine` from WP3; `BranchDoors` from WP5; WP0 primitives).

**Deliverables:** the nine sections in order with the tones of §6.1; one `priority` image (p03); JSON-LD unchanged.

**Acceptance**

- At most 750 words in `<main>` at 1440; height at most 9,000 px at 1440 × 900 and 10,500 px at 390 × 844 (re-measured in WP6 once the stubs are filled).
- At 390 × 844 the first screen above the bar shows the H1, the piece, the 22K numeral and all four keys.
- Never three dark sections in a row; the panorama is never adjacent to a plum section; the campaign line appears only while an offer is active (test by setting a past `endsOn` locally, then revert).
- Exactly one `fetchpriority="high"` image; nothing in the first viewport has opacity below 1 or a `.reveal`.
- Every string matches §8.2 (data-bound parts from `site.ts` and content).

### 9.5 WP3 Catalogue

**Goal.** The jewellery index, categories, piece pages, collections index and collection pages, and the shared catalogue components.

**Files owned:** `src/pages/jewellery/**`, `src/pages/collections/**`; `src/components/sections/ProductCard.astro`, `CaseWall.astro`, `PlateGrid.astro`, `StylesLine.astro`, `CategoryPlate.astro` (new), `PieceStage.astro` (new), `PieceTicket.astro` (new), `SpecTable.astro`, `Filters.astro`; `src/scripts/filter.ts`. Stops using `TrayGrid`, `CategoryTile`, `ProductGallery`, `EnquiryBlock` (WP6 deletes them).

**Reads only:** everything else (consumes `QuoteLines`, `EnquiryBand`, `Estimator` slim, `Faq`, `AssuranceLedger`).

**Deliverables:** §5.5 and §6.2 to §6.6.

**Acceptance**

- Every velvet photograph is drawn through `StageImage` at most 600 CSS px (420 in walls); every studio cut-out through `Plate` at most half its source width in grids; no velvet photo on a non-stage ground; Kuwaiti and Singapore use `TypesetPlate`.
- Piece page: the ticket order of §5.5; WhatsApp message contains the name, reference and URL; "Book a visit" carries `?piece=`; the phone bar shows the piece variant; LCP ≤ 2,000 ms in Lighthouse mobile.
- View transition: clicking a case on `/jewellery/` grows its figure into the piece stage in Chrome; back navigation shows no duplicate-name error in the console.
- Filters: chips with rates; both grids filter; the canonical URL never changes; without JavaScript the category links show.
- Collection pages: the mini styles line lights the right style; no FAQ on category or collection pages.

### 9.6 WP4 Gold

**Goal.** The rate instrument, the hallmark stamps, the estimator, the record, `/gold-rate/` and `/gold-exchange/`, and the live rate script.

**Files owned:** `src/pages/gold-rate.astro`, `src/pages/gold-exchange.astro`; `src/components/sections/RateInstrument.astro`, `KaratStamps.astro`, `Estimator.astro`, `RateRecord.astro` (new), `RateBoard.astro`; `src/scripts/rate.ts`, `src/scripts/estimator.ts` (new).

**Reads only:** everything else (`roll.ts` and `karat.ts` from WP0).

**Deliverables:** §5.4, §6.8, §6.9 and the `rate.ts` and `estimator.ts` rows of §7.

**Acceptance**

- Instrument: karat keys work with JavaScript off (CSS `:has()`); the numeral box width never changes (measure before and after a key press and during a roll: identical); the status block keeps its height when the delta appears.
- Simulated refresh test (DevTools only, never committed): overriding the feed response with a different 22K value rolls only the changed digits, updates the chip, bar and footer through the hooks, shows "Down AED x since 12:02" and runs the sheen once; with reduced motion the text swaps.
- Estimator: pending mode shows fine-gold grams; flipping `site.exchange.confirmed` locally shows dirhams; the worked example and its WhatsApp link are correct with JavaScript off; grams clamp to 0.5 to 500; the branch choice appears in the message.
- `/gold-rate/`: no contents sidebar; the record shows the honest "starts on" state with one snapshot; the H1 and the numeral are never faded in.
- `/gold-exchange/`: the new title and H1 (no "0% deduction") while `site.exchange.confirmed` is false.

### 9.7 WP5 Places and stories

**Goal.** Branches, contact, about, occasions, offers, custom jewellery, our promise, journal, legal pages, 404, thank-you, and their components.

**Files owned:** `src/pages/stores/**`, `contact.astro`, `about.astro`, `src/pages/occasions/**`, `src/pages/offers/**`, `custom-jewellery.astro`, `our-promise.astro`, `src/pages/journal/**`, `privacy-policy.astro`, `terms.astro`, `disclaimer.astro`, `404.astro`, `thank-you.astro`; `src/components/sections/BranchDoors.astro`, `StoreCard.astro`, `ContactForm.astro`, `Faq.astro`, `AssuranceLedger.astro`, `JournalCard.astro`, `BarToBangle.astro` (new); `src/scripts/form.ts`; `public/api/contact.php`. Stops using `OccasionFeature`, `PlumBand`, `Hero` (WP6 deletes them).

**Reads only:** everything else.

**Deliverables:** §5.6 and §6.7, §6.10 to §6.18.

**Acceptance**

- Every door has Call (own number or labelled group line), Directions and WhatsApp this branch (Deira also its mobile); hours are printed from `branches[].hours` with the "As listed on Google, checked {date}" caption until `hours.confirmed` (owner decision, §0); branch pages use the facts plate, never a jewellery image, as their media.
- Visit form: all four steps without JavaScript (posts to `contact.php`, which accepts the new fields and requires email only for the email method); "Send on WhatsApp" composes a correct message with JavaScript; `?piece=CJ-NK-003` prefills the reason and reference.
- Occasion portraits never wider than 392 CSS px; no text on them.
- `Faq` uses `<details name>`; no `FAQPage` JSON-LD; the exchange promise title never appears while `site.exchange.confirmed` is false.
- `BarToBangle` assembles on scroll in Chrome and shows the finished row in Firefox and with reduced motion.

### 9.8 WP6 Integration and launch hygiene

Runs alone after WP1 to WP5 merge.

- Delete `Hero`, `ProofStrip`, `TrayGrid`, `CategoryTile`, `OccasionFeature`, `PlumBand`, `ProductGallery`, `EnquiryBlock`; the deprecated token aliases (§2.4); the legacy classes in `base.css` (`.section`, `.section--ruled`, `.tray`, `[data-surface='plum']`); `src/pages/system.astro`; **`public/_proto/`** (it is copied into `dist/` otherwise).
  **Done (15 October 2026):** the eight components, `UtilityStrip` and `system.astro` are deleted; the five aliases are gone; `base.css` lost `.section`, `.section--ruled`, `.tray`, `.container`, `.container--wide`, `.grid-12`, `.split--reverse`, `.from-xl` and the `.enquiry` rules; `ProductCard` lost its ignored `priority` and `bleed` props; the prototypes moved to `docs/design/prototypes/` (ignored by Prettier and ESLint) instead of being deleted, at the owner's request. Seams added where a stage opener meets a stage section (`/jewellery/`, `/stores/`). The measured budgets, JavaScript sizes and Lighthouse figures are in `docs/launch-checklist.md` §6.
- Re-run every acceptance check across all pages; measure real JavaScript per page from `dist/`; Lighthouse mobile on `/` and a piece page (LCP < 2,000 ms, CLS 0); fix seams between packages (tone sequences, spacing) with the lead.
- Update `docs/design-spec.md` with a one-line pointer to this file at the top of sections 0 to 4, 6, 7 and 8; add the owner asks of §10 to `docs/launch-checklist.md`; update `README.md` if commands changed.

### 9.9 Common acceptance checks (every package, on its own files and pages)

1. `npm run check` passes; `npm run lint` and `npm run format:check` pass for owned files.
2. **No raw colours or sizes** in owned component CSS: `rg -n "#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(" <owned paths>` returns nothing (content-sourced `style="--stage:…"` excepted); no `px` font sizes or spacing outside `tokens.css` except image caps passed as props.
3. **No `overflow: hidden`** on any ancestor of an animated element: `rg -n "overflow:\s*hidden" <owned paths>` returns nothing (`.sr-only` in base.css is the one exception).
4. **No inline scripts**: `npm run build && npm run audit`.
5. **Design audit** (`npm run audit:design -- /path/ …`, Appendix B) at 1440 × 900 and 390 × 844 for every owned page: exactly one H1; no horizontal overflow; no image drawn wider than its natural width; at most one `fetchpriority="high"`; nothing in the first viewport with opacity below 1; no text contrast failures on solid grounds; screenshots reviewed against §6.
6. **Reduced motion and no JavaScript** screenshots show the finished design, every fact readable, every link working.
7. **Copy**: no banned words (`rg -n -i "welcome to|discover|elevate|timeless|\x{2014}" <owned paths>` returns nothing); every fact traced to `site.ts` or `src/content/`.

---

## 10. Owner asks

In priority order. Each names what it unblocks; until it is answered the site uses the generic, honest fallback described.

| #   | Ask                                                                                                                                                                                                                                                                                                                                                                              | Unblocks                                                                                                                               | Fallback until then                                                                                 |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1   | **Exchange terms**: is old gold credited at the posted retail rate, at a buying rate, or after a deduction? Is "no weight deduction" or "0% deduction" true, and on what conditions?                                                                                                                                                                                             | The estimator's dirham figure; the exchange promise title; the `/gold-exchange/` "0% deduction" title                                  | Estimator shows fine-gold grams; "Exchange old gold at today's rate"; the promise title is hidden   |
| 2   | **Heritage figure**: 35 or 30 years in gold, and the exact wording                                                                                                                                                                                                                                                                                                               | Hero lockup line, heritage band, footer, About                                                                                         | `site.ts` wording (35, "more than 16 of them in the UAE"), flagged `TODO(owner)`                    |
| 3   | **Branch facts** for Safari Mall, Rolla Mall and Madinat Zayed: shop number, floor or level, phone, hours, parking, nearest entrance, map pin; confirm the Deira hours and Friday break                                                                                                                                                                                          | Doors, branch pages, the open-now line, `openingHoursSpecification`                                                                    | "Call or message for the shop number and today's hours"; group line; no hours anywhere              |
| 4   | **The WhatsApp number** (050 566 1416 on the site, 050 551 5826 on the Google listing) and **the email** (hello@classicgroup.ae or c1@classicgrp.ae)                                                                                                                                                                                                                             | Every WhatsApp link, the footer, the forms                                                                                             | `site.ts` values, flagged                                                                           |
| 5   | **Weights** for each piece (`weightGrams`, and `netWeightGrams` for stone-set pieces)                                                                                                                                                                                                                                                                                            | "Gold value today ≈" on cards and tickets                                                                                              | "Weight on request, weighed in front of you"                                                        |
| 6   | **Rate feed**: confirm the source name and how often the feed updates; note that a 21K figure of 446.25 quoted in a brief appears in no source (the snapshot of 13 October, 12:02 says 449.00)                                                                                                                                                                                   | The status line wording; how often anything rolls                                                                                      | Fetched values only, with the fetch time                                                            |
| 7   | **The one-day shoot** (analysis §6.3): branch fronts and interiors (item 1); six to eight hero pieces at 2,400 px, one per style, including a **Kuwaiti piece** (item 2); bar to bangle (item 5); occasion sets (item 10); coins and bars (item 6); a second angle per piece (item 7); the shooting rules of §6.4 (15 % clear velvet on every edge; the bust base off the frame) | Branch pages and the panorama slot; a sharper hero; the About chapter; real occasion windows; the Kuwaiti and Singapore typeset plates | Typeset plates; the interim occasion portraits at 392 px; `banner-about.jpg` as the only wide image |
| 8   | **Logo, wordmark and C monogram as SVG** in `#BE8658` and white                                                                                                                                                                                                                                                                                                                  | Sharp header, footer, 404                                                                                                              | The 250 px PNGs at 33 px tall                                                                       |
| 9   | **Withdrawn images**: `products/chain.jpg` and `collections/singapore.jpg` show charms that resemble another brand's interlocking mark; `collections/kuwait.jpg` is the Antique Rani Haar (p09), not a Kuwaiti piece. Are the studio cut-outs (ring, earrings, bangles, bracelet, pendant, anklet) photographs of pieces Classic stocks?                                         | Re-publishing the Fine Gold Chain; Singapore and Kuwaiti imagery                                                                       | Fine Gold Chain unpublished (`draft`); typeset plates                                               |
| 10  | **Promise terms**: cleaning and polishing for life, 14-day returns, diamond report threshold, exchange for another design                                                                                                                                                                                                                                                        | The promise ledger wording                                                                                                             | `site.ts` wording, flagged                                                                          |
| 11  | **Languages spoken** at each branch                                                                                                                                                                                                                                                                                                                                              | The visit form's language step                                                                                                         | Step hidden                                                                                         |
| 12  | **Services**: may staff send "another photograph" of a piece on WhatsApp? Will they call back on request ("Ask us to call you")? Is a video call from the counter offered?                                                                                                                                                                                                       | Those rows on the piece page and contact page                                                                                          | "Another photograph" and "Ask us to call you" ship only with a yes; no video call offered           |
| 13  | **Which pieces are at which branch**                                                                                                                                                                                                                                                                                                                                             | "Which branch has it today?" answered on the page                                                                                      | The question goes to WhatsApp                                                                       |
| 14  | **Trade licence and TRN**                                                                                                                                                                                                                                                                                                                                                        | Footer legal row, Terms                                                                                                                | `site.ts` value, flagged                                                                            |
| 15  | **Opening dates** for Mohamed bin Zayed City and Musaffah / Al Ain, and whether Musaffah and Al Ain are one branch or two                                                                                                                                                                                                                                                        | The opening-soon line, future doors                                                                                                    | "Dates to follow"                                                                                   |
| 16  | **Arabic**: scope and reviewer for Arabic home, rate and branch pages                                                                                                                                                                                                                                                                                                            | `/ar/` (logical CSS is already in place)                                                                                               | English only                                                                                        |
| 17  | **Store alignment** with the e-commerce build: the same plum button, bronze `#BE8658`, warm neutrals, Cormorant Garamond and IBM Plex Sans, 4.9 from 680 dated, one warranty wording, the same rate chip                                                                                                                                                                         | One family across both sites                                                                                                           | The brand site ships as specified here                                                              |
| 18  | **Rating refresh**: who updates 4.9 from 680 and how often                                                                                                                                                                                                                                                                                                                       | The fact strip's date                                                                                                                  | The dated 13 October 2026 figure                                                                    |

---

## Appendix A. Every judge finding and where it is fixed

| Finding (judge)                                                                                                                 | Fix                                                                                                                              | Where                         |
| ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Hero carries too much; the H1 competes with the rate; date eyebrow (creative)                                                   | Two-level H1 (16 px place line, 63 px display line); date moved into the status line; three facts; Diwali in its own band        | §6.1, §8.2                    |
| Pale category tray reads like a shop's category bar (creative)                                                                  | Replaced on home by `KaratStamps`; cut-outs move to `/jewellery/`                                                                | §6.1, §6.2                    |
| Navy-leather banner meets plum (creative, engineering)                                                                          | Order changed: occasions (ivory) sit before the panorama; panorama bottom feathered into the stage; rule: never adjacent to plum | §6.1, §5.2 `Panorama`         |
| Occasion section uses stock photos (creative, customer)                                                                         | Small windows (≤ 392 px, names only on home) on ivory, captions below; shot list item 10                                         | §5.2 `OccasionWindow`, §10 #7 |
| See-through header: view-transition name kills the blur (creative, engineering)                                                 | Solid header, tone follows the first section, no `backdrop-filter` anywhere                                                      | §5.3, §3.8                    |
| 892 words; same heading pattern everywhere (creative)                                                                           | 750-word cap with per-section budgets; heading shapes varied                                                                     | §8.2, §8.3                    |
| Karat buttons need JavaScript (creative, engineering)                                                                           | Radio `fieldset` and scoped `:has()`                                                                                             | §5.4                          |
| Simulated rate with an unsourced 21K figure and a clock time (all three)                                                        | No simulation in production; fetched values only; time from `fetchedAt` or the fetch; demo only behind `?demo=` in prototypes    | §1.2 rule 6, §7               |
| Three font files on the first screen (all three)                                                                                | Subset to ≤ 90 KB; preload only the roman; roman-accent fallback rule                                                            | §4                            |
| "No weight deduction" shown though unconfirmed (creative, customer)                                                             | Hidden until `site.exchange.confirmed`                                                                                           | §5.6, §6.9, §10 #1            |
| "A short video from the counter" unconfirmed (creative)                                                                         | Removed; owner ask                                                                                                               | §5.5, §10 #12                 |
| Plum WhatsApp cell on the dark bar, weak in sun, breaks its own rule (customer)                                                 | Bronze cell                                                                                                                      | §5.3                          |
| Inactive karat figures thin and muted (customer)                                                                                | Cormorant 400 in `--on-stage-body` (13.74:1); labels and stamps Plex 500                                                         | §5.4                          |
| Longitude line and "Traditions" puzzle a family (customer)                                                                      | "Styles" in the nav; "From Kuwait to Kolkata"; no degrees; origin lines                                                          | §5.5 `StylesLine`, §8.2       |
| Pieces dim until the middle of the screen (customer)                                                                            | Fully lit by 25 % cover; single layer from 0.45                                                                                  | §3.8                          |
| Estimator uses the retail selling rate (customer, all)                                                                          | Pending mode shows fine-gold grams until the owner confirms the basis                                                            | §5.4, §10 #1                  |
| Longest phone page (customer, engineering)                                                                                      | ≤ 10,500 px at 390                                                                                                               | §6.1                          |
| 16 masked layers per viewport; header blur; case images compete with the hero (engineering)                                     | One masked image per case; no blur; `fetchpriority="low"` on non-hero images                                                     | §5.2 `StageImage`, §3.8       |
| Delta line shifts the actions (engineering)                                                                                     | Delta line always rendered with a reserved line                                                                                  | §5.4                          |
| CLS 0.042 from the H1 rewrap on font swap (engineering)                                                                         | Astro metric-matched fallbacks for all three files; `text-wrap: balance`; Lighthouse CLS error at 0.01                           | §4, §9.2                      |
| Drawer non-modal (engineering)                                                                                                  | Modal `<dialog>` with `commandfor` and a `nav.ts` fallback                                                                       | §5.3                          |
| H2s inside header popovers precede the H1 (engineering, all)                                                                    | Column labels are `<p class="eyebrow">`                                                                                          | §5.3                          |
| Footer and breadcrumb links under 24 px (all)                                                                                   | `.list-links`, `--tap-inline`                                                                                                    | §3.2, §5.2, §5.3              |
| "Italian at 12°E", "Singapore at 104°E" overclaim (engineering)                                                                 | Origin lines from content ("Italian-style chains"); schematic caption                                                            | §5.5                          |
| "Most people come in for one of four reasons" implies a statistic (engineering)                                                 | "For the wedding, and every year after"                                                                                          | §8.2                          |
| Ivory maison: heritage ink-in rests at 1.4:1; rail captions dimmed by opacity; inline `.js` class; round rate dot (engineering) | No word-by-word ink-in; never dim text with opacity; no pre-hiding before scripts; the marker is a square turned 45°             | §3.2, §2.2, §7                |
| Ivory maison: branch cards are dead ends; place names whispered; bridal portrait at 553 px (customer, engineering)              | Every door has Call, Directions, WhatsApp; 16 px place line in the H1; portraits ≤ 392 px                                        | §5.6, §8.2, §5.2              |
| Ivory maison: "the board in the branch is the one we sell at", "mostly bought for" not in the data (creative, engineering)      | Not used; "In our cases" derived from collection karats                                                                          | §5.4                          |
| Live gold: p09 shown as Kuwaiti; `chain.jpg` mark (customer, engineering)                                                       | Kuwaiti `TypesetPlate`; `kuwait.jpg` unlinked; chain and Singapore images withdrawn                                              | §9.2, §10 #9                  |
| Live gold: rate drawn by CSS over "000.00" (engineering)                                                                        | Real-text numerals stacked; roll only during a change                                                                            | §5.4, §3.2                    |
| Live gold: page-global karat state and inherited registered colour (engineering)                                                | One `html[data-karat]` attribute set by `karat.ts`, followers only, no recolour                                                  | §7, §3.2                      |
| Live gold: bronze primary on the piece page; dark header far from the store (engineering, creative)                             | Plum primary on the ivory ticket; ivory header on day-led pages                                                                  | §5.5, §5.3                    |
| Live gold: no occasions on home; caveats hidden on phones (customer)                                                            | Occasions section; the status block shows on every width                                                                         | §6.1                          |
| All: inline prototype scripts; `public/_proto/` shipped                                                                         | Bundled modules only; WP6 deletes `_proto`                                                                                       | §7, §9.8                      |

---

## Appendix B. Acceptance toolkit

**`scripts/design-audit.mjs` (WP0).** `npm run audit:design -- [--base http://localhost:4321] /path/ /other/`. Launches the installed Chrome headless (path from `CHROME_PATH`, defaulting to the standard Windows install) over the DevTools protocol, and for each path at 1440 × 900 (DPR 1) and 390 × 844 (DPR 3, mobile emulation):

- prints page height, words in `<main>` (visible text only), H1 count, horizontal overflow, every `<img>` whose rendered CSS width exceeds its natural width, the number of `fetchpriority="high"` images, inline script count, every element in the first viewport whose computed opacity is below 1 at load, and every text node on a solid background whose contrast is below 4.5:1 (3:1 for 24 px and larger);
- saves viewport-by-viewport screenshots (scrolling 90 % of a screen at a time, 500 ms per step so scroll effects settle) to `.shots/{path}/{width}-{nn}.jpg`, plus one first-viewport screenshot with `prefers-reduced-motion: reduce` emulated and one with JavaScript disabled;
- exits non-zero when any check fails.

**Greps** (run from the repository root):

```bash
rg -n "#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(" src --glob '!src/styles/tokens.css' --glob '!src/content/**'
rg -n "overflow:\s*hidden" src --glob '!src/styles/base.css'
rg -n -i "welcome to|discover|elevate|timeless|\x{2014}" src
rg -n "backdrop-filter|box-shadow|border-radius:\s*[1-9]" src
rg -n "fetchpriority=\"high\"|priority" src/pages
```

**Lighthouse** (`npm run lighthouse`, `lighthouserc.json`): mobile profile, LCP ≤ 2,000 ms and CLS ≤ 0.01 as errors on `/` and `/jewellery/necklaces/antique-pearl-drop-bib/`.
