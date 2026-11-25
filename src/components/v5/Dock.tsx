"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore, type ComponentType, type MouseEvent } from "react";
import { motion } from "motion/react";
import {
  BriefcaseBusiness,
  House,
  LayoutGrid,
  Mail,
  Moon,
  PenLine,
  Sun,
  UserRound,
  UsersRound,
  type LucideProps,
} from "lucide-react";
import type { DockIcon } from "@/content/v5";
import { prefersReducedMotion } from "./media";

// The floating dock of /v5 (plan/versions-spec.md, V5 "Navigation"): a glass
// pill at the bottom centre with the six pages, the theme switch and "All
// editions". The current page sits on a highlight that slides to the new
// item on a spring when the page changes (motion's shared layout, the dock
// lives in the layout so it persists). Labels show from 1024 px; below that
// the dock is icons only and the labels stay for screen readers.
//
// Theme: light by default. The choice is kept in localStorage (wrapped in
// try/catch: private windows and blocked storage simply keep light) and set
// as `data-theme` on the `.v5` wrapper; an inline script in the layout
// applies a stored choice before the first paint. Switching uses a view
// transition where the browser has one (a circle opening from the switch),
// and a plain swap otherwise or with reduced motion.

const ICONS: Record<DockIcon, ComponentType<LucideProps>> = {
  home: House,
  about: UserRound,
  work: BriefcaseBusiness,
  writing: PenLine,
  careers: UsersRound,
  contact: Mail,
};

type Theme = "light" | "dark";
const THEME_EVENT = "v5-theme";

function readTheme(): Theme {
  return document.querySelector<HTMLElement>(".v5")?.dataset.theme === "dark" ? "dark" : "light";
}
function subscribeTheme(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function isCurrent(pathname: string, href: string, home: string) {
  return href === home ? pathname === home : pathname === href || pathname.startsWith(`${href}/`);
}

export function Dock({
  items,
  home,
  allEditions,
  themeKey,
  labels,
}: {
  items: readonly { label: string; href: string; icon: DockIcon }[];
  /** The edition's home address ("/v5"): current only on its own page. */
  home: string;
  allEditions: { label: string; href: string };
  themeKey: string;
  labels: { dock: string; darkTheme: string };
}) {
  const pathname = usePathname();
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "light" as Theme);

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const root = document.querySelector<HTMLElement>(".v5");
    if (!root) return;
    const next: Theme = theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try {
        window.localStorage.setItem(themeKey, next);
      } catch {
        // Storage blocked: the theme still changes for this visit.
      }
      window.dispatchEvent(new Event(THEME_EVENT));
    };
    if (!("startViewTransition" in document) || prefersReducedMotion()) {
      apply();
      return;
    }
    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(apply);
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 620, easing: "cubic-bezier(0.32, 0.72, 0, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => undefined);
  };

  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <nav className="v5-dock" aria-label={labels.dock}>
      <ul className="v5-dock-list">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          const current = isCurrent(pathname, item.href, home);
          return (
            <li key={item.href}>
              <Link className="v5-dock-item" href={item.href} aria-current={current ? "page" : undefined}>
                {current ? (
                  <motion.span
                    layoutId="v5-dock-current"
                    className="v5-dock-current"
                    transition={{ type: "spring", bounce: 0.28, duration: 0.55 }}
                    aria-hidden="true"
                  />
                ) : null}
                <Icon className="v5-dock-icon" size={20} strokeWidth={1.75} aria-hidden="true" />
                <span className="v5-dock-label">{item.label}</span>
              </Link>
            </li>
          );
        })}
        <li className="v5-dock-sep" aria-hidden="true" />
        <li>
          <button
            type="button"
            className="v5-dock-item v5-dock-theme"
            aria-pressed={theme === "dark"}
            onClick={toggleTheme}
          >
            <ThemeIcon className="v5-dock-icon" size={20} strokeWidth={1.75} aria-hidden="true" />
            <span className="v5-sr">{labels.darkTheme}</span>
          </button>
        </li>
        <li>
          {/* A full page load: the index has its own chrome and styles. */}
          <a className="v5-dock-item v5-dock-editions" href={allEditions.href}>
            <LayoutGrid className="v5-dock-icon" size={20} strokeWidth={1.75} aria-hidden="true" />
            <span className="v5-dock-label">{allEditions.label}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
