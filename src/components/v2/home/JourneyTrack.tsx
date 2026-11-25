import Image from "next/image";
import { ParaText } from "@/components/ParaText";
import type { CSSProperties, ReactNode } from "react";
import { journey } from "@/content/home";
import { podium, portrait } from "@/content/images";
import { stage } from "@/content/writing";
import { isConfirmed } from "@/content/types";
import { toV2 } from "@/content/v2";
import { ventures } from "@/content/work";
import { quoteView, timelineView } from "@/lib/views";
import { CaptionLabel } from "../CaptionLabel";
import { FieldPortrait } from "../FieldPortrait";
import { PillButton } from "../PillButton";
import { ThreadDraw } from "../ThreadDraw";
import { ThreadField } from "../ThreadField";
import { TrackScene } from "./HomeScenes";

// 4.1 item 4, Lando's horizontal track: her journey as a scattered row of
// frames. Each timeline entry is a mono caption (year · organisation), a
// title in the bold sans and one line of detail; between them the portrait
// tile, two of the group's websites, the podium photograph (grey until it
// reaches the centre) and one serif quote with a short vermilion underline,
// ending on "Her full story". Desktop: a pinned stage moving sideways while
// the ground goes night, sand, paper (HomeScenes TrackScene). Below 1024 px
// and with reduced motion: a vertical collage, the first frames on night and
// the rest on sand fading to paper.

/** Where a frame sits. Desktop row: width, distance from the top of the
 *  stage, gap before it (negative overlaps the previous frame, one high,
 *  one low) and speed. Collage from 768 px: grid columns and a top offset.
 *  Phones: width and side. */
type Place = {
  w: string;
  y: string;
  gap: string;
  speed?: number;
  col: string;
  mt?: string;
  sw: string;
  end?: boolean;
};

const PLACES: Record<string, Place> = {
  intro: { w: "30vw", y: "27vh", gap: "0vw", col: "1 / span 8", sw: "100%" },
  "2017": { w: "21vw", y: "12vh", gap: "7vw", col: "2 / span 6", sw: "90%" },
  portrait: { w: "13vw", y: "50vh", gap: "-5vw", speed: 0.12, col: "9 / span 3", mt: "14vh", sw: "56%", end: true },
  "2018": { w: "21vw", y: "21vh", gap: "6vw", col: "1 / span 6", sw: "90%" },
  imet: { w: "25vw", y: "60vh", gap: "-2vw", speed: -0.08, col: "7 / span 6", mt: "16vh", sw: "86%", end: true },
  "2019": { w: "21vw", y: "10vh", gap: "6vw", col: "2 / span 6", sw: "90%" },
  quote: { w: "23vw", y: "59vh", gap: "-5vw", col: "7 / span 5", mt: "12vh", sw: "92%", end: true },
  podium: { w: "27vw", y: "13vh", gap: "6vw", col: "1 / span 5", sw: "80%" },
  "2024": { w: "19vw", y: "60vh", gap: "3vw", speed: 0.08, col: "7 / span 6", mt: "18vh", sw: "90%", end: true },
  now: { w: "25vw", y: "15vh", gap: "-8vw", col: "1 / span 7", sw: "100%" },
  dn: { w: "27vw", y: "55vh", gap: "-5vw", speed: 0.1, col: "5 / span 8", mt: "4vh", sw: "86%", end: true },
  end: { w: "18vw", y: "34vh", gap: "6vw", col: "1 / -1", sw: "100%" },
};

function place(key: string): { style: CSSProperties; speed?: number } {
  const p = PLACES[key] ?? PLACES["2019"];
  return {
    style: {
      "--w": p.w,
      "--y": p.y,
      "--gap": p.gap,
      "--col": p.col,
      "--mt": p.mt ?? "0px",
      "--sw": p.sw,
      "--sj": p.end ? "end" : "start",
    } as CSSProperties,
    speed: p.speed,
  };
}

/** "Admissions and outreach, iMET Global" -> role and organisation. */
function splitTitle(title: string): { role: string; org?: string } {
  const at = title.lastIndexOf(", ");
  return at < 0 ? { role: title } : { role: title.slice(0, at), org: title.slice(at + 2) };
}

function Item({ id, className, as: Tag = "div", children }: { id: string; className: string; as?: "div" | "figure" | "article"; children: ReactNode }) {
  const { style, speed } = place(id);
  return (
    <Tag className={`v2-track-item ${className}`} style={style} data-speed={speed ? String(speed) : undefined}>
      {children}
    </Tag>
  );
}

