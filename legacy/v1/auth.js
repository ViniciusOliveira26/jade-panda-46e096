// Student accounts (Netlify Identity) and cloud progress sync (Netlify Database via /api/progress).
import {
  login,
  signup,
  logout,
  getUser,
  handleAuthCallback,
  requestPasswordRecovery,
  updateUser,
  AuthError,
  MissingIdentityError,
} from "/assets/identity.js";

const LEGACY_KEY = "connectivity-foundations-progress";
const $ = (s) => document.querySelector(s);
const authScreen = $("#auth-screen");
const shell = $("#app-shell");
const forms = ["login", "signup", "recover", "newpass"];

let currentUser = null;
let pending = null;
let timer = null;
let saving = false;

const MIN_PASSWORD = 8;
const backupKey = (u) => `cf-progress-${u.id}`;
const legacyDeclinedKey = (u) => `ns-legacy-declined-${u.id}`;

function showMsg(text, type = "") {
  const m = $("#auth-msg");
  m.textContent = text;
  m.className = "auth-msg" + (type ? " " + type : "");
  m.hidden = !text;
}

function showTab(tab) {
  forms.forEach((f) => ($(`#${f}-form`).hidden = f !== tab));
  document.querySelectorAll("[data-auth-tab]").forEach((b) => {
    if (b.classList.contains("navbtn")) b.classList.toggle("active", b.dataset.authTab === tab);
  });
  $(".mode-tabs").hidden = tab === "newpass";
  showMsg("");
}

function showAuth(tab = "login") {
  shell.hidden = true;
  authScreen.hidden = false;
  $("#auth-loading").hidden = true;
  $("#auth-forms").hidden = false;
  showTab(tab);
}

function setSync(text) {
  $("#sync-status").textContent = text;
}

function errorText(err) {
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

async function withBusy(form, fn) {
  const btn = form.querySelector("button[type=submit]");
  const label = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Aguarde…";
  try {
    await fn();
  } catch (err) {
    showMsg(errorText(err), "error");
  } finally {
    btn.disabled = false;
    btn.textContent = label;
  }
}

// ---------- progress sync ----------
async function fetchProgress() {
  const res = await fetch("/api/progress", { credentials: "same-origin" });
  if (!res.ok) throw new Error("load failed " + res.status);
  return (await res.json()).progress;
}

async function pushProgress(keepalive = false) {
  if (!pending || !currentUser || saving) return;
  const body = JSON.stringify({ progress: pending });
  const snapshot = pending;
  saving = true;
  setSync("Salvando…");
  try {
    const res = await fetch("/api/progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body,
      keepalive,
    });
    if (res.status === 401) {
      // Session expired: refresh token and retry once.
      await getUser();
      throw new Error("unauthorized");
    }
    if (!res.ok) throw new Error("save failed " + res.status);
    if (pending === snapshot) pending = null;
    setSync("✔ Progresso salvo");
  } catch {
    setSync("⚠ Não salvo — tentando de novo");
    clearTimeout(timer);
    timer = setTimeout(() => pushProgress(), 5000);
  } finally {
    saving = false;
    if (pending && pending !== snapshot) schedule();
  }
}

function schedule() {
  clearTimeout(timer);
  timer = setTimeout(() => pushProgress(), 700);
}

window.onProgressSave = (progress) => {
  if (!currentUser) return;
  pending = progress;
  try {
    localStorage.setItem(backupKey(currentUser), JSON.stringify(progress));
  } catch {}
  schedule();
};

const flush = () => {
  if (pending) pushProgress(true);
};
addEventListener("pagehide", flush);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") flush();
});

async function enterApp(user) {
  currentUser = user;
  authScreen.hidden = false;
  $("#auth-forms").hidden = true;
  $("#auth-loading").hidden = false;
  $("#auth-loading").innerHTML = '<p class="muted">Carregando seu progresso…</p>';

  let progress = null;
  let fromServer = false;
  try {
    progress = await fetchProgress();
    fromServer = true;
  } catch {
    // Offline or server issue: fall back to this device's copy for this student.
  }
  let local = null;
  try {
    local = JSON.parse(localStorage.getItem(backupKey(user)) || "null");
  } catch {}

  let migrate = false;
  if (!progress) {
    if (local) {
      progress = local;
      migrate = fromServer;
    } else {
      // Progress saved on this device before accounts existed. On shared computers it may belong
      // to someone else, so only import it after the student confirms it is theirs.
      try {
        const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || "null");
        if (legacy && fromServer && !localStorage.getItem(legacyDeclinedKey(user))) {
          const mine = confirm(
            "Encontramos neste aparelho um progresso salvo antes da criação das contas de aluno.\n\n" +
              "Esse progresso é seu? Toque em OK para transferi-lo para a sua conta, ou em Cancelar se ele for de outra pessoa."
          );
          if (mine) {
            progress = legacy;
            migrate = true;
            localStorage.removeItem(LEGACY_KEY);
          } else {
            localStorage.setItem(legacyDeclinedKey(user), "1");
          }
        }
      } catch {}
    }
  }

  $("#student-name").textContent = user.name || user.email;
  setSync(fromServer ? "✔ Progresso sincronizado" : "⚠ Sem conexão com o servidor");
  authScreen.hidden = true;
  shell.hidden = false;
  window.startApp(progress);
  if (migrate) window.onProgressSave(window.progressSnapshot());
}

