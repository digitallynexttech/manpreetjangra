import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ParaText } from "@/components/ParaText";
import { ChapterHead, kickerOf } from "@/components/v4/ChapterHead";
import { ScrubFigure } from "@/components/v4/Figure";
import { Marked } from "@/components/v4/Mark";
import { NUMERALS, SectionFront, type FrontItem } from "@/components/v4/SectionFront";
import { podium } from "@/content/images";
import { isConfirmed } from "@/content/types";
import { labels, toV4 } from "@/content/v4";
import { articles, entryLevel, featured, intro, japanSession, meta, stage, themes } from "@/content/writing";
import { v4Metadata } from "@/lib/v4";
import { quoteView } from "@/lib/views";
import "../inner.css";
import "./writing.css";

export const metadata = v4Metadata(meta);

// Writing, section D of the Broadsheet (plan/versions-spec.md, V4 inner
// pages: "an article index like a table of contents, with the featured WER
// block as the lead story"). The section front carries the page's one
// scroll-scrubbed figure (the marigolds). Then the lead story (the August
// 2026 feature: its headline, her words, the magazine's summary), the
// themes as short columns, the articles as a table of contents with dot
// leaders to their dates, and On stage, whose button is the last thing on
// the page (Writing has no contact band, as on the classic site). All copy
// from src/content/writing.ts.
//
// Two items wait for her answers (C4, C5) and render only when every field
// of their `gate` is confirmed; the podium photo's caption the same (C6).

const FEATURED_TITLE_ID = "featured-title";

/** The phrase drawn over with the marigold highlighter in the lead story. */
const MARK = "they are helping write it";

/** An article title may break after a slash ("E-Commerce/" then
 *  "Digital-Social Media") rather than inside a hyphenated word. The stored
 *  title stays verbatim; only the rendering adds the break points. */
