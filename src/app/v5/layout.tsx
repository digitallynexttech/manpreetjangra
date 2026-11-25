import type { Metadata } from "next";
import { Dock } from "@/components/v5/Dock";
import { MotionRoot } from "@/components/v5/MotionRoot";
import { V5Footer } from "@/components/v5/V5Footer";
import { THEME_KEY, V5_BASE, labels, v5Nav } from "@/content/v5";
import "./v5.css";

// The "Studio" edition (plan/versions-spec.md 3, V5): bento tiles on sand,
// a floating dock at the bottom, a footer tile, and a light and a dark
// theme. The root layout still gives the fonts, metadata, the skip link and
// JSON-LD; this layout adds the edition's wrapper and chrome around its six
// pages. /v5 is another edition of the same content: kept out of search
// results (every page's canonical link names its /v1 page) and out of the
// sitemap.

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

// Applies a stored dark theme before the first paint, so a visitor who chose
// it never sees a light flash. It only reads localStorage (inside try/catch)
// and sets one attribute on the wrapper it sits in; light is the default.
const THEME_SCRIPT = `try{if(localStorage.getItem(${JSON.stringify(THEME_KEY)})==="dark")document.currentScript.parentElement.setAttribute("data-theme","dark")}catch(e){}`;

export default function V5Layout({ children }: LayoutProps<"/v5">) {
  return (
    // The inline script may change data-theme before React hydrates.
    <div className="v5" data-theme="light" suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      <MotionRoot>
        <Dock
          items={v5Nav}
          home={V5_BASE}
          allEditions={{ label: labels.allEditions, href: "/" }}
          themeKey={THEME_KEY}
          labels={{ dock: labels.dock, darkTheme: labels.darkTheme }}
        />
        <main id="site-content" tabIndex={-1} className="v5-main">
          {children}
        </main>
        <V5Footer />
      </MotionRoot>
    </div>
  );
}
