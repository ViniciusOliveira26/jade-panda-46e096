// "Início": the student dashboard, first screen after login. Everything shown comes from the student's
// own saved progress (see state/insights.ts). When there is no data yet, an empty state explains why.
import type { ReactNode } from "react";
import { UNITS } from "../content";
import { DIFFICULTY_LABEL, unitDifficulty } from "../content/levels";
import { Icon, type IconName } from "../components/Icon";
import { ProgressBar } from "../components/ProgressBar";
import { formatDuration, timeAgo } from "../state/activity";
import { ACTIVITY_LABEL, continueInfo, currentUnit, recommendations, summary, unitPercent, unitState, type RecKind, type Summary } from "../state/insights";
import { useNav } from "../state/nav";
import type { Progress } from "../state/progress";
import { useProgress } from "../state/store";

const WEEKDAY = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const REC_ICON: Record<RecKind, IconName> = { grammar: "book", vocab: "cards", listening: "headphones", reading: "eye", exam: "trophy" };
const REC_TONE: Record<RecKind, string> = { grammar: "navy", vocab: "blue", listening: "blue", reading: "navy", exam: "orange" };

export function greeting(h = new Date().getHours()) {
  return h < 5 ? "Boa noite" : h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
}

export const firstName = (name: string) => {
  const n = name.includes("@") ? "" : name.trim().split(/\s+/)[0];
  return n ? n.charAt(0).toUpperCase() + n.slice(1) : "";
};

const hasActivity = (p: Progress) => p.done > 0 || p.studied.length > 0 || p.log.length > 0 || p.exams.length > 0;

function welcomeText(p: Progress, s: Summary) {
  if (!hasActivity(p)) return "Boas-vindas à Native Speakers! Seu painel começa vazio e vai se preenchendo conforme você estuda. Comece pela Unidade 1.";
  if (s.doneUnits === UNITS.length) return "Você concluiu todas as unidades do curso. Faça simulados para manter o inglês afiado.";
  if (s.studiedToday) return s.streak > 1 ? `Você já estudou hoje — são ${s.streak} dias seguidos. Continue assim!` : "Você já estudou hoje. Continue assim!";
  if (s.streak > 0) return `Estude hoje para manter sua sequência de ${s.streak} dia${s.streak > 1 ? "s" : ""}.`;
  return "Que bom ver você de novo! Continue de onde parou.";
}

export function Home({ name = "" }: { name?: string }) {
  const p = useProgress();
  const s = summary(p);
  const first = firstName(name);
  return (
    <>
      <header className="dash-hero">
        <div className="dash-hero-text">
          <span className="eyebrow">PAINEL DO ALUNO</span>
          <h1>{`${greeting()}${first ? `, ${first}` : ""}!`}</h1>
          <p>{welcomeText(p, s)}</p>
        </div>
        <WeekStrip s={s} />
      </header>

      <section aria-labelledby="dash-summary">
        <h2 id="dash-summary" className="sr-only">
          Resumo de desempenho
        </h2>
        <SummaryCards s={s} />
      </section>

      <ContinueCard />

      <div className="dash-cols">
        <Recommendations />
        <RecentActivity />
      </div>

      <JourneyTrail />
    </>
  );
}

// ---------------------------------------------------------------- week / streak

