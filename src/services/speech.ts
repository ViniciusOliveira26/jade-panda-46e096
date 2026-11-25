// Browser speech: text-to-speech (dialogues, flashcards, texts) and speech recognition ("Repeat").
// Uses the Web Speech API; the available voices depend on the browser and the device.
import { useSyncExternalStore } from "react";
import { chunks, sentences } from "../utils/text";

export type PlayMode = "play" | "slow" | null;

interface SpeechState {
  voices: SpeechSynthesisVoice[];
  /** Which dialogue button is playing. */
  playing: PlayMode;
  /** Index of the dialogue sentence being spoken (highlighted). */
  current: number | null;
  /** Saved voice name. */
  voiceName: string | null;
  recording: boolean;
}

const VOICE_KEY = "ns-voice";
const hasTTS = typeof window !== "undefined" && "speechSynthesis" in window;
let state: SpeechState = { voices: [], playing: null, current: null, voiceName: readVoice(), recording: false };
const listeners = new Set<() => void>();
const set = (patch: Partial<SpeechState>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};
let runId = 0;
let hold: SpeechSynthesisUtterance[] = []; // keeps utterances alive (Chrome garbage-collection bug)

function readVoice() {
  try {
    return localStorage.getItem(VOICE_KEY);
  } catch {
    return null;
  }
}

/** Audio playing or microphone recording (counts as active study time). */
export const isSpeaking = () => !!state.playing || state.recording;

export function useSpeech(): SpeechState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => state
  );
}

const FEM = /aria|jenny|ava|emma|michelle|samantha|zira|susan|allison|joanna|salli|kendra|kimberly|ivy|libby|sonia|natasha|karen|moira|tessa|serena|nicky|victoria|hazel|ana\b|clara|jane|nancy|sara|amber|ashley|cora|elizabeth|monica|female|mulher|zoe|catherine|fiona|kate|martha|shelley|sandy|flo|grandma|ellie|maisie|bella|heera|neerja|molly|olivia|natasha|emily/i;
const MAL = /guy|davis|andrew|brian|christopher|eric|roger|steffan|tony|ryan|thomas|david|mark|alex\b|daniel|fred|aaron|arthur|oliver|tom\b|male|george|rishi|evan|nathan|jason|brandon|jacob|ralph|reed|rocko|eddy|grandpa|william|liam|noah|james|ethan|kai|homem|rishi|prabhat|lee|gordon/i;

/** Higher = more natural English voice. Negative = not English. */
export function voiceScore(v: SpeechSynthesisVoice): number {
  const n = v.name;
  let s = 0;
  if (!/^en/i.test(v.lang)) return -1;
  if (/en[-_]US/i.test(v.lang)) s += 6;
  else if (/en[-_]GB/i.test(v.lang)) s += 4;
  else s += 1;
  if (/natural|neural|premium|enhanced|siri|wavenet|studio/i.test(n)) s += 30;
  if (/online/i.test(n)) s += 12;
  if (/^google/i.test(n)) s += 14;
  if (/\b(ava|samantha|aria|jenny|guy|andrew|emma|zoe|evan|nathan|allison|tom)\b/i.test(n)) s += 5;
  if (/compact|espeak|zira|david desktop|mark desktop|novelty|bad news|bells|boing|bubbles|cellos|jester|organ|superstar|trinoids|whisper|wobble|zarvox|albert|bahh|junior|ralph|fred|kathy|grandma|grandpa|rocko|shelley|sandy|flo|eddy|reed/i.test(n))
    s -= 25;
  return s;
}

function voiceGender(v: SpeechSynthesisVoice): "f" | "m" | "" {
  const n = v.name.replace(/microsoft|google|online|natural|english|united|states|kingdom|\(|\)|-/gi, " ");
  if (/\bfemale\b|google us english/i.test(v.name)) return "f";
  if (/\bmale\b/i.test(v.name)) return "m";
  if (FEM.test(n)) return "f";
  if (MAL.test(n)) return "m";
  return "";
}

function loadVoices() {
  if (!hasTTS) return;
  const voices = speechSynthesis
    .getVoices()
    .filter((v) => voiceScore(v) >= 0)
    .sort((a, b) => voiceScore(b) - voiceScore(a));
  set({ voices });
}
if (hasTTS) {
  loadVoices();
  speechSynthesis.addEventListener?.("voiceschanged", loadVoices);
}

export function mainVoice(s: SpeechState = state): SpeechSynthesisVoice | null {
  return s.voices.find((v) => v.name === s.voiceName) || s.voices[0] || null;
}

