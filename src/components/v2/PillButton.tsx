import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import type { ReactNode } from "react";

// Pill buttons for /v2 (spec 3.4): radius 6 px, a bold uppercase label and a
// small Lucide icon. `primary` takes the theme's pill colours (vermilion-ink
// with paper text on paper, marigold with ink text on night); `outline` is a
// box in the text colour. The link kind follows the address, as on the
// classic site: next/link for a page, a new tab for another site (said to
// screen readers), a plain link for mailto:.

const ICONS = { "arrow-right": ArrowRight, "arrow-up-right": ArrowUpRight, mail: Mail } as const;
export type PillIcon = keyof typeof ICONS | "none";

const isExternalHref = (href: string) => /^https?:\/\//.test(href);

export function PillButton({
  href,
  children,
  variant = "primary",
  size = "default",
  icon,
  iconFirst = false,
  newTabLabel = " (opens in a new tab)",
  className,
  ariaCurrent,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  size?: "default" | "large";
  /** Defaults: Mail for mailto:, ArrowUpRight for another site, ArrowRight for a page. */
  icon?: PillIcon;
  /** The header's Contact pill puts its icon first, as Lando's Store pill does. */
  iconFirst?: boolean;
  newTabLabel?: string;
  className?: string;
  ariaCurrent?: "page";
}) {
  const external = isExternalHref(href);
  const name: PillIcon = icon ?? (href.startsWith("mailto:") ? "mail" : external ? "arrow-up-right" : "arrow-right");
  const Icon = name === "none" ? null : ICONS[name];
  const glyph = Icon ? <Icon size={16} strokeWidth={2} aria-hidden="true" /> : null;
  const classes = ["v2-pill", variant === "outline" && "v2-pill--outline", size === "large" && "v2-pill--large", className]
    .filter(Boolean)
    .join(" ");
  const body = (
    <>
      {iconFirst ? glyph : null}
      <span>{children}</span>
      {external ? <span className="v2-sr-only">{newTabLabel}</span> : null}
      {iconFirst ? null : glyph}
    </>
  );
  if (external)
    return (
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  if (href.startsWith("mailto:"))
    return (
      <a className={classes} href={href}>
        {body}
      </a>
    );
  return (
    <Link className={classes} href={href} aria-current={ariaCurrent}>
      {body}
    </Link>
  );
}
