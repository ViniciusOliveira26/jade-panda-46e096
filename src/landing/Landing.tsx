// Public presentation page shown before login. Every button leads to sign-up, login or a section of this page.
import { useState } from "react";
import { Icon, type IconName } from "../components/Icon";
import { Logo } from "../components/Logo";
import { UNITS } from "../content";

const sum = (f: (u: (typeof UNITS)[number]) => number) => UNITS.reduce((s, u) => s + f(u), 0);
// Real counts taken from the course content.
const FACTS: [number, string][] = [
  [UNITS.length, "unidades"],
  [sum((u) => u.questions.length + u.fills.length), "exercícios"],
  [sum((u) => u.flashcards.length), "flashcards"],
];

const BENEFITS: { icon: IconName; title: string; text: string }[] = [
  { icon: "sparkles", title: "Mais oportunidades", text: "O inglês é pedido em processos seletivos, promoções e vagas em empresas de todos os tamanhos." },
  { icon: "globe", title: "Viagens com autonomia", text: "Pedir informações, fazer reservas e conversar com pessoas de outros países sem depender de ninguém." },
  { icon: "book", title: "Acesso a mais conteúdo", text: "Boa parte de cursos, artigos, séries e documentação técnica está disponível primeiro em inglês." },
  { icon: "user", title: "Confiança para falar", text: "Praticar com frequência transforma o vocabulário estudado em conversas do dia a dia." },
];

const FEATURES: { icon: IconName; title: string; text: string; tone: string }[] = [
  { icon: "book", title: "Unidades guiadas", text: "Objetivos, vocabulário, gramática com tabelas e frases-modelo em cada unidade.", tone: "navy" },
  { icon: "pencil", title: "Exercícios com correção", text: "Múltipla escolha e “complete a frase”, com explicação logo após cada resposta.", tone: "blue" },
  { icon: "headphones", title: "Listening e pronúncia", text: "Ouça diálogos com vozes diferentes e grave sua voz para comparar a pronúncia.", tone: "blue" },
  { icon: "cards", title: "Vocabulário com flashcards", text: "Revise as palavras-chave de cada unidade virando os cartões.", tone: "navy" },
  { icon: "trophy", title: "Simulados", text: "Teste o que você estudou com uma prova de nota 0 a 10 e revise os erros.", tone: "orange" },
  { icon: "chart", title: "Meu desempenho", text: "Acompanhe tarefas concluídas, pontos e precisão por unidade.", tone: "green" },
];

const STEPS: [string, string][] = [
  ["Crie sua conta", "Cadastre-se com nome, e-mail e senha. Seu progresso fica salvo na conta."],
  ["Siga a sua jornada", "Estude as unidades na ordem do curso: conteúdo, prática, flashcards e listening."],
  ["Acompanhe a evolução", "Veja o que já concluiu e faça simulados para revisar o que aprendeu."],
];

const FAQ: [string, string][] = [
  ["Preciso pagar para começar?", "Não. Criar a conta e começar a estudar é gratuito."],
  [
    "Preciso instalar algum aplicativo?",
    "Não. A plataforma funciona no navegador do computador, tablet ou celular. Para vozes mais naturais no listening, recomendamos o Google Chrome ou o Microsoft Edge.",
  ],
  ["Meu progresso fica salvo?", "Sim. Tudo o que você conclui fica salvo na sua conta de aluno e aparece em qualquer aparelho em que você entrar."],
  [
    "Como o conteúdo é organizado?",
    `São ${UNITS.length} unidades na sequência do curso Native Speakers. Cada uma tem quatro tarefas: estudar o conteúdo, concluir a prática, revisar os flashcards e ouvir o listening.`,
  ],
  ["Esqueci minha senha. E agora?", "Na tela de acesso, clique em “Esqueci minha senha” e informe seu e-mail. Você receberá um link para criar uma nova senha."],
  ["Como falo com a equipe?", "Pelo telefone (11) 98944-0558 ou pelo e-mail nativespeakers1@outlook.com."],
];

/** Interactive sample: the first flashcards of Unit 1. */
function DemoFlashcard() {
  const cards = UNITS[0].flashcards.slice(0, 5);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const c = cards[i];
  return (
    <div className="demo-card">
      <div className="demo-card-head">
        <span className="badge">UNIT 1 · {UNITS[0].title}</span>
        <span className="muted">
          {i + 1}/{cards.length}
        </span>
      </div>
      <button type="button" className={"flashcard" + (flipped ? " flipped" : "")} onClick={() => setFlipped(!flipped)} aria-live="polite">
        <span lang={flipped ? "pt-BR" : "en"}>{flipped ? c.pt : c.en}</span>
        <small>{flipped ? "PORTUGUÊS" : "TOQUE PARA VER A TRADUÇÃO"}</small>
      </button>
      <button
        type="button"
        className="btn-secondary btn-block"
        onClick={() => {
          setI((i + 1) % cards.length);
          setFlipped(false);
        }}
      >
        Próximo cartão →
      </button>
    </div>
  );
}

