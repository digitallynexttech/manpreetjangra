import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Fragment } from "react";
import { ParaText } from "@/components/ParaText";
import { podium } from "@/content/images";
import { socialLinks } from "@/content/navigation";
import { isConfirmed } from "@/content/types";
import { labels, toV2 } from "@/content/v2";
import { articles, entryLevel, featured, intro, japanSession, stage, themes } from "@/content/writing";
import { quoteView } from "@/lib/views";
import { BigRows } from "../BigRows";
import { CaptionLabel } from "../CaptionLabel";
import { MixedHeading } from "../MixedHeading";
import { NotchCard } from "../NotchCard";
import { ParallaxGroup } from "../ParallaxGroup";
import { PillButton } from "../PillButton";
import { Reveal } from "../Reveal";
import { ThreadDraw } from "../ThreadDraw";
import { ThreadField } from "../ThreadField";
import { ThreadMark } from "../ThreadMark";
import { V2PageHero } from "../V2PageHero";
import { WordReveal } from "../WordReveal";
import { PodiumScene } from "../home/HomeScenes";
import { mixParts } from "../parts";

// The sections of /v2/writing (plan/v2-spec.md 4.2, 4.5), third-person
// annotations around her own words, always verbatim. Every word comes from
// src/content/writing.ts (her quotations from quotes.ts through quoteView,
// the outlet names from navigation.ts); the column headings are labels from
// content/v2.ts. Three items wait for her answers and render only when every
// field they need is confirmed, exactly as on the classic page: the
// Lokmat Times reprint (C4), the Japanese delegation session (C5) and the
// podium photo's event (C6).

const titleId = (id: string) => `v2-${id}-title`;

/** An article title may break after a slash ("E-COMMERCE/" then
 *  "DIGITAL-SOCIAL MEDIA") rather than inside a hyphenated word, as on the
 *  classic page; at the big row size a hyphenated word is also kept whole.
 *  The stored title stays verbatim. */
function breakAfterSlashes(title: string) {
  const keepWhole = (part: string) =>
    part.split(/(\S*-\S*)/).map((piece, index) =>
      piece.includes("-") ? (
        <span key={index} className="v2-nowrap">
          {piece}
        </span>
      ) : (
        piece
      ),
    );
  return title.split("/").map((part, index, parts) => (
    <Fragment key={index}>
      {keepWhole(part)}
      {index < parts.length - 1 ? (
        <>
          /<wbr />
        </>
      ) : null}
    </Fragment>
  ));
}

/** 1. "HER WORDS" on night (the home page's label for this page) with the
 *  scribble under HER; the meta row names where her words appear (the
 *  magazine, LinkedIn, Instagram); the classic intro title sits over the
 *  lede, whose invitation to speak is the serif phrase. */
export function WritingHero() {
  return (
    <V2PageHero
      id="v2-writing-title"
      theme="night"
      title={[
        { text: labels.herWords.serif, voice: "serif", plain: true, mark: "underline" },
        { text: labels.herWords.sans, voice: "sans" },
      ]}
      meta={[featured.outlet, ...socialLinks.map((link) => link.label)]}
      ledeLabel={intro.title}
      lede={intro.lede}
      accent="with an open invitation to speak."
      fitWide={1.091}
    />
  );
}

/** 2. Featured: the August 2026 Women Entrepreneurs Review feature. On
 *  night, the outlet, the article title (the section heading), its byline
 *  and her section stay in view on the left while her words pass on the
 *  right as a huge serif pull quote, lighting up word by word, with a
 *  marigold thread drawn under it; then the magazine's own summary and the
 *  link to the feature. The C4 reprint follows only once it is confirmed. */
