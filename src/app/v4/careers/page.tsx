import { Disclosure } from "@/components/Disclosure";
import { ParaText } from "@/components/ParaText";
import { ChapterHead, kickerOf } from "@/components/v4/ChapterHead";
import { ScrubFigure } from "@/components/v4/Figure";
import { lede } from "@/components/v4/lede";
import { NUMERALS, SectionFront, type FrontItem } from "@/components/v4/SectionFront";
import { apply, criteria, faq, intro, mentorship, meta, rolesSection } from "@/content/careers";
import { hasRoles, roles } from "@/content/roles";
import { hiringPill } from "@/content/shared";
import { labels } from "@/content/v4";
import { plural } from "@/lib/site";
import { v4Metadata } from "@/lib/v4";
import "../inner.css";
import "./careers.css";

export const metadata = v4Metadata(meta);

// Careers, section E of the Broadsheet (plan/versions-spec.md, V4 inner
// pages: "roles as a classifieds page grouped by team, criteria as a
// numbered list, FAQ"). The section front carries the live count and the
// page's one scroll-scrubbed figure (the needle being threaded). Then the
// open roles as a classifieds page (every role a link to its listing on
// digitallynext.com, grouped by team in newspaper columns), what she looks
// for as a numbered list, the mentorship lines, the questions (the classic
// Disclosure, one open at a time) and Apply, set as the paper's last notice
// (Careers has no contact band, as on the classic site). All copy from
// src/content/careers.ts; every count from roles.ts, with the empty state
// when no role is listed.

