/**
 * Opening-hours text for branches. One place decides how hours read, so a store card, the footer
 * and the store page can never disagree (for example about the Friday prayer break).
 */
import type { Branch, DayName, OpeningHours } from '@/data/site';

export const WEEK: DayName[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

/** "22:30:00" -> "22:30" */
export const hhmm = (time: string) => time.slice(0, 5);

export interface DayRow {
  day: DayName;
  /** "10:00–22:30" or "10:00–12:00, 14:30–22:30" when a break applies. */
  text: string;
}

/** One row per day of the week, with any break split into two opening periods. */
export function weeklyRows(branch: Branch): DayRow[] {
  const hours = branch.hours;
  if (!hours) return [];
  return WEEK.flatMap((day) => {
    const row: OpeningHours | undefined = hours.weekly.find((h) => h.days.includes(day));
    if (!row) return [{ day, text: 'Closed' }];
    const pause = hours.breaks?.find((b) => b.days.includes(day));
    const text = pause
      ? `${hhmm(row.opens)}–${hhmm(pause.from)}, ${hhmm(pause.to)}–${hhmm(row.closes)}`
      : `${hhmm(row.opens)}–${hhmm(row.closes)}`;
    return [{ day, text }];
  });
}

/**
 * One line for cards and the footer: "10:00–22:30 daily, Friday break 12:00–14:30".
 * Says "daily" only when a single timetable covers all seven days.
 */
export function hoursSummary(branch: Branch): string {
  const hours = branch.hours;
  if (!hours || hours.weekly.length === 0) return 'Call ahead for today’s hours';
  const [first] = hours.weekly;
  const everyDay = hours.weekly.length === 1 && first && first.days.length === 7;
  const base =
    everyDay && first
      ? `${hhmm(first.opens)}–${hhmm(first.closes)} daily`
      : hours.weekly
          .map(
            (h) =>
              `${h.days.map((d) => d.slice(0, 3)).join(', ')} ${hhmm(h.opens)}–${hhmm(h.closes)}`,
          )
          .join('; ');
  const breaks = (hours.breaks ?? [])
    .map((b) => `${b.days.join(', ')} break ${hhmm(b.from)}–${hhmm(b.to)}`)
    .join('; ');
  return breaks ? `${base}, ${breaks}` : base;
}
