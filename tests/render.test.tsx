// Smoke test: every page renders without errors, with empty and with filled progress.
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AuthScreen } from "../src/auth/AuthScreen";
import { Exam } from "../src/pages/Exam";
import { Landing } from "../src/landing/Landing";
import { Home } from "../src/pages/Home";
import { Journey } from "../src/pages/Journey";
import { Profile } from "../src/pages/Profile";
import { Listening } from "../src/pages/Listening";
import { Practice } from "../src/pages/Practice";
import { ProgressPage } from "../src/pages/ProgressPage";
import { Reading } from "../src/pages/Reading";
import { UnitDetail } from "../src/pages/UnitDetail";
import { UnitsPage } from "../src/pages/UnitsPage";
import { Vocabulary } from "../src/pages/Vocabulary";
import { Writing } from "../src/pages/Writing";
import { NavProvider } from "../src/state/nav";
import { applyProgress } from "../src/state/progress";
import { setPersistHandler, setProgress } from "../src/state/store";

const pages = { Home, Journey, UnitsPage, UnitDetail, Practice, Listening, Vocabulary, Reading, Writing, Exam, ProgressPage };
const filled = applyProgress({
  points: 50, done: 5, correct: 4, answered: ["0-0", "0-1"], studied: [0], listened: [0], flashSeen: { 0: [0, 1, 2, 3, 4, 5] },
  readAns: { 0: { 0: 1 } }, writings: { 0: "I'm a student." }, wrote: [0],
  exams: [{ date: Date.now(), score: 8, total: 10, grade: 8, units: [0], wrong: [{ u: 0, q: "Q?", a: "x", c: "y", e: "z" }] }],
});

describe("páginas renderizam", () => {
  setPersistHandler(null);
  for (const [name, Page] of Object.entries(pages))
    for (const [label, p] of [["vazio", applyProgress(null)], ["com progresso", filled]] as const)
      it(`${name} (${label})`, () => {
        setProgress(p, false);
        const html = renderToString(<NavProvider><Page /></NavProvider>);
        expect(html.length).toBeGreaterThan(50);
      });
  it("tela de login", () => {
    const html = renderToString(<AuthScreen loading={null} tab="login" message={null} onTab={() => {}} onEnter={async () => {}} />);
    expect(html).toContain("Esqueci minha senha");
  });
  it("tela de cadastro", () => {
    const html = renderToString(<AuthScreen loading={null} tab="signup" message={{ text: "Erro", type: "error" }} onTab={() => {}} onEnter={async () => {}} onBack={() => {}} />);
    expect(html).toContain("Criar minha conta");
    expect(html).toContain("Voltar ao início");
  });
  it("página de apresentação", () => {
    const html = renderToString(<Landing onSignup={() => {}} onLogin={() => {}} />);
    for (const t of ["Começar gratuitamente", "Acesso do aluno", "Perguntas frequentes", "nativespeakers1@outlook.com"]) expect(html).toContain(t);
  });
  it("meu perfil", () => {
    setProgress(applyProgress(null), false);
    const html = renderToString(
      <NavProvider>
        <Profile user={{ id: "1", email: "aluno@example.com", name: "Ana Souza" }} onUser={() => {}} onLogout={async () => {}} />
      </NavProvider>
    );
    expect(html).toContain("Ana Souza");
    expect(html).toContain("Alterar senha");
  });
});
