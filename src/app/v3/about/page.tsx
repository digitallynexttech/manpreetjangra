import { CopyButton } from "@/components/CopyButton";
import { Disclosure } from "@/components/Disclosure";
import { ParaText } from "@/components/ParaText";
import { EndCard, ExternalLink, ForwardLink, SceneHead, TitleScene, headId } from "@/components/v3/Inner";
import { Rise } from "@/components/v3/Reels";
import { FootageScene, ScrollRefresh } from "@/components/v3/Scenes";
import { lineSpans, withAccent } from "@/components/v3/text";
import { SHOW_DIRECTORSHIP, beliefs, bio, education, intro, journey, meta, story } from "@/content/about";
import { quotes } from "@/content/quotes";
import { contactBand } from "@/content/shared";
import { labels, toV3 } from "@/content/v3";
import { attributionOf } from "@/lib/site";
import { TITLE_FOOTAGE, subtitleLines, v3Metadata } from "@/lib/v3";
import { educationDetail, timelineView } from "@/lib/views";

export const metadata = v3Metadata(meta);

// /v3/about (plan/versions-spec.md 3, V3 Inner pages: "About: the journey
// with Disclosure styled as chapter entries; the bio card"), in the third
// person like the classic page. Top to bottom:
//   title scene (bronze silk), her story (a sticky head beside the five
//   paragraphs), the journey (a vertical film strip of scenes, each one a
//   Disclosure, the last open), what drives her (her words as subtitles over
//   red silk, then the magazine's summary), education, the bio card for
//   organisers (copy button) and the end card (contact band).
// Every word comes from src/content (about, quotes, shared); the scene labels
// from content/v3.ts.

const HREF = toV3("/about");

export default function V3About() {
  const bioText = SHOW_DIRECTORSHIP ? bio.text : bio.withoutDirectorship;
  const belief = quotes[beliefs.quote.quote];
  const entries = journey.entries.map(timelineView);
  return (
    <>
      <TitleScene
        href={HREF}
        sequence={TITLE_FOOTAGE.about}
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        focusY={0.45}
      />

      {/* Her story: the head stays in view on desktop while the five
          paragraphs pass; the first is set as the scene's opening line. */}
      <section id={story.id} className="v3-section" aria-labelledby={headId(story.id)}>
        <Rise className="v3-split">
          <SceneHead id={story.id} eyebrow={story.eyebrow} title={story.title} accent={story.accent} className="v3-split-head" rise />
          <div className="v3-story">
            {story.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "v3-story-lead" : undefined} data-v3-in>
                <ParaText para={paragraph} />
              </p>
            ))}
          </div>
        </Rise>
      </section>

      {/* Journey: a strip of film running down the page, one scene per
          milestone; each opens to its details and sources (one at a time),
          and the last ("Now") starts open. */}
      <section id={journey.id} className="v3-section" aria-labelledby={headId(journey.id)}>
        <Rise className="v3-wrap v3-wrap--narrow">
          <SceneHead id={journey.id} eyebrow={journey.eyebrow} title={journey.title} accent={journey.accent} lede={journey.lede} rise />
          <ol className="v3-reel-strip">
            {entries.map((entry, index) => (
              <li key={entry.id} className="v3-reel-scene" data-v3-in>
                <Disclosure
                  group="journey"
                  defaultOpen={index === entries.length - 1}
                  reveal={false}
                  className="v3-entry"
                  summary={
                    <>
                      <span className="v3-entry-no">
                        {labels.scene} {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="v3-entry-year">{entry.yearLabel}</span>
                      <h3 className="v3-entry-title">{entry.title}</h3>
                    </>
                  }
                >
                  <p className="v3-entry-body">{entry.body}</p>
                  {entry.sources.length > 0 ? (
                    <p className="v3-entry-sources">
                      {entry.sources.map((source) => (
                        <ExternalLink key={source.href + source.label} href={source.href}>
                          {source.label}
                        </ExternalLink>
                      ))}
                    </p>
                  ) : null}
                </Disclosure>
              </li>
            ))}
          </ol>
        </Rise>
      </section>

      {/* What drives her: her words as subtitles over red silk, then the
          magazine's own summary (named, never in quotation marks). */}
      <section id={beliefs.id} className="v3-beliefs" aria-labelledby={headId(beliefs.id)}>
        <FootageScene kind="words" sequence="vermilion-silk" focusY={0.5}>
          <span className="v3-shade" aria-hidden="true" />
          <div className="v3-words-head" data-v3-head>
            <p className="v3-slate">{beliefs.eyebrow}</p>
            <h2 id={headId(beliefs.id)} className="v3-scene-title">
              {withAccent(beliefs.title, beliefs.accent)}
            </h2>
          </div>
          <figure className="v3-subtitles v3-subtitles--long">
            <blockquote cite={belief.href}>
              <p>{lineSpans(subtitleLines(belief.text, 56), "v3-sub", "data-v3-sub")}</p>
            </blockquote>
            <figcaption className="v3-subtitles-by" data-v3-attrib>
              {attributionOf(belief)}
            </figcaption>
          </figure>
        </FootageScene>
        <Rise className="v3-after">
          <p className="v3-after-text" data-v3-in>
            {beliefs.paraphrase.text}
          </p>
          <p data-v3-in>
            <ExternalLink href={beliefs.link.href}>{beliefs.link.label}</ExternalLink>
          </p>
        </Rise>
      </section>

      {/* Education: one credit per degree; the right column shows only what
          she has confirmed, and stays empty otherwise. */}
      <section id={education.id} className="v3-section v3-section--raised" aria-labelledby={headId(education.id)}>
        <Rise className="v3-split">
          <SceneHead
            id={education.id}
            eyebrow={education.eyebrow}
            title={education.title}
            accent={education.accent}
            className="v3-split-head"
            rise
          />
          <ul className="v3-degrees">
            {education.entries.map((entry) => (
              <li key={entry.degree} className="v3-degree" data-v3-in>
                <h3 className="v3-degree-name">{entry.degree}</h3>
                <p className="v3-degree-detail">{educationDetail(entry)}</p>
              </li>
            ))}
          </ul>
        </Rise>
      </section>

      {/* Bio for organisers: the text in a viewfinder card, ready to paste,
          with the copy button. */}
      <section id={bio.id} className="v3-section" aria-labelledby={headId(bio.id)}>
        <Rise className="v3-split">
          <SceneHead id={bio.id} eyebrow={bio.eyebrow} title={bio.title} accent={bio.accent} className="v3-split-head" rise />
          <div className="v3-bio" data-v3-in>
            <div className="v3-viewfinder">
              <p className="v3-bio-text">{bioText}</p>
            </div>
            <div className="v3-bio-actions">
              <CopyButton text={bioText} label={bio.copy.label} doneLabel={bio.copy.doneLabel} failLabel={bio.copy.failLabel} />
              <ForwardLink href={bio.link.href}>{bio.link.label}</ForwardLink>
            </div>
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
