"use client";
import Link from "next/link";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import type { NavItem } from "@/content/types";
import { PillButton } from "./PillButton";
import { lockScroll } from "./SmoothScroll";

// The /v2 header and its full-screen menu (plan/v2-spec.md 3.3, 3.4).
//
// Header: fixed and transparent; the stacked wordmark on the left, a
// Contact pill and a square menu button on the right (Lando's Store pill and
// menu button). Its colours follow the surface under it: every /v2 surface
// says `data-v2-theme="paper"` or `"night"`, and on each scroll frame the
// header asks which surface sits under its middle (elementsFromPoint, so a
// pinned panel counts as well), then switches its theme with a 0.4 s colour
// transition. It hides after 120 px of scrolling down and returns on the way
// up; never while it holds keyboard focus or the menu is open. Away from the
// top (`is-away`) it keeps its buttons clear of the content: phones and
// tablets drop the wordmark (Lando's two square buttons), desktop lays a
// soft scrim of the surface's own colour under it.
//
// Menu: a modal dialog (role dialog, aria-modal) over the whole page, on
// night: four pictures on the left, the pages in huge uppercase on the right
// with the current one struck through by a marigold thread, the foot (built
// on the server) below. Opening it stops the page scrolling (Lenis stop, or
// overflow hidden without Lenis), makes everything behind it inert, keeps Tab
// inside it and moves focus to its close button; Escape or the close button
// shuts it and puts focus back on the menu button. A link to another page
// keeps it closed over the old page until the new one is in, then it
// retracts over the new page; every other link closes it at once.
//
// The links and labels arrive as props from the server layout, so this file
// imports no content.

function isCurrent(pathname: string, href: string) {
  if (href === "/v2") return pathname === "/v2";
  return pathname === href || pathname.startsWith(href + "/");
}

type Theme = "paper" | "night";

function MenuGlyph() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" focusable="false">
      <path d="M7 2.5h10M1 9.5h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Wordmark({ first, last, label }: { first: string; last: string; label: string }) {
  return (
    <Link href="/v2" className="v2-wordmark" aria-label={label}>
      {/* The space keeps the two words apart for screen readers and copy;
          as a grid item it takes no room. */}
      <span className="v2-serif">{first}</span> <span className="v2-sans">{last}</span>
    </Link>
  );
}

