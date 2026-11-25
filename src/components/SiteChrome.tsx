import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LocalTime } from "./LocalTime";
import { Motion } from "./Motion";
import { SocialLinks } from "./SocialLinks";
import { headerCta, homeNav, navigation } from "@/content/navigation";
import type { NavItem } from "@/content/types";
import { footer } from "@/content/shared";
import { withBase } from "@/lib/versions";

// The chrome of the classic site: the `.site` wrapper, the header, the main
// landmark, the footer and the scroll-reveal script. It used to sit in the
// root layout; it moved here when the pages moved into the (site) route group
// (plan/v2-spec.md 3.1), so the classic pages (now through v1/layout.tsx) and
// the 404 (src/app/not-found.tsx, which gets only the root layout) render it
// the same way, and /v2 can have chrome of its own. The skip link and the
// JSON-LD stay in the root layout. A server component.
//
// `base` is the address prefix of the edition ("/v1", plan/versions-spec.md
// 2.1): every header and footer link gets it. The default "" keeps the
// classic addresses.
export function SiteChrome({ children, base = "" }: { children: ReactNode; base?: string }) {
  const inBase = (item: NavItem): NavItem => ({ label: item.label, href: withBase(item.href, base) });
  return (
    <div className="site">
      {/* The layout is a server component: it hands the links to the
          client Header as props (spec 7.5), and the foot of the phone
          sheet (her profiles and the time in New Delhi, as in the
          footer) as rendered elements. */}
      <Header
        home={inBase(homeNav)}
        nav={navigation.map(inBase)}
        cta={inBase(headerCta)}
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
      <Footer base={base} />
      <Motion />
    </div>
  );
}
