import Image from "next/image";
import type { Portrait } from "@/content/types";

// Her 2019 cut-out on its vermilion field, as on the classic home hero (the
// cut-out is only ever shown on the field; images.ts). Used by the v2 hero,
// the menu, the journey track and the footer. The box size comes from the
// parent; the frame keeps 4:5 unless CSS gives it another shape. `plate`
// adds the marigold plate offset behind it (the classic hero's).
export function FieldPortrait({
  portrait,
  sizes,
  preload = false,
  plate = false,
  decorative = false,
  className,
}: {
  portrait: Portrait;
  /** next/image sizes for the box this frame sits in. */
  sizes: string;
  preload?: boolean;
  plate?: boolean;
  /** Decorative copies (the menu tile, the footer) get an empty alt. */
  decorative?: boolean;
  className?: string;
}) {
  return (
    <div className={["v2-field-box", className].filter(Boolean).join(" ")}>
      {plate ? <span className="v2-field-plate" aria-hidden="true" /> : null}
      <div className="v2-field">
        {portrait.kind === "cutout" ? (
          <>
            <span className="v2-field-ground" aria-hidden="true" />
            <Image
              className="v2-field-figure"
              src={portrait.src}
              alt={decorative ? "" : portrait.alt}
              sizes={sizes}
              preload={preload}
            />
          </>
        ) : (
          <Image
            className="v2-field-photo"
            src={portrait.src}
            alt={decorative ? "" : portrait.alt}
            fill
            sizes={sizes}
            preload={preload}
            style={portrait.focal ? { objectPosition: portrait.focal } : undefined}
          />
        )}
      </div>
    </div>
  );
}
