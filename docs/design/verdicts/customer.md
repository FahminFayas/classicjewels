# Customer verdict: Night vitrine, Ivory maison, Live gold

Judge: the customer lens. Indian-diaspora and Arab families buying 22K and 21K gold in Deira, Sharjah and Abu Dhabi, mostly on phones, often checking the day's rate before they set out, and many planning a wedding or a festival purchase. 13 October 2026.

## How I judged

- **What I opened.** The home page and the piece page of each prototype, at 1440 × 900 and 390 × 844, in my own Browser pane tab.
- **What I tried.** The karat keys, the menu drawer and the old-gold estimator. I also read every WhatsApp link the pages build.
- **Full-page captures.** The pane was hidden for part of the session, so I also captured every page in headless Chrome over the DevTools protocol. Each page was shot one viewport at a time while scrolling, so the scroll-driven effects ran.
- **Extra runs.** I repeated the phone captures with reduced motion on, and captured the first phone screen with JavaScript off.
- **What I measured:**
  - page length;
  - fixed chrome;
  - every image's drawn size against its natural size;
  - the number of H1s and words;
  - inline scripts;
  - the LCP element, and every animation running in the first viewport at DOMContentLoaded;
  - an automated contrast scan of every text node on a solid ground (six pages; nothing fell below AA);
  - a search of the source for the banned words and dashes.
- **Claims.** I checked them against `src/data/site.ts`, `src/content/` and the rate snapshot `src/content/rates/2026-10-13.json`.

| Measured                                      | Night vitrine                                                                     | Ivory maison                                                                         | Live gold                                                                            |
| --------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Home length, 1440 / 390                       | 9,263 px (10.3 screens) / 11,317 px (13.4)                                        | 8,044 px (8.9) / 9,311 px (11.0)                                                     | 7,337 px (8.2) / 9,727 px (11.5)                                                     |
| Words in `<main>`, desktop                    | 892                                                                               | 768                                                                                  | 698                                                                                  |
| Fixed chrome on a phone                       | 56 + 57 = 113 px                                                                  | 57 + 57 = 114 px                                                                     | 56 + 56 = 112 px                                                                     |
| Largest velvet photo drawn, home / piece page | 526 / 600 px                                                                      | 480 / 600 px                                                                         | 511 / 600 px                                                                         |
| LCP element on a phone                        | Hero p03 at opacity 1                                                             | Hero p03 at opacity 1                                                                | The H1, then hero p05, at opacity 1                                                  |
| First phone screen with JS off                | H1, piece, 22K, all four karats, source, time, "before making charges and 5% VAT" | Label line, display line, piece, 22K and karats (the chips sit under the action bar) | Rate, karats with stamps, both buttons; the source line is `display: none` on phones |
| WhatsApp for each branch on home              | Yes, with Call and Directions                                                     | No: "Ask us on WhatsApp" is plain text                                               | Yes, with Directions                                                                 |
| Pieces on home                                | All 8 velvet necklaces with "Ask on WhatsApp", and 7 cut-outs                     | One piece at a time beside the styles list (desktop); a rail (phone)                 | Hero, three story cards, styles preview                                              |
| Occasions and Diwali on home                  | Yes; the Diwali deposit is in the hero facts                                      | Yes; the Diwali campaign line                                                        | None                                                                                 |

## Criteria (1 to 10 each)

1. **Clarity in 3 seconds.** On a phone, within one screen and three seconds, can I tell what this shop is, what 22K costs today, where it is and how to ask?
2. **Trust.** The rate's source, time and caveat; the hallmark; the heritage line; real branches; the dated rating. Nothing misleading.
3. **Ease of enquiry.** WhatsApp prefilled per piece and per branch; call; visit; old gold.
4. **Mobile ergonomics.** Thumb reach, fixed chrome, tap sizes, and legibility outdoors in Gulf sunlight.
5. **Cultural fit.** Bridal, festivals, Indian and Gulf styles, 21K.
6. **Speed and calm.** How it will feel on a mid-range Android, and whether anything would confuse or annoy.

