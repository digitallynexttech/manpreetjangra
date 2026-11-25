"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { V4_BASE } from "@/content/v4";

// The broadsheet nameplate: her name, set large across the masthead. On the
// front page (/v4) it is the page's H1; on the inner pages, whose section
// front carries the H1, it is a link back to the front page.
export function Nameplate({ name, frontPage }: { name: string; frontPage: string }) {
  const pathname = usePathname();
  if (pathname === V4_BASE) {
    return (
      <h1 className="v4-nameplate">
        <span className="v4-nameplate-text">{name}</span>
      </h1>
    );
  }
  return (
    <p className="v4-nameplate">
      <Link className="v4-nameplate-text" href={V4_BASE} aria-label={`${name}, ${frontPage}`}>
        {name}
      </Link>
    </p>
  );
}
