import { UNITS } from "../content";
import { NextStepButton } from "../components/NextStepButton";
import { UnitPicker } from "../components/UnitPicker";
import { speak } from "../services/speech";
import { seeCard } from "../state/actions";
import { useNav } from "../state/nav";
import { FLASH_MIN, taskDone } from "../state/progress";
import { useProgress } from "../state/store";

export function Vocabulary() {
  const p = useProgress();
  const { nav, patch, vocabUnit } = useNav();
  const i = nav.unit;
  const cards = UNITS[i].flashcards;
  const N = cards.length;
  const c = nav.card % N;
  const w = cards[c];
  const seen = (p.flashSeen[i] || []).length;
  return (
    <section className="card">
      <UnitPicker onPick={vocabUnit} />
      <div className="unit-meta">
        <span className="tag">UNIT {i + 1} · VOCABULARY</span>
        <span className="muted">
          Cartão {c + 1}/{N} · {seen}/{N} revisados
        </span>
      </div>
      <h2>Flashcards</h2>
      <p className="muted">
        Tente lembrar o significado antes de virar o cartão. Vire pelo menos {FLASH_MIN} cartões para concluir a tarefa — e todos os {N} para
        dominar o vocabulário da unidade.
      </p>
      <button
        className="flashcard"
        onClick={() => {
          patch({ flipped: !nav.flipped });
          seeCard(i, c);
        }}
      >
        <span lang={nav.flipped ? "pt-BR" : "en"}>{nav.flipped ? w.pt : w.en}</span>
        <small>{nav.flipped ? "PORTUGUÊS" : "TOQUE PARA REVELAR"}</small>
      </button>
      <div className="actions">
        <button className="btn-secondary" onClick={() => patch({ card: (nav.card + N - 1) % N, flipped: false })}>
          ← Anterior
        </button>
        <button className="btn" onClick={() => patch({ card: (nav.card + 1) % N, flipped: false })}>
          Próxima →
        </button>
      </div>
      <button className="btn-secondary" style={{ width: "100%", marginTop: 10 }} onClick={() => speak(w.en)}>
        🔊 Ouvir pronúncia
      </button>
      {taskDone(p, "flash", i) && (
        <div className="actions">
          <NextStepButton unit={i} />
        </div>
      )}
    </section>
  );
}