| Criterion                             | Night vitrine | Ivory maison | Live gold |
| ------------------------------------- | ------------- | ------------ | --------- |
| 1. Clarity in 3 seconds               | 9             | 8            | 8         |
| 2. Trust                              | 8             | 9            | 7         |
| 3. Ease of enquiry                    | 9             | 7            | 9         |
| 4. Mobile ergonomics                  | 7             | 8            | 8         |
| 5. Cultural fit                       | 8             | 7            | 6         |
| 6. Speed and calm                     | 7             | 8            | 7         |
| **Total / 60**                        | **48**        | **47**       | **45**    |
| **Experience estimate (analysis §3)** | **8**         | **7 to 8**   | **7**     |

---

## Night vitrine (48)

### Strengths

1. **The best first phone screen of the three.** On a 390 × 844 phone the first screen holds:
   - the H1 naming the trade and all three emirates in readable 31 px type;
   - the lit Antique Pearl-Drop Bib;
   - the 22K figure at 92 px with 24K, 21K and 18K beneath;
   - the source, the time and "Before making charges and 5% VAT";
   - WhatsApp, Call, Branches and Rate in the action bar.

   The JS-off capture shows the same screen. A rate checker gets the answer, and a first-timer knows this is a jeweller.

2. **You can see the gold, and ask about any piece in one tap.**
   - All eight necklaces hang in the case wall, each with style, name, karat, reference and its own "Ask on WhatsApp".
   - The piece page leads with a plum "Ask about this piece on WhatsApp", prefilled with the name, reference and URL, then "Call Deira +971 4 255 1288", then "Book a visit to see it", "Which branch has it?" and "Copy the reference".
   - On phones the action bar turns into "Ask about this piece".
3. **The branches are honest, usable doors.**
   - Each door has a three-cell Call, Directions and WhatsApp row. The WhatsApp message asks that branch to "confirm today's hours".
   - The three branches without a number of their own say "Group line +971 4 255 1288".
   - No hours are printed anywhere.

   Festival buyers also see "10% deposit books the day's rate for Diwali, until 10 November" in the hero facts, read from the offer.

### Weaknesses

1. **It is dark, and dark is hardest to read in the sun.**
   - The WhatsApp cell in the action bar is plum on near-black night, so the button shape all but disappears outdoors. This also breaks the direction's own rule that plum never sits on night.
   - The inactive karat figures are Cormorant 300 in muted lilac `#a99fb5`. They pass AA at 7.8:1, but the strokes are thin to read in the sun.
2. **Some ideas would puzzle a family.**
   - The styles section reads "From Italy to Singapore, _with Dubai between_", with "Kuwait, 48°E" and "Istanbul, 29°E". A Gulf or Indian family does not shop by longitude.
   - The "Traditions" nav label is vaguer than "Styles".
   - The case lights keep pieces in the lower half of the screen dim until they reach the middle. A visitor who stops scrolling there sees dull gold.
