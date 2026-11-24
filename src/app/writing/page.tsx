import Image from "next/image";
import { Fragment } from "react";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { PageIntro } from "@/components/PageIntro";
import PageTransition from "@/components/PageTransition";
import { ParaText } from "@/components/ParaText";
import { QuoteCard } from "@/components/QuoteCard";
import { SectionHead, titleId } from "@/components/SectionHead";
import { TextLink } from "@/components/TextLink";
import { introImages, podium } from "@/content/images";
import { isConfirmed } from "@/content/types";
import { articles, entryLevel, featured, intro, japanSession, meta, stage, themes } from "@/content/writing";
import { pageMetadata } from "@/lib/site";
import { quoteView } from "@/lib/views";

export const metadata = pageMetadata(meta);

// The Writing page (spec 4.4): third-person annotations around her own words,
// always verbatim. Surfaces, top to bottom: intro (paper), featured (paper),
// themes (sand), articles (paper, sticky heading), on stage (sand), then the
// night footer. There is no contact band: the page ends with "Invite her to
// speak". All copy comes from src/content/writing.ts.
//
// Two items wait for her answers (spec 4.8 C4, C5) and render only when every
// field in their `gate` is confirmed; until then nothing of them reaches the
// page. The podium photo gets its caption the same way (C6).

const FEATURED_TITLE_ID = "featured-title";

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

