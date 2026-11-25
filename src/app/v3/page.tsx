import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { ParaText } from "@/components/ParaText";
import { ChapterRow, CreditsRoll, FilmStrip, FootageScene, NumbersScene, ScrollRefresh } from "@/components/v3/Scenes";
import { ledeText, lineSpans, splitStat, titleName, withAccent } from "@/components/v3/text";
import { hero, hiring, journey, lead, meta, pillars, stats, words } from "@/content/home";
import { podium, portrait } from "@/content/images";
import { quotes } from "@/content/quotes";
import { hasRoles, roles } from "@/content/roles";
import { contactBand, footer, hiringPill } from "@/content/shared";
import { labels, toV3 } from "@/content/v3";
import { group, ventures } from "@/content/work";
import { attributionOf, plural } from "@/lib/site";
import { clipCredits, subtitleLines, v3Metadata } from "@/lib/v3";
import { timelineView } from "@/lib/views";

export const metadata = v3Metadata(meta);

// The /v3 home page (plan/versions-spec.md 3, V3 Home): her career told like
// a short film, in seven scenes on night.
//   1. Cold open: red silk footage, pinned and scrubbed; letterbox bars open;
//      her name, then her role line, then the statement.
//   2. What I lead: a title card, then one chapter card per pillar, side by
//      side from 1024 px (a row that scrolls sideways and snaps per card).
//   3. In her words: the WER pull quote as subtitles over bronze silk.
//   4. Talent: the needle being threaded while the hiring lines appear.
//   5. Journey: the timeline as frames on a film strip, with the 2019
//      portrait and the podium photograph as frames of their own.
//   6. In numbers: the three counts, one per third of the screen.
//   7. End credits: her role, the group, the footage credits and the call to
//      action; the layout's footer follows.
// Every word comes from src/content (home, work, shared, quotes, images,
// roles); the scene labels from content/v3.ts.

/** A link inside the site, with the /v3 address and an arrow. */
function ForwardLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="v3-link" href={toV3(href)}>
      {children}
      <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}

/** A link to another site, in a new tab. */
function ExternalLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a className={className ?? "v3-link"} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
      <span className="v3-sr-only">{labels.newTab}</span>
    </a>
  );
}

type StripFrame =
  | { kind: "entry"; key: string; entry: ReturnType<typeof timelineView> }
  | { kind: "portrait"; key: string }
  | { kind: "photo"; key: string };

/** The journey entries, oldest first, with the 2019 portrait after the 2019
 *  entry and the podium photograph (undated) before the last entry. */
function stripFrames(): StripFrame[] {
  const entries = journey.entries.map(timelineView);
  const frames: StripFrame[] = [];
  entries.forEach((entry, index) => {
    if (index === entries.length - 1) frames.push({ kind: "photo", key: "podium" });
    frames.push({ kind: "entry", key: entry.id, entry });
    if (entry.id === "2019") frames.push({ kind: "portrait", key: "portrait" });
  });
  if (!frames.some((frame) => frame.kind === "portrait")) frames.splice(1, 0, { kind: "portrait", key: "portrait" });
  return frames;
}

