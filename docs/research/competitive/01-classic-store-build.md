# 01 · Classic store build (classic-store-one.vercel.app)

The e-commerce store being built for Classic Jewels & Diamonds. It is unfinished. Visited 13 October 2026, desktop 1440x900 and mobile 390x844, light colour scheme (dark scheme checked once). Measurements come from computed styles read in the page with `getComputedStyle`. Screenshots in the shared pane came back small, so visual judgements rest on small crops plus the DOM data. Figures are at 1440 px unless marked mobile.

---

## 1. Pages visited

| Page                | URL                                                                                                          | State                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Home                | `/`                                                                                                          | Renders. 13 blocks, 11,450 px tall on desktop (11,332 px on mobile). No `<title>`, no meta description, two `<h1>` |
| Shop (all products) | `/shop`, reached from the hero CTA                                                                           | Renders. 256 px filter sidebar, 17 products, 2 pages                                                               |
| Category listing    | `/category/necklace` (`/category/rings`, `diamond`, `pendant`, `earring` and `bracelet` also return 200)     | Renders. No `<h1>`, no title                                                                                       |
| Product (PDP)       | `/product/antique-necklace?variant=…`                                                                        | Rendered in the browser only (the text was empty on first read). No title, no `<h1>`                               |
| Personalization     | `/personalization`                                                                                           | The most finished page. Has a title and a meta description                                                         |
| Our Stores          | `/branches`                                                                                                  | Renders, but shows 2 placeholder stores in Kerala, India                                                           |
| About               | `/about` (footer "About Us")                                                                                 | Renders. Has a title                                                                                               |
| Wishlist            | `/wishlist`                                                                                                  | Redirects to `/login`. Not entered                                                                                 |
| Footer pages        | 26 footer URLs: `/support/*`, `/company/*`, `/legal/*`, `/blog`, `/pendant`, `/ring` …                       | **All 404.** Only `/about` and `/branches` resolve                                                                 |
| Guessed IA pages    | `/gift-shop`, `/occasions`, `/best-seller`, `/new-in`, `/calendar`, `/search`, `/robots.txt`, `/sitemap.xml` | All 404                                                                                                            |

---

## 2. Stack and build

- **Next.js** (App Router, Turbopack build, `/_next/static/immutable/`), hosted on Vercel. Auth comes from NextAuth (`/api/auth/session`).
- **Tailwind CSS v4.** Colours are `lab()`/`oklab()` from the default v4 palette. Custom theme tokens: `--color-brand: #4b2849`, `brand-variant`, `brand-light`, `surface-cream`, `surface-soft`, `neutral-dark`, `neutral-darker`.
- **Fonts** through `next/font`, self-hosted: Montserrat loads **only 500, 600 and 700**, and Playfair Display loads the variable 400 to 900 range, **roman only**.
- **Font Awesome 7** CSS is loaded (the `fa-*` keyframes and font-family variables are present).
- **react-hot-toast** (goober `go…` keyframes) is present.
- **Razorpay** `checkout.js` and its risk-detection bundle load on the home page. Razorpay is an Indian payment gateway. Prices show in AED.
- **Cloudinary** (`res.cloudinary.com/ddi3qvspy`) hosts the product images and videos, which are proxied through `/_next/image?…&q=75`. Static brand imagery sits under `/images/…` in the app.
- **No motion libraries**: no GSAP, Lenis, Swiper, Embla, Framer Motion or AOS. Carousels use CSS scroll-snap or small custom React code.
- **Dark-mode leak.** The create-next-app default `--background: #0a0a0a; --foreground: #ededed` under `prefers-color-scheme: dark` is still in the CSS. On a dark-mode device the body turns `#0A0A0A` with `#EDEDED` text behind the white sections.

---

## 3. First impression (first 5 seconds)

A grey `#F7F7F7` header bar sits above a full-screen editorial portrait: a woman with a dark bob, a grey top and a small drop earring. The photo is fashion-generic. Centred near the bottom is a white Montserrat headline about timeless designs and one plum button. Nothing on screen says gold, 22K, Dubai, Gold Souq or diamonds, and nothing says Classic beyond the small gold logo. A green WhatsApp button floats bottom right. **It reads as a clean Tailwind fashion-jewellery template (Mejuri or Pandora style) with Classic's plum applied to the buttons.** It looks tidy, and it does not identify the business.

---

## 4. Hero

- **Composition:** `section.relative.w-full.h-screen` (900 px) directly under the 80 px header, so it is not overlaid. Full-bleed `<img>` with `object-cover`, centred. The overlay is `linear-gradient(black 10% → 30% → 70%)` from top to bottom.
- **Media:** `/images/heroImage.jpg` at **1080x525 natural, stretched to 1425x900** (1.3x width upscale, heavy crop). Its `alt` reads "Luxury fashion hero background" and the button's `aria-label` reads "Start discovering timeless fashion", both template leftovers. `fetchpriority` is auto, so the LCP image gets no priority hint.
- **Copy:** H1 Montserrat 50px/400 (32px on mobile), white, letter-spacing 0.16px. Subline 16px, declared weight 300 (renders 500, see §6.2), white/90, line-height 32px. The headline and subline are generic and repeat the word "timeless".
- **CTA:** One button, "Start the discovery". Plum `#4B2849` fill, white 14px/500 text, padding 16x48, 53 px tall, **square corners**, Tailwind `shadow-lg`. Hover over 500 ms: background goes to brand/90, horizontal padding grows by about 4 px, letter-spacing widens (`tracking-wide → wider`), and a white/10 gradient "shine" sweeps across (translate -200% → 200%, 1000 ms). It goes to `/shop`.
- **No** slider, video, gold rate or second CTA (WhatsApp, visit, call).

---

## 5. Navigation

