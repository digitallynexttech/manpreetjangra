import type { Metadata, Viewport } from "next";
import { Newsreader, Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Motion } from "@/components/Motion";
import { headerCta, navigation } from "@/content/navigation";
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE, personJsonLd, websiteJsonLd } from "@/lib/site";
import "./globals.css";

// Fonts exactly as plan/design-decision.md section 3: Newsreader for display
// (roman and italic, with the optical-size axis), Geist for body and UI,
// Geist Mono for labels (not preloaded: it is never the first paint).
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body>
        <div className="site">
          <a className="site-skip" href="#site-content">
            Skip to content
          </a>
          {/* The layout is a server component: it hands the links to the
              client Header as props (spec 7.5). */}
          <Header nav={navigation} cta={headerCta} />
          <main id="site-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <Motion />
        </div>
        {/* Person and WebSite structured data (spec 9.4). */}
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
