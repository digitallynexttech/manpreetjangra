import type { CSSProperties, ReactNode } from "react";
import { MarqueeShell } from "./MarqueeShell";

// A strip that runs sideways for ever (spec 3.4): CSS keyframes, two copies
// of the items with the second hidden from screen readers, paused while the
// pointer is over it, focus is inside it or it is off screen, and still (one
// wrapped copy) for reduced motion. The strip clips itself, so it never
// widens the page.
export function Marquee({
  items,
  duration = 40,
  reverse = false,
  dots = true,
  label,
  className,
  itemClassName,
}: {
  items: readonly ReactNode[];
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  /** A small stroke-coloured dot between items. */
  dots?: boolean;
  /** Names the strip for screen readers (a list of names, a set of lines). */
  label?: string;
  className?: string;
  itemClassName?: string;
}) {
  const group = (hidden: boolean) => (
    <ul className="v2-marquee-group" aria-hidden={hidden ? "true" : undefined}>
      {items.flatMap((item, index) => {
        const entry = (
          <li key={`item-${index}`} className={["v2-marquee-item", itemClassName].filter(Boolean).join(" ")}>
            {item}
          </li>
        );
        return dots ? [entry, <li key={`dot-${index}`} className="v2-marquee-dot" aria-hidden="true" />] : [entry];
      })}
    </ul>
  );
  return (
    <MarqueeShell
      className={["v2-marquee", reverse && "v2-marquee--reverse", className].filter(Boolean).join(" ")}
      style={{ "--v2-marquee-duration": `${duration}s` } as CSSProperties}
      label={label}
    >
      <div className="v2-marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </MarqueeShell>
  );
}
