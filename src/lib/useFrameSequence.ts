"use client";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { SMALL_SET_BELOW, frameSrc, type FrameSequence } from "./sequences";

// A frame sequence drawn on a <canvas> (plan/versions-spec.md 1 and 2.7): the
// Apple product-page technique, where scroll picks the frame. This hook only
// loads and draws; each edition drives `draw(progress)` with its own scroll
// technique (GSAP ScrollTrigger, a scroll handler, motion's useScroll).
//
// - Progressive loading: frame 1 first (drawn as soon as it arrives), then
//   the last frame, then the rest in passes of halving stride (every 16th,
//   every 8th, ... every frame), so a fast scrub early on still finds a frame
//   near the one it wants. A few requests run at a time.
// - The 800 px set (the sequence's `small` width) below 1024 px viewport
//   width, the large set from 1024 px; chosen once, when loading starts.
// - The canvas backing store follows the canvas box (ResizeObserver) at
//   devicePixelRatio capped at 2; frames are drawn cover-fit, like
//   `object-fit: cover`, around a focus point.
// - Until a wanted frame has loaded, the nearest loaded frame is drawn; when
//   a closer one arrives the canvas is redrawn.
// - Loading starts when the canvas comes within `rootMargin` of the viewport
//   (lazy, the default) or at once; `preload: "first"` loads frame 1 only
//   (for reduced motion: one still frame); `enabled: false` loads nothing.
// - Cleanup on unmount or when the sequence changes: observers disconnected,
//   requests still waiting cancelled, frames released.
//
// The canvas is decoration: give it aria-hidden="true", and size it with CSS
// (it fills its box). For no JavaScript, put a poster <img> (posterSrc) or a
// background behind it; never hide content until a frame has drawn.

export type FrameSequenceOptions = {
  /** false loads nothing (default true). */
  enabled?: boolean;
  /** "all" (default) loads every frame; "first" only frame 1. */
  preload?: "all" | "first";
  /** Start loading when the canvas nears the viewport (default true). */
  lazy?: boolean;
  /** How near, as an IntersectionObserver root margin (default one viewport). */
  rootMargin?: string;
  /** Cover-fit focus point, 0 (left, top) to 1 (right, bottom); default 0.5. */
  focusX?: number;
  focusY?: number;
  /** Requests in flight at once (default 6). */
  concurrency?: number;
};

export type FrameSequenceControls = {
  /** Draws the frame at `progress` (0 = first frame, 1 = last), clamped. */
  draw: (progress: number) => void;
  /** Frame 1 has loaded and been drawn. */
  ready: boolean;
  /** Every frame asked for has loaded (or failed). */
  complete: boolean;
};

const MAX_DPR = 2;

/** Frame 0, the last frame, then strides 16, 8, 4, 2, 1 (zero-based). */
function loadOrder(count: number): number[] {
  const order: number[] = [];
  const seen = new Set<number>();
  const add = (i: number) => {
    if (i >= 0 && i < count && !seen.has(i)) {
      seen.add(i);
      order.push(i);
    }
  };
  add(0);
  add(count - 1);
  for (const step of [16, 8, 4, 2, 1]) for (let i = 0; i < count; i += step) add(i);
  return order;
}

