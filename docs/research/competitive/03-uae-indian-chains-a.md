# 03 · UAE Indian-heritage chains (A): Malabar, Joyalukkas, Kalyan

Research date: 13 October 2026. Read-only browsing. No forms submitted, no sign-in, no cart.

**How this was captured.** The shared browser pane could not render a 1440 px emulated viewport reliably, so the desktop screenshots were taken at the pane's native 1024 × 768 (and once at 1024 × 768 emulated). Mobile was emulated at 390 × 844. Colours, fonts, sizes, carousel timings, image dimensions and script inventories come from computed styles and the DOM via JavaScript, not from eyeballing. Some gold rates and store lists sit behind forms. Those forms were not submitted, so anything hidden behind them is described from the DOM only.

---

## TL;DR for the redesign

1. **None of the three looks premium.** All three are promotion-led retail sites: offer banners with the copy baked into the images, pop-ups within 2 to 3 seconds, chat and WhatsApp bubbles, tickers, and carousels that auto-advance every 2.5 to 5 s. Calm, confident and specific would already set Classic apart from these three.
2. **Joyalukkas UAE is Classic's closest analogue, because it is enquiry-led too.** The UAE site has no product pages and no prices. Collections end in "visit a store / contact us". Its gold-rate page and store pages are the best of the set, and its lookbook photographs gold on **deep maroon velvet with diyas and petals**, which is very close to Classic's plum/navy velvet bust shots.
3. **Nobody makes the gold rate an experience.** The rate shows up as a hover drop-down (Malabar), a red gradient panel (Joyalukkas), or behind three drop-downs and a Submit button (Kalyan). None shows 21K by default. None shows a trend. None ties the rate to "come in today and here is the branch". Classic has a daily feed and a snapshot pipeline, so this is the clearest gap to take.
4. **Store locators are weak in exactly the places Classic trades.** Kalyan has stores at Gold Centre Deira, Rolla Square Sharjah, Safari Mall Muweilah and Madinat Zayed Extension Abu Dhabi. Joyalukkas has Gold Souq Deira and Rolla Sharjah. Their branch information is either text-only (Kalyan), hidden behind State + City + Search (Malabar), or good but generic (Joyalukkas). Four well-made branch pages would beat all three locally.
5. **Bridal storytelling is organised by Indian regional identity** (Kerala bride, Tamil bride, Maharashtrian bride and so on) on all three. Nobody speaks to **Gulf and Arab brides**, even though Classic stocks Kuwaiti, Turkish and Italian work alongside Kolkata, Rajkot, Temple and Antique. That is a positioning gap Classic can own.

---

## Reference: rates seen on 13 Oct 2026 (useful for checking Classic's feed)

| Source                                        | 24K / g      | 22K / g      | 21K / g                         | 18K / g      | Timestamp shown            |
| --------------------------------------------- | ------------ | ------------ | ------------------------------- | ------------ | -------------------------- |
| Joyalukkas `/ae/goldrate`                     | AED 502.50   | AED 465.25   | not shown                       | AED 382.50   | date only ("Oct 13, 2026") |
| Malabar retail-store table (`/ae/stores/uae`) | AED 502.50   | AED 465.25   | not shown                       | not shown    | "13/10/2026 10:04 PM"      |
| Malabar online, nav drop-down                 | AED 505.7627 | AED 468.2553 | not shown                       | AED 384.7628 | "13/10/2026 09:29 AM"      |
| Kalyan `/gold-rate/Gold-Rate-Today`           | behind form  | behind form  | slot exists (`rate_21k_strong`) | behind form  | not visible                |

Joyalukkas and Malabar's retail table agree to the fils, so both are the DGJG retail rate. Malabar's online rate is a separate, higher number to four decimal places, which puts two different "today's rates" on one site.

---

## 1. Malabar Gold & Diamonds UAE: https://www.malabargoldanddiamonds.com/ae/

### Pages visited

- Home `/ae/` (desktop 1024 and 1440 measurements, mobile 390)
- Gold Jewellery mega menu (hover), and the "Gold Rate" nav drop-down (hover)
- Gold-rate page `/ae/goldprice`
- Gold listing `/ae/gold-jewellery.html` ("Gold Jewellery (6509)")
- PDP `/ae/gold-jewellery/malabar-gold-bangle-set-bsbncos44553.html`
- Store locator `/ae/stores`, then `/ae/stores/uae`
- Bridal microsite page `/ae/brides-of-india/2023-edition/show-the-way/dazzling-bride.html`

### First impression (5 seconds)

