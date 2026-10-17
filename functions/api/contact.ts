/**
 * The contact-form endpoint on Cloudflare Pages: the same contract as public/api/contact.php,
 * which stays in place for the Apache host. Served at /api/contact and, through contact.php.ts,
 * at /api/contact.php (the PUBLIC_FORM_ENDPOINT default), so one build posts to the PHP file on
 * Apache and to this function on Pages without a host-specific setting.
 *
 * Fields: name (required); contact_method (whatsapp | call | email; email when absent); email
 * (required, and valid, only when the method is email; otherwise optional but validated when
 * given); phone (required when the method is whatsapp or call); form (visit | brief); branch,
 * topic, reference; visit_day (YYYY-MM-DD), visit_window (Morning | Afternoon | Evening);
 * language; guidance (yes); message (required for a brief and for the older forms).
 *
 * Answers: with "Accept: application/json" (src/scripts/form.ts) a JSON {ok, message} with the
 * status; otherwise (the form posted without JavaScript) 303 to /thank-you/ on success and, on an
 * error, a small HTML page with the message, a link back to the form (the Referer, same-origin
 * only, so the browser's Back keeps what was typed) and a link to the contact page for WhatsApp
 * and the landline.
 * Spam defences, as in the PHP file: honeypot ("website"), minimum fill time (fill_ms), size
 * limits, header-injection stripping, a same-origin check.
 *
 * The email goes out through Resend's HTTP API (no SMTP from the edge; free up to 3,000 messages
 * a month, docs/hosting-decision.md). The sender's domain must be verified in Resend first
 * (docs/deployment.md). Settings, wrangler.toml [vars] plus one Pages secret:
 *   RESEND_API_KEY   secret, required
 *   CONTACT_TO       the inbox for enquiries; several addresses separated by commas
 *   CONTACT_FROM     the sender, on the verified domain
 *   SITE_ORIGIN      the canonical origin
 */
import type { PagesFunction } from '../_lib/types';

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  SITE_ORIGIN?: string;
}

const RECIPIENT = 'hello@classicgroup.ae'; // TODO(owner): confirm the inbox for enquiries
const FROM = 'Classic Jewels Website <no-reply@classicjewels.ae>';
const SITE_ORIGIN = 'https://classicjewels.ae';
const SUBJECT = 'Website enquiry - classicjewels.ae';
const THANK_YOU_URL = '/thank-you/'; // routes.thankYou in src/lib/routes.ts
const CONTACT_URL = '/contact/'; // routes.contact: WhatsApp and the landline, from site.ts
const MIN_FILL_SECS = 3;
const MAX_BODY_BYTES = 64 * 1024;
const THANKS = 'Thank you. We have your message and reply during shop hours.';
const SEND_FAILED = 'We could not send your message. Please WhatsApp us instead.';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const RESEND_TIMEOUT_MS = 10_000;

const wantsJson = (request: Request): boolean =>
  (request.headers.get('Accept') ?? '').includes('application/json');

const escapeHtml = (s: string): string => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** The page the form was posted from, when it is one of ours; otherwise the contact page. */
function backUrl(request: Request, env: Env): string {
  const referer = request.headers.get('Referer') ?? '';
  const ours = new Set([new URL(request.url).origin, env.SITE_ORIGIN || SITE_ORIGIN]);
  try {
    const url = new URL(referer);
    if (ours.has(url.origin)) return url.pathname + url.search;
  } catch {
    /* no usable Referer */
  }
  return CONTACT_URL;
}

