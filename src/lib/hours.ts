/**
 * Opening-hours text and data for branches. One place decides how hours read, so a door, the
 * footer, the branch ledger, the JSON-LD and the open-now script can never disagree (for example
 * about the Friday prayer break).
 *
 * Hours render wherever `hours.weekly` exists: the business published them on its Google listing.
 * While `hours.confirmed` is false every rendering carries the caption built by `hoursCaption`
 * ("As listed on Google, checked 15 October 2026", from `hours.source`); once the company confirms
 * the timetable the caption goes. The week is printed Saturday first, as the Gulf reads it, so the
 * usual timetable collapses to "Saturday to Thursday" with Friday on its own.
 */
import type { Branch, DayName } from '@/data/site';

/** The week as the site prints it: Saturday first, Friday last. */
export const WEEK: DayName[] = [
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
];

/** The week as schema.org and most readers expect it. */
const ISO_WEEK: DayName[] = [
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

/** One stretch of opening, "HH:MM:SS" to "HH:MM:SS". */
export interface Period {
  opens: string;
  closes: string;
}

/** The open periods of one day, with any break cut out: Friday 10:00 to 12:00 and 14:30 to 22:30. */
export function dayPeriods(branch: Branch, day: DayName): Period[] {
  const hours = branch.hours;
  const row = hours?.weekly.find((h) => h.days.includes(day));
  if (!hours || !row) return [];
  const pauses = (hours.breaks ?? [])
    .filter((b) => b.days.includes(day))
    .sort((a, b) => a.from.localeCompare(b.from));
  const periods: Period[] = [];
  let opens = row.opens;
  for (const pause of pauses) {
    if (pause.from <= opens || pause.to >= row.closes) continue;
    periods.push({ opens, closes: pause.from });
    opens = pause.to;
  }
  periods.push({ opens, closes: row.closes });
  return periods;
}

/** "10:00 to 22:30", or "10:00 to 12:00 and 14:30 to 22:30" when a break splits the day. */
export const periodsText = (periods: Period[]): string =>
  periods.map((p) => `${hhmm(p.opens)} to ${hhmm(p.closes)}`).join(' and ');

/** "Friday", "Saturday and Sunday", "Saturday to Thursday". */
export function daysLabel(days: DayName[]): string {
  const first = days[0] ?? '';
  const last = days[days.length - 1] ?? first;
  if (days.length === 1) return first;
  if (days.length === 2) return `${first} and ${last}`;
  return `${first} to ${last}`;
}

export interface HoursRun {
  days: DayName[];
  /** "Saturday to Thursday" */
  label: string;
  /** "10:00 to 22:30", "10:00 to 12:00 and 14:30 to 22:30" or "Closed" */
  text: string;
}

/**
 * The week collapsed into runs of days with the same timetable, in week order. The first and last
 * runs join when they match across the week's end, so "Friday to Sunday" reads as one run.
 */
export function hoursRuns(branch: Branch): HoursRun[] {
  if (!branch.hours?.weekly.length) return [];
  const runs: HoursRun[] = [];
  for (const day of WEEK) {
    const periods = dayPeriods(branch, day);
    const text = periods.length > 0 ? periodsText(periods) : 'Closed';
    const last = runs[runs.length - 1];
    if (last && last.text === text) last.days.push(day);
    else runs.push({ days: [day], label: '', text });
  }
  const first = runs[0];
  const last = runs[runs.length - 1];
  if (first && last && runs.length > 1 && first.text === last.text) {
    runs.pop();
    first.days = [...last.days, ...first.days];
  }
  for (const run of runs) run.label = daysLabel(run.days);
  return runs;
}

/** One line: "Saturday to Thursday 10:00 to 22:30; Friday 10:00 to 12:00 and 14:30 to 22:30". */
export function hoursLine(branch: Branch): string {
  return hoursRuns(branch)
    .map((run) => `${run.label} ${run.text}`)
    .join('; ');
}

/** The break labels: "Friday prayer break, 12:00 to 14:30"; "Afternoon break, Monday to Thursday, 13:30 to 16:00". */
export function breakLines(branch: Branch): string[] {
  return (branch.hours?.breaks ?? []).map((b) => {
    const when = daysLabel(b.days);
    const named = b.days.length === 1 && b.label.includes(when);
    return [b.label, named ? undefined : when, `${hhmm(b.from)} to ${hhmm(b.to)}`]
      .filter(Boolean)
      .join(', ');
  });
}

/**
 * The caption every unconfirmed timetable carries: "As listed on Google, checked 15 October 2026"
 * (from `hours.source`). Nothing once the company has confirmed the hours.
 */
export function hoursCaption(branch: Branch): string | undefined {
  const hours = branch.hours;
  if (!hours || hours.confirmed) return undefined;
  const google = /^Google listing, (.+)$/.exec(hours.source ?? '');
  if (google) return `As listed on Google, checked ${google[1]}`;
  return hours.source ? `As listed: ${hours.source}` : 'Hours to be confirmed';
}

/** Per-timetable day groups for OpeningHoursSpecification: a split Friday appears twice. */
export function openingSpecs(branch: Branch): { days: DayName[]; opens: string; closes: string }[] {
  const specs: { days: DayName[]; opens: string; closes: string }[] = [];
  for (const day of ISO_WEEK) {
    for (const period of dayPeriods(branch, day)) {
      const same = specs.find((s) => s.opens === period.opens && s.closes === period.closes);
      if (same) same.days.push(day);
      else specs.push({ days: [day], ...period });
    }
  }
  return specs;
}

/**
 * What the open-now script reads (src/scripts/open-now.ts): the week's open periods as JSON,
 * {"Saturday":"10:00-22:30","Friday":"10:00-12:00,14:30-22:30"}. Undefined without hours.
 */
export function openNowData(branch: Branch): string | undefined {
  if (!branch.hours?.weekly.length) return undefined;
  const week: Partial<Record<DayName, string>> = {};
  for (const day of WEEK) {
    const periods = dayPeriods(branch, day);
    if (periods.length > 0)
      week[day] = periods.map((p) => `${hhmm(p.opens)}-${hhmm(p.closes)}`).join(',');
  }
  return JSON.stringify(week);
}
