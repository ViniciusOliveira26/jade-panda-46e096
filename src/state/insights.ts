// Dashboard intelligence: unit status on the path, "continue where you stopped", personalized
// recommendations and notifications. Pure functions of the student's saved progress (no invented data).
import { UNITS } from "../content";
import { sentences } from "../utils/text";
import { dayKey, streak, studiedToday } from "./activity";
import {
  FLASH_MIN,
  TASKS,
  completedUnits,
  pendingTasks,
  studiedUnits,
  taskDone,
  unitComplete,
  unitTasks,
  type ActivityKind,
  type Progress,
  type TaskKey,
} from "./progress";

// ---------------------------------------------------------------- unit status on the path

export type UnitState = "done" | "available" | "locked";

/**
 * Pedagogical sequence: unit 1 is always available; the next one is unlocked when the previous one is
 * completed. A unit the student has already started stays available.
 */
export function unitState(p: Progress, i: number): UnitState {
  if (unitComplete(p, i)) return "done";
  if (i === 0 || unitComplete(p, i - 1) || unitTasks(p, i) > 0) return "available";
  return "locked";
}

/** First unit not completed yet (where the student is on the path), or -1 when all are done. */
export const currentUnit = (p: Progress) => UNITS.findIndex((_, i) => !unitComplete(p, i));

export const unitPercent = (p: Progress, i: number) => Math.round((unitTasks(p, i) / TASKS.length) * 100);

// ---------------------------------------------------------------- navigation targets

export type TargetKind = "unit" | "practice" | "fill" | "vocab" | "listen" | "read" | "write" | "exam";
export interface Target {
  to: TargetKind;
  unit: number;
  /** Item to open (question, sentence, card, dialogue sentence). */
  index?: number;
}

const TASK_TARGET: Record<TaskKey, TargetKind> = { studied: "unit", practiced: "practice", flash: "vocab", listened: "listen" };

export const ACTIVITY_LABEL: Record<ActivityKind, string> = {
  study: "Conteúdo da unidade",
  mc: "Exercícios · múltipla escolha",
  fill: "Exercícios · complete a frase",
  flash: "Vocabulário · flashcards",
  listen: "Listening",
  repeat: "Listening · repetição de frases",
  read: "Exercícios · leitura",
  write: "Exercícios · escrita",
  exam: "Simulado",
  unit: "Unidade concluída",
};

const KINDS = Object.keys(ACTIVITY_LABEL) as ActivityKind[];

/** Next pending task on the path (or the mock exam when every unit is completed). */
export function nextStep(p: Progress): { target: Target; label: string } {
  const u = currentUnit(p);
  if (u < 0) return { target: { to: "exam", unit: -1 }, label: "Simulado" };
  const t = pendingTasks(p, u)[0];
  return { target: { to: TASK_TARGET[t[0]], unit: u }, label: t[1] };
}

export interface ContinueInfo {
  /** What the student did last (null = no activity recorded yet). */
  last: { label: string; unit: number; t: number; detail: string } | null;
  /** Where the button takes the student. */
  target: Target;
  cta: string;
  /** Short description of what comes next. */
  next: string;
}

const validUnit = (u: unknown): u is number => typeof u === "number" && Number.isInteger(u) && u >= 0 && u < UNITS.length;
const firstMissing = (ids: string[], u: number, n: number) => {
  for (let j = 0; j < n; j++) if (!ids.includes(u + "-" + j)) return j;
  return -1;
};

