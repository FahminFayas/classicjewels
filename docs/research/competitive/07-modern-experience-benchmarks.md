# 07 · Modern experience benchmarks: design-led and award-recognised jewellery sites

Research date: 13 October 2026. Viewports: 1440×900 desktop, then 390×844 mobile (reloaded after switching). Read-only throughout: no forms, sign-ins, carts or terms. Cookie banners: Messika "continue without accepting", Missoma "Decline"; Boucheron's banner floats in a corner without blocking anything, so it was left alone.

**Method.** Most facts below come from computed styles, DOM geometry and the Performance API: fonts, hex values, sizes, transition timings, request counts and transfer sizes. The shared browser pane was small, so screenshots were low resolution and only used to judge composition and mood. Transfer sizes are what loaded during a scroll-through on one visit, so treat them as an order of magnitude.

**Geo note.** The browser was located in the UAE, and that is a finding in itself. Messika opened with an Arabic country prompt, Boucheron served `/ae_en` in AED, Eden Garden priced in Dhs, and Tamannaah redirected to its international store (`int.tamannaah.com`).

---

## 0. Sites reviewed and how the award sites were found

| Site                                            | Why it is here                                                       | Recognition (verified on the Awwwards entry page)                        |
| ----------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Mejuri (mejuri.com)                             | Benchmark for direct-to-consumer fine jewellery                      | Brief                                                                    |
| Messika (messika.com)                           | Paris diamond house, celebrity campaigns                             | Brief                                                                    |
| Missoma (missoma.com)                           | UK demi-fine, heavy on content and video                             | Brief (chosen over Monica Vinader)                                       |
| Boucheron (boucheron.com/ae_en)                 | Place Vendôme maison with a UAE storefront                           | Brief                                                                    |
| **Tamannaah Fine Jewellery** (tamannaah.com)    | Indian fine jewellery, the closest category match to Classic         | Awwwards Honorable Mention, 8 Jun 2026 (Paavan Bhavsar; Shopify, GSAP)   |
| **Juri** (jurijewelry.com)                      | Small independent maker, gallery-like layout                         | Awwwards Honorable Mention, 17 Mar 2026 (Polina Lisaia; Webflow, GSAP)   |
| **Eden Garden Jewelry** (edengardenjewelry.com) | Story-led Shopify store with scroll storytelling                     | Awwwards Honorable Mention, 13 Mar 2025 (AZ Agency; Shopify)             |
| **Nida Tabba** (nidatabba.com)                  | Collections built around cultures and regions, like Classic's styles | Awwwards Honorable Mention, 21 Oct 2024 (Areal.design; Contentful, GSAP) |
| 365, A Year of Cartier (365ayearof.cartier.com) | The ceiling for luxury editorial, for reference only                 | Awwwards Site of the Day, 24 Feb 2025 (14islands)                        |

**How the award sites were found:**

- I searched Awwwards for "jewelry", "jewellery", "jewels", "diamond", "cartier" and "gold", then read the award type and date from each entry page.
- Several Site of the Day winners fall before the 2024 to 2026 window and were excluded: ORE (2022), Floema (2021), Aroz (2021) and Limnia (2019).
- Three Cartier projects are event or campaign microsites, not stores, so I did not review them: Watches & Wonders 2025 (Site of the Day, 18 Aug 2025), Watches & Wonders 2026 (Site of the Day, 25 May 2026) and Le Chœur des Pierres (Honorable Mention, 15 Sep 2026).
- One CSS Design Awards web search turned up only an older jewellery winner (Charly Zenger, around 2018). I did not search FWA.

---

## 1. The short answer

Across the eight sites, three things make the experience memorable, and none of them needs WebGL:

1. **They show one thing at a time, at full conviction, and change the pace between sections.** This is the opposite of Classic's current page. Boucheron alternates a film, four products, an editorial split and four more products. Eden Garden alternates forest-green bands (#2F3529) with cream ones (#FDFBF7) across 11 sections. Mejuri sets a lime band directly after a video hero.
2. **Lists become places.** The best interaction pattern here is a list of names that changes a large image when you point at a name:
   - Boucheron's mega menu cross-fades a 451×564 preview image.
   - Tamannaah's collection banner swaps a full-bleed photograph.
   - Nida Tabba lights up a region on a world map.

   Each is cheap to build, and each turns navigation into a small piece of theatre.

3. **The motion is small, slow and purposeful.** Hover image swaps run at 0.3 to 0.4 s, reveals at 0.5 to 1 s, and slider progress at 5 s linear. The single most impressive effect in the set, Eden Garden's collage that assembles as you scroll, uses **native CSS scroll-driven animations with zero JavaScript**.

There are also two things none of them has, and Classic does: a **live daily gold rate** and **four physical counters a short drive apart**. The ranked list below is built around making those two assets the theatre. Classic's small velvet-bust photos are presented as objects in a dark vitrine rather than stretched into heroes.

---

## 2. Ranked ideas for Classic: impact against effort

Impact is the expected effect on the owner's "feels like a blog" complaint and on enquiries. Effort assumes the current Astro 7 codebase. Script sizes are my estimates of minified and gzipped size. "Spec change" lists the rules in `CLAUDE.md` or `docs/design-spec.md` that would have to be relaxed (see `02-current-site-audit.md` §4).

