import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LocalTime } from "./LocalTime";
import { Motion } from "./Motion";
import { SocialLinks } from "./SocialLinks";
import { headerCta, homeNav, navigation } from "@/content/navigation";
import { footer } from "@/content/shared";

// The chrome of the classic site: the `.site` wrapper, the header, the main
// landmark, the footer and the scroll-reveal script. It used to sit in the
// root layout; it moved here when the pages moved into the (site) route group
// (plan/v2-spec.md 3.1), so the classic pages (through (site)/layout.tsx) and
// the 404 (src/app/not-found.tsx, which gets only the root layout) render it
// the same way, and /v2 can have chrome of its own. The skip link and the
// JSON-LD stay in the root layout. A server component.
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="site">
      {/* The layout is a server component: it hands the links to the
          client Header as props (spec 7.5), and the foot of the phone
          sheet (her profiles and the time in New Delhi, as in the
          footer) as rendered elements. */}
      <Header
        home={homeNav}
        nav={navigation}
        cta={headerCta}
        sheetFoot={
          <>
            <SocialLinks />
            <p className="site-caption">
              <LocalTime prefix={footer.place.prefix} />
            </p>
          </>
        }
      />
      <main id="site-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <Motion />
    </div>
  );
}