export function Landing({ onSignup, onLogin }: { onSignup: () => void; onLogin: () => void }) {
  const [menu, setMenu] = useState(false);
  const links: [string, string][] = [
    ["#recursos", "Recursos"],
    ["#beneficios", "Benefícios"],
    ["#como-funciona", "Como funciona"],
    ["#faq", "Perguntas frequentes"],
  ];
  return (
    <div className="landing">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="container site-header-inner">
          <a href="#topo" className="logo-link" aria-label="Native Speakers — início">
            <Logo />
          </a>
          <button type="button" className="icon-btn site-menu-btn" aria-expanded={menu} aria-controls="site-nav" aria-label={menu ? "Fechar menu" : "Abrir menu"} onClick={() => setMenu(!menu)}>
            <Icon name={menu ? "close" : "menu"} />
          </button>
          <nav id="site-nav" className={"site-nav" + (menu ? " open" : "")} aria-label="Menu do site">
            {links.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
            <div className="site-nav-cta">
              <button type="button" className="btn-secondary" onClick={onLogin}>
                Acesso do aluno
              </button>
              <button type="button" className="btn" onClick={onSignup}>
                Começar grátis
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero-section" id="topo">
          <div className="container hero-grid">
            <div>
              <span className="eyebrow eyebrow-light">PLATAFORMA DE INGLÊS · NATIVE SPEAKERS</span>
              <h1>Aprenda inglês com método, prática e acompanhamento.</h1>
              <p className="hero-lead">
                Estude as unidades do curso Native Speakers com explicações claras, exercícios corrigidos na hora, listening com áudio e um painel com a sua evolução.
              </p>
              <div className="hero-cta">
                <button type="button" className="btn btn-lg" onClick={onSignup}>
                  Começar gratuitamente <Icon name="arrow" size={18} />
                </button>
                <button type="button" className="btn-outline-light btn-lg" onClick={onLogin}>
                  Já sou aluno
                </button>
              </div>
              <ul className="hero-facts">
                {FACTS.map(([n, label]) => (
                  <li key={label}>
                    <strong>{n}</strong> {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hero-preview" aria-hidden="true">
              <div className="preview-window">
                <div className="preview-bar">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="preview-body">
                  <span className="badge">UNIT 1 · EXERCISES</span>
                  <p className="preview-q">{UNITS[0].questions[0].prompt}</p>
                  {UNITS[0].questions[0].options.slice(0, 3).map((o, j) => (
                    <div key={j} className={"preview-opt" + (j === UNITS[0].questions[0].answer ? " ok" : "")}>
                      {String.fromCharCode(65 + j)}. {o}
                    </div>
                  ))}
                  <div className="preview-tasks">
                    <span className="chip chip-green">
                      <Icon name="check" size={14} /> Conteúdo
                    </span>
                    <span className="chip">Prática</span>
                    <span className="chip">Flashcards</span>
                    <span className="chip chip-orange">Simulado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="beneficios">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">POR QUE APRENDER INGLÊS</span>
              <h2>Um idioma que abre portas</h2>
            </div>
            <div className="feature-grid cols-4">
              {BENEFITS.map((b) => (
                <article key={b.title} className="feature">
                  <span className="feature-icon tone-blue">
                    <Icon name={b.icon} />
                  </span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="recursos">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">RECURSOS</span>
              <h2>Tudo o que você precisa para estudar</h2>
              <p className="muted">Cada unidade combina leitura, escuta, escrita e prática, na ordem do curso.</p>
            </div>
            <div className="demo-grid">
              <div className="feature-grid cols-2">
                {FEATURES.map((f) => (
                  <article key={f.title} className="feature">
                    <span className={"feature-icon tone-" + f.tone}>
                      <Icon name={f.icon} />
                    </span>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </article>
                ))}
              </div>
              <div>
                <p className="demo-label">
                  <Icon name="sparkles" size={16} /> Experimente agora
                </p>
                <DemoFlashcard />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="como-funciona">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">COMO FUNCIONA</span>
              <h2>Três passos para começar</h2>
            </div>
            <ol className="steps">
              {STEPS.map(([t, d], k) => (
                <li key={t}>
                  <span className="step-n">{k + 1}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section-alt" id="faq">
          <div className="container container-narrow">
            <div className="section-head">
              <span className="eyebrow">DÚVIDAS</span>
              <h2>Perguntas frequentes</h2>
            </div>
            <div className="faq">
              {FAQ.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="container cta-band-inner">
            <div>
              <h2>Pronto para começar?</h2>
              <p>Crie sua conta e comece pela Unidade 1 hoje mesmo.</p>
            </div>
            <div className="hero-cta">
              <button type="button" className="btn btn-lg btn-on-dark" onClick={onSignup}>
                Começar gratuitamente
              </button>
              <button type="button" className="btn-outline-light btn-lg" onClick={onLogin}>
                Acesso do aluno
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer-grid">
          <div>
            <Logo light />
            <p>Plataforma de estudo de inglês do curso Native Speakers, com material original organizado por unidades.</p>
          </div>
          <div>
            <h3>Plataforma</h3>
            <ul>
              {links.map(([href, label]) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Acesso</h3>
            <ul>
              <li>
                <button type="button" className="footer-link" onClick={onLogin}>
                  Área do aluno
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={onSignup}>
                  Criar conta gratuita
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3>Contato</h3>
            <ul>
              <li>
                <a href="tel:+5511989440558">
                  <Icon name="phone" size={16} /> (11) 98944-0558
                </a>
              </li>
              <li>
                <a href="mailto:nativespeakers1@outlook.com">
                  <Icon name="mail" size={16} /> nativespeakers1@outlook.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container site-footer-bottom">
          <p>© {new Date().getFullYear()} Vinicius Oliveira Enterprise's · Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
