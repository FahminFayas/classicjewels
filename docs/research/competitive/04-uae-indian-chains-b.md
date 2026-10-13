# 04 · UAE Indian-heritage chains (B): Tanishq, Bhima, Jos Alukkas, Sky Jewellery

Research date: 13 Oct 2026. Method: my own Browser pane tab, 1440x900 then 390x844, for DOM facts (computed styles, fonts, section heights, scripts, transfer sizes). Pane screenshots at the 1440 emulation rendered unreliably, so the Tanishq visual pass was done at the pane's native 1024x768. For Bhima and Jos Alukkas I also took full-length captures with local headless Chrome (tanishq.ae blocks headless Chrome through Cloudflare, so I did not use it there). Read-only throughout: no forms submitted, cookie banners rejected, nothing added to a cart.

| Brand                            | UAE URL used                                                                           | Status on 13 Oct 2026                                                                                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tanishq (Titan / Tata)           | https://www.tanishq.ae/                                                                | Live. Full e-commerce on Salesforce Commerce Cloud                                                                                                                         |
| Bhima Jewellers Middle East      | https://bhima.ae/                                                                      | Live. WordPress catalogue, no prices, enquiry-led (the closest model to Classic)                                                                                           |
| Jos Alukkas                      | No UAE site or showroom. Group site https://www.josalukkas.com/ reviewed instead       | The showroom list covers six Indian states only. The shop at josalukkasonline.com returned HTTP 522 (origin down)                                                          |
| Sky Jewellery (Dubai, est. 1978) | skyjewellery.com and skyjewellery.shop (the second is linked from their Instagram bio) | Both show a cPanel "Account Suspended" page. The Wayback Machine showed a bot-verification wall, which I did not try to pass. Only Instagram and directory listings remain |

Name collisions found while searching: search engines merge **Jos Alukkas** with **Joyalukkas** (a different, UAE-heavy group, covered in file 03), and **Sky Jewellery** with **Sky Gold Jewellery** (a separate Sharjah business, @skygoldjewellery_uae).

---

## TL;DR for the redesign

1. **Tanishq UAE looks the most premium of the four.** That comes from craft, not restraint. Its tools: one serif (Gambetta) in maroon, an ornamental line motif above every section title, full-bleed colour bands (oxblood `#54090A`, blush `#F5EEEE`, cream `#F8F3E8`, gold tint) that change every one or two sections, art-directed campaign photography, and very rich piece pages. The home page is still a 13-module retail scroll, 8,805 px tall at 1440.
2. **Bhima is a mirror of Classic's business model.** It is an enquiry-led catalogue with a daily gold rate, WhatsApp, four or five stores, no prices and a "since 1925" heritage. Its execution is everything Classic must avoid: template WordPress, stock "coins and seedling" imagery, the same product name repeated ten times, a rate with no date or time, and a piece page with no enquiry button.
3. **The Jos Alukkas group site is the most "experiential" build here.** It uses a black canvas, Lenis smooth scroll, a 171 px outline wordmark running as a marquee over a monochrome showroom photo, and 266 px ghost type behind section titles. It proves that a group heritage story can feel cinematic, but it is a corporate site with no products, and its shop is down.
4. **Sky Jewellery is a warning.** It is a 45-year-old UAE chain with 20+ showrooms and no working website. Directory data for its branches is contradictory. Classic's "facts in one place" approach (`site.ts`, plus per-branch schema and Google Business Profile hygiene) is a real competitive edge, not housekeeping.
5. **Biggest ideas to take:** (a) "Book a store visit" attached to every branch card and every piece; (b) karat-and-weight spec band plus a price-anatomy explainer driven by the daily rate; (c) an old-gold exchange estimator on piece pages; (d) branch cards with interior photos as a home-page section; (e) a collection switcher in which a cover tile swaps the product rail and a one-line story; (f) dark-velvet product photography set on a matching dark ground; (g) a group-endorsement lockup, as Tanishq does with its Tata badge.

---

## 1. Tanishq UAE: https://www.tanishq.ae/

**Pages visited:** home; mega menu (Jewellery); category listing `/jewellery/gold-jewellery`; product page `/product/stylish-statement-bracelet-upd3b1bghaa00.html`; stores `/stores`; store detail `/storeDetails?storeId=XJB` (Ibn Battuta) and its appointment modal (opened and cancelled); `/gold-rate.html` (does not exist; it returns a "technical difficulties" page); mobile home and mobile PDP.

### First 5 seconds

A maroon announcement bar, a centred T-monogram logo and a wide, rounded campaign banner. Two laughing women are framed by an oversized diamond necklace graphic, with an offer lockup for up to 25% off diamond value and making charges, and a white pill "Shop Now". Within about 3 s a cookie banner appears, and within about 5 s a newsletter modal (lifestyle photo left, form right). A chat bubble with a circular photo of a saree-clad assistant sits bottom right. It feels festive, Indian, abundant and commercial.

### Hero

- A Bootstrap carousel with **9 slides** (Diwali, Navratri, Privé exhibition, Garden of Gems, Solitaire, Everyday Essentials, Gold Exchange, Diamond Rings and so on). At 1440 the image is **1406x540** (about 2.6:1), inset 17 px from the viewport edges, with a **4 px radius**. Source images are 1920 wide.
- **All copy and offers are baked into the JPG.** There is no live text, and there are separate mobile crops (`-M.jpg`, square 356x356 at 390 wide).
- Slide transition: `transform 0.6s ease-in-out`. Slides rotate on their own (several slides seen over about 30 s), although the markup says `data-interval=false`; a separate `autoPlay.js` drives it. Prev/next arrows are PNG assets at the far edges. Indicators are short dashes, with the active one in maroon.
- Copy approach: a short campaign line in a display serif or script plus an offer. CTA: one white pill per slide.

