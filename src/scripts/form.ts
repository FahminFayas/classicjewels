/**
 * Small enhancements that need no framework:
 *  - [data-copy]: copies a product reference to the clipboard and confirms inline.
 *  - form[data-enhance]: submits the contact form with fetch and shows the result in place.
 *    Without JavaScript the form posts normally and the endpoint redirects to /thank-you/.
 */

// ---------- Copy reference ----------
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
  const label = button.querySelector<HTMLElement>('[data-copy-label]') ?? button;
  const original = label.textContent;
  button.addEventListener('click', async () => {
    const value = button.dataset.copy ?? '';
    try {
      await navigator.clipboard.writeText(value);
      label.textContent = 'Copied';
      button.dataset.copied = 'true';
    } catch {
      label.textContent = value;
    }
    window.setTimeout(() => {
      label.textContent = original;
      delete button.dataset.copied;
    }, 2000);
  });
}

// ---------- Contact form ----------
const form = document.querySelector<HTMLFormElement>('form[data-enhance]');
if (form) {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const say = (message: string, tone: 'ok' | 'err') => {
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone;
    status.hidden = false;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    submit?.setAttribute('aria-busy', 'true');
    submit?.setAttribute('disabled', '');
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const body = (await res.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
      } | null;
      if (res.ok && body?.ok !== false) {
        say(body?.message ?? 'Thank you. We will reply within one working day.', 'ok');
        form.reset();
        form.querySelector<HTMLElement>('[data-form-fields]')?.setAttribute('hidden', '');
      } else {
        say(body?.message ?? 'We could not send your message. Please WhatsApp us instead.', 'err');
      }
    } catch {
      say('We could not send your message. Please WhatsApp us instead.', 'err');
    } finally {
      submit?.removeAttribute('aria-busy');
      submit?.removeAttribute('disabled');
    }
  });
}
