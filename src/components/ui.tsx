// Reusable building blocks for the redesign: page header, stat card, status message, form field.
import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

/** Title (and optional subtitle / eyebrow / actions) at the top of a page. */
export function PageHeader({ eyebrow, title, children, actions }: { eyebrow?: string; title: ReactNode; children?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {children && <p className="muted">{children}</p>}
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </header>
  );
}

/** Number + label tile. `tone` colours the icon. */
export function StatCard({ icon, value, label, tone = "blue" }: { icon: IconName; value: ReactNode; label: string; tone?: "blue" | "green" | "orange" | "navy" }) {
  return (
    <div className="stat-card">
      <span className={"stat-icon tone-" + tone}>
        <Icon name={icon} size={20} />
      </span>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

/** Success / error / info message box. */
export function Alert({ type = "info", children }: { type?: "info" | "error" | "ok"; children: ReactNode }) {
  const icon: IconName = type === "error" ? "alert" : type === "ok" ? "check" : "help";
  return (
    <div className={"alert alert-" + type} role={type === "error" ? "alert" : "status"}>
      <Icon name={icon} size={18} />
      <div>{children}</div>
    </div>
  );
}

type FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  hint?: string;
  error?: string;
  icon?: IconName;
};

/** Labelled input with an optional hint, inline error and show/hide toggle for passwords. */
export function Field({ label, hint, error, icon, type = "text", ...input }: FieldProps) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPass = type === "password";
  const describedBy = [error ? id + "-err" : "", hint && !error ? id + "-hint" : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className={"field" + (error ? " has-error" : "")}>
      <label htmlFor={id}>{label}</label>
      <div className="field-control">
        {icon && <Icon name={icon} size={18} className="icon field-icon" />}
        <input
          id={id}
          type={isPass && show ? "text" : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={"input" + (icon ? " with-icon" : "") + (isPass ? " with-toggle" : "")}
          {...input}
        />
        {isPass && (
          <button type="button" className="field-toggle" aria-label={show ? "Ocultar senha" : "Mostrar senha"} aria-pressed={show} onClick={() => setShow(!show)}>
            <Icon name={show ? "eyeOff" : "eye"} size={18} />
          </button>
        )}
      </div>
      {hint && !error && (
        <small className="field-hint" id={id + "-hint"}>
          {hint}
        </small>
      )}
      {error && (
        <small className="field-error" id={id + "-err"}>
          {error}
        </small>
      )}
    </div>
  );
}
