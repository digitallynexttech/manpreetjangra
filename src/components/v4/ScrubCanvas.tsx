"use client";
import { useEffect, useRef } from "react";
import { SEQUENCES, type SequenceName } from "@/lib/sequences";
import { useFrameSequence } from "@/lib/useFrameSequence";
import { useReducedMotion } from "./useReducedMotion";

// A scroll-scrubbed figure (plan/versions-spec.md, V4 motion): the frame
// sequence drawn on a canvas, its frame chosen by how far the figure has
// travelled through the viewport. A tiny scroll handler, no library:
//
//   progress 0 = where the figure first sits (its place at load when it
//   starts on the first screen, or the moment its top enters the viewport),
//   progress 1 = its bottom edge leaving the top of the viewport.
//
// The drawn position eases towards the scroll position (a short glide), so
// a wheel step turns the frames smoothly instead of jumping. With reduced
// motion only the first frame is loaded and drawn. The poster image behind
// the canvas (server markup) is the picture without JavaScript.

export function ScrubCanvas({
  name,
  focusX = 0.5,
  focusY = 0.5,
}: {
  name: SequenceName;
  focusX?: number;
  focusY?: number;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const { draw, ready } = useFrameSequence(canvas, SEQUENCES[name], {
    preload: reduce ? "first" : "all",
    focusX,
    focusY,
  });

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    if (reduce) {
      draw(0);
      return;
    }
    let frame = 0;
    let target = 0;
    let shown = -1;
    const measure = () => {
      const rect = element.getBoundingClientRect();
      const start = Math.min(rect.top + window.scrollY, window.innerHeight);
      const span = start + rect.height;
      target = span > 0 ? Math.min(1, Math.max(0, (start - rect.top) / span)) : 0;
    };
    const step = () => {
      frame = 0;
      measure();
      shown = shown < 0 ? target : shown + (target - shown) * 0.22;
      if (Math.abs(target - shown) < 0.0015) shown = target;
      draw(shown);
      if (shown !== target) frame = requestAnimationFrame(step);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };
    step();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [draw, reduce]);

  return <canvas ref={canvas} className="v4-scrub-canvas" aria-hidden="true" data-ready={ready ? "" : undefined} />;
}