A 124 px **magenta (#9A0056) header slab**: logo with tagline, a wide white search field, five icon links (Stores, Country, Profile, Wishlist, Cart), and **two Indian +91 phone numbers** top right. Under it sits a white category bar and a full-width campaign slider of celebrity-fronted collection launches. Then come 2 × 2 category tiles, each a maroon photo with gold jewellery and the copy printed into the JPG. It reads as a large Indian e-commerce catalogue that has been localised to AED and nothing else. Busy, saturated and promotional.

### Hero

- Owl Carousel, **7 slides**, desktop art **1500 × 480 (3.125:1)**, shown about 1009 × 323 at 1024 px. Autoplay **5000 ms**, slide speed **500 ms**. Pill-shaped dot indicators sit below the image, not on it.
- Each slide is a finished poster: collection name, tagline and a "SHOP NOW" button are all part of the image. No live HTML text, so nothing is translatable, accessible or crisp.
- Mobile gets its own art at **720 × 623**, shown 390 × 337. The art direction per breakpoint is done properly.

### Navigation and mega menu

- Three tiers: phone strip; logo + search + icons on magenta; white bar with 7 uppercase items (Diamond Jewellery, Gold Jewellery, Gems Jewellery, Uncut Diamond, Gold Bar, Gifts, Gold Rate) plus a solid magenta **"VERIFY CERTIFICATE"** button at the right end.
- Mega menu (Rootways MegaMenu Pro): a **grey left rail of product types** (Rings, Earrings, Pendants, Chains, Bangles, Bracelets, Necklaces, Mangalsutras, Accessories, Mens, Collection). The selected type opens three columns on the right: _Shop by Style_, _Wearing Type_ (Daily, Office, Casual, Party wear), _Shop by Metal_. Every item has a **~24 px circular thumbnail**. Functional and dense, with no editorial content.
- **Gold Rate drop-down:** hovering "GOLD RATE" opens a cream card ("Today's Gold Rate") listing 24KT (999), 22KT (916) and 18KT (750) per gram to **four decimal places**, with "Updated on 13/10/2026 09:29 AM".
- The header switches to a fixed compact bar on scroll (`rootmenu fixed-header`).

### Visual language

- **Palette:** magenta `#9A0056` (header, prices, active tab, buttons); deeper berries `#851753`, `#7D0849`; cream `#F4F1E6` / `#F5F1E6` (footer, rate card); khaki borders `#D3CBB6` and `#A8976D`; a single muted gold `#CFB873`; text `#000000`, greys `#6B6B6B` and `#424242`.
- **Type:** Muli everywhere, with a **12 px body** (small). Section titles are **Playfair Display 27.6 px / 400**, black, centred, with a 14.4 px Muli subtitle. Promise titles are Muli 20 px bold. The bridal microsite adds **Great Vibes script at 50 px in `#7D0849`** and Gotham.
- **Imagery:** celebrity campaign photography; category tiles at **678 × 350** showing gold on dark maroon with gold type in the image; listing packshots on light grey.
- **Shape:** 10 px radius on category tiles and promise cards, 8 px on product cards, 1 px hairline borders (`#E8E8E8` or `#D3CBB6`), **no shadows**. Bootstrap 3 grid.

### Home composition (5,204 px tall at 1024; 8 `<section>`s)

Header, then hero slider, then **Gold Jewellery** (2 × 2 tiles), then **Diamond Jewellery** (one tall portrait on the left and four tiles on the right), then **The Bridal Edit** (full-width banner with a round "Bridal Edit" badge and a strip of 5 bride-persona thumbnails), then **Malabar Promises** (Swiper carousel of 11 promise cards), then **Shop by Gender** (Women/Men/Kids tabs over 4 tiles), then **Gifting & More** (Birthday, Anniversary, Baby Birth, Festive, Customised, Party Wear), then **About Our Store** (a large render of a shopfront with "450+ showrooms across 14 countries" in the image), then an About paragraph with corporate statistics (turnover, global rank, showroom count), then a cream footer.

### Motion and interaction

- Hero autoplays every 5 s. The **promise carousel autoplays every 2.5 s** with 300 ms slides and `disableOnInteraction: false`, so it keeps moving while you read.
- The mega menu slides up from below (`bottomanimation`). No scroll-triggered animation, no video on home, no parallax.
- Category-tile CTAs ("Explore") are part of the image, so the only hover affordance is the cursor. Full page reloads between pages (Magento 1) with a "please wait" overlay.

### How products are presented

- **Listing** (`/ae/gold-jewellery.html`): pink banner with a jhumka image and "Gold Jewellery (6509)". Breadcrumb. A bar of drop-down filters (Brands, Product Type, Stock Status, Price, Product Size, More Filters, Sort By). Three columns at 1024 px.
- **Card:** 242 × 375, 1 px `#D3CBB6` border, 8 px radius. 433 px square image on light grey with a second image for hover swap. "NEW ARRIVAL" tag. Wishlist heart. **Price in `#9A0056`, Muli 14 px bold** ("AED 33,342"), then the **SKU. There is no product name on the card.**
- **In-grid promo tile:** in the second row, a two-column-wide "Malabar Promise" tile with a horizontal icon row (lifetime maintenance, insured, 14-day return, transparency, exchange). This trust message is placed inside the browsing flow, not in the footer.
- Pagination reads "Items 1 to 12 of 6509" with 12/24/36 per page.
- **PDP:** left gallery with 4 thumbnails and a "Hover to zoom" pill. Right column: title, product code, availability, "VAT @5% applicable", **AED 18,344 as a single number with no split between metal value and making charge**, the two bangles of the set listed with their own SKUs, dispatch date, magenta "Buy Now", and the +91 numbers again under "Any questions?". Below, for each piece, a **specification table**: product type, purity 22 KT (916), colour, **gross weight 16.700 g, net weight 16.700 g**, certification 916, stone weight 0. Then "You May Like This" and a row of 9 promise icons.

### Trust and conversion devices

- **Promises:** 11 named promises reused everywhere. On home they are a carousel; on the listing an in-grid tile; on the PDP an icon row; on the store page a tabbed panel (Promise / Exchange Policy / Cash Back / General). They include **"100% value on gold exchange", "zero-deduction gold exchange"**, guaranteed buyback, lifetime maintenance and 916 hallmark. There is an inconsistency: the listing says 14-day return and home says 15 days.
- **Verify Certificate** is a permanent nav button, a strong trust signal for diamonds.
- **WhatsApp:** 40 px green float bottom right, linking to `api.whatsapp.com/send?phone=9167780916` (an Indian mobile with no country code) with a generic pre-fill. **No UAE phone number anywhere on the UAE site.**
- **Store locator** (`/ae/stores/uae`): first a flag list of 14 countries. On the UAE page, **no store is listed until you pick State and City and press search**. No map. Then a promo slider, a "Gold rate for our retail stores" table (13 countries, 22K/24K, each with its own timestamp), a lead-capture form (name, country, +971 mobile, email, consent), and the tabbed commitments panel.
- **Gold-rate page** (`/ae/goldprice`): a product hero with a cream overlay card ("Bring Home … Prosperity and Purity") holding a **country selector that defaults to India and a state selector that defaults to Kerala**, plus Submit. On the UAE site the rate is behind a form that defaults to another country.
- **Bridal:** the "Brides of India" microsite. Personas include Dazzling, Maharashtrian, Enchanting, Trendsetter and Show-Stopper. Page design: portrait inside a **scalloped Mughal arch frame** over damask wallpaper texture, a script headline, a gold filigree divider, an intro paragraph, then a **"Look Book" YouTube embed on a saffron patterned band**, then the promise grid. Its own nav (2023 Edition, Celebration Bride, Royal Bride, Fashion Bride). It is labelled **2023 edition**, so it is three years stale.
- No appointment booking, no reviews and no ratings anywhere.

### Mobile (390 × 844)

- Header collapses to a **57 px fixed bar** on scroll: M monogram, search pill, wishlist, cart, hamburger.
- Hero 390 × 337 with separate art. Category tiles stack full width (each about 390 × 200 with text baked in). WhatsApp float 40 px. No horizontal overflow. 5,809 px tall. Body text stays at 12 px, which is too small on a phone.

### Performance feel

Magento 1 (`skin/frontend`, `scriptaculous`, and Prototype.js overriding `Array.prototype`). **jQuery 1.7.2** plus Owl Carousel, two copies of Slick, Swiper, Bootstrap 3, bootstrap-select, intlTelInput and lazysizes. GTM loads five times, plus the Facebook SDK and pixel and three DoubleClick tags. **316 images** on home, all JPG/PNG (no WebP or AVIF). About 250 requests by DOMContentLoaded (around 0.93 s). It feels medium-heavy, but lazy loading keeps first paint acceptable.

### Strengths

1. **One trust vocabulary everywhere.** The 11 promises appear at every decision point (home, inside the listing grid, PDP, store page).
2. **Rate always one hover away**, in the main nav, timestamped.
3. **PDP spec table** with purity and gross/net weight per piece. Transparent, and it reads like a bullion dealer's ticket.
4. **"Verify Certificate" in the nav.** It turns certification into an action, not just a claim.
5. **Bridal personas** (segmenting brides by identity and taste rather than by product type), plus an arched portrait frame that feels ceremonial.
6. **Proper mobile art direction** for the hero (a separate 720 × 623 crop).

### Weaknesses

1. **The UAE site is not localised:** +91 numbers, an Indian WhatsApp without a country code, and a rate page that defaults to India/Kerala.
2. **Two different UAE gold rates** on one site (online at four decimals, retail at two). The four-decimal precision looks like a spreadsheet, not a jeweller.
3. **The store locator hides every store** behind State + City + Search. No map, no photos, no list.
4. **Copy is baked into images** across the hero and category tiles. Inaccessible, untranslatable and soft on retina screens.
5. **Product cards show price and SKU but no name.** A 6,509-item listing is a catalogue dump, not curation.
6. **Restless motion** (2.5 s carousel with no pause on interaction) and a **stale 2023 bridal microsite**.

---

## 2. Joyalukkas UAE: https://www.joyalukkas.com/ae/

### Pages visited

- Home `/ae/` (desktop 1024, mobile 390). Left drawer menu, including Collections; right kebab menu.
- Gold brand page `/ae/apurva-brand/`. This is the nearest thing to a gold category on the UAE site, which has no product listing.
- `/ae/jewellery/`, linked from the home "Apurva Bride" tile, returns a **404**.
- Gold rate `/ae/goldrate`
- Store locator `stores.joyalukkas.com/ae` and the city page `stores.joyalukkas.com/ae/city/dubai`
- **No PDP exists on the UAE site.** Pieces are shown, not sold. "View Store Details" opens a new tab (blocked in this session).

### First impression (5 seconds)

A thin **crimson ticker** (eGift cards) flips vertically every ~3 s. Below it, a white 45 px header with the logo and "World's favourite jeweller", "Contact Us" and "Store" links with small crimson icons, a hamburger at left and a kebab at right. **No category bar.** The hero is a festive price-promise poster (pay 10% advance, lowest-rate guarantee, app QR code). About two seconds later an **app-download modal** appears with a QR code and an "AED 250 diamond voucher". It is warmer and softer than Malabar (peach and blush backgrounds) but still reads as a flyer.

### Hero

- react-slick, **5 slides**, mixing image slides and **muted, looping autoplay MP4s** (desktop `2560 × 930`, mobile `800 × 800`). Shown 1009 × 367 at 1024 px (about 2.75:1). It did not auto-advance in a 12 s observation. Side arrows plus dash indicators.
- Copy, offer mechanics and QR codes are part of the art. The visual is a model in a red silk sari with a temple necklace next to oversized 3D gold "10%" lettering.

### Navigation

- At 1024 px there is **no visible category navigation**. Everything is in a **left drawer**: Account, Collections ›, Promotions, Gifting ›, and two chip buttons, **Gold Rate** and **Store Locator**.
- _Collections_ opens chips grouped by material, all **sub-brand names**. Gold: Apurva, Veda, Yuva, Zenina, Joy18, Li'l Joy, Sita Kalyanam, Krishna Leela. Diamond: Eleganza, Pride, Bella, Evora, Blossom, Padmalakshmi. Precious stone: Ratna. Platinum: Perfekt Platino. Pearl: Masaaki. A new visitor cannot browse by "necklace" or "22K".
- The kebab holds About Us, Promotions and Gold Rate. Gold Rate is reachable in two taps from anywhere, but it is never on screen.

### Visual language

- **Palette:** crimson `#C92A42` / `#C72D45` (buttons, icons, ornaments, ticker); navy ink `#041E42` on some titles; text `#111827`; peach and blush tints `#FFF9F5`, `#FFF1E8`, `#F9DBC6`, `#FCBA8C` (panels, footer); a gold gradient `#FFE7A2 → #DCAF27` on the rate "updated" pill; a deep-red gradient `#5F0000 → #8B0000 → #760000 → #C01900` with a soft radial highlight on the rate panel.
- **Type:** **Lora** (serif) for section titles, **uppercase, 26 px, weight 400**, centred. **Muli 16 px** body. Each section title sits under a small **crimson diamond glyph flanked by two thin crimson rules**, a repeated ornament that gives the page rhythm.
- **Shape:** 10 px radius on brand cards (600 px sources shown at 288 px), **16 px on lookbook images**, a 24 px bottom radius on the rate panel, 3 px on buttons. Buttons are outlined (1 px crimson border, crimson text, white fill, padding 8/24/10) with **256 ms material-ease** colour transitions. Card images transition at 0.3 s ease-in. No heavy shadows.

### Home composition (8,987 px at 1024)

Ticker and header, then hero, then **Our Exclusive Brands** (3 portrait cards with the brand logo set into the photo, carousel, "View All Brands"), then **Gifting & More**, then **Customise jewellery at our store** (a blush-to-peach panel with a **world map dotted with crimson pins**, a script line about every location telling a story, "13 countries, 200+ showrooms", and a Locate Store button), then **Bridal Collections** as a **5-tile bento with a tall centre tile** (North Indian, Tamil, Sita Kalyanam, Karnataka, Kerala; each has a "Discover more…" link), then a **full-width video band (2560 × 720 MP4)**, then **Quality-First Service** (4 line-icon promises: easy exchange, certified, lifetime service, 15-day return), then **Follow us on Instagram** (tiles including muted autoplay videos), then **Need help choosing?** (two images on the left; solid crimson "Locate Stores" and outlined "Contact Us" on the right), then **Take a Tour** (Jewellery Care, Find a Store, News & Events cards), then a brand-logo strip, newsletter, peach footer, and finally **a long SEO essay holding the page's only H1, placed at the very bottom**, with FAQs and city store links.

### Motion and interaction

- Ticker flips every ~3 s. The brand-logo strip steps every ~4 s. Five muted autoplay videos on home (hero, band, social tiles).
- App modal at about 2 s on desktop, and a persistent app banner on mobile. Drawer slides in from the left.
- Images fade in from **shimmer placeholders** (`banner-shimmer`). The tab title reads just "UAE" until the SPA hydrates.

### How products are presented

- **Brand page as lookbook** (`/ae/apurva-brand/`):
  - Split hero: round brand-logo medallion and an intro paragraph on the left, model portrait on the right.
  - A centred intro in Lora uppercase, a full-bleed portrait band, then **a 2-column grid of square still lifes (1667 px sources, shown 438 px, 16 px radius)**: temple and antique gold necklace sets, jhumkas and bangles arranged on **deep maroon/plum velvet with brass diyas, marigolds and rose petals**, lit warm.
  - **No piece names, no links, no prices and empty `alt` text.**
  - Then a split "perfect wedding jewellery" block, a row of **circular brand medallions** (other collections), and a closing **"Interested in our collection?" panel with Store Locator and Contact Us buttons** and a flat illustration of a shopfront.
- This is the most relevant visual reference for Classic. It proves that gold on dark velvet with a few ritual props looks rich at a large size. It is also what not to copy: you cannot enquire about a specific piece.

### Gold-rate page (`/ae/goldrate`), the best of the three

- **Hero panel:** a deep-red gradient with a 24 px rounded bottom. Left: H1 "Gold Price Today in UAE" (Lora 28 px, white), one line of explanation, a **gold-gradient pill "UPDATED ON Oct 13, 2026"** (date only, no time), and a two-column table (Purity / Rate) for 24KT, 22KT and 18KT in AED to 2 decimals. **No 21K.** Right: app-promo art (phone, QR code, rising gold bars) inviting you to track the rate in the app.
- **Directly below, store cards:** "Visit our gold & diamond jewellery stores in UAE" with 5 cards. Each has a **real storefront photo**, name, address, hours (in crimson), phone, email, and an outlined "Get Direction" button. The rate page doubles as a reason to visit.
- **FAQ** explaining that rates are standardised across the emirates by the Dubai Gold & Jewellery Group, ending with a short tagline about the same price in every city. Then SEO copy listing all seven emirates.

### Store locator (`stores.joyalukkas.com/ae`)

- A separate store-pages platform. Hero illustration of world landmarks with a ring and a pendant (headline about finding your city's "crown jewel"). Country + City selects. **Google Map with custom crimson logo pins.** A "Joyalukkas Assurance" strip (100% value on diamond exchange, lifetime maintenance, guaranteed buyback, tested diamonds) and an FAQ (exchange, cleaning, what the showroom team does).
- **City pages** (`/ae/city/dubai`): an illustrated orange map hero with 3D pins, "**18 Joyalukkas stores in Dubai**", then a **4-column grid of store cards**. Each card has a storefront photo, store name, address, hours in crimson, phone, email, "View Store Details" (an individual store page) and an outlined "Get Direction" button. The city pages are linked from the home footer as "Best Jewellery in Dubai / Sharjah / Abu Dhabi…", a deliberate local-SEO play.

### Trust and conversion devices

- WhatsApp float 44 px (`wa.me/97143354454`, a UAE number, pre-fill "Hello"). **Zoho SalesIQ** chat bubble in crimson. Back-to-top button.
- Help desk +971 4 252 2900 with published hours (Mon–Sat 9:00–18:00). A "Store" link in the header on every page.
- Price-protection offers (book with a 10% advance to lock the rate). The gold rate is used as a **sales mechanic**, not just information.
- Promises: easy exchange, certified, lifetime service, 15-day return, buyback. No appointment booking, no reviews.

### Mobile (390 × 844)

- **Sticky stack 165 px tall**: an app banner ("now in your pocket … GET"), the ticker, and a 64 px header with a UAE-flag country picker. **Bottom MUI nav bar 60 px** (Home / Other Services), plus WhatsApp and chat floats. **Fixed chrome takes about 225 px of the 844 px screen.**
- Square 800 × 800 video hero. Page is 10,251 px tall. **10 px horizontal overflow** (scrollWidth 400 at 390).

### Performance feel

Magento PWA Studio (Venia) React SPA (`RootCmp_CMS_PAGE`, `client`/`vendors` bundles), react-slick and MUI. Trackers: GTM, **Clarity ×2, Zoho PageSense ×2, MoEngage ×2**, Facebook pixel and Google sign-in. Five autoplay videos on home. Heavy, but fast after hydration. There is visible layout shift as the shimmer resolves and modals appear.

### Strengths

1. **Coherent enquiry-led model:** every collection page ends with "visit a store / contact us". This is the same model as Classic.
2. **The gold-rate page treats the rate as a designed object**, and it places store cards with photos, hours and directions right under the numbers.
3. **Store cards with real shopfront photography**, plus city landing pages for local search.
4. **Lookbook still lifes on maroon velvet** with ritual props. Cohesive, warm and aspirational at a large size.
5. **Bridal as a bento of regional brides**, with one tall hero tile.
6. **A repeated section ornament** (diamond glyph between rules) and a consistent outlined-button system.

### Weaknesses

1. **No category navigation on desktop at 1024**, and collections are sub-brand names ("Zenina", "Joy18") that mean nothing to a newcomer.
2. **Interruption overload:** app modal at about 2 s, an app banner on mobile, ticker, chat and WhatsApp bubbles, a bottom bar, and 225 px of fixed chrome on a phone.
3. **Lookbook pieces have no names, links or alt text**, so you cannot ask about the one you like.
4. **Broken and careless details:** a 404 linked from the home bridal tile; typos in visible copy ("UAW", "Peals", "expierence a consitent"); the H1 sits at the bottom of the home page.
5. **The rate shows a date but no time, and no 21K**, which is a GCC-relevant karat.

---

## 3. Kalyan Jewellers UAE: https://www.kalyanjewellers.net/ae/

### Finding the UAE site

The footer country selector lists `/india`, **`/ae`**, `/qar`, `/oman` and `/kw`. `/ae/` is effectively **one landing page**. Every other `/ae/*.php` URL tested (`/ae/store-locator.php`, `/ae/gold-rate.php`, `/ae/kalyan-promise.php`, `/ae/top-wedding-jewellery-muhurat.php`, `/ae/Jewellery/gold-jewellery.php`) returns the same 204 KB home page. All nav links leave `/ae/` for the global site. Shopping goes to **Candere** (Kalyan's Indian e-commerce brand, priced in INR).

### Pages visited

- `/ae/` home (desktop and mobile)
- Gold rate `/gold-rate/Gold-Rate-Today` (global)
- Store locator `/store-locator.php` (global), UAE accordion
- Gold hub `/Jewellery/Gold/` and gold necklace listing `/Jewellery/Gold/necklace.php`
- One product page, which is on Candere (`candere.com/adweta-trio-gold-pendant-necklace.html`)
- Bridal hub `/top-wedding-jewellery-muhurat.php` and a regional page `/muhurat/kerala.php`

### First impression (5 seconds)

A white header with a **centred logo** (yellow folded-K mark over red "KALYAN") splitting the nav into two halves. Small grey utility links sit above the nav on both sides, with four red social circles. A black promo bar on top invites you to sign up and play. **The 461 px hero is blank white**: all 8 hero background images under `/ae/images/banners/` return an HTML page instead of an image. Within 2 to 3 s a **"Sign-up, Play & Win" spin-the-wheel modal** for Candere (prizes in ₹) covers the page under a 90% black backdrop, and **it comes back on scroll after you close it**. It reads as an abandoned corporate microsite.

### Hero

lightSlider with CSS background images. The intended slides, by filename, were: a CSR campaign, a collection launch, a **fraud alert**, Candere promotions, and an **Indian quick-commerce partnership**. None of it is UAE-relevant. On 13 Oct 2026 every slide was broken, so the UAE home opens on white space.

### Navigation

- Split nav around the centred logo: Our Brands, Muhurat, Shop Online, Jewellery | About Us, Gift Card, Ambassadors, **Investors**. Utility row: My Kalyan, Media, Kalyan News, Gold Rates / Store Locator, Feedback, Contact.
- Mega drop-downs are a short text list on the left with one banner image on the right (for example, Gift Card shows a pink gift-box photo). "Shop Online" leaves for Candere with UTM tags.

### Visual language

- **Palette:** Kalyan red `#E30613` (CTAs, blog titles, rules), yellow `#FBD707` (fraud alert), Bootstrap ink `#212529`, greys `#A8A7AA` and `#F6F6F4`, and **Bootstrap link blue `#007BFF` leaking through on 138 elements** (unstyled defaults).
- **Type:** **Bodoni Moda 32 px bold uppercase** for section titles (MUHURAT, BRANDS FAMILY, ABOUT US); a lighter Bodoni at 35 px in grey for a mood line; Poppins for nav; PT Sans 16 px body. A **stats band of huge Bodoni numerals (100 px, white on image)**: 140 stores, 100 years, 10 brands.
- **Signature device:** a **thin red hairline running across the page with a small arch at its centre, from which a vertical line drops down into the next section title**, like a pendant on a chain. It is the one genuinely elegant idea on the site.
- Radius 0. Product tiles have 1 px `#EEEEEE` borders. White cut-out packshots.

### Home composition (9,908 px)

Promo bar and header, then the blank hero, then **E-Store** (pushing Candere), then **Muhurat** (Bodoni title, paragraph, **YouTube embed of an ad film**), then a grey mood band, then **Brands Family** (logo carousel with **18 broken images** showing as alt-text links), then About Us with the stats band, then **Chairman's and executive directors' messages**, then **Kalyan News** (items from 2023), then Blogs (Indian festivals), then Media, then Our Partners, then a newsletter (subscribe via WhatsApp to a UAE number, +971 58 567 2643), then a footer with an **Indian toll-free number (1800-4257333)**, then a feedback form, then a fraud-alert modal.

### How products are presented

- **Gold hub** (`/Jewellery/Gold/`, 14,760 px): a 2622 × 850 hero of a **dark carved-wood jewellery box with a gold necklace spilling out** (a short "pieces that tell a story" overlay), then a Bodoni "GOLD" title, an SEO paragraph, a "Shop Online" button (to Candere), and a 3-column gallery of 800 px white packshots (shown 266 px), each with "TAKE A LOOK" leading to a sub-page.
- **Necklace listing:** filters (Price, Occasion, Styling, Product Type) over a **4-column grid of 220 px tiles** fetched from Candere (310 px images), each with a name and **"Rs. 27689"**, linking out to candere.com.
- **PDP (Candere):** 2 × 2 image grid, **₹28,122**, a "730+ views in the last 48 hours" urgency line, "Notify me when price drops", 25% off making charges, a 14K/18K metal picker, a WhatsApp chat persona on an Indian number, and a long return policy. **A UAE visitor reaches a rupee checkout that will not ship to them.**

### Gold rate

`/gold-rate/Gold-Rate-Today`: a hero photo of a bridal couple in festive gold, then an H1, then **three selects (Country, State, Store Location) and Submit**. Nothing is visible until the form is used. The DOM holds slots for **18K, 21K, 22K and 24K** (the only one of the three to model 21K) and a "**last five days**" trend table, currently for India. A disclaimer says the billing-time rate prevails. A **COVID-era "showrooms closed" announcement modal is still in the markup.**

### Store locator

`/store-locator.php` **defaults to a list of Indian stores** (Andhra Pradesh). UAE is a collapsed accordion, then emirate sub-accordions, then **plain text cards**: name, address, phone (mostly not `tel:` links), email. No map pins, no hours, no photos, no directions buttons. The UAE list (20 stores) includes **Gold Center Deira, Rolla Square Sharjah, Safari Mall Muweilah and Madinat Zayed Extension Abu Dhabi**, which are next door to all four Classic branches.

### Bridal storytelling (Muhurat)

The hub is a **mosaic of square regional-bride portraits (415 px)** around a central **maroon scalloped badge** ("Celebrating the Indian Bride", Muhurat). Ten regional pages cover Kerala, Tamil Nadu, Karnataka, Andhra/Telangana, Maharashtra, Gujarat, Punjab/Delhi, Rajasthan, UP/MP and Bengal/Odisha. The tiles use a Codrops-style caption hover (`cs-style-4`, image `transform 0.4s`). The regional pages themselves are thin (about 1,340 px, almost no content).

### Trust and conversion devices

A "Kalyan Promise" page (global), "Why buy from us", fraud and scam alerts, WhatsApp subscribe (UAE number). **No WhatsApp chat float on `/ae/`. No appointment booking. No UAE phone number in the footer.**

### Mobile (390 × 844)

**Fixed header 160 px** (promo bar, grey utility row, logo with hamburger and a round "Shop Online" badge). A **broken-image icon** where the hero should be, then blank space, then E-Store with an orange-to-red gradient button. **Fixed bottom "Shop Online" bar 59 px.** About 219 px of chrome on an 844 px screen.

### Performance feel

**jQuery 3.1.1 and 3.6.0 both loaded**, Bootstrap, bLazy, lightSlider, **Google Maps JS and reCAPTCHA on the home page** (for the feedback form), Hotjar, Clarity, GA, GTM, three Facebook pixels, three Google Ads tags and WebEngage. 160 images on home, **18 broken**. Slow-feeling and visibly unmaintained.

### Strengths

1. **The hairline-with-arch-and-drop section motif** plus Bodoni display titles. One ornamental idea, used consistently.
2. **Muhurat as a named bridal platform**, organised by regional identity with a mosaic landing.
3. **The rate data model includes 21K and a five-day history.** The right idea, badly surfaced.
4. **Editorial dark still-life heroes** on category hubs (wood box, warm light).
5. **Big-numeral stats band** that states scale quickly.

### Weaknesses

1. **The UAE site is broken:** blank hero, 18 broken images, and a catch-all that serves the home page for every `/ae/` URL.
2. **India content on the UAE site:** INR prices, Candere checkout, an Indian toll-free number, Indian festivals and quick-commerce banners.
3. **Spin-the-wheel gamified modal** that reappears on scroll, the opposite of premium.
4. **Rates behind a three-step form**, and a stale lockdown notice in the DOM.
5. **Text-only store list** without hours, map, photos or tap-to-call.
6. **Corporate rather than customer framing:** Investors in the main nav, chairman's messages, 2023 press releases on the home page.

---

## 4. Cross-site comparison

| Topic                    | Malabar                                                 | Joyalukkas                                        | Kalyan                                    | Open space for Classic                                                               |
| ------------------------ | ------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------ |
| **Daily rate placement** | Nav hover drop-down, 4 decimals, timestamp              | Two taps (drawer or kebab), then a designed page  | Footer/utility link, then a 3-select form | Rate visible on screen at all times, no hover or tap needed                          |
| **Karats shown**         | 24 / 22 / 18                                            | 24 / 22 / 18                                      | 24 / 22 / 21 / 18 (hidden)                | Show **24 / 22 / 21 / 18** by default                                                |
| **Freshness**            | Time to the minute (online); per-country times (retail) | Date only                                         | Not visible                               | Time to the minute plus source (DGJG)                                                |
| **Trend**                | None                                                    | None                                              | 5-day table (India, hidden)               | 7/30-day sparkline from `rates:snapshot` history                                     |
| **Rate leads to visit**  | No                                                      | Yes (store cards under the rate)                  | No                                        | Rate, then "buy at today's rate at these four branches"                              |
| **Store locator**        | Hidden behind State + City + Search                     | Map, city pages, photo cards                      | Text accordion                            | Four rich branch pages with photo, hours, open-now, mall directions, WhatsApp        |
| **Bridal**               | Personas microsite (2023)                               | Regional bento                                    | Regional mosaic (Muhurat)                 | Indian **and Gulf** bridal traditions, by style                                      |
| **Exchange messaging**   | "Zero-deduction / 100% value" gold exchange, repeated   | "Easy exchange", "100% value on diamond exchange" | Promise page only                         | Bullion-trader credibility: weighed and tested in front of you, paid at today's rate |
| **WhatsApp**             | Indian number, generic pre-fill                         | UAE landline, "Hello"                             | Subscribe only                            | Per-piece and per-branch pre-filled messages to a UAE number                         |
| **Appointments**         | None                                                    | None                                              | None                                      | "Book a viewing" (bridal, custom, exchange) via WhatsApp or a short form             |
| **Interruptions**        | Country modal                                           | App modal at ~2 s, app banner, chat               | Spin-wheel modal, re-opens                | None                                                                                 |

### Premium versus mass-market signals across the three

**What reads mass-market:**

- Copy baked into banners
- "% OFF" and "PAY 10%" typography
- Celebrity grins
- 3D gold lettering
- Spin wheels and app-voucher modals
- Restless carousels at 2.5 to 5 s
- Catalogue counts ("6509")
- SKUs in place of names
- Four-decimal rates
- Several chat bubbles at once
- 12 px body text
- Default Bootstrap blue links

**What reads premium (and appears only in fragments):**

- Joyalukkas's velvet still lifes shown large with breathing room
- Malabar's arched portrait frame and script headline on the bridal pages
- Kalyan's single hairline-arch ornament and Bodoni numerals
- Joyalukkas's photographed shopfronts
- Malabar's per-piece weight and purity table

---

## 5. Steal-worthy patterns, ranked

Classic's constraints, applied to every pattern: enquiry-led (WhatsApp, call, visit); mostly **600 × 600 product photos on dark navy/plum velvet busts**; a **daily gold-rate feed** with snapshot history; **four branches** (Gold Souq Extension Deira, Safari Mall, Rolla Mall, Madinat Zayed). Brand plum `#4B2849` and bronze `#BE8658`. Current tokens: radius 0, no shadows, no gradients.

### 1. The rate as a hero object that leads straight to the branches (Joyalukkas `/ae/goldrate`, improved)

- **Why it works:** in the UAE, the rate is the most-searched, most-repeated reason to visit a gold site. Joyalukkas puts photographed store cards directly under the numbers, which turns "what is gold today?" into "where do I go?". It is the only page in this set with an obvious next step.
- **How Classic should adapt:**
  - A plum (`--surface-plum`) **rate board**: large champagne (`--gold-300`) display numerals for **24K, 22K, 21K and 18K per gram**, with the time to the minute ("Updated 09:29, 13 Oct") and a plain note that the rate follows the Dubai Gold & Jewellery Group.
  - Directly beneath: "Buy or exchange at today's rate", with the **four branch cards**.
  - Use flat plum with gold hairline rules, not Joyalukkas's red gradient.
  - Add what nobody has: a **7- and 30-day sparkline** drawn from the `rates:snapshot` history, and a karat converter ("your 21K bangle at today's rate"), worded as an estimate so it is not a fabricated price.

### 2. Rate visible on every page, without hover (Malabar's nav drop-down, made always-on)

- **Why it works:** Malabar shows that people check the rate from any page. Putting it in the nav makes the brand feel like a live market rather than a brochure, which suits a **bullion-trading group**.
- **How Classic should adapt:**
  - A slim header chip on desktop, "22K AED 465.25 · 09:29" in tabular numerals, linking to `/gold-rate/`.
  - On mobile, a single **sticky bottom bar**: rate chip, WhatsApp, Call. This replaces the three separate floats competitors stack up.
  - Two decimals, never four.

### 3. Branch pages built like Joyalukkas's store cards, made specific to Classic's malls

- **Why it works:** photographed shopfronts, hours, phone and a directions button remove the friction of a first visit. City pages capture "jewellery in Sharjah" searches. Kalyan and Joyalukkas sit **in the same malls and souqs as Classic**, so these pages are fought over branch by branch.
- **How Classic should adapt:**
  - Four `/visit/{branch}/` pages, each with:
    - a shopfront photo (owner to supply; `TODO(owner)` already exists in `site.ts`)
    - mall-specific directions: entrance, floor, nearest parking or metro
    - hours, with an **"open now / opens at" line computed client-side** from `site.ts`
    - tap-to-call, a WhatsApp message pre-filled with the branch name, and a Maps link
    - a short paragraph on **what that branch is known for** (for example, the Deira flagship for bullion and bridal sets). Phrase it generically until the owner confirms.
  - On the home page, the four branches as a horizontal band of portrait cards, not a footer list.

### 4. Velvet still lifes shown as a dark "vitrine" (Joyalukkas brand lookbooks)

- **Why it works:** Joyalukkas's maroon-velvet, diya and petal photographs are the richest images in the set, and they look like Classic's own plum/navy velvet busts. Dark fields make gold glow, and a consistent background ties dozens of pieces into one world.
- **How Classic should adapt:**
  - 600 px sources cannot go full-bleed. Instead, **set whole sections on a background sampled from the velvet** (a plum or navy band token close to the photo backdrop), so each photo bleeds into the page and the piece appears to sit in a lit showcase.
  - Show photos **at or below 300 to 400 CSS px** (crisp at 2×), grouped as **"trays" of 3 to 5 pieces** with generous dark space.
  - Unlike Joyalukkas, **name every piece, give it alt text, and attach a per-piece "Ask about this piece" WhatsApp link** with the piece name and code pre-filled.

### 5. One promise vocabulary at every decision point (Malabar's promise system)

- **Why it works:** Malabar repeats the same promises on the home page, inside the listing grid, on the PDP and on the store page. Repetition at the moment of doubt builds trust more than a single About section can. The in-grid promise tile is especially effective because it sits inside the browsing flow.
- **How Classic should adapt:**
  - One `Promise` component in three densities: the full `/promise/` page; an **in-grid plum tile every 12 to 16 pieces** in the catalogue; a compact hairline row under the enquiry buttons on each piece page.
  - Lead with what only a bullion house can say credibly, phrased as **specific process, not percentages**: old gold weighed and tested in front of you, paid at the day's rate. Avoid copying "100% / zero deduction" claims unless the owner confirms them.

### 6. Bridal by tradition, including Gulf brides (all three use regional bridal identity)

- **Why it works:** brides shop by heritage before product. Joyalukkas's bento and Kalyan's mosaic let a Kerala or Tamil bride find herself in one glance. None of the three addresses **Arab and Gulf brides**, and none shows **Kuwaiti, Turkish or Italian** bridal work, all of which Classic stocks.
- **How Classic should adapt:**
  - A bridal page built as a **mosaic of traditions**: Kolkata, Rajkot, Temple, Antique, Kuwaiti, Turkish, Italian and Singapore, with one tall lead tile.
  - Each tradition gets a short, specific note (motifs, weight, how it is worn), a tray of velvet photos, and a **"Book a bridal viewing at {branch}"** WhatsApp action.
  - Borrow Malabar's **arched portrait frame** as a recurring shape for bridal imagery. It echoes both Mughal and Gulf architecture. This needs a design-system decision, because tokens currently set radius to 0; an arch mask is a shape, not a rounded corner.

### 7. A per-piece "ticket" (Malabar's PDP spec table, without the cart)

- **Why it works:** purity, gross weight and net weight per piece read like a trader's honest invoice, the most credible thing on Malabar's PDP. It answers the first counter question ("what weight?") before anyone asks.
- **How Classic should adapt:**
  - On each piece page, show a hairline **"ticket"**: karat, style or tradition, approximate weight (when the owner supplies it), and the branch where the piece is held.
  - Add a single line explaining how the final price is set (weight × the day's rate + making charge). Use no invented figures. A live estimate needs owner sign-off on making charges.

### 8. One ornamental motif repeated (Kalyan's hairline arch and drop line; Joyalukkas's diamond-between-rules)

- **Why it works:** both chains use a tiny repeated ornament at every section start. It gives a long page a sense of authored rhythm at almost no cost, and it signals craft without decoration overload.
- **How Classic should adapt:** a `--rule-gold` hairline with a **small arch at its centre**, optionally with a short vertical drop into the eyebrow label, used only at major section starts. It fits the zero-radius, no-shadow system because it is a line, not a shape.

### 9. A closing "see it in the hand" panel on every collection (Joyalukkas brand pages)

- **Why it works:** an enquiry-led site must end every browse with a next step. Joyalukkas closes each collection with store and contact buttons.
- **How Classic should adapt:** end every collection, category and tradition page with a plum band. It holds one line of plain copy, a **branch picker**, and WhatsApp and Call buttons whose pre-filled message names the collection the visitor was viewing.

### 10. Rate history as content (Kalyan's hidden five-day table)

- **Why it works:** a trend answers "should I buy now or wait?", the question behind most rate visits. Kalyan models this but hides it behind a form.
- **How Classic should adapt:** publish the snapshot history openly on `/gold-rate/` (sparkline plus a 7-day table with high, low and change) and use the day's change as a small, factual line on the home rate chip ("+1.25 since yesterday"). No forecasts and no advice.

### Anti-patterns to avoid (seen in all three)

- App-download modals, spin wheels and voucher pop-ups
- Copy baked into images
- Carousels that auto-advance faster than people read
- Rates behind forms or hover-only
- Four-decimal rates
- Foreign phone numbers on a UAE site
- Store lists without hours, photos or tap-to-call
- Several floating bubbles at once
- More than 160 px of fixed chrome on mobile
- The H1 at the bottom of the page
- Unnamed product tiles
- Stale campaign microsites ("2023 edition")
- Broken images on the landing page
