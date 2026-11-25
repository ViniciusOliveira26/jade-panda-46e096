// Types for the pedagogical content of each unit (src/content/units/unit-XX.ts).

/** Multiple-choice question. `answer` is the index of the correct option. */
export interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Flashcard {
  en: string;
  pt: string;
}

/** "Complete the sentence" item. The blank is written as ___ in `sentence`. */
export interface FillItem {
  sentence: string;
  /** Accepted answers; the first one is shown as the correct answer. */
  answers: string[];
  hint: string;
  explanation: string;
}

export interface GrammarLesson {
  title: string;
  explain: string;
  head: string[];
  rows: string[][];
  tip: string;
}

export interface ReadingPractice {
  title: string;
  text: string;
  questions: Question[];
}

export interface WritingPractice {
  model: string;
  phrases: string[];
  /** `pattern` is a case-insensitive regular expression tested against the student's text. */
  checks: { label: string; pattern: string }[];
}

export interface Unit {
  title: string;
  /** Page of the unit in the course book summary. */
  page: number;
  goals: string[];
  vocab: string[];
  grammar: string[];
  conversation: string[];
  /** Listening / pronunciation topics. */
  listening: string[];
  /** Reading topics. */
  reading: string[];
  /** Writing task statement. */
  writing: string;
  examples: string[];
  lessons: GrammarLesson[];
  questions: Question[];
  flashcards: Flashcard[];
  fills: FillItem[];
  /** Extra questions used only in the mock exam. */
  examExtra: Question[];
  /** `speakers` has one letter (A or B) per sentence of `text`. */
  dialogue: { text: string; speakers: string };
  readingPractice: ReadingPractice;
  writingPractice: WritingPractice;
}
