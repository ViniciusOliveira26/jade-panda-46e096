// Cloud sync of the student's progress (Netlify Database through /api/progress),
// with a copy on the device in case the connection fails.
import { useSyncExternalStore } from "react";
import type { User } from "@netlify/identity";
import { getUser } from "@netlify/identity";
import { applyProgress, type Progress } from "../state/progress";

const LEGACY_KEY = "connectivity-foundations-progress";
const backupKey = (u: User) => `cf-progress-${u.id}`;
const legacyDeclinedKey = (u: User) => `ns-legacy-declined-${u.id}`;

let currentUser: User | null = null;
let pending: Progress | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
let saving = false;

// ---------- sync status text shown in the header ----------
let status = "";
const listeners = new Set<() => void>();
function setStatus(text: string) {
  status = text;
  listeners.forEach((l) => l());
}
export function useSyncStatus(): string {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => status,
    () => status
  );
}

async function fetchProgress(): Promise<unknown> {
  const res = await fetch("/api/progress", { credentials: "same-origin" });
  if (!res.ok) throw new Error("load failed " + res.status);
  return (await res.json()).progress;
}

async function pushProgress(keepalive = false): Promise<void> {
  if (!pending || !currentUser || saving) return;
  const snapshot = pending;
  const body = JSON.stringify({ progress: snapshot });
  saving = true;
  setStatus("Salvando…");
  try {
    const res = await fetch("/api/progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body,
      keepalive,
    });
    if (res.status === 401) {
      // Session expired: refresh the token, then retry.
      await getUser();
      throw new Error("unauthorized");
    }
    if (!res.ok) throw new Error("save failed " + res.status);
    if (pending === snapshot) pending = null;
    setStatus("✔ Progresso salvo");
  } catch {
    setStatus("⚠ Não salvo — tentando de novo");
    clearTimeout(timer);
    timer = setTimeout(() => pushProgress(), 5000);
  } finally {
    saving = false;
    if (pending && pending !== snapshot) schedule();
  }
}

function schedule() {
  clearTimeout(timer);
  timer = setTimeout(() => pushProgress(), 700);
}

/** Called on every progress change. */
export function saveProgress(progress: Progress) {
  if (!currentUser) return;
  pending = progress;
  try {
    localStorage.setItem(backupKey(currentUser), JSON.stringify(progress));
  } catch {}
  schedule();
}

const flush = () => {
  if (pending) pushProgress(true);
};
if (typeof window !== "undefined") {
  addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
}

export interface LoadedProgress {
  progress: Progress;
  /** Progress came from this device (not the server) and must be uploaded. */
  migrate: boolean;
}

/** Loads the student's progress from the server, falling back to this device's copy. */
export async function loadProgress(user: User): Promise<LoadedProgress> {
  currentUser = user;
  let progress: unknown = null;
  let fromServer = false;
  try {
    progress = await fetchProgress();
    fromServer = true;
  } catch {
    // Offline or server issue: use this device's copy for this student.
  }
  let local: unknown = null;
  try {
    local = JSON.parse(localStorage.getItem(backupKey(user)) || "null");
  } catch {}

  let migrate = false;
  if (!progress) {
    if (local) {
      progress = local;
      migrate = fromServer;
    } else {
      // Progress saved on this device before accounts existed. On shared computers it may belong
      // to someone else, so only import it after the student confirms it is theirs.
      try {
        const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || "null");
        if (legacy && fromServer && !localStorage.getItem(legacyDeclinedKey(user))) {
          const mine = confirm(
            "Encontramos neste aparelho um progresso salvo antes da criação das contas de aluno.\n\n" +
              "Esse progresso é seu? Toque em OK para transferi-lo para a sua conta, ou em Cancelar se ele for de outra pessoa."
          );
          if (mine) {
            progress = legacy;
            migrate = true;
            localStorage.removeItem(LEGACY_KEY);
          } else {
            localStorage.setItem(legacyDeclinedKey(user), "1");
          }
        }
      } catch {}
    }
  }
  setStatus(fromServer ? "✔ Progresso sincronizado" : "⚠ Sem conexão com o servidor");
  return { progress: applyProgress(progress), migrate };
}

/**
 * Sends anything still pending before logout. Returns false if the student chose to stay
 * logged in because the latest progress could not reach the server.
 */
export async function prepareLogout(): Promise<boolean> {
  for (let n = 0; saving && n < 30; n++) await new Promise((r) => setTimeout(r, 100));
  if (pending) await pushProgress();
  clearTimeout(timer);
  const unsynced = !!pending;
  if (
    unsynced &&
    !confirm(
      "Seu progresso mais recente ainda não foi enviado ao servidor (sem conexão). Ele ficará guardado só neste aparelho até você entrar de novo. Deseja sair mesmo assim?"
    )
  ) {
    schedule();
    return false;
  }
  // Remove this student's data from the device (important on shared computers),
  // unless it is the only copy of progress not yet saved on the server.
  if (currentUser && !unsynced) {
    try {
      localStorage.removeItem(backupKey(currentUser));
    } catch {}
  }
  return true;
}

export function endSession() {
  clearTimeout(timer);
  currentUser = null;
  pending = null;
  setStatus("");
}
