# Engineering verdict: Night vitrine, Ivory maison, Live gold

Judge: principal front-end engineer, who has to build and maintain the chosen direction in this Astro 7 repo. Date: 13 October 2026.

## How the prototypes were tested

- **Pages and widths.** I opened the home and piece prototypes of each direction in my own Browser pane tab at 1440 × 900. The pane stopped compositing frames while it was hidden, so every screenshot after the first two came from the installed Chrome running headless, driven over the DevTools protocol (scratch scripts, not committed). I captured:
  - every screen top to bottom, at 1440 × 900 (DPR 1) and 390 × 844 (DPR 2 and 3, mobile emulation);
  - an overflow check at 768 × 1024.
- **Measured on every page:**
  - the LCP element, and the opacity and animation chain on it;
  - CLS, after load and after a full scroll;
  - the CSS size of every image against its source, at DPR 1 and DPR 3;
  - a WCAG 2.x contrast scan of every visible text node, with opacity and the composited background included;
  - 45 Tab presses (focus ring present, target size);
  - the menus: opened, closed with Escape, focus return checked.
- **Fallbacks:**
  - Reduced motion was emulated.
  - Firefox and iOS 18 were simulated by deleting every `@supports (animation-timeline…)` rule from the CSSOM, then scrolling the whole page.
  - JavaScript was turned off.
- **Sizes.** Each prototype's inline JS was minified with the repo's `rolldown --minify`, and its inline CSS with `lightningcss`.
- **Slow-network LCP.** Measured on localhost at 1.6 Mbps, 150 ms RTT, 4× CPU and 412 × 823. The prototypes serve 39 to 44 KB JPEGs where production will serve AVIFs of about 15 KB, so these figures are pessimistic and only good for comparing the three.

## Criteria (my lens)

|     | Criterion                        | What it covers                                                                                                                                   |
| --- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| A   | Asset feasibility                | The real assets only: CSS size against source, how sharp it looks on 2× screens, stage and mask quality, how the page looks while images load    |
| B   | Performance and platform budgets | CSP (no inline or third-party script), JS ≤ 15 KB, CSS, LCP < 2 s, CLS 0, paint cost                                                             |
| C   | Accessibility                    | AA contrast for every pairing, focus, keyboard, screen reader, reduced motion, one H1, target size                                               |
| D   | SEO and content integrity        | Crawlable real text, heading outline, facts from `site.ts` and the content collections, nothing invented or misattributed                        |
| E   | Maintainability and store fit    | Tokens, content collections, facts in `site.ts`, how far the components reuse across about 25 pages, complexity, family resemblance to the store |
| F   | Progressive enhancement          | Firefox, iOS 18, no JS and reduced motion all give a finished page                                                                               |

## Scoreboard

| Direction         | A   | B   | C   | D   | E   | F   | Total /60 |
| ----------------- | --- | --- | --- | --- | --- | --- | --------- |
| **Night vitrine** | 8   | 7   | 8   | 7   | 7   | 9   | **46**    |
| Ivory maison      | 7   | 8   | 6   | 8   | 8   | 8   | 45        |
| Live gold         | 7   | 8   | 7   | 5   | 5   | 8   | 40        |

## Measurements

### Page length and weight

| Measure                               | Night vitrine                                                           | Ivory maison                        | Live gold                   |
| ------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------- | --------------------------- |
| Home length, 1440 / 390               | 9,263 px (10.3 screens) / 11,298 px (13.4)                              | 8,044 (8.9) / 9,311 (11.0)          | 7,337 (8.2) / 9,727 (11.5)  |
| Horizontal overflow at 390, 768, 1440 | 0                                                                       | 0                                   | 0                           |
| Inline JS, home (min / gzip)          | 4,276 / 1,747 B                                                         | 2,854 / 1,295 B                     | 2,244 / 1,086 B             |
| Inline JS, piece (min / gzip)         | 9,515 / 3,857 B (prototype ?p= data included)                           | 6,976 / 3,013 B (?p= data included) | 2,448 / 1,175 B             |
| CSS, home (min / gzip)                | 41.6 / 8.6 KB                                                           | 42.4 / 8.8 KB                       | 47.9 / 9.8 KB               |
| Simulated mobile LCP, home            | 2.13 to 2.52 s (hero image; a case-wall image starts loading during it) | 1.92 to 2.21 s (hero image)         | 1.59 to 2.04 s (hero image) |
| Simulated mobile LCP, piece           | 1.30 to 1.44 s                                                          | 1.31 to 1.47 s                      | 1.25 s                      |

