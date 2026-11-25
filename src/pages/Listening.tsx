// Listening: dialogue with two voices, normal/slow speed, and "Repeat" with speech recognition.
import { useState, type ReactNode } from "react";
import { UNITS } from "../content";
import { UnitPicker } from "../components/UnitPicker";
import { VoicePicker } from "../components/VoicePicker";
import {
  playDialogue,
  recognitionSupported,
  speak,
  startRecognition,
  stopRecognition,
  stopSpeech,
  useSpeech,
} from "../services/speech";
import { markTask, recordActivity, recordRepeat } from "../state/actions";
import { useNav } from "../state/nav";
import { useProgress } from "../state/store";
import { compareSpeech, sentences } from "../utils/text";

function Dialogue({ text, speakers }: { text: string; speakers: string }) {
  const { current } = useSpeech();
  const turns: { who: string; parts: { k: number; s: string }[] }[] = [];
  sentences(text).forEach((s, k) => {
    const who = speakers[k] || "A";
    const last = turns[turns.length - 1];
    if (!last || last.who !== who) turns.push({ who, parts: [{ k, s }] });
    else last.parts.push({ k, s });
  });
  return (
    <div className="dlg">
      {turns.map((t, n) => (
        <div key={n} className={"dlg-line " + t.who.toLowerCase()}>
          <span className="dlg-who">{t.who}</span>
          <span>
            {t.parts.map((x, j) => (
              <span key={x.k}>
                {j > 0 && " "}
                <span className={"dlg-s" + (current === x.k ? " now" : "")}>{x.s}</span>
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Listening() {
  const p = useProgress();
  const speech = useSpeech();
  const { nav, patch, go, openUnit, listenUnit } = useNav();
  const i = nav.unit;
  const unit = UNITS[i];
  const ss = sentences(unit.dialogue.text);
  const k = Math.min(nav.repeatIdx, ss.length - 1);
  const heard = nav.heard || p.listened.includes(i);
  const rep = (p.repeated[i] || []).length;
  const [result, setResult] = useState<ReactNode>(null);

  const play = (mode: "play" | "slow") => {
    if (speech.playing === mode) {
      stopSpeech();
      return;
    }
    playDialogue(unit.dialogue, mode === "slow" ? 0.75 : 0.95, mode);
    markTask("listened", i);
    recordActivity("listen", i);
    patch({ heard: true });
  };

  const record = () => {
    if (speech.recording) {
      stopRecognition();
      return;
    }
    if (!recognitionSupported()) {
      setResult(
        "⚠️ Seu navegador não oferece reconhecimento de voz. Use o Google Chrome, Microsoft Edge (computador ou Android) ou o Safari (iPhone/iPad)."
      );
      return;
    }
    const target = ss[k];
    const noSpeech = "🤫 Nenhuma voz detectada. Toque em Gravar e fale perto do microfone.";
    startRecognition({
      onResult: (alts) => {
        const best = alts.map((a) => ({ a, ...compareSpeech(target, a) })).sort((x, y) => y.score - x.score)[0];
        let msg =
          best.score >= 80
            ? "🌟 Excelente! Sua pronúncia foi bem reconhecida."
            : best.score >= 50
              ? "👍 Quase lá! Ouça de novo e repita as palavras em vermelho."
              : "🔁 Tente novamente. Ouça a frase e fale com calma.";
        if (best.score >= 50 && recordRepeat(i, k)) msg += " +5 pontos.";
        setResult(
          <>
            <b>{msg}</b>
            <br />
            Você disse: “{best.a}”
            <br />
            Pontuação: <b>{best.score}%</b>
            <br />
            <span style={{ fontSize: 13 }}>
              {best.words.map((w, j) => (
                <span key={j}>
                  {j > 0 && " "}
                  <span className={w.ok ? "word-ok" : "word-miss"}>{w.word}</span>
                </span>
              ))}
            </span>
          </>
        );
      },
      onError: (error) =>
        setResult(
          error === "not-allowed" || error === "service-not-allowed"
            ? "⚠️ O acesso ao microfone foi bloqueado. Libere o microfone nas permissões do navegador e tente de novo."
            : error === "no-speech"
              ? noSpeech
              : `⚠️ Não foi possível reconhecer a voz (${error}). Tente novamente.`
        ),
      onNoSpeech: () => setResult(noSpeech),
    });
    setResult(
      <>
        🎙️ Fale agora: <b>{target}</b>
      </>
    );
  };

  const moveRepeat = (d: number) => {
    setResult(null);
    patch({ repeatIdx: Math.max(0, Math.min(ss.length - 1, nav.repeatIdx + d)) });
  };

  return (
    <section className="card">
      <UnitPicker onPick={listenUnit} />
      <div className="unit-meta">
        <span className="tag">UNIT {i + 1} · LISTENING</span>
        <span className="muted">
          Listening {i + 1}/{UNITS.length}
        </span>
      </div>
      <h2>Listen and repeat 🎧</h2>
      <p className="muted">Diálogo original para praticar os assuntos desta unidade.</p>
      <div className="feedback" lang="en">
        <Dialogue {...unit.dialogue} />
      </div>
      <div className="actions">
        <button className="btn" onClick={() => play("play")}>
          {speech.playing === "play" ? "⏹ Parar" : "▶ Reproduzir áudio"}
        </button>
        <button className="btn-secondary" onClick={() => play("slow")}>
          {speech.playing === "slow" ? "⏹ Parar" : "🐢 Ouvir devagar"}
        </button>
      </div>
      <VoicePicker />
      {heard && (
        <div>
          <div className="actions">
            <button className="btn-secondary" onClick={() => patch({ repeatOpen: !nav.repeatOpen })}>
              🎤 Repeat — repetir as frases
            </button>
          </div>
          {nav.repeatOpen && (
            <div className="repeat-box">
              <div className="unit-meta">
                <span className="tag">
                  REPEAT · FRASE {k + 1}/{ss.length}
                </span>
                <span className="muted">
                  {rep}/{ss.length} frases repetidas
                </span>
              </div>
              <p className="muted" style={{ margin: "8px 0 0", fontSize: 13 }}>
                Ouça a frase, toque em “Gravar” e repita em voz alta usando o microfone.
              </p>
              <div className="repeat-sentence" lang="en">
                {ss[k]}
              </div>
              <div className="actions">
                <button
                  className="btn-secondary"
                  onClick={() => {
                    stopRecognition();
                    speak(ss[k], 0.85);
                  }}
                >
                  🔊 Ouvir frase
                </button>
                <button className={"btn" + (speech.recording ? " rec" : "")} onClick={record}>
                  {speech.recording ? "⏹ Ouvindo… toque para parar" : "🎙️ Gravar minha voz"}
                </button>
              </div>
              {result && <div className="feedback">{result}</div>}
              <div className="actions">
                <button className="btn-secondary" disabled={k === 0} onClick={() => moveRepeat(-1)}>
                  ← Frase anterior
                </button>
                <button className="btn-secondary" disabled={k === ss.length - 1} onClick={() => moveRepeat(1)}>
                  Próxima frase →
                </button>
              </div>
            </div>
          )}
          <div className="actions unit-nav">
            {i > 0 && (
              <button className="btn-secondary" onClick={() => listenUnit(i - 1)}>
                ← Listening anterior
              </button>
            )}
            <button className="btn-secondary" onClick={() => openUnit(i)}>
              📚 Ver unidade
            </button>
            {i < UNITS.length - 1 ? (
              <button className="btn" onClick={() => listenUnit(i + 1)}>
                Próximo listening →
              </button>
            ) : (
              <button className="btn" onClick={() => go("exam")}>
                Ir para o simulado →
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
