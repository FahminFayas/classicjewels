# Design system v2: Night vitrine

**Status:** final direction, build-ready. **Date:** 13 October 2026. **Owner of this file:** the design lead. Engineers change it only through the lead.

**What it replaces.** This file supersedes the visual and experience rules of `docs/design-spec.md`: sections 0 to 4, 6 and 7, and every motion ban in section 8. It keeps the URL structure as built in `src/lib/routes.ts`, the SEO contract (one `<h1>`, `title` up to 60 characters with no brand suffix, `description` 70 to 160, self-canonical, breadcrumbs mirrored as `BreadcrumbList`) and the JSON-LD policy of `design-spec.md` §5 (builders in `src/lib/schema.ts`, no `FAQPage`, no `aggregateRating`, no `Offer` without a real price). Page titles and descriptions stay as they are today unless §6 of this file gives a new one.

**Evidence base.** `docs/research/competitive/00-competitive-analysis.md` and files 01 to 08; the three directions in `docs/design/directions/`; the three verdicts in `docs/design/verdicts/`; the prototypes in `public/_proto/` (prototypes only: deleted before launch, see WP6).

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

| Graft | Where it lands |
| --- | --- |
| Two-level H1: a readable place-name line, then a short display line | Home hero (§6.1, §8) |
| Real-text karat control: four numerals stacked in one grid cell, a radio `fieldset`, `:has()` scoped to the instrument; works with no JavaScript | `RateInstrument` (§5.4) |
| The hallmark stamps band (999 / 916 / 875 / 750 with fineness bars and today's rate) | Home section 5, `/gold-rate/`, `/gold-exchange/` (`KaratStamps`) |
| The one-line campaign band that exists only while an offer runs | `CampaignLine` (home, festivals, offers) |
| "Your quote, in three lines" | `QuoteLines` (piece page, `/gold-rate/`) |
| A dark ground sampled from the photo when a piece is shown alone | `stage` field on products, `StageImage` |
| The typeset empty state for a style with no photograph (Kuwaiti) | `TypesetPlate` |
| `<details name>` FAQ with a `::details-content` transition | `Faq`, base.css |
| Modal `<dialog>` drawer opened by `commandfor` | `MobileDrawer` |
| Ivory header on day-led pages | `SiteHeader` `tone` |
| The `.track` named-line grid (bleed / wide / content) | base.css |
| Demo data only behind `?demo=` in prototypes; never in production | §7, WP rules |

**Grafted from Live gold**

| Graft | Where it lands |
| --- | --- |
| The chosen karat followed by the header chip, the phone bar and the estimator (scoped: one `html[data-karat]` attribute, no page-wide recolour) | `karat.ts`, `RateFigure follow` |
| Hallmark stamps on the karat keys, small figures in Plex 500 | `RateInstrument` keys |
| Estimator: − and + steppers up to 500 g, "stamped inside the piece" copy, the spelled-out sum line, a branch `<select>` written into the WhatsApp message, a worked example baked into the HTML | `Estimator` |
| "Ask us to call you" and "Which branch has it today?" rows | `PieceTicket` |
| Bronze WhatsApp cell in the phone bar | `MobileActionBar` |
| An honest "our record starts on 13 October 2026" state until seven snapshots exist | `RateRecord` |
| Route line drawn with `scale` (not stroke repaint), stations aligned to the door dividers | `BranchDoors` |
| "Bar, stamp, necklace" cards that assemble on scroll, as the typographic About chapter until the shoot | `BarToBangle` (About) |
| Today's per-gram rate under every case | `ProductCard` |

**Fixed** (every weakness and violation raised by the judges is listed with its fix in Appendix A). The headline fixes: no simulated rate anywhere; a solid header whose tone follows the first section (no see-through glass); one masked image per case, fully lit by a quarter of the way into view; panorama never touches plum; plum never sits on the stage; WhatsApp cell bronze on the dark bar; "Styles" instead of "Traditions" and no degrees on the line; Italian and Singapore labelled as "-style"; the old-gold estimator shows a dirham figure only once the owner confirms the exchange basis (until then it shows fine-gold weight, which is a fact); "no weight deduction" and "0% deduction" disappear from headings until confirmed; home copy at most 750 words; phone home at most 10,500 px; fonts subset to fit 90 KB with only the roman preloaded; `public/collections/kuwait.jpg` (a copy of p09, the Antique Rani Haar) and `chain.jpg` / `singapore.jpg` (charms resembling another brand's mark) withdrawn.

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

| Old rule (design-spec.md, CLAUDE.md) | Status |
| --- | --- |
| One ivory surface; at most two plum bands; adjacent sections separated only by a hairline | **Retired.** Tones per rule 2 |
| No motion: no scroll reveals, no page transitions, no image fades, rate swapped "without animation" | **Retired.** Motion policy per rule 5 and §3.8 |
| No text on images | **Retired, narrowly.** Text may sit over the dark field of `story/banner-about.jpg` (the panorama) only, contrast checked (13.11:1 or better); nowhere else |
| Every layout a 5/7 split in one 1,280 px column; `--container-wide` equal to `--container` | **Retired.** 7/5, 6/6 and centred layouts allowed; `--container-wide` is 96 rem; full-bleed grounds |
| `--t-display` ceiling of 72 px; Cormorant at 500 for headings | **Retired.** Display up to 200 px for one number or line per section; Cormorant 300 at 32 px and above, 400 from 22 to 31 px, never 500 or above |
| Velvet photos in white tray cells ("photo white equals cell white") | **Retired.** Rule 1 |
| An eyebrow above every H2; headlines as sentences ending in a full stop | **Retired.** Eyebrows optional; headlines name things; only the heritage and closing sentences end in a full stop |
| Journal and FAQ on the home page; FAQ at the foot of every page type | **Retired.** FAQ only on `/gold-rate/`, `/gold-exchange/`, piece pages, `/custom-jewellery/`, `/stores/`, `/our-promise/`, `/offers/{slug}/` |
| Utility strip above the header | **Retired.** The rate chip in the header replaces it |
| Radius 0; the C-ring is the only curve | **Kept** |
| Tokens only: no raw colours, sizes or spacing in component CSS | **Kept.** Per-element `style="--stage:#…"` written from content data is the single allowed exception |
| No shadows | **Kept** |
| No hover transforms | **Kept for images, cards and buttons.** A 1 px hairline may wipe in with `scale` |
| No gradients | **Kept as visible colour.** Gradients are allowed only as `mask-image` alpha ramps (photo masks, the sheen, the digit window, the panorama feather) |
| One H1; titles, descriptions, breadcrumbs, JSON-LD builders; routes from `routes.ts`; facts from `site.ts`; content as data; images through `astro:assets`; CSP (no inline scripts, no third-party scripts); Astro 7 strictness; copy voice | **Kept** unchanged |

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
  --mask-spot: radial-gradient(closest-side, #000 52%, transparent 100%); /* a piece in its pool of light */
  --mask-pool: radial-gradient(closest-side, #000 60%, transparent 100%); /* the piece page: a wider pool */
  --mask-edge:
    linear-gradient(to right, transparent, #000 var(--feather-x), #000 calc(100% - var(--feather-x)), transparent),
    linear-gradient(to bottom, transparent, #000 var(--feather-y), #000 calc(100% - var(--feather-y)), transparent);
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

| Text | stage-0 `#0b0918` | stage-1 `#110e24` | stage-2 `#19152f` | stage-3 `#221c3d` | Used for |
| --- | --- | --- | --- | --- | --- |
| `--on-stage` `#faf7f2` | 18.43 | 17.67 | 16.52 | 15.10 | Headings, names, rate figures in ivory |
| `--on-stage-body` `#ddd5df` | 13.74 | 13.18 | 12.32 | 11.26 | Running text, inactive key values |
| `--on-stage-muted` `#a99fb5` | 7.80 | 7.48 | 6.99 | 6.39 | Captions, meta |
| `--champagne` `#dcc29a` | 11.46 | 10.99 | 10.28 | 9.39 | Rate numeral, italic accents, links, focus |
| `--bronze` `#be8658` | 6.32 | 6.06 | 5.67 | 5.18 | Eyebrows, labels |
| `--ok-on-stage` / `--err-on-stage` | 11.17 / 10.21 | | | | Form states |

A piece shown alone on its own stage colour (p06 `#1b1740`): champagne 9.83, muted 6.69, ivory 15.81.

**Text on light grounds**

| Text | ivory `#faf7f2` | parchment `#f3eee6` | white | plum-050 `#f6f0f5` | lilac `#eae5e9` |
| --- | --- | --- | --- | --- | --- |
| `--ink-900` | 16.90 | 15.64 | 18.06 | 16.09 | 14.52 |
| `--ink-700` | 9.40 | 8.70 | 10.04 | 8.95 | 8.08 |
| `--ink-500` | 5.69 | 5.26 | 6.08 | 5.41 | 4.89 |
| `--gold-700` | 5.37 | 4.97 | 5.74 | 5.11 | 4.62 (labels 12 px and larger only) |
| `--plum-700` | 11.57 | 10.70 | 12.36 | 11.01 | 9.94 |
| `--ok` / `--err` | 5.90 / 6.30 | | | | |

**Text on plum**

| Text | plum `#4b2849` | plum-deep `#2e1a2d` |
| --- | --- | --- |
| `--ink-on-plum` `#faf7f2` | 11.57 | 15.10 |
| `--ink-on-plum-muted` `#d9ccd6` | 7.98 | 10.42 |
| `--champagne` | 7.20 | 9.39 |
| `--plum-300` `#b498b2` | 4.75 (not used) | 6.20 (footer small print) |
| `--ok-on-plum` / `--err-on-plum` | 7.01 / 6.41 | |

**Buttons, chips and panorama**

| Pairing | Ratio |
| --- | --- |
| Stage ink `#0b0918` on bronze button | 6.32 |
| Stage ink on champagne (button hover, selected chip on dark) | 11.46 |
| Ivory on plum button / on plum-900 hover | 11.57 / 15.10 |
| plum-900 on champagne (selected chip on plum-deep) | 9.39 |
| Ivory on the panorama's dark field (`#141732` to `#26294a`) | 16.40 to 13.11 |
| `--on-stage-body` on the panorama's lightest dark field | 9.78 |

**Non-text (1.4.11)**

| Boundary | Ratio |
| --- | --- |
| `--rule-stage-strong` (composites to `#886045`) on stage-0 / stage-1 | 3.57 / 3.53 |
| `--rule-on-plum-strong` on plum / plum-deep | 4.13 / 4.12 |
| `--rule-input` on ivory / white / parchment | 3.33 / 3.56 / 3.08 |
| Bronze button edge on stage-0 / on plum / on plum-deep | 6.32 / 3.97 / 5.18 |
| Focus ring: plum on ivory / champagne on stage, plum, plum-deep | 11.57 / 11.46, 7.20, 9.39 |

**Pairings that are never used for text:** plum on the stage (1.59:1), bronze on plum (3.97:1), bronze on ivory (2.92:1), `--ink-500` or `--gold-700` on lilac below 14 px. `--rule-stage`, `--rule-1`, `--rule-2` and `--rule-on-plum` are decorative only and never the sole boundary of a control.

**Opacity is never used to mute text.** Muted text uses colour tokens. Reveals start at opacity 0 but complete by 45 % of the element's entry (§3.8), and are applied to section heads, cards and doors only, never to body copy longer than three lines.

### 2.3 Type scale

Display is **Cormorant Garamond** (variable 300 to 700, roman and true italic). Text and interface are **IBM Plex Sans** (variable).

| Token | 390 px | 1024 px | 1440 px | Face, weight, leading, tracking | Use |
| --- | --- | --- | --- | --- | --- |
| `--t-rate` | 92 | 177 | 200 | Cormorant 300, `--lh-numeral`, `--track-rate`, lining tabular, `text-box: trim-both cap alphabetic` | The rate numeral only; on desktop `min(var(--t-rate), 22svh)` |
| `--t-stamp` | 65 | 103 | 128 | Cormorant 300, 0.85, `--track-rate`, lining tabular | 999 / 916 / 875 / 750 |
| `--t-display` | 51 | 84 | 105 | Cormorant 300 (italic allowed), `--lh-display`, `--track-display` | One word per opener: a style, a branch, a category |
| `--t-numeral-xl` | 44 | 71 | 89 | Cormorant 300, lining tabular | The estimate, the gold-rate board |
| `--t-h2` | 37 | 57 | 70 | Cormorant 300, `--lh-display`, `--track-h2` | Section titles |
| `--t-band` | 33 | 53 | 66 | Cormorant 300, 1.12 | One-line bands, the closing line, the footer slogan |
| `--t-hero` | 33 | 51 | 63 | Cormorant 300, 1.04 | The home H1's display line |
| `--t-h1` | 36 | 49 | 59 | Cormorant 300, `--lh-heading`, `--track-h1`, `text-wrap: balance` | Page H1 |
| `--t-h3` | 24 | 30 | 34 | Cormorant 400, 1.2 | Door names, panel titles, FAQ questions |
| `--t-numeral` | 26 | 33 | 37 | Cormorant 400, lining tabular | Karat key values, fact numerals |
| `--t-name` | 20 | 24 | 26 | Cormorant 400 italic, 1.2 | Case and window names |
| `--t-lead` | 17 | 20 | 20 | Plex 400, 1.55 | Leads |
| `--t-body` | 17 | 17 | 17 | Plex 400, 1.6 (1.65 on dark) | Body |
| `--t-kicker` | 16 | 16 | 16 | Plex 500, sentence case | Home H1 first line |
| `--t-small` / `--t-caption` | 14 / 13 | | | Plex 400 or 500 | Meta, captions, status lines |
| `--t-eyebrow` | 12 | | | Plex 500, uppercase, `--track-eyebrow` | Eyebrows, karat labels, key labels |

**Rules.** Cormorant never below 20 px and never at 500 or above; below 22 px it is italic names only, at 400. Every number that is a rate, weight, fineness or count uses `font-variant-numeric: lining-nums tabular-nums` (`.fig`). Running headlines keep Cormorant's default old-style figures ("35 years"), which read as book type. Italic marks one accent phrase per heading at most, through `<em>`, coloured `--accent` (plum on light, champagne on dark). Uppercase only for eyebrows and karat labels.

**Scale contrast.** The home first screen sets a 12 px eyebrow, a 16 px kicker, a 63 px display line and a 200 px numeral: a 17:1 range.

### 2.4 Renamed, changed and retired tokens

| Token | Change | Replacement or note |
| --- | --- | --- |
| `--t-display` | 36→72 becomes 51→105 | Same meaning |
| `--t-h1` | 30→56 becomes 36→59 | Same meaning |
| `--t-h2` | 26→40 becomes 37→70 | Same meaning; components that used `--t-h2` for small titles move to `--t-h3` |
| `--t-h3` | 20→24 becomes 24→34, weight 400 | Same meaning |
| `--t-numeral-xl` | 40→72 becomes 44→89 | Same meaning |
| `--t-numeral` | 18 fixed becomes 26→37 | Small figures move to `.fig` at `--t-small` |
| `--t-body` | 16→17 clamp becomes 17 fixed | |
| `--track-eyebrow` | 0.14em becomes 0.18em | |
| `--section-y` | 56→112 becomes 66→131 | |
| `--container-wide` | 80rem becomes 96rem | Restores a real wide track |
| `--gutter`, `--grid-gap` | Slightly wider at desktop | |
| `--rule-gold` | `#be8658` | Now an alias of `--bronze` |
| `--gold-300` | `#dcc29a` | Now an alias of `--champagne` |
| `--focus-on-plum` | | **Renamed** `--focus-on-dark` (also used on the stage) |
| `--ease` | | **Retired** → `--ease-out` (alias until WP6) |
| `--dur-fast` | 150 ms | **Retired** → `--dur-quick` 160 ms (alias until WP6) |
| `--dur-base` | 200 ms | **Retired** → `--dur-ui` 320 ms (alias until WP6) |
| `--dur-slow` | 240 ms becomes 600 ms | Same name, new meaning (decoration); only `SiteHeader` used it and WP1 rewrites it |
| `--z-nav` | | **Renamed** `--z-header` (alias until WP6) |
| `--strip-h` | | **Retired** with the utility strip (0 until WP6) |
| New | | All `--stage-*`, `--on-stage*`, `--rule-stage*`, `--wash-*`, `--scrim-stage`, `--bronze`, `--champagne`, `--plate-lilac`, `--rule-on-plum-strong`, `--ok/err-on-stage`, `--focus-on-dark`, `--t-rate`, `--t-stamp`, `--t-band`, `--t-hero`, `--t-name`, `--t-kicker`, `--fw-*`, `--lh-*`, `--track-rate`, `--band-y`, `--slim-y`, `--container-narrow`, `--measure`, `--tap-inline`, `--cap-*`, all motion and mask tokens, `--z-raised`, `--z-header` |

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

.sheet::backdrop {
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

| Tone | Ground | Used for | Rule |
| --- | --- | --- | --- |
| `stage` | `--stage-0` | Home hero, cases, branches; piece opener; jewellery, velvet category and collection openers; gold-rate opener; 404 | Velvet photos live here |
| `stage-raised` | `--stage-1` | The second of two consecutive dark sections (styles line, record table); mega panel, drawer, phone bar | A tonal step between dark rooms |
| `ivory` | `--surface-1` | Breath bands, stamps, occasions, the piece ticket, reading pages, studio-cut-out grids | Pale cut-outs and portraits |
| `parchment` | `--surface-2` | "What to bring", the record table on day pages, FAQ answers | At most one per page |
| `white` | `--surface-0` | Forms on ivory pages | Rare |
| `plum` | `--surface-plum` | Estimator band, campaign line, enquiry bands, visit form | Never adjacent to a velvet photo; 1 px bronze seam against the stage |
| `plum-deep` | `--surface-plum-deep` | Footer, estimator panel inside a plum band | |

**Pacing rules.** Never three dark sections in a row; two in a row must be `stage` then `stage-raised` (or the reverse) and must differ in module family. An ivory, parchment or plum band at least every 1.5 desktop screens. No module type twice in a row.

### 3.4 Headings and the eyebrow

- `SectionHead` (§5.2) is the only way a section opens with a heading. It has three shapes: `split` (title left, lead and aside right, on the 12-column grid), `stack` (eyebrow, title, lead in one column) and `centre` (centred, for bands and the styles line). Pages vary the shape (§8.3).
- The eyebrow is optional, 12 px Plex 500 uppercase in `--eyebrow`, with the `Ornament` (a 48 px bronze hairline with a small arch) only at major section starts (at most three per page).
- One `<em>` accent per heading at most. Headings name a thing; only sentence bands end in a full stop.

### 3.5 Buttons

| Variant | Light ground | Dark ground (stage, plum, plum-deep) |
| --- | --- | --- |
| `primary` | Plum fill, ivory text; hover plum-900 | Bronze fill, stage ink; hover champagne |
| `secondary` | 1 px plum outline, plum text; hover plum-050 wash | 1 px strong rule outline, ivory text; hover wash |
| `text` | Plum text, bronze wipe | Champagne text, bronze (stage) or champagne (plum) wipe |

48 px tall (44 px `compact`), square, sentence case, 15 px Plex 500, an icon at 18 px when it helps (WhatsApp, phone, map pin). No shine, no padding growth, no transform. One filled button per group; a group is at most two buttons and one text link.

### 3.6 The stage image

`StageImage` (§5.2) is the only way a velvet photograph appears. It renders `<figure class="stage-img">` with a `<Picture formats={['avif','webp']}>`, widths filtered to the source, `--cap` at most the source width, `aspect-ratio` from the image, `overflow: clip`, and one of three masks:

| Mask | Value | Use |
| --- | --- | --- |
| `spot` (default) | `radial-gradient(closest-side, #000 52%, transparent)` | Cases, hero, previews: an object floating in a pool of light, no rectangle |
| `pool` | `… #000 60% …` | The piece page and collection openers: a wider pool for one large photo |
| `edge` | 14 % / 12 % linear feather, `mask-composite: intersect` | Future reshoots composed edge to edge |

The figure's background is `var(--stage, transparent)`: transparent inside a stage section (the section ground shows), or the photo's sampled colour when the page passes `stage` (a piece shown alone). Masks are never animated. At most eight masked images in a viewport.

### 3.7 Rails, sheets and accordions

- **Rails** (`.rail`, `.rail-wrap`, `.rail__progress`): phones only, cards at 74 % (occasions) or 44 % (cut-outs), the next card peeking, a bronze progress hairline driven by the rail's own `scroll-timeline` (static at 25 % where unsupported), previous and next buttons added by `motion.ts`.
- **Sheets** (`.sheet`, `.sheet--side`): every popover and dialog. Entry is opacity and an 8 px drop (or a 32 px slide for the drawer) over 320 ms with `@starting-style`; exit animates in Chromium and snaps elsewhere.
- **Accordions** (`details`): exclusive with `<details name>`; the content height animates where `interpolate-size` exists and snaps elsewhere.

### 3.8 Motion policy

| Effect | Where | Mechanism | Range or duration | Static state |
| --- | --- | --- | --- | --- |
| Reveal (rise 24 px) | Section heads, cards, doors, windows (never the hero, never body copy over three lines) | `.reveal`, `view()` | `entry 0% entry 45%` | Visible |
| Case light | `StageImage light="scroll"` in walls | Opacity 0.45 → 1 on the single masked image | `entry 0% cover 25%` | Lit |
| Recede | Home hero piece | `.recede` | `exit 0% exit 100%` | Full size |
| Draw | Styles line, route, stamp bars | `.draw-x` / `.draw-y` (`scale`) | `entry 40% cover 40%` | Drawn |
| Rail progress | Phone rails | `scroll-timeline` | Scroll position | 25 % |
| Sheen | The rate rule | One masked strip, `translate` | 1.8 s, 600 ms after load; again on a real change | No sheen |
| Digit roll | Rate figures marked `data-roll` | `rate.ts` builds reels | 640 ms + 55 ms per digit | Text swaps |
| Karat crossfade | `RateInstrument` numerals | Opacity and 0.12 em rise, CSS only | 600 ms | Swap |
| Image fade | Lazy images not yet loaded when `motion.ts` runs | `data-fade` | 600 ms | Visible |
| Underline wipe | `.link-wipe`, `.btn--text`, nav | `scale` on a 1 px pseudo-element | 600 ms | No underline (colour shows the link) |
| Sheets | Popovers, dialogs | `@starting-style` | 320 ms | Instant |
| Page transition | Every navigation | `@view-transition` | 240 ms root, 320 ms piece morph | Normal navigation |

**Limits.** At most eight scroll-animated elements in view at once (animate the wrapper, not each child). Only `opacity`, `translate`, `scale` and `stroke-dashoffset` (sparkline, once). Nothing loops. Nothing advances by itself. No parallax. No `@starting-style`, reveal or opacity below 1 on anything in the first viewport at 390 × 844 or 1440 × 900. `overflow: clip`, never `hidden`, on any ancestor of a `view()`-animated element. Declare `animation-timeline` after the `animation` shorthand.

**View transitions.** Three names per page at most: `hdr` (the header element itself), `bar` (the phone bar) and `piece` (the piece page's stage figure; on listing pages `piece-morph.ts` names only the clicked card's figure, on `pageswap`, and clears it on `pageshow`). No `backdrop-filter` anywhere (it was the cause of the see-through header). Prerendering comes from the `Speculation-Rules` header (WP0).

**Reduced motion.** Every duration token is 0 ms; every scroll-driven rule, the sheen, `@view-transition` and the accordion transition sit inside `no-preference`; `rate.ts` and `estimator.ts` check `matchMedia('(prefers-reduced-motion: reduce)')` and swap text instead of building reels. The reduced page is the finished design.

### 3.9 Focus

2 px ring, 3 px offset, `--focus-ring`: plum on light grounds, champagne on dark grounds. Fields use offset 0. Chips ring the label when their hidden input has focus. Every hover state has a `:focus-visible` twin. Every popover invoker mirrors `aria-expanded`.

<!-- PART 3 -->