### Layout shift

| Run                        | Night vitrine                                                                                | Ivory maison                                              | Live gold |
| -------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------- |
| CLS, home, 1440, clean run | 0.042 at first paint (the H1 rewraps on the font swap; the prototype has no metric fallback) | 0.0014                                                    | 0.0069    |
| CLS, home, 390, clean run  | 0.0012 (the delta line pushes the actions down when the rate refreshes)                      | 0                                                         | 0         |
| CLS, piece, 1440           | 0.0007                                                                                       | 0.069 (the prototype's ?p= template fill; prototype only) | 0.0003    |

### Images and LCP

| Measure                                 | Night vitrine                                          | Ivory maison                                                  | Live gold                                         |
| --------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------- |
| Largest velvet photo, CSS px out of 600 | Hero 560; piece 600; cases 313 (desktop) / 171 (phone) | Hero 446; styles window 480; piece 600; rail 300 to 320       | Hero 544; styles preview 512; piece 600; rail 322 |
| Other images                            | Portraits 296 px; panorama 1440 px from 1920           | Lead portrait 553 px from 784 (1.41× device px on 2× screens) | none                                              |
| Drawn above source size                 | none                                                   | none                                                          | none                                              |
| LCP element faded or animated at load   | No (opacity chain 1; the recede runs on exit only)     | No                                                            | No                                                |

### Accessibility and fallbacks

| Measure                                        | Night vitrine                                                                    | Ivory maison                                                                                     | Live gold                                                      |
| ---------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| Contrast failures (scan)                       | 0                                                                                | Heritage H2 phrases at opacity 0.16: 1.34 to 1.40:1. Piece-rail captions at opacity 0.45: 2.43:1 | 0                                                              |
| Focus                                          | Rings on everything; skip link; Escape closes menus and returns focus            | Same                                                                                             | Same                                                           |
| Mobile drawer                                  | Non-modal popover                                                                | Modal `<dialog>`                                                                                 | Non-modal popover                                              |
| Firefox / iOS 18 simulation and reduced motion | Finished; all eight cases lit at opacity 1                                       | Finished                                                                                         | Finished                                                       |
| No JS                                          | Baked 468.25 in the hero; keys inert                                             | Baked figures; CSS karat switch works                                                            | CSS karat switch works; the hero's DOM text reads **"000.00"** |
| View-transition names                          | `hdr`, `bar`, and `piece` on the destination; the clicked card is named on click | Same pattern                                                                                     | Static `piece-cj-nk-005` and `piece-cj-nk-005-pv` on home      |

---

## Night vitrine: 46/60

### Scores

- **A 8.** The radial spot mask (`#000 52%`) removes the 600 px frame better than the linear feather, and needs one stage colour plus one override, not nine sampled ones.
  - Cases at 313 CSS px (desktop) and 171 (phone) sit at or under the 300 px sharp-on-2× line from analysis §6.1.
  - Portraits are kept at 296 px.
  - The hero (560) and the panorama (1440) will be soft on Retina. That is within the rule, but it is the softest hero of the three.
  - While images load, a case shows as an empty dark pool with its caption. That reads as an unlit case, not a broken one.
- **B 7.** JS is 4.3 KB in the prototype, about 6.5 KB planned. Against that:
  - the slowest simulated home LCP of the three, because p01 and p02 in the case wall start downloading while the hero is still loading on a phone;
  - 16 masked image layers per desktop viewport in the case wall (a base and a light layer per case), against the guidance in file 08 of about 10;
  - a 14 px backdrop blur on the header;
  - the delta-line shift above.
- **C 8.** No contrast failures anywhere, including the occasion windows over their scrims.
  - Karat keys are `aria-pressed` buttons with a screen-reader twin.
  - Skip link, rings and Escape all work.
  - Minus points:
    - the phone drawer is a non-modal popover, so the content behind it is not inert;
    - four H2s inside the header popovers come before the H1;
    - footer and breadcrumb links are 17 to 18 px tall (WCAG 2.5.8).
- **D 7.** The rate is real DOM text, and the roll only wraps digits while it runs. The H1 is factual. Minus points:
  - **The prototype simulates a feed refresh on every default load.** It shows a 21K figure of 446.25 that appears in no source, and a "checked 21:34" stamp taken from the visitor's own clock, in the hero, chip, action bar and footer. Only the footer says it is simulated.
  - The longitude line places "Italian" at 12°E and "Singapore" at 104°E, but the content calls them "Italian-style chains" and "Singapore-style chains".
  - "Most people come in for one of four reasons" implies a statistic.
- **E 7.** Tone classes feed semantic variables (`--fg`, `--body`, `--accent`, `--rule`, `--focus`), so one component works on any ground across about 25 pages. That is the cleanest system of the three. Minus points:
  - The site is dark first, so the store family lives only in the ivory ticket, the plum buttons on day surfaces and the plum WhatsApp cell.
  - The glass header over ivory composites to a muddy `#403d48` band, with the section behind ghosting through it.
- **F 9.** Without scroll timelines and under reduced motion, every effect lands on its finished state: all cases lit at opacity 1, the longitude line complete. Without JS the baked rate is correct.

### Strengths

1. **A system rather than a set of sections.**
   - `tone-*` classes plus semantic variables, a `Lit` component (the StageImage), and every scroll effect with a static finished state.
   - It is the easiest of the three to extend to collection, branch and rate pages without new variants.
2. **The rate is honest in the DOM.**
   - Plain text in the HTML, with tabular figures.
   - The roll uses a ghost digit and `translate` only, then returns to plain text after 760 ms.
   - The visible digits are `aria-hidden`, with a screen-reader twin.
3. **The best fallback story, verified.** The Firefox and iOS 18 simulation, reduced motion and no-JS runs all gave a complete page. Nothing is hidden waiting for an observer.

### Weaknesses

1. **Header and pacing details.**
   - The translucent night header over ivory bands reads as a grey bar with text ghosting through it.
   - The home is the longest of the three (13.4 screens on a phone).
2. **Paint and LCP pressure.**
   - Two masked images per case.
   - Case-wall images compete with the hero on a phone.
   - Blur on the header.
3. **Prototype honesty slips.**
   - The simulated refresh with an invented 21K figure and a clock-time stamp runs by default.
   - The geography claims for "-style" collections.

### Must change before it ships

1. **Rate figures.**
   - Remove the simulated refresh.
   - Render only fetched values; the "checked" time comes from `fetchedAt`.
   - Do not show 446.25 anywhere.
2. **Reserve space for the status and delta line** (a fixed two-line block, or the delta inside the existing line) so a refresh never moves the actions.
3. **Prove CLS 0 with Astro's metric-matched fallbacks.** Add `text-wrap: balance` to the H1, and make Lighthouse CI fail above an LCP of 2,000 ms on the home and piece pages.
4. **Header.**
   - Its tone follows the first section: night on night pages, ivory on day pages (the store's header).
   - No translucency over day bands.
   - Keep the blur only over night, or drop it.
5. **Case wall.**
   - One masked image per case, with light-on as opacity on that single image (for example 0.45 to 1).
   - That halves the masked layers to 8 per viewport and removes the duplicate `<picture>` markup.
   - Give the case images `fetchpriority="low"`.
6. **Karat control.** Make it a radio `<fieldset>` that works without JS (graft from Ivory maison). Do not ship inert spans.
7. **Phone drawer.** Use a modal `<dialog>`, or make the background `inert`.
8. **Menu headings.** Turn the mega panel and drawer column headings into labelled `<p>` elements, so the H1 is the first heading.
9. **Longitude content.**
   - Add `longitude` and `place` to the `collections` schema, with reviewed values.
   - Label Italian and Singapore as "-style".
   - Kuwaiti has no piece, so it stays text only.
10. **Panorama seam.** Put ivory or a bronze hairline with night padding between `banner-about.jpg` (navy leather) and the plum estimator. Today they butt directly.

---

## Ivory maison: 45/60

### Scores

- **A 7.** Each velvet photo sits on its own sampled stage colour, which gives the cleanest edges. Kuwaiti gets an honest empty-state plate instead of a borrowed photo. Minus points:
  - the styles window draws the photo at 480 CSS px, and the bridal lead portrait at 553 px from 784, so both are visibly soft on 2× screens;
  - per-photo stage colours need a build-time sampling script and a content field.
- **B 8.** It has:
  - the smallest JS on the home page apart from Live gold;
  - CLS 0 on the home page;
  - one image above the fold;
  - no blur.

  But the prototype depends on an **inline head script** (`document.documentElement.classList.add('js')`) that this CSP blocks, and the `.js img.fade:not(.is-in) { opacity: 0 }` rule depends on it.

- **C 6.** Two real AA failures, both inside signature motion:
  - The heritage H2 rests at opacity 0.16 (1.34 to 1.40:1) until it scrolls to cover 18 to 40 %. A reader who stops with the line in the lower third of the screen sees it at about 1.4:1.
  - Off-centre cards in the piece-page rail are dimmed with `opacity: 0.45`, captions included (2.43:1).

  Otherwise it is the strongest: a modal `<dialog>` drawer, radios for karats with native arrow keys, `<details name>`, and visible focus on the estimator chips and fields.

- **D 8.**
  - Real text throughout.
  - The demo refresh only runs with `?demo=refresh`, and it is labelled.
  - An honest Kuwaiti plate.
  - Minus points: three H2s in the header popovers before the H1, and soft claims ("each style is made the way its own goldsmiths make it", what a karat is "mostly bought for").
- **E 8.** The closest to the existing tokens and to the store:
  - ivory header;
  - plum primary on light grounds;
  - `--surface-*` names kept.

  It also adds a `.track` grid utility. The cost is more new components and the per-photo stage tooling.

- **F 8.** Finished states are verified under reduced motion and without scroll timelines. The image fade depends on a class that production can only add late, from a deferred module.

### Strengths

1. **Real-text rate with no JS.** Four numerals stacked in one grid cell, a radio fieldset, and `:has()` (Baseline) choosing which numeral shows. CLS 0 by construction.
2. **Store-family fit.** Light first, plum actions, the same header ground and logo position. A visitor moving between the two sites sees the same room.
3. **Honest presentation of thin data.**
   - The Kuwaiti empty plate.
   - The demo flag.
   - "Your quote, in three lines".
   - Weight shown as "On request" until it is supplied.

### Weaknesses

1. **The two AA failures above,** both built into the motion that gives the page its character.
2. **A CSP-blocked dependency** (the inline `.js` class), and images that sit at opacity 0 before load.
3. **The experience risk.** The softest images of the three (480 and 553 px), and the most ivory. It risks the "pale document" read the owner is complaining about, so the experiential target depends on the vitrines alone.

### Must change before it ships

1. **Remove the inline `.js` script and the opacity-0 pre-hide.** Either drop the image fade, or have the bundled `fade.ts` mark images that are already complete before any hiding rule applies.
2. **Heritage ink-in:**
   - a floor of at least 0.5 opacity on full-ink colour;
   - a range that completes by `entry 100%`;
   - 3:1 at every resting scroll position.
3. **Piece rail.** Dim the image only, never the caption, or dim with colour tokens rather than opacity.
4. **Image caps.** Styles window image ≤ 420 px; bridal lead ≤ 440 px. Or accept and document the softness.
5. **Small fixes.**
   - Swap the round rate dot for the diamond marker (the radius-0 rule).
   - Move the popover headings out of the outline.
6. **Stage colour tooling.** Budget the build-time sampling script with its ΔE check, or fall back to one stage colour plus overrides.

---

## Live gold: 40/60

### Scores

- **A 7.** p05 (the darkest velvet) for the hero is a smart choice, and every photo stays within its source. Minus points: the hero is 544 px and the styles preview 512 px, both soft on 2× screens.
- **B 8.** It has:
  - the best simulated LCP;
  - CLS of about 0;
  - the smallest JS (2.2 KB);
  - a karat switch that is pure CSS.

  Against that:
  - the largest CSS (9.8 KB gzip);
  - a registered _inherited_ colour (`--assay`) transitioned on `:root`, which restyles the whole document for 600 ms on every karat click (an INP risk on low-end Android).

- **C 7.**
  - No contrast failures, rings everywhere, a live sentence per karat for screen readers.
  - Minus points:
    - a non-modal popover drawer;
    - the copy-reference button is 16 × 22 px;
    - eight hidden preview H3s in the styles index pad the heading outline.
- **D 5.**
  - **The hero rate is drawn by CSS `::before` digit strips over hidden DOM digits that read "000.00".** Copy, Find in page, reader view, translation and no-CSS all show 000.00. File 08 says the rate stays real DOM text.
  - **The Kuwaiti style is previewed with p09,** which the product data identifies as the Antique Three-Line Rani Haar (CJ-NK-009). It is captioned "From the Kuwait collection". The design document itself flags this.
  - "Tell us the piece. _We will have it on the counter_" promises what the FAQ hedges ("usually with a day's notice").
  - The touchstone story implies a testing method that `site.ts` does not state.
- **E 5.**
  - `:root:has(#kNN:checked)` makes one radio in the hero drive the header, footer, action bar, ticket and visit band.
  - Every rate surface renders four `.k-only` variants.
  - `DigitRoll` writes four custom properties per digit.
  - The view-transition names are static per slug, with a `-pv` suffix added by hand to avoid duplicates, and there would be more than 6 named elements on any listing page.
  - Five `!important`.
  - Bronze is the primary on the piece page and in the action bar. With a dark header, it is the furthest of the three from the store.
- **F 8.** Finished without scroll timelines and under reduced motion. The karat switch works without JS. The estimator shows a worked example without JS.

### Strengths

1. **The strongest single idea.** The rate is the hero, and one karat choice re-prices every surface, with no JavaScript.
2. **Lean and fast:**
   - 2.2 KB JS;
   - the best LCP in the throttled runs;
   - CLS of about 0;
   - an estimator that degrades to a worked example.
3. **Honest details.**
   - "Day 1 of our 7-day record".
   - The sum line spelled out ("10 g × AED 468.25 per gram (22K) = AED 4,682.50").
   - A branch `<select>` written into the WhatsApp message.

### Weaknesses

1. **The headline number is not text** (the DOM reads 000.00).
2. **Page-global state** (`:root:has`, `.k-only` ×4, the inherited registered colour) is fragile. Every template must include the radios, or carry a `karat.ts` fallback.
3. **Content integrity and store fit:**
   - p09 misattributed to the Kuwaiti style;
   - an over-firm promise;
   - a bronze primary on the piece page.

### Must change before it ships

1. **Rate as text.** Render the rate as real text. Use the digit strip only during a transition (Night vitrine's method), or stack real-text numerals (Ivory maison's).
2. **Scope the karat state.**
   - Keep it to the instrument (`.board:has(...)`).
   - Update other surfaces through the existing `data-rate` hooks in `rate.ts`.
   - No `:root` transition of an inherited registered property.
3. **View transitions.** Name only the clicked card on `pageswap`, not by static slug.
4. **Kuwaiti** gets an empty state, not p09, and `collections/kuwait.jpg` gets replaced.
5. **Store fit.** Plum primary on the piece ticket. Ivory header on day pages.
6. **Copy and code.**
   - Hedge the counter promise.
   - Confirm the testing method with the owner.
   - Drop `!important`.
   - Make the drawer modal.

---

## Winner for the engineering lens: Night vitrine

It wins narrowly over Ivory maison, and the margin is the reason:

- **Its defects are local.** The header tone, a reserved status line, one mask layer per case, rate figures from the feed only: each is a one-file change.
- **Ivory maison's defects sit inside its signature motion.** The ink-in contrast, the rail dimming and the pre-hidden images all do.
- **Live gold's sit in its architecture.** A generated-content rate, and page-global karat state.
- **Night vitrine is the most likely to reach the 8 out of 10 the brief asks for** with today's assets, without enlarging a photo. It also passed every fallback I ran.

## What to graft onto Night vitrine

**From Ivory maison:**

1. **`RateInstrument` karat control.** The four real-text numerals stacked in one grid cell, with a radio `<fieldset>` and `:has()` scoped to the instrument. It works with no JS and gives native arrow keys. Keep Night vitrine's digit roll for real refreshes only.
2. **The drawer as a modal `<dialog>`,** opened by `commandfor` / `command="show-modal"` with the `nav.ts` fallback, so the background is inert.
3. **The empty-state plate ("Not photographed yet: ask us on WhatsApp")** for any style without its own velvet photo. It applies to the Longitude previews, collection openers and the mega panel, and replaces any borrowed image.
4. **Ivory header on day-led pages** (About, Contact, the reading pages) with the same height and chip. This fixes the grey glass band and matches the store.
5. **Piece page:** `QuoteLines` ("Your quote, in three lines") under the ticket.
6. **`KaratStamps`** (999 / 916 / 875 / 750 with fineness bars filled by `scale` and the per-gram rate) on `/gold-rate/` and `/gold-exchange/`.
7. **`.track` named-line grid utility** (full / wide / content), so sections avoid wrapper nesting.
8. **`Faq` as `<details name>`** with the `::details-content` transition.
9. **The `?demo=` opt-in rule** for any simulated data in prototypes.

**From Live gold:**

1. **Estimator details:**
   - the spelled-out sum line, in an `aria-live` region;
   - a worked example baked into the HTML, so it is complete without JS;
   - the branch `<select>` that writes the branch into the WhatsApp message.
2. **The honest record state.** "Day 1 of our record" until seven snapshots exist, then the 7-day mini record in the instrument's meta line (`Spark`, generated at build time from `src/content/rates`).
3. **Route line drawn with `scale`, not stroke animation** (compositor-only), with the stations aligned to the card dividers, for `Doors` on home and `/stores/`.
4. **"Bar, touchstone, necklace" cards assembled on scroll** (a named `view-timeline`, gated by `@supports`; the finished row is the fallback). Use them as the typographic stand-in for the About page's "From bar to bangle" chapter until shot list item 5 exists, and drop the touchstone implication unless the owner confirms the method.

## Constraint violations found

| Direction     | Violation                                                                                                                                                                                                                                | Where                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Night vitrine | Invented figure shown as today's rate: 21K 446.25 (in no source), plus a "checked HH:MM" stamp taken from the visitor's clock. It runs on default load in the hero, chip, keys, bar and footer, and only the footer says it is simulated | `public/_proto/night-vitrine/index.html` and `piece.html` (the `LIVE` object in the inline script) |
| Night vitrine | Navy leather panorama butts directly onto the plum band. This is not a velvet product photo, but it is the same navy-against-plum seam the rule exists to prevent                                                                        | Home, between the estimator and "Come in and hold it"                                              |
| Night vitrine | Copy implies data: "Most people come in for one of four reasons"                                                                                                                                                                         | Home, occasions H2                                                                                 |
| Ivory maison  | Inline head script (`classList.add('js')`), blocked by the production CSP; an image fade depends on it                                                                                                                                   | `public/_proto/ivory-maison/*.html`, line 10                                                       |
| Ivory maison  | Contrast: heritage H2 at 1.34 to 1.40:1 while resting at opacity 0.16; piece-rail captions at 2.43:1 (opacity 0.45)                                                                                                                      | Home heritage band; piece page "More in the case"                                                  |
| Ivory maison  | Radius: the round rate dot (`border-radius: 50%`); the only allowed curve is the C-ring                                                                                                                                                  | Home hero label                                                                                    |
| Live gold     | The rate is not DOM text: CSS `::before` digit strips over "000.00"                                                                                                                                                                      | Home hero `.reading__num`; estimator result                                                        |
| Live gold     | Misattributed piece: p09 (Antique, CJ-NK-009) shown as the Kuwaiti style                                                                                                                                                                 | Home styles index, Kuwaiti preview                                                                 |
| Live gold     | Promise firmer than its source: "We will have it on the counter"                                                                                                                                                                         | Home closing plum band                                                                             |
| Live gold     | `!important` used five times                                                                                                                                                                                                             | Inline CSS                                                                                         |

**Checked and clean in all three:**

- no "Welcome to", "Discover", "Elevate" or "timeless", no em dashes and no emoji (grep of both pages);
- no image drawn larger than its source (largest ratio 1.0, at 600/600 on the piece pages);
- no velvet product photo on plum;
- no LCP element faded in or given an entry animation (opacity chain 1 at load in all six pages);
- exactly one H1 per page;
- no `on*=` handler attributes;
- view transitions declared only inside `prefers-reduced-motion: no-preference`;
- no third-party scripts.

## Issues that apply to every direction

- **Fonts.** All three set an italic in the first screen, so three font files load on first view: 37.6 + 39.3 + 45.7 = 122.6 KB, against a 90 KB budget. To fix:
  - subset all three;
  - preload only the Cormorant roman;
  - register the italic as an Astro font variant so it gets a metric-matched fallback;
  - or set the first-screen italic accent in roman.
- **Small targets.** Footer and breadcrumb links are 17 to 22 px tall in all three. Give them at least 24 px of line box or spacing (WCAG 2.5.8).
- **Inline prototype JS.** The prototypes' inline scripts must become bundled modules under `src/scripts/`. All three port estimates (6.5 to 7.5 KB minified on the home page) fit the 15 KB budget.
- **Structured data.** None of the prototypes carries JSON-LD. Production keeps the `src/lib/schema.ts` builders unchanged (`JewelryStore`, `ItemList`, `Product` without prices).
- **Prototype folder.** `public/_proto/` is copied into `dist/`. Delete it, or exclude it from the deploy, before launch.
