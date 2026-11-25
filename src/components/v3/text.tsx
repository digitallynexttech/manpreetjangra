import { Fragment, type ReactNode } from "react";
import { ParaText } from "@/components/ParaText";
import type { Para } from "@/content/types";

// Small text helpers for /v3 server components. They only style existing
// copy; not a letter is changed.

/** `text` with its `accent` phrase set in italic marigold (the classic
 *  accent rule, in the /v3 voice). Without an accent, or when the phrase is
 *  not in the text, the text comes back as it is. */
export function withAccent(text: string, accent?: string): ReactNode {
  if (!accent) return text;
  const at = text.indexOf(accent);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <em>{accent}</em>
      {text.slice(at + accent.length)}
    </>
  );
}

/** Her name as a title: the first name in roman, the rest in italic. */
export function titleName(name: string): ReactNode {
  const [first, ...rest] = name.split(" ");
  return (
    <>
      {first}
      {rest.length > 0 ? (
        <>
          {" "}
          <em>{rest.join(" ")}</em>
        </>
      ) : null}
    </>
  );
}

/** "29K+" -> { digits: "29", suffix: "K+" }: the counting part and the rest. */
export function splitStat(value: string): { digits: string; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  return match ? { digits: match[1], suffix: match[2] } : { digits: "", suffix: value };
}

/** Lines joined back with spaces, each in its own span (subtitles). */
export function lineSpans(lines: readonly string[], className: string, attribute: string): ReactNode {
  return lines.map((line, index) => (
    <Fragment key={index}>
      <span className={className} {...{ [attribute]: "" }}>
        {line}
      </span>
      {index < lines.length - 1 ? " " : null}
    </Fragment>
  ));
}

/** A section lede, which the content files give as a string or a `Para`. */
export function ledeText(lede: string | Para | undefined): ReactNode {
  if (!lede) return null;
  return typeof lede === "string" ? lede : <ParaText para={lede} />;
}
