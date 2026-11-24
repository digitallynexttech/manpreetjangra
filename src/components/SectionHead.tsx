import type { ReactNode } from "react";
import type { Para } from "@/content/types";
import { Accent } from "./Accent";
import { Eyebrow } from "./Eyebrow";
import { ParaText, isPara } from "./ParaText";

/** The heading id of a section: the section uses it for `aria-labelledby`. */
export const titleId = (id: string) => `${id}-title`;

// Section head (spec 4, conventions): eyebrow, heading with its accent
// phrase, optional lede; the 12 / 20 / 40 px spacings come from the classes.
// `id` is the section's id; the heading gets `${id}-title`, so the section
// can point at it: <section id={s.id} aria-labelledby={titleId(s.id)}>.
export function SectionHead({
  id,
  eyebrow,
  title,
  accent,
  lede,
  level = 2,
  tone = "light",
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
  /** A string, a `Para` from the content files, or any node. */
  lede?: string | Pick<Para, "parts"> | ReactNode;
  level?: 1 | 2;
  tone?: "light" | "night";
  className?: string;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className={className ? `site-section-head ${className}` : "site-section-head"} data-reveal>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <Heading id={titleId(id)} className="site-section-title">
        <Accent text={title} accent={accent} />
      </Heading>
      {lede ? <p className="site-lede">{isPara(lede) ? <ParaText para={lede} /> : (lede as ReactNode)}</p> : null}
    </div>
  );
}
