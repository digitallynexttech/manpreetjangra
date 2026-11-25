import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ParaText } from "@/components/ParaText";
import { ChapterHead } from "@/components/v4/ChapterHead";
import { Marked, MarkedPara } from "@/components/v4/Mark";
import { Note, NoteLink, NoteRef } from "@/components/v4/Note";
import { ScrubCanvas } from "@/components/v4/ScrubCanvas";
import { lede } from "@/components/v4/lede";
import { journey as aboutJourney, story } from "@/content/about";
import { rolesSection } from "@/content/careers";
import { hero, hiring, journey, lead, meta, pillars, stats, words } from "@/content/home";
import { podium, portrait } from "@/content/images";
import { socialLinks } from "@/content/navigation";
import { quotes } from "@/content/quotes";
import { hasRoles, roles } from "@/content/roles";
import { hiringPill } from "@/content/shared";
import { labels, toV4 } from "@/content/v4";
import { operations } from "@/content/work";
import { SEQUENCES, posterSrc } from "@/lib/sequences";
import { plural } from "@/lib/site";
import { v4Metadata } from "@/lib/v4";
import { quoteView, timelineView } from "@/lib/views";
import "./home.css";

export const metadata = v4Metadata(meta);

// The front page of the Broadsheet edition (plan/versions-spec.md, V4 home).
// Cover: the cover figure (the thread-spool sequence, scrubbed by scroll in
// a framed 3:2 box), the headline (the hero statement) and the standfirst
// (the hero eyebrow and credential line). The opening of her story, set in
// newspaper columns with a drop cap, and the "Inside" box. Then the profile
// in five chapters: I The work, II The journey, III In her words (opened by
// the marigold chapter-divider figure), IV Hiring (the classifieds panel),
// V Numbers (the stats table). The colophon footer is the layout's.
//
// Every word comes from src/content; the chapter names, figure captions and
// note labels are the neutral labels of src/content/v4.ts. Sidenotes carry
// the source and date the content files hold for a claim.

/** The home journey entries whose claims the About journey's sources back
 *  (2018: the iSoCIAL video; Now: the feature and her Instagram bio). The
 *  About 2017 source is a LinkedIn article, not the press release the home
 *  2017 entry names, so it is not attached. */
const SOURCED_ENTRIES = new Set(["2018", "now"]);
const aboutSources = new Map(aboutJourney.entries.map((entry) => [entry.id, entry]));

/** The phrases drawn over with the marigold highlighter. */
const MARKS = {
  pullQuote: "vision with empathy",
  hiring: "always willing to learn",
} as const;

