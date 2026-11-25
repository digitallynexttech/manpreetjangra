import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { labels } from "@/content/v5";
import { Magnetic } from "./Magnetic";

// The buttons of /v5: rounded rectangles (radius 16 px, not pills; pills are
// the agency's idiom, plan/design-decision.md 1.1), at least 48 px tall.
// - primary: vermilion-ink fill with paper text (6.19:1), the action colour;
// - secondary: a hairline outline in the tile's own text colour;
// - quiet: text and arrow only, for links inside tiles.
// Internal addresses use next/link; other sites open in a new tab with
// rel="noopener noreferrer" and say so to screen readers; a mailto: address
// is a plain link with the Mail icon. Primary and
// secondary buttons are magnetic unless `magnetic={false}`.

export function V5Button({
  href,
  children,
  variant = "primary",
  external = false,
  magnetic = true,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  external?: boolean;
  magnetic?: boolean;
  className?: string;
}) {
  const classes = ["v5-button", `v5-button--${variant}`, className].filter(Boolean).join(" ");
  const Arrow = external ? ArrowUpRight : href.startsWith("mailto:") ? Mail : ArrowRight;
  const inner = (
    <>
      <span>{children}</span>
      <Arrow className="v5-button-arrow" size={18} strokeWidth={2} aria-hidden="true" />
    </>
  );
  const link =
    external || !href.startsWith("/") ? (
      <a
        className={classes}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
        {external ? <span className="v5-sr">{labels.newTab}</span> : null}
      </a>
    ) : (
      <Link className={classes} href={href}>
        {inner}
      </Link>
    );
  return magnetic && variant !== "quiet" ? <Magnetic>{link}</Magnetic> : link;
}
