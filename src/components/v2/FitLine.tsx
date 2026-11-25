"use client";
import { useEffect } from "react";
import { requestRefresh } from "./gsap";

// Makes a one-line title fill its box exactly (spec 4.2: the page title as
// one line across the full width). CSS sizes the title from its number of
// letters, which is close; once the fonts are in, this measures the line and
// scales the font size so the line ends at the right edge (then refreshes
// the scroll triggers below, whose positions moved). From 768 px only: below
// that the title may wrap at its CSS size. Renders nothing.
export function FitLine({ targetId, max = 352 }: { targetId: string; max?: number }) {
  useEffect(() => {
    const heading = document.getElementById(targetId);
    const line = heading?.firstElementChild as HTMLElement | null;
    if (!heading || !line) return;
    const wide = window.matchMedia("(min-width: 768px)");
    let frame = 0;
    const fit = () => {
      frame = 0;
      heading.style.removeProperty("font-size");
      if (!wide.matches) return;
      const natural = line.getBoundingClientRect().width;
      const room = heading.clientWidth;
      if (natural <= 0 || room <= 0) return;
      const size = parseFloat(getComputedStyle(heading).fontSize);
      const next = Math.min(max, (size * room * 0.995) / natural);
      heading.style.fontSize = `${next.toFixed(2)}px`;
      // The hero's height changed: triggers below it measure again.
      if (Math.abs(next - size) > 1) requestRefresh();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(fit);
    };
    schedule();
    let live = true;
    document.fonts?.ready.then(() => {
      if (live) schedule();
    });
    window.addEventListener("resize", schedule);
    return () => {
      live = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      heading.style.removeProperty("font-size");
    };
  }, [targetId, max]);
  return null;
}