/** "Continue aprendendo": resumes the last activity where the student stopped. */
export function continueInfo(p: Progress): ContinueInfo {
  const step = nextStep(p);
  const fallback = (): Omit<ContinueInfo, "last"> => {
    if (step.target.to === "exam") return { target: step.target, cta: "Fazer o simulado", next: "Todas as unidades estão concluídas. Revise com um simulado." };
    return {
      target: step.target,
      cta: "Continuar",
      next: `Próximo passo: ${step.label} — Unidade ${step.target.unit + 1} · ${UNITS[step.target.unit].title}.`,
    };
  };
  const l = p.last;
  if (!l || !KINDS.includes(l.k) || (l.k !== "exam" && !validUnit(l.u)) || typeof l.t !== "number") return { last: null, ...fallback() };

  const unit = l.k === "exam" ? -1 : l.u;
  const idx = typeof l.i === "number" && l.i >= 0 ? l.i : undefined;
  const U = unit >= 0 ? UNITS[unit] : null;
  let detail = U ? `Unidade ${unit + 1} · ${U.title}` : "Simulado com as unidades estudadas";
  let resume: Omit<ContinueInfo, "last"> | null = null;

  if (U) {
    if (l.k === "mc") {
      const j = firstMissing(p.answered, unit, U.questions.length);
      if (idx !== undefined) detail += ` — questão ${Math.min(idx + 1, U.questions.length)} de ${U.questions.length}`;
      if (j >= 0) resume = { target: { to: "practice", unit, index: j }, cta: "Continuar exercícios", next: `Continue na questão ${j + 1} de ${U.questions.length}.` };
    } else if (l.k === "fill") {
      const j = firstMissing(p.filled, unit, U.fills.length);
      if (idx !== undefined) detail += ` — frase ${Math.min(idx + 1, U.fills.length)} de ${U.fills.length}`;
      if (j >= 0) resume = { target: { to: "fill", unit, index: j }, cta: "Continuar frases", next: `Continue na frase ${j + 1} de ${U.fills.length}.` };
    } else if (l.k === "flash") {
      const n = U.flashcards.length;
      const seen = (p.flashSeen[unit] || []).length;
      if (seen < n) {
        const card = idx !== undefined ? (idx + 1) % n : 0;
        resume = { target: { to: "vocab", unit, index: card }, cta: "Continuar flashcards", next: `${seen} de ${n} cartões revisados.` };
      }
    } else if (l.k === "listen" || l.k === "repeat") {
      const n = sentences(U.dialogue.text).length;
      const rep = (p.repeated[unit] || []).length;
      if (rep < n) {
        const k = l.k === "repeat" && idx !== undefined ? Math.min(idx + 1, n - 1) : 0;
        resume = { target: { to: "listen", unit, index: k }, cta: "Continuar listening", next: `${rep} de ${n} frases do diálogo repetidas.` };
      }
    } else if (l.k === "read") {
      const n = U.readingPractice.questions.length;
      const a = Object.keys(p.readAns[unit] || {}).length;
      if (a < n) resume = { target: { to: "read", unit }, cta: "Continuar leitura", next: `${a} de ${n} perguntas respondidas.` };
      else if (!p.wrote.includes(unit)) resume = { target: { to: "write", unit }, cta: "Ir para a escrita", next: "Leitura concluída. Agora escreva o seu texto." };
    } else if (l.k === "study" && !unitComplete(p, unit)) {
      const t = pendingTasks(p, unit).find((x) => x[0] !== "studied");
      if (t) resume = { target: { to: TASK_TARGET[t[0]], unit }, cta: "Continuar", next: `Próximo passo nesta unidade: ${t[1]}.` };
    }
  }
  return { last: { label: ACTIVITY_LABEL[l.k], unit, t: l.t, detail }, ...(resume ?? fallback()) };
}

// ---------------------------------------------------------------- performance summary

export interface Summary {
  coursePct: number;
  doneUnits: number;
  points: number;
  /** null = no answers yet. */
  accuracy: number | null;
  answers: number;
  studySec: number;
  streak: number;
  studiedToday: boolean;
  trackSince: number;
  /** Last 7 days, oldest first: [date, studied]. */
  week: [string, boolean][];
}

export function summary(p: Progress, today = dayKey()): Summary {
  const tasks = UNITS.reduce((s, _, i) => s + unitTasks(p, i), 0);
  const [y, m, d] = today.split("-").map(Number);
  const week: [string, boolean][] = [];
  for (let k = 6; k >= 0; k--) {
    const key = dayKey(new Date(y, m - 1, d - k));
    week.push([key, p.days.includes(key)]);
  }
  return {
    coursePct: Math.round((tasks / (UNITS.length * TASKS.length)) * 100),
    doneUnits: completedUnits(p),
    points: p.points,
    accuracy: p.done ? Math.round((p.correct / p.done) * 100) : null,
    answers: p.done,
    studySec: Number.isFinite(p.studySec) ? p.studySec : 0,
    streak: streak(p.days, today),
    studiedToday: studiedToday(p.days, today),
    trackSince: p.trackSince,
    week,
  };
}

