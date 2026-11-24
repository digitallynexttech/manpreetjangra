import { EnquiryForm } from "@/components/EnquiryForm";
import { LocalTime } from "@/components/LocalTime";
import { PageIntro } from "@/components/PageIntro";
import PageTransition from "@/components/PageTransition";
import { titleId } from "@/components/SectionHead";
import { SocialLinks } from "@/components/SocialLinks";
import { details, enquiryTypes, form, intro, meta, office } from "@/content/contact";
import { introImages } from "@/content/images";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(meta);

// The Contact page (spec 4.6), in the first person. Surfaces: intro (paper),
// then the form and the details column (paper), then the night footer. The
// form prepares an email in the visitor's own email app; nothing is sent from
// the site. It receives only plain strings and final addresses (resolved in
// src/content/contact.ts), so no placeholder reaches the browser. The page
// stays static: "?type=" is read by the form after it loads.

const ENQUIRY_ID = "enquiry";

export default function Contact() {
  const [before, after] = details.careers.text.text.split(details.careers.email);
  return (
    <PageTransition>
      <PageIntro
        eyebrow={intro.eyebrow}
        title={intro.title}
        accent={intro.accent}
        lede={intro.lede}
        image={introImages.contact}
      />

      <section id={ENQUIRY_ID} aria-labelledby={titleId(ENQUIRY_ID)} className="site-section">
        <div className="site-wrap site-grid">
          <div className="lg:col-span-7">
            <EnquiryForm
              types={enquiryTypes.map(({ key, label, recipient }) => ({ key, label, recipient }))}
              copy={form}
              headingId={titleId(ENQUIRY_ID)}
            />
          </div>

          {/* Details: the column stays in view on desktop beside the form. */}
          <div className="site-contact-details mt-16 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <div className="site-contact-block" data-reveal>
              <h3 className="text-h4">{details.elsewhere.title}</h3>
              <SocialLinks showHandles className="site-contact-social" />
            </div>
            <div className="site-contact-block" data-reveal>
              <h3 className="text-h4">{office.title}</h3>
              <address className="not-italic">
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <div className="site-contact-block" data-reveal>
              <h3 className="text-h4">{details.localTime.title}</h3>
              <p className="site-tabular">
                <LocalTime prefix={details.localTime.prefix} />
              </p>
            </div>
            <div className="site-contact-block" data-reveal>
              <h3 className="text-h4">{details.careers.title}</h3>
              <p>
                {before}
                <a className="site-inline-link" href={`mailto:${details.careers.email}`}>
                  {details.careers.email}
                </a>
                {after}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
