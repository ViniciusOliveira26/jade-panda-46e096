// Activity tracking for the dashboard: study days (streak), study time, last activity and history.
// Pure helpers that change a progress draft; actions.ts calls them inside updateProgress().
import { MAX_DAYS, MAX_LOG, type ActivityKind, type LogEntry, type Progress } from "./progress";

/** Local calendar date, "YYYY-MM-DD". */
export function dayKey(d: Date = new Date()): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function addDays(key: string, n: number): string {
  const [y, m, d] = key.split("-").map(Number);
  return dayKey(new Date(y, m - 1, d + n));
}

/** Marks today as a study day and starts the dashboard tracking if needed. */
export function markStudyDay(d: Progress, now = Date.now()) {
  if (!d.trackSince) d.trackSince = now;
  const today = dayKey(new Date(now));
  if (d.days[d.days.length - 1] !== today && !d.days.includes(today)) d.days = [...d.days, today].slice(-MAX_DAYS);
}

/**
 * Records an activity: updates "last activity" (unless `keepLast`), the history and today's study day.
 * `i` is the item inside the activity (question, sentence, card…), used to resume where the student stopped.
 */
export function stamp(d: Progress, k: ActivityKind, u: number, extra: { i?: number; ok?: boolean; g?: number; keepLast?: boolean } = {}, now = Date.now()) {
  markStudyDay(d, now);
  if (!extra.keepLast) d.last = { k, u, t: now, ...(extra.i !== undefined ? { i: extra.i } : {}) };
  const entry: LogEntry = { k, u, t: now };
  if (extra.ok !== undefined) entry.ok = extra.ok;
  if (extra.g !== undefined) entry.g = Math.round(extra.g * 10) / 10;
  d.log = [...d.log, entry].slice(-MAX_LOG);
}

/** Adds active study seconds. */
export function addStudyTime(d: Progress, sec: number, now = Date.now()) {
  if (!(sec > 0)) return;
  d.studySec = Math.floor((Number.isFinite(d.studySec) ? d.studySec : 0) + sec);
  markStudyDay(d, now);
}

/**
 * Consecutive study days ending today (or yesterday, if the student hasn't studied yet today).
 * `today` is "YYYY-MM-DD".
 */
export function streak(days: string[], today = dayKey()): number {
  const set = new Set(days);
  let cur = set.has(today) ? today : addDays(today, -1);
  let n = 0;
  while (set.has(cur)) {
    n++;
    cur = addDays(cur, -1);
  }
  return n;
}

export const studiedToday = (days: string[], today = dayKey()) => days.includes(today);

/** "1 h 25 min", "12 min", "menos de 1 min". */
export function formatDuration(sec: number): string {
  const min = Math.floor((sec || 0) / 60);
  if (min < 1) return sec > 0 ? "menos de 1 min" : "0 min";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h} h${m ? ` ${m} min` : ""}` : `${m} min`;
}

/** "agora mesmo", "há 5 minutos", "há 3 horas", "ontem", "há 4 dias", or the date. */
export function timeAgo(t: number, now = Date.now()): string {
  const s = Math.max(0, Math.round((now - t) / 1000));
  if (s < 60) return "agora mesmo";
  const min = Math.round(s / 60);
  if (min < 60) return `há ${min} minuto${min > 1 ? "s" : ""}`;
  const h = Math.round(min / 60);
  if (h < 24) return `há ${h} hora${h > 1 ? "s" : ""}`;
  const days = Math.round(h / 24);
  if (days === 1) return "ontem";
  if (days < 30) return `há ${days} dias`;
  return new Date(t).toLocaleDateString("pt-BR");
}
