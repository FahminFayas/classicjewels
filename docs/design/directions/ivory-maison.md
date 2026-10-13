# Direction: Ivory maison

Prototypes (served from `public/`, so they run on the Astro dev server):

- Home: http://localhost:4321/_proto/ivory-maison/
- Piece page: http://localhost:4321/_proto/ivory-maison/piece.html (any of the nine velvet pieces with `?p=p01` to `?p=p09`; the hero piece is `?p=p03`)
- Demo of the rate roll on a refreshed value: http://localhost:4321/_proto/ivory-maison/?demo=refresh (prototype only; it simulates a refresh to 469.50 and labels itself "Demo refresh")

Files: `public/_proto/ivory-maison/index.html`, `piece.html`, `img/` (copies of real assets from `src/assets/`), `fonts/` (the three woff2 files from `node_modules/@fontsource-variable/`). Checked at 1440 × 900, 1280 × 800, 768 × 1024 and 390 × 844 (the dev server on port 4321 was not answering during this session, so the same files were served by a plain static server on 127.0.0.1:4391 and captured with headless Chrome and the Browser pane), with `prefers-reduced-motion: reduce` emulated, and with no horizontal overflow at any of those widths.

---

## 1. Concept and thesis

**Ivory maison: a pale salon with lit cases set into its walls.**

The house is light: ivory walls, white plates, a warm stone band, and a great deal of air. Gold is not shown on the wall; it is shown in vitrines, dark windows cut into the ivory and lined with a bronze hairline, which only ever appear where a velvet photograph sits, so the 600 px busts read as lit cases rather than thumbnails. The day's rate is posted like the board in the shop: one monumental light Cormorant numeral in plum ink, with the four karats beneath it, the time, and the source. Plum is the colour of the counter, used for the one place you ask a question (the old-gold estimator), the buttons that start a conversation and the footer. Drama comes from contrast of scale (a 12 px label against a 204 px numeral), from pacing (one idea per screen, near-empty bands holding a single line), from cropping and from slow, honest motion, never from darkness or from enlarging a photograph. Every screen has one focal object: the rate, the line, the list of styles, the four hallmark stamps, the estimate, the bridal portrait, the four doors. It sits closest to the store's light palette, so the brand site and the shop read as one family.

---

## 2. Three references and what was taken from each

| Reference (research file)                  | What it does                                                                                                                                                                                                    | What Ivory maison takes                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tiffany & Co.** (06 §2, §6.1, §6.5)      | White bands of 356 to 464 px holding one heading; single pieces on deep teal and navy fabric tiles; copy beside the image, never on it; a 0.6 s underline wipe                                                  | The tall one-line band (the heritage line at `--band-y`, 107 to 240 px of air above it); the dark fabric tile as the only dark surface (the vitrine); captions beside or below the image; the 600 ms bronze-to-plum underline wipe on every text link                                                                           |
| **Van Cleef & Arpels** (06 §4, §6.5, §6.7) | Images that fade in over 0.5 s on an ease-out-expo curve; phone as the filled button and the cart outlined; a highlight module whose captions crossfade slowly; the calmest motion and fastest paint in the set | `--ease-expo: cubic-bezier(0.19, 1, 0.22, 1)` for every image fade and caption crossfade; "Ask about this piece on WhatsApp" as the filled plum button and "Call Deira" outlined; the styles index's sticky vitrine, where only the photo, the stage colour and the caption change, and only when the visitor points or focuses |
| **Cartier** (06 §1, §6.6)                  | One idea per screen; story rows with the piece in a half-screen field of matching colour and about 40 words opposite; a staged mega panel whose content follows the panel; live boutique status                 | The pacing rule (one focal object per screen); the piece page's half-width vitrine with the stage colour sampled from each photo's own velvet; the mega panel that opens over 320 ms with its columns following 120 ms later; branch cards built to take an open-now line the moment hours are confirmed                        |

Also drawn on: Eden Garden's zero-JavaScript scroll-driven animation (07 §3.7) for the heritage line and the hallmark bars; Boucheron and Tamannaah's "list that changes an image" (07 §1) for the styles index; Juri's salon hang (07 §3.8) for the occasions.

---

## 3. Tokens

The production names extend `src/styles/tokens.css`; existing names are kept where the value is kept, so the store and the brand site share one vocabulary. The prototype's local names are given in brackets where they differ.

### 3.1 Colour

**Surfaces**

| Token                                          | Hex                                                                                                                                   | Role                                                                                                                                                                                                                    |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--surface-1` (`--ivory`)                      | `#FAF7F2`                                                                                                                             | The salon wall: page, header, most sections. Shared with the store (analysis §5.2)                                                                                                                                      |
| `--surface-0` (`--porcelain`)                  | `#FFFFFF`                                                                                                                             | Plates, mega panel, popovers, inputs                                                                                                                                                                                    |
| `--surface-2` (`--stone`)                      | `#F3EEE6`                                                                                                                             | The one warm alternate band (the four golds), the "today" ticket on the piece page                                                                                                                                      |
| `--plum-050` (`--blush`)                       | `#F6F0F5`                                                                                                                             | The single plum tint: the campaign line, the old-gold teaser on the piece page. Shared with the store's blush                                                                                                           |
| `--surface-plum` (`--plum-700`)                | `#4B2849`                                                                                                                             | Brand plum: primary buttons on light, the old-gold estimator band, the drawer foot                                                                                                                                      |
| `--surface-plum-deep` (`--plum-900`)           | `#2E1A2D`                                                                                                                             | Footer. Shared with the store's deep plum                                                                                                                                                                               |
| `--stage-0` (new)                              | `#100D24`                                                                                                                             | Default vitrine. Sampled from the outer 5 % ring of p01 to p09 (ring means `#0D0B1B` to `#2D2240`); slightly lighter than the `#0B0918` proposed in file 08 so the feather melts rather than haloes on p02, p04 and p08 |
| `--stage-1` (new)                              | `#171331`                                                                                                                             | The typeset plate when a style has no photograph yet (Kuwaiti)                                                                                                                                                          |
| `--stage` (per photo, set inline from content) | p01 `#191227`, p02 `#110D29`, p03 `#1A153B`, p04 `#120F2A`, p05 `#0D0B1D`, p06 `#241E4E`, p07 `#0C091A`, p08 `#13102C`, p09 `#120E26` | Each vitrine's ground, sampled from that photo's own top edge band (measured with sharp on 13 Oct). A build script writes `stage` into each product entry                                                               |

Rule: a velvet photograph only ever sits on its `--stage`. Stage windows never touch plum: they are separated by ivory or stone (file 08 §4.3, the navy halo).

**Ink, gold and rules**

