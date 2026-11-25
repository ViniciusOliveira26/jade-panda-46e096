// Login, sign-up, password recovery and new-password forms (Netlify Identity).
import { useState, type FormEvent, type ReactNode } from "react";
import { login, requestPasswordRecovery, signup, updateUser, type User } from "@netlify/identity";
import { HelpFooter } from "../components/HelpFooter";
import { Icon } from "../components/Icon";
import { Logo } from "../components/Logo";
import { Alert, Field } from "../components/ui";
import { UNITS } from "../content";
import { MIN_PASSWORD, errorText } from "./errors";
import { checkEmail, checkNewPassword, hasErrors, validateLogin, validateSignup, type FieldErrors } from "./validation";

export type AuthTab = "login" | "signup" | "recover" | "newpass";
export interface AuthMessage {
  text: string;
  type?: "error" | "ok";
}

interface Props {
  /** Shows "Carregando…" instead of the forms. */
  loading: string | null;
  tab: AuthTab;
  message: AuthMessage | null;
  onTab: (tab: AuthTab, message?: AuthMessage | null) => void;
  onEnter: (user: User) => Promise<void>;
  /** Back to the presentation page (hidden when not given). */
  onBack?: () => void;
}

const field = (form: HTMLFormElement, name: string) => (form.elements.namedItem(name) as HTMLInputElement).value;

const TITLES: Record<AuthTab, [string, string]> = {
  login: ["Bem-vindo(a) de volta", "Entre com sua conta de aluno para continuar de onde parou."],
  signup: ["Crie sua conta gratuita", "Leva menos de um minuto. Seu progresso fica salvo na sua conta."],
  recover: ["Recuperar senha", "Informe o e-mail da sua conta. Enviaremos um link para você criar uma nova senha."],
  newpass: ["Crie uma nova senha", `Escolha uma senha com pelo menos ${MIN_PASSWORD} caracteres.`],
};

