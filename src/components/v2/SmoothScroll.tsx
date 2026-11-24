"use client";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "./gsap";

// Smooth scrolling for /v2 (plan/v2-spec.md 3.2): one Lenis instance for the
// window, driven by GSAP's ticker (autoRaf off) so Lenis and ScrollTrigger
// read the same frame, and destroyed when /v2 unmounts. With reduced motion
// there is no Lenis at all: the page scrolls natively (spec 3.3). Lenis
// scrolls with `behavior: "instant"`, and v2.css turns the classic site's
// `scroll-behavior: smooth` off while `html.lenis` is set, so the two never
// fight.
//
// The instance lives in a tiny external store, so the header and the menu can
// read it (`useLenis`) to stop scrolling under the open menu.

let current: Lenis | null = null;
const listeners = new Set<() => void>();
function setLenis(next: Lenis | null) {
  current = next;
  listeners.forEach((listener) => listener());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The live Lenis instance, or null (server, reduced motion). */
export function useLenis() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
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
    // In-page links (#criteria) glide too, clear of the fixed header.
    anchors: { offset: -96 },
    stopInertiaOnNavigate: true,
  });
  const tick = (time: number) => lenis.raf(time * 1000);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tick);
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

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let destroy: (() => void) | null = null;
    const apply = () => {
      if (reduce.matches && destroy) {
        destroy();
        destroy = null;
        setLenis(null);
      } else if (!reduce.matches && !destroy) {
        const made = create();
        destroy = made.destroy;
        setLenis(made.lenis);
      }
      ScrollTrigger.refresh();
    };
    apply();
    reduce.addEventListener("change", apply);
    return () => {
      reduce.removeEventListener("change", apply);
      destroy?.();
      setLenis(null);
    };
  }, []);

  // A new page starts at the top (spec 3.3), unless the address names a
  // place on it (#criteria) or the visitor went back or forward. Its triggers
  // are measured again once the fonts have arrived (Geist 800 and Newsreader
  // change the line breaks). This effect runs after the page's own effects,
  // so every trigger exists by then.
  useEffect(() => {
    if (popped) popped = false;
    else if (!window.location.hash) current?.scrollTo(0, { immediate: true, force: true });
    let live = true;
    document.fonts?.ready.then(() => {
      if (live) ScrollTrigger.refresh();
    });
    return () => {
      live = false;
    };
  }, [pathname]);

  return <>{children}</>;
}
