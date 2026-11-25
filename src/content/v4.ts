import type { InternalHref, NavItem } from "./types";
import { footerNav, headerCta, navigation } from "./navigation";
import { withBase } from "@/lib/versions";

// The Broadsheet edition at /v4 (plan/versions-spec.md 3, V4): the profile
// set as a feature in a print weekly. This file holds only what /v4 needs on
// top of the content the classic pages already use: the /v4 address of each
// page, and neutral labels (section and chapter names, figure captions that
// describe the stock footage, control names). It adds no fact, number,
// title, client or quotation about Manpreet Jangra, so nothing here carries
// a fact id. Every other word on /v4 comes from the content files the
// classic site reads, through the same `isConfirmed` gates.

/** The prefix of this edition. */
export const V4_BASE = "/v4";

/** The /v4 address of a classic page: "/" -> "/v4", "/about#bio" ->
 *  "/v4/about#bio". Links to other sites and mailto: links pass unchanged. */
export function toV4(href: InternalHref): InternalHref;
export function toV4(href: string): string;
export function toV4(href: string): string {
  return withBase(href, V4_BASE);
}

/** The section bar under the nameplate (spec: About, Work, Writing,
 *  Careers, Contact): the classic header links plus Contact, same labels,
 *  /v4 addresses. */
export const v4Sections: readonly NavItem[] = [...navigation, headerCta].map((item) => ({
  label: item.label,
  href: toV4(item.href),
}));

/** The colophon's page list: Home, About, Work, Writing, Careers, Contact. */
export const v4Nav: readonly NavItem[] = footerNav.map((item) => ({
  label: item.label,
  href: toV4(item.href),
}));

/** Neutral labels, grouped by where they appear. Never a claim. */
export const labels = {
  // Masthead and section bar.
  /** The centre ear of the masthead: which edition of the portfolio this is. */
  edition: "Edition IV · The Broadsheet",
  /** The nameplate link on inner pages, for screen readers: "{name}, front page". */
  frontPage: "front page",
  /** The section bar's landmark name. */
  sections: "Sections",

  // Home: cover and opening.
  /** The kicker over the cover headline. */
  coverKicker: "The profile",
  /** The "Inside" box: the chapters of the home page, as anchor links. */
  inside: "Inside",
  /** Figure numbers and captions. The captions describe the stock footage only. */
  figure: "Fig.",
  coverCaption: "A spool of white thread. The frames turn as the page scrolls.",
  dividerCaption: "Marigolds. The frames move as the page scrolls.",
  /** The jump line at the end of the opening, as in a printed paper. */
  continued: "Continued in About",

  // Chapters of the home profile (spec: I The work, II The journey, III In
  // her words, IV Hiring, V Numbers).
  chapter: "Chapter",
  chapters: {
    work: { numeral: "I", name: "The work" },
    journey: { numeral: "II", name: "The journey" },
    words: { numeral: "III", name: "In her words" },
    hiring: { numeral: "IV", name: "Hiring" },
    numbers: { numeral: "V", name: "Numbers" },
  },

  // Sidenotes (margin notes from 1024 px, footnotes below).
  note: "Note",
  source: "Source",
  sources: "Sources",

  // Chapter III.
  moreFromFeature: "More from the feature",

  // Chapter IV: the classifieds panel.
  classifieds: "Classifieds",
  byTeam: "Open roles by team",

  // Chapter V: the stats table.
  tableFigure: "Figure",
  tableMeasure: "What it counts",
  tableNote: "Table note",

  // Inner pages: each is a section of the paper with its own section front.
  /** Before the section letter on a section front ("Section B"). */
  section: "Section",
  /** The letter of each section, in the order of the section bar (the front
   *  page is section A, as in a printed paper). */
  sectionLetters: { about: "B", work: "C", writing: "D", careers: "E", contact: "F" },
  /** The index of a section's articles under its front, as anchor links. */
  inSection: "In this section",
  /** Figure captions on the inner pages. They describe the stock footage only. */
  aboutCaption: "Dark orange silk. The frames move as the page scrolls.",
  workCaption: "Red silk. The frames move as the page scrolls.",
  writingCaption: "Marigolds. The frames move as the page scrolls.",
  careersCaption: "A needle being threaded. The frames turn as the page scrolls.",

  // About: the journey table and the bio panel.
  tableYear: "Year",
  tableMilestone: "Milestone",
  /** The spec's name for the boxed bio panel on About. */
  forOrganisers: "For organisers",

  // Work: the directory of the group's organisations, with website previews
  // (the control names of the classic VentureList).
  directoryName: "Organisation",
  directorySite: "Website",
  previewWebsite: "Preview website",
  /** "{name}" is replaced by the organisation's name. */
  previewThe: "Preview the {name} website",
  previewWindow: "{name} website preview",
  closePreview: "Close website preview",
  visit: "Visit {name}",

  /** Over the list of the agency's five service lines. */
  serviceLines: "Service lines",

  // Writing.
  /** Over the featured block, the lead story of the Writing section. */
  leadStory: "The lead story",
  /** The head row of the article index (a table of contents). */
  contents: "Contents",
  tableDate: "Date",
  tableArticle: "Article",

  // Contact: the form panel (spec: a "Letters to the editor" panel).
  letters: "Letters to the editor",

  // Colophon (footer).
  colophon: "Colophon",
  pages: "Pages",
  elsewhere: "Elsewhere",
  /** The typefaces of this edition. */
  setIn: "Set in Newsreader, with Geist Mono for notes and captions.",
  /** Before the providers of the frame sequences used ("Motion footage: Pexels"). */
  footage: "Motion footage",
  /** The way back to the editions index at /. */
  allEditions: "All editions",
  /** Opens in a new tab, for screen readers (the classic site says the same). */
  newTab: " (opens in a new tab)",
} as const;