function breakAfterSlashes(title: string) {
  return title.split("/").map((part, index, parts) => (
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

export default function V4Writing() {
  const showEntryLevel = entryLevel.gate.every(isConfirmed);
  const showJapanSession = japanSession.gate.every(isConfirmed);
  const lead = quoteView(featured.quote.quote);
  const sections = [
    { id: featured.id, name: labels.leadStory, title: featured.title },
    { id: themes.id, name: kickerOf(themes.eyebrow), title: themes.title },
    { id: articles.id, name: kickerOf(articles.eyebrow), title: articles.title },
    { id: stage.id, name: kickerOf(stage.eyebrow), title: stage.title },
  ];
  const items: FrontItem[] = sections.map((section, i) => ({
    numeral: NUMERALS[i],
    name: section.name,
    teaser: section.title,
    href: `#${section.id}`,
  }));

  return (
    <div className="v4-inner v4-writing">
      <SectionFront
        id="v4-writing-title"
        letter={labels.sectionLetters.writing}
        flag={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        items={items}
        figure={
          <ScrubFigure
            name="marigold"
            n={1}
            caption={labels.writingCaption}
            frameClass="v4-frame--front"
            sizes="(min-width: 1024px) 40vw, 100vw"
            focusX={0.15}
            load
          />
        }
      />

      {/* --- I. The lead story: the August 2026 feature -------------------- */}
      <section id={featured.id} className="v4-section v4-wrap" aria-labelledby={FEATURED_TITLE_ID}>
        <ChapterHead
          id={FEATURED_TITLE_ID}
          numeral={NUMERALS[0]}
          name={featured.eyebrow}
          title={featured.title}
          dek={featured.herSection}
          label={null}
        />
        <div className="v4-body v4-body--margin v4-body--indent">
          <div className="v4-lead">
            <blockquote className="v4-lead-quote" cite={featured.link.href}>
              <p>
                <Marked text={lead.text} phrase={MARK} />
              </p>
            </blockquote>
            <p className="v4-lead-summary">
              <ParaText para={featured.summary} />
            </p>
            <p className="v4-actions">
              <a className="v4-link" href={featured.link.href} target="_blank" rel="noopener noreferrer">
                {featured.link.label}
                <span className="v4-sr-only">{labels.newTab}</span>
              </a>
            </p>
          </div>
          <div className="v4-margin v4-lead-meta">
            <p className="v4-lead-outlet">{featured.outlet}</p>
            <p className="v4-lead-byline">{featured.byline}</p>
          </div>
        </div>

        {/* C4: the Lokmat Times reprint of her entry-level post. */}
        {showEntryLevel ? (
          <article className="v4-body v4-body--margin v4-body--indent v4-lead v4-lead--second" aria-labelledby="v4-entry-level-title">
            <div>
              <h3 id="v4-entry-level-title" className="v4-lead-second-title">
                {entryLevel.headline}
              </h3>
              <p className="v4-lead-summary">{entryLevel.summary}</p>
              {entryLevel.quotes.map((line) => (
                <p key={line} className="v4-lead-line">
                  <q>{line}</q>
                </p>
              ))}
              <p className="v4-actions">
                <a className="v4-link" href={entryLevel.href} target="_blank" rel="noopener noreferrer">
                  {entryLevel.linkLabel}
                  <span className="v4-sr-only">{labels.newTab}</span>
                </a>
              </p>
            </div>
            <div className="v4-margin v4-lead-meta">
              <p className="v4-lead-outlet">{entryLevel.outlet}</p>
              <p className="v4-lead-byline">{entryLevel.edition}</p>
            </div>
          </article>
        ) : null}
      </section>

      {/* --- II. Themes: six of her lines, each under its theme ------------ */}
      <section id={themes.id} className="v4-section v4-wrap" aria-labelledby={`${themes.id}-title`}>
        <ChapterHead
          id={`${themes.id}-title`}
          numeral={NUMERALS[1]}
          name={kickerOf(themes.eyebrow)}
          title={themes.title}
          label={null}
        />
        <ul className="v4-col-wide v4-themes">
          {themes.items.map((ref) => {
            const quote = quoteView(ref.quote, ref.linkLabel ?? themes.linkLabel);
            return (
              <li key={ref.quote} className="v4-theme">
                {quote.theme ? <h3 className="v4-theme-name">{quote.theme}</h3> : null}
                <figure>
                  <blockquote cite={quote.href}>
                    <p>{quote.text}</p>
                  </blockquote>
                  <figcaption className="v4-by">{quote.attribution}</figcaption>
                </figure>
                {quote.href && quote.linkLabel ? (
                  <p className="v4-theme-link">
                    <a className="v4-link" href={quote.href} target="_blank" rel="noopener noreferrer">
                      {quote.linkLabel}
                      <span className="v4-sr-only">{labels.newTab}</span>
                    </a>
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      {/* --- III. Articles: a table of contents, dot leaders to the dates -- */}
      <section id={articles.id} className="v4-section v4-wrap" aria-labelledby={`${articles.id}-title`}>
        <ChapterHead
          id={`${articles.id}-title`}
          numeral={NUMERALS[2]}
          name={kickerOf(articles.eyebrow)}
          title={articles.title}
          dek={articles.note}
          label={null}
        />
        <div className="v4-col-wide v4-contents">
          <p className="v4-contents-head" aria-hidden="true">
            <span>{labels.tableArticle}</span>
            <span>{labels.tableDate}</span>
          </p>
          <ol className="v4-contents-list">
            {articles.items.map((article, i) => (
              <li key={article.id} className="v4-toc">
                <span className="v4-toc-n" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="v4-toc-body">
                  <div className="v4-toc-line">
                    <h3 className="v4-toc-title">{breakAfterSlashes(article.title)}</h3>
                    <span className="v4-leader" aria-hidden="true" />
                    <time className="v4-toc-date" dateTime={article.date}>
                      {article.dateLabel}
                    </time>
                  </div>
                  <p className="v4-toc-summary">{article.summary}</p>
                  {article.quote ? (
                    <p className="v4-toc-quote">
                      <q>{article.quote}</q>
                    </p>
                  ) : null}
                  {article.href ? (
                    <p className="v4-toc-link">
                      <a className="v4-link" href={article.href} target="_blank" rel="noopener noreferrer">
                        {articles.linkLabel}
                        <span className="v4-sr-only">{labels.newTab}</span>
                      </a>
                    </p>
                  ) : article.note ? (
                    <p className="v4-toc-note">{article.note}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --- IV. On stage: the podium photo and the invitation to speak, the
             page's one primary button and its last element --------------- */}
      <section id={stage.id} className="v4-section v4-wrap" aria-labelledby={`${stage.id}-title`}>
        <ChapterHead
          id={`${stage.id}-title`}
          numeral={NUMERALS[3]}
          name={kickerOf(stage.eyebrow)}
          title={stage.title}
          label={null}
        />
        <div className="v4-stage">
          <figure className="v4-stage-photo">
            <div className="v4-matte">
              <div className="v4-wipe">
                <Image src={podium.src} alt={podium.alt} width={podium.width} height={podium.height} sizes="(min-width: 1024px) 18rem, 60vw" />
              </div>
            </div>
            {/* C6: no caption until she names the event. */}
            {isConfirmed(stage.photoEvent) ? <figcaption className="v4-caption">{stage.photoEvent}</figcaption> : null}
          </figure>
          <div className="v4-stage-text">
            <p className="v4-lead-para">{stage.paragraph}</p>

            {/* C5: the Japanese delegation session, in her own account. */}
            {showJapanSession ? (
              <div className="v4-stage-session">
                <p className="v4-toc-date">{japanSession.date}</p>
                <h3 className="v4-toc-title">{japanSession.title}</h3>
                <p className="v4-toc-summary">
                  {japanSession.line
                    .replace("{role}", japanSession.role)
                    .replace("{venue}", japanSession.venue)
                    .replace("{organiser}", japanSession.organiser)}
                </p>
                <p className="v4-toc-quote">
                  <q>{japanSession.quote}</q>
                </p>
                <p className="v4-toc-link">
                  <a className="v4-link" href={japanSession.href} target="_blank" rel="noopener noreferrer">
                    {japanSession.linkLabel}
                    <span className="v4-sr-only">{labels.newTab}</span>
                  </a>
                </p>
              </div>
            ) : null}

            <p className="v4-actions">
              <Link className="v4-button" href={toV4(stage.button.href)}>
                {stage.button.label}
                <span className="v4-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
