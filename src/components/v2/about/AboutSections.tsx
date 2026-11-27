import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { ParaText, isPara } from "@/components/ParaText";
import { SHOW_DIRECTORSHIP, beliefs, bio, education, intro, journey, story } from "@/content/about";
import { hero, journey as homeJourney } from "@/content/home";
import { portrait } from "@/content/images";
import type { Para } from "@/content/types";
import { labels } from "@/content/v2";
import { educationDetail, quoteView, timelineView } from "@/lib/views";
import { BigFigure } from "../BigFigure";
import { BigRows } from "../BigRows";
import { CaptionLabel } from "../CaptionLabel";
import { FieldPortrait } from "../FieldPortrait";
import { MixedHeading } from "../MixedHeading";
import { NightCurve } from "../NightCurve";
import { NotchCard } from "../NotchCard";
import { ParallaxGroup } from "../ParallaxGroup";
import { PillButton } from "../PillButton";
import { QuoteFigure } from "../QuoteFigure";
import { Reveal } from "../Reveal";
import { ThreadDraw } from "../ThreadDraw";
import { ThreadField } from "../ThreadField";
import { ThreadMark } from "../ThreadMark";
import { V2PageHero } from "../V2PageHero";
import { WordReveal } from "../WordReveal";
import { mixParts } from "../parts";

// The sections of /v2/about (plan/v2-spec.md 4.2, 4.3), Lando's "On Track"
// page in her record. Every word comes from src/content/about.ts (and two
// lines from home.ts and images.ts named where they are used); the column
// headings are labels from content/v2.ts.

const titleId = (id: string) => `v2-${id}-title`;

/** A paragraph as one string, its quoted fragments in curly marks (the
 *  marks the classic page draws around them with <q>). */
const paraString = (para: Pick<Para, "parts">) =>
  para.parts.map((part) => ("quote" in part ? `“${part.quote}”` : part.text)).join("");

/** 1. The page title "HER STORY" (her story's own label, spec 4.3), with
 *  the scribble under HER; the meta row is the home eyebrow's three facts;
 *  the classic intro title sits over the lede as a small line. */
export function AboutHero() {
  return (
    <V2PageHero
      id="v2-about-title"
      // HER in the serif voice in ink, with the vermilion scribble under it
      // (the header pill, the scribble and the lede's last phrase are the
      // screen's three reds).
      title={mixParts(story.eyebrow, [story.eyebrow.split(" ")[0]]).map((part) =>
        part.voice === "serif" ? { ...part, plain: true, mark: "underline" as const } : part,
      )}
      meta={hero.eyebrow.split(" · ")}
      ledeLabel={intro.title}
      lede={intro.lede}
      accent="building its AI Decision and Acceleration Center."
      fitWide={0.992}
    />
  );
}

/** 2. Her story. On night: the first paragraph's first sentence as the
 *  manifesto (lighting up word by word, her first title in the serif voice),
 *  the rest of the paragraph under it, then the giant "2017" with the home
 *  journey's first-title line. On paper: the portrait on its field beside
 *  the other four paragraphs. */
