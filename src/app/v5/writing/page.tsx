import Image from "next/image";
import { ArrowUpRight, AtSign, BookOpenText, Mic, Newspaper, PenLine, Shapes, Sparkles } from "lucide-react";
import { ParaText } from "@/components/ParaText";
import { V5Button } from "@/components/v5/Button";
import { Chip } from "@/components/v5/Chip";
import { HeadTile, breakAfterSlashes } from "@/components/v5/Heads";
import { LinkTile } from "@/components/v5/LinkTile";
import { PageHeader } from "@/components/v5/PageHeader";
import { QuoteBody } from "@/components/v5/QuoteBody";
import { SocialList } from "@/components/v5/SocialList";
import { Tile, type Tone } from "@/components/v5/Tile";
import { enquiryTypes } from "@/content/contact";
import { podium } from "@/content/images";
import { footer } from "@/content/shared";
import { isConfirmed } from "@/content/types";
import { labels, toV5 } from "@/content/v5";
import { articles, entryLevel, featured, intro, japanSession, meta, stage, themes } from "@/content/writing";
import { v5Metadata } from "@/lib/v5";
import { quoteView } from "@/lib/views";

export const metadata = v5Metadata(meta);

// /v5/writing (plan/versions-spec.md, V5 "Inner pages", Writing): the bento
// header with her two profiles as its accent tile; the featured tile (the
// Women Entrepreneurs Review feature, beside her words from it); six theme
// quote tiles; the three long-form articles as tiles that link out; and on
// stage, with the podium photo and "Invite her to speak". All copy comes
// from src/content/writing.ts. The two items still waiting for her answers
// (entryLevel, japanSession) render only once every field in their `gate`
// is confirmed, and the podium photo gets a caption the same way, as on the
// classic page.

const THEME_TONES: readonly Tone[] = ["marigold", "paper", "blush", "paper", "night", "marigold"];
const ARTICLE_TONES: readonly Tone[] = ["paper", "blush", "paper"];

