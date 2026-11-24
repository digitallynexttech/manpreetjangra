import Image from "next/image";
import type { CSSProperties } from "react";
import type { Portrait as PortraitData } from "@/content/types";

// The hero portrait (spec 4.1.1, design-decision 4.1 and 4.2). A 4:5 frame
// with, back to front: the marigold plate offset behind it (12 px, 8 px
// below lg), then a clip holding the vermilion field and the figure.
//
// kind "cutout": the keyed figure stands on the field, bottom-aligned at 96 %
// of the frame height (the 2019 cut-out is only ever shown on the field).
// kind "photo": a full-frame photograph fills the clip instead, cropped
// around `focal`; plate, caption, size, entrance and scroll depth stay the
// same, so a new portrait is one file and one object edit in images.ts.
//
// The entrance (field, plate, figure) and the scroll depth are CSS only
// (globals.css, "First appearance of the homepage hero").

// The frame is 460 px wide from xl, about 38 % of the window at lg, 360 px on
// tablets and the full content width (less the plate) on phones.
const SIZES = "(min-width: 1280px) 460px, (min-width: 1024px) 38vw, (min-width: 768px) 360px, calc(100vw - 52px)";

export function Portrait({ portrait }: { portrait: PortraitData }) {
  return (
    <figure className="site-hero-stage">
      <div className="site-hero-frame">
        <span className="site-hero-plate" aria-hidden="true" />
        <div className="site-hero-clip">
          {portrait.kind === "cutout" ? (
            <>
              <span className="site-hero-field" aria-hidden="true" />
              <Image
                className="site-hero-figure"
                src={portrait.src}
                alt={portrait.alt}
                sizes={SIZES}
                preload
              />
            </>
          ) : (
            <Image
              className="site-hero-photo"
              src={portrait.src}
              alt={portrait.alt}
              fill
              sizes={SIZES}
              preload
              style={portrait.focal ? ({ "--focal": portrait.focal } as CSSProperties) : undefined}
            />
          )}
        </div>
      </div>
      <figcaption className="site-hero-caption">{portrait.caption}</figcaption>
    </figure>
  );
}
