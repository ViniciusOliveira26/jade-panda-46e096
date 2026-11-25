import { UNITS } from "../content";
import { useNav } from "../state/nav";
import { pendingTasks } from "../state/progress";
import { useProgress } from "../state/store";

/** Button to the next pending task of the unit, or to the next unit / mock exam. */
export function NextStepButton({ unit }: { unit: number }) {
  const p = useProgress();
  const n = useNav();
  const t = pendingTasks(p, unit)[0];
  if (!t)
    return unit < UNITS.length - 1 ? (
      <button className="btn" onClick={() => n.openUnit(unit + 1)}>
        Próxima unidade →
      </button>
    ) : (
      <button className="btn" onClick={() => n.go("exam")}>
        Ir para o simulado →
      </button>
    );
  const open = { studied: n.openUnit, practiced: n.practiceUnit, flash: n.vocabUnit, listened: n.listenUnit }[t[0]];
  return (
    <button className="btn" onClick={() => open(unit)}>
      Próximo passo: {t[1]} →
    </button>
  );
}