export default function V4Home() {
  const wer = quotes["wer-empathy"];
  // A fourth line from the job posts, with its own source (quotes.ts).
  const jobPost = quotes["jd-process"];
  const cutshort = aboutSources.get("2023-2024");
  const cutshortSource = cutshort?.sources?.[0];
  const linkedin = socialLinks.find((link) => link.key === "linkedin");
  const secondary = hasRoles ? hero.secondary : hero.secondaryEmpty;
  const hiringButton = hasRoles ? hiring.button : hiring.buttonEmpty;
  const pull = quoteView(words.featured);
  const timeline = journey.entries.map((entry) => ({
    view: timelineView(entry),
    sources: SOURCED_ENTRIES.has(entry.id) ? (aboutSources.get(entry.id)?.sources ?? []) : [],
  }));

  // Sidenote numbers, in reading order.
  let noteCount = 0;
  const next = () => ++noteCount;
  const notes = {
    cover: next(),
    operations: next(),
    talent: cutshortSource ? next() : 0,
    journey: Object.fromEntries(timeline.filter((t) => t.sources.length > 0).map((t) => [t.view.id, next()])),
    roles: hasRoles ? next() : 0,
    numbers: linkedin ? next() : 0,
  };

  const inside = [
    { ...labels.chapters.work, title: lead.title, href: `#${lead.id}` },
    { ...labels.chapters.journey, title: journey.title, href: `#${journey.id}` },
    { ...labels.chapters.words, title: words.title, href: `#${words.id}` },
    { ...labels.chapters.hiring, title: hiring.title, href: `#${hiring.id}` },
    { ...labels.chapters.numbers, title: stats.title, href: "#numbers" },
  ];

  return (
    <div className="v4-home">
      {/* --- Cover ------------------------------------------------------ */}
      <section className="v4-cover v4-wrap" aria-labelledby="v4-cover-title">
        <figure className="v4-cover-figure">
          <div className="v4-matte">
            <div className="v4-frame v4-frame--cover v4-wipe--load">
              <Image
                className="v4-frame-poster"
                src={posterSrc(SEQUENCES["thread-spool"], "large")}
                alt=""
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                priority
              />
              <ScrubCanvas name="thread-spool" />
            </div>
          </div>
          <figcaption className="v4-caption">
            <span className="v4-caption-n">{labels.figure} 1</span> {labels.coverCaption}{" "}
            <span className="v4-caption-credit">
              {labels.footage}: {SEQUENCES["thread-spool"].provider}
            </span>
          </figcaption>
        </figure>
        <div className="v4-cover-text">
          <p className="v4-kicker">{labels.coverKicker}</p>
          <h2 id="v4-cover-title" className="v4-headline">
            <Marked text={hero.statement} phrase={hero.accent} load />
          </h2>
          <div className="v4-standfirst">
            <p className="v4-standfirst-role">{hero.eyebrow}</p>
            <p className="v4-standfirst-line">
              {hero.credential}
              <NoteRef n={notes.cover} />
            </p>
          </div>
          <div className="v4-cover-actions">
            <Link className="v4-button" href={toV4(hero.primary.href)}>
              {hero.primary.label}
              <span className="v4-arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link className="v4-link" href={toV4(secondary.href)}>
              {secondary.label}
            </Link>
          </div>
          <Note n={notes.cover} className="v4-note--cover">
            <span className="v4-note-label">{labels.source}:</span>{" "}
            <NoteLink href={wer.href}>{wer.source}</NoteLink>, {wer.dateLabel}
          </Note>
        </div>
      </section>

      {/* --- Opening: her story, in columns, and the Inside box ----------- */}
      <section className="v4-opening v4-wrap" aria-labelledby="v4-opening-title">
        <span className="v4-rule v4-rule--ink v4-rule--grow" aria-hidden="true" />
        <div className="v4-opening-grid">
          <div className="v4-opening-story">
            <p className="v4-kicker">{story.eyebrow}</p>
            <h2 id="v4-opening-title" className="v4-opening-title">
              {story.title}
            </h2>
            <div className="v4-columns">
              {story.paragraphs.slice(0, 3).map((para, i) => (
                <p key={i} className={i === 0 ? "v4-dropcap" : undefined}>
                  <ParaText para={para} />
                </p>
              ))}
              <p className="v4-jump">
                <Link href={toV4(`/about#${story.id}`)}>
                  {labels.continued}
                  <span className="v4-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </p>
            </div>
          </div>
          <nav className="v4-inside" aria-labelledby="v4-inside-title">
            <h2 id="v4-inside-title" className="v4-inside-title">
              {labels.inside}
            </h2>
            <ol>
              {inside.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>
                    <span className="v4-inside-numeral" aria-hidden="true">
                      {item.numeral}
                    </span>
                    <span className="v4-inside-text">
                      <span className="v4-inside-name">{item.name}</span>
                      <span className="v4-inside-teaser">{item.title}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* --- I. The work -------------------------------------------------- */}
      <section id={lead.id} className="v4-section v4-wrap" aria-labelledby={`${lead.id}-title`}>
        <ChapterHead
          id={`${lead.id}-title`}
          numeral={labels.chapters.work.numeral}
          name={labels.chapters.work.name}
          title={lead.title}
          dek={lede(lead.lede)}
        />
        <div className="v4-body v4-body--margin">
          <ol className="v4-pillars">
            {pillars.map((pillar) => (
              <li key={pillar.index} className="v4-pillar">
                <p className="v4-pillar-index">{pillar.index}</p>
                <h3 className="v4-pillar-title">{pillar.title}</h3>
                <p className="v4-pillar-body">
                  <ParaText para={pillar.body} />
                  {pillar.index === "01" ? <NoteRef n={notes.operations} /> : null}
                  {pillar.index === "02" && notes.talent ? <NoteRef n={notes.talent} /> : null}
                </p>
                <p className="v4-pillar-link">
                  <Link className="v4-link" href={toV4(pillar.link.href)}>
                    {pillar.link.label}
                    <span className="v4-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </p>
              </li>
            ))}
          </ol>
          <div className="v4-margin">
            <Note n={notes.operations}>{operations.caption.text}</Note>
            {cutshortSource && cutshort ? (
              <Note n={notes.talent}>
                <span className="v4-note-label">{labels.source}:</span>{" "}
                <NoteLink href={cutshortSource.href}>{cutshortSource.label}</NoteLink>, {cutshort.year}
              </Note>
            ) : null}
          </div>
        </div>
      </section>

      {/* --- II. The journey ---------------------------------------------- */}
      <section id={journey.id} className="v4-section v4-wrap" aria-labelledby={`${journey.id}-title`}>
        <div className="v4-journey-head">
          <ChapterHead
            id={`${journey.id}-title`}
            numeral={labels.chapters.journey.numeral}
            name={labels.chapters.journey.name}
            title={journey.title}
            dek={lede(journey.lede)}
          />
          <figure className="v4-portrait">
            <div className="v4-matte">
              <div className="v4-portrait-field v4-wipe">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  sizes="(min-width: 1024px) 16rem, 70vw"
                  className="v4-portrait-img"
                />
              </div>
            </div>
            <figcaption className="v4-caption">{portrait.caption}</figcaption>
          </figure>
        </div>
        <ol className="v4-timeline">
          {timeline.map(({ view, sources }) => (
            <li key={view.id} className="v4-entry">
              <p className="v4-entry-year">{view.yearLabel}</p>
              <div className="v4-entry-text">
                <h3 className="v4-entry-title">
                  {view.title}
                  {sources.length > 0 ? <NoteRef n={notes.journey[view.id]} /> : null}
                </h3>
                <p className="v4-entry-body">{view.body}</p>
              </div>
              {sources.length > 0 ? (
                <Note n={notes.journey[view.id]} className="v4-entry-note">
                  <span className="v4-note-label">{sources.length > 1 ? labels.sources : labels.source}:</span>{" "}
                  {sources.map((source, i) => (
                    <Fragment key={source.href}>
                      {i > 0 ? "; " : null}
                      <NoteLink href={source.href}>{source.label}</NoteLink>
                    </Fragment>
                  ))}
                  {view.yearLabel !== "Now" ? `, ${view.yearLabel}` : null}
                </Note>
              ) : null}
            </li>
          ))}
        </ol>
        <p className="v4-jump v4-jump--journey">
          <Link href={toV4(journey.link.href)}>
            {journey.link.label}
            <span className="v4-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </p>
      </section>

      {/* --- III. In her words, opened by the chapter-divider figure ------ */}
      <section id={words.id} className="v4-section v4-section--words v4-wrap" aria-labelledby={`${words.id}-title`}>
        <div className="v4-divider">
          <figure className="v4-divider-figure">
            <div className="v4-matte">
              <div className="v4-frame v4-frame--divider v4-wipe">
                <Image
                  className="v4-frame-poster"
                  src={posterSrc(SEQUENCES.marigold, "large")}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  style={{ objectPosition: "15% 50%" }}
                />
                <ScrubCanvas name="marigold" focusX={0.15} />
              </div>
            </div>
            <figcaption className="v4-caption">
              <span className="v4-caption-n">{labels.figure} 2</span> {labels.dividerCaption}{" "}
              <span className="v4-caption-credit">
                {labels.footage}: {SEQUENCES.marigold.provider}
              </span>
            </figcaption>
          </figure>
          <ChapterHead
            id={`${words.id}-title`}
            numeral={labels.chapters.words.numeral}
            name={labels.chapters.words.name}
            title={words.title}
            dek={lede(words.lede)}
            className="v4-chapter--divider"
          />
        </div>
        <figure className="v4-pullquote">
          <span className="v4-rule v4-rule--thick v4-rule--grow" aria-hidden="true" />
          <blockquote className="v4-pullquote-text">
            <p>
              <Marked text={pull.text} phrase={MARKS.pullQuote} />
            </p>
          </blockquote>
          <figcaption className="v4-pullquote-by">{pull.attribution}</figcaption>
          <span className="v4-rule v4-rule--grow" aria-hidden="true" />
        </figure>
        <div className="v4-words-body">
          <figure className="v4-podium">
            <div className="v4-matte">
              <div className="v4-wipe">
                <Image src={podium.src} alt={podium.alt} width={podium.width} height={podium.height} sizes="(min-width: 1024px) 25rem, 90vw" />
              </div>
            </div>
          </figure>
          <div className="v4-sidebar" role="group" aria-labelledby="v4-sidebar-title">
            <h3 id="v4-sidebar-title" className="v4-sidebar-title">
              {labels.moreFromFeature}
            </h3>
            <div className="v4-sidebar-quotes">
              {words.quotes.map((id) => (
                <blockquote key={id} className="v4-sidebar-quote">
                  <p>{quotes[id].text}</p>
                </blockquote>
              ))}
            </div>
            <p className="v4-sidebar-by">{quoteView(words.quotes[0]).attribution}</p>
            <ul className="v4-sidebar-links">
              {words.links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a className="v4-link" href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                      <span className="v4-sr-only">{labels.newTab}</span>
                    </a>
                  ) : (
                    <Link className="v4-link" href={toV4(link.href)}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- IV. Hiring: the classifieds panel ---------------------------- */}
      <section id={hiring.id} className="v4-section v4-wrap" aria-labelledby={`${hiring.id}-title`}>
        <div className="v4-panel v4-classifieds">
          <div className="v4-panel-bar">
            <p className="v4-panel-kicker">
              <span className="v4-sr-only">
                {labels.chapter} {labels.chapters.hiring.numeral}:{" "}
              </span>
              <span aria-hidden="true">
                {labels.chapter} {labels.chapters.hiring.numeral} ·{" "}
              </span>
              {labels.chapters.hiring.name}
            </p>
            <p className="v4-panel-label" aria-hidden="true">
              {labels.classifieds}
            </p>
            {hasRoles ? (
              <p className="v4-panel-count">
                <span className="v4-live-dot" aria-hidden="true" />
                {hiringPill.prefix}
                {plural(roles.length, hiringPill.one, hiringPill.many)}
              </p>
            ) : null}
          </div>
          <div className="v4-classifieds-grid">
            <div className="v4-classifieds-lead">
              <h2 id={`${hiring.id}-title`} className="v4-classifieds-title">
                {hiring.title}
              </h2>
              <p className="v4-classifieds-lede">
                <MarkedPara para={hiring.lede} phrase={MARKS.hiring} />
              </p>
              <div className="v4-classifieds-actions">
                <Link className="v4-button" href={toV4(hiringButton.href)}>
                  {hiringButton.label}
                  <span className="v4-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <a className="v4-link" href={hiring.email.href}>
                  {hiring.email.label}
                </a>
              </div>
            </div>
            <div className="v4-ads">
              <h3 className="v4-ads-title">{hiring.listTitle}</h3>
              <ul>
                {hiring.list.map((line) => (
                  <li key={line.text} className="v4-ad">
                    <q>{line.text}</q>
                  </li>
                ))}
                <li className="v4-ad v4-ad--long">
                  <q>{jobPost.text}</q>
                  <span className="v4-ad-source">
                    <NoteLink href={jobPost.href}>{jobPost.source}</NoteLink>, {jobPost.dateLabel}
                  </span>
                </li>
              </ul>
            </div>
            {hasRoles ? (
              <div className="v4-teams">
                <h3 className="v4-ads-title">{labels.byTeam}</h3>
                <ul>
                  {rolesSection.groups.map((group) => (
                    <li key={group.key} className="v4-team">
                      <span className="v4-team-name">{group.heading}</span>
                      <span className="v4-team-leader" aria-hidden="true" />
                      <span className="v4-team-count">
                        {plural(group.count, rolesSection.countLabel.one, rolesSection.countLabel.many)}
                      </span>
                    </li>
                  ))}
                </ul>
                <Note n={notes.roles} className="v4-note--panel">
                  {rolesSection.caption}
                </Note>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* --- V. Numbers: the stats table ---------------------------------- */}
      <section id="numbers" className="v4-section v4-wrap" aria-labelledby="numbers-title">
        <ChapterHead
          id="numbers-title"
          numeral={labels.chapters.numbers.numeral}
          name={labels.chapters.numbers.name}
          title={stats.title}
        />
        <div className="v4-body v4-body--margin">
          <div className="v4-table-wrap">
            <table className="v4-table" aria-labelledby="numbers-title">
              <thead>
                <tr>
                  <th scope="col">{labels.tableFigure}</th>
                  <th scope="col">{labels.tableMeasure}</th>
                </tr>
              </thead>
              <tbody>
                {stats.items.map((item) => (
                  <tr key={item.label}>
                    <th scope="row" className="v4-table-figure">
                      {item.value}
                    </th>
                    <td className="v4-table-measure">
                      {item.label}
                      {item.href && item.linkLabel ? (
                        <>
                          {" "}
                          <Link className="v4-link v4-table-link" href={toV4(item.href)}>
                            {item.linkLabel}
                            <span className="v4-arrow" aria-hidden="true">
                              →
                            </span>
                          </Link>
                        </>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="v4-table-note">
              <span className="v4-note-label">{labels.tableNote}:</span> {stats.caption}
              {linkedin ? <NoteRef n={notes.numbers} /> : null}
            </p>
          </div>
          {linkedin ? (
            <div className="v4-margin">
              <Note n={notes.numbers}>
                <span className="v4-note-label">{labels.source}:</span>{" "}
                <NoteLink href={linkedin.href}>{linkedin.handle}</NoteLink>
              </Note>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
