import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { QuoteView } from "@/content/types";

// One of her quotations on an inner /v2 page (spec 4.3, 4.4): the words in
// the serif italic (the quote marks come from CSS, never from the data), the
// attribution built on the server in mono, and, when the quote names a link
// label, a link to the post it comes from (a new tab, said to screen
// readers). `size` sets the type: "large" for a section's main quote,
// "card" inside a card. `children` sits between the quote and its caption
// (a drawn underline).
export function QuoteFigure({
  quote,
  size = "card",
  linkLabel,
  newTabLabel = " (opens in a new tab)",
  className,
  children,
}: {
  quote: QuoteView;
  size?: "large" | "card";
  /** Overrides the quote's own link label. */
  linkLabel?: string;
  newTabLabel?: string;
  className?: string;
  children?: ReactNode;
}) {
  const label = linkLabel ?? quote.linkLabel;
  return (
    <figure className={["v2-quotefig", `v2-quotefig--${size}`, className].filter(Boolean).join(" ")}>
      <blockquote>
        <p className="v2-quotefig-text">
          <q className="v2-quote">{quote.text}</q>
        </p>
      </blockquote>
      {children}
      <figcaption className="v2-label v2-quotefig-cite">{quote.attribution}</figcaption>
      {label && quote.href ? (
        <a className="v2-link" href={quote.href} target="_blank" rel="noopener noreferrer">
          {label}
          <span className="v2-sr-only">{newTabLabel}</span>
          <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
        </a>
      ) : null}
    </figure>
  );
}
