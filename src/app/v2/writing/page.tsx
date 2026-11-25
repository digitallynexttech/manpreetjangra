import PageTransition from "@/components/PageTransition";
import { WritingArticles, WritingFeatured, WritingHero, WritingStage, WritingThemes } from "@/components/v2/writing/WritingSections";
import { meta } from "@/content/writing";
import { v2Metadata } from "@/lib/v2";

export const metadata = v2Metadata(meta);

// /v2/writing (plan/v2-spec.md 4.2, 4.5), third-person annotations around
// her own words, always verbatim. Top to bottom: the page title HER WORDS
// with the outlets and the intro (night), the Women Entrepreneurs Review
// feature as a huge pull quote (night), the themes as an offset collage of
// cards (sand), the articles as big rows (paper), her podium photograph
// opening to the full screen, then the invitation to speak (night); the
// footer card comes from the layout. All copy comes from
// src/content/writing.ts, through the same confirmation gates as the
// classic page.

export default function V2Writing() {
  return (
    <PageTransition>
      <WritingHero />
      <WritingFeatured />
      <WritingThemes />
      <WritingArticles />
      <WritingStage />
    </PageTransition>
  );
}
