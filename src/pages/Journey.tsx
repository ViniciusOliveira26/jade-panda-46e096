// "Minha jornada": the course as a path, unit by unit, with each task and the mock exam at the end.
import { UNITS } from "../content";
import { DIFFICULTY_LABEL, unitDifficulty } from "../content/levels";
import { unitState } from "../state/insights";
import { Icon } from "../components/Icon";
import { ProgressBar } from "../components/ProgressBar";
import { PageHeader } from "../components/ui";
import { useNav } from "../state/nav";
import { TASKS, TOTAL_TASKS, taskDone, totalTasks, unitComplete, unitTasks, type TaskKey } from "../state/progress";
import { useProgress } from "../state/store";

export function Journey() {
  const p = useProgress();
  const n = useNav();
  const current = UNITS.findIndex((_, i) => !unitComplete(p, i));
  const open: Record<TaskKey, (i: number) => void> = { studied: n.openUnit, practiced: n.practiceUnit, flash: n.vocabUnit, listened: n.listenUnit };
  const best = p.exams.length ? Math.max(...p.exams.map((e) => e.grade)) : null;
  const tt = totalTasks(p);
  return (
    <>
      <PageHeader eyebrow="MINHA JORNADA" title="Seu caminho no curso">
        Siga as unidades na ordem: cada uma é liberada quando a anterior é concluída. Cada unidade tem {TASKS.length} tarefas — toque em uma tarefa para abri-la.
      </PageHeader>
      <section className="card">
        <div className="unit-meta">
          <b>
            {tt}/{TOTAL_TASKS} tarefas concluídas
          </b>
          <span>{Math.round((tt / TOTAL_TASKS) * 100)}%</span>
        </div>
        <ProgressBar value={tt / TOTAL_TASKS} style={{ marginTop: 8 }} />
      </section>
      <ol className="journey">
        {UNITS.map((u, i) => {
          const done = unitComplete(p, i);
          const locked = unitState(p, i) === "locked";
          const state = done ? "done" : locked ? "locked" : i === current ? "current" : unitTasks(p, i) > 0 ? "started" : "todo";
          return (
            <li key={i} className={"journey-step is-" + state}>
              <span className="journey-node" aria-hidden="true">
                {done ? <Icon name="check" size={16} /> : locked ? <Icon name="lock" size={14} /> : i + 1}
              </span>
              <div className="journey-body card">
                <div className="unit-meta">
                  <span className="badge">UNIDADE {i + 1}</span>
                  <span className={"status status-" + state}>
                    {done ? "Concluída" : locked ? "Bloqueada" : state === "current" ? "Você está aqui" : state === "started" ? "Em andamento" : "Disponível"}
                  </span>
                </div>
                <h3>{u.title}</h3>
                <p className="muted small">
                  {u.goals.join(" · ")} · Nível: {DIFFICULTY_LABEL[unitDifficulty(i)]}
                </p>
                {locked ? (
                  <p className="trail-lock">
                    <Icon name="lock" size={14} /> Conclua a Unidade {i} para liberar esta unidade.
                  </p>
                ) : (
                <div className="task-chips">
                  {TASKS.map(([key, label]) => {
                    const ok = taskDone(p, key, i);
                    return (
                      <button key={key} type="button" className={"chip chip-btn" + (ok ? " chip-green" : "")} onClick={() => open[key](i)}>
                        {ok ? <Icon name="check" size={14} /> : <span className="chip-dot" aria-hidden="true" />}
                        {label}
                        <span className="sr-only">{ok ? " (concluída)" : " (pendente)"}</span>
                      </button>
                    );
                  })}
                </div>
                )}
              </div>
            </li>
          );
        })}
        <li className="journey-step is-challenge">
          <span className="journey-node" aria-hidden="true">
            <Icon name="trophy" size={16} />
          </span>
          <div className="journey-body card">
            <div className="unit-meta">
              <span className="badge badge-orange">DESAFIO FINAL</span>
              <span className="muted small">{best === null ? "Nenhum simulado realizado" : `Melhor nota: ${best.toFixed(1)}/10`}</span>
            </div>
            <h3>Simulado</h3>
            <p className="muted">Uma prova com as unidades que você já estudou, com revisão dos erros ao final.</p>
            <button type="button" className="btn btn-challenge" onClick={() => n.go("exam")}>
              Ir para o simulado
            </button>
          </div>
        </li>
      </ol>
    </>
  );
}