| Token                              | Hex                                             | Role                                                                                                                 |
| ---------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `--ink-900`                        | `#1C1418`                                       | Body and display text                                                                                                |
| `--ink-700`                        | `#4A3F46`                                       | Secondary text, leads                                                                                                |
| `--ink-500`                        | `#6B5F66`                                       | Captions, meta, inactive style names                                                                                 |
| `--ink-on-plum` / `--ink-on-stage` | `#FAF7F2`                                       | Text on plum and stage                                                                                               |
| `--ink-on-plum-muted`              | `#D9CCD6`                                       | Secondary text on plum                                                                                               |
| `--ink-on-stage-muted` (new)       | `#A99FB5`                                       | Secondary text on stage                                                                                              |
| `--rule-gold` (`--bronze`)         | `#BE8658`                                       | Brand bronze: hairlines, the C-ring, karat bars, route, bronze button fill on dark. **Never text on ivory** (2.92:1) |
| `--gold-700`                       | `#8A5C32`                                       | Bronze for text on light grounds: labels, the kicker, karat names                                                    |
| `--gold-300`                       | `#DCC29A`                                       | Champagne: text and numerals on plum and stage, selected chip fill                                                   |
| `--gold-100`                       | `#F1E6D3`                                       | The sheen highlight only (decorative)                                                                                |
| `--rule-1` / `--rule-2`            | `#E6E0D6` / `#CFC6B8`                           | Hairlines on light (decorative)                                                                                      |
| `--rule-input`                     | `#8F858B`                                       | Input borders, 3.33:1 on ivory                                                                                       |
| `--rule-on-plum`                   | `rgb(250 247 242 / 0.22)`                       | Hairlines on plum                                                                                                    |
| `--rule-on-stage` (new)            | `color-mix(in oklab, #BE8658 40%, transparent)` | The vitrine's inner hairline frame                                                                                   |
| `--focus` / `--focus-on-dark`      | `#4B2849` / `#DCC29A`                           | 2 px focus ring, 3 px offset                                                                                         |

### 3.2 Contrast: every text pairing used (WCAG 2.x, computed)

| Text                                | Ground                         | Ratio                       | Used for                                                    |
| ----------------------------------- | ------------------------------ | --------------------------- | ----------------------------------------------------------- |
| ink-900 `#1C1418`                   | ivory `#FAF7F2`                | 16.90                       | Body, display, style names, branch names                    |
| ink-700 `#4A3F46`                   | ivory                          | 9.40                        | Leads, branch addresses                                     |
| ink-500 `#6B5F66`                   | ivory                          | 5.69                        | Meta, inactive style names, karat labels, facts             |
| plum `#4B2849`                      | ivory                          | 11.57                       | Rate numeral, italic accents, links, stamps                 |
| gold-700 `#8A5C32`                  | ivory                          | 5.37                        | Labels, kicker, route labels, rate time                     |
| ink-900 / ink-500 / plum / gold-700 | white `#FFFFFF`                | 18.06 / 6.08 / 12.36 / 5.74 | Mega panel, rate popover                                    |
| ink-700                             | white                          | 10.04                       | Mega panel captions                                         |
| ink-900 / ink-700 / ink-500         | stone `#F3EEE6`                | 15.64 / 8.70 / 5.26         | Four golds, "today" ticket                                  |
| plum / gold-700                     | stone                          | 10.70 / 4.97                | Stamps, karat labels on stone                               |
| ink-900 / ink-700 / plum / gold-700 | blush `#F6F0F5`                | 16.09 / 8.95 / 11.01 / 5.11 | Campaign line, old-gold teaser                              |
| ivory                               | plum `#4B2849`                 | 11.57                       | Primary button, estimator heading, mobile bar WhatsApp cell |
| champagne `#DCC29A`                 | plum                           | 7.20                        | Estimate figure, labels, italic accent, links on plum       |
| muted `#D9CCD6`                     | plum                           | 7.98                        | Estimator body and fine print                               |
| plum-900 `#2E1A2D`                  | champagne                      | 9.39                        | Selected karat chip                                         |
| ivory / champagne / muted           | plum-900 `#2E1A2D`             | 15.10 / 9.39 / 10.42        | Footer text, slogan accent, footer secondary                |
| ink-900 `#1C1418`                   | bronze `#BE8658`               | 5.80                        | Bronze button on dark (hover to champagne: 10.52)           |
| ivory / champagne / muted / bronze  | stage-0 `#100D24`              | 17.78 / 11.06 / 7.52 / 6.10 | Captions, headings, links on the stage band                 |
| champagne / muted                   | p03 stage `#1A153B`            | 10.07 / 6.85                | Hero vitrine caption                                        |
| champagne / muted                   | p06 stage `#241E4E` (lightest) | 8.92 / 6.06                 | Worst case for any vitrine caption                          |
| champagne / muted                   | stage-1 `#171331`              | 10.41 / 7.08                | Empty-state plate                                           |
| ivory                               | plum-900                       | 15.10                       | Drawer foot outline button                                  |

Non-text: rule-input 3.33:1, bronze rules 2.92:1 on ivory are decorative (WCAG 1.4.11 applies only to the input border, which passes). The heritage line's scroll-read state passes through low opacity for at most a few hundred pixels of scroll and always resolves to 16.90:1; it is off under reduced motion and in browsers without scroll timelines.

### 3.3 Type

Cormorant Garamond (variable, 300 to 700) is used as a true display face: **weight 300 for every display size, 400 only at 22 to 28 px, never 500 or above**, true italic (the `latin-wght-italic` file) for one accent phrase per heading, lining tabular figures (`font-variant-numeric: lining-nums tabular-nums`) for every number. IBM Plex Sans 400 and 500 for text and interface; uppercase only for labels.

| Token                       | clamp()                                      | 390 px  | 1440 px | Face, weight, tracking, leading                                 | Used for                                               |
| --------------------------- | -------------------------------------------- | ------- | ------- | --------------------------------------------------------------- | ------------------------------------------------------ |
| `--t-numeral-hero`          | `clamp(5.75rem, 3.2rem + 10.6vw, 13rem)`     | 92      | 204     | Cormorant 300, −0.035em, 0.8                                    | The day's rate                                         |
| `--t-display-xl`            | `clamp(2.75rem, 1.9rem + 3.9vw, 5.75rem)`    | 46      | 87      | Cormorant 300, −0.015em, 1.02                                   | Hero line, one-line bands, "Four doors", footer slogan |
| `--t-stamp`                 | `clamp(4rem, 2.6rem + 6vw, 9rem)`            | 64      | 128     | Cormorant 300, −0.035em, 0.85                                   | Hallmark stamps 999 / 916 / 875 / 750                  |
| `--t-display`               | `clamp(2.25rem, 1.6rem + 2.9vw, 4.5rem)`     | 37      | 67      | Cormorant 300, −0.015em, 1.02                                   | Section H2s, lead occasion name                        |
| `--t-index`                 | `clamp(2.125rem, 1.5rem + 2.6vw, 4rem)`      | 34      | 61      | Cormorant 300 (italic on hover), −0.015em, 1.05                 | Style names                                            |
| `--t-h1-piece`              | `clamp(2.5rem, 1.9rem + 2.4vw, 4rem)`        | 40      | 64      | Cormorant 300, `text-wrap: pretty`, hyphenated words kept whole | Piece page H1                                          |
| `--t-h2`                    | `clamp(2rem, 1.55rem + 2vw, 3.25rem)`        | 33      | 52      | Cormorant 300                                                   | Quote lines                                            |
| `--t-h3`                    | `clamp(1.375rem, 1.25rem + 0.55vw, 1.75rem)` | 22      | 28      | Cormorant 400                                                   | Small headings, FAQ summaries                          |
| `--t-numeral`               | `clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)`   | 22      | 28      | Cormorant 400, tabular                                          | Karat chips, per-gram lines                            |
| `--t-lead`                  | `clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)`    | 17      | 20      | Plex 400, 1.55                                                  | Leads                                                  |
| `--t-body`                  | `clamp(1rem, 0.97rem + 0.12vw, 1.0625rem)`   | 16      | 17      | Plex 400, 1.6                                                   | Body                                                   |
| `--t-small` / `--t-caption` | `0.875rem` / `0.8125rem`                     | 14 / 13 | 14 / 13 | Plex 400 or 500                                                 | Meta, captions                                         |
| `--t-label`                 | `0.75rem`                                    | 12      | 12      | Plex 500, uppercase, +0.16em (nav +0.12em)                      | Labels, nav, karat names                               |

