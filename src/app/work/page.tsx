import { ContactBand } from "@/components/ContactBand";
import { Counter } from "@/components/Counter";
import { PageIntro } from "@/components/PageIntro";
import PageTransition from "@/components/PageTransition";
import { ParaText } from "@/components/ParaText";
import { QuoteCard } from "@/components/QuoteCard";
import { SectionHead, titleId } from "@/components/SectionHead";
import { TextLink } from "@/components/TextLink";
import { VentureList } from "@/components/VentureList";
import { introImages } from "@/content/images";
import { adac, clientStats, clientStory, group, how, intro, meta, operations, talent, ventures } from "@/content/work";
import { pageMetadata } from "@/lib/site";
import { quoteView, ventureView } from "@/lib/views";

export const metadata = pageMetadata(meta);

// The Work page (spec 4.3), in the first person for what she runs; agency
// facts are attributed to the agency. Surfaces, top to bottom: intro (paper),
// operations (paper, sticky heading), talent (sand), the AI Decision and
// Acceleration Center (paper), how I work (paper, hairline above), a client
// story (sand, counters), where I work (paper, website previews), contact
// band (sand), then the night footer. All copy comes from src/content/work.ts.

export default function Work() {
  return (
    <PageTransition>
      <PageIntro
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        image={introImages.work}
      />

      {/* 01 Operations: the heading column (with the source of the agency
          figures) stays in view on desktop while the service lines scroll. */}
      <section id={operations.id} aria-labelledby={titleId(operations.id)} className="site-section">
        <div className="site-wrap site-editorial-grid">
          <div className="mb-10 lg:mb-0">
            <SectionHead
              id={operations.id}
              eyebrow={operations.eyebrow}
              title={operations.title}
              accent={operations.accent}
              className="mb-0"
            />
            <p className="site-caption mt-5 max-w-[30rem]" data-reveal>
              {operations.caption.text}
            </p>
          </div>
          <div className="site-prose">
            <p data-reveal>
              <ParaText para={operations.model} />
            </p>
            <ol className="site-rows my-8" data-reveal="group">
              {operations.serviceLines.map((line) => (
                <li key={line.index} className="site-row-static site-railed" data-reveal>
                  <span className="site-caption site-tabular">{line.index}</span>
                  <h3 className="text-h4">{line.text}</h3>
                </li>
              ))}
            </ol>
            <p data-reveal>{operations.markets.text}</p>
          </div>
        </div>
      </section>

      {/* 02 Talent: her hiring record and today's open roles (counted from
          roles.ts), beside a line from one of her job posts. */}
      <section id={talent.id} aria-labelledby={titleId(talent.id)} className="site-section bg-sand">
        <div className="site-wrap site-grid">
          <div className="lg:col-span-6">
            <SectionHead id={talent.id} eyebrow={talent.eyebrow} title={talent.title} accent={talent.accent} />
            <p className="site-prose" data-reveal>
              {talent.paragraph.text}
            </p>
            <p className="mt-8" data-reveal>
              <TextLink href={talent.link.href}>{talent.link.label}</TextLink>
            </p>
          </div>
          <div className="mt-12 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-end" data-reveal>
            <QuoteCard quote={quoteView(talent.quote.quote, talent.quote.linkLabel)} variant="paper" />
          </div>
        </div>
      </section>

      {/* 03 The AI Decision and Acceleration Center. The open-roles paragraph
          is left out when no ADAC role is listed. */}
      <section id={adac.id} aria-labelledby={titleId(adac.id)} className="site-section">
        <div className="site-wrap site-grid">
          <div className="site-sticky-col lg:col-span-5">
            <SectionHead id={adac.id} eyebrow={adac.eyebrow} title={adac.title} accent={adac.accent} className="lg:mb-0" />
          </div>
          <div className="site-prose lg:col-span-6 lg:col-start-7">
            <p data-reveal>
              <ParaText para={adac.paragraph} />
            </p>
            {adac.roles ? <p data-reveal>{adac.roles.text}</p> : null}
          </div>
        </div>
      </section>

      {/* How I work: two things she has posted, each linked to its post. */}
      <section id={how.id} aria-labelledby={titleId(how.id)} className="site-section pt-0">
        <div className="site-wrap">
          <div className="site-hairline-above">
            <SectionHead id={how.id} eyebrow={how.eyebrow} title={how.title} accent={how.accent} lede={how.lede} />
            <div className="grid gap-12 md:grid-cols-2" data-reveal="group">
              {how.quotes.map((ref) => (
                <div key={ref.quote} data-reveal>
                  <QuoteCard quote={quoteView(ref.quote, ref.linkLabel)} variant="paper" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* A client story: the numbers from her September 2022 post. */}
      <section id={clientStory.id} aria-labelledby={titleId(clientStory.id)} className="site-section bg-sand">
        <div className="site-wrap">
          <SectionHead
            id={clientStory.id}
            eyebrow={clientStory.eyebrow}
            title={clientStory.title}
            accent={clientStory.accent}
            lede={clientStory.lede}
          />
          <Counter items={clientStats.map(({ value, label }) => ({ value, label }))} phoneColumns={2} />
          <div className="site-grid mt-16">
            <div className="lg:col-span-7" data-reveal>
              <QuoteCard quote={quoteView(clientStory.quote.quote, clientStory.quote.linkLabel)} variant="paper" />
              <p className="mt-6">
                <TextLink href={clientStory.link.href} external={clientStory.link.external}>
                  {clientStory.link.label}
                </TextLink>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where I work: the three organisations of the group, as hairline
          rows with a website preview (none for iSoCIAL). */}
      <section id={group.id} aria-labelledby={titleId(group.id)} className="site-section">
        <div className="site-wrap">
          <SectionHead id={group.id} eyebrow={group.eyebrow} title={group.title} accent={group.accent} lede={group.lede} />
          <VentureList ventures={ventures.map(ventureView)} />
        </div>
      </section>

      <ContactBand surface="sand" />
    </PageTransition>
  );
}
