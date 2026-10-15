/**
 * Single source of truth for brand, group, branch and contact facts.
 * Every page, JSON-LD block, header and footer reads from here, so a change to a phone number,
 * an opening time or a new branch is a one-place edit.
 *
 * Sources: the previous website, the Classic Group site (classicgrp.ae), the store's Google
 * listing and the Brand/USP research report of 13 October 2026. Items marked `TODO(owner)`
 * must be confirmed with the company before launch; see docs/launch-checklist.md.
 */
import type { DisplayKarat } from '@/lib/tones';

export type DayName =
  'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface OpeningHours {
  days: DayName[];
  /** 24-hour "HH:MM:SS" (the format Google's LocalBusiness guidelines ask for). */
  opens: string;
  closes: string;
}

export interface Branch {
  /** URL slug: /stores/{id}/ */
  id: string;
  /** Display name, e.g. "Gold Souq Extension, Deira". */
  name: string;
  /** Short label for strips and the footer. */
  shortName: string;
  /** Mall or district line. */
  venue: string;
  /** Where the branch sits; mall branches get mall-specific directions copy. */
  venueType: 'souq' | 'mall' | 'district';
  city: string;
  emirate: 'Dubai' | 'Sharjah' | 'Abu Dhabi' | 'Al Ain';
  status: 'open' | 'opening-soon';
  isFlagship?: boolean;
  address: {
    street: string;
    locality: string;
    region: string;
    countryCode: 'AE';
  };
  /** The branch's own number in display and E.164 form, as published on its Google listing. */
  phone?: { display: string; e164: string };
  /** A second number for the branch (Deira: the mobile its Google listing publishes). */
  mobile?: { display: string; e164: string };
  /** Google plus code, as shown on the listing. */
  plusCode?: string;
  /** The branch's own Google rating snapshot. Text only: never aggregateRating in JSON-LD. */
  reviews?: { rating: number; count: number; asOf: string };
  /** Google Maps place link and coordinates, when known. */
  map?: { url: string; geo?: { latitude: number; longitude: number }; embedUrl?: string };
  hours?: {
    /** True only when the company has confirmed the timetable. */
    confirmed: boolean;
    source?: string;
    weekly: OpeningHours[];
    /** Closures inside the day, e.g. the Friday prayer break. */
    breaks?: { days: DayName[]; from: string; to: string; label: string }[];
    note?: string;
  };
  /** Facilities worth a line on the store page. */
  facilities?: string[];
  /** Branch-specific Instagram, if any. */
  instagram?: string;
  /** One-sentence directions. */
  directions?: string;
  /** Customer-facing line for an opening-soon branch. Shown on the site. */
  publicNote?: string;
  /** Internal note for the owner. Never rendered. */
  ownerNote?: string;
  /** Position on the schematic west-to-east route of BranchDoors (1 is westernmost). */
  routeOrder?: number;
  /** One-line address for a door: shop and building, without the district. */
  shortAddress?: string;
  /** Nearest metro, as a short door line. */
  metro?: string;
}

export interface SocialProfile {
  id: 'instagram' | 'tiktok' | 'facebook' | 'x' | 'threads';
  label: string;
  handle: string;
  url: string;
}

export type ExchangeBasis = 'posted-rate' | 'buying-rate';

export interface Promise_ {
  id: string;
  title: string;
  detail: string;
}

const deiraAddress = {
  street:
    'Shop No. 6, Multistorey Car Park Building (Mariyam Plaza), Gold Souq Extension, behind RAK Bank',
  locality: 'Deira',
  region: 'Dubai',
  countryCode: 'AE',
} as const;

