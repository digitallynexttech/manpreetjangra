import type { CSSProperties } from "react";
import { HiringPill } from "@/components/HiringPill";
import { ParaText } from "@/components/ParaText";
import { apply, criteria, faq, intro, mentorship, rolesSection } from "@/content/careers";
import { hero as homeHero } from "@/content/home";
import { fullTime, hasRoles, internships, roles } from "@/content/roles";
import { hiringPill } from "@/content/shared";
import { labels } from "@/content/v2";
import { ventures } from "@/content/work";
import { plural } from "@/lib/site";
import { BigFigure } from "../BigFigure";
import { BigRows } from "../BigRows";
import { MixedHeading } from "../MixedHeading";
import { PillButton } from "../PillButton";
import { Reveal } from "../Reveal";
import { ThreadDraw } from "../ThreadDraw";
import { ThreadField } from "../ThreadField";
import { ThreadMark } from "../ThreadMark";
import { V2PageHero } from "../V2PageHero";
import { WordReveal } from "../WordReveal";
import { mixParts } from "../parts";

// The sections of /v2/careers (plan/v2-spec.md 4.2, 4.6), in her first
// person: her remit and what she looks for, with the job-post lines
// verbatim. Every word comes from src/content/careers.ts, and every count
// from roles.ts, so the page follows the classic empty and singular states
// (classic spec 4.9): with no roles the Hiring pill, the big number and the
// role list are gone and the roles heading says so; one role reads "1 open
// role"; a group with one role reads "1 role".

const titleId = (id: string) => `v2-${id}-title`;

/** 1. "HOW I HIRE" (her own words for this page, from the home page) with
 *  the scribble under HOW; the meta row is the agency and what is open now
 *  (counted from roles.ts; the agency's own line when nothing is open); the
 *  classic H1, her line about the interns, sits over the lede; then the live
 *  Hiring pill. */
export function CareersHero() {
  const agency = ventures[0];
  const meta = hasRoles
    ? [
        agency.name,
        ...(fullTime.length ? [plural(fullTime.length, "One full-time role", "{n} full-time roles")] : []),
        ...(internships.length ? [plural(internships.length, "one internship", "{n} internships")] : []),
      ]
    : agency.category.split(" · ");
  return (
    <V2PageHero
      id="v2-careers-title"
      title={mixParts(homeHero.secondaryEmpty.label, [homeHero.secondaryEmpty.label.split(" ")[0]]).map((part) =>
        part.voice === "serif" ? { ...part, plain: true, mark: "underline" as const } : part,
      )}
      meta={meta}
      ledeLabel={intro.title}
      lede={intro.lede}
      accent="what I look for."
      fitWide={0.877}
    >
      {hasRoles ? <HiringPill count={roles.length} className="v2-careers-pill" /> : null}
    </V2PageHero>
  );
}

/** 2. Open roles. Lando's giant number first: every role listed now (not
 *  shown with none), then the heading with the date of the list and the two
 *  ways to apply, then one block per group as a results table (title,
 *  department, an arrow out to the role's listing on digitallynext.com),
 *  the group's name and count staying in view on desktop while its rows
 *  pass. */
