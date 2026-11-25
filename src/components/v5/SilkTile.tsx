"use client";
import { useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { SEQUENCES, posterSrc } from "@/lib/sequences";
import { useFrameSequence } from "@/lib/useFrameSequence";
import { useReducedMotionPref } from "./media";
import { Tile } from "./Tile";
import { MonogramMark } from "./Chip";

// The tall bronze-silk tile (plan/versions-spec.md, V5: "a tall tile holding
// the bronze-silk portrait sequence scrubbed by the page scroll", with
// useScroll and useFrameSequence). The portrait-format clip (9:16) fills the
// tile on a canvas; scrolling the tile through the viewport plays it from
// the first frame to the last. The first frame is also an <img> behind the
// canvas, so the tile is never empty before the frames load or without
// JavaScript; with reduced motion only that one frame is loaded. Decorative:
// hidden from assistive technology.

const SILK = SEQUENCES["bronze-silk"];

export function SilkTile({
  w = 1,
  h = 2,
  mdW,
  mdH,
  className,
}: {
  w?: 1 | 2;
  h?: 1 | 2;
  mdW?: 1 | 2;
  mdH?: 1 | 2;
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const still = useReducedMotionPref();
  const { draw, ready } = useFrameSequence(canvas, SILK, { preload: still ? "first" : "all" });
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!still) draw(progress);
  });
  // Once frame 1 is in, jump to the frame for the current scroll position.
  useEffect(() => {
    if (ready && !still) draw(scrollYProgress.get());
  }, [ready, still, draw, scrollYProgress]);

  return (
    <Tile w={w} h={h} mdW={mdW} mdH={mdH} tone="silk" hidden className={["v5-silk-cell", className].filter(Boolean).join(" ")}>
      <div ref={frame} className="v5-silk">
        {/* eslint-disable-next-line @next/next/no-img-element -- a fixed frame of a sequence, already sized and compressed */}
        <img className="v5-silk-poster" src={posterSrc(SILK, "small")} alt="" loading="lazy" decoding="async" />
        <canvas ref={canvas} className="v5-silk-canvas" aria-hidden="true" />
        <span className="v5-silk-sheen" />
        <span className="v5-silk-mark v5-depth">
          <MonogramMark size={26} />
        </span>
      </div>
    </Tile>
  );
}
