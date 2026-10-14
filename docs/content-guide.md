# Content guide

How to add and edit the things that change often: pieces, collections, occasions, offers, articles, FAQs and branches. No code knowledge needed beyond editing text files; every field is validated when the site builds, so a mistake shows up as a clear error instead of a broken page.

All content lives in `src/content/`. Images that belong to content live in `src/assets/` and are optimised automatically (AVIF/WebP, responsive sizes) at build time.

## Adding a piece (product)

1. Put the photo in `src/assets/products/`. Square, at least 1200 x 1200 px, on a white or plain background. JPG for photos, PNG for cut-outs.
2. Create `src/content/products/<slug>.md`. The file name becomes the URL: `/jewellery/<category>/<slug>/`.
3. Copy this template and fill it in:

```md
---
name: 'Kolkata Fringe Choker' # max 80 characters
sku: 'CJ-NK-001' # CJ-<category letters>-<number>; quoted in WhatsApp enquiries
description: '...' # 70-160 characters; this is the Google snippet
category: 'necklaces' # a file name from src/content/categories (without .json)
collection: 'kolkata' # optional; a file name from src/content/collections
occasions: ['wedding'] # optional; file names from src/content/occasions
material: 'gold' # gold | diamond | gemstone | polki
karat: 22 # 24 | 22 | 21 | 18
colour: 'yellow' # yellow | white | rose | two-tone (the base metal colour)
plating: 'Rhodium plated' # optional; any coating over the base metal
weightGrams: 24.6 # optional gross weight; leave out until confirmed
netWeightGrams: 23.9 # optional net gold weight; drives the "gold value today" line
stones: '0.42 ct, G colour, VS1' # optional
certification: 'Tested in store' # optional; or the lab and report number
finish: 'Antique matte' # optional
availability: 'in-store' # in-store | made-to-order | sold
images:
  - src: '../../assets/products/p01.jpg'
    alt: '22K gold Kolkata choker with a fringe of leaf drops' # at least 10 characters, describe the piece
    ground: 'velvet' # velvet | lilac (default): what the photograph was shot on
stage: '#1b1740' # optional; the velvet colour sampled from the photo (#rrggbb), see below
featured: true # shows on the home page
isNew: false # shows in "new arrivals"
order: 1 # lower numbers appear first
draft: false # true hides the piece from the live site
---

Two or three sentences about the piece: where it is made, the technique, how it wears.
```

**`ground` and `stage`.** Every photograph says what it was shot on, because the site draws the two kinds differently (docs/design-system-v2.md §1.2). `velvet` photographs (the dark velvet and bust shots, p01 to p09) are lit on the dark stage, never larger than their own width; `lilac` photographs (studio cut-outs on the pale lilac ground) sit on a matching lilac plate. Leaving `ground` out means `lilac`. A velvet piece shown alone (its own page) sits on the colour of its own velvet: set `stage` to that colour, sampled from a corner of the photograph, when it differs visibly from the default stage (`#0b0918`); p06 is the one so far (`#1b1740`, a lighter violet).

Why colour and plating are separate fields: a customer once complained that a "yellow gold" ring lost its colour; it was white gold with a yellow finish. Say what the metal is and what the coating is, every time.

Writing the description: say what it is (karat, type, style), one concrete detail, and end with "Enquire on WhatsApp". Avoid adjectives such as "stunning" or "exquisite"; say what the piece does instead.

SKU prefixes in use: NK necklaces, ER earrings, RG rings, PD pendants, BG bangles, BR bracelets, CH chains, AK anklets, CB coins and bars.

The sixteen pieces shipped with the site were built from the previous website's photographs. Their names, collections and karats are plausible but unconfirmed; review each before launch.

## Collections

