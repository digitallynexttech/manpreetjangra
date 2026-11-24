import type { TimelineView } from "@/content/types";
import { Disclosure } from "./Disclosure";
import { TextLink } from "./TextLink";

// The journey timeline (spec 4.1.4, 4.2.3, 6.10), oldest first. The list is a
// reveal group: when it comes into view the spine draws top-down (1.2 s), the
// rows rise one after another and each node pops in with its row (globals.css,
// "The journey spine").
// - compact (Home): static rows of year (left rail, mono, tabular), node (an
//   8 px vermilion square on the 1 px spine) and title with one line.
// - full (About): node, then a Disclosure per entry (group "journey", one open
//   at a time; the last entry, "Now", starts open). The summary holds the year
//   and the title (<h3>); the panel holds the text and its source links.
export function Timeline({ entries, variant }: { entries: readonly TimelineView[]; variant: "compact" | "full" }) {
  return (
    <ol className={`site-timeline site-timeline--${variant}`} data-reveal="group">
      {entries.map((entry, index) =>
        variant === "compact" ? (
          <li key={entry.id} className="site-timeline-row" data-reveal>
            <span className="site-timeline-year site-caption">{entry.yearLabel}</span>
            <span className="site-timeline-node" aria-hidden="true" />
            <div>
              <h3 className="site-timeline-title">{entry.title}</h3>
              <p className="site-timeline-text">{entry.body}</p>
            </div>
          </li>
        ) : (
          <li key={entry.id} className="site-timeline-row" data-reveal>
            <span className="site-timeline-node" aria-hidden="true" />
            <Disclosure
              group="journey"
              defaultOpen={index === entries.length - 1}
              reveal={false}
              // A <summary> may hold one heading next to its phrasing content,
              // so the year, the <h3> and the plus sign are its direct children
              // (laid out as a grid in globals.css).
              summary={
                <>
                  <span className="site-timeline-year site-caption">{entry.yearLabel}</span>
                  <h3 className="site-timeline-title">{entry.title}</h3>
                </>
              }
            >
              <p className="site-timeline-text">{entry.body}</p>
              {entry.sources.length > 0 ? (
                <p className="site-timeline-sources">
                  {entry.sources.map((source) => (
                    <TextLink key={source.href + source.label} href={source.href} external>
                      {source.label}
                    </TextLink>
                  ))}
                </p>
              ) : null}
            </Disclosure>
          </li>
        ),
      )}
    </ol>
  );
}
