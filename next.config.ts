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
    // The site once had five editions at /v1 to /v5; the scroll edition (v2)
    // is now the site itself. Old edition links land on the same page here.
    redirects: async () => [
      { source: "/v:edition(1|2|3|4|5)", destination: "/", permanent: true },
      { source: "/v:edition(1|2|3|4|5)/:path*", destination: "/:path*", permanent: true },
    ],
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
