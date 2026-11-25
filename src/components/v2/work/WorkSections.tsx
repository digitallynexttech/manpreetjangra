import { ParaText } from "@/components/ParaText";
import { labels, toV2 } from "@/content/v2";
import { adac, clientStats, clientStory, group, how, intro, operations, talent, ventures } from "@/content/work";
import { quoteView, ventureView } from "@/lib/views";
import { BigCounter } from "../BigCounter";
import { BigFigure } from "../BigFigure";
import { BigRows } from "../BigRows";
import { MixedHeading } from "../MixedHeading";
import { NightCurve } from "../NightCurve";
import { NotchCard } from "../NotchCard";
import { ParallaxGroup } from "../ParallaxGroup";
import { PillButton } from "../PillButton";
import { QuoteFigure } from "../QuoteFigure";
import { Reveal } from "../Reveal";
import { ThreadDraw } from "../ThreadDraw";
import { ThreadField } from "../ThreadField";
import { ThreadMark } from "../ThreadMark";
import { V2PageHero } from "../V2PageHero";
import { VentureRows } from "../VentureRows";
import { WordReveal } from "../WordReveal";
import { mixParts } from "../parts";

// The sections of /v2/work (plan/v2-spec.md 4.2, 4.4), in her first person
// for what she runs and the agency's own words for the agency. Every word
// comes from src/content/work.ts; the column headings and control names are
// labels from content/v2.ts.

const titleId = (id: string) => `v2-${id}-title`;

/** 1. "THE WORK" (the home page's label for this page) with the scribble
 *  under THE; the meta row is Digitally Next's own line (agency, city,
 *  founded); the classic intro title sits over the lede. */
export function WorkHero() {
  const agency = ventures[0];
  return (
    <V2PageHero
      id="v2-work-title"
      title={[
        { text: labels.theWork.serif, voice: "serif", plain: true, mark: "underline" },
        { text: labels.theWork.sans, voice: "sans" },
      ]}
      meta={agency.category.split(" · ")}
      // THE is a wide serif: a smaller estimate keeps the title on one line
      // on phones too (FitLine sets the exact size from 768 px).
      fit={1.22}
      fitWide={1.093}
      ledeLabel={intro.title}
      lede={intro.lede}
      accent="where the agency sits in its group."
    />
  );
}

/** 2. Operations: the heading in both voices beside the operating model,
 *  the five service lines as big rows, then Lando's giant number: the
 *  markets the agency lists (the "12" of the section title), with the list
 *  of markets and the source of the agency figures. */
