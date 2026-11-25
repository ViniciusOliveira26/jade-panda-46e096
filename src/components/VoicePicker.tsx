import { chooseVoice, mainVoice, speak, useSpeech, voiceScore } from "../services/speech";

/** English voice selector with a test button and tips for more natural voices. */
export function VoicePicker() {
  const s = useSpeech();
  const cur = mainVoice(s);
  const weak = cur && voiceScore(cur) < 20;
  return (
    <div className="voice-box muted">
      <label>
        🗣️ Voz em inglês:{" "}
        <select
          id="voice-pick"
          value={cur?.name ?? ""}
          onChange={(e) => {
            chooseVoice(e.target.value);
            speak("Hello! This is my voice.", 0.95);
          }}
        >
          {s.voices.length ? (
            s.voices.slice(0, 40).map((v) => (
              <option key={v.name} value={v.name}>
                {v.name.replace(/^Microsoft |^Google /, "")} ({v.lang}){voiceScore(v) >= 30 ? " ★" : ""}
              </option>
            ))
          ) : (
            <option value="">Voz padrão do dispositivo</option>
          )}
        </select>
      </label>{" "}
      <button
        className="btn-secondary"
        style={{ padding: "6px 10px" }}
        onClick={() => speak("Hello! Nice to meet you. This is the voice for your English lessons.", 0.95)}
      >
        Testar voz
      </button>
      {weak || !cur ? (
        <p style={{ margin: "6px 0 0" }}>
          💡 Para uma voz mais humana, abra o site no <b>Microsoft Edge</b> ou <b>Google Chrome</b>. No iPhone/iPad, baixe uma voz
          “Aprimorada” em Ajustes › Acessibilidade › Conteúdo Falado › Vozes › Inglês.
        </p>
      ) : (
        <p style={{ margin: "6px 0 0" }}>
          As vozes marcadas com ★ são vozes neurais, mais naturais. No diálogo, a pessoa A e a pessoa B têm vozes diferentes.
        </p>
      )}
    </div>
  );
}