export function AboutStory() {
  const [first, ...rest] = story.paragraphs;
  const whole = paraString(first);
  const cut = whole.indexOf(". ") + 1;
  const [opening, closing] = cut > 0 ? [whole.slice(0, cut), whole.slice(cut).trim()] : [whole, ""];
  const quoted = first.parts.find((part): part is { quote: string } => "quote" in part);
  const firstEntry = journey.entries.find((entry) => entry.id === "2017");
  const firstLine = homeJourney.entries.find((entry) => entry.id === "2017")?.body.parts[0];
  const figureLabel = firstLine && "text" in firstLine ? firstLine.text.split(",")[0] : "";
  return (
    <section id={story.id} className="v2-about-story" aria-labelledby={titleId(story.id)}>
      <div className="v2-surface v2-inner-manifesto" data-v2-theme="night">
        <ThreadField seed={41} count={10} />
        <div className="v2-wrap v2-inner-manifesto-inner">
          <div className="v2-inner-manifesto-head">
            <ThreadMark />
            <h2 id={titleId(story.id)} className="v2-label">
              {story.title}
            </h2>
          </div>
          <WordReveal
            text={opening}
            accent={quoted ? `“${quoted.quote}”` : undefined}
            size="title"
            className="v2-inner-manifesto-text"
          />
          {closing ? <p className="v2-lede v2-inner-manifesto-after">{closing}</p> : null}
        </div>
        {firstEntry && figureLabel ? (
          <div className="v2-wrap v2-inner-figure">
            <BigFigure value={firstEntry.year} label={figureLabel} />
          </div>
        ) : null}
      </div>
      <div className="v2-surface v2-about-story-rest" data-v2-theme="paper">
        <ThreadField seed={44} count={9} />
        <div className="v2-wrap v2-about-story-grid">
          <ParallaxGroup className="v2-about-story-photo" small={0}>
            <figure data-v2-speed="0.25">
              <FieldPortrait portrait={portrait} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 44vw, 80vw" plate />
              <figcaption>
                <CaptionLabel parts={[portrait.caption]} />
              </figcaption>
            </figure>
          </ParallaxGroup>
          <Reveal className="v2-about-story-text v2-body" items="p">
            {rest.map((paragraph, index) => (
              <p key={index}>
                <ParaText para={paragraph} />
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** 3. Journey: Lando's results tables. Big rows (year, milestone), oldest
 *  first, each opening to its details and sources; one open at a time, and
 *  the last ("Now") starts open, as on the classic page. */
export function AboutJourney() {
  const views = journey.entries.map(timelineView);
  const lede = journey.lede;
  return (
    <section id={journey.id} className="v2-surface v2-inner-section v2-about-journey" data-v2-theme="night" aria-labelledby={titleId(journey.id)}>
      <ThreadField seed={52} count={11} />
      <div className="v2-wrap">
        <div className="v2-inner-head">
          <div>
            <p className="v2-label v2-inner-eyebrow">{journey.eyebrow}</p>
            <MixedHeading id={titleId(journey.id)} size="display" parts={mixParts(journey.title, ["2016 to now."])} />
          </div>
          {lede ? <p className="v2-body v2-inner-head-lede">{isPara(lede) ? <ParaText para={lede} /> : lede}</p> : null}
        </div>
        <Reveal items=".v2-row" y={28}>
          <BigRows
            group="v2-about-journey"
            className="v2-about-journey-rows"
            columns={[
              { header: labels.year, width: "clamp(6.5rem, 15vw, 15rem)" },
              { header: labels.milestone, width: "minmax(0, 1fr)" },
            ]}
            rows={views.map((view, index) => ({
              key: view.id,
              cells: [view.yearLabel, view.title],
              open: index === views.length - 1,
              detail: (
                <>
                  <p className="v2-body v2-about-journey-text">{view.body}</p>
                  {view.sources.length > 0 ? (
                    <p className="v2-about-journey-sources">
                      {view.sources.map((source) => (
                        <a key={source.href + source.label} className="v2-link" href={source.href} target="_blank" rel="noopener noreferrer">
                          {source.label}
                          <span className="v2-sr-only">{labels.newTab}</span>
                          <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                        </a>
                      ))}
                    </p>
                  ) : null}
                </>
              ),
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}

/** 4. What drives her: the heading in both voices, her Women Entrepreneurs
 *  Review line in the serif italic with a vermilion underline drawn by the
 *  scroll, then the magazine's own summary (named, never in quotation
 *  marks) and the link to the feature. */
export function AboutBeliefs() {
  return (
    <section
      id={beliefs.id}
      className="v2-surface v2-surface--blush v2-inner-section v2-about-beliefs"
      data-v2-theme="paper"
      aria-labelledby={titleId(beliefs.id)}
    >
      <NightCurve />
      <div className="v2-wrap v2-about-beliefs-inner">
        <p className="v2-label v2-inner-eyebrow">{beliefs.eyebrow}</p>
        <MixedHeading id={titleId(beliefs.id)} size="display" align="center" parts={mixParts(beliefs.title, ["in the mind."])} />
        <Reveal className="v2-about-beliefs-quote">
          <QuoteFigure quote={quoteView(beliefs.quote.quote, beliefs.quote.linkLabel)} size="large">
            <ThreadDraw variant="underline" shape="wave" trigger="scroll" start="top 85%" end="top 45%" className="v2-about-beliefs-line" />
          </QuoteFigure>
        </Reveal>
        <p className="v2-body v2-about-beliefs-summary">{beliefs.paraphrase.text}</p>
        <PillButton href={beliefs.link.href} newTabLabel={labels.newTab}>
          {beliefs.link.label}
        </PillButton>
      </div>
    </section>
  );
}

/** 5. Education: Lando's list of titles with laurels, as two columns with a
 *  small thread mark each. The second line shows only what she has
 *  confirmed (institution, year), and nothing while neither is. */
export function AboutEducation() {
  return (
    <section id={education.id} className="v2-surface v2-inner-section v2-about-education" data-v2-theme="paper" aria-labelledby={titleId(education.id)}>
      <div className="v2-wrap v2-inner-split">
        <div>
          <p className="v2-label v2-inner-eyebrow">{education.eyebrow}</p>
          <MixedHeading id={titleId(education.id)} size="title" parts={mixParts(education.title, ["then management."])} />
        </div>
        <Reveal as="ul" className="v2-about-edu" items="li">
          {education.entries.map((entry) => {
            const detail = educationDetail(entry);
            return (
              <li key={entry.degree} className="v2-about-edu-item">
                <ThreadMark className="v2-about-edu-mark" />
                <h3 className="v2-sans v2-about-edu-degree">{entry.degree}</h3>
                {detail ? <p className="v2-label v2-about-edu-detail">{detail}</p> : null}
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/** 6. Bio for organisers: the short bio in a notched card, with the classic
 *  copy button and the way to ask for more. */
export function AboutBio() {
  const bioText = SHOW_DIRECTORSHIP ? bio.text : bio.withoutDirectorship;
  return (
    <section id={bio.id} className="v2-surface v2-inner-section v2-about-bio" data-v2-theme="paper" aria-labelledby={titleId(bio.id)}>
      <div className="v2-wrap v2-inner-split v2-inner-split--rule">
        <div>
          <p className="v2-label v2-inner-eyebrow">{bio.eyebrow}</p>
          <MixedHeading id={titleId(bio.id)} size="title" parts={mixParts(bio.title, ["you can use."], { plain: true })} />
        </div>
        <Reveal>
          <NotchCard corner="tr" className="v2-about-bio-card">
            <p className="v2-about-bio-text">{bioText}</p>
            <CopyButton text={bioText} label={bio.copy.label} doneLabel={bio.copy.doneLabel} failLabel={bio.copy.failLabel} />
            <Link className="v2-link" href={bio.link.href}>
              {bio.link.label}
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Link>
          </NotchCard>
        </Reveal>
      </div>
    </section>
  );
}
