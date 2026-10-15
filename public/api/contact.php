<?php
/**
 * Contact-form endpoint for the Apache/PHP host (docs/design-system-v2.md §5.6 ContactForm).
 * Accepts a POST from the visit form (/contact/, branch pages), the custom-jewellery brief and
 * older single-message forms, and emails the store. Replace it with Formspree, Web3Forms or any
 * other provider by changing PUBLIC_FORM_ENDPOINT; nothing else in the site depends on this file.
 *
 * Fields: name (required); contact_method (whatsapp | call | email; email when absent); email
 * (required, and valid, only when the method is email; otherwise optional but validated when
 * given); phone (required when the method is whatsapp or call); form (visit | brief); branch,
 * topic, reference; visit_day (YYYY-MM-DD), visit_window (Morning | Afternoon | Evening),
 * language; guidance (yes); message (required for a brief and for the older forms).
 *
 * Spam defences: honeypot field, minimum fill time, size limits, header-injection stripping.
 * Set the recipient below.
 */
declare(strict_types=1);

const RECIPIENT     = 'hello@classicgroup.ae';   // TODO(owner): confirm the inbox for enquiries
const SUBJECT       = 'Website enquiry - classicjewels.ae';
const SITE_ORIGIN   = 'https://classicjewels.ae';
const THANK_YOU_URL = '/thank-you/';
const MIN_FILL_SECS = 3;
const THANKS        = 'Thank you. We have your message and reply during shop hours.';

function respond(int $status, string $message, bool $wantsJson): never
{
    if ($wantsJson) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $status < 400, 'message' => $message]);
    } elseif ($status < 400) {
        header('Location: ' . THANK_YOU_URL, true, 303);
    } else {
        http_response_code($status);
        header('Content-Type: text/plain; charset=utf-8');
        echo $message . "\n\nPlease go back and try again, or WhatsApp us.";
    }
    exit;
}

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, 'Method not allowed.', $wantsJson);
}
// Same-origin only: browsers send Origin on cross-site POSTs; a missing header is a plain form post.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && $origin !== SITE_ORIGIN) {
    respond(403, 'Forbidden.', $wantsJson);
}

$field = static fn(string $key, int $max): string => mb_substr(trim((string) ($_POST[$key] ?? '')), 0, $max);
/** A value from a fixed list, or '' for anything else. */
$oneOf = static fn(string $key, array $allowed): string => in_array($field($key, 40), $allowed, true) ? $field($key, 40) : '';

// Honeypot: real users never see or fill this field.
if ($field('website', 10) !== '') {
    respond(200, 'Thank you.', $wantsJson); // pretend success so bots learn nothing
}
// Time trap: src/scripts/form.ts sends how long the form was open, measured on the visitor's
// device (fill_ms). Comparing two clocks would drop real enquiries whenever a phone's clock runs
// ahead of the server, so only the device's own elapsed time is used. Without JavaScript the field
// is absent and the check is skipped. Suppressed submissions are logged for audit.
$fillMs = isset($_POST['fill_ms']) && $_POST['fill_ms'] !== '' ? (int) $_POST['fill_ms'] : -1;
if ($fillMs >= 0 && $fillMs < MIN_FILL_SECS * 1000) {
    error_log('classicjewels contact: submission suppressed by time trap (' . $fillMs . ' ms)');
    respond(200, 'Thank you.', $wantsJson);
}

$form     = $oneOf('form', ['visit', 'brief']);
$method   = $oneOf('contact_method', ['whatsapp', 'call', 'email']) ?: 'email';
$name     = $field('name', 120);
$email    = $field('email', 200);
$phone    = $field('phone', 40);
$topic    = $field('topic', 60);
$branch   = $field('branch', 80);
$ref      = $field('reference', 40);
$language = $field('language', 40);
$window   = $oneOf('visit_window', ['Morning', 'Afternoon', 'Evening']);
$guidance = $field('guidance', 3) === 'yes' ? 'Yes' : '';
$message  = $field('message', 4000);

// A visit day is a date in the form the date input sends, and nothing else.
$day = $field('visit_day', 10);
$day = preg_match('/^\d{4}-\d{2}-\d{2}$/', $day) && checkdate((int) substr($day, 5, 2), (int) substr($day, 8, 2), (int) substr($day, 0, 4))
    ? $day
    : '';

$emailValid = $email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
$phoneValid = preg_match('/^\+?[\d\s().-]{7,40}$/', $phone) === 1;

if ($name === '') {
    respond(422, 'Please add your name.', $wantsJson);
}
if ($method === 'email' && !$emailValid) {
    respond(422, 'Please add a valid email address so we can reply by email.', $wantsJson);
}
if ($method !== 'email' && !$phoneValid) {
    respond(422, 'Please add a phone or WhatsApp number, with the country code, so we can reply.', $wantsJson);
}
if ($email !== '' && !$emailValid) {
    respond(422, 'Please check the email address, or leave it empty.', $wantsJson);
}
// A visit is complete without a message; a brief and the older forms are not.
if ($form !== 'visit' && $message === '') {
    respond(422, 'Please tell us a little about what you are looking for.', $wantsJson);
}

// Header values: strip line breaks (header injection) and MIME-encode anything non-ASCII.
$clean = static fn(string $s): string => str_replace(["\r", "\n"], ' ', $s);
$encode = static fn(string $s): string => mb_encode_mimeheader($clean($s), 'UTF-8', 'Q');

$lines = [
    'Form:      ' . ($form !== '' ? $form : 'message'),
    'Reply by:  ' . $method,
    'Name:      ' . $name,
    'Email:     ' . $email,
    'Phone:     ' . $phone,
    'Topic:     ' . $topic,
    'Branch:    ' . $branch,
    'Ref:       ' . $ref,
];
if ($form === 'visit') {
    $lines[] = 'Visit day: ' . ($day !== '' ? $day : 'not given');
    $lines[] = 'Time:      ' . ($window !== '' ? $window : 'any time');
}
if ($language !== '') {
    $lines[] = 'Language:  ' . $language;
}
if ($form === 'brief') {
    $lines[] = 'Guidance:  ' . ($guidance !== '' ? 'Yes, would like design guidance' : 'No');
}
$lines[] = 'Sent:      ' . gmdate('c');
$lines[] = '';
$lines[] = $message;
$body = implode("\n", $lines);

$headers = [
    'From: Classic Jewels Website <no-reply@classicjewels.ae>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'X-Mailer: classicjewels.ae',
];
// Only the validated address: a display name could smuggle extra recipients into the header.
if ($emailValid) {
    array_splice($headers, 1, 0, ['Reply-To: ' . $clean($email)]);
}

$label = $form === 'visit' ? 'Visit' : ($form === 'brief' ? 'Custom brief' : ($topic !== '' ? $topic : 'General'));
$subject = $encode(SUBJECT . ' - ' . $label . ($branch !== '' ? ' - ' . $branch : ''));
$sent = mail(RECIPIENT, $subject, $body, implode("\r\n", $headers));
if (!$sent) {
    respond(500, 'We could not send your message. Please WhatsApp us instead.', $wantsJson);
}
respond(200, THANKS, $wantsJson);
