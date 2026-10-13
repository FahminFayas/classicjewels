# 06 · Global luxury benchmarks: Cartier, Tiffany & Co., Bvlgari, Van Cleef & Arpels, Graff

Research date: 13 October 2026. All five sites were reachable. No bot wall or CAPTCHA stopped me reading anything. Cartier and Bvlgari load reCAPTCHA on their booking forms, and I did not touch those forms.

**Method.** I used one browser tab of my own. Most facts come from the DOM at 1440×900: computed styles, `document.fonts`, element sizes and positions, `transition` and `animation` values, the natural sizes of images and videos, and Performance API timings. I then reloaded each home page at 390×844 and measured again. Other agents were using the same browser pane and it was resized during the session, so screenshots taken at 1440 came out as thumbnails. I made visual judgements from screenshots at 1024 px wide instead, and the text says so where it matters. Mobile screenshots came out properly. Timings come from one load in a background tab on this connection, so they are only good for ranking the five sites against each other.

I submitted nothing, added nothing to a bag and signed in nowhere. On the Cartier store locator I chose "Allow technical cookies only". On Tiffany I closed the US-shipping country dialog with its close button. Competitor copy is described in my own words. The few quoted strings are interface labels of two to four words.

---

## The short version

1. **The luxury feeling comes mostly from pacing, not polish.** On all five home pages, between 45 and 67 percent of the height is one image or film at a time. Each of those moments carries anything from a single sentence to one short paragraph. Tiffany and Bvlgari put empty bands 176 to 464 px tall between the moments, each holding one heading. Classic's current spec rules this rhythm out: no surface changes, story text always left-aligned in a 1280 px container, never 50/50, every section the same ivory. That is a large part of why the site reads as a blog.
2. **None of them sells high jewellery through the cart alone.** On every product page the cart button sits alongside another way to buy:
   - Van Cleef & Arpels makes "Order by phone" the filled button and "Add to bag" the outlined one, then stacks three grey rows below: client advisor, call-back, appointment.
   - Cartier lists phone, find in boutique, ambassador and appointment under the price.
   - Graff runs a full-width band of three columns: enquire, appointment, order by phone.
   - Cartier and Bvlgari pass the product reference into the booking form.

   Talking to someone is Classic's whole business model, and these sites present it with confidence.

3. **The appointment flow is a solved, shared pattern.** Cartier and Van Cleef & Arpels both belong to Richemont and use the same four-step form on a single page:
   1. Choose the boutique.
   2. State the purpose of the visit. This step is already filled in with the piece, plus a note that stock changes.
   3. Pick the date, the time and a preferred language.
   4. Enter personal details.

   Bvlgari uses the same four steps as a stepper. Graff embeds a generic Salesforce iframe, and it is the one that feels cheap.

4. **Motion is slow, sparse and almost never tied to scrolling.** On the standard pages there is no parallax, no cursor effect and no scroll-jacking. What does move:
   - muted video loops with a pause button;
   - images fading in as they load (Van Cleef: 500 ms, `cubic-bezier(0.19,1,0.22,1)`);
   - 1 px underlines that wipe across over 500 to 600 ms;
   - captions that crossfade in a product highlighter;
   - mega-menu panels that open over 300 ms, with their content fading in after a 500 ms delay.

   These durations are two to three times longer than Classic's current 150 to 240 ms.

5. **Jewellery photographed on a dark background reads as luxury when each piece gets its own square.** Tiffany's "Shop by Category" tiles each show one piece on deep teal or navy fabric, 332 px square at 1440. Van Cleef's home page opens on a midnight-blue film. Graff's heroes sit on a deep green-black. Classic's velvet-bust photos already look like this, but the current spec forces them onto white plates.
6. **Small product images are normal.** Graff's product cards show 400 px sources at 342 px. Cartier's cards are 313 px, Bvlgari's 277 to 356 px and Tiffany's 330 px. Classic's 600×600 photos are enough for every card and tile. Only the hero and the opening of each chapter need large media, and typography, a colour field and one small photograph can carry those.
7. **Store pages are treated as destinations.** Cartier, Bvlgari and Graff give each boutique:
   - a live open status ("open until 23:00");
   - the week's hours, with today highlighted;
   - a direct phone line;
   - directions;
   - a button to book at that boutique.

   Graff also lists its Dubai boutiques inside the mega menu. With four branches, Classic can do this better than any of them.

---

## 1. Cartier (cartier.com/en-ae)

**Pages visited:**

- home, at 1440 and 390;
- the High Jewellery mega-menu panel;
- the En Équilibre high jewellery collection page;
- the LOVE collection listing;
- the product page for the LOVE Unlimited flexible diamond bracelet (ref B6094117);
- the appointment form reached from that product;
- the stores.cartier.com UAE finder, the Dubai city list and the Dubai Mall Fashion Avenue boutique page.

**Stack:** Salesforce Commerce Cloud (demandware paths), jQuery with Slick carousels, and Video.js. The home page has 111 `<script>` tags. At load it pulled 194 resources from 47 hosts, most of them advertising and analytics pixels (TikTok, Snap, Pinterest, LinkedIn, Meta, LINE and others).

### First impression (5 seconds)

A white header 182 px tall sits above a muted, looping film (1920×1080 source) that fills the rest of the viewport at 1425×831. At the bottom centre are a short uppercase title, one line of serif text and a small "DISCOVER". A red Cartier chat button sits at the bottom right. It feels like looking into a boutique window: one object and very little to read.

### Hero

- **Composition:** a full-bleed video module, 831 px tall at 1440, which is the viewport minus the header. White text is centred near the bottom edge, over the footage.
- **Media:** an MP4 that autoplays, muted and looped, with a pause/mute control. Mobile gets its own portrait film at 390×843, filling the screen. In it, an oversized black letter from the campaign overlaps the bracelet, so the mobile crop has been art-directed, not simply scaled down.
- **Copy:** three elements only:
  - a title at 22px, uppercase, weight 600, tracking 0.4px;
  - one serif line at 16px;
  - "DISCOVER" at 12px, uppercase, weight 600.
- **CTA:** a text link, not a button.
- The page `<h1>` (32px, weight 700) exists but is hidden from view.

### Navigation and mega menu

- **The header has three bands:**
  - A utility row: Arabic toggle, country, Contact us and Services, all 12px uppercase, tracked 0.5px.
  - The centred wordmark, with icons on the right: wish list, My Cartier, a pin for finding a boutique, and the bag.
  - A category row at 12px uppercase, tracked 0.8px: High Jewellery, Jewellery, Watches, Bags and Accessories, Fragrances, Home & Stationery, News, La Maison.
- When you scroll, the header shrinks to the category row alone.
- **Mega menu:** a white panel across the full width that pushes the page down. It is 379 px tall with content 960 px wide. The panel opens with `max-height 0.3s ease-in`, and its contents then fade in with `opacity 0.3s ease-in 0.5s`, so the drawer opens first and the content follows a moment later.
- **Inside the panel** there are three things:
  - a row of tabs: All creations, Latest collections, Markers of Style, Iconic Panthère, Living legacy, Exceptional stones, Know-how. The active tab is underlined in Cartier red.
  - four cut-out thumbnails of 144 px, each with a two-line caption.
  - a "View all" link.

  The menu is restrained, with no lifestyle photography in it.

### Visual language

- **Palette:**
  - Text: `#1D1C1C` (not pure black), with grey `#8C8C8C`.
  - Backgrounds: white `#FFFFFF` and the greys `#F9F9F9`, `#F5F5F5` and `#F0F0F0`.
  - Cartier red `#D50032` appears in only three places: the chat button, the rule under the active tab, and today's date on store pages.

  Colour comes from the photography, never from the interface.

- **Type:** two in-house typefaces, with Almarai as the Arabic fallback:
  - "Brilliant Cut", a sans in weights 300, 400, 600 and 700, sets all the interface and the headings.
  - "Fancy Cut", a serif in weights 300 and 400, sets body copy and descriptive lines.

  The type scale is tiny and flat: 12px (used by 906 text elements), 14px, 16px, 22px for headings and 32px for the hidden h1. Headings are uppercase with 0.4 to 0.5px tracking. The luxury comes from capitals and space, not from size.

- **Imagery:** studio still lifes and campaign film. Product packshots are cut-outs on pale grey.
- **Grid:** a stack of full-width modules with no gaps between them. Product carousels show four 313 px squares at 1440.
- **Radius, shadow, texture:** square corners on buttons and inputs, no shadows and no texture.

### Motion and interaction

- On 136 link elements, `transition: opacity 0.5s ease-out, color 0.5s ease-out, background-size 0.5s ease-out`. Underlines are drawn with `background-size` and grow over half a second.
- Buttons use `0.5s cubic-bezier(0.4, 0.9, 0.3, 1)` on opacity, colour, border and background.
- Images lazy-load from blurred 40 px placeholders (natural sizes 40×17 and 40×31) and sharpen in place.
- Each product card has its own small carousel with an arrow. The carousels are Slick and never move on their own.
- There is no scroll-animation library (no GSAP, no Lenis), no parallax and no cursor effect.

### High jewellery storytelling (En Équilibre)

- The page is 16,670 px tall, about 18.5 screens at 900 px.
- It opens with a video hero carrying the collection name, then one centred sentence of introduction.
- Then come 22 rows in a strict **zigzag, split 50/50**:
  - One half holds a 712×552 image, on the left in one row and on the right in the next.
  - The other half holds the piece's name (22px uppercase) and a centred serif paragraph of 30 to 55 words at 16/24px, at most 569 px wide, with a "Read more" that expands in place.
  - Each image shows a single piece on a flat studio background in a soft colour such as pale celadon or sand, so that half of the screen reads as a coloured field with one jewel in it.
