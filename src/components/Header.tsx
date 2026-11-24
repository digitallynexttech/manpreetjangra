"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/content/types";
import { Button } from "./Button";

// Ported from Header() in the sibling site (E:\deepkgoel\app\components\Chrome.tsx).
// The scroll logic is the same: rAF batching, elastic overscroll clamped, 8 px
// of travel before the header hides or returns, never hidden near the top,
// while it holds keyboard focus or while the menu is open. Escape closes the
// menu and returns focus to the toggle; links close the menu.
//
// Unlike the sibling, the links arrive as props from the root layout (a
// server component), so this client file never imports content data (spec 7.5).

/** The current page, or a page inside it, marks its link (spec 2.2). */
function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header({ home, nav, cta }: { home: NavItem; nav: readonly NavItem[]; cta: NavItem }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const [scrollState, setScrollState] = useState({
    pathname,
    hidden: false,
    scrolled: false,
  });

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    let directionStartY = previousY;
    let direction = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      // Clamp elastic overscroll so bouncing at either end cannot hide the nav.
      const maxY = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const y = Math.min(maxY, Math.max(0, window.scrollY));
      const delta = y - previousY;
      const nextDirection = delta === 0 ? direction : Math.sign(delta);
      if (nextDirection !== direction) {
        directionStartY = previousY;
        direction = nextDirection;
      }
      const nearTop = y <= (header.current?.offsetHeight ?? 100);
      const focused =
        header.current?.contains(document.activeElement) &&
        document.activeElement?.matches(":focus-visible");
      setScrollState((current) => {
        const samePage = current.pathname === pathname;
        const hidden =
          nearTop || open || focused
            ? false
            : Math.abs(y - directionStartY) >= 8
              ? direction > 0
              : samePage && current.hidden;
        const scrolled = !nearTop;
        return samePage &&
          current.hidden === hidden &&
          current.scrolled === scrolled
          ? current
          : { pathname, hidden, scrolled };
      });
      previousY = y;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname, open]);

  useEffect(() => {
    if (!open) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    // The sheet exists only below lg. If the window grows past it while the
    // menu is open, close the menu, so the page is not left locked in place.
    const wide = window.matchMedia("(width >= 64rem)");
    const grow = () => {
      if (wide.matches) setOpen(false);
    };
    // The solid sheet covers the page, so the page behind it is inert while
    // the menu is open: Tab stays in the header and never lands on a link
    // nobody can see.
    const behind = [
      document.getElementById("site-content"),
      document.querySelector(".site-footer"),
    ];
    behind.forEach((el) => el?.setAttribute("inert", ""));
    document.addEventListener("keydown", escape);
    wide.addEventListener("change", grow);
    return () => {
      behind.forEach((el) => el?.removeAttribute("inert"));
      document.removeEventListener("keydown", escape);
      wide.removeEventListener("change", grow);
    };
  }, [open]);

  const close = () => setOpen(false);
  const showState = scrollState.pathname === pathname;
  const link = (item: NavItem, sheetOnly = false) => (
    <Link
      key={item.href}
      href={item.href}
      className={sheetOnly ? "site-nav-sheet-only" : undefined}
      aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
      onClick={close}
    >
      {item.label}
    </Link>
  );

  return (
    <header
      ref={header}
      className={`site-header${open ? " site-header--menu-open" : ""}${showState && scrollState.scrolled ? " is-scrolled" : ""}${showState && scrollState.hidden && !open ? " is-hidden" : ""}`}
      onFocusCapture={() =>
        setScrollState((current) =>
          current.hidden ? { ...current, hidden: false } : current,
        )
      }
    >
      <div className="site-wrap site-header-inner">
        <Link
          href="/"
          className="site-wordmark"
          aria-label="Manpreet Jangra, home"
          onClick={close}
        >
          Manpreet Jangra
        </Link>
        <div className="site-header-actions">
          <button
            type="button"
            className="site-menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-navigation"
            ref={toggle}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={24} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
          <nav
            id="site-navigation"
            className={open ? "is-open" : undefined}
            aria-label="Main"
          >
            {/* Home and Contact are sheet-only links: from lg the wordmark
                is home and the outline button is Contact. The links stay
                direct children of nav (the sheet staggers them by position). */}
            {link(home, true)}
            {nav.map((item) => link(item))}
            {link(cta, true)}
            {/* Shown from lg only, where there is no sheet to close. On
                /contact it is the current page, like the links. */}
            <span className="site-header-cta">
              <Button
                href={cta.href}
                variant="outline"
                size="compact"
                ariaCurrent={isCurrent(pathname, cta.href) ? "page" : undefined}
              >
                {cta.label}
              </Button>
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
}
