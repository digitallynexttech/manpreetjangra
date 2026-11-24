import type { QuoteView } from "@/content/types";
import { TextLink } from "./TextLink";

// A quotation in her words (spec 6.7). The quote marks come from CSS, never
// from the data; the attribution is built on the server (`quoteView`).
// - paper: 1 px hairline above, Newsreader italic at lede size, optional
//   theme eyebrow and source link.
// - night: a static 2 px vermilion rule above (it never draws), lede size.
// - night-large: the same rule, a large marigold opening mark and the quote
//   at quote size, 30 characters wide at most.
export function QuoteCard({
  quote,
  variant,
  showTheme = false,
  linkLabel,
  className,
}: {
  quote: QuoteView;
  variant: "paper" | "night" | "night-large";
  showTheme?: boolean;
  /** Shows a link to the source under the attribution. */
  linkLabel?: string;
  className?: string;
}) {
  const label = linkLabel ?? quote.linkLabel;
  const classes = ["site-quote", variant !== "paper" && `site-quote--${variant}`, className].filter(Boolean).join(" ");
  return (
    <figure className={classes}>
      {/* The theme is a mono label without the thread: threads belong to
          section heads, and six of them drawing at once in the Writing
          themes grid would break "one thread drawing per screen" (DD 5.2). */}
      {showTheme && quote.theme ? <p className="site-eyebrow site-quote-theme">{quote.theme}</p> : null}
      {variant === "night-large" ? (
        <span className="site-quote-mark" aria-hidden="true">
          {"“"}
        </span>
      ) : null}
      <blockquote>
        {/* night-large opens with the marigold mark, so it gets no CSS marks. */}
        <p className={variant === "night-large" ? "site-quote-text" : "site-quote-text site-quoted"}>{quote.text}</p>
      </blockquote>
      <figcaption className="site-quote-attribution site-caption">{quote.attribution}</figcaption>
      {label && quote.href ? (
        <p className="site-quote-link">
          <TextLink href={quote.href}>{label}</TextLink>
        </p>
      ) : null}
    </figure>
  );
}
