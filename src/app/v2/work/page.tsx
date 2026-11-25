import PageTransition from "@/components/PageTransition";
import {
  WorkAdac,
  WorkClientStory,
  WorkGroup,
  WorkHero,
  WorkHow,
  WorkOperations,
  WorkTalent,
} from "@/components/v2/work/WorkSections";
import { meta } from "@/content/work";
import { v2Metadata } from "@/lib/v2";

export const metadata = v2Metadata(meta);

// /v2/work (plan/v2-spec.md 4.2, 4.4), in her first person for what she
// runs. Top to bottom: the page title THE WORK with Digitally Next's line
// and the intro (paper), operations (paper: the service lines as big rows,
// then the giant 12 markets), talent (sand), the AI Decision and
// Acceleration Center (night manifesto), "Partners, not vendors." (night,
// offset quote cards), a client story (sand, counters), where I work
// (paper, the group's websites previewed under the pointer); the footer
// card comes from the layout. All copy comes from src/content/work.ts.

export default function V2Work() {
  return (
    <PageTransition>
      <WorkHero />
      <WorkOperations />
      <WorkTalent />
      <WorkAdac />
      <WorkHow />
      <WorkClientStory />
      <WorkGroup />
    </PageTransition>
  );
}
