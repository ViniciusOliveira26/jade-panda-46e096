// Text helpers shared by exercises, speech recognition and text-to-speech.

/** Normalizes an answer for comparison: lowercase, unified apostrophes, no punctuation, single spaces. */
export function norm(t: string): string {
  return t
    .toLowerCase()
    .replace(/[’`´]/g, "'")
    .replace(/[.,!?;:"()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Returns a shuffled copy of the array (Fisher–Yates). */
export function shuffle<T>(a: readonly T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/** Splits a dialogue into sentences. */
export function sentences(text: string): string[] {
  return (text.match(/[^.!?]+[.!?]+/g) ?? []).map((x) => x.trim());
}

const NUMS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

export interface SpeechComparison {
  /** Percentage of target words that were recognized. */
  score: number;
  words: { word: string; ok: boolean }[];
}

/** Compares what the student said with the target sentence, word by word. */
export function compareSpeech(target: string, said: string): SpeechComparison {
  const t = norm(target).split(" ");
  const pool = norm(said)
    .split(" ")
    .map((w) => (NUMS[+w] && /^\d+$/.test(w) ? NUMS[+w] : w));
  const hits = t.map((w) => {
    const j = pool.indexOf(w);
    if (j > -1) {
      pool.splice(j, 1);
      return true;
    }
    return false;
  });
  return {
    score: Math.round((hits.filter(Boolean).length / t.length) * 100),
    words: target.split(/\s+/).map((word, j) => ({ word, ok: !!hits[j] })),
  };
}

/** Splits a long text into sentence-sized chunks for natural text-to-speech pauses. */
export function chunks(text: string): string[] {
  const out: { t: string; join?: boolean }[] = [];
  String(text)
    .split(/\n+/)
    .forEach((line) => {
      line
        .replace(/\s+/g, " ")
        .trim()
        .split(/(?<=[.!?;])\s+(?=["“(A-Z0-9])/)
        .forEach((p) => {
          const l = out.length - 1;
          if (l >= 0 && out[l].join) out[l] = { t: out[l].t + " " + p };
          else out.push({ t: p });
          if (/\b(Mr|Mrs|Ms|Dr|St|Ave|No)\.$/.test(p)) out[out.length - 1].join = true;
        });
    });
  return out.map((x) => x.t.trim()).filter(Boolean);
}