### Navigation and mega menu

- **Announcement bar** `#7A1217`, white Nunito Sans 14 px, promoting gift cards.
- **Header row:** a search field on the left with **camera (visual search) and mic (voice search)** icons; logo centre; language select plus icons on the right (diamond icon for the Diamond category, a store icon for the store locator, account, wishlist, bag with count). The header is fixed. Total chrome is about 160 px at 1440, and 126 px on mobile, where the search bar stays visible.
- **Nav row:** 10 items in Gambetta Medium 16 px `#343434` (Jewellery, Diamond, Gold, Earrings, Rings, Best Deals, Bestseller, Gifting, Mia, More). The active item has a maroon underline.
- **Mega menu** (on hover): a white panel, 1411x526. The left column holds vertical serif tabs (**Category / Gender / Price Band / Metal & Stones**), with the active tab in maroon. The centre is a 7x2 grid of **101x115 thumbnail tiles** (product cut-outs on blush squares) with labels underneath, plus an underlined serif "Explore the Category" link. On the right, a portrait on-model promo with a two-line serif caption. Shopping by price band, by gender and by metal sit side by side.

### Visual language

- **Palette:** maroon `#832729` (section H2s, links, primary buttons); deep maroon `#7A1217` (announcement bar); oxblood band `#54090A`; blush band `#F5EEEE`; cream band `#F8F3E8`; gold tint `rgba(210,171,103,.15)`; body text `#222222`; warm brown labels `#3A302B`; footer `#FAFAFA`; discount text in red; "Selling Fast" badge `#FF5569` on 3% black.
- **Type:** **Gambetta** (a variable serif) for section titles (28 to 34 px, weight 400) and product names (16 px); **Satoshi Variable** for body and prices (16 to 18 px). Legacy **Nunito Sans** and **Roboto Light** still appear in places, giving four families in total, which is visible inconsistency.
- **Ornament:** every section title sits under a small **line-art SVG divider** (103x49 or 54x21; an arch or mandala, and a gift-bow version for gifting). This single motif carries most of the heritage feel.
- **Imagery:** category tiles show the piece on **peach satin** with soft daylight. Product photos are a mix of white or grey seamless and **dark green velvet or stone**. Campaign photos are warm and festive and use Indian models. Store photos show real interiors.
- **Shape:** radius 4 px on cards and video, 8 px on category tiles, pill CTAs in the hero only, outline buttons with a 0.8 px maroon border and 4 px radius. Almost no shadows. Section rhythm comes from **full-bleed colour bands**.
- **Grid:** content width about 1328 px at 1440 (56 px side margins). The listing grid is 4 columns of 315 px with about 17 px gutters.

### Home page composition (1440, in order)

1. Hero carousel (564 px).
2. **Explore Our Categories** (986 px): a 4x2 grid of 286x334 tiles with 8 px radius (Earrings, Rings, Neckwear, Pendants, Nose Pins, Bangles & Bracelets, Mangalsutras). The eighth tile is an outlined "Explore More Categories" card with a circular arrow.
3. **Trending Products** rail: 287x287 cards, heart icon, dirham-symbol price, struck-through original price, a red line naming the offer, and "Selling Fast" or "Out of Stock, Notify me".
4. **Effortless Essentials** (gold-tint band): a **441x441 looping muted autoplay video** (4 px radius) with the collection name set in serif on the video, then title, subline, "Explore" link and a 236 px product rail.
5. **Fresh From the Design Studio** (oxblood `#54090A` band): white serif headline and an Explore link on the left; a carousel of white product cards on the right with dash pagination.
6. **From Our Patrons:** four customer testimonial videos (339x289, play-icon overlay, click to play, not autoplay).
7. A gold-coin promo carousel (with the Tata badge).
8. **Shop For Occasions** (blush band): three portrait on-model cards. Each has **filter chips laid over the photo** (Men / Women / Gold / Diamond) and a title plus Explore link below (Soirée, Bridal, Everyday).
9. **Shop Our Collection:** three collection cover tiles (Navya, Garden of Gems, Onam). Choosing one **swaps the product rail below and a one-line story**, then an outline "Explore Our Collections" button.
10. **Jewellery for Everyone:** Women / Men / Kids image cards with labels inset.
11. **For The Little Ones** (cream band): a 518 px square lifestyle shot, a list of piece names and 109 px thumbnails.
12. **The Gifting Edit:** three tall cards (Women / Men / Kids) with a deep-maroon base panel holding **outlined chip links** (Wedding, Anniversary, Engagement and so on).
13. **Our Boutiques:** a "Region: Dubai" dropdown, a carousel of store cards (interior photo, store name in serif, address, phone, an outlined **Book an Appointment** button), and "Explore All".
14. A **Privé exhibition invitation**: a full-width banner with dates, the hotel ballroom venue, RSVP numbers and a **QR code**.
15. Footer: Useful Links (track order, returns, store safety, loyalty programme, find a store), Information (**Gemstone, Metal and Diamond guides**), "We are also present in" (country sites), Contact, Follow.

### Motion and interaction

