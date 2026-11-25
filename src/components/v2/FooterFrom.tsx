"use client";
import { useLayoutEffect } from "react";

// Tells the footer which colour the page ends on, so its fade starts there
// (`data-from` on .v2-footer, see v2.css). Rendered inside the page's last
// section. A `.v2:has(...) .v2-footer` rule did the same, but made every DOM
// change inside .v2 restyle the whole page. Without script the fade starts
// from paper, far below the fold.
export function FooterFrom({ tone }: { tone: "marigold" | "sand" }) {
  useLayoutEffect(() => {
    const footer = document.querySelector<HTMLElement>(".v2-footer");
    footer?.setAttribute("data-from", tone);
    return () => footer?.removeAttribute("data-from");
  }, [tone]);
  return null;
}
