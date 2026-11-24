import Link from "next/link";
import type { ReactNode } from "react";
import { LinkIcon, defaultIcon, isExternalHref, isMailHref, type ButtonIcon } from "./Button";

// TextLink (spec 3.8): ink text with an 18 px Lucide icon (ArrowRight for a
// page of this site, ArrowUpRight for another site, Mail for mailto:);
// vermilion-ink underline on hover. On night surfaces it is marigold, either
// through `tone="night"` or automatically inside `.band-night` and the footer.
export function TextLink({
  href,
  children,
  external,
  transitionTypes,
  tone = "light",
  icon,
  className,
}: {
  href: string;
  children: ReactNode;
  /** Opens in a new tab. Defaults to true for https addresses. */
  external?: boolean;
  /** How the page change animates, such as ["nav-forward"] (spec 2.3). */
  transitionTypes?: string[];
  tone?: "light" | "night";
  icon?: ButtonIcon;
  className?: string;
}) {
  const isExternal = external ?? isExternalHref(href);
  const iconName = icon ?? defaultIcon(href, isExternal);
  const classes = ["site-text-link", tone === "night" && "site-text-link--night", className]
    .filter(Boolean)
    .join(" ");

  if (isMailHref(href))
    return (
      <a className={classes} href={href}>
        {children}
        <LinkIcon name={iconName} size={18} />
      </a>
    );
  if (isExternal)
    return (
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <span className="site-sr-only"> (opens in a new tab)</span>
        <LinkIcon name={iconName} size={18} />
      </a>
    );
  return (
    <Link className={classes} href={href} transitionTypes={transitionTypes}>
      {children}
      <LinkIcon name={iconName} size={18} />
    </Link>
  );
}
