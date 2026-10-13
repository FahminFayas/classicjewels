# Launch checklist

Everything that has to happen between "the build is green" and "the site is live and found". Items in the first section block launch because the site currently carries a safe placeholder for each one.

## 1. Facts the owner must confirm

Update `src/data/site.ts` (and the content files named) once each answer is in.

| #   | Question                                                                                                                                                                                                                           | Where it lands                                                                            |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1   | Opening hours for each branch, including Friday and Ramadan timings. Deira is shown as on Google (10:00-22:30 daily, Friday break 12:00-14:30); the other three have none.                                                         | `branches[].hours` (set `confirmed: true`); hours then also enter the JewelryStore markup |
| 2   | One email for enquiries: `hello@classicgroup.ae` or `c1@classicgrp.ae`                                                                                                                                                             | `site.email`, `public/api/contact.php`                                                    |
| 3   | One mobile/WhatsApp number: the website has used 050 566 1416, the Google listing 050 551 5826                                                                                                                                     | `site.phone.mobile`, `site.whatsapp`                                                      |
| 4   | Shop numbers, phone numbers and map links for Safari Mall, Rolla Mall and Madinat Zayed                                                                                                                                            | `branches[]`                                                                              |
| 5   | Opening dates (and whether Musaffah and Al Ain are one branch or two) for the announced branches                                                                                                                                   | `branches[]` with `status: 'open'`                                                        |
| 6   | Exact map pin for Deira (the site uses the old contact-page embed coordinates) and the plaza spelling: Google says "Mariyam Plaza", the developer says "Maryam Plaza"                                                              | `branches[0].map`, `site.address`                                                         |
| 7   | Legal entity name, trade licence number (1921575 was on the old Terms page) and TRN                                                                                                                                                | `site.legalName`, `site.registrationNumber`, Terms page                                   |
| 8   | The experience figure: the group site says over 35 years in gold and 16 in the UAE; the old jewellery site said 30. The site uses 35. Also: what was "White Classic Gold & Diamonds"?                                              | `site.group.yearsInGold`, About page                                                      |
| 9   | Exact terms of each promise: 14-day return (unworn, invoice, custom pieces exchange-only?), easy exchange, lifetime maintenance, 0% deduction (standing or promotional; gold bought elsewhere; cash vs exchange; stones excluded?) | `site.promises`, `src/content/faqs/our-promise.json`, `/our-promise/`                     |
| 10  | Which laboratories certify the diamonds (GIA, IGI, HRD Antwerp, Dubai Central Laboratory) and whether lab-grown is sold                                                                                                            | diamonds collection copy, `/our-promise/`                                                 |
| 11  | Whether the shop holds Dubai Central Laboratory "Bareeq" certification                                                                                                                                                             | only then mention it anywhere                                                             |
| 12  | Whether the shops are registered with Planet for tourist tax-free shopping                                                                                                                                                         | gold-rate FAQ, buying-guide article                                                       |
| 13  | Karat of each collection (the site assumes 22K for Indian work, 21/22K for Kuwait and Turkish, 18K for Diamonds and Italian) and whether "Kerala" is a live collection                                                             | `src/content/collections/*.md`                                                            |
| 14  | Coin purities and weights stocked (22K 916 vs 24K 999.9) and bar brands besides PAMP                                                                                                                                               | `gold-coins-bars` category copy                                                           |
| 15  | That the gold-rate feed subscription permits public display on the website, and who pays for it                                                                                                                                    | keep or remove the rate board                                                             |
| 16  | Permission to show the Google rating (4.9 from 680 reviews on 13 October 2026) on the site; whether any reviews may be quoted                                                                                                      | `site.reviews`; the proof strip and About page                                            |
| 17  | The Diwali 2026 offer terms as published (10% rate booking, 0% making on selected pieces, diamond discount percentage, Tabby instalments?)                                                                                         | `src/content/offers/diwali-2026.md`                                                       |
| 18  | Review and correct the sixteen starter pieces in `src/content/products/` (names, collections, karats, colours); add weights if they are to be shown                                                                                | product files                                                                             |
| 19  | Whether to show indicative prices online (weight x rate + making charge + VAT) or keep "price on request"                                                                                                                          | product page price line; `docs/design-spec.md` §5.4 Option B                              |

## 2. Photography and assets

- [ ] The previous site's photos are in place (`npm run assets:fetch-legacy`). Replace the 600 px product shots with larger photography when available, at the same paths.
- [ ] Photograph each branch (shopfront and interior) for the store pages; there are no store photos today.
- [ ] Replace `public/og/default.png` with a photographed share image if one exists (1200 x 630).
- [ ] Supply the logo as SVG; `src/components/ui/Logo.astro` currently uses the 250 px PNG.

## 3. Hosting

- [ ] Deploy `dist/` to the web root. `public/.htaccess` ships with it and sets redirects, caching and security headers for Apache. See `docs/deployment.md` for Netlify/Cloudflare equivalents.
- [ ] Keep `gold-rates.php` on the same host at `/gold-rates.php`. The rate board fetches it same-origin; if the front end moves to another host, proxy it or set `PUBLIC_GOLD_RATE_ENDPOINT`.
- [ ] Set the recipient address inside `public/api/contact.php` and test the form end to end, including the honeypot (submit with the hidden `website` field filled; it should silently succeed and send nothing).
- [ ] Schedule the daily rate snapshot and rebuild (`.github/workflows/rates.yml` plus a deploy step, or a host cron).
- [ ] Verify the old URLs redirect: `/index.html`, `/about-us`, `/about-us.html`, `/contact.html`, `/privacy-policy.html`, `/terms-conditions`, `/disclaimer.html`, `/gallery`, `/news`, `/blog`, `/ar`.
- [ ] Verify `http://` and `www.` redirect to `https://classicjewels.ae/`.
- [ ] Check response headers on the live site at securityheaders.com.
- [ ] Confirm the 404 page is served for unknown URLs (the old host served a parked-domain script instead).

## 4. Search and analytics

- [ ] Google Search Console: add the domain property, submit `https://classicjewels.ae/sitemap-index.xml`, request indexing of the home, gold-rate and stores pages. The old site was `noindex` on every page; expect a few weeks for coverage to grow.
- [ ] Google Business Profile, every branch: name exactly "Classic Jewels & Diamonds" (remove the address from the Deira listing's name), primary category "Jewelry store", secondaries "Gold dealer", "Diamond dealer", "Jewelry designer"; website set to the branch's own store page; hours; photos. Keep each address byte-identical to the store page.
- [ ] Bing Webmaster Tools: import from Search Console.
- [ ] Create a Google Tag Manager container; add GA4, Meta Pixel and TikTok Pixel inside it; set `PUBLIC_GTM_ID` and rebuild. Record WhatsApp, call and directions clicks as events. The site loads nothing until the id is set.
- [ ] Point the Instagram link-in-bio and story links at `/offers/` and collection pages with UTM tags.
- [ ] Validate structured data with the Rich Results Test on the home, a product, a collection and a store page.
- [ ] Run `npm run lighthouse` against the deployed site and keep the reports.

## 5. Copy and legal

- [ ] Read every page once on a phone. The old site's typos ("Annivesary", "Festivels", "Anitique", "Turkeysh", "Warantee", "Helo Classic") are gone; make sure none return in new content.
- [ ] Privacy policy and terms reviewed by the owner. Under UAE consumer-protection regulations, invoices and the return policy must also be available in Arabic in store; the website's Arabic version is a later phase.
- [ ] Give every future offer an end date before it is published.
