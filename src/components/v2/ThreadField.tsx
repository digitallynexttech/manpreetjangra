"use client";
import { useRef } from "react";
import { MEDIA, gsap, useGSAP } from "./gsap";

// The field of long flowing threads behind a /v2 surface (spec 3.4), in place
// of Lando's contour lines: 9 to 14 smooth cubic curves from a fixed seed, so
// the server and the browser draw the same paths, 1 px in the theme's thread
// colour (line on paper, night-line on night), drifting a few per cent with
// the scroll. `accent` lets one thread run in vermilion, the classic site's
// signature thread (it counts towards the red budget). Decorative only.

function random(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1600;
const H = 1000;
const round = (n: number) => Math.round(n * 10) / 10;

/** Threads that run across the box from left to right, each a chain of
 *  smooth cubic segments (C, then S so the joins stay smooth). */
export function threadPaths(count: number, seed: number): string[] {
  const next = random(seed);
  const paths: string[] = [];
  for (let i = 0; i < count; i++) {
    const baseY = 60 + (i * (H - 120)) / Math.max(1, count - 1) + (next() - 0.5) * 90;
    const segments = 4 + Math.floor(next() * 2);
    const step = (W + 320) / segments;
    let x = -160;
    let y = baseY;
    let d = `M ${round(x)} ${round(y)}`;
    for (let s = 0; s < segments; s++) {
      const amp = 70 + next() * 150;
      const nx = x + step;
      const ny = Math.min(H + 60, Math.max(-60, baseY + (next() - 0.5) * 2 * amp));
      const c2x = nx - step * (0.3 + next() * 0.25);
      const c2y = ny + (next() - 0.5) * amp * 1.4;
      if (s === 0) {
        const c1x = x + step * (0.3 + next() * 0.25);
        const c1y = y + (next() - 0.5) * amp;
        d += ` C ${round(c1x)} ${round(c1y)} ${round(c2x)} ${round(c2y)} ${round(nx)} ${round(ny)}`;
      } else {
        d += ` S ${round(c2x)} ${round(c2y)} ${round(nx)} ${round(ny)}`;
      }
      x = nx;
      y = ny;
    }
    paths.push(d);
  }
  return paths;
}

export function ThreadField({
  count = 11,
  seed = 7,
  accent = false,
  drift = 6,
  className,
}: {
  /** 9 to 14 threads. */
  count?: number;
  seed?: number;
  /** One thread in vermilion. */
  accent?: boolean;
  /** Parallax in per cent of the field's height (4 to 8; 0 = still). */
  drift?: number;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const paths = threadPaths(Math.min(14, Math.max(9, count)), seed);
  const accentIndex = Math.floor(paths.length / 2);

  useGSAP(
    () => {
      const box = root.current;
      const host = box?.parentElement;
      // drift 0: a still field (inside a pinned stage, where the stage
      // itself does the moving).
      if (!box || !host || !drift) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        gsap.fromTo(
          box.firstElementChild,
          { yPercent: -drift / 2 },
          {
            yPercent: drift / 2,
            ease: "none",
            scrollTrigger: { trigger: host, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={["v2-threadfield", className].filter(Boolean).join(" ")} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" focusable="false">
        {paths.map((d, index) => (
          <path
            key={index}
            d={d}
            className={accent && index === accentIndex ? "v2-thread-accent" : undefined}
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
