import { AtSign, Building2, Mail, MessageSquare, UsersRound } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { LocalTime } from "@/components/LocalTime";
import { Chip } from "@/components/v5/Chip";
import { PageHeader } from "@/components/v5/PageHeader";
import { SocialList } from "@/components/v5/SocialList";
import { Tile } from "@/components/v5/Tile";
import { details, enquiryTypes, form, intro, meta, office } from "@/content/contact";
import { v5Metadata } from "@/lib/v5";

export const metadata = v5Metadata(meta);

// /v5/contact (plan/versions-spec.md, V5 "Inner pages", Contact): the bento
// header with the live New Delhi time as its accent tile, then the enquiry
// form in a large tile with the detail tiles beside it (her profiles, the
// office, careers). The form is v1's EnquiryForm, unchanged: it prepares an
// email draft in the visitor's own email app (nothing is sent from the
// site), switches the recipient by enquiry type, preselects the type from
// "?type=" after the page loads, and copies the draft. It receives only
// plain strings and final addresses (resolved in src/content/contact.ts), so
// no placeholder reaches the browser; /v5.css restyles it inside the tile.

const ENQUIRY_ID = "v5-enquiry-title";

export default function V5Contact() {
  const [before, after] = details.careers.text.text.split(details.careers.email);
  return (
    <>
      <PageHeader
        icon={<MessageSquare size={14} strokeWidth={2} aria-hidden="true" />}
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
      >
        <Tile tone="marigold" intro={2} tileClassName="v5-now-tile">
          <Chip dot>{details.localTime.title}</Chip>
          <p className="v5-now-time">
            <LocalTime />
          </p>
          <div className="v5-now-meta">
            <p className="v5-now-place">{details.localTime.prefix}</p>
          </div>
        </Tile>
      </PageHeader>

      <section id="enquiry" className="v5-block" aria-labelledby={ENQUIRY_ID}>
        <div className="v5-wrap">
          <div className="v5-bento v5-bento--contactform">
            <Tile w={2} h={2} mdW={2} mdH={1} tone="paper" tilt={false} tileClassName="v5-form-tile">
              <span className="v5-form-badge" aria-hidden="true">
                <Mail size={22} strokeWidth={1.75} />
              </span>
              <EnquiryForm
                types={enquiryTypes.map(({ key, label, recipient }) => ({ key, label, recipient }))}
                copy={form}
                headingId={ENQUIRY_ID}
              />
            </Tile>

            <Tile w={2} tone="blush" tileClassName="v5-detail-tile v5-social-tile">
              <h3 className="v5-chip">
                <AtSign size={14} strokeWidth={2} aria-hidden="true" />
                <span>{details.elsewhere.title}</span>
              </h3>
              <SocialList />
            </Tile>

            <Tile tone="paper" tileClassName="v5-detail-tile v5-office-tile">
              <span className="v5-link-icon" aria-hidden="true">
                <Building2 size={22} strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="v5-office-title">{office.title}</h3>
                <address className="v5-office">
                  {office.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </div>
            </Tile>

            <Tile tone="night" tileClassName="v5-detail-tile v5-careers-detail">
              <span className="v5-link-icon" aria-hidden="true">
                <UsersRound size={22} strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="v5-office-title">{details.careers.title}</h3>
                <p className="v5-careers-text">
                  {before}
                  <a className="v5-mail" href={`mailto:${details.careers.email}`}>
                    {details.careers.email}
                  </a>
                  {after}
                </p>
              </div>
            </Tile>
          </div>
        </div>
      </section>
    </>
  );
}
