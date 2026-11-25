import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { labels } from "@/content/v5";
import { Tile, type Tone } from "./Tile";

// A tile that is one link (the contact tiles of the home, the enquiry and
// profile tiles of the inner pages): an icon badge, the label in big type,
// and an arrow in the corner that nudges on hover. The whole tile is the
// link (`v5-cover`); the focus ring goes round the tile. A page of /v5 uses
// next/link; another site opens in a new tab and says so.
export function LinkTile({
  icon,
  href,
  label,
  tone = "paper",
  external = false,
  w,
  mdW,
}: {
  icon: ReactNode;
  href: string;
  label: string;
  tone?: Tone;
  external?: boolean;
  w?: 1 | 2;
  mdW?: 1 | 2;
}) {
  const Arrow = external ? ArrowUpRight : ArrowRight;
  return (
    <Tile tone={tone} w={w} mdW={mdW} tileClassName="v5-link-tile">
      <span className="v5-link-icon" aria-hidden="true">
        {icon}
      </span>
      {external ? (
        <a className="v5-cover" href={href} target="_blank" rel="noopener noreferrer">
          {label}
          <span className="v5-sr">{labels.newTab}</span>
        </a>
      ) : (
        <Link className="v5-cover" href={href}>
          {label}
        </Link>
      )}
      <Arrow className="v5-link-arrow" size={20} strokeWidth={2} aria-hidden="true" />
    </Tile>
  );
}
