<?php
/**
 * Minimal contact-form endpoint for the Apache/PHP host.
 * Accepts a POST from /contact/ and emails the store. Replace it with Formspree, Web3Forms or any
 * other provider by changing PUBLIC_FORM_ENDPOINT; nothing else in the site depends on this file.
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
        echo $message;
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

// Honeypot: real users never see or fill this field.
if ($field('website', 10) !== '') {
    respond(200, 'Thank you.', $wantsJson); // pretend success so bots learn nothing
}
// Time trap: src/scripts/form.ts sends how long the form was open, measured on the visitor's
// device (fill_ms). Comparing two clocks would drop real enquiries whenever a phone's clock runs
// ahead of the server, so only the device's own elapsed time is used. Without JavaScript the field
// is absent and the check is skipped. Suppressed submissions are logged for audit.
$fillMs = isset($_POST['fill_ms']) ? (int) $_POST['fill_ms'] : -1;
if ($fillMs >= 0 && $fillMs < MIN_FILL_SECS * 1000) {
    error_log('classicjewels contact: submission suppressed by time trap (' . $fillMs . ' ms)');
    respond(200, 'Thank you.', $wantsJson);
}

$name    = $field('name', 120);
$email   = $field('email', 200);
$phone   = $field('phone', 40);
$topic   = $field('topic', 60);
$branch  = $field('branch', 80);
$ref     = $field('reference', 40);
$message = $field('message', 4000);

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, 'Please fill in your name, a valid email address and a message.', $wantsJson);
}

// Header values: strip line breaks (header injection) and MIME-encode anything non-ASCII.
$clean = static fn(string $s): string => str_replace(["\r", "\n"], ' ', $s);
$encode = static fn(string $s): string => mb_encode_mimeheader($clean($s), 'UTF-8', 'Q');

$body = implode("\n", [
    'Name:    ' . $name,
    'Email:   ' . $email,
    'Phone:   ' . $phone,
    'Topic:   ' . $topic,
    'Branch:  ' . $branch,
    'Ref:     ' . $ref,
    'Sent:    ' . gmdate('c'),
    '',
    $message,
]);

$headers = [
    'From: Classic Jewels Website <no-reply@classicjewels.ae>',
    // Only the validated address: a display name could smuggle extra recipients into the header.
    'Reply-To: ' . $clean($email),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'X-Mailer: classicjewels.ae',
];

$subject = $encode(SUBJECT . ' - ' . ($topic !== '' ? $topic : 'General'));
$sent = mail(RECIPIENT, $subject, $body, implode("\r\n", $headers));
if (!$sent) {
    respond(500, 'We could not send your message. Please WhatsApp us instead.', $wantsJson);
}
respond(200, 'Thank you. We will reply within one working day.', $wantsJson);
