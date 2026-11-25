"use client";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight, MoveHorizontal, Quote } from "lucide-react";
import { prefersReducedMotion, useHydrated } from "./media";
import type { Tone } from "./Tile";

// A horizontal drag carousel of quote tiles (plan/versions-spec.md, V5: "drag
// with momentum, plus buttons for keyboard users"). The track is a motion
// drag on the x axis: a flick carries on with momentum and settles on the
// nearest tile edge, the ends give a little and spring back. The previous
// and next buttons move one tile on a spring (instantly with reduced
// motion); a thin bar shows how far along the track is.
//
// Without JavaScript the same list is a native horizontal scroller with
// scroll snapping (v5.css), so every quote stays reachable. The quotes carry
// no links, so a drag never ends in an accidental click.

export type CarouselQuote = { id: string; text: string; attribution: string; tone: Tone; large?: boolean };

const SNAP = { type: "spring", stiffness: 260, damping: 34 } as const;

export function QuoteCarousel({
  quotes,
  labels,
  id,
}: {
  quotes: readonly CarouselQuote[];
  labels: { list: string; previous: string; next: string; drag: string };
  id: string;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const enabled = useHydrated();
  const [bounds, setBounds] = useState({ max: 0, step: 0 });
  const [at, setAt] = useState({ start: true, end: false });

  // Measure the track (the ResizeObserver also reports once at the start).
  useEffect(() => {
    const view = viewport.current;
    const list = track.current;
    if (!enabled || !view || !list) return;
    const observer = new ResizeObserver(() => {
      const items = list.children;
      const first = items[0] as HTMLElement | undefined;
      const second = items[1] as HTMLElement | undefined;
      const max = Math.max(0, Math.round(list.scrollWidth - view.clientWidth));
      const step = first && second ? second.offsetLeft - first.offsetLeft : (first?.offsetWidth ?? 0);
      setBounds({ max, step });
      if (x.get() < -max) x.set(-max);
      setAt({ start: x.get() > -2, end: x.get() < -max + 2 });
    });
    observer.observe(view);
    observer.observe(list);
    return () => observer.disconnect();
  }, [enabled, x]);

  useMotionValueEvent(x, "change", (latest) => {
    const start = latest > -2;
    const end = latest < -bounds.max + 2;
    if (start !== at.start || end !== at.end) setAt({ start, end });
  });

  const progress = useTransform(x, (latest) => (bounds.max > 0 ? Math.min(1, Math.max(0, -latest / bounds.max)) : 0));
  const fill = useTransform(progress, [0, 1], [0.12, 1]);

  const clamp = (value: number) => Math.min(0, Math.max(-bounds.max, value));
  const snap = (target: number) => (bounds.step > 0 ? clamp(Math.round(target / bounds.step) * bounds.step) : clamp(target));

  const go = (direction: 1 | -1) => {
    const target = clamp(snap(x.get()) - direction * bounds.step);
    if (prefersReducedMotion()) x.set(target);
    else animate(x, target, SNAP);
  };

  return (
    <div className="v5-carousel" data-drag={enabled ? "on" : undefined}>
      <div ref={viewport} className="v5-carousel-viewport">
        <motion.ul
          ref={track}
          id={id}
          className="v5-carousel-track"
          aria-label={labels.list}
          style={{ x }}
          drag={enabled && bounds.max > 0 ? "x" : false}
          dragConstraints={{ left: -bounds.max, right: 0 }}
          dragElastic={0.12}
          dragTransition={{ power: 0.28, timeConstant: 260, modifyTarget: snap, bounceStiffness: 320, bounceDamping: 34 }}
        >
          {quotes.map((quote, index) => (
            <li key={quote.id} className="v5-quote" data-tone={quote.tone} data-large={quote.large ? "" : undefined}>
              <figure className="v5-quote-figure">
                <span className="v5-quote-top" aria-hidden="true">
                  <Quote size={20} strokeWidth={2} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </span>
                <blockquote className="v5-quote-text">
                  <p>{quote.text}</p>
                </blockquote>
                <figcaption className="v5-quote-by">{quote.attribution}</figcaption>
              </figure>
            </li>
          ))}
        </motion.ul>
      </div>
      <div className="v5-carousel-bar v5-wrap">
        <span className="v5-carousel-hint" aria-hidden="true">
          <MoveHorizontal size={16} strokeWidth={2} />
          {labels.drag}
        </span>
        <span className="v5-carousel-progress" aria-hidden="true">
          <motion.span className="v5-carousel-progress-fill" style={{ scaleX: fill }} />
        </span>
        <span className="v5-carousel-buttons">
          <button
            type="button"
            className="v5-round"
            aria-controls={id}
            aria-label={labels.previous}
            disabled={!enabled || at.start}
            onClick={() => go(-1)}
          >
            <ChevronLeft size={22} strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="v5-round"
            aria-controls={id}
            aria-label={labels.next}
            disabled={!enabled || at.end}
            onClick={() => go(1)}
          >
            <ChevronRight size={22} strokeWidth={2} aria-hidden="true" />
          </button>
        </span>
      </div>
    </div>
  );
}
