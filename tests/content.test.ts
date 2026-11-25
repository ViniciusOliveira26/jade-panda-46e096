// Guarantees that the content in src/content is exactly the content of version 1 (legacy/v1):
// same texts, same order, same answers. If this test fails, pedagogical content was changed.
import { describe, expect, it } from "vitest";
import { UNITS } from "../src/content";
import type { Question } from "../src/content/types";
import { loadLegacyContent } from "./legacy-loader";

const L = loadLegacyContent();
const tuple = (q: Question) => [q.prompt, q.options, q.answer, q.explanation];

describe("conteúdo pedagógico preservado da versão 1", () => {
  it("tem as 10 unidades", () => {
    expect(UNITS.length).toBe(L.units.length);
    expect(UNITS.length).toBe(10);
  });

  UNITS.forEach((u, i) => {
    it(`unidade ${i + 1}: ${u.title}`, () => {
      const { title, page, goals, vocab, grammar, conversation, listening, reading, writing, examples } = u;
      expect({ title, page, goals, vocab, grammar, conversation, listening, reading, writing, examples }).toEqual(L.units[i]);
      expect(u.lessons).toEqual(L.LESSONS[i]);
      expect(u.questions.map(tuple)).toEqual(L.questions[i]);
      expect(u.flashcards.map((f) => [f.en, f.pt])).toEqual(L.vocab[i]);
      expect(u.fills.map((f) => [f.sentence, f.answers, f.hint, f.explanation])).toEqual(L.fills[i]);
      expect(u.examExtra.map(tuple)).toEqual(L.examExtra[i]);
      expect(u.dialogue.text).toBe(L.dialogues[i]);
      expect(u.dialogue.speakers).toBe(L.DLG_SPK[i]);
      const r = u.readingPractice;
      expect({ title: r.title, text: r.text, questions: r.questions.map(tuple) }).toEqual(L.READINGS[i]);
      const w = u.writingPractice;
      expect({ model: w.model, phrases: w.phrases, checks: w.checks.map((c) => [c.label, c.pattern]) }).toEqual(L.WRITING[i]);
    });
  });
});