- Several rows replace the still with a small carousel of 5 to 7 images.
- Twice, the rhythm breaks for a full-bleed video. One of these is a making-of film.
- The page ends with a carousel of products on 428 px squares.

### Product presentation

- **Listing (LOVE):**
  - The page opens with a full-bleed lifestyle hero, an introductory paragraph and a breadcrumb.
  - Above the grid are Filter by and Sort by, a count of models ("167 Models") and a **Grid / Feed** toggle that switches the view.
  - At 1024 the cards are 304 px wide, three to a row. Each has a NEW tag, an arrow to the next image, the name at 14px uppercase and the materials in serif.
  - Prices use the new UAE dirham symbol. Cartier draws it with its own "UAESymbol" font, and the underlying character is the letter "ê", so a screen reader would read out the wrong symbol.
  - Editorial tiles are mixed into the grid.
- **Product page:**
  - The gallery is on the left: one 549 px square, then two columns of 270 px squares. The information column on the right is `position: sticky`.
  - The h1 is 19.5px, uppercase, weight 600.
  - The description is a bulleted list with "Read more". Lines for complimentary shipping and returns carry icons.
  - Below those: a size selector, the price, "Add to bag" (grey `#F0F0F0`, disabled until a size is chosen), the wish list, and the metal variants as 167 px image tiles.
  - Four quiet links follow:
    - **Order by phone**, a toll-free number on a `tel:` link;
    - **Find in boutique**, a stock check;
    - **Contact an ambassador**;
    - **Book an appointment**.
  - The product reference is printed on the page.

### Trust and conversion devices

- **Appointment:** the link on the product page opens `/rdv-bookings?context=ProductDiscovery&productReference=B6094117`. It is one page with four numbered steps that open in turn:
  1. Choose a boutique. The country is already set to UAE; you pick a city, then one of four boutique cards, each with "Select this boutique".
  2. Purpose of visit. This is already filled in with the bracelet's name and reference, plus a note that stock changes.
  3. Date, available time, **preferred language** and comments.
  4. Title, names, whether to be notified by email or mobile, and place of residence.

  reCAPTCHA runs when the form is submitted.

- **Boutique page:** the page carries:
  - the boutique's name as a large uppercase h1;
  - a live status ("Open until 23:00");
  - a black "Book an appointment" button;
  - "Get directions", plus an Uber link;
  - the address and phone number;
  - a seven-day hours table that starts from today, with today in red;
  - a Mapbox map and a what3words address;
  - the services offered at this boutique, featured creations and nearby boutiques.
- **Promises in the promo bar:** service lines that rotate in turn: wrapping in the red box, complimentary engraving, same-day delivery in Dubai.
- No reviews, ratings or certificates are shown.

### Mobile

- **Header:** 103 px tall. It holds the promo bar, then the hamburger and search on the left, the wordmark in the centre, and the boutique pin and bag on the right.
- **Hero:** a portrait film that fills the whole 390×843 screen.
- **Rhythm:** full-bleed modules stay full height at 843 px and alternate with product carousels about 490 px tall.
- **Type:** headings drop to 18px.
- **Chat:** the red chat bubble stays fixed at the bottom right.

### Performance feel

Heavy. DOMContentLoaded at 2.1 s, the load event at 7.3 s, and the largest paint (the hero video) at about 3.5 s. Images arrive blurred and then sharpen. Once loaded it scrolls smoothly, because almost nothing animates.

### Strengths

1. One idea per screen. Six of the ten home modules are full-bleed media at 831 px, each with about 15 words at most.
2. The zigzag high jewellery rows show one piece per half-screen on a coloured background, which makes even simple stills look curated.
3. The product page offers four ways to reach a person (phone, boutique stock, ambassador, appointment), each given the same weight as the cart.
4. The appointment form carries the piece and asks for a preferred language.
5. Store pages answer "is it open now, and how do I get there?" before anything else.
6. Typographic discipline: two typefaces, about five sizes, and everything else is space.

### Weaknesses

1. 47 third-party hosts and a 7 s load event. The site feels luxurious despite its engineering.
2. The home page h1 is hidden, and text everywhere is very small (12px), which hurts readability.
3. The mega-menu thumbnails are small cut-outs, so the menu does not sell the high jewellery story it links to.
4. The home page mixes watches, eyewear and leather goods, which dilutes the jewellery story.

### Steal-worthy (ranked)

1. **Service links under the price on the product page.**
   - _Why it works:_ calling or visiting becomes the expected route, not a fallback.
   - _Classic:_
     - Under the piece's facts, a filled plum button, "Ask about this piece on WhatsApp", with the message already holding the name, code and URL.
     - Below it, text links: call the branch, see which branch has it, book a visit (passing `?piece=CODE`).
2. **A four-step appointment with the piece already filled in and a choice of language.**
   - _Classic:_ the steps are branch → reason (this piece, old-gold exchange, bridal set, custom order) → day and time window plus language → name and WhatsApp number.
   - The languages offered must come from the owner (`TODO(owner)`), not be guessed.
3. **Zigzag rows of single pieces on a coloured background.**
   - _Classic:_ collection pages as alternating rows. The 600 px velvet photo sits inside a half-width field filled with the matching velvet colour, so the jewel appears to rest on a much larger stage.
   - The text opposite is centred: the style name, 40 words and one link.
4. **Live open status on branch pages.**
   - _Classic:_ worked out in the browser from the hours in `site.ts`, with today's row highlighted.
   - Only once the owner has confirmed the hours.
5. **A mega panel that opens first, with its content fading in a moment later** (300 ms to open, then 500 ms later the content).
   - It is cheap, calm and needs no imagery.

---

## 2. Tiffany & Co. (tiffany.com, with a look at tiffany.ae)

**Pages visited:**

- the tiffany.ae home page;
- the tiffany.com home page, at 1440, 1024 and 390;
- the High Jewelry landing page and the Blue Book 2026 collection story;
- the Necklaces & Pendants listing;
- the product page for the Tiffany HardWear medium double-link pendant;
- the Schedule a Consultation page.

**About tiffany.ae:** the UAE site is a separate, simpler Magento build:

- it runs jQuery and shows "As low as" price strings;
- the home page is 3,266 px tall;
- the hero is a 1920×1080 film with a 1080×1920 portrait version.

It shares the palette and typefaces but none of the storytelling, so the analysis below uses tiffany.com.

**Stack:** Salesforce Commerce Cloud, jQuery and Splide carousels. 116 scripts, and 207 resources from 53 hosts.

### First impression (5 seconds)

A Tiffany Blue promo bar sits above a white header. Then a dialog appears, asking whether to shop the US site, and it has to be dismissed. Behind it is a full-width campaign portrait of a celebrity in turquoise and gold against a blue sky. Once the dialog is gone, the page is calm, white and spacious.

### Hero

- **Composition:** a campaign photograph. At 1024 it runs edge to edge. At 1440 the photograph measured 950×679, so the wide layout sets it beside the copy instead of stretching it to full width. The high jewellery landing page uses the same arrangement (image pushed right, text left).
- **The copy sits next to or below the image, never on it:**
  - a serif headline over two lines, with the collection name on a line of its own;
  - one sentence;
  - an uppercase text link.

  The photograph stays clean.

- **CTA:** a text link such as "SHOP NEW DESIGNS", set in 11px Santral Semibold, uppercase, tracked 0.88px (0.08em), with 4px of padding below and a 1px underline in `#67CCC9`.

### Navigation and mega menu

- **Promo bar:** Tiffany Blue `#81D8D0`.
- **Header:** 203 px tall at 1440, and fixed. Search and a store pin sit on the left, the wordmark in the centre, and Contact us, account and bag on the right. Below them is a category row in 12px uppercase with slightly negative tracking (-0.26px): Gifts, Jewelry, High Jewelry, Love & Celebration, Watches and more.
- **Mega menu:** a white panel with tabs. Each sub-collection gets a 209 px square image tile (Sixteen Stone, The Tiffany Setting, Tiffany True and others), and there is a link to a guide on choosing an engagement ring.
- At 1024 and below, the category row folds behind a hamburger.

### Visual language

- **Palette:**
  - Text is black `#000000`, with secondary text at `rgba(0,0,0,0.6)`.
  - Backgrounds are white and a warm off-white, `#FBF9F7`.
  - Tiffany Blue `#81D8D0` is used for the promo bar and as a background in the photography; a deeper `#67CCC9` draws the 1px link underlines.
  - The express-checkout button is `#F4F0EA`.

  The blue appears far more often in the photography than in the interface.

- **Type:**
  - "Sterling SSM" is the serif for display text, at weight 325 (between light and regular). Every display size has **negative tracking of -0.04em**: 52px at -2.08px, 48px at -1.92px, 32px at -1.28px.
  - "Santral" is the sans for everything else: Book at 13 to 14px, and Semibold at 11 to 12px in uppercase, tracked 0.08 to 0.1em.
  - Product names on cards are serif; descriptions are sans.
- **Imagery:** single pieces staged on deep teal, navy and Tiffany Blue fabrics, spheres and boxes. Product cut-outs sit on white or pale grey.
- **Grid:** content modules on a white page, separated by generous empty bands.
- **Radius, shadow:** square corners and no shadows.

