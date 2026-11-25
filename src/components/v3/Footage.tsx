"use client";
import { useEffect, useRef, type RefObject } from "react";
import { SEQUENCES, posterSrc, type SequenceName } from "@/lib/sequences";
import { useFrameSequence } from "@/lib/useFrameSequence";
import { useReducedMotion } from "./gsap";

// The moving footage behind a /v3 scene (plan/versions-spec.md 3, V3): a
// frame sequence drawn on a canvas, scrubbed by the scene's ScrollTrigger
// through `drawRef`. Under it, the first frame as a plain picture (the large
// set from 1024 px), which is what a visitor without JavaScript sees and what
// shows until the canvas has drawn. With reduced motion only that still is
// shown and no frames are fetched. Decoration only: hidden from assistive
// technology.

export type DrawRef = RefObject<((progress: number) => void) | null>;

export function Footage({
  name,
  drawRef,
  priority = false,
  focusX = 0.5,
  focusY = 0.5,
  className,
}: {
  name: SequenceName;
  drawRef: DrawRef;
  /** The first scene: fetch at once, and the poster with high priority. */
  priority?: boolean;
  focusX?: number;
  focusY?: number;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const sequence = SEQUENCES[name];
  const { draw } = useFrameSequence(canvas, sequence, {
    enabled: !reduce,
    lazy: !priority,
    focusX,
    focusY,
  });

  useEffect(() => {
    drawRef.current = draw;
    return () => {
      drawRef.current = null;
    };
  }, [draw, drawRef]);

  const position = `${focusX * 100}% ${focusY * 100}%`;
  return (
    <div className={className ? `v3-footage ${className}` : "v3-footage"} aria-hidden="true">
      <picture className="v3-poster">
        <source media="(min-width: 1024px)" srcSet={posterSrc(sequence, "large")} />
        <img
          src={posterSrc(sequence, "small")}
          alt=""
          style={{ objectPosition: position }}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </picture>
      <canvas ref={canvas} className="v3-canvas" />
    </div>
  );
}