// ---------- events ----------
document.addEventListener("click", (e) => {
  const tab = e.target.closest("[data-auth-tab]");
  if (tab) showTab(tab.dataset.authTab);
});

$("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.currentTarget;
  const email = f.email.value.trim();
  const password = f.password.value;
  if (!email || !password) return showMsg("Preencha e-mail e senha.", "error");
  withBusy(f, async () => {
    const user = await login(email, password);
    f.reset();
    await enterApp(user);
  });
});

$("#signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.currentTarget;
  const name = f.name.value.trim();
  const email = f.email.value.trim();
  const password = f.password.value;
  if (!name || !email || !password) return showMsg("Preencha todos os campos.", "error");
  if (password.length < MIN_PASSWORD) return showMsg(`A senha precisa ter pelo menos ${MIN_PASSWORD} caracteres.`, "error");
  if (password !== f.confirm.value) return showMsg("As senhas não são iguais.", "error");
  withBusy(f, async () => {
    const user = await signup(email, password, { full_name: name });
    f.reset();
    if (user.emailVerified) {
      await enterApp(user);
    } else {
      showTab("login");
      showMsg(`Conta criada! Enviamos um e-mail para ${email}. Clique no link de confirmação para ativar sua conta e entrar.`, "ok");
    }
  });
});

$("#recover-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.currentTarget;
  const email = f.email.value.trim();
  if (!email) return showMsg("Informe seu e-mail.", "error");
  withBusy(f, async () => {
    await requestPasswordRecovery(email);
    f.reset();
    showMsg("Se este e-mail estiver cadastrado, você receberá um link para criar uma nova senha.", "ok");
  });
});

$("#newpass-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.currentTarget;
  const password = f.password.value;
  if (password.length < MIN_PASSWORD) return showMsg(`A senha precisa ter pelo menos ${MIN_PASSWORD} caracteres.`, "error");
  if (password !== f.confirm.value) return showMsg("As senhas não são iguais.", "error");
  withBusy(f, async () => {
    const user = await updateUser({ password });
    f.reset();
    await enterApp(user);
  });
});

$("#logout-btn").addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  btn.disabled = true;
  // Wait for an in-flight save, then send anything still pending.
  for (let n = 0; saving && n < 30; n++) await new Promise((r) => setTimeout(r, 100));
  if (pending) await pushProgress();
  clearTimeout(timer);
  const unsynced = !!pending;
  if (unsynced && !confirm("Seu progresso mais recente ainda não foi enviado ao servidor (sem conexão). Ele ficará guardado só neste aparelho até você entrar de novo. Deseja sair mesmo assim?")) {
    btn.disabled = false;
    schedule();
    return;
  }
  // Remove this student's data from the device (important on shared computers),
  // unless it is the only copy of progress not yet saved on the server.
  if (currentUser && !unsynced) {
    try {
      localStorage.removeItem(backupKey(currentUser));
    } catch {}
  }
  try {
    await logout();
  } catch {}
  currentUser = null;
  pending = null;
  btn.disabled = false;
  window.startApp(null);
  showAuth("login");
  showMsg("Você saiu da sua conta.", "ok");
});

// ---------- boot ----------
(async () => {
  try {
    const result = await handleAuthCallback();
    if (result?.type === "recovery") {
      showAuth("newpass");
      return;
    }
    if (result?.type === "confirmation" && result.user) {
      await enterApp(result.user);
      return;
    }
  } catch (err) {
    showAuth("login");
    showMsg(err instanceof MissingIdentityError ? errorText(err) : "O link expirou ou é inválido. Faça login ou peça um novo link.", "error");
    return;
  }
  const user = await getUser();
  if (user) await enterApp(user);
  else showAuth("login");
})();
