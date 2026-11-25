import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "@/lib/site";
import { toV1 } from "@/lib/versions";

// Served at /sitemap.xml (spec 9.3). The pages come from ROUTES in
// src/lib/site.ts, so a page added there is listed here automatically, at its
// /v1 address: the classic edition is the one search engines index (the
// editions index at / and /v2 to /v5 are noindex, plan/versions-spec.md 2.3).
// The date is the build date: the site changes only when it is rebuilt.
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${toV1(path)}`,
    lastModified: new Date(),
  }));
}
