"use client";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

// Ported from Motion() in the sibling site (E:\deepkgoel\app\components\Chrome.tsx),
// without its ".site-talk" invitation effect, which this site does not have.
// It renders nothing: it only adds behaviour to the page.

// The page the visitor first landed on: `undefined` until the site has loaded
// in the browser, `null` once they have moved to another page.
let landingPath: string | null | undefined;

export function Motion() {
  const path = usePathname();
  // Pictures cannot be dragged. The stylesheet covers Chrome and Safari; this
  // covers Firefox, which ignores that CSS property.
  useEffect(() => {
    const stop = (event: DragEvent) => {
      if (event.target instanceof HTMLImageElement) event.preventDefault();
    };
    document.addEventListener("dragstart", stop);
    return () => document.removeEventListener("dragstart", stop);
  }, []);
  // Scroll reveal: blocks marked `data-reveal` fade and rise as they come into
  // view. A layout effect hides them before the browser paints a new page, so
  // nothing blinks.
  useLayoutEffect(() => {
    if (landingPath === undefined) landingPath = path;
    else if (landingPath !== path) landingPath = null;
    const firstLoad = landingPath === path;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !("IntersectionObserver" in window)) return;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".site [data-reveal]"),
    );
    const timers: ReturnType<typeof setTimeout>[] = [];
    const settle = (node: HTMLElement) => {
      node.classList.remove("site-reveal-ready", "is-visible");
      node.style.removeProperty("--reveal-delay");
    };
    const observer = new IntersectionObserver(
      (entries) => {
        // Blocks that arrive together appear one after another.
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const node = entry.target as HTMLElement;
          const delay = Math.min(order++, 5) * 80;
          node.style.setProperty("--reveal-delay", `${delay}ms`);
          node.classList.add("is-visible");
          observer.unobserve(node);
          // Once revealed, hand the block back to its own hover and press
          // transitions. Groups keep their classes: their children animate.
          if (node.dataset.reveal !== "group")
            timers.push(setTimeout(() => settle(node), delay + 1000));
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    for (const node of nodes) {
      // On the first load the server already painted what is on screen;
      // hiding it now would make it blink, so only later blocks animate.
      if (firstLoad && node.getBoundingClientRect().top < window.innerHeight)
        continue;
      node.classList.add("site-reveal-ready");
      observer.observe(node);
    }
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      nodes.forEach(settle);
    };
  }, [path]);
  return null;
}