export function WritingFeatured() {
  const quote = quoteView(featured.quote.quote);
  const showEntryLevel = entryLevel.gate.every(isConfirmed);
  return (
    <section id={featured.id} className="v2-surface v2-inner-section v2-writing-featured" data-v2-theme="night" aria-labelledby={titleId(featured.id)}>
      <ThreadField seed={113} count={10} />
      <div className="v2-wrap v2-writing-featured-grid">
        <div className="v2-writing-featured-meta">
          <div className="v2-writing-featured-label">
            <ThreadMark />
            <p className="v2-label">{featured.eyebrow}</p>
          </div>
          <p className="v2-serif-italic v2-writing-featured-outlet">{featured.outlet}</p>
          <h2 id={titleId(featured.id)} className="v2-sans v2-writing-featured-title">
            {featured.title}
          </h2>
          <p className="v2-label">{featured.byline}</p>
          <p className="v2-body v2-writing-featured-her">{featured.herSection}</p>
          <PillButton href={featured.link.href} newTabLabel={labels.newTab}>
            {featured.link.label}
          </PillButton>
        </div>
        <figure className="v2-writing-featured-words">
          <blockquote cite={featured.link.href}>
            <WordReveal text={quote.text} voice="quote" dim={0.4} align="start" size="title" className="v2-writing-featured-quote" />
          </blockquote>
          <ThreadDraw variant="loop" className="v2-writing-featured-loop" start="top 95%" end="center 50%" />
          <figcaption className="v2-body v2-writing-featured-summary">
            <ParaText para={featured.summary} />
          </figcaption>
        </figure>
      </div>

      {/* C4: the Lokmat Times reprint of her entry-level post. */}
      {showEntryLevel ? (
        <div className="v2-wrap v2-writing-featured-grid v2-writing-featured-grid--second">
          <div className="v2-writing-featured-meta">
            <p className="v2-serif-italic v2-writing-featured-outlet">{entryLevel.outlet}</p>
            <h3 className="v2-sans v2-writing-featured-title">{entryLevel.headline}</h3>
            <p className="v2-label">{entryLevel.edition}</p>
            <p className="v2-body v2-writing-featured-her">{entryLevel.summary}</p>
            <PillButton href={entryLevel.href} variant="outline" newTabLabel={labels.newTab}>
              {entryLevel.linkLabel}
            </PillButton>
          </div>
          <div className="v2-writing-featured-words">
            {entryLevel.quotes.map((line) => (
              <p key={line} className="v2-writing-featured-line">
                <q className="v2-quote">{line}</q>
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

/** Card grounds of the themes collage, in order (night cards read on-night
 *  text), and how fast each column drifts on desktop. */
const THEME_GROUNDS = ["paper", "raised", "blush", "raised", "blush", "paper"] as const;
const COLUMN_SPEEDS = ["0.1", "0.5", "0.25"] as const;

/** 3. Themes: six of her lines, each under the theme it speaks to, as an
 *  offset collage of notched cards on sand (Lando's scattered frames): three
 *  columns at different heights drifting at different speeds on desktop, a
 *  staggered stack on phones. */
export function WritingThemes() {
  return (
    <section id={themes.id} className="v2-surface v2-surface--sand v2-inner-section v2-writing-themes" data-v2-theme="paper" aria-labelledby={titleId(themes.id)}>
      <div className="v2-wrap">
        <div className="v2-inner-head v2-inner-head--wide">
          <div>
            <p className="v2-label v2-inner-eyebrow">{themes.eyebrow}</p>
            <MixedHeading id={titleId(themes.id)} size="display" parts={mixParts(themes.title, ["coming back to."])} />
          </div>
        </div>
        <ParallaxGroup as="ul" className="v2-writing-collage" small={0}>
          {themes.items.map((ref, index) => {
            const quote = quoteView(ref.quote, ref.linkLabel ?? themes.linkLabel);
            const ground = THEME_GROUNDS[index % THEME_GROUNDS.length];
            return (
              <li
                key={ref.quote}
                className={`v2-writing-theme v2-writing-theme--${ground}`}
                data-v2-theme={ground === "raised" ? "night" : "paper"}
                data-v2-speed={COLUMN_SPEEDS[index % COLUMN_SPEEDS.length]}
              >
                <NotchCard as="figure" corner={index % 2 ? "tr" : "bl"} className="v2-writing-theme-card">
                  {quote.theme ? <h3 className="v2-sans v2-writing-theme-name">{quote.theme}</h3> : null}
                  <blockquote>
                    <p className="v2-writing-theme-quote">
                      <q className="v2-quote">{quote.text}</q>
                    </p>
                  </blockquote>
                  <figcaption className="v2-label v2-writing-theme-cite">{quote.attribution}</figcaption>
                  {quote.href && quote.linkLabel ? (
                    <a className="v2-link v2-writing-theme-link" href={quote.href} target="_blank" rel="noopener noreferrer">
                      {quote.linkLabel}
                      <span className="v2-sr-only">{labels.newTab}</span>
                      <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                    </a>
                  ) : null}
                </NotchCard>
              </li>
            );
          })}
        </ParallaxGroup>
      </div>
    </section>
  );
}

/** 4. Articles: her three long-form LinkedIn articles, newest first, as
 *  Lando's results table: date, the title with its summary (and her line,
 *  where there is one), and where it was published. A row that is still
 *  online opens it in a new tab; the one that is not says so in place of the
 *  outlet. */
export function WritingArticles() {
  const linkedIn = socialLinks.find((link) => link.key === "linkedin")?.label ?? "";
  return (
    <section id={articles.id} className="v2-surface v2-inner-section v2-writing-articles" data-v2-theme="paper" aria-labelledby={titleId(articles.id)}>
      <ThreadField seed={127} count={9} />
      <div className="v2-wrap">
        <div className="v2-inner-head">
          <div>
            <p className="v2-label v2-inner-eyebrow">{articles.eyebrow}</p>
            <MixedHeading id={titleId(articles.id)} size="display" parts={mixParts(articles.title, ["on LinkedIn."])} />
          </div>
          <p className="v2-body v2-inner-head-lede">{articles.note}</p>
        </div>
        <Reveal items=".v2-row" y={28}>
          <BigRows
            className="v2-writing-rows"
            newTabLabel={labels.newTab}
            columns={[
              { header: labels.date, width: "clamp(6.5rem, 11vw, 11rem)", kind: "small" },
              { header: labels.article, width: "minmax(0, 1fr)" },
              { header: labels.outlet, width: "clamp(7rem, 14vw, 14rem)", kind: "small" },
            ]}
            rows={articles.items.map((article) => ({
              key: article.id,
              href: article.href,
              cells: [
                <time key="date" dateTime={article.date}>
                  {article.dateLabel}
                </time>,
                <span key="title" className="v2-writing-article">
                  <span className="v2-writing-article-title">{breakAfterSlashes(article.title)}</span>
                  <span className="v2-writing-article-summary">{article.summary}</span>
                  {article.quote ? (
                    <span className="v2-writing-article-quote">
                      <q className="v2-quote">{article.quote}</q>
                    </span>
                  ) : null}
                </span>,
                article.href ? linkedIn : (article.note ?? linkedIn),
              ],
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}

/** 5. On stage: her podium photograph opens from an inset window to the
 *  full screen (pinned on desktop), the way Lando's photo grows to full
 *  bleed; its event is named under it once she confirms it (C6). Then, on
 *  paper, the invitation: the heading, the paragraph, the C5 session row
 *  when confirmed, and "Invite her to speak", the page's one primary
 *  button, to the contact form with Speaking chosen. */
export function WritingStage() {
  const showJapanSession = japanSession.gate.every(isConfirmed);
  const captionId = "v2-stage-photo-title";
  return (
    <>
      <section className="v2-podium v2-writing-podium" data-v2-theme="paper" aria-labelledby={captionId}>
        <PodiumScene className="v2-podium-stage">
          <figure className="v2-podium-frame" data-v2-theme="night">
            <div className="v2-podium-backdrop" aria-hidden="true">
              <Image src={podium.src} alt="" width={podium.width} height={podium.height} sizes="40vw" />
            </div>
            <div className="v2-podium-photo">
              <Image src={podium.src} alt={podium.alt} width={podium.width} height={podium.height} sizes="(min-width: 1024px) 400px, 80vw" />
            </div>
            <figcaption className="v2-podium-caption">
              {/* C6: the event joins the label once she names it. */}
              <CaptionLabel as="h2" id={captionId} parts={[stage.eyebrow, isConfirmed(stage.photoEvent) ? stage.photoEvent : null]} />
            </figcaption>
          </figure>
        </PodiumScene>
      </section>

      <section id={stage.id} className="v2-surface v2-inner-section v2-writing-invite" data-v2-theme="paper" aria-labelledby={titleId(stage.id)}>
        <ThreadField seed={139} count={10} />
        <div className="v2-wrap v2-writing-invite-inner">
          <MixedHeading id={titleId(stage.id)} size="display" align="center" parts={mixParts(stage.title, ["conversations."])} />
          <Reveal as="p" className="v2-lede v2-writing-invite-text">
            {stage.paragraph}
          </Reveal>

          {/* C5: the Japanese delegation session, in her own account. */}
          {showJapanSession ? (
            <Reveal className="v2-writing-session">
              <p className="v2-label">{japanSession.date}</p>
              <h3 className="v2-sans v2-writing-session-title">{japanSession.title}</h3>
              <p className="v2-body v2-writing-session-line">
                {japanSession.line
                  .replace("{role}", japanSession.role)
                  .replace("{venue}", japanSession.venue)
                  .replace("{organiser}", japanSession.organiser)}
              </p>
              <p className="v2-writing-session-quote">
                <q className="v2-quote">{japanSession.quote}</q>
              </p>
              <a className="v2-link" href={japanSession.href} target="_blank" rel="noopener noreferrer">
                {japanSession.linkLabel}
                <span className="v2-sr-only">{labels.newTab}</span>
                <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
              </a>
            </Reveal>
          ) : null}

          <PillButton href={toV2(stage.button.href)} size="large">
            {stage.button.label}
          </PillButton>
        </div>
      </section>
    </>
  );
}
