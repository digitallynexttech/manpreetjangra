import type { Quote, Url } from "./types";

// Every quote on the site, once (spec Appendix B). Pages refer to a quote by
// its id; the server turns it into a QuoteView with `attributionOf`
// (lib/site.ts), so an attribution is never typed per use. Text is verbatim
// from the source; quote marks come from CSS, never from this file.

const WER: Url =
  "https://www.womenentrepreneursreview.com/article/6-women-leaders-on-patriotism-purpose-and-building-india-s-future-nwid-9136.html";
const REEL_F069: Url = "https://www.instagram.com/reel/DKMtb2AP8iX/";
const VIDEO_F067: Url =
  "https://www.linkedin.com/posts/manpreetjangraofficial_digitalcampaigns-socialmedia-digitalstrategy-activity-7325506214388191234-PPDr";
const INTERNS_F070: Url = "https://www.instagram.com/p/DLg-rnoPR7c/";
const POST_F037: Url =
  "https://www.linkedin.com/posts/manpreetjangraofficial_global-clients-digitally-next-activity-6974705681685753856-dUdR";
const POST_F066: Url =
  "https://www.linkedin.com/posts/manpreetjangraofficial_mjs-tips-to-build-linkedin-personal-brand-activity-7079709288167858176-7R6d";
const CUTSHORT: Url = "https://cutshort.io/company/digitally-next-47-LkawMqgJ";

export const quotes = {
  "wer-independence": {
    id: "wer-independence",
    text: "I have always believed that independence begins in the mind. Every time I see a woman stop editing her ambition to fit someone else's expectations, take a risk, build something of her own or simply give herself permission to pursue a bigger dream, I see a larger idea of India's independence taking shape.",
    speaker: "Manpreet Jangra",
    source: "Women Entrepreneurs Review",
    dateLabel: "August 2026",
    date: "2026-08",
    href: WER,
    facts: ["F150", "F100"],
  },
  "wer-quietly": {
    id: "wer-quietly",
    text: "What makes these moments particularly meaningful is that the change often begins quietly. A woman who once doubted herself starts making decisions with confidence; someone who believed certain opportunities were not meant for her begins exploring them.",
    speaker: "Manpreet Jangra",
    source: "Women Entrepreneurs Review",
    dateLabel: "August 2026",
    date: "2026-08",
    href: WER,
    facts: ["F100", "F150"],
  },
  "wer-transformation": {
    id: "wer-transformation",
    text: "That transformation stays with me because it represents a form of freedom that cannot be measured by headlines or milestones. For me, witnessing women unlock that sense of possibility has been deeply patriotic because every woman who realises her potential adds to the strength and possibilities of the country.",
    speaker: "Manpreet Jangra",
    source: "Women Entrepreneurs Review",
    dateLabel: "August 2026",
    date: "2026-08",
    href: WER,
    facts: ["F100", "F150"],
  },
  // Writing, Featured: the attribution is not shown (the block names the outlet).
  "wer-defining-role": {
    id: "wer-defining-role",
    text: "I believe women will play a defining role in that future. We are already seeing women build businesses, enter emerging fields such as AI and digital technology, create solutions in healthcare and sustainability, and take Indian ideas and enterprises to the world. They are no longer simply participating in India's growth story; they are helping write it.",
    speaker: "Manpreet Jangra",
    source: "Women Entrepreneurs Review",
    dateLabel: "August 2026",
    date: "2026-08",
    href: WER,
    facts: ["F100", "F150"],
  },
  "wer-empathy": {
    id: "wer-empathy",
    text: "I also believe the next phase of India's growth needs leaders who combine ambition with purpose, and vision with empathy.",
    theme: "Leadership",
    speaker: "Manpreet Jangra",
    source: "Women Entrepreneurs Review",
    dateLabel: "August 2026",
    date: "2026-08",
    href: WER,
    facts: ["F151", "F100"],
  },
  "reel-vendors": {
    id: "reel-vendors",
    text: "Because we're not vendors. We're your team.",
    source: "Instagram reel caption",
    dateLabel: "28 May 2025",
    date: "2025-05-28",
    href: REEL_F069,
    facts: ["F069", "F154"],
  },
  "reel-babysit": {
    id: "reel-babysit",
    text: "Why Brands Drop Agencies? Because no one wants to babysit someone they hired to lead.",
    theme: "Ownership",
    source: "Instagram reel caption",
    dateLabel: "28 May 2025",
    date: "2025-05-28",
    href: REEL_F069,
    facts: ["F069", "F154"],
  },
  "video-smarter": {
    id: "video-smarter",
    text: "It is not about shouting louder, it is about speaking smarter.",
    source: "LinkedIn video",
    dateLabel: "6 May 2025",
    date: "2025-05-06",
    href: VIDEO_F067,
    facts: ["F067", "F155"],
  },
  "video-audience": {
    id: "video-audience",
    text: "It's high time we start knowing our audience beyond just numbers, start creating content which they really care about, and build conversations.",
    theme: "Audience over algorithm",
    source: "LinkedIn video",
    dateLabel: "6 May 2025",
    date: "2025-05-06",
    href: VIDEO_F067,
    facts: ["F067", "F155"],
  },
  "interns-labels": {
    id: "interns-labels",
    text: "Thank you for proving that labels lie. And for reminding me why mentorship truly matters.",
    theme: "Mentorship",
    source: "Instagram",
    dateLabel: "29 June 2025",
    date: "2025-06-29",
    href: INTERNS_F070,
    facts: ["F070", "F152"],
  },
  // Used as the Careers H1; the attribution is not shown.
  "interns-mentor": {
    id: "interns-mentor",
    text: "A mentor, not a manager. A chance, not a checklist.",
    source: "Instagram",
    dateLabel: "29 June 2025",
    date: "2025-06-29",
    href: INTERNS_F070,
    facts: ["F070", "F152"],
  },
  trust: {
    id: "trust",
    text: "Trust and Credibility precede skills and talent",
    source: "LinkedIn",
    dateLabel: "11 September 2022",
    date: "2022-09-11",
    href: POST_F037,
    facts: ["F156"],
  },
  language: {
    id: "language",
    text: "Language is not a Barrier when you have an ability to understand business goals and know how to translate them into an effective implementation plan.",
    theme: "Working across borders",
    source: "LinkedIn",
    dateLabel: "11 September 2022",
    date: "2022-09-11",
    href: POST_F037,
    facts: ["F156"],
  },
  socialmedia: {
    id: "socialmedia",
    text: "People evolve and so does the #socialmedia! Keeping ourselves abreast with the latest algorithms, can help to increase your brand's reach on #LinkedIn, and other social media as well!",
    theme: "Personal branding",
    source: "LinkedIn post",
    dateLabel: "28 June 2023",
    date: "2023-06-28",
    href: POST_F066,
    facts: ["F066"],
  },
  "jd-process": {
    id: "jd-process",
    text: "Strategy, Plan and Process make a digital campaign more effective to perform better. Only operational understanding or knowledge of tools won't give any results any more",
    source: "From a Digitally Next job post",
    dateLabel: "2023",
    date: "2023",
    href: CUTSHORT,
    facts: ["F143"],
  },
} as const satisfies Record<string, Quote>;

export type QuoteId = keyof typeof quotes;