| #    | Idea                                                                                                                                                                                                     | Seen on                                                                           | Impact         | Effort                      | New JS                     | Spec change needed                                          |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------- | --------------------------- | -------------------------- | ----------------------------------------------------------- |
| 1    | **Dark vitrine product theatre.** A product surface matched to the velvet (around #14112A to #1A1430), with square cells joined by hairlines and no white plates.                                        | Boucheron (hairline grid), Messika (hover swap)                                   | High           | S                           | 0                          | More than two dark bands per page; product sections on dark |
| 2    | **Twin enquiry calls to action on the product page, plus a mobile action bar.** "Ask on WhatsApp" and "See it at a branch" in a sticky info column; a bottom bar with WhatsApp, Call, Branches and Rate. | Tamannaah (Add to cart beside Enquire), Messika (bottom tab bar)                  | High           | S                           | 0 to 0.2 KB                | None                                                        |
| 3    | **Gold rate as the hero instrument, plus a ticker.** Today's per-gram rates set as the hero's "fact stack", with a slow marquee strip below and a numeral roll when the feed updates.                    | Mejuri (numbers as hero copy), Juri (live data in chrome), Nida Tabba (name band) | High           | S                           | +0.3 KB on `rate.ts`       | Zero-motion rule                                            |
| 4    | **Styles index with image preview.** Kolkata, Rajkot, Temple, Antique, Turkish, Kuwaiti, Italian and Singapore set large; hover, focus or tap swaps the preview, with piece counts.                      | Boucheron mega menu, Tamannaah banner, Juri counts                                | High           | S                           | 0 (CSS `:has()`) or 0.4 KB | No hover on images                                          |
| 5    | **Cross-document page transitions**, so the product tile image morphs into the product page plate.                                                                                                       | None of the eight; native CSS                                                     | Medium to high | S                           | 0                          | Zero-motion rule                                            |
| 6    | **Band rhythm and editorial splits.** Alternate plum-deep and ivory bands; 5/7 and 6/6 text-and-image splits; one oversized type moment per screen.                                                      | Eden Garden, Boucheron                                                            | High           | S                           | 0                          | "Max two plum bands"; one rhythm                            |
| 7    | **Salon-hang layout for small photos.** Irregular sizes (280 to 420 CSS px) and offsets on dark, so the 600 px photos read as curated rather than as thumbnails.                                         | Juri                                                                              | Medium to high | S to M                      | 0                          | None                                                        |
| 8    | **Scroll-assembled story**, "from bar to bangle": a Classic Group bullion bar, then a sketch or wax, then the finished piece on velvet. Cards fly into place as you scroll.                              | Eden Garden (CSS scroll-driven)                                                   | High           | M (needs 2 or 3 new photos) | 0                          | Zero-motion rule                                            |
| 9    | **Map of styles and map of branches.** An SVG map from Italy and Turkey across the Gulf to India and Singapore, with a pin per style. A second map shows the four branches.                              | Nida Tabba                                                                        | High           | M (SVG work)                | 0.6 KB                     | None                                                        |
| 10   | **Collection pages as chapters.** Film or hero, then what makes the style, how it is made, the pieces, and visiting a branch. Sticky media column.                                                       | Boucheron collection story, Cartier 365                                           | Medium to high | M                           | 0.5 KB                     | None                                                        |
| 11   | **Header that hides on scroll down and returns on scroll up**                                                                                                                                            | Boucheron, Nida Tabba                                                             | Medium         | S                           | 0.4 KB                     | None                                                        |
| 12   | **Live branch status**, for example "Deira · open now", computed from confirmed hours                                                                                                                    | Juri (live city clocks)                                                           | Medium         | S                           | 0.3 KB                     | Needs owner-confirmed hours                                 |
| 13   | **Promise strip** repeated between merchandising blocks and under the product photo                                                                                                                      | Mejuri, Missoma, Messika                                                          | Medium         | S                           | 0                          | None (facts from `site.ts` only)                            |
| 14   | **"Find your style" rail.** Style chips filter a rail of pieces in place.                                                                                                                                | Missoma ("which one are you" framing)                                             | Medium         | S                           | Reuses `filter.ts`         | None                                                        |
| 15   | **Karat and metal guide grid** (24K 99.9%, 22K 91.6%, 21K 87.5%, 18K 75%) beside today's rate for each                                                                                                   | Eden Garden (stone library)                                                       | Medium         | S                           | 0                          | None                                                        |
| 16   | **Layered parallax collage**: an inset image drifting 24 to 40 px                                                                                                                                        | Nida Tabba, Juri                                                                  | Low to medium  | S                           | 0                          | Zero-motion rule                                            |
| 17   | **Vertical video rail "from the counter"**: click-to-play, posters only                                                                                                                                  | Missoma (shoppable video)                                                         | Medium         | L (needs content)           | 0.5 KB                     | None                                                        |
| Skip | Magnetic cursor, WebGL or 3D, numeric loaders, auto-advancing carousels, entry pop-ups                                                                                                                   | Cartier 365 (WebGL); popups on Messika and Missoma                                | n/a            | n/a                         | n/a                        | n/a                                                         |

**JavaScript budget for the whole list:** under 3 KB of new gzipped script. Every effect degrades to a complete, static, readable page.

---

## 3. Site profiles

### 3.1 Mejuri

**Pages visited:** home (desktop and mobile), the "All Jewelry" mega menu, and the Tube Huggie Hoops product page.

**First 5 seconds:** a black header strip, a lime-on-dark hero and a huge lime wordmark. It reads like a campaign poster, not a shop. The hero opens on numbers (five restoration figures for its traceable-gold line) instead of a slogan.

**Hero:**

- **Composition:** a 671 px block below a 32 px announcement strip and a 57 px black sticky header, split into two halves.
  - Left half: a textured green photograph carrying a stacked list of five figures, set in 14 px SyndicatGrotesk caps in lime #DEFF9D with a footnote. The wordmark is set enormous across the bottom-left, also in lime.
  - Right half: one pendant on pale grey.
- **Media:** a muted looping video with a poster frame. Desktop gets a 2160×896 file; mobile gets a separate 586×840 portrait file.
- **Type and call to action:** H1 64 px, weight 500, 0.05em tracking, caps. The only call to action is the product name and one "Shop now" text link.

**Navigation and mega menu:**

- Black sticky bar, 57 px, with 14 px SyndicatGrotesk at weight 500.
- Items: All Jewelry, Best Sellers, New In, Collections, Jewelry Essentials, Get Inspired, plus the campaign as a nav item.
- Utilities on the right: Search, "Your Store", wishlist and bag.
- "All Jewelry" opens on click. The panel is white, about 844 px tall, covers two-thirds of the width, and holds three text columns (Categories, Featured, Materials). There are no images.

**Visual language:**

- **Palette:** white #FFFFFF; ink #0A0A0A; black bands #000000; campaign lime #DEFF9D; warm greys #68675E and #79786C for secondary text; image wells #F8F8F8, #F6F6F6 and #F3F3F3; a sand badge #EAC37C.
- **Type:** SyndicatGrotesk (weight 500, caps, tracked) for every heading and the UI; SimonMono for body text; a display face for the wordmark. Scale 64 / 32 / 24 / 14.
- **Shape and imagery:** radius 0, no shadows. Imagery is macro textures, product on flat grey, and close-ups of ears and necks. Media runs edge to edge in halves.

**Motion and interaction:**

- Nearly static. Colour and underline (background-size) transitions run 0.3 s cubic-bezier(0.25, 0.1, 0.25, 1); opacity and filter also 0.3 s.
- No keyframe animations, scroll effects or page transitions.
- The one tactile idea: every product card holds its own horizontal scroll-snap image strip (`scroll-snap-type: x mandatory`), so you swipe through angles inside the card.

**Products:**

- **Home rail:** a "picked for you" rail of 10 cards. Each has a grey image well, a badge (for example editor's pick), the name in caps, price, a material line and a quick "Add".
- **Product page:**
  - Gallery: seven square images stacked in a 691 px left column (2000 px sources).
  - Details: name, a 4.8 rating, price, material selector, add-a-charm, and Add to bag.
  - Promise row under the gallery: two-year warranty, free returns and exchanges, free shipping.
  - Below: accordions for materials, sustainability and shipping, then a "why we love it" bullet list.

**Trust and conversion:** a "stores and services" trio (stores, piercing studio with booking, private events), the promise row on product pages, ratings, a 60 px chat bubble, and "Your Store" in the header.

**Mobile:** header 43 px; H1 40 px. The hero stacks the figures over the texture, then the product image with the wordmark rotated 90° up the left edge in lime. Page height 5,552 px, no horizontal overflow.

**Performance feel:** a fast first paint, but heavy third parties: 252 requests, and 54 external plus 47 inline scripts across about 25 third-party hosts (ad pixels, analytics, chat, fraud checks, reviews). About 1 MB of images and 381 KB of script on load.

**Strengths:**

- Numbers as headline copy: concrete and checkable, which is rare in jewellery.
- One accent colour used with discipline makes the campaign instantly recognisable.
- An explainer band directly after the hero answers "what is this?" before it sells.
- The promise row sits exactly where the eye leaves the photo.
- Swipeable images inside each card.

**Weaknesses:**

- A short home page (3,893 px) with little story beyond one campaign.
- A text-only mega menu.
- Third-party sprawl.
- 14 px lime caps over a busy texture is borderline legible.

**Steal-worthy, ranked:**

1. **A fact stack as the hero copy.**
   - _Why it works:_ precise numbers read as proof; adjectives read as advertising.
   - _Classic:_ make the stack the live rate: 24K, 22K, 21K and 18K per gram from the feed, with an "updated at" time. Add only facts from `src/data/site.ts` (four branches, three emirates, Classic Group heritage). Nothing invented.
2. **An explainer band straight after the hero.**
   - _Why it works:_ it teaches before it asks.
   - _Classic:_ a plum band explaining how the day's rate and the piece's weight set the price. Link to the rate page and to old-gold exchange.
3. **A promise row under the product photo.**
   - _Why it works:_ reassurance at the moment of hesitation.
   - _Classic:_ karat and hallmark, weight, exchange, and viewing at a branch. Use only promises held in `site.ts`.
4. **A services trio with a booking action.**
   - _Classic:_ four branch tiles, each with WhatsApp, Call and Directions.
5. **Swipe between angles inside a card.**
   - _Classic:_ only where a piece has two or more photos. Most have one, so this is low priority.

---

### 3.2 Messika

**Pages visited:** home (desktop and mobile) and the menu drawer (read from the DOM).

**First 5 seconds:** three interruptions before the page. First an Arabic country prompt, then the cookie banner, then a newsletter modal with an image. Behind them is a full-screen portrait of the ambassador wearing the gold Move line, with a centred caps title.

**Hero:**

- A 900 px black section with a full-bleed portrait photograph.
- H2 at 40 px Futura PT weight 500, caps, white. The page's real H1 is a 16 px SEO line.
- A "discover" call to action.
- A three-slide auto-advancing carousel whose progress bullets fill over 5 s linear per slide (keyframes `bullet-1-slide` to `bullet-3-slide`).

**Navigation:**

- A fixed 132 px header: a one-line service strip, then the logo row.
- Left: "Menu" hamburger and "My wishlist". Centre: the wordmark. Right: search, account and cart.
- The menu is a 540 px white drawer from the left with 25 images. Top level: the Move line, by category, by collection, gift ideas, high jewellery, the maison, boutiques, then login, favourites, help and services.

**Visual language:**

- **Palette:** white #FFFFFF, black #000000, greys #3D3D3D and #727272, and wells #F9FAFB.
- **Type:** Futura PT only (441 of 441 text nodes). H2 40 px on desktop and 32 px on mobile, caps, weight 500; body 16 px.
- **Shape and imagery:** radius 0, no shadows. Imagery is high-polish campaign portraits, model-worn category tiles and packshots on white.

**Motion and interaction:**

- Tailwind-default transitions (all 0.3 s cubic-bezier(0.4, 0, 0.2, 1)) and an underline background-size of 0.4 s.
- Twelve elements slide or fade with transform and opacity over 1 s cubic-bezier(0.175, 0.885, 0.32, 1).
- Card hover swaps the packshot for a worn shot; the slider shows progress bars.
- No scroll-driven effects, no page transitions.

**Products:**

- **Category carousel:** four model-worn tiles at 434×543 (4:5) with caps labels.
- **"Our selection" carousel:** 14 cards. Each has a 304×304 square packshot with a worn image underneath at opacity 0, revealed on hover; three 16 px metal swatches (yellow, white and pink gold); the name; a metal-and-stone line; and the price in € at 16 px.
- **Second full-screen section:** a video whose 960×540 source is stretched to 1425×900, so it is visibly soft.

**Trust and conversion:** an "e-boutique benefits" row (an adviser on contact, secure delivery and free returns, the gift box, instalments). The footer has a phone number, "find a boutique" and the FAQ.

**Mobile:** header 120 px; hero 787 px; a portrait 540×960 video. A **fixed 57 px bottom bar** holds Home, Menu, Search, Account, Contact (a `tel:` link) and Cart.

**Performance feel:** 115 requests, 52 scripts and about 2.2 MB of images. Smooth once inside, but the pop-ups make the start feel slow.

**Strengths:**

- The bottom tab bar puts "contact" in the thumb zone.
- The packshot-to-worn hover swap.
- Metal swatches on cards.
- Visible slider progress.
- A benefits row.

**Weaknesses:**

- Three entry interruptions.
- A leaked CMS placeholder key (`{{ ... }}`) visible in a home block.
- A 960×540 video stretched to full screen.
- One typeface with no contrast of voice.
- The desktop menu is hidden behind a hamburger.

**Steal-worthy, ranked:**

1. **A mobile bottom action bar.**
   - _Why it works:_ contact becomes one thumb away on every page.
   - _Classic:_ four items (WhatsApp, Call, Branches, Today's rate) in a 56 px bar plus `env(safe-area-inset-bottom)`. Plain links, no script.
2. **A hover cross-fade to a second view.**
   - _Why it works:_ it rewards curiosity without a click.
   - _Classic:_ only where a second photo exists, as an opacity cross-fade over 0.4 s. Never zoom a 600 px photo.
3. **Karat chips on cards, adapted from the metal swatches.**
   - _Classic:_ text chips such as "22K · 38.4 g", taken from content.
4. **A progress bar on anything that rotates.**
   - _Classic:_ if a hero ever rotates, a 5 s linear bar plus a visible pause button (WCAG 2.2.2).
5. **A benefits row.**
   - _Classic:_ "Buying at Classic" (hallmark, exchange, branch viewing, WhatsApp), from `site.ts`.

---

### 3.3 Missoma

**Pages visited:** home (desktop and mobile) and the mega menu (read from the DOM).

**First 5 seconds:** a consent banner, then a country and currency modal, then a 10%-off pop-up. Behind them is a two-panel hero: video on the left, a still on the right, each telling its own story.

**Hero:**

- A 650 px split. Left: a 712×650 auto-playing video (1080p at 7.2 Mbps). Right: a 712×650 still.
- Each panel carries a bottom-left white serif headline at 28 px (ivypresto-headline), a 14 px line and an underlined text link.

**Navigation:**

- A 36 px announcement bar and a 69 px header, both sticky.
- The mega menu has four text columns (Categories, Edits, Collaborations, Materials) plus six "trending" image tiles.
- On mobile, a horizontally scrolling track of trending pills sits under the header.

**Visual language:**

- **Palette:** white #FFFFFF, ink #121212, black #000000, light blue #A5C7DB and warm #FAF9F7 wells.
- **Type:** Helvetica Neue for body and UI. Display is a thin serif (ivypresto-headline, weight 100) at only 26 to 28 px.
- **Shape and imagery:** pills animate their radius over 0.5 s. Imagery is lifestyle, stacked looks and macro shots.

**Motion and interaction:**

- Text decoration 0.1 s.
- Hover image swap with opacity 0.4 s cubic-bezier(0.25, 0.46, 0.45, 0.94).
- Scroll-snap rails (Swiper).
- A shoppable-video carousel whose centre card is enlarged (300×500 against 300×388 neighbours).
- `prefers-reduced-motion` rules are present.

**Products:**

- **A "which one are you" rail:** cards at 214×269 (4:5) with a hover second image, each tagged with a style descriptor (for example "Statement").
- **Category tiles** with playful names.
- **Edits:** under £100, sets, most gifted.
- **Shoppable video:** six 9:16 clips with the product and price.

**Trust and conversion:**

- A promise strip mid-page: two-year warranty, free delivery threshold, 60-day returns.
- A stores block with "plan your visit" and two booked services.
- An appointment pop-up component.

**Mobile:** the hero stacks into two 390×500 panels, so the first product appears after roughly 1,300 px. Header layers total 36 + 50 px.

**Performance feel:** the heaviest site in the set. 500 requests; 86 external and 160 inline scripts; **8.6 MB of video** on load; 1.3 MB of images; about 1 MB of script.

**Strengths:**

- Two stories above the fold.
- A quiz-like framing that invites self-identification.
- Shoppable video.
- A promise strip mid-page.
- Booked in-store services.

**Weaknesses:**

- Three interruptions.
- 8.6 MB of video.
- Display type too small to feel editorial.
- The mobile hero pushes products down.
- Module overload.

**Steal-worthy, ranked:**

1. **A two-up split hero.**
   - _Why it works:_ two reasons to stay, and visitors choose their own door.
   - _Classic:_ left, the live rate instrument on plum. Right, one style story with one piece in a velvet vitrine.
2. **The "which one are you" framing.**
   - _Classic:_ a "find your style" rail. Eight style chips filter pieces in place with the existing `filter.ts`. Keep the voice plain.
3. **A promise strip between merchandising blocks**, using `site.ts` promises only.
4. **Booked services.**
   - _Classic:_ old-gold valuation and exchange visits at a named branch, through WhatsApp.
5. **Later:** a vertical "from the counter" video rail with posters and click-to-play. Never auto-play six videos.

---

### 3.4 Boucheron (UAE storefront)

**Pages visited:** the UAE home page (desktop and mobile), the Jewellery mega menu, and the Lierre de Paris collection story page.

**First 5 seconds:** a white page, a large title set in wide engraved caps at the top-left, then a framed film. It feels like an art book. Quiet confidence, and nothing blocks the view.

**Hero:**

- H1 at 60/70 px in Sackers Gothic Std Light (a wide engraved-caps face), transformed to lowercase, starting at x 64.
- One 15 px line and a "Discover" text link.
- Then a **16:9 film at 1297×729, inset with 64 px side margins**: auto-play, loop, poster frame, 1280×720 source. It is not full-bleed.

**Navigation and mega menu:**

- **Header:** 125 px, white. Top level: High Jewelry, Jewelry, Watches, Our Maison, Contact us. The header hides on scroll down and slides back on scroll up (`top` transition 0.2 s ease-in).
- **Mega menu:** a full-width 780 px panel on #F2F2F2 with four text columns (By category, By collection, Bridal, Discover) and a 451×564 (4:5) image on the right.
- **Image preview:** 13 images are stacked in that slot. They cross-fade as you hover each link: opacity over 0.4 s ease-in after a 0.4 s delay.

**Visual language:**

- **Palette:** white #FFFFFF, black #000000, panel #F2F2F2, tile hairline #E7E7E7 at 0.8 px. Collection accents: navy #27455C, greens #468254 and #014841.
- **Type:** Sackers Gothic Light for display (60 / 28 / 14 px, lowercase) and Moderat for 15 px body.
- **Grid:** 64 px margins and two 624 px columns with a 48 px gutter. Product rows run edge to edge.
- **Shape and texture:** radius 0, no shadows, no texture.

**Motion and interaction:** restrained. Background 0.2 s ease-in, opacity 0.4 s ease-in, accordions with max-height and opacity over 0.2 s, and a few slow 2 s ease-out fades. No scroll effects, no page transitions.

**Products:**

- **Product rows:** four 335 px square tiles joined by 0.8 px #E7E7E7 hairlines, so the row reads as a cabinet of cells. Names in Sackers 14 px lowercase; prices in AED (47,100 to 362,000 in the rows seen).
- **Home rhythm:**
  1. Film.
  2. Four products.
  3. Editorial split: a creative director quote beside a 624×781 image.
  4. Four products.
  5. Services split.
- **Collection story page (5,654 px):**
  1. Film at 1345×756.
  2. H1 and a manifesto.
  3. Image-and-text split.
  4. A 4×2 product grid of 315 px squares.
  5. A craft video at 624×351 with text.
  6. An image with an invitation to visit a boutique.

  This is a complete chapter template.

**Trust and conversion:** "Contact us" in the top nav. The footer has hours, live chat, phone, email, Book an appointment, Prepare my in-store visit, Find my boutique, special orders, after-sales and care.

**Mobile:** header 56 px. The 40 px H1 wraps to five lines (200 px tall) above a small 358×202 video. Products sit in a 2×2 grid of 186 px squares; editorial images are 358×448.

**Performance feel:** Magento (Hyvä theme with Alpine.js) and Swiper; 173 requests; 4.8 MB of video; 856 KB of images; 268 KB of script. Calm and quick after the film.

**Strengths:**

- The hairline cell grid.
- The mega-menu preview image.
- The editorial chapter template.
- Restraint and consistent margins.
- Visit and appointment services everywhere.

**Weaknesses:**

- The UAE store shows a UK phone number and CET hours.
- The mobile hero is a small film under a tall title.
- Almost static, which comes close to the "document" feeling Classic is trying to escape.
- Lowercase engraved caps can read as an affectation.

**Steal-worthy, ranked:**

1. **A hairline grid of square cells.**
   - _Why it works:_ small square photos become a cabinet, not a list.
   - _Classic:_ it fits the 600×600 photos and the current tokens (radius 0, no shadows, hairline rules). On the dark vitrine, use `--rule-on-plum`.
2. **A mega-menu preview image.**
   - _Classic:_ hovering a style name in the menu swaps a 4:5 or square preview. The velvet photos at 300 to 360 px are ideal here.
3. **A chapter template for every style page.** See idea 10.
4. **Big type with framed media instead of full bleed.**
   - _Why it works:_ it suits a brand with few high-resolution assets.
5. **A header that hides on scroll down and returns on scroll up.**
6. **"Prepare my visit".**
   - _Classic:_ a shortlist of pieces sent as one WhatsApp message to a chosen branch. No form.

---

### 3.5 Tamannaah Fine Jewellery (Awwwards Honorable Mention, June 2026)

**Pages visited:** the Awwwards entry; the international home page (desktop and mobile); The Rib collection; the Orb Hoops product page.

**First 5 seconds:** a full-screen moving image (a model in a pool), one centred caps title and an outlined button. Nothing else on the page. It is a poster.

**Hero:**

- A full-screen slider at 1425×900. Slide 1 is a video (1920×1080 at 7.2 Mbps); slide 2 is a still.
- A centred 16 px caps title and a "most popular" outlined button at the bottom centre.
- The international home page is 1,568 px in total: slider, newsletter, footer.

**Navigation:** a 61 px sticky white header. The Awwwards entry credits a vertical menu and a vertical search panel; I did not open either.

**Visual language:**

- **Palette:** white #FFFFFF and #F7F7F7, ink #090909 and #121212, price grey #9F9F9F, tile #F0F0F0.
- **Type:** one family, Red Hat Display. Names at 14 px caps, body at 16 px.
- **Shape and imagery:** radius 0. Model editorials and macro shots.

**Collections:**

- Each collection is named with a short three-part idea after the name. The Rib, for example, is paired with words about form and rhythm. A product group becomes a concept.
- **Collection page layout:**
  1. A full-bleed 1425×900 banner.
  2. A 457 px intro paragraph pushed to the right (x 928).
  3. A four-column grid of 306×486 cards. Each image is 306×437 (portrait, about 7:10) with its own previous and next arrows and a wishlist heart. Name 14 px caps; price 14 px #9F9F9F.

**Product page:**

- **Gallery:** six portrait images (712×1018) stacked down the left half.
- **Info column (right, sticky at top 30 px):**
  - Name, price and an import-duty note.
  - A description giving the diamond count and the metal.
  - Product code and lead time.
  - **Two equal 460×40 buttons: Add to cart (#090909) and Enquire (white, outlined).**
  - Accordions.
- **Interactive collection banner (below):** a 900 px full-bleed section listing five collection names at 14 px caps. The active name is white; the others are #9F9F9F at 0.7 opacity (colour and opacity over 0.3 s). Hovering a name swaps the full-bleed photograph: images are stacked at 110% scale (1567×990) and their wrappers cross-fade.

**Motion and interaction:** GSAP (per the Awwwards tags); Swiper for the slideshow and the card sliders; hover image swaps.

**Trust and conversion:** an Enquire button on every product page, plus "meet the founder", about and store pages. No reviews.

**Mobile:** full-screen 390×844 slides, cropped from the same landscape 1080p video; header 61 px.

**Performance feel:** 142 requests and **17 MB of video** on the home page, served to phones as well; 334 KB of images; 209 KB of script.

**Strengths:**

- Enquire sits beside the purchase button.
- The interactive collection banner.
- Concept naming for collections.
- A sticky info column.
- Quiet, consistent type.

**Weaknesses:**

- A home page with no content beyond the slider.
- 17 MB of video sent to phones.
- Price grey #9F9F9F on white is about 2.6:1, which fails AA.
- The collection switcher works on hover only.
- No visible pause control on the auto-playing slider.

**Steal-worthy, ranked:**

1. **Twin calls to action on the product page.**
   - _Why it works:_ it legitimises asking before buying, which is exactly Classic's model.
   - _Classic:_
     - Primary: "Ask about this piece on WhatsApp", prefilled with the piece code and page URL.
     - Secondary: "See it at a branch", which opens a branch picker.
     - Sticky in the info column; mirrored in the mobile bottom bar.
2. **The interactive collection banner, as a styles switcher.**
   - _Classic:_ works on hover, focus and tap. On dark plum, set the active name in `--gold-300` and the others in `--ink-on-plum-muted`, not by lowering opacity, so AA holds.
3. **Concept naming.**
   - _Classic:_ each style's name plus one plain line on what makes it recognisable. Specific, in Classic's voice; no slogans.
4. **An offset intro paragraph** under a banner on style pages. Cheap, and makes the page feel composed.
5. **Product code and weight on the product page**, doubling as the WhatsApp reference.

---

### 3.6 Nida Tabba (Awwwards Honorable Mention, October 2024)

**Pages visited:** the Awwwards entry and the home page (desktop and mobile).

**First 5 seconds:** a black page, a large gold wordmark, one sculptural brooch on a grey studio backdrop, and thumbnails of the next slides waiting at the bottom right. It reads as a gallery opening.

**Hero:**

- A 900 px slider with a full-bleed product photograph.
- A gold SVG wordmark (531×100) at the top-left. The H1 is 26 px MaisonNeue light in gold #CCAC78.
- The slide title in serif at the bottom-left, with a 448 px description and an outlined "Explore" button.
- **A strip of next-slide thumbnails (335×236) at the bottom right**, doubling as navigation.
- A repeating band of collection names follows the hero.

**Navigation:**

- A 54 px black service strip (shipping, taxes included, returns).
- The header is transparent over the hero, then becomes fixed white at 68 px and hides on scroll down.
- Items: Collections, Catalog, About, Cart.

**Visual language:**

- **Palette:** black #000000, white, gold #CCAC78, browns #503029 and #3D2722, and a sand map field #F0D4B3 (the Awwwards palette).
- **Type:** RomanaBT Roman serif (H2 38 px; index list 54 px) and MaisonNeue light (body 14 to 16 px; H1 26 px).
- **Shape and texture:** radius 0. Depth comes from overlapping images.

**Motion and interaction:**

- GSAP ScrollTrigger parallax on an overlapping collage: a 592×846 portrait with a 335×419 inset.
- Sixteen fade-up reveals (translateY 50 px).
- A 473 px circular SVG "discover" badge.
- Lottie and anime.js are also loaded.

**The map section (1,224 px):**

- A centred serif H2 and intro.
- A full-width SVG world map (1425×792, 243 paths; white land, #DDD, six pins) on the sand field.
- Over it, the collections are listed in 54 px serif in brown at 30% opacity. **Hovering a name brings it to full strength and fades in a 146×87 thumbnail beside it**, and the matching region is shaded.

**Products:** large-image collection and catalogue sections. I did not visit a product page.

**Trust and conversion:** the service strip and an address and email in the footer. No reviews.

**Mobile:** the map shrinks to 390×252; the list drops to a fluid 33 px; the page is 7,806 px.

**Performance feel:** the lightest of the award set. 52 requests, no video, 1.7 MB of images and 321 KB of script (jQuery, GSAP, Lottie and anime.js together: four libraries for modest effects).

**Strengths:**

- Geography as storytelling.
- Culture-led collections.
- Real depth from the collage.
- Hero thumbnails that preview what comes next.
- A black-and-gold palette close to Classic's plum and bronze.

**Weaknesses:**

- Inactive list items at 30% opacity fail contrast.
- The reveal is hover-only, for a touch-first audience.
- The map is tiny on mobile.
- Four animation libraries.

**Steal-worthy, ranked:**

1. **A map of styles.**
   - _Why it works:_ it turns eight style names into a journey. It also answers, without a paragraph, why a Dubai jeweller carries Kolkata, Rajkot, Temple, Turkish, Kuwaiti, Italian and Singapore work.
   - _Classic:_ an inline SVG strip map from Italy and Turkey across the Gulf to India and Singapore (a cropped band, not a whole globe, so it stays legible at 390 px). One pin per style, and the style list set in Cormorant. Hover, focus or tap highlights the pin and shows one velvet photo at 220 to 300 px, a size the 600 px sources handle perfectly.
   - _Second use:_ the four branches on a simplified UAE coastline, each pin linking to the branch card.
2. **Hero thumbnails that preview the next slides**, only if a hero ever rotates.
3. **A layered collage with gentle parallax**, built with CSS scroll-driven animation (idea 16).
4. **A large serif index with a muted inactive state.** Use colour tokens, not opacity, to keep AA.

---

### 3.7 Eden Garden Jewelry (Awwwards Honorable Mention, March 2025)

**Pages visited:** the Awwwards entry and the home page (desktop and mobile).

**First 5 seconds:** a mountain-meadow landscape under a tall condensed serif headline in caps, with an outlined button. Parchment and forest green. It feels like the start of a story, not a catalogue.

**Hero:**

- 900 px, with the landscape photograph full-bleed.
- A centred H1 at 72 px in Canela Condensed, weight 500, caps, line height 0.96, with an outlined "find your ring" button.
- **Header:** 170 px and transparent, with a centred logo lock-up (country and founding year) and a one-line utility link to a ring guide.

**Navigation:** a horizontal menu centred under the logo. The Awwwards entry credits a menu animation; I did not open the menu.

**Visual language:**

- **Palette:** parchment page #EDEBE0; cream #FDFBF7; forest bands #2F3529; olive #6F7A65; golds #AB8C52 and #C6B081; ink #212121; muted #6F6A60 and #C9C4B4.
- **Type:**
  - Canela Condensed for display (72 / 60 / 29 px).
  - Source Sans 3 for body text (11 px tracked eyebrows, a 20 px lead).
  - Montserrat for the UI.
  - A handwriting face for annotations.
- **Rhythm:** dark and light bands alternate across 11 sections.

**Motion and interaction (the reason it won):** native **CSS scroll-driven animations**.

- **Growing branches:** two branch images (985×801 and 1034×851) grow in from the corners. They use `animation-timeline: view()` with a range from `entry 0%` to `entry 70%`, and keyframes that start from translate(var(--grow-x), var(--grow-y)) rotate(var(--grow-r)) and end at `none`.
- **Assembling collage:** six cards (a leaf photo, a pencil sketch and a finished ring, twice) start scattered. Each is offset by plus or minus 60 to 80 units and rotated plus or minus 8 to 10°. They slide into place on a named view timeline over `entry 10%` to `cover 45%`, with opacity reaching 1 at 40%. Handwritten captions pair the plant's botanical name with the ring it became.
- **Other micro-interactions:** image hover scale over 0.6 s ease; an arrow nudge over 0.4 s; a scroll-snap rail. `prefers-reduced-motion` rules are present.

**Products:**

- A "most loved" rail (scroll-snap) with prices in Dhs.
- A ring styles grid.
- Earrings and pendants on a dark band.
- A **stone library**: a grid of 16 loose stones beside a live count of stones in stock.
- A 3D ring-builder promotion with short loops.

**Trust and conversion:**

- **A free 30-minute video call with a designer.**
- A 5.0 rating from about 1.4k verified reviews.
- A family-business story with video.
- An FAQ.

**Mobile:** header 115 px; H1 42 px; a long page at 11,235 px.

**Performance feel:** Shopify with 81 external and 70 inline scripts and 303 requests (reviews, email, analytics, customiser). Yet the signature effect costs no JavaScript at all.

**Strengths:**

- Scroll storytelling with zero script.
- The making process shown as leaf, then sketch, then ring.
- A strong dark and light rhythm.
- A consultation offer.
- A truthful live number (stones in stock).

**Weaknesses:**

- Script sprawl.
- A 170 px header.
- A very long mobile page.
- Four typefaces.

**Steal-worthy, ranked:**

1. **A collage that assembles as you scroll, with zero JavaScript.**
   - _Why it works:_ it turns "we make things" into something you watch happen, and the content still reads perfectly if the animation never runs.
   - _Classic, two stories to choose from:_
     - "From bar to bangle": a Classic Group bullion bar, then a sketch or wax model, then the finished piece on velvet.
     - Old gold: the old piece, then weighed and tested, then the new piece.
   - Needs two or three new photographs. Everything else exists.
2. **Alternating dark and light bands.** Plum-deep (#2E1A2D) with the velvet vitrine against ivory (#FAF7F2). This is the fix for "one surface, one rhythm" in `02-current-site-audit.md` §1.2.
3. **A consultation offer.**
   - _Classic:_ a WhatsApp video call from the counter to see a piece live. Mark it TODO(owner): offer it only if a branch confirms the service.
4. **A truthful live count.**
   - _Classic:_ the number of pieces shown per style, computed at build time from `src/content/`.
5. **The stone library, as a karat and metal guide.**
   - _Classic:_ 24K, 22K, 21K and 18K with their fineness (99.9%, 91.6%, 87.5%, 75%) and today's rate for each from the feed.
6. **Handwritten annotations (optional).**
   - _Classic:_ three or four "notes from the counter" on pieces, in one handwriting face, used sparingly.

---

### 3.8 Juri (Awwwards Honorable Mention, March 2026)

**Pages visited:** the Awwwards entry and the home page (desktop).

**First 5 seconds:** a pale blue-grey page with photographs of different sizes scattered like a gallery wall, and tiny caps navigation. It feels curated, not catalogued.

**Layout:**

- Six collection images, each 386 or 589 px wide, placed at irregular x positions (20, 324, 426, 831 and 1034 px). Small 200×200 cut-outs overlap their corners.
- Each image is labelled with its name and a piece count in parentheses, for example "(12)".

**Visual language:**

- Navigation in Syne at 10 px, caps, #939393 on #F3F7FA.
- Display in Optima.
- Accent #E082A8 (from the Awwwards palette).

**Motion and interaction:** GSAP ScrollTrigger on Webflow; the images drift at different speeds.

**Trust and conversion:** minimal. The footer carries **two live clocks with the local temperature, one city at each end**.

**Performance feel:** very light. 28 requests and 257 KB of script.

**Strengths:**

- Small images feel deliberate.
- Piece counts beside collection names.
- Live clocks give a sense of place.
- Restraint.

**Weaknesses:**

- 10 px grey navigation (about 2.9:1, which fails AA).
- Very little content.
- Discoverability depends on wandering.

**Steal-worthy, ranked:**

1. **A salon-hang layout for small photos.**
   - _Why it works:_ irregular sizes and generous space read as curation, so a 600 px photo stops looking like a thumbnail.
   - _Classic:_ on the dark vitrine, five to seven velvet photos at 280 to 420 CSS px on a 12-column grid, with staggered row starts. No script.
2. **Live clocks, as live branch status.**
   - _Classic:_ "Deira · open now" or "Sharjah, Safari Mall · opens 10:00", computed in the browser from hours in `site.ts`. Ship it only once the hours are confirmed (see the `TODO(owner)` markers).
3. **Counts beside names**: style names with piece counts, computed at build time.

---

### 3.9 365, A Year of Cartier (Site of the Day, February 2025): reference only

- **Stack:** Next.js with a WebGL canvas, five videos and Noto Serif.
- **Structure:** a chaptered yearbook. Numbered chapters, display titles mixing caps and lowercase, a numeric loader and infinite scroll.
- **Verdict:** far outside a static-site, small-script budget.
- **Worth taking:** the chapter numbering and long-form pacing for a single "Classic Group story" page. Not the loader, and not the WebGL.

---

## 4. Interaction concepts: where each was seen, and how to build it in Astro

Assumptions for every recipe: it is a progressive enhancement, it is wrapped in `@media (prefers-reduced-motion: no-preference)`, and the content is complete without it.

| Concept                                  | Seen on                                                                            | Verdict for Classic                                                          | Static Astro recipe                                                                                                                           | New JS       |
| ---------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Scroll storytelling (reveal or assemble) | Eden Garden (CSS scroll-driven); Nida Tabba (GSAP fade-up of 50 px)                | Yes: one assembled story per page at most; reveals on large images only      | `animation-timeline: view()` inside `@supports (animation-timeline: view())`. Otherwise, show the final state.                                | 0            |
| Sticky storytelling                      | Tamannaah (sticky info column); Boucheron chapters                                 | Yes, on style pages and the old-gold explainer                               | `position: sticky` media column. An IntersectionObserver on the text steps sets `data-step` on the figure; CSS cross-fades the images.        | about 0.5 KB |
| Product theatre                          | Messika hover swap; Boucheron hairline cells; Tamannaah banner                     | Yes: the dark vitrine                                                        | Surface token matched to the velvet; 1 px rule grid; opacity cross-fade to a second view where one exists. No zoom.                           | 0            |
| 3D or 360                                | Eden Garden ring builder (as video)                                                | No: no 3D assets, and the effort is high                                     | If ever photographed: a 24-frame turntable sprite scrubbed by pointer or keyboard.                                                            | about 1 KB   |
| Horizontal scroll galleries              | Mejuri in-card snap; Messika and Missoma rails                                     | Yes, for rails only. No scroll-jacking or pinned horizontal sections.        | `scroll-snap-type: x mandatory`, `overscroll-behavior-x: contain`, and arrow buttons calling `scrollBy`.                                      | about 0.3 KB |
| Magnetic cursor                          | None of the eight                                                                  | No: a gimmick, irrelevant on touch, and bad for accessibility                | n/a                                                                                                                                           | n/a          |
| Marquee ticker                           | Nida Tabba (band of collection names)                                              | Yes, as the gold-rate ticker                                                 | CSS keyframe on a duplicated track; pause on hover or focus; the copy is `aria-hidden`.                                                       | 0            |
| Number counters                          | None animated (Mejuri's figures are static)                                        | Light touch: roll a numeral only when the rate changes, never on page load   | `requestAnimationFrame` interpolation over 600 ms in `rate.ts`; `Intl.NumberFormat('en-AE')`.                                                 | about 0.3 KB |
| Layered parallax                         | Nida Tabba; Juri                                                                   | Only on the heritage collage                                                 | Scroll-driven `translate` of an inset image by 24 to 40 px.                                                                                   | 0            |
| Page transitions                         | None of the eight                                                                  | Yes: the cheapest way to feel like an app                                    | Cross-document View Transitions in CSS; the same `view-transition-name` on the tile image and the product page plate.                         | 0            |
| Micro-interactions                       | Underline grows (Mejuri 0.3 s, Messika 0.4 s); image swap 0.4 s; arrow nudge 0.4 s | Yes: underline grow, focus rings, chip states. Skip transform nudges (spec). | `background-size` underline; `:focus-visible` rings in `--focus`.                                                                             | 0            |
| Header hide and reveal                   | Boucheron, Nida Tabba                                                              | Yes                                                                          | Compare scroll direction in `nav.ts`; toggle `data-hidden`; CSS `translate` on the header. This is a scroll transform, not a hover transform. | about 0.4 KB |
| List with image preview                  | Boucheron, Tamannaah, Nida Tabba                                                   | Yes: the styles index, mega menu and map                                     | `:has()` rules, or `pointerenter` / `focusin` setting `data-active`.                                                                          | 0 to 0.4 KB  |
| Live data in the page chrome             | Juri (clocks and temperature)                                                      | Yes: rate time-stamp and branch open status                                  | Reuse the rate feed; compute open status from `site.ts` hours in the browser.                                                                 | about 0.3 KB |

### 4.1 Motion tokens to add to `tokens.css`

These are drawn from the observed ranges: hover at 0.1 to 0.4 s, reveals at 0.5 to 1 s, slide progress at 5 s.

```css
--dur-quick: 160ms; /* colour, underline, chip state */
--dur-base: 320ms; /* image cross-fade, menu preview swap */
--dur-slow: 600ms; /* reveals, numeral roll */
--ease-out: cubic-bezier(0.25, 0.1, 0.25, 1); /* Mejuri */
--ease-emph: cubic-bezier(0.175, 0.885, 0.32, 1); /* Messika reveals, no overshoot */
```

### 4.2 Reduced-motion policy

- **CSS:** every animation and transition beyond colour sits inside `@media (prefers-reduced-motion: no-preference)`.
- **Scripts:** check `matchMedia('(prefers-reduced-motion: reduce)')` once and skip the effect.
- **Ticker:** with reduced motion, it becomes a static row that wraps, or scrolls horizontally on small screens. It also pauses on hover and focus for everyone. Duplicated items carry `aria-hidden="true"`. The real rates live once in a labelled list, not inside the moving track.
- **Scroll-driven effects:** not applied with reduced motion, so the final composed state shows. Browsers without support show the same final state.
- **View transitions:** turned off with reduced motion.
- **Video:** none auto-plays. Show a poster with a play button, and give any loop a visible pause button.

### 4.3 Recipes (CSS-first)

**Rate ticker.** Duplicate the list once in Astro and mark the copy `aria-hidden`.

```css
.ticker {
  overflow: hidden;
}
.ticker__track {
  display: flex;
  gap: var(--space-8);
  width: max-content;
}
@media (prefers-reduced-motion: no-preference) {
  .ticker__track {
    animation: ticker 45s linear infinite;
  }
  .ticker:is(:hover, :focus-within) .ticker__track {
    animation-play-state: paused;
  }
}
@keyframes ticker {
  to {
    transform: translateX(-50%);
  }
}
```

**Styles index with preview, no script.** Astro loops over the styles and writes one rule per item.

```css
.style-index__img {
  opacity: 0;
  transition: opacity var(--dur-base) var(--ease-out);
}
.style-index__img[data-i='1'] {
  opacity: 1;
}
.style-index:has(li:is(:hover, :focus-within)) .style-index__img[data-i='1'] {
  opacity: 0;
}
.style-index:has(li[data-i='3']:is(:hover, :focus-within)) .style-index__img[data-i='3'] {
  opacity: 1;
}
```

On touch, the list is a horizontal snap rail of style cards. The hover preview is desktop-only polish, never the only way to see an image.

**Assembled story (the Eden Garden technique).**

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .assemble {
      view-timeline: --assemble block;
    }
    .assemble__card {
      animation: assemble linear both;
      animation-timeline: --assemble;
      animation-range: entry 10% cover 45%;
    }
  }
}
@keyframes assemble {
  from {
    opacity: 0;
    transform: translate(var(--from-x), var(--from-y)) rotate(var(--from-r));
  }
  40% {
    opacity: 1;
  }
}
```

Each card sets `--from-x`, `--from-y` and `--from-r` inline (for example -64px, 40px, -8deg). Support at the time of writing: Chromium and Safari 26 or later; Firefox behind a flag. Everyone else sees the assembled layout, which is the design.

**Page transitions, no router.**

```css
@view-transition {
  navigation: auto;
}
@media (prefers-reduced-motion: reduce) {
  @view-transition {
    navigation: none;
  }
}
```

Give the tile `<Plate>` image and the product page plate the same `view-transition-name: piece-{slug}`, set from the content slug.

### 4.4 Script budget (estimates, minified and gzipped)

| Script                    | Does                                                          | Size           |
| ------------------------- | ------------------------------------------------------------- | -------------- |
| `nav.ts` (extend)         | Header hide and reveal                                        | +0.4 KB        |
| `rate.ts` (extend)        | Numeral roll on change; ticker time-stamp                     | +0.3 KB        |
| `motion.ts` (new)         | One IntersectionObserver: sticky-step swaps and branch status | about 0.8 KB   |
| `map.ts` (new, optional)  | Tap to select on touch for the styles and branch maps         | about 0.6 KB   |
| `rail.ts` (new, optional) | Arrow buttons for snap rails                                  | about 0.3 KB   |
| **Total**                 |                                                               | **under 3 KB** |

---

## 5. The photo constraint, and why the vitrine is idea 1

`02-current-site-audit.md` §3 measured the photography:

- Product photos are 600×600, with velvet corners ranging from #0E0D1A to #44385E (luminance 38 to 100).
- They are sharp up to 300 CSS px on a 2× screen and acceptable up to about 420.
- They must never go full-bleed or be zoomed.

The award sites with the strongest product theatre (Tamannaah, Messika) rely on large, high-resolution photographs, which Classic does not have. The patterns that transfer are the ones that make small images feel intentional:

- **Match the surface to the velvet** (a `--surface-vitrine` token near #14112A to #1A1430) so each square's edge dissolves and the bust appears to stand in a dark case. Velvet that runs lighter (p01, p06) needs a vignette baked into the image at build time with sharp. That keeps the "no CSS gradients" rule intact.
- **Hairline cells** (Boucheron) or a **salon hang** (Juri) at 280 to 420 CSS px, with generous dark space between.
- **Let type, the rate instrument and a few commissioned photographs carry the big moments**: a branch interior, hands at the counter, a bullion bar. Do not upscale product photos.

---

## 6. What not to copy

- **Entry interruptions.** Messika and Missoma each show three layers (country prompt, cookies, pop-up) before the page. Classic needs none.
- **Heavy auto-playing video.** Missoma loads 8.6 MB; Tamannaah sends 17 MB of 1080p to phones; Messika stretches a 960×540 file to full screen.
- **Third-party sprawl.** Mejuri loads from about 25 third-party hosts, Missoma runs 86 external scripts and Eden Garden 81. A static Astro site starts with a large speed advantage; keep it.
- **Hover-only information.** Nida Tabba's list and Tamannaah's banner give touch users nothing. Every hover preview needs a tap and focus equivalent, or a plain list.
- **Contrast lost to "quiet" styling.** Tamannaah prices #9F9F9F on white (about 2.6:1); Juri navigation at 10 px #939393; Nida Tabba's inactive items at 30% opacity.
- **A home page that is only a slideshow** (Tamannaah international). Theatre has to sit on top of content, not replace it.
- **Locale mistakes on a UAE storefront.** Boucheron shows a UK phone number and CET hours. Classic's single source of facts in `site.ts` already prevents this; keep it that way.
- **WebGL, loaders and magnetic cursors.** Only the Cartier microsite uses WebGL. None of the commerce sites need it to be memorable.

---

## 7. How the ideas compose into a Classic home page (proposed)

1. **Split hero.**
   - Left, on plum: the rate instrument. Today's 22K per gram in large numerals, with 24K, 21K and 18K beneath and an "updated" time.
   - Right, on the vitrine surface: one piece at 420 CSS px with its style name.
   - Calls to action: WhatsApp and "Visit a branch".
2. **Rate ticker band**, one line, pausable.
3. **Styles index**: eight styles in large Cormorant with piece counts. The preview swaps on hover or focus; on mobile, a snap rail.
4. **Vitrine**: a hairline grid or salon hang of six to eight pieces on the dark surface.
5. **"From bar to bangle"**, the collage that assembles on scroll. This is the Classic Group heritage told without a paragraph of claims.
6. **Map of styles**, and the four branches on a UAE strip map with open status.
7. **Old-gold explainer band**, using Mejuri's "what is this" pattern.
8. **Promise strip and branch cards**, ending in the WhatsApp call to action.

Mobile carries the bottom action bar (WhatsApp, Call, Branches, Rate) throughout.

---

## Sources

- Awwwards entries:
  - https://www.awwwards.com/sites/tamannaah-fine-jewellery
  - https://www.awwwards.com/sites/juri-jewelry-brand
  - https://www.awwwards.com/sites/eden-garden-jewelry
  - https://www.awwwards.com/sites/nida-tabba-jewelry
  - https://www.awwwards.com/sites/365-a-year-of-cartier-5
  - https://www.awwwards.com/sites/cartier-watches-wonders-2025
  - https://www.awwwards.com/sites/cartier-watches-wonders-2026
  - https://www.awwwards.com/sites/cartier-le-choeur-des-pierres
- Awwwards site search: https://www.awwwards.com/websites/?text=jewelry
- Sites visited:
  - https://mejuri.com/world/en/
  - https://www.messika.com/en/
  - https://www.missoma.com/
  - https://www.boucheron.com/ae_en/
  - https://www.boucheron.com/ae_en/lierre-de-paris-naturally-free
  - https://int.tamannaah.com/
  - https://int.tamannaah.com/collections/rib-form-rhythm-repetition
  - https://int.tamannaah.com/products/orb-hoops
  - https://nidatabba.com/
  - https://edengardenjewelry.com/
  - https://www.jurijewelry.com/
  - https://365ayearof.cartier.com/en/
- CSS Design Awards search result (older jewellery winner): https://www.m-q.ch/en/?p=2228
