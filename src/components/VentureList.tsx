"use client";

import Image from "next/image";
import { ArrowUpRight, Eye, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { VentureView } from "@/content/types";
import { keepSeparators } from "@/lib/site";

// "Where I work" (spec 4.3.7). Ported from the sibling site
// (E:\deepkgoel\app\components\VentureCards.tsx). Each row is one link to the
// organisation's website. Pointing at a row with a mouse, or moving keyboard
// focus onto it, shows a small screenshot of that website which follows the
// pointer (18 px away, flipping near the edges, always 16 px inside the
// window, one update per frame). Escape, a click elsewhere, scrolling or
// resizing closes it. On phones and touch screens each row has its own
// "Preview website" button instead. A row without a screenshot (iSoCIAL)
// shows no preview and no button.
//
// Differences from the sibling: the ventures arrive as props (VentureView,
// built on the server without fact ids, spec 7.5) instead of an import; the
// window is 320 px wide (360 there); the rows are hairline rows, not glass
// cards; and while the window follows a mouse it lets the pointer pass through
// (`follow`). On the sibling a quick move down and right (more than the 18 px
// gap in one frame) lands the pointer on the window, which then stops
// following and stays put over the rows. Opened by keyboard focus or the
// phone button, the window stays clickable.

/** `follow`: opened by a mouse, so it tracks the pointer and ignores it. */
type Preview = { index: number; left: number; top: number; width: number; follow: boolean };
type PointerPosition = { x: number; y: number };

const PREVIEW_ID = "venture-website-preview";

// Window height: the 960 x 600 screenshot (0.625) plus the 44 px bar.
const previewHeight = (width: number) => width * 0.625 + 44;

function pointerPlacement(pointer: PointerPosition, width: number) {
  const gap = 18;
  const height = previewHeight(width);
  const left = pointer.x + width + gap <= window.innerWidth - 16 ? pointer.x + gap : pointer.x - width - gap;
  const top = pointer.y + height + gap <= window.innerHeight - 16 ? pointer.y + gap : pointer.y - height - gap;
  return {
    left: Math.max(16, Math.min(left, window.innerWidth - width - 16)),
    top: Math.max(16, Math.min(top, window.innerHeight - height - 16)),
  };
}

export function VentureList({ ventures }: { ventures: readonly VentureView[] }) {
  const [preview, setPreview] = useState<Preview | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panel = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const motionFrame = useRef(0);
  const pointer = useRef<PointerPosition | null>(null);
  const previewIndex = preview?.index;

  function cancelClose() {
    if (timer.current) clearTimeout(timer.current);
  }

  function close() {
    cancelClose();
    cancelAnimationFrame(motionFrame.current);
    motionFrame.current = 0;
    pointer.current = null;
    setPreview(null);
  }

  function show(index: number, element: HTMLElement, position?: PointerPosition) {
    cancelClose();
    if (!ventures[index].preview) {
      close();
      return;
    }
    trigger.current = element;
    pointer.current = position ?? null;
    const rect = element.closest(".site-venture-wrap")!.getBoundingClientRect();
    const width = Math.min(320, window.innerWidth - 32);
    const height = previewHeight(width);
    const above = rect.top - height - 12;
    const below = rect.bottom + 12;
    setPreview({
      index,
      width,
      follow: Boolean(position),
      left: Math.max(16, Math.min(rect.right - width - 24, window.innerWidth - width - 16)),
      top: Math.max(16, Math.min(above >= 16 ? above : below, window.innerHeight - height - 16)),
      ...(position ? pointerPlacement(position, width) : {}),
    });
  }

  function followPointer(index: number, position: PointerPosition) {
    if (previewIndex !== index || !pointer.current) return;
    pointer.current = position;
    if (motionFrame.current) return;
    motionFrame.current = requestAnimationFrame(() => {
      motionFrame.current = 0;
      const latest = pointer.current;
      if (!latest) return;
      setPreview((current) =>
        current?.index === index ? { ...current, ...pointerPlacement(latest, current.width) } : current,
      );
    });
  }

  function scheduleClose() {
    cancelClose();
    timer.current = setTimeout(() => {
      if (panel.current?.contains(document.activeElement)) return;
      if (trigger.current === document.activeElement) return;
      setPreview(null);
    }, 180);
  }

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      cancelAnimationFrame(motionFrame.current);
    },
    [],
  );

  useEffect(() => {
    if (previewIndex === undefined) return;
    function dismiss(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (panel.current?.contains(document.activeElement)) trigger.current?.focus();
      setPreview(null);
    }
    function onMove() {
      setPreview(null);
    }
    function onOutside(event: PointerEvent) {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !trigger.current?.closest(".site-venture-wrap")?.contains(target)) {
        setPreview(null);
      }
    }
    window.addEventListener("keydown", dismiss);
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [previewIndex]);

  const venture = preview ? ventures[preview.index] : null;

  return (
    <div className="site-ventures" data-reveal="group">
      {ventures.map((item, index) => (
        <div
          className="site-venture-wrap"
          key={item.name}
          data-reveal
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") {
              show(index, event.currentTarget.querySelector("a")!, { x: event.clientX, y: event.clientY });
            }
          }}
          onPointerMove={(event) => {
            if (event.pointerType === "mouse") followPointer(index, { x: event.clientX, y: event.clientY });
          }}
          onPointerLeave={scheduleClose}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget) && !panel.current?.contains(event.relatedTarget)) close();
          }}
        >
          <a
            className="site-venture"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onFocus={(event) => show(index, event.currentTarget)}
          >
            <div className="site-venture-head">
              <h3 className="site-venture-name">{item.name}</h3>
              <p className="site-venture-category site-caption">{keepSeparators(item.category)}</p>
            </div>
            <p className="site-venture-role">{item.role}</p>
            <span className="site-sr-only"> (opens in a new tab)</span>
            <ArrowUpRight className="site-arrow site-venture-arrow" size={20} strokeWidth={1.5} aria-hidden="true" />
          </a>
          {item.preview ? (
            <button
              className="site-venture-preview-toggle"
              type="button"
              aria-label={`Preview the ${item.name} website`}
              aria-expanded={preview?.index === index}
              aria-controls={preview?.index === index ? PREVIEW_ID : undefined}
              onClick={(event) => (preview?.index === index ? close() : show(index, event.currentTarget))}
            >
              <Eye size={18} strokeWidth={1.5} aria-hidden="true" /> Preview website
            </button>
          ) : null}
        </div>
      ))}
      {preview && venture?.preview
        ? createPortal(
            <aside
              ref={panel}
              id={PREVIEW_ID}
              className="site-venture-preview"
              aria-label={`${venture.name} website preview`}
              style={{
                left: preview.left,
                top: preview.top,
                width: preview.width,
                pointerEvents: preview.follow ? "none" : undefined,
              }}
              onPointerEnter={cancelClose}
              onPointerLeave={scheduleClose}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget) && event.relatedTarget !== trigger.current) close();
              }}
            >
              <div className="site-venture-preview-bar">
                <span>{venture.hostname}</span>
                <button
                  type="button"
                  aria-label="Close website preview"
                  onClick={() => {
                    trigger.current?.focus();
                    close();
                  }}
                >
                  <X size={18} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>
              <a
                href={venture.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${venture.name} (opens in a new tab)`}
              >
                <Image src={venture.preview} alt={venture.previewAlt ?? ""} width={960} height={600} sizes="320px" />
              </a>
            </aside>,
            document.body,
          )
        : null}
    </div>
  );
}
