import type { ReactNode } from "react";
import { labels } from "@/content/v4";

// The opening of a chapter of the home profile: the Roman numeral (slides
// in), the chapter name in small capitals after a rule that grows to the
// column width, the headline (H2) and an optional dek. The numeral is
// decoration; screen readers hear "Chapter I: The work" once, in the kicker.

export function ChapterHead({
  id,
  numeral,
  name,
  title,
  dek,
  className,
}: {
  id: string;
  numeral: string;
  name: string;
  title: ReactNode;
  dek?: ReactNode;
  className?: string;
}) {
  return (
    <header className={className ? `v4-chapter ${className}` : "v4-chapter"}>
      <span className="v4-chapter-numeral" aria-hidden="true">
        {numeral}
      </span>
      <div className="v4-chapter-text">
        <p className="v4-chapter-kicker">
          <span className="v4-sr-only">
            {labels.chapter} {numeral}:{" "}
          </span>
          <span aria-hidden="true">
            {labels.chapter} {numeral}
            <span className="v4-chapter-dot"> · </span>
          </span>
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
