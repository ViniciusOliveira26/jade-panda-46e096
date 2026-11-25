import { useState } from "react";
import { UNITS } from "../content";
import { NextStepButton } from "../components/NextStepButton";
import { UnitPicker } from "../components/UnitPicker";
import { speak } from "../services/speech";
import { saveWriting } from "../state/actions";
import { useNav } from "../state/nav";
import { MAX_WRITING } from "../state/progress";
import { getProgress } from "../state/store";

/** Checklist: at least 3 sentences + the unit structures. */
export function writingChecks(text: string, checks: { label: string; pattern: string }[]): [string, boolean][] {
  const v = text.toLowerCase().replace(/[’]/g, "'");
  const n = (v.match(/[.!?]+/g) || []).length;
  return [["Pelo menos 3 frases", n >= 3], ...checks.map((c): [string, boolean] => [c.label, new RegExp(c.pattern, "i").test(v)])];
}

export function Writing() {
  const { nav, writeUnit, readUnit } = useNav();
  const i = nav.unit;
  const unit = UNITS[i];
  const w = unit.writingPractice;
  const [text, setText] = useState(() => getProgress().writings[i] || "");
  const [showModel, setShowModel] = useState(false);
  return (
    <section className="card">
      <UnitPicker onPick={writeUnit} />
      <span className="tag">UNIT {i + 1} · WRITING</span>
      <h2>{unit.writing}</h2>
      <p className="muted">Escreva pelo menos 3 frases em inglês. A lista abaixo confere se você usou a estrutura da unidade.</p>
      <p>
        {w.phrases.map((x, k) => (
          <span key={k} className="tag" style={{ margin: "0 4px 6px 0" }}>
            {x}
          </span>
        ))}
      </p>
      <textarea
        className="fill-input"
        rows={6}
        lang="en"
        spellCheck
        aria-label="Seu texto em inglês"
        maxLength={MAX_WRITING}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <ul className="list">
        {writingChecks(text, w.checks).map(([label, ok], k) => (
          <li key={k} className={ok ? "word-ok" : "muted"}>
            {ok ? "✔" : "○"} {label}
          </li>
        ))}
      </ul>
      <div className="actions">
        <button className="btn" onClick={() => saveWriting(i, text)}>
          💾 Salvar texto
        </button>
        <button className="btn-secondary" onClick={() => setShowModel(!showModel)}>
          👀 Ver texto modelo
        </button>
      </div>
      <div className="feedback" hidden={!showModel} lang="en">
        {w.model}
        <div className="actions">
          <button className="btn-secondary" onClick={() => speak(w.model, 0.9)}>
            🔊 Ouvir
          </button>
        </div>
      </div>
      <div className="actions">
        <button className="btn-secondary" onClick={() => readUnit(i)}>
          ← Leitura
        </button>
        <NextStepButton unit={i} />
      </div>
    </section>
  );
}
