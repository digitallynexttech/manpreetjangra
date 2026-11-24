import type { Intro, LinkCopy, PageMeta, Para, QuoteRef, Section, SourcedLink, SourcedText, Stat, Venture } from "./types";
import type { QuoteId } from "./quotes";
import { SHOW_DIRECTORSHIP } from "./about";
import { adacRoles, fullTime, hasRoles, internships } from "./roles";
import { plural } from "@/lib/site";

// Work page (spec 4.3). Voice: first person for what she runs; agency facts
// attributed to the agency.

export const meta: PageMeta = {
  title: "Work",
  description:
    "What Manpreet Jangra leads at Digitally Next: operations, hiring and the AI Decision and Acceleration Center, and her roles at iMET Global and iSoCIAL.",
  path: "/work",
  facts: ["F010", "F012", "F011", "F016", "F017"],
};

export const intro: Intro = {
  eyebrow: "Work",
  title: "Operations, talent and AI at Digitally Next.",
  accent: "Digitally Next",
  lede: "I am Chief Operating Officer of Digitally Next, a digital marketing agency in New Delhi founded in 2010. This is what I run, and where the agency sits in its group.",
  facts: ["F010", "F012", "F011", "F110", "F111", "F124"],
};

/** 01 · Operations (spec 4.3.2): editorial grid, sticky left column. */
export const operations: Section & {
  caption: SourcedText;
  model: Para;
  serviceLines: readonly (SourcedText & { index: string })[];
  markets: SourcedText;
} = {
  id: "operations",
  eyebrow: "01 · Operations",
  title: "Five service lines, clients in 12 markets.",
  facts: ["F117", "F118"],
  caption: {
    text: "Agency figures: team size from Digitally Next's LinkedIn page; markets as listed on digitallynext.com, November 2026.",
    facts: ["F115", "F118", "F194"],
  },
  model: {
    parts: [
      { text: "Digitally Next organises its work into five service lines, and describes its operating model as " },
      { quote: "Modern DAD" },
      { text: ": " },
      { quote: "Data shapes decisions · AI accelerates execution · Digital systems deliver outcomes" },
      { text: ". Digitally Next is a team of about 30 people." },
    ],
    facts: ["F117", "F116", "F115", "F194"],
  },
  serviceLines: [
    { index: "01", text: "Strategy, Brand & Growth Intelligence", facts: ["F117"] },
    { index: "02", text: "Content, Culture & Media Creation", facts: ["F117"] },
    { index: "03", text: "Performance, Distribution & Demand", facts: ["F117"] },
    { index: "04", text: "Platforms, Web & Digital Experience", facts: ["F117"] },
    { index: "05", text: "AI Enablement & Decision Systems", facts: ["F117"] },
  ],
  markets: {
    text: "The agency lists clients in India, the USA, the UK, Italy, the Czech Republic, Switzerland, Australia, Russia, the Middle East, Israel, Canada and Singapore.",
    facts: ["F118"],
  },
};

/** 02 · Talent (spec 4.3.3). The second sentence is built from roles.ts and
 *  dropped when there are no roles. */
export const talent: Section & { paragraph: SourcedText; quote: QuoteRef<QuoteId>; link: LinkCopy } = {
  id: "talent",
  eyebrow: "02 · Talent",
  title: "Hiring in my name since 2018.",
  facts: ["F012", "F032"],
  paragraph: {
    text:
      "I have fronted Digitally Next's hiring since 2018, posting its roles under my own name on Instahyre in 2018 and on Cutshort from 2023 to 2024." +
      (hasRoles
        ? ` Today the agency lists ${plural(fullTime.length, "one full-time role", "{n} full-time roles", "no full-time roles")} and ${plural(internships.length, "one internship", "{n} internships", "no internships")}.`
        : ""),
    facts: hasRoles ? ["F012", "F032", "F038", "F140"] : ["F012", "F032", "F038"],
  },
  quote: { quote: "jd-process" },
  link: { label: "See every open role", href: "/careers" },
};

/** 03 · AI Decision and Acceleration Center (spec 4.3.4). `roles` is null
 *  when no ADAC role is open; the paragraph is then left out. */
