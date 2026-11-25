// Main menu: fixed sidebar on large screens, slide-in drawer on tablets and phones.
import { NAV_ITEMS, navSection, useNav } from "../state/nav";
import { Icon } from "./Icon";

export function NavBar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { nav, go } = useNav();
  const active = navSection(nav.page);
  return (
    <>
      <div className={"nav-backdrop" + (open ? " show" : "")} onClick={onClose} aria-hidden="true" />
      <nav id="app-nav" className={"sidenav" + (open ? " open" : "")} aria-label="Navegação principal">
        <ul>
          {NAV_ITEMS.map((x) => (
            <li key={x.page}>
              <button
                type="button"
                className={"sidenav-item" + (active === x.page ? " active" : "")}
                aria-current={active === x.page ? "page" : undefined}
                onClick={() => {
                  go(x.page);
                  onClose();
                }}
              >
                <Icon name={x.icon} />
                {x.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
