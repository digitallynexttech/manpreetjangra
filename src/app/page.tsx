import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { ContactBand } from "@/components/ContactBand";
import { Counter } from "@/components/Counter";
import { Hero } from "@/components/Hero";
import { HiringPill } from "@/components/HiringPill";
import PageTransition from "@/components/PageTransition";
import { ParaText } from "@/components/ParaText";
import { QuoteCard } from "@/components/QuoteCard";
import { SectionHead, titleId } from "@/components/SectionHead";
import { TextLink } from "@/components/TextLink";
import { Timeline } from "@/components/Timeline";
import { hero, hiring, journey, lead, meta, pillars, stats, words } from "@/content/home";
import { portrait, zari } from "@/content/images";
import { hasRoles, roles } from "@/content/roles";
import { pageMetadata } from "@/lib/site";
import { quoteView, timelineView } from "@/lib/views";

export const metadata = pageMetadata(meta);

// The home page (spec 4.1). Surfaces, top to bottom: hero (paper), proof row
// (sand), what I lead (paper, sand cards), journey (sand), in her words
// (night, the only night band), hiring (paper, one sand card), contact band
// (sand), then the night footer. All copy comes from src/content/home.ts.

// Links from a home teaser into an inner page slide forward (spec 2.3).
const FORWARD = ["nav-forward"];

export default function Home() {
  return (
    <PageTransition>
      <Hero hero={hero} portrait={portrait} hasRoles={hasRoles} />

      {/* Proof row: three numbers that count up once (two with no open roles). */}
      <section className="border-t border-line bg-sand py-12 lg:py-16" aria-labelledby="proof-title">
        <div className="site-wrap">
          <h2 id="proof-title" className="site-sr-only">
            {stats.title}
          </h2>
          <Counter
            items={stats.items.map(({ value, label, href, linkLabel }) => ({ value, label, href, linkLabel }))}
            caption={stats.caption}
          />
        </div>
      </section>

      {/* What I lead: three link cards (one anchor each, never a link inside a link). */}
      <section id={lead.id} aria-labelledby={titleId(lead.id)} className="site-section">
        <div className="site-wrap">
          <SectionHead id={lead.id} eyebrow={lead.eyebrow} title={lead.title} accent={lead.accent} lede={lead.lede} />
          <ul className="grid gap-6 lg:grid-cols-3 xl:gap-8" data-reveal="group">
            {pillars.map((pillar) => (
              <li key={pillar.index} data-reveal>
                <Link className="site-card" href={pillar.link.href} transitionTypes={FORWARD}>
                  <span className="site-caption">{pillar.index}</span>
                  <h3 className="mt-4 text-h4">{pillar.title}</h3>
                  <p className="mt-3">
                    <ParaText para={pillar.body} />
                  </p>
                  <span className="site-card-link">
                    <span className="site-text-link site-text-link--static">
                      {pillar.link.label}
                      <ArrowRight className="site-arrow" size={18} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey teaser: the compact timeline, oldest first. */}
      <section id={journey.id} aria-labelledby={titleId(journey.id)} className="site-section bg-sand">
        <div className="site-wrap">
          <SectionHead
            id={journey.id}
            eyebrow={journey.eyebrow}
            title={journey.title}
            accent={journey.accent}
            lede={journey.lede}
          />
          <div className="site-journey">
            <Timeline entries={journey.entries.map(timelineView)} variant="compact" />
            <p className="mt-10" data-reveal>
              <TextLink href={journey.link.href} transitionTypes={FORWARD}>
                {journey.link.label}
              </TextLink>
            </p>
          </div>
        </div>
      </section>

      {/* In her words: the only night band. The zari texture shows from lg,
          on the right; the words stay in columns 1-8, clear of it. */}
      <section
        id={words.id}
        aria-labelledby={titleId(words.id)}
        className="band-night site-night-band site-section"
      >
        <span className="site-night-texture" aria-hidden="true">
          <Image src={zari.src} alt="" fill sizes="55vw" loading="lazy" className="object-cover" />
        </span>
        <div className="site-wrap site-grid">
          <div className="lg:col-span-8">
            <SectionHead id={words.id} eyebrow={words.eyebrow} title={words.title} accent={words.accent} lede={words.lede} tone="night" />
            <div className="grid gap-12 md:grid-cols-2 lg:gap-y-16" data-reveal="group">
              <div className="md:col-span-2" data-reveal>
                <QuoteCard quote={quoteView(words.featured)} variant="night-large" />
              </div>
              {words.quotes.map((id) => (
                <div key={id} data-reveal>
                  <QuoteCard quote={quoteView(id)} variant="night" />
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4" data-reveal>
              {words.links.map((link) => (
                <TextLink
                  key={link.href}
                  href={link.href}
                  external={link.external}
                  transitionTypes={link.external ? undefined : FORWARD}
                >
                  {link.label}
                </TextLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hiring: one sand card; the button is outline (red budget, spec 2.5). */}
      <section id={hiring.id} aria-labelledby={titleId(hiring.id)} className="site-section">
        <div className="site-wrap">
          <div className="site-panel site-hiring">
            <div className="site-hiring-text">
              {hasRoles ? <HiringPill count={roles.length} className="site-hiring-pill" /> : null}
              <SectionHead id={hiring.id} eyebrow={hiring.eyebrow} title={hiring.title} accent={hiring.accent} lede={hiring.lede} />
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4" data-reveal>
                <Button
                  href={(hasRoles ? hiring.button : hiring.buttonEmpty).href}
                  variant="outline"
                  transitionTypes={FORWARD}
                >
                  {(hasRoles ? hiring.button : hiring.buttonEmpty).label}
                </Button>
                <TextLink href={hiring.email.href}>{hiring.email.label}</TextLink>
              </div>
            </div>
            <div className="site-hiring-list" data-reveal>
              <h3 className="site-hiring-list-title">{hiring.listTitle}</h3>
              <ul className="site-rows">
                {hiring.list.map((line) => (
                  <li key={line.text} className="site-row-static">
                    <q>{line.text}</q>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactBand surface="sand" />
    </PageTransition>
  );
}

