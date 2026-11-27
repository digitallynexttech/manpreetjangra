import type { Confirm, Intro, PageMeta, Sourced, SourcedText } from "./types";
import { isConfirmed } from "./types";

// Contact page (spec 4.6). Voice: first person. The form prepares an email
// draft in the visitor's own email app; nothing is sent from the site.

export const meta: PageMeta = {
  title: "Contact",
  description: "Contact Manpreet Jangra for partnerships with Digitally Next, speaking invitations, press and careers.",
  path: "/contact",
  facts: ["F010", "F181"],
};

export const intro: Intro = {
  eyebrow: "Contact",
  title: "Start a conversation.",
  lede: "For partnerships with Digitally Next, invitations to speak, press, or careers. Your message is prepared as an email to the Digitally Next team, marked for my attention.",
  facts: ["F010", "F181"],
};

/** Addresses. general [F181], careers [F144]. directEmail is C7
 *  (CONTENT-REVIEW A7): once confirmed, every enquiry except careers goes to
 *  her own address instead of contact@. */
const CONTACT: { general: string; careers: string; directEmail: string | Confirm } = {
  general: "contact@digitallynext.com",
  careers: "careers@digitallynext.com",
  directEmail: "{{CONFIRM: your own @digitallynext.com address, if enquiries should reach you directly}}",
};

// Resolved here, on the server: the form only ever receives final addresses.
const enquiryRecipient = isConfirmed(CONTACT.directEmail) ? CONTACT.directEmail : CONTACT.general;

/** The "What is it about?" options, with the address each one goes to.
 *  Plain view props for the client EnquiryForm (no facts, no placeholders). */
export const enquiryTypes: readonly { key: "partnership" | "speaking" | "press" | "careers" | "other"; label: string; recipient: string }[] = [
  { key: "partnership", label: "Partnership or client work", recipient: enquiryRecipient },
  { key: "speaking", label: "Speaking, panels or events", recipient: enquiryRecipient },
  { key: "press", label: "Press and interviews", recipient: enquiryRecipient },
  { key: "careers", label: "Careers and internships", recipient: CONTACT.careers },
  { key: "other", label: "Something else", recipient: enquiryRecipient },
];

/** Office lines for the details column [F112]. */
export const office: Sourced & { title: string; lines: readonly string[] } = {
  title: "Office",
  lines: ["Digitally Next", "Business India Complex, Uday Park", "New Delhi 110049"],
  facts: ["F112"],
};

/** The rest of the details column (spec 4.6.2). The social rows come from
 *  `socialLinks` in navigation.ts; the time from the LocalTime component. */
export const details: {
  elsewhere: Sourced & { title: string };
  localTime: Sourced & { title: string; prefix: string };
  careers: Sourced & { title: string; text: SourcedText; email: string };
} = {
  elsewhere: { title: "Elsewhere", facts: ["F170", "F171"] },
  localTime: { title: "Local time", prefix: "New Delhi · IST", facts: ["F002"] },
  careers: {
    title: "Careers",
    text: { text: "Applications go to careers@digitallynext.com.", facts: ["F144"] },
    email: "careers@digitallynext.com",
    facts: ["F144"],
  },
};

/** Copy for the enquiry form and its draft panel (spec 4.6.2). Plain
 *  strings with no facts or placeholders, so the page may pass it to the
 *  client EnquiryForm as a prop. "{recipient}" is replaced by the address. */
export const form = {
  title: "Tell me a little about it.",
  fields: {
    name: { label: "Full name", placeholder: "Your full name", maxLength: 120, required: true },
    email: { label: "Email address", placeholder: "you@company.com", maxLength: 254, required: true },
    organisation: { label: "Organisation", placeholder: "Company, college or publication", maxLength: 160, required: false },
    type: { label: "What is it about?", placeholder: "Choose one", required: true },
    message: {
      label: "Your message",
      placeholder: "A few lines on what you have in mind, with dates if there are any.",
      maxLength: 1800,
      rows: 6,
      required: true,
    },
  },
  requiredMessage: "Please fill in this field.",
  note: "Your details stay in your browser. Nothing is sent until you send the email from your own email app.",
  submit: "Prepare email",
  draft: {
    title: "Your email is ready.",
    text: "Check it, then open it in your email app to send. It goes to {recipient}.",
    open: "Open email draft",
    copy: "Copy draft",
    copied: "Draft copied.",
    copyFailed: "Select the draft text above to copy it.",
    greeting: "Hello Manpreet,",
    about: "About:",
    name: "Name:",
    email: "Email:",
    organisation: "Organisation:",
    // Subject: `For Manpreet Jangra: {type label} - {name}`
    subjectPrefix: "For Manpreet Jangra:",
  },
} as const;
