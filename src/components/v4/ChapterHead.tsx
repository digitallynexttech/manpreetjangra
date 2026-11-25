import type { ReactNode } from "react";
import { labels } from "@/content/v4";

// The opening of a chapter of the home profile, or of an article on an inner
// page: the Roman numeral (slides in), the chapter name in small capitals
// after a rule that grows to the column width, the headline (H2) and an
// optional dek. The numeral is decoration; screen readers hear "Chapter I:
// The work" once, in the kicker. On inner pages (`label={null}`) the kicker
// is the article's own eyebrow, and the numeral only numbers it on the page.

export function ChapterHead({
  id,
  numeral,
  name,
  title,
  dek,
  className,
  label = labels.chapter,
}: {
  id: string;
  numeral: string;
  name: string;
  title: ReactNode;
  dek?: ReactNode;
  className?: string;
  /** The word before the numeral in the kicker; null for none. */
  label?: string | null;
}) {
  return (
    <header className={className ? `v4-chapter ${className}` : "v4-chapter"}>
      <span className="v4-chapter-numeral" aria-hidden="true">
        {numeral}
      </span>
      <div className="v4-chapter-text">
        <p className="v4-chapter-kicker">
          {label ? (
            <>
              <span className="v4-sr-only">
                {label} {numeral}:{" "}
              </span>
              <span aria-hidden="true">
                {label} {numeral}
                <span className="v4-chapter-dot"> · </span>
              </span>
            </>
          ) : null}
          {name}
        </p>
        <span className="v4-rule v4-rule--grow" aria-hidden="true" />
        <h2 id={id} className="v4-chapter-title">
          {title}
        </h2>
        {dek ? <p className="v4-dek">{dek}</p> : null}
      </div>
    </header>
  );
}

/** An article's kicker on an inner page: its eyebrow without a leading
 *  section number ("01 · Operations" -> "Operations"), since the numeral in
 *  the margin numbers it. */
export function kickerOf(eyebrow: string): string {
  return eyebrow.replace(/^\d+\s·\s/, "");
}
