import Link from "next/link";
import { ParaText } from "@/components/ParaText";
import { ChapterHead, kickerOf } from "@/components/v4/ChapterHead";
import { ScrubFigure } from "@/components/v4/Figure";
import { MarkedPara } from "@/components/v4/Mark";
import { Note, NoteLink, NoteRef } from "@/components/v4/Note";
import { lede } from "@/components/v4/lede";
import { NUMERALS, SectionFront, type FrontItem } from "@/components/v4/SectionFront";
import { VentureDirectory, type DirectoryLabels } from "@/components/v4/VentureDirectory";
import { journey as aboutJourney } from "@/content/about";
import { rolesSection } from "@/content/careers";
import { socialLinks } from "@/content/navigation";
import { quotes } from "@/content/quotes";
import { hasRoles } from "@/content/roles";
import { labels, toV4 } from "@/content/v4";
import { adac, clientStats, clientStory, group, how, intro, meta, operations, talent, ventures } from "@/content/work";
import { v4Metadata } from "@/lib/v4";
import { quoteView, ventureView } from "@/lib/views";
import "../inner.css";
import "./work.css";

export const metadata = v4Metadata(meta);

// Work, section C of the Broadsheet (plan/versions-spec.md, V4 inner pages:
// "operations as a feature with sidenotes; ventures as a directory listing
// with website previews"). The section front carries the page's one
// scroll-scrubbed figure (the red silk). Then six articles: operations as a
// feature (drop cap, the service lines, the markets), talent, the AI
// Decision and Acceleration Center, how she works (two posts, side by
// side), the client story (its numbers as a table, its line as a pull
// quote) and the group as a directory. All copy from src/content/work.ts;
// sidenotes carry the sources the content files hold.

/** The phrase drawn over with the marigold highlighter in the ADAC article. */
const MARK = "ADAC decides the difference.";

const DIRECTORY: DirectoryLabels = {
  name: labels.directoryName,
  site: labels.directorySite,
  newTab: labels.newTab,
  previewWebsite: labels.previewWebsite,
  previewThe: labels.previewThe,
  previewWindow: labels.previewWindow,
  closePreview: labels.closePreview,
  visit: labels.visit,
};

