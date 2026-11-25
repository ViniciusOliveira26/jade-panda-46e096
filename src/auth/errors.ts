// Portuguese messages for Netlify Identity errors.
import { AuthError, MissingIdentityError } from "@netlify/identity";

export const MIN_PASSWORD = 8;

export function errorText(err: unknown): string {
  if (err instanceof MissingIdentityError) return "O sistema de login ainda não está disponível. Tente novamente em instantes.";
  if (err instanceof AuthError) {
    const msg = (err.message || "").toLowerCase();
    if (msg.includes("not confirmed")) return "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada (e o spam).";
    if (msg.includes("already") && msg.includes("registered")) return "Já existe uma conta com este e-mail. Use a aba Entrar.";
    if (err.status === 401 || err.status === 400) return "E-mail ou senha incorretos.";
    if (err.status === 403) return "O cadastro de novos alunos está desativado. Fale com o professor.";
    if (err.status === 422) return "Dados inválidos. Verifique o e-mail e use uma senha com pelo menos 8 caracteres.";
    if (err.status === 429) return "Muitas tentativas. Aguarde alguns minutos e tente novamente.";
    return err.message || "Não foi possível concluir. Tente novamente.";
  }
  return "Erro de conexão. Verifique sua internet e tente novamente.";
}
