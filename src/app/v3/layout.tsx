import type { Metadata } from "next";
import { V3Footer } from "@/components/v3/V3Footer";
import { V3Header, type ChapterLink } from "@/components/v3/V3Header";
import { socialLinks } from "@/content/navigation";
import { footer } from "@/content/shared";
import { V3_BASE, chapters, labels } from "@/content/v3";
import { TITLE_FOOTAGE } from "@/lib/v3";
import { SEQUENCES, frameSrc, type SequenceName } from "@/lib/sequences";
// Every /v3 stylesheet loads with the layout (all rules are on `v3-`
// classes): with page-level stylesheets, prefetching a /v3 link preloaded the
// other pages' CSS, which the browser then reported as unused.
import "./v3.css";
import "./scenes.css";
import "./home.css";
import "./inner.css";

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
 *  the footage of that page's title scene (small set, 800 or 540 px wide).
 *  The same footage opens each page (`TITLE_FOOTAGE` in lib/v3.ts). */
const STILLS: readonly [SequenceName, number][] = [
  ["vermilion-silk", 48],
  [TITLE_FOOTAGE.about, 70],
  [TITLE_FOOTAGE.work, 40],
  [TITLE_FOOTAGE.writing, 20],
  [TITLE_FOOTAGE.careers, 76],
  [TITLE_FOOTAGE.contact, 100],
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
