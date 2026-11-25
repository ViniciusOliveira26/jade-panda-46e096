// Builds the mock exam from the units the student has already studied.
import { UNITS } from "../content";
import type { Question } from "../content/types";
import type { ExamItem } from "../state/actions";
import { shuffle } from "./text";

export const EXAM_QUESTIONS_PER_UNIT = 10;

export function shuffleOptions(q: Question): Question {
  const order = shuffle(q.options.map((_, j) => j));
  return { prompt: q.prompt, options: order.map((j) => q.options[j]), answer: order.indexOf(q.answer), explanation: q.explanation };
}

/** Two "What does … mean?" questions from the unit flashcards. */
export function vocabQuestions(i: number): Question[] {
  const cards = UNITS[i].flashcards;
  return shuffle(cards)
    .slice(0, 2)
    .map((w) => {
      const others = shuffle(cards.filter((x) => x !== w))
        .slice(0, 2)
        .map((x) => x.pt);
      return { prompt: `What does “${w.en}” mean?`, options: [w.pt, ...others], answer: 0, explanation: `${w.en} = ${w.pt}.` };
    });
}

/** 5 random practice questions + 3 exam questions + 2 vocabulary questions per unit, all shuffled. */
export function buildExam(units: number[]): ExamItem[] {
  return shuffle(
    units.flatMap((i) =>
      [...shuffle(UNITS[i].questions).slice(0, 5), ...UNITS[i].examExtra, ...vocabQuestions(i)].map((q) => ({
        q: shuffleOptions(q),
        unit: i,
      }))
    )
  );
}
