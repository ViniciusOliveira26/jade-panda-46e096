// Global progress store. Components read it with useProgress(); actions.ts changes it.
// Every change is handed to the persist handler (cloud sync, see services/sync.ts).
import { useSyncExternalStore } from "react";
import { defaultProgress, type Progress } from "./progress";

let progress: Progress = defaultProgress();
const listeners = new Set<() => void>();
let persist: ((p: Progress) => void) | null = null;

export const getProgress = () => progress;

export function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Replaces the progress. `save` sends it to the account (default). */
export function setProgress(next: Progress, save = true) {
  progress = next;
  listeners.forEach((l) => l());
  if (save) persist?.(next);
}

/** Changes a copy of the progress and saves it. */
export function updateProgress(fn: (draft: Progress) => void) {
  const draft = structuredClone(progress);
  fn(draft);
  setProgress(draft);
}

export function setPersistHandler(fn: ((p: Progress) => void) | null) {
  persist = fn;
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, getProgress, getProgress);
}
