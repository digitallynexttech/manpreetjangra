import type { Metadata } from "next";
import type { PageMeta } from "@/content/types";
import { pageMetadata } from "./site";

/** Metadata for a /v5 page (plan/versions-spec.md 1): the classic page's
 *  title, description and sharing tags, its canonical link pointing at the
 *  matching /v1 page (`pageMetadata` builds it from `meta.path`), and robots
 *  noindex, follow, since /v5 is another edition of the same content. */
export function v5Metadata(meta: PageMeta): Metadata {
  return { ...pageMetadata(meta), robots: { index: false, follow: true } };
}

/** Splits `text` around its accent phrase, for headings that colour one
 *  phrase ("How the agency runs, who joins it, and where AI fits."). The
 *  letters are never changed; without a match the text comes back whole. */
export function splitAccent(text: string, accent?: string): { before: string; accent: string; after: string } {
  const at = accent ? text.indexOf(accent) : -1;
  if (!accent || at < 0) return { before: text, accent: "", after: "" };
  return { before: text.slice(0, at), accent, after: text.slice(at + accent.length) };
}
