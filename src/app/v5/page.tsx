import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Building2,
  Handshake,
  Layers,
  Mic,
  Newspaper,
  Quote,
  Send,
  Sparkles,
  UsersRound,
  Waypoints,
} from "lucide-react";
import { Fragment, type ReactNode } from "react";
import type { Para } from "@/content/types";
import { LocalTime } from "@/components/LocalTime";
import { ParaText } from "@/components/ParaText";
import { V5Button } from "@/components/v5/Button";
import { BrandIcon, Chip, MonogramMark } from "@/components/v5/Chip";
import { QuoteCarousel, type CarouselQuote } from "@/components/v5/QuoteCarousel";
import { RoleDots } from "@/components/v5/RoleDots";
import { SilkTile } from "@/components/v5/SilkTile";
import { SpringNumber } from "@/components/v5/SpringNumber";
import { StackCards, type StackCard } from "@/components/v5/StackCards";
import { Tile, type Tone } from "@/components/v5/Tile";
import { rolesSection } from "@/content/careers";
import { enquiryTypes, office } from "@/content/contact";
import { hero, hiring, journey, lead, meta, pillars, stats, words } from "@/content/home";
import { portrait } from "@/content/images";
import { socialLinks } from "@/content/navigation";
import { quotes, type QuoteId } from "@/content/quotes";
import { fullTime, hasRoles, roles } from "@/content/roles";
import { contactBand, footer, hiringPill } from "@/content/shared";
import { labels, toV5 } from "@/content/v5";
import { attributionOf } from "@/lib/site";
import { splitAccent, v5Metadata } from "@/lib/v5";
import { timelineView } from "@/lib/views";

export const metadata = v5Metadata(meta);

// The /v5 home (plan/versions-spec.md, V5 "Home"): the hero bento, the
// stacking-cards journey, the "What I lead" bento with the bronze-silk tile,
// the quotes drag carousel, the hiring bento and the contact tile grid; the
// footer tile and the dock come from the layout. All copy comes from the
// classic content files (home, shared, careers, contact, quotes, roles);
// /v5 adds only neutral labels (src/content/v5.ts).

/** A section lede: plain text, or a paragraph with quoted parts. */
function ledeOf(lede: string | Para | undefined): ReactNode {
  return typeof lede === "string" ? lede : lede ? <ParaText para={lede} /> : undefined;
}

/** A handle may break after a slash ("linkedin.com/in/" then the name),
 *  never inside the name. The handle itself stays verbatim. */
function breakAfterSlashes(handle: string) {
  return handle.split("/").map((part, index, parts) => (
    <Fragment key={index}>
      {part}
      {index < parts.length - 1 ? (
        <>
          /<wbr />
        </>
      ) : null}
    </Fragment>
  ));
}

/** A heading with its accent phrase in the accent colour. */
function Accented({ text, accent }: { text: string; accent?: string }) {
  const parts = splitAccent(text, accent);
  return (
    <>
      {parts.before}
      {parts.accent ? <span className="v5-accent">{parts.accent}</span> : null}
      {parts.after}
    </>
  );
}

/** A section head inside a tile: chip, H2 and lede. */
function HeadTile({
  id,
  icon,
  eyebrow,
  title,
  accent,
  lede,
  children,
}: {
  id: string;
  icon: ReactNode;
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="v5-headtile">
      <Chip icon={icon}>{eyebrow}</Chip>
      <h2 id={id} className="v5-title">
        <Accented text={title} accent={accent} />
      </h2>
      {lede ? <p className="v5-lede">{lede}</p> : null}
      {children}
    </div>
  );
}

// The hero's eyebrow ("Chief Operating Officer · Digitally Next · New Delhi")
// as three tags, and its credential line as its two parts: the talent
// sentence in the hiring tile, the feature in the "Featured" tile.
const tags = hero.eyebrow.split(" · ");
const [talentLine, featureLine] = hero.credential.split(" · ");
const [firstName, ...lastNames] = hero.name.split(" ");
const statement = splitAccent(hero.statement, hero.accent);
const rolesStat = stats.items.find((item) => item.href);
const linkedinStats = stats.items.filter((item) => !item.href);
const hiringNow = hiringPill.prefix.replace(/\s*·\s*$/, "");
const weR = words.links.find((link) => link.external);
const heroCta = hasRoles ? hero.secondary : hero.secondaryEmpty;
const hiringCta = hasRoles ? hiring.button : hiring.buttonEmpty;