Scale contrast per screen: the hero sets a 12 px label, an 87 px line and a 204 px numeral on one screen (17 : 1). The `--t-display` 72 px ceiling of the current spec is lifted for one word or number per section, as analysis §8.0 asks.

### 3.4 Space

4 px base, unchanged: `--space-1` 4, `-2` 8, `-3` 12, `-4` 16, `-5` 24, `-6` 32, `-7` 48, `-8` 64, `-9` 96, `-10` 128 px.

| Token         | Value                                    | 390 px | 1440 px | Role                                                                                       |
| ------------- | ---------------------------------------- | ------ | ------- | ------------------------------------------------------------------------------------------ |
| `--section-y` | `clamp(4.5rem, 2.8rem + 7.5vw, 9.5rem)`  | 74     | 152     | Default section padding                                                                    |
| `--band-y`    | `clamp(6.5rem, 3.5rem + 13vw, 15rem)`    | 107    | 240     | Top of a one-line band; bottom is `0.55 × --band-y` so the band reads as air, not as a gap |
| `--gutter`    | `clamp(1rem, 0.4rem + 2.6vw, 2.5rem)`    | 16     | 40      | Side gutter                                                                                |
| `--header-h`  | `3.5rem` / `4.75rem` from 64em           | 56     | 76      | Sticky header                                                                              |
| `--bar-h`     | `3.5rem` + `env(safe-area-inset-bottom)` | 56     | n/a     | Mobile action bar                                                                          |
| `--control-h` | `3rem`                                   | 48     | 48      | Buttons and inputs (the store's 53 px comes down to 48)                                    |

### 3.5 Containers and tracks

| Token              | Value                                      | Use                                                                                                                                                                                                                                                                                                         |
| ------------------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--container`      | `80rem` (1280)                             | Reading sections, the footer's text                                                                                                                                                                                                                                                                         |
| `--container-wide` | `92rem` (1472; 1360 at 1440 after gutters) | The salon wall: hero, styles, golds, occasions, doors, header. This restores a real wide track (today both tokens are 80rem)                                                                                                                                                                                |
| `--measure`        | `34rem`                                    | Body copy and leads                                                                                                                                                                                                                                                                                         |
| Full bleed         | `100%` of the viewport                     | Band grounds (stone, blush, plum, plum-900), the piece page's "more in the case" stage band and its rail, which pads to the wide track with `padding-inline: max(var(--gutter), (100% - var(--container-wide)) / 2)` so the first card aligns with the content edge and the rail runs off both screen edges |

Production adds one `.track` utility so sections can place children on named lines without nesting wrappers:

```css
.track {
  display: grid;
  grid-template-columns:
    [full-start] minmax(var(--gutter), 1fr)
    [wide-start] minmax(0, calc((var(--container-wide) - var(--container)) / 2))
    [content-start] min(100% - 2 * var(--gutter), var(--container))
    [content-end] minmax(0, calc((var(--container-wide) - var(--container)) / 2))
    [wide-end] minmax(var(--gutter), 1fr) [full-end];
}
.track > * {
  grid-column: content;
}
.track > .wide {
  grid-column: wide;
}
.track > .bleed {
  grid-column: full;
}
```

Inside the wide track, desktop layouts use 7/5 (hero, piece page), 6/5 (styles), 5/7 (section heads), 4 equal (golds, doors) and a 12-column salon hang (occasions). Phones are one column with snap rails that peek at the next card.

### 3.6 Motion

| Token         | Value                            | Use                                                                         |
| ------------- | -------------------------------- | --------------------------------------------------------------------------- |
| `--dur-quick` | 160 ms                           | Colour and chip state                                                       |
| `--dur-ui`    | 320 ms                           | Menus, popovers, drawer, button fills, preview crossfade trigger            |
| `--dur-slow`  | 600 ms                           | Underline wipes, image fades, numeral crossfade on karat change, digit roll |
| `--dur-page`  | 220 ms                           | Root cross-document fade                                                    |
| `--dur-morph` | 320 ms                           | Piece morph between pages                                                   |
| `--dur-sheen` | 1800 ms                          | The single hairline sheen under the rate, once, 700 ms after load           |
| `--ease-out`  | `cubic-bezier(0.22, 1, 0.36, 1)` | Interface                                                                   |
| `--ease-expo` | `cubic-bezier(0.19, 1, 0.22, 1)` | Image and caption fades (Van Cleef)                                         |
| `--ease-wipe` | `cubic-bezier(0.4, 0, 0.2, 1)`   | Underlines and bars (Tiffany)                                               |

All durations go to 0 ms under `prefers-reduced-motion: reduce`. Scroll-driven animations ignore durations, so every one of them sits inside `@media (prefers-reduced-motion: no-preference)` and `@supports (animation-timeline: view())`; their unsupported and reduced state is the finished composition. Only `transform`, `opacity` and (for the route) `stroke-dashoffset` are animated on scroll; no more than about six elements animate in view at once.

### 3.7 Masks

`--feather-x: 14%`, `--feather-y: 12%`, `--mask-feather-edge` (two linear alpha ramps with `mask-composite: intersect`), `--mask-feather-spot: radial-gradient(closest-side, #000 74%, transparent)` (reserved for pieces sitting high in frame). Gradients appear only as mask alpha ramps, as analysis §8.0 allows; the sheen is a solid `--gold-100` segment with a static mask, moved by `translate`.

---

## 4. Signature moments

### 4.1 The day's gold (hero rate instrument)

- **What it is.** Under the H1, a bronze hairline, a label row ("Today's rate · AED per gram", time on the right), and the 22K rate as one 204 px light Cormorant numeral in plum, with "AED" set small above its first figure. Beneath, the four karats as a row of chips (24K 505.75, 22K 468.25, 21K 449.00, 18K 384.75), each a real radio input. Choosing a karat crossfades the big numeral (600 ms, opacity plus a 0.12 em rise) and wipes a plum bar across the top of the chosen chip. The header chip and mobile bar carry the 22K figure everywhere.
- **Mechanics.** All four numerals are rendered at build from the newest `src/content/rates/*.json` and stacked in one grid cell (`grid-area: 1 / 1`), so the box never changes size (CLS 0; tabular lining figures). Visibility is driven by `.rate:has(#k22:checked) [data-fig='22k']`, zero JS. The chips are a `<fieldset>` of radios, so arrow keys work natively and screen readers hear "22K 468.25, radio button, 2 of 4"; the big numeral is `aria-hidden` because the chips already carry every figure. The time is a `<time datetime>`.
- **The roll.** `rate.ts` already refetches the feed on idle; when a refreshed value differs from the baked one, each changed digit rolls up 0.8 em over 600 ms in a clipped column, then the node is replaced with plain text (`?demo=refresh` shows it). It never runs on load and never counts. Under reduced motion the text is swapped instantly.
- **The sheen.** One `--gold-100` segment crosses the bronze hairline once (`@keyframes` on `translate`, 1.8 s, 700 ms delay). It is not on the LCP element.
- **Support and fallback.** `:has()` is Baseline (Chrome 105, Safari 15.4, Firefox 121). Without it the 22K numeral shows (it is the default `checked`) and the chips still list every figure. Never faded in: the H1 and numeral render at full opacity on first paint.

### 4.2 The vitrine (dark windows in a pale wall)

- **What it is.** Every velvet photograph sits in an inset dark window whose ground is sampled from that photo's own velvet, with a 1 px bronze frame inset 12 px. The photo's 600 px square is feathered away (`--mask-feather-edge`), so the bust appears to stand in a lit case. The hero window is 5/12 of the wide track and full hero height (542 × 776 px measured at 1440 × 900) with the photo at 446 px; the piece page window is 7/12 with the photo at exactly 600 CSS px (1:1 on DPR 1).
- **Mechanics.** A `Vitrine.astro` (`StageImage` in file 08) wraps `<Picture formats={['avif','webp']}>` with widths filtered to the source (`[360, 480, 600]`), `--cap` set to the source width, `aspect-ratio: 1`, `overflow: clip`, and `style="--stage:#…"` from the content entry (CSP allows inline style attributes). As the hero scrolls away its photo recedes (`scale: 0.94; opacity: 0.35` on `animation-timeline: view()`, exit range only, scale never above 1).
- **Rules held.** Never wider than 600 CSS px; never zoomed on hover; never on plum; one `priority` image per page.
- **Fallback.** Masks are Baseline high (Chrome 120, Safari 15.4, Firefox 53). Without masks the photo shows its real velvet on a near-identical sampled ground, which is still clean. Reduced motion removes the recede.

### 4.3 Names that turn to italic (styles index with a sticky vitrine)

- **What it is.** "From Kolkata to Kuwait": nine style names set at 61 px light Cormorant in a ruled list (Kolkata, Rajkot, Antique, Temple, Turkish, Kuwaiti, Italian, Gemstone, Made to order), each with its karats and three words on the craft. Pointing at or focusing a name turns it to Cormorant italic in plum, wipes a plum hairline under it (600 ms) and drops the other names to `--ink-500`. The sticky vitrine beside the list crossfades to that style's piece (600 ms, ease-expo), its ground shifts to the photo's sampled velvet (`background-color` 600 ms), and the caption names the piece. Kuwaiti has no photograph yet, so its window shows a typeset plate ("Kuwaiti", "Not photographed yet: ask us on WhatsApp and we will send pieces from the case"): an honest empty state, not a borrowed photo.
- **Mechanics.** CSS `:has()` does the work (`.styles:has(.style-row a:is(:hover, :focus-visible))`); a 0.25 KB script pins the last style pointed at with `data-active`, so the window does not snap back when the pointer leaves. The window is `aria-hidden` and holds no links; the names are the links (to `/collections/{slug}/`).
- **Phones.** The same DOM becomes a horizontal snap rail of 248 px vitrine cards (each row reveals its own lazy image, hidden on desktop so it never downloads there), with a bronze progress hairline driven by a named `scroll-timeline` (`timeline-scope` on the parent). Previous and next are by swipe; the hairline shows how far along you are.
- **Fallback.** No `:has()`: the first style's piece stays in the window and every name still links. No scroll timeline: the progress hairline sits at 20 %. Reduced motion: no fades, instant swap.

### 4.4 The line that reads itself (heritage band)

- **What it is.** A 70 to 80 vh ivory band holding a drawn C-ring, a label and one line at 87 px: "In the gold trade for over 35 years, _more than 16 of them in the UAE._" (the approved line in `site.ts`). As it crosses the viewport, its four phrases go from 16 % to full ink in reading order, and the C-ring draws its open circle.
- **Mechanics.** Each phrase is a `span.w` with `--i` set inline; `animation: ink linear both; animation-timeline: view(); animation-range: cover calc(18% + var(--i) * 3.5%) cover calc(30% + var(--i) * 3.5%)`, opacity only. The C-ring is the existing `i-c-ring` glyph with `stroke-dashoffset` from 88 to 0 on the same timeline.
- **Fallback and reduced motion.** Static full-ink line (checked with reduced motion emulated). The text is real DOM in an H2 throughout.

### 4.5 The piece walks to its page (cross-document view transition)

- **What it is.** Clicking the hero piece, or any card in "More in the case", morphs that photo into the piece page's vitrine over 320 ms while the header and mobile bar hold still and the rest of the page cross-fades in 220 ms.
- **Mechanics.** `@view-transition { navigation: auto; }` inside `no-preference`; `view-transition-name: hdr` on the header and `bar` on the action bar; the piece page's vitrine image is `piece`. On the listing page only the clicked image is named (`piece-morph.ts` on `pageswap`, 0.35 KB; the prototype does it on click), and the name is cleared on `pageshow` so a back-forward restore cannot duplicate it. Pair with the `Speculation-Rules` header (file 08 §3.17) so the destination is prerendered and the transition costs no LCP.
- **Support.** Chrome and Edge 126, Safari 18.2 (about 88 %). Firefox and older Safari navigate normally. Reduced motion: no transition at all.

Also in the motion layer, smaller: underline wipes on every text link and nav item; the mega panel and popovers entering through `@starting-style`; images fading in on decode (never the LCP image); section heads rising 24 px on `view()`; the karat bars filling to fineness; the branch route drawing once.

---

## 5. Home page, section by section

Desktop page length about 8,040 px (8.9 screens at 900); phone about 9,300 px. Words in `<main>`: 768 (measured), down from 1,825. One content image above the fold.

| #   | Section                                     | Ground                 | Focal object                     | Replaces / reuses                                                                       |
| --- | ------------------------------------------- | ---------------------- | -------------------------------- | --------------------------------------------------------------------------------------- |
| 0   | Header                                      | ivory                  | Rate chip                        | `SiteHeader.astro` changed; `UtilityStrip.astro` retired                                |
| 1   | The day's gold                              | ivory + vitrine        | 204 px numeral and the lit piece | `Hero.astro` (flagship) and `RateBoard` (band) replaced by `RateInstrument` + `Vitrine` |
| 2   | Proof line                                  | ivory, ruled           | Four facts                       | `ProofStrip.astro` restyled                                                             |
| 2b  | Campaign line (only while an offer is live) | blush                  | One line                         | The `offer` block in `index.astro`, restyled                                            |
| 3   | Heritage line                               | ivory, tall            | One line                         | Story split with `about-1.jpg` retired; new `LineBand`                                  |
| 4   | From Kolkata to Kuwait                      | ivory + sticky vitrine | Nine names                       | Numbered collections index replaced by `StyleIndex`                                     |
| 5   | The stamp says what's inside                | stone                  | 999 / 916 / 875 / 750            | New `KaratStamps`; replaces the home rate board and the category tiles                  |
| 6   | What your old gold is worth today           | plum                   | The estimate                     | Old-gold / coins `PlumBand` replaced by `GoldEstimator` inside `PlumBand`               |
| 7   | For the wedding, and every year after       | ivory                  | The bridal portrait              | `OccasionFeature` changed to a salon hang                                               |
| 8   | Four doors, three emirates                  | ivory                  | The route                        | Store rows replaced by `BranchRoute` + `StoreCard` (door variant)                       |
| 9   | Footer                                      | plum-900               | "Every jewel has a tale."        | `Footer.astro` changed                                                                  |

Removed from the home page: the featured tray of eight necklaces (moves to `/jewellery/`, where the vitrine rail lives), the six-row promise ledger (promises move to the piece page and `/our-promise/`), the journal cards, the FAQ, the category tiles (now in the mega panel and `/jewellery/`), and the 1,123 px rate table.

### 5.1 The day's gold (hero)

- **Desktop.** Wide track, 7/5. Left column top: the H1 in two parts, a 12 px label kicker "Gold and diamond jewellers in Dubai, Sharjah and Abu Dhabi" (gold-700) and the 87 px line "Gold by the gram, _at today's rate._" (the italic in plum). Left column bottom (anchored to the base of the hero): the rate instrument (§4.1), the source sentence ("The Dubai Jewellery Group's suggested retail rate. A piece is priced at this rate times its gold weight; the making charge and 5% VAT are quoted on their own lines."), then "WhatsApp us" (plum fill), "Visit a branch" (plum outline) and "Today's board" (text link). Right column: the vitrine at full hero height with p03, the Antique Pearl-Drop Bib Necklace, its caption in champagne italic ("Antique Pearl-Drop Bib", "22K · Antique collection · CJ-NK-003") and "See the piece". Hero height `100svh` minus the header; on desktop screens shorter than 896 px the numeral caps at `22svh` and the gaps tighten so the actions stay in the first screen.
- **Mobile.** DOM order is the reading order: kicker, line (46 px, two lines), the vitrine full-bleed (photo 248 px, caption without the SKU), then the rate label with the time only, the 92 px numeral, the chips and the source, then the two buttons side by side. The H1, the piece and the numeral are all in the first 844 px screen above the action bar (checked).
- **Assets.** `products/p03.jpg` (600², the single `priority` image).
- **Copy direction.** Facts only: the place names for search, the pricing rule in one sentence, the source named. "Gold by the gram" is the house's own phrase ("Necklaces to anklets, by the gram" on the current home).
- **Motion.** The sheen once; the karat crossfade on choice; the roll on a real refresh; the photo recedes on exit. Nothing above the fold fades in.

### 5.2 Proof line

Four ruled cells: "4.9 on Google, from 680 reviews of the Deira branch (13 Oct 2026)" (links to the listing in `site.reviews.url`), "Four doors: Deira, two Sharjah malls and Madinat Zayed, Abu Dhabi", "916 · 875 · 750: the UAE hallmark, stamped on every piece", "_Classic Group_: bullion trading, scrap gold buying and refining". Numerals in 40 px Cormorant 300 plum, text in 13 px Plex. 2 × 2 on phones. All from `site.ts`; the count of branches is `openBranches.length`.

### 5.3 Campaign line

Rendered only while an entry in `src/content/offers/` is between `startsOn` and `endsOn` (today: Diwali 2026, until 10 November). Blush band, label "Until 10 November", the offer's `headline` in Cormorant 300 with the clause after the colon in plum italic, "See the offer" and "Ask on WhatsApp" (the offer's `whatsappMessage`). One line on desktop, three short lines on phones. No countdowns, no badges.

### 5.4 Heritage line

See §4.4. Under the line: "The group began in bullion, and still trades, buys and refines gold. In 2024 it opened Classic Jewels & Diamonds at Gold Souq Extension, Deira." and "How the house began" to `/about/`. Every figure reads from `site.group.experience`, `site.founded.brandYear` and `flagship.name` (`TODO(owner)`: 35 or 30 years).

### 5.5 From Kolkata to Kuwait

See §4.3. Head on a 5/7 split: label "By style", H2 "From Kolkata _to Kuwait_", lead "Bengali filigree beside Gulf bridal sets, Ottoman forms beside Italian chains. Each style is made the way its own goldsmiths make it." Under the list: "Also in the cases: Singapore chains, Kids and Diamonds" (the three collections whose only images are pale cut-outs, which do not belong in a vitrine). Assets: p01, p02, p09 (Antique: the Three-Line Rani Haar), p08, p05, p04, p06, p07; the window caption names each piece and its reference. Data: `collections` (name, karats, `hallmarks[0..1]`) joined to the first product in each collection.

### 5.6 The stamp says what's inside

Stone band. Head: label "Know your gold", H2 "The stamp says _what's inside_", lead "Every piece carries the UAE hallmark for its karat. The weight and fineness are printed on your invoice." (from the hallmark promise in `site.ts`). Four columns: karat label, the stamp at 128 px plum (999, 916, 875, 750), a 3 px bronze bar filled to its fineness (99.9 %, 91.6 %, 87.5 %, 75 %; `scale: var(--f) 1`, filled on `view()`), the fineness in words, today's rate per gram from the same baked snapshot, and what that karat is mostly bought for (coins and bars; most bridal and everyday jewellery; Gulf and Turkish sets; diamond settings and Italian chains, from the collections' karats). Foot: the source and time, and "Today's board and how a price is built" to `/gold-rate/`. 2 × 2 on phones. All figures carry `data-rate` hooks so a refresh updates them.