function Entry({ id }: { id: string }) {
  const entry = journey.entries.find((item) => item.id === id);
  if (!entry) return null;
  const view = timelineView(entry);
  const { role, org } = splitTitle(view.title);
  return (
    <Item id={id} as="article" className={`v2-track-entry${id === "now" ? " v2-track-entry--now" : ""}`}>
      <CaptionLabel parts={[view.yearLabel, org]} />
      <h3 className="v2-sans v2-track-title">{role}</h3>
      <p className="v2-track-detail">{view.body}</p>
    </Item>
  );
}

function Website({ id, index }: { id: string; index: number }) {
  const venture = ventures[index];
  if (!venture?.preview) return null;
  return (
    <Item id={id} as="figure" className="v2-track-photo v2-track-site">
      <CaptionLabel as="figcaption" parts={[venture.name]} small />
      <div className="v2-track-frame v2-track-frame--site">
        <Image src={venture.preview} alt={venture.previewAlt ?? ""} width={960} height={600} sizes="(min-width: 1024px) 28vw, (min-width: 768px) 50vw, 86vw" />
      </div>
    </Item>
  );
}

export function JourneyTrack() {
  const quote = quoteView("trust");
  const hasDirector = journey.entries.some((entry) => entry.id === "2024");
  const podiumCaption = [stage.eyebrow, isConfirmed(stage.photoEvent) ? stage.photoEvent : null];
  return (
    <section className="v2-track" data-v2-theme="night" aria-labelledby="v2-journey-title">
      <TrackScene className="v2-track-stage">
        <div className="v2-track-ground" aria-hidden="true">
          <span className="v2-track-layer v2-track-layer--sand" />
          <span className="v2-track-layer v2-track-layer--paper" />
        </div>
        <ThreadField seed={45} count={11} drift={0} className="v2-track-threads" />
        <div className="v2-track-row">
          <div className="v2-track-group v2-track-group--night" data-v2-track-group="" data-v2-theme="night">
            <ThreadField seed={46} count={9} className="v2-track-group-threads" />
            <Item id="intro" className="v2-track-intro">
              <h2 id="v2-journey-title" className="v2-label">
                {journey.eyebrow}
              </h2>
              <p className="v2-track-lede">{typeof journey.lede === "string" ? journey.lede : journey.lede ? <ParaText para={journey.lede} /> : null}</p>
            </Item>
            <Entry id="2017" />
            <Item id="portrait" as="figure" className="v2-track-photo v2-track-portrait">
              <CaptionLabel as="figcaption" parts={[portrait.caption]} small />
              <FieldPortrait portrait={portrait} sizes="(min-width: 1024px) 14vw, (min-width: 768px) 26vw, 56vw" decorative />
            </Item>
            <Entry id="2018" />
            <Website id="imet" index={1} />
          </div>
          <div className="v2-track-group v2-track-group--light" data-v2-track-group="" data-v2-theme="paper">
            <ThreadField seed={47} count={9} className="v2-track-group-threads" />
            <Entry id="2019" />
            <Item id="quote" as="figure" className="v2-track-quote">
              <blockquote>
                <p className="v2-track-quote-text">
                  <q className="v2-quote">{quote.text}</q>
                </p>
              </blockquote>
              <ThreadDraw variant="underline" shape="line" trigger="manual" tone="vermilion" className="v2-track-quote-mark" />
              <figcaption className="v2-label">{quote.attribution}</figcaption>
            </Item>
            <Item id="podium" as="figure" className="v2-track-photo v2-track-podium">
              <CaptionLabel as="figcaption" parts={podiumCaption} small />
              <div className="v2-track-frame v2-track-frame--square">
                <Image src={podium.src} alt={podium.alt} width={podium.width} height={podium.height} sizes="(min-width: 1024px) 28vw, (min-width: 768px) 42vw, 80vw" />
                <Image className="v2-photo-grey" src={podium.src} alt="" width={podium.width} height={podium.height} sizes="(min-width: 1024px) 28vw, (min-width: 768px) 42vw, 80vw" />
              </div>
            </Item>
            {hasDirector ? <Entry id="2024" /> : null}
            <Entry id="now" />
            <Website id="dn" index={0} />
            <Item id="end" className="v2-track-end">
              <PillButton href={toV2(journey.link.href)} size="large">
                {journey.link.label}
              </PillButton>
            </Item>
          </div>
        </div>
      </TrackScene>
    </section>
  );
}