export default function V4Careers() {
  const articles = [rolesSection, criteria, mentorship, faq, apply];
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
    dek: lede(articles[i].lede),
    label: null,
  });
  const count = plural(roles.length, hiringPill.one, hiringPill.many);
  const lastLine = mentorship.lines.length - 1;

  return (
    <div className="v4-inner v4-careers">
      <SectionFront
        id="v4-careers-title"
        letter={labels.sectionLetters.careers}
        flag={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        items={items}
        figure={
          <ScrubFigure
            name="needle-thread"
            n={1}
            caption={labels.careersCaption}
            frameClass="v4-frame--front"
            sizes="(min-width: 1024px) 40vw, 100vw"
            load
          />
        }
      >
        {hasRoles ? (
          <p className="v4-front-count">
            <span className="v4-live-dot" aria-hidden="true" />
            {hiringPill.prefix}
            {count}
          </p>
        ) : null}
      </SectionFront>

      {/* --- I. Open roles: the classifieds page ---------------------------- */}
      <section id={rolesSection.id} className="v4-section v4-wrap" aria-labelledby={`${rolesSection.id}-title`}>
        <div className="v4-panel v4-roles">
          <div className="v4-panel-bar">
            <p className="v4-panel-kicker">
              <span aria-hidden="true">{NUMERALS[0]} · </span>
              {rolesSection.eyebrow}
            </p>
            <p className="v4-panel-label" aria-hidden="true">
              {labels.classifieds}
            </p>
            {hasRoles ? (
              <p className="v4-panel-count">
                <span className="v4-live-dot" aria-hidden="true" />
                {hiringPill.prefix}
                {count}
              </p>
            ) : (
              <span className="v4-panel-count" aria-hidden="true" />
            )}
          </div>
          <div className="v4-roles-lead">
            <div>
              <h2 id={`${rolesSection.id}-title`} className="v4-roles-title">
                {rolesSection.title}
              </h2>
              {rolesSection.emptyText ? <p className="v4-roles-empty">{rolesSection.emptyText.text}</p> : null}
            </div>
            <div className="v4-roles-apply">
              <p className="v4-table-note">
                <span className="v4-note-label">{labels.tableNote}:</span> {rolesSection.caption}
              </p>
              <p className="v4-actions">
                <a className="v4-button" href={rolesSection.button.href}>
                  {rolesSection.button.label}
                </a>
                <a className="v4-link" href={rolesSection.link.href} target="_blank" rel="noopener noreferrer">
                  {rolesSection.link.label}
                  <span className="v4-sr-only">{labels.newTab}</span>
                </a>
              </p>
            </div>
          </div>
          {hasRoles ? (
            <div className="v4-roles-columns">
              {rolesSection.groups.map((group) => (
                <div key={group.key} className="v4-roles-group">
                  <div className="v4-roles-group-head">
                    <h3 className="v4-roles-group-title">{group.heading}</h3>
                    <p className="v4-roles-group-count">
                      {plural(group.count, rolesSection.countLabel.one, rolesSection.countLabel.many)}
                    </p>
                  </div>
                  <ul>
                    {group.roles.map((role) => (
                      <li key={role.href} className="v4-role">
                        <a href={role.href} target="_blank" rel="noopener noreferrer">
                          <span className="v4-role-title">{role.title}</span>
                          {/* An internship's department repeats its group
                              heading, so it is shown only where it adds
                              something (as on the classic list). */}
                          {role.department !== group.heading ? (
                            <span className="v4-role-department">{role.department}</span>
                          ) : null}
                          <span className="v4-sr-only">{labels.newTab}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* --- II. What I look for: a numbered list from the job posts ------- */}
      <section id={criteria.id} className="v4-section v4-wrap" aria-labelledby={`${criteria.id}-title`}>
        <ChapterHead {...head(1)} />
        <ol className="v4-col-wide v4-criteria">
          {criteria.items.map((item, i) => (
            <li key={item.text} className="v4-criterion">
              <span className="v4-criterion-n" aria-hidden="true">
                {i + 1}
              </span>
              <p className="v4-criterion-text">
                <q>{item.text}</q>
              </p>
            </li>
          ))}
        </ol>
        <p className="v4-col-text v4-criteria-closing">
          <ParaText para={criteria.closing} />
        </p>
      </section>

      {/* --- III. Mentorship: selected lines, every omission marked -------- */}
      <section id={mentorship.id} className="v4-section v4-wrap" aria-labelledby={`${mentorship.id}-title`}>
        <ChapterHead {...head(2)} />
        <figure className="v4-col-text v4-mentor">
          <span className="v4-rule v4-rule--thick v4-rule--grow" aria-hidden="true" />
          <blockquote className="v4-mentor-lines" cite={mentorship.link.href}>
            {mentorship.lines.map((line, i) => [
              line.gapBefore ? (
                <p key={`gap-${line.text}`} className="v4-mentor-gap">
                  <span aria-hidden="true">{mentorship.gap.mark}</span>
                  <span className="v4-sr-only">{mentorship.gap.label}</span>
                </p>
              ) : null,
              <p
                key={line.text}
                className={
                  i === 0 ? "v4-mentor-line v4-mentor-line--first" : i === lastLine ? "v4-mentor-line v4-mentor-line--last" : "v4-mentor-line"
                }
              >
                {line.text}
              </p>,
            ])}
          </blockquote>
          <figcaption className="v4-by">{mentorship.attribution}</figcaption>
          <p className="v4-actions">
            <a className="v4-link" href={mentorship.link.href} target="_blank" rel="noopener noreferrer">
              {mentorship.link.label}
              <span className="v4-sr-only">{labels.newTab}</span>
            </a>
          </p>
        </figure>
      </section>

      {/* --- IV. Questions: one answer open at a time, the first at load --- */}
      <section id={faq.id} className="v4-section v4-wrap" aria-labelledby={`${faq.id}-title`}>
        <ChapterHead {...head(3)} />
        <div className="v4-col-text v4-faq">
          {faq.items.map((item, index) => (
            <Disclosure key={item.question} summary={item.question} group="careers-faq" defaultOpen={index === 0} reveal={false}>
              <p>
                <ParaText para={item.answer} />
              </p>
            </Disclosure>
          ))}
        </div>
      </section>

      {/* --- V. Apply: the page's closing notice --------------------------- */}
      <section id={apply.id} className="v4-notice v4-apply" aria-labelledby={`${apply.id}-title`}>
        <div className="v4-wrap v4-notice-inner">
          <p className="v4-kicker">
            <span aria-hidden="true">{NUMERALS[4]} · </span>
            {apply.eyebrow}
          </p>
          <h2 id={`${apply.id}-title`} className="v4-notice-title">
            {apply.title}
          </h2>
          <p className="v4-notice-lede">{apply.paragraph}</p>
          <div className="v4-notice-actions">
            <a className="v4-button" href={apply.button.href}>
              {apply.button.label}
            </a>
            <a className="v4-link" href={apply.link.href} target="_blank" rel="noopener noreferrer">
              {apply.link.label}
              <span className="v4-sr-only">{labels.newTab}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
