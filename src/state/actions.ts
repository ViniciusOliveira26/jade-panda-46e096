// Everything that changes the student's progress (points, tasks, answers) lives here.
import { UNITS } from "../content";
import type { Question } from "../content/types";
import { norm } from "../utils/text";
import {
  FLASH_MIN,
  MAX_EXAMS,
  MAX_MISSED,
  MAX_WRITING,
  completedUnits,
  defaultProgress,
  taskDone,
  taskLabel,
  unitComplete,
  type ActivityKind,
  type ExamResult,
  type Progress,
  type TaskKey,
} from "./progress";
import { stamp } from "./activity";
import { getProgress, setProgress, updateProgress } from "./store";
import { toast } from "./toasts";

/** Marks one of the 4 tasks of a unit as done (only once) and announces it. */
export function markTask(key: TaskKey, i: number, apply?: (d: Progress) => void) {
  const p = getProgress();
  if (taskDone(p, key, i)) return;
  const wasComplete = unitComplete(p, i);
  updateProgress((d) => {
    if (apply) apply(d);
    else if (key !== "flash") d[key].push(i);
    if (!wasComplete && unitComplete(d, i)) stamp(d, "unit", i, { keepLast: true });
  });
  toast(`✅ Progresso atualizado · Unidade ${i + 1}: ${taskLabel(key)}`);
  const now = getProgress();
  if (!wasComplete && unitComplete(now, i))
    setTimeout(() => toast(`🏆 Unidade ${i + 1} concluída! (${completedUnits(getProgress())}/${UNITS.length} unidades)`), 400);
}

/**
 * Records that the student is doing an activity (opening a unit, playing the dialogue, turning a card…):
 * updates "last activity", today's study day and the history. Repeating the same item within 5 minutes
 * is not logged again.
 */
export function recordActivity(k: ActivityKind, u: number, i?: number) {
  const last = getProgress().last;
  if (last && last.k === k && last.u === u && last.i === i && Date.now() - last.t < 5 * 60_000) return;
  updateProgress((d) => stamp(d, k, u, { i }));
}

/** Records that a flashcard was turned. */
export function seeCard(i: number, card: number) {
  const seen = getProgress().flashSeen[i] || [];
  if (seen.includes(card)) return recordActivity("flash", i, card);
  const add = (d: Progress) => {
    d.flashSeen[i] = [...seen, card];
    stamp(d, "flash", i, { i: card });
  };
  if (seen.length === FLASH_MIN - 1) markTask("flash", i, add);
  else updateProgress(add);
}

/** Multiple-choice answer. Returns whether it was correct, or null if already answered. */
export function answerQuestion(i: number, qIndex: number, a: number): boolean | null {
  const id = i + "-" + qIndex;
  if (getProgress().answered.includes(id)) return null;
  const ok = a === UNITS[i].questions[qIndex].answer;
  updateProgress((d) => {
    d.answered.push(id);
    d.done++;
    if (ok) {
      d.correct++;
      d.points += 10;
    } else d.missed = [...d.missed, "q:" + id].slice(-MAX_MISSED);
    stamp(d, "mc", i, { i: qIndex, ok });
  });
  return ok;
}

export function isFillCorrect(answers: string[], value: string): boolean {
  const v = norm(value);
  return answers.some((a) => norm(a) === v);
}

/** "Complete the sentence" answer. `reveal` = student asked to see the answer (counts as wrong). */
export function answerFill(i: number, fIndex: number, value: string, reveal: boolean): boolean | null {
  const id = i + "-" + fIndex;
  if (getProgress().filled.includes(id)) return null;
  const ok = !reveal && isFillCorrect(UNITS[i].fills[fIndex].answers, value);
  updateProgress((d) => {
    d.filled.push(id);
    d.done++;
    if (ok) {
      d.correct++;
      d.points += 10;
    } else d.missed = [...d.missed, "f:" + id].slice(-MAX_MISSED);
    stamp(d, "fill", i, { i: fIndex, ok });
  });
  return ok;
}

export function answerReading(i: number, k: number, j: number) {
  const a = getProgress().readAns[i] || {};
  if (a[k] !== undefined) return;
  const ok = j === UNITS[i].readingPractice.questions[k].answer;
  updateProgress((d) => {
    d.readAns[i] = { ...a, [k]: j };
    d.done++;
    if (ok) {
      d.correct++;
      d.points += 10;
    }
    stamp(d, "read", i, { i: k, ok });
  });
}

export function saveWriting(i: number, text: string) {
  const v = text.trim().slice(0, MAX_WRITING);
  const first = !!v && !getProgress().wrote.includes(i);
  updateProgress((d) => {
    d.writings[i] = v;
    if (first) {
      d.wrote.push(i);
      d.points += 20;
    }
    if (v) stamp(d, "write", i);
  });
  toast(first ? "✍️ Texto salvo! +20 pontos" : "💾 Texto salvo");
}

/** A dialogue sentence repeated with ≥50% accuracy. Returns true if it earned the +5 points. */
export function recordRepeat(i: number, k: number): boolean {
  const r = getProgress().repeated[i] || [];
  if (r.includes(k)) return false;
  updateProgress((d) => {
    d.repeated[i] = [...r, k];
    d.points += 5;
    stamp(d, "repeat", i, { i: k });
  });
  return true;
}

export interface ExamItem {
  q: Question;
  unit: number;
}
export interface ExamMistake extends ExamItem {
  a: number;
}

export function finishExam(items: ExamItem[], score: number, wrong: ExamMistake[]): ExamResult {
  const total = items.length;
  const result: ExamResult = {
    date: Date.now(),
    score,
    total,
    grade: (score / total) * 10,
    units: [...new Set(items.map((x) => x.unit))].sort((a, b) => a - b),
    wrong: wrong.map((x) => ({ u: x.unit, q: x.q.prompt, a: x.q.options[x.a], c: x.q.options[x.q.answer], e: x.q.explanation })),
  };
  updateProgress((d) => {
    d.exams = [...d.exams, result].slice(-MAX_EXAMS);
    stamp(d, "exam", -1, { g: result.grade, ok: result.grade >= 7 });
  });
  toast(`✅ Progresso atualizado · Simulado concluído: ${result.grade.toFixed(1)}/10`);
  return result;
}

export function resetProgress() {
  setProgress(defaultProgress());
}

/** The student opened the notifications panel. */
export function markNotificationsSeen(now = Date.now()) {
  if ((getProgress().notifSeen || 0) >= now) return;
  updateProgress((d) => {
    d.notifSeen = now;
  });
}