- The hero slides (0.6 s ease-in-out). Rails use Slick or Swiper with circular outlined arrows. No scroll-triggered reveals, parallax or GSAP; motion comes from **video tiles** and carousels.
- Product cards swap to a **second image on hover** (`data-alt-src`, 360 px source). The wishlist heart and the **virtual try-on camera icon** show tooltips on hover.
- Interruptions: a newsletter modal on desktop; on mobile, a **returning-visitor sheet** ("continue your shopping" with the last viewed piece) over a blurred overlay; on `/stores`, a floating **old-gold exchange lead form** (name, +971 phone, store select, consents).
- A branded loader: the T monogram inside a spinning ring.

### Product presentation

- **Listing** (`/jewellery/gold-jewellery`): a promo banner on top (making charges from 10%), breadcrumb, H1 "Gold Jewellery" with a count (5,154 designs), a "Filters" toggle (price bands in AED, jewellery type, category such as Kada, Haaram, Mangalsutra) and Sort (Best Sellers, New Arrivals, Popularity, Best Matches, price both ways). Four columns at 1440, 48 tiles per load, then infinite scroll. **A 2x2 promo tile and a "Best Sellers" rail are set into the grid.** Tile images are only **360 px at source**. Cards carry a "Making charges: 15.5%" tag, offer text and the new dirham symbol as an SVG. An SEO text block sits at the foot.
- **Product page:** a **2x2 gallery grid of 640 px source images** shown at about 230 to 300 px each (the Tanishq piece page runs on photos roughly the size of Classic's). A "Try on" pill sits on the first image (Mirrar AR). Then SKU, View Similar, wishlist, share (a WhatsApp share link), serif title, price with strike-through and an offer chip, "inclusive of all taxes", and a **spec band showing "22K Gold" and "8.303 g"** with icons. After that: a Tabby instalments card; Try on plus Add to Cart (maroon); size chips plus a size guide; "Check delivery & store details" by emirate; accordions (Product Details, **See Price Breakup**, General Specifications).
- **The price breakup** lists the 22KT gold value (AED 3,887.88 for 8.303 g, which works out to about AED 468.25 per gram), making charges (AED 641.50), subtotal, discount, subtotal after discount, VAT, and a grand total of AED 4,722.
- Two cards under the buy box, "Buying Guides" and "**Talk to our experts**", then an **old-gold exchange teaser**: bring 8.3 g of 22K to a store and this piece could cost under AED 840, with a "Check Value" button.
- A free-text box for "didn't find what you wanted" (200 characters). Rails for "You may also like" and "Customers also viewed". A **sticky bottom bar** with price, size and Add to Cart (94 px on mobile).

### Trust and conversion devices

Store appointment booking. **The appointment modal:** a store interior photo on the left; on the right, name, +971 phone, email, a "Store Visit" radio, the store prefilled, date picker, time picker, "jewellery you're looking for", and consent. Also: a store locator with emirate and country chips, **Get Directions** (Google Maps short links), store timings by day group, live chat, an old-gold exchange film and lead form, buying guides, Tabby, a loyalty programme, the "A TATA PRODUCT" endorsement badge, testimonial videos, an exhibition invitation with RSVP, and WhatsApp share (but no WhatsApp chat CTA). **No published gold rate:** the gold value appears only inside each piece's price breakup.

### Mobile (390x844)

A 126 px header (logo row plus a full-width search with camera and mic). The square hero art is art-directed. Categories become a two-up grid, and rails swipe. The PDP gallery becomes a 351 px swipe carousel (640 px source, so slightly under 2x), with a sticky 94 px add-to-cart bar. The returning-visitor sheet takes the top half of the screen on load. No horizontal overflow. Page height 7,154 px.

### Performance feel

Heavy. Salesforce Commerce Cloud, jQuery 3.5.1, Slick and Swiper 11, Salesforce personalisation (Evergage), Mirrar try-on, LiveChat, OneTrust, GTM, Bing and other tags: 41 script tags. **450 `<img>` elements on the home page**, 5,712 DOM nodes. On mobile: 250 requests, about 5.5 MB transferred (4.6 MB of it images), and the load event at about 8.5 s. It feels slow to settle because modals and chat arrive late.

### Strengths

1. A coherent heritage-luxury identity: Gambetta serif, maroon and oxblood, an ornamental divider motif, warm satin photography.
2. Page rhythm from full-bleed colour bands and varied module types (grid, rail, video tile, chips over portraits, collection switcher). It never reads as a blog.
3. Piece pages that teach: karat and weight up front, a transparent price breakup, an exchange teaser, buying guides, "talk to an expert".
4. The store visit is a first-class conversion: Book an Appointment on home-page store cards and store pages, with the store prefilled and a date and time picker.
5. A mega menu that lets people shop by category, gender, price band and metal, with thumbnails.
6. Real people: patron testimonial videos and an event invitation with QR and RSVP.

### Weaknesses

1. All hero copy is baked into images (inaccessible and untranslatable; nine slides dilute the message).
2. Pop-up overload: cookie banner, newsletter modal, returning-visitor sheet, chat bubble and exchange lead form all compete.
3. Four typefaces; Nunito Sans and Roboto leftovers break the system.
4. Weight: 5.5 MB and about 8.5 s to the load event on mobile; 450 images on one page.
5. SEO gaps: store detail and error pages carry the fallback title "Sites-TanishqUAE-Site"; no gold-rate page despite the search demand.
6. Offer-heavy copy ("% off on making charges" on almost every card) cheapens the luxury signal.

---

## 2. Bhima Jewellers Middle East: https://bhima.ae/

**Pages visited:** home (1440 and 390); sub-brand listing `/yuga/` (antique gold); product page `/product/gold-necklace-in-antique-design-9/`; `/gold-rates/`; `/our-stores/`; `/gold-saving-scheme/` (via WebFetch).

### First 5 seconds

A white header with a loud orange, red and yellow logo lockup (the long-standing cartoon boy mascot, "UAE · India · Since 1925"), phone and WhatsApp numbers top right in red, and a thin red rule. Below that, a turquoise or pink banner: a large white script headline (roughly "my kind of jewellery"), a model in a silk saree with an antique temple necklace, a Dubai Frame illustration and clouds, and a "100 years" seal. It reads as a friendly regional chain whose ad agency made the banners, not as a luxury house.

### Hero

- An Elementor image carousel, **1425x557**, 3 slides (1920x750 source), **autoplay 3,000 ms, 500 ms slide**, dots only. Text is baked into the image. No CTA button: the banner is not even a link to a collection.
- Copy approach: a campaign script line plus two lines of small body copy inside the image.

### Navigation

- A 117 px header that becomes fixed on scroll (96 px on mobile with the contact strip). Seven items, Montserrat about 13 px: **Gold Rates** (first position), About Us, Wealth Plans, Easy Payment Plans, Career, Our Stores, Contact Us. **No jewellery categories in the navigation**; products are reachable only through the eight sub-brand tiles on the home page.
- Phone (landline `tel:`) and WhatsApp (a `wa.link` short link) sit above the nav. A floating green WhatsApp circle sits bottom right on every page.

### Visual language

- **Palette:** brand red `#9C2325` (nav active state, rate band, rule); logo orange and yellow; near-black footer `#212120`; slate body text `#334155`; pastel pink-to-peach gradient bands (as images). Each sub-brand has its own flat colour (approximately: Sanska purple, Yuga peach, 9Cs green, WOW olive, Sprinkles lilac, Aura indigo, Dazzle teal, Dlite blue).
- **Type:** Source Sans 3 Bold for headings (30 to 48 px); Montserrat for body, labels and nav; system-ui fallback; Font Awesome icons. No serif, no display face.
- **Imagery:** cut-out product PNGs on light grey `#F4F3F1` seamless at 700x700. Campaign banners. **The Diamond Jewellery section uses a drop-earring photo on navy velvet**, the closest visual to Classic's own photography. The gold-rate page uses stock coins with a seedling.
- **Shape:** 8 px radius on sub-brand tiles, circles for icons and testimonial photos, otherwise square. No consistent grid; sections are Elementor blocks with varied widths.

### Home page composition (1440, 4,338 px)

1. Hero carousel.
2. **"Find your sparkle, find your style":** a 4x2 grid of 297x113 **sub-brand logo tiles** (traditional, antique, precious-stone, lightweight, kids, uncut diamond, diamonds, everyday diamond), each with a caption.
3. **Gold Jewellery:** two overlapping product photos left, three paragraphs of generic copy right.
4. **Diamond Jewellery:** a white text card overlapping a pink-peach gradient band, with the navy-velvet earring photo on the right.
5. **Bhima Commitment:** five line icons in pink circles over a gradient band (best design, certified jewellery, easy exchange, lifetime exchange, customisation).
6. Follow us (social icons plus a paragraph).
7. **Happy Customers:** an autoplaying testimonial carousel (8 slides) with a circular customer photo and a long quote.
8. Footer `#212120`: Explore / Assistive links (**ring sizes, bangle sizes**, CSR, blogs) / Legal / Contact (phone, WhatsApp, email, head office in the Gold Souq, Deira).

### Motion and interaction

Hero autoplay and testimonial autoplay only. Particles.js, Jarallax and a parallax library are loaded but not visibly used on the home page. No hover states on tiles beyond the cursor. The sub-brand tiles are static images.

### Product presentation

- **Listing** (`/yuga/`): a sub-brand logo card (peach, 8 px radius) beside an H2 and a paragraph. Then "Categories" text tabs (All, Bangles, Earrings, Necklace, Oddiyanam hip belt, Pendant, Ring) with a red underline on the active tab, and a 4-column grid of **306x306 images (700x700 PNG source)**. Title only: **no price, karat, weight or enquiry action**. Names repeat ("Gold Necklace in Antique Design" about ten times on one page). Page about 4,110 px.
- **Product page:** an untouched WooCommerce template. Image left with a magnifier icon; breadcrumb, category links, title, one generic sentence, SKU. Then a Description tab repeating the sentence, and Related Products. **No enquiry, WhatsApp-this-piece, karat or weight, and no branch availability.** The description and related products run edge to edge with 0 px margin (a broken container).

### Trust and conversion devices

- **Gold rates** in the main nav. The `/gold-rates/` page shows a red `#9C2325` band with yellow text: 14K 298.25, 18K 382.50, 22K 465.25, 24K 502.50 AED per gram. It shows **no date or time stamp and no 21K** (the most-bought UAE karat), sits under a stock photo, and is followed by three paragraphs of filler.
- **Stores** (`/our-stores/`): text tabs (Dubai, Sharjah, Abu Dhabi, Muweilah Sharjah, Al Barsha Dubai). Each tab shows the address in large Montserrat (about 28 px), a phone and an embedded Google Map. **No hours, store photos or directions button.** Then a "Why visit our stores" row of five icons.
- **Wealth Plans** (gold and diamond saving schemes): four plan cards with "Learn more" plus enquiry forms (name, email, plan, emirate, preferred branch, mobile); no calculator. Easy payment plans. Ring and bangle size guides.
- Commitments (lifetime exchange, certification), testimonials, "100 years" heritage seal, phone and WhatsApp everywhere.

### Mobile (390x844)

A fixed 96 px header with a red contact strip (phone, WhatsApp) and a hamburger. The hero shrinks to a short strip, and the copy inside the image becomes unreadable. **The eight sub-brand tiles stack to full width, about 1,600 px of logo boxes before any piece of jewellery.** Page height 7,924 px. No horizontal overflow.

### Performance feel

Visually light but technically messy: WordPress 7.1.3, Elementor Pro, Astra child, WooCommerce, Contact Form 7 add-ons, particles.js, Jarallax, Magnific Popup, Perfect Scrollbar, emoji script: around 60 script files. Desktop: 162 requests, about 3.1 MB (3.0 MB images), DOMContentLoaded 2.4 s, load event about 4.1 s.

### Strengths

1. The right business model for Classic: catalogue plus rate plus WhatsApp plus stores, with no prices.
2. Gold rates first in the navigation, with phone and WhatsApp visible on every page.
3. Sub-brands that segment by style and wearer (antique, temple, lightweight, uncut, kids), close to how Classic's styles (Kolkata, Rajkot, Temple, Antique and so on) could be presented.
4. Practical utilities: ring and bangle size guides, saving-scheme enquiry by preferred branch.
5. A clear heritage claim (since 1925, 100 years).

### Weaknesses

1. Template look: Source Sans and Montserrat, pastel gradients, stock imagery, generic copy. Nothing says jeweller.
2. Rate without a timestamp or 21K, which reduces trust in the one number people came for.
3. Product pages are dead ends with no enquiry action; product names are duplicated and meaningless for search.
4. Hero banners with text in the image and no link; hero art that collapses on mobile.
5. Store pages with no hours, photos or directions.
6. Sub-brand logos used as navigation: shoppers must learn eight invented names before seeing a piece.

---

## 3. Jos Alukkas (no UAE presence): https://www.josalukkas.com/

**Finding:** Jos Alukkas (Thrissur, Kerala, since 1964) has **no UAE showroom or UAE site**. The showrooms page lists only Andhra Pradesh, Karnataka, Kerala, Pondicherry, Tamil Nadu and Telangana. Its shop, josalukkasonline.com, returned HTTP 522 (Cloudflare could not reach the origin) in both the browser pane and WebFetch. I reviewed the **group site** because it is the brand's showcase and is directly relevant to Classic's "part of Classic Group" story.

**Pages visited:** home (1440 and 390), `/business/jewellery`, `/showrooms`.

### First 5 seconds

Black. A monochrome, darkened photograph of a showroom interior fills the screen. A centred three-line headline in light grey Century Gothic (about 72 px) names the founding year; a short paragraph sits under it, then a circular outlined "Scroll" button. Across the lower third, an enormous **outline wordmark** drifts sideways. A vertical "Our Story" link with an arrow runs up the left edge. It feels like a heritage film opening, cinematic and confident, but colourless and without jewellery.

### Hero and navigation

- Top bar over the hero: a square outlined grid-icon menu button on the left, logo centre, "Shop Online" with a **gold cart icon that nudges** (`cartNudge 1.5s infinite`) and search on the right. At 1440 a **fixed bottom navigation bar** (Home, About Us, Our Business, Foundation, News & Events, Showrooms, Contact, Shop Online) shows the active item with a gold underline `#E6B00B`. On mobile it becomes a 60 px fixed top bar and a full-height overlay menu.
- The hero headline and content animate in with `slideDown 2s` on load.

### Visual language

- **Palette:** black `#000`, white, light grey `#F2F2F2` for "story" sections, mid-grey copy, a single gold accent `#E6B00B` (underlines, dots, footer rule).
- **Type:** Neue Haas Grotesk Display Pro 65 Medium for the giant outline and ghost words; Century Gothic for headlines (52 to 72 px, light) and body.
- **Signature devices:** (a) the outline wordmark at 171 px desktop and 115 px mobile, transparent fill, **1.7 px stroke at 15% white**, looping right-to-left over **55 s**; (b) **ghost section titles** (for example "News And Events" at 266 px, 5% white) behind the real 30 to 40 px title; (c) the showroom page repeats the trick at about 170 px.
- **Imagery:** black-and-white store and family photography; a brand ambassador portrait; colour only in product category cards.

### Motion and interaction

Lenis smooth scrolling (Locomotive Scroll bundle), light image parallax (`data-scroll-speed` 0.1), marquee text, Swiper carousels with a fraction counter (current slide, a short rule, total) and circular arrows, and circular "View more" badges on cards. No video.

### Composition

- Home (8,649 px): hero; About Us (a family portrait in a grey gradient); Our Story (a large light statement left, small grey copy right, on `#F2F2F2`); a businesses carousel (jewellery, savings scheme, properties, online, digital gold); a brand-ambassador announcement; News & Events (alternating image and text rows over ghost type); CSR stories; an "Explore our showroom locations" CTA panel; a black footer with a dotted map texture and a gold rule.
- Jewellery page: an ambassador portrait hero with the same marquee; a centred statement; a category carousel on black (Diamond, Kids, Platinum, Gold Coin and so on); **four outlined stat boxes** (years, showrooms, own brands, employees); a light-grey statement section; cards with circular "View more" hover badges.
- Showrooms: an accordion by state; no map, photos or hours until opened.

### Trust and conversion devices

Founding year and family story, stat boxes, CSR, news and awards (one news item covers the launch of an AR-based virtual try-on), "Shop Online". No gold rate, WhatsApp or appointment booking.

### Performance feel

Light and quick: 63 requests, about 2.4 MB, load event about 1.4 s. Bootstrap, Swiper 11, Locomotive/Lenis, Font Awesome kit. No horizontal overflow at 390.

### Strengths

1. The most experiential build of the four: smooth scroll, slow marquee, ghost type and full-bleed photography give it a cinematic pace.
2. A strong heritage-group narrative: founder, family generations, businesses, numbers.
3. Discipline: one accent colour, two typefaces, black and grey bands.
4. Fast, despite the effects.

### Weaknesses

1. No jewellery experience: no products, prices or rate, and the shop link leads to a dead origin.
2. Generic Century Gothic and a monochrome palette could belong to any conglomerate.
3. A low-contrast grey on light grey for body copy, and light-weight headlines in grey.
4. An accordion-only showroom list with no map or photos; no UAE relevance.

---

## 4. Sky Jewellery (Dubai, est. 1978)

**Pages attempted:** `https://www.skyjewellery.com/`, `https://www.skyjewellery.shop/` (from the Instagram bio), the Wayback Machine snapshot from 20 Apr 2026 (blocked by a verification wall, not attempted; WebFetch cannot reach archive.org), and Instagram `@sky.jewellery` (logged-out view).

### What exists

- **Both domains show a hosting "Account Suspended" page.** There is no brand website today.
- Instagram: about 6.5k followers and 217 posts. The bio claims UAE, Qatar and India and an online shop link that is also suspended. Story highlights are titled by retail events (DSS 2024, DSF 2023/24, Akshaya Tritiya, DSF 2023, Diwali 2022, a weekly Tuesday offer, a "Festival of 22" promotion); **the most recent dated highlight is from 2024.**
- Directories (D&B, HiDubai, Yellow Pages UAE, EasyUAE, shopping directories) give **conflicting addresses and phone numbers** for Gold Centre and Gold Land in Deira and for The Dubai Mall, and one Meena Bazar branch is marked permanently closed.

### Strengths

A deep heritage (1978, Qatar then Dubai in 1988), festival-led marketing calendar (DSF, DSS, Akshaya Tritiya, Diwali).

### Weaknesses

1. No functioning site or shop. Every search for the brand now ends at a hosting error page.
2. The facts about the brand online are inconsistent and out of date (addresses, phones, branch status).
3. Social presence looks stale, so the brand appears dormant even if the shops trade.

### Lesson for Classic

A respected UAE chain can vanish online through one lapsed hosting bill. Classic's static Astro build (cheap, cacheable, no server dependency except `contact.php`), a single facts file, `JewelryStore` and `LocalBusiness` schema per branch, and Google Business Profiles that match the site exactly are a differentiator. Add a "last checked" date to branch hours and rates so stale data is visible.

---

## 5. Who looks most premium, and why

1. **Tanishq UAE.** Craft and consistency: Gambetta serif, maroon and oxblood bands, an ornamental motif, campaign-grade photography, a mega menu with thumbnails, and expert-led piece pages. Its premium feel survives heavy discounting and pop-ups because the system underneath is coherent.
2. **Jos Alukkas (group site).** The most experiential, cinematic and restrained, but premium in a corporate way, with no jewellery in the experience and no UAE relevance.
3. **Bhima UAE.** Friendly and useful (rates, WhatsApp, stores, schemes) but template-built and visually cheap.
4. **Sky Jewellery.** No site.

What none of them do, and where Classic can lead: a rate that is **dated, timed and includes 21K**, with history; piece pages that are **enquiry-first** (WhatsApp this piece, reserve a viewing at a named branch); dark, jewel-box presentation that suits velvet-bust photography; and scroll storytelling that is about **the jewellery and the souq**, not the corporation.

---

## 6. Steal-worthy patterns, ranked

Context for each adaptation: Classic is enquiry-led, mostly has **600x600 product photos on dark navy or plum velvet busts**, a **daily gold-rate feed**, **four branches**, brand colours plum `#4B2849` and bronze gold `#BE8658`, and Cormorant Garamond with IBM Plex Sans.

### 1. "Book a store visit" as the main conversion, everywhere (Tanishq)

- **Why it works:** for high-value jewellery the sale happens at the counter. Tanishq puts Book an Appointment on every store card (home page and stores page) and opens a modal with **the store's interior photo**, the store prefilled, a date and a time. The visit feels planned and personal, not like a lead form.
- **How Classic should adapt it:** add a "Reserve a viewing" action on every piece page, branch card and collection page. The panel shows the chosen branch's interior photo, four branch choices (Gold Souq Extension flagship, Safari Mall, Rolla Mall, Madinat Zayed), a day and a time window (morning, afternoon, evening), and **the piece reference prefilled**. Send it as a **prefilled WhatsApp message to that branch** (no backend), with `contact.php` as a fallback. Three inputs at most. Opening hours come from `site.ts`; unconfirmed hours are phrased generically.

### 2. Karat and weight spec band, plus a price-anatomy explainer tied to the daily rate (Tanishq)

- **Why it works:** Tanishq puts "22K Gold" and "8.303 g" next to the title and shows a **breakup of gold value, making charges, VAT and total**. That openness about how the price is built is the biggest trust device on the site, and the UAE buyer already thinks in grams and karats.
- **How Classic should adapt it:** publish no prices (no fabricated prices). On each piece, show **karat, approximate weight (where the owner confirms it), style family and branch** as a spec band. Under it, add a short "How gold jewellery is priced in the UAE" explainer: gold value is today's rate times weight, plus making charges quoted at the counter, plus 5% VAT. **Today's rate for that karat is pulled live from the feed** and dated, for example "22K today: AED x per gram, updated 09:30". It is factual, it changes daily, and it makes a static catalogue feel alive. Owner sign-off is required on weights (TODO(owner)).

### 3. Old-gold exchange estimator on piece pages and the rate page (Tanishq)

- **Why it works:** Tanishq's teaser ("bring 8.3 g of 22K and this could cost under AED 840") turns jewellery already in the drawer into purchasing power at the moment of desire. The exchange film and lead form on its stores page support the same idea.
- **How Classic should adapt it:** a small calculator (grams plus karat, giving indicative value at today's rate) on the gold-rate page and in a slim band on piece pages, with a clear "indicative, final value assessed in store" note and a CTA to "Bring it to {branch}" through WhatsApp. It uses the existing feed in `src/lib/rates.ts`, needs no backend, and fits Classic's bullion heritage (the group trades gold every day).

### 4. Branch cards with interior photos as a home-page section (Tanishq; the opposite of Bhima)

- **Why it works:** a real store photo plus the address, phone and a single action makes the physical network tangible. Bhima's text-only address tabs show how flat the alternative feels.
- **How Classic should adapt it:** with four branches there is no need for a carousel. Use a 4-up row on desktop (2x2 on tablet, a swipe row on mobile) with emirate chips (Dubai / Sharjah / Abu Dhabi). Each card: an interior or shopfront photo, the branch name in Cormorant, mall or souq, today's hours from `site.ts`, and an "Open now" or "Opens at" status computed client-side (only where hours are confirmed). Actions: Directions, WhatsApp the branch, Reserve a viewing. Mark the Gold Souq Extension card as the flagship.

### 5. A collection switcher: cover tile swaps the rail and a one-line story (Tanishq "Shop Our Collection")

- **Why it works:** one module holds many collections without endless scrolling, and the switch feels interactive rather than editorial. It is a direct cure for "feels like a blog".
- **How Classic should adapt it:** a "Styles of the souq" section with eight tabs (Kolkata, Rajkot, Temple, Antique, Turkish, Kuwaiti, Italian, Singapore). Each tab swaps a two-sentence note on that craft's origin and character, plus four to eight pieces from the velvet-bust library. Use the existing `filter.ts` or a no-JS radio-tab pattern, keep URLs shareable with `?style=temple`, and link through to the full style page.

### 6. Dark-velvet product photography set on a matching dark ground (Tanishq listing; Bhima's diamond section)

- **Why it works:** Tanishq mixes dark green velvet shots into a white grid, and Bhima's one premium-looking moment is an earring on navy velvet. Dark cloth makes gold glow. On a white page, though, dark squares look like holes.
- **How Classic should adapt it:** stop fighting the photography. Present velvet-bust shots on **plum `#4B2849` bands**, or a near-matching dark token, so the photo edge disappears and the page reads as a lit vitrine. Display tiles at no more than 300 CSS px so 600 px sources stay sharp at 2x (Tanishq's piece page runs a 2x2 grid of 640 px images at about 230 to 300 px). Use a 2x2 or 3-up "vitrine" layout rather than one oversized image. Respect the tokens: radius 0, no shadows, no gradients.

### 7. Full-bleed colour bands that change every one or two sections (Tanishq)

- **Why it works:** Tanishq alternates white, gold tint, oxblood, blush and cream, and varies the module type inside each band (grid, rail, square video, portrait cards with chips). That rhythm is the main structural reason it never feels like an article.
- **How Classic should adapt it:** a two-tone rhythm, plum (velvet vitrines, rate, heritage) and ivory (stories, branches, guidance), with bronze `#BE8658` hairlines. Never use the same module type twice in a row on the home page.

### 8. Square looping video tile (Tanishq "Effortless Essentials")

- **Why it works:** a 441x441 muted loop with 4 px radius brings motion and light (sparkle) into a static page without a heavy full-screen video, and sits beside a product rail as a peer.
- **How Classic should adapt it:** shoot one 6 to 10 s loop per hero style: a piece on the plum bust under a moving light, or hands fastening a bangle at the counter. Display it 1:1 at about 440 px beside the style rail, with a poster frame, `muted playsinline loop`, a pause control, and no autoplay when `prefers-reduced-motion` is set. Keep each file under 1.5 MB (AV1 or H.264). This adds "experience" without needing better product stills.

### 9. Ornamental divider motif above section titles (Tanishq)

- **Why it works:** a single small line drawing above each heading gives every section a ceremonial entrance and carries the cultural reference cheaply.
- **How Classic should adapt it:** draw one hairline motif in bronze `#BE8658` (a Gulf arch or filigree derived from Classic's own mark) as an inline SVG in a token colour, and use it above major section titles only. No gradients and no shadows, as the design rules require.

### 10. Group-endorsement lockup (Tanishq "A TATA PRODUCT"; Bhima's 100-year seal; Jos Alukkas's founding-year hero)

- **Why it works:** a parent brand transfers trust instantly, especially in gold, where purity is the fear.
- **How Classic should adapt it:** a small-caps lockup reading "A Classic Group house", with the bullion-trading years from `site.ts`, in the hero corner, the footer and the rate page. Back it with a short heritage scroll chapter (bullion desk to jewellery counter) using Jos Alukkas's pacing: a big statement line, a supporting paragraph, a stat row in outlined boxes (years in bullion, branches, emirates), all from confirmed facts only.

### 11. Outline marquee type and ghost titles, used once (Jos Alukkas)

- **Why it works:** slow, oversized outline type (1.7 px stroke at 15% opacity, 55 s loop) adds depth and movement to a still photo with almost no weight.
- **How Classic should adapt it:** one marquee of the eight style names in Cormorant outline, bronze at about 20% opacity over a plum band, looping over about 60 s, static under `prefers-reduced-motion`. Use it once (hero or heritage chapter), not as a site-wide habit.

### 12. Rate as a navigation item, done properly (Bhima, improved)

- **Why it works:** Bhima puts Gold Rates first in the nav because that is why many visitors arrive.
- **How Classic should adapt it:** a live header chip ("22K AED x / g") linking to the rate page. On the rate page, show **24K, 22K, 21K and 18K** with the date, the time and "updated daily", a seven-day sparkline from the snapshot history, and the exchange estimator (pattern 3). Never use a stock image. This is Classic's daily reason to return; make it the most polished page on the site.

### 13. Event invitation module (Tanishq Privé exhibition banner)

- **Why it works:** dates, a venue and an RSVP turn the brand into a place to go, not just a catalogue.
- **How Classic should adapt it:** an "At the counter this month" module driven by the existing offers or events content: a bridal viewing day at the Gold Souq flagship, or a new style arriving at Safari Mall. Each has a date, a branch and an RSVP through WhatsApp. Hide it when nothing is scheduled.

### 14. Occasion and recipient chips laid over portrait cards (Tanishq "Shop For Occasions", "Gifting Edit")

- **Why it works:** chips such as Wedding, Anniversary and Engagement under a mood image give two-tap filtering without a filter UI.
- **How Classic should adapt it:** three tall cards (Bridal, Gifting, Everyday gold), each with three or four chips linking to filtered style pages built from the occasions content. Chips use bronze hairline borders and radius 0.

### Not for now (noted for the e-commerce store, not the brand site)

Virtual try-on (Tanishq uses Mirrar on listing and piece pages; Jos Alukkas has announced an AR try-on), visual and voice search, Tabby instalments, loyalty programmes, returning-visitor personalisation.

### Anti-patterns seen here that Classic must avoid

- Copy baked into hero images (Tanishq, Bhima): inaccessible, untranslatable, unreadable on mobile.
- Stacked interruptions within 5 s: a cookie banner, a newsletter modal, a returning-visitor sheet, a chat bubble and a floating lead form (Tanishq).
- More than two typefaces (Tanishq has four); template sans pairings with no serif (Bhima).
- One product name repeated ten times; generic marketing sentences on piece pages (Bhima).
- A piece page with no enquiry action (Bhima). A rate with no date, no time and no 21K (Bhima).
- Store pages without hours, photos or directions (Bhima); store detail pages with a fallback `<title>` (Tanishq).
- Letting the domain or hosting lapse (Sky). Inconsistent addresses across directories (Sky).

---

## Reference: data points captured on 13 Oct 2026

- Bhima rates (AED per gram, untimestamped): 14K 298.25 · 18K 382.50 · 22K 465.25 · 24K 502.50.
- Tanishq implied 22K gold value: AED 3,887.88 ÷ 8.303 g ≈ AED 468.25 per gram (inside the PDP price breakup; making charges AED 641.50 on that piece).
- Tanishq home at 1440: 8,805 px tall, 13 content modules, 450 images, 5,712 DOM nodes; mobile: 250 requests, about 5.5 MB, load event about 8.5 s.
- Bhima home at 1440: 4,338 px tall (mobile 7,924 px), 162 requests, about 3.1 MB, load event about 4.1 s.
- Jos Alukkas group home at 1440: 8,649 px tall, 63 requests, about 2.4 MB, load event about 1.4 s.
- Screenshots for this file are in the session scratchpad (`shots-04/`), not committed.

## Sources

- [Tanishq UAE](https://www.tanishq.ae/) · [stores](https://www.tanishq.ae/stores) · [gold jewellery listing](https://www.tanishq.ae/jewellery/gold-jewellery)
- [Bhima Jewellers Middle East](https://bhima.ae/) · [gold rates](https://bhima.ae/gold-rates/) · [our stores](https://bhima.ae/our-stores/) · [wealth plans](https://bhima.ae/gold-saving-scheme/)
- [Gulf News: Bhima opens at Lulu Al Barsha and Lulu Muweilah](https://gulfnews.com/business/corporate-news/bhima-jewellers-expands-uae-presence-with-two-new-showrooms-at-lulu-al-barsha-and-lulu-muweilah-1.500650590)
- [Jos Alukkas Group](https://www.josalukkas.com/) · [showrooms](https://www.josalukkas.com/showrooms) · [Wikipedia: Jos Alukkas](https://en.wikipedia.org/wiki/Jos_Alukkas)
- [Sky Jewellery on Instagram](https://www.instagram.com/sky.jewellery/) · [Gulf News: Sky Jewellery's Babu John](https://gulfnews.com/friday/art-people/sky-jewellerys-babu-john-speaks-to-friday-1.2290445) · [Yellow Pages UAE branches](https://www.yellowpages-uae.com/branches/sky-jewellery-122436)
- [Gulf News: Tanishq expansion in the UAE](https://gulfnews.com/business/retail/indias-biggest-jeweller-tanishq-hits-expansion-mode-in-uae---2-stores-open-in-dubai-and-one-soon-in-abu-dhabi-1.1638433773185)
