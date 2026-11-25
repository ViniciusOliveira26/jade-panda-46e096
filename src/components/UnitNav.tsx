import { UNITS } from "../content";
import { useNav } from "../state/nav";

/** Previous unit · All units · Next unit (or mock exam). `en` = labels in English. */
export function UnitNav({ unit, en }: { unit: number; en?: boolean }) {
  const { openUnit, go } = useNav();
  const t = en
    ? ["← Previous unit", "☰ All units", "Next unit →", "Go to the mock exam →"]
    : ["← Unidade anterior", "☰ Todas as unidades", "Próxima unidade →", "Ir para o simulado →"];
  return (
    <div className="actions unit-nav">
      {unit > 0 && (
        <button className="btn-secondary" onClick={() => openUnit(unit - 1)}>
          {t[0]}
        </button>
      )}
      <button className="btn-secondary" onClick={() => go("units")}>
        {t[1]}
      </button>
      {unit < UNITS.length - 1 ? (
        <button className="btn" onClick={() => openUnit(unit + 1)}>
          {t[2]}
        </button>
      ) : (
        <button className="btn" onClick={() => go("exam")}>
          {t[3]}
        </button>
      )}
    </div>
  );
}
