// Top bar of the course: menu button (tablets), logo, sync status, notifications, student and "Sair".
import { useState } from "react";
import { useSyncStatus } from "../services/sync";
import { useNav } from "../state/nav";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Notifications } from "./Notifications";

export { initials } from "./Avatar";

interface Props {
  name: string;
  picture?: string;
  onLogout: () => Promise<void>;
  menuOpen: boolean;
  onMenu: () => void;
}

export function Header({ name, picture, onLogout, menuOpen, onMenu }: Props) {
  const sync = useSyncStatus();
  const { go } = useNav();
  const [busy, setBusy] = useState(false);
  return (
    <header className="topbar">
      <button type="button" className="icon-btn topbar-menu" aria-expanded={menuOpen} aria-controls="app-nav" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={onMenu}>
        <Icon name={menuOpen ? "close" : "menu"} />
      </button>
      <button type="button" className="logo-link" onClick={() => go("home")} aria-label="Native Speakers — Início">
        <Logo />
      </button>
      <div className="topbar-right">
        {sync && (
          <span className="sync" role="status">
            {sync}
          </span>
        )}
        <Notifications />
        <button type="button" className="user-chip" onClick={() => go("profile")} title="Meu perfil" aria-label={`Meu perfil (${name})`}>
          <Avatar name={name} src={picture} />
          <span className="user-chip-name" aria-hidden="true">
            {name}
          </span>
        </button>
        <button
          type="button"
          className="btn-ghost"
          disabled={busy}
          aria-label="Sair da conta"
          onClick={async () => {
            setBusy(true);
            try {
              await onLogout();
            } finally {
              setBusy(false);
            }
          }}
        >
          <Icon name="logout" size={18} />
          <span className="hide-sm">{busy ? "Saindo…" : "Sair"}</span>
        </button>
      </div>
    </header>
  );
}
