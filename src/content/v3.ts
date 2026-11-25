import type { InternalHref, NavItem } from "./types";
import { footerNav } from "./navigation";
import { withBase } from "@/lib/versions";

// The "Cinema" edition of the site at /v3 (plan/versions-spec.md 3, V3). This
// file holds only what /v3 needs on top of the content the classic pages
// already use: the /v3 address of each page and neutral labels (scene and
// chapter labels, control names, short captions). It adds no fact, number,
// title, client or quotation about her, so nothing here carries a fact id.
// Every other word on /v3 comes from the content files the classic site
// reads, through the same `isConfirmed` gates. No import here pulls content
// data into a client bundle beyond the page list: client components may
// import this file.

/** The address prefix of this edition. */
export const V3_BASE = "/v3";

/** The /v3 address of a classic page: "/" -> "/v3", "/about#bio" ->
 *  "/v3/about#bio". Links to other sites and mailto: links pass unchanged. */
export function toV3(href: InternalHref): InternalHref;
export function toV3(href: string): string;
export function toV3(href: string): string {
  return withBase(href, V3_BASE);
}

/** The chapters of /v3: the classic footer links (Home, About, Work, Writing,
 *  Careers, Contact) in the same order and with the same labels, numbered
 *  01 to 06 in the chapter list. */
export const chapters: readonly (NavItem & { number: string })[] = footerNav.map((item, index) => ({
  label: item.label,
  href: toV3(item.href) as InternalHref,
  number: String(index + 1).padStart(2, "0"),
}));

/** Neutral labels, grouped by where they appear. Section labels, control
 *  names and short captions only; never a claim about her. */
export const labels = {
  // Top bar and chapter list (spec V3 Navigation).
  /** The button that opens the full-screen chapter list. */
  chapters: "Chapters",
  /** The chapter list's close button. */
  close: "Close",
  closeChapters: "Close the chapter list",
  /** Before a chapter or scene number: "Chapter 01". */
  chapter: "Chapter",
  scene: "Scene",
  /** The wordmark link, for screen readers. */
  home: "Home",
  // Home scenes (spec V3 Home). Scene names shown on each scene's slate; the
  // other scene names come from the content files (eyebrows and titles).
  coldOpen: "Cold open",
  scroll: "Scroll",
  endCredits: "End credits",
  // Footer and end credits.
  /** The way back to the editions index at /. */
  allEditions: "All editions",
  /** The footage credit line: "Motion footage: Mixkit, Pexels". */
  motionFootage: "Motion footage",
  follow: "Follow",
  /** Opens in a new tab, for screen readers (the classic site says the same). */
  newTab: " (opens in a new tab)",
} as const;
