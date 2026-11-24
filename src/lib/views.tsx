import { ParaText } from "@/components/ParaText";
import { quotes, type QuoteId } from "@/content/quotes";
import {
  isConfirmed,
  type EducationEntry,
  type QuoteView,
  type TimelineEntry,
  type TimelineView,
  type Venture,
  type VentureView,
} from "@/content/types";
import { attributionOf } from "./site";

// View builders (spec 7.3, 7.5): they turn content objects into the plain
// props the components take, with no `facts` arrays and no `{{CONFIRM`
// strings. Server only: this file imports content values, so a client
// component must never import it.

/** A timeline entry as `Timeline` renders it. The year label is the entry's
 *  `year` ("Now") until its `since` year is confirmed, then "Since {year}"
 *  (spec 4.1.4, 4.8 C1). */
export function timelineView(entry: TimelineEntry): TimelineView {
  return {
    id: entry.id,
    yearLabel: isConfirmed(entry.since) ? `Since ${entry.since}` : entry.year,
    title: entry.title,
    body: <ParaText para={entry.body} />,
    sources: (entry.sources ?? []).map(({ label, href }) => ({ label, href })),
  };
}

/** A quote from the registry as `QuoteCard` renders it. The attribution is
 *  always built by `attributionOf`, never typed per use (spec 6.7). */
export function quoteView(id: QuoteId, linkLabel?: string): QuoteView {
  const quote = quotes[id];
  return {
    text: quote.text,
    theme: "theme" in quote ? quote.theme : undefined,
    attribution: attributionOf(quote),
    href: quote.href,
    linkLabel,
  };
}

/** A venture row as `VentureList` (a client component) receives it: no fact
 *  ids, plus the hostname shown in the preview window's bar (spec 4.3.7). */
export function ventureView(venture: Venture): VentureView {
  return {
    name: venture.name,
    href: venture.href,
    hostname: new URL(venture.href).hostname,
    category: venture.category,
    role: venture.role,
    preview: venture.preview,
    previewAlt: venture.previewAlt,
  };
}

/** The right column of an education row (spec 4.2.5, 4.8 C2 C3): the
 *  confirmed parts of `{institution}, {year}`, or "" while neither is
 *  confirmed (the column then stays empty, with no fallback text). */
export function educationDetail(entry: EducationEntry): string {
  return [entry.institution, entry.year].filter(isConfirmed).join(", ");
}
