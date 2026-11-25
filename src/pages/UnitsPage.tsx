import { UNITS } from "../content";
import { ProgressBar } from "../components/ProgressBar";
import { PageHeader } from "../components/ui";
import { useNav } from "../state/nav";
import { TASKS, unitComplete, unitTasks } from "../state/progress";
import { useProgress } from "../state/store";

export function UnitsPage() {
  const p = useProgress();
  const { openUnit, practiceUnit } = useNav();
  return (
    <>
      <PageHeader eyebrow="UNIDADES" title={`As ${UNITS.length} unidades`}>
        Cada unidade tem 4 tarefas: estudar o conteúdo, concluir a prática, revisar os flashcards e ouvir o listening.
      </PageHeader>
      <div className="grid">
        {UNITS.map((u, i) => {
          const n = unitTasks(p, i);
          return (
            <article className={"card unit-card" + (unitComplete(p, i) ? " is-done" : "")} key={i}>
              <div className="unit-meta">
                <span className="tag">UNIDADE {i + 1}</span>
                {unitComplete(p, i) ? <span className="status status-done">✓ Concluída</span> : <span className="muted small">{n}/{TASKS.length} tarefas</span>}
              </div>
              <h3>{u.title}</h3>
              <p>{u.goals.slice(0, 2).join(" · ")}</p>
              <ProgressBar value={n / TASKS.length} tone={unitComplete(p, i) ? "green" : undefined} />
              <div className="actions">
                <button className="btn" onClick={() => openUnit(i)}>
                  Abrir unidade
                </button>
                <button className="btn-secondary" onClick={() => practiceUnit(i)}>
                  Praticar
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
