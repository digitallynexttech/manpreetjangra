import type { IntroImage, Portrait, SizedImage, Sourced } from "./types";

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

/** Faint pictures behind the heading of each inner page (spec 8.3). The zari
 *  on Writing and Contact is 0.14 from 46 % (DD 4.4 says 0.22 from 38 %), so
 *  it is no louder than the other intros and stays clear of the lede
 *  (design review DR-04). */
export const introImages = {
  about: { src: "/images/textures/silk-ivory.webp", position: "50% 50%", opacity: 0.35, start: "38%" },
  work: { src: "/images/textures/marble-ivory.webp", position: "50% 50%", opacity: 0.35, start: "38%" },
  writing: { src: "/images/textures/zari.webp", position: "70% 40%", opacity: 0.14, start: "46%" },
  careers: { src: "/images/textures/thread-paper.webp", position: "50% 75%", opacity: 0.4, start: "38%" },
  contact: { src: "/images/textures/zari.webp", position: "30% 60%", opacity: 0.14, start: "46%" },
  notFound: { src: "/images/textures/thread-paper.webp", position: "50% 75%", opacity: 0.4, start: "38%" },
} as const satisfies Record<string, IntroImage>;

/** Gold zari on vermilion silk: a generated image, behind the home night band
 *  (lg only, opacity 0.16) and the Writing and Contact intros. */
export const zari: SizedImage = { src: "/images/textures/zari.webp", width: 1600, height: 900 };
