import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import type { ReactNode } from "react";

// Buttons (spec 3.8, CSS in globals.css 6.8). `primary` has the vermilion-ink
// face on its marigold backing (marigold on vermilion inside `.band-night`);
// `outline` is the quiet box for secondary actions and the header CTA.
//
// The link kind follows the address: an internal page uses next/link (so the
// page transition runs), an https address opens in a new tab and says so to
// screen readers, and a mailto: address is a plain link.

export type ButtonIcon = "arrow-right" | "arrow-up-right" | "mail" | "none";

/** Lucide icon for a button or text link: 20 px in buttons, 18 px in text
 *  links, stroke 1.5 (spec 6.6). Decorative: the label names the action. */
export function LinkIcon({ name, size = 20 }: { name: ButtonIcon; size?: number }) {
  const Icon =
    name === "arrow-right" ? ArrowRight : name === "arrow-up-right" ? ArrowUpRight : name === "mail" ? Mail : null;
  return Icon ? <Icon className="site-arrow" size={size} strokeWidth={1.5} aria-hidden="true" /> : null;
}

const isExternalHref = (href: string) => /^https?:\/\//.test(href);
const isMailHref = (href: string) => href.startsWith("mailto:");

/** The icon a link gets when none is named: Mail for mailto:, ArrowUpRight
 *  for another site, ArrowRight for a page of this site. */
function defaultIcon(href: string, external?: boolean): ButtonIcon {
  if (isMailHref(href)) return "mail";
  return (external ?? isExternalHref(href)) ? "arrow-up-right" : "arrow-right";
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  icon,
  external,
  transitionTypes,
  className,
  ariaCurrent,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  size?: "default" | "compact";
  /** Primary buttons get an arrow (or Mail) by default; outline buttons none. */
  icon?: ButtonIcon;
  /** Opens in a new tab. Defaults to true for https addresses. */
  external?: boolean;
  /** How the page change animates, such as ["nav-forward"] (spec 2.3). */
  transitionTypes?: string[];
  className?: string;
  /** Marks the button as the current page (the header's Contact on /contact). */
  ariaCurrent?: "page";
}) {
  const isExternal = external ?? isExternalHref(href);
  const iconName = icon ?? (variant === "primary" ? defaultIcon(href, isExternal) : "none");
  const classes = [
    "site-button",
    variant === "outline" && "site-button--outline",
    size === "compact" && "site-button--compact",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (isMailHref(href))
    return (
      <a className={classes} href={href}>
        {children}
        <LinkIcon name={iconName} />
      </a>
    );
  if (isExternal)
    return (
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <span className="site-sr-only"> (opens in a new tab)</span>
        <LinkIcon name={iconName} />
      </a>
    );
  return (
    <Link className={classes} href={href} transitionTypes={transitionTypes} aria-current={ariaCurrent}>
      {children}
      <LinkIcon name={iconName} />
    </Link>
  );
}