export const branches: Branch[] = [
  {
    id: 'deira-gold-souq-extension',
    name: 'Gold Souq Extension, Deira',
    shortName: 'Deira',
    routeOrder: 2,
    shortAddress: 'Shop 6, Mariyam Plaza, behind RAK Bank',
    metro: 'Gold Souq or Al Ras metro, about ten minutes on foot',
    venue: 'Mariyam Plaza, Gold Souq Extension',
    venueType: 'souq',
    city: 'Dubai',
    emirate: 'Dubai',
    status: 'open',
    isFlagship: true,
    address: deiraAddress,
    phone: { display: '+971 4 255 1288', e164: '+97142551288' },
    /** The number on the Google listing (15 October 2026), also its WhatsApp. */
    mobile: { display: '+971 50 551 5826', e164: '+971505515826' },
    plusCode: '77FX+86 Dubai',
    reviews: { rating: 4.9, count: 681, asOf: '2026-10-15' },
    map: {
      /** Stable place URL by Google CID. */
      url: 'https://www.google.com/maps?cid=14419653802905195883',
      /** The Google listing's pin (15 October 2026). */
      geo: { latitude: 25.2733471, longitude: 55.2980687 },
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.917900121145!2d55.298068699999995!3d25.2733471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43a3d57699c9%3A0xc81ce6bc3246556b!2sClassic%20Jewels%20and%20Diamonds!5e0!3m2!1sen!2sae',
    },
    hours: {
      /** As published on the store's Google listing (re-checked 15 October 2026). TODO(owner): confirm. */
      confirmed: false,
      source: 'Google listing, 15 October 2026',
      weekly: [
        {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '10:00:00',
          closes: '22:30:00',
        },
      ],
      breaks: [
        { days: ['Friday'], from: '12:00:00', to: '14:30:00', label: 'Friday prayer break' },
      ],
      note: 'Call or WhatsApp to confirm Friday and Ramadan timings.',
    },
    facilities: [
      'Covered parking in the same building',
      'Wheelchair-accessible entrance',
      'Cards, cheques and contactless payment accepted',
    ],
    directions:
      'Inside the Mariyam Plaza multistorey car-park building, directly behind RAK Bank. Nearest metro: Gold Souq or Al Ras (Green Line), about ten minutes on foot.',
  },
  {
    id: 'safari-mall-sharjah',
    name: 'Safari Mall, Sharjah',
    shortName: 'Safari Mall',
    routeOrder: 4,
    venue: 'Safari Mall',
    venueType: 'mall',
    city: 'Sharjah',
    emirate: 'Sharjah',
    status: 'open',
    shortAddress: 'Safari Mall, Muwaileh',
    address: {
      street: 'Safari Mall, Muwaileh Commercial, Industrial Area',
      locality: 'Muwaileh',
      region: 'Sharjah',
      countryCode: 'AE',
    },
    /** Everything below is from the branch's Google listing, 15 October 2026. TODO(owner): shop number; confirm hours. */
    phone: { display: '+971 6 523 0916', e164: '+97165230916' },
    plusCode: '8F32+QQ Sharjah',
    reviews: { rating: 4.9, count: 153, asOf: '2026-10-15' },
    map: {
      url: 'https://www.google.com/maps?cid=10452211343914334828',
      geo: { latitude: 25.3043894, longitude: 55.4519658 },
    },
    hours: {
      confirmed: false,
      source: 'Google listing, 15 October 2026',
      weekly: [
        {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '10:00:00',
          closes: '23:00:00',
        },
      ],
      breaks: [
        { days: ['Friday'], from: '12:00:00', to: '14:30:00', label: 'Friday prayer break' },
      ],
      note: 'Call or WhatsApp to confirm Friday and Ramadan timings.',
    },
  },
  {
    id: 'rolla-mall-sharjah',
    name: 'Rolla Mall, Sharjah',
    shortName: 'Rolla Mall',
    routeOrder: 3,
    venue: 'Rolla Mall',
    venueType: 'mall',
    city: 'Sharjah',
    emirate: 'Sharjah',
    status: 'open',
    shortAddress: 'Rolla Mall (Rolla Market), Al Ghuwair',
    address: {
      street: 'Rolla Mall, Al Ghuwair, Hay Al Gharb',
      locality: 'Al Ghuwair',
      region: 'Sharjah',
      countryCode: 'AE',
    },
    /** Everything below is from the branch's Google listing, 15 October 2026. TODO(owner): shop number; confirm hours. */
    phone: { display: '+971 6 534 4916', e164: '+97165344916' },
    plusCode: '995Q+GM Sharjah',
    reviews: { rating: 5.0, count: 135, asOf: '2026-10-15' },
    map: {
      url: 'https://www.google.com/maps?cid=11176834497388503007',
      geo: { latitude: 25.3588024, longitude: 55.3892317 },
    },
    hours: {
      confirmed: false,
      source: 'Google listing, 15 October 2026',
      weekly: [
        {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '10:00:00',
          closes: '22:30:00',
        },
      ],
      breaks: [
        { days: ['Friday'], from: '11:30:00', to: '13:30:00', label: 'Friday prayer break' },
      ],
      note: 'Call or WhatsApp to confirm Friday and Ramadan timings.',
    },
  },
  {
    id: 'madinat-zayed-abu-dhabi',
    name: 'Madinat Zayed, Abu Dhabi',
    shortName: 'Madinat Zayed',
    routeOrder: 1,
    venue: 'Best Address Gifts Building, Sanayya',
    venueType: 'district',
    city: 'Madinat Zayed',
    emirate: 'Abu Dhabi',
    status: 'open',
    shortAddress: 'Shop 10, Best Address Gifts Building, Sanayya',
    address: {
      street: 'Shop 10, Best Address Gifts Building, Sanayya',
      locality: 'Madinat Zayed',
      region: 'Abu Dhabi',
      countryCode: 'AE',
    },
    instagram: 'https://www.instagram.com/classicjewels.badazayed/',
    /** Everything below is from the branch's Google listing, 15 October 2026. TODO(owner): confirm hours. */
    phone: { display: '+971 2 557 1994', e164: '+97125571994' },
    reviews: { rating: 4.9, count: 205, asOf: '2026-10-15' },
    map: {
      url: 'https://www.google.com/maps?cid=11883819255275255613',
      geo: { latitude: 23.6616598, longitude: 53.7269212 },
    },
    hours: {
      confirmed: false,
      source: 'Google listing, 15 October 2026',
      weekly: [
        {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '10:00:00',
          closes: '22:30:00',
        },
      ],
      breaks: [
        {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          from: '13:30:00',
          to: '16:00:00',
          label: 'Afternoon break',
        },
      ],
      note: 'Call or WhatsApp to confirm today’s timings.',
    },
    ownerNote:
      'The Google pin (23.66 N, 53.73 E) is Madinat Zayed in Al Dhafra, about 150 km from Abu Dhabi city, not the Madinat Zayed Shopping Centre in the city. TODO(owner): confirm.',
  },
  {
    id: 'mohamed-bin-zayed-city-abu-dhabi',
    name: 'Mohamed bin Zayed City, Abu Dhabi',
    shortName: 'MBZ City',
    venue: 'Opposite Etihad Rail Mohamed bin Zayed City Station',
    venueType: 'district',
    city: 'Abu Dhabi',
    emirate: 'Abu Dhabi',
    status: 'opening-soon',
    address: {
      street: 'Opposite Etihad Rail Mohamed bin Zayed City Station',
      locality: 'Abu Dhabi',
      region: 'Abu Dhabi',
      countryCode: 'AE',
    },
    publicNote: 'Opening soon, opposite the Etihad Rail station. Dates to follow.',
    ownerNote: 'Announced on Instagram on 16 July 2026. TODO(owner): opening date.',
  },
  {
    id: 'musaffah-al-ain',
    name: 'Musaffah and Al Ain',
    shortName: 'Musaffah / Al Ain',
    venue: 'Musaffah, Abu Dhabi and Al Ain',
    venueType: 'district',
    city: 'Abu Dhabi',
    emirate: 'Abu Dhabi',
    status: 'opening-soon',
    address: {
      street: 'Musaffah',
      locality: 'Abu Dhabi',
      region: 'Abu Dhabi',
      countryCode: 'AE',
    },
    publicNote: 'Opening soon. Dates to follow.',
    ownerNote:
      'Advertised as opening soon on 23 September 2026. TODO(owner): confirm whether this is one branch or two, and the opening dates.',
  },
];

