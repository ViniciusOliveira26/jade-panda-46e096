// Scoring rules and helpers, checked against the behavior of version 1.
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UNITS } from "../src/content";
import {
  answerFill,
  answerQuestion,
  answerReading,
  finishExam,
  isFillCorrect,
  markTask,
  recordRepeat,
  saveWriting,
  seeCard,
} from "../src/state/actions";
import { FLASH_MIN, applyProgress, completedUnits, defaultProgress, studiedUnits, taskDone, unitComplete } from "../src/state/progress";
import { getProgress, setPersistHandler, setProgress } from "../src/state/store";
import { buildExam } from "../src/utils/exam";
import { chunks, compareSpeech, norm, sentences } from "../src/utils/text";
import { writingChecks } from "../src/pages/Writing";

beforeEach(() => {
  vi.useFakeTimers();
  setPersistHandler(null);
  setProgress(defaultProgress(), false);
});

describe("texto", () => {
  it("normaliza respostas", () => {
    expect(norm("  Don’t!  ")).toBe("don't");
    expect(isFillCorrect(["don't", "do not"], "Do not")).toBe(true);
    expect(isFillCorrect(["am"], "is")).toBe(false);
  });
  it("divide o diálogo em frases", () => {
    expect(sentences(UNITS[0].dialogue.text)).toHaveLength(UNITS[0].dialogue.speakers.length);
  });
  it("compara a fala palavra por palavra, aceitando números", () => {
    const r = compareSpeech("I have two brothers.", "i have 2 brother");
    expect(r.score).toBe(75);
    expect(r.words.map((w) => w.ok)).toEqual([true, true, true, false]);
  });
  it("não separa abreviações como Mr. na leitura em voz alta", () => {
    expect(chunks("Our receptionist is Mr. Brown. He's an artist.")).toEqual(["Our receptionist is Mr. Brown.", "He's an artist."]);
  });
});

describe("progresso", () => {
  it("aceita só campos conhecidos e do tipo certo", () => {
    const p = applyProgress({ points: 30, answered: "x", hacker: 1, exams: [] });
    expect(p.points).toBe(30);
    expect(p.answered).toEqual([]);
    expect("hacker" in p).toBe(false);
  });

  it("múltipla escolha: +10 por acerto, só uma vez", () => {
    const q = UNITS[0].questions[0];
    expect(answerQuestion(0, 0, q.answer)).toBe(true);
    expect(answerQuestion(0, 0, q.answer)).toBe(null);
    expect(answerQuestion(0, 1, (UNITS[0].questions[1].answer + 1) % 3)).toBe(false);
    expect(getProgress()).toMatchObject({ points: 10, done: 2, correct: 1, answered: ["0-0", "0-1"] });
  });

  it("completar frase: mostrar resposta conta como erro", () => {
    expect(answerFill(0, 0, "", true)).toBe(false);
    expect(answerFill(0, 1, "IS", false)).toBe(true);
    expect(getProgress()).toMatchObject({ points: 10, done: 2, correct: 1, filled: ["0-0", "0-1"] });
  });

  it("leitura, escrita e pronúncia", () => {
    answerReading(0, 0, UNITS[0].readingPractice.questions[0].answer);
    answerReading(0, 0, 2);
    saveWriting(0, "  I'm a student.  ");
    saveWriting(0, "I'm a teacher.");
    expect(recordRepeat(0, 0)).toBe(true);
    expect(recordRepeat(0, 0)).toBe(false);
    expect(getProgress()).toMatchObject({ points: 10 + 20 + 5, done: 1, wrote: [0], writings: { 0: "I'm a teacher." } });
  });

  it("flashcards: tarefa concluída com 6 cartões diferentes", () => {
    for (let c = 0; c < FLASH_MIN - 1; c++) seeCard(0, c);
    seeCard(0, 0);
    expect(taskDone(getProgress(), "flash", 0)).toBe(false);
    seeCard(0, FLASH_MIN);
    expect(taskDone(getProgress(), "flash", 0)).toBe(true);
  });

  it("unidade concluída com as 4 tarefas", () => {
    markTask("studied", 2);
    markTask("practiced", 2);
    markTask("listened", 2);
    for (let c = 0; c < FLASH_MIN; c++) seeCard(2, c);
    expect(unitComplete(getProgress(), 2)).toBe(true);
    expect(completedUnits(getProgress())).toBe(1);
  });

  it("salva cada mudança", () => {
    const saved = vi.fn();
    setPersistHandler(saved);
    markTask("studied", 0);
    markTask("studied", 0);
    expect(saved).toHaveBeenCalledTimes(1);
  });
});

describe("simulado", () => {
  it("10 questões por unidade estudada, com alternativas embaralhadas válidas", () => {
    markTask("studied", 0);
    setProgress({ ...getProgress(), answered: ["4-1"] });
    const units = studiedUnits(getProgress());
    expect(units).toEqual([0, 4]);
    const exam = buildExam(units);
    expect(exam).toHaveLength(20);
    for (const x of exam) expect(x.q.options[x.q.answer]).toBeDefined();
  });

  it("guarda nota, revisão dos erros e só os 10 últimos", () => {
    const items = buildExam([0]);
    for (let n = 0; n < 11; n++) finishExam(items, 5, [{ ...items[0], a: (items[0].q.answer + 1) % items[0].q.options.length }]);
    const p = getProgress();
    expect(p.exams).toHaveLength(10);
    expect(p.exams[9]).toMatchObject({ score: 5, total: 10, grade: 5, units: [0] });
    expect(p.exams[9].wrong![0]).toMatchObject({ u: 0, q: items[0].q.prompt, c: items[0].q.options[items[0].q.answer] });
  });
});

describe("escrita", () => {
  it("checklist da unidade 1", () => {
    const r = writingChecks("I'm a student. I'm not a teacher. They aren't doctors.", UNITS[0].writingPractice.checks);
    expect(r.every(([, ok]) => ok)).toBe(true);
  });
});
