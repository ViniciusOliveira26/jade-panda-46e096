// Mock exam built from the units already studied. 10 questions per unit, grade from 0 to 10.
import { useState } from "react";
import { UNITS } from "../content";
import { ProgressBar } from "../components/ProgressBar";
import { finishExam, type ExamItem, type ExamMistake } from "../state/actions";
import { useNav } from "../state/nav";
import { studiedUnits, type ExamResult } from "../state/progress";
import { useProgress } from "../state/store";
import { EXAM_QUESTIONS_PER_UNIT, buildExam } from "../utils/exam";

interface Running {
  items: ExamItem[];
  index: number;
  score: number;
  wrong: ExamMistake[];
}

export function Exam() {
  const p = useProgress();
  const { go } = useNav();
  const [run, setRun] = useState<Running | null>(null);
  const [done, setDone] = useState<{ result: ExamResult; wrong: ExamMistake[] } | null>(null);
  const su = studiedUnits(p);

  if (done) return <ExamFinished {...done} />;

  if (run) {
    const x = run.items[run.index];
    const total = run.items.length;
    const answer = (a: number) => {
      const ok = a === x.q.answer;
      const next: Running = {
        ...run,
        index: run.index + 1,
        score: run.score + (ok ? 1 : 0),
        wrong: ok ? run.wrong : [...run.wrong, { ...x, a }],
      };
      if (next.index >= total) setDone({ result: finishExam(next.items, next.score, next.wrong), wrong: next.wrong });
      else setRun(next);
    };
    return (
      <section className="card">
        <div className="unit-meta">
          <span className="tag">UNIT {x.unit + 1}</span>
          <span className="muted">
            Questão {run.index + 1}/{total}
          </span>
        </div>
        <ProgressBar value={(run.index + 1) / total} style={{ margin: "12px 0" }} />
        <h2>{x.q.prompt}</h2>
        {x.q.options.map((o, j) => (
          <button key={`${run.index}-${j}`} className="option" onClick={() => answer(j)}>
            {String.fromCharCode(65 + j)}. {o}
          </button>
        ))}
      </section>
    );
  }

  if (!su.length)
    return (
      <section className="card">
        <span className="tag badge-orange">FINAL ASSESSMENT</span>
        <h2>Simulado</h2>
        <p className="muted">
          O simulado é montado com base no conteúdo que você já estudou. Abra pelo menos uma unidade ou faça uma prática para liberar a prova.
        </p>
        <button className="btn" style={{ width: "100%", marginTop: 12 }} onClick={() => go("units")}>
          Ir para as unidades →
        </button>
      </section>
    );

  const last = p.exams[p.exams.length - 1];
  return (
    <section className="card">
      <span className="tag badge-orange">FINAL ASSESSMENT</span>
      <h2>Simulado do conteúdo estudado</h2>
      <p className="muted">
        A prova é gerada com base nas unidades que você já estudou. A cada nova unidade estudada, o simulado fica maior. As questões e
        alternativas são embaralhadas a cada tentativa.
      </p>
      <ul className="list">
        <li>{su.length * EXAM_QUESTIONS_PER_UNIT} questões de múltipla escolha (10 por unidade: gramática, vocabulário e exercícios)</li>
        <li>Nota de 0 a 10</li>
        <li>Correção com explicação ao final</li>
      </ul>
      <h3>
        Unidades incluídas ({su.length}/{UNITS.length})
      </h3>
      <p>
        {su.map((i) => (
          <span key={i} className="tag" style={{ margin: "0 4px 6px 0" }}>
            {i + 1}. {UNITS[i].title}
          </span>
        ))}
      </p>
      {last && (
        <p className="muted">
          Último resultado: <b>{last.grade.toFixed(1)}/10</b> em {new Date(last.date).toLocaleDateString("pt-BR")}
        </p>
      )}
      <button
        className="btn"
        style={{ width: "100%", marginTop: 12 }}
        onClick={() => setRun({ items: buildExam(su), index: 0, score: 0, wrong: [] })}
      >
        Iniciar simulado →
      </button>
    </section>
  );
}

function ExamFinished({ result, wrong }: { result: ExamResult; wrong: ExamMistake[] }) {
  const { go } = useNav();
  const g = result.grade;
  return (
    <section className="card" style={{ textAlign: "center" }}>
      <div style={{ fontSize: 40 }}>🏆</div>
      <h2>Simulado concluído!</h2>
      <div style={{ fontSize: 42, fontWeight: 800 }}>{g.toFixed(1)}/10</div>
      <p>
        {result.score} acertos de {result.total} questões.
      </p>
      <p className="muted">{g >= 8 ? "Excelente resultado!" : g >= 6 ? "Bom progresso! Continue estudando." : "Continue praticando e revise as unidades."}</p>
      {wrong.length > 0 && (
        <>
          <h3 style={{ textAlign: "left" }}>Revise as questões que você errou</h3>
          {wrong.map((x, k) => (
            <div key={k} className="feedback" style={{ textAlign: "left" }}>
              <span className="tag">UNIT {x.unit + 1}</span>
              <p style={{ margin: "8px 0 4px" }}>
                <b>{x.q.prompt}</b>
              </p>
              <div>
                Sua resposta: <span style={{ color: "var(--red)" }}>{x.q.options[x.a]}</span> · Correta:{" "}
                <span style={{ color: "var(--green)" }}>{x.q.options[x.q.answer]}</span>
              </div>
              <div className="muted">{x.q.explanation}</div>
            </div>
          ))}
        </>
      )}
      <div className="actions">
        <button className="btn-secondary" onClick={() => go("progress")}>
          📊 Ver meu progresso
        </button>
        <button className="btn" onClick={() => go("exam")}>
          Voltar ao simulado
        </button>
      </div>
    </section>
  );
}
