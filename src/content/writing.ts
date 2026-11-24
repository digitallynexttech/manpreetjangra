import type { Article, Confirm, EntryLevel, Intro, JapanSession, LinkCopy, PageMeta, Para, QuoteRef, Section, SourcedLink } from "./types";
import type { QuoteId } from "./quotes";

// Writing page (spec 4.4). Voice: third person annotations; her words verbatim.

const WER = "https://www.womenentrepreneursreview.com/article/6-women-leaders-on-patriotism-purpose-and-building-india-s-future-nwid-9136.html";

export const meta: PageMeta = {
  title: "Writing",
  description:
    "Articles, posts and a magazine feature by Manpreet Jangra on women's independence, hiring, client partnerships and building a brand on LinkedIn.",
  path: "/writing",
  facts: ["F100", "F060", "F061", "F062", "F065", "F066", "F067", "F069", "F070"],
};

export const intro: Intro = {
  eyebrow: "Writing",
  title: "In her own words.",
  lede: "A magazine feature, three long-form articles from 2016 to 2019, and posts on LinkedIn and Instagram: on women's independence, hiring, client partnerships and personal branding, with an open invitation to speak.",
  facts: ["F100", "F191", "F060", "F061", "F062", "F065", "F066", "F067", "F069", "F070"],
};

/** Featured (spec 4.4.2). The article title is the section heading
 *  (`<h2 id="featured-title">`, styled text-h3). The quote's attribution is
 *  not shown: the block names the outlet. */
export const featured: Omit<Section, "title"> & {
  outlet: string;
  title: string;
  byline: string;
  herSection: string;
  link: SourcedLink;
  quote: QuoteRef<QuoteId>;
  summary: Para;
} = {
  id: "featured",
  eyebrow: "Featured · August 2026",
  outlet: "Women Entrepreneurs Review",
  title: "6 Women Leaders On Patriotism, Purpose And Building India's Future",
  byline: "Independence Day 2026 · by Supraja Mohanty, Senior Correspondent",
  herSection: "Her section: When Women Discover What They Are Capable Of",
  // A text link, not a button: the page's one primary is "Invite her to speak".
  link: { label: "Read the feature", href: WER, external: true, facts: ["F100"] },
  quote: { quote: "wer-defining-role" },
  summary: {
    parts: [
      { text: "The magazine's summary: " },
      { quote: "For Manpreet Jangra, it means watching women surpass their own boundaries and realize their capabilities." },
    ],
    facts: ["F101"],
  },
  facts: ["F100"],
};

/** C4: a second Featured item, shown only when every `gate` field is
 *  confirmed (spec 4.4.2, CONTENT-REVIEW A4). */
export const entryLevel: EntryLevel = {
  headline: "{{CONFIRM: headline of the 2026 entry-level post}}",
  href: "{{CONFIRM: LinkedIn URL of the entry-level post}}",
  edition: "{{CONFIRM: Lokmat Times edition and date of the print clipping}}",
  outlet: "Lokmat Times, in print",
  summary: "On how the first job is changing in the AI era.",
  quotes: ["The first rung of the career ladder is changing.", "This is not the end of work for graduates."],
  linkLabel: "Read the post on LinkedIn",
  // Always the current values of the three fields above.
  get gate() {
    return [this.headline, this.href, this.edition];
  },
  facts: ["F103", "F063", "F064"],
};

/** Themes (spec 4.4.3): six quotes, each with its theme label. */
export const themes: Section & { items: readonly QuoteRef<QuoteId>[] } = {
  id: "themes",
  eyebrow: "Themes",
  title: "What she keeps coming back to.",
  facts: ["F067", "F155", "F069", "F154", "F070", "F152", "F156", "F037", "F066", "F151", "F100"],
  // Link label "View the post", except where given.
  items: [
    { quote: "video-audience" },
    { quote: "reel-babysit" },
    { quote: "interns-labels" },
    { quote: "language" },
    { quote: "socialmedia" },
    { quote: "wer-empathy", linkLabel: "Read the feature" },
  ],
};

/** Articles (spec 4.4.4): editorial grid, sticky left column. */
export const articles: Section & { note: string; linkLabel: string; items: readonly Article[] } = {
  id: "articles",
  eyebrow: "Articles",
  title: "Long-form, on LinkedIn.",
  note: "Three articles, 2016 to 2019.",
  linkLabel: "Read on LinkedIn",
  facts: ["F191", "F060", "F061", "F062"],
  items: [
    {
      id: "freedom",
      date: "2019-08-18",
      dateLabel: "18 Aug 2019",
      title: "We need to find our own #Freedom",
      summary: "A survey of what professionals want freedom from at work, from job cuts to being typecast in one industry, and the case for skilling.",
      quote: "However, I have a dilemma, are we really free?",
      note: "No longer online at LinkedIn.",
      facts: ["F062", "F034"],
    },
    {
      id: "ecommerce",
      date: "2017-01-06",
      dateLabel: "6 Jan 2017",
      title: "Revolutionizing E-Commerce/Digital-Social Media",
      summary: "E-commerce trends for 2017, and an introduction to iSoCIAL.",
      quote: "iSoCIAL is a step forward on bridging the Industry-academia gap by taking various initiatives.",
      href: "https://www.linkedin.com/pulse/revolutionizing-e-commercedigital-social-media-manpreet-jangra",
      facts: ["F061"],
    },
    {
      id: "make-in-india",
      date: "2016-02-13",
      dateLabel: "13 Feb 2016",
      title: "A GREAT START #MAKEININDIA#MUMBAI",
      summary: "Her summary of the opening of Make in India Week in Mumbai.",
      href: "https://www.linkedin.com/pulse/great-start-makeinindiamumbai-manpreet-jangra",
      facts: ["F060"],
    },
  ],
};

/** On stage (spec 4.4.5). Its primary button is the last element of the page
 *  (Writing has no Contact band). The podium photo is `podium` in images.ts. */
export const stage: Section & { paragraph: string; button: LinkCopy; photoEvent: string | Confirm } = {
  id: "stage",
  eyebrow: "On stage",
  title: "Talks, panels and conversations.",
  paragraph: "For a talk, a panel or a conversation, send the date, the audience and the format.",
  button: { label: "Invite her to speak", href: "/contact?type=speaking" },
  // C6: the caption under the photo, "{event, year}", once she names it.
  photoEvent: "{{CONFIRM: event name and year of the podium photo}}",
  facts: ["F082"],
};

/** C5: one row under On stage, shown only when all five `gate` fields are
 *  confirmed. Phrased as her own account; never implies an official
 *  government role (F080 note). */
export const japanSession: JapanSession = {
  date: "{{CONFIRM: date of the Japanese delegation session}}",
  venue: "{{CONFIRM: venue}}",
  organiser: "{{CONFIRM: organiser}}",
  role: "{{CONFIRM: your role, e.g. speaker or panellist}}",
  href: "{{CONFIRM: URL of your post about it}}",
  title: "University and Institution Engagement with the Japanese CEO and Government Delegation to India",
  quote: "This week, I had the honour of being on stage at the University and Institution Engagement with the #Japanese CEO and Government Delegation to #India",
  linkLabel: "View the post",
  // Always the current values of the five fields above.
  get gate() {
    return [this.date, this.venue, this.organiser, this.role, this.href];
  },
  facts: ["F080"],
};
