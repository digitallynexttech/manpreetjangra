import type { HomeHero, LinkCopy, MailtoHref, PageMeta, Para, Pillar, Section, Sourced, SourcedLink, SourcedText, Stat, TimelineEntry } from "./types";
import type { FactId } from "./facts";
import type { QuoteId } from "./quotes";
import { COO_SINCE, SHOW_DIRECTORSHIP } from "./about";
import { ROLES_AS_OF, hasRoles, roles } from "./roles";
import { formatLongDate, plural } from "@/lib/site";

// Home page (spec 4.1).

/** Date of the LinkedIn figures in `stats` (refresh both together: CONTENT-REVIEW H1). */
export const LINKEDIN_AS_OF = "2026-11-23";

const WER = "https://www.womenentrepreneursreview.com/article/6-women-leaders-on-patriotism-purpose-and-building-india-s-future-nwid-9136.html";

export const meta: PageMeta = {
  title: "Manpreet Jangra · Chief Operating Officer, Digitally Next",
  absoluteTitle: true,
  description:
    "Manpreet Jangra is COO of Digitally Next, New Delhi. She runs the agency's operations and hiring and is building its AI Decision and Acceleration Center.",
  path: "/",
  facts: ["F001", "F010", "F002", "F012", "F011"],
};

export const hero: HomeHero = {
  eyebrow: "Chief Operating Officer · Digitally Next · New Delhi",
  name: "Manpreet Jangra",
  statement: "I run how Digitally Next works and who joins it, and I am building its AI Decision and Acceleration Center.",
  accent: "AI Decision and Acceleration Center",
  primary: { label: "Start a conversation", href: "/contact" },
  secondary: { label: "See open roles", href: "/careers" },
  secondaryEmpty: { label: "How I hire", href: "/careers#criteria" },
  credential: "Heading talent acquisition for digital, AI and data · Featured in Women Entrepreneurs Review, 2026",
  facts: ["F010", "F002", "F001", "F012", "F011", "F100"],
};

/** Proof row (spec 4.1.2). Values are typed here, except the roles count,
 *  which comes from roles.ts; the roles item and caption sentence drop out
 *  when there are no roles. */
export const stats: Sourced & { title: string; items: readonly Stat[]; caption: string } = {
  title: "In numbers",
  items: [
    { value: "29K+", label: "followers on LinkedIn", facts: ["F190"] },
    { value: "699", label: "posts on LinkedIn, plus 3 long-form articles", facts: ["F191"] },
    ...(hasRoles
      ? [
          {
            value: String(roles.length),
            label: `${plural(roles.length, "open role", "open roles")} at Digitally Next`,
            href: "/careers",
            linkLabel: "See the roles",
            facts: ["F196", "F140"],
          } satisfies Stat,
        ]
      : []),
  ],
  caption: hasRoles
    ? `LinkedIn figures as of ${formatLongDate(LINKEDIN_AS_OF)}. Roles as listed on digitallynext.com on ${formatLongDate(ROLES_AS_OF)}.`
    : `LinkedIn figures as of ${formatLongDate(LINKEDIN_AS_OF)}.`,
  facts: ["F190", "F191", "F140"],
};

export const lead: Section = {
  id: "lead",
  eyebrow: "What I lead",
  title: "How the agency runs, who joins it, and where AI fits.",
  accent: "where AI fits",
  lede: "Three responsibilities at Digitally Next, the New Delhi agency where I am Chief Operating Officer.",
  facts: ["F010", "F012", "F011", "F002"],
};

/** The three cards under "What I lead". Each card is one link (nav-forward). */
export const pillars: readonly Pillar[] = [
  {
    index: "01",
    title: "Operations",
    body: {
      parts: [{ text: "Five service lines, from strategy and content to performance, platforms and AI enablement, for clients the agency lists across 12 markets." }],
      facts: ["F117", "F118"],
    },
    link: { label: "How the agency works", href: "/work#operations" },
    facts: ["F117", "F118"],
  },
  {
    index: "02",
    title: "Talent and hiring",
    body: {
      parts: [{ text: "I have fronted Digitally Next's hiring since 2018." }],
      facts: ["F012", "F032"],
    },
    link: { label: "How I hire", href: "/careers#criteria" },
    facts: ["F012", "F032"],
  },
  {
    index: "03",
    title: "AI Decision and Acceleration Center",
    body: {
      parts: [
        { text: "I am building the agency's AI Decision and Acceleration Center. The agency's own line for it: " },
        { quote: "Not all work needs AI. Some need judgment." },
      ],
      facts: ["F011", "F116"],
    },
    link: { label: "Read more", href: "/work#adac" },
    facts: ["F011", "F116"],
  },
];