// ---------------------------------------------------------------- recommendations

export type RecKind = "grammar" | "vocab" | "listening" | "reading" | "exam";
export interface Recommendation {
  id: string;
  kind: RecKind;
  title: string;
  reason: string;
  cta: string;
  target: Target;
  /** Higher = more urgent. */
  score: number;
}

const countPrefix = (ids: string[], prefix: string) => ids.filter((x) => typeof x === "string" && x.startsWith(prefix)).length;
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
const unitName = (u: number) => `Unidade ${u + 1} · ${UNITS[u].title}`;

/** Suggested activities, based on the student's mistakes, pending work and results. */
export function recommendations(p: Progress, max = 4): Recommendation[] {
  const out: Recommendation[] = [];
  const started = studiedUnits(p);
  const lastExam = p.exams[p.exams.length - 1];
  const examWrong = (u: number) => (Array.isArray(lastExam?.wrong) ? lastExam.wrong.filter((w) => w && w.u === u).length : 0);

  for (const u of UNITS.map((_, i) => i)) {
    const U = UNITS[u];
    const touched = started.includes(u) || unitTasks(p, u) > 0;
    const mcDone = countPrefix(p.answered, u + "-");
    const mcMiss = countPrefix(p.missed, `q:${u}-`);
    const fillMiss = countPrefix(p.missed, `f:${u}-`);
    const exWrong = examWrong(u);
    const ans = p.readAns[u] || {};
    const readWrong = U.readingPractice.questions.filter((q, k) => ans[k] !== undefined && ans[k] !== q.answer).length;

    // Grammar: wrong multiple-choice answers or exam mistakes in the unit.
    if (mcMiss >= 2 || (mcDone >= 3 && mcMiss / mcDone >= 0.3) || exWrong >= 2) {
      const parts = [];
      if (mcMiss) parts.push(`${plural(mcMiss, "erro", "erros")} na múltipla escolha`);
      if (exWrong) parts.push(`${plural(exWrong, "erro", "erros")} no último simulado`);
      out.push({
        id: `grammar-${u}`,
        kind: "grammar",
        title: "Reforçar gramática",
        reason: `${unitName(u)}: ${parts.join(" e ")}. Revise as explicações e os exemplos da unidade.`,
        cta: "Rever a gramática",
        target: { to: "unit", unit: u },
        score: 50 + 10 * (mcMiss + exWrong),
      });
    }
    // Vocabulary: wrong "complete the sentence" answers, or flashcards not reviewed in a started unit.
    if (fillMiss >= 2) {
      out.push({
        id: `vocab-fill-${u}`,
        kind: "vocab",
        title: "Revisar vocabulário",
        reason: `${unitName(u)}: ${plural(fillMiss, "frase", "frases")} de completar com erro. Revise as palavras nos flashcards.`,
        cta: "Revisar flashcards",
        target: { to: "vocab", unit: u },
        score: 45 + 10 * fillMiss,
      });
    } else if (touched && !taskDone(p, "flash", u)) {
      const seen = (p.flashSeen[u] || []).length;
      out.push({
        id: `vocab-flash-${u}`,
        kind: "vocab",
        title: "Revisar vocabulário",
        reason: `${unitName(u)}: você revisou ${seen} de ${U.flashcards.length} flashcards (mínimo ${FLASH_MIN} para concluir).`,
        cta: "Abrir flashcards",
        target: { to: "vocab", unit: u },
        score: 30 - u,
      });
    }
    // Listening: dialogue not heard yet, or few sentences repeated.
    if (touched && !p.listened.includes(u)) {
      out.push({
        id: `listen-${u}`,
        kind: "listening",
        title: "Praticar listening",
        reason: `${unitName(u)}: você ainda não ouviu o diálogo desta unidade.`,
        cta: "Ouvir o diálogo",
        target: { to: "listen", unit: u },
        score: 35 - u,
      });
    } else if (p.listened.includes(u)) {
      const n = sentences(U.dialogue.text).length;
      const rep = (p.repeated[u] || []).length;
      if (rep < Math.ceil(n / 2))
        out.push({
          id: `repeat-${u}`,
          kind: "listening",
          title: "Praticar listening",
          reason: `${unitName(u)}: você repetiu ${rep} de ${n} frases do diálogo. Treine a pronúncia repetindo em voz alta.`,
          cta: "Treinar a repetição",
          target: { to: "listen", unit: u },
          score: 20 - u,
        });
    }
    // Reading comprehension mistakes.
    if (readWrong >= 1) {
      out.push({
        id: `read-${u}`,
        kind: "reading",
        title: "Reler o texto",
        reason: `${unitName(u)}: ${plural(readWrong, "resposta errada", "respostas erradas")} na leitura. Leia o texto de novo com atenção.`,
        cta: "Abrir a leitura",
        target: { to: "read", unit: u },
        score: 30 + 10 * readWrong,
      });
    }
  }

  // Mock exam.
  const done = UNITS.map((_, i) => i).filter((i) => unitComplete(p, i));
  if (!lastExam) {
    if (done.length >= 1 || started.length >= 2)
      out.push({
        id: "exam-first",
        kind: "exam",
        title: "Fazer um simulado",
        reason: `Você já estudou ${plural(started.length, "unidade", "unidades")} e ainda não fez nenhum simulado. Teste o que aprendeu.`,
        cta: "Ir para o simulado",
        target: { to: "exam", unit: -1 },
        score: 40,
      });
  } else if (lastExam.grade < 7) {
    out.push({
      id: "exam-retry",
      kind: "exam",
      title: "Realizar novo simulado",
      reason: `Sua última nota foi ${(+lastExam.grade || 0).toFixed(1)}/10. Revise os erros e tente de novo.`,
      cta: "Refazer o simulado",
      target: { to: "exam", unit: -1 },
      score: 55,
    });
  } else {
    const fresh = done.filter((i) => !(Array.isArray(lastExam.units) && lastExam.units.includes(i)));
    if (fresh.length)
      out.push({
        id: "exam-new",
        kind: "exam",
        title: "Realizar novo simulado",
        reason: `Você concluiu ${plural(fresh.length, "unidade nova", "unidades novas")} desde o último simulado.`,
        cta: "Fazer o simulado",
        target: { to: "exam", unit: -1 },
        score: 35,
      });
  }

  // One suggestion per skill (the most urgent), so the list stays varied.
  const best = new Map<RecKind, Recommendation>();
  for (const r of out) if (!best.has(r.kind) || best.get(r.kind)!.score < r.score) best.set(r.kind, r);
  return [...best.values()].sort((a, b) => b.score - a.score).slice(0, max);
}

