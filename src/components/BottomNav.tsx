// Bottom tab bar on phones: the most used sections, plus "Mais" to open the full menu.
import { navSection, useNav, type Page } from "../state/nav";
import { Icon, type IconName } from "./Icon";

const TABS: { page: Page; icon: IconName; label: string }[] = [
  { page: "home", icon: "home", label: "Início" },
  { page: "journey", icon: "route", label: "Jornada" },
  { page: "practice", icon: "pencil", label: "Exercícios" },
  { page: "progress", icon: "chart", label: "Desempenho" },
];

export function BottomNav({ menuOpen, onMenu }: { menuOpen: boolean; onMenu: () => void }) {
  const { nav, go } = useNav();
  const active = navSection(nav.page);
  const inTabs = TABS.some((t) => t.page === active);
  return (
    <nav className="bottomnav" aria-label="Navegação rápida">
      {TABS.map((t) => (
        <button
          key={t.page}
          type="button"
          className={"bottomnav-item" + (active === t.page && !menuOpen ? " active" : "")}
          aria-current={active === t.page ? "page" : undefined}
          onClick={() => {
            if (menuOpen) onMenu();
            go(t.page);
          }}
        >
          <Icon name={t.icon} size={22} />
          <span>{t.label}</span>
        </button>
      ))}
      <button
        type="button"
        className={"bottomnav-item" + (menuOpen || !inTabs ? " active" : "")}
        aria-expanded={menuOpen}
        aria-controls="app-nav"
        onClick={onMenu}
      >
        <Icon name={menuOpen ? "close" : "more"} size={22} />
        <span>{menuOpen ? "Fechar" : "Mais"}</span>
      </button>
    </nav>
  );
}