### Motion and interaction

- **Underline wipe:** the link carries a full-width 1px `::before` in `#67CCC9`. On hover it shrinks while an `::after` grows from the other side: `width 0.6s cubic-bezier(0.4, 0, 0.2, 1)`. This is the best text-link hover of the five.
- **Fades:** `opacity 0.45s cubic-bezier(0.42, 0, 0.16, 1)`, some with a 0.9 s delay so the hero text arrives in stages.
- **Carousels (Splide):** the current slide is centred with its neighbours just showing at both edges. The arrows sit either side of a thin progress bar instead of dots.
- No parallax and no effects tied to scrolling.

### Home sequence (1440, 5,928 px, about 6.6 screens)

1. The campaign photograph.
2. The copy block.
3. A product carousel: 330 px squares, serif names, prices.
4. "Shop by Category": four 332 px square tiles, each **a single piece on deep teal or navy fabric**, with a label below in 12px uppercase tracked 1.2px.
5. "Icon Collections": a heading and one sentence, then two 560×784 portraits (5:7) on blue-green sets.
6. A full-width still life of a pendant over a Blue Box ribbon.
7. "The Tiffany Experience": three columns (Book an Appointment, Personalization, Contact Us). Each has a 443×316 image on a Tiffany Blue set, a serif title, two lines of text and an underlined uppercase link.

### High jewellery storytelling

- **Landing page:**
  - The h1 (48px, weight 325, -1.92px) sits alone in a white band 356 px tall.
  - Then an asymmetric block: a 950×679 image pushed to the right, with text on the left.
  - Then four letterbox banners at 4:1 (1425×356), each with one line and a link, and a pair of 5:7 portraits.
  - The page ends with the high jewellery phone number.
- **Blue Book 2026** (12,342 px, about 13.7 screens):
  1. An eyebrow (11px uppercase, tracked 0.88px) and a 52px h1, in a white band 464 px tall, with a 70-word introduction.
  2. A 47-second film, full-bleed at 16:9, with a visible timecode.
  3. One chapter each for Butterfly, Jasmine and Monarch. A chapter is:
     - the chapter title at 48px, alone in a white band 356 to 404 px tall, with one paragraph of about 60 words;
     - a silent loop, full-bleed at 16:9;
     - a carousel of 677 px squares.
  4. "Exquisitely Crafted": pairs of 5:7 portraits with the pieces' names.
  5. A closing image and link.

  **The white bands holding one serif word are the device that sets the pace.**

### Product presentation

- **Listing:**
  - The page opens with sub-category tiles showing pieces on Tiffany Blue spheres, then Sort by and Filters.
  - The cards are very large: at 1024 there are only two per row, at 510×642.
  - Each piece is photographed at its full chain length on pale grey, with a serif collection name, a sans description, a small price and an occasional "Must-Have" tag.
- **Product page (1440):**
  - The information column is on the **left**, 24 px from the edge, 443 px wide and sticky. In it:
    - the h1 at 40px in Santral Book (sans), with the price beneath it at only **13px**;
    - the material choices, as 147 px photo tiles;
    - a black "Add to cart" button 60 px tall, with "Express checkout" below it in `#F4F0EA`;
    - "Find in store", and a line linking to an appointment with a diamond expert.
  - On the right is a gallery 910 px wide. The first image is a 601 px square centred in a 697 px panel; then come 886 px squares stacked one under another, then pairs of 441 px squares.
  - Further down: the story of the Blue Box packaging, shipping, "Ask a Client Advisor" and "Visit a Store".

### Trust and conversion devices

- **Schedule a Consultation:** a choice of channels, not a form. You can call (the number is shown), book an in-store appointment, book a virtual appointment, or chat with an expert. All four carry equal weight.
- The high jewellery landing page ends with a phone number, not a product grid.
- Service promises sit in the promo bar, and every product page presents the packaging as a promise.

### Mobile

- **Header:** 118 px including the promo bar. The sticky header that stays on screen is 58 px.
- **Hero:** the hero shrinks to a 390×279 landscape crop with the copy below, so the first screen is mostly text. This is the weakest mobile hero of the five.
- **Type:** headings are 24px.

### Performance feel

The slowest to start: DOMContentLoaded at 4.7 s, the load event at 8.0 s and the largest paint at 3.4 s. The country dialog adds a click before anything can be seen.

### Strengths

1. The white band holding one serif heading is the clearest pacing device in the set, and it costs nothing.
2. The category tiles, with one piece on deep fabric, are the closest match to Classic's own photographs.
3. The underline wipe and the progress-bar carousel are small, precise and slow.
4. The price is set at 13px, so the number is there but quiet.
5. The consultation page offers four channels as equals.

### Weaknesses

1. The country dialog, and 53 third-party hosts.
2. The mobile hero is a letterbox strip, and the campaign loses its force.
3. Given the brand's reputation, the home page leans more on selling (carousels, prices) than you would expect.
4. The display serif at weight 325 with -0.04em tracking is beautiful at 48px but tight and hard to read below 24px.

### Steal-worthy (ranked)

1. **White bands holding one line, between the big moments** (356 to 464 px tall, with an eyebrow, one serif heading and an optional paragraph of about 60 words).
   - _Why it works:_ the pause makes the next image feel bigger and more deliberate.
   - _Classic:_ ivory bands 40 to 50 vh tall, with an eyebrow and one Cormorant line at `--t-display`. Use them between every major home section and at the start of each chapter of a collection page.
2. **Category tiles on a dark background.**
   - _Why it works:_ one piece per square on deep fabric reads as a display case.
   - _Classic:_ the existing velvet-bust photos, four across at 1440 (about 320 px each, which the 600 px source covers at 2× pixel density) and 2 × 2 on mobile.
   - The label goes below the tile in the eyebrow style, and the tile background matches the velvet so no photo edge shows.
3. **A page for choosing a channel.**
   - _Classic:_ a "Talk to us" page with four options of equal weight: WhatsApp, call a branch, visit (with the list of branches), and a video call if the owner wants to offer one.
4. **An underline wipe on text links.**
   - _Classic:_ a 1px `--rule-gold` underline over 500 to 600 ms, only under `prefers-reduced-motion: no-preference`.
5. **A carousel with a progress bar instead of dots, and its neighbours showing at the edges.**
   - _Classic:_ only if a carousel is needed at all (for example "more in this style"), and never moving on its own.

---

## 3. Bvlgari (bulgari.com/en-ae)

**Pages visited:**

- home, at 1440 and 390;
- the menu drawer;
- the Eclettica high jewellery page;
- the Rings listing;
- the product page for the B.zero1 ring (AN859655);
- the appointment stepper reached from it;
- the UAE store locator.

**Stack:** React with Chakra UI and Emotion (class names like `css-xxxx`), plus Swiper. 75 scripts, and 170 resources from 31 hosts.

### First impression (5 seconds)

The whole first screen is film (1425×900, 100vh), split into two panels side by side: two models in warm dusk light, with jewellery on their hands and wrists. The header is transparent, with white icons and a single "Menu" button. On desktop there are no category links at all. Text sits at the bottom left. It is the most cinematic opening of the five and the least like a shop.

### Hero

- **Composition:** a full-viewport video in two panels (two crops side by side), with the header floating over it.
- **Copy:** at the bottom left, in white:
  - a heading at 36px in Bulgari Type weight **300** (light);
  - one sentence of about 20 words;
  - an uppercase link.
- **CTA:** 14px uppercase with 12px of padding below. A 1px `::after` underline animates `width 0.5s cubic-bezier(0.575, 0, 0.18, 1)`.
- A round 40 px pause button in grey sits at the bottom right.
- **Mobile:** the two panels become two crops stacked one above the other inside a 390×694 portrait film (880×1564 source).

### Navigation

- **Header:** 64 px, sticky, and transparent over the hero. "Menu" (icon plus the word) is on the left, the wordmark in the centre, and search, wish list, account and bag on the right.
- **Menu:** a white drawer 285 px wide that slides in from the left, holding a Chakra accordion:
  - three group headings at 16px uppercase: Collections, Inside Bvlgari, Artsmanship;
  - links at 14px, indented 40 px;
  - "Contact & Appointments" and "Store Locator" live inside it.

### Visual language

- **Palette:**
  - Text is black, with secondary text in `#6E6E6E`.
  - Backgrounds are white, with a cool light grey `#F3F2F3` for text bands and form panels.
  - Terracotta `#B5472B` is used only for "New" labels; gold `#CCAC70` appears rarely.

  The page is almost colourless, and the film supplies the warmth.

- **Type:** one in-house family, "Bulgari Type", in weights 300, 400 and 700:
  - display text at 300 (light): 36px on the home page, 48px for listing h1s;
  - body at 14 to 16px;
  - no letter-spacing anywhere.

  Hierarchy comes from the contrast between light display and regular body, not from a second typeface.

- **Imagery:** warm, cinematic film of jewellery being worn. Products appear as 750 px squares on white.
- **Grid:** full-viewport modules alternating with short text bands. Listings use a grid with no gutters.
- **Radius, shadow:** square corners on images and inputs, a 3px radius on tab buttons, and pill-shaped chips (38px radius) in the high jewellery chapter navigation. No shadows.

### Motion and interaction

- The underline width animation described above.
- **Tab switcher between two collections** (Serpenti / Bvlgari Tubogas): 300×48 buttons, with the active one marked by a 0.8px `#272727` border. On mobile the tab bar sticks to the bottom of the screen while its section is in view.
- **Product carousel:** two rows, with `transform 0.8s linear` on the slides.
- **Hover and colour transitions:** 150 to 200 ms, with `cubic-bezier(0, 0, 0.2, 1)`.
- No parallax and no animation tied to scrolling.

