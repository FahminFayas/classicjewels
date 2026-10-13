import { site } from '@/data/site';

/**
 * Builds a wa.me deep link with a pre-filled message.
 * wa.me opens the app on mobile and WhatsApp Web on desktop, no API key needed.
 */
export function whatsappUrl(message: string, number: string = site.whatsapp.number): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Generic enquiry used in the header, footer and floating button. */
export function whatsappGeneral(): string {
  return whatsappUrl(`${site.whatsapp.greeting} I’d like to ask about your jewellery.`);
}

/** Enquiry about a specific piece: names the product so staff can answer immediately. */
export function whatsappForProduct(input: { name: string; sku?: string; url: string }): string {
  const ref = input.sku ? ` (ref ${input.sku})` : '';
  return whatsappUrl(
    `${site.whatsapp.greeting} I’m interested in the ${input.name}${ref}. Could you share the price and availability? ${input.url}`,
  );
}

/** Enquiry about a collection or category when no single piece has been chosen yet. */
export function whatsappForRange(name: string): string {
  return whatsappUrl(
    `${site.whatsapp.greeting} I’d like to see what you have in the ${name}. Could you send a few pieces with weights and prices?`,
  );
}

/** Enquiry about today's rate, used on the gold rate page. */
export function whatsappGoldRate(): string {
  return whatsappUrl(
    `${site.whatsapp.greeting} could you confirm today’s gold rate and your making charges?`,
  );
}

/** Request a bespoke design consultation. */
export function whatsappCustom(): string {
  return whatsappUrl(`${site.whatsapp.greeting} I’d like to discuss a custom jewellery design.`);
}

/** Ask about exchanging old gold. */
export function whatsappExchange(): string {
  return whatsappUrl(
    `${site.whatsapp.greeting} I’d like to exchange old gold. What do I need to bring?`,
  );
}

/** Book a visit for a bridal consultation. */
export function whatsappVisit(): string {
  return whatsappUrl(
    `${site.whatsapp.greeting} I’d like to visit the shop for a consultation. When is a good time?`,
  );
}
