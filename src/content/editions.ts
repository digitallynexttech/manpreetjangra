import type { PageMeta } from "./types";

// The editions index at / (plan/versions-spec.md 2.4): five designs of one
// portfolio, side by side. This file holds neutral labels only: the edition
// names, and one line each on the design concept and on the motion technique
// (from the spec's sections 2 and 3). They describe the designs, never her:
// no fact, number, title or claim about Manpreet Jangra, so nothing here
// carries a fact id. Her name and role on the index come from shared.ts.

export type EditionNumber = 1 | 2 | 3 | 4 | 5;

export type Edition = {
  number: EditionNumber;
  /** The edition's home page. */
  href: `/v${EditionNumber}`;
  /** Short label shown before the name ("V1"). */
  code: string;
  name: string;
  /** What the design is. */
  concept: string;
  /** How it moves on scroll. */
  motion: string;
};

export const editions: readonly Edition[] = [
  {
    number: 1,
    href: "/v1",
    code: "V1",
    name: "Classic",
    concept:
      "The editorial original: warm paper, Newsreader headings, a vermilion thread and one night band for her words.",
    motion: "Scroll reveals with IntersectionObserver, CSS entrances and View Transitions between pages.",
  },
  {
    number: 2,
    href: "/v2",
    code: "V2",
    name: "Kinetic",
    concept:
      "Bold and scroll-driven: giant mixed serif and sans type, pinned panels, a full-screen menu and a drawn vermilion thread.",
    motion: "GSAP ScrollTrigger and SplitText on Lenis smooth scrolling.",
  },
  {
    number: 3,
    href: "/v3",
    code: "V3",
    name: "Cinema",
    concept:
      "Her career told like a short film: full-screen scenes, big light type over moving silk and thread footage, subtitles for her words.",
    motion: "GSAP ScrollTrigger pinned scenes with canvas frame sequences scrubbed by scroll, on native scrolling.",
  },
  {
    number: 4,
    href: "/v4",
    code: "V4",
    name: "Broadsheet",
    concept:
      "A long-form magazine profile: a masthead, chapter numbers, newspaper columns, drop caps, pull quotes and sidenotes with sources.",
    motion: "Native CSS scroll-driven animations (animation-timeline: view() and scroll()), with no animation library.",
  },
  {
    number: 5,
    href: "/v5",
    code: "V5",
    name: "Studio",
    concept: "A bento grid of rounded, tactile tiles: warm, bright and app-like, with a light and a dark theme.",
    motion: "Motion (motion.dev) springs: tiles that assemble, pointer tilt, stacking cards and a drag carousel.",
  },
];

/** Labels of the index page itself. */
export const editionsIndex = {
  /** Shown above her name (spec 2.4). */
  label: "Five editions of one portfolio",
  /** Before each edition's motion line. */
  motionLabel: "Motion",
  /** The call to action at the foot of each card, before the code ("Open V1"). */
  open: "Open",
  /** The list of cards, for screen readers. */
  listLabel: "Editions",
} as const;

/** Browser title and description of the index (noindex, see src/app/page.tsx). */
export const editionsMeta: Pick<PageMeta, "title" | "description"> = {
  title: "Manpreet Jangra · Five editions of one portfolio",
  description:
    "Five designs of Manpreet Jangra's portfolio, with the same content: Classic, Kinetic, Cinema, Broadsheet and Studio.",
};
