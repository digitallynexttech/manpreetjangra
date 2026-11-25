import type { Metadata } from "next";
import { Colophon } from "@/components/v4/Colophon";
import { Masthead } from "@/components/v4/Masthead";
import "./v4.css";

// The Broadsheet edition (plan/versions-spec.md 3, V4): the profile set as a
// feature in a print weekly. Its own chrome around the /v4 pages: the
// masthead (ears, nameplate, double rule), the sticky section bar, the main
// landmark the skip link targets, and the colophon footer. One paper sheet
// on a sand desk. The root layout still gives fonts, metadata, the skip
// link and JSON-LD.
//
// /v4 is an alternative edition of the same content, so it is kept out of
// search results (each page's canonical link names its /v1 page, through
// v4Metadata) and out of the sitemap. No animation library: the motion is
// CSS scroll-driven animation (v4.css) plus one small scroll handler per
// frame-sequence figure.

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function V4Layout({ children }: LayoutProps<"/v4">) {
  return (
    <div className="v4">
      <div className="v4-sheet">
        <Masthead />
        <main id="site-content" tabIndex={-1} className="v4-main">
          {children}
        </main>
        <Colophon />
      </div>
    </div>
  );
}
