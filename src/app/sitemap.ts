import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "@/lib/site";

// Served at /sitemap.xml (spec 9.3). The pages come from ROUTES in
// src/lib/site.ts, so a page added there is listed here automatically. The
// date is the build date: the site changes only when it is rebuilt.
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));
}
