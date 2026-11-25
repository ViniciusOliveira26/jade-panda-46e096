import { useId, useState } from "react";

/** "Ajuda" button with the Native Speakers contacts, and the copyright line. */
export function HelpFooter({ extra }: { extra?: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <footer className="footer">
      <div className="help-footer">
        <button type="button" className="help-btn" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
          ❓ Ajuda
        </button>
        <div className="help-panel" id={panelId} hidden={!open}>
          <p>
            <b>Precisa de ajuda?</b> Fale com a equipe Native Speakers:
          </p>
          <div className="help-contacts">
            <span>
              📞 <a href="tel:+5511989440558">(11) 98944-0558</a>
            </span>
            <span>
              ✉️ <a href="mailto:nativespeakers1@outlook.com">nativespeakers1@outlook.com</a>
            </span>
          </div>
        </div>
      </div>
      {extra && (
        <>
          <p>English Learning · Material de estudo original inspirado nos objetivos do sumário enviado.</p>
          <p>Contato: (11) 98944-0558 · nativespeakers1@outlook.com</p>
        </>
      )}
      <p className="rights">© {new Date().getFullYear()} Vinicius Oliveira Enterprise's · Todos os direitos reservados.</p>
    </footer>
  );
}
