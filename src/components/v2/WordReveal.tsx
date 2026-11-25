"use client";
import { useRef, type ElementType } from "react";
import { MEDIA, SCRUB_FREE, SplitText, gsap, useGSAP } from "./gsap";
import type { HeadingSize } from "./MixedHeading";

// Manifesto text that lights up word by word as it scrolls through the
// viewport (spec 3.4): each word goes from opacity 0.18 to 1, scrubbed.
// The words are split with aria "none" into plain inline spans, so the text
// still reads as one sentence; nothing is dimmed before the script runs or
// with reduced motion. `accent` (a phrase inside `text`) is set in the serif
// voice and the theme's accent colour. `voice="quote"` sets the text as one
// of her quotations instead: the serif italic in curly marks (drawn by CSS),
// for a pull quote that lights up the same way.
export function WordReveal({
  text,
  accent,
  as: Tag = "p",
  size = "manifesto",
  align = "center",
  voice = "display",
  dim = 0.18,
  id,
  className,
}: {
  text: string;
  accent?: string;
  as?: ElementType;
  size?: HeadingSize;
  align?: "start" | "center";
  /** display: the two voices of the headings; quote: her words in the serif italic. */
  voice?: "display" | "quote";
  /** The opacity a word starts from (0.4 keeps large text above 3:1 on night). */
  dim?: number;
  id?: string;
  className?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const node = root.current;
      if (!node) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const split = SplitText.create(node, { type: "words", wordsClass: "v2-word", tag: "span", aria: "none" });
        gsap.fromTo(
          split.words,
          { opacity: dim },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: node, start: "top 82%", end: "bottom 45%", scrub: SCRUB_FREE },
          },
        );
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [dim] },
  );

  const at = accent ? text.indexOf(accent) : -1;
  const content =
    voice === "quote" ? (
      <q className="v2-quote">{text}</q>
    ) : at < 0 || !accent ? (
      <span className="v2-sans">{text}</span>
    ) : (
      <>
        <span className="v2-sans">{text.slice(0, at)}</span>
        <span className="v2-serif">{accent}</span>
        <span className="v2-sans">{text.slice(at + accent.length)}</span>
      </>
    );

  return (
    <Tag ref={root} id={id} className={["v2-mixed", `v2-size-${size}`, `v2-mixed--${align}`, "v2-reveal", voice === "quote" && "v2-reveal--quote", className].filter(Boolean).join(" ")}>
      {content}
    </Tag>
  );
}
