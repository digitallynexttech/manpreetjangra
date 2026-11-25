"use client";
import { useRef } from "react";
import { EASE_IN, MEDIA, gsap, useGSAP } from "./gsap";

// A big number that grows from 0.6 to full size and counts up once when it
// comes into view (spec 3.4), like the classic Counter: the HTML holds the
// final value, screen readers read it from a visually hidden copy and never
// hear the count, and reduced motion leaves the number as it is. "29K+"
// counts 0 to 29 and keeps "K+"; a value without leading digits never moves.
export function BigCounter({
  value,
  label,
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const node = root.current;
      const shown = node?.querySelector<HTMLElement>("[data-count]");
      if (!node || !shown) return;
      const target = Number.parseInt(value, 10);
      const suffix = value.replace(/^\d+/, "");
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const counter = { n: 0 };
        // Plays once and never reverses. Not `once: true`: a timeline's
        // trigger measures itself a tick late, so a page opened scrolled
        // past it (a link from far down another page) killed it from inside
        // a newer trigger's first refresh, which broke that refresh.
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: node, start: "top 88%", toggleActions: "play none none none" },
          onComplete: () => {
            shown.textContent = value;
          },
        });
        timeline.from(shown, { scale: 0.6, opacity: 0.4, duration: 1.2, ease: EASE_IN }, 0);
        if (Number.isFinite(target) && /^\d/.test(value)) {
          shown.textContent = `0${suffix}`;
          timeline.to(
            counter,
            {
              n: target,
              duration: 1.6,
              ease: "power3.out",
              onUpdate: () => {
                shown.textContent = `${Math.round(counter.n)}${suffix}`;
              },
            },
            0,
          );
        }
        return () => {
          shown.textContent = value;
        };
      });
      return () => mm.revert();
    },
    { dependencies: [value] },
  );

  return (
    <div ref={root} className={["v2-counter", className].filter(Boolean).join(" ")}>
      <span className="v2-counter-value">
        <span className="v2-sr-only">{value}</span>
        <span data-count aria-hidden="true">
          {value}
        </span>
      </span>
      {label ? <span className="v2-counter-label">{label}</span> : null}
    </div>
  );
}
