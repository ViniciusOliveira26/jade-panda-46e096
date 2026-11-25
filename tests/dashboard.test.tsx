// Dashboard: activity tracking (streak, study time, history) and the insights shown on "Início".
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UNITS } from "../src/content";
import { UNIT_DIFFICULTY } from "../src/content/levels";
import { answerFill, answerQuestion, finishExam, markNotificationsSeen, markTask, recordActivity, seeCard } from "../src/state/actions";
import { addStudyTime, dayKey, formatDuration, markStudyDay, streak } from "../src/state/activity";
import { continueInfo, notifications, recommendations, summary, unitPercent, unitState, unreadCount } from "../src/state/insights";
import { NavProvider } from "../src/state/nav";
import { FLASH_MIN, applyProgress, defaultProgress, type Progress } from "../src/state/progress";
import { getProgress, setPersistHandler, setProgress, updateProgress } from "../src/state/store";
import { Home, firstName, greeting } from "../src/pages/Home";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 10, 18, 10, 0, 0));
  setPersistHandler(null);
  setProgress(defaultProgress(), false);
});

/** 10 exam items from unit 1 (questions + extra exam questions). */
const examItems = () => [...UNITS[0].questions, ...UNITS[0].examExtra].slice(0, 10).map((q) => ({ q, unit: 0 }));

const completeUnit = (i: number) => {
  markTask("studied", i);
  markTask("practiced", i);
  markTask("listened", i);
  for (let c = 0; c < FLASH_MIN; c++) seeCard(i, c);
};

describe("registro de atividade", () => {
  it("conta a sequência de dias até hoje ou ontem", () => {
    expect(streak([], "2026-11-18")).toBe(0);
    expect(streak(["2026-11-16", "2026-11-17", "2026-11-18"], "2026-11-18")).toBe(3);
    expect(streak(["2026-11-16", "2026-11-17"], "2026-11-18")).toBe(2);
    expect(streak(["2026-11-15", "2026-11-17", "2026-11-18"], "2026-11-18")).toBe(2);
    expect(streak(["2026-10-30", "2026-10-31", "2026-11-01"], "2026-11-01")).toBe(3);
    expect(streak(["2026-11-10"], "2026-11-18")).toBe(0);
  });
  it("marca o dia de estudo uma vez e inicia o registro", () => {
    const d = defaultProgress();
    markStudyDay(d);
    markStudyDay(d);
    expect(d.days).toEqual([dayKey()]);
    expect(d.trackSince).toBe(Date.now());
  });
  it("soma tempo de estudo e formata", () => {
    const d = defaultProgress();
    addStudyTime(d, 0);
    expect(d.studySec).toBe(0);
    addStudyTime(d, 90.6);
    addStudyTime(d, 3600);
    expect(d.studySec).toBe(3690);
    expect(formatDuration(0)).toBe("0 min");
    expect(formatDuration(30)).toBe("menos de 1 min");
    expect(formatDuration(3690)).toBe("1 h 1 min");
    expect(formatDuration(3600)).toBe("1 h");
  });
  it("respostas registram erros, última atividade e histórico", () => {
    expect(answerQuestion(0, 0, (UNITS[0].questions[0].answer + 1) % UNITS[0].questions[0].options.length)).toBe(false);
    answerFill(0, 2, "", true);
    const p = getProgress();
    expect(p.missed).toEqual(["q:0-0", "f:0-2"]);
    expect(p.last).toMatchObject({ k: "fill", u: 0, i: 2 });
    expect(p.log.map((e) => [e.k, e.ok])).toEqual([["mc", false], ["fill", false]]);
    expect(p.days).toEqual(["2026-11-18"]);
  });
  it("não repete a mesma atividade no histórico em menos de 5 minutos", () => {
    recordActivity("listen", 1);
    recordActivity("listen", 1);
    expect(getProgress().log).toHaveLength(1);
    vi.advanceTimersByTime(6 * 60_000);
    recordActivity("listen", 1);
    expect(getProgress().log).toHaveLength(2);
  });
  it("contas antigas começam com os campos novos vazios", () => {
    const old = applyProgress({ points: 30, done: 3, correct: 3, studied: [0] });
    expect(old).toMatchObject({ days: [], studySec: 0, trackSince: 0, last: null, log: [], missed: [] });
    expect(summary(old).streak).toBe(0);
  });
});

describe("trilha de unidades", () => {
  it("segue a sequência: só a primeira começa liberada", () => {
    const p = getProgress();
    expect(unitState(p, 0)).toBe("available");
    for (let i = 1; i < UNITS.length; i++) expect(unitState(p, i)).toBe("locked");
  });
  it("concluir uma unidade libera a próxima", () => {
    completeUnit(0);
    const p = getProgress();
    expect(unitState(p, 0)).toBe("done");
    expect(unitState(p, 1)).toBe("available");
    expect(unitState(p, 2)).toBe("locked");
    expect(unitPercent(p, 0)).toBe(100);
  });
  it("unidade já iniciada continua disponível", () => {
    markTask("studied", 4);
    expect(unitState(getProgress(), 4)).toBe("available");
    expect(unitPercent(getProgress(), 4)).toBe(25);
  });
  it("todas as unidades têm nível de dificuldade", () => {
    expect(UNIT_DIFFICULTY).toHaveLength(UNITS.length);
  });
});

