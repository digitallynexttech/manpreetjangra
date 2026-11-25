import Link from "next/link";
import { LocalTime } from "@/components/LocalTime";
import { socialLinks } from "@/content/navigation";
import { contactBand, footer } from "@/content/shared";
import { labels, toV4, v4Nav } from "@/content/v4";
import { SEQUENCES, footageProviders } from "@/lib/sequences";
import { HiddenOn } from "./HiddenOn";
import { lede } from "./lede";

// The foot of every /v4 page (plan/versions-spec.md, V4 home): the contact
// band set as the paper's last notice, then the colophon: nameplate and
// role, the pages, her profiles, the typefaces, the footage credit, the way
// back to the editions index, and the copyright line.

/** The frame sequences this edition draws (home cover and chapter divider). */
export const V4_SEQUENCES = [SEQUENCES["thread-spool"], SEQUENCES.marigold] as const;

/** The classic credit line, without its sentence on the generated textures:
 *  /v4 shows none of them (its only pictures are the portrait, the podium
 *  photograph and the stock footage credited beside it). */
function creditLine(): string {
  // Evaluated when the page is built, as on the classic footer.
  const text = footer.credit.text.replace("{year}", String(new Date().getFullYear()));
  return text
    .split(/(?<=\.)\s+/)
    .filter((sentence) => !/textures/i.test(sentence))
    .join(" ");
}

export function Colophon() {
  const providers = footageProviders(V4_SEQUENCES).join(", ");
  return (
    <footer className="v4-colophon">
      <HiddenOn path={toV4(contactBand.primary.href)}>
        <section className="v4-notice" aria-labelledby="v4-notice-title">
          <div className="v4-wrap v4-notice-inner">
            <p className="v4-kicker">{contactBand.eyebrow}</p>
            <h2 id="v4-notice-title" className="v4-notice-title">
              {contactBand.title}
            </h2>
            <p className="v4-notice-lede">{lede(contactBand.lede)}</p>
            <div className="v4-notice-actions">
              <Link className="v4-button" href={toV4(contactBand.primary.href)}>
                {contactBand.primary.label}
                <span className="v4-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <a className="v4-link" href={contactBand.secondary.href} target="_blank" rel="noopener noreferrer">
                {contactBand.secondary.label}
                <span className="v4-sr-only">{labels.newTab}</span>
              </a>
            </div>
          </div>
        </section>
      </HiddenOn>
      <div className="v4-wrap">
        <span className="v4-double-rule" aria-hidden="true" />
        <div className="v4-colophon-grid">
          <div className="v4-colophon-id">
            <p className="v4-colophon-name">{footer.wordmark}</p>
            <p className="v4-colophon-role">{footer.role.text}</p>
            <p className="v4-colophon-time">
              <LocalTime prefix={footer.place.prefix} />
            </p>
          </div>
          <nav className="v4-colophon-col v4-colophon-pages" aria-labelledby="v4-colophon-pages">
            <h2 id="v4-colophon-pages" className="v4-colophon-head">
              {labels.pages}
            </h2>
            <ul>
              {v4Nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="v4-colophon-col">
            <h2 className="v4-colophon-head">{labels.elsewhere}</h2>
            <ul>
              {socialLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <span className="v4-sr-only">{labels.newTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="v4-colophon-col v4-colophon-col--wide">
            <h2 className="v4-colophon-head">{labels.colophon}</h2>
            <p>{labels.setIn}</p>
            <p>
              {labels.footage}: {providers}
            </p>
            <p>
              <Link className="v4-colophon-editions" href="/">
                {labels.allEditions}
                <span className="v4-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </p>
          </div>
        </div>
        <p className="v4-colophon-credit">{creditLine()}</p>
      </div>
    </footer>
  );
}
