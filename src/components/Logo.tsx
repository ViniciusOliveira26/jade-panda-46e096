// Native Speakers logo: speech-bubble mark + wordmark. `light` = for dark backgrounds.
export function Logo({ light, compact }: { light?: boolean; compact?: boolean }) {
  return (
    <span className={"logo" + (light ? " logo-light" : "")}>
      <svg className="logo-mark" width="36" height="36" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <rect width="40" height="40" rx="11" fill="#13315c" />
        <path d="M10 12.5a4.5 4.5 0 0 1 4.5-4.5h11a4.5 4.5 0 0 1 4.5 4.5v8a4.5 4.5 0 0 1-4.5 4.5H19l-5.5 5v-5h0A3.5 3.5 0 0 1 10 21.5z" fill="#1a5fe0" />
        <path d="M15.5 20v-7l5 7v-7M27 14c-.6-.8-1.5-1.1-2.4-1-1.2.1-1.9 1-1.7 1.9.3 1.7 4.3 1.3 4.3 3.4 0 1-.9 1.8-2.2 1.8-1 0-1.9-.4-2.5-1.2" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {!compact && (
        <span className="logo-text">
          <b>Native Speakers</b>
          <small>English Learning 2.0</small>
        </span>
      )}
    </span>
  );
}
