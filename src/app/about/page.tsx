import PageTransition from "@/components/PageTransition";
import { AboutBeliefs, AboutBio, AboutEducation, AboutHero, AboutJourney, AboutStory } from "@/components/v2/about/AboutSections";
import { meta } from "@/content/about";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(meta);

// /about (plan/v2-spec.md 4.2, 4.3), the landonorris.com "On Track" page
// in her record, in the third person. Top to bottom: the page title HER
// STORY with the meta row and the intro (paper), her story (night: the
// manifesto and the giant 2017; then paper: the portrait beside the other
// paragraphs), the journey as big rows that open (night), what drives her
// (blush), education (paper), the bio for organisers (paper); the footer
// card comes from the layout. All copy comes from src/content/about.ts.

export default function AboutPage() {
  return (
    <PageTransition>
      <AboutHero />
      <AboutStory />
      <AboutJourney />
      <AboutBeliefs />
      <AboutEducation />
      <AboutBio />
    </PageTransition>
  );
}
