// "Exercícios": multiple choice and "Complete the sentence".
import { useEffect, useRef, useState, type FormEvent } from "react";
import { UNITS } from "../content";
import { NextStepButton } from "../components/NextStepButton";
import { ProgressBar } from "../components/ProgressBar";
import { UnitNav } from "../components/UnitNav";
import { UnitPicker } from "../components/UnitPicker";
import { answerFill, answerQuestion, markTask } from "../state/actions";
import { useNav } from "../state/nav";
import { pendingTasks } from "../state/progress";
import { getProgress, useProgress } from "../state/store";
import { norm } from "../utils/text";

const letter = (j: number) => String.fromCharCode(65 + j);

function ModeTabs() {
  const { nav, patch } = useNav();
  const setMode = (mode: "mc" | "fill") => {
    const u = UNITS[nav.unit];
    patch({
      mode,
      ...(mode === "mc" && nav.qIndex >= u.questions.length ? { qIndex: 0 } : {}),
      ...(mode === "fill" && nav.fIndex >= u.fills.length ? { fIndex: 0 } : {}),
    });
  };
  return (
    <div className="mode-tabs">
      <button className={"navbtn" + (nav.mode === "mc" ? " active" : "")} onClick={() => setMode("mc")}>
        🔘 Múltipla escolha
      </button>
      <button className={"navbtn" + (nav.mode === "fill" ? " active" : "")} onClick={() => setMode("fill")}>
        ✏️ Complete a frase
      </button>
    </div>
  );
}

export function Practice() {
  const { nav } = useNav();
  const u = UNITS[nav.unit];
  const k = `${nav.unit}-${nav.mode}-${nav.mode === "mc" ? nav.qIndex : nav.fIndex}`;
  if (nav.mode === "fill") return nav.fIndex >= u.fills.length ? <FillDone /> : <FillPractice key={k} />;
  return nav.qIndex >= u.questions.length ? <PracticeDone /> : <MultipleChoice key={k} />;
}

function MultipleChoice() {
  const { nav, patch, practiceUnit } = useNav();
  const i = nav.unit;
  const qs = UNITS[i].questions;
  const n = qs.length;
  const q = qs[nav.qIndex];
  const [answeredBefore] = useState(() => getProgress().answered.includes(i + "-" + nav.qIndex));
  const [result, setResult] = useState<{ a: number; ok: boolean } | null>(null);
  const locked = answeredBefore || !!result;

  const choose = (a: number) => {
    const ok = answerQuestion(i, nav.qIndex, a);
    if (ok !== null) setResult({ a, ok });
  };

  return (
    <section className="card">
      <UnitPicker onPick={practiceUnit} />
      <ModeTabs />
      <div className="unit-meta">
        <span className="tag">UNIT {i + 1} · EXERCISES</span>
        <span className="muted">
          Questão {nav.qIndex + 1}/{n}
        </span>
      </div>
      <ProgressBar value={(nav.qIndex + 1) / n} style={{ margin: "12px 0" }} />
      <h2>{q.prompt}</h2>
      <div>
        {q.options.map((o, j) => {
          const cls = result ? (j === q.answer ? " correct" : j === result.a && !result.ok ? " wrong" : "") : "";
          return (
            <button key={j} className={"option" + cls} disabled={locked} onClick={() => choose(j)}>
              {letter(j)}. {o}
            </button>
          );
        })}
      </div>
      {result ? (
        <div className="feedback">
          {result.ok ? "✅ Correto! +10 pontos." : `❌ Resposta correta: ${q.options[q.answer]}.`}
          <br />
          <span className="muted">{q.explanation}</span>
        </div>
      ) : (
        answeredBefore && <div className="feedback">Questão já respondida. Avance para continuar.</div>
      )}
      <button className="btn" style={{ width: "100%", marginTop: 14 }} onClick={() => patch({ qIndex: nav.qIndex + 1 })}>
        {nav.qIndex === n - 1 ? "Concluir prática ✓" : "Próxima questão →"}
      </button>
    </section>
  );
}

