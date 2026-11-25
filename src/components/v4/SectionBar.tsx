"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/types";
import { V4_BASE } from "@/content/v4";

// The section bar under the masthead's double rule (plan/versions-spec.md,
// V4 navigation). It is sticky: once the masthead has scrolled away it stays
// at the top as the slim bar, where a small nameplate fades in on its left
// and a reading-progress rule fills along its foot (both CSS scroll-driven
// animations in v4.css, with static fallbacks). No menu button: on phones
// the list scrolls sideways. The current section carries aria-current.

export function SectionBar({
  items,
  name,
  initials,
  label,
  frontPage,
}: {
  items: readonly NavItem[];
  name: string;
  initials: string;
  label: string;
  frontPage: string;
}) {
  const pathname = usePathname();
  const onFront = pathname === V4_BASE;
  return (
    <nav className="v4-bar" aria-label={label}>
      <div className="v4-bar-inner">
        <Link
          className="v4-bar-name"
          href={V4_BASE}
          aria-label={`${name}, ${frontPage}`}
          aria-current={onFront ? "page" : undefined}
        >
          <span className="v4-bar-name-full" aria-hidden="true">
            {name}
          </span>
          <span className="v4-bar-name-short" aria-hidden="true">
            {initials}
          </span>
        </Link>
        <ul className="v4-bar-list">
          {items.map((item) => {
            const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link className="v4-bar-link" href={item.href} aria-current={current ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <span className="v4-bar-progress" aria-hidden="true" />
    </nav>
  );
}
