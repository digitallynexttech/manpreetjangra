"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// "Classic site": the same page in the classic edition (/v2/careers goes to
// /v1/careers). Not prefetched: most visitors stay in this edition.
export function ClassicLink({ className, children }: { className?: string; children: ReactNode }) {
  const pathname = usePathname() ?? "/v2";
  const href = pathname.replace(/^\/v2(?=\/|$)/, "/v1");
  return (
    <Link className={className} href={href.startsWith("/v1") ? href : "/v1"} prefetch={false}>
      {children}
    </Link>
  );
}
