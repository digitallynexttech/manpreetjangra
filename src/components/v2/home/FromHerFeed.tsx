import type { CSSProperties } from "react";
import Image from "next/image";
import type { QuoteId } from "@/content/quotes";
import { socialLinks } from "@/content/navigation";
import { labels } from "@/content/v2";
import { themes } from "@/content/writing";
import { quoteView } from "@/lib/views";
import { FooterFrom } from "../FooterFrom";
import { MixedHeading } from "../MixedHeading";
import { FanScene } from "./HomeScenes";

// 4.1 item 9, Lando's "What's up on socials": seven tall rounded cards with
// her lines from LinkedIn and Instagram (source and date in mono, a link to
// the post), opening from a stack into a fan as the row scrolls in on
// desktop, a sideways row on phones and tablets. Under it, "Follow Manpreet"
// and her two profiles. The paper here fades into marigold, where the footer
// card sits.

/** Left to right. Each card lies over the one on its left (a spread deck),
 *  so every card's left edge, where its left-aligned text starts, shows. */
const FEED: readonly QuoteId[] = [
  "language",
  "reel-babysit",
  "video-smarter",
  "interns-mentor",
  "reel-vendors",
  "interns-labels",
  "video-audience",
];

/** A picture behind each card: the post's own image where there is one (the
 *  reel cover, the interns' photos), else a still life in the site palette
 *  for the LinkedIn posts. The left side, where the text sits, is blurred and
 *  tinted with the card's ground; the picture shows sharp on the right.
 *  `position` is the object-position that keeps the subject in view. The
 *  intern photos need the consent of everyone pictured before launch
 *  (CONTENT-REVIEW, F213). */
const PHOTOS: Partial<Record<QuoteId, { src: string; position: string }>> = {
  language: { src: "/images/feed/still-language.webp", position: "85% 50%" },
  "reel-babysit": { src: "/images/feed/reel-why-brands-drop-agencies-2025-05-28.webp", position: "50% 30%" },
  "video-smarter": { src: "/images/feed/still-smarter.webp", position: "85% 50%" },
  "interns-mentor": { src: "/images/feed/interns-2025-06-29-a.webp", position: "35% 40%" },
  "reel-vendors": { src: "/images/feed/reel-why-brands-drop-agencies-2025-05-28.webp", position: "50% 30%" },
  "interns-labels": { src: "/images/feed/interns-2025-06-29-b.webp", position: "35% 40%" },
  "video-audience": { src: "/images/feed/still-audience.webp", position: "85% 50%" },
};

/** Card grounds, left to right (night cards read on-night text). */
const GROUNDS = ["blush", "raised", "sand", "night", "sand", "raised", "blush"] as const;

export function FromHerFeed() {
  const middle = (FEED.length - 1) / 2;
  return (
    <section className="v2-surface v2-feed" data-v2-theme="paper" aria-labelledby="v2-feed-title">
      <FooterFrom tone="marigold" />
      <div className="v2-wrap v2-feed-inner">
        <MixedHeading
          id="v2-feed-title"
          size="display"
          align="center"
          stack
          parts={[
            { text: labels.fromHerFeed.sans, voice: "sans" },
            { text: labels.fromHerFeed.serif, voice: "serif" },
          ]}
          className="v2-feed-title"
        />
      </div>
      <FanScene className="v2-fan-wrap">
        <ul className="v2-fan">
          {FEED.map((id, index) => {
            const quote = quoteView(id);
            const k = index - middle;
            const ground = GROUNDS[index % GROUNDS.length];
            const dark = ground === "night" || ground === "raised";
            const photo = PHOTOS[id];
            return (
              <li
                key={id}
                className={`v2-fan-card v2-fan-card--${ground}${quote.text.length < 70 ? " v2-fan-card--short" : ""}${photo ? " v2-fan-card--photo" : ""}`}
                data-v2-theme={dark ? "night" : "paper"}
                style={{ "--k": k, "--k2": k * k, "--z": index } as CSSProperties}
              >
                {photo ? (
                  <div className="v2-fan-photo" aria-hidden="true" style={{ "--pos": photo.position } as CSSProperties}>
                    <Image src={photo.src} alt="" fill sizes="(min-width: 90rem) 240px, 300px" />
                    <Image src={photo.src} alt="" fill sizes="(min-width: 90rem) 240px, 300px" className="v2-fan-photo-blur" />
                  </div>
                ) : null}
                <figure className="v2-fan-figure">
                  <blockquote>
                    <p className="v2-fan-quote">
                      <q className="v2-quote">{quote.text}</q>
                    </p>
                  </blockquote>
                  <figcaption className="v2-fan-meta v2-label">
                    {quote.attribution}
                    {quote.href ? (
                      <a className="v2-fan-link" href={quote.href} target="_blank" rel="noopener noreferrer">
                        {themes.linkLabel}
                        <span className="v2-sr-only">{labels.newTab}</span>
                      </a>
                    ) : null}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </FanScene>
      <div className="v2-wrap v2-feed-follow">
        <p className="v2-feed-follow-line">{labels.followManpreet}</p>
        <ul className="v2-feed-links">
          {socialLinks.map((link) => (
            <li key={link.key}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
                <span className="v2-sr-only">{labels.newTab}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