function PracticeDone() {
  const p = useProgress();
  const { nav, fillUnit, practiceUnit, openUnit } = useNav();
  const i = nav.unit;
  const n = UNITS[i].questions.length;
  const ok = UNITS[i].questions.filter((_, j) => p.answered.includes(i + "-" + j)).length;
  useEffect(() => {
    if (ok === n) markTask("practiced", i);
  }, [ok, n, i]);
  const left = pendingTasks(p, i).map((t) => t[1]);
  return (
    <section className="card" style={{ textAlign: "center" }}>
      <div style={{ fontSize: 40 }}>🎉</div>
      <span className="tag">
        UNIT {i + 1} · {ok === n ? "PRÁTICA CONCLUÍDA" : "PRÁTICA INCOMPLETA"}
      </span>
      <h2 style={{ margin: "12px 0 5px" }}>Prática finalizada!</h2>
      <p className="muted">
        Você respondeu {ok} de {n} questões da unidade "{UNITS[i].title}".
      </p>
      <p className="muted">{left.length ? `Falta para concluir a unidade: ${left.join(", ")}.` : "✅ Todas as tarefas desta unidade estão concluídas!"}</p>
      {i < UNITS.length - 1 ? (
        <p>
          Próxima:{" "}
          <b>
            Unidade {i + 2} · {UNITS[i + 1].title}
          </b>
        </p>
      ) : (
        <p>Você chegou à última unidade! Que tal fazer o simulado geral?</p>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <UnitNav unit={i} />
      </div>
      <div className="actions" style={{ justifyContent: "center" }}>
        <button className="btn" onClick={() => fillUnit(i)}>
          ✏️ Complete as frases →
        </button>
        <button className="btn-secondary" onClick={() => practiceUnit(i)}>
          ↻ Praticar novamente
        </button>
        <button className="btn-secondary" onClick={() => openUnit(i)}>
          Rever conteúdo da unidade
        </button>
      </div>
    </section>
  );
}

function FillPractice() {
  const { nav, patch, fillUnit } = useNav();
  const i = nav.unit;
  const items = UNITS[i].fills;
  const n = items.length;
  const f = items[nav.fIndex];
  const [before, after = ""] = f.sentence.split("___");
  const [doneBefore] = useState(() => getProgress().filled.includes(i + "-" + nav.fIndex));
  const [result, setResult] = useState<{ ok: boolean; reveal: boolean } | null>(null);
  const [value, setValue] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const locked = doneBefore || !!result;

  useEffect(() => {
    if (!doneBefore) input.current?.focus({ preventScroll: true });
  }, [doneBefore]);

  const check = (reveal: boolean) => {
    if (locked) return;
    if (!norm(value) && !reveal) {
      input.current?.focus();
      return;
    }
    const ok = answerFill(i, nav.fIndex, value, reveal);
    if (ok !== null) setResult({ ok, reveal });
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    check(false);
  };

  return (
    <section className="card">
      <UnitPicker onPick={fillUnit} />
      <ModeTabs />
      <div className="unit-meta">
        <span className="tag">UNIT {i + 1} · COMPLETE THE SENTENCE</span>
        <span className="muted">
          Frase {nav.fIndex + 1}/{n}
        </span>
      </div>
      <ProgressBar value={(nav.fIndex + 1) / n} style={{ margin: "12px 0" }} />
      <p className="muted" style={{ margin: 0 }}>
        Digite a palavra que falta para completar a frase.
      </p>
      <div className="fill-sentence">
        {before}
        <span style={{ color: "var(--accent)" }}>_____</span>
        {after}
      </div>
      <p className="muted" style={{ margin: 0, fontSize: 13 }}>
        💡 Dica: {f.hint}
      </p>
      <form onSubmit={submit} autoComplete="off">
        <input
          ref={input}
          className={"fill-input" + (result ? (result.ok ? " ok" : " bad") : "")}
          placeholder="Escreva aqui…"
          aria-label="Palavra que completa a frase"
          autoCapitalize="off"
          spellCheck={false}
          disabled={locked}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="actions">
          <button className="btn" type="submit" disabled={locked}>
            Verificar
          </button>
          <button className="btn-secondary" type="button" disabled={locked} onClick={() => check(true)}>
            Mostrar resposta
          </button>
        </div>
      </form>
      {result ? (
        <div className="feedback">
          {result.ok ? "✅ Correto! +10 pontos." : result.reveal ? "👀 Resposta:" : "❌ Resposta correta:"} {before}
          <b>{f.answers[0]}</b>
          {after.replace(/\s*\([^)]*\)\s*$/, "")}
          <br />
          <span className="muted">{f.explanation}</span>
        </div>
      ) : (
        doneBefore && (
          <div className="feedback">
            Frase já respondida. Resposta: <b>{f.answers[0]}</b>.<br />
            <span className="muted">{f.explanation}</span>
          </div>
        )
      )}
      <div className="actions">
        <button className="btn-secondary" disabled={nav.fIndex === 0} onClick={() => patch({ fIndex: Math.max(0, nav.fIndex - 1) })}>
          ← Anterior
        </button>
        <button className="btn" onClick={() => patch({ fIndex: nav.fIndex + 1 })}>
          {nav.fIndex === n - 1 ? "Concluir ✓" : "Próxima frase →"}
        </button>
      </div>
    </section>
  );
}

function FillDone() {
  const p = useProgress();
  const { nav, fillUnit, practiceUnit, openUnit, go } = useNav();
  const i = nav.unit;
  const n = UNITS[i].fills.length;
  const ans = UNITS[i].fills.filter((_, j) => p.filled.includes(i + "-" + j)).length;
  return (
    <section className="card" style={{ textAlign: "center" }}>
      <ModeTabs />
      <div style={{ fontSize: 40 }}>✏️</div>
      <span className="tag">UNIT {i + 1} · COMPLETE THE SENTENCE</span>
      <h2 style={{ margin: "12px 0 5px" }}>Frases concluídas!</h2>
      <p className="muted">
        Você respondeu {ans} de {n} frases da unidade "{UNITS[i].title}".
      </p>
      <div className="actions" style={{ justifyContent: "center" }}>
        {i > 0 && (
          <button className="btn-secondary" onClick={() => fillUnit(i - 1)}>
            ← Frases da unidade {i}
          </button>
        )}
        <button className="btn-secondary" onClick={() => practiceUnit(i)}>
          🔘 Múltipla escolha
        </button>
        {i < UNITS.length - 1 ? (
          <button className="btn" onClick={() => fillUnit(i + 1)}>
            Frases da unidade {i + 2} →
          </button>
        ) : (
          <button className="btn" onClick={() => go("exam")}>
            Ir para o simulado →
          </button>
        )}
      </div>
      <div className="actions" style={{ justifyContent: "center" }}>
        <NextStepButton unit={i} />
        <button className="btn-secondary" onClick={() => openUnit(i)}>
          Rever conteúdo da unidade
        </button>
      </div>
    </section>
  );
}
