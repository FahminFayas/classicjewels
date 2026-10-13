# Verdict: the creative director's lens

Judge: luxury creative director (maison art direction). Date: 13 October 2026.

Three directions were judged: Night vitrine, Ivory maison and Live gold ("Touchstone").

**Winner: Night vitrine (49/60).** Ivory maison and Live gold trail it, Ivory on 43 and Live gold on 44. Night vitrine should be built, with the grafts listed in §5.

---

## 1. How I judged

I opened every prototype's home page and piece page at 1440 × 900 and 390 × 844 and scrolled each from top to bottom.

**Browsers.**

- I first used my own tab in the Browser pane (`tab-2`). Its compositor kept timing out and returning stale frames, so I closed it.
- The screenshots of record come from a private headless Chrome that I drove over the DevTools protocol, at DPR 1, pausing 700 ms at each scroll stop. Scroll-driven effects were therefore seen at real scroll positions, not on a stretched full-page capture.

**Extra checks.**

- Every page was run a second time with `prefers-reduced-motion: reduce`. Each home hero was run a third time with JavaScript disabled.
- I opened the mega panel on all three. I switched the karat to 24K on Night vitrine and Ivory maison, and to 18K on Live gold.
- A script measured, on each page:
  - every image's drawn size against its file size;
  - the background behind every velvet photo;
  - the LCP element, its opacity and any animation on it;
  - the animations running in the first screen;
  - word count in `<main>`;
  - the H1 count, the font files loaded and inline scripts;
  - horizontal overflow;
  - a rough contrast check on every text node against its nearest solid background.

**Sources for facts.** Every fact was checked against `src/data/site.ts`, `src/content/` and `src/content/rates/2026-10-13.json`.

**Criteria.** Each is scored out of 10.

| #   | Criterion                  | What it asks                                                                                      |
| --- | -------------------------- | ------------------------------------------------------------------------------------------------- |
| C1  | First five seconds         | Does the first screen land as a gold house in Dubai, on desktop and phone?                        |
| C2  | Memorable and distinctive  | Would a visitor describe it afterwards? Does it stand apart from the 25 sites in the analysis?    |
| C3  | Brand fit                  | A Dubai gold house with bullion roots that sells by enquiry, and one family with the store        |
| C4  | Typographic craft          | Cormorant used as a true display face: light weights, scale contrast, true italics, figure styles |
| C5  | Pacing and motion          | One idea per screen; motion that arrives once, means something and never moves the layout         |
| C6  | Coherence and small photos | Home and piece page read as one house, and it still looks premium with 600 px velvet shots        |

---

## 2. Scorecard

| Direction         | C1 First 5 s | C2 Distinctive | C3 Brand fit | C4 Type | C5 Pacing and motion | C6 Coherence and photos | **Total /60** |
| ----------------- | ------------ | -------------- | ------------ | ------- | -------------------- | ----------------------- | ------------- |
| **Night vitrine** | 8            | 8              | 8            | 8       | 8                    | 9                       | **49**        |
| Ivory maison      | 6            | 6              | 7            | 9       | 8                    | 7                       | **43**        |
| Live gold         | 8            | 9              | 7            | 7       | 6                    | 7                       | **44**        |

On the analysis's 0 to 10 experience scale, I expect Night vitrine to reach 8 once the changes in §3.4 and §5 are made, and Live gold and Ivory maison 7.

### Measured facts behind the scores

