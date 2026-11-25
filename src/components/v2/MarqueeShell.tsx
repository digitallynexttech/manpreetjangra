"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// The marquee's outer strip (Marquee.tsx): it pauses its CSS loop while it is
// off screen (`data-paused`), so a strip nobody can see never keeps the page
// busy. Without script it simply runs.
export function MarqueeShell({
  className,
  style,
  label,
  children,
}: {
  className: string;
  style: CSSProperties;
  label?: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = root.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) delete node.dataset.paused;
        else node.dataset.paused = "";
      },
      { rootMargin: "120px 0px" },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      delete node.dataset.paused;
    };
  }, []);
  return (
    <div ref={root} className={className} style={style} role={label ? "region" : undefined} aria-label={label}>
      {children}
    </div>
  );
}
