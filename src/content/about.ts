import type { Confirm, EducationEntry, Intro, PageMeta, Para, QuoteRef, Section, SourcedLink, SourcedText, TimelineEntry } from "./types";
import type { FactId } from "./facts";
import type { QuoteId } from "./quotes";

// About page (spec 4.2). Voice: third person; her own words only as
// attributed quotes.

/** C1: the year she became Chief Operating Officer. The only copy: home.ts
 *  imports it. While unconfirmed the timeline shows "Now"; once confirmed,
 *  "Since {year}" on Home and About. */
export const COO_SINCE: string | Confirm = "{{CONFIRM: year you became Chief Operating Officer}}";

/** One switch for all five directorship mentions [F013 note: "Confirm she
 *  wants board seats shown at all"; CONTENT-REVIEW C4]: Home journey 2024 row,
 *  About story paragraph 5, About journey 2024 entry, the bio, and the Work
 *  "Where I work" Digitally Next row. */
export const SHOW_DIRECTORSHIP = true;

const WER = "https://www.womenentrepreneursreview.com/article/6-women-leaders-on-patriotism-purpose-and-building-india-s-future-nwid-9136.html";

export const meta: PageMeta = {
  title: "About",
  description:
    "Manpreet Jangra's story: nearly a decade in the Digitally Next group, from learning and development and hiring to Chief Operating Officer.",
  path: "/about",
  facts: ["F001", "F192", "F031", "F012", "F010"],
};

export const intro: Intro = {
  eyebrow: "About",
  title: "Nearly a decade in one group, from learning and development to COO.",
  accent: "from learning and development to COO",
  lede: "Manpreet Jangra is Chief Operating Officer of Digitally Next, the New Delhi digital marketing agency founded in 2010. She runs its operations and its hiring, and is building its AI Decision and Acceleration Center.",
  facts: ["F192", "F031", "F010", "F002", "F110", "F111", "F012", "F011"],
};

export const story: Section & { paragraphs: readonly Para[] } = {
  id: "story",
  eyebrow: "Her story",
  title: "Learning, hiring, then running the agency.",
  facts: ["F031", "F012", "F010"],
  // Five paragraphs only (spec 4.2.2). Quoted fragments render as <q>.
  paragraphs: [
    {
      parts: [
        { text: "Manpreet's first dated title in the group is " },
        { quote: "Learning & Development" },
        { text: ", on a March 2017 press release for iSoCIAL, the digital and IoT professional community she helped build. The same signature names all three of the group's organisations: iMET Global, Digitally Next and iSoCIAL." },
      ],
      facts: ["F031", "F017", "F124"],
    },
    {
      parts: [
        { text: "By January 2018 she was posting Digitally Next's roles under her own name, and from February 2023 to August 2024 every Digitally Next listing on Cutshort was posted by her. Her LinkedIn headline today reads: " },
        { quote: "Building AI Decision and Acceleration Center @Digitally Next | Heading Talent Acquisition for - Digital | AI | Data" },
        { text: "." },
      ],
      facts: ["F032", "F038", "F012", "F011"],
    },
    {
      parts: [
        { text: "In 2019 she led admissions counselling and outreach for iMET Global, the group's School of Digital Social Media & IoT, writing about skilling and freedom at work and signing off " },
        { quote: "Happy Learning & Growing :)" },
        { text: ". By July 2021 she was listed on mba.com as the school's application contact." },
      ],
      facts: ["F034", "F062", "F157", "F036", "F016"],
    },
    {
      parts: [
        { text: "On the client side, she has written about a three-year relationship with a client in Jerusalem, Digitally Next's first Israeli client: 5+ websites launched, 6+ brand activations, and personal branding and digital PR for four artists across the US, Europe and the Middle East." },
      ],
      facts: ["F037", "F195"],
    },
    SHOW_DIRECTORSHIP
      ? {
          parts: [
            { text: "In 2024 she became a director of BFG Market Consult Pvt Ltd, the company behind Digitally Next. As Chief Operating Officer she now runs the agency's operations and talent acquisition, and is building its AI Decision and Acceleration Center." },
          ],
          facts: ["F013", "F193", "F110", "F010", "F011"],
        }
      : {
          parts: [
            { text: "As Chief Operating Officer she runs the agency's operations and talent acquisition, and is building its AI Decision and Acceleration Center." },
          ],
          facts: ["F010", "F011"],
        },
  ],
};

