import { Button } from "@/components/Button";
import { Disclosure } from "@/components/Disclosure";
import { HiringPill } from "@/components/HiringPill";
import { PageIntro } from "@/components/PageIntro";
import PageTransition from "@/components/PageTransition";
import { ParaText } from "@/components/ParaText";
import { RoleList } from "@/components/RoleList";
import { SectionHead, titleId } from "@/components/SectionHead";
import { TextLink } from "@/components/TextLink";
import { apply, criteria, faq, intro, mentorship, meta, rolesSection } from "@/content/careers";
import { introImages } from "@/content/images";
import { hasRoles, roles } from "@/content/roles";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(meta);

// The Careers page (spec 4.5), in the first person: her remit and what she
// looks for, with the job-post lines verbatim. Surfaces, top to bottom: intro
// (paper, with the Hiring pill), open roles (paper, sticky heading), what I
// look for (sand), mentorship (paper), questions (paper, hairline above),
// apply (sand), then the night footer. There is no contact band: the page
// ends with its own call to action. All copy comes from
// src/content/careers.ts; every count comes from roles.ts, and with no roles
// listed the page switches to its empty state (spec 4.9).

export default function Careers() {
  // The middle of the criteria list: from md the list runs down two columns,
  // and the first item of the second column gets its own hairline above.
  const criteriaRows = Math.ceil(criteria.items.length / 2);
  return (
    <PageTransition>
      <PageIntro
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        image={introImages.careers}
      >
        {hasRoles ? <HiringPill count={roles.length} /> : null}
      </PageIntro>

      {/* Open roles: the count, the date of the list and the two ways to
          apply stay in view on desktop while the roles scroll past. */}
      <section id={rolesSection.id} aria-labelledby={titleId(rolesSection.id)} className="site-section">
        <div className="site-wrap site-editorial-grid">
          <div className="mb-12 lg:mb-0">
            <SectionHead
              id={rolesSection.id}
              eyebrow={rolesSection.eyebrow}
              title={rolesSection.title}
              accent={rolesSection.accent}
              className="mb-0"
            />
            {rolesSection.emptyText ? (
              <p className="site-prose mt-5" data-reveal>
                {rolesSection.emptyText.text}
              </p>
            ) : null}
            <p className="site-caption mt-5 max-w-[30rem]" data-reveal>
              {rolesSection.caption}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" data-reveal>
              <Button href={rolesSection.button.href} icon="mail">
                {rolesSection.button.label}
              </Button>
              <TextLink href={rolesSection.link.href} external={rolesSection.link.external}>
                {rolesSection.link.label}
              </TextLink>
            </div>
          </div>
          {hasRoles ? <RoleList groups={rolesSection.groups} countLabel={rolesSection.countLabel} /> : null}
        </div>
      </section>

      {/* What I look for: twelve lines from the job posts she fronted,
          quoted as written. */}
      <section id={criteria.id} aria-labelledby={titleId(criteria.id)} className="site-section bg-sand">
        <div className="site-wrap">
          <SectionHead
            id={criteria.id}
            eyebrow={criteria.eyebrow}
            title={criteria.title}
            accent={criteria.accent}
            lede={criteria.lede}
          />
          <ul
            className="site-criteria"
            style={{ gridTemplateRows: `repeat(${criteriaRows}, auto)` }}
            data-reveal="group"
          >
            {criteria.items.map((item, index) => (
              <li key={item.text} className={index === criteriaRows ? "site-criteria-column" : undefined} data-reveal>
                <q>{item.text}</q>
              </li>
            ))}
          </ul>
          <p className="site-prose mt-10 text-small text-ink-muted" data-reveal>
            <ParaText para={criteria.closing} />
          </p>
        </div>
      </section>

      {/* Mentorship: selected lines of her June 2025 caption about the
          summer interns; every omission is marked. */}
      <section id={mentorship.id} aria-labelledby={titleId(mentorship.id)} className="site-section">
        <div className="site-wrap site-grid">
          <div className="site-sticky-col lg:col-span-5">
            <SectionHead
              id={mentorship.id}
              eyebrow={mentorship.eyebrow}
              title={mentorship.title}
              accent={mentorship.accent}
              lede={mentorship.lede}
              className="lg:mb-0"
            />
          </div>
          <figure className="site-quote lg:col-span-6 lg:col-start-7" data-reveal>
            <blockquote cite={mentorship.link.href} className="site-quote-lines">
              {mentorship.lines.map((line) => [
                line.gapBefore ? (
                  <p key={`gap-${line.text}`} className="site-quote-gap">
                    <span aria-hidden="true">{mentorship.gap.mark}</span>
                    <span className="site-sr-only">{mentorship.gap.label}</span>
                  </p>
                ) : null,
                <p key={line.text} className="site-quote-text">
                  {line.text}
                </p>,
              ])}
            </blockquote>
            {/* Attribution and source link as on every QuoteCard. */}
            <figcaption className="site-quote-attribution site-caption">{mentorship.attribution}</figcaption>
            <p className="site-quote-link">
              <TextLink href={mentorship.link.href} external={mentorship.link.external}>
                {mentorship.link.label}
              </TextLink>
            </p>
          </figure>
        </div>
      </section>

      {/* Questions: one answer open at a time, the first open at load. */}
      <section id={faq.id} aria-labelledby={titleId(faq.id)} className="site-section pt-0">
        <div className="site-wrap">
          <div className="site-grid site-hairline-above">
            <div className="lg:col-span-5">
              <SectionHead id={faq.id} eyebrow={faq.eyebrow} title={faq.title} accent={faq.accent} className="lg:mb-0" />
            </div>
            <div className="site-disclosures lg:col-span-6 lg:col-start-7" data-reveal="group">
              {faq.items.map((item, index) => (
                <Disclosure key={item.question} summary={item.question} group="careers-faq" defaultOpen={index === 0}>
                  <p>
                    <ParaText para={item.answer} />
                  </p>
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Apply: the page's closing call to action. */}
      <section id={apply.id} aria-labelledby={titleId(apply.id)} className="site-section bg-sand">
        <div className="site-wrap site-grid">
          <div className="lg:col-span-7">
            <SectionHead id={apply.id} eyebrow={apply.eyebrow} title={apply.title} accent={apply.accent} className="mb-0" />
            <p className="mt-5" data-reveal>
              {apply.paragraph}
            </p>
          </div>
          <div
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-end lg:justify-end"
            data-reveal
          >
            <Button href={apply.button.href} icon="mail">
              {apply.button.label}
            </Button>
            <TextLink href={apply.link.href} external={apply.link.external}>
              {apply.link.label}
            </TextLink>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
