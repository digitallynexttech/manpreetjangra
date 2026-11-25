import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

// Same setup as the sibling Deepak Goel site (E:\deepkgoel): the development
// server writes to its own folder, so a production build (which uses the
// default `.next`, as Vercel expects) never overwrites a running dev server.
// `NEXT_DIST_DIR` can override either location.
export default function nextConfig(phase: string): NextConfig {
  return {
    distDir:
      process.env.NEXT_DIST_DIR ||
      (phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next"),
    reactCompiler: true,
    // next/image serves AVIF first, then WebP (both keep the portrait's alpha).
    images: { formats: ["image/avif", "image/webp"] },
    // The classic pages moved to /v1 when / became the editions index
    // (plan/versions-spec.md 2.2). Old links keep working through temporary
    // (302) redirects; the query string is passed on ("/contact?type=speaking"
    // opens "/v1/contact?type=speaking"). Home has none: / is the index.
    redirects: async () =>
      ["/about", "/work", "/writing", "/careers", "/contact"].map((source) => ({
        source,
        destination: `/v1${source}`,
        statusCode: 302 as const,
      })),
    turbopack: {
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },
  };
}
