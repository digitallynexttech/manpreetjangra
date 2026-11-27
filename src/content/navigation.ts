import type { NavItem, Url } from "./types";

// Navigation. The root layout passes these to the client header as props,
// so this file holds no fact ids and no placeholders (spec 7.5).

/** The page links between Home and Contact. */
const navigation: readonly NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "Careers", href: "/careers" },
];

/** The header's Contact pill and the menu's last link. */
export const headerCta: NavItem = { label: "Contact", href: "/contact" };

/** The menu's first link. */
const homeNav: NavItem = { label: "Home", href: "/" };

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
