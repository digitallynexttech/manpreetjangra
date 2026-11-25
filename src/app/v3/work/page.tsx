import { ParaText } from "@/components/ParaText";
import { VentureList } from "@/components/VentureList";
import { EndCard, ExternalLink, ForwardLink, SceneHead, TitleScene, headId } from "@/components/v3/Inner";
import { ChapterDeck, Rise } from "@/components/v3/Reels";
import { NumbersScene, ScrollRefresh } from "@/components/v3/Scenes";
import { ledeText, splitStat, withAccent } from "@/components/v3/text";
import { quotes } from "@/content/quotes";
import { contactBand } from "@/content/shared";
import { toV3 } from "@/content/v3";
import { adac, clientStats, clientStory, group, how, intro, meta, operations, talent, ventures } from "@/content/work";
import { attributionOf } from "@/lib/site";
import { TITLE_FOOTAGE, v3Metadata } from "@/lib/v3";
import { ventureView } from "@/lib/views";

export const metadata = v3Metadata(meta);

// /v3/work (plan/versions-spec.md 3, V3 Inner pages: "Work: operations as
// chapter cards; ventures as a credits-like list with the hover website
// preview; client story numbers"), in the first person like the classic
// page. Top to bottom:
//   title scene (needle and thread), operations (the head, then the five
//   service lines as a deck of chapter cards, pinned from 1024 px), talent,
//   the AI Decision and Acceleration Center, how I work (two lines as
//   subtitles), the client story (its four numbers counting up, pinned),
//   where I work (the group as credits, with the website preview of v1's
//   VentureList) and the end card (contact band).
// Every word comes from src/content (work, quotes, shared).

const HREF = toV3("/work");

/** A quotation set as a subtitle card: the words, the attribution, and an
 *  optional link to the post. */
function SubtitleCard({ id, linkLabel }: { id: keyof typeof quotes; linkLabel?: string }) {
  const quote = quotes[id];
  return (
    <div className="v3-card-quote" data-v3-in>
      <figure>
        <blockquote cite={quote.href}>
          <p className="v3-card-quote-text">{quote.text}</p>
        </blockquote>
        <figcaption className="v3-card-quote-by">{attributionOf(quote)}</figcaption>
      </figure>
      {linkLabel && quote.href ? (
        <p>
          <ExternalLink href={quote.href}>{linkLabel}</ExternalLink>
        </p>
      ) : null}
    </div>
  );
}

