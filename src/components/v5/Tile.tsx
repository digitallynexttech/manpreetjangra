"use client";
import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { animate, inView, motion, useIsomorphicLayoutEffect, useMotionValue, useSpring } from "motion/react";
import { FINE_MOTION, prefersReducedMotion, useMedia } from "./media";

// One bento tile (plan/versions-spec.md, V5 "Studio"): a grid cell that
// assembles on enter, holding a rounded surface that tilts toward the
// pointer.
//
// - The cell (outer element) takes the grid span (`w` x `h` columns and rows
//   from 768 px; `mdW`, `mdH` override them between 768 and 1279 px; phones
//   stack every tile in one column) and the assemble animation: opacity,
//   rise and scale on motion springs, once, when it first scrolls into view.
//   The server HTML is always the visible end state. Only a cell that is
//   still below the viewport once the page runs is set back to its start
//   state (before the browser paints) and then springs in; one that is
//   already on screen stays as it is, so nothing flashes, and without
//   JavaScript or with reduced motion every tile simply shows. Tiles of the
//   first screen pass `intro` instead: a CSS entrance (v5.css) that plays on
//   load, staggered by that index.
// - The surface (inner element) tilts in 3D toward a mouse pointer (springs
//   on rotateX and rotateY, a few degrees, fewer for big tiles), with a soft
//   light that follows the pointer and children marked `v5-depth` drifting
//   on their own layer. Off for touch and pen, and with reduced motion.

export type Tone = "paper" | "blush" | "marigold" | "night" | "field" | "silk";

type Span = 1 | 2;

const TILT_SPRING = { stiffness: 260, damping: 24, mass: 0.6 };

/** Delay for a cell by its place in its row, so a row assembles left to right. */
function staggerOf(cell: HTMLElement): number {
  const grid = cell.parentElement;
  if (!grid) return 0;
  const box = grid.getBoundingClientRect();
  const left = cell.getBoundingClientRect().left - box.left;
  return box.width > 0 ? Math.min(0.32, Math.max(0, (left / box.width) * 0.32)) : 0;
}

export function Tile({
  as = "div",
  w = 1,
  h = 1,
  mdW,
  mdH,
  tone = "paper",
  tilt = true,
  intro,
  id,
  className,
  tileClassName,
  labelledBy,
  hidden,
  style,
  children,
}: {
  /** "li" when the tile is an item of a list grid. */
  as?: "div" | "li";
  w?: Span;
  h?: Span;
  mdW?: Span;
  mdH?: Span;
  tone?: Tone;
  tilt?: boolean;
  /** Index in the first screen's CSS entrance; tiles without it assemble on scroll. */
  intro?: number;
  id?: string;
  /** Classes of the cell (grid placement, per-tile layout). */
  className?: string;
  /** Classes of the surface. */
  tileClassName?: string;
  /** Labels the cell as a region (`aria-labelledby`). */
  labelledBy?: string;
  /** Decorative tiles (footage) are hidden from assistive technology. */
  hidden?: boolean;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const cell = useRef<HTMLDivElement>(null);
  const opacity = useMotionValue(1);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotateX = useSpring(0, TILT_SPRING);
  const rotateY = useSpring(0, TILT_SPRING);
  const canTilt = useMedia(FINE_MOTION) && tilt;
  // Big tiles tilt less: the same angle moves their far edge further.
  const max = w === 2 && h === 2 ? 2.2 : w === 2 || h === 2 ? 3.2 : 5.5;

  // Assemble on enter (see the note at the top).
  useIsomorphicLayoutEffect(() => {
    const element = cell.current;
    if (!element || intro !== undefined || prefersReducedMotion()) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    opacity.set(0);
    y.set(48);
    scale.set(0.92);
    let started = false;
    const stop = inView(
      element,
      () => {
        if (started) return;
        started = true;
        const delay = staggerOf(element);
        animate(opacity, 1, { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] });
        animate(y, 0, { type: "spring", stiffness: 150, damping: 19, mass: 0.9, delay });
        animate(scale, 1, { type: "spring", stiffness: 190, damping: 17, delay });
      },
      { amount: 0.12 },
    );
    return () => {
      stop();
      opacity.set(1);
      y.set(0);
      scale.set(1);
    };
  }, [intro, opacity, y, scale]);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!canTilt || event.pointerType !== "mouse") return;
    const surface = event.currentTarget;
    const box = surface.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width - 0.5;
    const py = (event.clientY - box.top) / box.height - 0.5;
    rotateY.set(px * max * 2);
    rotateX.set(-py * max * 2);
    surface.style.setProperty("--px", px.toFixed(3));
    surface.style.setProperty("--py", py.toFixed(3));
    surface.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
    surface.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
  };
  const onPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    rotateX.set(0);
    rotateY.set(0);
    event.currentTarget.style.setProperty("--px", "0");
    event.currentTarget.style.setProperty("--py", "0");
  };

  const Cell = (as === "li" ? motion.li : motion.div) as typeof motion.div;
  const classes = [
    "v5-cell",
    w === 2 && "v5-w2",
    h === 2 && "v5-h2",
    mdW && `v5-md-w${mdW}`,
    mdH && `v5-md-h${mdH}`,
    intro !== undefined && "v5-intro",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Cell
      ref={cell}
      id={id}
      className={classes}
      role={labelledBy && as === "div" ? "region" : undefined}
      aria-labelledby={labelledBy}
      aria-hidden={hidden || undefined}
      style={{ ...style, ...(intro !== undefined ? ({ "--i": intro } as CSSProperties) : {}), opacity, y, scale }}
    >
      <motion.div
        className={["v5-tile", tileClassName].filter(Boolean).join(" ")}
        data-tone={tone}
        data-tilt={canTilt ? "" : undefined}
        style={{ rotateX, rotateY, transformPerspective: 1100 }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {children}
      </motion.div>
    </Cell>
  );
}
