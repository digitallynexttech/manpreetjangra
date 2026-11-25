import { Disclosure } from "@/components/Disclosure";
import { ParaText } from "@/components/ParaText";
import { AnyLink, EndCard, ExternalLink, SceneButton, SceneHead, TitleScene, headId } from "@/components/v3/Inner";
import { Rise } from "@/components/v3/Reels";
import { CreditsRoll, FootageScene, ScrollRefresh } from "@/components/v3/Scenes";
import { ledeText, withAccent } from "@/components/v3/text";
import { apply, criteria, faq, intro, mentorship, meta, rolesSection } from "@/content/careers";
import { hasRoles, roles } from "@/content/roles";
import { hiringPill } from "@/content/shared";
import { toV3 } from "@/content/v3";
import { plural } from "@/lib/site";
import { TITLE_FOOTAGE, v3Metadata } from "@/lib/v3";

export const metadata = v3Metadata(meta);

// /v3/careers (plan/versions-spec.md 3, V3 Inner pages: "Careers: roles as a
// credits list grouped by team, criteria as subtitles, FAQ"), in the first
// person like the classic page. Top to bottom:
//   title scene (needle and thread, with the hiring count), the open roles
//   (the count, the date of the list and the two ways to apply, then every
//   role as a credit under its team), what I look for (the twelve job-post
//   lines as subtitles, one at a time, over red silk; then the agency's own
//   line), mentorship (her caption's selected lines), questions (one answer
//   open at a time, the first open) and apply (the end card).
// Every count comes from roles.ts through plural(): with no roles the page
// shows its empty state (no count, no list), and one role or one internship
// reads in the singular. All copy comes from src/content (careers, roles,
// shared).

const HREF = toV3("/careers");

