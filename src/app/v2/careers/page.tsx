import PageTransition from "@/components/PageTransition";
import {
  CareersApply,
  CareersCriteria,
  CareersFaq,
  CareersHero,
  CareersMentorship,
  CareersRoles,
} from "@/components/v2/careers/CareersSections";
import { meta } from "@/content/careers";
import { v2Metadata } from "@/lib/v2";

export const metadata = v2Metadata(meta);

// /v2/careers (plan/v2-spec.md 4.2, 4.6), in her first person. Top to
// bottom: the page title HOW I HIRE with what is open and the Hiring pill
// (paper), the open roles (paper: the giant count, then the groups as big
// rows), what I look for (night manifesto and list), mentorship (blush),
// questions (paper, rows that open), apply (sand); the footer card comes
// from the layout. All copy comes from src/content/careers.ts and every
// count from roles.ts, with the classic empty and singular states.

export default function V2Careers() {
  return (
    <PageTransition>
      <CareersHero />
      <CareersRoles />
      <CareersCriteria />
      <CareersMentorship />
      <CareersFaq />
      <CareersApply />
    </PageTransition>
  );
}
