import type { Viewport } from "next";
import PageTransition from "@/components/PageTransition";
import { ContactEnquiry, ContactHero } from "@/components/v2/contact/ContactSections";
import { meta } from "@/content/contact";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(meta);
// The page opens on night, so the browser bar does too.
export const viewport: Viewport = { themeColor: "#1C1816", colorScheme: "light" };

// /contact (plan/v2-spec.md 4.2, 4.7), in her first person. The page
// title GET IN TOUCH with the office address and the intro (night), then
// the classic enquiry form in v2 dress beside her profiles, the office, the
// time in New Delhi and the careers address (paper); the footer card comes
// from the layout. The page stays static: "?type=" is read by the form
// after it loads. All copy comes from src/content/contact.ts.

export default function ContactPage() {
  return (
    <PageTransition>
      <ContactHero />
      <ContactEnquiry />
    </PageTransition>
  );
}
