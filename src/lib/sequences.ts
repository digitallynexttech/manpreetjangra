// The scroll frame sequences in public/sequences/<name>/<width>/NNNN.webp
// (plan/versions-spec.md 1 and 2.7). Stock clips turned into WebP frames;
// provenance and licences are in src/content/sources.json ("sequences") and
// in assets/sequences/README.md. No directive: server and client code may
// both import this file (useFrameSequence.ts reads it in the browser).

export type FootageProvider = "Mixkit" | "Pexels";

export type FrameSequence = {
  /** The folder name under public/sequences. */
  name: string;
  /** Number of frames, numbered 0001 upward with no gaps. */
  frames: number;
  /** The frame width of the large set, fetched from 1024 px viewport width. */
  large: number;
  /** The frame width of the small set, fetched below 1024 px viewport width. */
  small: number;
  /** Frame width divided by frame height (16:9 landscape or 9:16 portrait). */
  aspect: number;
  /** Frames per second of the clip as it was sampled (for time-based playback). */
  fps: number;
  /** Who published the source clip; editions list these in their footage credit. */
  provider: FootageProvider;
};

export const SEQUENCES = {
  /** Red silk waving. Mixkit 40213. */
  "vermilion-silk": { name: "vermilion-silk", frames: 121, large: 1600, small: 800, aspect: 16 / 9, fps: 6, provider: "Mixkit" },
  /** A needle being threaded. Pexels 35166550. */
  "needle-thread": { name: "needle-thread", frames: 91, large: 1600, small: 800, aspect: 16 / 9, fps: 6, provider: "Pexels" },
  /** Dark orange silk waving, portrait. Mixkit 40226. */
  "bronze-silk": { name: "bronze-silk", frames: 123, large: 900, small: 540, aspect: 9 / 16, fps: 6, provider: "Mixkit" },
  /** A spool of white thread. Pexels 26569054. */
  "thread-spool": { name: "thread-spool", frames: 79, large: 1600, small: 800, aspect: 16 / 9, fps: 8, provider: "Pexels" },
  /** Marigold flowers. Pexels 3976813. */
  marigold: { name: "marigold", frames: 78, large: 1600, small: 800, aspect: 16 / 9, fps: 5, provider: "Pexels" },
} as const satisfies Record<string, FrameSequence>;

export type SequenceName = keyof typeof SEQUENCES;

/** Below this viewport width the small set is fetched. */
export const SMALL_SET_BELOW = 1024;

/** The address of one frame; `index` counts from 1. */
export function frameSrc(sequence: FrameSequence, width: number, index: number): string {
  return `/sequences/${sequence.name}/${width}/${String(index).padStart(4, "0")}.webp`;
}

/** The first frame, for a poster image shown before (or without) JavaScript. */
export function posterSrc(sequence: FrameSequence, set: "large" | "small" = "small"): string {
  return frameSrc(sequence, set === "large" ? sequence.large : sequence.small, 1);
}

/** The providers of the sequences an edition uses, once each, in the order
 *  given: for its footer credit ("Motion footage: Pexels, Mixkit"). */
export function footageProviders(sequences: readonly FrameSequence[]): FootageProvider[] {
  return [...new Set(sequences.map((sequence) => sequence.provider))];
}