- **Header:** `nav`, `position: relative`, so **not sticky** and it scrolls away. It is **not transparent over the hero**. Background `#F7F7F7`, 80 px tall on desktop and 64 px on mobile, no border, no shadow.
- **Desktop layout:** Logo left (PNG 192x108 shown at 100x56, olive-gold about `#C0A860`). Centred links: Necklace, Diamond, Bracelet, Earring, Pendant, Personalization, Our Stores. Montserrat 14px/500, tracking 0.35px, `text-black/70`, hover `text-black`. The hover is a colour change only, with no underline or indicator. On the right: an "AED" currency picker, an ENG / عربي toggle (10px/700 uppercase, tracking 1px, active in plum), then search, account, wishlist and cart as 16 px line-icon SVGs.
- **No mega menu, no dropdowns.** Rings is missing from the desktop nav but appears as lowercase "rings" in the mobile drawer. The gift shop, occasions, calendar and personalisation features live only on the home page.
- **Mobile:** Hamburger left, centred logo, search right. The drawer is a 280 px white panel from the left over a black/40 scrim, with a plain text list and Currency and Language selectors pinned to the bottom. An **app-style bottom tab bar** (61 px, white, `border-black/5`): Home, Explore, Cart, Save, Profile, with 12 px labels and line icons. The tabs are `<button>`s with no `href`.
- **Cart:** A right drawer 606 px wide on desktop, full width on mobile, 300 ms translate. Empty state: line-art bag illustration, "Your bag is empty" and "Continue Shopping".

---

## 6. Visual language

### 6.1 Palette (measured)

| Role                              | Hex                                                                                                                                                       | Where                                                                                                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Brand plum (`--color-brand`)      | `#4B2849`                                                                                                                                                 | Primary buttons, Buy Now, active carousel dot, numerals "01/02", active language, about-page statement band            |
| Plum deep (`brand-variant`)       | `#371D36`                                                                                                                                                 | Personalization form band, personalization headings                                                                    |
| Wine                              | `#62384A`                                                                                                                                                 | PDP "Why This Gift Matters" band                                                                                       |
| Champagne gold                    | `#BDA966`                                                                                                                                                 | Star ratings, eyebrow on plum, the most frequent text colour token (64 nodes). The logo PNG samples at about `#C0A860` |
| Lilac (`brand-light`)             | `#E1C0DF`                                                                                                                                                 | Review card borders, inactive dots                                                                                     |
| Blush cream (`surface-cream`)     | `#FAF6F9`                                                                                                                                                 | Reviews band, alternating bands on Personalization and About, branches intro band                                      |
| Header grey                       | `#F7F7F7`                                                                                                                                                 | Header, About closing band (`surface-soft`)                                                                            |
| Near-black                        | `#1A1A1A` headings, `#151414` footer and About hero, `#171717`                                                                                            | Text and dark bands                                                                                                    |
| Muted mauve-grey                  | `#524B51`                                                                                                                                                 | Review metadata ("VERIFIED", review count)                                                                             |
| Tailwind gray (cool, blue-tinted) | `#F3F4F6` card ground, `#D1D5DC` borders, `#99A1AF` footer links, `#6A7282` secondary text, `#4A5565` body copy, `#364153`, `#1E2939`, `#101828` headings | Product cards, PDP, Branches, footer                                                                                   |
| Sale badges                       | lime `#D3EC13`, red `#E53434`, emerald `#10B981` (all with white text)                                                                                    | "SEASONAL SELLER", "BEST DEALS", "BEST SELLER"                                                                         |
| Discount pill                     | red text `lab(48 77 61)` (about `#E7000B`) on red-50                                                                                                      | PDP "10% OFF"                                                                                                          |
| WhatsApp kit                      | `#25D366`, `#075E54`, `#EFEAE2`, `#F0F2F5`, hover `#20BD5A`                                                                                               | Floating button and chat card                                                                                          |
| Tile label gradient               | `#806E74 → #683145 → #5F7A7E` at 95%                                                                                                                      | Gift tiles, also echoed in the calendar banner image                                                                   |

There are two golds in circulation: the store uses a **greenish champagne `#BDA966`**, while the brand guideline names **bronze `#BE8658`**. The store's warm plums also sit on top of Tailwind's **cool blue-grey** neutrals, which makes the card and PDP areas look clinical next to the plum bands.

### 6.2 Type

| Element                                            | Face             | Size / weight declared                                                                      | Notes                                                                   |
| -------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Hero H1                                            | Montserrat       | 50px / 400 (mobile 32px)                                                                    | Sentence case, white                                                    |
| Section H1 #2 "Gifts that speak…"                  | Montserrat       | 48px / **200**                                                                              | Renders at 500                                                          |
| Section H2 (Trending, See It in Action, Gift Shop) | Montserrat       | 20 to 24px / 300 to 500                                                                     | Small for section heads                                                 |
| "Personalize Every Moment"                         | Montserrat       | 38.4px / 300, tracking 0.96px                                                               | Renders at 500                                                          |
| Calendar heading                                   | Playfair Display | 36px / 300                                                                                  | Renders at 400                                                          |
| Reviews H2 and 4.9 figure                          | Playfair Display | 32px / 400 and 30px / 400                                                                   |                                                                         |
| Personalization H1                                 | Playfair Display | 72px / 400, `clamp(2.5rem, 6vw, 4.5rem)`, leading 1.1                                       | The best type moment on the store                                       |
| Personalization H3                                 | Playfair Display | 28px / 300                                                                                  |                                                                         |
| About H1 / H2                                      | Playfair Display | 60px / 48px / 400                                                                           | Italic span "Designed to be" is **faux italic** (no italic file loaded) |
| Body                                               | Montserrat       | 16px / 500, line-height 24px, tracking 0.16px                                               | 500 is heavy for body text                                              |
| Card title / price                                 | Montserrat       | 14px / 500                                                                                  | Same size and weight for name and price                                 |
| Eyebrows                                           | Montserrat       | 12 to 14px / 500, uppercase, tracking 0.2 to 0.3em (2.4 to 4.2px)                           | On Personalization and About only                                       |
| Buttons                                            | Montserrat       | 14px / 300 to 500, sentence case on home; 11 to 12px uppercase tracked on secondary buttons |                                                                         |
| Footer                                             | Montserrat       | heads 14px / 400 white; links 12px / 500 `#99A1AF`                                          |                                                                         |

