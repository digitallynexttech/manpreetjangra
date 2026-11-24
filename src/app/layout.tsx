import type { Metadata, Viewport } from "next";
import { Newsreader, Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "Manpreet Jangra · Chief Operating Officer, Digitally Next",
    template: "%s · Manpreet Jangra",
  },
  description:
    "Manpreet Jangra is COO of Digitally Next, New Delhi. She runs the agency's operations and hiring and is building its AI Decision and Acceleration Center.",
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
          <main id="site-content" tabIndex={-1}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
