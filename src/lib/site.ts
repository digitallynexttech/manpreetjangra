import type { Metadata } from "next";
import type { PageMeta, Quote } from "@/content/types";

// Only types are imported from src/content, so importing this file never pulls
// content data or placeholders into a client bundle (spec 7.4).

// The site's public address. Canonical links, the sitemap and share links use
// it. The domain is not registered yet (CONTENT-REVIEW F): set
// NEXT_PUBLIC_SITE_URL to the preview address until it is.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://manpreetjangra.com").replace(/\/$/, "");
export const SITE_NAME = "Manpreet Jangra";
// Shown when a page is shared: a 1200x630 render of the home hero.
export const SOCIAL_IMAGE = { url: "/social-card.jpg", width: 1200, height: 630, alt: "Manpreet Jangra, Chief Operating Officer, Digitally Next" };
export const ROUTES = ["/", "/about", "/work", "/writing", "/careers", "/contact"] as const;

const WER_URL =
  "https://www.womenentrepreneursreview.com/article/6-women-leaders-on-patriotism-purpose-and-building-india-s-future-nwid-9136.html";

/**
 * Builds the browser title, description, canonical link and sharing tags for
 * one page. Every page needs its own sharing tags: a page that sets only a
 * title would otherwise be shared with the homepage's title and address.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  image = SOCIAL_IMAGE,
}: PageMeta & { image?: typeof SOCIAL_IMAGE }): Metadata {
  const sharedTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`;
  // One absolute address for both tags, so the canonical link and og:url
  // always match (for home Next prints "https://manpreetjangra.com" in both,
  // as the sitemap does).
  const url = new URL(path, SITE_URL).toString();
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      siteName: SITE_NAME,
      title: sharedTitle,
      description,
      url,
      type: "website",
      locale: "en_IN",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: sharedTitle,
      description,
      images: [image.url],
    },
  };
}

/** JSON-LD Person (spec 9.4). [F001, F010, F110, F111, F002, F011, F012, F170, F171, F100, F214] */
export function personJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Manpreet Jangra",
    url: SITE_URL,
    // Her photo (the 2019 cut-out), not the social card, which is a screenshot of a page.
    image: `${SITE_URL}/images/portrait/manpreet-2019-cutout.png`,
    jobTitle: "Chief Operating Officer",
    worksFor: {
      "@type": "Organization",
      name: "Digitally Next",
      legalName: "BFG Market Consult Private Limited",
      url: "https://www.digitallynext.com/",
      foundingDate: "2010",
    },
    address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
    knowsAbout: ["Agency operations", "Talent acquisition", "Digital marketing", "Artificial intelligence"],
    sameAs: ["https://www.linkedin.com/in/manpreetjangraofficial/", "https://www.instagram.com/manpreetjangraofficial/"],
    subjectOf: {
      "@type": "Article",
      headline: "6 Women Leaders On Patriotism, Purpose And Building India's Future",
      url: WER_URL,
      publisher: { "@type": "Organization", name: "Women Entrepreneurs Review" },
    },
  };
}

/** JSON-LD WebSite (spec 9.4). */
export function websiteJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Manpreet Jangra",
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}

/** Every count on the site goes through this. "{n}" in `one`/`many`/`none` is replaced by n.
 *  n === 0 and `none` given -> none; n === 1 -> one; otherwise many. */
export function plural(n: number, one: string, many: string, none?: string): string {
  const form = n === 0 && none !== undefined ? none : n === 1 ? one : many;
  return form.replaceAll("{n}", String(n));
}

const longDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

/** "2026-11-23" -> "23 November 2026". Used for every "as of" caption (proof row, Careers roles).
 *  The spaces are no-break spaces, so a date never splits across two lines. */
export function formatLongDate(iso: string): string {
  return longDate.format(new Date(`${iso}T12:00:00Z`)).replaceAll(" ", " ");
}

/** Quote attribution, the single rule from 7.3. Inside each part (speaker,
 *  source, date) the spaces are no-break spaces, so a line breaks only after
 *  a comma ("Manpreet Jangra," / "Women Entrepreneurs Review, August 2026"). */
export function attributionOf(q: Pick<Quote, "speaker" | "source" | "dateLabel">): string {
  return [q.speaker, q.source, q.dateLabel]
    .filter((part): part is string => Boolean(part))
    .map((part) => part.replaceAll(" ", " "))
    .join(", ");
}

/** Department and group names are stored as listed ("BSG - Business Support
 *  Group") and displayed with a middle dot ("BSG · Business Support Group"). */
export function displayName(name: string): string {
  return name.replaceAll(" - ", " · ");
}
