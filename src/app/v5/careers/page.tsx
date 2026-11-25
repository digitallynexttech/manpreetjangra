import { ArrowUpRight, CircleHelp, HeartHandshake, ListChecks, Mail, Send, UsersRound } from "lucide-react";
import { Disclosure } from "@/components/Disclosure";
import { ParaText } from "@/components/ParaText";
import { V5Button } from "@/components/v5/Button";
import { Chip } from "@/components/v5/Chip";
import { HeadTile, ledeOf } from "@/components/v5/Heads";
import { PageHeader } from "@/components/v5/PageHeader";
import { RoleDots } from "@/components/v5/RoleDots";
import { SilkTile } from "@/components/v5/SilkTile";
import { SpringNumber } from "@/components/v5/SpringNumber";
import { Tile, type Tone } from "@/components/v5/Tile";
import { apply, criteria, faq, intro, mentorship, meta, rolesSection } from "@/content/careers";
import { fullTime, hasRoles, roles } from "@/content/roles";
import { hiringPill } from "@/content/shared";
import { labels } from "@/content/v5";
import { plural } from "@/lib/site";
import { v5Metadata } from "@/lib/v5";

export const metadata = v5Metadata(meta);

// /v5/careers (plan/versions-spec.md, V5 "Inner pages", Careers): the bento
// header with the live role count as its accent tile; the open roles as
// group tiles that open to their roles (v1's Disclosure, a real <details>);
// the twelve job-post lines as criteria tiles; mentorship beside the
// questions (v1's Disclosure group, the first open); and the closing "Apply"
// tile beside the needle-thread sequence. All copy comes from
// src/content/careers.ts; every count comes from roles.ts, through plural(),
// and with no roles listed the page switches to the empty state as the
// classic page does (no group tiles, the empty heading and text, and an
// "apply" accent tile instead of the count).

const CRITERIA_TONES: readonly Tone[] = [
  "paper",
  "marigold",
  "paper",
  "paper",
  "blush",
  "paper",
  "marigold",
  "paper",
  "paper",
  "blush",
  "paper",
  "marigold",
];

