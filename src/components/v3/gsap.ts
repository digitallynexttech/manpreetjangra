"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSyncExternalStore } from "react";

// One place that registers GSAP's plugins for /v3 (plan/versions-spec.md 3,
// V3: ScrollTrigger scenes on native scrolling, no Lenis). Only files under
// src/components/v3 and src/app/v3 import it, so other editions never load
// this copy for /v3's sake.
gsap.registerPlugin(ScrollTrigger, useGSAP);
// Phones resize the viewport when the address bar slides; refreshing every
// trigger then would make the pinned stages jump.
ScrollTrigger.config({ ignoreMobileResize: true });

/** gsap.matchMedia() conditions. Pinned stages and scrubbed footage need
 *  `motion`; the horizontal rows (chapters, film strip) need `desktop`.
 *  `desktop` and `small` both require no-preference, so they never overlap
 *  with reduced motion. */
export const MEDIA = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  small: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
} as const;

const REDUCE = "(prefers-reduced-motion: reduce)";

function subscribeReduce(onChange: () => void) {
  const query = window.matchMedia(REDUCE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** True when the visitor asks for reduced motion. The server (and the first
 *  hydration pass) assume motion is allowed. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE).matches,
    () => false,
  );
}

/** A value that follows `progress` with a short glide, for drawing frame
 *  sequences: the footage eases into place instead of stepping with each
 *  wheel notch. */
export function glide(onUpdate: (value: number) => void, duration = 0.35) {
  const state = { value: 0 };
  const to = gsap.quickTo(state, "value", {
    duration,
    ease: "power2.out",
    onUpdate: () => onUpdate(state.value),
  });
  return (value: number) => to(value);
}

export { gsap, ScrollTrigger, useGSAP };
