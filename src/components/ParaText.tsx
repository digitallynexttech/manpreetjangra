import { Fragment } from "react";
import type { Para } from "@/content/types";

// The parts of a `Para` (content/types.ts): plain text, and her quoted
// fragments as <q>, whose curly marks come from CSS (spec 0.3). The `facts`
// array is never rendered.
export function ParaText({ para }: { para: Pick<Para, "parts"> }) {
  return (
    <>
      {para.parts.map((part, i) =>
        "quote" in part ? <q key={i}>{part.quote}</q> : <Fragment key={i}>{part.text}</Fragment>,
      )}
    </>
  );
}

/** True for a `Para` object (as opposed to a string or a React node). */
export function isPara(value: unknown): value is Pick<Para, "parts"> {
  return typeof value === "object" && value !== null && "parts" in value && Array.isArray((value as Para).parts);
}
