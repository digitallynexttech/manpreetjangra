"use client";
import { useEffect, useRef, type ReactNode } from "react";
import type { SequenceName } from "@/lib/sequences";
import { Footage } from "./Footage";
import { MEDIA, ScrollTrigger, glide, gsap, useGSAP } from "./gsap";

// The scroll shells of the /v3 home scenes (plan/versions-spec.md 3, V3
// Home). Each shell renders the scene's frame (its stage, and the footage
// where there is any) around markup the server built, and animates that
// markup by class name and data attribute with GSAP ScrollTrigger on native
// scrolling.
//
// Pinning: a scene's stage is a CSS sticky box. The shell adds `is-pinned`
// (or `is-horizontal`) to the scene when motion is allowed; the scene then
// takes its scroll length from CSS (`--v3-run`) and a scrubbed timeline runs
// over that range, the Apple product-page technique. Without the class (no
// JavaScript, reduced motion) every scene is a plain block with all its words
// in place and the footage's first frame as a still. Nothing is hidden by CSS
// before the script runs: GSAP sets the hidden starting states itself, and
// only for words that sit below the first screen in the plain layout.

type Builder = (timeline: gsap.core.Timeline, root: HTMLElement) => void | (() => void);

const q = (root: Element, selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));
const one = (root: Element, selector: string) => root.querySelector<HTMLElement>(selector);

/** When keyboard focus lands on a link inside a pinned scene, scroll to the
 *  point of the scene where that link is shown (its `data-v3-focus-at`, a
 *  fraction of the scene's run), so focus never sits on a hidden word. */
function followFocus(root: HTMLElement, trigger: ScrollTrigger) {
  const onFocus = (event: FocusEvent) => {
    const holder = (event.target as Element | null)?.closest<HTMLElement>("[data-v3-focus-at]");
    if (!holder || !root.contains(holder)) return;
    const at = Number(holder.dataset.v3FocusAt);
    const target = trigger.start + (trigger.end - trigger.start) * at;
    if (window.scrollY < target - 4 || window.scrollY > trigger.end) window.scrollTo({ top: target, behavior: "instant" });
  };
  root.addEventListener("focusin", onFocus);
  return () => root.removeEventListener("focusin", onFocus);
}

/** Cold open (scene 1): letterbox bars open, the name settles, then the role
 *  line and the statement fade in, and the silk darkens towards the cut. */
const coldOpen: Builder = (tl, root) => {
  const stage = one(root, ".v3-stage")!;
  const name = one(root, "[data-v3-name]");
  const role = one(root, "[data-v3-role]");
  const statement = one(root, "[data-v3-statement]");
  const bars = q(root, ".v3-letterbox");
  const cue = one(root, "[data-v3-cue]");
  const dim = one(root, ".v3-dim");
  // The name starts in the middle of the screen (where the plain layout has
  // it) and rises to the top of the finished title block. The distance is a
  // CSS variable, measured again before every refresh (resize, fonts), and
  // the timeline only moves `--v3-settle` from 1 to 0, so it never needs to
  // be rebuilt (home.css: translate = settle x offset).
  const measure = () => {
    if (!name) return;
    const offset = stage.clientHeight / 2 - (name.offsetTop + name.offsetHeight / 2);
    name.style.setProperty("--v3-name-offset", `${Math.round(offset)}px`);
  };
  measure();
  ScrollTrigger.addEventListener("refreshInit", measure);
  tl.to(bars, { scaleY: 0, duration: 0.14, ease: "power1.in" }, 0);
  if (cue) tl.to(cue, { opacity: 0, duration: 0.05 }, 0);
  if (name) tl.fromTo(name, { "--v3-settle": 1 }, { "--v3-settle": 0, duration: 0.2, ease: "power2.inOut" }, 0.1);
  if (role) tl.from(role, { opacity: 0, y: 18, duration: 0.12 }, 0.22);
  if (statement) tl.from(statement, { opacity: 0, y: 26, filter: "blur(10px)", duration: 0.2 }, 0.4);
  // The silk brightens as the bars open, dims under the statement, and
  // darkens further as the scene ends, so the cut to the night chapter
  // cards is soft (the footage stays visible as the stage scrolls away).
  if (dim)
    tl.fromTo(dim, { opacity: 0.5 }, { opacity: 0.12, duration: 0.3 }, 0)
      .to(dim, { opacity: 0.5, duration: 0.2 }, 0.36)
      .to(dim, { opacity: 0.72, duration: 0.2 }, 0.8);
  return () => {
    ScrollTrigger.removeEventListener("refreshInit", measure);
    name?.style.removeProperty("--v3-name-offset");
  };
};