**Font weight defect:** the CSS asks for Montserrat 200 and 300 in several places, but only 500, 600 and 700 are loaded. Every "light" headline therefore renders at **500**, and the airy look the designer intended never appears. Stray `font-inter` and `lato` classes also exist.

**Scale:** there is none. Home section heads run 20, 24, 38.4 and 48px with no ratio between them. Playfair only appears in the lower half of the home page, so it reads as a late addition, not a system.

### 6.3 Imagery

- **Stock or borrowed lifestyle portraits** for the hero, category split, Gift Shop, gift tiles and personalisation mosaic: Western models in neutral tops wearing fine gold chains, huggies and stacking rings. **None show 22K Indian or Gulf gold, bridal sets or the Dubai stores.**
- **Most raster images are upscaled:** the hero 1080x525 shown at 1425x900; category-left 375x562 at 712x900 (1.9x); Gift Shop 375x562 at 712x900; occasion background 843x384 at 1425x900 (1.7x); category banners 1200x450 at 1425x500; the category chip icons are 11 to 15 px PNGs shown at 18 px.
- **Product photos** (Cloudinary, about 475 to 500 px natural) are mostly white-ground, stock-style demi-fine pieces with placeholder names (Serena Wave, Kate Young, Bobbi Eternity). The exception is **"ANTIQUE NECKLACE"**, a real Classic shot of a 22K necklace on a cream velvet bust in a showcase (498x666). That is the brand's actual photographic language.
- **The occasion section** uses a 3D-rendered pile of **red gift boxes** on a peach and champagne ground. It reads as a clip-art banner and clashes with plum.
- **The calendar banner** (`cal.jpg`, 824 KB) is a blurred plum-to-teal gradient with outline sparkle stars (`star-white.svg`).

### 6.4 Layout grid, radius, shadows, texture

- **Container widths vary:** header inner `max-w-[1400px]`; products full-bleed with 12 px side padding; trust row 1248 px; reviews 1138 px; branches 1336 px; personalisation 1283 px; About `max-w-4xl`. The page has **no single left edge**.
- **Section rhythm:** `py-12/md:py-16` (48 to 64 px), `py-20/md:py-28` (80 to 112 px), Personalization `py-[8vh] px-[5vw]`. Product grid gap 16 px, reviews gap 24 px, trust row gap 48 px, gift tiles gap 4 px.
- **Radius:** mostly **0**: buttons, product cards, review cards, inputs and image tiles. The exceptions dilute that: fully round wishlist, share, WhatsApp and dots; 4 px badges and discount pill; 12 px video modal; 16 px chat card; 2 px store-card images; and the **150 px quarter-circle corners** of the personalisation mosaic.
- **Shadows:** Tailwind `shadow-sm` on 24 nodes (wishlist hearts), `shadow-lg` on the hero CTA, `shadow-xl` on drawers, and a custom `0 12px 48px rgba(0,0,0,.15)` on the chat card.
- **Texture:** none. There are gradient overlays (hero, gift tiles, Personalization hero `from-neutral-darker/90 via-brand-variant/30`) and `backdrop-blur` on category chips and tile labels.

---

## 7. Home page, block by block (desktop)

| #     | Block                         | Height  | Layout and content                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----- | ----------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1     | Hero                          | 900     | See §4                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2     | Category split (desktop only) | 900     | Two portrait photos side by side, each 712x900. Frosted chips (`bg-white/10 backdrop-blur-[2px]`, hover `white/20`) bottom right: Pendant, Rings, Earring, Bracelet, Diamond, Necklace, each with a tiny icon                                                                                                                                                                                                            |
| 2m    | Category icons (mobile only)  | 106     | A row of six circular outlined icon buttons with 12 px labels. A neat, compact pattern                                                                                                                                                                                                                                                                                                                                   |
| 3     | The Gift Shop                 | 1,096   | H2 20px centred, then two 712x900 portraits labelled "Best Seller" and "New In" (30px white). **Not links**                                                                                                                                                                                                                                                                                                              |
| 4     | Occasions                     | 900     | Full-bleed red-gift-box image. Left column: H1 48px, line, **3x2 grid of plum line icons** (24 px) for Birthday, Anniversary, Personal Milestone, Just Because, Baby Shower and Festive Celebration, then a plum CTA. **The icons are not links**                                                                                                                                                                        |
| 5     | Trending Product              | 2,951   | 17 cards in 4 columns (338 px each, 3:4 image on `#F3F4F6`). No "view all". Class typo `xl-grid-cols-5`                                                                                                                                                                                                                                                                                                                  |
| 6     | See It in Action              | 621     | Horizontal scroll-snap row (`snap-x snap-mandatory`, hidden scrollbar) of **9:16 video poster cards** (238x425) with a 40 px white round play button (hover scale 1.1). Click opens a **shoppable video modal** (see §8). Only 2 videos                                                                                                                                                                                  |
| 7     | Gift tiles                    | 804     | 3 columns with 4 px gaps, images 472x580. Each has a 100 px gradient label band (`#806E74 → #683145 → #5F7A7E`, blurred) reading "GIFT UNDER 10000", "MOST GIFTED", "PERSONALISED GIFT" in 16px/300 uppercase, tracking 2.4px. **Not links**                                                                                                                                                                             |
| 8     | Personalize Every Moment      | 794     | Two columns. Left: a **2x2 photo mosaic, 606x420, each tile with one 150 px rounded outer corner**, so the four make a rounded-square "flower". Right (nudged up 56 px): H2 38.4px, a paragraph that mentions an engraving workshop in **Brussels** (copied from another brand), a 2x2 icon list (Engraving Message, Card Message, Voice Record, Gift Wrapping) and a plum CTA                                           |
| 9     | Calendar                      | 540     | Gradient image band, white sparkle SVG, Playfair heading about remembered celebrations, a "set your occasions" line and an "ADD TO CLASSIC CALENDAR" button (12px/300 uppercase, tracking 1.2px). **Clicking it did nothing visible while signed out**                                                                                                                                                                   |
| 10    | Trust row                     | 276     | 4 columns: shield, skin, card and gift line icons (34 to 49 px) with 16px/500 labels: Lifetime Warranty, Skin Safe Jewellery, Secure Payment, Gift Packing Available                                                                                                                                                                                                                                                     |
| 11    | Reviews                       | 834     | `#FAF6F9` band. Playfair H2, "4.9" in Playfair 30px, 5 stars (4 in `#BDA966` and the 5th in `#F3F3F3`, which is invisible on cream, so a 4.9 reads as 4 stars), "Based on 782 Google Reviews", a Google "G" plus "Customer reviews from Google". 6 cards (3x2 on desktop, a swipe carousel with dots on mobile): white, 0.8 px `#E1C0DF` border, 24 px padding, square corners, name 14px/500, "VERIFIED" 11px uppercase |
| 12    | Footer                        | 657     | `#151414`. Gold logo, 4 link columns (Shop, Support, Company, Legal), social icons pointing at bare `facebook.com`, `instagram.com`, `twitter.com`, `whatsapp.com`, and "All rights reserved. © 2026". On mobile the columns collapse to `+` accordions                                                                                                                                                                  |
| Fixed | WhatsApp                      | overlay | See §9                                                                                                                                                                                                                                                                                                                                                                                                                   |

