import { useState } from "react";
import { UNITS } from "../content";
import { ProgressBar } from "../components/ProgressBar";
import { PageHeader, StatCard } from "../components/ui";
import type { IconName } from "../components/Icon";
import { resetProgress } from "../state/actions";
import { useNav } from "../state/nav";
import {
  TASKS,
  TOTAL_TASKS,
  accuracy,
  completedUnits,
  pendingTasks,
  taskDone,
  totalTasks,
  unitComplete,
  unitTasks,
  type ExamResult,
} from "../state/progress";
import { useProgress } from "../state/store";

function ExamRow({ e, ix }: { e: ExamResult; ix: number }) {
  const [open, setOpen] = useState(false);
  const w = Array.isArray(e.wrong) ? e.wrong : null;
  const id = `exam-rev-${ix}`;
  return (
    <>
      <p style={{ fontSize: 13, margin: "6px 0" }}>
        <b>{(+e.grade || 0).toFixed(1)}/10</b> · {String(e.score)}/{String(e.total)} acertos · {Array.isArray(e.units) ? e.units.length : 0} unidade(s) ·{" "}
        <span className="muted">{new Date(e.date).toLocaleString("pt-BR")}</span>
        {w && w.length > 0 && (
          <>
            {" "}
            <button className="linkbtn" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
              Ver revisão ({w.length} erro{w.length > 1 ? "s" : ""})
            </button>
          </>
        )}
      </p>
      {w && w.length > 0 && (
        <div id={id} hidden={!open}>
          {w.map((x, k) => (
            <div key={k} className="feedback" style={{ fontSize: 13 }}>
              <span className="tag">UNIT {(+x.u || 0) + 1}</span>
              <p style={{ margin: "6px 0 4px" }}>
                <b>{String(x.q ?? "")}</b>
              </p>
              <div>
                Sua resposta: <span style={{ color: "var(--red)" }}>{String(x.a ?? "")}</span> · Correta:{" "}
                <span style={{ color: "var(--green)" }}>{String(x.c ?? "")}</span>
              </div>
              <div className="muted">{String(x.e ?? "")}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export function ProgressPage() {
  const p = useProgress();
  const { openUnit } = useNav();
  const cu = completedUnits(p);
  const tt = totalTasks(p);
  const best = p.exams.length ? Math.max(...p.exams.map((e) => e.grade)) : null;
  const next = UNITS.findIndex((_, i) => !unitComplete(p, i));
  const stats: [string, string | number, IconName, "blue" | "green" | "orange" | "navy"][] = [
    ["Unidades concluídas", `${cu}/${UNITS.length}`, "check", "green"],
    ["Pontos", p.points, "trophy", "orange"],
    ["Respondidas", p.done, "pencil", "blue"],
    ["Acertos", p.correct, "check", "green"],
    ["Precisão", accuracy(p) + "%", "chart", "navy"],
    ["Melhor simulado", best === null ? "—" : best.toFixed(1) + "/10", "trophy", "orange"],
  ];
  return (
    <>
    <PageHeader eyebrow="MEU DESEMPENHO" title="Seu progresso no curso">
      Dados calculados a partir das atividades que você concluiu.
    </PageHeader>
    <div className="stat-grid stat-grid-3">
      {stats.map(([label, value, icon, tone]) => (
        <StatCard key={label} icon={icon} tone={tone} value={value} label={label} />
      ))}
    </div>
    <section className="card">
      <div className="unit-meta">
        <b>
          {cu}/{UNITS.length} unidades concluídas · {tt}/{TOTAL_TASKS} tarefas
        </b>
        <span>{Math.round((tt / TOTAL_TASKS) * 100)}%</span>
      </div>
      <ProgressBar value={tt / TOTAL_TASKS} style={{ margin: "8px 0 14px" }} />
      {next >= 0 ? (
        <div className="notice" style={{ marginTop: 14 }}>
          Próximo passo:{" "}
          <b>
            Unidade {next + 1} · {UNITS[next].title}
          </b>{" "}
          — {pendingTasks(p, next).map((t) => t[1]).join(", ")}.{" "}
          <button className="btn-secondary" style={{ marginLeft: 6 }} onClick={() => openUnit(next)}>
            Continuar →
          </button>
        </div>
      ) : (
        <div className="notice" style={{ marginTop: 14 }}>
          🎉 Você concluiu todas as unidades!
        </div>
      )}
      <h3>Desempenho por unidade</h3>
      {UNITS.map((u, i) => {
        const n = unitTasks(p, i);
        return (
          <div key={i} className="unit-row">
            <div className="unit-meta">
              <span style={{ fontSize: 13 }}>
                {i + 1}. {u.title}
              </span>
              <span className="muted" style={{ fontSize: 12 }}>
                {unitComplete(p, i) ? "✅ Concluída" : `${n}/${TASKS.length}`}
              </span>
            </div>
            <ProgressBar value={n / TASKS.length} tone={unitComplete(p, i) ? "green" : undefined} />
            <div className="checks">
              {TASKS.map(([key, label]) => (
                <span key={key} className={taskDone(p, key, i) ? "ok" : ""}>
                  {taskDone(p, key, i) ? "✔" : "○"} {label}
                </span>
              ))}
            </div>
          </div>
        );
      })}
      <h3>Histórico de simulados</h3>
      {p.exams.length ? (
        p.exams
          .map((e, ix) => ({ e, ix }))
          .reverse()
          .map(({ e, ix }) => <ExamRow key={`${ix}-${e.date}`} e={e} ix={ix} />)
      ) : (
        <p className="muted" style={{ fontSize: 13 }}>
          Nenhum simulado realizado ainda.
        </p>
      )}
      <p className="muted" style={{ fontSize: 12, marginTop: 15 }}>
        O progresso fica salvo na sua conta de aluno e acompanha você em qualquer computador ou celular.
      </p>
      <button
        className="btn-secondary"
        style={{ width: "100%", marginTop: 10 }}
        onClick={() => {
          if (confirm("Deseja apagar todo o seu progresso?")) {
            resetProgress();
          }
        }}
      >
        Zerar meu progresso
      </button>
    </section>
    </>
  );
}