export default function V4Work() {
  const articles = [operations, talent, adac, how, clientStory, group];
  const items: FrontItem[] = articles.map((article, i) => ({
    numeral: NUMERALS[i],
    name: kickerOf(article.eyebrow),
    teaser: article.title,
    href: `#${article.id}`,
  }));
  const head = (i: number) => ({
    id: `${articles[i].id}-title`,
    numeral: NUMERALS[i],
    name: kickerOf(articles[i].eyebrow),
    title: articles[i].title,
    label: null,
  });

  // The talent paragraph: her hiring record, then (when roles are listed)
  // today's count, each with its own note.
  const [record, ...today] = talent.paragraph.text.split(/(?<=\.) /);
  const cutshort = aboutJourney.entries.find((entry) => entry.id === "2023-2024");
  const cutshortSource = cutshort?.sources?.[0];
  const linkedin = socialLinks.find((link) => link.key === "linkedin");
  const jobPost = quoteView(talent.quote.quote);
  const trust = quotes[clientStory.quote.quote];
  const trustView = quoteView(clientStory.quote.quote);

  // Sidenote numbers, in reading order.
  let noteCount = 0;
  const next = () => ++noteCount;
  const notes = {
    operations: next(),
    talent: cutshortSource ? next() : 0,
    roles: hasRoles && today.length > 0 ? next() : 0,
    adac: linkedin ? next() : 0,
    client: next(),
  };

  return (
    <div className="v4-inner v4-work">
      <SectionFront
        id="v4-work-title"
        letter={labels.sectionLetters.work}
        flag={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        items={items}
        figure={
          <ScrubFigure
            name="vermilion-silk"
            n={1}
            caption={labels.workCaption}
            frameClass="v4-frame--front"
            sizes="(min-width: 1024px) 40vw, 100vw"
            load
          />
        }
      />

      {/* --- I. Operations: a feature with a drop cap and its sidenote ---- */}
      <section id={operations.id} className="v4-section v4-wrap" aria-labelledby={`${operations.id}-title`}>
        <ChapterHead {...head(0)} />
        <div className="v4-body v4-body--margin v4-body--indent">
          <div className="v4-prose">
            <p className="v4-dropcap">
              <ParaText para={operations.model} />
              <NoteRef n={notes.operations} />
            </p>
            <div className="v4-lines" role="group" aria-labelledby="v4-lines-title">
              <h3 id="v4-lines-title" className="v4-ads-title">
                {labels.serviceLines}
              </h3>
              <ol>
                {operations.serviceLines.map((line) => (
                  <li key={line.index} className="v4-line">
                    <span className="v4-line-index">{line.index}</span>
                    <span className="v4-line-text">{line.text}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p>
              {operations.markets.text}
              <NoteRef n={notes.operations} />
            </p>
          </div>
          <div className="v4-margin">
            <Note n={notes.operations}>{operations.caption.text}</Note>
          </div>
        </div>
      </section>

      {/* --- II. Talent: her hiring record, a line from a job post --------- */}
      <section id={talent.id} className="v4-section v4-wrap" aria-labelledby={`${talent.id}-title`}>
        <ChapterHead {...head(1)} />
        <div className="v4-body v4-body--margin v4-body--indent">
          <div className="v4-prose">
            <p className="v4-lead-para">
              {record}
              {notes.talent ? <NoteRef n={notes.talent} /> : null}
              {today.length > 0 ? (
                <>
                  {" "}
                  {today.join(" ")}
                  {notes.roles ? <NoteRef n={notes.roles} /> : null}
                </>
              ) : null}
            </p>
            <figure className="v4-boxquote">
              <blockquote cite={jobPost.href}>
                <p>{jobPost.text}</p>
              </blockquote>
              <figcaption className="v4-by">
                {jobPost.href ? <NoteLink href={jobPost.href}>{jobPost.attribution}</NoteLink> : jobPost.attribution}
              </figcaption>
            </figure>
            <p className="v4-actions">
              <Link className="v4-link" href={toV4(talent.link.href)}>
                {talent.link.label}
                <span className="v4-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </p>
          </div>
          <div className="v4-margin">
            {notes.talent && cutshort && cutshortSource ? (
              <Note n={notes.talent}>
                <span className="v4-note-label">{labels.source}:</span>{" "}
                <NoteLink href={cutshortSource.href}>{cutshortSource.label}</NoteLink>, {cutshort.year}
              </Note>
            ) : null}
            {notes.roles ? <Note n={notes.roles}>{rolesSection.caption}</Note> : null}
          </div>
        </div>
      </section>

      {/* --- III. The AI Decision and Acceleration Center ------------------ */}
      <section id={adac.id} className="v4-section v4-wrap" aria-labelledby={`${adac.id}-title`}>
        <ChapterHead {...head(2)} />
        <div className="v4-body v4-body--margin v4-body--indent">
          <div className="v4-prose">
            <p className="v4-lead-para">
              <MarkedPara para={adac.paragraph} phrase={MARK} />
              {notes.adac ? <NoteRef n={notes.adac} /> : null}
            </p>
            {adac.roles ? <p>{adac.roles.text}</p> : null}
          </div>
          {linkedin && notes.adac ? (
            <div className="v4-margin">
              <Note n={notes.adac}>
                <span className="v4-note-label">{labels.source}:</span>{" "}
                <NoteLink href={linkedin.href}>{linkedin.handle}</NoteLink>
              </Note>
            </div>
          ) : null}
        </div>
      </section>

      {/* --- IV. How I work: two posts, side by side ----------------------- */}
      <section id={how.id} className="v4-section v4-wrap" aria-labelledby={`${how.id}-title`}>
        <ChapterHead {...head(3)} dek={lede(how.lede)} />
        <ul className="v4-col-wide v4-posts">
          {how.quotes.map((ref) => {
            const quote = quoteView(ref.quote, ref.linkLabel);
            return (
              <li key={ref.quote} className="v4-post">
                <figure>
                  <blockquote cite={quote.href}>
                    <p>{quote.text}</p>
                  </blockquote>
                  <figcaption className="v4-by">{quote.attribution}</figcaption>
                </figure>
                {quote.href && quote.linkLabel ? (
                  <p className="v4-post-link">
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

      {/* --- V. A client story: the numbers as a table, the line as a
             pull quote ---------------------------------------------------- */}
      <section id={clientStory.id} className="v4-section v4-wrap" aria-labelledby={`${clientStory.id}-title`}>
        <ChapterHead
          {...head(4)}
          dek={
            <>
              {lede(clientStory.lede)}
              <NoteRef n={notes.client} />
            </>
          }
        />
        <div className="v4-body v4-body--margin">
          <div className="v4-table-wrap">
            <table className="v4-table" aria-labelledby={`${clientStory.id}-title`}>
              <thead>
                <tr>
                  <th scope="col">{labels.tableFigure}</th>
                  <th scope="col">{labels.tableMeasure}</th>
                </tr>
              </thead>
              <tbody>
                {clientStats.map((item) => (
                  <tr key={item.label}>
                    <th scope="row" className="v4-table-figure">
                      {item.value}
                    </th>
                    <td className="v4-table-measure">{item.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="v4-margin">
            <Note n={notes.client}>
              <span className="v4-note-label">{labels.source}:</span>{" "}
              <NoteLink href={clientStory.link.href}>{trust.source}</NoteLink>, {trust.dateLabel}
            </Note>
          </div>
        </div>
        <figure className="v4-pullquote v4-pullquote--short">
          <span className="v4-rule v4-rule--thick v4-rule--grow" aria-hidden="true" />
          <blockquote className="v4-pullquote-text" cite={trustView.href}>
            <p>{trustView.text}</p>
          </blockquote>
          <figcaption className="v4-pullquote-by">{trustView.attribution}</figcaption>
          <span className="v4-rule v4-rule--grow" aria-hidden="true" />
        </figure>
        <p className="v4-actions v4-actions--centre">
          <a className="v4-link" href={clientStory.link.href} target="_blank" rel="noopener noreferrer">
            {clientStory.link.label}
            <span className="v4-sr-only">{labels.newTab}</span>
          </a>
        </p>
      </section>

      {/* --- VI. The group: a directory with website previews -------------- */}
      <section id={group.id} className="v4-section v4-wrap" aria-labelledby={`${group.id}-title`}>
        <ChapterHead {...head(5)} dek={lede(group.lede)} />
        <div className="v4-col-wide">
          <VentureDirectory ventures={ventures.map(ventureView)} labels={DIRECTORY} />
        </div>
      </section>
    </div>
  );
}
