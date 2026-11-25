import { UNITS } from "../content";
import { useNav } from "../state/nav";

/** "Unidade:" select. `onPick` opens the chosen unit in the current activity. */
export function UnitPicker({ onPick }: { onPick: (i: number) => void }) {
  const { nav } = useNav();
  return (
    <label className="muted" style={{ display: "block", fontSize: 13, marginBottom: 10 }}>
      Unidade:{" "}
      <select
        value={nav.unit}
        onChange={(e) => onPick(+e.target.value)}
        style={{ font: "inherit", padding: 6, borderRadius: 8, border: "1px solid var(--line)" }}
      >
        {UNITS.map((u, j) => (
          <option key={j} value={j}>
            {j + 1}. {u.title}
          </option>
        ))}
      </select>
    </label>
  );
}
