import type { InternalHref, LinkCopy, Section, Sourced, SourcedLink, SourcedText } from "./types";

// Copy for the blocks shared by several pages: the footer (spec 3.4), the
// contact band (spec 3.6) and the 404 page (spec 4.7). Server components only.
// The footer links and social profiles are in navigation.ts.

export const footer: {
  wordmark: string;
  role: SourcedText;
  place: Sourced & { prefix: string };
  siteHeading: string;
  elsewhereHeading: string;
  /** "© {year} Manpreet Jangra. ..." with {year} = new Date().getFullYear() at build. */
  credit: SourcedText;
} = {
  wordmark: "Manpreet Jangra",
  role: { text: "Chief Operating Officer, Digitally Next", facts: ["F010"] },
  // LocalTime: the server renders "New Delhi · IST" and the time fills in on the client.
  place: { prefix: "New Delhi · IST", facts: ["F002"] },
  siteHeading: "Site",
  elsewhereHeading: "Elsewhere",
  credit: {
    text: "© {year} Manpreet Jangra. Portrait (2019): iSoCIAL. The textures behind headings and quotes are generated images, not photographs.",
    facts: ["F214"],
  },
};

/** Contact band on Home, About and Work (not on Writing, Careers or Contact). */
export const contactBand: Section & { primary: LinkCopy & { href: InternalHref }; secondary: SourcedLink } = {
  id: "contact",
  eyebrow: "Contact",
  title: "Start a conversation.",
  lede: "For partnerships with Digitally Next, invitations to speak, press, or careers.",
  facts: ["F010"],
  primary: { label: "Get in touch", href: "/contact" },
  secondary: {
    label: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/manpreetjangraofficial/",
    external: true,
    facts: ["F170"],
  },
};

/** 404 page (spec 4.7); its picture is `introImages.notFound`. */
export const notFound: {
  title: string;
  eyebrow: string;
  heading: string;
  lede: string;
  back: LinkCopy & { href: "/" };
  links: readonly (LinkCopy & { href: InternalHref })[];
} = {
  title: "Page not found",
  eyebrow: "404",
  heading: "This page is not here.",
  lede: "The link may be old or mistyped. Start again from the home page, or go straight to her story, her writing or the open roles.",
  back: { label: "Back to home", href: "/" },
  links: [
    { label: "About", href: "/about" },
    { label: "Writing", href: "/writing" },
    { label: "Careers", href: "/careers" },
  ],
};

/** The Hiring pill on Home and Careers (spec 4.1.6, 6.6): "Hiring now · 28 open
 *  roles", counted from roles.ts with plural(). Hidden when there are no roles. */
export const hiringPill: Sourced & { prefix: string; one: string; many: string } = {
  prefix: "Hiring now · ",
  one: "1 open role",
  many: "{n} open roles",
  facts: ["F196", "F140"],
};