const DIRECTOR_2024: TimelineEntry = {
  id: "2024",
  year: "2024",
  title: "Director, BFG Market Consult Pvt Ltd",
  body: { parts: [{ text: "Joins the board of the company behind Digitally Next." }], facts: ["F013", "F193", "F110"] },
  facts: ["F013", "F193", "F110"],
};

/** Journey teaser (spec 4.1.4): compact timeline, oldest first. */
export const journey: Section & { entries: readonly TimelineEntry[]; link: LinkCopy } = {
  id: "journey",
  eyebrow: "Journey",
  title: "Nearly a decade inside one group.",
  accent: "inside one group",
  lede: "From learning and development in 2017 to Chief Operating Officer of Digitally Next.",
  facts: ["F192", "F124", "F031", "F010"],
  entries: [
    {
      id: "2017",
      year: "2017",
      title: "Learning & Development, across the group",
      body: { parts: [{ text: "Her first dated title, on an iSoCIAL press release." }], facts: ["F031"] },
      facts: ["F031"],
    },
    {
      id: "2018",
      year: "2018",
      title: "Recruiting for Digitally Next",
      body: {
        parts: [{ text: "Posts the agency's roles under her own name and fronts iSoCIAL's IoT-community launch video." }],
        facts: ["F032", "F012", "F033"],
      },
      facts: ["F032", "F012", "F033"],
    },
    {
      id: "2019",
      year: "2019",
      title: "Admissions and outreach, iMET Global",
      body: {
        parts: [{ text: "Leads admissions counselling and outreach for iMET Global's postgraduate programme." }],
        facts: ["F016", "F034"],
      },
      facts: ["F016", "F034"],
    },
    ...(SHOW_DIRECTORSHIP ? [DIRECTOR_2024] : []),
    {
      id: "now",
      year: "Now",
      since: COO_SINCE,
      title: "Chief Operating Officer, Digitally Next",
      body: {
        parts: [{ text: "Runs operations and talent acquisition and is building the AI Decision and Acceleration Center." }],
        facts: ["F010", "F011", "F012"],
      },
      facts: ["F010", "F011", "F012"],
    },
  ],
  link: { label: "Her full story", href: "/about#journey" },
};

/** In her words (spec 4.1.5): the only night band. */
export const words: Section & {
  featured: QuoteId;
  quotes: readonly QuoteId[];
  links: readonly SourcedLink[];
} = {
  id: "words",
  eyebrow: "In her words",
  title: "What independence means to her.",
  lede: "She was one of six women leaders Women Entrepreneurs Review asked about patriotism and purpose for Independence Day 2026.",
  facts: ["F100", "F197"],
  featured: "wer-empathy",
  quotes: ["wer-independence", "wer-transformation"],
  links: [
    { label: "Read the feature on Women Entrepreneurs Review", href: WER, external: true, facts: ["F100"] },
    { label: "More of her writing", href: "/writing", facts: [] },
    { label: "Bio for organisers", href: "/about#bio", facts: [] },
  ],
};

/** Hiring block (spec 4.1.6). The pill and the empty state come from roles.ts. */
export const hiring: Section & {
  lede: Para;
  listTitle: string;
  list: readonly SourcedText[];
  button: LinkCopy;
  buttonEmpty: LinkCopy;
  email: { label: string; href: MailtoHref; facts: readonly FactId[] };
} = {
  id: "hiring",
  eyebrow: "Careers",
  title: "Hiring for the way people learn.",
  // No full stop inside the <q>: the source line has none.
  lede: {
    parts: [
      { quote: "We don't like experts, we prefer people who are always willing to learn and are able to learn quickly" },
      { text: ". That line runs through the Digitally Next job posts published in my name." },
    ],
    facts: ["F142", "F038", "F012"],
  },
  facts: ["F142", "F038", "F012"],
  listTitle: "From the job posts",
  list: [
    { text: "Not a mere task taker", facts: ["F142"] },
    { text: "Zeal to be driven by productivity than by activity", facts: ["F142"] },
    { text: "You are a DIY person. Period", facts: ["F142"] },
  ],
  button: { label: "See open roles", href: "/careers" },
  buttonEmpty: { label: "How I hire", href: "/careers#criteria" },
  email: { label: "careers@digitallynext.com", href: "mailto:careers@digitallynext.com", facts: ["F144"] },
};
