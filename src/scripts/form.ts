/**
 * Small enhancements that need no framework (docs/design-system-v2.md §7, form.ts, ≤ 2.2 KB):
 *  - [data-copy]: copies a piece reference to the clipboard and confirms inline (PieceTicket).
 *  - form[data-enhance] (ContactForm):
 *      - prefills from ?piece=, ?reason= and ?branch= (the pages are static);
 *      - asks for the address the reply goes to: an email for "Send by email", a number for a
 *        call or WhatsApp reply to a brief (the messages live on the fields, data-need);
 *      - "Send on WhatsApp" (visit form) composes a wa.me message from every field and opens it;
 *      - anything else is posted with fetch and answered in place (the fallback wording lives on
 *        the status line: data-ok, data-err, data-sent).
 *    Without JavaScript the form posts normally and the endpoint redirects to /thank-you/.
 *    Before posting it records how long the form was open (fill_ms, from performance.now(), so it
 *    never depends on the device clock agreeing with the server's).
 */

// ---------- Copy reference ----------
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
  const label = button.querySelector<HTMLElement>('[data-copy-label]') ?? button;
  const original = label.textContent;
  button.addEventListener('click', async () => {
    const value = button.dataset.copy!; // present: the selector requires it
    try {
      await navigator.clipboard.writeText(value);
      label.textContent = 'Copied';
      button.dataset.copied = 'true';
    } catch {
      label.textContent = value;
    }
    setTimeout(() => {
      label.textContent = original;
      delete button.dataset.copied;
    }, 2000);
  });
}

// ---------- Contact form ----------
const form = document.querySelector<HTMLFormElement>('form[data-enhance]');
if (form) {
  const $ = <T extends Element = HTMLInputElement>(selector: string) =>
    form.querySelector<T>(selector);
  const status = $<HTMLElement>('[data-form-status]')!;
  const email = $('[name="email"]');
  const phone = $('[name="phone"]');
  const visit = form.dataset.variant === 'visit';
  // The handler validates (reportValidity), so a stale custom message never blocks a resubmit.
  form.noValidate = true;

  const say = (message = '', state = 'ok') => {
    status.textContent = message;
    status.dataset.state = state;
  };
  const tick = (selector: string) => {
    const input = $(selector);
    if (input) input.checked = true;
  };
  /** A required reply address: the field's own data-need message, or none (re-checked on every
      submit, so a filled field clears it). */
  const need = (field: HTMLInputElement | null, missing: boolean) =>
    field?.setCustomValidity(missing && !field.value.trim() ? field.dataset.need! : '');

  // Prefill: ?piece=CJ-NK-003 fills the reference and picks "A piece I saw".
  const query = new URLSearchParams(location.search);
  const piece = query.get('piece') ?? '';
  const reference = $('[name="reference"]');
  if (reference && /^[\w-]{3,40}$/.test(piece)) {
    reference.value = piece.toUpperCase();
    tick('[data-key="piece"]');
  }
  for (const [key, attr] of [
    ['reason', 'key'],
    ['branch', 'id'],
  ]) {
    const wanted = query.get(key!) ?? '';
    if (/^[\w-]+$/.test(wanted)) tick(`[data-${attr}="${wanted}"]`);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const submitter = event.submitter as HTMLButtonElement | null;
    if (submitter?.name) data.set(submitter.name, submitter.value);
    const method = data.get('contact_method') ?? 'email';
    const value = (key: string) => String(data.get(key) ?? '').trim();

    need(email, method === 'email');
    need(phone, !visit && method !== 'email');
    if (!form.reportValidity()) return;

    if (visit && method === 'whatsapp') {
      // Local noon, so the weekday is right in every time zone; British English, as every other
      // date on the site: "Saturday, 17 October 2026".
      const day = value('visit_day');
      const time = value('visit_window').toLowerCase();
      const lines = [
        `${form.dataset.greeting} I’d like to visit${value('branch') && ` the ${value('branch')} branch`}${
          day &&
          ` on ${new Date(`${day}T12:00`).toLocaleDateString('en-GB', { dateStyle: 'full' })}`
        }${time && ` (${time})`}.`,
        ...[
          ['Reason', 'topic'],
          ['Piece', 'reference'],
          ['Name', 'name'],
          ['Number', 'phone'],
          ['Email', 'email'],
        ].map(([label, key]) => value(key!) && `${label}: ${value(key!)}.`),
      ];
      const url = form.dataset.wa + encodeURIComponent(lines.filter(Boolean).join('\n'));
      const opened = open(url, '_blank');
      if (opened) opened.opener = null;
      else location.href = url;
      say(status.dataset.sent);
      return;
    }

    data.set('fill_ms', `${performance.now() | 0}`);
    const buttons = form.querySelectorAll('button');
    for (const b of buttons) b.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (res.ok && body.ok !== false) {
        say(body.message ?? status.dataset.ok);
        // Move focus to the confirmation before hiding the fields (the button had focus).
        status.focus();
        $<HTMLElement>('[data-form-fields]')!.hidden = true;
        $('[data-form-after]')?.removeAttribute('hidden');
      } else {
        say(body.message ?? status.dataset.err, 'err');
      }
    } catch {
      say(status.dataset.err, 'err');
    } finally {
      for (const b of buttons) b.disabled = false;
    }
  });
}
