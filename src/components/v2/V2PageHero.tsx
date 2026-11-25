import type { CSSProperties, ElementType, ReactNode } from "react";
import { FitLine } from "./FitLine";
import { MixedHeading, type HeadingPart } from "./MixedHeading";
import { ThreadField } from "./ThreadField";

// The top of every inner /v2 page (spec 4.2, Lando's "ON TRACK"): the page
// title as one giant line across the full width (bold sans, with a serif
// word where the copy allows and a scribble drawn over one word on load),
// a meta row of three short facts in bold uppercase, then the intro lede
// (under an optional small mono line) with its last phrase in the serif
// voice. Paper with the thread field, or
// night (Writing and Contact).
//
// The title's size follows its number of letters so it nearly fills one
// line from 768 px (`--v2-chars`, `fit` nudges the estimate), and FitLine
// then fits it exactly once the fonts are in.

export function V2PageHero({
  id,
  title,
  meta,
  lede,
  accent,
  ledeLabel,
  theme = "paper",
  as = "h1",
  fit = 1,
  children,
}: {
  /** The section's heading id (aria-labelledby). */
  id: string;
  /** The title in parts, such as [{ text: "Her", voice: "serif" }, { text: "story", voice: "sans", mark: "underline" }]. */
  title: readonly HeadingPart[];
  /** Three short facts from existing copy. */
  meta: readonly string[];
  lede: string;
  /** The last phrase of the lede, set in the serif voice (must end `lede`). */
  accent?: string;
  /** A small mono line over the lede (Lando's label above his intro), such
   *  as the classic page's intro title. */
  ledeLabel?: string;
  theme?: "paper" | "night";
  as?: ElementType;
  /** Multiplies the estimated letter width (1 = default). */
  fit?: number;
  children?: ReactNode;
}) {
  const chars = title.reduce((sum, part) => sum + part.text.length, 0) + Math.max(0, title.length - 1);
  const at = accent ? lede.lastIndexOf(accent) : -1;
  return (
    <section className="v2-page-hero v2-surface" data-v2-theme={theme} aria-labelledby={id}>
      <ThreadField seed={chars * 13 + 5} />
      <div className="v2-wrap">
        <MixedHeading
          as={as}
          id={id}
          parts={title}
          size="title"
          rise="load"
          className="v2-page-title"
          style={{ "--v2-chars": chars, "--v2-em": 0.62 * fit } as CSSProperties}
        />
        <FitLine targetId={id} />
        <ul className="v2-meta-row v2-sans">
          {meta.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="v2-page-lede">
          {ledeLabel ? <p className="v2-label v2-page-lede-label">{ledeLabel}</p> : null}
          <p className="v2-lede">
            {at < 0 || !accent ? (
              lede
            ) : (
              <>
                {lede.slice(0, at)}
                <span className="v2-serif-italic">{lede.slice(at)}</span>
              </>
            )}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}
