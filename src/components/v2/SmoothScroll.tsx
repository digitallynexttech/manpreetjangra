"use client";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, requestRefresh, ScrollTrigger } from "./gsap";

// Smooth scrolling for /v2 (plan/v2-spec.md 3.2): one Lenis instance for the
// window, driven by GSAP's ticker (autoRaf off) so Lenis and ScrollTrigger
// read the same frame, and destroyed when /v2 unmounts. With reduced motion
// there is no Lenis at all: the page scrolls natively (spec 3.3). Lenis
// scrolls with `behavior: "instant"`, and v2.css turns the classic site's
// `scroll-behavior: smooth` off while `html.lenis` is set, so the two never
// fight.
//
// The instance lives in a module variable, so the menu (`lockScroll`) and
// the scroll scenes (`getLenis`) can reach it from event handlers.

let current: Lenis | null = null;
function setLenis(next: Lenis | null) {
  current = next;
}

/** The live Lenis instance outside React (event handlers), or null. */
export function getLenis() {
  return current;
}

/** Stops or restarts page scrolling (the open menu), with or without Lenis. */
export function lockScroll(locked: boolean) {
  if (current) {
    if (locked) current.stop();
    else current.start();
  }
  document.documentElement.classList.toggle("v2-scroll-locked", locked);
}

function create() {
  const lenis = new Lenis({
    autoRaf: false,
    lerp: 0.1,
    // In-page links (#criteria) glide too. Lenis already keeps clear of the
    // fixed header by subtracting the page's scroll-padding-top (88 px, the
    // same mark native and cross-page anchors land on), so no extra offset.
    anchors: true,
    stopInertiaOnNavigate: true,
  });
  const tick = (time: number) => lenis.raf(time * 1000);
  lenis.on("scroll", ScrollTrigger.update);
  // First in each tick: Lenis scrolls, ScrollTrigger updates, then GSAP
  // renders the tweens that update started, all in the same frame.
  gsap.ticker.add(tick, false, true);
  gsap.ticker.lagSmoothing(0);
  const destroy = () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
  return { lenis, destroy };
}

// Back and forward keep the browser's own scroll position; every other
// navigation starts the new page at the top.
let popped = false;
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    popped = true;
  });
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let destroy: (() => void) | null = null;
    const apply = () => {
      let changed = false;
      if (reduce.matches && destroy) {
        destroy();
        destroy = null;
        setLenis(null);
        changed = true;
      } else if (!reduce.matches && !destroy) {
        const made = create();
        destroy = made.destroy;
        setLenis(made.lenis);
        changed = true;
      }
      return changed;
    };
    apply();
    // The first measurement is the pathname effect's below; later, only a
    // switch into or out of reduced motion measures again.
    const change = () => {
      if (apply()) requestRefresh();
    };
    reduce.addEventListener("change", change);
    return () => {
      reduce.removeEventListener("change", change);
      destroy?.();
      setLenis(null);
    };
  }, []);

  // A new page starts at the top (spec 3.3), unless the address names a
  // place on it (#criteria) or the visitor went back or forward. The first
  // page of a visit keeps the browser's own position too, so a reload stays
  // where it was (as on the classic site). Its triggers
  // are measured again once the fonts have arrived (Geist 800 and Newsreader
  // change the line breaks). This effect runs after the page's own effects,
  // so every trigger exists by then.
  useEffect(() => {
    const initial = first.current;
    first.current = false;
    if (popped || initial) popped = false;
    else if (!window.location.hash) current?.scrollTo(0, { immediate: true, force: true });
    // Once the page's own effects have run (pins added, titles fitted), and
    // again when the fonts are in; both share a frame when they can.
    requestRefresh();
    let live = true;
    document.fonts?.ready.then(() => {
      if (live) requestRefresh();
    });
    return () => {
      live = false;
    };
  }, [pathname]);

  return <>{children}</>;
}
