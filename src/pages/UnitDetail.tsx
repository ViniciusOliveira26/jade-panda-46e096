import { UNITS } from "../content";
import { GrammarLesson } from "../components/GrammarLesson";
import { UnitNav } from "../components/UnitNav";
import { useNav } from "../state/nav";

const List = ({ items }: { items: string[] }) => (
  <ul className="list">
    {items.map((x, k) => (
      <li key={k}>{x}</li>
    ))}
  </ul>
);

export function UnitDetail() {
  const { nav, go, practiceUnit, vocabUnit, listenUnit, readUnit } = useNav();
  const i = nav.unit;
  const u = UNITS[i];
  return (
    <>
      <button className="btn-secondary" onClick={() => go("units")}>
        ← Back to units
      </button>
      <section className="card" lang="en">
        <span className="tag">
          UNIT {i + 1} · PAGE {u.page}
        </span>
        <h2 style={{ margin: "12px 0" }}>{u.title}</h2>
        <h3>Communication goals</h3>
        <List items={u.goals} />
        <h3>Vocabulary</h3>
        <List items={u.vocab} />
        <h3>Key words</h3>
        <p>
          {u.flashcards.map((w, k) => (
            <span key={k} className="tag" style={{ margin: "0 4px 6px 0" }}>
              {w.en}
            </span>
          ))}
        </p>
        <h3>Grammar</h3>
        <List items={u.grammar} />
        <h3>Grammar lessons</h3>
        {u.lessons.map((l, k) => (
          <GrammarLesson key={k} lesson={l} />
        ))}
        <h3>Model sentences</h3>
        <List items={u.examples} />
        <h3>Conversation strategies</h3>
        <List items={u.conversation} />
        <h3>Listening / Pronunciation</h3>
        <List items={u.listening} />
        <h3>Reading</h3>
        <List items={u.reading} />
        <h3>Writing task</h3>
        <p>{u.writing}</p>
        <div className="actions">
          <button className="btn" onClick={() => practiceUnit(i)}>
            Practice this unit
          </button>
          <button className="btn-secondary" onClick={() => vocabUnit(i)}>
            Flashcards
          </button>
          <button className="btn-secondary" onClick={() => listenUnit(i)}>
            🎧 Listening
          </button>
          <button className="btn-secondary" onClick={() => readUnit(i)}>
            📖 Reading & Writing
          </button>
        </div>
      </section>
      <UnitNav unit={i} en />
    </>
  );
}
