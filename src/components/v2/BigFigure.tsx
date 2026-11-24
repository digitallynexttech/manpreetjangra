"use client";
import { useRef } from "react";
import { MEDIA, gsap, useGSAP } from "./gsap";

// One giant number that grows as you scroll, with a bold label (spec 4.2,
// Lando's "49 PODIUMS"). The number scales from 0.55 to full size while the
// block crosses the viewport (scrubbed); phones get a shorter, gentler
// version and reduced motion a static number. Both lines are real text.
export function BigFigure({
  value,
  label,
  id,
  className,
}: {
  value: string;
  label: string;
  id?: string;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const node = root.current;
      const number = node?.querySelector(".v2-bigfig-num");
      const caption = node?.querySelector(".v2-bigfig-label");
      if (!node || !number || !caption) return;
      const mm = gsap.matchMedia();
      mm.add({ desktop: MEDIA.desktop, small: MEDIA.small }, (context) => {
        const { desktop } = context.conditions as { desktop: boolean };
        gsap.fromTo(
          number,
          { scale: desktop ? 0.55 : 0.8 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: node, start: "top bottom", end: desktop ? "bottom 85%" : "center 60%", scrub: 0.6 },
          },
        );
        gsap.fromTo(
          caption,
          { xPercent: desktop ? 12 : 6, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: node, start: "top 70%", end: "bottom 85%", scrub: 0.6 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} id={id} className={["v2-bigfig", className].filter(Boolean).join(" ")}>
      <p className="v2-bigfig-num">{value}</p>
      <p className="v2-bigfig-label v2-sans v2-size-display">{label}</p>
    </div>
  );
}
