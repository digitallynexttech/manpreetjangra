"use client";
import Image from "next/image";
import { ArrowUpRight, Eye, X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import type { VentureView } from "@/content/types";

// The group's organisations on the v2 Work page (spec 4.4): big rows (name,
// field, her role; each row one link to the organisation's website, in a new
// tab) with the classic VentureList's website preview, whose logic this is
// (src/components/VentureList.tsx). Pointing at a row with a mouse, or moving
// keyboard focus onto it, shows a small screenshot of that website which
// follows the pointer (18 px away, flipping near the edges, always 16 px
// inside the window, one update per frame, and letting the pointer pass
// through). Escape, a click elsewhere, scrolling or resizing closes it. On
// touch screens and phones each row with a screenshot has its own "Preview
// website" button instead. A row without a screenshot (iSoCIAL) shows no
// preview and no button. The preview window is the classic one (its
// `site-venture-preview` styles, night raised with a hostname bar); the rows
// are the v2 big rows.
//
// The words come in as props: the ventures are built on the server
// (`ventureView`), the control names are labels from content/v2.ts.

type Preview = { index: number; left: number; top: number; width: number; follow: boolean };
type PointerPosition = { x: number; y: number };

export type VentureRowLabels = {
  headers: readonly [string, string, string];
  newTab: string;
  previewWebsite: string;
  /** "{name}" is replaced by the organisation's name. */
  previewThe: string;
  previewWindow: string;
  closePreview: string;
  visit: string;
};

const PREVIEW_ID = "v2-venture-preview";

// Window height: the 960 x 600 screenshot (0.625) plus the 44 px bar.
const previewHeight = (width: number) => width * 0.625 + 44;
const fill = (template: string, name: string) => template.replace("{name}", name);

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

export function VentureRows({ ventures, labels }: { ventures: readonly VentureView[]; labels: VentureRowLabels }) {
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
    const rect = element.closest(".v2-venture")!.getBoundingClientRect();
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
      if (!panel.current?.contains(target) && !trigger.current?.closest(".v2-venture")?.contains(target)) {
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
  const [nameHead, fieldHead, roleHead] = labels.headers;
  const style = { "--v2-row-cols": "minmax(0, 1.15fr) minmax(0, 0.85fr) minmax(0, 1fr)" } as CSSProperties;

  return (
    <div className="v2-rows v2-ventures" style={style}>
      <div className="v2-rows-head v2-label" aria-hidden="true">
        <span>{nameHead}</span>
        <span>{fieldHead}</span>
        <span>{roleHead}</span>
      </div>
      <ul className="v2-rows-list">
        {ventures.map((item, index) => (
          <li
            key={item.name}
            className="v2-row v2-venture"
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
              className="v2-row-inner"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onFocus={(event) => show(index, event.currentTarget)}
            >
              <span className="v2-cell v2-cell--big v2-venture-name">
                <span className="v2-sr-only">{nameHead}: </span>
                {item.name}
              </span>
              <span className="v2-cell v2-cell--small v2-venture-field">
                <span className="v2-sr-only">{fieldHead}: </span>
                {/* Each part keeps the dot after it (behind a no-break
                    space), so a line never starts with a dot. */}
                {item.category.split(" · ").map((part, at, all) => (
                  <span key={at}>
                    {at > 0 ? " " : null}
                    <span className="v2-venture-field-part">
                      {part}
                      {at < all.length - 1 ? "\u00A0·" : null}
                    </span>
                  </span>
                ))}
              </span>
              <span className="v2-cell v2-cell--text v2-venture-role">
                <span className="v2-sr-only">{roleHead}: </span>
                {item.role}
              </span>
              <span className="v2-sr-only">{labels.newTab}</span>
              <ArrowUpRight className="v2-row-arrow" size={24} strokeWidth={2} aria-hidden="true" />
            </a>
            {item.preview ? (
              <button
                className="v2-venture-toggle"
                type="button"
                aria-label={fill(labels.previewThe, item.name)}
                aria-expanded={preview?.index === index}
                aria-controls={preview?.index === index ? PREVIEW_ID : undefined}
                onClick={(event) => (preview?.index === index ? close() : show(index, event.currentTarget))}
              >
                <Eye size={18} strokeWidth={1.75} aria-hidden="true" /> {labels.previewWebsite}
              </button>
            ) : null}
          </li>
        ))}
      </ul>
      {preview && venture?.preview
        ? createPortal(
            <aside
              ref={panel}
              id={PREVIEW_ID}
              className="site-venture-preview"
              aria-label={fill(labels.previewWindow, venture.name)}
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
                  aria-label={labels.closePreview}
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
                aria-label={`${fill(labels.visit, venture.name)}${labels.newTab}`}
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