export function V2Header({
  nav,
  wordmark,
  contact,
  labels,
  menuTiles,
  menuFoot,
}: {
  nav: readonly NavItem[];
  wordmark: { first: string; last: string; label: string };
  contact: NavItem;
  labels: { openMenu: string; closeMenu: string; menu: string };
  /** The four pictures on the left of the open menu (server-rendered). */
  menuTiles: ReactNode;
  /** Under the links: her profiles, the contact line, the classic site. */
  menuFoot: ReactNode;
}) {
  const pathname = usePathname();
  // The page the menu was opened on: it is open only while that page is
  // shown, so arriving on a new page closes it (derived, no effect).
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);
  const [view, setView] = useState<{ pathname: string; hidden: boolean; away: boolean; theme: Theme }>({
    pathname,
    hidden: false,
    away: false,
    theme: "paper",
  });
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const closer = useRef<HTMLButtonElement>(null);
  // Set when the menu closes by Escape or its close button: focus goes back
  // to the menu button once the header is no longer inert.
  const returnFocus = useRef(false);

  // Hide on the way down, show on the way up, and follow the surface below.
  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    let directionStartY = previousY;
    let direction = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = header.current;
      if (!el) return;
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const y = Math.min(maxY, Math.max(0, window.scrollY));
      const delta = y - previousY;
      const nextDirection = delta === 0 ? direction : Math.sign(delta);
      if (nextDirection !== direction) {
        directionStartY = previousY;
        direction = nextDirection;
      }
      previousY = y;
      const focused = el.contains(document.activeElement) && document.activeElement?.matches(":focus-visible");
      // The surface under the middle of the header.
      const probeY = el.offsetHeight / 2;
      let theme: Theme = "paper";
      const away = y > 120;
      // Desktop scrim: the first solid background under the header's
      // middle (paper, sand, blush, night), read only away from the top.
      let ground = "";
      for (const node of document.elementsFromPoint(window.innerWidth / 2, probeY)) {
        if (el.contains(node) || dialog.current?.contains(node)) continue;
        // Only a surface that spans the page counts (not a pill or a card
        // that happens to sit under the middle of the header).
        if (away && !ground && node.getBoundingClientRect().width >= window.innerWidth * 0.9) {
          const style = getComputedStyle(node);
          const colour = style.backgroundColor;
          const solid = colour && colour !== "transparent" && !/^rgba\(.*,\s*0\)$/.test(colour);
          // A fading layer (the journey track's grounds) counts once it shows.
          if (solid && Number.parseFloat(style.opacity) > 0.5) ground = colour;
        }
        const surface = node.closest<HTMLElement>("[data-v2-theme]");
        if (surface) {
          theme = surface.dataset.v2Theme === "night" ? "night" : "paper";
          if (!away || ground) break;
        }
      }
      if (ground && el.style.getPropertyValue("--v2-header-ground") !== ground) el.style.setProperty("--v2-header-ground", ground);
      setView((current) => {
        const samePage = current.pathname === pathname;
        const hidden =
          y <= 120 || open || focused
            ? false
            : Math.abs(y - directionStartY) >= 8
              ? direction > 0
              : samePage && current.hidden;
        return samePage && current.hidden === hidden && current.away === away && current.theme === theme
          ? current
          : { pathname, hidden, away, theme };
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    // Pages settle (fonts, pins) after the first frame; look again shortly.
    const late = window.setTimeout(schedule, 400);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(late);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname, open]);

  // While the menu is open: no scrolling, nothing behind it reachable, focus
  // on the close button, Escape closes.
  useEffect(() => {
    if (!open) return;
    const behind = [header.current, document.getElementById("site-content"), document.querySelector(".v2-footer")];
    const button = toggle.current;
    behind.forEach((el) => el?.setAttribute("inert", ""));
    lockScroll(true);
    closer.current?.focus();
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        returnFocus.current = true;
        setOpenOn(null);
      }
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("keydown", escape);
      behind.forEach((el) => el?.removeAttribute("inert"));
      lockScroll(false);
      if (returnFocus.current) {
        returnFocus.current = false;
        button?.focus();
      }
    };
  }, [open]);

  // Tab and Shift+Tab wrap around inside the dialog.
  const trap = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialog.current) return;
    const focusable = Array.from(
      dialog.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    ).filter((node) => node.offsetParent !== null || node === document.activeElement);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const close = () => setOpen(false);
  const closeAndReturn = () => {
    returnFocus.current = true;
    setOpen(false);
  };
  const samePage = view.pathname === pathname;
  const theme: Theme = samePage ? view.theme : "paper";
  const hidden = samePage && view.hidden && !open;
  const away = samePage && view.away && !open;

  return (
    <>
      <header
        ref={header}
        className={`v2-header${hidden ? " is-hidden" : ""}${away ? " is-away" : ""}`}
        data-v2-theme={theme}
        onFocusCapture={() => setView((current) => (current.hidden ? { ...current, hidden: false } : current))}
      >
        <Wordmark {...wordmark} />
        <div className="v2-header-actions">
          <PillButton
            href={contact.href}
            icon="mail"
            iconFirst
            className="v2-header-contact"
            ariaCurrent={isCurrent(pathname, contact.href) ? "page" : undefined}
          >
            {contact.label}
          </PillButton>
          <button
            ref={toggle}
            type="button"
            className="v2-menu-button"
            aria-label={labels.openMenu}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="v2-menu"
            onClick={() => setOpen(true)}
          >
            <MenuGlyph />
          </button>
        </div>
      </header>

      <div
        ref={dialog}
        id="v2-menu"
        className={`v2-menu${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={labels.menu}
        data-v2-theme="night"
        inert={!open}
        onKeyDown={trap}
        // A link to another page of this site keeps the menu over the old
        // page while the new one loads (it closes when the new page is in);
        // any other link (this page, a #place, a new tab, a modified click)
        // closes it at once.
        onClickCapture={(event) => {
          const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
          if (!link) return;
          const url = new URL(link.href, window.location.href);
          const plain = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
          const elsewhere =
            plain && !link.target && url.origin === window.location.origin && url.pathname !== window.location.pathname;
          if (!elsewhere) close();
        }}
      >
        <div className="v2-menu-bar">
          <Wordmark {...wordmark} />
          <div className="v2-header-actions">
            <PillButton href={contact.href} icon="mail" iconFirst className="v2-header-contact">
              {contact.label}
            </PillButton>
            <button ref={closer} type="button" className="v2-menu-button" aria-label={labels.closeMenu} onClick={closeAndReturn}>
              <X size={20} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="v2-menu-body">
          <div className="v2-menu-tiles" aria-hidden="true">
            {menuTiles}
          </div>
          <nav className="v2-menu-nav" aria-label={labels.menu}>
            <ul className="v2-menu-links">
              {nav.map((item, index) => {
                const current = isCurrent(pathname, item.href);
                return (
                  <li key={item.href} style={{ "--i": index } as CSSProperties}>
                    <Link
                      href={item.href}
                      className="v2-menu-link v2-sans"
                      aria-current={current ? "page" : undefined}
                    >
                      {item.label}
                      {current ? (
                        <svg className="v2-draw v2-menu-strike" viewBox="0 0 400 40" aria-hidden="true" focusable="false">
                          <path
                            d="M 4 22 C 40 22 52 12 86 12 C 120 12 128 28 164 28 C 200 28 210 14 244 14 C 278 14 290 26 324 26 C 352 26 372 20 396 18"
                            pathLength={1}
                            strokeWidth={5}
                          />
                        </svg>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="v2-menu-foot">{menuFoot}</div>
          </nav>
        </div>
      </div>
    </>
  );
}
