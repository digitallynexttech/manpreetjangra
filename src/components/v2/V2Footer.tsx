import Link from "next/link";
import { LocalTime } from "@/components/LocalTime";
import { hero } from "@/content/home";
import { portrait } from "@/content/images";
import { socialLinks } from "@/content/navigation";
import { contactBand, footer } from "@/content/shared";
import { labels, toV2, v2Nav } from "@/content/v2";
import { ventures } from "@/content/work";
import { ClassicLink } from "./ClassicLink";
import { FieldPortrait } from "./FieldPortrait";
import { Marquee } from "./Marquee";
import { MixedHeading } from "./MixedHeading";
import { PillButton } from "./PillButton";
import { ThreadDraw } from "./ThreadDraw";
import { V2FooterStage } from "./V2FooterStage";
import { mixParts } from "./parts";

// The end of every /v2 page (spec 4.1 item 10, Lando's "ALWAYS BRINGING THE
// FIGHT." card). The page fades from its last surface (`--v2-footer-from`,
// paper by default) into marigold; on it sits a night card with a tab at its
// top centre: the contact heading in both voices with a marigold thread
// drawn over it, the portrait on its vermilion field rising from the bottom
// edge, a Pages column and a Follow on column, a strip of the group's names,
// and the "Start a conversation" pill. Under the card, on marigold: the
// credit line, the time in New Delhi and the way back to the classic site.

export function V2Footer() {
  // Evaluated when the page is built, as on the classic footer.
  const credit = footer.credit.text.replace("{year}", String(new Date().getFullYear()));
  return (
    <footer className="v2-footer" data-v2-theme="paper">
      <div className="v2-footer-card" data-v2-theme="night">
        <svg className="v2-footer-tab" viewBox="0 0 320 30" aria-hidden="true" focusable="false">
          <path d="M0 30 C 44 30 52 2 92 2 L 228 2 C 268 2 276 30 320 30 Z" fill="currentColor" />
        </svg>
        <div className="v2-footer-head">
          <ThreadDraw variant="loop" className="v2-footer-flourish" start="top 95%" end="top 35%" />
          <MixedHeading
            id="v2-footer-title"
            parts={mixParts(contactBand.title, ["conversation."])}
            size="title"
            align="center"
          />
        </div>
        <div className="v2-footer-grid">
          <nav className="v2-footer-col" aria-labelledby="v2-footer-pages">
            <h2 id="v2-footer-pages" className="v2-label">
              {labels.pages}
            </h2>
            <ul>
              {v2Nav.map((item) => (
                <li key={item.href}>
                  <Link className="v2-footer-link" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <V2FooterStage>
            <FieldPortrait portrait={portrait} sizes="(min-width: 1024px) 26vw, 260px" decorative />
          </V2FooterStage>
          <div className="v2-footer-col">
            <h2 className="v2-label">{labels.followOn}</h2>
            <ul>
              {socialLinks.map((link) => (
                <li key={link.key}>
                  <a className="v2-footer-link" href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <span className="v2-sr-only">{labels.newTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Marquee
          className="v2-footer-marquee"
          itemClassName="v2-sans"
          label={labels.group}
          items={ventures.map((venture) => venture.name)}
        />
        <div className="v2-footer-cta">
          <PillButton href={toV2(hero.primary.href)} size="large">
            {hero.primary.label}
          </PillButton>
        </div>
      </div>
      <div className="v2-footer-bar v2-label">
        <p className="v2-footer-credit">{credit}</p>
        <p>
          <LocalTime prefix={footer.place.prefix} />
        </p>
        <ClassicLink>{labels.classicSite}</ClassicLink>
      </div>
    </footer>
  );
}
