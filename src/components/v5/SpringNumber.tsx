"use client";
import { useRef } from "react";
import { animate, inView, useIsomorphicLayoutEffect } from "motion/react";
import { prefersReducedMotion } from "./media";

// A number tile's figure that springs to its value (plan/versions-spec.md,
// V5: "number tiles springing their counts"). The server HTML holds the final
// value ("29K+"), and screen readers read it from a visually hidden copy, so
// they never hear the count. Only when the figure is still below the
// viewport once the page runs does it drop to 0 and, when it scrolls into
// view, count up on a critically damped spring (no overshoot, so it never
// shows a number above the real one) while the figure itself pops in on a
// bouncy spring. With reduced motion, without JavaScript, or when it is
// already on screen, it simply shows the value.

export function SpringNumber({ value, className }: { value: string; className?: string }) {
  const figure = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const element = figure.current;
    const match = /^(\d+)(.*)$/.exec(value);
    if (!element || !match || prefersReducedMotion()) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    const target = Number(match[1]);
    const suffix = match[2];
    element.textContent = `0${suffix}`;
    let count: { stop: () => void } | undefined;
    let pop: { stop: () => void } | undefined;
    const stop = inView(
      element,
      () => {
        if (count) return;
        count = animate(0, target, {
          type: "spring",
          bounce: 0,
          duration: 1.5,
          onUpdate: (latest) => {
            element.textContent = `${Math.round(latest)}${suffix}`;
          },
        });
        pop = animate(element, { scale: [0.72, 1] }, { type: "spring", bounce: 0.45, duration: 0.9 });
      },
      { amount: 0.6 },
    );
    return () => {
      stop();
      count?.stop();
      pop?.stop();
      element.textContent = value;
    };
  }, [value]);

  return (
    <span className={["v5-number", className].filter(Boolean).join(" ")}>
      <span ref={figure} className="v5-number-figure" aria-hidden="true">
        {value}
      </span>
      <span className="v5-sr">{value}</span>
    </span>
  );
}
