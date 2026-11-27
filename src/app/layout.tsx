import type { Metadata, Viewport } from "next";
import { Newsreader, Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { FieldPortrait } from "@/components/v2/FieldPortrait";
import { SmoothScroll } from "@/components/v2/SmoothScroll";
import { V2Footer } from "@/components/v2/V2Footer";
import { V2Header } from "@/components/v2/V2Header";
import { hero } from "@/content/home";
import { podium, portrait, zari } from "@/content/images";
import { headerCta, socialLinks } from "@/content/navigation";
import { labels, siteNav, wordmark } from "@/content/v2";
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE, personJsonLd, websiteJsonLd } from "@/lib/site";
import "./globals.css";
import "./v2.css";
// The page styles load with the layout, so moving between pages (and the
// link prefetches that come before it) never fetches a stylesheet the
// current page does not use; every rule in them is scoped to its own v2-
// classes.
import "./home.css";
import "./inner.css";

// Fonts exactly as plan/design-decision.md section 3: Newsreader for display
// (roman and italic, with the optical-size axis), Geist for body and UI,
// Geist Mono for labels (not preloaded: it is never the first paint).
// The four files weigh 323.5 KB, 24 KB over the 300 KB budget; the opsz axis
// is the cost and is kept on purpose (README, "Fonts and performance").
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false });

// Root metadata (spec 9.1). Every page adds its own title, description,
// canonical link and sharing tags through pageMetadata (src/lib/site.ts); the
// values here are the defaults, which only the 404 page relies on.
const DEFAULT_TITLE = "Manpreet Jangra · Chief Operating Officer, Digitally Next";
const DEFAULT_DESCRIPTION =
  "Manpreet Jangra is COO of Digitally Next, New Delhi. She runs the agency's operations and hiring and is building its AI Decision and Acceleration Center.";

export const metadata: Metadata = {
  // Resolves the canonical and share-image addresses of every page.
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s · ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Manpreet Jangra",
    "Digitally Next",
    "Chief Operating Officer",
    "COO",
    "BFG Market Consult",
    "talent acquisition",
    "AI Decision and Acceleration Center",
    "New Delhi",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
    url: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
  // No Twitter site or creator: her X account has been dormant since 2019 (F173).
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
  },
  // Stops phones turning numbers and the office lines into tap-to-call links.
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = { themeColor: "#FAF7F2", colorScheme: "light" };

/** The three pictures of the open menu (after Lando's photo grid): her
 *  portrait on its field, then the podium photograph (two rows tall) and the
 *  zari texture in warm monochrome (colour on hover). A blank texture tile
 *  read as a missing picture, so there is none.
 *  Decorative: the menu's links carry the meaning. */
function MenuTiles() {
  const sizes = "(min-width: 1024px) 22vw, 1px";
  const tile = (index: number, child: ReactNode, mono = true, tall = false) => (
    <div
      key={index}
      className={`v2-menu-tile${mono ? " v2-menu-tile--mono" : ""}${tall ? " v2-menu-tile--tall" : ""}`}
      style={{ "--i": index } as CSSProperties}
    >
      {child}
    </div>
  );
  return (
    <>
      {tile(0, <FieldPortrait portrait={portrait} sizes={sizes} decorative />, false)}
      {tile(1, <Image src={podium.src} alt="" width={podium.width} height={podium.height} sizes={sizes} />, true, true)}
      {tile(2, <Image src={zari.src} alt="" width={zari.width} height={zari.height} sizes={sizes} />)}
    </>
  );
}

/** Under the menu's links: the contact line and her profiles. */
function MenuFoot() {
  return (
    <>
      <Link className="v2-menu-small" href={hero.primary.href}>
        {hero.primary.label}
      </Link>
      <div className="v2-menu-socials">
        {socialLinks.map((link) => (
          <a key={link.key} className="v2-menu-small" href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
            <span className="v2-sr-only">{labels.newTab}</span>
          </a>
        ))}
      </div>
    </>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body>
        <a className="site-skip" href="#site-content">
          Skip to content
        </a>
        {/* The site's chrome (the header with its full-screen menu, the main
            landmark the skip link targets, the footer card) inside one
            smooth-scroll provider (plan/v2-spec.md 3.1). */}
        <div className="v2">
          <SmoothScroll>
            <V2Header
              nav={siteNav}
              wordmark={wordmark}
              contact={{ label: headerCta.label, href: headerCta.href }}
              labels={{ openMenu: labels.openMenu, closeMenu: labels.closeMenu, menu: labels.menu }}
              menuTiles={<MenuTiles />}
              menuFoot={<MenuFoot />}
            />
            <main id="site-content" tabIndex={-1}>
              {children}
            </main>
            <V2Footer />
          </SmoothScroll>
        </div>
        {/* Person and WebSite structured data (spec 9.4). */}
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
