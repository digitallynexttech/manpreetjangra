import type { Metadata } from "next";
import type { PageMeta } from "@/content/types";
import { pageMetadata } from "./site";

/** Metadata for a /v2 page (plan/v2-spec.md 1): the classic page's title,
 *  description and sharing tags, its canonical link pointing at the classic
 *  page (`meta.path`), and robots noindex, follow, since /v2 is another
 *  edition of the same content. */
export function v2Metadata(meta: PageMeta): Metadata {
  return { ...pageMetadata(meta), robots: { index: false, follow: true } };
}