/** Without JavaScript an error lands here: the message, the way back, and the way to a person. */
function errorPage(message: string, back: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Message not sent</title>
<style>
body{margin:0;padding:3rem 1rem;font:1rem/1.6 system-ui,sans-serif}
main{max-width:34rem;margin:0 auto}
h1{font-size:1.5rem;font-weight:400}
</style>
</head>
<body>
<main>
<h1>We could not send your message</h1>
<p>${escapeHtml(message)}</p>
<ul>
<li><a href="${escapeHtml(back)}">Back to the form</a> (the Back button keeps what you typed)</li>
<li><a href="${CONTACT_URL}">WhatsApp or call the counter instead</a></li>
</ul>
</main>
</body>
</html>
`;
}

function respond(
  status: number,
  message: string,
  asJson: boolean,
  request: Request,
  env: Env = {},
): Response {
  const headers = new Headers({ 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  if (asJson) {
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return new Response(JSON.stringify({ ok: status < 400, message }), { status, headers });
  }
  if (status < 400) {
    headers.set('Location', new URL(THANK_YOU_URL, request.url).toString());
    return new Response(null, { status: 303, headers });
  }
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set(
    'Content-Security-Policy',
    "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'",
  );
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return new Response(errorPage(message, backUrl(request, env)), { status, headers });
}

/** mb_substr: the first `max` characters, counted in code points. */
const clip = (s: string, max: number): string => Array.from(s).slice(0, max).join('');
/** Header values: no line breaks (header injection). */
const clean = (s: string): string => s.replace(/[\r\n]+/g, ' ');
/** Close to PHP's FILTER_VALIDATE_EMAIL: one @, no spaces, a dotted domain, 254 characters at most. */
const isEmail = (s: string): boolean =>
  s.length <= 254 &&
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(
    s,
  );
const isPhone = (s: string): boolean => /^\+?[\d\s().-]{7,40}$/.test(s);
/** checkdate(): a real calendar day in the form the date input sends, and nothing else. */
function isCalendarDay(s: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!match) return false;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  return (
    month >= 1 && month <= 12 && day >= 1 && day <= new Date(Date.UTC(year, month, 0)).getUTCDate()
  );
}
/** gmdate('c'): 2026-10-15T09:30:00+00:00 */
const sentAt = (): string => new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');

/** Any other method, as the PHP file answers it. */
export const onRequest: PagesFunction<Env> = ({ request, env }) =>
  respond(405, 'Method not allowed.', wantsJson(request), request, env);

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const asJson = wantsJson(request);
  const reply = (status: number, message: string) => respond(status, message, asJson, request, env);

  // Same-origin only: browsers send Origin on cross-site POSTs; a missing header is a plain form
  // post. The deployment's own origin is accepted too, so preview deployments can be tested.
  const origin = request.headers.get('Origin') ?? '';
  const allowed = new Set([new URL(request.url).origin, env.SITE_ORIGIN || SITE_ORIGIN]);
  if (origin !== '' && !allowed.has(origin)) return reply(403, 'Forbidden.');

  const declared = Number.parseInt(request.headers.get('Content-Length') ?? '0', 10);
  if (declared > MAX_BODY_BYTES) return reply(413, 'The message is too long.');

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    data = new FormData(); // not a form body: validated below like an empty post
  }
  const field = (key: string, max: number): string => {
    const value = data.get(key);
    return typeof value === 'string' ? clip(value.trim(), max) : '';
  };
  /** A value from a fixed list, or '' for anything else. */
  const oneOf = (key: string, list: readonly string[]): string => {
    const value = field(key, 40);
    return list.includes(value) ? value : '';
  };

  // Honeypot: real users never see or fill this field. Pretend success so bots learn nothing.
  if (field('website', 10) !== '') return reply(200, 'Thank you.');
  // Time trap: form.ts sends how long the form was open, measured on the visitor's device
  // (fill_ms). Without JavaScript the field is absent and the check is skipped.
  const fillRaw = data.get('fill_ms');
  const fillMs =
    typeof fillRaw === 'string' && fillRaw !== '' ? Number.parseInt(fillRaw, 10) || 0 : -1;
  if (fillMs >= 0 && fillMs < MIN_FILL_SECS * 1000) {
    console.warn(`classicjewels contact: submission suppressed by time trap (${fillMs} ms)`);
    return reply(200, 'Thank you.');
  }

  const form = oneOf('form', ['visit', 'brief']);
  const method = oneOf('contact_method', ['whatsapp', 'call', 'email']) || 'email';
  const name = field('name', 120);
  const email = field('email', 200);
  const phone = field('phone', 40);
  const topic = field('topic', 60);
  const branch = field('branch', 80);
  const ref = field('reference', 40);
  const language = field('language', 40);
  const window = oneOf('visit_window', ['Morning', 'Afternoon', 'Evening']);
  const guidance = field('guidance', 3) === 'yes';
  const message = field('message', 4000);
  const rawDay = field('visit_day', 10);
  const day = isCalendarDay(rawDay) ? rawDay : '';

  const emailValid = email !== '' && isEmail(email);
  const phoneValid = isPhone(phone);

  if (name === '') return reply(422, 'Please add your name.');
  if (method === 'email' && !emailValid) {
    return reply(422, 'Please add a valid email address so we can reply by email.');
  }
  if (method !== 'email' && !phoneValid) {
    return reply(
      422,
      'Please add a phone or WhatsApp number, with the country code, so we can reply.',
    );
  }
  if (email !== '' && !emailValid) {
    return reply(422, 'Please check the email address, or leave it empty.');
  }
  // A visit is complete without a message; a brief and the older forms are not.
  if (form !== 'visit' && message === '') {
    return reply(422, 'Please tell us a little about what you are looking for.');
  }

  const lines = [
    `Form:      ${form !== '' ? form : 'message'}`,
    `Reply by:  ${method}`,
    `Name:      ${name}`,
    `Email:     ${email}`,
    `Phone:     ${phone}`,
    `Topic:     ${topic}`,
    `Branch:    ${branch}`,
    `Ref:       ${ref}`,
  ];
  if (form === 'visit') {
    lines.push(`Visit day: ${day !== '' ? day : 'not given'}`);
    lines.push(`Time:      ${window !== '' ? window : 'any time'}`);
  }
  if (language !== '') lines.push(`Language:  ${language}`);
  if (form === 'brief') {
    lines.push(`Guidance:  ${guidance ? 'Yes, would like design guidance' : 'No'}`);
  }
  lines.push(`Sent:      ${sentAt()}`, '', message);

  const label =
    form === 'visit'
      ? 'Visit'
      : form === 'brief'
        ? 'Custom brief'
        : topic !== ''
          ? topic
          : 'General';
  const subject = clean(`${SUBJECT} - ${label}${branch !== '' ? ` - ${branch}` : ''}`);

  const mail: Record<string, unknown> = {
    from: env.CONTACT_FROM || FROM,
    to: (env.CONTACT_TO || RECIPIENT)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    subject,
    text: lines.join('\n'),
    headers: { 'X-Mailer': 'classicjewels.ae' },
  };
  // Only the validated address: a display name could smuggle extra recipients into the header.
  if (emailValid) mail.reply_to = clean(email);

  const key = env.RESEND_API_KEY;
  if (!key) {
    console.error('classicjewels contact: RESEND_API_KEY is not set');
    return reply(500, SEND_FAILED);
  }
  try {
    const sent = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(mail),
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
    });
    if (!sent.ok) {
      const detail = (await sent.text()).slice(0, 300);
      console.error(`classicjewels contact: Resend answered HTTP ${sent.status}: ${detail}`);
      return reply(500, SEND_FAILED);
    }
  } catch (error) {
    console.error(
      'classicjewels contact: sending failed:',
      error instanceof Error ? error.message : error,
    );
    return reply(500, SEND_FAILED);
  }
  return reply(200, THANKS);
};
