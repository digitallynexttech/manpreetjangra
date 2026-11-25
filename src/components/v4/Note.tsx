import type { ReactNode } from "react";
import { labels } from "@/content/v4";

// Sidenotes (plan/versions-spec.md, V4 layout): the source and date of a
// claim, set in Geist Mono 11 px. From 1024 px the page places them in the
// margin column beside their text; below that they follow the text as
// footnotes. `NoteRef` is the superscript number in the text; it is hidden
// from screen readers, which read the note itself (role "note", named
// "Note 1") right after the text it belongs to.

export function NoteRef({ n }: { n: number }) {
  return (
    <sup className="v4-ref" aria-hidden="true">
      {n}
    </sup>
  );
}

export function Note({ n, children, className }: { n: number; children: ReactNode; className?: string }) {
  return (
    <div className={className ? `v4-note ${className}` : "v4-note"} role="note" aria-label={`${labels.note} ${n}`}>
      <span className="v4-note-n" aria-hidden="true">
        {n}
      </span>
      <div className="v4-note-body">{children}</div>
    </div>
  );
}

/** A link inside a note; external ones open in a new tab. */
export function NoteLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="v4-sr-only">{labels.newTab}</span>
    </a>
  ) : (
    <a href={href}>{children}</a>
  );
}