export const adac: Section & { paragraph: Para; roles: SourcedText | null } = {
  id: "adac",
  eyebrow: "03 · AI Decision and Acceleration Center",
  title: "Building the AI Decision and Acceleration Center.",
  facts: ["F011"],
  paragraph: {
    parts: [
      { text: "My LinkedIn headline puts it first: " },
      { quote: "Building AI Decision and Acceleration Center @Digitally Next" },
      { text: ". The agency describes ADAC in its own words: " },
      { quote: "Not all work needs AI. Some need judgment. ADAC decides the difference." },
    ],
    facts: ["F011", "F116"],
  },
  roles:
    adacRoles.length > 0
      ? {
          text: `ADAC is also one of the agency's hiring groups. Open now: ${adacRoles.map((r) => r.title).join(", ")}.`,
          facts: ["F140"],
        }
      : null,
};

/** How I work (spec 4.3.5): two quotes, paper variant. */
export const how: Section & { quotes: readonly QuoteRef<QuoteId>[] } = {
  id: "how",
  eyebrow: "How I work",
  title: "Partners, not vendors.",
  lede: "Two things I have posted about agencies and their audiences.",
  facts: ["F154", "F141", "F069", "F067"],
  quotes: [{ quote: "reel-vendors" }, { quote: "video-smarter" }],
};

/** A client story (spec 4.3.6); the numbers are `clientStats`. */
export const clientStory: Section & { quote: QuoteRef<QuoteId>; link: SourcedLink } = {
  id: "client-story",
  eyebrow: "A client story",
  title: "Three years with Digitally Next's first Israeli client.",
  lede: "In September 2022 I wrote about three years with Avi, a client in Jerusalem in luxury, lifestyle and art. These are the numbers from that post.",
  facts: ["F037", "F195"],
  quote: { quote: "trust" },
  link: {
    label: "Read the post",
    href: "https://www.linkedin.com/posts/manpreetjangraofficial_global-clients-digitally-next-activity-6974705681685753856-dUdR",
    external: true,
    facts: ["F037"],
  },
};

export const clientStats: readonly Stat[] = [
  { value: "3", label: "years working together", facts: ["F195"] },
  { value: "5+", label: "websites developed and launched", facts: ["F195"] },
  { value: "6+", label: "brand activations done live", facts: ["F195"] },
  { value: "4", label: "artists given personal branding and digital PR, for the US, Europe and the Middle East", facts: ["F195"] },
];

/** Where I work (spec 4.3.7): the head; the rows are `ventures`. */
export const group: Section = {
  id: "group",
  eyebrow: "The group",
  title: "Where I work.",
  lede: "Digitally Next, iMET Global and iSoCIAL are part of the BFG group founded by Deepak Goel. My work has touched all three.",
  facts: ["F124", "F113", "F031"],
};

export const ventures: readonly Venture[] = [
  {
    name: "Digitally Next",
    href: "https://www.digitallynext.com/",
    category: "Digital marketing agency · New Delhi · founded 2010",
    role: SHOW_DIRECTORSHIP
      ? "Chief Operating Officer. Director of BFG Market Consult Pvt Ltd, the company behind it, since 2024."
      : "Chief Operating Officer.",
    preview: "/images/ventures/digitally-next.webp",
    previewAlt: "Digitally Next homepage",
    facts: SHOW_DIRECTORSHIP ? ["F110", "F111", "F010", "F013"] : ["F110", "F111", "F010"],
  },
  {
    name: "iMET Global",
    href: "https://www.imetglobal.com/",
    category: "School of Digital Social Media & IoT · launched 2011",
    role: "Learning and development, admissions counselling and outreach.",
    preview: "/images/ventures/imet-global.webp",
    previewAlt: "iMET Global homepage",
    facts: ["F124", "F016", "F031", "F034"],
  },
  {
    name: "iSoCIAL",
    href: "https://isocialconnect.in/",
    category: "Digital and IoT professional community",
    role: "Helped build the community, and fronted its 2018 IoT-community launch video.",
    // No screenshot exists (the domain did not resolve for the sibling site either).
    preview: null,
    facts: ["F124", "F017", "F033"],
  },
];