export default function V3Careers() {
  const total = criteria.items.length;
  return (
    <>
      <TitleScene
        href={HREF}
        sequence={TITLE_FOOTAGE.careers}
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        focusX={0.6}
      >
        {hasRoles ? (
          <p className="v3-pill v3-opening-pill">
            <span className="v3-pill-dot" aria-hidden="true" />
            {hiringPill.prefix}
            {plural(roles.length, hiringPill.one, hiringPill.many)}
          </p>
        ) : null}
      </TitleScene>

      {/* Open roles: the head, then each team's roles as credits (title on
          the right, linked to its listing; the department on the left where
          it adds something). With no roles: the empty heading and text. */}
      <section id={rolesSection.id} className="v3-section v3-roles" aria-labelledby={headId(rolesSection.id)}>
        <Rise className="v3-wrap">
          <SceneHead
            id={rolesSection.id}
            eyebrow={rolesSection.eyebrow}
            title={rolesSection.title}
            accent={rolesSection.accent}
            className="v3-head--center"
            rise
          >
            {rolesSection.emptyText ? (
              <p className="v3-lede" data-v3-in>
                {rolesSection.emptyText.text}
              </p>
            ) : null}
            <p className="v3-caption" data-v3-in>
              {rolesSection.caption}
            </p>
            <div className="v3-actions" data-v3-in>
              <SceneButton href={rolesSection.button.href}>{rolesSection.button.label}</SceneButton>
              <AnyLink href={rolesSection.link.href}>{rolesSection.link.label}</AnyLink>
            </div>
          </SceneHead>
        </Rise>
        {hasRoles ? (
          <CreditsRoll>
            {rolesSection.groups.map((group) => (
              <div key={group.key} className="v3-credits-block v3-role-group">
                <h3 className="v3-credits-heading" data-v3-credit>
                  {group.heading}
                </h3>
                <p className="v3-role-count" data-v3-credit>
                  {plural(group.count, rolesSection.countLabel.one, rolesSection.countLabel.many)}
                </p>
                <ul className="v3-credit-list v3-credit-list--small">
                  {group.roles.map((role) => (
                    <li key={role.href} className="v3-credit" data-v3-credit>
                      {/* An internship's department repeats its team's
                          heading, so it is shown only where it adds something. */}
                      <span className="v3-credit-left">{role.department !== group.heading ? role.department : null}</span>
                      <span className="v3-credit-right">
                        <ExternalLink href={role.href} className="v3-credit-name v3-credit-name--small">
                          {role.title}
                        </ExternalLink>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CreditsRoll>
        ) : null}
      </section>

      {/* What I look for: the twelve lines from the job posts she fronted,
          quoted as written, as subtitles one at a time. */}
      <section id={criteria.id} className="v3-criteria" aria-labelledby={headId(criteria.id)}>
        <FootageScene kind="subtitles" sequence="vermilion-silk" focusY={0.5}>
          <span className="v3-shade" aria-hidden="true" />
          <div className="v3-words-head" data-v3-head>
            <p className="v3-slate">{criteria.eyebrow}</p>
            <h2 id={headId(criteria.id)} className="v3-scene-title">
              {withAccent(criteria.title, criteria.accent)}
            </h2>
            <p className="v3-lede">{ledeText(criteria.lede)}</p>
          </div>
          <ol className="v3-oneby">
            {criteria.items.map((item, index) => (
              <li key={item.text} className="v3-oneby-line" data-v3-line>
                <span className="v3-oneby-count" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <q className="v3-oneby-text">{item.text}</q>
              </li>
            ))}
          </ol>
        </FootageScene>
        <Rise className="v3-after">
          <p className="v3-after-text" data-v3-in>
            <ParaText para={criteria.closing} />
          </p>
        </Rise>
      </section>

      {/* Mentorship: selected lines of her June 2025 caption about the
          summer interns; every omission is marked. */}
      <section id={mentorship.id} className="v3-section v3-section--raised" aria-labelledby={headId(mentorship.id)}>
        <Rise className="v3-split">
          <SceneHead
            id={mentorship.id}
            eyebrow={mentorship.eyebrow}
            title={mentorship.title}
            accent={mentorship.accent}
            lede={mentorship.lede}
            className="v3-split-head"
            rise
          />
          <div className="v3-lines" data-v3-in>
            <figure>
              <blockquote cite={mentorship.link.href}>
                {mentorship.lines.map((line) => [
                  line.gapBefore ? (
                    <p key={`gap-${line.text}`} className="v3-lines-gap">
                      <span aria-hidden="true">{mentorship.gap.mark}</span>
                      <span className="v3-sr-only">{mentorship.gap.label}</span>
                    </p>
                  ) : null,
                  <p key={line.text} className="v3-lines-text">
                    {line.text}
                  </p>,
                ])}
              </blockquote>
              <figcaption className="v3-card-quote-by">{mentorship.attribution}</figcaption>
            </figure>
            <p>
              <AnyLink href={mentorship.link.href}>{mentorship.link.label}</AnyLink>
            </p>
          </div>
        </Rise>
      </section>

      {/* Questions: one answer open at a time, the first open at load. */}
      <section id={faq.id} className="v3-section" aria-labelledby={headId(faq.id)}>
        <Rise className="v3-split">
          <SceneHead id={faq.id} eyebrow={faq.eyebrow} title={faq.title} accent={faq.accent} className="v3-split-head" rise />
          <div className="v3-faq">
            {faq.items.map((item, index) => (
              <div key={item.question} data-v3-in>
                <Disclosure summary={item.question} group="careers-faq" defaultOpen={index === 0} reveal={false} className="v3-qa">
                  <p>
                    <ParaText para={item.answer} />
                  </p>
                </Disclosure>
              </div>
            ))}
          </div>
        </Rise>
      </section>

      <EndCard
        id={apply.id}
        eyebrow={apply.eyebrow}
        title={apply.title}
        accent={apply.accent}
        lede={apply.paragraph}
        primary={apply.button}
        secondary={apply.link}
      />

      <ScrollRefresh />
    </>
  );
}