function partnerVoice(a: SpeechSynthesisVoice | null) {
  if (!a) return null;
  const g = voiceGender(a);
  const want = g === "f" ? "m" : g === "m" ? "f" : "";
  const others = state.voices.filter((v) => v.name !== a.name);
  const same = (x: SpeechSynthesisVoice) => x.lang.slice(0, 5) === a.lang.slice(0, 5);
  const close = (v: SpeechSynthesisVoice) => voiceScore(v) >= voiceScore(a) - 12;
  return (
    others.find((v) => want && voiceGender(v) === want && same(v) && close(v)) ||
    others.find((v) => want && voiceGender(v) === want && close(v)) ||
    others.find(close) ||
    a
  );
}

export function chooseVoice(name: string) {
  try {
    localStorage.setItem(VOICE_KEY, name);
  } catch {}
  set({ voiceName: name });
}

export function stopSpeech() {
  runId++;
  hold = [];
  if (hasTTS) speechSynthesis.cancel();
  if (state.playing || state.current !== null) set({ playing: null, current: null });
}

interface QueueItem {
  text: string;
  voice: SpeechSynthesisVoice | null;
  pause?: number;
  /** Dialogue sentence index to highlight. */
  k?: number;
}

/** Speaks the items one after another with natural pauses. */
function speakQueue(items: QueueItem[], rate: number, mode: PlayMode = null) {
  if (!hasTTS) {
    alert("Seu navegador não oferece áudio de voz.");
    return;
  }
  stopSpeech();
  if (!state.voices.length) loadVoices();
  const id = runId;
  set({ playing: mode });
  let n = 0;
  const next = () => {
    if (id !== runId) return;
    if (n >= items.length) {
      set({ playing: null, current: null });
      return;
    }
    const it = items[n++];
    const u = new SpeechSynthesisUtterance(it.text);
    u.lang = it.voice?.lang || "en-US";
    if (it.voice) u.voice = it.voice;
    u.rate = rate;
    u.pitch = 1;
    hold.push(u);
    set({ current: it.k ?? null });
    let done = false;
    const fin = () => {
      if (done) return;
      done = true;
      clearTimeout(guard);
      setTimeout(next, it.pause ?? 220);
    };
    u.onend = fin;
    u.onerror = fin;
    const guard = setTimeout(fin, 4000 + (it.text.length * 220) / rate);
    speechSynthesis.speak(u);
  };
  setTimeout(next, 60);
}

export function speak(text: string, rate = 1) {
  const v = mainVoice();
  speakQueue(
    chunks(String(text)).map((t) => ({ text: t, voice: v, pause: 260 })),
    rate * 0.97
  );
}

/** Plays a dialogue with two different voices (person A and person B). */
export function playDialogue(dialogue: { text: string; speakers: string }, rate: number, mode: PlayMode) {
  const a = mainVoice();
  const b = partnerVoice(a);
  const sp = dialogue.speakers || "";
  const ss = sentences(dialogue.text);
  speakQueue(
    ss.map((t, k) => ({
      text: t,
      voice: (sp[k] || "A") === "B" ? b : a,
      k,
      pause: sp[k + 1] && sp[k + 1] !== sp[k] ? 650 : 280,
    })),
    rate,
    mode
  );
}

// ---------- speech recognition ----------
const SR: any = typeof window !== "undefined" ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : null;
let recog: any = null;

export const recognitionSupported = () => !!SR;

export function stopRecognition() {
  if (recog) {
    try {
      recog.abort();
    } catch {}
    recog = null;
  }
  if (state.recording) set({ recording: false });
}

export function stopAllSpeech() {
  stopRecognition();
  stopSpeech();
}

export interface RecognitionHandlers {
  /** Up to 3 alternatives of what the student said. */
  onResult: (alternatives: string[]) => void;
  onError: (error: string) => void;
  onNoSpeech: () => void;
}

/** Starts listening in English. Returns false if the browser does not support it. */
export function startRecognition(h: RecognitionHandlers): boolean {
  if (!SR) return false;
  stopSpeech();
  const r = new SR();
  recog = r;
  r.lang = "en-US";
  r.interimResults = false;
  r.maxAlternatives = 3;
  let got = false;
  set({ recording: true });
  r.onresult = (e: any) => {
    got = true;
    h.onResult([...e.results[0]].map((a: any) => a.transcript));
  };
  r.onerror = (e: any) => {
    if (recog !== r) return; // aborted on purpose
    got = true;
    h.onError(e.error);
  };
  r.onend = () => {
    if (recog !== r) return; // aborted (page changed or stopped by the student)
    if (!got) h.onNoSpeech();
    recog = null;
    stopRecognition();
  };
  try {
    r.start();
  } catch {
    stopRecognition();
  }
  return true;
}