const DIRECTOR_2024: TimelineEntry = {
  id: "2024",
  year: "2024",
  title: "Director, BFG Market Consult Pvt Ltd",
  body: { parts: [{ text: "Appointed a director of the company behind Digitally Next." }], facts: ["F013", "F193", "F110"] },
  // No source link: registry aggregators are not linked.
  facts: ["F013", "F193", "F110"],
};

export const journey: Section & { entries: readonly TimelineEntry[] } = {
  id: "journey",
  eyebrow: "Journey",
  title: "Milestones, 2016 to now.",
  lede: "Most entries link to their source.",
  facts: ["F031", "F032", "F036", "F037"],
  // Oldest first. Every entry is a Disclosure; the last one ("Now") opens by default.
  entries: [
    {
      id: "2016",
      year: "2016",
      title: "Earliest article on LinkedIn",
      body: { parts: [{ text: "A summary of the opening of Make in India Week in Mumbai: her earliest public writing." }], facts: ["F060"] },
      sources: [{ label: "LinkedIn article", href: "https://www.linkedin.com/pulse/great-start-makeinindiamumbai-manpreet-jangra" }],
      facts: ["F060"],
    },
    {
      id: "2017",
      year: "2017",
      title: "Learning & Development, across the group",
      body: {
        parts: [
          { text: "Signs an iSoCIAL press release as " },
          { quote: "Learning & Development | iMET Global | Digitally Next | iSoCIAL" },
          { text: ", and writes on LinkedIn about iSoCIAL bridging the industry-academia gap." },
        ],
        facts: ["F031", "F061", "F017"],
      },
      sources: [{ label: "LinkedIn article", href: "https://www.linkedin.com/pulse/revolutionizing-e-commercedigital-social-media-manpreet-jangra" }],
      facts: ["F031", "F061", "F017"],
    },
    {
      id: "2018",
      year: "2018",
      title: "Recruiting for Digitally Next, and iSoCIAL's IoT community",
      body: {
        parts: [{ text: "Posts the agency's roles on Instahyre under her own name, and is the face of iSoCIAL's video launching its IoT community." }],
        facts: ["F032", "F012", "F033"],
      },
      sources: [{ label: "iSoCIAL video", href: "https://youtu.be/5SonbCI4ZVk" }],
      facts: ["F032", "F012", "F033"],
    },
    {
      id: "2019",
      year: "2019",
      title: "Admissions and outreach, iMET Global",
      body: {
        parts: [
          { text: "Writes " },
          { quote: "We need to find our own #Freedom" },
          { text: ", on what professionals want to be free from at work, and promotes iMET Global's postgraduate programme. iSoCIAL presents her as " },
          { quote: "Digital Talent Acquisition" },
          { text: "." },
        ],
        facts: ["F034", "F062", "F035", "F016"],
      },
      // No live source: the LinkedIn article now returns 404.
      facts: ["F034", "F062", "F035", "F016"],
    },
    {
      id: "2021",
      year: "2021",
      title: "Application contact, iMET Global",
      body: {
        parts: [{ text: "By July 2021, listed on mba.com as the application contact for iMET Global's School of Digital Social Media & IoT." }],
        facts: ["F036", "F016"],
      },
      sources: [{ label: "mba.com", href: "https://www.mba.com/explore-programs/choose-and-compare-programs/imet-global" }],
      facts: ["F036", "F016"],
    },
    {
      id: "2022",
      year: "2022",
      title: "Three years with a client in Jerusalem",
      body: {
        parts: [{ text: "Writes about Digitally Next's first Israeli client, in luxury, lifestyle and art: 5+ websites launched, 6+ brand activations, personal branding and digital PR for four artists." }],
        facts: ["F037", "F195"],
      },
      sources: [{ label: "LinkedIn post", href: "https://www.linkedin.com/posts/manpreetjangraofficial_global-clients-digitally-next-activity-6974705681685753856-dUdR" }],
      facts: ["F037", "F195"],
    },
    {
      id: "2023-2024",
      year: "2023-2024",
      title: "Every Cutshort listing in her name",
      body: {
        parts: [{ text: "From February 2023 to August 2024, each Digitally Next role on Cutshort, from Digital Project Manager to Visual Treat Creator, was posted by her." }],
        facts: ["F038", "F012"],
      },
      sources: [{ label: "Cutshort", href: "https://cutshort.io/company/digitally-next-47-LkawMqgJ" }],
      facts: ["F038", "F012"],
    },
    ...(SHOW_DIRECTORSHIP ? [DIRECTOR_2024] : []),
    {
      id: "2026",
      year: "2026",
      title: "Featured by Women Entrepreneurs Review",
      body: {
        parts: [{ text: "One of six women leaders in the magazine's Independence Day 2026 feature on patriotism, purpose and building India's future." }],
        facts: ["F100", "F197"],
      },
      sources: [{ label: "Women Entrepreneurs Review", href: WER }],
      facts: ["F100", "F197"],
    },
    {
      id: "now",
      year: "Now",
      since: COO_SINCE,
      title: "Chief Operating Officer, Digitally Next",
      body: {
        parts: [
          { text: "Runs the agency's operations and talent acquisition, and is building its AI Decision and Acceleration Center. Her Instagram bio: " },
          { quote: "COO @digitallynext @imet.global Digital | AI | Good Life" },
          { text: "." },
        ],
        facts: ["F010", "F011", "F012", "F005"],
      },
      sources: [
        { label: "Women Entrepreneurs Review", href: WER },
        { label: "Instagram", href: "https://www.instagram.com/manpreetjangraofficial/" },
      ],
      facts: ["F010", "F011", "F012", "F005"],
    },
  ],
};

