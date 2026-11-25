import type { ReactNode } from "react";
import { labels } from "@/content/v4";
import { Marked } from "./Mark";

// The section front of an inner page (plan/versions-spec.md, V4 inner
// pages): each page is a section of the paper. The section letter and the
// big section flag (the page's own eyebrow, "About"), a double rule, then
// the headline (the page's H1, its accent highlighted once after load), the
// standfirst and an optional figure beside them; under them, "In this
// section", the page's articles as anchor links with their numerals.

export type FrontItem = { numeral: string; name: string; teaser: string; href: `#${string}` };

export function SectionFront({
  id,
  letter,
  flag,
  title,
  accent,
  lede,
  figure,
  children,
  items,
}: {
  /** The id of the H1. */
  id: string;
  letter: string;
  flag: string;
  title: string;
  accent?: string;
  lede: ReactNode;
  figure?: ReactNode;
  /** Under the standfirst: a count, buttons. */
  children?: ReactNode;
  items?: readonly FrontItem[];
}) {
  return (
    <header className={figure ? "v4-front v4-wrap v4-front--figure" : "v4-front v4-wrap"}>
      <div className="v4-front-flagline">
        <p className="v4-front-letter">
          {labels.section} {letter}
        </p>
        <p className="v4-front-flag">{flag}</p>
      </div>
      <span className="v4-double-rule" aria-hidden="true" />
      <div className="v4-front-grid">
        <div className="v4-front-text">
          <h1 id={id} className="v4-front-title">
            <Marked text={title} phrase={accent} load />
          </h1>
          <p className="v4-front-standfirst">{lede}</p>
          {children}
        </div>
        {figure ? <div className="v4-front-figure">{figure}</div> : null}
      </div>
      {items && items.length > 0 ? (
        <nav className="v4-insection" aria-labelledby={`${id}-insection`}>
          <h2 id={`${id}-insection`} className="v4-insection-title">
            {labels.inSection}
          </h2>
          <ol className="v4-insection-list">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  <span className="v4-insection-numeral" aria-hidden="true">
                    {item.numeral}
                  </span>
                  <span className="v4-insection-text">
                    <span className="v4-insection-name">{item.name}</span>
                    <span className="v4-insection-teaser">{item.teaser}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
    </header>
  );
}

/** Roman numerals for the articles of a page (I to X are enough). */
export const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"] as const;
