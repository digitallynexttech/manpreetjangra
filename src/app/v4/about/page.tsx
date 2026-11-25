import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { CopyButton } from "@/components/CopyButton";
import { ParaText } from "@/components/ParaText";
import { ChapterHead, kickerOf } from "@/components/v4/ChapterHead";
import { ScrubFigure } from "@/components/v4/Figure";
import { Marked } from "@/components/v4/Mark";
import { lede } from "@/components/v4/lede";
import { NUMERALS, SectionFront, type FrontItem } from "@/components/v4/SectionFront";
import { SHOW_DIRECTORSHIP, beliefs, bio, education, intro, journey, meta, story } from "@/content/about";
import { portrait } from "@/content/images";
import { labels, toV4 } from "@/content/v4";
import { v4Metadata } from "@/lib/v4";
import { educationDetail, quoteView, timelineView } from "@/lib/views";
import "../inner.css";
import "./about.css";

export const metadata = v4Metadata(meta);

// About, section B of the Broadsheet (plan/versions-spec.md, V4 inner pages:
// "a long-form profile using story paragraphs with a drop cap, the journey
// table, education, and the bio as a boxed 'For organisers' panel"). The
// section front carries the 2019 portrait; her story runs in newspaper
// columns with a drop cap beside the page's one scroll-scrubbed figure (the
// bronze silk); the journey is a ruled table with its sources; then what
// drives her as a pull quote, education with dot leaders, and the bio in a
// boxed panel with the classic copy button. All copy from src/content/about.ts.

/** The phrase drawn over with the marigold highlighter in the pull quote. */
const MARK = "the change often begins quietly";