### Home sequence (1440, 5,811 px, about 6.5 screens, six modules)

1. The full-viewport film.
2. A 200 px text band on `#F3F2F3`, with a heading and one paragraph.
3. Serpenti:
   - a full-viewport photograph with a heading, one line and a link laid over it;
   - the tab switcher for the two collections;
   - a product carousel in two rows.
4. A 176 px text band.
5. Three 3:4 portrait cards (325×433) for watches, bags and fragrances.
6. **A closing full-viewport photograph of the boutique, with "Book an appointment".**

The home page ends by inviting a visit.

### High jewellery storytelling (Eclettica, 11,434 px)

1. A full-viewport image with **no text at all**.
2. A 304 px band holding a 36px light h1 and a 35-word paragraph.
3. **Sticky chapter chips** (Painting, Sculpture, Architecture): 32 px pills on `#F3F2F3`, pinned under the header at `top: 62px`.
4. Each chapter then runs:
   - a full-viewport film;
   - a heading at 36px and a 20px light paragraph in a 944 px column;
   - a small hint that the tiles can be tapped;
   - a **three-column staggered collage**. The columns are 422 px wide, and the middle one starts about 244 px lower than the others. The tiles mix 3:4 stills with 1:1 silent loops. Each tile opens a full-screen lightbox over a 40 % white scrim, showing the piece's name, a link and a small slider.
5. The page ends with "Contact an expert", split 50/50: a 712×944 photograph on the left and an enquiry form on the right, on `#F3F2F3` (email, names, country, consent).

### Product presentation

- **Listing (Rings):** a 48px light h1, then a **four-column grid with no gutters** of 356 px squares running edge to edge. A video tile two columns wide and two rows tall (712×974) is set into the grid to tell a collection's story.
- **Product page:** split 50/50.
  - The left side is a vertical gallery: 712×556 landscape crops, a pair of 3:4 portraits, and a 712×950 video.
  - The right side is sticky. It holds:
    - a breadcrumb, then the h1 at 36px light;
    - the price ("AED 21,300.00 Including Taxes") and the size;
    - a black "Add to shopping bag" button, 400×40;
    - **"Book an appointment"** (its link passes `&sku=AN859655`) and **"Find in store"**, both with icons;
    - accordions for details, payment, shipping and returns, the signature box, and FAQ.

### Trust and conversion devices

- **Appointment:** `/bookanappointment?virtual=false&sku=…` opens a four-step stepper (Store, What, When, About you) with a 300×40 NEXT button.
  - In step one you choose a country and then one of the UAE boutiques from a list that gives the floor of each address.
  - A `virtual` flag means the same flow also books video appointments.
- **Store locator:** a list on the left and an 841 px map on the right. Each store shows "Open now, closes at 11:00 PM", a direct phone number, directions and the products available there.
- The high jewellery page ends with an enquiry form for an expert, set into the page itself.

### Mobile

- **Header:** 64 px, white.
- **Hero:** the film with its two crops stacked vertically, and text at the bottom left.
- **Type:** headings are 24px.
- **Tab bar:** the collection tab bar becomes a sticky bar at the bottom of the screen, 86 px tall.
- **Pause:** the pause button stays.

### Performance feel

The fastest of the e-commerce builds: DOMContentLoaded at 0.76 s, and the largest paint (the hero video) at about 2.0 s. The page structure is light, with few fonts to load (one family, three weights).

### Strengths

1. A single type family in light and regular weights: elegant, and cheap to load.
2. A header with no category links, so the brand speaks first and the catalogue second.
3. Sticky chapter chips plus a staggered collage give the page the structure of a real exhibition.
4. An appointment is the last word on the home page, and sits alongside the cart on the product page.
5. The video is cropped specifically for mobile, in portrait.

### Weaknesses

1. Hiding every category behind "Menu" on desktop makes them harder to find.
2. The light 300 weight at 14px is faint on `#F3F2F3`.
3. The home page is very short (six modules) and gives little sense of heritage on a first visit.
4. The high jewellery collage depends entirely on film and stills made specially for it.

### Steal-worthy (ranked)

1. **End the home page with an invitation to visit.**
   - _Why it works:_ it recasts the whole scroll as the lead-up to a meeting.
   - _Classic:_ the last module before the footer lists the four branches, each with an "open now" line and "Book a visit", over a plum band.
2. **Sticky chapter chips on long pages.**
   - _Why it works:_ it gives a long story a table of contents and a sense of place.
   - _Classic:_ on a "Styles" page (Kolkata, Rajkot, Temple, Antique, Turkish, Kuwaiti, Italian, Singapore) or a bridal page, with square corners to respect the token rules.
3. **Light display type with no tracking.**
   - _Classic:_ Cormorant Garamond at weight 300 or 400 for `--t-display`, keeping heavier weights for small labels.
4. **A staggered three-column collage with a lightbox.**
   - _Classic:_ it works with 600 px squares. Offset the middle column by a third of a tile, and let each tile open the piece in a `<dialog>` with WhatsApp and visit buttons.
   - The scrim must be a flat colour, with no gradient.
5. **A booking link that passes the SKU.**
   - _Classic:_ every piece page and every style page links to the visit form with `?piece=` or `?style=` already filled in.

---

## 4. Van Cleef & Arpels (vancleefarpels.com/ae/en)

**Pages visited:**

- home, at 1440, 1024 and 390;
- the Fascinating Egypt high jewellery experience;
- the Necklaces & pendants category;
- the product page for the Vintage Alhambra 10-motif necklace (VCARA42800);
- the in-store appointment page.

**Stack:** Adobe Experience Manager (`aem-Grid`), jQuery, GSAP and Swiper. The Egypt experience is a react-three-fiber WebGL canvas. The home page has 42 scripts, and loaded 115 resources from 37 hosts.

### First impression (5 seconds)

A deep midnight-blue film of an enamelled watch dial fills the top of the page at 2:1 (1425×712 at 1440, from a 4000×2000 source). A white serif headline at 45px sits on the left, with a small outlined button below it. The header floats over the film. It feels like a theatre curtain rising: dark, jewelled and quiet.

### Hero

- **Composition:** a full-width video at 2:1. The headline is left-aligned 60 px in from the edge, with the CTA below it.
- **Copy:** Janson Text at 45px, one statement of about ten words.
- **CTA:** a ghost button with a thin border, 13px uppercase Maison Neue ("Unfold its story").
- **Mobile:** a portrait crop where the dial fills the screen, with the headline at the top in 30px and the CTA at the bottom.

### Navigation

- **Header:** 120 px at 1440, fixed and transparent over the hero. Menu and search sit on the left, the serif wordmark in the centre, and region, phone and account icons on the right.
- **Menu:** a drawer from the left. It holds:
  - the categories in 13px uppercase, tracked 1.43px (0.11em), in `#666666`;
  - menu headings at 18px uppercase, tracked 2px;
  - a column of 16:9 image cards (361×203) for the high jewellery worlds: classic high jewellery, Fascinating Egypt, the heritage collection.

  The drawer moves with `transform 0.35s cubic-bezier(0.5, 0, 0.8, 0.25)`.

- **Gifts by occasion:** birthday, wedding anniversary, celebrating a birth, engravable creations, gift ideas.

### Visual language

- **Palette:**
  - Text is `#222222`, with secondary text in `#666666` and `#757575`.
  - Backgrounds are white, with `#F5F5F5` for product frames and service rows, and a pale sage `#EEF2E3` once.

  There is no accent colour in the interface. Colour comes from the enamel and stones in the photography, and from the midnight-blue film.

- **Type:**
  - Janson Text (serif), at weight 400 only but in many sizes: 45, 40.5, 35, 30, 26 and 18px.
  - Maison Neue (sans): 13px for the interface and 16px for body copy.
  - Product names on cards are serif at 18px. Uppercase labels are tracked about 0.11em.
- **Imagery:** close-ups of enamel and stone colour, with pieces on stands (the alt text of product images includes "ON_STAND").
- **Grid:** full-width square images with text laid over them, then contained grids.

### Motion and interaction

- **Images fade in as they load:** on 66 images, `opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1) 0.1s` (an ease-out-expo curve), plus an `imgload 0.5s ease` keyframe on 71 elements. This is where most of the page's smoothness comes from.
- **Creation highlighter:** a module split in two:
  - The left half holds a carousel of small cut-outs (220 px). The caption **crossfades** as the slides change: in with `vcaChwV2InfoIn 1s ease`, out over 0.5 s ease-in-out.
  - The right half is a 712 px square close-up.
- A looping SVG butterfly animation (3 s ease-in-out, repeating forever) sits in the site's frame.
- No parallax was measured: transforms did not change as the page scrolled.
- **Fascinating Egypt:** a full-screen WebGL map with a grab cursor. It has:
  - a prompt to move and explore, and a guide;
  - buttons to return to the centre and to show a mini-map;
  - 16 creations to find.

  Screen-reader users are offered an accessible "see the selection" link first. The page itself does not scroll.

### Home sequence (1440, 11,537 px, about 12.8 screens)

