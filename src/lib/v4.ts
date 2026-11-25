import type { Metadata } from "next";
import type { PageMeta } from "@/content/types";
import { pageMetadata } from "./site";

/** Metadata for a /v4 page (plan/versions-spec.md 1): the classic page's
 *  title, description and sharing tags, a canonical link to the matching
 *  /v1 page (`pageMetadata` builds it from `meta.path`), and robots
 *  noindex, follow, since /v4 is another edition of the same content. */
export function v4Metadata(meta: PageMeta): Metadata {
  return { ...pageMetadata(meta), robots: { index: false, follow: true } };
}
