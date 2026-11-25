// Student progress: the data saved to the account (Netlify Database, /api/progress).
// Pure functions only, so the scoring rules can be tested without a browser.
import { UNITS } from "../content";

export interface ExamWrong {
  /** Unit index. */
  u: number;
  q: string;
  /** Student's answer. */
  a: string;
  /** Correct answer. */
  c: string;
  /** Explanation. */
  e: string;
}

export interface ExamResult {
  date: number;
  score: number;
  total: number;
  grade: number;
  units: number[];
  wrong?: ExamWrong[];
}

export interface Progress {
  points: number;
  done: number;
  correct: number;
  /** Multiple-choice ids answered, "unit-question". */
  answered: string[];
  studied: number[];
  practiced: number[];
  /** Flashcards seen per unit. */
  flashSeen: Record<string, number[]>;
  listened: number[];
  exams: ExamResult[];
  /** Fill-in ids answered, "unit-item". */
  filled: string[];
  /** Dialogue sentences repeated per unit. */
  repeated: Record<string, number[]>;
  /** Reading answers per unit: question index → chosen option. */
  readAns: Record<string, Record<string, number>>;
  wrote: number[];
  writings: Record<string, string>;
  // ---- Dashboard data (since 1.4.0). Older accounts start these empty: nothing is back-filled. ----
  /** Wrong answers, "q:unit-question" (multiple choice) or "f:unit-item" (complete the sentence). */
  missed: string[];
  /** Local dates ("YYYY-MM-DD") on which the student studied, oldest first. */
  days: string[];
  /** Active study time in seconds (counted only on study screens while the student is active). */
  studySec: number;
  /** When the dashboard data started being recorded for this student (ms). 0 = not yet. */
  trackSince: number;
  /** Last activity done, used by "Continue aprendendo". */
  last: LastActivity | null;
  /** Recent activity history, oldest first (capped at MAX_LOG). */
  log: LogEntry[];
  /** Notifications seen up to this time (ms). */
  notifSeen: number;
}

/** Kinds of activity recorded in the history. */
export type ActivityKind = "study" | "mc" | "fill" | "flash" | "listen" | "repeat" | "read" | "write" | "exam" | "unit";

export interface LastActivity {
  k: ActivityKind;
  /** Unit index (-1 for the mock exam). */
  u: number;
  /** Item index inside the activity (question, sentence, flashcard…). */
  i?: number;
  t: number;
}

export interface LogEntry {
  k: ActivityKind;
  u: number;
  t: number;
  /** Correct answer? (answers only) */
  ok?: boolean;
  /** Exam grade (exam only). */
  g?: number;
}

export const FLASH_MIN = 6;
export const MAX_EXAMS = 10;
export const MAX_WRITING = 3000;
export const MAX_LOG = 200;
export const MAX_DAYS = 400;
export const MAX_MISSED = 600;

export type TaskKey = "studied" | "practiced" | "flash" | "listened";
export const TASKS: [TaskKey, string][] = [
  ["studied", "Conteúdo estudado"],
  ["practiced", "Prática concluída"],
  ["flash", "Flashcards revisados"],
  ["listened", "Listening ouvido"],
];
export const TOTAL_TASKS = UNITS.length * TASKS.length;

export function defaultProgress(): Progress {
  return {
    points: 0,
    done: 0,
    correct: 0,
    answered: [],
    studied: [],
    practiced: [],
    flashSeen: {},
    listened: [],
    exams: [],
    filled: [],
    repeated: {},
    readAns: {},
    wrote: [],
    writings: {},
    missed: [],
    days: [],
    studySec: 0,
    trackSince: 0,
    last: null,
    log: [],
    notifSeen: 0,
  };
}

/** Builds a valid Progress from saved data, keeping only known fields of the expected type. */
export function applyProgress(p: unknown): Progress {
  const base = defaultProgress() as unknown as Record<string, unknown>;
  if (p && typeof p === "object") {
    const src = p as Record<string, unknown>;
    for (const k of Object.keys(base)) {
      const v = src[k];
      if (v !== undefined && typeof v === typeof base[k] && Array.isArray(v) === Array.isArray(base[k])) base[k] = v;
    }
  }
  return base as unknown as Progress;
}

export function taskDone(p: Progress, key: TaskKey, i: number): boolean {
  return key === "flash" ? (p.flashSeen[i] || []).length >= FLASH_MIN : p[key].includes(i);
}
export const unitTasks = (p: Progress, i: number) => TASKS.filter((t) => taskDone(p, t[0], i)).length;
export const unitComplete = (p: Progress, i: number) => unitTasks(p, i) === TASKS.length;
export const completedUnits = (p: Progress) => UNITS.filter((_, i) => unitComplete(p, i)).length;
export const totalTasks = (p: Progress) => UNITS.reduce((s, _, i) => s + unitTasks(p, i), 0);
export const accuracy = (p: Progress) => (p.done ? Math.round((p.correct / p.done) * 100) : 0);
export const taskLabel = (key: TaskKey) => TASKS.find((t) => t[0] === key)![1];
export const pendingTasks = (p: Progress, i: number) => TASKS.filter((t) => !taskDone(p, t[0], i));

/** Units the student has started (opened, practiced or answered a question). Used to build the exam. */
export function studiedUnits(p: Progress): number[] {
  return UNITS.map((_, i) => i).filter(
    (i) => p.studied.includes(i) || p.practiced.includes(i) || p.answered.some((x) => x.startsWith(i + "-"))
  );
}
