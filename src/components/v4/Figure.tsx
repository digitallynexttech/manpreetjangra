import Image from "next/image";
import { labels } from "@/content/v4";
import { SEQUENCES, posterSrc, type SequenceName } from "@/lib/sequences";
import { ScrubCanvas } from "./ScrubCanvas";

// A scroll-scrubbed figure (plan/versions-spec.md, V4: one per page): the
// frame sequence in a matted frame, uncovered like a turning page, with its
// figure number, a caption that describes the footage and its credit. The
// poster (the first frame, a next/image) is the picture before and without
// JavaScript; the canvas draws over it once the frames arrive.

export function ScrubFigure({
  name,
  n,
  caption,
  frameClass,
  sizes,
  load = false,
  focusX = 0.5,
  focusY = 0.5,
  className,
}: {
  name: SequenceName;
  /** The figure number on its page. */
  n: number;
  caption: string;
  /** Sets the frame's aspect ratio (v4.css, inner.css). */
  frameClass: string;
  sizes: string;
  /** True on a section front: uncovered once after load, not on scroll. */
  load?: boolean;
  focusX?: number;
  focusY?: number;
  className?: string;
}) {
  const sequence = SEQUENCES[name];
  return (
    <figure className={className ? `v4-figure ${className}` : "v4-figure"}>
      <div className="v4-matte">
        <div className={`v4-frame ${frameClass} ${load ? "v4-wipe--load" : "v4-wipe"}`}>
          <Image
            className="v4-frame-poster"
            src={posterSrc(sequence, "large")}
            alt=""
            fill
            sizes={sizes}
            priority={load}
            style={{ objectPosition: `${focusX * 100}% ${focusY * 100}%` }}
          />
          <ScrubCanvas name={name} focusX={focusX} focusY={focusY} />
        </div>
      </div>
      <figcaption className="v4-caption">
        <span className="v4-caption-n">
          {labels.figure} {n}
        </span>{" "}
        {caption}{" "}
        <span className="v4-caption-credit">
          {labels.footage}: {sequence.provider}
        </span>
      </figcaption>
    </figure>
  );
}
