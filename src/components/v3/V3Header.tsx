"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

// The /v3 top bar and its full-screen chapter list (plan/versions-spec.md 3,
// V3 Navigation).
//
// Top bar: fixed, minimal: her name on the left (home), a "Chapters" button
// on the right, and a thin marigold bar along the very top edge that shows
// how far the page has been scrolled. A soft night gradient behind it keeps
// it legible over the footage.
//
// Chapter list: a modal dialog on night over the whole page. The pages are
// numbered chapters in large light serif type; the current one carries a
// marigold dot. From 1024 px a 16:9 "screen" on the right shows a still from
// the footage of the chapter under the pointer or keyboard focus, like a
// scene-selection menu. Opening it stops the page scrolling, makes the page
// behind it inert, keeps Tab inside it and focuses its close button; Escape
// or the close button shuts it and returns focus to the Chapters button. Any
// link inside closes it.
//
// Links, labels and stills arrive as props from the server layout, so this
// file imports no content.

export type ChapterLink = { label: string; href: string; number: string; still: string };
export type SocialLink = { label: string; href: string };

function isCurrent(pathname: string, href: string, home: string) {
  if (href === home) return pathname === home;
  return pathname === href || pathname.startsWith(href + "/");
}

/** Two short strokes, like the edges of a film frame. */
function ChaptersGlyph() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" focusable="false">
      <path d="M1 2h16M1 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function V3Header({
  name,
  home,
  chapters,
  socials,
  editions,
  labels,
}: {
  name: string;
  home: string;
  chapters: readonly ChapterLink[];
  socials: readonly SocialLink[];
  editions: { label: string; href: string };
  labels: { chapters: string; close: string; closeChapters: string; chapter: string; newTab: string; follow: string };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // The stills load the first time the list opens, never before.
  const [opened, setOpened] = useState(false);
  const [preview, setPreview] = useState<number | null>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const closer = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef(false);

  const currentIndex = chapters.findIndex((chapter) => isCurrent(pathname, chapter.href, home));
  const shown = preview ?? Math.max(0, currentIndex);

  // Scroll progress through the page, on the bar at the very top.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    // Pinned scenes set their heights after the first frame; look again.
    const late = window.setTimeout(schedule, 600);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(late);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  // While the list is open: no scrolling, nothing behind it reachable, focus
  // on the close button, Escape closes.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const behind = [document.querySelector(".v3-bar"), document.getElementById("site-content"), document.querySelector(".v3-footer")];
    const button = toggle.current;
    behind.forEach((el) => el?.setAttribute("inert", ""));
    root.classList.add("v3-locked");
    closer.current?.focus();
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        returnFocus.current = true;
        setOpen(false);
      }
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("keydown", escape);
      behind.forEach((el) => el?.removeAttribute("inert"));
      root.classList.remove("v3-locked");
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

  const show = () => {
    setOpened(true);
    setPreview(null);
    setOpen(true);
  };
  const closeAndReturn = () => {
    returnFocus.current = true;
    setOpen(false);
  };

  return (
    <>
      <header className="v3-bar">
        <span className="v3-progress" aria-hidden="true">
          <span ref={bar} />
        </span>
        <Link href={home} className="v3-wordmark" aria-current={pathname === home ? "page" : undefined}>
          {name}
        </Link>
        <button
          ref={toggle}
          type="button"
          className="v3-chapters-button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="v3-chapters"
          onClick={show}
        >
          <ChaptersGlyph />
          <span>{labels.chapters}</span>
        </button>
      </header>

      <div
        ref={dialog}
        id="v3-chapters"
        className={`v3-menu${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={labels.chapters}
        inert={!open}
        onKeyDown={trap}
        onClickCapture={(event) => {
          if (event.target instanceof Element && event.target.closest("a[href]")) setOpen(false);
        }}
      >
        <div className="v3-menu-bar">
          <Link href={home} className="v3-wordmark">
            {name}
          </Link>
          <button ref={closer} type="button" className="v3-chapters-button" aria-label={labels.closeChapters} onClick={closeAndReturn}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
            <span>{labels.close}</span>
          </button>
        </div>
        <div className="v3-menu-body">
          <nav className="v3-menu-nav" aria-label={labels.chapters}>
            <ol className="v3-menu-list">
              {chapters.map((chapter, index) => {
                const current = index === currentIndex;
                return (
                  <li key={chapter.href} style={{ "--i": index } as CSSProperties}>
                    <Link
                      href={chapter.href}
                      className="v3-menu-link"
                      aria-current={current ? "page" : undefined}
                      onPointerEnter={() => setPreview(index)}
                      onFocus={() => setPreview(index)}
                    >
                      <span className="v3-menu-number">
                        {labels.chapter} {chapter.number}
                      </span>{" "}
                      <span className="v3-menu-label">
                        {chapter.label}
                        {current ? <span className="v3-menu-dot" aria-hidden="true" /> : null}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
          <div className="v3-menu-screen" aria-hidden="true">
            {opened
              ? chapters.map((chapter, index) => (
                  <Image
                    key={chapter.href}
                    src={chapter.still}
                    alt=""
                    fill
                    sizes="40vw"
                    unoptimized
                    className={index === shown ? "is-shown" : undefined}
                  />
                ))
              : null}
            <span className="v3-menu-screen-label">
              {labels.chapter} {chapters[shown]?.number}
            </span>
          </div>
        </div>
        <div className="v3-menu-foot">
          <span className="v3-menu-foot-label">{labels.follow}</span>
          {socials.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
              <span className="v3-sr-only">{labels.newTab}</span>
            </a>
          ))}
          <Link className="v3-menu-editions" href={editions.href} prefetch={false}>
            {editions.label}
          </Link>
        </div>
      </div>
    </>
  );
}
