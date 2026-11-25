import Image from "next/image";
import { Fragment } from "react";
import { ParaText } from "@/components/ParaText";
import { ExternalLink, SceneButton, SceneHead, TitleScene, headId } from "@/components/v3/Inner";
import { Rise, SubtitleList } from "@/components/v3/Reels";
import { FootageScene, ScrollRefresh } from "@/components/v3/Scenes";
import { lineSpans } from "@/components/v3/text";
import { podium } from "@/content/images";
import { quotes } from "@/content/quotes";
import { isConfirmed } from "@/content/types";
import { toV3 } from "@/content/v3";
import { articles, entryLevel, featured, intro, japanSession, meta, stage, themes } from "@/content/writing";
import { attributionOf } from "@/lib/site";
import { TITLE_FOOTAGE, subtitleLines, v3Metadata } from "@/lib/v3";

export const metadata = v3Metadata(meta);

// /v3/writing (plan/versions-spec.md 3, V3 Inner pages: "Writing: quotes as
// subtitles; articles as a list styled like a film index"), third-person
// annotations around her own words, always verbatim. Top to bottom:
//   title scene (red silk), the featured magazine piece (her words as
//   subtitles over bronze silk, pinned; then its byline, her section and the
//   magazine's summary), the themes (six quotes, each played as subtitles as
//   it comes up the screen), the articles (a film index), and on stage (the
//   podium photograph in a film frame and the invitation to speak, the page's
//   one button and its last element).
// Two items wait for her answers (writing.ts C4, C5) and render only when
// every field in their `gate` is confirmed, as on v1; so does the podium
// caption (C6).

const HREF = toV3("/writing");
const FEATURED_TITLE_ID = "featured-title";

/** An article title may break after a slash rather than inside a hyphenated
 *  word; the stored title stays verbatim (as v1). */
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

