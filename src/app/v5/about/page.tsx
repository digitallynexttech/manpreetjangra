import Image from "next/image";
import { ArrowUpRight, BookOpen, FileText, GraduationCap, Heart, UserRound, Waypoints } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { ParaText } from "@/components/ParaText";
import { V5Button } from "@/components/v5/Button";
import { Chip } from "@/components/v5/Chip";
import { ContactTile } from "@/components/v5/ContactTile";
import { Accented, HeadTile, ledeOf } from "@/components/v5/Heads";
import { PageHeader } from "@/components/v5/PageHeader";
import { QuoteBody } from "@/components/v5/QuoteBody";
import { StackCards, type StackCard } from "@/components/v5/StackCards";
import { Tile, type Tone } from "@/components/v5/Tile";
import { SHOW_DIRECTORSHIP, beliefs, bio, education, intro, journey, meta, story } from "@/content/about";
import { portrait } from "@/content/images";
import { labels, toV5 } from "@/content/v5";
import { v5Metadata } from "@/lib/v5";
import { educationDetail, quoteView, timelineView } from "@/lib/views";

export const metadata = v5Metadata(meta);

// /v5/about (plan/versions-spec.md, V5 "Inner pages", About): the bento
// header with the 2019 portrait as its accent tile; her story as five
// paragraph tiles around a tall night head tile; the journey as stacking
// cards (every milestone with its sources); then one board with what drives
// her (the Women Entrepreneurs Review quote), education, the bio for
// organisers with v1's copy button, and the contact tile. All copy comes
// from src/content/about.ts (and shared.ts for the contact tile); the
// directorship switch and the education gates work as on the classic page.

// Story tiles: the first two columns wide, the rest one; tones in turn.
const STORY_TONES: readonly Tone[] = ["paper", "blush", "paper", "marigold", "paper"];
// Journey cards: light tones in turn, the last ("Now") on night.
const JOURNEY_TONES: readonly Tone[] = ["paper", "blush", "marigold"];

