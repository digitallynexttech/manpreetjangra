import { ArrowUpRight, Quote } from "lucide-react";
import type { QuoteView } from "@/content/types";
import { labels } from "@/content/v5";

// A quotation inside a tile: the quote mark, her words in Newsreader italic
// (the only place /v5 uses the serif), the attribution, and the link to the
// post it comes from when there is one. `theme` shows the quote's theme as
// the tile's chip (Writing, Themes). `size` sets the type: "large" for a tile
// two columns wide.
export function QuoteBody({
  quote,
  size = "default",
  showTheme = false,
  cover = false,
}: {
  quote: QuoteView;
  size?: "default" | "large";
  showTheme?: boolean;
  /** The source link covers the whole tile (a tile that is one link). */
  cover?: boolean;
}) {
  return (
    <figure className="v5-qb" data-size={size === "large" ? "large" : undefined}>
      <span className="v5-qb-top">
        {showTheme && quote.theme ? <span className="v5-chip">{quote.theme}</span> : null}
        <Quote className="v5-qb-mark" size={22} strokeWidth={2} aria-hidden="true" />
      </span>
      <blockquote className="v5-qb-text" cite={quote.href}>
        <p>{quote.text}</p>
      </blockquote>
      <figcaption className="v5-qb-by">{quote.attribution}</figcaption>
      {quote.href && quote.linkLabel ? (
        <p className="v5-qb-link-row">
          <a
            className={["v5-qb-link", cover ? "v5-cover" : ""].filter(Boolean).join(" ")}
            href={quote.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {quote.linkLabel}
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
            <span className="v5-sr">{labels.newTab}</span>
          </a>
        </p>
      ) : null}
    </figure>
  );
}
