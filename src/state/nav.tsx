// Screen navigation (which page and unit is open). Not saved: every login starts on "Início".
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { markTask, recordActivity } from "./actions";

import type { IconName } from "../components/Icon";
import type { Target } from "./insights";

export type Page =
  | "home"
  | "journey"
  | "units"
  | "unit"
  | "practice"
  | "listening"
  | "vocabulary"
  | "read"
  | "write"
  | "exam"
  | "progress"
  | "profile";

/** Main menu, in the order shown to the student. */
export const NAV_ITEMS: { page: Page; icon: IconName; label: string }[] = [
  { page: "home", icon: "home", label: "Início" },
  { page: "journey", icon: "route", label: "Minha jornada" },
  { page: "units", icon: "book", label: "Unidades" },
  { page: "listening", icon: "headphones", label: "Listening" },
  { page: "vocabulary", icon: "cards", label: "Vocabulário" },
  { page: "practice", icon: "pencil", label: "Exercícios" },
  { page: "progress", icon: "chart", label: "Meu desempenho" },
  { page: "profile", icon: "user", label: "Meu perfil" },
];

/** Screen names read by screen readers after navigation. */
const PAGE_TITLES: Partial<Record<Page, string>> = {
  unit: "Unidade",
  read: "Exercícios · Leitura",
  write: "Exercícios · Escrita",
  exam: "Exercícios · Simulado",
};

/** Menu item highlighted for each page. Reading, writing and the mock exam live under "Exercícios". */
export const navSection = (p: Page): Page =>
  p === "unit" ? "units" : p === "read" || p === "write" || p === "exam" ? "practice" : p;

export interface NavState {
  page: Page;
  unit: number;
  /** Multiple-choice question index. */
  qIndex: number;
  /** "Complete the sentence" index. */
  fIndex: number;
  mode: "mc" | "fill";
  /** Listening: sentence being repeated. */
  repeatIdx: number;
  /** Listening: audio already played (shows the Repeat area). */
  heard: boolean;
  repeatOpen: boolean;
  /** Vocabulary: flashcard index and side. */
  card: number;
  flipped: boolean;
  /** Changes on every navigation so the page starts fresh. */
  key: number;
  /** Text read by screen readers after navigation. */
  announce: string;
}

const INITIAL: NavState = {
  page: "home",
  unit: 0,
  qIndex: 0,
  fIndex: 0,
  mode: "mc",
  repeatIdx: 0,
  heard: false,
  repeatOpen: false,
  card: 0,
  flipped: false,
  key: 0,
  announce: "",
};

interface NavApi {
  nav: NavState;
  /** Opens a page (scrolls to the top). */
  go: (page: Page, patch?: Partial<NavState>) => void;
  /** Changes the current screen without leaving it. */
  patch: (patch: Partial<NavState>) => void;
  reset: () => void;
  openUnit: (i: number) => void;
  practiceUnit: (i: number) => void;
  fillUnit: (i: number) => void;
  vocabUnit: (i: number) => void;
  listenUnit: (i: number) => void;
  readUnit: (i: number) => void;
  writeUnit: (i: number) => void;
  /** Opens a dashboard target (continue / recommendation / path). */
  open: (t: Target) => void;
}

const NavContext = createContext<NavApi | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState<NavState>(INITIAL);

  const go = useCallback((page: Page, patch: Partial<NavState> = {}) => {
    const item = NAV_ITEMS.find((x) => x.page === navSection(page));
    const announce = PAGE_TITLES[page] ?? item?.label ?? "";
    setNav((n) => ({ ...n, ...patch, page, key: n.key + 1, announce }));
    window.scrollTo(0, 0);
  }, []);
  const patch = useCallback((p: Partial<NavState>) => setNav((n) => ({ ...n, ...p })), []);
  const reset = useCallback(() => setNav((n) => ({ ...INITIAL, key: n.key + 1 })), []);

  const api = useMemo<NavApi>(
    () => ({
      nav,
      go,
      patch,
      reset,
      openUnit: (i) => {
        go("unit", { unit: i });
        markTask("studied", i);
        recordActivity("study", i);
      },
      practiceUnit: (i) => go("practice", { unit: i, qIndex: 0, mode: "mc" }),
      fillUnit: (i) => go("practice", { unit: i, fIndex: 0, mode: "fill" }),
      vocabUnit: (i) => go("vocabulary", { unit: i, card: 0, flipped: false }),
      listenUnit: (i) => go("listening", { unit: i, repeatIdx: 0, heard: false, repeatOpen: false }),
      readUnit: (i) => go("read", { unit: i }),
      writeUnit: (i) => go("write", { unit: i }),
      open: (t) => {
        const ix = t.index ?? 0;
        switch (t.to) {
          case "unit":
            go("unit", { unit: t.unit });
            markTask("studied", t.unit);
            recordActivity("study", t.unit);
            return;
          case "practice":
            return go("practice", { unit: t.unit, qIndex: ix, mode: "mc" });
          case "fill":
            return go("practice", { unit: t.unit, fIndex: ix, mode: "fill" });
          case "vocab":
            return go("vocabulary", { unit: t.unit, card: ix, flipped: false });
          case "listen":
            return go("listening", { unit: t.unit, repeatIdx: ix, heard: false, repeatOpen: false });
          case "read":
            return go("read", { unit: t.unit });
          case "write":
            return go("write", { unit: t.unit });
          case "exam":
            return go("exam");
        }
      },
    }),
    [nav, go, patch, reset]
  );
  return <NavContext.Provider value={api}>{children}</NavContext.Provider>;
}

export function useNav(): NavApi {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used inside NavProvider");
  return ctx;
}
