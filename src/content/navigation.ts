import type { NavItem, Url } from "./types";

// Navigation. The root layout (a server component) passes `navigation`,
// `homeNav` and `headerCta` to the client Header as props, so this file holds
// no fact ids and no placeholders (spec 7.5).

/** Header links from lg (spec 2.2). The phone sheet adds Home first and
 *  Contact last, in the order of `footerNav`. */
export const navigation: readonly NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "Careers", href: "/careers" },
];

/** The header's outline button (desktop) and the sheet's last link. */
export const headerCta: NavItem = { label: "Contact", href: "/contact" };

/** The sheet's first link (below lg the wordmark is not the only way home). */
export const homeNav: NavItem = { label: "Home", href: "/" };

export const footerNav: readonly NavItem[] = [
  homeNav,
  ...navigation,
  headerCta,
];

/** Her own profiles. LinkedIn: F170, F182. Instagram: F171, F182. */
export const socialLinks: readonly { key: "linkedin" | "instagram"; label: string; href: Url; handle: string }[] = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/manpreetjangraofficial/",
    handle: "linkedin.com/in/manpreetjangraofficial",
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/manpreetjangraofficial/",
    handle: "@manpreetjangraofficial",
  },
];
