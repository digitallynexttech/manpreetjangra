import { EnquiryForm } from "@/components/EnquiryForm";
import { LocalTime } from "@/components/LocalTime";
import { SectionFront } from "@/components/v4/SectionFront";
import { details, enquiryTypes, form, intro, meta, office } from "@/content/contact";
import { socialLinks } from "@/content/navigation";
import { labels } from "@/content/v4";
import { v4Metadata } from "@/lib/v4";
import "../inner.css";
import "./contact.css";

export const metadata = v4Metadata(meta);

// Contact, section F of the Broadsheet (plan/versions-spec.md, V4 inner
// pages: "the form styled as a 'Letters to the editor' panel (label), plus
// the office address block"). The section front, then the classic
// EnquiryForm in a boxed panel, its behaviour unchanged (an email draft in
// the visitor's own email app, the recipient chosen by the enquiry type,
// "?type=" preselecting it, the copy button), and beside it the details
// column: her profiles, the office address, the time in New Delhi and
// where applications go. The form receives only plain strings and final
// addresses (src/content/contact.ts), so no placeholder reaches the
// browser. No contact band in the colophon here: this is where it points.

const ENQUIRY_ID = "enquiry";

export default function V4Contact() {
  const [before, after] = details.careers.text.text.split(details.careers.email);
  return (
    <div className="v4-inner v4-contact">
      <SectionFront
        id="v4-contact-title"
        letter={labels.sectionLetters.contact}
        flag={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
      />

      <section id={ENQUIRY_ID} className="v4-section v4-wrap v4-letters-section" aria-labelledby={`${ENQUIRY_ID}-title`}>
        <div className="v4-letters-grid">
          <div className="v4-panel v4-letters">
            <div className="v4-panel-bar v4-panel-bar--single">
              <p className="v4-panel-label">{labels.letters}</p>
            </div>
            <div className="v4-letters-form">
              <EnquiryForm
                types={enquiryTypes.map(({ key, label, recipient }) => ({ key, label, recipient }))}
                copy={form}
                headingId={`${ENQUIRY_ID}-title`}
              />
            </div>
          </div>

          {/* Details: her profiles, the office, the time, applications. */}
          <div className="v4-details">
            <div className="v4-detail">
              <h3 className="v4-detail-title">{details.elsewhere.title}</h3>
              <ul className="v4-detail-links">
                {socialLinks.map((link) => (
                  <li key={link.key}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <span className="v4-detail-link-label">{link.label}</span>
                      <span className="v4-detail-link-handle">{link.handle}</span>
                      <span className="v4-sr-only">{labels.newTab}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="v4-detail v4-detail--office">
              <h3 className="v4-detail-title">{office.title}</h3>
              <address className="v4-address">
                {office.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>
            <div className="v4-detail">
              <h3 className="v4-detail-title">{details.localTime.title}</h3>
              <p className="v4-detail-time">
                <LocalTime prefix={details.localTime.prefix} />
              </p>
            </div>
            <div className="v4-detail">
              <h3 className="v4-detail-title">{details.careers.title}</h3>
              <p>
                {before}
                <a className="v4-link" href={`mailto:${details.careers.email}`}>
                  {details.careers.email}
                </a>
                {after}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
