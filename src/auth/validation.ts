// Client-side checks for the login / sign-up / password forms. Returns field → message.
import { MIN_PASSWORD } from "./errors";

export type FieldErrors = Partial<Record<"name" | "email" | "password" | "confirm", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function checkEmail(email: string): string | undefined {
  if (!email) return "Informe seu e-mail.";
  if (!EMAIL_RE.test(email)) return "Digite um e-mail válido, por exemplo nome@email.com.";
}

export function checkNewPassword(password: string, confirm: string): FieldErrors {
  const e: FieldErrors = {};
  if (!password) e.password = "Crie uma senha.";
  else if (password.length < MIN_PASSWORD) e.password = `A senha precisa ter pelo menos ${MIN_PASSWORD} caracteres.`;
  if (!confirm) e.confirm = "Repita a senha.";
  else if (password && password !== confirm) e.confirm = "As senhas não são iguais.";
  return e;
}

export function validateLogin(email: string, password: string): FieldErrors {
  const e: FieldErrors = {};
  const em = checkEmail(email);
  if (em) e.email = em;
  if (!password) e.password = "Informe sua senha.";
  return e;
}

export function validateSignup(name: string, email: string, password: string, confirm: string): FieldErrors {
  const e: FieldErrors = { ...checkNewPassword(password, confirm) };
  if (!name) e.name = "Informe seu nome.";
  else if (name.length < 2) e.name = "O nome precisa ter pelo menos 2 letras.";
  const em = checkEmail(email);
  if (em) e.email = em;
  return e;
}

export const hasErrors = (e: FieldErrors) => Object.keys(e).length > 0;
