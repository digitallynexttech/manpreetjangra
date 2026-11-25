import PageTransition from "@/components/PageTransition";
import { Featured } from "@/components/v2/home/Featured";
import { FromHerFeed } from "@/components/v2/home/FromHerFeed";
import { HerWords, Manifesto } from "@/components/v2/home/HerWords";
import { Hiring } from "@/components/v2/home/Hiring";
import { HomeHero } from "@/components/v2/home/HomeHero";
import { ScrollRefresh } from "@/components/v2/home/HomeScenes";
import { InNumbers } from "@/components/v2/home/InNumbers";
import { JourneyTrack } from "@/components/v2/home/JourneyTrack";
import { PodiumStage, WorkAndWords } from "@/components/v2/home/WorkAndWords";
import { meta } from "@/content/home";
import { v2Metadata } from "@/lib/v2";
import "./home.css";

export const metadata = v2Metadata(meta);

// The /v2 home page (plan/v2-spec.md 4.1): the landonorris.com home in
// Manpreet's content and the classic palette. Top to bottom: hero (paper),
// her words (night, pinned), manifesto (night), journey track (night to
// paper, horizontal on desktop), The Work / Her Words (paper), the podium
// photograph opening to full screen, In numbers (night), the feature
// (paper, curved edge), hiring (paper), from her feed (paper to marigold);
// the footer card comes from the layout. Every word comes from the content
// files; the neutral labels are in content/v2.ts.

export default function V2Home() {
  return (
    <PageTransition>
      <HomeHero />
      <HerWords />
      <Manifesto />
      <JourneyTrack />
      <WorkAndWords />
      <PodiumStage />
      <InNumbers />
      <Featured />
      <Hiring />
      <FromHerFeed />
      <ScrollRefresh />
    </PageTransition>
  );
}
