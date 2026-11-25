import type { InternalHref, NavItem } from "./types";
import { footerNav } from "./navigation";
import { withBase } from "@/lib/versions";
import { SEQUENCES, footageProviders, type FrameSequence } from "@/lib/sequences";

// The "Studio" edition at /v5 (plan/versions-spec.md 3, "V5 Studio"): a bento
// grid of rounded tiles with a floating dock. This file holds only what /v5
// needs on top of the content the classic pages already use: the /v5 address
// of each page, the dock items, the frame sequences this edition shows, and
// neutral labels (section labels, control names). It adds no fact, number,
// title, client or quotation, so nothing here carries a fact id. Every other
// word on /v5 comes from the content files the classic site reads, through
// the same `isConfirmed` gates.

/** The prefix of this edition. */
export const V5_BASE = "/v5";

/** The /v5 address of a classic page: "/" -> "/v5", "/about#bio" ->
 *  "/v5/about#bio", "/contact?type=press" -> "/v5/contact?type=press".
 *  Links to other sites, mailto: links and "#id" anchors pass unchanged. */
export function toV5(href: InternalHref): InternalHref;
export function toV5(href: string): string;
export function toV5(href: string): string {
  return withBase(href, V5_BASE);
}

/** Which Lucide icon the dock shows for each page (the icons are picked in
 *  the client Dock; this is only the key). */
export type DockIcon = "home" | "about" | "work" | "writing" | "careers" | "contact";

const ICON_OF: Record<string, DockIcon> = {
  "/": "home",
  "/about": "about",
  "/work": "work",
  "/writing": "writing",
  "/careers": "careers",
  "/contact": "contact",
};

/** The dock's page links: the classic footer links (Home, About, Work,
 *  Writing, Careers, Contact), same labels, /v5 addresses. */
export const v5Nav: readonly (NavItem & { icon: DockIcon })[] = footerNav.map((item) => ({
  label: item.label,
  href: toV5(item.href),
  icon: ICON_OF[item.href] ?? "home",
}));

/** The frame sequences /v5 shows (public/sequences; provenance in
 *  src/content/sources.json). The footer's footage credit lists the
 *  providers of exactly these, so add a sequence here when a page uses one. */
export const v5Sequences: readonly FrameSequence[] = [
  // Home, "What I lead": the tall tile scrubbed by the scroll.
  SEQUENCES["bronze-silk"],
  // Careers, beside "Apply": a needle being threaded (hiring as threading
  // people together, assets/sequences/README.md).
  SEQUENCES["needle-thread"],
];

/** The footer credit for the footage ("Motion footage: Mixkit"). */
export const footage = {
  label: "Motion footage",
  providers: footageProviders(v5Sequences).join(", "),
} as const;

/** The key under which the theme choice is kept in localStorage. */
export const THEME_KEY = "v5-theme";

/** Neutral labels. Section labels, control names and short captions only;
 *  never a claim. Grouped by where they appear. */
export const labels = {
  // Dock (spec: floating pill dock).
  dock: "Main",
  /** The link to the editions index at / (every edition's footer has it). */
  allEditions: "All editions",
  /** The theme switch: a toggle button, pressed when the dark theme is on. */
  darkTheme: "Dark theme",
  // Home hero bento.
  now: "Now",
  featured: "Featured",
  // Journey stacking cards: "01 / 05" is built from the card numbers.
  of: "/",
  // Quotes carousel.
  quotes: "Quotes",
  previous: "Previous quotes",
  next: "Next quotes",
  drag: "Drag",
  // Footer tile.
  pages: "Pages",
  backToTop: "Back to top",
  /** Opens in a new tab, for screen readers (the classic site says the same). */
  newTab: " (opens in a new tab)",
  // Work, "Where I work": the venture tiles turn over to show the website.
  // The same words the classic VentureList uses; "{name}" is the venture.
  previewWebsite: "Preview website",
  previewThe: "Preview the {name} website",
  previewWindow: "{name} website preview",
  closePreview: "Close website preview",
  visit: "Visit {name}",
} as const;
