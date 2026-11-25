"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// The footer's call to action, left out on the page it links to (Contact:
// the form right above is the conversation, so the footer does not offer a
// pill to the same page). A pathname check, not a `.v2:has(...)` rule, which
// would restyle the whole page on every DOM change inside .v2.
export function FooterCta({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === href) return null;
  return <div className="v2-footer-cta">{children}</div>;
}
