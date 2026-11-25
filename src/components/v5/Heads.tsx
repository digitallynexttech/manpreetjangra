import { Fragment, type ReactNode } from "react";
import type { Para } from "@/content/types";
import { ParaText } from "@/components/ParaText";
import { splitAccent } from "@/lib/v5";
import { Chip } from "./Chip";

// Heading pieces shared by the /v5 pages (server components): a heading with
// its accent phrase coloured, a section head inside a tile, a lede that may
// be a paragraph with quoted parts, and a handle or title that may break
// after a slash. The words always come from the content files unchanged.

/** A section lede: plain text, or a paragraph with quoted parts. */
export function ledeOf(lede: string | Para | undefined): ReactNode {
  return typeof lede === "string" ? lede : lede ? <ParaText para={lede} /> : undefined;
}

/** A handle or title may break after a slash ("linkedin.com/in/" then the
 *  name, "E-Commerce/" then "Digital-Social Media"), never inside a word.
 *  The text itself stays verbatim. */
export function breakAfterSlashes(text: string) {
  return text.split("/").map((part, index, parts) => (
    <Fragment key={index}>
      {part}
      {index < parts.length - 1 ? (
        <>
          /<wbr />
        </>
      ) : null}
    </Fragment>
  ));
}

/** A heading with its accent phrase in the accent colour. */
export function Accented({ text, accent }: { text: string; accent?: string }) {
  const parts = splitAccent(text, accent);
  return (
    <>
      {parts.before}
      {parts.accent ? <span className="v5-accent">{parts.accent}</span> : null}
      {parts.after}
    </>
  );
}

/** A section head inside a tile: chip, H2 and lede, then any children. */
export function HeadTile({
  id,
  icon,
  eyebrow,
  title,
  accent,
  lede,
  children,
}: {
  id: string;
  icon: ReactNode;
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="v5-headtile">
      <Chip icon={icon}>{eyebrow}</Chip>
      <h2 id={id} className="v5-title">
        <Accented text={title} accent={accent} />
      </h2>
      {lede ? <p className="v5-lede">{lede}</p> : null}
      {children}
    </div>
  );
}
