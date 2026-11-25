"use client";
import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { MEDIA, SCRUB_FREE, gsap, useGSAP } from "./gsap";

// Moves the elements inside it that carry `data-v2-speed` at their own pace
// while the group crosses the viewport (spec 4.1: the In numbers columns,
// the Feature collage). A speed of 1 travels about 20 % of the viewport
// height from below its place to above it; negative speeds run the other
// way. Desktop always; below 1024 px only when `small` gives a factor.
// Reduced motion: no movement. Transforms only, so nothing reflows.
export function ParallaxGroup({
  as: Tag = "div",
  small = 0,
  className,
  style,
  children,
}: {
  as?: ElementType;
  /** Factor of the movement below 1024 px (0 = none). */
  small?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const node = root.current;
      if (!node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>("[data-v2-speed]"));
      const mm = gsap.matchMedia();
      mm.add({ desktop: MEDIA.desktop, small: MEDIA.small }, (context) => {
        const { desktop } = context.conditions as { desktop?: boolean };
        const factor = desktop ? 1 : small;
        if (!factor) return;
        items.forEach((item) => {
          const travel = () => (Number(item.dataset.v2Speed) || 0) * factor * window.innerHeight * 0.2;
          gsap.fromTo(
            item,
            { y: () => travel() },
            {
              y: () => -travel(),
              ease: "none",
              scrollTrigger: { trigger: node, start: "top bottom", end: "bottom top", scrub: SCRUB_FREE, invalidateOnRefresh: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [small] },
  );
  return (
    <Tag ref={root} className={className} style={style}>
      {children}
    </Tag>
  );
}
