"use client";
import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { EASE_IN, MEDIA, ScrollTrigger, gsap, onNextFrame, useGSAP } from "./gsap";

// Lifts content into place as it scrolls into view (the inner pages' rows,
// paragraphs and cards, the way landonorris.com eases its blocks in): each
// element matching `items` (or the wrapper itself) rises 40 px and fades in
// once, the ones entering together a little apart. Nothing is hidden before
// the script runs, the starting state is set by GSAP, and reduced motion
// leaves everything where it is.
export function Reveal({
  as: Tag = "div",
  items,
  y = 40,
  className,
  style,
  id,
  children,
}: {
  as?: ElementType;
  /** A selector for the elements to lift, inside the wrapper (default: the wrapper). */
  items?: string;
  /** Distance in pixels. */
  y?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const node = root.current;
      if (!node) return;
      const all = items ? Array.from(node.querySelectorAll<HTMLElement>(items)) : [node];
      if (all.length === 0) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, (context) =>
        onNextFrame(context, () => {
          // Only what is still below the fold waits for its entrance: content
          // already in view or above it (a page opened at an anchor, Back to a
          // scrolled page) stays as rendered instead of blanking and rising
          // again.
          const fold = window.innerHeight * 0.92;
          const targets = all.filter((target) => target.getBoundingClientRect().top > fold);
          if (targets.length === 0) return;
          gsap.set(targets, { y, opacity: 0 });
          // No `once`: a batch trigger that kills itself while its siblings
          // are still being created (a page opened mid-scroll, where the
          // triggers above the scroll position fire at once) breaks
          // ScrollTrigger's refresh loop. Entering again only re-runs a tween
          // to the place the element already holds.
          ScrollTrigger.batch(targets, {
            start: "top 92%",
            onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.9, ease: EASE_IN, stagger: 0.08, overwrite: true }),
          });
          // Keyboard focus can reach a row that is still waiting below the
          // batch start (focusing it does not scroll the page): show it at
          // once so the focus ring is never drawn around an invisible row.
          const onFocus = (event: FocusEvent) => {
            const hit = targets.find((target) => target.contains(event.target as Node));
            if (hit && Number(gsap.getProperty(hit, "opacity")) < 1) {
              gsap.to(hit, { y: 0, opacity: 1, duration: 0.3, ease: EASE_IN, overwrite: true });
            }
          };
          node.addEventListener("focusin", onFocus);
          return () => node.removeEventListener("focusin", onFocus);
        }),
      );
      return () => mm.revert();
    },
    { scope: root, dependencies: [items, y] },
  );
  return (
    <Tag ref={root} id={id} className={className} style={style}>
      {children}
    </Tag>
  );
}
