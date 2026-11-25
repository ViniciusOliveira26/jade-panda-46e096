import type { CSSProperties } from "react";

/** Horizontal progress bar. `value` from 0 to 1. `tone`: green (completed) or light (on dark backgrounds). */
export function ProgressBar({ value, style, tone, label }: { value: number; style?: CSSProperties; tone?: "green" | "light"; label?: string }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div
      className={"progress" + (tone ? " progress-" + tone : "") + (pct >= 100 ? " is-full" : "")}
      style={style}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={label ?? "Progresso"}
    >
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}
