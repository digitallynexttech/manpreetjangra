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
