import { HiringPill } from "@/components/HiringPill";
import { ParaText } from "@/components/ParaText";
import { hiring } from "@/content/home";
import { hasRoles, roles } from "@/content/roles";
import { Marquee } from "../Marquee";
import { MixedHeading } from "../MixedHeading";
import { PillButton } from "../PillButton";
import { ThreadDraw } from "../ThreadDraw";
import { mixParts } from "../parts";

// 4.1 item 8, Lando's "Partners & campaigns": on paper, the hiring heading
// in both voices with a giant vermilion flourish drawn behind it by the
// scroll (his "Collabs"), the live Hiring pill, the job-post line, the two
// ways in (open roles, careers@), and the job-post lines running past in a
// strip where Lando shows partner logos. Without open roles the pill drops
// out and the button becomes "How I hire", as on the classic home page.

export function Hiring() {
  const button = hasRoles ? hiring.button : hiring.buttonEmpty;
  return (
    <section className="v2-surface v2-hiring" data-v2-theme="paper" aria-labelledby="v2-hiring-title">
      <div className="v2-wrap v2-hiring-grid">
        <div className="v2-hiring-head">
          <ThreadDraw variant="word" tone="vermilion" start="top 85%" end="bottom 30%" className="v2-hiring-flourish" />
          {hasRoles ? <HiringPill count={roles.length} className="v2-hiring-pill" /> : null}
          <MixedHeading id="v2-hiring-title" size="manifesto" parts={mixParts(hiring.title, ["learn."])} className="v2-hiring-title" />
        </div>
        <div className="v2-hiring-side">
          <p className="v2-hiring-lede"><ParaText para={hiring.lede} /></p>
          <div className="v2-hiring-actions">
            <PillButton href={button.href} variant="outline">
              {button.label}
            </PillButton>
            <PillButton href={hiring.email.href} variant="outline">
              {hiring.email.label}
            </PillButton>
          </div>
        </div>
      </div>
      <Marquee
        className="v2-hiring-marquee"
        itemClassName="v2-sans"
        label={hiring.listTitle}
        duration={48}
        items={hiring.list.map((line) => (
          <q key={line.text} className="v2-quote">
            {line.text}
          </q>
        ))}
      />
    </section>
  );
}