---

## 8. Motion and interaction

- **Easing:** the Tailwind default `cubic-bezier(0.4, 0, 0.2, 1)` almost everywhere. Durations: 150 ms (83 colour transitions), 300 ms, **500 ms** (product image zoom), **700 ms** (gift-tile label, store-card image), **1000 ms** (button shine), **2000 ms** (category banner crossfade).
- **Hover states:**
  - Product image `scale(1.05)` over 500 ms.
  - The "Add to Cart" bar is a black 48 px bar parked at `translate-y-full` inside the image. It slides up on hover and turns `brand/90`, so on touch screens it never appears.
  - Wishlist heart `scale(1.1)`.
  - Nav links change colour.
  - Primary buttons widen padding and letter-spacing, with a shine sweep.
  - Gift tiles: the label band grows from 100 to 110 px over 700 ms and the label tracking goes from 0.15em to 0.2em.
  - Store cards: image `scale(1.025)` over 700 ms.
  - WhatsApp button: `scale(1.05)` plus a green glow shadow.
- **Looping animation:** the **sale badges carry an infinite 3 s linear "shine" sweep** (white/30 band). The keyframes also include `pulse-ring` (1.2 s infinite), `pop` (0.4 s overshoot to 1.2), `dotPulse` (typing dots) and `scale-up` (0.35 s, `cubic-bezier(0.22,1,0.36,1)`, used for modal entry).
- **Carousels:** the category banner crossfades 3 images on a 2 s opacity transition with no controls or dots. Reviews are a swipe carousel on mobile with an elongated plum active dot. "See It in Action" is a scroll-snap strip.
- **Shoppable video modal:** black/60 `backdrop-blur-xs` scrim, `animate-fade-in` (250 ms), a 730 px rounded-xl panel with a 420 px video column (Cloudinary `f_auto,q_auto` MP4, 720x1280, autoplay, muted, loop, no controls) and a side panel with title, a one-line description, "TAGGED PRODUCTS", thumbnail, name, price and "VIEW PRODUCT".
- **No scroll-triggered reveals, no parallax, no page transitions, no sticky storytelling.** The About hero text fades in once (250 ms). The page itself does not move as you scroll.
- **No `prefers-reduced-motion` handling** was found for the infinite shine or pulse animations.

---

## 9. Products: cards, listing, PDP

**Card** (`a.group`):

- Image box 3:4 (338x451) on `#F3F4F6`. The image is `object-cover` even though most sources are square or 475 px wide.
- 36 px white round wishlist button top right with `shadow-sm`.
- Optional badge top left: 12px/700 white on lime, red or green, 4 px radius, with the shine sweep.
- Below the image: name 14px/500 (`line-clamp-2`), a 12 px grey metal tag "Gold", then the price 14px/500 black, e.g. "AED 1,086.28".
- Out-of-stock cards show a grey `#6A7282` bar.
- Test data shows: "demo", "demoproduct2", "ringss", "AED 3.85".

**Listing:**

- 500 px full-bleed banner crossfade with no text and no H1.
- Toolbar: "3 PRODUCTS" (14px grey) left. Right: a bordered "Sort by" select (`#D1D5DC` border, 12px) and "Filter", which opens a 450 px right drawer with Variants, Price, Clear All and View.
- `/shop` has a fixed 256 px left sidebar (Categories, Variants, Price) and arrow pagination.

**PDP** (`/product/antique-necklace`):

- **Gallery:** a sticky left column with a 612x612 `object-contain` image (hover zoom) and 70 px thumbnails (50 px on mobile). Badge top left, share and wishlist round buttons top right.
- **Title and price:**
  - Breadcrumb "Home / Necklace", then the name as **H2** 24px/500, uppercase as entered.
  - Price stack: was "AED 385.15" (14px grey, struck through), now "AED 346.64" (24px/500 black), and a "10% OFF" pill (11px/700 red on pale red, 4 px radius).
  - A 96 px round certificate-style badge image (`/images/Badge/icon.png`, alt "badge icon").
- **Options:**
  - "Find My Size" link.
  - "Pick Your Perfect Delivery Slot", which shows "Not Available".
  - Personalisation toggles: Engraving Message, Card Message, Voice Message, Gift Wrapping.
