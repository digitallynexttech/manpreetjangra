"use client";
import { useRef, type CSSProperties } from "react";
import { MEDIA, SCRUB_FREE, gsap, useGSAP } from "./gsap";

// One bold stroke drawn by the scroll, on load or on hover (spec 3.4): the
// /v2 stand-in for Lando's signature and scribbles. It is a pure path (no
// letters, no signature), vermilion on paper and marigold on night unless a
// tone is given. Every path has pathLength 1000, so drawing it is one number:
// stroke-dashoffset from 1001 (hidden) to 0 (drawn); 1000 steps, since GSAP
// rounds px values to whole numbers. A scroll stroke is
// drawn by a scrubbed GSAP tween; a load stroke by a CSS animation (so it
// never flashes before the script runs); a hover stroke by a CSS transition.
// Without JavaScript or with reduced motion the stroke is simply there.
//
// Variants:
// - loop: a long looping line across a panel (the "message" section);
// - underline: a quick underline ("line") or ring ("circle") around a word,
//   Lando's "ON" scribble;
// - word: a big looping flourish behind a heading, Lando's "Collabs".

const SHAPES = {
  loop: {
    viewBox: "0 0 1200 400",
    width: 12,
    d: "M -20 318 C 120 306 214 262 292 202 C 362 148 418 84 382 62 C 342 38 288 110 330 172 C 382 248 522 262 612 202 C 692 148 702 72 652 70 C 600 68 590 162 662 212 C 762 282 902 252 982 192 C 1052 140 1100 116 1220 108",
  },
  word: {
    viewBox: "0 0 1200 520",
    width: 20,
    d: "M 20 470 C 140 430 230 300 260 220 C 290 140 250 90 210 120 C 160 160 210 300 330 320 C 470 343 560 180 600 120 C 640 60 590 20 545 60 C 490 110 560 300 700 330 C 850 362 960 220 1000 150 C 1040 80 990 40 950 80 C 900 132 960 300 1180 290",
  },
  line: {
    viewBox: "0 0 400 60",
    width: 7,
    d: "M 6 40 C 80 30 200 22 330 24 C 362 25 388 28 394 34 C 398 40 340 45 252 47",
  },
  circle: {
    viewBox: "0 0 400 160",
    width: 8,
    d: "M 332 38 C 282 12 120 8 50 42 C -4 70 20 130 140 146 C 260 160 380 140 392 90 C 400 50 330 22 228 18",
  },
} as const;

export type ThreadDrawVariant = "loop" | "underline" | "word";

export function ThreadDraw({
  variant,
  shape = "line",
  trigger,
  tone = "auto",
  start = "top 85%",
  end = "bottom 35%",
  on = "self",
  delay = 0.35,
  className,
  style,
}: {
  variant: ThreadDrawVariant;
  /** For `underline`: a line under the word or a ring around it. */
  shape?: "line" | "circle";
  /** scroll (scrubbed), load (once, on mount), hover (CSS, on the nearest
   *  .v2-draw-host), manual (drawn; the caller animates .v2-draw path).
   *  Defaults: underline draws on load, loop and word on scroll. */
  trigger?: "scroll" | "load" | "hover" | "manual";
  tone?: "auto" | "vermilion" | "marigold";
  /** ScrollTrigger start and end for `scroll`. */
  start?: string;
  end?: string;
  /** What the scroll range follows: the stroke itself, or its section
   *  (a pinned panel draws across the whole pin). */
  on?: "self" | "section";
  /** Seconds before a `load` stroke starts. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const mode = trigger ?? (variant === "underline" ? "load" : "scroll");
  const spec = variant === "underline" ? SHAPES[shape] : SHAPES[variant];

  useGSAP(
    () => {
      const node = svg.current;
      const path = node?.querySelector("path");
      if (!node || !path || mode !== "scroll") return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const host = on === "section" ? (node.closest("section") ?? node) : node;
        gsap.fromTo(
          path,
          { strokeDashoffset: 1001 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: host, start, end, scrub: SCRUB_FREE },
          },
        );
      });
      return () => mm.revert();
    },
    { dependencies: [mode, on, start, end] },
  );

  const classes = [
    "v2-draw",
    `v2-draw--${variant}`,
    mode === "hover" && "v2-draw--hover",
    mode === "load" && "v2-draw--load",
    tone !== "auto" && `v2-draw--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      ref={svg}
      className={classes}
      style={mode === "load" ? ({ ...style, "--v2-draw-delay": `${delay}s` } as CSSProperties) : style}
      viewBox={spec.viewBox}
      // A ring stretches to its box so it surrounds the whole word; the stroke keeps its width.
      preserveAspectRatio={variant === "underline" && shape === "circle" ? "none" : undefined}
      aria-hidden="true" focusable="false">
      <path
        d={spec.d}
        pathLength={1000}
        strokeWidth={spec.width}
        vectorEffect={variant === "underline" && shape === "circle" ? "non-scaling-stroke" : undefined}
      />
    </svg>
  );
}
