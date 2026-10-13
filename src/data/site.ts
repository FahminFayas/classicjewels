/**
 * Single source of truth for brand, group, branch and contact facts.
 * Every page, JSON-LD block, header and footer reads from here, so a change to a phone number,
 * an opening time or a new branch is a one-place edit.
 *
 * Sources: the previous website, the Classic Group site (classicgrp.ae), the store's Google
 * listing and the Brand/USP research report of 13 October 2026. Items marked `TODO(owner)`
 * must be confirmed with the company before launch; see docs/launch-checklist.md.
 */

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
  /** Landline in display and E.164 form. Branches without their own number inherit the group line. */
  phone?: { display: string; e164: string };
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
  /** Expected opening, for opening-soon branches. */
  openingNote?: string;
}

export interface SocialProfile {
  id: 'instagram' | 'tiktok' | 'facebook' | 'x' | 'threads';
  label: string;
  handle: string;
  url: string;
}

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
    venue: 'Mariyam Plaza, Gold Souq Extension',
    city: 'Dubai',
    emirate: 'Dubai',
    status: 'open',
    isFlagship: true,
    address: deiraAddress,
    phone: { display: '+971 4 255 1288', e164: '+97142551288' },
    map: {
      /** Stable place URL by Google CID. */
      url: 'https://www.google.com/maps?cid=14419653802905195883',
      /** From the map embed on the previous contact page. TODO(owner): confirm against the Business Profile pin. */
      geo: { latitude: 25.27335, longitude: 55.29807 },
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.917900121145!2d55.298068699999995!3d25.2733471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43a3d57699c9%3A0xc81ce6bc3246556b!2sClassic%20Jewels%20and%20Diamonds!5e0!3m2!1sen!2sae',
    },
    hours: {
      /** As published on the store's Google listing (13 October 2026). TODO(owner): confirm. */
      confirmed: false,
      source: 'Google listing, 13 October 2026',
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
    venue: 'Safari Mall',
    city: 'Sharjah',
    emirate: 'Sharjah',
    status: 'open',
    address: {
      street: 'Safari Mall',
      locality: 'Sharjah',
      region: 'Sharjah',
      countryCode: 'AE',
    },
    /** TODO(owner): shop number, phone, hours and map link. */
    map: {
      url: 'https://www.google.com/maps/search/?api=1&query=Classic+Jewels+and+Diamonds+Safari+Mall+Sharjah',
    },
  },
  {
    id: 'rolla-mall-sharjah',
    name: 'Rolla Mall, Sharjah',
    shortName: 'Rolla Mall',
    venue: 'Rolla Mall',
    city: 'Sharjah',
    emirate: 'Sharjah',
    status: 'open',
    address: {
      street: 'Rolla Mall, Al Rolla',
      locality: 'Sharjah',
      region: 'Sharjah',
      countryCode: 'AE',
    },
    /** TODO(owner): shop number, phone, hours and map link. */
    map: {
      url: 'https://www.google.com/maps/search/?api=1&query=Classic+Jewels+and+Diamonds+Rolla+Mall+Sharjah',
    },
  },
  {
    id: 'madinat-zayed-abu-dhabi',
    name: 'Madinat Zayed, Abu Dhabi',
    shortName: 'Madinat Zayed',
    venue: 'Madinat Zayed',
    city: 'Abu Dhabi',
    emirate: 'Abu Dhabi',
    status: 'open',
    address: {
      street: 'Madinat Zayed',
      locality: 'Abu Dhabi',
      region: 'Abu Dhabi',
      countryCode: 'AE',
    },
    instagram: 'https://www.instagram.com/classicjewels.badazayed/',
    /** TODO(owner): shop number, phone, hours and map link. */
    map: {
      url: 'https://www.google.com/maps/search/?api=1&query=Classic+Jewels+and+Diamonds+Madinat+Zayed+Abu+Dhabi',
    },
  },
  {
    id: 'mohamed-bin-zayed-city-abu-dhabi',
    name: 'Mohamed bin Zayed City, Abu Dhabi',
    shortName: 'MBZ City',
    venue: 'Opposite Etihad Rail Mohamed bin Zayed City Station',
    city: 'Abu Dhabi',
    emirate: 'Abu Dhabi',
    status: 'opening-soon',
    address: {
      street: 'Opposite Etihad Rail Mohamed bin Zayed City Station',
      locality: 'Abu Dhabi',
      region: 'Abu Dhabi',
      countryCode: 'AE',
    },
    openingNote: 'Announced as coming soon. TODO(owner): opening date.',
  },
  {
    id: 'musaffah-al-ain',
    name: 'Musaffah and Al Ain',
    shortName: 'Musaffah / Al Ain',
    venue: 'Musaffah, Abu Dhabi and Al Ain',
    city: 'Abu Dhabi',
    emirate: 'Abu Dhabi',
    status: 'opening-soon',
    address: {
      street: 'Musaffah',
      locality: 'Abu Dhabi',
      region: 'Abu Dhabi',
      countryCode: 'AE',
    },
    openingNote:
      'Advertised as opening soon in September 2026. TODO(owner): confirm whether this is one branch or two, and the opening dates.',
  },
];