- **Buttons:** **Add to Cart** outlined (`#D1D5DC` border, 337x46) and **Buy Now** filled plum (335x44), side by side. On mobile, a fixed bottom bar holds a cart icon and a full-width plum "Buy Now".
- **Below the fold:**
  - A "Why This Gift Matters" band in `#62384A`, whose text mentions 22-karat metalwork.
  - 3 promise icons: Free Shipping, **1 Year Warranty**, Easy Return. The home page says **Lifetime** Warranty.
  - `+` accordions: General Details, Material & Stones, General Details of Subproducts, "Caret Details of Sub" (sic, for carat), Description, Warranty & Shipping.
  - A reviews block (empty state, star filter, sort), then Related Products and the trust row.
- **Missing:** karat and weight up front, making charges, a hallmark or certificate explanation, any link to the daily gold rate, an "ask on WhatsApp about this piece" action, and branch availability.

---

## 10. Trust and conversion devices

| Device                     | On the store                                                                                                                                                                                                                                                                                        | Quality                                                                                                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WhatsApp                   | A floating 52 px `#25D366` button on every page. It opens a **fake WhatsApp chat card** (342x456, 16 px radius, `#075E54` header, "Classic", "Usually replies quickly", a greeting bubble with an emoji, an input and a send button). The footer WhatsApp link goes to `whatsapp.com`, not a number | A good idea. The look borrows WhatsApp's UI and does not match the brand                                                                                        |
| Appointment / consultation | Only the Personalization enquiry form (preferred contact Email, Phone or WhatsApp)                                                                                                                                                                                                                  | Strong pattern, see §11                                                                                                                                         |
| Store locator              | `/branches`: search box, "SHOWING 2 STORES", cards with photo, address, `tel:` link, "Today · 09:00 to 18:00" and "CALL STORE"                                                                                                                                                                      | No map, no directions, no WhatsApp per store. **The data are placeholders** (Kannur and Malappuram, phone `+326598595`, one card image is another brand's logo) |
| Gold rate                  | **None**                                                                                                                                                                                                                                                                                            | Classic's biggest differentiator is absent                                                                                                                      |
| Promises                   | Lifetime Warranty, Skin Safe, Secure Payment, Gift Packing (home) and Free Shipping, 1 Year Warranty, Easy Return (PDP)                                                                                                                                                                             | Inconsistent with each other. "Skin safe" is a demi-fine claim, odd for 22K gold                                                                                |
| Reviews                    | 4.9 with "782 Google Reviews" and 6 named "VERIFIED" cards                                                                                                                                                                                                                                          | **The cards look like placeholders.** 782 does not match the sourced snapshot in the brand site's `site.ts` (4.9 from **680**, 13 Oct 2026)                     |
| Certifications             | One generic round badge PNG on the PDP                                                                                                                                                                                                                                                              | Not explained, not linked                                                                                                                                       |
| Heritage                   | None. About says nothing of Classic Group, 35 years of bullion trading, Gold Souq or Dubai                                                                                                                                                                                                          | Missed                                                                                                                                                          |

---

## 11. The other built pages

**Personalization (`/personalization`)**: the store's best page. It is already enquiry-led.

- **Hero:** 85vh (min 600 px) photo at 90% opacity under a dark-to-plum gradient (`from-neutral-darker/90 via-brand-variant/30`). Eyebrow "PERSONALIZATION" (14px/500, tracking 0.3em, white/90). H1 **Playfair 72px/400**, leading 1.1.
- **Intro:** a split section on `#FAF6F9` (604x650 photo with a 38.4px heading in `#371D36`).
- **Services:** numbered 01 and 02 (12px plum, tracking 2.4px) with Playfair 28px H3s for Engraving and Milestone Message.
- **Process:** a **4-step strip** (Share your idea, We review it, We contact you, Create something personal).
- **Form band:** a **deep plum `#371D36` split band** with a 712 px photo of a woman at a jewellery counter with a consultant beside a form:
  - Underline-only fields: bottom border white/20, 44.8 px tall, labels 12px uppercase tracking 1.2px at white/70.
  - "Preferred contact method" chips: Email, Phone, WhatsApp.
  - "What would you like to personalize" chips, including "I'd like some guidance".
  - Optional product name, an idea textarea, and a white button with plum text: "SEND PERSONALIZATION REQUEST →".
- The page is 4,453 px tall.

**About (`/about`)**:

- **Hero:** 75vh on `#151414`, Playfair 60px.
- **Bands:** cream and white alternate; "Our Principles" is numbered 01 to 04.
- **Statement band:** a **plum `#4B2849` band** with a 60px Playfair line mixing italic and roman.
- **Store band:** a store-interior photo under a dark overlay, with a "FIND OUR STORES" button.
- **Closing:** a "Discover the Collection" band on `#F7F7F7`.
- **Copy:** generic gifting language with no facts.

**Branches (`/branches`)**:

- **Intro:** H1 Montserrat 52px/400 with **negative tracking (-1.3px)** in `#101828` on `#FCFCFC`, then a soft-focus store-photo band.
- **Cards:** 3-col (418 px, gap 40 px), 3:2 images, 19px names, small grey metadata, and an outlined 11px uppercase "CALL STORE" button.

---

## 12. Mobile experience (390x844)

- The header is 64 px and the hero is `h-screen` (844 px), so **the hero runs 64 px past the fold**. The plum CTA sits half behind the 61 px bottom tab bar, and the WhatsApp FAB overlaps the subline.
- Category access works well: a compact row of 6 round outlined icons right after the hero.
- The Gift Shop and gift tiles become stacked full-width portraits (1,000 px and 1,730 px). That is a lot of scrolling on photos that do not link anywhere.
- The occasion block swaps in a vertical art-directed image (`gift-v.png`, 552x1056), which is good art direction, with the icon grid above the gift boxes.
- Products show 2 columns. The hover "Add to Cart" bar is invisible on touch, so the card is just a link.
- The PDP is a square 390x390 image with a fixed bottom bar (cart icon plus plum "Buy Now"). This works.
- Footer link columns collapse to accordions.
- The drawer is a plain list with no imagery, no contact block and no store list.

---

## 13. Performance feel

- Desktop home: DOMContentLoaded about 0.63 s, load event about 1.87 s on this connection. About **1.96 MB** transferred after a full scroll.
  - **824 KB** is the single calendar background `cal.jpg`, loaded as an unoptimised CSS background.
  - 231 KB is `drawer-bg.png`.
  - JS is about 260 KB compressed (largest chunk about 223 KB decoded), plus Razorpay scripts on every page.
- The DOM holds **113 `<img>`** on the home page because desktop and mobile variants are both rendered and hidden with `hidden lg:block` / `block lg:hidden`.
- No autoplay video on the page itself. Video loads only in the modal.
- Overall feel: **light and quick**. The weak spots are blurry upscaled images and the oversized calendar JPEG.

---

## 14. What is unfinished

- Placeholder catalogue (demo products, AED 3.85 prices, "ringss") and placeholder branches (Kerala, fake phone).
- 26 of the 28 footer page links 404 (only `/about` and `/branches` resolve). Social links point at bare platform domains.
- Gift Shop tiles, occasion icons and gift tiles are **not links**. The calendar button does nothing for visitors.
- Copy borrowed from other brands (a "Brussels workshop") and template alt text ("Luxury fashion…").
- Missing `<title>` and meta description on the home, listing, PDP and Branches pages. Two H1s on the home page, none on the listing or PDP. No JSON-LD, OG tags, canonical, robots.txt or sitemap.
- "Delivery slot: Not Available", empty reviews on the PDP, and only 2 videos.
- Font weights 200 and 300 are not loaded, and the italic is faux.
- The dark-mode default from create-next-app leaks into the body.

---

## 15. Strengths

1. **The plum `#4B2849` CTA discipline.** One filled colour for every primary action, square corners, white 14px text. This already matches the brand site's `--plum-700` and `--radius: 0`.
2. **The Personalization page** is a ready-made enquiry flow: an eyebrow, a Playfair 72px headline, a 4-step "how it works" strip, and a plum form band with a contact-method choice that includes WhatsApp. It is the most "Classic" page on the store.
3. **The gifting and occasion IA**: Gift Shop, six named occasions, budget-led tiles ("Gift under 10000"), personalisation add-ons (engraving, card, voice message, wrapping) and an occasion-reminder calendar. This is a strong emotional frame that the brand site's current catalogue-and-articles structure lacks.
4. **The shoppable vertical video modal** (9:16 reel, tagged products beside it). It is native to how UAE buyers already browse jewellery on Instagram.
5. **The mobile category icon row and app-style bottom bar** make thumb navigation quick.
6. **Light runtime:** no heavy animation libraries, Cloudinary `f_auto` video, lazy images.

## 16. Weaknesses

1. **The store does not identify Classic.** Stock Western demi-fine models and generic "timeless" copy. Nothing about 22K, Indian or Gulf craft, Gold Souq, 35 years of bullion, or diamonds in Dubai.
2. **No system:** two golds (`#BDA966` vs brand `#BE8658`), warm plums on cool Tailwind greys, six container widths, section heads anywhere from 20 to 48px, Playfair only in the lower half, and radius drifting between 0, 4, 12, 16 and 150 px.
3. **Image quality:** most hero and editorial rasters are upscaled 1.3x to 1.9x. Category chip icons are 11 px PNGs. An 824 KB background JPEG.
4. **Generic e-commerce furniture:** a hover-only add-to-cart bar, lime, red and green shining badges (white on lime fails contrast at about 1.4:1), a round heart and a strike-through discount pill. It could be any Shopify theme.
5. **Trust content that cannot be verified:** invented-looking review cards, a review count that does not match the listing, and promises that contradict each other (Lifetime vs 1 Year warranty).
6. **No gold rate, no karat or making-charge clarity, no old-gold exchange, no maps or directions.** Those are the things that make a UAE gold buyer walk in.

---

## 17. One family: what the brand site should do

### (a) Adopt from the store, for consistency

| Adopt                      | Store value                                                                               | Brand site today                                         | Recommendation                                                                                                                                                                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary action             | Plum `#4B2849` fill, white 14px text, square, about 48 to 53 px tall                      | `--plum-700 #4b2849`, `--radius: 0`, `--control-h: 3rem` | Already aligned. Keep it, and make sure both sites use the same label case (sentence case) and the same height (48 px)                                                                                                                                               |
| Blush light surface        | `#FAF6F9` for alternating bands                                                           | `--surface-1 #faf7f2` (ivory), `--plum-050 #f6f0f5`      | Agree on one alternate band colour. `--plum-050` is within a hair of the store's blush, so use it for the bands where the store uses `surface-cream`, and keep ivory as the page base. Ask the store team to adopt ivory as its base too                             |
| Deep plum enquiry band     | `#371D36` behind forms                                                                    | `--plum-900 #2e1a2d`                                     | Pick one deep plum for both sites (suggest the brand's `#2E1A2D`) and use it for every contact or enquiry band                                                                                                                                                       |
| Eyebrow + serif headline   | 12 to 14px uppercase, tracking 0.2 to 0.3em, over a large serif                           | `--t-eyebrow 0.75rem`, `--track-eyebrow 0.14em`          | Keep the brand values. Both sites should use eyebrows the same way (one word or a short phrase, above every section head)                                                                                                                                            |
| Numbered process strip     | "01 to 04" with plum numerals                                                             | Exists for "how buying works"                            | Use the same component visually for custom jewellery, old-gold exchange and how buying works                                                                                                                                                                         |
| Personalisation vocabulary | Engraving, card message, voice message, gift wrapping                                     | `/custom-jewellery/`                                     | Mirror the four add-on names exactly so a customer meets the same words on both sites. Use British spelling on both ("Personalisation"); the store mixes "Personalization" and "Personalised"                                                                        |
| Occasion taxonomy          | Birthday, Anniversary, Personal Milestone, Just Because, Baby Shower, Festive Celebration | birthday, anniversary, festivals, wedding                | Share one list. The store is **missing Wedding**, the biggest 22K occasion, and the brand site is missing Baby (newborn gold is a strong Gulf and South Asian custom) and Milestone. Agree on slugs both sites can deep-link                                         |
| WhatsApp-first contact     | A chat card with a prefilled greeting                                                     | WhatsApp in the header and action bar                    | Keep the brand's approach, but a small preview card ("Ask Classic, Gold Souq branch, replies during store hours", with a prefilled message naming the page or piece) is worth adopting in brand styling, without emoji and with a real `wa.me` number from `site.ts` |
| Logo                       | Gold PNG lockup                                                                           | `logo-dark.png`, `logo-white.png`                        | Same master file on both sites, as SVG. The store's 192x108 PNG is soft on retina                                                                                                                                                                                    |

### (b) Generic or template-like on the store, where the brand site must do better

1. **Hero:** do not use a stock model. Show a Classic piece on its plum or navy velvet bust, very large on a plum field, with the **live 22K/21K/18K rate** and two actions (WhatsApp, Visit a branch). That frames the site as a gold house, not a fashion label.
2. **Imagery honesty:** the store upscales small rasters. The brand site's 600x600 velvet-bust product shots should be shown at or below their native size (a "plate" at 300 to 480 px on a matching plum ground), never stretched to full bleed. Full-bleed moments should use store interiors, Gold Souq exteriors, hands at the counter, or macro crops of detail the photos can support.
3. **Copy:** replace "timeless" and "elevate" with specifics: karat, weight, the style's origin (Kolkata, Rajkot, Temple, Turkish, Kuwaiti), which branch carries it, what old-gold exchange is worth today.
4. **Trust:** only verifiable facts. Use the Google rating from `site.ts` (4.9, 680, with date and link), real promises from `site.ts`, the hallmark and certificate explained in words, the 35-year Classic Group lineage, and four real branches with maps and hours. No invented reviewers.
5. **Store locator:** four real branches, each with a map, directions, call, WhatsApp, today's hours (when confirmed) and a photo of that branch. The store's card layout (3:2 image, name, address, "Today ·" line, outlined call button) is a fine skeleton to reuse.
6. **Motion:** the store has hover-scale, shine and pulse loops but no narrative motion. The brand site can feel experiential without breaking its no-hover-transform rule: scroll-linked reveals of rate numerals, a slow crossfade between the four branches, and staged entry of plates in a collection. Honour `prefers-reduced-motion`.
7. **Footer:** a short, honest footer (branches, rate, contact, legal that exists) instead of 26 dead links.
8. **SEO basics** the store lacks (titles, one H1, JSON-LD, sitemap) are already covered by the brand site's conventions. Keep them.

### (c) Conflicts to resolve between the two sites

| Topic                                | Store                                                          | Brand site                                                 | Resolve by                                                                                                                                                                                                                                                                                  |
| ------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display face                         | Playfair Display (roman only)                                  | Cormorant Garamond                                         | **Pick one serif for both.** Cormorant is more delicate and reads "jeweller". Playfair is heavier and more fashion-magazine. If the store keeps Playfair, the brand site should move to it (or both to a third face) so the logo neighbourhood looks the same. Load true italics either way |
| Text face                            | Montserrat (500 to 700 only)                                   | IBM Plex Sans                                              | **Pick one.** Montserrat's wide geometric caps suit eyebrows and buttons. Plex is better for long reading and numerals. A shared choice matters more than which. If Montserrat, the store must load 300 and 400                                                                             |
| Gold                                 | `#BDA966` champagne (logo, stars)                              | `#BE8658` bronze (`--rule-gold`, gold scale)               | Decide the brand gold with the owner and re-export the logo in it. Two golds side by side look like a mistake                                                                                                                                                                               |
| Neutrals                             | Tailwind cool greys `#101828`, `#4A5565`, `#6A7282`, `#D1D5DC` | Warm inks `#1C1418`, `#4A3F46`, `#6B5F66`, rules `#E6E0D6` | Store should adopt the warm ink and rule scale                                                                                                                                                                                                                                              |
| Dark surface                         | `#151414` near-black footer                                    | `#2E1A2D` plum-deep footer                                 | Use plum-deep on both. It is more ownable than black                                                                                                                                                                                                                                        |
| Header                               | `#F7F7F7` grey, not sticky                                     | Ivory, sticky from 64em (desktop)                          | Same height, background and logo position on both. One should not look like a different company                                                                                                                                                                                             |
| Radius                               | 0 for most things, plus pills, 4, 12, 16 and 150 px            | 0 only (except the C-ring)                                 | Store should drop the stray radii, or the brand site should allow one exception the store also uses (circular icon buttons)                                                                                                                                                                 |
| Shadows, gradients, hover transforms | Used throughout                                                | None by rule                                               | Store should go flat. The brand site keeps its rule                                                                                                                                                                                                                                         |
| Rating                               | 4.9 / **782** "Google Reviews"                                 | 4.9 / **680**, dated 13 Oct 2026                           | One sourced number from one place, with its date                                                                                                                                                                                                                                            |
| Warranty                             | "Lifetime" (home) vs "1 Year" (PDP)                            | Promises in `site.ts`, pending owner sign-off              | The owner confirms once, and both sites read the same wording                                                                                                                                                                                                                               |
| Naming                               | "Classic Fine Jewellery" (page titles), "Classic"              | "Classic Jewels & Diamonds"                                | Use the legal and trading name consistently                                                                                                                                                                                                                                                 |
| Route words                          | `/branches` "Our Stores", `/personalization`                   | `/stores/`, `/custom-jewellery/`                           | Same nav labels on both sites ("Our Stores" or "Branches", "Personalisation" or "Custom jewellery")                                                                                                                                                                                         |
| Spelling                             | US "Personalization", "Personalize"                            | British English                                            | British on both                                                                                                                                                                                                                                                                             |
| Currency and language                | AED picker, ENG / عربي toggle                                  | English only                                               | If the store ships Arabic, the brand site needs at least an Arabic landing and store pages to feel like the same family                                                                                                                                                                     |

---

## 18. Store IA the enquiry-led brand site could echo

| Store feature                         | Echo on the brand site? | How                                                                                                                                                                                          |
| ------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Gift Shop** (Best Seller, New In)   | Partly                  | A "Gifts" index that groups pieces by occasion and by budget band, each ending in "Ask about this piece" on WhatsApp. Budgets should be ranges ("under AED 2,000"), never live prices        |
| **Occasions** (6 icons)               | Yes                     | An occasion grid using the shared taxonomy, with Wedding added, each a real page linking to collections, articles and a branch                                                               |
| **Budget tiles** ("Gift under 10000") | Yes, carefully          | Price bands only if the owner confirms them. They are useful for gifting intent                                                                                                              |
| **Personalisation**                   | Yes, strongly           | `/custom-jewellery/` should take on the store's 4-step strip and the contact-method form, adding "Bring a sketch or photo to any branch" and "Name necklaces in Arabic or English"           |
| **Calendar reminders**                | Light version           | "Remember a date" stores a WhatsApp reminder opt-in or an `.ics` download for Eid, Diwali, Akshaya Tritiya and anniversaries. Gold-buying days matter to this audience                       |
| **Trust badges**                      | Yes, with real content  | Hallmark, certificate, buy-back or exchange, the branch that sold it handles returns, the 35-year group. Facts from `site.ts` only                                                           |
| **Reviews**                           | Yes, only real          | The Google rating badge with date and link. If quoting reviews, use real ones with permission and link to the listing                                                                        |
| **Shoppable video**                   | Yes                     | A "See it on the bust" reel strip: 9:16 clips filmed at the counter. The modal's side panel lists the piece, its karat and weight range, and buttons for WhatsApp and the branch that has it |
| **Wishlist / account / cart**         | No                      | Out of scope for an enquiry site. A "Shortlist to WhatsApp" (save pieces locally, send the list in one message) gives the same feeling without commerce                                      |

---

## 19. Steal-worthy patterns, ranked

1. **Contact-method enquiry form on a deep plum band, with a photo of the counter** (Personalization page)
   - _Why it works:_ it turns a passive "contact us" into a guided consultation. The visitor chooses Email, Phone or WhatsApp and what they want ("I'd like some guidance" lowers the bar). The photo of a person being served at a counter sells the in-store experience.
   - _How Classic should adapt it:_ use it on Custom jewellery, Old-gold exchange and every branch page. Pre-select WhatsApp, add a branch selector (the four branches from `site.ts`), and pass the piece or collection name when launched from a product. Fields stay underline-only on `--plum-900`, with labels in `--ink-on-plum-muted`. Submit via the existing `public/api/contact.php` or open `wa.me` with the composed message.

2. **Shoppable 9:16 video modal with tagged pieces**
   - _Why it works:_ it matches how Gulf and South Asian buyers discover gold (reels of a set on a bust, turned under shop lights). The side panel converts curiosity straight into a product.
   - _How Classic should adapt it:_ film 10 to 15 s clips of pieces on the plum and navy velvet busts at the Gold Souq counter, which beats the 600 px stills. Use a horizontal strip of 9:16 posters, and a modal with the muted looping clip on the left and, on the right, the piece name, karat, approximate weight, the branch that has it, and "Ask on WhatsApp" plus "Visit the branch". No price unless confirmed. Respect reduced motion (show the poster, play on tap).

3. **Occasion grid with line icons, plus an art-directed mobile image**
   - _Why it works:_ gifting intent is the most common way people shop jewellery. Six clear icons give a fast way in, and the vertical mobile crop shows the art direction was planned for phones.
   - _How Classic should adapt it:_ use one shared occasion list across both sites (add Wedding and Newborn), with plum line icons at 24 px on ivory, each a real link to `/occasions/<slug>/`. Replace the red gift-box render with Classic's own imagery: a bridal set on a bust for Wedding, a small bracelet for Newborn.

4. **Numbered 4-step "how it works" strip**
   - _Why it works:_ it removes uncertainty from a service with no checkout. The visitor knows exactly what happens after they ask.
   - _How Classic should adapt it:_ one component for Custom jewellery (Share, We sketch and quote, Approve, Collect at your branch), Old-gold exchange (Bring your gold, We test it in front of you, Today's rate applied, Choose new pieces) and Diamonds. Plum numerals in `--t-numeral`.

5. **Mobile category icon row directly under the hero**
   - _Why it works:_ a quick, thumb-friendly route into the catalogue without opening the menu.
   - _How Classic should adapt it:_ add a horizontally scrollable row of round outlined icons for Classic's real categories (Necklaces, Bangles, Earrings, Rings, Chains, Coins & Bars, Diamonds), drawn as one SVG sprite in plum (no PNGs). Optionally pin it as a chip row on the jewellery index.

6. **Budget-led gift tiles with a label band**
   - _Why it works:_ "Under X" answers the first gifting question before the visitor has to ask.
   - _How Classic should adapt it:_ only with owner-approved ranges, shown as flat plum label bands (no gradient, no blur) under real product photos. Link each to a filtered collection, never to a dead tile.

7. **Occasion reminder ("calendar")**
   - _Why it works:_ it gives a reason to come back on a gold-buying date, and gifting is date-driven.
   - _How Classic should adapt it:_ a no-account version. "Add Eid, Diwali or Akshaya Tritiya to your calendar" (`.ics` download) or "Remind me on WhatsApp" (opt-in message to the branch). Pair it with the gold-rate page, since rate watchers buy on these dates.

8. **Plum statement band with a large serif line** (About page)
   - _Why it works:_ one big sentence on a solid brand colour gives the page a pause and a voice.
   - _How Classic should adapt it:_ use it for one specific, true line per page (for example the Classic Group's years in bullion, or "Tested in front of you"), in the shared display serif with real italics. Never a slogan.

**Do not steal:** the hover-only add-to-cart bar, the shining lime, red and green badges, the gradient label bands, stock models, upscaled full-bleed rasters, placeholder reviews and the long dead-link footer.
