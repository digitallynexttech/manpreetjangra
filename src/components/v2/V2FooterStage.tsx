"use client";
import { useRef, type ReactNode } from "react";
import { MEDIA, gsap, useGSAP } from "./gsap";

// The portrait in the footer card rises from the bottom edge while the card
// comes into view (spec 4.1 item 10, Lando's helmet bust). Scrubbed; static
// with reduced motion.
export function V2FooterStage({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const node = root.current;
      const card = node?.closest(".v2-footer-card");
      if (!node || !card) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        gsap.fromTo(
          node.firstElementChild,
          { yPercent: 38 },
          { yPercent: 0, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom bottom", scrub: 0.6 } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root} className="v2-footer-stage" aria-hidden="true">
      {children}
    </div>
  );
}
