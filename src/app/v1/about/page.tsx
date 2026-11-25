import { ContactBand } from "@/components/ContactBand";
import { CopyButton } from "@/components/CopyButton";
import { PageIntro } from "@/components/PageIntro";
import PageTransition from "@/components/PageTransition";
import { ParaText } from "@/components/ParaText";
import { QuoteCard } from "@/components/QuoteCard";
import { SectionHead, titleId } from "@/components/SectionHead";
import { TextLink } from "@/components/TextLink";
import { Timeline } from "@/components/Timeline";
import { SHOW_DIRECTORSHIP, beliefs, bio, education, intro, journey, meta, story } from "@/content/about";
import { introImages } from "@/content/images";
import { pageMetadata } from "@/lib/site";
import { V1_BASE, toV1 } from "@/lib/versions";
import { educationDetail, quoteView, timelineView } from "@/lib/views";

export const metadata = pageMetadata(meta);

// The About page (spec 4.2), in the third person: a record that press and
// organisers can lift; her own words appear only as attributed quotes.
// Surfaces, top to bottom: intro (paper), story (paper, sticky heading),
// journey (sand), what drives her (paper), education (paper, hairline above),
// bio for organisers (sand), contact band (paper), then the night footer.
// All copy comes from src/content/about.ts.

export default function About() {
  const bioText = SHOW_DIRECTORSHIP ? bio.text : bio.withoutDirectorship;
  return (
    <PageTransition>
      <PageIntro
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        image={introImages.about}
      />

      {/* Her story: the heading column stays in view on desktop while the
          five paragraphs scroll past it. */}
      <section id={story.id} aria-labelledby={titleId(story.id)} className="site-section">
        <div className="site-wrap site-editorial-grid">
          <div>
            <SectionHead id={story.id} eyebrow={story.eyebrow} title={story.title} accent={story.accent} className="lg:mb-0" />
          </div>
          <div className="site-prose">
            {story.paragraphs.map((paragraph, index) => (
              <p key={index} data-reveal>
                <ParaText para={paragraph} />
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Journey: every milestone opens to its details and sources, one at a
          time; the last one ("Now") starts open. */}
      <section id={journey.id} aria-labelledby={titleId(journey.id)} className="site-section bg-sand">
        <div className="site-wrap site-editorial-grid">
          <div>
            <SectionHead
              id={journey.id}
              eyebrow={journey.eyebrow}
              title={journey.title}
              accent={journey.accent}
              lede={journey.lede}
              className="lg:mb-0"
            />
          </div>
          <Timeline entries={journey.entries.map(timelineView)} variant="full" />
        </div>
      </section>

      {/* What drives her: her words from the WER feature, then the magazine's
          own summary (named, never in quotation marks). */}
      <section id={beliefs.id} aria-labelledby={titleId(beliefs.id)} className="site-section">
        <div className="site-wrap site-grid">
          <div className="site-sticky-col lg:col-span-5">
            <SectionHead id={beliefs.id} eyebrow={beliefs.eyebrow} title={beliefs.title} accent={beliefs.accent} className="lg:mb-0" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div data-reveal>
              <QuoteCard quote={quoteView(beliefs.quote.quote, beliefs.quote.linkLabel)} variant="paper" />
            </div>
            <p className="site-prose mt-8 text-ink-muted" data-reveal>
              {beliefs.paraphrase.text}
            </p>
            <p className="mt-6" data-reveal>
              <TextLink href={beliefs.link.href} external={beliefs.link.external}>
                {beliefs.link.label}
              </TextLink>
            </p>
          </div>
        </div>
      </section>

      {/* Education: a hairline above, then one row per degree. The right
          column shows only what she has confirmed (spec 4.8 C2, C3). */}
      <section id={education.id} aria-labelledby={titleId(education.id)} className="site-section pt-0">
        <div className="site-wrap">
          <div className="site-grid site-hairline-above">
            <div className="lg:col-span-5">
              <SectionHead
                id={education.id}
                eyebrow={education.eyebrow}
                title={education.title}
                accent={education.accent}
                className="lg:mb-0"
              />
            </div>
            <ul className="site-rows lg:col-span-6 lg:col-start-7 lg:self-end" data-reveal="group">
              {education.entries.map((entry) => (
                <li key={entry.degree} className="site-row-static site-education-row" data-reveal>
                  <h3 className="text-h4">{entry.degree}</h3>
                  <p className="text-ink-muted">{educationDetail(entry)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bio for organisers: ready to paste into a programme or a press
          release, with a copy button. */}
      <section id={bio.id} aria-labelledby={titleId(bio.id)} className="site-section bg-sand">
        <div className="site-wrap site-grid">
          <div className="lg:col-span-5">
            <SectionHead id={bio.id} eyebrow={bio.eyebrow} title={bio.title} accent={bio.accent} className="lg:mb-0" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="site-bio-box" data-reveal>
              {bioText}
            </p>
            <div className="mt-6" data-reveal>
              <CopyButton text={bioText} label={bio.copy.label} doneLabel={bio.copy.doneLabel} failLabel={bio.copy.failLabel} />
              <p className="mt-4">
                <TextLink href={toV1(bio.link.href)}>{bio.link.label}</TextLink>
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactBand surface="paper" base={V1_BASE} />
    </PageTransition>
  );
}
