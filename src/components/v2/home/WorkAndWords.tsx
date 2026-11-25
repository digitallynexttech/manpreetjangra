import Image from "next/image";
import { ParaText } from "@/components/ParaText";
import { lead } from "@/content/home";
import { podium } from "@/content/images";
import { isConfirmed } from "@/content/types";
import { labels, toV2 } from "@/content/v2";
import { meta as workMeta } from "@/content/work";
import { meta as writingMeta, stage } from "@/content/writing";
import { CaptionLabel } from "../CaptionLabel";
import { MixedHeading } from "../MixedHeading";
import { RoundArrowButton } from "../RoundArrowButton";
import { ThreadField } from "../ThreadField";
import { PodiumScene } from "./HomeScenes";

// 4.1 item 5, Lando's "ON TRACK / OFF TRACK": two giant two-line words side
// by side on paper, THE (serif) over WORK (sans) and HER over WORDS, each
// with one line of existing copy and a square arrow button. Hovering a block
// (or focusing its button) draws a vermilion ring around the serif word.
// Then the podium photograph opens from an inset window to the full screen.

export function WorkAndWords() {
  const blocks = [
    {
      id: "v2-split-work",
      parts: labels.theWork,
      lede: lead.lede,
      href: toV2("/work"),
      // The buttons have no visible text: they name their pages.
      label: workMeta.title,
    },
    {
      id: "v2-split-words",
      parts: labels.herWords,
      lede: writingMeta.description,
      href: toV2("/writing"),
      label: writingMeta.title,
    },
  ] as const;
  return (
    <section className="v2-surface v2-split" data-v2-theme="paper" aria-labelledby={blocks.map((block) => block.id).join(" ")}>
      <ThreadField seed={58} count={12} />
      <div className="v2-wrap v2-split-grid">
        {blocks.map((block, index) => (
          <div key={block.id} className={`v2-split-block v2-draw-host${index === 0 ? " v2-split-block--end" : ""}`}>
            <MixedHeading
              id={block.id}
              size="display"
              stack
              parts={[
                { text: block.parts.serif, voice: "serif", plain: true, mark: "circle", markTrigger: "hover" },
                { text: block.parts.sans, voice: "sans" },
              ]}
            />
            <p className="v2-split-lede">{typeof block.lede === "string" ? block.lede : block.lede ? <ParaText para={block.lede} /> : null}</p>
            <RoundArrowButton href={block.href} label={block.label} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function PodiumStage() {
  const caption = [stage.eyebrow, isConfirmed(stage.photoEvent) ? stage.photoEvent : stage.title];
  return (
    // Paper around the frame while it is still a window, night inside it:
    // the header reads whichever of the two is under it.
    <section className="v2-podium" data-v2-theme="paper" aria-labelledby="v2-podium-title">
      <PodiumScene className="v2-podium-stage">
        <figure className="v2-podium-frame" data-v2-theme="night">
          <div className="v2-podium-backdrop" aria-hidden="true">
            <Image src={podium.src} alt="" width={podium.width} height={podium.height} sizes="40vw" />
          </div>
          <div className="v2-podium-photo">
            <Image src={podium.src} alt={podium.alt} width={podium.width} height={podium.height} sizes="(min-width: 1024px) 400px, 80vw" />
          </div>
          <figcaption className="v2-podium-caption">
            <CaptionLabel as="h2" id="v2-podium-title" parts={caption} />
          </figcaption>
        </figure>
      </PodiumScene>
    </section>
  );
}