export default function V4About() {
  const bioText = SHOW_DIRECTORSHIP ? bio.text : bio.withoutDirectorship;
  const pull = quoteView(beliefs.quote.quote);
  const entries = journey.entries.map(timelineView);
  const articles = [story, journey, beliefs, education, bio];
  const items: FrontItem[] = articles.map((article, i) => ({
    numeral: NUMERALS[i],
    name: kickerOf(article.eyebrow),
    teaser: article.title,
    href: `#${article.id}`,
  }));
  const head = (i: number, dek?: ReactNode) => ({
    id: `${articles[i].id}-title`,
    numeral: NUMERALS[i],
    name: kickerOf(articles[i].eyebrow),
    title: articles[i].title,
    dek,
    label: null,
  });

  return (
    <div className="v4-inner v4-about">
      <SectionFront
        id="v4-about-title"
        letter={labels.sectionLetters.about}
        flag={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        items={items}
        figure={
          <figure className="v4-figure v4-about-portrait">
            <div className="v4-matte">
              <div className="v4-about-portrait-field v4-wipe--load">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  sizes="(min-width: 1024px) 22rem, 70vw"
                  className="v4-about-portrait-img"
                  priority
                />
              </div>
            </div>
            <figcaption className="v4-caption">{portrait.caption}</figcaption>
          </figure>
        }
      />

      {/* --- I. Her story: newspaper columns beside the figure ------------- */}
      <section id={story.id} className="v4-section v4-wrap" aria-labelledby={`${story.id}-title`}>
        <ChapterHead {...head(0)} />
        <div className="v4-story">
          <div className="v4-columns v4-story-text">
            {story.paragraphs.map((para, i) => (
              <p key={i} className={i === 0 ? "v4-dropcap" : undefined}>
                <ParaText para={para} />
              </p>
            ))}
          </div>
          <ScrubFigure
            name="bronze-silk"
            n={1}
            caption={labels.aboutCaption}
            frameClass="v4-frame--tall"
            sizes="(min-width: 1024px) 24vw, 90vw"
            className="v4-story-figure"
          />
        </div>
      </section>

      {/* --- II. The journey: a ruled table with its sources -------------- */}
      <section id={journey.id} className="v4-section v4-wrap" aria-labelledby={`${journey.id}-title`}>
        <ChapterHead {...head(1, lede(journey.lede))} />
        <div className="v4-record">
          <p className="v4-record-head" aria-hidden="true">
            <span>{labels.tableYear}</span>
            <span>{labels.tableMilestone}</span>
            <span>{labels.sources}</span>
          </p>
          <ol className="v4-record-list">
            {entries.map((entry) => (
              <li key={entry.id} className="v4-record-row">
                <p className="v4-record-year">{entry.yearLabel}</p>
                <div className="v4-record-text">
                  <h3 className="v4-record-title">{entry.title}</h3>
                  <p className="v4-record-body">{entry.body}</p>
                </div>
                {entry.sources.length > 0 ? (
                  <p className="v4-record-sources">
                    <span className="v4-note-label">
                      {entry.sources.length > 1 ? labels.sources : labels.source}:
                    </span>{" "}
                    {entry.sources.map((source, i) => (
                      <Fragment key={source.href}>
                        {i > 0 ? "; " : null}
                        <a href={source.href} target="_blank" rel="noopener noreferrer">
                          {source.label}
                          <span className="v4-sr-only">{labels.newTab}</span>
                        </a>
                      </Fragment>
                    ))}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --- III. What drives her: the pull quote, then the magazine's own
             summary (named, never in quotation marks) --------------------- */}
      <section id={beliefs.id} className="v4-section v4-wrap" aria-labelledby={`${beliefs.id}-title`}>
        <ChapterHead {...head(2)} />
        <figure className="v4-pullquote v4-pullquote--long">
          <span className="v4-rule v4-rule--thick v4-rule--grow" aria-hidden="true" />
          <blockquote className="v4-pullquote-text" cite={pull.href}>
            <p>
              <Marked text={pull.text} phrase={MARK} />
            </p>
          </blockquote>
          <figcaption className="v4-pullquote-by">{pull.attribution}</figcaption>
          <span className="v4-rule v4-rule--grow" aria-hidden="true" />
        </figure>
        <div className="v4-col-text v4-beliefs-after">
          <p className="v4-beliefs-summary">{beliefs.paraphrase.text}</p>
          <p className="v4-actions">
            <a className="v4-link" href={beliefs.link.href} target="_blank" rel="noopener noreferrer">
              {beliefs.link.label}
              <span className="v4-sr-only">{labels.newTab}</span>
            </a>
          </p>
        </div>
      </section>

      {/* --- IV. Education: degree, leaders, then only what she confirmed - */}
      <section id={education.id} className="v4-section v4-wrap" aria-labelledby={`${education.id}-title`}>
        <ChapterHead {...head(3)} />
        <ul className="v4-col-text v4-degrees">
          {education.entries.map((entry) => {
            const detail = educationDetail(entry);
            return (
              <li key={entry.degree} className="v4-degree">
                <h3 className="v4-degree-name">{entry.degree}</h3>
                {detail ? (
                  <>
                    <span className="v4-leader" aria-hidden="true" />
                    <p className="v4-degree-detail">{detail}</p>
                  </>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      {/* --- V. The bio, in a boxed "For organisers" panel ----------------- */}
      <section id={bio.id} className="v4-section v4-wrap" aria-labelledby={`${bio.id}-title`}>
        <div className="v4-panel v4-bio">
          <div className="v4-panel-bar v4-panel-bar--single">
            <p className="v4-panel-label">{labels.forOrganisers}</p>
          </div>
          <div className="v4-bio-grid">
            <div className="v4-bio-head">
              <h2 id={`${bio.id}-title`} className="v4-bio-title">
                {bio.title}
              </h2>
              <p className="v4-bio-more">
                <Link className="v4-link" href={toV4(bio.link.href)}>
                  {bio.link.label}
                  <span className="v4-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </p>
            </div>
            <div className="v4-bio-copy">
              <p className="v4-bio-text">{bioText}</p>
              <CopyButton text={bioText} label={bio.copy.label} doneLabel={bio.copy.doneLabel} failLabel={bio.copy.failLabel} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
