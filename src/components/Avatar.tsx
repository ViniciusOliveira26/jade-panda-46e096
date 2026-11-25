// Student photo (from the account, e.g. Google login) with the initials as fallback.
import { useState } from "react";

export const initials = (name: string) =>
  name
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("") || "A";

export function Avatar({ name, src, size }: { name: string; src?: string; size?: "lg" }) {
  const [broken, setBroken] = useState(false);
  const cls = "avatar" + (size ? " avatar-" + size : "");
  if (src && !broken && /^https:\/\//.test(src))
    return <img className={cls + " avatar-img"} src={src} alt="" aria-hidden="true" referrerPolicy="no-referrer" onError={() => setBroken(true)} />;
  return (
    <span className={cls} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
