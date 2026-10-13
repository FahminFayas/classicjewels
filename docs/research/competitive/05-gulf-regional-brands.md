# 05 · Gulf and regional brands: Damas, L'azurde, Pure Gold, Mahallati

Research date: 13 October 2026. All four sites were reachable, so Liali was not needed.

**Method.** I used my own browser tab at 1440×900 and then 390×844, with each mobile page reloaded after the resize. Most facts come from the DOM: computed styles, `document.fonts`, Swiper/Owl config objects, image natural sizes and stylesheet rules. File sizes come from `HEAD` requests. Screenshots were taken for visual judgement. Because the browser pane was shared, desktop screenshots rendered very small. Where a visual claim depends on them it says so. Mobile screenshots rendered properly. LCP readings were unreliable because the tab was in the background, so I left them out. No forms were submitted and nothing was added to a cart. I closed the Damas voucher pop-up with its close button.

---

## The short version

1. **None of the four shows a gold rate.** Damas, L'azurde and Pure Gold all sell 18K to 24K gold online, and some Damas gold prices end in odd decimals (AED 2,103.80, AED 2,134.48), which suggests they are calculated from weight and the daily rate. Even so, none of them shows the rate. Classic's daily rate feed has no equivalent anywhere in this set, so it can be the signature brand device.
2. **Mahallati is the only one that feels like a house rather than a shop.** It does this with very few elements: a silent, full-screen video with no text over it, a 4-item navigation (collection, The House, The Boutique, Contact), a heritage line straight after the hero, a "Book Appointment" button that ranks equal with "Add to Cart", and a page for each store giving the floor and parking. All of that suits an enquiry-led business.
3. **What makes a site feel like a shop** shows up across the other three: pop-ups and promo bars before the logo, "% OFF" badges on every card, sale items in red in the nav, headline text baked into banner images, and theme-default layouts. Pure Gold runs an unmodified Magento theme and Damas has a voucher modal. The owner says the current Classic site feels like a blog; these are the patterns that would make it feel like a discount shop instead.
4. **Arabic is a real gap.** L'azurde is Arabic-first: UAE visitors land on `/ar-ae`, with the Cairo webfont, `lang="ar-ae"`, `dir="rtl"` and separate Arabic hero artwork. Damas sets `dir="rtl"` but loads no Arabic font and has `lang="ae"`, which is not a valid language code. Pure Gold and Mahallati are English-only.
5. **On image size, Classic's 600×600 velvet shots are enough** as long as they are not stretched. Pure Gold shows 600px sources at 268px and they look crisp. Mahallati stretches 300×350 sources to 783×900 on its product pages and they look soft. Damas shows 500px sources at 326px. Classic's rule should be: product photos never wider than about 300 CSS px, and video or lifestyle frames for the large moments.

---

## 1. Damas (UAE, English and Arabic)

**Pages visited:** `/ae-en/` (desktop and mobile) and `/ae-ar/`; Gold Jewellery category `/ae-en/gold-jewellery/`; product page _Floret Bracelet in 21K Yellow Gold_ (Anmol Teen 21K line); Find a Store `/ae-en/address/stores/`; World of Damas `/ae-en/world-of-damas/`; Nuqoosh campaign page `/ae-en/nuqoosh-awareness-page/`; Nuqoosh collection listing.

**Stack:** Next.js (App Router) on Akinon's "Project Zero" commerce front end (`pz-icon` icon font, images from `akinoncloudcdn.com`), with Swiper web components (`<swiper-container>`). Pop-ups are built with Brizy.

### First impression (5 seconds)

A centred modal offering an AED 100 voucher in exchange for an email and mobile number covers the hero within a couple of seconds and locks scrolling. Behind it are a white 145px sticky header and a 4-slide banner carousel. Once the modal is closed, the site reads as a department-store e-shop with one strong campaign image (Nuqoosh). It feels polished, but it does not feel like a house.

### Hero

- **Composition:** full-width Swiper, 4 slides, `autoplay.delay 3000`, slide effect at `speed 300`, looping, arrows on desktop and none on mobile. The desktop aspect ratio is `2000/795` (rendered 1423×566). Mobile gets separate portrait artwork at `860/1180` (390×535).
- **Media:** large banner bitmaps. Slides: New In (a model against a blue sky); Nuqoosh (a model in an orange dress in front of an ornate gold-and-emerald lattice screen, which is the clearest Gulf-heritage image on any of these sites); a "top 100 trending" slide; and a 30%-off pearls slide.
- **Copy:** every headline is baked into the image, and every slide has `alt=""`. The Arabic site uses separate Arabic-language bitmaps.
- **CTA:** the whole slide is a link. There is no HTML button. Three seconds is too short to read text inside an image before the slide changes.

### Navigation

