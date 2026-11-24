import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// The small arrow button under Lando's "ON TRACK" (spec 3.4): 40 px (44 px
// on touch), radius 6 px, the theme's pill colours, an arrow that nudges on
// hover. It has no visible text, so `label` names the destination.
export function RoundArrowButton({ href, label, className }: { href: string; label: string; className?: string }) {
  const external = /^https?:\/\//.test(href);
  const Icon = external ? ArrowUpRight : ArrowRight;
  const classes = ["v2-round", className].filter(Boolean).join(" ");
  const icon = <Icon size={18} strokeWidth={2.25} aria-hidden="true" />;
  return external ? (
    <a className={classes} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {icon}
    </a>
  ) : (
    <Link className={classes} href={href} aria-label={label}>
      {icon}
    </Link>
  );
}
