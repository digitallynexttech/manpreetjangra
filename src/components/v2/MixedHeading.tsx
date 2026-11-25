"use client";
import { Fragment, useRef, type CSSProperties, type ElementType } from "react";
import { EASE_IN, MEDIA, SplitText, gsap, onNextFrame, useGSAP } from "./gsap";
import { ThreadDraw } from "./ThreadDraw";

// A heading in Lando's two voices (spec 2, 3.4): parts in the bold sans
// (Geist 800, uppercase) or the serif (Newsreader 400, uppercase, in the
// theme's text accent unless `plain`), at one of the display sizes.
//
// Entrances:
// - rise "enter": the lines rise into place inside line masks when the
//   heading scrolls into view (SplitText lines, yPercent 100 to 0, 0.9 s,
//   0.08 s apart). Stacked headings rise part by part. SplitText's
//   aria "auto" gives the heading its whole text as its name, so screen
//   readers never hear the line pieces.
// - rise "load": the parts rise as the page appears, by CSS (no flash before
//   the script runs); for hero names and page titles.
// - rise "none": static.
// The text is in the HTML and fully visible until the script runs; reduced
// motion keeps it static.
//
// A part can carry a `mark`: a ThreadDraw underline or ring drawn over that
// word (keep it on a single word, so the mark never breaks across lines).

export type HeadingPart = {
  text: string;
  voice: "sans" | "serif";
  /** Serif in the text colour instead of the accent. */
  plain?: boolean;
  mark?: "underline" | "circle";
  /** When the mark draws (default load). */
  markTrigger?: "load" | "hover" | "scroll";
};

export type HeadingSize = "hero" | "display" | "manifesto" | "title";

export function MixedHeading({
  as: Tag = "h2",
  id,
  parts,
  size = "display",
  align = "start",
  stack = false,
  rise = "enter",
  delay = 0.1,
  className,
  style,
}: {
  as?: ElementType;
  id?: string;
  parts: readonly HeadingPart[];
  size?: HeadingSize;
  align?: "start" | "center";
  /** One part per line (the stacked wordmark style). */
  stack?: boolean;
  rise?: "enter" | "load" | "none";
  /** Seconds before a `load` rise starts. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const node = root.current;
      if (!node || rise !== "enter") return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, (context) =>
        onNextFrame(context, () => {
          // A heading already past its start (a page opened mid-way, Back)
          // stays as rendered instead of dropping out of sight and rising.
          if (node.getBoundingClientRect().top < window.innerHeight * 0.88) return;
          if (stack) {
            gsap.from(node.querySelectorAll(":scope > .v2-rise > .v2-part"), {
              yPercent: 105,
              duration: 0.9,
              stagger: 0.08,
              ease: EASE_IN,
              scrollTrigger: { trigger: node, start: "top 88%", toggleActions: "play none none none" },
            });
            return;
          }
          const split = SplitText.create(node, {
            type: "lines",
            mask: "lines",
            linesClass: "v2-line",
            autoSplit: true,
            aria: "auto",
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 105,
                duration: 0.9,
                stagger: 0.08,
                ease: EASE_IN,
                scrollTrigger: { trigger: node, start: "top 88%", toggleActions: "play none none none" },
              }),
          });
          return () => split.revert();
        }),
      );
      return () => mm.revert();
    },
    { dependencies: [rise, stack] },
  );

  const part = (item: HeadingPart, index: number) => {
    const classes = [
      "v2-part",
      item.voice === "sans" ? "v2-sans" : "v2-serif",
      item.voice === "serif" && item.plain && "v2-serif--plain",
    ]
      .filter(Boolean)
      .join(" ");
    const body = item.mark ? (
      <span className="v2-mark-host v2-draw-host">
        {item.text}
        <ThreadDraw
          variant="underline"
          shape={item.mark === "circle" ? "circle" : "line"}
          trigger={item.markTrigger ?? "load"}
          delay={delay + 0.5}
          className={`v2-mark v2-mark--${item.mark}`}
        />
      </span>
    ) : (
      item.text
    );
    return (
      <span key={index} className={classes} style={{ "--i": index } as CSSProperties}>
        {body}
      </span>
    );
  };

  const classes = [
    "v2-mixed",
    `v2-size-${size}`,
    `v2-mixed--${align}`,
    stack && "v2-mixed--stack",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Stacked or loading headings wrap each part (or the whole line) in a
  // mask; a heading that rises on enter is split into lines by SplitText.
  let content;
  if (stack && rise !== "none") {
    // The spaces between the stacked lines take no room (they sit between
    // blocks) but keep the words apart in the heading's text.
    content = parts.map((item, index) => (
      <Fragment key={index}>
        {index > 0 ? " " : null}
        <span className={rise === "load" ? "v2-rise v2-rise--load" : "v2-rise"}>{part(item, index)}</span>
      </Fragment>
    ));
  } else if (rise === "load") {
    content = (
      <span className="v2-rise v2-rise--load">
        <span className="v2-part v2-part--line">
          {parts.map((item, index) => (
            <Fragment key={index}>
              {index > 0 ? " " : null}
              {part(item, index)}
            </Fragment>
          ))}
        </span>
      </span>
    );
  } else {
    content = parts.map((item, index) => (
      <Fragment key={index}>
        {index > 0 ? " " : null}
        {part(item, index)}
      </Fragment>
    ));
  }

  return (
    <Tag
      ref={root}
      id={id}
      className={classes}
      style={rise === "load" ? ({ ...style, "--v2-rise-delay": `${delay}s` } as CSSProperties) : style}
    >
      {content}
    </Tag>
  );
}