export function WorkOperations() {
  const markets = /(\d+) (markets)/.exec(operations.title);
  return (
    <section id={operations.id} className="v2-surface v2-inner-section v2-work-ops" data-v2-theme="paper" aria-labelledby={titleId(operations.id)}>
      <ThreadField seed={71} count={10} />
      <div className="v2-wrap">
        <div className="v2-inner-head">
          <div>
            <p className="v2-label v2-inner-eyebrow">{operations.eyebrow}</p>
            <MixedHeading id={titleId(operations.id)} size="title" parts={mixParts(operations.title, ["clients in 12 markets."])} />
          </div>
          <p className="v2-body v2-inner-head-lede">
            <ParaText para={operations.model} />
          </p>
        </div>
        <Reveal items=".v2-row" y={28}>
          <BigRows
            className="v2-work-lines"
            columns={[
              { header: labels.number, width: "clamp(3rem, 8vw, 8rem)", kind: "small" },
              { header: labels.serviceLine, width: "minmax(0, 1fr)" },
            ]}
            rows={operations.serviceLines.map((line) => ({ key: line.index, cells: [line.index, line.text] }))}
          />
        </Reveal>
      </div>
      {markets ? (
        <div className="v2-wrap v2-inner-figure v2-work-markets">
          <BigFigure value={markets[1]} label={markets[2]} />
          <div className="v2-work-markets-text">
            <p className="v2-lede">{operations.markets.text}</p>
            <p className="v2-label">{operations.caption.text}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

/** 3. Talent: her hiring record and today's open roles (counted from
 *  roles.ts), and a line from one of her job posts in a notched card that
 *  drifts a little slower than the page. */
export function WorkTalent() {
  return (
    <section id={talent.id} className="v2-surface v2-surface--sand v2-inner-section v2-work-talent" data-v2-theme="paper" aria-labelledby={titleId(talent.id)}>
      <ParallaxGroup className="v2-wrap v2-work-talent-grid" small={0.3}>
        <div className="v2-work-talent-text">
          <p className="v2-label v2-inner-eyebrow">{talent.eyebrow}</p>
          <MixedHeading id={titleId(talent.id)} size="title" parts={mixParts(talent.title, ["since 2018."])} />
          <Reveal as="p" className="v2-lede v2-work-talent-para">
            {talent.paragraph.text}
          </Reveal>
          <PillButton href={toV2(talent.link.href)} variant="outline">
            {talent.link.label}
          </PillButton>
        </div>
        <div className="v2-work-talent-card" data-v2-speed="0.35">
          <NotchCard corner="bl">
            <QuoteFigure quote={quoteView(talent.quote.quote, talent.quote.linkLabel)} />
          </NotchCard>
        </div>
      </ParallaxGroup>
    </section>
  );
}

/** 4. The AI Decision and Acceleration Center as a night manifesto: the
 *  section title set huge, lighting up word by word with the centre's name
 *  in the serif voice, a marigold thread drawn under it, then her LinkedIn
 *  headline and the agency's own line for ADAC, and the open ADAC roles
 *  when there are any. */
export function WorkAdac() {
  return (
    <section id={adac.id} className="v2-surface v2-inner-manifesto v2-work-adac" data-v2-theme="night" aria-labelledby={titleId(adac.id)}>
      <ThreadField seed={83} count={10} />
      <div className="v2-wrap v2-inner-manifesto-inner">
        <div className="v2-inner-manifesto-head">
          <ThreadMark />
          <p className="v2-label">{adac.eyebrow}</p>
        </div>
        <WordReveal
          as="h2"
          id={titleId(adac.id)}
          text={adac.title}
          accent="AI Decision and Acceleration Center"
          size="manifesto"
          className="v2-inner-manifesto-text v2-work-adac-title"
        />
        <ThreadDraw variant="loop" className="v2-work-adac-loop" start="top 90%" end="bottom 50%" />
        <Reveal className="v2-work-adac-body">
          <p className="v2-lede">
            <ParaText para={adac.paragraph} />
          </p>
          {adac.roles ? <p className="v2-body v2-work-adac-roles">{adac.roles.text}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}

/** 5. How I work, "Partners, not vendors.": two of her posts as quote cards
 *  set off from each other (one raised, one paper), drifting at different
 *  speeds on desktop, each linking to its post. */
export function WorkHow() {
  return (
    <section id={how.id} className="v2-surface v2-inner-section v2-work-how" data-v2-theme="night" aria-labelledby={titleId(how.id)}>
      <div className="v2-wrap">
        <div className="v2-inner-head">
          <div>
            <p className="v2-label v2-inner-eyebrow">{how.eyebrow}</p>
            <MixedHeading id={titleId(how.id)} size="display" parts={mixParts(how.title, ["not vendors."])} />
          </div>
          {typeof how.lede === "string" ? <p className="v2-body v2-inner-head-lede">{how.lede}</p> : null}
        </div>
        <ParallaxGroup className="v2-work-how-cards" small={0.25}>
          {how.quotes.map((ref, index) => (
            <div
              key={ref.quote}
              className={`v2-work-how-card v2-work-how-card--${index === 0 ? "raised" : "paper"}`}
              data-v2-theme={index === 0 ? "night" : "paper"}
              data-v2-speed={index === 0 ? "0.15" : "0.55"}
            >
              <NotchCard corner={index === 0 ? "tr" : "bl"}>
                <QuoteFigure quote={quoteView(ref.quote, ref.linkLabel)} size="large" newTabLabel={labels.newTab} />
              </NotchCard>
            </div>
          ))}
        </ParallaxGroup>
      </div>
    </section>
  );
}

/** 6. A client story, Lando's "F1 career" block: the heading, the story and
 *  her line about trust on the left, the four numbers from her post as big
 *  counters in notched cards on the right, and the link to the post. */
export function WorkClientStory() {
  return (
    <section
      id={clientStory.id}
      className="v2-surface v2-surface--sand v2-inner-section v2-work-client"
      data-v2-theme="paper"
      aria-labelledby={titleId(clientStory.id)}
    >
      <NightCurve />
      <div className="v2-wrap v2-work-client-grid">
        <div className="v2-work-client-text">
          <p className="v2-label v2-inner-eyebrow">{clientStory.eyebrow}</p>
          <MixedHeading id={titleId(clientStory.id)} size="title" parts={mixParts(clientStory.title, ["first Israeli client."])} />
          {typeof clientStory.lede === "string" ? <p className="v2-body v2-work-client-lede">{clientStory.lede}</p> : null}
          <QuoteFigure quote={quoteView(clientStory.quote.quote, clientStory.quote.linkLabel)} size="large" className="v2-work-client-quote">
            <ThreadDraw variant="underline" shape="wave" trigger="scroll" start="top 85%" end="top 50%" className="v2-work-client-line" />
          </QuoteFigure>
          <PillButton href={clientStory.link.href} newTabLabel={labels.newTab}>
            {clientStory.link.label}
          </PillButton>
        </div>
        <Reveal as="ul" className="v2-work-client-stats" items="li">
          {clientStats.map((item, index) => (
            <li key={item.label}>
              <NotchCard corner={index % 2 ? "bl" : "tr"} className="v2-work-client-card">
                <BigCounter value={item.value} label={item.label} />
              </NotchCard>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** 7. Where I work: the group's three organisations as big rows, each one
 *  link to its website, with the classic website preview following the
 *  pointer (none for iSoCIAL, which has no screenshot). */
export function WorkGroup() {
  return (
    <section id={group.id} className="v2-surface v2-inner-section v2-work-group" data-v2-theme="paper" aria-labelledby={titleId(group.id)}>
      <ThreadField seed={97} count={9} />
      <div className="v2-wrap">
        <div className="v2-inner-head">
          <div>
            <p className="v2-label v2-inner-eyebrow">{group.eyebrow}</p>
            <MixedHeading id={titleId(group.id)} size="display" parts={mixParts(group.title, ["I work."])} />
          </div>
          {typeof group.lede === "string" ? <p className="v2-body v2-inner-head-lede">{group.lede}</p> : null}
        </div>
        <Reveal items=".v2-row" y={28}>
          <VentureRows
            ventures={ventures.map(ventureView)}
            labels={{
              headers: [labels.organisation, labels.field, labels.role],
              newTab: labels.newTab,
              previewWebsite: labels.previewWebsite,
              previewThe: labels.previewThe,
              previewWindow: labels.previewWindow,
              closePreview: labels.closePreview,
              visit: labels.visit,
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