export function CareersRoles() {
  // "1 open role", "{n} open roles" without the number: the number is the figure.
  const figureLabel = plural(roles.length, hiringPill.one, hiringPill.many).replace(/^\S+\s/, "");
  // "21 full-time roles and 7 internships.": the second half in the serif voice.
  const titleRest = rolesSection.title.split(" and ")[1];
  return (
    <section id={rolesSection.id} className="v2-surface v2-inner-section v2-careers-roles" data-v2-theme="paper" aria-labelledby={titleId(rolesSection.id)}>
      <ThreadField seed={151} count={10} />
      {hasRoles ? (
        <div className="v2-wrap v2-inner-figure v2-careers-figure">
          <BigFigure value={String(roles.length)} label={figureLabel} />
        </div>
      ) : null}
      <div className="v2-wrap">
        <div className="v2-inner-head">
          <div>
            <p className="v2-label v2-inner-eyebrow">{rolesSection.eyebrow}</p>
            <MixedHeading
              id={titleId(rolesSection.id)}
              size="title"
              parts={mixParts(rolesSection.title, titleRest ? [`and ${titleRest}`] : ["right now."])}
              className="v2-careers-roles-title"
            />
            {rolesSection.emptyText ? (
              <p className="v2-lede v2-careers-empty">{rolesSection.emptyText.text}</p>
            ) : null}
          </div>
          <div className="v2-careers-roles-side">
            <p className="v2-label">{rolesSection.caption}</p>
            <div className="v2-careers-actions">
              <PillButton href={rolesSection.button.href}>{rolesSection.button.label}</PillButton>
              <PillButton href={rolesSection.link.href} variant="outline" newTabLabel={labels.newTab}>
                {rolesSection.link.label}
              </PillButton>
            </div>
          </div>
        </div>
        {hasRoles ? (
          <div className="v2-careers-groups">
            {rolesSection.groups.map((group) => {
              // An internship's department repeats its group heading, so
              // that column is left out where it adds nothing (as on the
              // classic list).
              const showDepartment = group.roles.some((role) => role.department !== group.heading);
              return (
                <div key={group.key} className="v2-careers-group">
                  <div className="v2-careers-group-head">
                    <h3 className="v2-sans v2-careers-group-name">{group.heading}</h3>
                    <p className="v2-label">{plural(group.count, rolesSection.countLabel.one, rolesSection.countLabel.many)}</p>
                  </div>
                  <Reveal items=".v2-row" y={24}>
                    <BigRows
                      className="v2-careers-rows"
                      newTabLabel={labels.newTab}
                      columns={
                        showDepartment
                          ? [
                              { header: labels.role, width: "minmax(0, 1.5fr)" },
                              { header: labels.department, width: "minmax(0, 1fr)", kind: "small" },
                            ]
                          : [{ header: labels.role, width: "minmax(0, 1fr)" }]
                      }
                      rows={group.roles.map((role) => ({
                        key: role.href,
                        href: role.href,
                        cells: showDepartment ? [role.title, role.department] : [role.title],
                      }))}
                    />
                  </Reveal>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** 3. What I look for, as a night manifesto: the heading, then the first
 *  line of her job posts set huge and lighting up word by word, where they
 *  come from, and the other eleven lines as a two-column list with a small
 *  thread mark each (Lando's list with laurels); the agency's own line
 *  closes it. */
export function CareersCriteria() {
  const [first, ...rest] = criteria.items;
  return (
    <section id={criteria.id} className="v2-surface v2-inner-manifesto v2-careers-criteria" data-v2-theme="night" aria-labelledby={titleId(criteria.id)}>
      <ThreadField seed={163} count={11} />
      <div className="v2-wrap v2-inner-manifesto-inner">
        <div className="v2-inner-manifesto-head">
          <ThreadMark />
          <p className="v2-label">{criteria.eyebrow}</p>
          <MixedHeading id={titleId(criteria.id)} size="title" align="center" parts={mixParts(criteria.title, ["over experts."])} />
        </div>
        {first ? (
          <WordReveal text={`“${first.text}”`} accent="always willing to learn" size="manifesto" className="v2-inner-manifesto-text v2-careers-manifesto" />
        ) : null}
        {typeof criteria.lede === "string" ? <p className="v2-body v2-inner-manifesto-after">{criteria.lede}</p> : null}
        <Reveal
          as="ul"
          className="v2-careers-criteria-list"
          items="li"
          y={28}
          // From 768 px the list runs down two columns.
          style={{ "--rows": Math.ceil(rest.length / 2) } as CSSProperties}
        >
          {rest.map((item) => (
            <li key={item.text} className="v2-careers-criterion">
              <ThreadMark className="v2-careers-criterion-mark" />
              <p className="v2-sans v2-careers-criterion-text">
                <q className="v2-quote">{item.text}</q>
              </p>
            </li>
          ))}
        </Reveal>
        <p className="v2-body v2-careers-closing">
          <ParaText para={criteria.closing} />
        </p>
      </div>
    </section>
  );
}

/** 4. Mentorship: the heading and her note on blush, and beside it the
 *  selected lines of her June 2025 caption in the serif italic, every
 *  omission marked (the mark shown, "Lines omitted." read aloud), a
 *  vermilion underline drawn by the scroll, the source and the link. */
export function CareersMentorship() {
  return (
    <section
      id={mentorship.id}
      className="v2-surface v2-surface--blush v2-inner-section v2-careers-mentorship"
      data-v2-theme="paper"
      aria-labelledby={titleId(mentorship.id)}
    >
      <div className="v2-wrap v2-inner-split">
        <div>
          <p className="v2-label v2-inner-eyebrow">{mentorship.eyebrow}</p>
          <MixedHeading id={titleId(mentorship.id)} size="title" parts={mixParts(mentorship.title, ["matters."])} />
          {typeof mentorship.lede === "string" ? <p className="v2-body v2-careers-mentorship-lede">{mentorship.lede}</p> : null}
        </div>
        <Reveal>
          <figure className="v2-quotefig v2-quotefig--large v2-careers-lines">
            <blockquote cite={mentorship.link.href}>
              {mentorship.lines.map((line) => [
                line.gapBefore ? (
                  <p key={`gap-${line.text}`} className="v2-careers-gap">
                    <span aria-hidden="true">{mentorship.gap.mark}</span>
                    <span className="v2-sr-only">{mentorship.gap.label}</span>
                  </p>
                ) : null,
                <p key={line.text} className="v2-quotefig-text">
                  {line.text}
                </p>,
              ])}
            </blockquote>
            <ThreadDraw variant="underline" shape="line" trigger="scroll" start="top 85%" end="top 45%" className="v2-careers-lines-mark" />
            <figcaption className="v2-label v2-quotefig-cite">{mentorship.attribution}</figcaption>
            <PillButton href={mentorship.link.href} variant="outline" newTabLabel={labels.newTab}>
              {mentorship.link.label}
            </PillButton>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/** 5. Questions: the four answers as big rows that open one at a time (the
 *  classic Disclosure's logic), the first open. */
export function CareersFaq() {
  return (
    <section id={faq.id} className="v2-surface v2-inner-section v2-careers-faq" data-v2-theme="paper" aria-labelledby={titleId(faq.id)}>
      <div className="v2-wrap v2-inner-split">
        <div>
          <p className="v2-label v2-inner-eyebrow">{faq.eyebrow}</p>
          <MixedHeading id={titleId(faq.id)} size="title" parts={mixParts(faq.title, ["you apply."])} />
        </div>
        <Reveal items=".v2-row" y={24}>
          <BigRows
            group="v2-careers-faq"
            className="v2-careers-faq-rows"
            columns={[{ width: "minmax(0, 1fr)" }]}
            rows={faq.items.map((item, index) => ({
              key: item.question,
              cells: [item.question],
              open: index === 0,
              detail: (
                <p className="v2-body v2-careers-answer">
                  <ParaText para={item.answer} />
                </p>
              ),
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}

/** 6. Apply: the page's own call to action, centred (Lando's "See more"):
 *  the heading in both voices, the address line, the CV mailto and the
 *  agency's list of every role. */
export function CareersApply() {
  return (
    <section id={apply.id} className="v2-surface v2-surface--sand v2-inner-section v2-careers-apply" data-v2-theme="paper" aria-labelledby={titleId(apply.id)}>
      <ThreadField seed={177} count={9} />
      <div className="v2-wrap v2-careers-apply-inner">
        <p className="v2-label">{apply.eyebrow}</p>
        <MixedHeading id={titleId(apply.id)} size="display" align="center" parts={mixParts(apply.title, ["your CV."])} />
        <p className="v2-lede v2-careers-apply-text">{apply.paragraph}</p>
        <div className="v2-careers-actions v2-careers-actions--center">
          <PillButton href={apply.button.href} size="large">
            {apply.button.label}
          </PillButton>
          <PillButton href={apply.link.href} variant="outline" size="large" newTabLabel={labels.newTab}>
            {apply.link.label}
          </PillButton>
        </div>
      </div>
    </section>
  );
}