3. **The prototype's rate shows a simulated refresh.**
   - The page shows 22K 465.25, 24K 502.50, 21K 446.25 and 18K 382.50 with "checked 21:35" (the visitor's clock) and "Down AED 3.00 since 12:02". The snapshot says 468.25, 505.75, 449.00 and 384.75.
   - The 21K figure appears in no research file, and only the footer says the refresh is simulated.

   The phone page is also the longest of the three (13.4 screens; today's site is 20).

### Must change before it ships

- **Action bar.** Fill the WhatsApp cell with bronze and dark ink (6.32:1), or set the bar on ivory, so the main button stands out in daylight.
- **Karat figures.** Set the four karat figures in Plex 500, or Cormorant 400 at the `--on-night-body` colour, so they read outdoors.
- **Styles section.**
  - Rename "Traditions" to "Styles".
  - Lead with the place names and karats, and keep the degrees out of the customer-facing labels.
  - Consider IM's headline "From Kolkata to Kuwait".
- **Case lights.** Finish the light-on by `entry 30%` (or drop the dim state on phones), so a stopped screen never shows dull pieces.
- **Rate figures.**
  - Remove the simulation. Show only fetched values with the fetch time, and the delta only when a real earlier snapshot exists.
  - Confirm the source of the 21K figure.
- **Owner sign-off.** Gate "Old gold, with no weight deduction" on the piece page, and the estimator's basis, on the owner's terms (see "Shared issues").
- **Phone length.** Trim the phone page by at least one screen:
  - turn the daylight tray into a single rail;
  - let the panorama go on phones.

---

## Ivory maison (47)

### Strengths

1. **The most honest rate presentation.**
   - "Rates are the Dubai Jewellery Group's suggested retail figures for 13 October, 12:02. They move through the day; the board in the branch is the one we sell at." That sentence will stop arguments at the counter.
   - It uses only the real snapshot.
   - Kuwaiti has no photograph, so it gets a typeset empty plate instead of a borrowed one.
2. **It answers the questions customers really ask.**
   - "The stamp says _what's inside_" shows 999, 916, 875 and 750, each with a fineness bar, today's rate and what the karat is mostly bought for (21K: "Gulf and Turkish sets").
   - The piece page's "Your quote, _in three lines_" sets out gold value, making charge and 5% VAT.
   - "Can I see it before I decide?" is answered from the product FAQ.

   This is the clearest pricing education in the set.

3. **The best daylight legibility.**
   - Ink and plum on ivory are easiest to read in sun glare.
   - The plum WhatsApp cell stands out strongly from the ivory bar.
   - The hero's WhatsApp and "Visit a branch" buttons sit side by side.

### Weaknesses

1. **The places are whispered.** The H1's place names are a 12 px uppercase gold label, and the line people actually read is "Gold by the gram, at today's rate." At a glance on a phone, "what and where" is weaker than in Night vitrine.
2. **The branches are a dead end on the home page.**
   - Rolla Mall, Safari Mall and Madinat Zayed have only Directions and Branch page.
   - "Ask us on WhatsApp for the shop number and today's hours" is not a link.
   - There is no call link (the group line) for them.
3. **Few pieces on the home page, and the wrong bridal image is the largest.**
   - On desktop the necklaces appear one at a time, and only when you point at a style name.
   - The occasion lead is the Western white-dress stock portrait, drawn at 553 × 737 px. That is the largest image after the hero and beyond the 392 px sharp limit for 2× screens. It is the wrong signal for an Indian or Arab bride.
   - The occasion portraits are also hidden (`.js img.fade:not(.is-in) { opacity: 0 }`) until an inline script marks them loaded.

### Must change before it ships

- **Branch doors.** Add WhatsApp-this-branch and a labelled group-line Call to every door, and make the "Ask us on WhatsApp" line a link.
- **Place names.** Set them where they can be read: the display line, or the label at 15 to 16 px in sentence case.
- **Pieces on home.** Put the eight necklaces on the home page as a case rail, each with "Ask". The piece page's "Eight more, _on the same velvet_" rail already exists.
- **Bridal lead.** Shrink it to 392 px or less, or lead with a velvet bridal piece (p07 or p09) until the occasion shoot.
- **Images.** Remove the `.js` opacity gate on images.
- **Heritage line.** Start the ink-on-scroll at 60 % or more, so the line is never grey while someone is reading it.
- **Estimator.** Owner sign-off on its basis (see "Shared issues").

---

## Live gold (45)

### Strengths

1. **One tap for 21K re-prices the whole page.**
   - In my tab, choosing 21K rolled the hero to 449.00. The header chip changed to "21K 449.00", and the estimator and action bar followed.
   - It works with JavaScript off.
   - For an Arab family buying 21K this is the most useful single feature in the set.
   - The karat buttons also show the stamp that is inside the customer's own piece (999, 916, 875, 750).
2. **The most complete enquiry paths.**
   - On the piece page: a bronze WhatsApp button, "Call Deira", "Book a visit to see it", "Ask us to call you" and "Which branch has it today?".
   - WhatsApp-this-branch on every station.
   - A closing band with both numbers spelled out.
   - The estimator's branch menu composes the message, for example "I have about 55 g of 21K old gold and would like to bring it to the Rolla Mall, Sharjah branch to be weighed".
   - The estimator copy is practical: "Set the weight from your old receipt and the karat stamped inside the piece."
3. **The strongest mobile controls.**
   - The bronze WhatsApp cell is the most visible main button of the three.
   - The karat buttons are about 100 px tall.
   - Small figures are in Plex 500, which reads well outdoors.
   - "WhatsApp us" and "Find a branch" sit in the thumb zone of the first screen.

### Weaknesses

1. **It leaves out weddings and festivals.** There are no occasions, no wedding entry, no Diwali and no Eid on the home page, in mid-October, with the Diwali rate-booking offer live until 10 November. A family planning a wedding has no way in from the home page.
2. **Trust slips on phones and in the styles section.**
   - The source line and "making charge and 5% VAT are added" are `display: none` on phones. A visitor could take 468.25 for an all-in price.
   - "Kuwaiti" is illustrated with p09, the Antique Three-Line Rani Haar. A Gulf customer will see an Indian piece mislabelled.
   - Singapore uses `chain.jpg`, whose charms the direction itself says resemble another brand's mark.
   - The headline "We will have it on the counter" promises more than the FAQ's "usually with a day's notice".
3. **It could read as a trading screen, and it costs more to run.**
   - The desktop numeral is close to 300 px, and the H1 is a small light italic, so a first-timer may take it for a rate site.
   - The touchstone streak looks like a smear until explained.
   - Each karat tap transitions a registered colour across the whole page through `:root:has()`.
   - The streak (`clip-path`) and the ring draw run on load.

   All of this is risky for INP on a mid-range Android.

### Must change before it ships

- **Phone rate.** Show the source and "before making charge and 5% VAT" line on phones.
- **Occasions.** Add an occasions module with Wedding first and the live offer slot to the home page.
- **Kuwaiti and Singapore.** Stop presenting p09 as Kuwaiti; use an honest empty plate. Hold `chain.jpg` until the mark is checked.
- **H1.** Set the H1 upright and at least 26 px on phones.
- **Recolour.** Scope it to the instrument, the chip, the bar and the estimator, and measure INP on a Moto G profile.
- **Prefill URL.** Fix the WhatsApp prefill, which hard-codes `http://localhost:4397/...`.
- **Estimator.** Owner sign-off on its basis (see "Shared issues").

---

## Shared issues (all three)

- **The estimator values old gold at the retail selling rate.**
  - 10 g of 22K shows as AED 4,682.50 or AED 4,683 (Night vitrine shows 4,652.50 from its simulated rate).
  - Shops normally credit old gold at a buying rate, sometimes after a deduction, and the `site.ts` exchange promise is `TODO(owner)`.
  - All three label the figure an estimate. Even so, a family that sees 4,683 online and is credited less at the counter will feel misled.
  - The owner must confirm which rate the exchange uses, and the estimator must use it.
- **English only.** Arab families get no Arabic home, rate or branch page in any direction (analysis idea 20).
- **Stock occasion portraits** remain in all three until the shoot. That includes the Western white-dress wedding, which Live gold avoids only by having no occasions.

## Winner for the customer: Night vitrine

**Why it wins.** It is the only direction where, on a phone, one screen tells you:

- what the shop is;
- what 22K costs today, from whom, at what time, and before what charges;
- that every necklace is one tap from a prefilled WhatsApp;
- that every branch can be called, found or messaged.

It also speaks to the festival season in its first screen.

**The runners-up.** Ivory maison is close behind. It is more honest in detail and easier to read in the sun, but it hides the pieces and strands three of the four branches. Live gold has the best karat switch and enquiry plumbing, but it leaves out weddings and festivals and hides the rate's caveats on phones.

### Graft onto Night vitrine

From **Live gold**:

1. **Page-wide karat memory.**
   - Radio inputs plus `:root:has(#k21:checked)`. Choosing 21K once drives the hero, the header `RateChip`, the action bar's rate cell, the piece `Ticket` and the `Estimator`, with no JavaScript.
   - Scope the recolour to those components only.
2. **Stamps on the karat keys.** Print 999, 916, 875 and 750 under each figure in `RateInstrument`, and set the small figures in Plex 500.
3. **The estimator's branch menu and copy.**
   - Add the "Bring it to" `<select>` that writes the branch into the WhatsApp message.
   - Add the number box with − and + steppers. Allow up to 500 g, since bridal sets run to hundreds of grams.
   - Add "Set the weight from your old receipt and the karat stamped inside the piece."
   - Show the exact sum line, for example "10 g × AED 468.25 per gram (22K) = AED 4,682.50".
4. **Quiet rows on the piece `Ticket`.** Add "Ask us to call you" and rename the branch row to "Which branch has it today?".
5. **Action bar.** Fill the WhatsApp cell in `MobileActionBar` with bronze.
6. **Rate page.** Use the honest "Day 1 of our record" state on `/gold-rate/` until history exists.

From **Ivory maison**:

1. **`KaratStamps` band** ("The stamp says _what's inside_").
   - Place it on ivory after the cases, merged with or in place of the `DaylightTray` on phones.
   - Keep the "mostly bought for" line, which tells a Gulf buyer that 21K is for their sets.
2. **`QuoteLines`** ("Your quote, _in three lines_") under the piece page's spec list.
3. **The counter-board honesty line** under the hero rate: "They move through the day; the board in the branch is the one we sell at."
4. **Typeset empty plate** for any style without a photograph (Kuwaiti), in `CaseWall` and the styles section.
5. **"From Kolkata to Kuwait"** as the styles headline, with place names and karats and no degrees.
6. **Light reading surfaces.** Per-photo `--stage` colours from the build script, and the ivory `CampaignLine` as the offer slot, so the long dark page gets light surfaces where people read.

## Constraint violations and honesty flags found

| Direction     | Finding                                                                                                                                                                                                                                                     | Severity                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Night vitrine | Rate figures not from the feed: the simulated refresh shows 22K 465.25, 24K 502.50, **21K 446.25 (in no source)** and 18K 382.50, with "checked 21:35" taken from the visitor's clock and "Down AED 3.00 since 12:02". Only the footer says it is simulated | High in the prototype; must not reach production |
| Night vitrine | The piece page shows "Old gold, with no weight deduction" as a promise. The wording is from `site.ts`, but it is `TODO(owner)` and unconfirmed                                                                                                              | Medium                                           |
| Night vitrine | A plum WhatsApp cell on the night action bar, against the direction's own rule that plum never sits on night. Weak in sunlight. Not a velvet-on-plum breach                                                                                                 | Low                                              |
| Ivory maison  | Inline-script dependence: an inline head script adds `.js`, and `.js img.fade:not(.is-in) { opacity: 0 }` hides the four occasion portraits until the body script runs. Not the LCP image                                                                   | Medium                                           |
| Ivory maison  | The wedding portrait is drawn at 553 × 737 CSS px from 784 × 1280. That is not an upscale at 1×, but it exceeds the 392 px sharp limit for 2× screens (a 1.41× device upsample)                                                                             | Low                                              |
| Live gold     | Product misrepresentation: p09, the Antique Three-Line Rani Haar, is labelled Kuwaiti in the styles index. `chain.jpg`, which may carry another brand's mark, is used for Singapore                                                                         | High                                             |
| Live gold     | The rate's source and VAT caveat are hidden on phones                                                                                                                                                                                                       | Medium                                           |
| Live gold     | The piece WhatsApp prefill hard-codes `http://localhost:4397/_proto/live-gold/piece.html`                                                                                                                                                                   | Low (prototype)                                  |
| All three     | Inline `<script>` blocks, which the CSP forbids. Each declares them prototype-only, and the production plans bundle them under `src/scripts/`                                                                                                               | Note                                             |
| All three     | The old-gold estimator uses the retail selling rate as the credit rate, before the owner has confirmed the exchange terms                                                                                                                                   | High for trust                                   |

**Checked and clean in all three:**

- No product photo drawn wider than 600 CSS px or larger than its source.
- No velvet photo on plum.
- No LCP element faded in: the hero image and H1 are at opacity 1 at DOMContentLoaded, and the only hero animation is the exit-range recede.
- No AA contrast failure on solid grounds.
- No banned words, em dashes or emoji.
- One H1 per page.
- Fixed phone chrome of 112 to 114 px.
- No hours printed for any branch.
- The rating is 4.9 from 680, dated 13 October 2026.
- The heritage line matches `site.ts`.