export default function V3Writing() {
  const showEntryLevel = entryLevel.gate.every(isConfirmed);
  const showJapanSession = japanSession.gate.every(isConfirmed);
  const featuredQuote = quotes[featured.quote.quote];
  return (
    <>
      <TitleScene
        href={HREF}
        sequence={TITLE_FOOTAGE.writing}
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        focusY={0.4}
      />

      {/* Featured: the August 2026 Women Entrepreneurs Review feature. The
          article title is the heading; her words play as subtitles. The
          quote's attribution is not repeated: the block names the outlet. */}
      <section id={featured.id} className="v3-featured" aria-labelledby={FEATURED_TITLE_ID}>
        <FootageScene kind="words" sequence="bronze-silk" focusY={0.4}>
          <span className="v3-shade" aria-hidden="true" />
          <div className="v3-words-head" data-v3-head>
            <p className="v3-slate">{featured.eyebrow}</p>
            <p className="v3-featured-outlet">{featured.outlet}</p>
            <h2 id={FEATURED_TITLE_ID} className="v3-featured-title">
              {featured.title}
            </h2>
          </div>
          <figure className="v3-subtitles v3-subtitles--long">
            <blockquote cite={featured.link.href}>
              <p>{lineSpans(subtitleLines(featuredQuote.text, 58), "v3-sub", "data-v3-sub")}</p>
            </blockquote>
          </figure>
        </FootageScene>
        <Rise className="v3-after v3-after--wide">
          <div className="v3-featured-meta">
            <p className="v3-caption" data-v3-in>
              {featured.byline}
            </p>
            <p className="v3-featured-section" data-v3-in>
              {featured.herSection}
            </p>
            <p data-v3-in>
              <ExternalLink href={featured.link.href}>{featured.link.label}</ExternalLink>
            </p>
          </div>
          <p className="v3-after-text" data-v3-in>
            <ParaText para={featured.summary} />
          </p>
        </Rise>

        {/* C4: the Lokmat Times reprint of her entry-level post. */}
        {showEntryLevel ? (
          <Rise className="v3-after v3-after--wide">
            <div className="v3-featured-meta">
              <p className="v3-featured-outlet" data-v3-in>
                {entryLevel.outlet}
              </p>
              <h3 className="v3-featured-title v3-featured-title--small" data-v3-in>
                {entryLevel.headline}
              </h3>
              <p className="v3-caption" data-v3-in>
                {entryLevel.edition}
              </p>
              <p className="v3-featured-section" data-v3-in>
                {entryLevel.summary}
              </p>
              <p data-v3-in>
                <ExternalLink href={entryLevel.href}>{entryLevel.linkLabel}</ExternalLink>
              </p>
            </div>
            <div>
              {entryLevel.quotes.map((line) => (
                <p key={line} className="v3-after-text" data-v3-in>
                  <q>{line}</q>
                </p>
              ))}
            </div>
          </Rise>
        ) : null}
      </section>

      {/* Themes: six of her lines, each under the theme it speaks to, played
          as subtitles. */}
      <section id={themes.id} className="v3-section v3-themes" aria-labelledby={headId(themes.id)}>
        <SceneHead id={themes.id} eyebrow={themes.eyebrow} title={themes.title} accent={themes.accent} className="v3-head--center" />
        <SubtitleList className="v3-theme-list">
          {themes.items.map((ref, index) => {
            const quote = quotes[ref.quote];
            const linkLabel = ref.linkLabel ?? themes.linkLabel;
            return (
              <div key={ref.quote} className="v3-theme" data-v3-quote>
                <p className="v3-theme-label" data-v3-label>
                  <span className="v3-theme-no" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {"theme" in quote ? quote.theme : null}
                </p>
                <figure>
                  <blockquote cite={quote.href}>
                    <p className="v3-theme-text">{lineSpans(subtitleLines(quote.text, 52), "v3-sub", "data-v3-sub")}</p>
                  </blockquote>
                  <figcaption className="v3-theme-by" data-v3-after>
                    {attributionOf(quote)}
                  </figcaption>
                </figure>
                {quote.href ? (
                  <p className="v3-theme-link" data-v3-after>
                    <ExternalLink href={quote.href}>{linkLabel}</ExternalLink>
                  </p>
                ) : null}
              </div>
            );
          })}
        </SubtitleList>
      </section>

      {/* Articles: her three long-form LinkedIn articles, newest first, as a
          film index: reel number, date, title, notes, and the way to watch. */}
      <section id={articles.id} className="v3-section v3-section--raised" aria-labelledby={headId(articles.id)}>
        <Rise className="v3-wrap">
          <SceneHead id={articles.id} eyebrow={articles.eyebrow} title={articles.title} accent={articles.accent} rise>
            <p className="v3-caption" data-v3-in>
              {articles.note}
            </p>
          </SceneHead>
          <ol className="v3-index">
            {articles.items.map((article, index) => (
              <li key={article.id} className="v3-index-row" data-v3-in>
                <span className="v3-index-no" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <time className="v3-index-date" dateTime={article.date}>
                  {article.dateLabel}
                </time>
                <div className="v3-index-body">
                  <h3 className="v3-index-title">{breakAfterSlashes(article.title)}</h3>
                  <p className="v3-index-summary">{article.summary}</p>
                  {article.quote ? (
                    <p className="v3-index-quote">
                      <q>{article.quote}</q>
                    </p>
                  ) : null}
                </div>
                <div className="v3-index-action">
                  {article.href ? (
                    <ExternalLink href={article.href}>{articles.linkLabel}</ExternalLink>
                  ) : article.note ? (
                    <p className="v3-caption">{article.note}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </Rise>
      </section>

      {/* On stage: the podium photograph in a film frame, and the invitation
          to speak, the page's one button and its last element. */}
      <section id={stage.id} className="v3-section v3-stage-section" aria-labelledby={headId(stage.id)}>
        <Rise className="v3-onstage">
          <figure className="v3-onstage-frame" data-v3-in>
            <div className="v3-onstage-gate">
              <Image src={podium.src} width={podium.width} height={podium.height} sizes="(min-width: 1024px) 26rem, 80vw" alt={podium.alt} />
            </div>
            {/* C6: no caption until she names the event. */}
            {isConfirmed(stage.photoEvent) ? <figcaption className="v3-caption">{stage.photoEvent}</figcaption> : null}
          </figure>
          <div className="v3-onstage-text">
            <SceneHead id={stage.id} eyebrow={stage.eyebrow} title={stage.title} accent={stage.accent} lede={stage.paragraph} rise />

            {/* C5: the Japanese delegation session, in her own account. */}
            {showJapanSession ? (
              <div className="v3-onstage-session" data-v3-in>
                <p className="v3-caption">{japanSession.date}</p>
                <h3 className="v3-index-title">{japanSession.title}</h3>
                <p className="v3-index-summary">
                  {japanSession.line
                    .replace("{role}", japanSession.role)
                    .replace("{venue}", japanSession.venue)
                    .replace("{organiser}", japanSession.organiser)}
                </p>
                <p className="v3-index-quote">
                  <q>{japanSession.quote}</q>
                </p>
                <p>
                  <ExternalLink href={japanSession.href}>{japanSession.linkLabel}</ExternalLink>
                </p>
              </div>
            ) : null}

            <div className="v3-actions" data-v3-in>
              <SceneButton href={stage.button.href}>{stage.button.label}</SceneButton>
            </div>
          </div>
        </Rise>
      </section>

      <ScrollRefresh />
    </>
  );
}