export function AuthScreen({ loading, tab, message, onTab, onEnter, onBack }: Props) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<AuthMessage | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const shown = msg ?? message;
  const showMsg = (text: string, type?: AuthMessage["type"]) => setMsg({ text, type });
  const switchTab = (t: AuthTab, m: AuthMessage | null = null) => {
    setMsg(null);
    setErrors({});
    onTab(t, m);
  };

  /** Shows inline errors and focuses the first invalid field. Returns true when the form is valid. */
  const check = (form: HTMLFormElement, e: FieldErrors) => {
    setErrors(e);
    if (!hasErrors(e)) return true;
    setMsg(null);
    const first = Object.keys(e)[0];
    (form.elements.namedItem(first) as HTMLInputElement | null)?.focus();
    return false;
  };

  // Typing in a field clears its error.
  const onInput = (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name as keyof FieldErrors;
    if (errors[name]) setErrors(({ [name]: _, ...rest }) => rest);
  };

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } catch (err) {
      showMsg(errorText(err), "error");
    } finally {
      setBusy(false);
    }
  };

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const email = field(f, "email").trim();
    const password = field(f, "password");
    if (!check(f, validateLogin(email, password))) return;
    run(async () => {
      const user = await login(email, password);
      f.reset();
      await onEnter(user);
    });
  };

  const onSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const name = field(f, "name").trim();
    const email = field(f, "email").trim();
    const password = field(f, "password");
    if (!check(f, validateSignup(name, email, password, field(f, "confirm")))) return;
    run(async () => {
      const user = await signup(email, password, { full_name: name });
      f.reset();
      if (user.confirmedAt) await onEnter(user);
      else
        switchTab("login", {
          text: `Conta criada! Enviamos um e-mail para ${email}. Clique no link de confirmação para ativar sua conta e entrar.`,
          type: "ok",
        });
    });
  };

  const onRecover = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const email = field(f, "email").trim();
    const em = checkEmail(email);
    if (!check(f, em ? { email: em } : {})) return;
    run(async () => {
      await requestPasswordRecovery(email);
      f.reset();
      showMsg("Se este e-mail estiver cadastrado, você receberá um link para criar uma nova senha.", "ok");
    });
  };

  const onNewPass = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const password = field(f, "password");
    if (!check(f, checkNewPassword(password, field(f, "confirm")))) return;
    run(async () => {
      const user = await updateUser({ password });
      f.reset();
      await onEnter(user);
    });
  };

  const submit = (label: string): ReactNode => (
    <button className="btn btn-lg btn-block" type="submit" disabled={busy} aria-busy={busy}>
      {busy ? <span className="spinner" aria-hidden="true" /> : null}
      {busy ? "Aguarde…" : label}
    </button>
  );

  const [title, subtitle] = TITLES[tab];

  return (
    <div className="auth-page">
      <aside className="auth-aside">
        <Logo light />
        <div className="auth-aside-body">
          <h2>Inglês passo a passo, no seu ritmo.</h2>
          <ul className="auth-points">
            <li>
              <Icon name="book" /> {UNITS.length} unidades organizadas na sequência do curso
            </li>
            <li>
              <Icon name="headphones" /> Listening com áudio e prática de pronúncia
            </li>
            <li>
              <Icon name="chart" /> Progresso salvo na sua conta, em qualquer aparelho
            </li>
          </ul>
        </div>
        <p className="auth-aside-foot">Native Speakers · English Learning 2.0</p>
      </aside>

      <section className="auth-main">
        <div className="auth-top">
          <span className="auth-logo-mobile">
            <Logo />
          </span>
          {onBack && (
            <button type="button" className="btn-ghost" onClick={onBack}>
              ← Voltar ao início
            </button>
          )}
        </div>

        <div className="auth-card">
          {loading ? (
            <div className="auth-loading" role="status">
              <span className="spinner spinner-dark" aria-hidden="true" />
              <p>{loading}</p>
            </div>
          ) : (
            <>
              {tab !== "newpass" && tab !== "recover" && (
                <div className="segmented" role="tablist" aria-label="Acesso">
                  <button type="button" role="tab" aria-selected={tab === "login"} className={tab === "login" ? "active" : ""} onClick={() => switchTab("login")}>
                    Entrar
                  </button>
                  <button type="button" role="tab" aria-selected={tab === "signup"} className={tab === "signup" ? "active" : ""} onClick={() => switchTab("signup")}>
                    Criar conta
                  </button>
                </div>
              )}
              <h1 className="auth-title">{title}</h1>
              <p className="muted auth-subtitle">{subtitle}</p>

              {shown?.text && <Alert type={shown.type ?? "info"}>{shown.text}</Alert>}

              {tab === "login" && (
                <form className="auth-form" noValidate onSubmit={onLogin} onInput={onInput}>
                  <Field label="E-mail" icon="mail" type="email" name="email" autoComplete="email" inputMode="email" placeholder="nome@email.com" error={errors.email} required />
                  <Field label="Senha" icon="lock" type="password" name="password" autoComplete="current-password" error={errors.password} required />
                  <div className="auth-row">
                    <button className="linkbtn" type="button" onClick={() => switchTab("recover")}>
                      Esqueci minha senha
                    </button>
                  </div>
                  {submit("Entrar")}
                  <p className="auth-switch">
                    Ainda não tem conta?{" "}
                    <button className="linkbtn" type="button" onClick={() => switchTab("signup")}>
                      Comece gratuitamente
                    </button>
                  </p>
                </form>
              )}
              {tab === "signup" && (
                <form className="auth-form" noValidate onSubmit={onSignup} onInput={onInput}>
                  <Field label="Nome completo" icon="user" name="name" autoComplete="name" maxLength={80} error={errors.name} required />
                  <Field label="E-mail" icon="mail" type="email" name="email" autoComplete="email" inputMode="email" placeholder="nome@email.com" error={errors.email} required />
                  <Field
                    label="Senha"
                    icon="lock"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    minLength={MIN_PASSWORD}
                    hint={`Mínimo de ${MIN_PASSWORD} caracteres.`}
                    error={errors.password}
                    required
                  />
                  <Field label="Confirmar senha" icon="lock" type="password" name="confirm" autoComplete="new-password" minLength={MIN_PASSWORD} error={errors.confirm} required />
                  {submit("Criar minha conta")}
                  <p className="auth-switch">
                    Já tem conta?{" "}
                    <button className="linkbtn" type="button" onClick={() => switchTab("login")}>
                      Entrar
                    </button>
                  </p>
                </form>
              )}
              {tab === "recover" && (
                <form className="auth-form" noValidate onSubmit={onRecover} onInput={onInput}>
                  <Field label="E-mail" icon="mail" type="email" name="email" autoComplete="email" inputMode="email" placeholder="nome@email.com" error={errors.email} required />
                  {submit("Enviar link")}
                  <button className="linkbtn" type="button" onClick={() => switchTab("login")}>
                    ← Voltar para o login
                  </button>
                </form>
              )}
              {tab === "newpass" && (
                <form className="auth-form" noValidate onSubmit={onNewPass} onInput={onInput}>
                  <Field label="Nova senha" icon="lock" type="password" name="password" autoComplete="new-password" minLength={MIN_PASSWORD} error={errors.password} required />
                  <Field label="Confirmar nova senha" icon="lock" type="password" name="confirm" autoComplete="new-password" minLength={MIN_PASSWORD} error={errors.confirm} required />
                  {submit("Salvar nova senha")}
                </form>
              )}
            </>
          )}
        </div>
        <HelpFooter />
      </section>
    </div>
  );
}