export function useFrameSequence(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  sequence: FrameSequence,
  {
    enabled = true,
    preload = "all",
    lazy = true,
    rootMargin = "100% 0px",
    focusX = 0.5,
    focusY = 0.5,
    concurrency = 6,
  }: FrameSequenceOptions = {},
): FrameSequenceControls {
  // Loaded frames (zero-based; undefined until loaded), the progress last
  // asked for, the frame now on the canvas, and the draw scheduled for the
  // next animation frame. All refs: drawing never re-renders the component.
  const frames = useRef<(HTMLImageElement | undefined)[]>([]);
  const wanted = useRef(0);
  const drawn = useRef(-1);
  const pending = useRef(0);
  const focus = useRef({ x: focusX, y: focusY });
  const key = `${sequence.name}|${enabled}|${preload}`;
  const [status, setStatus] = useState({ key: "", ready: false, complete: false });

  useEffect(() => {
    focus.current = { x: focusX, y: focusY };
  }, [focusX, focusY]);

  /** Draws the loaded frame nearest to `wanted`; `force` redraws the same frame. */
  const paint = useCallback(
    (force = false) => {
      const canvas = canvasRef.current;
      const list = frames.current;
      const count = list.length;
      if (!canvas || count === 0) return;
      const target = Math.round(wanted.current * (count - 1));
      let index = -1;
      for (let d = 0; d < count && index < 0; d++) {
        if (list[target - d]) index = target - d;
        else if (list[target + d]) index = target + d;
      }
      if (index < 0 || (index === drawn.current && !force)) return;
      const image = list[index]!;
      const context = canvas.getContext("2d");
      if (!context || canvas.width === 0 || canvas.height === 0) return;
      const iw = image.naturalWidth;
      const ih = image.naturalHeight;
      const scale = Math.max(canvas.width / iw, canvas.height / ih);
      const w = iw * scale;
      const h = ih * scale;
      context.imageSmoothingQuality = "high";
      context.drawImage(
        image,
        (canvas.width - w) * focus.current.x,
        (canvas.height - h) * focus.current.y,
        w,
        h,
      );
      drawn.current = index;
    },
    [canvasRef],
  );

  const draw = useCallback(
    (progress: number) => {
      wanted.current = Math.min(1, Math.max(0, Number.isFinite(progress) ? progress : 0));
      paint();
    },
    [paint],
  );

  // Keep the backing store at the box size times the (capped) pixel ratio.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fit = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = Math.round(canvas.clientWidth * ratio);
      const height = Math.round(canvas.clientHeight * ratio);
      if (width === canvas.width && height === canvas.height) return;
      // Setting the size clears the canvas, so the frame is drawn again.
      canvas.width = width;
      canvas.height = height;
      paint(true);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(canvas);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [canvasRef, paint]);

  // Load the frames.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;
    let cancelled = false;
    let observer: IntersectionObserver | undefined;
    const inFlight = new Set<HTMLImageElement>();
    const count = preload === "first" ? 1 : sequence.frames;
    frames.current = new Array(sequence.frames);
    drawn.current = -1;

    const schedule = () => {
      if (!pending.current)
        pending.current = requestAnimationFrame(() => {
          pending.current = 0;
          paint();
        });
    };

    const start = () => {
      const width = window.innerWidth < SMALL_SET_BELOW ? sequence.small : sequence.large;
      const queue = loadOrder(count);
      let settled = 0;
      const next = () => {
        if (cancelled) return;
        const index = queue.shift();
        if (index === undefined) return;
        const image = new Image();
        image.decoding = "async";
        image.src = frameSrc(sequence, width, index + 1);
        inFlight.add(image);
        // decode() resolves once the frame is loaded and decoded, so drawing
        // it later never stalls the main thread.
        image
          .decode()
          .then(
            () => {
              if (cancelled) return;
              frames.current[index] = image;
              if (index === 0) {
                paint(true);
                setStatus((s) => ({ key, ready: true, complete: s.key === key && s.complete }));
              } else schedule();
            },
            () => undefined,
          )
          .finally(() => {
            inFlight.delete(image);
            if (cancelled) return;
            settled += 1;
            if (settled === count) setStatus({ key, ready: Boolean(frames.current[0]), complete: true });
            // Frame 1 alone first; the rest run `concurrency` at a time.
            if (index === 0) for (let i = 0; i < concurrency; i++) next();
            else next();
          });
      };
      next();
    };

    if (lazy && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            start();
          }
        },
        { rootMargin },
      );
      observer.observe(canvas);
    } else start();

    return () => {
      cancelled = true;
      observer?.disconnect();
      cancelAnimationFrame(pending.current);
      pending.current = 0;
      // Requests still waiting are dropped; the frames are released.
      inFlight.forEach((image) => image.removeAttribute("src"));
      inFlight.clear();
      frames.current = [];
      drawn.current = -1;
    };
  }, [canvasRef, sequence, enabled, preload, lazy, rootMargin, concurrency, key, paint]);

  const current = status.key === key;
  return { draw, ready: current && status.ready, complete: current && status.complete };
}
