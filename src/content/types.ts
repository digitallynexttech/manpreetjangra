import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import type { FactId } from "./facts";

// --- Shapes from spec 7.3 ---------------------------------------------------

export type Confirm = `{{CONFIRM: ${string}}}`;
export const isConfirmed = (value: string | undefined | null): value is string =>
  typeof value === "string" && value.trim() !== "" && !value.startsWith("{{CONFIRM");
export type Sourced = { facts: readonly FactId[] };
export type Url = `https://${string}`;
export type ExternalLink = { label: string; href: Url };
export type InternalHref = `/${string}`;
export type NavItem = { label: string; href: InternalHref };
/** A paragraph made of plain text and quoted fragments, rendered as <q>. */
export type Para = Sourced & { parts: readonly ({ text: string } | { quote: string })[] };
export type Heading = { title: string; accent?: string };
export type SectionCopy = Heading & { id: string; eyebrow: string; lede?: string | Para };
export type Stat = Sourced & { value: string; label: string; href?: InternalHref; linkLabel?: string };
export type Pillar = Sourced & { index: string; title: string; body: Para; link: { label: string; href: InternalHref } };
export type TimelineEntry = Sourced & {
  id: string; year: string; since?: string | Confirm; title: string; body: Para; sources?: readonly ExternalLink[];
};
export type Quote = Sourced & {
  id: string; text: string; theme?: string;
  speaker?: "Manpreet Jangra";   // set for the WER quotes only
  source: string;                // e.g. "Women Entrepreneurs Review", "Instagram reel caption", "LinkedIn video"
  dateLabel: string;             // long form as rendered: "August 2026", "28 May 2025"
  date: string;                  // ISO, for sorting
  href?: Url;
};
/** Attribution rule (one place, lib/site.ts `attributionOf`):
 *  (quote.speaker ? quote.speaker + ", " : "") + quote.source + ", " + quote.dateLabel
 *  gives "Manpreet Jangra, Women Entrepreneurs Review, August 2026" or "Instagram reel caption, 28 May 2025". */
export type Venture = Sourced & {
  name: string; href: Url; category: string; role: string; preview: string | null; previewAlt?: string;
};
export type Role = Sourced & {
  title: string;
  // "Internships" added to the spec's union: internships have no agency group (build-notes, M2).
  group: "SMG" | "ADAC" | "AMG" | "MAP" | "HR" | "Finance" | "Internships";
  department: string;
  kind: "full-time" | "internship"; href: Url;
};
export type Article = Sourced & {
  id: string; date: string; dateLabel: string; title: string; summary: string; quote?: string; href?: Url; note?: string;
};
export type EducationEntry = Sourced & { degree: string; institution: string | Confirm; year?: string | Confirm };
export type FaqItem = Sourced & { question: string; answer: Para };
export type Gated<T> = T & { gate: readonly (string | Confirm)[] }; // renders only if every gate entry passes isConfirmed

// Gated items in writing.ts (C4, C5). Every field that needs her answer is typed `X | Confirm` and listed in `gate`.
export type EntryLevel = Gated<Sourced & {
  headline: string | Confirm; href: Url | Confirm; edition: string | Confirm; quotes: readonly string[];
  // Fixed copy around the gated fields (spec 4.4.2).
  outlet: string; summary: string; linkLabel: string;
}>; // gate: [headline, href, edition]
export type JapanSession = Gated<Sourced & {
  date: string | Confirm; venue: string | Confirm; organiser: string | Confirm; role: string | Confirm;
  href: Url | Confirm; quote: string;
  // Fixed copy around the gated fields (spec 4.4.5). `line` is the template
  // "{role}, {venue}. Organised by {organiser}."
  title: string; line: string; linkLabel: string;
}>; // gate: [date, venue, organiser, role, href]

// Home hero data (home.ts `hero`).
export type HomeHero = Sourced & {
  eyebrow: string; name: string; statement: string; accent: string;
  primary: { label: string; href: InternalHref };
  secondary: { label: string; href: InternalHref };
  secondaryEmpty: { label: string; href: InternalHref };   // "How I hire" -> "/careers#criteria", used when roles.length === 0
  credential: string;
};

// View props: built on the server, passed to components; never carry `facts` or `{{CONFIRM` strings.
export type TimelineView = { id: string; yearLabel: string; title: string; body: ReactNode; sources: { label: string; href: string }[] };
export type QuoteView = { text: string; theme?: string; attribution: string; href?: string; linkLabel?: string };
export type VentureView = { name: string; href: string; hostname: string; category: string; role: string; preview: string | null; previewAlt?: string };
export type RoleGroupView = { key: string; heading: string; count: number; roles: { title: string; department: string; href: string }[] };
export type IntroImage = { src: string; position?: string; opacity: number; start?: string };
export type Portrait = {
  src: StaticImageData;                 // from "next/image"; built by hand: { src, width, height }
  kind: "cutout" | "photo";
  alt: string;
  caption: string;
  focal?: string;                       // object-position for kind "photo"
} & Sourced;
export type PageMeta = { title: string; description: string; path: InternalHref | "/"; absoluteTitle?: boolean } & Sourced;

// --- Additions for the section objects in the page files --------------------
// The spec fixes the export names per file (7.3); these types give each
// section object a checked shape, so every `facts` array is a real FactId[].

export type MailtoHref = `mailto:${string}`;
export type Href = InternalHref | Url | MailtoHref;
/** A link with its copy. `external` links open in a new tab. */
export type LinkCopy = { label: string; href: Href; external?: boolean };
export type SourcedLink = LinkCopy & Sourced;
/** A section head (eyebrow, heading, optional accent and lede) with its facts. */
export type Section = SectionCopy & Sourced;
export type SourcedText = Sourced & { text: string };
/** The page intro of an inner page (spec 3.5); its picture is in images.ts. */
export type Intro = Sourced & { eyebrow: string; title: string; accent?: string; lede: string };
/** A quote reference by its id in quotes.ts, with an optional link label. */
export type QuoteRef<Id extends string = string> = { quote: Id; linkLabel?: string };
/** A picture with intrinsic size, kept in public/ (no static import). */
export type SizedImage = { src: string; width: number; height: number };