export default function V5Writing() {
  const showEntryLevel = entryLevel.gate.every(isConfirmed);
  const showJapanSession = japanSession.gate.every(isConfirmed);
  const featuredQuote = quoteView(featured.quote.quote);
  const press = enquiryTypes.find((type) => type.key === "press");

  return (
    <>
      <PageHeader
        icon={<PenLine size={14} strokeWidth={2} aria-hidden="true" />}
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        ledeTone="marigold"
      >
        <Tile tone="paper" intro={2} tileClassName="v5-social-tile">
          <Chip icon={<AtSign size={14} strokeWidth={2} aria-hidden="true" />}>{footer.elsewhereHeading}</Chip>
          <SocialList />
        </Tile>
      </PageHeader>

      {/* Featured: the August 2026 feature; its title is the section heading. */}
      <section id={featured.id} className="v5-block" aria-labelledby="v5-featured-title">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--featured">
            <Tile w={2} tone="night" tileClassName="v5-feature-meta">
              <Chip icon={<Sparkles size={14} strokeWidth={2} aria-hidden="true" />}>{featured.eyebrow}</Chip>
              <div className="v5-feature-head">
                <p className="v5-feature-outlet">{featured.outlet}</p>
                <h2 id="v5-featured-title" className="v5-feature-title">
                  {featured.title}
                </h2>
                <p className="v5-feature-byline">{featured.byline}</p>
                <p className="v5-feature-section">{featured.herSection}</p>
              </div>
              <div className="v5-actions">
                <V5Button href={featured.link.href} external={featured.link.external}>
                  {featured.link.label}
                </V5Button>
              </div>
            </Tile>
            <Tile w={2} tone="blush" tileClassName="v5-quote-tile v5-feature-words">
              <QuoteBody quote={{ ...featuredQuote, href: featured.link.href }} size="large" />
              <p className="v5-feature-summary">
                <ParaText para={featured.summary} />
              </p>
            </Tile>

            {/* C4: the Lokmat Times reprint of her entry-level post. */}
            {showEntryLevel ? (
              <>
                <Tile w={2} tone="paper" tileClassName="v5-feature-meta">
                  <Chip icon={<Newspaper size={14} strokeWidth={2} aria-hidden="true" />}>{entryLevel.outlet}</Chip>
                  <div className="v5-feature-head">
                    <h3 className="v5-feature-title">{entryLevel.headline}</h3>
                    <p className="v5-feature-byline">{entryLevel.edition}</p>
                    <p className="v5-feature-section">{entryLevel.summary}</p>
                  </div>
                  <div className="v5-actions">
                    <V5Button href={entryLevel.href} external variant="secondary">
                      {entryLevel.linkLabel}
                    </V5Button>
                  </div>
                </Tile>
                <Tile w={2} tone="marigold" tileClassName="v5-quote-tile">
                  <div className="v5-lines">
                    {entryLevel.quotes.map((line) => (
                      <p key={line} className="v5-line-quote">
                        <q>{line}</q>
                      </p>
                    ))}
                  </div>
                </Tile>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* Themes: six of her lines, each under the theme it speaks to. */}
      <section id={themes.id} className="v5-block" aria-labelledby="v5-themes-title">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--themes">
            <Tile w={2} tone="paper">
              <HeadTile
                id="v5-themes-title"
                icon={<Shapes size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={themes.eyebrow}
                title={themes.title}
                accent={themes.accent}
              />
            </Tile>
            {themes.items.map((ref, index) => (
              <Tile
                key={ref.quote}
                tone={THEME_TONES[index % THEME_TONES.length]}
                tileClassName="v5-quote-tile v5-theme-tile"
              >
                <QuoteBody quote={quoteView(ref.quote, ref.linkLabel ?? themes.linkLabel)} showTheme cover />
              </Tile>
            ))}
          </div>
        </div>
      </section>

      {/* Articles: the three long-form LinkedIn articles, newest first. */}
      <section id={articles.id} className="v5-block" aria-labelledby="v5-articles-title">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--articles">
            <Tile tone="marigold" mdW={2} tileClassName="v5-articles-head">
              <HeadTile
                id="v5-articles-title"
                icon={<BookOpenText size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={articles.eyebrow}
                title={articles.title}
                accent={articles.accent}
              >
                <p className="v5-caption">{articles.note}</p>
              </HeadTile>
            </Tile>
            {articles.items.map((article, index) => (
              <Tile
                key={article.id}
                tone={ARTICLE_TONES[index % ARTICLE_TONES.length]}
                mdW={index === articles.items.length - 1 ? 2 : 1}
                tileClassName="v5-article-tile"
              >
                <div className="v5-article-top">
                  <time className="v5-chip" dateTime={article.date}>
                    {article.dateLabel}
                  </time>
                  {article.href ? (
                    <span className="v5-round v5-round--static" aria-hidden="true">
                      <ArrowUpRight size={20} strokeWidth={2} />
                    </span>
                  ) : null}
                </div>
                <h3 className="v5-article-title">
                  {article.href ? (
                    <a className="v5-cover" href={article.href} target="_blank" rel="noopener noreferrer">
                      {breakAfterSlashes(article.title)}
                      <span className="v5-sr">{labels.newTab}</span>
                    </a>
                  ) : (
                    breakAfterSlashes(article.title)
                  )}
                </h3>
                <p className="v5-article-summary">{article.summary}</p>
                {article.quote ? (
                  <p className="v5-article-quote">
                    <q>{article.quote}</q>
                  </p>
                ) : null}
                {article.href ? (
                  <p className="v5-article-link" aria-hidden="true">
                    {articles.linkLabel}
                    <ArrowUpRight size={16} strokeWidth={2} />
                  </p>
                ) : article.note ? (
                  <p className="v5-article-note">{article.note}</p>
                ) : null}
              </Tile>
            ))}
          </div>
        </div>
      </section>

      {/* On stage: the podium photo and the invitation to speak. */}
      <section id={stage.id} className="v5-block" aria-labelledby="v5-stage-title">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--stage">
            <Tile w={2} tone="night" tileClassName="v5-stage-tile">
              <HeadTile
                id="v5-stage-title"
                icon={<Mic size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={stage.eyebrow}
                title={stage.title}
                accent={stage.accent}
                lede={stage.paragraph}
              >
                {/* C5: the Japanese delegation session, in her own account. */}
                {showJapanSession ? (
                  <div className="v5-session">
                    <p className="v5-chip">{japanSession.date}</p>
                    <h3 className="v5-session-title">{japanSession.title}</h3>
                    <p className="v5-session-line">
                      {japanSession.line
                        .replace("{role}", japanSession.role)
                        .replace("{venue}", japanSession.venue)
                        .replace("{organiser}", japanSession.organiser)}
                    </p>
                    <p className="v5-session-quote">
                      <q>{japanSession.quote}</q>
                    </p>
                    <V5Button href={japanSession.href} external variant="quiet">
                      {japanSession.linkLabel}
                    </V5Button>
                  </div>
                ) : null}
                <div className="v5-actions">
                  <V5Button href={toV5(stage.button.href)}>{stage.button.label}</V5Button>
                </div>
              </HeadTile>
            </Tile>
            <Tile tone="paper" tileClassName="v5-photo-tile">
              <figure className="v5-photo">
                <Image
                  src={podium.src}
                  width={podium.width}
                  height={podium.height}
                  sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 92vw"
                  alt={podium.alt}
                  className="v5-photo-img"
                />
                {/* C6: no caption until she names the event. */}
                {isConfirmed(stage.photoEvent) ? (
                  <figcaption className="v5-chip v5-chip--glass v5-photo-caption">{stage.photoEvent}</figcaption>
                ) : null}
              </figure>
            </Tile>
            {press ? (
              <LinkTile
                icon={<Newspaper size={22} strokeWidth={1.75} />}
                href={toV5(`/contact?type=${press.key}`)}
                label={press.label}
                tone="blush"
              />
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
