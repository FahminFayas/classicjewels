/**
 * The open-now line (docs/design-system-v2.md §7, the open-status row): "Open now, until 22:30",
 * "Closed now, opens at 14:30" or "Closed now, opens tomorrow at 10:00". Loaded by StoreCard and
 * the branch ledger. Budget 0.5 KB minified.
 *
 * Every [data-open-now] carries the week's open periods as JSON written by src/lib/hours.ts
 * ({"Friday":"10:00-12:00,14:30-22:30"}, periods in order). The line is worked out in Asia/Dubai
 * time whatever the visitor's clock says, and refreshed each minute. Without the script the
 * element stays empty: the printed hours are the fact, this line only reads them against the clock.
 */
const DAYS = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(',');
const clock = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Dubai',
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

const update = () => {
  const at: Record<string, string> = {};
  for (const p of clock.formatToParts(new Date())) at[p.type] = p.value;
  const day = DAYS.indexOf(at.weekday!);
  const now = `${at.hour}:${at.minute}`;
  for (const el of document.querySelectorAll<HTMLElement>('[data-open-now]')) {
    const week: Record<string, string> = JSON.parse(el.dataset.openNow!);
    let text = '';
    // Today: the first period that has not ended decides, open inside it or closed before it.
    for (const span of (week[DAYS[day]!] || '').split(',')) {
      const [from, to] = span.split('-');
      if (span && now < to!) {
        text = now < from! ? `Closed now, opens at ${from}` : `Open now, until ${to}`;
        break;
      }
    }
    // Otherwise the next day that opens.
    for (let i = 1; !text && i < 8; i += 1) {
      const name = DAYS[(day + i) % 7]!;
      const next = week[name];
      if (next)
        text = `Closed now, opens ${i > 1 ? `on ${name}` : 'tomorrow'} at ${next.split('-')[0]}`;
    }
    el.textContent = text;
    el.dataset.state = text[0] == 'O' ? 'open' : 'closed';
  }
};
update();
setInterval(update, 6e4);

// A module, so its top-level names stay local (scripts without imports share one scope).
export {};
