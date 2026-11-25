"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Renders its children on every page except the ones in `paths` (the
// contact band of the colophon is left out on Writing, Careers and Contact,
// as on the classic site: Writing and Careers end with their own call to
// action, and Contact is the place the band points to).
export function HiddenOn({ paths, children }: { paths: readonly string[]; children: ReactNode }) {
  return paths.includes(usePathname()) ? null : children;
}
