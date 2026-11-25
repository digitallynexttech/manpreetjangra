"use client";
import { useRef } from "react";
import { animate, inView, stagger, useIsomorphicLayoutEffect } from "motion/react";
import { prefersReducedMotion } from "./media";

// One small square per open role (the count from roles.ts), filled for the
// full-time roles and outlined for the internships, in the hero's hiring
// tile. Decorative (the tile states the count in words), so it is hidden
// from assistive technology. When it scrolls into view the squares pop in
// one after another on a bouncy spring; already on screen, with reduced
// motion or without JavaScript, they simply show.

export function RoleDots({ total, filled }: { total: number; filled: number }) {
  const grid = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const element = grid.current;
    if (!element || prefersReducedMotion()) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    const dots = Array.from(element.children) as HTMLElement[];
    dots.forEach((dot) => {
      dot.style.opacity = "0";
      dot.style.transform = "scale(0.2)";
    });
    let started = false;
    const stop = inView(
      element,
      () => {
        if (started) return;
        started = true;
        animate(
          dots,
          { opacity: [0, 1], transform: ["scale(0.2)", "scale(1)"] },
          { delay: stagger(0.028), type: "spring", bounce: 0.55, duration: 0.7 },
        );
      },
      { amount: 0.5 },
    );
    return () => {
      stop();
      dots.forEach((dot) => {
        dot.style.opacity = "";
        dot.style.transform = "";
      });
    };
  }, [total, filled]);

  return (
    <span ref={grid} className="v5-roledots" aria-hidden="true">
      {Array.from({ length: total }, (_, index) => (
        <span key={index} data-filled={index < filled ? "" : undefined} />
      ))}
    </span>
  );
}