### 5.7 What your old gold is worth today

Plum band, 5/6. Left: label "Old gold", H2 "What your old gold _is worth today_" (italic in champagne), "Bring it in and we test it and weigh it in front of you, then credit it by weight at the day's rate against a new piece." (the exchange promise in `site.ts`), "How the exchange works". Right: a `<form>` with no submit: weight in grams (an underline-only number input at 40 px Cormorant), karat as four chips (22K preselected), and an `<output>` at about 105 px in champagne: "AED 4,682.50" for 10 g of 22K. Fine print names the rate, karat, date and time and says the credited figure is set at the counter after testing. Action: a bronze "Ask about exchanging it" that prefills WhatsApp with the weight and karat entered, and "Find a branch". `Intl.NumberFormat('en-AE')`; the `<output>` is a polite live region. Owner sign-off is needed on the wording and on any deduction before launch (analysis Appendix A, item 6).

### 5.8 For the wedding, and every year after

Salon hang on a 12-column grid: Wedding as the lead (columns 1 to 5, 3:4 crop of the 784 × 1280 portrait, about 552 × 736 px, name at 67 px italic), and Anniversary, Festivals and Birthday at about 207 px wide in columns 7 to 12, stepped down 0, 64 and 128 px, under the section head. Captions below, never on the photo. Phones: a 72 % snap rail. Assets: the four occasion portraits until the shoot (analysis §6.3, item 10). Image fade on decode; cards rise on `view()`.