1. The 2:1 film.
2. The creation highlighter: a white half with cut-outs and a half with a square close-up.
3. **Four full-width square images**, each 1425×1425 and so 1.6 screens tall. Each carries a serif heading of 40 to 45px, a 16px paragraph and a 13px uppercase link laid over it, alternating between left-aligned and centred.
4. An invitation to the boutiques on another full-width square: it lists cities, offers to open the boutique doors, and the button reads "After you", the courtesy of a doorman.
5. A 1305 px square, set in from the edges.
6. "Our creations": a carousel of seven categories, each 480 px wide.
7. Newsroom: two 632 px squares with serif titles at 30px.
8. Three service cards (care, jewellery services, watch services) with serif titles at 26px.

### Product presentation

- **Listing:**
  - The page opens with an introductory paragraph and "Available now (125)".
  - Filters cover collection, material, stone and price range. Prices use the U+20C3 dirham sign, drawn from a dedicated symbol font.
  - The cards sit in `#F5F5F5` frames (275 px), each with a small four-slide carousel.
- **Product page:**
  - Content is capped at 1280 px. The gallery takes 8 of 12 columns (an 800×580 swiper on white) and the information column takes 4 (360 px wide).
  - **The h1 is 16px** sans, giving the name and materials and nothing more.
  - Then come the reference number, the price with "Including taxes", and "Discover the stone: mother-of-pearl" (a link to an explanation of the material).
  - The metal variant appears as a bordered 52 px row, followed by "What is the size of the motif?".
  - Next, **two equal 174×52 buttons: "Add to bag" outlined, and "Order by phone" filled in `#222222`**.
  - Below them are three 50 px rows in `#F5F5F5`: contact the client advisors, request a call-back, book an appointment.
  - The page continues with same-day Dubai delivery, care and services, and signature gift wrapping.

### Trust and conversion devices

- **Appointment:** the same four-step Richemont form as Cartier. It lists six UAE boutiques (including a salon at Dubai Opera), then asks for the purpose, date, time, preferred language, comments and personal details.
- A phone icon sits in the header on every page, mobile included.
- Requesting a call-back is a route of its own, with its own form.

### Mobile

- **Header:** 60 px, transparent over the hero, with a phone icon next to the bag.
- **Hero:** in portrait.
- **Type:** display text is 30px.
- **Products:** images are 390 px squares, full width.

### Performance feel

The fastest overall: the largest paint (the poster frame of the hero film) at 0.63 s, DOMContentLoaded at 1.0 s and the load event at 3.5 s. Images fade in as they arrive, which hides the loading entirely.

### Strengths

1. The phone is the primary button on the product page, and the cart is secondary.
2. Images fading in as they load, on an ease-out-expo curve, is the single most effective "expensive" motion in the set, and the cheapest.
3. A dark, jewel-toned opening that suits enamel and stones.
4. Courteous wording on the invitation to the boutiques.
5. Gifts arranged by life event.
6. Each product links to an explanation of its stone.

### Weaknesses

1. The square images run the full width, so each one is 1,425 px tall at 1440. On a short laptop screen that is more than a screen and a half of a single picture.
2. The WebGL map is beautiful but heavy, and useless without illustration and 3D work made for it.
3. A 16px h1 on the product page is too quiet for search engines and for older eyes.
4. The home page is long (nearly 13 screens), and the categories only appear at the very end.

### Steal-worthy (ranked)

1. **Make the phone (for Classic, WhatsApp) the filled primary button, with a stack of ways to reach a person below it.**
   - _Why it works:_ it states the business model without apology.
   - _Classic:_
     - a filled plum button, "WhatsApp us about this piece";
     - an outlined "Call the branch";
     - three quiet rows on `--surface-2`: book a visit, ask for a call-back, see it at a branch.
2. **Images that fade in as they load** (`opacity` from 0 to 1, 500 ms, `cubic-bezier(0.19, 1, 0.22, 1)`, 100 ms delay).
   - _Why it works:_ nothing pops in; everything arrives.
   - _Classic:_ on every `<Plate>` and hero image, opacity only, under `prefers-reduced-motion: no-preference`, and never on text.
3. **A highlight module with crossfading captions.**
   - _Classic:_ a "piece of the week" module, with four velvet photos in one square stage and the name and karat crossfading (1 s in, 0.5 s out).
   - It moves only when the visitor presses the previous and next buttons, never on its own.
4. **Gifts by occasion.**
   - _Classic:_ occasions already exist as content. Surface them in the menu as occasions (wedding, new baby, Eid, Diwali, anniversary), with the list confirmed by the owner.
5. **A link from the piece that explains its stone.**
   - _Classic:_ from each piece, a short link to "What 22K means", "How Kolkata work is made" or "How we weigh old gold", using existing journal content.
6. **A courteous label on the button that invites a visit.**
   - _Classic:_ write a plain label in its own voice, such as "Plan your visit".

---

## 5. Graff (graff.com/ae-en)

**Pages visited:**

- home, at 1440, 1024 and 390;
- the Artistry in Motion high jewellery page;
- the product page for the Butterfly diamond necklace (RGN948);
- Book an Appointment;
- the Dubai Mall boutique page.

**Stack:** a jQuery e-commerce front end, with Salesforce booking (in an iframe) and Salesforce chat. 79 scripts. On mobile: 140 resources and about 3.2 MB transferred, with DOMContentLoaded at 2.0 s and the load event at 5.0 s.

### First impression (5 seconds)

A bronze promo bar (`#897358`) sits above a white header, with a widely spaced GRAFF wordmark on the left and six navigation words spread across the width. Below comes a full-viewport carousel of films and photographs (1430×900) with a "scroll to discover" cue. The diamonds sit on deep green-black backgrounds. It feels serious and spare.

### Hero

- **Composition:** a horizontal "hero accordion" of four full-viewport slides. Each caption is 26px, with "Shop now".
- **Scroll cue:** a small "scroll to discover" label. Its highlight fills over `1.8s cubic-bezier(0.645, 0.045, 0.355, 1)` (an ease-in-out-cubic curve) and then repeats.
- **Mobile:** a 390×844 portrait photograph that fills the screen, on a deep green-grey.

### Navigation

- **Six items** in 13px Optima Nova uppercase, tracked 1.5px (about 0.115em), spaced evenly across the full width: High Jewellery, Jewellery, Engagement & Bridal, Watches, Gifts, The House.
- **The menu lists the UAE boutiques** (Dubai Mall, Mall of the Emirates, Atlantis The Royal) with a "view all" link, so the store pages are one hover away.
- **Browse by stone:** high jewellery can be browsed by stone (white diamond, yellow diamond, emerald and ruby jewels), as well as by unique solitaires and timepieces.

### Visual language

- **Palette:**
  - Text is black, with secondary text in `#767676`.
  - Backgrounds are white, an off-white `#F8F8F9` behind products, and a deep green-black `#151B17`.
  - **Bronze `#897358`** colours the promo bar and the "Add to bag" button, and `#7F6E59` is used for small accents.

  This is the palette in the set closest to Classic's bronze gold.

- **Type:**
  - Chronicle Display (serif):
    - headings at 50px, weight 400, with **positive tracking** of 2.1px (about 0.04em);
    - 32 to 34px at weight 200 (extra light);
    - the high jewellery title at 65px, weight 200.
  - Optima Nova LT Pro (a sans whose strokes flare slightly at the ends):
    - body text at 13px light;
    - labels at 11 to 14px uppercase, tracked 1.5px.
- **Imagery:** diamonds on dark backgrounds and on skin, in very high contrast.
- **Radius, shadow:** square corners, outlined buttons with 0.8px borders, no shadows.

### Motion and interaction

- **Buttons:** `background-color 0.3s ease-in, border-color 0.3s ease-in`. Link colours also change over 0.3 s ease-in.
- **Scroll cue:** the animated cue described above.
- **The high jewellery page is a doorway.** It opens on a black full-viewport still with:
  - a centred title at 65px, extra light;
  - one sentence;
  - an "Enter gallery" button, 179×48, black with a 0.8px white border.

### Product presentation

- **Home carousel:** product images are **400 px sources shown at 342 px** on `#F8F8F9`. This shows that small sources are fine at card size.
- **Product page:**
  - A horizontal strip of 479 px squares (from 1000 px sources) runs across the full width.
  - The h1 is 32px Chronicle at weight 200, followed by the price ("AED … (Incl. taxes)") and a bronze "Add to bag" button, 365×53.
  - Accordions follow for details and care, size and fit, and delivery and returns.
  - Then a **full-width band in three columns: Enquire | Appointment booking | Order by phone**.
  - After that come a 592 px video loop and a lifestyle photograph.

### Trust and conversion devices

- **Appointment:** a page titled "Online Appointment" that embeds a Salesforce booking iframe (1170×650). It works, but it looks like someone else's website.
- **Boutique page:**
  - a direct phone number for the boutique;
  - a boutique email address, whose `mailto:` link fills in a subject line naming the city;
  - opening hours for all seven days, and a Google map;
  - "Contact boutique" and "Request an appointment";
  - a grid of 256 px photographs of the boutique.
- **Promo bar:** order online and collect from a chosen Dubai boutique.

### Mobile

- **Header:** 64 px, with the wordmark on the left and search, bag and menu on the right.
- **Promo bar:** the bronze bar stays.
- **Hero:** a full-screen portrait image.
- **Cookies:** a black cookie bar at the bottom of the screen.

### Performance feel

In the middle of the pack. The hero accordion and the scroll cue feel smooth. The booking iframe is slow and looks out of place.

### Strengths

