"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Eye, X } from "lucide-react";
import type { VentureView } from "@/content/types";
import { Tile, type Tone } from "./Tile";

// "Where I work" on /v5/work (plan/versions-spec.md, V5: "venture tiles that
// flip or expand to show the website preview"). Each organisation is a tile
// whose name links to its website (the whole tile is the link). A tile with a
// screenshot has a "Preview website" button that turns the tile over, on a
// spring, to show the website in a small browser window; the close button,
// Escape or a click elsewhere turn it back. The rules are the classic
// VentureList's (src/components/VentureList.tsx): one preview at a time, none
// for iSoCIAL (no screenshot), keyboard first, the same control names.
//
// Focus follows the turn: opening moves it to the close button on the back,
// closing returns it to the "Preview website" button. The side facing away is
// `inert`, so it can be neither focused nor read. With reduced motion the
// tile changes sides at once. Without JavaScript the front stays, and the
// name still links to the website.

export type VentureLabels = {
  previewWebsite: string;
  previewThe: string;
  previewWindow: string;
  closePreview: string;
  visit: string;
  newTab: string;
};

const named = (template: string, name: string) => template.replaceAll("{name}", name);

export function VentureTiles({
  ventures,
  tones,
  labels,
}: {
  ventures: readonly VentureView[];
  tones: readonly Tone[];
  labels: VentureLabels;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const toggles = useRef<(HTMLButtonElement | null)[]>([]);
  const closers = useRef<(HTMLButtonElement | null)[]>([]);
  const cells = useRef<(HTMLDivElement | null)[]>([]);
  // Where focus goes after the next render: the close button of the tile
  // just turned over, or the button that turned it.
  const focusNext = useRef<HTMLButtonElement | null | undefined>(undefined);

  useEffect(() => {
    const target = focusNext.current;
    focusNext.current = undefined;
    target?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const close = (returnFocus: boolean) => {
      if (returnFocus) focusNext.current = toggles.current[open];
      setOpen(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(Boolean(cells.current[open]?.contains(document.activeElement)));
    };
    const onPointer = (event: PointerEvent) => {
      if (!cells.current[open]?.contains(event.target as Node)) close(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <>
      {ventures.map((venture, index) => {
        const flipped = open === index;
        const previewId = `v5-venture-preview-${index}`;
        const tags = venture.category.split(" · ");
        const tone = tones[index % tones.length];
        return (
          <Tile
            key={venture.name}
            w={2}
            h={venture.preview ? 2 : 1}
            mdW={2}
            mdH={venture.preview ? 2 : 1}
            tone={tone}
            tilt={false}
            tileClassName="v5-venture-tile"
          >
            <div
              ref={(element) => {
                cells.current[index] = element;
              }}
              className="v5-venture"
              data-flipped={flipped ? "" : undefined}
              data-preview={venture.preview ? "" : undefined}
            >
              <div className="v5-venture-face v5-venture-front" data-tone={tone} inert={flipped}>
                <div className="v5-venture-top">
                  <p className="v5-tags">
                    {tags.map((tag, at) => (
                      <span key={tag} className="v5-tag">
                        {at > 0 ? <span className="v5-sr"> · </span> : null}
                        {tag}
                      </span>
                    ))}
                  </p>
                  <span className="v5-round v5-round--static v5-venture-arrow" aria-hidden="true">
                    <ArrowUpRight size={20} strokeWidth={2} />
                  </span>
                </div>
                <div className="v5-venture-main">
                  <h3 className="v5-venture-name">
                    <a className="v5-cover" href={venture.href} target="_blank" rel="noopener noreferrer">
                      {venture.name}
                      <span className="v5-sr">{labels.newTab}</span>
                    </a>
                  </h3>
                  <p className="v5-venture-role">{venture.role}</p>
                  {venture.preview ? (
                    <button
                      ref={(element) => {
                        toggles.current[index] = element;
                      }}
                      type="button"
                      className="v5-venture-toggle"
                      aria-label={named(labels.previewThe, venture.name)}
                      aria-expanded={flipped}
                      aria-controls={previewId}
                      onClick={() => {
                        focusNext.current = closers.current[index];
                        setOpen(index);
                      }}
                    >
                      <Eye size={18} strokeWidth={2} aria-hidden="true" />
                      {labels.previewWebsite}
                    </button>
                  ) : null}
                </div>
              </div>

              {venture.preview ? (
                <div
                  id={previewId}
                  className="v5-venture-face v5-venture-back"
                  data-tone="night"
                  role="group"
                  aria-label={named(labels.previewWindow, venture.name)}
                  inert={!flipped}
                >
                  <div className="v5-venture-bar">
                    <span className="v5-venture-lights" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className="v5-venture-host">{venture.hostname}</span>
                    <button
                      ref={(element) => {
                        closers.current[index] = element;
                      }}
                      type="button"
                      className="v5-venture-close"
                      aria-label={labels.closePreview}
                      onClick={() => {
                        focusNext.current = toggles.current[index];
                        setOpen(null);
                      }}
                    >
                      <X size={18} strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                  <a
                    className="v5-venture-shot"
                    href={venture.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${named(labels.visit, venture.name)}${labels.newTab}`}
                  >
                    <Image
                      src={venture.preview}
                      alt={venture.previewAlt ?? ""}
                      width={960}
                      height={600}
                      sizes="(min-width: 1280px) 46vw, 92vw"
                    />
                  </a>
                </div>
              ) : null}
            </div>
          </Tile>
        );
      })}
    </>
  );
}