export const openBranches = branches.filter((b) => b.status === 'open');
export const flagship = branches.find((b) => b.isFlagship) ?? branches[0]!;
export const emirates = [...new Set(openBranches.map((b) => b.emirate))];

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
    'Classic Jewels & Diamonds sells 22K and 18K hallmarked gold jewellery, certified diamonds and gold coins and bars from four branches in Dubai, Sharjah and Abu Dhabi, priced at the daily Dubai rate.',

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
    trade: 'bullion trading, scrap gold buying and refining',
  },

  founded: {
    /** The jewellery brand opened in 2024. */
    brandYear: 2024,
  },

  phone: {
    landline: { display: '+971 4 255 1288', e164: '+97142551288' },
    /** TODO(owner): the Google listing shows 050 551 5826; the website has used 050 566 1416. */
    mobile: { display: '+971 50 566 1416', e164: '+971505661416' },
  },
  whatsapp: {
    /** International format without "+" as wa.me expects. TODO(owner): confirm (see phone.mobile). */
    number: '971505661416',
    display: '+971 50 566 1416',
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
    count: 680,
    asOf: '2026-10-13',
    url: 'https://www.google.com/maps?cid=14419653802905195883',
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
   * The six promises from the previous home page, reworded as Classic-specific, verifiable
   * statements. TODO(owner): confirm the exact terms of each before launch.
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
      title: 'UAE-hallmarked 22K, stamped 916',
      detail:
        '91.6% pure gold, assayed and stamped as UAE law requires. Weight and fineness are printed on your invoice.',
    },
    {
      id: 'lifetime-maintenance',
      title: 'Free cleaning and polishing for life',
      detail:
        'Bring any piece back for cleaning, polishing and stone tightening, for as long as you own it.',
    },
    {
      id: 'gold-exchange',
      title: 'Old gold exchanged with no weight deduction',
      detail:
        'Your old gold is tested and credited at its full gold value, by weight, at the day’s rate against a new piece.',
    },
    {
      id: 'returns',
      title: '14 days to change your mind',
      detail:
        'Unworn pieces in original condition can be returned within 14 days with the invoice. Custom pieces are exchange-only.',
    },
    {
      id: 'easy-exchange',
      title: 'Exchange for another design',
      detail: 'Swap a piece for a different design at its gold value, without the paperwork.',
    },
  ] as Promise_[],

  /** Store return policy, published on /our-promise/ and emitted as MerchantReturnPolicy. */
  returnPolicy: {
    days: 14,
    lawReference: 'UAE Federal Law No. 15 of 2020 on Consumer Protection',
  },

  /** Payment methods accepted in store (Google listing and the old site's footer). */
  paymentAccepted: ['Cash', 'Visa', 'Mastercard', 'American Express', 'Maestro', 'Cheque'],
};

export type Site = typeof site;