/** Her words (scene 3): the scene title, then the quote line by line at the
 *  bottom, like subtitles, then the attribution. */
const herWords: Builder = (tl, root) => {
  const head = one(root, "[data-v3-head]");
  const lines = q(root, "[data-v3-sub]");
  const attribution = one(root, "[data-v3-attrib]");
  if (head) tl.from(head, { opacity: 0, y: 28, duration: 0.12 }, 0.02);
  const step = 0.46 / Math.max(1, lines.length);
  lines.forEach((line, index) => {
    tl.from(line, { opacity: 0, y: 14, filter: "blur(6px)", duration: step * 0.8 }, 0.2 + index * step);
  });
  if (attribution) tl.from(attribution, { opacity: 0, y: 10, duration: 0.08 }, 0.72);
};

/** Talent (scene 4): the heading and lede, which then make way for the
 *  job-post lines one at a time and the call to action, while the thread
 *  passes through the needle. */
const talent: Builder = (tl, root) => {
  const first = one(root, '[data-v3-phase="1"]');
  const items = q(root, "[data-v3-item]");
  const listTitle = one(root, "[data-v3-list-title]");
  const cta = one(root, "[data-v3-cta]");
  if (first) {
    tl.from(Array.from(first.children), { opacity: 0, y: 30, stagger: 0.035, duration: 0.1 }, 0.02);
    tl.to(first, { opacity: 0, y: -24, duration: 0.07, ease: "power1.in" }, 0.38);
  }
  if (listTitle) tl.from(listTitle, { opacity: 0, y: 18, duration: 0.06 }, 0.44);
  items.forEach((item, index) => {
    tl.from(item, { opacity: 0, y: 22, filter: "blur(6px)", duration: 0.08 }, 0.49 + index * 0.09);
  });
  if (cta) tl.from(cta, { opacity: 0, y: 18, duration: 0.08 }, 0.8);
};

const BUILDERS = { cold: coldOpen, words: herWords, talent } as const;

/** Where each scene's timeline starts: the cold open with the page; the
 *  others while their stage is still rising into view, so the first words
 *  arrive with it. The footage of those plays from the moment it enters. */
const STARTS = {
  cold: { words: "top top", footage: "top top" },
  words: { words: "top 30%", footage: "top bottom" },
  talent: { words: "top 30%", footage: "top bottom" },
} as const;

/** A pinned scene over scrubbed footage: the cold open, her words, talent. */
export function FootageScene({
  kind,
  sequence,
  priority,
  focusX,
  focusY,
  className,
  children,
}: {
  kind: keyof typeof BUILDERS;
  sequence: SequenceName;
  priority?: boolean;
  focusX?: number;
  focusY?: number;
  className?: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const drawRef = useRef<((progress: number) => void) | null>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        el.classList.add("is-pinned");
        // No invalidateOnRefresh: it would drop the starting states of the
        // from() tweens, and words due later would show before their turn.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: STARTS[kind].words, end: "bottom bottom", scrub: 0.6 },
        });
        // A fixed length of 1, so every position above is a fraction of the run.
        tl.to({}, { duration: 1 }, 0);
        const undo = BUILDERS[kind](tl, el);
        const toFrame = glide((value) => drawRef.current?.(value));
        ScrollTrigger.create({
          trigger: el,
          start: STARTS[kind].footage,
          end: "bottom bottom",
          onUpdate: (self) => toFrame(self.progress),
          onRefresh: (self) => toFrame(self.progress),
        });
        const unfollow = tl.scrollTrigger ? followFocus(el, tl.scrollTrigger) : () => {};
        return () => {
          unfollow();
          undo?.();
          el.classList.remove("is-pinned");
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`v3-scene v3-scene--${kind}${className ? ` ${className}` : ""}`}>
      <div className="v3-stage">
        <Footage name={sequence} drawRef={drawRef} priority={priority} focusX={focusX} focusY={focusY} />
        {children}
      </div>
    </div>
  );
}

