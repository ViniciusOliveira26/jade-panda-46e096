// Counts active study time: only on study screens, with the tab visible, and while the student has
// interacted in the last 2 minutes (or audio is playing). Saved into the progress every 30 seconds.
import { useEffect, useRef } from "react";
import { addStudyTime } from "../state/activity";
import type { Page } from "../state/nav";
import { updateProgress } from "../state/store";

const STUDY_PAGES = new Set<Page>(["unit", "practice", "listening", "vocabulary", "read", "write", "exam"]);
const IDLE_MS = 2 * 60_000;
const TICK_MS = 5_000;
const COMMIT_SEC = 30;

let pending = 0;

/** Saves the study time counted so far (call before logout). */
export function flushStudyTime() {
  const sec = Math.round(pending);
  pending = 0;
  if (sec >= 1) updateProgress((d) => addStudyTime(d, sec));
}

/** Discards uncounted time (after logout). */
export function resetStudyTime() {
  pending = 0;
}

export function useStudyTimer(page: Page, enabled: boolean, isPlaying: () => boolean = () => false) {
  const pageRef = useRef(page);
  pageRef.current = page;
  const playingRef = useRef(isPlaying);
  playingRef.current = isPlaying;

  useEffect(() => {
    if (!enabled) return;
    let lastInput = Date.now();
    let tick = Date.now();
    const onInput = () => {
      lastInput = Date.now();
    };
    const events = ["pointerdown", "keydown", "scroll", "touchstart", "input"] as const;
    events.forEach((e) => addEventListener(e, onInput, { passive: true, capture: true }));
    const id = setInterval(() => {
      const now = Date.now();
      const dt = Math.min(now - tick, TICK_MS * 2) / 1000;
      tick = now;
      const active = now - lastInput < IDLE_MS || playingRef.current();
      if (document.visibilityState === "visible" && STUDY_PAGES.has(pageRef.current) && active) pending += dt;
      if (pending >= COMMIT_SEC) flushStudyTime();
    }, TICK_MS);
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flushStudyTime();
      else tick = Date.now();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearInterval(id);
      events.forEach((e) => removeEventListener(e, onInput, { capture: true }));
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);
}
