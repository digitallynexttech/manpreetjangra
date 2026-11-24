import PageTransition from "@/components/PageTransition";
import { BigCounter } from "@/components/v2/BigCounter";
import { BigFigure } from "@/components/v2/BigFigure";
import { BigRows } from "@/components/v2/BigRows";
import { CaptionLabel } from "@/components/v2/CaptionLabel";
import { FieldPortrait } from "@/components/v2/FieldPortrait";
import { Marquee } from "@/components/v2/Marquee";
import { MixedHeading } from "@/components/v2/MixedHeading";
import { NotchCard } from "@/components/v2/NotchCard";
import { PillButton } from "@/components/v2/PillButton";
import { RoundArrowButton } from "@/components/v2/RoundArrowButton";
import { ThreadDraw } from "@/components/v2/ThreadDraw";
import { ThreadField } from "@/components/v2/ThreadField";
import { V2PageHero } from "@/components/v2/V2PageHero";
import { WordReveal } from "@/components/v2/WordReveal";
import { mixParts } from "@/components/v2/parts";
import { clientStats } from "@/content/work";
import { hero, hiring, journey, lead, meta, stats, words } from "@/content/home";
import { portrait } from "@/content/images";
import { intro as writingIntro } from "@/content/writing";
import { labels, toV2, wordmark } from "@/content/v2";
import { v2Metadata } from "@/lib/v2";
import { quoteView, timelineView } from "@/lib/views";

export const metadata = v2Metadata(meta);

// TEMPORARY (foundation builder): a test bench for the shared v2 components,
// so they can be checked in the browser before the real home page exists.
// The next builder replaces this file with the v2 home page (spec 4.1). All
// copy comes from the content files; nothing here is new copy.