`src/content/collections/<slug>.md`. Fields: `name`, `shortName` (the style's own short name: "Kolkata", "Kuwaiti", "Made to order"; used on cards, in the menu and on the styles line), `title` (max 60), `description` (70-160), `origin` (where the style comes from), `summary` (one sentence, max 200), `hallmarks` (2-5 short phrases shown as a spec list), `karats` (list of 24/22/21/18), `longitude` (optional), `image` and `imageAlt` (optional), `imageGround` (`velvet`, the default, or `lilac`), `order`, `featured`. The Markdown body is the story shown on the collection page. The collection wordmarks (the small logos) are in `src/assets/collections/wordmarks/<slug>.png`.

- **`longitude`**: the rounded longitude of the place a style comes from (Italian 12, Turkish 29, Kuwaiti 48, Rajkot 71, Temple 78 for Madurai, Kolkata 88, Singapore 104). It places the style on the schematic west-to-east "styles line"; the site never prints the number. Leave it out for collections that are not a place (Antique, Gemstone, Diamonds, Kids, Made to order): they are listed as "Also at the counter".
- **`image`**: only a photograph of a piece in that style. Leave it out rather than borrow another collection's photograph: the page then shows a typeset plate with the style's name. Kuwaiti and Singapore have no image for this reason (`kuwait.jpg` was the Antique Rani Haar; `singapore.jpg` is withdrawn). When `image` is set, `imageAlt` is required.
- **`imageGround`**: what `image` was shot on (Diamonds and Kids are studio cut-outs, `lilac`).

## Categories

`src/content/categories/<slug>.json`. Fields: `name`, `shortName`, `title`, `description`, `intro` (first paragraph), `image` and `imageAlt` (optional), `order`, `inNav`, `ground` (`lilac`, the default, or `velvet`: the ground of the category's photographs, which decides whether its page opens on the dark stage; only `necklaces` is `velvet` today). Category pages list every piece whose `category` matches the file name.

The category photograph is a 5:2 cut-out (for example 800 x 320 px). Leave `image` out until a real photograph exists: the tile is then typeset on the plum ground and the category page opens with a text hero. Never ship a placeholder image; Coins & bars has no photograph for this reason.

## Occasions

`src/content/occasions/<slug>.md`. Fields as collections, plus `suggestedCategories` (ordered list of category file names). The body is the short guidance paragraph shown on the occasion page.

## Offers (campaigns)

`src/content/offers/<slug>.md`. Fields: `title` (max 60), `description` (70-160), `headline` (max 90, shown on the home page while the offer runs), `summary`, `startsOn` and `endsOn` (YYYY-MM-DD), `terms` (list of plain-text lines), optional `image`/`imageAlt`, `branches` (empty = all), `whatsappMessage`. The body is the longer explanation.

An offer appears on the home page, the offers index and its own page only between its start and end dates. After `endsOn` it is not built at all, so nothing needs removing by hand. Give every offer an end date before it goes live.

## Journal articles

`src/content/journal/<slug>.md`. Frontmatter: `title` (max 60), `description` (70-160), optional `headline`, `pubDate` (YYYY-MM-DD), optional `updatedDate`, `author`, `cover` (`../../assets/journal/<file>`), `coverAlt`, `tags`, `relatedCollections`, `draft`.

Articles should answer a question a customer actually asks and be specific to the UAE and to this business. Facts about law, VAT and the gold rate must come from `docs/research/facts-and-sources.md` or from the owner. Set `updatedDate` whenever an article is materially changed.

## FAQs

`src/content/faqs/<page>.json`: a `heading` and a list of `{ "question", "answer" }` items. Each file belongs to one page or page type (home, gold-rate, our-promise, custom-jewellery, stores, jewellery, product, collections, occasions, offers, gold-exchange). Answers are plain text, one to three sentences.

## Branches and business facts

Branches, addresses, phones, hours, the WhatsApp number, email, social links, the six promises and the Google rating snapshot are in `src/data/site.ts`. To add a branch, add an entry to the `branches` array: the store page, the footer, the home-page strip and the structured data all follow. Set `status: 'opening-soon'` for an announced branch; it is listed without links until you change it to `'open'`. For an announced branch, `publicNote` is the line customers see ("Opening soon. Dates to follow.") and `ownerNote` is for the team only; it is never rendered. `venueType` (`'souq'`, `'mall'` or `'district'`) decides whether mall-specific directions appear.

The group's history is stated in one approved sentence, `site.group.experience`, built from two clauses, `experienceLead` ("in the gold trade for over 35 years") and `experienceTail` ("more than 16 of them in the UAE"), so a heading can set the second in italic. Change the clauses, never the joined sentence.

Other facts in `src/data/site.ts` that the pages read:

- `site.reviews.of`: whose Google rating it is ("our Deira branch").
- `site.rate`: the source and basis of the posted gold rate and what it excludes, printed beside every rate ("Dubai Jewellery Group suggested retail rate", "Before making charges and 5% VAT"), and the VAT rate.
- `site.exchange`: the old-gold exchange terms. While `confirmed` is `false` (the owner has not confirmed the basis) the estimator shows fine-gold weight, never a dirham figure, and the "no weight deduction" promise and any "0% deduction" wording stay off the site. `basis` is `posted-rate` or `buying-rate` (with `buyingDiscount` per karat); `maxGrams` caps the estimator.
- `site.services`: `callback` ("Ask us to call you") and `morePhotos` ("Ask on WhatsApp for another photograph"); each line appears only once set to `true` by the owner.
- Each branch can carry `routeOrder` (its place on the west-to-east route of the branch doors), `shortAddress` (one door line, e.g. "Shop 6, Mariyam Plaza, behind RAK Bank") and `metro` ("Gold Souq or Al Ras metro, about ten minutes on foot"). The 14-day return policy is stated once, in `site.returnPolicy.text` and `site.returnPolicy.statutory`, and every page renders those strings; change the policy there, never in a page.

Hours: fill in `weekly` (24-hour `HH:MM:SS`) and any `breaks`, then set `confirmed: true` once the company has checked them. Until then the pages say the hours are as listed on Google and the structured data omits them.

Fields marked `TODO(owner)` are collected in `docs/launch-checklist.md`.

## Daily gold rate

`src/content/rates/<date>.json` files are written by `npm run rates:snapshot` (and by the scheduled GitHub workflow). Do not edit them by hand. The newest file is what the site shows, with its `fetchedAt` time printed beside it ("13 October, 12:02", Dubai time); the history powers the record on the gold-rate page, which says when the record starts until seven days exist.

## Checking your work

```bash
npm run check
```

reports any field that is missing, too long or misspelt, with the file and line. Then:

```bash
npm run dev
```

opens the site at `http://localhost:4321/` so you can see the page before it goes live.

## Photography

- Pieces on velvet (the house style): keep about 15 % clear velvet on every edge and the bust base out of the frame, so the photograph sits in its pool of light without a hard edge. Set `ground: 'velvet'`.
- Studio cut-outs: square, on the pale lilac ground (`ground: 'lilac'`), same distance and lens across a collection so sizes read true in the grid. Add a close-up of the 916 stamp for 22K pieces when possible.
- Collection covers: portrait 4:5 (for example 1200 x 1500 px), a hero piece on the velvet tray or on a bust.
- Occasions: portrait 2:3 lifestyle photos of the shop's own pieces being worn or given.
- Stores: a shopfront and an interior photo per branch, landscape 3:2; these are the one thing the previous site never had.
- Journal covers: landscape 16:9.

Every image currently in `src/assets/` came from the previous website (`npm run assets:fetch-legacy`). The product shots are 600 x 600 px, which is enough for the grid but not for a full-width hero; reshoot at 2000 px or larger when possible. `npm run assets:placeholders` generates stand-ins for any path that is still missing.
