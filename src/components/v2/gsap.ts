"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// One place that registers GSAP's plugins for /v2 (plan/v2-spec.md 3.2).
// Only files under src/components/v2 and src/app/v2 import GSAP, so the
// classic pages never load it.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
// Phones resize the viewport when the address bar slides; refreshing every
// trigger then would make pinned sections jump.
ScrollTrigger.config({ ignoreMobileResize: true });

/** The three gsap.matchMedia() conditions every animated component uses
 *  (spec 3.2). Pins and horizontal tracks only on `desktop`; `reduce` gets
 *  static content or short fades at most. */
export const MEDIA = {
  reduce: "(prefers-reduced-motion: reduce)",
  /** Any width, motion allowed. */
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  small: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
} as const;

export type MediaFlags = { reduce?: boolean; desktop?: boolean; small?: boolean };

/** Entrances (spec 3.3). Scrubbed timelines use "none". */
export const EASE_IN = "power3.out";

/** Calls `done` once every image inside `root` has loaded (or failed), so a
 *  pinned section can refresh its triggers with the real heights. */
export function whenImagesLoad(root: Element, done: () => void): () => void {
  const pending = Array.from(root.querySelectorAll("img")).filter((img) => !img.complete);
  if (pending.length === 0) {
    done();
    return () => {};
  }
  let left = pending.length;
  const one = () => {
    left -= 1;
    if (left === 0) done();
  };
  pending.forEach((img) => {
    img.addEventListener("load", one, { once: true });
    img.addEventListener("error", one, { once: true });
  });
  return () =>
    pending.forEach((img) => {
      img.removeEventListener("load", one);
      img.removeEventListener("error", one);
    });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
