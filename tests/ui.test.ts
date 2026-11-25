// Redesign: form validation, menu structure and initials.
import { describe, expect, it } from "vitest";
import { validateLogin, validateSignup, checkEmail, checkNewPassword, hasErrors } from "../src/auth/validation";
import { initials } from "../src/components/Header";
import { NAV_ITEMS, navSection } from "../src/state/nav";

describe("validação dos formulários", () => {
  it("e-mail", () => {
    expect(checkEmail("")).toBeTruthy();
    expect(checkEmail("aluno")).toBeTruthy();
    expect(checkEmail("aluno@email.com")).toBeUndefined();
  });
  it("login", () => {
    expect(validateLogin("", "")).toHaveProperty("email");
    expect(validateLogin("a@b.com", "")).toHaveProperty("password");
    expect(hasErrors(validateLogin("a@b.com", "x"))).toBe(false);
  });
  it("cadastro e nova senha", () => {
    expect(validateSignup("", "a@b.com", "12345678", "12345678")).toHaveProperty("name");
    expect(checkNewPassword("1234567", "1234567")).toHaveProperty("password");
    expect(checkNewPassword("12345678", "12345679")).toHaveProperty("confirm");
    expect(hasErrors(validateSignup("Ana", "a@b.com", "12345678", "12345678"))).toBe(false);
  });
});

describe("navegação", () => {
  it("menu na ordem pedida", () => {
    expect(NAV_ITEMS.map((x) => x.label)).toEqual([
      "Início", "Minha jornada", "Unidades", "Listening", "Vocabulário", "Exercícios", "Meu desempenho", "Meu perfil",
    ]);
  });
  it("leitura, escrita e simulado ficam em Exercícios", () => {
    for (const p of ["read", "write", "exam", "practice"] as const) expect(navSection(p)).toBe("practice");
    expect(navSection("unit")).toBe("units");
  });
  it("iniciais do avatar", () => {
    expect(initials("Ana Souza")).toBe("AS");
    expect(initials("aluno@email.com")).toBe("AE");
  });
});
