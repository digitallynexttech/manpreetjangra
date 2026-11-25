import type { InternalHref, NavItem } from "./types";
import { footerNav } from "./navigation";
import { footer } from "./shared";

// The scroll edition of the site at /v2 (plan/v2-spec.md). This file holds
// only what /v2 needs on top of the content the classic pages already use:
// the /v2 address of each page, and neutral labels (section labels, control
// names). It adds no fact, number, title, client or quotation, so nothing
// here carries a fact id. Every other word on /v2 comes from the content
// files the classic site reads, through the same `isConfirmed` gates.

/** The /v2 address of a classic page: "/" -> "/v2", "/about#bio" ->
 *  "/v2/about#bio". Links to other sites and mailto: links pass unchanged. */
export function toV2(href: string): string {
  if (!href.startsWith("/")) return href;
  return href === "/" ? "/v2" : href.startsWith("/#") ? `/v2${href.slice(1)}` : `/v2${href}`;
}

/** The menu and footer links of /v2: the classic footer links (Home, About,
 *  Work, Writing, Careers, Contact), same labels, /v2 addresses. */
export const v2Nav: readonly NavItem[] = footerNav.map((item) => ({
  label: item.label,
  href: toV2(item.href) as InternalHref,
}));

/** The stacked wordmark: her name from the footer copy, one word per line
 *  ("MANPREET" in the serif voice over "JANGRA" in the sans voice). */
export const wordmark = (() => {
  const [first, ...rest] = footer.wordmark.split(" ");
  return { first, last: rest.join(" "), label: `${footer.wordmark}, home` };
})();

/** Neutral labels. Section labels, control names and short captions only;
 *  never a claim. Grouped by where they appear. */
export const labels = {
  // Header and menu (spec 3.4).
  openMenu: "Open menu",
  closeMenu: "Close menu",
  menu: "Menu",
  /** The way back to the classic edition of the site (menu and footer). */
  classicSite: "Classic site",
  // Footer (spec 4.1 item 10).
  pages: "Pages",
  followOn: "Follow on",
  group: "The group",
  // Home (spec 4.1). Section labels for the next builders.
  now: "Now",
  scroll: "Scroll",
  inHerWords: "In her words",
  inNumbers: { sans: "In", serif: "numbers" },
  theWork: { serif: "The", sans: "Work" },
  herWords: { serif: "Her", sans: "Words" },
  fromHerFeed: { sans: "From her", serif: "feed" },
  followManpreet: "Follow Manpreet",
  // Column headings of big rows (spec 4.2), read to screen readers per cell.
  year: "Year",
  role: "Role",
  /** About journey rows: the entry's title. */
  milestone: "Milestone",
  /** Work: the service lines and the group's organisations. */
  number: "No.",
  serviceLine: "Service line",
  organisation: "Organisation",
  field: "Field",
  /** Writing: the article rows (date, article, where it was published). */
  date: "Date",
  article: "Article",
  outlet: "Outlet",
  /** Careers: the role rows (the role's title, its department). */
  department: "Department",
  /** Opens in a new tab, for screen readers (the classic site says the same). */
  newTab: " (opens in a new tab)",
  // The website preview of the Work ventures (the classic VentureList says
  // the same; "{name}" is the organisation's name).
  previewWebsite: "Preview website",
  previewThe: "Preview the {name} website",
  previewWindow: "{name} website preview",
  closePreview: "Close website preview",
  visit: "Visit {name}",
} as const;