|                                                            | Night vitrine                                                            | Ivory maison                                  | Live gold                                     |
| ---------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------- | --------------------------------------------- |
| Home length, desktop                                       | 9,263 px (10.3 screens)                                                  | 8,044 px (8.9 screens)                        | 7,337 px (8.2 screens)                        |
| Home length, phone                                         | 11,317 px (13.4 screens)                                                 | 9,311 px (11.0 screens)                       | 9,727 px (11.5 screens)                       |
| Words in `<main>`, desktop / phone                         | **892** / 860 (over the 800 target)                                      | 768 / 746                                     | 698 / 643                                     |
| Piece page length, desktop / phone                         | 3,291 / 4,597 px                                                         | 4,660 / 5,875 px                              | 3,885 / 5,164 px                              |
| Largest velvet photo drawn, home / piece page (source 600) | 560 / 600                                                                | 446 / 600                                     | 544 / 600                                     |
| Any image drawn wider than its file                        | None                                                                     | None                                          | None                                          |
| Velvet photo on plum                                       | None                                                                     | None                                          | None                                          |
| LCP element                                                | Hero `p03` image, opacity 1, no entrance animation                       | Hero `p03` image, opacity 1; exit-only recede | Hero `p05` image, opacity 1; exit-only recede |
| Animations running on the first screen at load             | Digit roll and delta fade (the prototype's simulated refresh), one sheen | None (the header hairline is tied to scroll)  | Streak wipe, C-ring draw (2.4 s), seam sweep  |
| Font files loaded on the first screen                      | 3 (roman, italic, Plex)                                                  | 3                                             | 3                                             |
| Inline script, home / piece (unminified characters)        | 6,788 / 12,289                                                           | 4,552 / 8,128                                 | 3,787 / 4,013                                 |
| Karat switch without JavaScript                            | No: the keys are JS buttons. The baked 468.25 at 12:02 shows correctly   | Yes (radios + `:has()`)                       | Yes (radios + `:has()`)                       |
| Automated contrast failures (final state)                  | 0                                                                        | 0                                             | 0                                             |
| H1 per page                                                | 1                                                                        | 1                                             | 1                                             |
| Horizontal overflow at 390                                 | None                                                                     | None                                          | None                                          |

---

## 3. Night vitrine: 49/60

**The concept.** Walking past the best case in the Gold Souq after dark. The site becomes the room the photos were shot in: `#0b0918`, sampled from the velvet. The live rate is the one instrument in the room.

| C1  | C2  | C3  | C4  | C5  | C6  |
| --- | --- | --- | --- | --- | --- |
| 8   | 8   | 8   | 8   | 8   | 9   |

### 3.1 First impression

A dark room, one white bust lit in a pool of light, and a 200 px champagne "465.25" beside it. The page reads as a gold house in under a second, on both screens. On a phone the H1, the lit piece (335 px) and the numeral all sit inside the first 844 px.

It is the only direction where the small photographs stop looking like photographs. With the 52 % radial spot mask the frame disappears entirely, and each bust floats as an object. That is exactly what a 600 px velvet shot needs.

### 3.2 Three strengths

1. **The case wall: the best small-photo staging of the three.**
   - Eight necklaces hang in a staggered four-column wall at 313 CSS px each, with name and karat in Cormorant italic below.
   - Each case starts dim and its light comes on as it reaches mid-screen. This is done with two layers of the same image, where only the opacity of the masked "light" layer is animated: no animated masks, and nothing scales.
   - It is the only scroll effect in the set that means something, because it is the metaphor itself. It gives the home page what Cartier's film gives Cartier: the merchandise as the spectacle.
2. **"From Italy to Singapore, with Dubai between": the most intelligent module in the set.**
   - Seven traditions are placed by longitude on one bronze line, with Dubai at 55°E marked by the C-ring. The line draws outward from Dubai, and the names arrive in order of their distance from it.
   - It answers the analysis's open question (§4.3: why a Deira counter carries Kolkata, Rajkot, Temple, Turkish, Kuwaiti, Italian and Singapore work) without one paragraph.
   - It is honestly captioned "Schematic". On a phone it collapses into a vertical route.
   - None of the 25 competitors has anything like it.
3. **One house from home to piece page, with the store's own enquiry card.**
   - The piece page continues the night room: the photo at exactly 600 CSS px in a wider pool, sticky.
   - The enquiry surface is an ivory, square ticket with the plum "Ask about this piece on WhatsApp" and an outlined "Call Deira". That is precisely the store's button and corners (analysis §5.2).
   - A visitor who later lands on the store sees the same card in a different room. This is the cleanest store-family bridge of the three.
   - Footer and action bar carry the four rates. The plum WhatsApp cell on the phone bar keeps the plum primary everywhere it matters.

### 3.3 Three weaknesses

1. **The hero says too much at once.** On one screen it carries:
   - a date eyebrow;
   - a 51 px two-line H1;
   - the 200 px numeral with "AED" and "per gram";
   - four karat values;
   - a two-line status sentence;
   - two buttons;
   - a four-cell fact strip, which includes a Diwali promotion.

   The H1 is large enough to compete with the numeral. A maison would give this screen one subject. The 10 % deposit offer in the hero strip is the Damas and Malabar habit the analysis warns against.

2. **Three sections let the night down.**
   - **The daylight tray.** Seven lilac cut-outs at 150 to 158 px read as an e-commerce category bar. It is the weakest screen on the page.
   - **The panorama seam.** The navy-leather `banner-about.jpg` butts straight onto the plum estimator band. The blue-on-red-violet seam is the "navy halo" clash the analysis (§6.2) and the direction's own tone rule warn about, played at band scale.
   - **The occasion windows.** These are still the four stock portraits. The scrims make them acceptable, but they are the least Classic images on the page.
3. **The glass header is see-through, and the copy runs long.**
   - **Header.** `view-transition-name: hdr` makes the header a backdrop root, so the 14 px `backdrop-filter` on its `::before` has nothing to blur. Page text is legible through the navigation, for example "Bring it to a branch" behind "Gold rate Old gold". I confirmed it: setting `view-transition-name: none` restores the blur.
   - **Length.** Home copy is 892 words against the under-800 target.
   - **Headings.** Every H2 uses the same roman clause, italic clause device: "Eight necklaces, _eight collections_", "Rings to anklets, _by the gram_", "Old gold, _on today's scale_", "Come in _and hold it_". By the fourth it is a tic. (Ivory maison and Live gold share it.)

### 3.4 What must change before it ships

1. **Fix the header.**
   - Move `view-transition-name` to an inner wrapper, or make the bar solid `--night-0` at 0.94 or more. Then the blur works or is no longer needed.
   - Re-test the nav text over the fact strip, the plum band and the panorama.
2. **Give the hero one subject.**
   - Make the H1 two-tier, as Ivory maison does: a 12 px tracked label carrying the place names (SEO) inside the same H1, then at most a 32 px line.
   - Drop the date eyebrow; the status line already carries the date and time.
   - Cut the fact strip to three facts: rating, branches, hallmark.
   - Move Diwali to a one-line campaign band below the hero, as Ivory maison does, which drops out on its end date.
3. **Replace the lilac tray on home** with Ivory maison's hallmark stamps band (§5.2 graft 1). Move the cut-out tray to `/jewellery/` and the mega panel.
4. **Separate plum from the leather panorama.**
   - Put the panorama on a `--night-0` band at least 96 px deep, or swap the order: doors first, panorama after.
   - Never let the navy leather touch plum.
5. **Make the karat keys work without JavaScript.** Use a `<fieldset>` of radios with `:has()`, as Ivory maison and Live gold do. Keep `rate.ts` for the digit roll on a real refresh.
6. **Prototype honesty.**
   - The default view must show the baked snapshot: 22K 468.25, 24K 505.75, 21K 449.00, 18K 384.75, "checked 12:02".
   - The simulated refresh currently fills in the brief's figures, including a 21K of 446.25 that no source contains, and stamps the visitor's own clock ("checked 21:48"). Put it behind `?demo=refresh`, as Ivory maison does.
7. **Copy.**
   - Bring `<main>` under 800 words.
   - Vary the H2 shapes. Some should be plain nouns ("The cases", "Four branches") and only one or two per page should carry an italic clause.
8. **Fonts.**
   - Today's first screen needs three files, because of the italic ampersand and the italic piece caption.
   - Either set both in roman until the italic is subset, or subset all three to fit the 2-file, 90 KB budget.

---

## 4. The runners-up

### 4.1 Live gold ("Touchstone"): 44/60

**The concept.** The trader's touchstone. Four karat "needles" re-price the page and change its accent colour. The heritage is told as bar, touchstone, necklace.

| C1  | C2  | C3  | C4  | C5  | C6  |
| --- | --- | --- | --- | --- | --- |
| 8   | 9   | 7   | 7   | 6   | 7   |

**Strengths**

1. **The most distinctive idea in the set.**
   - Choosing 18K rolls the 296 px numeral to 384.75 and changes the streak and accent to the paler 18K colour. The header chip becomes "18K 384.75", and the estimator, ticket and action bar follow.
   - All of it is CSS: radios, `:root:has(#k18:checked)` and an `@property` colour. I confirmed it switches with JavaScript off.
   - Nobody among the 25 does anything like it. It is the "gold is live" principle made physical.
2. **The bullion heritage is told best here.**
   - "Bar, touchstone, necklace" turns the group's real history (bullion trading, then refining, then the jewellery house in 2024) into three cards.
   - Each card has a live rate line: 24K for the bar, the chosen karat for the stone, 22K for the necklace.
   - The touchstone is an authentic gold-trade gesture that no competitor owns.
3. **The most useful estimator.**
   - It has a scale-beam slider, an exact-gram stepper and karat chips that also drive the page karat.
   - Under the result it spells out the sum: "10 g × AED 468.25 per gram (22K) = AED 4,682.50".
   - A branch menu writes the branch into the WhatsApp message.
   - Without JavaScript it shows a worked example.

**Weaknesses**

1. **It reads as a trading desk before it reads as a jeweller.**
   - The home opens on a rate board and then goes straight into the estimator: two numeric instruments for the first two screens. The only jewellery before the fifth screen is one bust.
   - On a phone, the first 844 px holds the numeral, streak, karat plates and buttons. The piece shows only as the top of an arc.
2. **The brush streak and the load-time effects fight the type.**
   - The dry-brush streak under the numeral renders like a highlighter smear beside Cormorant's hairlines.
   - The streak wipe, the 2.4 s ring draw and the seam sweep all run on load, which is three decorative events in the first screen. Van Cleef would allow one.
   - The karat plates mix a 30 px Cormorant karat, 13 px Plex figures and boxed 9 px stamps. That is busy, more dashboard than vitrine.
   - The scattered, tilted cards in "Bar, touchstone, necklace" feel playful for a maison.
3. **It breaks the store family and one fact.**
   - On the dark piece page and in the phone bar, the primary is bronze. The shared plum button never appears on the page where the enquiry happens.
   - The styles index shows `p09` as "From the Kuwait collection", with alt text "Gulf-style necklace". The piece page shows the same photo, rightly, as the Three-Line Rani Haar in the Antique collection (CJ-NK-009). One real piece is therefore presented as two traditions.

**What must change before it could ship**

- Put an ivory ticket with the plum primary on the piece page, and use plum in the phone bar.
- Put a jewellery moment (styles or cases) between the rate board and the estimator.
- Show the piece in the first phone screen.
- Replace the brush streak with a 1 px hairline in the karat colour, and keep one load-time effect at most.
- Reduce the card tilt to 3° or less.
- Give Kuwaiti an honest empty state until it is photographed.

### 4.2 Ivory maison: 43/60

**The concept.** A pale salon with lit cases set into its walls. The rate is posted in plum like the board in the shop.

| C1  | C2  | C3  | C4  | C5  | C6  |
| --- | --- | --- | --- | --- | --- |
| 6   | 6   | 7   | 9   | 8   | 7   |

**Strengths**

1. **The finest typography in the set.**
   - "Gold by the gram, _at today's rate._" at 87 px, with the italic in plum, over a 204 px light plum numeral.
   - 12 px tracked capitals in the nav.
   - The H1 cleverly carries the SEO place names as a small label line inside it.
   - "The stamp says _what's inside_": 999, 916, 875 and 750 at 128 px, each with a bronze bar filled to its fineness and today's rate. It is the most beautiful typographic moment of all three directions.
2. **The most honest and best-paced page.**
   - 768 words and 8.9 screens, with one focal object per screen.
   - Per-photo stage colours are sampled from each photo's own velvet.
   - Kuwaiti gets an honest "not photographed yet" plate.
   - The rate demo is hidden behind `?demo=refresh`, and the default view shows the true snapshot at 12:02.
   - The karat switch works without JavaScript.
3. **The closest family resemblance to the store.**
   - Ivory ground, a plum primary everywhere, the warm neutrals and square corners.
   - "Your quote, _in three lines_" (gold value, making charge, 5 % VAT) on the piece page is the clearest price explanation of the three.

**Weaknesses**

1. **It is a better magazine, not a house.**
   - Light ground runs for most of the page: hero, proof, campaign, heritage, styles, stamps, occasions, doors.
   - An owner who called the current site a blog will see a more elegant version of the same register. The first five seconds are calm rather than stunning.
2. **It hides the merchandise.**
   - The eight-piece tray is removed from home. The velvet pieces appear only one at a time in the hero window and in the styles window, behind hover on desktop.
   - The biggest image on the page is the stock bride with daisies, drawn at 553 × 737. That is above the 392 px limit for sharpness on 2× screens (analysis §6.1), so it is soft on Retina, and it promotes the very "blog cover" imagery the analysis says to retire.
3. **The windows frame the photos instead of dissolving them.**
   - The edge feather inside an inset bronze frame leaves the velvet's square visible, so pieces read as framed photographs on a wall.
   - The heritage line inks in by phrase from 16 % opacity on a scroll timeline. If a reader stops mid-range the text rests at low contrast. It is also the most fashionable effect on the page, and the least necessary.

**What must change before it could ship**

- Add a full-bleed stage band with the eight cases to the home page.
- Demote or remove the wedding portrait (it should be drawn at 392 px or less).
- Give the heritage line full ink when static, and animate only the C-ring.
- Break the run of ivory sections with at least two dark rooms.

---

## 5. The winner, and what to graft onto it

**The winner is Night vitrine.**

- It is the only direction that feels like walking into a house rather than reading about one.
- It makes the 600 px photographs look valuable rather than small.
- Its motion carries its own metaphor: the case lights come on, and the line is drawn out from Dubai.
- Its piece page bridges to the store more cleanly than either alternative.

Its faults are fixable in CSS and copy. Live gold's are structural (it opens as a rate desk), and Ivory maison's are tonal (it is too close to what the owner rejected).

### 5.1 From Live gold

1. **CSS-only karat state across the page.**
   - Replace Night vitrine's JS `aria-pressed` keys with Live gold's `<fieldset>` of radios.
   - Add `:root:has(#k24:checked)` rules so the header chip, phone bar, ticket and estimator all show the chosen karat without script, using the `.k-only.k-NN` span pattern.
   - Keep Night vitrine's per-digit roll for real refreshes only.
   - Do **not** take the page-wide accent recolour. Champagne stays the single numeral colour.
2. **The touchstone, in miniature.**
   - Take the four-streak touchstone card, not the brush streak under the hero, as a small static illustration beside step 1, "Tested at the counter, in front of you", in Night vitrine's plum estimator.
   - Also use it on `/gold-exchange/`. It is the one image that explains testing without a photograph.
3. **The estimator's working.**
   - Graft Live gold's spelled-out sum line, "10 g × AED 468.25 per gram (22K) = AED 4,682.50".
   - Graft the branch `<select>` that writes the branch into the WhatsApp message.
   - Graft the no-JavaScript worked example.
4. **Today's rate on every case.**
   - Add Live gold's per-card line, "22K today 468.25/g", under each case name in `CaseWall`.
   - It puts the rate on the piece (analysis §4.3, white space 2) right inside the vitrine.
5. **"Bar, touchstone, necklace" as the About page chapter** until shot list item 5 exists.
   - Use the bar line-drawing and touchstone cards there, assembled on a `view-timeline` with tilt of 3° or less, instead of Night vitrine's purely typographic placeholder.
   - Keep it off the home page.
6. **A solid header that follows the first section's tone** (`data-tone`). This also cures the backdrop-root blur bug.

### 5.2 From Ivory maison

1. **The hallmark stamps band.**
   - Take "The stamp says _what's inside_" (999, 916, 875, 750 at `--t-stamp`, bronze fineness bars filled on `view()`, today's rate per karat) as Night vitrine's second ivory breath band, in place of the lilac `DaylightTray`.
   - It is honest, typographic, rate-linked and beautiful, and it removes the weakest screen.
2. **The two-tier H1.** A 12 px tracked place-name label and a display line in one `<h1>`. On Night vitrine the display line can stay small (32 px) because the numeral carries the scale.
3. **The campaign line.** Move the Diwali offer out of the hero fact strip into a one-line band that appears only between `startsOn` and `endsOn`.
4. **"Your quote, in three lines" on the piece page.** Place it under the ticket on night, with the blush old-gold teaser restyled as Night vitrine's slim plum band.
5. **Per-photo `--stage` written at build into each product entry.** Use it for every single-piece moment: piece page, collection opener, mega preview. Keep `--night-0` inside mixed walls, where Night vitrine found that p06's lighter stage made a visible square.
6. **Honesty patterns.** The Kuwaiti "not photographed yet" plate, and demo states behind a query flag.
7. **`<details name>` FAQ** on the piece page ("Two things people ask"), with the `::details-content` height transition.

### 5.3 Keep as is in Night vitrine

- Radial spot masks.
- The two-layer case light.
- The longitude line.
- The ivory ticket with the plum primary.
- The 0.94 recede on exit.
- The single sheen.
- Phone chrome of 112 px with a plum WhatsApp cell.

---

## 6. Constraint violations found

### 6.1 None of the three

None of the three:

- draws any image wider than its file in CSS pixels;
- puts a velvet photo (p01 to p09) on plum;
- fades in or `@starting-style`s the LCP element (it is the hero image at opacity 1 in every run, with motion and with reduced motion);
- uses more than one H1, banned words or em dashes;
- loads a third-party script;
- scrolls sideways at 390 px.

My automated check found no AA contrast failures in the final, static state.

### 6.2 Night vitrine

| Issue                                     | Severity                             | Detail                                                                                                                                                                                                                                                                              |
| ----------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Simulated rate shown as the default state | High (prototype only; must not ship) | The page loads the snapshot, then fakes a refresh to 502.50 / 465.25 / 446.25 / 382.50 with "checked {visitor's clock}". The 21K figure of 446.25 exists in no source. The footer discloses the simulation, but the first screen shows unsourced figures and an invented check time |
| Navy-leather panorama against plum        | Medium                               | `banner-about.jpg` meets the plum estimator band with only a hairline between. It is not a p01 to p09 photo, but it is the blue against red-violet clash the analysis forbids, and it breaks the direction's own tone rule                                                          |
| Glass header has no blur                  | Medium (legibility)                  | `view-transition-name` on `.hdr` makes it a backdrop root, so content shows through the nav at 0.78 alpha. Verified by toggling the property                                                                                                                                        |
| Home copy over budget                     | Low                                  | 892 words in `<main>` against under 800                                                                                                                                                                                                                                             |
| Inline-script dependence                  | Medium                               | 6.8 KB inline (the CSP blocks inline scripts). The karat keys and the estimator need it. The baked rate (468.25 at 12:02) renders correctly without JavaScript (verified)                                                                                                           |
| Font budget                               | Low                                  | Three files on the first screen (italic ampersand and caption)                                                                                                                                                                                                                      |
| Unconfirmed promise shown as a heading    | Low                                  | "Old gold, with no weight deduction" and "10 g is about AED 4,652.50 towards this piece" present an exchange term that `site.ts` still marks `TODO(owner)`                                                                                                                          |
| Unconfirmed service                       | Low                                  | "Ask on WhatsApp for another angle or a short video from the counter" (owner decision 9). Shared by all three directions                                                                                                                                                            |

### 6.3 Ivory maison

| Issue                             | Severity         | Detail                                                                                                                                                                                                     |
| --------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stock portrait above its 2× limit | Medium           | `wedding.jpg` (784 × 1280) is drawn at 553 × 737 CSS px. It is under the file width, but above the analysis's 392 px sharpness limit on 2× screens, so it is soft on Retina, and it promotes stock imagery |
| Scroll-linked text opacity        | Medium (AA risk) | The heritage H2 inks from 16 % opacity on a view timeline, so it can rest below 4.5:1 if a reader stops scrolling mid-range                                                                                |
| Inline-script dependence          | Low              | 4.5 KB inline. The karat switch works without JavaScript. The estimator and the styles memory need script                                                                                                  |
| Unsourced line                    | Low              | "the board in the branch is the one we sell at" is not in `site.ts` or the FAQs. "The total you are quoted is the total you pay" is sourced (`faqs/product.json`)                                          |
| Font budget                       | Low              | Three files; the italic display line in the H1 is on the critical path                                                                                                                                     |
| Unconfirmed service               | Low              | "Ask for a video"                                                                                                                                                                                          |

### 6.4 Live gold

| Issue                                          | Severity | Detail                                                                                                                                                                                                                            |
| ---------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| One piece presented as two traditions          | High     | `p09`, the Three-Line Rani Haar (Antique, CJ-NK-009), is captioned "From the Kuwait collection" with alt text "Three-strand 22K gold Gulf-style necklace" in the styles index and the phone rail. The piece page names it Antique |
| Store-family primary not used where it matters | Medium   | Bronze is the primary on the dark piece page and in the phone bar. The shared plum button never appears in the enquiry moment                                                                                                     |
| Motion on load                                 | Medium   | Three decorative animations run on the first screen at load: streak 900 ms, ring 2.4 s, seam 2.2 s. They are not on the LCP, but they go against the "one sheen, once" policy                                                     |
| Image of uncertain provenance                  | Medium   | `chain.jpg`, used for Singapore, shows charms the direction itself says look like another brand's mark                                                                                                                            |
| Inline-script dependence                       | Low      | 3.8 KB inline. The karat switch works without JavaScript, and the estimator has a no-JavaScript example                                                                                                                           |
| Font budget                                    | Low      | Three files; the hero H1 is set in italic, so the italic file is needed for first paint                                                                                                                                           |
| Unconfirmed service                            | Low      | "Ask for a video from the counter"                                                                                                                                                                                                |