export default function V5About() {
  const bioText = SHOW_DIRECTORSHIP ? bio.text : bio.withoutDirectorship;
  const entries = journey.entries.map(timelineView);
  const count = String(entries.length).padStart(2, "0");
  const paragraphs = story.paragraphs.length;

  const cards: StackCard[] = entries.map((entry, index) => ({
    key: entry.id,
    tone: index === entries.length - 1 ? "night" : JOURNEY_TONES[index % JOURNEY_TONES.length],
    labelledBy: `v5-milestone-${entry.id}`,
    content: (
      <div className="v5-jcard v5-jcard--full">
        <div className="v5-jcard-top">
          <span className="v5-chip">
            {String(index + 1).padStart(2, "0")} {labels.of} {count}
          </span>
          <span className="v5-jcard-dots" aria-hidden="true">
            {entries.map((other, at) => (
              <span key={other.id} data-on={at <= index ? "" : undefined} />
            ))}
          </span>
        </div>
        <p className="v5-jcard-year" data-long={entry.yearLabel.length > 4 ? "" : undefined}>
          {entry.yearLabel}
        </p>
        <div className="v5-jcard-text">
          <h3 id={`v5-milestone-${entry.id}`} className="v5-jcard-title">
            {entry.title}
          </h3>
          <p className="v5-jcard-body">{entry.body}</p>
          {entry.sources.length > 0 ? (
            <ul className="v5-jcard-sources">
              {entry.sources.map((source) => (
                <li key={source.href + source.label}>
                  <a className="v5-source" href={source.href} target="_blank" rel="noopener noreferrer">
                    {source.label}
                    <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
                    <span className="v5-sr">{labels.newTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    ),
  }));

  return (
    <>
      <PageHeader
        icon={<UserRound size={14} strokeWidth={2} aria-hidden="true" />}
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
      >
        <Tile tone="field" intro={2} tileClassName="v5-ph-portrait">
          <figure className="v5-portrait">
            <span className="v5-field v5-depth" aria-hidden="true" />
            <span className="v5-portrait-ring v5-depth" aria-hidden="true" />
            <Image
              className="v5-portrait-figure v5-depth"
              src={portrait.src}
              alt={portrait.alt}
              sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 92vw"
              preload
            />
            <figcaption className="v5-chip v5-chip--glass v5-portrait-caption">{portrait.caption}</figcaption>
          </figure>
        </Tile>
      </PageHeader>

      {/* Her story: a tall night head tile and the five paragraphs as tiles. */}
      <section id={story.id} className="v5-block" aria-labelledby="v5-story-title">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--story">
            <Tile h={2} mdW={2} mdH={1} tone="night" tileClassName="v5-story-head">
              <HeadTile
                id="v5-story-title"
                icon={<BookOpen size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={story.eyebrow}
                title={story.title}
                accent={story.accent}
              />
            </Tile>
            {story.paragraphs.map((paragraph, index) => (
              <Tile
                key={index}
                w={index === 0 ? 2 : 1}
                mdW={index === 0 ? 2 : 1}
                tone={STORY_TONES[index % STORY_TONES.length]}
                tileClassName="v5-para-tile"
              >
                <span className="v5-para-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                  <span>
                    {labels.of} {String(paragraphs).padStart(2, "0")}
                  </span>
                </span>
                <p className="v5-para" data-lead={index === 0 ? "" : undefined}>
                  <ParaText para={paragraph} />
                </p>
              </Tile>
            ))}
          </div>
        </div>
      </section>

      {/* Journey: every milestone as a card; the cards stack as you scroll. */}
      <section id={journey.id} className="v5-block v5-journey" aria-labelledby="v5-journey-title">
        <div className="v5-wrap">
          <header className="v5-head">
            <Chip icon={<Waypoints size={14} strokeWidth={2} aria-hidden="true" />}>{journey.eyebrow}</Chip>
            <h2 id="v5-journey-title" className="v5-title">
              <Accented text={journey.title} accent={journey.accent} />
            </h2>
            {journey.lede ? <p className="v5-lede">{ledeOf(journey.lede)}</p> : null}
          </header>
          <StackCards cards={cards} className="v5-stack--long" />
        </div>
      </section>

      {/* What drives her, education, the bio and the contact tile. */}
      <div className="v5-block">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--about">
            <Tile
              id={beliefs.id}
              w={2}
              h={2}
              mdH={1}
              tone="blush"
              labelledBy="v5-beliefs-title"
              tileClassName="v5-beliefs-tile"
            >
              <HeadTile
                id="v5-beliefs-title"
                icon={<Heart size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={beliefs.eyebrow}
                title={beliefs.title}
                accent={beliefs.accent}
              />
              <QuoteBody quote={quoteView(beliefs.quote.quote, beliefs.quote.linkLabel)} />
              <p className="v5-beliefs-note">{beliefs.paraphrase.text}</p>
              <div className="v5-actions">
                <V5Button href={beliefs.link.href} external={beliefs.link.external} variant="secondary">
                  {beliefs.link.label}
                </V5Button>
              </div>
            </Tile>

            <Tile id={education.id} w={2} tone="paper" labelledBy="v5-education-title" tileClassName="v5-edu-tile">
              <HeadTile
                id="v5-education-title"
                icon={<GraduationCap size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={education.eyebrow}
                title={education.title}
                accent={education.accent}
              />
            </Tile>
            {education.entries.map((entry, index) => {
              const detail = educationDetail(entry);
              return (
                <Tile key={entry.degree} tone={index === 0 ? "marigold" : "paper"} tileClassName="v5-degree-tile">
                  <span className="v5-link-icon" aria-hidden="true">
                    <GraduationCap size={22} strokeWidth={1.75} />
                  </span>
                  <div className="v5-degree">
                    <h3 className="v5-degree-name">{entry.degree}</h3>
                    {/* Only the confirmed parts of "{institution}, {year}";
                        nothing while neither is confirmed. */}
                    {detail ? <p className="v5-degree-detail">{detail}</p> : null}
                  </div>
                </Tile>
              );
            })}

            <Tile id={bio.id} w={2} tone="paper" labelledBy="v5-bio-title" tileClassName="v5-bio-tile">
              <HeadTile
                id="v5-bio-title"
                icon={<FileText size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={bio.eyebrow}
                title={bio.title}
                accent={bio.accent}
              />
              <p className="v5-bio-text">{bioText}</p>
              <div className="v5-bio-actions">
                <CopyButton
                  text={bioText}
                  label={bio.copy.label}
                  doneLabel={bio.copy.doneLabel}
                  failLabel={bio.copy.failLabel}
                />
                <V5Button href={toV5(bio.link.href)} variant="quiet">
                  {bio.link.label}
                </V5Button>
              </div>
            </Tile>

            <ContactTile />
          </div>
        </div>
      </div>
    </>
  );
}