### 5.9 Four doors, three emirates

Centred head: label "Visit us", "Four doors, _three emirates_", "West to east along the coast. Bring a piece to compare, or old gold to weigh." Desktop: a schematic route (inline SVG, `pathLength="1"`) drawn once as the section enters, with emirate labels and four pins aligned to the four branch columns (the flagship pin filled plum; "Schematic, not to scale"). Below, four columns: emirate label, branch name at 44 px, address, the facts `site.ts` holds (Deira: covered parking in the building, Gold Souq or Al Ras metro, the landline), and Directions, Branch page, and for Deira the number. Branches without confirmed shop numbers or hours say "Ask us on WhatsApp for the shop number and today's hours." No hours are printed for any branch: `hours.confirmed` is false everywhere today; the open-now line switches on per branch when it turns true. Phones: a vertical bronze line with C-ring pins down the left edge. Closing line: "Opening soon in Abu Dhabi: opposite the Etihad Rail station in Mohamed bin Zayed City, and in Musaffah and Al Ain. Dates to follow." (from `publicNote`). The page ends here.

---

## 6. Chrome

- **Header** (`SiteHeader.astro`, changed). Ivory, 76 px desktop, 56 px phones, sticky on both; one hairline that settles in over the first 128 px of scroll (`animation-timeline: scroll(root)`, otherwise always shown). Desktop: logo left (the 250 × 66 PNG at 33 px tall, 2× density, until the SVG arrives), seven 12 px uppercase labels centred (Jewellery, Collections, Occasions, Gold rate, Old gold, Branches, About) with a 600 ms bronze underline wipe and `aria-current`, then the rate chip ("22K 468.25 AED/g", a button that opens today's board as a popover) and a small plum "WhatsApp". Phones: Menu, centred logo, rate chip. The 36 px utility strip is retired; its rate lives in the chip, its phone in the drawer, bar and footer. Total fixed chrome on a phone: 56 + 56 px.
- **Mega panel.** A `popover` opened by the Jewellery button (`popovertarget`, zero JS; hover intent added by `nav.ts`), white, full width under the header, four columns: By piece (nine categories at 22 px Cormorant), By style (twelve collections in two columns), Visit us (the four branches with emirate), and a 288 × 360 vitrine that crossfades to the hovered style's piece through `:has()`. Enters over 320 ms with `@starting-style`; its columns follow 120 ms later (Cartier). Esc and light dismiss are native.
- **Rate popover.** Today's board: four rows with hallmark numbers, the source and time, and "Today's board in full". Positioned under the chip (anchor positioning where supported, a fixed corner otherwise).
- **Drawer** (phones). A modal `<dialog>` on ivory, opened by `commandfor`/`command="show-modal"` where supported and `nav.ts` otherwise; slides 24 px and fades in 320 ms. Nine links at 34 px Cormorant 300, with quiet right-hand notes ("12 collections", "22K 468.25", "4 open"). A plum foot holds a bronze "WhatsApp us" and an outlined "Call +971 4 255 1288". `inert` and scroll-lock come with the modal dialog.
- **Mobile action bar** (`MobileActionBar.astro`, changed). 56 px plus the safe-area inset, four cells: WhatsApp (the only filled cell, plum, wider), Call, Branches, and the live 22K figure linking to `/gold-rate/`. On the piece page it becomes "Ask about this piece" (prefilled with the piece's name, reference and URL), Call, Branches. Named `bar` so it holds still through page transitions.
- **Footer** (`Footer.astro`, changed). Plum-900. A mark row: "Every jewel _has a tale._" (the inherited slogan, `site.slogan`) at 87 px with the accent in champagne italic, the white logo and "A Classic Group house. Jewellers since 2024; in the gold trade for over 35 years, more than 16 of them in the UAE." Four columns: Branches (open ones, then opening soon), Today's rate (the four karats, time), Ask us (WhatsApp, call, email, book a visit), The house (pages that exist). Legal row with the trade licence, two social links and the three legal pages. No dead links.

---

## 7. Templates

- **Jewellery index `/jewellery/`.** Opens with a short ivory head ("Every piece we have photographed, _by the gram_") and a full-bleed stage band holding the vitrine rail of all velvet pieces (the only full-bleed dark band besides the piece page's), then the nine categories as a ruled list with the lilac cut-outs keyed to transparency at build (`sharp` threshold on `#EAE5E9`) sitting on white plates, piece counts shown only when a category has three or more. Filters (`Filters.astro`, `filter.ts`) become karat and style chips on one canonical URL. Ends with the four doors as a one-line strip.
- **Category `/jewellery/{category}/`.** Head with the category name at `--t-display` and a karat chip row showing today's per-gram figure on each chip. Necklaces (the nine velvet pieces) use a 3-up grid of vitrine cells joined by hairlines on the stage band; categories with pale photos use white plates on ivory in a 4-up grid. Each card: name in Cormorant, "22K · Kolkata", and an "Ask" text button that opens WhatsApp prefilled. Empty or one-piece categories say so plainly and offer WhatsApp.
- **Piece `/jewellery/{category}/{slug}/`** (prototyped). 7/5. Left: the sticky vitrine (§4.2), photo at 600 CSS px, a note line ("Photographed on a velvet bust. One view so far." and "Ask for a video", a prefilled WhatsApp). Right: label (collection link · category), H1 at 64 px with hyphenated words kept whole, the piece's own Markdown text, then the enquiry pair immediately (plum "Ask about this piece on WhatsApp", outlined "Call Deira · +971 4 255 1288"), the ticket (karat with its stamp, weight "On request, weighed in front of you" until `weightGrams` exists, occasion, availability, reference), the "today" ticket on stone (the karat's per-gram rate at 52 px, time, source, and how the price is built), three quiet rows (Book a visit to see it with `?piece=CJ-NK-003`, Which branch has it?, Copy the reference), and three promises with C-ring markers. Below: "Your quote, _in three lines_" (gold value, making charge, 5 % VAT, numbered and ruled), with a blush teaser for the old-gold estimate; "More in the case", a full-bleed stage band with a snap rail of the other pieces (cards come into focus at the centre through `view(inline)`, previous and next buttons, a bronze progress hairline); "Before you decide", the two FAQ items from `faqs/product.json` as an exclusive `<details name>` accordion that animates its height in Chromium. Phones: the vitrine first and full-bleed, then the text, with the piece bar fixed. When weights arrive, the ticket gains "Gold value today ≈ AED …" from `pricing.ts`.
- **Collection `/collections/{slug}/`.** Opens with a half-and-half: the collection's piece in a vitrine on the left at 600 px, and on ivory the origin as a label, the name at 92 px with its key word in italic, the summary and the `hallmarks` as a ruled list. Then chapters: the Markdown story at a 34 rem measure, the pieces in the collection as vitrine cells, "How it is made" when copy exists, and a closing plum enquiry line ("Ask us for pieces in the Kolkata style", `whatsappForRange`). Collections without velvet photos (Singapore, Kids, Diamonds) open on a white plate with the keyed cut-out instead of a vitrine.
- **Occasion `/occasions/{slug}/`.** A tall portrait (the occasion image, max 784 px, 5 of 12 columns) beside the name at 92 px italic and the summary; then the suggested categories as a ruled list with counts; then pieces tagged with the occasion; for Wedding, sticky chapter chips by tradition (Indian and Gulf side by side) as copy arrives. Ends on "Book a bridal viewing at a branch" (plum band).
- **Gold rate `/gold-rate/`.** The best page on the site and the one that most needs the house's scale: the hero numeral (§4.1) at full height with karat chips and the time, the four stamps band (§5.6), then a plum band with the 7 and 30-day sparkline drawn once (build-time SVG from `src/content/rates`, available once seven snapshots exist; until then the band says "History starts 13 October 2026"), a ruled table of the last seven days with change since yesterday, "How a price is built" in three lines, the old-gold estimator, and the four doors under "Buy or exchange at today's rate". The sticky contents list is retired. FAQ stays here. `banner-about.jpg` (the gold sun on navy leather, 1920 × 478) appears once as a letterbox vitrine at up to 1280 CSS px, separated from plum by ivory.
- **Stores index `/stores/`.** The route (§5.9) at full width on top, then each branch as a wide row: a photo slot (shop-front once shot; until then a stone plate with the emirate and venue set large), name, address, facts, Directions, WhatsApp, Call, and the open-now line only where `hours.confirmed`. Opening-soon branches follow under their own label with their `publicNote`.
- **Branch `/stores/{slug}/`.** Name at 92 px, emirate label, flagship mark where true, a facts ledger (address, floor or level, parking, nearest metro or entrance, phone, hours with "checked on" date when confirmed), a Maps link (no iframe), WhatsApp prefilled with the branch, and the plum "Reserve to view" form (branch preselected) borrowed from the store's personalisation band. A strip of pieces "you can ask to see here" only once the owner tells us which branch holds what.
- **About `/about/`.** The heritage line band (§4.4) as the opener, then "Classic Bullion, then the jewellery house" as three ruled chapters (bullion trading; scrap gold buying and refining; jewellery since 2024 at Gold Souq Extension), each a short paragraph from `site.group`, then the four doors. The "from bar to bangle" assembled story (analysis idea 15) slots in here when shot list item 5 exists. No pull quotes in the margin.
- **Contact and visit `/contact/`.** Four doors of equal weight as the opener (WhatsApp, Call, Visit a branch, and a video call only if the owner offers one), then the four-step visit form on ivory: branch as four cards, reason (prefilled from `?piece=`), day and time window plus language, name and WhatsApp number. Posts to `public/api/contact.php` or composes a WhatsApp message; honeypot, no CAPTCHA.
- **Custom jewellery `/custom-jewellery/`.** Opens with p07 (the Bespoke Bridal Necklace) in a vitrine and the line "Bring a sketch, a photo _or an heirloom to remake_". A four-step strip (conversation, agreed weight and karat in writing, making, collection) with large Cormorant numerals, then the plum brief form with contact-method chips (WhatsApp preselected) and "I'd like some guidance", as on the store.
- **Gold exchange `/gold-exchange/`.** The estimator (§5.7) as the hero on plum, then "Tested in front of you" as a four-step strip (weigh, test, credit at the day's rate, put towards a new piece), the stamps band so visitors can read their own hallmark, the FAQ, and the four doors. No percentage promises until the owner confirms terms.

---

## 8. Component inventory

| Status            | Component (file)                                               | What changes                                                                                                                                                                  |
| ----------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New               | `src/components/ui/Vitrine.astro`                              | The stage window: `<Picture>` with source-filtered widths, `--cap`, `--stage`, edge or spot feather, inner bronze frame, optional caption slot, `recede` and `priority` props |
| New               | `src/components/sections/RateInstrument.astro`                 | Hero numeral stack, karat radios, label, source; reads `getRates()`; `data-rate` hooks                                                                                        |
| New               | `src/components/sections/StyleIndex.astro`                     | Ruled list of styles with sticky vitrine (desktop) and rail (phones)                                                                                                          |
| New               | `src/components/sections/KaratStamps.astro`                    | The four stamps with fineness bars and per-gram figures                                                                                                                       |
| New               | `src/components/sections/GoldEstimator.astro`                  | Weight and karat form with `<output>`, WhatsApp handoff                                                                                                                       |
| New               | `src/components/sections/LineBand.astro`                       | Tall one-line band with optional C-ring and scroll-read phrases                                                                                                               |
| New               | `src/components/sections/BranchRoute.astro`                    | Inline SVG route with pins from `openBranches`                                                                                                                                |
| New               | `src/components/sections/CaseRail.astro`                       | Full-bleed stage band with a snap rail of vitrine cards, controls and progress                                                                                                |
| New               | `src/components/sections/QuoteLines.astro`                     | "Your quote, in three lines"                                                                                                                                                  |
| New               | `src/components/sections/CampaignLine.astro`                   | One-line offer band from `offers`                                                                                                                                             |
| New               | `src/components/layout/RatePopover.astro`                      | Today's board popover for the header chip                                                                                                                                     |
| Changed           | `SiteHeader.astro`                                             | Single sticky bar, rate chip, popover mega panel with style preview and Visit us, drawer as modal dialog with `commandfor`                                                    |
| Changed           | `MobileActionBar.astro`                                        | Four cells with WhatsApp filled and the live rate; piece-page variant                                                                                                         |
| Changed           | `Footer.astro`                                                 | Slogan mark row, rate column, plum-900                                                                                                                                        |
| Changed           | `ProofStrip.astro`                                             | Four ruled cells with Cormorant numerals                                                                                                                                      |
| Changed           | `ProductCard.astro`                                            | Vitrine cell on stage (velvet) or white plate (pale), name in Cormorant, "Ask" text button; `view-transition-name` set only on click                                          |
| Changed           | `ProductGallery.astro`                                         | Wraps `Vitrine`; sticky on desktop; dialog view for future multi-image pieces                                                                                                 |
| Changed           | `EnquiryBlock.astro`                                           | Enquiry pair first, quiet rows after; piece-prefilled links from `whatsapp.ts`                                                                                                |
| Changed           | `SpecTable.astro`                                              | Becomes the ruled "ticket" (rows omitted when empty, weight shown as "On request" until supplied)                                                                             |
| Changed           | `StoreCard.astro`                                              | `door` variant for the route; open-now line behind `hours.confirmed`                                                                                                          |
| Changed           | `OccasionFeature.astro`                                        | Lead and small sizes for the salon hang                                                                                                                                       |
| Changed           | `PlumBand.astro`                                               | Champagne type tokens, bronze button; never contains a velvet photo                                                                                                           |
| Changed           | `Faq.astro`                                                    | Exclusive `<details name>`, `::details-content` height transition                                                                                                             |
| Changed           | `Filters.astro`                                                | Karat chips with per-gram figures, style chips                                                                                                                                |
| Changed           | `Button.astro`                                                 | `bronze` variant for dark grounds; 600 ms colour, no growth or shine                                                                                                          |
| Changed           | `Plate.astro`, `CategoryTile.astro`                            | Intrinsic `aspect-ratio` box (no 0 × 0 collapse); `overflow: clip`                                                                                                            |
| Changed           | `SectionHead.astro`                                            | 5/7 head with label, display H2 with italic slot, optional lead; used sparingly, never twice in a row                                                                         |
| Changed           | `Breadcrumbs.astro`                                            | 13 px, slash separators, on every non-home page                                                                                                                               |
| Retired           | `UtilityStrip.astro`                                           | Replaced by the rate chip, drawer and footer                                                                                                                                  |
| Retired           | `Hero.astro` (flagship split, badge, blur, shadow)             | Replaced by `RateInstrument` + `Vitrine`; a plain `PageHead` covers inner pages                                                                                               |
| Retired           | `RateBoard.astro` band variant on home                         | Replaced by `RateInstrument` and `KaratStamps`; `full` lives on in `/gold-rate/`                                                                                              |
| Retired from home | `AssuranceLedger.astro`, `TrayGrid.astro`, `JournalCard.astro` | Kept for `/our-promise/`, `/jewellery/` and `/journal/`                                                                                                                       |

---

## 9. Client JavaScript

All bundled modules under `src/scripts/` (no inline scripts, CSP unchanged). Today's home ships 4,692 B minified (file 08). The prototype's whole home script, including the demo, measures **2,812 B minified, 1,282 B gzip** (rolldown `--minify`).

| Module                                | Does                                                                                                    | Estimate (min)                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `rate.ts` (extend)                    | Digit roll on a changed refresh; header chip, bar and stamps updated through existing `data-rate` hooks | +0.45 KB                                      |
| `peek.ts` (new)                       | Pins the last style pointed at or focused (`data-active`)                                               | 0.25 KB                                       |
| `estimate.ts` (new)                   | Weight × karat × stored rate, `Intl.NumberFormat('en-AE')`, WhatsApp handoff                            | 0.75 KB                                       |
| `fade.ts` (new)                       | Adds `is-in` to non-LCP images on load; nothing hidden before it runs                                   | 0.2 KB                                        |
| `piece-morph.ts` (new)                | Names the clicked image on `pageswap`, clears on `pageshow`                                             | 0.35 KB                                       |
| `rail.ts` (new)                       | Previous and next on snap rails                                                                         | 0.3 KB                                        |
| `nav.ts` (shrink)                     | Hover intent for the mega popover, drawer fallback where `commandfor` is missing                        | about −1 KB once popover and dialog take over |
| `hours.ts` (when hours are confirmed) | Open-now line per branch                                                                                | 0.3 KB                                        |

Home after the change: about 6.5 to 7.5 KB minified; piece page about 5.5 KB. Both well inside the 15 KB budget. Zero third parties.

---

## 10. Performance

- **LCP < 2 s on mobile.** The LCP element is the hero vitrine image (p03, 600w AVIF about 15 KB, the single `priority` image, in the HTML so the preload scanner finds it) or the H1 text. Neither is faded, masked with animation, or given `@starting-style`. The mask is static; the recede runs only in the exit range.
- **Fonts.** The direction uses three files: Cormorant roman (37.6 KB), Cormorant italic (39.3 KB) and Plex (45.7 KB), 122.6 KB as shipped by fontsource. Preload only Cormorant roman. Add the italic as a second `variant` in `astro.config.mjs` so Astro generates its metric-matched fallback (no shift on swap). Subset all three to the glyphs the site uses (Basic Latin plus `’ · × ≈ ©`); an estimated 22 to 28 KB each brings the set to about 75 KB, inside the 90 KB budget. Verify the subset sizes in the build.
- **CLS 0.** Numerals in a stacked grid cell with tabular figures; every image has `width`, `height` and an `aspect-ratio` box; the sticky header and bar are present from first paint; rails are fixed-height.
- **CSS.** The prototype's whole home stylesheet is 43 KB minified, 8.7 KB gzip, under the 20 KB budget; the global part is under 5 KB gzip.
- **Images.** Home above the fold: one image. Velvet photos never exceed 600 CSS px; portraits never exceed 784; the banner never exceeds 1280. AVIF q60 with 4:4:4 (file 08 §4.7) to keep the dark velvet free of banding.
- **Scroll work.** Six scroll-linked effects at most in any viewport, all `transform`, `opacity` or a single short stroke; no scroll listeners; masks only on images 600 px or smaller.
- **Transitions.** Root fade 220 ms, morph 320 ms, three named elements per page (`hdr`, `bar`, `piece`), destination prerendered through the `Speculation-Rules` header.

## 11. Accessibility

- One H1 per page; on the home it carries both the place names and the display line.
- Every hover has a focus and tap equivalent: style names (focus pins the preview; on touch they are a rail of cards), mega panel (keyboard opens it from the button), occasion cards, rails (buttons as well as swipe).
- Real controls: radios for karats (arrow keys native), a fieldset and `<output>` for the estimator, `popover` and `<dialog>` for menus, `<details name>` for FAQs.
- Decorative duplicates are `aria-hidden` and contain nothing focusable (the big numeral, the styles vitrine, the mega preview). The C-ring and route are `aria-hidden`; the route says "schematic" in visible text.
- Contrast per §3.2; bronze is never text on light grounds. Focus ring 2 px plum on light, champagne on dark.
- Targets 44 px minimum; the bar's cells are 56 px.
- Motion per §3.6: every animation off under reduced motion, every scroll effect has a finished static state, nothing advances on its own, nothing loops.
- Text is never baked into images; the dirham sign is not drawn (AED in text) until a self-hosted symbol face is added.

## 12. Store-family alignment

| Shared element | Ivory maison value                                                                       | Store change needed                                                       |
| -------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Primary button | Plum `#4B2849` fill, ivory text, 48 px, square, sentence case, colour change only        | Drop the shine and padding growth; 53 to 48 px                            |
| Button on dark | Bronze `#BE8658` with ink `#1C1418`                                                      | Adopt on the store's deep-plum form band                                  |
| Ground         | Ivory `#FAF7F2`, white plates, blush `#F6F0F5` as the only tint                          | Replace `#F7F7F7` header grey and Tailwind cool greys with the warm scale |
| Deep plum      | `#2E1A2D` footer                                                                         | Replace `#151414`                                                         |
| Gold           | Bronze `#BE8658`                                                                         | Replace champagne `#BDA966`; re-export the logo                           |
| Display face   | Cormorant Garamond 300 with true italics (owner's choice, commit `0d634ce`)              | Replace Playfair roman                                                    |
| Text face      | IBM Plex Sans 400 and 500                                                                | Replace Montserrat                                                        |
| Radius, depth  | 0; no shadows, gradients only as masks                                                   | Remove strays and `shadow-*`                                              |
| Header         | Same height, ground, logo position, the same rate chip from the same feed                | Make sticky; add the chip                                                 |
| Product stage  | `--stage` per velvet photo, feathered                                                    | Adopt wherever the store shows velvet shots                               |
| Facts          | 4.9 from 680 (13 Oct 2026), the warranty wording, the heritage line, all from one source | Replace 782 and "lifetime"                                                |

Because both sites are now light-first with plum actions and dark vitrines only around velvet photographs, a visitor moving from a brand-site piece page to the same piece in the store sees the same room.

## 13. Risks and mitigations

| Risk                                                                                              | Mitigation                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **"A pale document" again.** Light-first is the direction the owner called a blog                 | Every screen has one focal object at display scale (numeral, line, names, stamps, estimate, portrait, route); grounds change (ivory, blush, stone, plum, plum-900, stage); no module repeats back to back; home copy cut by two thirds; eyebrow-plus-sentence heads replaced by display lines with italic accents                                                                                                                                                                 |
| **Velvet photos look like squares on a different dark**                                           | Per-photo stage colour sampled at build, edge feather, inner frame; a build check warns when a photo's edge drifts more than ΔE 6 from its token                                                                                                                                                                                                                                                                                                                                  |
| **The prototype's figures and the brief's figures differ**                                        | The brief quoted 22K 465.25 / 24K 502.50 / 21K 446.25 / 18K 382.50 (the evening retail table seen on Joyalukkas and Malabar). The site's own snapshot, `src/content/rates/2026-10-13.json`, fetched 08:02 UTC (12:02 in Dubai), holds 22K 468.25 / 24K 505.75 / 21K 449.00 / 18K 384.75, and that is what the build bakes. The prototype uses the snapshot and prints its time. The rate moves during the day; the copy says so ("the board in the branch is the one we sell at") |
| **Three font files**                                                                              | Preload one, subset all, fallbacks metric-matched (§10)                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Stock-looking occasion portraits**                                                              | Kept small except the bridal lead; captions beside, never over; retired as shot list item 10 arrives                                                                                                                                                                                                                                                                                                                                                                              |
| **Thin catalogue (nine velvet pieces, all necklaces)**                                            | Curated by style, not count; counts hidden below three; an honest empty plate for Kuwaiti; "Ask for a video" on every piece                                                                                                                                                                                                                                                                                                                                                       |
| **Unconfirmed facts** (hours, shop numbers, the 35-year figure, promise terms, estimator wording) | Nothing unconfirmed is printed: no hours, generic "ask us" lines, figures from `site.ts` with its `TODO(owner)` flags; the estimator ships only after the owner approves its wording                                                                                                                                                                                                                                                                                              |
| **Effects missing in Firefox and older iPhones**                                                  | Every effect is optional and the static page is the design (checked with reduced motion)                                                                                                                                                                                                                                                                                                                                                                                          |
| **Prototypes shipping to production**                                                             | `public/_proto/` is copied into `dist/` by the build. The pages carry `noindex`; delete the folder (or add it to the deploy ignore list) before launch                                                                                                                                                                                                                                                                                                                            |
| **CSP**                                                                                           | The prototype uses inline scripts for convenience; production moves them to `src/scripts/` as listed in §9                                                                                                                                                                                                                                                                                                                                                                        |

## 14. Spec amendments this direction needs

From analysis §8.0, all required here: distinct grounds including the stage; velvet photos on the stage and never on plum; gradients only as masks; centred display moments (the heritage band, the doors head); 50/50 and 7/5 rows; a real `--container-wide`; display sizes above 72 px for one number or line per section; the motion policy in §3.6; the C-ring as a large motif (the heritage band); journal and FAQ off the home page; the four branches in place of the single-shop description.
