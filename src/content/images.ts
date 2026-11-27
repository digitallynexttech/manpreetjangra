import type { Portrait, SizedImage, Sourced } from "./types";

// Every picture on the site. Files live in public/images/ (provenance in
// sources.json); sizes are intrinsic, so nothing shifts while they load.

/** The home hero portrait (spec 4.1.1). The 2019 cut-out is only ever shown
 *  on the vermilion field. A future colour portrait is one file in
 *  public/images/portrait/ plus an edit here: src, width, height,
 *  kind "photo", alt, caption and focal (CONTENT-REVIEW E). */
export const portrait: Portrait = {
  // A hand-built StaticImageData, so the file stays in public/.
  src: { src: "/images/portrait/manpreet-2019-cutout.png", width: 708, height: 848 },
  kind: "cutout",
  alt: "Manpreet Jangra, black-and-white portrait on a vermilion background",
  caption: "Portrait, 2019",
  facts: ["F214"],
};

/** Writing, On stage: her LinkedIn podium photo, shown at 200 x 200. The
 *  event is not identified, so there is no caption until `stage.photoEvent`
 *  in writing.ts is confirmed. */
export const podium: SizedImage & Sourced & { alt: string } = {
  src: "/images/stage/manpreet-podium.jpg",
  width: 400,
  height: 400,
  alt: "Manpreet Jangra speaking at a wooden podium with two microphones.",
  facts: ["F082", "F210"],
};

/** Gold zari on vermilion silk: a generated image (behind the home feature
 *  and the open menu's third tile). */
export const zari: SizedImage = { src: "/images/textures/zari.webp", width: 1600, height: 900 };