export default function V2Home() {
  const quote = quoteView(words.featured);
  const now = journey.entries[journey.entries.length - 1];
  return (
    <PageTransition>
      {/* Hero: stacked name, portrait panel, "now" card. */}
      <section className="v2-surface" data-v2-theme="paper" aria-labelledby="v2-hero-title" style={{ minHeight: "100svh", overflow: "clip", position: "relative" }}>
        <ThreadField />
        <div className="v2-wrap" style={{ position: "relative", paddingTop: "calc(var(--v2-header) + 4vh)", paddingBottom: "6vh" }}>
          <CaptionLabel parts={hero.eyebrow.split(" · ")} />
          <MixedHeading
            as="h1"
            id="v2-hero-title"
            size="hero"
            stack
            rise="load"
            parts={[
              { text: wordmark.first, voice: "serif", plain: true },
              { text: wordmark.last, voice: "sans" },
            ]}
            style={{ marginTop: 16, position: "relative", zIndex: 1 }}
          />
          <div style={{ width: "min(34vw, 420px)", marginLeft: "auto", marginTop: "-12vw", position: "relative", zIndex: 2 }}>
            <FieldPortrait portrait={portrait} sizes="(min-width: 1024px) 34vw, 90vw" preload plate />
          </div>
          <div style={{ maxWidth: 240, marginTop: -120, position: "relative", zIndex: 3 }}>
            <NotchCard corner="tr" caption={<CaptionLabel parts={[labels.now]} />}>
              <p className="v2-sans" style={{ fontSize: 18, lineHeight: 1 }}>
                {now.title}
              </p>
            </NotchCard>
          </div>
        </div>
      </section>

      {/* Night: her words with a looping thread. */}
      <section className="v2-surface" data-v2-theme="night" aria-labelledby="v2-words-title" style={{ paddingBlock: "16vh", position: "relative", overflow: "clip" }}>
        <ThreadField seed={21} />
        <div className="v2-wrap" style={{ position: "relative" }}>
          <h2 id="v2-words-title" className="v2-label" style={{ textAlign: "center" }}>
            {labels.inHerWords}
          </h2>
          <div style={{ position: "relative", margin: "8vh auto 0", maxWidth: 900, padding: "8vh 6vw", background: "var(--color-night-raised)", borderRadius: 10 }}>
            <blockquote>
              <p className="v2-serif-italic" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.5rem)", lineHeight: 1.2, color: "var(--v2-fg)" }}>
                <q className="v2-quote">{quote.text}</q>
              </p>
              <footer className="v2-label" style={{ marginTop: 24 }}>
                {quote.attribution}
              </footer>
            </blockquote>
            <ThreadDraw variant="loop" on="section" start="top 70%" end="bottom 40%" style={{ position: "absolute", left: "-10%", bottom: "-34%", width: "120%" }} />
          </div>
          <div style={{ marginTop: "18vh" }}>
            <WordReveal text={hero.statement} accent={hero.accent} />
          </div>
        </div>
      </section>

      {/* Paper: two-voice heading, arrow button, hover scribble. */}
      <section className="v2-surface" data-v2-theme="paper" aria-labelledby="v2-work-title" style={{ paddingBlock: "14vh" }}>
        <div className="v2-wrap" style={{ display: "grid", gap: 48, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          <div className="v2-draw-host" style={{ textAlign: "center" }}>
            <MixedHeading
              id="v2-work-title"
              size="display"
              align="center"
              stack
              parts={[
                { text: labels.theWork.serif, voice: "serif", mark: "circle", markTrigger: "hover" },
                { text: labels.theWork.sans, voice: "sans" },
              ]}
            />
            <p className="v2-body" style={{ maxWidth: 360, margin: "20px auto" }}>
              {typeof lead.lede === "string" ? lead.lede : null}
            </p>
            <RoundArrowButton href={toV2("/work")} label={lead.eyebrow} />
          </div>
          <div style={{ display: "grid", gap: 16, alignContent: "center", justifyItems: "start" }}>
            <PillButton href={toV2(hero.primary.href)}>{hero.primary.label}</PillButton>
            <PillButton href={toV2(hiring.button.href)} variant="outline">
              {hiring.button.label}
            </PillButton>
            <PillButton href={hiring.email.href}>{hiring.email.label}</PillButton>
          </div>
        </div>
      </section>

      {/* Night: notched cards with counters. */}
      <section className="v2-surface" data-v2-theme="night" aria-labelledby="v2-numbers-title" style={{ paddingBlock: "14vh" }}>
        <div className="v2-wrap">
          <MixedHeading
            id="v2-numbers-title"
            size="display"
            parts={[
              { text: labels.inNumbers.sans, voice: "sans" },
              { text: labels.inNumbers.serif, voice: "serif" },
            ]}
          />
          <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginTop: 48 }}>
            {[...stats.items, ...clientStats].map((item, index) => (
              <NotchCard key={item.label} corner={index % 2 ? "tr" : "bl"} caption={<CaptionLabel parts={[String(index + 1).padStart(2, "0")]} />}>
                <BigCounter value={item.value} label={item.label} />
              </NotchCard>
            ))}
          </div>
          <p className="v2-label" style={{ marginTop: 24 }}>
            {stats.caption}
          </p>
        </div>
      </section>

      {/* Paper: big figure, big rows and a marquee. */}
      <section className="v2-surface v2-surface--sand" data-v2-theme="paper" aria-labelledby="v2-rows-title" style={{ paddingBlock: "12vh" }}>
        <div className="v2-wrap">
          <BigFigure value={clientStats[0].value} label={clientStats[0].label} />
          <h2 id="v2-rows-title" className="v2-label" style={{ margin: "10vh 0 20px" }}>
            {journey.eyebrow}
          </h2>
          <BigRows
            group="v2-test-journey"
            columns={[
              { header: labels.year, width: "8rem", kind: "small" },
              { header: labels.role, width: "minmax(0, 1fr)" },
            ]}
            rows={journey.entries.map((entry) => {
              const view = timelineView(entry);
              return { key: view.id, cells: [view.yearLabel, view.title], detail: <p className="v2-body">{view.body}</p> };
            })}
          />
        </div>
        <Marquee className="v2-test-marquee" itemClassName="v2-sans" items={hiring.list.map((line) => line.text)} label={hiring.listTitle} />
      </section>

      <V2PageHero
        as="h2"
        id="v2-test-hero"
        title={mixParts(writingIntro.title, ["In her"]).map((part, index) => (index === 1 ? { ...part, mark: "underline" as const } : part))}
        meta={hero.eyebrow.split(" · ")}
        lede={writingIntro.lede}
        accent="with an open invitation to speak."
      />
    </PageTransition>
  );
}
