import type { ReactNode } from "react";
import { ArrowDown } from "lucide-react";
import { Accented } from "./Heads";
import { Chip } from "./Chip";
import { Tile, type Tone } from "./Tile";

// The compact bento header of every inner /v5 page (plan/versions-spec.md,
// V5 "Inner pages": "a title tile, an intro tile and one accent tile"). From
// 1280 px the three sit in one row (title two columns wide); from 768 px the
// title takes the first row and the intro and accent tiles share the second;
// phones stack them. All three play the first-screen entrance (Tile `intro`),
// so nothing waits for scripts. The page passes its accent tile as children,
// with `intro={2}`.

export const PAGE_TITLE_ID = "v5-page-title";

export function PageHeader({
  icon,
  eyebrow,
  title,
  accent,
  lede,
  ledeTone = "blush",
  children,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  accent?: string;
  lede: ReactNode;
  ledeTone?: Tone;
  /** The accent tile. */
  children: ReactNode;
}) {
  return (
    <section className="v5-pagehead v5-wrap" aria-labelledby={PAGE_TITLE_ID}>
      <div className="v5-bento v5-bento--pagehead">
        <Tile w={2} tone="paper" intro={0} tileClassName="v5-ph-title">
          <Chip icon={icon}>{eyebrow}</Chip>
          <h1 id={PAGE_TITLE_ID} className="v5-ph-h1">
            <Accented text={title} accent={accent} />
          </h1>
        </Tile>
        <Tile tone={ledeTone} intro={1} tileClassName="v5-ph-lede">
          <span className="v5-round v5-round--static v5-ph-down" aria-hidden="true">
            <ArrowDown size={20} strokeWidth={2} />
          </span>
          <p className="v5-ph-lede-text">{lede}</p>
        </Tile>
        {children}
      </div>
    </section>
  );
}
