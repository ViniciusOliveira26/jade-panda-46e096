// App shell: decides between the login screen and the course, and renders the current page.
import { useCallback, useEffect, useRef, useState } from "react";
import { MissingIdentityError, getUser, handleAuthCallback, logout, type User } from "@netlify/identity";
import { AuthScreen, type AuthMessage, type AuthTab } from "./auth/AuthScreen";
import { errorText } from "./auth/errors";
import { BottomNav } from "./components/BottomNav";
import { Logo } from "./components/Logo";
import { ExerciseTabs } from "./components/ExerciseTabs";
import { Header } from "./components/Header";
import { HelpFooter } from "./components/HelpFooter";
import { NavBar } from "./components/NavBar";
import { Toasts } from "./components/Toasts";
import { Exam } from "./pages/Exam";
import { Landing } from "./landing/Landing";
import { Home, HomeSkeleton } from "./pages/Home";
import { Journey } from "./pages/Journey";
import { Listening } from "./pages/Listening";
import { Practice } from "./pages/Practice";
import { Profile } from "./pages/Profile";
import { ProgressPage } from "./pages/ProgressPage";
import { Reading } from "./pages/Reading";
import { UnitDetail } from "./pages/UnitDetail";
import { UnitsPage } from "./pages/UnitsPage";
import { Vocabulary } from "./pages/Vocabulary";
import { Writing } from "./pages/Writing";
import { isSpeaking, stopAllSpeech } from "./services/speech";
import { flushStudyTime, resetStudyTime, useStudyTimer } from "./services/studyTimer";
import { endSession, loadProgress, prepareLogout, saveProgress } from "./services/sync";
import { navSection, useNav, type Page } from "./state/nav";
import { defaultProgress } from "./state/progress";
import { setPersistHandler, setProgress } from "./state/store";

const PAGES: Record<Exclude<Page, "profile" | "home">, () => React.JSX.Element> = {
  journey: Journey,
  units: UnitsPage,
  unit: UnitDetail,
  practice: Practice,
  listening: Listening,
  vocabulary: Vocabulary,
  read: Reading,
  write: Writing,
  exam: Exam,
  progress: ProgressPage,
};

type Session =
  | { phase: "loading"; text: string; skeleton?: boolean }
  | { phase: "landing" }
  | { phase: "auth"; tab: AuthTab; message: AuthMessage | null } | { phase: "app"; user: User };

export function App() {
  const { nav, reset } = useNav();
  const [session, setSession] = useState<Session>({ phase: "loading", text: "Carregando…" });
  const booted = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useStudyTimer(nav.page, session.phase === "app", isSpeaking);

  // Escape closes the menu drawer (small screens).
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const showAuth = (tab: AuthTab = "login", message: AuthMessage | null = null) => setSession({ phase: "auth", tab, message });

  const enterApp = useCallback(
    async (user: User) => {
      setSession({ phase: "loading", text: "Carregando seu progresso…", skeleton: true });
      const { progress, migrate } = await loadProgress(user);
      setPersistHandler(saveProgress);
      setProgress(progress, migrate);
      reset();
      setSession({ phase: "app", user });
    },
    [reset]
  );

  const onLogout = async () => {
    flushStudyTime();
    if (!(await prepareLogout())) return;
    resetStudyTime();
    try {
      await logout();
    } catch {}
    setPersistHandler(null);
    endSession();
    stopAllSpeech();
    setProgress(defaultProgress(), false);
    showAuth("login", { text: "Você saiu da sua conta.", type: "ok" });
  };

  // Boot: email confirmation / password recovery links, then the saved session.
  // Runs once (the callback token in the URL can only be used once).
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    (async () => {
      try {
        const result = await handleAuthCallback();
        if (result?.type === "recovery") return showAuth("newpass");
        if (result?.type === "confirmation" && result.user) return await enterApp(result.user);
      } catch (err) {
        showAuth("login", {
          text: err instanceof MissingIdentityError ? errorText(err) : "O link expirou ou é inválido. Faça login ou peça um novo link.",
          type: "error",
        });
        return;
      }
      const user = await getUser();
      if (user) await enterApp(user);
      else setSession({ phase: "landing" });
    })();
  }, [enterApp]);

  // Leaving a screen stops any audio or microphone in use.
  useEffect(() => {
    stopAllSpeech();
  }, [nav.key, nav.unit, nav.qIndex, nav.fIndex, nav.mode, nav.repeatIdx]);

  if (session.phase === "landing") return <Landing onSignup={() => showAuth("signup")} onLogin={() => showAuth("login")} />;

  // After login: the dashboard layout with placeholders while the student's progress loads.
  if (session.phase === "loading" && session.skeleton)
    return (
      <div className="app" aria-busy="true">
        <header className="topbar">
          <Logo />
        </header>
        <main className="page" role="status" aria-live="polite">
          <span className="sr-only">{session.text}</span>
          <HomeSkeleton />
        </main>
      </div>
    );

  if (session.phase !== "app")
    return (
      <AuthScreen
        onBack={session.phase === "auth" && session.tab !== "newpass" ? () => setSession({ phase: "landing" }) : undefined}
        loading={session.phase === "loading" ? session.text : null}
        tab={session.phase === "auth" ? session.tab : "login"}
        message={session.phase === "auth" ? session.message : null}
        onTab={(tab, message = null) => showAuth(tab, message)}
        onEnter={enterApp}
      />
    );

  const user = session.user;
  const PageView = nav.page === "profile" || nav.page === "home" ? null : (PAGES[nav.page] ?? null);
  return (
    <div className="app">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header name={user.name || user.email || "Aluno"} picture={user.pictureUrl} onLogout={onLogout} menuOpen={menuOpen} onMenu={() => setMenuOpen(!menuOpen)} />
      <div className="app-body">
        <NavBar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="app-content">
          <main id="conteudo" tabIndex={-1} className="page">
            {navSection(nav.page) === "practice" && <ExerciseTabs />}
            {nav.page === "home" ? (
              <Home key={nav.key} name={user.name || ""} />
            ) : PageView ? (
              <PageView key={nav.key} />
            ) : (
              <Profile key={nav.key} user={user} onUser={(u) => setSession({ phase: "app", user: u })} onLogout={onLogout} />
            )}
          </main>
          <HelpFooter extra />
        </div>
      </div>
      <BottomNav menuOpen={menuOpen} onMenu={() => setMenuOpen(!menuOpen)} />
      <div className="sr-only" aria-live="polite">
        {nav.announce}
      </div>
      <Toasts />
    </div>
  );
}