/** Chapter cards (scene 2): one full-screen card per pillar. From 1024 px
 *  the cards sit side by side in one row that vertical scrolling moves
 *  sideways, snapping card by card; each card's words slide up as it
 *  arrives. Below 1024 px they stack, and the words slide up as each card
 *  enters. */
export function ChapterRow({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const stage = one(el, ".v3-row-stage")!;
      const track = one(el, ".v3-row-track")!;
      const panels = q(el, ".v3-panel");
      const mm = gsap.matchMedia();
      mm.add(MEDIA.desktop, () => {
        el.classList.add("is-horizontal");
        el.style.setProperty("--v3-count", String(panels.length));
        const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
        const steps = Math.max(1, panels.length - 1);
        const row = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            // The snap does the smoothing, so the row follows the scroll
            // without lag and settles soon after the wheel stops.
            scrub: true,
            invalidateOnRefresh: true,
            snap: { snapTo: 1 / steps, inertia: false, duration: { min: 0.2, max: 0.5 }, delay: 0.05, ease: "power2.inOut" },
          },
        });
        panels.forEach((panel, index) => {
          const rise = q(panel, "[data-v3-rise]");
          const numeral = one(panel, "[data-v3-numeral]");
          if (index === 0) {
            gsap.from(rise, {
              opacity: 0,
              y: 48,
              stagger: 0.08,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 95%", end: "top 25%", scrub: 0.5 },
            });
            return;
          }
          gsap.from(rise, {
            opacity: 0,
            y: 56,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: { trigger: panel, containerAnimation: row, start: "left 80%", end: "left 15%", scrub: 0.4 },
          });
          if (numeral)
            gsap.fromTo(
              numeral,
              { xPercent: 22 },
              {
                xPercent: -10,
                ease: "none",
                scrollTrigger: { trigger: panel, containerAnimation: row, start: "left right", end: "right left", scrub: true },
              },
            );
        });
        // Keyboard focus on a card's link brings that card into view.
        const onFocus = (event: FocusEvent) => {
          const panel = (event.target as Element | null)?.closest<HTMLElement>(".v3-panel");
          const trigger = row.scrollTrigger;
          if (!panel || !trigger) return;
          const index = panels.indexOf(panel);
          window.scrollTo({ top: trigger.start + ((trigger.end - trigger.start) * index) / steps, behavior: "instant" });
        };
        el.addEventListener("focusin", onFocus);
        return () => {
          el.removeEventListener("focusin", onFocus);
          el.classList.remove("is-horizontal");
          el.style.removeProperty("--v3-count");
        };
      });
      mm.add(MEDIA.small, () => {
        panels.forEach((panel) => {
          gsap.from(q(panel, "[data-v3-rise]"), {
            opacity: 0,
            y: 44,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top 85%", end: "top 30%", scrub: 0.5 },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="v3-row">
      <div className="v3-row-stage">
        <div className="v3-row-track">{children}</div>
      </div>
    </div>
  );
}

/** Journey (scene 5): the film strip. From 1024 px it is pinned and runs
 *  sideways with the vertical scroll; below that it runs down the page, and
 *  each frame comes up as it enters. `head` stays in view above the strip. */
export function FilmStrip({ head, children }: { head: ReactNode; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const stage = one(el, ".v3-strip-stage")!;
      const track = one(el, ".v3-strip-track")!;
      const frames = q(el, ".v3-frame");
      const mm = gsap.matchMedia();
      mm.add(MEDIA.desktop, () => {
        el.classList.add("is-horizontal");
        const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
        const setRun = () => el.style.setProperty("--v3-run", `${distance()}px`);
        setRun();
        ScrollTrigger.addEventListener("refreshInit", setRun);
        const strip = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true },
        });
        // Inside the picture frames the photograph drifts against the
        // strip, like a slow pan; the words of the other frames stay still.
        frames.forEach((frame) => {
          const picture = one(frame, "[data-v3-gate] img");
          if (!picture) return;
          gsap.fromTo(
            picture,
            { xPercent: 5 },
            {
              xPercent: -5,
              ease: "none",
              scrollTrigger: { trigger: frame, containerAnimation: strip, start: "left right", end: "right left", scrub: true },
            },
          );
        });
        return () => {
          ScrollTrigger.removeEventListener("refreshInit", setRun);
          el.classList.remove("is-horizontal");
          el.style.removeProperty("--v3-run");
        };
      });
      mm.add(MEDIA.small, () => {
        frames.forEach((frame) => {
          gsap.from(frame, {
            opacity: 0,
            y: 56,
            scale: 0.96,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top 92%", end: "top 55%", scrub: 0.5 },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="v3-strip">
      <div className="v3-strip-stage">
        {head}
        {children}
      </div>
    </div>
  );
}

/** Numbers (scene 6): three rows, one per third of the screen, pinned; each
 *  row comes up in turn and its numeral counts up to its value. The markup
 *  holds the final values (no JavaScript, reduced motion, screen readers). */
export function NumbersScene({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        el.classList.add("is-pinned");
        // Starts while the stage rises into view, so the first row arrives
        // with it and the last one soon after the stage pins.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top 70%", end: "bottom bottom", scrub: 0.5 },
        });
        tl.to({}, { duration: 1 }, 0);
        const title = one(el, "[data-v3-head]");
        if (title) tl.from(title, { opacity: 0, y: 16, duration: 0.06 }, 0);
        const rows = q(el, "[data-v3-row]");
        const counters: { node: HTMLElement; final: string }[] = [];
        rows.forEach((row, index) => {
          const at = 0.08 + index * 0.24;
          tl.from(row, { opacity: 0, y: 40, duration: 0.1 }, at);
          const node = one(row, "[data-v3-count]");
          const target = Number.parseInt(node?.dataset.v3Count ?? "", 10);
          if (!node || !Number.isFinite(target)) return;
          counters.push({ node, final: node.textContent ?? "" });
          const state = { value: 0 };
          node.textContent = "0";
          tl.to(
            state,
            {
              value: target,
              duration: 0.22,
              ease: "power2.out",
              onUpdate: () => {
                node.textContent = String(Math.round(state.value));
              },
            },
            at,
          );
        });
        const caption = one(el, "[data-v3-caption]");
        if (caption) tl.from(caption, { opacity: 0, duration: 0.06 }, 0.8);
        const trigger = tl.scrollTrigger;
        const unfollow = trigger ? followFocus(el, trigger) : () => {};
        return () => {
          unfollow();
          counters.forEach(({ node, final }) => {
            node.textContent = final;
          });
          el.classList.remove("is-pinned");
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="v3-scene v3-numbers">
      <div className="v3-stage v3-numbers-stage">{children}</div>
    </div>
  );
}

/** End credits (scene 7): a credits roll; each line rises into place as it
 *  enters the screen. */
export function CreditsRoll({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const lines = q(el, "[data-v3-credit]");
        gsap.set(lines, { opacity: 0, y: 40 });
        ScrollTrigger.batch(lines, {
          start: "top 94%",
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.09, overwrite: true }),
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="v3-credits-roll">
      {children}
    </div>
  );
}

/** Measures every trigger again once the page has settled: after the web
 *  fonts load (headings change height) and shortly after mount. */
export function ScrollRefresh() {
  useEffect(() => {
    let live = true;
    const refresh = () => {
      if (live) ScrollTrigger.refresh();
    };
    document.fonts?.ready.then(refresh);
    const late = window.setTimeout(refresh, 900);
    return () => {
      live = false;
      window.clearTimeout(late);
    };
  }, []);
  return null;
}
