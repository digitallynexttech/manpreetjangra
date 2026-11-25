"use client";
import { useRef, type ReactNode } from "react";
import { MEDIA, ScrollTrigger, gsap, useGSAP } from "./gsap";

// Scroll shells of the /v3 inner pages (plan/versions-spec.md 3, V3 Inner
// pages), next to the home's in Scenes.tsx. Each one animates markup the
// server built, by data attribute, with GSAP ScrollTrigger on native
// scrolling. Nothing is hidden by CSS before the script runs: the starting
// states are set here, only when motion is allowed, and only for words that
// are still below the screen when the page starts, so the first paint, a
// visitor without JavaScript and reduced motion all get every word in place.

const q = (root: Element, selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));
const one = (root: Element, selector: string) => root.querySelector<HTMLElement>(selector);

/** True while `el` still starts below the screen. */
const below = (el: HTMLElement) => el.getBoundingClientRect().top > window.innerHeight * 0.92;

/** A readable section whose blocks (`data-v3-in`) rise into place as they
 *  come up the screen, a few at a time, like lines of a credit roll. */
export function Rise({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const items = q(el, "[data-v3-in]").filter(below);
        if (items.length === 0) return;
        gsap.set(items, { opacity: 0, y: 36 });
        ScrollTrigger.batch(items, {
          start: "top 92%",
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08, overwrite: true }),
        });
        // A block that takes keyboard focus before it has risen shows at once.
        const onFocus = (event: FocusEvent) => {
          const item = (event.target as Element | null)?.closest<HTMLElement>("[data-v3-in]");
          if (item && items.includes(item)) gsap.to(item, { opacity: 1, y: 0, duration: 0.3, overwrite: true });
        };
        el.addEventListener("focusin", onFocus);
        return () => el.removeEventListener("focusin", onFocus);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}

/** The service lines on /v3/work as a deck of chapter cards. From 1024 px
 *  the stage is pinned: the head stays on the left while the cards are dealt
 *  one over the other on the right, each earlier card stepping back (up,
 *  smaller, darker) so the edges of the deck show; the scroll snaps card by
 *  card. Below 1024 px the cards stack down the page and rise in. */
export function ChapterDeck({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const cards = q(el, "[data-v3-card]");
      const mm = gsap.matchMedia();
      mm.add(MEDIA.desktop, () => {
        if (cards.length < 2) return;
        el.classList.add("is-pinned");
        el.style.setProperty("--v3-count", String(cards.length));
        const steps = cards.length - 1;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            snap: { snapTo: 1 / steps, inertia: false, duration: { min: 0.2, max: 0.6 }, delay: 0.08, ease: "power2.inOut" },
          },
        });
        tl.to({}, { duration: 1 }, 0);
        // Card `i` comes in over the part of the run between snap points
        // i - 1 and i, leaving a still moment around each snap point.
        const seg = 1 / steps;
        for (let i = 1; i < cards.length; i++) {
          const at = (i - 1) * seg + seg * 0.14;
          const length = seg * 0.72;
          tl.from(cards[i], { yPercent: 112, opacity: 0, duration: length, ease: "power2.out" }, at);
          for (let j = 0; j < i; j++) {
            const depth = i - j;
            tl.to(cards[j], { y: -depth * 26, scale: 1 - depth * 0.05, duration: length, ease: "power2.out" }, at);
            const veil = one(cards[j], "[data-v3-veil]");
            if (veil) tl.to(veil, { opacity: Math.min(0.9, 0.5 + depth * 0.14), duration: length }, at);
          }
        }
        return () => {
          el.classList.remove("is-pinned");
          el.style.removeProperty("--v3-count");
        };
      });
      mm.add(MEDIA.small, () => {
        cards.filter(below).forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 56,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top 94%", end: "top 55%", scrub: 0.5 },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="v3-deck">
      {children}
    </div>
  );
}

/** Quotes shown as subtitles (the Writing themes): in each block
 *  (`data-v3-quote`) the theme label, then the lines (`data-v3-sub`) one
 *  after another, then the attribution and link (`data-v3-after`), all
 *  scrubbed by the block's way up the screen. */
export function SubtitleList({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const cleanups: (() => void)[] = [];
        q(el, "[data-v3-quote]")
          .filter(below)
          .forEach((block) => {
            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: { trigger: block, start: "top 85%", end: "top 32%", scrub: 0.5 },
            });
            const label = one(block, "[data-v3-label]");
            const lines = q(block, "[data-v3-sub]");
            const after = q(block, "[data-v3-after]");
            if (label) tl.from(label, { opacity: 0, y: 12, duration: 0.14 }, 0);
            const step = 0.62 / Math.max(1, lines.length);
            lines.forEach((line, index) => {
              tl.from(line, { opacity: 0, y: 14, filter: "blur(6px)", duration: step * 1.2 }, 0.1 + index * step);
            });
            if (after.length) tl.from(after, { opacity: 0, y: 10, duration: 0.16 }, 0.8);
            // Keyboard focus on the block's link shows the whole block.
            const onFocus = () => {
              const end = tl.scrollTrigger?.end;
              if (end !== undefined && window.scrollY < end) window.scrollTo({ top: end, behavior: "instant" });
            };
            block.addEventListener("focusin", onFocus);
            cleanups.push(() => block.removeEventListener("focusin", onFocus));
          });
        return () => cleanups.forEach((cleanup) => cleanup());
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