export default function V3Home() {
  const featured = quotes[words.featured];
  const hiringLink = hasRoles ? hiring.button : hiring.buttonEmpty;
  return (
    <>
      {/* 1. Cold open */}
      <section className="v3-cold" aria-labelledby="v3-title">
        <FootageScene kind="cold" sequence="vermilion-silk" priority>
          <span className="v3-dim" aria-hidden="true" />
          <span className="v3-shade" aria-hidden="true" />
          <div className="v3-cold-copy">
            <h1 id="v3-title" className="v3-cold-name" data-v3-name>
              <span className="v3-cold-name-in">{titleName(hero.name)}</span>
            </h1>
            <p className="v3-cold-role" data-v3-role>
              {hero.eyebrow}
            </p>
            <p className="v3-cold-statement" data-v3-statement>
              {withAccent(hero.statement, hero.accent)}
            </p>
          </div>
          <span className="v3-letterbox v3-letterbox--top" aria-hidden="true" />
          <span className="v3-letterbox v3-letterbox--bottom" aria-hidden="true" />
          <div className="v3-cold-foot" aria-hidden="true" data-v3-cue>
            <span className="v3-slate">{labels.coldOpen}</span>
            <span className="v3-cue">
              {labels.scroll}
              <span className="v3-cue-line" />
            </span>
          </div>
        </FootageScene>
      </section>

      {/* 2. What I lead: the title card and the three chapter cards */}
      <section id={lead.id} className="v3-lead" aria-labelledby="v3-lead-title">
        <ChapterRow>
          <div className="v3-panel v3-panel--lead">
            <div className="v3-panel-copy">
              <p className="v3-slate" data-v3-rise>
                {lead.eyebrow}
              </p>
              <h2 id="v3-lead-title" className="v3-scene-title v3-lead-title" data-v3-rise>
                {withAccent(lead.title, lead.accent)}
              </h2>
              <p className="v3-lede" data-v3-rise>
                {ledeText(lead.lede)}
              </p>
            </div>
            {/* The three chapters ahead, as a title card's index. The cards
                carry the headings, so screen readers skip this copy. */}
            <ol className="v3-lead-index" aria-hidden="true" data-v3-rise>
              {pillars.map((pillar) => (
                <li key={pillar.index}>
                  <span>
                    {labels.chapter} {pillar.index}
                  </span>
                  <span>{pillar.title}</span>
                </li>
              ))}
            </ol>
          </div>
          {pillars.map((pillar) => (
            <article key={pillar.index} className="v3-panel" aria-labelledby={`v3-pillar-${pillar.index}`}>
              <span className="v3-numeral" aria-hidden="true" data-v3-numeral>
                {pillar.index}
              </span>
              <div className="v3-panel-copy">
                <p className="v3-chapter" data-v3-rise>
                  {labels.chapter} {pillar.index}
                </p>
                <span className="v3-rule" aria-hidden="true" data-v3-rise />
                <h3 id={`v3-pillar-${pillar.index}`} className="v3-panel-title" data-v3-rise>
                  {pillar.title}
                </h3>
                <p className="v3-panel-body" data-v3-rise>
                  <ParaText para={pillar.body} />
                </p>
                <p data-v3-rise>
                  <ForwardLink href={pillar.link.href}>{pillar.link.label}</ForwardLink>
                </p>
              </div>
            </article>
          ))}
        </ChapterRow>
      </section>

      {/* 3. In her words: subtitles over bronze silk */}
      <section id={words.id} className="v3-words" aria-labelledby="v3-words-title">
        <FootageScene kind="words" sequence="bronze-silk" focusY={0.4}>
          <span className="v3-shade" aria-hidden="true" />
          <div className="v3-words-head" data-v3-head>
            <p className="v3-slate">{words.eyebrow}</p>
            <h2 id="v3-words-title" className="v3-scene-title">
              {withAccent(words.title, words.accent)}
            </h2>
          </div>
          <figure className="v3-subtitles">
            <blockquote cite={featured.href}>
              <p>{lineSpans(subtitleLines(featured.text), "v3-sub", "data-v3-sub")}</p>
            </blockquote>
            <figcaption className="v3-subtitles-by" data-v3-attrib>
              {attributionOf(featured)}
            </figcaption>
          </figure>
        </FootageScene>
        <div className="v3-words-after">
          <div className="v3-words-note">
            <p className="v3-lede">{ledeText(words.lede)}</p>
            <ul className="v3-words-links">
              {words.links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <ExternalLink href={link.href}>{link.label}</ExternalLink>
                  ) : (
                    <ForwardLink href={link.href}>{link.label}</ForwardLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* The same feature as the subtitles, whose caption names it: no
              attribution repeated under these two. */}
          {words.quotes.map((id) => (
            <blockquote key={id} className="v3-words-quote" cite={quotes[id].href}>
              <p>{quotes[id].text}</p>
            </blockquote>
          ))}
        </div>
      </section>

      {/* 4. Talent: the needle being threaded */}
      <section id={hiring.id} className="v3-talent" aria-labelledby="v3-hiring-title">
        <FootageScene kind="talent" sequence="needle-thread">
          <span className="v3-shade" aria-hidden="true" />
          <div className="v3-talent-copy">
            <div className="v3-talent-phase" data-v3-phase="1">
              <p className="v3-slate">{hiring.eyebrow}</p>
              <h2 id="v3-hiring-title" className="v3-scene-title">
                {withAccent(hiring.title, hiring.accent)}
              </h2>
              <p className="v3-lede">
                <ParaText para={hiring.lede} />
              </p>
            </div>
            <div className="v3-talent-phase" data-v3-phase="2" data-v3-focus-at="0.92">
              <h3 className="v3-talent-list-title" data-v3-list-title>
                {hiring.listTitle}
              </h3>
              <ul className="v3-talent-list">
                {hiring.list.map((line) => (
                  <li key={line.text} data-v3-item>
                    <q>{line.text}</q>
                  </li>
                ))}
              </ul>
              <div className="v3-talent-cta" data-v3-cta>
                {hasRoles ? (
                  <p className="v3-pill">
                    <span className="v3-pill-dot" aria-hidden="true" />
                    {hiringPill.prefix}
                    {plural(roles.length, hiringPill.one, hiringPill.many)}
                  </p>
                ) : null}
                <div className="v3-actions">
                  <Link className="v3-button" href={toV3(hiringLink.href)}>
                    {hiringLink.label}
                  </Link>
                  <a className="v3-link" href={hiring.email.href}>
                    {hiring.email.label}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FootageScene>
      </section>

      {/* 5. Journey: the film strip */}
      <section id={journey.id} className="v3-journey" aria-labelledby="v3-journey-title">
        <FilmStrip
          head={
            <div className="v3-strip-head">
              <div className="v3-strip-heading">
                <p className="v3-slate">{journey.eyebrow}</p>
                <h2 id="v3-journey-title" className="v3-scene-title v3-strip-title">
                  {withAccent(journey.title, journey.accent)}
                </h2>
              </div>
              <div className="v3-strip-aside">
                <p className="v3-lede">{ledeText(journey.lede)}</p>
                <ForwardLink href={journey.link.href}>{journey.link.label}</ForwardLink>
              </div>
            </div>
          }
        >
          <ol className="v3-strip-track">
            {stripFrames().map((frame) => (
              <li key={frame.key} className={`v3-frame v3-frame--${frame.kind}`}>
                {frame.kind === "entry" ? (
                  <div className="v3-frame-gate" data-v3-gate>
                    <p className="v3-frame-year">{frame.entry.yearLabel}</p>
                    <h3 className="v3-frame-title">{frame.entry.title}</h3>
                    <p className="v3-frame-body">{frame.entry.body}</p>
                  </div>
                ) : frame.kind === "portrait" ? (
                  <figure className="v3-frame-gate v3-frame-figure" data-v3-gate>
                    <span className="v3-frame-field">
                      <Image src={portrait.src} alt={portrait.alt} sizes="(min-width: 1024px) 22rem, 70vw" />
                    </span>
                    <figcaption className="v3-frame-caption">{portrait.caption}</figcaption>
                  </figure>
                ) : (
                  <div className="v3-frame-gate v3-frame-photo" data-v3-gate>
                    <Image
                      src={podium.src}
                      alt={podium.alt}
                      width={podium.width}
                      height={podium.height}
                      sizes="(min-width: 1024px) 24rem, 70vw"
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </FilmStrip>
      </section>

      {/* 6. In numbers */}
      <section className="v3-numbers-section" aria-labelledby="v3-numbers-title">
        <NumbersScene>
          <h2 id="v3-numbers-title" className="v3-slate v3-numbers-title" data-v3-head>
            {stats.title}
          </h2>
          <dl className="v3-number-list">
            {stats.items.map((item) => {
              const { digits, suffix } = splitStat(item.value);
              return (
                <div
                  key={item.label}
                  className="v3-number-row"
                  data-v3-row
                  {...(item.href ? { "data-v3-focus-at": "0.96" } : {})}
                >
                  <dt className="v3-number">
                    <span className="v3-sr-only">{item.value}</span>
                    <span aria-hidden="true">
                      <span data-v3-count={digits}>{digits}</span>
                      {suffix ? <span className="v3-number-suffix">{suffix}</span> : null}
                    </span>
                  </dt>
                  <dd className="v3-number-label">
                    {item.label}
                    {item.href && item.linkLabel ? (
                      <>
                        {" "}
                        <ForwardLink href={item.href}>{item.linkLabel}</ForwardLink>
                      </>
                    ) : null}
                  </dd>
                </div>
              );
            })}
          </dl>
          <p className="v3-numbers-caption" data-v3-caption>
            {stats.caption}
          </p>
        </NumbersScene>
      </section>

      {/* 7. End credits */}
      <section className="v3-credits" aria-labelledby="v3-credits-title">
        <CreditsRoll>
          <h2 id="v3-credits-title" className="v3-slate v3-credits-title" data-v3-credit>
            {labels.endCredits}
          </h2>
          <div className="v3-credits-lead" data-v3-credit>
            <p className="v3-credits-name">{titleName(footer.wordmark)}</p>
            <p className="v3-credits-role">{footer.role.text}</p>
          </div>
          <div className="v3-credits-block">
            <h3 className="v3-credits-heading" data-v3-credit>
              {group.eyebrow}
            </h3>
            <p className="v3-credits-lede" data-v3-credit>
              {ledeText(group.lede)}
            </p>
            <ul className="v3-credit-list">
              {ventures.map((venture) => (
                <li key={venture.name} className="v3-credit" data-v3-credit>
                  <span className="v3-credit-left">{venture.role}</span>
                  <span className="v3-credit-right">
                    <ExternalLink href={venture.href} className="v3-credit-name">
                      {venture.name}
                    </ExternalLink>
                    <span className="v3-credit-meta">{venture.category}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="v3-credits-block">
            <h3 className="v3-credits-heading" data-v3-credit>
              {labels.motionFootage}
            </h3>
            <ul className="v3-credit-list v3-credit-list--small">
              {clipCredits().map((clip) => (
                <li key={clip.href} className="v3-credit" data-v3-credit>
                  <span className="v3-credit-left">{clip.provider}</span>
                  <span className="v3-credit-right">
                    <ExternalLink href={clip.href} className="v3-credit-name v3-credit-name--small">
                      {clip.title}
                    </ExternalLink>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div id={contactBand.id} className="v3-credits-cta" data-v3-credit>
            <p className="v3-slate">{contactBand.eyebrow}</p>
            <h3 className="v3-scene-title v3-cta-title">{withAccent(contactBand.title, contactBand.accent)}</h3>
            <p className="v3-lede">{ledeText(contactBand.lede)}</p>
            <div className="v3-actions">
              <Link className="v3-button" href={toV3(contactBand.primary.href)}>
                {contactBand.primary.label}
              </Link>
              <ExternalLink href={contactBand.secondary.href}>{contactBand.secondary.label}</ExternalLink>
            </div>
          </div>
        </CreditsRoll>
      </section>

      <ScrollRefresh />
    </>
  );
}
