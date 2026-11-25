import { EnquiryForm } from "@/components/EnquiryForm";
import { LocalTime } from "@/components/LocalTime";
import { ExternalLink, TitleScene } from "@/components/v3/Inner";
import { Rise } from "@/components/v3/Reels";
import { ScrollRefresh } from "@/components/v3/Scenes";
import { details, enquiryTypes, form, intro, meta, office } from "@/content/contact";
import { socialLinks } from "@/content/navigation";
import { toV3 } from "@/content/v3";
import { TITLE_FOOTAGE, v3Metadata } from "@/lib/v3";

export const metadata = v3Metadata(meta);

// /v3/contact (plan/versions-spec.md 3, V3 Inner pages: "Contact:
// EnquiryForm on night-raised with on-night styling"), in the first person.
// A short title scene (bronze silk), then v1's EnquiryForm, unchanged in
// behaviour (it prepares an email in the visitor's own email app, switches
// the recipient by enquiry type, reads "?type=" after load, copies the
// draft), on a night-raised panel, beside the details: her profiles, the
// office, the time in New Delhi and where applications go. The form gets
// only plain strings and final addresses (resolved in content/contact.ts),
// so no placeholder reaches the browser. All copy comes from
// src/content/contact.ts and navigation.ts.

const HREF = toV3("/contact");
const ENQUIRY_ID = "enquiry";

export default function V3Contact() {
  const [before, after] = details.careers.text.text.split(details.careers.email);
  return (
    <>
      <TitleScene
        href={HREF}
        sequence={TITLE_FOOTAGE.contact}
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        short
        focusY={0.55}
      />

      <section id={ENQUIRY_ID} className="v3-section v3-contact" aria-labelledby={`${ENQUIRY_ID}-title`}>
        <Rise className="v3-contact-grid">
          <div className="v3-form-panel" data-v3-in>
            <EnquiryForm
              types={enquiryTypes.map(({ key, label, recipient }) => ({ key, label, recipient }))}
              copy={form}
              headingId={`${ENQUIRY_ID}-title`}
            />
          </div>

          <div className="v3-details">
            <div className="v3-detail" data-v3-in>
              <h3 className="v3-detail-title">{details.elsewhere.title}</h3>
              <ul className="v3-detail-links">
                {socialLinks.map((link) => (
                  <li key={link.key}>
                    <ExternalLink href={link.href} className="v3-detail-link">
                      <span className="v3-detail-link-text">
                        {link.label}
                        <span className="v3-detail-handle">{link.handle}</span>
                      </span>
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="v3-detail" data-v3-in>
              <h3 className="v3-detail-title">{office.title}</h3>
              <address className="v3-detail-address">
                {office.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>
            <div className="v3-detail" data-v3-in>
              <h3 className="v3-detail-title">{details.localTime.title}</h3>
              <p className="v3-detail-time">
                <LocalTime prefix={details.localTime.prefix} />
              </p>
            </div>
            <div className="v3-detail" data-v3-in>
              <h3 className="v3-detail-title">{details.careers.title}</h3>
              <p className="v3-detail-text">
                {before}
                <a className="v3-inline-link" href={`mailto:${details.careers.email}`}>
                  {details.careers.email}
                </a>
                {after}
              </p>
            </div>
          </div>
        </Rise>
      </section>

      <ScrollRefresh />
    </>
  );
}
