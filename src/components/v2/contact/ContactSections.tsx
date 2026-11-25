import { ArrowUpRight } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { LocalTime } from "@/components/LocalTime";
import { details, enquiryTypes, form, intro, office } from "@/content/contact";
import { hero } from "@/content/home";
import { contactBand } from "@/content/shared";
import { socialLinks } from "@/content/navigation";
import { labels } from "@/content/v2";
import { NotchCard } from "../NotchCard";
import { Reveal } from "../Reveal";
import { ThreadField } from "../ThreadField";
import { V2PageHero } from "../V2PageHero";
import { mixParts } from "../parts";

// The sections of /v2/contact (plan/v2-spec.md 4.2, 4.7), in her first
// person. The classic EnquiryForm does the work unchanged: it checks the
// fields, prepares the email in the visitor's own email app (nothing is sent
// from the site), sends each type to its own address, reads "?type=" after
// the page loads and copies the draft. Here it only wears the v2 type and
// controls (inner.css, scoped to .v2-enquiry). It receives plain strings and
// final addresses from src/content/contact.ts, so no placeholder reaches the
// browser.

const ENQUIRY_ID = "enquiry";
const ENQUIRY_TITLE_ID = "v2-enquiry-title";

/** 1. "GET IN TOUCH" on night (the classic contact band's own button) with
 *  the scribble under GET; the meta row is who you are writing to (the home
 *  eyebrow: her title, the agency, the city); the classic
 *  title, "Start a conversation.", sits over the lede (the footer card
 *  repeats it in full, so the page title says it another way). */
export function ContactHero() {
  const words = contactBand.primary.label;
  return (
    <V2PageHero
      id="v2-contact-title"
      theme="night"
      title={mixParts(words, [words.split(" ")[0]]).map((part) =>
        part.voice === "serif" ? { ...part, plain: true, mark: "underline" as const } : part,
      )}
      meta={hero.eyebrow.split(" · ")}
      ledeLabel={intro.title}
      lede={intro.lede}
      accent="marked for my attention."
      fitWide={0.921}
    />
  );
}

/** 2. The form on paper, and beside it (in view on desktop) the details:
 *  her two profiles, the office, the time in New Delhi set large, and where
 *  applications go. */
export function ContactEnquiry() {
  const [before, after] = details.careers.text.text.split(details.careers.email);
  return (
    <section id={ENQUIRY_ID} className="v2-surface v2-inner-section v2-contact" data-v2-theme="paper" aria-labelledby={ENQUIRY_TITLE_ID}>
      <ThreadField seed={191} count={9} />
      <div className="v2-wrap v2-contact-grid">
        <div className="v2-enquiry">
          <EnquiryForm
            types={enquiryTypes.map(({ key, label, recipient }) => ({ key, label, recipient }))}
            copy={form}
            headingId={ENQUIRY_TITLE_ID}
          />
        </div>

        <Reveal as="aside" className="v2-contact-details" items=".v2-contact-block" y={28}>
          <div className="v2-contact-block">
            <h3 className="v2-label">{details.elsewhere.title}</h3>
            <ul className="v2-contact-social">
              {socialLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <span className="v2-sans v2-contact-social-name">
                      {link.label}
                      <ArrowUpRight size={20} strokeWidth={2.25} aria-hidden="true" />
                    </span>
                    <span className="v2-label v2-contact-social-handle">{link.handle}</span>
                    <span className="v2-sr-only">{labels.newTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="v2-contact-block">
            <h3 className="v2-label">{office.title}</h3>
            <address className="v2-sans v2-contact-office">
              {office.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>
          <NotchCard corner="tr" className="v2-contact-block v2-contact-clock">
            <h3 className="v2-label">{details.localTime.title}</h3>
            <p className="v2-contact-time">
              <LocalTime prefix={details.localTime.prefix} />
            </p>
          </NotchCard>
          <div className="v2-contact-block">
            <h3 className="v2-label">{details.careers.title}</h3>
            <p className="v2-body">
              {before}
              <a className="v2-contact-inline" href={`mailto:${details.careers.email}`}>
                {details.careers.email}
              </a>
              {after}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