export const beliefs: Section & { quote: QuoteRef<QuoteId>; paraphrase: SourcedText; link: SourcedLink } = {
  id: "beliefs",
  eyebrow: "What drives her",
  title: "Independence begins in the mind.",
  facts: ["F150"],
  quote: { quote: "wer-quietly" },
  // The magazine's paraphrase: never in quotation marks, the magazine named (F102).
  paraphrase: {
    text: "Women Entrepreneurs Review summed up her goal as contributing to an environment where women feel empowered to build without constantly negotiating limitations that were never truly theirs to begin with.",
    facts: ["F102"],
  },
  link: { label: "Read the feature", href: WER, external: true, facts: ["F100"] },
};

export const education: Section & { entries: readonly EducationEntry[] } = {
  id: "education",
  eyebrow: "Education",
  title: "Physics first, then management.",
  facts: ["F050", "F051"],
  // Right column: `{institution}, {year}`, showing only the confirmed parts;
  // empty (no fallback text) while neither is confirmed.
  entries: [
    {
      degree: "B.Sc. (Hons) Physics",
      institution: "University of Delhi",
      year: "{{CONFIRM: year of your B.Sc. (Hons) Physics}}", // C2
      facts: ["F050"],
    },
    {
      degree: "MBA in HR & Marketing",
      institution: "{{CONFIRM: MBA institution}}", // C3
      year: "{{CONFIRM: MBA year}}", // C3
      facts: ["F051"],
    },
  ],
};

const BIO_FACTS: readonly FactId[] = ["F010", "F002", "F110", "F111", "F013", "F012", "F011", "F016", "F017", "F192"];

export const bio: Section & {
  text: string;
  withoutDirectorship: string;
  copy: { label: string; doneLabel: string; failLabel: string };
  link: { label: string; href: "/contact" };
} = {
  id: "bio",
  eyebrow: "Bio for organisers",
  title: "A short bio you can use.",
  text: "Manpreet Jangra is Chief Operating Officer of Digitally Next, a New Delhi digital marketing agency founded in 2010, and a director of BFG Market Consult Pvt Ltd, the company behind it. She leads the agency's operations and talent acquisition and is building its AI Decision and Acceleration Center. She has worked across the group, including iMET Global and iSoCIAL, for nearly a decade.",
  // Shown (and copied) when SHOW_DIRECTORSHIP is false.
  withoutDirectorship:
    "Manpreet Jangra is Chief Operating Officer of Digitally Next, a New Delhi digital marketing agency founded in 2010. She leads the agency's operations and talent acquisition and is building its AI Decision and Acceleration Center. She has worked across the group, including iMET Global and iSoCIAL, for nearly a decade.",
  facts: SHOW_DIRECTORSHIP ? BIO_FACTS : BIO_FACTS.filter((id) => id !== "F013"),
  copy: { label: "Copy bio", doneLabel: "Bio copied.", failLabel: "Select the text above to copy it." },
  link: { label: "For a photo or a longer bio, get in touch", href: "/contact" },
};