export default function Writing() {
  const showEntryLevel = entryLevel.gate.every(isConfirmed);
  const showJapanSession = japanSession.gate.every(isConfirmed);
  const featuredQuote = quoteView(featured.quote.quote);

  return (
    <PageTransition>
      <PageIntro
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        image={introImages.writing}
      />

      {/* Featured: the August 2026 Women Entrepreneurs Review feature. The
          article title is the section heading; her words sit beside it. */}
      <section id={featured.id} aria-labelledby={FEATURED_TITLE_ID} className="site-section">
        <div className="site-wrap">
          <div className="mb-6" data-reveal>
            <Eyebrow className="mb-0">{featured.eyebrow}</Eyebrow>
          </div>
          <div className="site-rows">
            <article className="site-grid site-feature" data-reveal>
              <div className="lg:col-span-5">
                <p className="site-eyebrow site-feature-outlet">{featured.outlet}</p>
                <h2 id={FEATURED_TITLE_ID} className="text-h3 site-feature-title">
                  {featured.title}
                </h2>
                <p className="site-caption mt-4">{featured.byline}</p>
                <p className="mt-3 text-small text-ink-muted">{featured.herSection}</p>
                <p className="mt-6">
                  <TextLink href={featured.link.href} external={featured.link.external}>
                    {featured.link.label}
                  </TextLink>
                </p>
              </div>
              <div className="site-feature-words lg:col-span-6 lg:col-start-7">
                <blockquote cite={featured.link.href}>
                  <p className="site-quote-text site-quoted">{featuredQuote.text}</p>
                </blockquote>
                <p className="mt-6 text-small text-ink-muted">
                  <ParaText para={featured.summary} />
                </p>
              </div>
            </article>

            {/* C4: the Lokmat Times reprint of her entry-level post. */}
            {showEntryLevel ? (
              <article className="site-grid site-feature" data-reveal>
                <div className="lg:col-span-5">
                  <p className="site-eyebrow site-feature-outlet">{entryLevel.outlet}</p>
                  <h3 className="text-h3 site-feature-title font-display">{entryLevel.headline}</h3>
                  <p className="site-caption mt-4">{entryLevel.edition}</p>
                  <p className="mt-3 text-small text-ink-muted">{entryLevel.summary}</p>
                  <p className="mt-6">
                    <TextLink href={entryLevel.href} external>
                      {entryLevel.linkLabel}
                    </TextLink>
                  </p>
                </div>
                <div className="site-feature-words lg:col-span-6 lg:col-start-7">
                  {entryLevel.quotes.map((line) => (
                    <p key={line} className="site-quote-text">
                      <q>{line}</q>
                    </p>
                  ))}
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      {/* Themes: six of her lines, each under the theme it speaks to. */}
      <section id={themes.id} aria-labelledby={titleId(themes.id)} className="site-section bg-sand">
        <div className="site-wrap">
          <SectionHead id={themes.id} eyebrow={themes.eyebrow} title={themes.title} accent={themes.accent} />
          <ul className="grid gap-10 md:grid-cols-2 xl:grid-cols-3" data-reveal="group">
            {themes.items.map((ref) => (
              <li key={ref.quote} data-reveal>
                <QuoteCard quote={quoteView(ref.quote, ref.linkLabel ?? themes.linkLabel)} variant="paper" showTheme />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Articles: her three long-form LinkedIn articles, newest first. The
          heading column stays in view on desktop. */}
      <section id={articles.id} aria-labelledby={titleId(articles.id)} className="site-section">
        <div className="site-wrap site-editorial-grid">
          <div className="mb-10 lg:mb-0">
            <SectionHead id={articles.id} eyebrow={articles.eyebrow} title={articles.title} accent={articles.accent} className="mb-0" />
            <p className="mt-5 text-small text-ink-muted" data-reveal>
              {articles.note}
            </p>
          </div>
          <ul className="site-rows" data-reveal="group">
            {articles.items.map((article) => (
              <li key={article.id} className="site-row-static site-railed site-article-row" data-reveal>
                <time className="site-caption site-tabular" dateTime={article.date}>
                  {article.dateLabel}
                </time>
                <div>
                  <h3 className="site-article-title text-h4">{breakAfterSlashes(article.title)}</h3>
                  <p className="mt-2">{article.summary}</p>
                  {article.quote ? (
                    <p className="site-article-quote mt-4">
                      <q>{article.quote}</q>
                    </p>
                  ) : null}
                  {article.href ? (
                    <p className="mt-4">
                      <TextLink href={article.href}>{articles.linkLabel}</TextLink>
                    </p>
                  ) : article.note ? (
                    <p className="site-caption mt-4">{article.note}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* On stage: the podium photo and an invitation to speak, the page's
          one primary button and its last element. */}
      <section id={stage.id} aria-labelledby={titleId(stage.id)} className="site-section bg-sand">
        <div className="site-wrap">
          <div className="site-stage">
            <figure className="site-stage-photo" data-reveal>
              <div className="site-photo-frame">
                <Image src={podium.src} width={podium.width} height={podium.height} sizes="200px" alt={podium.alt} />
              </div>
              {/* C6: no caption until she names the event. */}
              {isConfirmed(stage.photoEvent) ? (
                <figcaption className="site-caption mt-3">{stage.photoEvent}</figcaption>
              ) : null}
            </figure>
            <div className="site-stage-text">
              <SectionHead id={stage.id} eyebrow={stage.eyebrow} title={stage.title} accent={stage.accent} className="mb-0" />
              <p className="site-prose mt-5" data-reveal>
                {stage.paragraph}
              </p>

              {/* C5: the Japanese delegation session, in her own account. */}
              {showJapanSession ? (
                <ul className="site-rows mt-8" data-reveal>
                  <li className="site-row-static site-railed site-article-row">
                    <span className="site-caption site-tabular">{japanSession.date}</span>
                    <div>
                      <h3 className="site-article-title text-h4">{japanSession.title}</h3>
                      <p className="mt-2 text-ink-muted">
                        {japanSession.line
                          .replace("{role}", japanSession.role)
                          .replace("{venue}", japanSession.venue)
                          .replace("{organiser}", japanSession.organiser)}
                      </p>
                      <p className="site-article-quote mt-4">
                        <q>{japanSession.quote}</q>
                      </p>
                      <p className="mt-4">
                        <TextLink href={japanSession.href} external>
                          {japanSession.linkLabel}
                        </TextLink>
                      </p>
                    </div>
                  </li>
                </ul>
              ) : null}

              <div className="mt-8" data-reveal>
                <Button href={stage.button.href}>{stage.button.label}</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