describe("resumo de desempenho", () => {
  it("vazio sem atividade (sem dados inventados)", () => {
    const s = summary(getProgress());
    expect(s).toMatchObject({ coursePct: 0, doneUnits: 0, points: 0, accuracy: null, studySec: 0, streak: 0, studiedToday: false });
    expect(s.week.every(([, on]) => !on)).toBe(true);
  });
  it("calcula com os dados do aluno", () => {
    completeUnit(0);
    answerQuestion(0, 0, UNITS[0].questions[0].answer);
    const s = summary(getProgress());
    expect(s.doneUnits).toBe(1);
    expect(s.coursePct).toBe(10);
    expect(s.accuracy).toBe(100);
    expect(s.points).toBe(10);
    expect(s.streak).toBe(1);
    expect(s.week[6]).toEqual(["2026-11-18", true]);
  });
});

describe("continue aprendendo", () => {
  it("sem atividade: começa pela unidade 1", () => {
    const c = continueInfo(getProgress());
    expect(c.last).toBeNull();
    expect(c.target).toEqual({ to: "unit", unit: 0 });
  });
  it("retoma a próxima questão não respondida", () => {
    answerQuestion(2, 0, 0);
    answerQuestion(2, 1, 0);
    const c = continueInfo(getProgress());
    expect(c.last?.label).toContain("múltipla escolha");
    expect(c.target).toEqual({ to: "practice", unit: 2, index: 2 });
  });
  it("retoma o próximo flashcard", () => {
    seeCard(1, 0);
    seeCard(1, 1);
    expect(continueInfo(getProgress()).target).toEqual({ to: "vocab", unit: 1, index: 2 });
  });
  it("tudo concluído: simulado", () => {
    for (let i = 0; i < UNITS.length; i++) completeUnit(i);
    updateProgress((d) => {
      d.last = null;
    });
    expect(continueInfo(getProgress()).target.to).toBe("exam");
  });
});

describe("recomendações", () => {
  it("nenhuma sem atividade", () => {
    expect(recommendations(getProgress())).toEqual([]);
  });
  it("erros de múltipla escolha → reforçar gramática", () => {
    const q = UNITS[0].questions;
    for (let k = 0; k < 3; k++) answerQuestion(0, k, (q[k].answer + 1) % q[k].options.length);
    const r = recommendations(getProgress());
    expect(r[0]).toMatchObject({ kind: "grammar", target: { to: "unit", unit: 0 } });
    expect(r[0].reason).toContain("3 erros");
  });
  it("erros de completar frase → revisar vocabulário", () => {
    answerFill(1, 0, "", true);
    answerFill(1, 1, "", true);
    expect(recommendations(getProgress()).find((x) => x.kind === "vocab")?.target).toEqual({ to: "vocab", unit: 1 });
  });
  it("diálogo não ouvido → praticar listening", () => {
    markTask("studied", 0);
    expect(recommendations(getProgress()).some((x) => x.kind === "listening" && x.target.unit === 0)).toBe(true);
  });
  it("nota baixa no simulado → novo simulado", () => {
    finishExam(examItems(), 4, []);
    const r = recommendations(getProgress()).find((x) => x.kind === "exam");
    expect(r).toMatchObject({ id: "exam-retry", title: "Realizar novo simulado" });
  });
  it("uma sugestão por habilidade, no máximo 4", () => {
    for (let i = 0; i < 4; i++) {
      markTask("studied", i);
      answerFill(i, 0, "", true);
      answerFill(i, 1, "", true);
    }
    const r = recommendations(getProgress());
    expect(r.length).toBeLessThanOrEqual(4);
    expect(new Set(r.map((x) => x.kind)).size).toBe(r.length);
  });
});

describe("notificações", () => {
  it("unidade concluída e simulado geram avisos; abrir o painel marca como lidas", () => {
    completeUnit(0);
    vi.advanceTimersByTime(1000);
    finishExam(examItems(), 9, []);
    const list = notifications(getProgress());
    expect(list.map((n) => n.text)).toEqual(["Simulado concluído: nota 9.0/10.", "Unidade 1 concluída! A Unidade 2 foi liberada."]);
    expect(unreadCount(getProgress())).toBe(2);
    vi.advanceTimersByTime(1000);
    markNotificationsSeen();
    expect(unreadCount(getProgress())).toBe(0);
  });
  it("lembrete de sequência quando ainda não estudou hoje", () => {
    const p: Progress = { ...defaultProgress(), days: ["2026-11-16", "2026-11-17"] };
    expect(notifications(p)[0].text).toBe("Estude hoje para manter sua sequência de 2 dias.");
  });
});

describe("painel (Início)", () => {
  it("saudação e primeiro nome", () => {
    expect(greeting(8)).toBe("Bom dia");
    expect(greeting(14)).toBe("Boa tarde");
    expect(greeting(21)).toBe("Boa noite");
    expect(firstName("ana souza")).toBe("Ana");
    expect(firstName("aluno@email.com")).toBe("");
  });
  it("estados vazios para aluno novo", () => {
    const html = renderToString(<NavProvider><Home name="Ana Souza" /></NavProvider>);
    for (const t of ["Bom dia, Ana!", "Boas-vindas", "Começar a Unidade 1", "Nenhuma atividade registrada", "Bloqueada", "Iniciante", "Média de acertos", "Sequência de estudos"])
      expect(html).toContain(t);
    expect(html).toContain("—");
  });
  it("mostra dados reais depois de atividades", () => {
    completeUnit(0);
    answerQuestion(1, 0, UNITS[1].questions[0].answer);
    const html = renderToString(<NavProvider><Home name="Ana" /></NavProvider>);
    expect(html).toContain("Unidade 2 · " + UNITS[1].title.replace(/&/g, "&amp;").replace(/'/g, "&#x27;"));
    expect(html).toContain("Revisar");
    expect(html).toContain("100%");
    expect(html).toContain("1 dia");
  });
});
