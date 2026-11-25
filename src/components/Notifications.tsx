// Bell button in the top bar with a panel of real notifications (units completed, exams, streak).
import { useEffect, useId, useRef, useState } from "react";
import { markNotificationsSeen } from "../state/actions";
import { timeAgo } from "../state/activity";
import { notifications, unreadCount } from "../state/insights";
import { useProgress } from "../state/store";
import { Icon } from "./Icon";

export function Notifications() {
  const p = useProgress();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const id = useId();
  const list = notifications(p);
  const unread = unreadCount(p, list);
  // Items that were new when the panel was opened stay highlighted while it is open.
  const [seenBefore, setSeenBefore] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => box.current && !box.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      box.current?.querySelector<HTMLButtonElement>("button")?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => {
    if (!open) {
      setSeenBefore(p.notifSeen || 0);
      if (unread) markNotificationsSeen();
    }
    setOpen(!open);
  };

  return (
    <div className="notif" ref={box}>
      <button
        type="button"
        className="icon-btn notif-btn"
        aria-expanded={open}
        aria-controls={id}
        aria-label={unread ? `Notificações: ${unread} nova${unread > 1 ? "s" : ""}` : "Notificações"}
        onClick={toggle}
      >
        <Icon name="bell" />
        {unread > 0 && (
          <span className="notif-count" aria-hidden="true">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
      {open && (
        <div className="notif-panel" id={id} role="region" aria-label="Notificações">
          <div className="notif-head">
            <b>Notificações</b>
          </div>
          {list.length === 0 ? (
            <div className="empty empty-sm">
              <Icon name="bell" size={22} />
              <p>Nenhuma notificação por enquanto. Avisos sobre unidades concluídas, simulados e sua sequência de estudos aparecem aqui.</p>
            </div>
          ) : (
            <ul className="notif-list">
              {list.map((n) => (
                <li key={n.id} className={"notif-item tone-dot-" + n.tone + (n.t > seenBefore ? " is-new" : "")}>
                  <span className="notif-dot" aria-hidden="true" />
                  <div>
                    <p>{n.text}</p>
                    <small>{timeAgo(n.t)}</small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