1. Bronze as the colour for actions, on a page of black, white and green-black.
2. Boutiques inside the menu, and a phone number and email for each boutique.
3. Browsing by stone.
4. A display serif with positive tracking, which gives a monumental, engraved feel without needing large sizes.
5. The band of enquire, appointment and phone on every product page.

### Weaknesses

1. A generic Salesforce booking iframe breaks the spell at the point of conversion.
2. Because the hero is a carousel, the first message can change before anyone has read it.
3. The extra-light 200 weight of the serif breaks up on low-quality screens.
4. There is little storytelling between the hero and the footer on the home page.

### Steal-worthy (ranked)

1. **Branches in the menu.**
   - _Why it works:_ a visit is one hover away from anything.
   - _Classic:_ a "Visit us" column in the mega panel listing the four branches, each with its area, an "open now" line and a link to its page.
2. **Bronze as the single colour for actions.**
   - _Classic:_ `--gold-600` (`#B9814F`) or the brand bronze for the one primary action on each screen when the background is plum, and plum when the background is ivory.
   - Never both colours in the same group of buttons.
3. **A band of enquire, visit and call.**
   - _Classic:_ a full-width band in three columns under every piece: WhatsApp, Book a visit and Call, each label naming the branch.
4. **A `mailto:` and a `tel:` for each branch, with the subject already filled in.**
   - _Classic:_ the branch pages carry each branch's own WhatsApp number and phone from `site.ts`, and WhatsApp messages open with "Enquiry for Safari Mall branch: [piece]".
5. **Browsing by stone and by karat.**
   - _Classic:_ 22K, 21K and 18K, and diamond, gemstone and uncut diamond, as main ways into the catalogue. The spec already has the material hubs.
6. **Positive tracking on short display headings in capitals.**
   - _Classic:_ only for uppercase eyebrows or chapter titles of one to three words, never for sentences.

---

## 6. Techniques compared across the five

### 6.1 Pacing and whitespace

| Site               | Home height at 1440 | Screens (÷ 900) | Share of height that is one full-width image or film | Empty bands holding only a heading                                                    |
| ------------------ | ------------------- | --------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Cartier            | 8,853 px            | 9.8             | about 65 % (six modules at 831 px)                   | none: the modules sit directly against each other, and the space comes from the media |
| Tiffany            | 5,928 px            | 6.6             | about 45 %                                           | white bands of 356 to 464 px, each with one heading and sometimes one paragraph       |
| Bvlgari            | 5,811 px            | 6.5             | about 46 % (three moments at 900 px)                 | bands of 176 to 304 px on `#F3F2F3`                                                   |
| Van Cleef & Arpels | 11,537 px           | 12.8            | about 67 % (the 2:1 film plus five squares)          | none on the home page; the text sits on the images                                    |
| Graff              | 5,294 px            | 5.9             | about 50 %                                           | short introductory bands before the carousels                                         |

Rules that hold across all five:

- **One focal object per screen.** When an image is on screen it is the only one, or it belongs to a strict, repeated set (four tiles, two portraits).
- **Copy for each moment:** a title of 1 to 6 words, then one sentence or a paragraph of 30 to 70 words, then one link. None of the five puts two paragraphs against a picture.
- **Lines of text are short.** Cartier's are 569 px, centred. Bvlgari uses 944 px for 20px light text. Tiffany's introductions are centred in roughly 640 to 700 px.
- **Centred text is normal on story pages** (Cartier, Tiffany, Graff). Text laid over film is left-aligned (Bvlgari, Van Cleef).

### 6.2 Full-bleed media and the share of image to text

- **Ratios used for full-width moments:**
  - 16:9: the Tiffany film, at 1425×801.
  - Viewport minus header: Cartier, at 1425×831.
  - 100vh: Bvlgari and Graff.
  - 2:1: the Van Cleef film.
  - 1:1 at full width: the Van Cleef squares.
  - 4:1 letterbox: the Tiffany banners.
- **Separate portrait crops for mobile.** All but Tiffany ship them:
  - Cartier's 390×843 film;
  - Bvlgari's 880×1564 source;
  - Graff's 390×844 photograph;
  - Van Cleef's portrait of the dial.

  Tiffany's mobile hero is a weak 390×279 strip.

- **Product cards:** everywhere they are 275 to 356 px wide, from sources of 400 to 1000 px.
- **Page transitions:** none animate. Moving between pages is a normal page load on all five, including Bvlgari, which is built in React.

### 6.3 Typography

| Site               | Display face, size, weight, tracking                                           | Text face                             | Label style                                           |
| ------------------ | ------------------------------------------------------------------------------ | ------------------------------------- | ----------------------------------------------------- |
| Cartier            | Brilliant Cut (sans), 22px uppercase, 600, +0.4px                              | Fancy Cut (serif), 16/24              | 12px uppercase, 0.4 to 0.8px                          |
| Tiffany            | Sterling SSM (serif), 32 to 52px, weight 325, **-0.04em**                      | Santral Book, 13 to 14px              | Santral Semibold 11 to 12px uppercase, +0.08 to 0.1em |
| Bvlgari            | Bulgari Type, 36 to 48px, weight **300**, no tracking                          | Bulgari Type, 14 to 16px, 300 and 400 | 14px uppercase, no tracking                           |
| Van Cleef & Arpels | Janson Text (serif), 26 to 45px, weight 400                                    | Maison Neue, 13 to 16px               | 13px uppercase, +0.11em                               |
| Graff              | Chronicle Display (serif), 50px at 400 with **+0.04em**; 32 to 65px at **200** | Optima Nova, 13px light               | 11 to 14px uppercase, +0.115em                        |

Patterns:

- **Display sizes are modest:** 32 to 52px on desktop, with 65px used once.
- **Display weights are light or regular,** never bold.
- **Small uppercase labels carry the structure.**
- **Body text is small:** 13 to 16px.

Classic's current tokens (`--t-display` 36 to 72px, Cormorant Garamond, eyebrows at 0.14em) are within this range. The difference will come from using fewer sizes and far more space.

### 6.4 Colour discipline

- **The interface is black, white and one or two greys on every site.** Brand colour appears in one place only:
  - Cartier red on a single control;
  - Tiffany Blue on the promo bar and as photographic sets;
  - Bvlgari terracotta only on "New";
  - Graff bronze on the promo bar and the "Add to bag" button;
  - Van Cleef none at all.
- **Off-whites, warm or cool, do the work of separating sections:** Tiffany `#FBF9F7`, Bvlgari `#F3F2F3`, Van Cleef `#F5F5F5`, Graff `#F8F8F9`.
- **Dark backgrounds come from the photography,** not from dark panels in the interface: Van Cleef's midnight blue, Graff's green-black, Tiffany's teal and navy fabric.
- **For Classic,** plum and bronze should behave the way Tiffany Blue and Graff bronze do: a promo or rate strip, one colour for actions, and the velvet in the photographs. They should not be fills on many components.

### 6.5 Motion catalogue (measured values)

| What moves                                                          | Where                  | Duration and curve                                                            |
| ------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------- |
| Image fades in as it loads                                          | Van Cleef (all images) | `opacity 0.5s cubic-bezier(0.19,1,0.22,1) 0.1s`; keyframe 0.5s ease           |
| Blurred 40 px placeholder sharpens                                  | Cartier                | swaps when the image loads                                                    |
| Link underline wipes across                                         | Tiffany                | `width 0.6s cubic-bezier(0.4,0,0.2,1)` on `::before`/`::after`, 1px `#67CCC9` |
| Link underline grows                                                | Bvlgari                | `width 0.5s cubic-bezier(0.575,0,0.18,1)`                                     |
| Link underline grows via `background-size`                          | Cartier                | 0.5s ease-out                                                                 |
| Button fill and border change                                       | Cartier; Graff         | 0.5s `cubic-bezier(0.4,0.9,0.3,1)`; 0.3s ease-in                              |
| Mega panel opens, content follows a moment later                    | Cartier                | `max-height 0.3s ease-in`, then `opacity 0.3s ease-in 0.5s`                   |
| Drawer slides in                                                    | Van Cleef              | `transform 0.35s cubic-bezier(0.5,0,0.8,0.25)`                                |
| Caption crossfades as the slide changes                             | Van Cleef              | in 1s ease, out 0.5s                                                          |
| Hero text arrives in stages                                         | Tiffany                | `opacity 0.45s cubic-bezier(0.42,0,0.16,1)` with a 0.9s delay                 |
| Scroll cue                                                          | Graff                  | 1.8s `cubic-bezier(0.645,0.045,0.355,1)`, repeating                           |
| Video loops                                                         | all                    | autoplay, muted, looped, with a visible pause or mute control                 |
| Parallax, cursor effects, scroll-jacking, animated page transitions | none on standard pages | only Van Cleef's WebGL map is interactive in that way                         |

The luxury pace is **400 to 600 ms for anything decorative and 300 ms for interface chrome**, on ease-out curves that start quickly and settle slowly.

Classic's spec currently sets 150 to 240 ms and bans scroll reveals and media that plays on its own. The benchmarks support:

- **keeping** the bans on parallax, cursor effects and self-advancing sliders;
- **lifting** them for images that fade in as they load, and for muted loops with a pause button.

### 6.6 How a single piece is staged

