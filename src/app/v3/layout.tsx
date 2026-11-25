import type { Metadata } from "next";
import { V3Footer } from "@/components/v3/V3Footer";
import { V3Header, type ChapterLink } from "@/components/v3/V3Header";
import { socialLinks } from "@/content/navigation";
import { footer } from "@/content/shared";
import { V3_BASE, chapters, labels } from "@/content/v3";
import { SEQUENCES, frameSrc, type SequenceName } from "@/lib/sequences";
import "./v3.css";

// The "Cinema" edition of the site (plan/versions-spec.md 3, V3): a dark,
// film-like keynote. Its own chrome (the minimal top bar with the progress
// line and the full-screen chapter list, the main landmark the skip link
// targets, the credits-style footer) around the /v3 pages. The root layout
// still gives fonts, metadata, the skip link and JSON-LD.
//
// /v3 is another edition of the same content, so it is kept out of search
// results (each page's canonical link names its /v1 page) and out of the
// sitemap.

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

/** The still each chapter shows in the chapter list's screen: a frame from
 *  the footage of that page's title scene (small set, 800 or 540 px wide). */
const STILLS: readonly [SequenceName, number][] = [
  ["vermilion-silk", 48],
  ["bronze-silk", 70],
  ["needle-thread", 40],
  ["bronze-silk", 20],
  ["needle-thread", 76],
  ["vermilion-silk", 100],
];

const chapterLinks: ChapterLink[] = chapters.map((chapter, index) => {
  const [name, frame] = STILLS[index % STILLS.length];
  const sequence = SEQUENCES[name];
  return { ...chapter, still: frameSrc(sequence, sequence.small, Math.min(frame, sequence.frames)) };
});

export default function V3Layout({ children }: LayoutProps<"/v3">) {
  return (
    <div className="v3">
      <V3Header
        name={footer.wordmark}
        home={V3_BASE}
        chapters={chapterLinks}
        socials={socialLinks.map(({ label, href }) => ({ label, href }))}
        editions={{ label: labels.allEditions, href: "/" }}
        labels={{
          chapters: labels.chapters,
          close: labels.close,
          closeChapters: labels.closeChapters,
          chapter: labels.chapter,
          newTab: labels.newTab,
          follow: labels.follow,
        }}
      />
      <main id="site-content" tabIndex={-1}>
        {children}
      </main>
      <V3Footer />
    </div>
  );
}
