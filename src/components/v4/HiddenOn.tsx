"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Renders its children on every page except the one at `path` (the contact
// band of the colophon is left out on Contact itself, as on the classic
// site, where Contact has no contact band).
export function HiddenOn({ path, children }: { path: string; children: ReactNode }) {
  return usePathname() === path ? null : children;
}
