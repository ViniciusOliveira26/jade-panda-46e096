// "Meu perfil": account data, name and password changes, English voice, help and logout.
import { useState, type FormEvent } from "react";
import { updateUser, type User } from "@netlify/identity";
import { errorText } from "../auth/errors";
import { checkNewPassword, hasErrors, type FieldErrors } from "../auth/validation";
import { Avatar } from "../components/Avatar";
import { Icon } from "../components/Icon";
import { VoicePicker } from "../components/VoicePicker";
import { Alert, Field, PageHeader } from "../components/ui";
import { useSyncStatus } from "../services/sync";

interface Props {
  user: User;
  onUser: (u: User) => void;
  onLogout: () => Promise<void>;
}

type Msg = { type: "ok" | "error"; text: string } | null;

export function Profile({ user, onUser, onLogout }: Props) {
  const sync = useSyncStatus();
  const name = user.name || user.email || "Aluno";
  const since = user.createdAt ? new Date(user.createdAt).toLocaleDateString("pt-BR") : null;

  const [nameMsg, setNameMsg] = useState<Msg>(null);
  const [nameErr, setNameErr] = useState<string>();
  const [passMsg, setPassMsg] = useState<Msg>(null);
  const [passErr, setPassErr] = useState<FieldErrors>({});
  const [busy, setBusy] = useState<"name" | "pass" | "out" | null>(null);

  const onName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const v = (f.elements.namedItem("name") as HTMLInputElement).value.trim();
    setNameMsg(null);
    if (v.length < 2) return setNameErr("O nome precisa ter pelo menos 2 letras.");
    setNameErr(undefined);
    setBusy("name");
    try {
      onUser(await updateUser({ data: { full_name: v } }));
      setNameMsg({ type: "ok", text: "Nome atualizado." });
    } catch (err) {
      setNameMsg({ type: "error", text: errorText(err) });
    } finally {
      setBusy(null);
    }
  };

  const onPass = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const get = (n: string) => (f.elements.namedItem(n) as HTMLInputElement).value;
    const errs = checkNewPassword(get("password"), get("confirm"));
    setPassErr(errs);
    setPassMsg(null);
    if (hasErrors(errs)) return;
    setBusy("pass");
    try {
      onUser(await updateUser({ password: get("password") }));
      f.reset();
      setPassMsg({ type: "ok", text: "Senha alterada com sucesso." });
    } catch (err) {
      setPassMsg({ type: "error", text: errorText(err) });
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <PageHeader eyebrow="MEU PERFIL" title="Sua conta" />
      <section className="card profile-card">
        <Avatar name={name} src={user.pictureUrl} size="lg" />
        <div className="profile-info">
          <h2>{name}</h2>
          {user.email && (
            <p className="muted">
              <Icon name="mail" size={16} /> {user.email}
            </p>
          )}
          {since && <p className="muted small">Aluno(a) desde {since}</p>}
          {sync && <p className="muted small">Sincronização: {sync}</p>}
        </div>
        <button
          type="button"
          className="btn-secondary"
          disabled={busy === "out"}
          onClick={async () => {
            setBusy("out");
            try {
              await onLogout();
            } finally {
              setBusy(null);
            }
          }}
        >
          <Icon name="logout" size={18} /> Sair da conta
        </button>
      </section>

      <div className="grid">
        <section className="card">
          <h2>Dados pessoais</h2>
          <form className="form-stack" noValidate onSubmit={onName}>
            <Field label="Nome completo" name="name" icon="user" autoComplete="name" maxLength={80} defaultValue={user.name ?? ""} error={nameErr} />
            {nameMsg && <Alert type={nameMsg.type}>{nameMsg.text}</Alert>}
            <button className="btn" type="submit" disabled={busy === "name"}>
              {busy === "name" ? "Salvando…" : "Salvar nome"}
            </button>
          </form>
        </section>
        <section className="card">
          <h2>Alterar senha</h2>
          <form className="form-stack" noValidate onSubmit={onPass} onInput={() => hasErrors(passErr) && setPassErr({})}>
            <Field label="Nova senha" type="password" name="password" icon="lock" autoComplete="new-password" error={passErr.password} />
            <Field label="Confirmar nova senha" type="password" name="confirm" icon="lock" autoComplete="new-password" error={passErr.confirm} />
            {passMsg && <Alert type={passMsg.type}>{passMsg.text}</Alert>}
            <button className="btn" type="submit" disabled={busy === "pass"}>
              {busy === "pass" ? "Salvando…" : "Alterar senha"}
            </button>
          </form>
        </section>
      </div>

      <section className="card">
        <h2>Voz das aulas</h2>
        <p className="muted">Escolha a voz em inglês usada no listening, nos flashcards e na leitura.</p>
        <VoicePicker />
      </section>

      <section className="card">
        <h2>Ajuda</h2>
        <p className="muted">Fale com a equipe Native Speakers:</p>
        <div className="contact-list">
          <a href="tel:+5511989440558">
            <Icon name="phone" size={18} /> (11) 98944-0558
          </a>
          <a href="mailto:nativespeakers1@outlook.com">
            <Icon name="mail" size={18} /> nativespeakers1@outlook.com
          </a>
        </div>
      </section>
    </>
  );
}