function WeekStrip({ s }: { s: Summary }) {
  return (
    <div className="week" aria-label={`Dias estudados nos últimos 7 dias: ${s.week.filter((d) => d[1]).length}`} role="img">
      {s.week.map(([key, on], i) => {
        const [y, m, d] = key.split("-").map(Number);
        const wd = WEEKDAY[new Date(y, m - 1, d).getDay()];
        return (
          <span key={key} className={"week-day" + (on ? " on" : "") + (i === 6 ? " today" : "")} aria-hidden="true">
            <small>{i === 6 ? "hoje" : wd}</small>
            <span className="week-dot">{on ? <Icon name="check" size={12} /> : null}</span>
          </span>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------- performance cards

function Metric({ icon, tone, value, label, hint, children }: { icon: IconName; tone: string; value: ReactNode; label: string; hint?: string; children?: ReactNode }) {
  return (
    <div className="metric">
      <div className="metric-top">
        <span className={"stat-icon tone-" + tone}>
          <Icon name={icon} size={20} />
        </span>
        <span className="metric-label">{label}</span>
      </div>
      <strong className="metric-value">{value}</strong>
      {children}
      {hint && <small className="metric-hint">{hint}</small>}
    </div>
  );
}

function SummaryCards({ s }: { s: Summary }) {
  const since = s.trackSince ? new Date(s.trackSince).toLocaleDateString("pt-BR") : null;
  return (
    <div className="metric-grid">
      <Metric icon="chart" tone="blue" value={`${s.coursePct}%`} label="Progresso do curso">
        <ProgressBar value={s.coursePct / 100} label="Progresso do curso" />
      </Metric>
      <Metric
        icon="check"
        tone="green"
        value={
          <>
            {s.doneUnits}
            <span className="metric-of">/{UNITS.length}</span>
          </>
        }
        label="Unidades concluídas"
        hint={s.doneUnits ? undefined : "Conclua as 4 tarefas de uma unidade."}
      />
      <Metric icon="trophy" tone="orange" value={s.points.toLocaleString("pt-BR")} label="Pontuação acumulada" hint={s.points ? undefined : "Ganhe pontos acertando exercícios."} />
      <Metric
        icon="target"
        tone="navy"
        value={s.accuracy === null ? "—" : `${s.accuracy}%`}
        label="Média de acertos"
        hint={s.accuracy === null ? "Responda exercícios para calcular." : `${s.answers} resposta${s.answers > 1 ? "s" : ""}`}
      />
      <Metric
        icon="clock"
        tone="blue"
        value={formatDuration(s.studySec)}
        label="Tempo de estudo"
        hint={since ? `Registrado desde ${since}` : "Contado nas telas de estudo."}
      />
      <Metric
        icon="flame"
        tone="orange"
        value={`${s.streak} dia${s.streak === 1 ? "" : "s"}`}
        label="Sequência de estudos"
        hint={s.streak === 0 ? "Estude hoje para começar." : s.studiedToday ? "Você estudou hoje." : "Estude hoje para não perder."}
      />
    </div>
  );
}

// ---------------------------------------------------------------- continue learning

function ContinueCard() {
  const p = useProgress();
  const { open } = useNav();
  const c = continueInfo(p);
  const fresh = !c.last && !hasActivity(p);
  return (
    <section className="card card-highlight dash-continue" aria-labelledby="dash-continue">
      <div className="continue">
        <div className="continue-text">
          <span className="badge badge-light">
            <Icon name="play" size={12} /> CONTINUE APRENDENDO
          </span>
          {c.last ? (
            <>
              <h2 id="dash-continue">{c.last.label}</h2>
              <p>
                {c.last.detail} · <span className="nowrap">{timeAgo(c.last.t)}</span>
              </p>
              <p className="continue-next">{c.next}</p>
            </>
          ) : (
            <>
              <h2 id="dash-continue">{fresh ? "Comece sua jornada" : "Continue de onde parou"}</h2>
              <p>{fresh ? "Sua primeira atividade fica registrada aqui para você retomar depois." : "Ainda não registramos sua última atividade neste painel."}</p>
              <p className="continue-next">{c.next}</p>
            </>
          )}
        </div>
        <div className="continue-action">
          <button type="button" className="btn btn-lg" onClick={() => open(c.target)}>
            {fresh ? "Começar a Unidade 1" : c.cta} <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- recommendations

function Recommendations() {
  const p = useProgress();
  const { open } = useNav();
  const recs = recommendations(p);
  return (
    <section className="card" aria-labelledby="dash-recs">
      <div className="card-title">
        <Icon name="sparkles" />
        <h2 id="dash-recs">Recomendado para você</h2>
      </div>
      {recs.length === 0 ? (
        <div className="empty">
          <Icon name={hasActivity(p) ? "check" : "sparkles"} size={26} />
          <p>
            {hasActivity(p)
              ? "Tudo em dia! Nenhum ponto fraco encontrado nas suas atividades. Siga para a próxima etapa da jornada."
              : "As sugestões aparecem depois das suas primeiras atividades, com base nos seus erros e no que estiver pendente."}
          </p>
        </div>
      ) : (
        <ul className="rec-list">
          {recs.map((r) => (
            <li key={r.id} className="rec">
              <span className={"stat-icon tone-" + REC_TONE[r.kind]}>
                <Icon name={REC_ICON[r.kind]} size={18} />
              </span>
              <div className="rec-body">
                <h3>{r.title}</h3>
                <p>{r.reason}</p>
                <button type="button" className="linkbtn" onClick={() => open(r.target)}>
                  {r.cta} <Icon name="arrow" size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// ---------------------------------------------------------------- history

function RecentActivity() {
  const p = useProgress();
  const items = p.log.filter((e) => e && typeof e.t === "number" && e.k in ACTIVITY_LABEL).slice(-6).reverse();
  return (
    <section className="card" aria-labelledby="dash-history">
      <div className="card-title">
        <Icon name="clock" />
        <h2 id="dash-history">Atividades recentes</h2>
      </div>
      {items.length === 0 ? (
        <div className="empty">
          <Icon name="clock" size={26} />
          <p>Nenhuma atividade registrada ainda. Seu histórico de estudos fica salvo na sua conta.</p>
        </div>
      ) : (
        <ul className="history">
          {items.map((e, k) => (
            <li key={e.t + "-" + k}>
              <span className={"history-dot" + (e.ok === false ? " bad" : e.ok ? " ok" : "")} aria-hidden="true" />
              <div>
                <b>{ACTIVITY_LABEL[e.k]}</b>
                <span className="muted small">
                  {e.u >= 0 && UNITS[e.u] ? `Unidade ${e.u + 1}` : "Simulado"}
                  {e.k === "exam" && typeof e.g === "number" ? ` · nota ${e.g.toFixed(1)}` : ""}
                  {e.k !== "exam" && e.ok !== undefined ? (e.ok ? " · acertou" : " · errou") : ""} · {timeAgo(e.t)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// ---------------------------------------------------------------- journey

const STATE_LABEL = { done: "Concluída", available: "Disponível", locked: "Bloqueada" } as const;

function JourneyTrail() {
  const p = useProgress();
  const { open, go } = useNav();
  const cur = currentUnit(p);
  return (
    <section aria-labelledby="dash-journey">
      <div className="section-title">
        <h2 id="dash-journey">Minha jornada</h2>
        <button type="button" className="btn-ghost" onClick={() => go("journey")}>
          Ver tarefas de cada unidade <Icon name="arrow" size={16} />
        </button>
      </div>
      <ol className="trail">
        {UNITS.map((u, i) => {
          const st = unitState(p, i);
          const pct = unitPercent(p, i);
          const diff = unitDifficulty(i);
          const here = i === cur;
          return (
            <li key={i} className={"trail-step is-" + st + (here ? " is-here" : "")}>
              <span className="trail-node" aria-hidden="true">
                {st === "done" ? <Icon name="check" size={16} /> : st === "locked" ? <Icon name="lock" size={14} /> : i + 1}
              </span>
              <article className="trail-card">
                <div className="unit-meta">
                  <span className="badge">UNIDADE {i + 1}</span>
                  <span className={"status status-" + st}>
                    {st === "done" && <Icon name="check" size={14} />}
                    {st === "locked" && <Icon name="lock" size={13} />}
                    {here && st === "available" ? "Você está aqui" : STATE_LABEL[st]}
                  </span>
                </div>
                <h3>{u.title}</h3>
                <p className="trail-desc">{u.goals.join(" · ")}</p>
                <div className="trail-foot">
                  <span className="level" title="Nível de dificuldade">
                    <span className="level-bars" aria-hidden="true">
                      {[1, 2, 3].map((n) => (
                        <i key={n} className={n <= diff ? "on" : ""} />
                      ))}
                    </span>
                    <span className="sr-only">Nível: </span>
                    {DIFFICULTY_LABEL[diff]}
                  </span>
                  <span className="trail-pct">{pct}%</span>
                </div>
                <ProgressBar value={pct / 100} tone={st === "done" ? "green" : undefined} label={`Unidade ${i + 1}: ${pct}% concluída`} />
                {st === "locked" ? (
                  <p className="trail-lock">
                    <Icon name="lock" size={14} /> Conclua a Unidade {i} para liberar.
                  </p>
                ) : (
                  <button type="button" className={st === "done" ? "btn-secondary btn-block" : "btn btn-block"} onClick={() => open({ to: "unit", unit: i })}>
                    {st === "done" ? "Revisar" : pct > 0 ? "Continuar" : "Começar"}
                    <span className="sr-only"> a Unidade {i + 1}</span>
                  </button>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** Placeholder shown while the student's progress is loading after login. */
export function HomeSkeleton() {
  return (
    <div className="skeleton-wrap" aria-hidden="true">
      <div className="sk sk-title" />
      <div className="sk sk-line" />
      <div className="metric-grid">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="sk sk-card" />
        ))}
      </div>
      <div className="sk sk-hero" />
      <div className="dash-cols">
        <div className="sk sk-block" />
        <div className="sk sk-block" />
      </div>
    </div>
  );
}