export const openBranches = branches.filter((b) => b.status === 'open');
export const flagship = branches.find((b) => b.isFlagship) ?? branches[0]!;
export const emirates = [...new Set(openBranches.map((b) => b.emirate))];

/** The group's history, in the two clauses the copy uses (see site.group). TODO(owner): approve. */
const experienceLead = 'in the gold trade for over 35 years';
const experienceTail = 'more than 16 of them in the UAE';

export const site = {
  name: 'Classic Jewels & Diamonds',
  shortName: 'Classic Jewels',
  legalName: 'Classic Jewels & Diamonds',
  /** Trade licence number as printed on the previous Terms page. TODO(owner): confirm with TRN. */
  registrationNumber: '1921575',
  url: 'https://classicjewels.ae',
  locale: 'en_AE',
  language: 'en',
  currency: 'AED',

  /** Used in the default <title> and Organization schema. */
  tagline: 'Gold & diamond jewellers in Dubai, Sharjah and Abu Dhabi',
  /** The inherited brand line, kept as the voice of the site. */
  slogan: 'Every jewel has a tale',
  defaultDescription:
    'Classic Jewels & Diamonds sells 22K and 18K hallmarked gold jewellery, tested diamonds and gold coins and bars in Dubai, Sharjah and Abu Dhabi, priced at the daily Dubai rate.',

  group: {
    name: 'Classic Group of Companies',
    url: 'https://classicgrp.ae/',
    /** Divisions as the group describes itself. */
    divisions: [
      { name: 'Classic Bullion', note: 'the group’s first business: bullion trading' },
      { name: 'Classic Realty', note: 'real estate, since 2022' },
      { name: 'Classic Jewels & Diamonds', note: 'fine jewellery, since 2024' },
    ],
    /**
     * The group’s own figures: over 35 years in gold and more than 16 years in the UAE.
     * The previous jewellery site said "over 30 years". TODO(owner): approve one figure.
     */
    yearsInGold: 35,
    yearsInUae: 16,
    /**
     * The group's history in two clauses, so the heritage band can set the tail in italic:
     * "The Classic Group has been {experienceLead}, {experienceTail}." TODO(owner): approve.
     */
    experienceLead,
    experienceTail,
    /** The one approved way to state the group's history in copy (lead and tail joined). */
    experience: `${experienceLead}, ${experienceTail}`,
    trade: 'bullion trading, scrap gold buying and refining',
  },

  founded: {
    /** The jewellery brand opened in 2024. */
    brandYear: 2024,
  },

  phone: {
    landline: { display: '+971 4 255 1288', e164: '+97142551288' },
    /**
     * The mobile on the Deira Google listing (15 October 2026), which also links wa.me to it.
     * The previous website used 050 566 1416. TODO(owner): confirm which number staff answer.
     */
    mobile: { display: '+971 50 551 5826', e164: '+971505515826' },
  },
  whatsapp: {
    /** International format without "+" as wa.me expects; the Google listing's own wa.me link. TODO(owner): confirm. */
    number: '971505515826',
    display: '+971 50 551 5826',
    greeting: 'Hello Classic Jewels,',
  },
  /** TODO(owner): the old site used hello@classicgroup.ae on the home page and c1@classicgrp.ae elsewhere. */
  email: 'hello@classicgroup.ae',

  /** The registered office and flagship store; branches are listed in `branches`. */
  address: {
    ...deiraAddress,
    countryName: 'United Arab Emirates',
    oneLine: `${deiraAddress.street}, ${deiraAddress.locality}, ${deiraAddress.region}, United Arab Emirates`,
    short: 'Gold Souq Extension, Deira, Dubai',
  },

  map: {
    shortLink: 'https://maps.app.goo.gl/xs3n3W6aEczA2Tz67',
    placeUrl: 'https://www.google.com/maps?cid=14419653802905195883',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Classic+Jewels+and+Diamonds+Gold+Souq+Extension+Deira+Dubai',
    geo: { latitude: 25.27335, longitude: 55.29807 },
    nearestMetro: 'Gold Souq or Al Ras Metro Station (Green Line)',
    parking: 'Covered parking in the same building (600+ bays)',
  },

  /** Public rating snapshot from the flagship’s Google listing. Update the date when refreshed. */
  reviews: {
    rating: 4.9,
    count: 681,
    asOf: '2026-10-15',
    url: 'https://www.google.com/maps?cid=14419653802905195883',
    /** Whose rating it is: "4.9 on Google, from 680 reviews of {of}". */
    of: 'our Deira branch',
  },

  /**
   * Where the posted gold rate comes from and what it leaves out. Printed beside every rate:
   * "{source} {basis}, 13 October, 12:02" and "{excludes}".
   * TODO(owner): confirm the source name and how often the feed updates (owner ask 6).
   */
  rate: {
    source: 'Dubai Jewellery Group',
    sourceLong: 'Dubai Gold & Jewellery Group',
    basis: 'suggested retail rate',
    excludes: 'Before making charges and 5% VAT',
    /** UAE VAT on the gold value and the making charge. */
    vat: 0.05,
  },

  /**
   * Old-gold exchange terms (docs/design-system-v2.md §5.4 Estimator, §10 owner ask 1).
   * TODO(owner): is old gold credited at the posted retail rate, at a buying rate, or after a
   * deduction? Is "no weight deduction" true, and on what conditions? Until `confirmed` is true
   * the estimator shows fine-gold weight only (a fact), never a dirham figure, and the exchange
   * promise title and any "0% deduction" wording stay off every surface.
   */
  exchange: {
    confirmed: false,
    /** posted-rate: credited at the day's posted rate; buying-rate: at that rate less buyingDiscount. */
    basis: 'posted-rate' as ExchangeBasis,
    /** AED per gram below the posted rate, per karat, when `basis` is "buying-rate". */
    buyingDiscount: {} as Partial<Record<DisplayKarat, number>>,
    /** Upper limit of the estimator's weight field, in grams. */
    maxGrams: 500,
  },

  /**
   * Services staff offer on request. Each gates one line of copy; nothing ships until the owner
   * says yes. TODO(owner): owner ask 12.
   */
  services: {
    /** "Ask us to call you" on the piece ticket. */
    callback: false,
    /** "Ask on WhatsApp for another photograph" under a piece's photograph. */
    morePhotos: false,
  },

  social: [
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@classicjewelsanddiamonds',
      url: 'https://www.instagram.com/classicjewelsanddiamonds/',
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      handle: '@classic_jewelz',
      url: 'https://www.tiktok.com/@classic_jewelz',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      handle: 'Classic Jewels & Diamonds',
      url: 'https://www.facebook.com/profile.php?id=61567567975024',
    },
    { id: 'x', label: 'X', handle: '@classicjewels__', url: 'https://x.com/classicjewels__' },
    {
      id: 'threads',
      label: 'Threads',
      handle: '@classicjewelsanddiamonds',
      url: 'https://www.threads.net/@classicjewelsanddiamonds',
    },
  ] as SocialProfile[],

  /**
   * The six promises from the previous home page, reworded as Classic-specific statements. Scope
   * is deliberately generic until the owner signs off the exact terms (launch checklist item 9).
   * TODO(owner): confirm the exact terms of each before launch.
   */
  promises: [
    {
      id: 'certified-diamonds',
      title: 'Diamonds tested in front of you',
      detail:
        'Every stone is instrument-tested in the shop and larger diamonds come with an independent grading report.',
    },
    {
      id: 'hallmark-916',
      title: 'The UAE hallmark on every piece',
      detail:
        '22K is stamped 916, 21K 875 and 18K 750, as UAE law requires. Weight and fineness are printed on your invoice.',
    },
    {
      id: 'lifetime-maintenance',
      title: 'Cleaning and polishing for life',
      detail:
        'Bring a piece back for cleaning, polishing and a check of its settings, for as long as you own it.',
    },
    {
      id: 'gold-exchange',
      title: 'Old gold exchanged with no weight deduction',
      detail:
        'Old gold is tested in front of you and credited by weight at the day’s rate against a new piece.',
    },
    {
      id: 'returns',
      title: '14 days to change your mind',
      detail:
        'Unworn pieces can be returned within 14 days with the invoice. Customised, engraved and resized pieces are exchange-only.',
    },
    {
      id: 'easy-exchange',
      title: 'Exchange for another design',
      detail:
        'Exchange a piece for a different design, credited at its gold value. Ask for the terms.',
    },
  ] as Promise_[],

  /** Store return policy, published on /our-promise/ and emitted as MerchantReturnPolicy. */
  returnPolicy: {
    days: 14,
    lawReference: 'UAE Federal Law No. 15 of 2020 on Consumer Protection',
    /** The canonical wording, rendered on the promise page, the terms and the FAQ. */
    text: 'Unworn pieces in their original condition can be returned within 14 days of purchase with the invoice, and the certificate where one was issued. Customised, engraved and resized pieces are exchange-only. Returns are taken at the branch that sold the piece.',
    statutory:
      'This is our own commitment. It does not limit your rights for defective goods under UAE Federal Law No. 15 of 2020 on Consumer Protection.',
  },

  /** Payment methods accepted in store (Google listing and the old site's footer). */
  paymentAccepted: ['Cash', 'Visa', 'Mastercard', 'American Express', 'Maestro', 'Cheque'],
};

export type Site = typeof site;
