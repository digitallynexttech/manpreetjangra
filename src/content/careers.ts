import type { FaqItem, Intro, LinkCopy, MailtoHref, PageMeta, Para, RoleGroupView, Section, SourcedText } from "./types";
import type { FactId } from "./facts";
import { quotes } from "./quotes";
import { ROLES_AS_OF, fullTime, hasRoles, internships, roleGroups } from "./roles";
import { formatLongDate, plural } from "@/lib/site";

// Careers page (spec 4.5). Voice: first person (her remit and her criteria);
// job-post lines verbatim. Every count comes from roles.ts.

const APPLY: MailtoHref = "mailto:careers@digitallynext.com?subject=Application%3A%20";
const ALL_ROLES: LinkCopy = { label: "All roles on digitallynext.com", href: "https://www.digitallynext.com/careers", external: true };

export const meta: PageMeta = {
  title: "Careers",
  description:
    "Open roles at Digitally Next and what Manpreet Jangra looks for when she hires: people who are always willing to learn.",
  path: "/careers",
  facts: ["F140", "F142", "F012"],
};

// The H1 is her own line from the June 2025 intern post (quotes.ts "interns-mentor").
export const intro: Intro = {
  eyebrow: "Careers",
  title: quotes["interns-mentor"].text,
  accent: "A chance, not a checklist.",
  lede: hasRoles
    ? "I have fronted Digitally Next's hiring since 2018. Here is what is open now, and what I look for."
    : "I have fronted Digitally Next's hiring since 2018. Here is what I look for.",
  facts: ["F070", "F152", "F012", "F032"],
};

/** Open roles (spec 4.5.2): sticky left column, RoleList on the right.
 *  With no roles: the empty heading and text, and no RoleList. */
export const rolesSection: Section & {
  emptyText: SourcedText | null;
  caption: string;
  button: LinkCopy & { href: MailtoHref };
  link: LinkCopy;
  groups: readonly RoleGroupView[];
} = {
  id: "roles",
  eyebrow: "Open roles",
  title: hasRoles
    ? `${plural(fullTime.length, "One full-time role", "{n} full-time roles", "No full-time roles")} and ${plural(internships.length, "one internship", "{n} internships", "no internships")}.`
    : "No roles are listed right now.",
  emptyText: hasRoles ? null : { text: "You can still send your CV to careers@digitallynext.com.", facts: ["F144"] },
  caption: `As listed on digitallynext.com/careers on ${formatLongDate(ROLES_AS_OF)}. The agency's page always has the latest.`,
  button: { label: "Email your CV", href: APPLY },
  link: ALL_ROLES,
  groups: roleGroups,
  facts: ["F140", "F196", "F144"],
};

/** What I look for (spec 4.5.3): twelve job-post lines, each rendered as <q>. */
export const criteria: Section & { items: readonly SourcedText[]; closing: Para } = {
  id: "criteria",
  eyebrow: "What I look for",
  title: "Learners over experts.",
  lede: "These lines run through the Digitally Next job posts published in my name on Cutshort, 2023 to 2024.",
  facts: ["F142", "F038", "F141"],
  items: [
    { text: "We don't like experts, we prefer people who are always willing to learn and are able to learn quickly", facts: ["F142"] },
    { text: "Not a mere task taker", facts: ["F142"] },
    { text: "Entrepreneurial instinct beyond office cubicle", facts: ["F142"] },
    { text: "Zeal to be driven by productivity than by activity", facts: ["F142"] },
    { text: "Self discipline and ability to do work with self supervision", facts: ["F142"] },
    { text: "You do what you preach, or at least try", facts: ["F142"] },
    { text: "You have an eye for detail", facts: ["F142"] },
    { text: "Less of a copy cat but more of a cool cat", facts: ["F141"] },
    { text: "Known to deliver cool work rather than keeping cool looks only", facts: ["F141"] },
    { text: "Empathetic and Compassionate", facts: ["F143"] },
    { text: "If you're a (regular) blogger, we already love you!", facts: ["F142"] },
    { text: "You are a DIY person. Period", facts: ["F142"] },
  ],
  closing: {
    parts: [
      { text: "The agency's careers page says it this way: " },
      { quote: "Some places hire for skills. Some hire for speed. We hire for how you think." },
    ],
    facts: ["F129"],
  },
};

/** Mentorship (spec 4.5.4): selected, non-consecutive lines of one caption.
 *  `gapBefore` marks an omission; the component draws the U+2026 gap line
 *  with its screen-reader text "Lines omitted." */
export const mentorship: Section & {
  lines: readonly { text: string; gapBefore?: boolean }[];
  attribution: string;
  link: LinkCopy;
} = {
  id: "mentorship",
  eyebrow: "Mentorship",
  title: "Why mentorship matters.",
  lede: "In June 2025 I wrote this about our summer interns.",
  facts: ["F070", "F152"],
  lines: [
    { text: "I once had my doubts about Gen Z." },
    { text: "But these young professionals changed the story for me." },
    { text: "No drama. No excuses. Just drive.", gapBefore: true },
    { text: "Thank you for proving that labels lie. And for reminding me why mentorship truly matters.", gapBefore: true },
  ],
  attribution: "Selected lines from an Instagram caption, 29 June 2025",
  link: { label: "View the post", href: "https://www.instagram.com/p/DLg-rnoPR7c/", external: true },
};

const INTERNS_FACTS: readonly FactId[] = ["F140"];
const internsAnswer: string =
  internships.length >= 2
    ? `Yes. ${internships.length} internships are listed right now, under Internships in the list above.`
    : internships.length === 1
      ? `Yes. One internship is listed right now: ${internships[0].title}.`
      : "Not right now. Internships appear on digitallynext.com/careers when they open.";

/** Questions (spec 4.5.5): Disclosure group "careers-faq", the first open. */
export const faq: Section & { items: readonly FaqItem[] } = {
  id: "faq",
  eyebrow: "Questions",
  title: "Before you apply.",
  facts: ["F140", "F144", "F112", "F181"],
  items: [
    {
      question: "How do I apply?",
      answer: {
        parts: [{ text: "Open a role above: each one links to its listing on digitallynext.com. Or send your CV to careers@digitallynext.com with the role in the subject line." }],
        facts: ["F140", "F144"],
      },
      facts: ["F140", "F144"],
    },
    {
      question: "Do you take interns?",
      answer: { parts: [{ text: internsAnswer }], facts: INTERNS_FACTS },
      facts: INTERNS_FACTS,
    },
    {
      question: "Where is the office?",
      answer: {
        parts: [{ text: "Digitally Next works from Business India Complex, Uday Park, New Delhi 110049, near the Green Park and South Extension metro stations." }],
        facts: ["F112"],
      },
      facts: ["F112"],
    },
    {
      question: "Can I write to you directly?",
      answer: {
        parts: [{ text: "Use the contact form and choose Careers and internships. It prepares an email to careers@digitallynext.com, marked for my attention." }],
        facts: ["F144", "F181"],
      },
      facts: ["F144", "F181"],
    },
  ],
};

/** Apply (spec 4.5.6): the page ends with its own call to action. */
export const apply: Section & { paragraph: string; button: LinkCopy & { href: MailtoHref }; link: LinkCopy } = {
  id: "apply",
  eyebrow: "Apply",
  title: "Send your CV.",
  paragraph: "careers@digitallynext.com, with the role in the subject line.",
  button: { label: "Email your CV", href: APPLY },
  link: ALL_ROLES,
  facts: ["F144"],
};