export default function V5Careers() {
  const openRoles = plural(roles.length, hiringPill.one, hiringPill.many);
  // "28 open roles": the figure springs, the words sit beside it.
  const [, figure, rest] = /^(\d+)\s+(.*)$/.exec(openRoles) ?? [];
  const hiringNow = hiringPill.prefix.replace(/\s*·\s*$/, "");

  return (
    <>
      <PageHeader
        icon={<UsersRound size={14} strokeWidth={2} aria-hidden="true" />}
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        ledeTone="paper"
      >
        {hasRoles ? (
          <Tile tone="blush" intro={2} tileClassName="v5-ph-hire">
            <Chip dot>{hiringNow}</Chip>
            <div className="v5-ph-hire-count">
              {figure ? (
                <>
                  <SpringNumber value={figure} />
                  <p className="v5-stat-label">{rest}</p>
                </>
              ) : (
                <p className="v5-stat-label">{openRoles}</p>
              )}
            </div>
            <RoleDots total={roles.length} filled={fullTime.length} />
          </Tile>
        ) : (
          <Tile tone="marigold" intro={2} tileClassName="v5-cta-tile">
            <span className="v5-cta-icon" aria-hidden="true">
              <Mail size={22} strokeWidth={1.75} />
            </span>
            <div className="v5-cta-stack">
              <p className="v5-cta-text">{apply.paragraph}</p>
              <V5Button href={apply.button.href}>{apply.button.label}</V5Button>
            </div>
          </Tile>
        )}
      </PageHeader>

      {/* Open roles: one tile per group, each opening to its roles. */}
      <section id={rolesSection.id} className="v5-block" aria-labelledby="v5-roles-title">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--roles">
            <Tile w={2} tone="paper">
              <HeadTile
                id="v5-roles-title"
                icon={<UsersRound size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={rolesSection.eyebrow}
                title={rolesSection.title}
                accent={rolesSection.accent}
                lede={rolesSection.emptyText?.text}
              >
                <p className="v5-caption">{rolesSection.caption}</p>
              </HeadTile>
            </Tile>

            <Tile w={2} tone="night" tileClassName="v5-cta-tile v5-roles-cta">
              <span className="v5-cta-icon" aria-hidden="true">
                <Send size={22} strokeWidth={1.75} />
              </span>
              <div className="v5-actions">
                <V5Button href={rolesSection.button.href}>{rolesSection.button.label}</V5Button>
                <V5Button href={rolesSection.link.href} external={rolesSection.link.external} variant="secondary">
                  {rolesSection.link.label}
                </V5Button>
              </div>
            </Tile>

            {hasRoles
              ? rolesSection.groups.map((group) => {
                  const internships = group.key === "internships";
                  return (
                    <Tile
                      key={group.key}
                      w={internships ? 2 : 1}
                      tone={internships ? "marigold" : "paper"}
                      tilt={false}
                      className="v5-group-cell"
                      tileClassName="v5-group-tile"
                    >
                      <Disclosure
                        reveal={false}
                        className="v5-group"
                        summary={
                          <span className="v5-group-summary">
                            <span className="v5-chip v5-group-count">
                              {plural(group.count, rolesSection.countLabel.one, rolesSection.countLabel.many)}
                            </span>
                            <h3 className="v5-group-name">{group.heading}</h3>
                          </span>
                        }
                      >
                        <ul className="v5-group-roles">
                          {group.roles.map((role) => (
                            <li key={role.href}>
                              <a className="v5-role" href={role.href} target="_blank" rel="noopener noreferrer">
                                <span className="v5-role-text">
                                  <span className="v5-role-title">{role.title}</span>
                                  {/* An internship's department repeats its group
                                      heading, so it shows only where it adds something. */}
                                  {role.department !== group.heading ? (
                                    <span className="v5-role-dept">{role.department}</span>
                                  ) : null}
                                </span>
                                <span className="v5-sr">{labels.newTab}</span>
                                <ArrowUpRight className="v5-role-arrow" size={18} strokeWidth={2} aria-hidden="true" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </Disclosure>
                    </Tile>
                  );
                })
              : null}

          </div>
        </div>
      </section>

      {/* What I look for: the twelve job-post lines as tiles. */}
      <section id={criteria.id} className="v5-block" aria-labelledby="v5-criteria-title">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--criteria">
            <Tile w={2} tone="blush">
              <HeadTile
                id="v5-criteria-title"
                icon={<ListChecks size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={criteria.eyebrow}
                title={criteria.title}
                accent={criteria.accent}
                lede={ledeOf(criteria.lede)}
              />
            </Tile>
            {criteria.items.map((item, index) => (
              <Tile
                key={item.text}
                tone={CRITERIA_TONES[index % CRITERIA_TONES.length]}
                tileClassName="v5-criterion-tile"
              >
                <span className="v5-criterion-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="v5-criterion">
                  <q>{item.text}</q>
                </p>
              </Tile>
            ))}
            <Tile w={2} tone="night" tileClassName="v5-closing-tile">
              <p className="v5-closing">
                <ParaText para={criteria.closing} />
              </p>
            </Tile>
          </div>
        </div>
      </section>

      {/* Mentorship and the questions. */}
      <div className="v5-block">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--mentor">
            <Tile id={mentorship.id} w={2} tone="night" labelledBy="v5-mentorship-title" tileClassName="v5-mentor-tile">
              <HeadTile
                id="v5-mentorship-title"
                icon={<HeartHandshake size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={mentorship.eyebrow}
                title={mentorship.title}
                accent={mentorship.accent}
                lede={ledeOf(mentorship.lede)}
              />
              <figure className="v5-mentor">
                <blockquote cite={mentorship.link.href} className="v5-mentor-lines">
                  {mentorship.lines.map((line) => [
                    line.gapBefore ? (
                      <p key={`gap-${line.text}`} className="v5-mentor-gap">
                        <span aria-hidden="true">{mentorship.gap.mark}</span>
                        <span className="v5-sr">{mentorship.gap.label}</span>
                      </p>
                    ) : null,
                    <p key={line.text} className="v5-mentor-line">
                      {line.text}
                    </p>,
                  ])}
                </blockquote>
                <figcaption className="v5-qb-by">{mentorship.attribution}</figcaption>
              </figure>
              <div className="v5-actions">
                <V5Button href={mentorship.link.href} external={mentorship.link.external} variant="secondary">
                  {mentorship.link.label}
                </V5Button>
              </div>
            </Tile>

            <Tile id={faq.id} w={2} tone="paper" tilt={false} labelledBy="v5-faq-title" tileClassName="v5-faq-tile">
              <HeadTile
                id="v5-faq-title"
                icon={<CircleHelp size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={faq.eyebrow}
                title={faq.title}
                accent={faq.accent}
              />
              <div className="v5-faq">
                {faq.items.map((item, index) => (
                  <Disclosure
                    key={item.question}
                    summary={item.question}
                    group="v5-careers-faq"
                    defaultOpen={index === 0}
                    reveal={false}
                  >
                    <p>
                      <ParaText para={item.answer} />
                    </p>
                  </Disclosure>
                ))}
              </div>
            </Tile>
          </div>
        </div>
      </div>

      {/* Apply: the page's closing call to action, beside the needle being threaded. */}
      <section id={apply.id} className="v5-block" aria-labelledby="v5-apply-title">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--apply">
            <Tile w={2} tone="marigold" tileClassName="v5-apply-tile">
              <HeadTile
                id="v5-apply-title"
                icon={<Mail size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={apply.eyebrow}
                title={apply.title}
                accent={apply.accent}
                lede={apply.paragraph}
              >
                <div className="v5-actions">
                  <V5Button href={apply.button.href}>{apply.button.label}</V5Button>
                  <V5Button href={apply.link.href} external={apply.link.external} variant="secondary">
                    {apply.link.label}
                  </V5Button>
                </div>
              </HeadTile>
            </Tile>
            <SilkTile sequence="needle-thread" w={2} h={1} focusX={0.42} focusY={0.5} className="v5-needle-cell" />
          </div>
        </div>
      </section>
    </>
  );
}
