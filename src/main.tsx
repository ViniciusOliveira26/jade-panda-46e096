import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { NavProvider } from "./state/nav";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavProvider>
      <App />
    </NavProvider>
  </StrictMode>
);
