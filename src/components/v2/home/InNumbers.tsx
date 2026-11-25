import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { ParaText } from "@/components/ParaText";
import { hiring, lead, pillars, stats } from "@/content/home";
import { socialLinks } from "@/content/navigation";
import { labels, toV2 } from "@/content/v2";
import { clientStats, clientStory } from "@/content/work";
import { BigCounter } from "../BigCounter";
import { MixedHeading } from "../MixedHeading";
import { NotchCard } from "../NotchCard";
import { ParallaxGroup } from "../ParallaxGroup";
import { PillButton } from "../PillButton";
import { ThreadDraw } from "../ThreadDraw";
import { ThreadField } from "../ThreadField";

// 4.1 item 6, Lando's "Helmets hall of fame": on night, the heading in both
// voices, then notched cards in three columns that drift at different
// speeds on desktop: her LinkedIn proof and the open roles (counters), the
// three things she leads (one link each), and the client story's numbers.
// The "as of" caption sits under the grid. Then a centred call to action,
// Lando's "See more helmets": a small thread mark, one line of existing copy
// and a pill to the Work page.

const pad = (n: number) => String(n + 1).padStart(2, "0");

/** The caption row of a card: what it is on the left, its number on the
 *  right (Lando's "Season 2025"). */
function Caption({ left, right }: { left: string; right: string }) {
  return (
    <>
      <span>{left}</span>
      <span className="v2-numbers-index" aria-hidden="true">{right}</span>
    </>
  );
}

function Column({ speed, children }: { speed: number; children: ReactNode }) {
  return (
    <ul className="v2-numbers-col" data-v2-speed={String(speed)}>
      {children}
    </ul>
  );
}

export function InNumbers() {
  const linkedIn = socialLinks.find((link) => link.key === "linkedin")?.label ?? "";
  return (
    <section className="v2-surface v2-numbers" data-v2-theme="night" aria-labelledby="v2-numbers-title">
      <ThreadField seed={64} count={10} />
      <div className="v2-wrap v2-numbers-inner">
        <MixedHeading
          id="v2-numbers-title"
          size="display"
          parts={[
            { text: labels.inNumbers.sans, voice: "sans" },
            { text: labels.inNumbers.serif, voice: "serif" },
          ]}
        />
        <ParallaxGroup className="v2-numbers-grid">
          <Column speed={0.35}>
            {stats.items.map((item, index) => (
              <li key={item.label}>
                <NotchCard
                  corner={index % 2 ? "tr" : "bl"}
                  className="v2-numbers-card"
                  caption={<Caption left={item.href ? hiring.eyebrow : linkedIn} right={pad(index)} />}
                >
                  <BigCounter value={item.value} label={item.label} />
                  {item.href && item.linkLabel ? (
                    <Link className="v2-numbers-link" href={toV2(item.href)}>
                      {item.linkLabel}
                      <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                    </Link>
                  ) : null}
                </NotchCard>
              </li>
            ))}
          </Column>
          <Column speed={0.9}>
            {pillars.map((pillar, index) => (
              <li key={pillar.index}>
                <Link className={`v2-notch v2-notch--${index % 2 ? "bl" : "tr"} v2-numbers-card v2-numbers-pillar`} href={toV2(pillar.link.href)}>
                  <h3 className="v2-sans v2-numbers-pillar-title">{pillar.title}</h3>
                  <p className="v2-numbers-pillar-body">
                    <ParaText para={pillar.body} />
                  </p>
                  <span className="v2-numbers-link">
                    {pillar.link.label}
                    <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="v2-notch-caption v2-label">
                    <Caption left={lead.eyebrow} right={pillar.index} />
                  </span>
                </Link>
              </li>
            ))}
          </Column>
          <Column speed={0.6}>
            {clientStats.map((item, index) => (
              <li key={item.label}>
                <NotchCard
                  corner={index % 2 ? "bl" : "tr"}
                  className="v2-numbers-card"
                  caption={<Caption left={clientStory.eyebrow} right={pad(index)} />}
                >
                  <BigCounter value={item.value} label={item.label} />
                </NotchCard>
              </li>
            ))}
          </Column>
        </ParallaxGroup>
        <p className="v2-label v2-numbers-asof">{stats.caption}</p>
        <div className="v2-numbers-cta">
          <ThreadDraw variant="underline" shape="line" trigger="scroll" start="top 90%" end="top 60%" className="v2-numbers-mark" />
          <p className="v2-numbers-cta-line">{lead.title}</p>
          <PillButton href={toV2("/work")}>{pillars[0].link.label}</PillButton>
        </div>
      </div>
    </section>
  );
}
