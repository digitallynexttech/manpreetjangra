import { LocalTime } from "@/components/LocalTime";
import { hero, journey } from "@/content/home";
import { portrait } from "@/content/images";
import { footer } from "@/content/shared";
import { labels } from "@/content/v2";
import { timelineView } from "@/lib/views";
import { CaptionLabel } from "../CaptionLabel";
import { FieldPortrait } from "../FieldPortrait";
import { MixedHeading } from "../MixedHeading";
import { NotchCard } from "../NotchCard";
import { ThreadField } from "../ThreadField";
import { HeroScene } from "./HomeScenes";

// 4.1 item 1, Lando's hero: her name in the stacked two-voice style at hero
// size, the portrait on its vermilion field standing in front of it (the
// name runs behind the panel), the hero eyebrow as a mono caption, a small
// "now" card bottom left in the manner of Lando's "next race" card, and a
// scroll cue bottom right, all on paper over the thread field.

/** "Chief Operating Officer, Digitally Next" -> role and company. */
function splitTitle(title: string): { role: string; org?: string } {
  const at = title.lastIndexOf(", ");
  return at < 0 ? { role: title } : { role: title.slice(0, at), org: title.slice(at + 2) };
}

export function HomeHero() {
  const [first, ...rest] = hero.name.split(" ");
  const nowEntry = journey.entries.find((entry) => entry.id === "now") ?? journey.entries[journey.entries.length - 1];
  const now = timelineView(nowEntry);
  const { role, org } = splitTitle(now.title);
  // "Since 2025" once her start year is confirmed; until then only "Now".
  const since = now.yearLabel !== nowEntry.year ? now.yearLabel : null;

  return (
    <section className="v2-surface v2-hero" data-v2-theme="paper" aria-labelledby="v2-home-title">
      <ThreadField seed={7} count={12} />
      <HeroScene className="v2-wrap v2-hero-inner">
        <CaptionLabel className="v2-hero-eyebrow" parts={hero.eyebrow.split(" · ")} />
        <MixedHeading
          as="h1"
          id="v2-home-title"
          size="hero"
          stack
          rise="load"
          delay={0.15}
          className="v2-hero-name"
          parts={[
            { text: first, voice: "serif", plain: true },
            { text: rest.join(" "), voice: "sans" },
          ]}
        />
        <div className="v2-hero-stage">
          <div className="v2-hero-panel">
            <FieldPortrait
              portrait={portrait}
              sizes="(min-width: 1024px) 34vw, (min-width: 768px) 60vw, 74vw"
              preload
              plate
            />
          </div>
          <div className="v2-hero-now">
            <NotchCard corner="tr" caption={<LocalTime prefix={footer.place.prefix} />}>
              <CaptionLabel parts={[labels.now, since]} small />
              <p className="v2-hero-now-role v2-sans">{role}</p>
              {org ? <p className="v2-hero-now-org v2-serif">{org}</p> : null}
            </NotchCard>
          </div>
        </div>
        <p className="v2-hero-cue v2-label" aria-hidden="true">
          {labels.scroll}
          <span className="v2-cue-line" />
        </p>
      </HeroScene>
    </section>
  );
}