1. **Square, uncropped and centred, one piece per frame.** The background runs to the edge of the tile: Tiffany's fabrics, Cartier's studio colours, Graff's `#F8F8F9`, Van Cleef's `#F5F5F5`.
2. **Repeated in a strict set of 2, 3 or 4,** so the row reads as a display case.
3. **The label goes below the image, not on it,** in small tracked capitals. If a price is shown, it is smaller than the name.
4. **On story pages the piece gets half the screen** (Cartier's zigzag), with its own name and 40 words beside it.
5. **The product page speaks quietly.** Van Cleef's h1 is 16px and Tiffany's price is 13px. The photograph and the space are the headline.
6. **Only film shows the piece in motion** (turning dials, light moving across stones). Stills never move on hover, and none of the five zooms an image on hover.

### 6.7 Inviting an appointment instead of a purchase

| Device                                                    | Cartier                  | Tiffany                          | Bvlgari              | Van Cleef                               | Graff                 |
| --------------------------------------------------------- | ------------------------ | -------------------------------- | -------------------- | --------------------------------------- | --------------------- |
| Way to reach a person beside the cart on the product page | 4 links                  | 1 link, plus services lower down | 2 links              | phone is the filled button, plus 3 rows | 3-column band         |
| Booking passes the piece                                  | yes (`productReference`) | no                               | yes (`sku`)          | not observed                            | no                    |
| Booking steps                                             | 4 on one page            | a choice of channels             | 4-step stepper       | 4 on one page                           | Salesforce iframe     |
| Preferred language asked                                  | yes                      | no                               | not seen in step 1   | yes                                     | n/a                   |
| Virtual appointment                                       | no                       | yes                              | yes (`virtual` flag) | no                                      | no                    |
| Store page with live open status                          | yes                      | not checked                      | yes (in the locator) | not checked                             | hours only            |
| Stores reachable from the header                          | pin icon                 | pin icon                         | inside the drawer    | phone icon                              | **list of boutiques** |
| Home page ends with an invitation to visit                | services row             | experience row                   | **yes**              | **yes** (boutiques)                     | appointment card      |

### 6.8 What needs big photography or film, and what does not

**Needs large media, which Classic does not have yet:**

- Full-viewport film heroes, with their portrait crops for mobile (all five).
- Full-width squares and letterbox banners (Van Cleef, Tiffany).
- Bvlgari's two-panel film, its staggered collage of loops, and the full-screen lightbox images.
- Tiffany's campaign portraits and pairs at 5:7, and Graff's strip of 1000 px squares.
- Van Cleef's WebGL map, which also needs illustration and 3D work.
- Photography of jewellery being worn, which every site uses.

**Achievable with typography, colour, layout and motion alone, using the 600×600 velvet photos:**

- Ivory bands holding one serif line between the big moments (Tiffany, Bvlgari).
- Light display serif, short lines and centred story text.
- Category tiles: one piece per square on a dark background, with the label below (Tiffany).
- Zigzag rows, with the photo inside a half-width field of matching colour (Cartier).
- Sticky chapter chips for long pages (Bvlgari).
- A staggered three-column collage of squares with a `<dialog>` lightbox (Bvlgari, without the film).
- A highlighter with crossfading captions that moves only when the visitor asks (Van Cleef).
- Images that fade in as they load, underlines that wipe, and a mega panel whose content follows a moment later (Van Cleef, Tiffany, Cartier).
- The stack of ways to reach a person, the page for choosing a channel, and the four-step visit form with the piece and a language (all five).
- Branch pages with a live open status, branches in the menu, and an invitation to visit as the last module on the home page (Cartier, Graff, Bvlgari).
- The UAE dirham sign in figures. Van Cleef uses the real character U+20C3 with a small symbol font, which is the right way. Cartier draws it over the letter "ê" in a custom font, which screen readers read as "e circumflex".
- Browsing by stone, karat, style and occasion (Graff, Van Cleef).

### 6.9 Performance (one load in a background tab; useful only for ranking)

| Site               | DOMContentLoaded | Load event          | Largest paint                      | Resources / hosts  |
| ------------------ | ---------------- | ------------------- | ---------------------------------- | ------------------ |
| Van Cleef & Arpels | 1.0 s            | 3.5 s               | 0.63 s (poster frame of the video) | 115 / 37           |
| Bvlgari            | 0.76 s           | not fired after 3 s | 2.0 s (video)                      | 170 / 31           |
| Graff (mobile)     | 2.0 s            | 5.0 s               | not measured                       | 140 / not measured |
| Cartier            | 2.1 s            | 7.3 s               | 3.5 s (video)                      | 194 / 47           |
| Tiffany            | 4.7 s            | 8.0 s               | 3.4 s (image)                      | 207 / 53           |

How luxurious a site feels does not depend on how much it loads. Van Cleef is the lightest and feels the most refined. A static Astro site with no third-party pixels can be faster than all five.

---

## 7. What this means for Classic's current spec

These are conflicts between the benchmarks and `docs/design-spec.md`. They are listed so that the owner and designer can decide; none of them is changed here.

1. **§4: "never 50/50" and "text columns start at column 1 (never centred)".**
   - Cartier's high jewellery rows are 50/50, and so are Bvlgari's product page and expert form.
   - Story text is centred on three of the five sites.
   - Banning centred story text is one reason Classic's pages read like articles.
2. **§4: "Sections do not alternate backgrounds", and at most two plum bands per page.**
   - The benchmarks alternate constantly, but between _media and empty space_, not between coloured panels.
   - The useful change is to allow tall empty ivory bands and sections led by images, not more plum.
3. **§4: product photos only on white plates, never on plum.**
   - Classic's photographs are on navy and plum velvet. Forcing them onto white means either cutting the jewel out or letting a dark square sit on white, which looks like a pasted thumbnail.
   - The Tiffany tiles show the alternative: let the velvet _be_ the plate, and match the tile's background to it.
4. **§8: durations of 150 to 240 ms, and bans on scroll reveals and media that plays on its own.**
   - Luxury sites run 300 ms for interface chrome and 500 to 600 ms for decoration, and use muted loops with pause buttons.
   - Keep the bans on parallax, cursor effects, numbers that count up and self-advancing sliders.
   - Consider allowing images that fade in as they load (opacity only) and longer underline transitions.
5. **The rule against gradients.**
   - Matching a velvet photo to a flat field only works if the photo's edges are close to one colour.
   - If the corners vary, the clean fix is to re-export the photo with the velvet extended, not to add a gradient vignette. Extending the background must never touch the pixels of the jewel itself.
6. **The mobile action bar.**
   - Van Cleef puts a phone icon in its mobile header, but none of the five has Classic's planned bottom bar of WhatsApp, Call and Visit.
   - For a business that runs on enquiries, the bottom bar is stronger. Keep it, and make WhatsApp the first cell.

---

## 8. Steal-worthy patterns for Classic, ranked

Each of these can be built now with the 600×600 velvet photographs, the daily rate feed and the four branches, unless it is marked otherwise.

1. **The stack of ways to reach a person, on every piece page.**
   - _Why it works:_ Van Cleef, Cartier, Bvlgari and Graff all put a human contact beside or above the cart, and Van Cleef makes the phone the filled button. It tells the visitor that talking to someone is the normal way to buy.
   - _How Classic should adapt it:_ drop the idea of a cart altogether and use:
     - a filled plum button, "WhatsApp us about this piece". This is a `wa.me` link whose message already contains, encoded once, the piece's name, code and URL.
     - an outlined "Call [branch]" button;
     - three quiet rows on `--surface-2`: "Book a visit" (passing `?piece=CODE`), "Ask us to call you" and "Which branch has it".

     Show the weight and karat as plain facts, and no price unless the owner confirms how prices are to be shown.

2. **A four-step visit form that remembers the piece and asks for a language.**
   - _Why it works:_ the Cartier and Van Cleef form feels like a concierge: the piece is already there, and the choice of language signals a personal welcome. It is also the industry standard, so it reads as luxury.
   - _How Classic should adapt it:_ one page on ivory, with four numbered steps:
     1. The branch, shown as four cards with the area and an "open now" line.
     2. The reason: this piece (already filled in), old-gold exchange, bridal set, custom piece, or coins and bars.
     3. The preferred day, a morning, afternoon or evening window, and the preferred language (the list comes from the owner).
     4. Name and WhatsApp number.

     It posts to `public/api/contact.php`, or, as a fallback, composes a WhatsApp message. There should be no CAPTCHA in the visitor's way; a honeypot field is enough.

3. **Velvet as the stage: category and piece tiles on a dark background.**
   - _Why it works:_ Tiffany's four "Shop by Category" tiles prove that a single piece on deep fabric, square and uncropped, reads as a display case. This is the closest match to Classic's existing photographs.
   - _How Classic should adapt it:_
     - Introduce two tokens sampled from the real photographs, for example `--velvet-navy` and `--velvet-plum`. Their values must be measured from the corners of the photos, not invented.
     - Assign one token to each image in the content file, and set each tile's background to it so the edge of the photo disappears.
     - Show four tiles across on desktop (about 320 px each, which the 600 px source covers at 2× pixel density) and 2 × 2 on mobile, with the label below in the eyebrow style.
     - The existing build check that samples photo corners for white can be adapted to warn when a photo's corners drift away from its velvet token.

4. **Tall ivory bands holding one line.**
   - _Why it works:_ Tiffany's empty bands of 356 to 464 px, each with a single serif heading, slow the scroll and make the next image feel chosen. They need no photography at all.
   - _How Classic should adapt it:_ between home sections, and at the start of each chapter on long pages, a band about 40 to 50 vh tall holding:
     - an eyebrow;
     - one Cormorant line at `--t-display`, centred, weight 300 or 400, under 20 words.

     One such line could be about the Group's decades in bullion, with the figure taken from `site.ts`, not typed in again.

5. **Branches as destinations, and as the last thing on the home page.**
   - _Why it works:_ Bvlgari and Van Cleef end their home pages with an invitation to the boutique. Cartier's and Bvlgari's store entries lead with a live open status. Graff puts its boutiques in the menu. Classic's four branches are its version of a flagship.
   - _How Classic should adapt it:_
     - A closing home module lists the four branches: Gold Souq Extension as the flagship, then Safari Mall, Rolla Mall and Madinat Zayed.
     - Each branch shows:
       - an "open now" line, worked out in the browser from the hours in `site.ts` (only after the owner confirms them);
       - today's hours;
       - a `tel:` link and a WhatsApp link;
       - "Book a visit here".
     - Add a "Visit us" column with the same four lines to the mega panel and to the mobile drawer.

6. **The daily rate, dressed for luxury.**
   - _Why it works:_ none of the five has anything like a live rate, and neither do the regional sites in file 05. The luxury sites show that figures can be set small, in capitals and space, without looking like a trading screen. Cartier and Van Cleef set their prices with the new dirham sign.
   - _How Classic should adapt it:_
     - Keep the utility strip carrying today's 24K, 22K, 21K and 18K figures, with the time of the last update, in tabular figures at caption size.
     - On the rate page, a plum band with large light numerals (`--t-numeral-xl`) and generous rules.
     - Use the U+20C3 character with a small self-hosted symbol font or an SVG fallback, as Van Cleef does. Do not draw it over another letter as Cartier does. Keep `AED` available for screen readers.

7. **Zigzag story rows for styles and collections.**
   - _Why it works:_ Cartier's high jewellery page gives each piece a half-screen field, its name and about 40 words, alternating sides. It makes ordinary stills look as if they are on exhibition.
   - _How Classic should adapt it:_
     - A "Styles" page with chapters: Kolkata, Rajkot, Temple, Antique, Turkish, Kuwaiti, Italian, Singapore.
     - Each row has a velvet photo centred in a half-width field of the same velvet colour.
     - Opposite it: the style name, about 40 plain words on what makes the style, and "See pieces in this style".
     - The text is centred, 32 to 36 characters to a line.

     This needs a change to the spec's rules on 50/50 layouts and centring.

8. **Sticky chapter chips on long pages.**
   - _Why it works:_ Bvlgari's pinned chips turn a long scroll into a guided visit, and let people jump ahead.
   - _How Classic should adapt it:_
     - On the Styles page and on the bridal and occasion pages, a row of square-cornered chips pinned under the sticky header, with `top` equal to the header's height.
     - The chip for the chapter in view gets `aria-current`, set by a small `IntersectionObserver` script.
     - The chips can be reached by keyboard.

9. **Slow, quiet motion: images that fade in, and underlines that wipe.**
   - _Why it works:_ Van Cleef's ease-out-expo fade means images arrive instead of popping in, and Tiffany's 600 ms wipe makes every link feel considered. Neither moves the layout.
   - _How Classic should adapt it:_
     - Images: `opacity` from 0 to 1 over 500 ms with `cubic-bezier(0.19, 1, 0.22, 1)` as each one decodes. No transform and no scroll trigger.
     - Links: a 1px `--rule-gold` underline that wipes across over 500 ms.
     - Mega panel: it opens over 300 ms, and its content fades in about 200 to 300 ms later.

     All of this goes inside `prefers-reduced-motion: no-preference`.

10. **A "Talk to us" page for choosing a channel.**
    - _Why it works:_ Tiffany's consultation page offers a call, an in-store visit, a virtual appointment and a chat as four equal doors. It removes the fear of picking the wrong one.
    - _How Classic should adapt it:_ `/contact/` opens with four cards of equal weight:
      - WhatsApp;
      - call a branch;
      - visit (linking to the list of branches);
      - a video call, only if the owner wants to offer one (`TODO(owner)`).

      The form comes after them.

11. **A highlight module with crossfading captions.**
    - _Why it works:_ Van Cleef's split module turns a few small cut-outs into a curated moment, because only the caption changes, and slowly.
    - _How Classic should adapt it:_
      - A square velvet stage holding four pieces from one style, with previous and next buttons.
      - The name, karat and weight crossfade, 1 s in and 0.5 s out.
      - It never moves on its own.
      - The photo itself changes with the same fade as the images.

12. **Browsing by karat, stone and occasion.**
    - _Why it works:_ Graff's browse-by-stone and Van Cleef's gifts by occasion match how people actually arrive: "a 22K bridal set", "something for a new baby".
    - _How Classic should adapt it:_ three short columns in the mega panel:
      - by karat: 22K, 21K, 18K;
      - by material: diamond, uncut diamond, gemstone, coins and bars;
      - by occasion, taken from the occasions collection.

      No new pages are needed, because the hubs already exist.

13. **A staggered collage with a lightbox** (lower priority).
    - _Why it works:_ Bvlgari's offset columns give a static grid a sense of movement without any animation.
    - _How Classic should adapt it:_ for a gallery page:
      - three columns of 600 px squares, with the middle column offset by a third of a tile;
      - each square opens a native `<dialog>` showing the piece, its facts and the WhatsApp button;
      - behind the dialog, a flat ivory scrim at 90 %.

14. **Hero crops made for portrait screens, and short muted loops** (needs new media).
    - _Why it works:_ every brand but Tiffany ships a separate composition for mobile. Bvlgari and Cartier treat the phone as the main screen.
    - _How Classic should adapt it:_
      - When the owner can arrange a shoot: a close-up loop of 6 to 10 seconds, showing a piece turning on the velvet bust in the branch's own light.
      - Export it at both 16:9 and 9:16, muted, with a visible pause button (WCAG 2.2.2) and a still poster frame.
      - Until then: a hero made of type on plum, with one velvet photo on a square stage of the matching colour.

15. **A doorway into a special collection** (later).
    - _Why it works:_ Graff's "Enter gallery" and Van Cleef's "set off to discover" make the visitor choose to go in, which sharpens their attention.
    - _How Classic should adapt it:_ only when there is something special to show, such as a bridal edit or an edit for Diwali or Eid:
      - a full-screen plum title with one sentence and one button;
      - then the gallery.

      Not for everyday pages.

### What not to copy

- Celebrity campaigns, or photos of jewellery being worn, as the hero, until real photography exists.
- Full-width square images built from small sources. A 600 px photo stretched to 1440 px will look soft, as file 05 found at Mahallati.
- Country or newsletter dialogs on arrival (Tiffany).
- Booking iframes that look like someone else's site (Graff).
- 40 to 50 third-party hosts, hidden h1s and 12px body text (Cartier).
- WebGL experiences like Van Cleef's Egypt map, in a static Astro site for a business with four branches.
- Carousel heroes that change before they can be read (Graff).
- Drawing the dirham sign over a remapped letter (Cartier).

---

## 9. Sources

- **Cartier:**
  - https://www.cartier.com/en-ae/home
  - https://www.cartier.com/en-ae/high-jewellery/latest-collections/en-equilibre/
  - https://www.cartier.com/en-ae/jewellery/collections/love/
  - https://www.cartier.com/en-ae/jewellery/bracelets/love/love-unlimited-bracelet-flexible-diamonds-B6094117.html
  - https://www.cartier.com/en-ae/rdv-bookings?context=ProductDiscovery&productReference=B6094117
  - https://stores.cartier.com/en_ae/united-arab-emirates/dubai/dubai/dubai-mall-fashion-avenue
- **Tiffany & Co.:**
  - https://www.tiffany.ae/
  - https://www.tiffany.com/
  - https://www.tiffany.com/high-jewelry.html
  - https://www.tiffany.com/high-jewelry/blue-book/2026-hidden-garden.html
  - https://www.tiffany.com/jewelry/necklaces-pendants/
  - https://www.tiffany.com/jewelry/necklaces-pendants/tiffany-hardwear-18k-yellow-gold-necklaces-pendants-1364384799.html
  - https://www.tiffany.com/client-services/schedule-consultation.html
- **Bvlgari:**
  - https://www.bulgari.com/en-ae/
  - https://www.bulgari.com/en-ae/collection/high-jewellery/eclettica
  - https://www.bulgari.com/en-ae/jewellery/rings
  - https://www.bulgari.com/en-ae/AN859655.html
  - https://www.bulgari.com/en-ae/bookanappointment?virtual=false&sku=AN859655
  - https://www.bulgari.com/en-ae/storelocator/
- **Van Cleef & Arpels:**
  - https://www.vancleefarpels.com/ae/en/home.html
  - https://www.vancleefarpels.com/ae/en/collections/high-jewelry/thematic-collections/fascinating-egypt.html
  - https://www.vancleefarpels.com/ae/en/e-boutique/category/necklaces-and-pendants.html
  - https://www.vancleefarpels.com/ae/en/collections/jewelry/alhambra/vcara42800---vintage-alhambra-necklace-10-motifs.html
  - https://www.vancleefarpels.com/ae/en/in-store-appointment.html
- **Graff:**
  - https://www.graff.com/ae-en/home/
  - https://www.graff.com/ae-en/high-jewellery/unique-jewels/artistry-in-motion/
  - https://www.graff.com/ae-en/jewelry/view-by-collection/butterfly/necklaces-pendants/butterfly-diamond-necklace/RGN948_RGN948.html
  - https://www.graff.com/ae-en/book-an-appointment.html
  - https://www.graff.com/ae-en/storedetail/dubai-dubai-mall
