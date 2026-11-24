"use client";

import { useEffect, useRef } from "react";
import { TextLink } from "./TextLink";

// Animated proof numbers. Ported from the sibling site's StatisticsCounters
// (E:\deepkgoel\app\components\StatisticsCounters.tsx): when the list is 30 %
// in view, every number counts up from zero over 1.8 s (ease-out cubic), each
// one 60 ms after the one before. The numbers come in as props instead of an
// import (spec 7.2), each value is read back from its own `data-count-value`
// attribute, and rows are keyed by label (two equal values would collide).
//
// The server HTML holds the final values, for visitors without JavaScript;
// screen readers read the final value from a visually hidden copy and never
// hear the animation. With reduced motion the numbers never move.

const DURATION = 1800;
const STAGGER = 60;

export type CounterItem = { value: string; label: string; href?: string; linkLabel?: string };

// Columns from md: one per number, four at most (spec 4.1.2: three numbers on
// Home, two when there are no open roles; 4.3.6: four on Work). Phones get
// one column, or two with `phoneColumns={2}` (the Work client story).
const COLUMNS = ["", "md:grid-cols-1", "md:grid-cols-2", "md:grid-cols-3", "md:grid-cols-4"] as const;

export function Counter({
  items,
  caption,
  phoneColumns = 1,
}: {
  items: readonly CounterItem[];
  caption?: string;
  phoneColumns?: 1 | 2;
}) {
  const list = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const element = list.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || reducedMotion.matches || !("IntersectionObserver" in window)) {
      return;
    }

    const counters = Array.from(element.querySelectorAll<HTMLElement>("[data-count-value]")).map((node) => {
      const final = node.dataset.countValue ?? node.textContent ?? "";
      // "29K+" counts 0 to 29 and keeps "K+"; "699" counts to 699.
      return { node, final, target: Number.parseInt(final, 10), suffix: final.replace(/^\d+/, "") };
    }).filter(({ target }) => Number.isFinite(target));
    let frame = 0;
    let started = false;
    let startTime: number | undefined;

    const finish = () => {
      started = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      counters.forEach(({ node, final }) => {
        node.textContent = final;
      });
    };

    const tick = (now: number) => {
      startTime ??= now;
      const elapsed = now - startTime;
      counters.forEach(({ node, target, suffix }, index) => {
        const progress = Math.min(1, Math.max(0, (elapsed - index * STAGGER) / DURATION));
        const eased = 1 - (1 - progress) ** 3;
        const value = `${Math.floor(target * eased)}${suffix}`;
        if (node.textContent !== value) node.textContent = value;
      });
      if (elapsed < DURATION + (counters.length - 1) * STAGGER) {
        frame = window.requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (started || !entry.isIntersecting || entry.intersectionRatio < 0.3) {
          return;
        }
        started = true;
        observer.disconnect();
        frame = window.requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );

    // Keep the server-rendered totals for no-JS visitors and assistive technology.
    counters.forEach(({ node, suffix }) => {
      node.textContent = `0${suffix}`;
    });
    observer.observe(element);

    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) finish();
    };
    reducedMotion.addEventListener("change", onMotionPreferenceChange);

    return () => {
      finish();
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return (
    <>
      <dl ref={list} className={["site-counter grid", phoneColumns === 2 && "grid-cols-2", COLUMNS[Math.min(items.length, 4)]].filter(Boolean).join(" ")} data-reveal="group">
        {items.map(({ value, label, href, linkLabel }) => (
          <div key={label} data-reveal>
            <dt className="site-stat-value">
              <span className="site-sr-only">{value}</span>
              <span data-count-value={value} aria-hidden="true">
                {value}
              </span>
            </dt>
            <dd className="site-stat-label">{label}</dd>
            {href && linkLabel ? (
              <dd className="site-counter-link">
                <TextLink href={href}>{linkLabel}</TextLink>
              </dd>
            ) : null}
          </div>
        ))}
      </dl>
      {caption ? <p className="site-caption site-counter-caption">{caption}</p> : null}
    </>
  );
}
