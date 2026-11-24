import type { TimelineView } from "@/content/types";

// The journey timeline (spec 4.1.4, 6.10), oldest first. Compact: static rows
// of year (left rail, mono, tabular), node (an 8 px vermilion square on the
// 1 px spine) and title with one line. The list is a reveal group: when it
// comes into view the spine draws top-down (1.2 s), the rows rise one after
// another and each node pops in with its row (globals.css, "The journey
// spine"). The full variant for About (each entry a Disclosure) is added
// with the About page (M5).
export function Timeline({ entries, variant }: { entries: readonly TimelineView[]; variant: "compact" }) {
  return (
    <ol className={`site-timeline site-timeline--${variant}`} data-reveal="group">
      {entries.map((entry) => (
        <li key={entry.id} className="site-timeline-row" data-reveal>
          <span className="site-timeline-year site-caption">{entry.yearLabel}</span>
          <span className="site-timeline-node" aria-hidden="true" />
          <div>
            <h3 className="site-timeline-title">{entry.title}</h3>
            <p className="site-timeline-text">{entry.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
