/**
 * /api/contact.php on Cloudflare Pages: the PUBLIC_FORM_ENDPOINT default, so the same build
 * posts to public/api/contact.php on the Apache host and to the function here. The handlers
 * live in contact.ts; Pages routes this file by its name without the .ts extension.
 */
export { onRequest, onRequestPost } from './contact';