- A black rotating announcement bar with four promises: 30-day returns, Tabby instalments, next-day delivery if ordered before 4pm, and AED 100 off a first order.
- A utility row: Find a Store, Contact, العربية, Sign in. The logo is a lowercase "damas" wordmark at 101×24, centred.
- Ten top-level items in Semplicita Pro at 14px/300 in black. "Special Offer" is red `#C30606` at weight 500.
- **Mega menu:** a full-width white panel 434px tall with `shadow-md` and a `0.3s cubic-bezier(0.4,0,0.2,1)` transition. It has five columns: Shop by category, Featured collection (Nuqoosh, Anmol Teen 21K, Prisma…), Shop by price (five AED bands), Shop by metal colour, and Curated shops (14K / 18K / 22K jewellery, Bestsellers, Gifting, Men's, Kids). Each link has a thumbnail icon of about 24px.

### Visual language

- **Palette:** text `#000000`; background `#FFFFFF`; hairlines `#EEEEEE`; panels `#F9F9F9`; sale red `#C30606`; sage CTA `#A1B090` (Add to Bag); pale sage border `#E7ECDC`; blush `#E5D4C9`; gold link `#C09124` (Size Guide, Select your city); breadcrumb grey `#656665`.
- **Type:** Semplicita Pro (a geometric sans) at 300/400/500 for everything. Section H2 is 28px/300, body 16px, nav 14px/300, card names 14px/300, prices 14px/500. There is no serif anywhere, so the look depends entirely on the photography.
- **Layout:** a content width of about 1425px with 36px side padding. Home sections, desktop, about 4,000px in total: hero (638px); "Our Curation", a horizontal slider of 8 portrait category cards at 323×389 with about 4.4 visible; "Gifting and more", a bento of one 654×549 tile, one 654×266 wide tile and two 319×266 tiles; two 673×417 split banners (a 14K collection and Nuqoosh); a full-width 1425×608 "World of Damas" banner with a 28px heading and one line of copy; then the footer with four USP icons (free returns, certificate of authenticity, delivery in 3 working days, instalments).
- **Radius and shadow:** mostly 0. Category tiles on the listing page use 5px and Add to Bag uses 4px. The only shadow is on the mega menu.

### Motion and interaction

- Movement comes from carousels only. There are no scroll reveals and no parallax. The CSS contains no hover rules that use transform or opacity, apart from one in a third-party survey widget.
- The liveliest element is a **muted, looping, autoplaying product video** shown as one of the 379×379 squares in the product-page image grid.
- Lazy home sections sit as empty 150px boxes until they are scrolled into view.

### How products are presented

- **Category page:** there is no `<h1>` in the DOM. The top row has five category image tiles at 240×160 with a 5px radius, followed by quick-filter chips with 27px icons (New In, Bestsellers, Under 2000), a count of 927 products, and Filter / Sort.
  - The grid is 4 columns of 326px with a 40px row gap and a 16px column gap.
  - Each card has a square 500×500 packshot on white shown at 326px and can be swiped through several images. Above the name is a sub-collection label (e.g. "Kiku") at 16px/500, then the name at 14px/300, the price at 14px/500 as "728 AED", a struck-through price at 11px and "20 % OFF".
- **Product page:** a 2-column grid of 379px squares on the left (packshot, on-model, video) and a sticky info column on the right.
  - The H1 is only 16px/300. Below it: price; a sage **Add to Bag** button (188×45, 4px radius); a metal-colour swatch; size; a delivery-city selector; and **four 90px trust icons** (free delivery, 30-day returns, Click & Collect from 40+ locations, Authentic / certified quality).
  - Then a free gift-packaging note, accordions (Product details, Design & craftsmanship, Delivery & returns, Product care), "Complete the look", and Product JSON-LD with the price.
- **Pricing:** some gold items carry odd decimal prices (Nuqoosh: AED 2,103.80, 2,134.48, 2,379.41), which points to weight × daily-rate pricing. The rate itself is never shown.
- **Arabic naming:** Nuqoosh lines carry Arabic names on the English site: Najma (star), Shabaka (net), Athar (trace).

### Trust and conversion

A fixed WhatsApp button (`bottom 20px / right 20px`, `wa.me` link, z-index 999999). Also: Tabby instalments, the voucher modal, 30-day returns, a certificate of authenticity, Click & Collect from 40+ locations, the Damas Club loyalty programme, and a store finder.

**Store finder:** a list only, with no map. It covers 60 stores and has one search box ("store name or city"). Each card is 452px wide with 20px padding and a 0.8px `#E7ECDC` border, showing the name, address, phone and Get Directions. Phone numbers are formatted as `+0097…` and the `tel:` links carry the same oddities. The page `<title>` is the generic home title. Damas lists three units in Madinat Zayed Shopping Centre in Abu Dhabi, plus Deerfields and Al Wahda.

### Heritage storytelling

- World of Damas has year tabs from 2021 to 2024. Every tab repeats the same placeholder paragraph, which claims a founding date of 1907. The page has no headings. A section on the Gaia lab-grown diamond line appears twice.
- The Nuqoosh campaign page is built entirely from images and lazily loaded videos with no HTML text. A crawler or screen reader gets the video fallback message four times.

### Arabic and bilingual

`/ae-ar/` sets `dir="rtl"` and swaps in Arabic hero bitmaps, but `<html lang="ae">` is used on both languages. No Arabic webfont is loaded (only Semplicita Pro), so Arabic falls back to Segoe UI or system fonts. Part of the announcement bar stays in English, and the `<title>` is "Damas Jewellery" in English.

### Mobile (390×844)

- The header is 92px: a black announcement bar with a close ×; then hamburger and wishlist on the left, logo in the centre, and search, account and bag on the right.
- Above the hero sits an **Instagram-stories row of 76px circular category thumbnails** on pale sage backgrounds, with one peach "up to 30% off" circle. Then the portrait hero at 390×535.
- Most desktop sections are hidden at this size (the `hidden lg:block` classes), so the mobile home is only about 2,860px long and runs into empty placeholders. The WhatsApp button floats bottom right. There is no horizontal overflow.

### Performance feel

Server-side rendering makes it feel reasonably quick, but the page is heavy:

- About 123 requests across 19 hosts on the mobile home.
- 16 third-party scripts: TikTok ×3, Snap ×2, Meta ×2, MoEngage ×2, gtag/GTM ×3, Cloudflare and Damas's own pixel.
- The hero PNGs are large: the Nuqoosh slide is **2.86 MB** and the World of Damas banner is **2.16 MB**. JPG slides are about 130 KB.

### Strengths

- Hero artwork is cropped separately for mobile (860:1180 portrait) and for Arabic.
- The mega menu lets people browse by **karat** (14K/18K/22K) and by price band, which is how Gulf customers shop.
- The trust row on the product page makes four specific, checkable promises at the point of decision, and Click & Collect from 40+ locations links online browsing to the stores.
- A product video sits inside the gallery grid.
- Arabic collection names (Nuqoosh, Najma, Shabaka) bring in heritage without going over the top.
- The WhatsApp button is visible on every page.

### Weaknesses

- Headlines are baked into images with empty alt text, under a 3-second autoplay.
- Promotions come first: the voucher modal on arrival, red "Special Offer" in the nav, and "% OFF" on many cards. The whole thing reads as a sale shop.
- The heritage page is broken (placeholder copy repeated four times); the category page has no H1; the product-page H1 is 16px.
- Arabic is half-done: no Arabic font and an invalid `lang` code.
- The store finder has no map, garbled phone formats and a generic `<title>`.
- The mobile home is thin because desktop modules are simply hidden.

### Steal-worthy patterns (ranked)

1. **A product video square inside the gallery.**
   - _Why it works:_ gold and stones only come alive when they move. A 5-second turn does more than any still.
   - _How Classic should adapt it:_ shoot 5 to 8 second phone clips of hero pieces turning slowly on the plum or navy velvet bust under one key light. Use the existing 600×600 still as the poster.
     - On piece pages it becomes the second square. On the home page it becomes a "piece of the week".
     - Mark-up: `<video muted loop playsinline preload="none">`, under 1.5 MB, with only the poster shown under `prefers-reduced-motion`.
2. **Karat as a primary way to browse.**
   - _Why it works:_ Gulf and South Asian buyers think 22K / 21K / 18K first and style second.
   - _How Classic should adapt it:_ add "Shop by karat" chips (22K, 21K, 18K) in the nav and on category pages. Each chip shows **today's per-gram rate** for that karat from the rate feed, which ties browsing to Classic's signature device.
3. **Four specific promises at the point of decision.**
   - _Why it works:_ concrete promises beat a generic "trusted" badge.
   - _How Classic should adapt it:_ put a row under the WhatsApp CTA on every piece page, with values taken from `src/data/site.ts`: hallmarked karat, old-gold exchange at today's rate, four branches, and reserve or ask on WhatsApp. Only promises the owner has confirmed (see the `TODO(owner)` markers).
4. **Separate mobile artwork for the hero.**
   - _Why it works:_ a landscape banner squeezed onto a phone loses the jewellery.
   - _How Classic should adapt it:_ use `<picture>` sources with a portrait crop under 768px. Classic's portrait velvet-bust shots already suit this.
5. **A stories-style circle row at the top of the mobile home.**
   - _Why it works:_ it gives fast thumb access, and every Gulf phone user knows the pattern.
   - _How Classic should adapt it:_ eight circles for the styles (Kolkata, Rajkot, Temple, Antique, Turkish, Kuwaiti, Italian, Singapore), cropped from the velvet shots. A dark circle around a gold piece looks good at 72 to 76px.
6. **Arabic names for collections.**
   - _Why it works:_ it signals Gulf identity inside an English site.
   - _How Classic should adapt it:_ give the Kuwaiti and Gulf lines Arabic names with transliteration and translation (owner to confirm the names).
   - _Avoid:_ modals on arrival, text inside images, 3-second autoplay.

---

## 2. L'azurde (UAE: Arabic and English)

**Pages visited:** `lazurde.com`, which redirects to `/ar-ae` (desktop); `/en-ae` (desktop and mobile); Gold Jewelry category `/en-ae/gold-jewelry`; product page _Links Chain Necklace in 21K Gold_; Contact Us; `/en-ae/store-locator` (it does not exist and shows an empty "No Items Found" listing).

**Stack:** Next.js (Pages Router), CSS modules and Swiper. Arabic is set in **Cairo** (400/500/700) and English in **Roboto** (400/500/700).

### First impression (5 seconds)

UAE visitors land in **Arabic**. Before the logo there are three bars:

- a cream promo bar, `#F1E9DB`, 40px, offering free delivery on all orders;
- a black utility bar, 40px, with rotating messages;
- a grey `#F2F2F2` strip, 72px, asking for language and location, with UAE / English dropdowns and a black Continue pill.

Then the logo row and a 53px nav. Altogether the sticky header is **256px on desktop and 269px on mobile**, which is 32% of an 844px screen until the selector is dismissed. Below that is one static hero: a model in a halter top with diamond earrings, ring and pendant on a palm-lined path in warm afternoon light, with a serif summer headline baked into the image and a small cream "Shop Now" pill. The hero is regional and seasonal, but the header around it is cluttered.

### Hero

- **Composition:** a single image with no carousel, 1440×700 WebP rendered at 1425×693. The English and Arabic versions are separate files, so the headline is set properly in each language.
- **Copy:** a short seasonal line in serif capitals, inside the image.
- **CTA:** a cream pill sitting on the image.

### Navigation

- Eight items: Special Prices, Diamond, Gold, Fashion, Lab Grown Diamonds, Love & Engagement, Gifts & Occasions, Shop All.
- **Mega menu:** full width, 450px tall, text only. Columns: Shop by category; Featured (including **Gold Coins & Bars** and New In); Gold colour; Gemstone; Price bands (500–1,000 up to 4,000+).
- The mobile drawer begins with a sub-brand switcher (L'azurde / Miss L').

### Visual language

- **Palette:** black `#000000` for buttons and the footer background; white; cream `#F1E9DB`; grey `#F2F2F2`; white text over photographs.
- **Type:** Roboto. Section headings are 24px/500 in title case. The H1 on category and product pages is 32px/500. Card names are 15px/500, and the sub-brand label above each name is 18px/500.
- **Buttons:** black pills with `border-radius: 100px`.
- **Prices:** the new **UAE Dirham symbol as an inline SVG** at 0.9em instead of "AED". A row of five 12px stars sits under every card.
- **Home sections (English, about 6,100px):**
  - the hero;
  - a New Arrivals slider (Swiper, 5 per view on desktop, 8px gap, 247px cards);
  - one 489px row of **four portrait sub-brand tiles** (Gold, Diamond, Miss L', Instyle), each with a white 24px heading, one line of copy and a "Shop Collection" pill over a lifestyle photo;
  - Best Sellers;
  - Shop by Category (4 tiles);
  - a row of four USP icons (free delivery, 15-day returns, Tabby, same-day delivery in Dubai);
  - an Instagram community block (@Lazurde, 930px tall);
  - a long block of SEO text;
  - a black footer with gift guides for Ramadan, Mother's Day, birthdays and anniversaries.

### Motion and interaction

- Every section has a wrapper starting at `opacity: 0`. When it enters the viewport it plays a keyframe called `slideUp` (`0.5s ease-in-out`, `animation-delay 0.2s`, `fill-mode forwards`). In my background tab whole sections stayed blank until a real wheel scroll triggered them: if the observer never fires, the content never appears.
- The utility-bar messages cycle with a scroll-up keyframe, and the language strip collapses with a keyframe called `hideUp`.
- Swiper transitions run at 300ms. No hover transforms were found.
- On mobile the sliders show **1.349 cards** (a peek at the next one), with Swiper's scrollbar acting as a thin progress line.

### How products are presented

- **Category page:** H1 "Gold Jewelry" at 32px; "Showing 1–40 of 112"; a horizontal row of filter dropdowns (Category, Type, Color, **Gold Karat**, Gemstone, Price); sort by Best Seller.
  - Cards are 310px squares (386px source) showing packshots on white, with a black "Add To Cart" pill (40px) over the image.
  - Names always include the karat ("… In 21K Gold").
  - **24K bars and coins sit in the same grid as the jewellery:** "Dune design" bars in 1g / 2.5g / 5g / 10g and a horse-design coin, priced like products (1g at 779).
- **Product page:**
  - Gallery and buying area: a 764×764 main image (1440px source) with a 72px vertical thumbnail rail on the left. H1 at 32px/500. The price with the Dirham symbol and Tabby and Tamara instalments shown in line ("4 interest-free payments of 187"). Add To Cart is a black pill, 391×50.
  - Details and extras: a **Design Details** table (Metal: 21K Yellow Gold · **Weight: 0.74 g** · Chain length: 38 cm · Collection · Style number), Write a review, and a "Style With" cross-sell.
  - Bug: the gallery uses `<video>` elements pointing at JPG files.

### Trust and conversion

Free delivery, free 15-day returns, Tabby and Tamara, same-day delivery in Dubai, and star ratings. There is **no WhatsApp, no store finder and no appointment booking.** The contact page gives a toll-free number answered Monday to Friday, 9 to 5, an email address, and the UAE head office in the **Gold Souk, Deira (Gold Land Building)**, close to Classic's flagship. The page has no `<title>`.

### Heritage storytelling

None for the UAE site. "L'azurde World" in the footer is only a column heading, and the one link under it goes to Investor Relations.

### Arabic and bilingual

The best in this set. Arabic is the default for the UAE, with `lang="ar-ae"`, `dir="rtl"`, the Cairo webfont, Arabic product names and Arabic hero artwork. English is one dropdown away. Weakness: the 72px language/location strip asks every visitor to choose even though the site already guessed correctly.

### Mobile (390×844)

- The header is 269px including the language strip: cream promo bar, then the selector with two 160px rounded dropdowns and a full-width black Continue pill, then hamburger, logo, wishlist and bag, then a full-width rounded search field.
- The hero is portrait: the same model in the palm-tree setting, with the headline set at the right.
- Sliders show 1.35 cards at 275px. There is no bottom navigation bar and no horizontal overflow.

### Performance feel

About 22 Next.js chunks plus TikTok ×3, Snap ×2, Meta ×2, GA ×2, GTM, Cloudflare and Cronitor RUM. The WebP hero is a sensible choice. Perceived load is slowed by the reveal animations, which hide content for 0.2 to 0.7s after it scrolls into view.

### Strengths

- Arabic-first, with a proper Arabic face and Arabic artwork for each language.
- The product page states **weight in grams**, karat and length, which is the information Gulf buyers use to judge gold value.
- The Dirham symbol as an SVG is current and local.
- Bullion (bars and coins) is presented as designed products, with weight as the name.
- The four portrait sub-brand tiles make it feel like a group of brands.
- Mobile sliders peek at the next card and show progress.

### Weaknesses

- The 256 to 269px header stack: three bars before the logo.
- Roboto everywhere makes the English site look like a generic app with no typographic character.
- The reveal animation hides content by default.
- There is no human route: no WhatsApp, no stores, and contact hours of Monday to Friday, 9 to 5.
- Every tile is selling something; there is no story page.
- Unknown URLs show an empty product listing (a soft 404), and some pages have no `<title>`.

### Steal-worthy patterns (ranked)

1. **A specification table that gives weight in grams.**
   - _Why it works:_ gold is valued by weight × karat × rate, and showing grams signals honesty.
   - _How Classic should adapt it:_ each piece page shows karat, approximate weight in grams (when the owner supplies it), style (e.g. Rajkot), length or size, and a live line from the feed: "Today's 22K rate: AED x/g".
     - The CTA reads "Ask for today's price on WhatsApp". Never an invented price; this follows the CLAUDE.md rule against fabricated prices.
2. **Arabic done properly.**
   - _Why it works:_ it is the only thing here that feels made for the UAE rather than translated.
   - _How Classic should adapt it:_ an Arabic version of at least the home, branches and gold-rate pages, with `lang="ar-AE"`, `dir="rtl"`, mirrored layout, Arabic numerals optional for the rate, and an Arabic face that suits Cormorant Garamond (for example Noto Naskh Arabic or Amiri; to be decided).
     - Do not add a blocking language strip. Use a quiet EN | ع toggle in the header.
3. **Bullion presented as designed objects.**
   - _Why it works:_ bars and coins become desirable gifts rather than a commodity.
   - _How Classic should adapt it:_ this is Classic Group's heritage (35+ years of bullion trading). Give coins and bars their own section, with weight chips (1g, 2.5g, 5g, 10g, tola, 1oz as stocked). Each chip ties to today's 24K rate, and the CTA is "Reserve at a branch".
4. **The Dirham symbol as an inline SVG** next to the rate and any confirmed figures.
   - _Why it works:_ it looks current and local.
   - _How Classic should adapt it:_ a token-coloured SVG (bronze on plum) in the rate ticker.
5. **Peeking slider with a progress line** on mobile.
   - _How Classic should adapt it:_ 1.3 cards visible on a plum `#4B2849` ground with a 2px bronze `#BE8658` progress line. No arrows needed.
6. **A slide-up reveal, done safely.**
   - _How Classic should adapt it:_ only as progressive enhancement. Content is visible without JS, movement is 8 to 12px, it lasts 400 to 500ms, and it is off under `prefers-reduced-motion`.
     - Check this against `docs/design-spec.md` first: the current tokens forbid hover transforms, and scroll reveals would need explicit sign-off.

---

## 3. Pure Gold Jewellers (UAE)

**Pages visited:** `pugold.com` home (desktop and mobile); Collections dropdown; Rings category `/rings.html`; product page _18K Gold Bloom Clover Necklace with Diamonds_; Dubai Stores `/dubai-stores/`; About Us `/puregold-group/`; Create Yours `/create-jewellery/`. (`puregold.com` refused the connection. The correct domain, `pugold.com`, came from a web search.)

**Stack:** Magento 2 with the off-the-shelf **MGS "Claue"** theme, jQuery, RequireJS and Owl Carousel. Fonts: Montserrat (Poppins is also declared), Font Awesome, Pe-icon-7-stroke, and a custom `UAEDirham` font for the currency glyph.

### First impression (5 seconds)

- **Top strip:** a rose-beige `#DAC2B0` strip advertising the group's **residential property developments**, which pulls attention away from jewellery. Below it, a centred logo (196×60), eight nav items with "Offers" on a beige pill, and a row of four USP icons (delivery across the UAE and worldwide, buy now pay later, personalised engraving, free gift wrapping).
- **Hero:** a split layout. A narrow text column on the left carries an uppercase Montserrat H1 ("Premium Collection") at 48px/600, a paragraph of generic copy and an outlined "Shop Now" button. A video takes about three quarters of the width on the right. It reads as a theme demo with real jewellery in it.

### Hero

- **Media:** `Pure_Gold_Reel.mp4`, 1055×460 on desktop, **18.9s**, autoplay, muted, looping, **no poster, 45.9 MB** (`Content-Length: 45,893,469`). From the small screenshot: a model in a pale blue halter top with gold jewellery, warm skin tones.
- **CTA:** "Shop Now", outlined, 0.8px `#363636` border, 8px radius, 22px Montserrat.
- **On mobile** the text stacks first (H1 still 48px) and the video starts at y=638, half below the fold.

### Navigation

- Items: Home, Collections, Categories, **Create Yours**, New Arrivals, About Us, Careers, Offers (which links to `/#/`).
- The Collections dropdown is 560px wide and text only: 15 collection names (Pure Sparkle, Floressa, Diana, Fleur, Hayya, Marvella, Luciana Italian, Bridal…). The transition is 0.3s.
- A currency switcher covers the GCC: AED, BHD, KWD, OMR, QAR, SAR. There is no Arabic.

### Visual language

- **Palette:** text `#222222`, H2 `#4C4C4C`, rose beige `#DAC2B0`, gold `#D7A216`, olive gold `#9A844A` (badges), panels `#F6F6F8`.
- **Type:** Montserrat throughout. H1 48px/600, H2 34px/400 uppercase with 0.6px tracking, H3 32px/400; footer headings 36px/700.
- **Radius:** 6px on category tiles, 8px on buttons, 10px on badges, and 40px pill cart buttons in list view.
- **"Explore the collection":** five 268×268 square tiles from 600×600 sources, with a 6px radius and a 0.4s zoom on hover. Each photo shows the jewellery on **dark, warm brown and amber surfaces**, averaging between `#3D2A1F` and `#845E39`, with a 20px label below. This is the most premium-looking row on the site and the closest thing in this set to Classic's dark velvet.
- **Below that:** a 987×696 lifestyle image with a 32px H3 ("We Make You Our Priority") and a View All button. Then the Top Trending and New Arrivals sliders, then the footer.

### Motion and interaction

- The hero video.
- Owl sliders: 4 items, `autoplay 5000ms`, loop, arrows, `smartSpeed 250`.
- Product images zoom very slowly on hover (`transform 2s cubic-bezier(0,0,0.44,1.18)`), and category tiles zoom over 0.4s.
- Quick-view modal. A scroll-to-top button. No scroll reveals.

### How products are presented

- **Home sliders** show only the "New" and "-25%" badges on the image. **The name and price are hidden until hover:** the details panel is absolutely positioned, has zero height, and has white text.
- **Category page:** H1 "Rings" at 24px. Sort by position, name, price or gold carat. 24 / 48 / 72 per page. 4 columns of 342px cards with 800×800 packshots on white, **every card showing -25%**. As on the home page, names and prices only appear on hover, which leaves touch users without them. Long SEO copy sits under the grid.
- **Product page:** standard Magento.
  - Gallery and buying area: three 329px images (1200 sources), H1 at 24px/600, the special and regular prices with the Dirham glyph, an outlined ADD TO CART, a round wishlist button, a size guide and the SKU.
  - Below: tabs for Details (an emotional paragraph that includes the carat weight), More Information and Reviews.

### Trust and conversion

- **Store finder:**
  - Emirate tabs: **Dubai | Northern Emirates | Abu Dhabi | Oman**.
  - Each store gets a **storefront photo** (305×240), its unit and floor with a landmark ("opposite Carrefour", "opp. Tim Hortons"), a `tel:` mobile number, an email, a View Map short link and an **embedded Google Map** (610×300, `loading="lazy"`, 7 iframes on the page).
  - There is also a store in the Gold Centre building in the Gold Souk.
- **Create Yours** is a bespoke brief form:
  - Fields: name, email, phone; product type; budget from (minimum AED 799) and to; metal (18kt); colour; diamond colour (G-H) and clarity (VS-SI); stone type; remarks; and an **uploaded reference image** (PDF / PNG / JPG).
  - It is a structured enquiry, not a checkout.
- Also: BNPL, engraving, gift wrapping. There is no WhatsApp button.

### Heritage storytelling

"Since 1989" appears only in the `<title>`. The About Us page lists group company websites and has a paragraph about a director's personalised-jewellery line. There is no founding story and no imagery.

### Mobile (390×844)

The header is 119px. The USP row becomes a horizontal slider of icon pills. A **fixed bottom tab bar** (51px: account, wishlist, home and more) sits above a scroll-to-top button. Text comes first, then the video. Category tiles stack. There is no horizontal overflow.

### Performance feel

The heaviest page here. A **45.9 MB autoplaying MP4** loads on every home visit, on top of about 40 RequireJS files, jQuery, Meta, GTM and Ads. The store page has 7 map iframes, although they are lazy-loaded.

### Strengths

- Dark, warm category photography makes gold look like glowing metal.
- The store finder is excellent: storefront photo, landmark, tappable number and a map for each store, grouped by emirate.
- A structured bespoke brief with a budget band and a reference upload.
- The GCC currency switcher suits regional visitors.
- Real video motion, which is a step up from static banners.

### Weaknesses

- It looks like a theme template: uppercase Montserrat, stock Magento product page, cliché copy (jewellery as story, symbol and spark).
- The 45.9 MB autoplaying video has no poster.
- Name and price are hidden behind hover, and a blanket -25% on everything cheapens the range.
- The cross-promotion for property developments dilutes the jewellery brand.
- The "Offers" nav item links to `#`. There is no Arabic and no heritage story.

### Steal-worthy patterns (ranked)

1. **Dark product tiles as the way into each category.**
   - _Why it works:_ on a dark ground gold glows; white packshots flatten it.
   - _How Classic should adapt it:_ Classic already has velvet shots. Use them as square tiles on a plum `#4B2849` or deep navy surround, so the velvet merges with the page and the piece seems to float. Radius 0, as in Classic's tokens.
     - Display them at 280 to 300px at most, so the 600px sources stay sharp on 2× screens.
2. **A card per branch with a storefront photo, landmark, tappable number and map.**
   - _Why it works:_ it answers "which door do I walk through?", which is what an enquiry-led business needs.
   - _How Classic should adapt it:_ four branch cards, each with a real shop photo (an owner task), a landmark line such as "near X entrance" (`TODO(owner)` until confirmed), and `tel:` and WhatsApp links.
     - Use a **Google Maps link or a static map image** rather than four iframes.
3. **Emirate tabs.**
   - _How Classic should adapt it:_ Dubai | Sharjah | Abu Dhabi. With only four branches, a single row of cards with emirate labels may be enough.
4. **A bespoke brief form.**
   - _Why it works:_ it turns "I want something like this" into a qualified lead.
   - _How Classic should adapt it:_ a "Make or remake a piece" form.
     - Fields: piece type; karat (22/21/18); style (Kolkata, Rajkot, Temple, Antique, Turkish, Kuwaiti, Italian, Singapore); a budget band; a reference photo; the preferred branch; and the old gold the customer is bringing (optional).
     - It submits to `public/api/contact.php`, or hands over to WhatsApp with a pre-filled message.
   - _Avoid:_ uncompressed hero video (aim for a poster plus under 3 MB at 720p), hiding names, and discount badges.

---

## 4. Mahallati Jewellery (Dubai)

**Pages visited:** home (desktop and mobile); The House `/pages/the-house`; the Dubai Mall store page `/pages/dubai-mall`; Rings collection; product page M181096.

**Stack:** a Shopify theme. Fonts: **"Timeless"** (a custom display serif loaded through the Fontio app), **Raleway** for body text, Assistant for prices, and Manuale. The script load is light.

### First impression (5 seconds)

A copper announcement bar (`#C2957E`, 33px) offers complimentary shipping and exchanges. Under it, a **full-viewport, muted, looping video** (1425×900 on desktop, 390×844 on mobile, 16.8s, 4.0 MB, no poster) shows close-ups of hands wearing stacked gold-and-diamond bangles and rings against a white blouse. A transparent 119px header sits on top: a white logo (160×57) and four nav items in Timeless at 15px, white, with 1px tracking. There is **no headline and no button over the video.** It feels like a maison, quiet and confident.

### Hero

- **Composition:** full bleed, 100vh, `object-fit: cover`. The mobile crop shows lips and a hand with rings.
- **Copy:** none over the video. The first copy follows directly underneath: a "jewellery experts since 1968" line in Timeless at 16px with 2px tracking, a single grey Raleway line at 15px/21px (`#707070`), and an outlined "Discover the House" button.
- **CTA style:** a 1.6px `#8E8E8E` border, 1px radius, copper text and Raleway at 14px.

### Navigation

Shop Lady Magnolia (the house collection), The House, The Boutique, Contact Us, and the cart. Five items in all. **The navigation is about the brand rather than the catalogue.**

### Visual language

- **Palette:** copper `#C2957E` (headings, links, the product-page CTA fill and the announcement bar); body `#3D3D3D`; muted `#707070`; borders `#8E8E8E`; a store band in `#F4F4F4`; white. Copper is the only accent.
  - Classic's bronze `#BE8658` is very close to Mahallati's copper, so Classic should keep **plum** as the dominant ground to stay distinct.
- **Type:** Timeless serif at 14 to 21px, uppercase, tracked 1 to 2px, for every heading. Raleway Light for body at 14 to 15px with a 1.4 line-height. Headings are deliberately small, so the luxury comes from restraint rather than size.
- **Layout (desktop, about 4,800px):**
  - video (900px);
  - the heritage line (237px);
  - Lady Magnolia: four category tiles at 280×280 with copper labels;
  - a solitaires line inviting visitors to "shop online or book an appointment";
  - Expert Craftsmanship: text and two images (391×257, **stretched from 300×197**);
  - a full-bleed 1425×777 solitaire image with text;
  - "The Mahallati Experience": a full-bleed 1425×540 image with white copy inviting visitors to speak to the team, and a **Book Appointment** button;
  - a store band (`#F4F4F4`) listing three malls, each with "Visit Store".

### Motion and interaction

Only the hero video and the slide-in announcement bar. No carousels on the home page, no scroll reveals, no hover transforms. The calm is deliberate and works.

### How products are presented

- **Collection page (Rings):** six products. **They are named only by SKU** (M181096), priced as "Dhs. 6,900.00", with 280×326 source images. A feature card promotes the Lady Magnolia collection. The page has no H1.
- **Product page:**
  - Images: a 570×665 main image, then a **783×900 image stretched from a 300×350 source** (soft), then a full-bleed 1425×900 lifestyle image.
  - Buttons: Add to Cart (copper fill, white text, 40px), Buy It Now, and an outlined **Book An Appointment**.
  - Specifications as bullets (18K white gold; diamond total carat weight .80; ruby total carat weight .93).
  - Three information blocks: Shipping (insured, FedEx), Returns & Exchanges, and **Customisation, which says many pieces can be adapted, with an "Enquire Now" link**.
  - Then "You may also like". The H1 is empty.

### Trust and conversion

- Book Appointment appears on the home page and the product page. Customisation enquiries. Complimentary shipping and exchanges.
- **Each store has its own page:** a storefront photo (766×510), the **floor level, the parking area (P3, Cinema Parking)**, the phone number (plain text, not a `tel:` link) and hours grouped by days. There is no map link and no WhatsApp.
- The heritage line is "since 1968".

### Heritage storytelling

"The House" opens with a short intro, then four alternating image and text rows (579px images). Each row has an uppercase eyebrow, a one-word title (The History, The Art, The Experts…), a paragraph and "Learn More". The History section frames Middle Eastern jewellery as wealth, security and beauty for women, which is culturally specific and respectful.

### Arabic and bilingual

None.

### Mobile (390×844)

The same video fills the screen, with a transparent header (hamburger, logo, cart). Category tiles stack one per row, so that section is 1,730px tall. There is no horizontal overflow. The quiet look survives on mobile.

### Performance feel

The lightest of the four: Shopify core, the YouTube iframe API and Fontio. The 4.0 MB hero has no poster, so the first screen is blank until the first frame decodes.

### Strengths

- A silent, full-screen video hero with nothing over it.
- The brand-led navigation of four items.
- The heritage line placed straight after the hero.
- Appointments and customisation treated as primary actions.
- Store pages with floor level and parking.
- One accent colour and a tracked serif, applied consistently.

### Weaknesses

- Products are named by SKU, and the images are tiny or stretched (300px sources shown at 783px).
- The catalogue is very thin (six rings), with empty H1s on the product page and several H1s on the home page.
- Phone numbers are not tappable. There is no WhatsApp and no map link.
- A typo appears in a store heading ("Dubia Marina Mall"), and the opening hours look wrong.
- There is no Arabic.
- The hero video has no poster.

### Steal-worthy patterns (ranked)

1. **A silent, full-bleed video hero with no text on it.**
   - _Why it works:_ real gold moving on skin says "jeweller" in under a second. Leaving out the headline signals confidence.
   - _How Classic should adapt it:_
     - Content: a 10 to 15 second loop of a hand fastening a 22K Kolkata bangle, a Temple necklace turning on the plum velvet bust, and a glint across an Antique haram.
     - File: 720p, under 2.5 MB, with an AVIF poster taken from the first frame.
     - Reduced motion: under `prefers-reduced-motion` and Save-Data, show the poster only.
     - The navigation sits transparently over the video. **The gold-rate pill and a single promise line sit at the bottom edge of the hero, not over the jewellery.**
2. **A navigation of four or five items about the business.**
   - _Why it works:_ a house shows itself through a few doors, not a catalogue tree.
   - _How Classic should adapt it:_ Pieces · Today's gold rate · Branches · Our story (Classic Group) · WhatsApp (as a button). Styles, occasions and karats live inside Pieces.
3. **A heritage line straight under the hero.**
   - _How Classic should adapt it:_ one tracked serif line naming Classic Group and its 35+ years in Dubai's gold trade, linking to the story page. The fact comes from `site.ts`.
4. **Appointment and customisation as first-class CTAs.**
   - _How Classic should adapt it:_ on every piece page, put "Ask on WhatsApp" (primary), "View it at a branch" (secondary) and a "Remake your old gold" block that links to the old-gold exchange explainer.
5. **A page for each branch giving the level, parking and hours.**
   - _Why it works:_ it solves the real problem a customer has before visiting a mall.
   - _How Classic should adapt it:_ four branch pages (Gold Souq Extension, Safari Mall, Rolla Mall, Madinat Zayed).
     - Each has a storefront photo, the level or unit, nearest parking or entrance, hours, `tel:`, WhatsApp and a Maps link.
     - Every unconfirmed field is marked `TODO(owner)`, following the rule against invented hours.
6. **Heritage told as eyebrow plus one-word title.**
   - _How Classic should adapt it:_ the story page in four beats, for example Bullion (Classic Group's trading roots), Karat (what 22K/21K/18K mean), Craft (the regional styles), Branches. Each beat gets one velvet image and a short paragraph in the jeweller's voice.

---

## Side-by-side

|                      | Damas                                        | L'azurde                             | Pure Gold                           | Mahallati                                |
| -------------------- | -------------------------------------------- | ------------------------------------ | ----------------------------------- | ---------------------------------------- |
| Stack                | Next.js / Akinon                             | Next.js                              | Magento 2, Claue theme              | Shopify                                  |
| Hero                 | 4-slide carousel, 3s autoplay, text in image | 1 static image, text in image        | split: text + 18.9s video (45.9 MB) | full-bleed 16.8s video (4.0 MB), no text |
| Desktop header       | 145px sticky                                 | 256px sticky                         | 180px                               | 33px bar + 119px transparent             |
| Display type         | Semplicita Pro (sans)                        | Roboto / Cairo                       | Montserrat                          | Timeless (serif) + Raleway               |
| Accent               | sage `#A1B090`, red `#C30606`                | black `#000`, cream `#F1E9DB`        | beige `#DAC2B0`, gold `#D7A216`     | copper `#C2957E`                         |
| Arabic               | yes, half-done (no font, `lang="ae"`)        | yes, Arabic-first, Cairo             | no                                  | no                                       |
| WhatsApp             | floating button                              | none                                 | none                                | none                                     |
| Store finder         | list, 60 stores, no map                      | none                                 | emirate tabs, photo + map per store | 3 store pages with level and parking     |
| Gold rate            | none (prices look rate-linked)               | none                                 | none                                | none                                     |
| Appointment          | no                                           | no                                   | bespoke brief form                  | yes, home and product page               |
| Product photo source | 500px                                        | 386px (list), 1440px (product page)  | 600–800px                           | 280–300px (stretched)                    |
| Motion               | carousels, product-page video                | slide-up reveals (0.5s + 0.2s delay) | video, slow hover zoom              | video only                               |

## Ranked plan for Classic across all four

1. **A silent motion hero** (from Mahallati) plus **product video squares** (from Damas), shot on Classic's own velvet busts. This is the single biggest change from "blog" to "brand".
2. **The gold rate as the brand device.** Nobody in this set shows one. Put it in a slim pill at the bottom edge of the hero, by karat in the nav chips, and as a per-gram line on piece pages.
3. **Weight and karat specifications on piece pages** (from L'azurde), with "Ask for today's price" on WhatsApp rather than a fixed price.
4. **Branch pages with storefront photo, landmark, parking, hours, `tel:`, WhatsApp and a map link** (from Pure Gold and Mahallati).
5. **A short navigation about the business** (from Mahallati): Pieces, Gold rate, Branches, Story, WhatsApp.
6. **Dark product tiles at 280 to 300px** (from Pure Gold): the velvet photos on a plum surround, never stretched.
7. **A "make or remake" brief form** (from Pure Gold) and a **customisation block on every piece page** (from Mahallati), routed to WhatsApp or `contact.php`.
8. **Arabic done properly** (from L'azurde): real Arabic type, `lang="ar-AE"`, RTL mirroring, a quiet language toggle.
9. **A stories-style row of style circles on the mobile home** (from Damas), one for each of Classic's eight regional styles.
10. **Bullion as designed objects** (from L'azurde): coins and bars by weight, tied to today's 24K rate, matching Classic Group's trading heritage.

## Patterns to avoid (seen here)

- Voucher or newsletter modals on arrival (Damas); three promo or utility bars stacked above the logo (L'azurde: 269px on mobile).
- Headlines baked into images with `alt=""`, on a 3-second autoplay (Damas).
- "% OFF" badges on every card, sale items in red in the nav (Damas, Pure Gold).
- Names and prices hidden until hover (Pure Gold), and products named by SKU (Mahallati).
- Hero video with no poster, or at 45.9 MB (Pure Gold); 2 to 3 MB PNG banners (Damas).
- Sections that start invisible and rely on JavaScript to appear (L'azurde).
- Placeholder or repeated heritage copy (Damas), and an About page that only lists group companies (Pure Gold).
- Cross-promoting unrelated group businesses in the header (Pure Gold's property strip). Classic should mention Classic Group as heritage, not as a sales link.

## Sources

- [Damas UAE home](https://www.damasjewellery.com/ae-en/) · [Arabic home](https://www.damasjewellery.com/ae-ar/) · [Gold Jewellery](https://www.damasjewellery.com/ae-en/gold-jewellery/) · [Floret Bracelet 21K](https://www.damasjewellery.com/ae-en/anmol-teen-21k-floret-bracelet-in-21k-yellow-gold-an1fl1-br004000-yl0r/) · [Find a Store](https://www.damasjewellery.com/ae-en/address/stores/) · [World of Damas](https://www.damasjewellery.com/ae-en/world-of-damas/) · [Nuqoosh campaign](https://www.damasjewellery.com/ae-en/nuqoosh-awareness-page/) · [Nuqoosh collection](https://www.damasjewellery.com/ae-en/damas-collections/nuqoosh/)
- [L'azurde UAE Arabic](https://www.lazurde.com/ar-ae) · [English](https://www.lazurde.com/en-ae) · [Gold Jewelry](https://www.lazurde.com/en-ae/gold-jewelry) · [Links Chain Necklace 21K](https://www.lazurde.com/en-ae/p/links-chain-necklace-in-21k-gold-sku-91104334) · [Contact Us](https://www.lazurde.com/en-ae/contact-us)
- [Pure Gold home](https://pugold.com/) · [Rings](https://pugold.com/rings.html) · [Bloom Clover Necklace](https://pugold.com/18k-gold-bloom-clover-necklace-with-diamonds.html) · [Dubai Stores](https://pugold.com/dubai-stores/) · [About / Pure Gold Group](https://pugold.com/puregold-group/) · [Create Yours](https://pugold.com/create-jewellery/)
- [Mahallati home](https://www.mahallatijewellery.com/) · [The House](https://www.mahallatijewellery.com/pages/the-house) · [Dubai Mall store](https://www.mahallatijewellery.com/pages/dubai-mall) · [Rings](https://www.mahallatijewellery.com/collections/rings) · [M181096](https://www.mahallatijewellery.com/collections/rings/products/product-26)
- Domain lookups: [Emirates NBD Pure Gold offer (pugold.com contact)](https://www.emiratesnbd.com/en/deals/0-epp/pure-gold-jewellers), [Element8: Mahallati Jewellery](https://www.element8.ae/work/mahallati-jewellery/), [Yango Maps listing](https://maps.yango.com/org/200818143411/)
