import { Fragment } from "react";
import type { Para } from "@/content/types";

// The highlighter mark (plan/versions-spec.md, V4 palette): marigold drawn
// behind a few phrases, `linear-gradient(transparent 60%, marigold 60%)`,
// swept in as the phrase enters the viewport (v4.css, scroll-driven) or,
// on the cover, once after load. `text` is split once on `phrase`; the
// phrase must be part of the text, or the build fails.
export function Marked({ text, phrase, load = false }: { text: string; phrase?: string; load?: boolean }) {
  if (!phrase) return text;
  const at = text.indexOf(phrase);
  if (at < 0) throw new Error(`Marked phrase "${phrase}" is not part of "${text}"`);
  return (
    <>
      {text.slice(0, at)}
      <mark className={load ? "v4-mark v4-mark--load" : "v4-mark"}>{phrase}</mark>
      {text.slice(at + phrase.length)}
    </>
  );
}

/** A `Para` (plain text and quoted fragments, as `ParaText` renders it)
 *  with the highlighter on one phrase of one of its parts. The phrase must
 *  be part of the paragraph, or the build fails. */
export function MarkedPara({ para, phrase }: { para: Pick<Para, "parts">; phrase: string }) {
  const parts = para.parts.map((part) => ("quote" in part ? part.quote : part.text));
  if (!parts.some((text) => text.includes(phrase))) {
    throw new Error(`Marked phrase "${phrase}" is not part of the paragraph`);
  }
  return (
    <>
      {para.parts.map((part, i) => {
        // As in ParaText: in a quote, each " | " is glued to the word after it.
        const text = "quote" in part ? part.quote.replaceAll(" | ", " | ") : part.text;
        const inner = text.includes(phrase) ? <Marked text={text} phrase={phrase} /> : text;
        return "quote" in part ? <q key={i}>{inner}</q> : <Fragment key={i}>{inner}</Fragment>;
      })}
    </>
  );
}
