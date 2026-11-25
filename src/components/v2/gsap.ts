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

/** Scrub for timelines tied to a sticky stage (the pinned scenes): Lenis is
 *  the only smoother, so the content stays locked to its pin and is at rest
 *  when the pin lets go. */
export const SCRUB = true;
/** Scrub for free parallax and drawn strokes that are not pinned: a light
 *  catch-up, the same everywhere. */
export const SCRUB_FREE = 0.3;

/** Runs `setup` on the next frame inside a matchMedia `context`, so its
 *  tweens and triggers are reverted with the context. Entrances decide there
 *  what is already in view: on Back the browser puts the scroll position back
 *  only after the page's effects have run, before the next frame. Returns the
 *  cleanup for `mm.add`. */
export function onNextFrame(context: gsap.Context, setup: () => void | (() => void)) {
  const run = context.add("nextFrame", setup);
  const frame = requestAnimationFrame(() => run());
  return () => cancelAnimationFrame(frame);
}

let queued = 0;
/** Measures every trigger again on the next frame. Calls within one frame
 *  (a page mounting, fonts arriving, a row settling) share one refresh. */
export function requestRefresh() {
  if (queued) return;
  queued = requestAnimationFrame(() => {
    queued = 0;
    ScrollTrigger.refresh();
  });
}

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