export default function V3Work() {
  return (
    <>
      <TitleScene
        href={HREF}
        sequence={TITLE_FOOTAGE.work}
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        focusX={0.62}
      />

      {/* 01 Operations: the head with the agency's model, then the five
          service lines dealt as chapter cards. */}
      <section id={operations.id} className="v3-ops" aria-labelledby={headId(operations.id)}>
        <ChapterDeck>
          <div className="v3-deck-stage">
            <SceneHead
              id={operations.id}
              eyebrow={operations.eyebrow}
              title={operations.title}
              accent={operations.accent}
              className="v3-deck-head"
            >
              <p className="v3-lede">
                <ParaText para={operations.model} />
              </p>
              <p className="v3-deck-markets">{operations.markets.text}</p>
              <p className="v3-caption">{operations.caption.text}</p>
            </SceneHead>
            <ol className="v3-deck-cards">
              {operations.serviceLines.map((line, index) => (
                <li key={line.index} className="v3-deck-card" data-v3-card>
                  <span className="v3-deck-numeral" aria-hidden="true">
                    {line.index}
                  </span>
                  <div className="v3-deck-copy">
                    <span className="v3-deck-count" aria-hidden="true">
                      {line.index} / {String(operations.serviceLines.length).padStart(2, "0")}
                    </span>
                    {index === 0 ? <span className="v3-rule" aria-hidden="true" /> : null}
                    <h3 className="v3-deck-title">{line.text}</h3>
                  </div>
                  <span className="v3-deck-veil" aria-hidden="true" data-v3-veil />
                </li>
              ))}
            </ol>
          </div>
        </ChapterDeck>
      </section>

      {/* 02 Talent: her hiring record and today's open roles, beside a line
          from one of her job posts. */}
      <section id={talent.id} className="v3-section" aria-labelledby={headId(talent.id)}>
        <Rise className="v3-split v3-split--even">
          <SceneHead id={talent.id} eyebrow={talent.eyebrow} title={talent.title} accent={talent.accent} className="v3-split-head" rise>
            <p className="v3-lede" data-v3-in>
              {talent.paragraph.text}
            </p>
            <p data-v3-in>
              <ForwardLink href={talent.link.href}>{talent.link.label}</ForwardLink>
            </p>
          </SceneHead>
          <SubtitleCard id={talent.quote.quote} linkLabel={talent.quote.linkLabel} />
        </Rise>
      </section>

      {/* 03 The AI Decision and Acceleration Center. The open-roles line is
          left out when no ADAC role is listed. */}
      <section id={adac.id} className="v3-section v3-section--raised v3-adac" aria-labelledby={headId(adac.id)}>
        <Rise className="v3-statement">
          <p className="v3-slate" data-v3-in>
            {adac.eyebrow}
          </p>
          <h2 id={headId(adac.id)} className="v3-scene-title v3-statement-title" data-v3-in>
            {withAccent(adac.title, adac.accent)}
          </h2>
          <span className="v3-rule" aria-hidden="true" data-v3-in />
          <p className="v3-statement-text" data-v3-in>
            <ParaText para={adac.paragraph} />
          </p>
          {adac.roles ? (
            <p className="v3-lede" data-v3-in>
              {adac.roles.text}
            </p>
          ) : null}
        </Rise>
      </section>

      {/* How I work: two things she has posted, as subtitle cards. */}
      <section id={how.id} className="v3-section" aria-labelledby={headId(how.id)}>
        <Rise className="v3-wrap">
          <SceneHead id={how.id} eyebrow={how.eyebrow} title={how.title} accent={how.accent} lede={how.lede} rise />
          <div className="v3-card-quotes">
            {how.quotes.map((ref) => (
              <SubtitleCard key={ref.quote} id={ref.quote} linkLabel={ref.linkLabel} />
            ))}
          </div>
        </Rise>
      </section>

      {/* A client story: the four numbers from her September 2022 post count
          up, one row each; the lede says where they come from. */}
      <section id={clientStory.id} className="v3-story-numbers" aria-labelledby={headId(clientStory.id)}>
        <NumbersScene className="v3-numbers--dense">
          <div className="v3-numbers-head" data-v3-head>
            <p className="v3-slate">{clientStory.eyebrow}</p>
            <h2 id={headId(clientStory.id)} className="v3-numbers-heading">
              {withAccent(clientStory.title, clientStory.accent)}
            </h2>
          </div>
          <dl className="v3-number-list">
            {clientStats.map((item) => {
              const { digits, suffix } = splitStat(item.value);
              return (
                <div key={item.label} className="v3-number-row" data-v3-row>
                  <dt className="v3-number">
                    <span className="v3-sr-only">{item.value}</span>
                    <span aria-hidden="true">
                      <span data-v3-count={digits}>{digits}</span>
                      {suffix ? <span className="v3-number-suffix">{suffix}</span> : null}
                    </span>
                  </dt>
                  <dd className="v3-number-label">{item.label}</dd>
                </div>
              );
            })}
          </dl>
          <p className="v3-numbers-caption" data-v3-caption>
            {ledeText(clientStory.lede)}
          </p>
        </NumbersScene>
        <Rise className="v3-after v3-after--quote">
          <SubtitleCard id={clientStory.quote.quote} />
          <p data-v3-in>
            <ExternalLink href={clientStory.link.href}>{clientStory.link.label}</ExternalLink>
          </p>
        </Rise>
      </section>

      {/* Where I work: the three organisations of the group as credits; a
          mouse over a row (or keyboard focus) shows the website preview, and
          phones get a "Preview website" button (v1's VentureList). */}
      <section id={group.id} className="v3-section v3-group" aria-labelledby={headId(group.id)}>
        <Rise className="v3-wrap">
          <SceneHead id={group.id} eyebrow={group.eyebrow} title={group.title} accent={group.accent} lede={group.lede} className="v3-head--center" rise />
          <div className="v3-ventures" data-v3-in>
            <VentureList ventures={ventures.map(ventureView)} />
          </div>
        </Rise>
      </section>

      <EndCard
        id={contactBand.id}
        eyebrow={contactBand.eyebrow}
        title={contactBand.title}
        accent={contactBand.accent}
        lede={contactBand.lede}
        primary={contactBand.primary}
        secondary={contactBand.secondary}
      />

      <ScrollRefresh />
    </>
  );
}