// ---------------------------------------------------------------- notifications

export interface Notice {
  id: string;
  t: number;
  text: string;
  tone: "green" | "orange" | "blue";
}

/** Notifications from real events (units completed, exams) plus a streak reminder. Newest first. */
export function notifications(p: Progress, now = Date.now()): Notice[] {
  const list: Notice[] = [];
  for (const e of p.log) {
    if (!e || typeof e.t !== "number") continue;
    if (e.k === "unit" && validUnit(e.u)) {
      const next = e.u + 1 < UNITS.length ? ` A Unidade ${e.u + 2} foi liberada.` : " Você concluiu o curso!";
      list.push({ id: `unit-${e.u}-${e.t}`, t: e.t, tone: "green", text: `Unidade ${e.u + 1} concluída!${next}` });
    } else if (e.k === "exam" && typeof e.g === "number") {
      list.push({ id: `exam-${e.t}`, t: e.t, tone: e.g >= 7 ? "green" : "orange", text: `Simulado concluído: nota ${e.g.toFixed(1)}/10.` });
    }
  }
  const today = dayKey(new Date(now));
  const s = streak(p.days, today);
  if (s > 0 && !studiedToday(p.days, today)) {
    const d = new Date(now);
    const midnight = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    list.push({ id: `streak-${today}`, t: midnight, tone: "orange", text: `Estude hoje para manter sua sequência de ${plural(s, "dia", "dias")}.` });
  }
  return list.sort((a, b) => b.t - a.t).slice(0, 12);
}

export const unreadCount = (p: Progress, list = notifications(p)) => list.filter((n) => n.t > (p.notifSeen || 0)).length;
