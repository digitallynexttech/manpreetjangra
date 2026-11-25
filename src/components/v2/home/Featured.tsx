import Image from "next/image";
import { ParaText } from "@/components/ParaText";
import { hero, words } from "@/content/home";
import { zari } from "@/content/images";
import { featured } from "@/content/writing";
import { quoteView } from "@/lib/views";
import { MixedHeading } from "../MixedHeading";
import { ParallaxGroup } from "../ParallaxGroup";
import { PillButton } from "../PillButton";
import { mixParts } from "../parts";

// 4.1 item 7, Lando's store promo: the night above ends in a curved edge,
// then on paper "FEATURED IN" (sans) + "WOMEN ENTREPRENEURS REVIEW" (serif)
// from her credential line, the feature's short intro and byline, and the
// "Read the feature" pill; on the right a collage of two of her lines from
// the feature (a paper card and a blush card) over the corners of the zari
// texture, drifting at different speeds (the front card fastest).

export function Featured() {
  // "Featured in Women Entrepreneurs Review, 2026", as the hero credential says it.
  const title = hero.credential.split(" · ").find((part) => part.includes(featured.outlet)) ?? featured.outlet;
  // The serif voice runs from the outlet's name to the end (", 2026"
  // stays with it, so no space ever falls before the comma).
  const serif = title.slice(Math.max(0, title.indexOf(featured.outlet)));
  const [first, second] = words.quotes.map((id) => quoteView(id));
  return (
    <section className="v2-surface v2-feature" data-v2-theme="paper" aria-labelledby="v2-feature-title">
      {/* The night above ends in a curve; the header reads it as night. */}
      <svg className="v2-curve" data-v2-theme="night" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 0 H1440 V18 C 1120 118 320 118 0 18 Z" />
      </svg>
      <div className="v2-wrap v2-feature-grid">
        <div className="v2-feature-text">
          <MixedHeading id="v2-feature-title" size="title" parts={mixParts(title, [serif])} className="v2-feature-title" />
          <p className="v2-body v2-feature-lede">{typeof words.lede === "string" ? words.lede : words.lede ? <ParaText para={words.lede} /> : null}</p>
          <p className="v2-label">{featured.byline}</p>
          <PillButton href={featured.link.href}>{featured.link.label}</PillButton>
        </div>
        <ParallaxGroup className="v2-feature-collage" small={0.35}>
          <div className="v2-feature-zari" data-v2-speed="0.15" aria-hidden="true">
            <Image src={zari.src} alt="" width={zari.width} height={zari.height} sizes="(min-width: 1024px) 62vw, 120vw" />
          </div>
          {[first, second].map((quote, index) =>
            quote ? (
              <figure key={index} className={`v2-feature-card v2-feature-card--${index === 0 ? "paper" : "blush"}`} data-v2-speed={index === 0 ? "0.45" : "0.25"}>
                <blockquote>
                  <p className="v2-feature-quote">
                    <q className="v2-quote">{quote.text}</q>
                  </p>
                </blockquote>
                <figcaption className="v2-label">{quote.attribution}</figcaption>
              </figure>
            ) : null,
          )}
        </ParallaxGroup>
      </div>
    </section>
  );
}
