import { UNITS } from "../content";
import { UnitPicker } from "../components/UnitPicker";
import { speak } from "../services/speech";
import { answerReading } from "../state/actions";
import { useNav } from "../state/nav";
import { useProgress } from "../state/store";

export function Reading() {
  const p = useProgress();
  const { nav, readUnit, writeUnit } = useNav();
  const i = nav.unit;
  const r = UNITS[i].readingPractice;
  const ans = p.readAns[i] || {};
  return (
    <section className="card">
      <UnitPicker onPick={readUnit} />
      <span className="tag">UNIT {i + 1} · READING</span>
      <h2>{r.title}</h2>
      <div className="feedback" lang="en" style={{ whiteSpace: "pre-line" }}>
        {r.text}
      </div>
      <div className="actions">
        <button className="btn-secondary" onClick={() => speak(r.text.replace(/[•★☆]/g, " "), 0.9)}>
          🔊 Ouvir o texto
        </button>
      </div>
      <h3>Comprehension</h3>
      {r.questions.map((q, k) => {
        const a = ans[k];
        return (
          <div key={k}>
            <p>
              <b>
                {k + 1}. {q.prompt}
              </b>
            </p>
            {q.options.map((o, j) => {
              const cls = a === undefined ? "" : j === q.answer ? " correct" : j === a ? " wrong" : "";
              return (
                <button key={j} className={"option" + cls} disabled={a !== undefined} onClick={() => answerReading(i, k, j)}>
                  {o}
                </button>
              );
            })}
            {a !== undefined && (
              <p className="muted" style={{ fontSize: 13 }}>
                {q.explanation}
              </p>
            )}
          </div>
        );
      })}
      <div className="actions">
        <button className="btn" onClick={() => writeUnit(i)}>
          ✍️ Ir para a escrita →
        </button>
      </div>
    </section>
  );
}