// Journey cards: five tones, the last ("Now") on night.
const JOURNEY_TONES: readonly Tone[] = ["paper", "blush", "marigold", "paper", "night"];
// Pillars: tones and spans of the three "What I lead" tiles.
const PILLAR_TILES: readonly { tone: Tone; w: 1 | 2 }[] = [
  { tone: "blush", w: 1 },
  { tone: "marigold", w: 1 },
  { tone: "night", w: 2 },
];
// The carousel: every quote from the Women Entrepreneurs Review feature,
// the featured one (home `words.featured`) first.
const CAROUSEL: readonly { id: QuoteId; tone: Tone }[] = [
  { id: words.featured, tone: "night" },
  { id: "wer-independence", tone: "paper" },
  { id: "wer-quietly", tone: "blush" },
  { id: "wer-transformation", tone: "marigold" },
  { id: "wer-defining-role", tone: "paper" },
];
// Contact tiles: one per enquiry type (the form preselects it from ?type=).
const ENQUIRY_ICONS = { partnership: Handshake, speaking: Mic, press: Newspaper, careers: UsersRound } as const;

export default function V5Home() {
  const entries = journey.entries.map(timelineView);
  const count = String(entries.length).padStart(2, "0");
  const journeyCards: StackCard[] = entries.map((entry, index) => ({
    key: entry.id,
    tone: JOURNEY_TONES[index % JOURNEY_TONES.length],
    labelledBy: `v5-journey-${entry.id}`,
    content: (
      <div className="v5-jcard">
        <div className="v5-jcard-top">
          <span className="v5-chip">
            {String(index + 1).padStart(2, "0")} {labels.of} {count}
          </span>
          <span className="v5-jcard-dots" aria-hidden="true">
            {entries.map((other, at) => (
              <span key={other.id} data-on={at <= index ? "" : undefined} />
            ))}
          </span>
        </div>
        <p className="v5-jcard-year">{entry.yearLabel}</p>
        <div className="v5-jcard-text">
          {/* The 2019 portrait beside the 2019 chapter (decorative here: the
              hero shows it with its description). */}
          {entry.id === "2019" ? (
            <figure className="v5-jcard-portrait">
              <span className="v5-jcard-portrait-frame">
                <span className="v5-field" aria-hidden="true" />
                <Image src={portrait.src} alt="" sizes="120px" className="v5-jcard-portrait-img" />
              </span>
              <figcaption>{portrait.caption}</figcaption>
            </figure>
          ) : null}
          <h3 id={`v5-journey-${entry.id}`} className="v5-jcard-title">
            {entry.title}
          </h3>
          <p className="v5-jcard-body">{entry.body}</p>
        </div>
      </div>
    ),
  }));

  const carousel: CarouselQuote[] = CAROUSEL.map(({ id, tone }, index) => ({
    id,
    tone,
    text: quotes[id].text,
    attribution: attributionOf(quotes[id]),
    large: index === 0,
  }));

  return (
    <>
      {/* 1. Hero bento ------------------------------------------------- */}
      <section className="v5-hero v5-wrap" aria-labelledby="v5-name">
        <div className="v5-bento v5-bento--hero">
          <Tile w={2} mdW={1} tone="paper" intro={0} tileClassName="v5-name-tile">
            <div className="v5-name-top">
              <p className="v5-tags">
                {tags.map((tag, index) => (
                  <span key={tag} className="v5-tag">
                    {index > 0 ? <span className="v5-sr"> · </span> : null}
                    {tag}
                  </span>
                ))}
              </p>
              <span className="v5-badge v5-depth" aria-hidden="true">
                <MonogramMark size={30} />
              </span>
            </div>
            <h1 id="v5-name" className="v5-name">
              <span>{firstName}</span> <span>{lastNames.join(" ")}</span>
            </h1>
          </Tile>

          <Tile w={2} h={2} mdW={1} mdH={2} tone="field" intro={1} tileClassName="v5-portrait-tile">
            <figure className="v5-portrait">
              {portrait.kind === "cutout" ? (
                <>
                  <span className="v5-field v5-depth" aria-hidden="true" />
                  <span className="v5-portrait-ring v5-depth" aria-hidden="true" />
                  <Image
                    className="v5-portrait-figure v5-depth"
                    src={portrait.src}
                    alt={portrait.alt}
                    sizes="(min-width: 1280px) 46vw, (min-width: 768px) 56vw, 92vw"
                    preload
                  />
                </>
              ) : (
                <Image
                  className="v5-portrait-photo"
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="(min-width: 1280px) 46vw, (min-width: 768px) 56vw, 92vw"
                  preload
                  style={portrait.focal ? { objectPosition: portrait.focal } : undefined}
                />
              )}
              <figcaption className="v5-chip v5-chip--glass v5-portrait-caption">{portrait.caption}</figcaption>
            </figure>
          </Tile>

          <Tile w={2} mdW={1} tone="night" intro={2} tileClassName="v5-statement-tile">
            <p className="v5-statement">
              {statement.before}
              <span className="v5-accent">{statement.accent}</span>
              {statement.after}
            </p>
            <div className="v5-actions">
              <V5Button href={toV5(hero.primary.href)}>{hero.primary.label}</V5Button>
            </div>
          </Tile>

          <Tile tone="marigold" tileClassName="v5-now-tile">
            <Chip dot>{labels.now}</Chip>
            <p className="v5-now-time">
              <LocalTime />
            </p>
            <div className="v5-now-meta">
              <p className="v5-now-place">{footer.place.prefix}</p>
              <p>{footer.role.text}</p>
            </div>
          </Tile>

          {linkedinStats.slice(0, 1).map((stat) => (
            <Tile key={stat.label} tone="paper" tileClassName="v5-stat-tile">
              <Chip icon={<BrandIcon name="linkedin" size={13} />}>{socialLinks[0].label}</Chip>
              <SpringNumber value={stat.value} />
              <p className="v5-stat-label">{stat.label}</p>
            </Tile>
          ))}

          <Tile w={2} tone="blush" tileClassName="v5-hire-tile">
            <div className="v5-hire-head">
              <div className="v5-hire-main">
                <Chip dot={hasRoles}>{hasRoles ? hiringNow : hiring.eyebrow}</Chip>
                {rolesStat ? (
                  <div className="v5-hire-count">
                    <SpringNumber value={rolesStat.value} />
                    <p className="v5-stat-label">{rolesStat.label}</p>
                  </div>
                ) : null}
              </div>
              {hasRoles ? <RoleDots total={roles.length} filled={fullTime.length} /> : null}
            </div>
            <div className="v5-hire-foot">
              <p className="v5-hire-line">{talentLine}</p>
              <V5Button href={toV5(heroCta.href)}>{heroCta.label}</V5Button>
            </div>
          </Tile>

          <Tile tone="paper" tileClassName="v5-social-tile">
            <Chip icon={<AtSign size={14} strokeWidth={2} aria-hidden="true" />}>{footer.elsewhereHeading}</Chip>
            <ul className="v5-social-list">
              {socialLinks.map((link) => (
                <li key={link.key}>
                  <a className="v5-social" href={link.href} target="_blank" rel="noopener noreferrer">
                    <span className="v5-social-icon">
                      <BrandIcon name={link.key} size={18} />
                    </span>
                    <span className="v5-social-text">
                      <span className="v5-social-label">{link.label}</span>
                      <span className="v5-social-handle">{breakAfterSlashes(link.handle)}</span>
                    </span>
                    <ArrowUpRight className="v5-social-arrow" size={18} strokeWidth={2} aria-hidden="true" />
                    <span className="v5-sr">{labels.newTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Tile>

          {linkedinStats.slice(1).map((stat) => (
            <Tile key={stat.label} tone="paper" tileClassName="v5-stat-tile">
              <Chip icon={<BrandIcon name="linkedin" size={13} />}>{socialLinks[0].label}</Chip>
              <SpringNumber value={stat.value} />
              <p className="v5-stat-label">{stat.label}</p>
            </Tile>
          ))}

          <Tile w={2} tone="night" tileClassName="v5-feature-tile">
            <Chip icon={<Sparkles size={14} strokeWidth={2} aria-hidden="true" />}>{labels.featured}</Chip>
            <p className="v5-feature-line">{featureLine}</p>
            {weR ? (
              <V5Button href={weR.href} external variant="secondary">
                {weR.label}
              </V5Button>
            ) : null}
          </Tile>
        </div>
        <p className="v5-note">{stats.caption}</p>
      </section>

      {/* 2. Journey: stacking cards -------------------------------------- */}
      <section className="v5-section v5-journey" aria-labelledby="v5-journey-title">
        <div className="v5-wrap">
          <header className="v5-head">
            <Chip icon={<Waypoints size={14} strokeWidth={2} aria-hidden="true" />}>{journey.eyebrow}</Chip>
            <h2 id="v5-journey-title" className="v5-title">
              <Accented text={journey.title} accent={journey.accent} />
            </h2>
            <p className="v5-lede">{ledeOf(journey.lede)}</p>
          </header>
          <StackCards cards={journeyCards} />
          <p className="v5-after-stack">
            <V5Button href={toV5(journey.link.href)} variant="secondary">
              {journey.link.label}
            </V5Button>
          </p>
        </div>
      </section>

      {/* 3. What I lead -------------------------------------------------- */}
      <section className="v5-section" aria-labelledby="v5-lead-title">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--lead">
            <Tile w={2} tone="paper">
              <HeadTile
                id="v5-lead-title"
                icon={<Layers size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={lead.eyebrow}
                title={lead.title}
                accent={lead.accent}
                lede={ledeOf(lead.lede)}
              />
            </Tile>
            {pillars.slice(0, 1).map((pillar) => (
              <PillarTile key={pillar.index} pillar={pillar} {...PILLAR_TILES[0]} />
            ))}
            <SilkTile h={2} mdH={2} />
            {pillars.slice(1).map((pillar, index) => (
              <PillarTile key={pillar.index} pillar={pillar} {...PILLAR_TILES[index + 1]} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. In her words: drag carousel --------------------------------- */}
      <section className="v5-section v5-words" aria-labelledby="v5-words-title">
        <div className="v5-wrap">
          <header className="v5-head v5-head--split">
            <div>
              <Chip icon={<Quote size={14} strokeWidth={2} aria-hidden="true" />}>{words.eyebrow}</Chip>
              <h2 id="v5-words-title" className="v5-title">
                {words.title}
              </h2>
            </div>
            {words.lede ? <p className="v5-lede">{ledeOf(words.lede)}</p> : null}
          </header>
        </div>
        <QuoteCarousel
          id="v5-quotes"
          quotes={carousel}
          labels={{ list: labels.quotes, previous: labels.previous, next: labels.next, drag: labels.drag }}
        />
        <div className="v5-wrap">
          <ul className="v5-pills">
            {words.links.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a className="v5-pill" href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                    <span className="v5-sr">{labels.newTab}</span>
                  </a>
                ) : (
                  <Link className="v5-pill" href={toV5(link.href)}>
                    {link.label}
                    <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Hiring bento ------------------------------------------------- */}
      <section className="v5-section" aria-labelledby="v5-hiring-title">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--hiring">
            <Tile w={2} tone="paper">
              <HeadTile
                id="v5-hiring-title"
                icon={<UsersRound size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={hiring.eyebrow}
                title={hiring.title}
                accent={hiring.accent}
                lede={ledeOf(hiring.lede)}
              />
            </Tile>
            {hasRoles ? (
              <Tile tone="night" tileClassName="v5-roles-tile">
                <Chip dot>{hiringNow}</Chip>
                <p className="v5-roles-title">{rolesSection.title}</p>
                <p className="v5-roles-caption">{rolesSection.caption}</p>
              </Tile>
            ) : null}
            <Tile tone="marigold" tileClassName="v5-cta-tile">
              <span className="v5-cta-icon" aria-hidden="true">
                <Send size={22} strokeWidth={1.75} />
              </span>
              <div className="v5-cta-stack">
                <V5Button href={toV5(hiringCta.href)}>{hiringCta.label}</V5Button>
                <a className="v5-mail" href={hiring.email.href}>
                  {hiring.email.label}
                </a>
              </div>
            </Tile>
            <Tile tone="blush" tileClassName="v5-listhead-tile">
              <h3 className="v5-listhead">{hiring.listTitle}</h3>
              <ArrowRight className="v5-listhead-arrow" size={28} strokeWidth={1.75} aria-hidden="true" />
            </Tile>
            {hiring.list.map((line) => (
              <Tile key={line.text} tone="paper" tileClassName="v5-line-tile">
                <Quote className="v5-line-mark" size={22} strokeWidth={2} aria-hidden="true" />
                <p className="v5-line">
                  <q>{line.text}</q>
                </p>
              </Tile>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact tile grid ------------------------------------------- */}
      <section className="v5-section v5-section--last" aria-labelledby="v5-contact-title">
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--contact">
            <Tile w={2} tone="night">
              <HeadTile
                id="v5-contact-title"
                icon={<Send size={14} strokeWidth={2} aria-hidden="true" />}
                eyebrow={contactBand.eyebrow}
                title={contactBand.title}
                accent={contactBand.accent}
                lede={ledeOf(contactBand.lede)}
              >
                <div className="v5-actions">
                  <V5Button href={toV5(contactBand.primary.href)}>{contactBand.primary.label}</V5Button>
                </div>
              </HeadTile>
            </Tile>
            {enquiryTypes
              .filter((type): type is typeof type & { key: keyof typeof ENQUIRY_ICONS } => type.key in ENQUIRY_ICONS)
              .map((type, index) => {
                const Icon = ENQUIRY_ICONS[type.key];
                return (
                  <Tile key={type.key} tone={index % 2 === 0 ? "paper" : "blush"} tileClassName="v5-link-tile">
                    <span className="v5-link-icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <Link className="v5-cover" href={toV5(`/contact?type=${type.key}`)}>
                      {type.label}
                    </Link>
                    <ArrowRight className="v5-link-arrow" size={20} strokeWidth={2} aria-hidden="true" />
                  </Tile>
                );
              })}
            <Tile tone="marigold" tileClassName="v5-link-tile">
              <span className="v5-link-icon" aria-hidden="true">
                <BrandIcon name="linkedin" size={20} />
              </span>
              <a className="v5-cover" href={contactBand.secondary.href} target="_blank" rel="noopener noreferrer">
                {contactBand.secondary.label}
                <span className="v5-sr">{labels.newTab}</span>
              </a>
              <ArrowUpRight className="v5-link-arrow" size={20} strokeWidth={2} aria-hidden="true" />
            </Tile>
            <Tile tone="paper" tileClassName="v5-office-tile">
              <span className="v5-link-icon" aria-hidden="true">
                <Building2 size={22} strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="v5-office-title">{office.title}</h3>
                <address className="v5-office">
                  {office.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </div>
            </Tile>
          </div>
        </div>
      </section>
    </>
  );
}

/** One "What I lead" tile: the whole tile is the pillar's link. */
function PillarTile({ pillar, tone, w }: { pillar: (typeof pillars)[number]; tone: Tone; w: 1 | 2 }) {
  return (
    <Tile w={w} mdW={w === 2 ? 2 : 1} tone={tone} tileClassName="v5-pillar">
      <div className="v5-pillar-top">
        <span className="v5-pillar-index">{pillar.index}</span>
        <span className="v5-round v5-round--static" aria-hidden="true">
          <ArrowUpRight size={20} strokeWidth={2} />
        </span>
      </div>
      <h3 className="v5-pillar-title">{pillar.title}</h3>
      <p className="v5-pillar-body">
        <ParaText para={pillar.body} />
      </p>
      <Link className="v5-cover v5-pillar-link" href={toV5(pillar.link.href)}>
        {pillar.link.label}
        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
      </Link>
    </Tile>
  );
}
