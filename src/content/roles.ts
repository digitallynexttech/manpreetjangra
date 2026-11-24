import type { FactId } from "./facts";
import type { Role, RoleGroupView } from "./types";
import { displayName } from "@/lib/site";

// Open roles at Digitally Next, titles verbatim from
// https://www.digitallynext.com/careers on ROLES_AS_OF (spec Appendix A).
// Every count on the site is derived from `roles`: edit the array (and the
// date) and the Hiring pill, the proof row, the ADAC list, the FAQ and both
// "as of" captions follow. An empty array switches the site to its empty state.
export const ROLES_AS_OF = "2026-11-23";

const facts: readonly FactId[] = ["F140", "F196"];

export const roles: readonly Role[] = [
  // Full-time (21)
  { group: "SMG", department: "BSG - Business Support Group", title: "Business Relations Lead", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/smg/bsg-business-support-group/business-relations-lead", facts },
  { group: "SMG", department: "MSG - Marketing Services Group", title: "Genetic Counsellor", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/smg/msg-marketing-services-group/genetic-counsellor", facts },
  { group: "SMG", department: "MSG - Marketing Services Group", title: "Genetic Care Coordinator", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/smg/msg-marketing-services-group/genetic-care-coordinator", facts },
  { group: "SMG", department: "MSG - Marketing Services Group", title: "Content Writers / Copywriters", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/smg/msg-marketing-services-group/content-writers-copywriters", facts },
  { group: "SMG", department: "MSG - Marketing Services Group", title: "SMO - Social Media Optimisation - LinkedIN | Meta | X | YouTube", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/smg/msg-marketing-services-group/smo-social-media-optimisation-linkedin-meta-x-youtube", facts },
  { group: "SMG", department: "MSG - Marketing Services Group", title: "PR and Communications Executive", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/smg/msg-marketing-services-group/pr-and-communications-executive", facts },
  { group: "SMG", department: "MSG - Marketing Services Group", title: "Influencer Marketing", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/smg/msg-marketing-services-group/influencer-marketing", facts },
  { group: "SMG", department: "MSG - Marketing Services Group", title: "Performance Marketer", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/smg/msg-marketing-services-group/performance-marketer", facts },
  { group: "SMG", department: "MSG - Marketing Services Group", title: "SEO/AEO/GEO Specialist", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/smg/msg-marketing-services-group/seoaeogeo-specialist", facts },
  { group: "SMG", department: "MSG - Marketing Services Group", title: "Digital Marketing Executive", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/smg/msg-marketing-services-group/digital-marketing-executive", facts },
  { group: "ADAC", department: "PMG - Project Management Group", title: "Project Controller", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/adac/pmg-project-management-group/project-controller", facts },
  { group: "ADAC", department: "AI Enablement", title: "AI/ML Engineers", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/adac/ai-enablement/aiml-engineers", facts },
  { group: "AMG", department: "Key Account Managers", title: "Key Account Manager", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/amg/key-account-managers/key-account-manager", facts },
  { group: "AMG", department: "Key Account Executive", title: "Key Account Executive (Digital Campaigns)", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/amg/key-account-executive/key-account-executive-digital-campaigns", facts },
  { group: "MAP", department: "WEM - Web Essentials Management", title: "Full Stack Developer", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/map/wem-web-essentials-management/full-stack-developer", facts },
  { group: "MAP", department: "WEM - Web Essentials Management", title: "Wordpress Developers", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/map/wem-web-essentials-management/wordpress-developers", facts },
  { group: "MAP", department: "VIM - Visual Impact Management", title: "Creative Lead", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/map/vim-visual-impact-management/creative-lead", facts },
  { group: "MAP", department: "VIM - Visual Impact Management", title: "Video Editors / Motion Graphic Artists", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/map/vim-visual-impact-management/video-editors-motion-graphic-artists", facts },
  { group: "MAP", department: "VIM - Visual Impact Management", title: "Graphic Designers / UI & UX Designers", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/map/vim-visual-impact-management/graphic-designers-ui-ux-designers", facts },
  { group: "HR", department: "HR", title: "HR Executive", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/hr/hr-executive", facts },
  { group: "Finance", department: "Accounts and Taxation", title: "Accounts & Compliance Associate", kind: "full-time", href: "https://www.digitallynext.com/careers/full-time/finance-and-billing/accounts-compliance-associate", facts },
  // Internships (7)
  { group: "Internships", department: "Internships", title: "SEO / AEO Intern", kind: "internship", href: "https://www.digitallynext.com/careers/internship/internships/seo-aeo-intern", facts },
  { group: "Internships", department: "Internships", title: "Digital Marketing Intern", kind: "internship", href: "https://www.digitallynext.com/careers/internship/internships/digital-marketing-intern", facts },
  { group: "Internships", department: "Internships", title: "Graphic Designer Intern", kind: "internship", href: "https://www.digitallynext.com/careers/internship/internships/graphic-designer-intern", facts },
  { group: "Internships", department: "Internships", title: "Content Writing Intern", kind: "internship", href: "https://www.digitallynext.com/careers/internship/internships/content-writing-intern", facts },
  { group: "Internships", department: "Internships", title: "Video Editing Intern", kind: "internship", href: "https://www.digitallynext.com/careers/internship/internships/video-editing-intern", facts },
  { group: "Internships", department: "Internships", title: "Social Media Content Creator Intern", kind: "internship", href: "https://www.digitallynext.com/careers/internship/internships/social-media-content-creator-intern", facts },
  { group: "Internships", department: "Internships", title: "HR Intern", kind: "internship", href: "https://www.digitallynext.com/careers/internship/internships/hr-intern", facts },
];

export const fullTime = roles.filter((role) => role.kind === "full-time");
export const internships = roles.filter((role) => role.kind === "internship");
export const adacRoles = roles.filter((role) => role.group === "ADAC");
export const hasRoles = roles.length > 0;

// Group headings in display order (spec 4.5.2). Stored as listed; the page
// shows them through displayName(), which turns " - " into " · ".
const GROUPS: readonly { key: Role["group"]; name: string }[] = [
  { key: "SMG", name: "SMG - Strategic Management Group" },
  { key: "ADAC", name: "ADAC - AI Decision and Acceleration Centre" },
  { key: "AMG", name: "AMG - Account Management Group" },
  { key: "MAP", name: "MAP - Marketing Asset Production" },
  { key: "HR", name: "HR - Human Resources" },
  { key: "Finance", name: "Finance - Finance and Billing" },
  { key: "Internships", name: "Internships" },
];

/** Role groups as view props for RoleList: no facts, empty groups left out. */
export const roleGroups: readonly RoleGroupView[] = GROUPS.map(({ key, name }) => {
  const inGroup = roles.filter((role) => role.group === key);
  return {
    key: key.toLowerCase(),
    heading: displayName(name),
    count: inGroup.length,
    roles: inGroup.map(({ title, department, href }) => ({
      title,
      department: displayName(department),
      href,
    })),
  };
}).filter((group) => group.count > 0);
