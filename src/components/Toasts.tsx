import { useToasts } from "../state/toasts";

export function Toasts() {
  const toasts = useToasts();
  return (
    <div id="toasts" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={"toast" + (t.hiding ? " hide" : "")}>
          {t.text}
        </div>
      ))}
    </div>
  );
}
