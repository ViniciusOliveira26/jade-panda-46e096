// Sub-menu of "Exercícios": practice, reading, writing and the mock exam.
import { useNav, type Page } from "../state/nav";

const TABS: [Page, string][] = [
  ["practice", "Prática"],
  ["read", "Leitura"],
  ["write", "Escrita"],
  ["exam", "Simulado"],
];

export function ExerciseTabs() {
  const { nav, practiceUnit, readUnit, writeUnit, go } = useNav();
  const open: Record<string, () => void> = {
    practice: () => practiceUnit(nav.unit),
    read: () => readUnit(nav.unit),
    write: () => writeUnit(nav.unit),
    exam: () => go("exam"),
  };
  return (
    <div className="subtabs" role="navigation" aria-label="Tipos de exercício">
      {TABS.map(([page, label]) => (
        <button
          key={page}
          type="button"
          className={(nav.page === page ? "active" : "") + (page === "exam" ? " subtab-challenge" : "")}
          aria-current={nav.page === page ? "page" : undefined}
          onClick={open[page]}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
