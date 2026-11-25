"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { EASE_IN, MEDIA, ScrollTrigger, SplitText, gsap, useGSAP } from "../gsap";

// The scroll scenes of the /v2 home page (plan/v2-spec.md 4.1, 3.3). Each
// shell wraps server-rendered content and animates it by class name, so all
// the copy stays in the server components and the content files.
//
// Pins are CSS sticky stages: a shell adds `is-pinned` (or `is-horizontal`)
// to its section on desktop with motion allowed, which makes the section
// taller and its stage sticky; the scrubbed timeline then runs over the
// section's own scroll range. Nothing is pinned below 1024 px or with reduced
// motion, and nothing is hidden before the script runs: every "from" state
// is set here, by GSAP.

type Flags = { desktop?: boolean; small?: boolean };

/** Hero (4.1 item 1): on the way down the portrait panel lags behind the
 *  page, the two name lines drift apart and the "now" card lifts. The
 *  entrance (rise, panel, card) is CSS, so it never waits for this. */
export function HeroScene({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const node = root.current;
      const section = node?.closest("section");
      if (!node || !section) return;
      const lines = node.querySelectorAll<HTMLElement>(".v2-hero-name > .v2-rise");
      const panel = node.querySelector(".v2-hero-panel");
      const now = node.querySelector(".v2-hero-now");
      const mm = gsap.matchMedia();
      mm.add({ desktop: MEDIA.desktop, small: MEDIA.small }, (context) => {
        const { desktop } = context.conditions as Flags;
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.5 },
        });
        if (desktop && lines.length > 1) {
          timeline.to(lines[0], { xPercent: -7 }, 0).to(lines[1], { xPercent: 12 }, 0);
        }
        if (panel) timeline.to(panel, { yPercent: desktop ? 20 : 8 }, 0);
        if (now && desktop) timeline.to(now, { yPercent: -45 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}

/** Her words (4.1 item 2): pinned for 150 % of the viewport on desktop. The
 *  panel settles from slightly large to slightly small, the quote lights up
 *  word by word and the marigold thread is drawn across the panel. Phones:
 *  the same reveal while the panel scrolls past, no pin. */
export function WordsScene({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const stage = root.current;
      const section = stage?.closest("section");
      if (!stage || !section) return;
      const panel = stage.querySelector(".v2-words-panel");
      const quote = stage.querySelector<HTMLElement>(".v2-words-quote");
      const loop = stage.querySelector(".v2-words-loop path");
      const mm = gsap.matchMedia();
      mm.add({ desktop: MEDIA.desktop, small: MEDIA.small }, (context) => {
        const { desktop } = context.conditions as Flags;
        if (desktop) section.classList.add("is-pinned");
        const split = quote ? SplitText.create(quote, { type: "words", wordsClass: "v2-word", tag: "span", aria: "none" }) : null;
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: desktop
            ? { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.6 }
            : { trigger: panel ?? stage, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        });
        if (desktop && panel) timeline.fromTo(panel, { scale: 1.08 }, { scale: 0.95, duration: 1 }, 0);
        // Dimmed words start at 0.4: still above 3:1 on the raised panel (large
        // text), so the quote stays readable at every point of the scrub.
        if (split) timeline.fromTo(split.words, { opacity: 0.4 }, { opacity: 1, duration: 0.16, stagger: 0.42 / split.words.length }, 0.02);
        if (loop) timeline.fromTo(loop, { strokeDashoffset: 1.001 }, { strokeDashoffset: 0, duration: 0.5 }, desktop ? 0.42 : 0.3);
        timeline.set({}, {}, 1);
        return () => {
          split?.revert();
          section.classList.remove("is-pinned");
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}

/** Journey (4.1 item 4). Desktop: the section turns into a pinned stage and
 *  the row of frames moves sideways over about two viewport widths of
 *  scrolling, each frame at its own speed (`data-speed`), while the ground
 *  goes night, sand, paper and the theme (text colours, header) follows.
 *  The podium photograph warms from grey to colour on its way to the centre
 *  and the quote's underline is drawn as it arrives. Below 1024 px and with
 *  reduced motion the frames stay a vertical collage on their own grounds. */
export function TrackScene({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const stage = root.current;
      const section = stage?.closest("section");
      const row = stage?.querySelector<HTMLElement>(".v2-track-row");
      if (!stage || !section || !row) return;
      const layers = stage.querySelectorAll<HTMLElement>(".v2-track-layer");
      const items = Array.from(stage.querySelectorAll<HTMLElement>(".v2-track-item"));
      const podium = stage.querySelector<HTMLElement>(".v2-track-podium");
      const grey = stage.querySelector(".v2-track-podium .v2-photo-grey");
      const quote = stage.querySelector<HTMLElement>(".v2-track-quote");
      const mark = quote?.querySelector(".v2-draw path");
      const groups = Array.from(section.querySelectorAll<HTMLElement>("[data-v2-track-group]"));
      // No refresh when pictures arrive: every frame reserves its box (width
      // and height on each image), and lazy pictures far along the track load
      // while it is pinned, where a refresh could make the stage stutter.
      const mm = gsap.matchMedia();

      mm.add(MEDIA.desktop, () => {
        // One theme for the whole stage while it is horizontal.
        const themes = groups.map((group) => group.getAttribute("data-v2-theme"));
        groups.forEach((group) => group.removeAttribute("data-v2-theme"));
        section.classList.add("is-horizontal");
        const distance = () => Math.max(0, row.scrollWidth - stage.clientWidth);
        const size = () => section.style.setProperty("--v2-track-distance", `${Math.round(distance())}px`);
        size();
        ScrollTrigger.addEventListener("refreshInit", size);

        let theme = section.dataset.v2Theme ?? "night";
        const setTheme = (next: "night" | "paper") => {
          if (next === theme) return;
          theme = next;
          section.dataset.v2Theme = next;
        };
        const range = { trigger: section, start: "top top", end: "bottom bottom", invalidateOnRefresh: true };
        const move = gsap.to(row, { x: () => -distance(), ease: "none", scrollTrigger: { ...range, scrub: 0.6 } });
        const ground = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { ...range, scrub: 0.6 },
          onUpdate() {
            setTheme(this.progress() > 0.28 ? "paper" : "night");
          },
        });
        if (layers[0]) ground.fromTo(layers[0], { opacity: 0 }, { opacity: 1, duration: 0.07 }, 0.245);
        if (layers[1]) ground.fromTo(layers[1], { opacity: 0 }, { opacity: 1, duration: 0.14 }, 0.64);
        items.forEach((item) => {
          const speed = Number(item.dataset.speed) || 0;
          if (speed) ground.fromTo(item, { x: 0 }, { x: () => -speed * window.innerWidth * 0.22, duration: 1 }, 0);
        });
        ground.set({}, {}, 1);
        if (podium && grey) {
          gsap.fromTo(
            grey,
            { opacity: 1 },
            { opacity: 0, ease: "none", scrollTrigger: { trigger: podium, containerAnimation: move, start: "left 85%", end: "center 52%", scrub: true } },
          );
        }
        if (quote && mark) {
          gsap.fromTo(
            mark,
            { strokeDashoffset: 1.001 },
            { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: quote, containerAnimation: move, start: "left 78%", end: "left 42%", scrub: 0.6 } },
          );
        }
        return () => {
          ScrollTrigger.removeEventListener("refreshInit", size);
          section.classList.remove("is-horizontal");
          section.style.removeProperty("--v2-track-distance");
          section.dataset.v2Theme = "night";
          groups.forEach((group, index) => {
            const value = themes[index];
            if (value) group.setAttribute("data-v2-theme", value);
          });
        };
      });

      mm.add(MEDIA.small, () => {
        items.forEach((item) =>
          gsap.from(item, {
            y: 48,
            opacity: 0,
            duration: 0.9,
            ease: EASE_IN,
            scrollTrigger: { trigger: item, start: "top 92%", once: true },
          }),
        );
        if (podium && grey) {
          gsap.fromTo(grey, { opacity: 1 }, { opacity: 0, ease: "none", scrollTrigger: { trigger: podium, start: "top 85%", end: "center 50%", scrub: true } });
        }
        if (quote && mark) {
          gsap.fromTo(mark, { strokeDashoffset: 1.001 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: quote, start: "top 80%", end: "bottom 60%", scrub: 0.6 } });
        }
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}

/** The podium photograph (4.1 item 5): on desktop the section pins and the
 *  frame opens from an inset window to the full screen while the picture
 *  inside grows; phones get the same opening as the frame scrolls in. */
export function PodiumScene({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const stage = root.current;
      const section = stage?.closest("section");
      const frame = stage?.querySelector(".v2-podium-frame");
      if (!stage || !section || !frame) return;
      const photo = stage.querySelector(".v2-podium-photo");
      const mm = gsap.matchMedia();
      mm.add({ desktop: MEDIA.desktop, small: MEDIA.small }, (context) => {
        const { desktop } = context.conditions as Flags;
        if (desktop) section.classList.add("is-pinned");
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: desktop
            ? { trigger: section, start: "top 35%", end: "bottom bottom", scrub: 0.6 }
            : { trigger: frame, start: "top bottom", end: "center 55%", scrub: 0.6 },
        });
        timeline.fromTo(
          frame,
          { clipPath: desktop ? "inset(17% 26% 17% 26% round 12px)" : "inset(9% 7% 9% 7% round 12px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.82 },
          0,
        );
        if (photo) timeline.fromTo(photo, { scale: desktop ? 0.78 : 0.9 }, { scale: 1, duration: 0.82 }, 0);
        timeline.set({}, {}, 1);
        return () => section.classList.remove("is-pinned");
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}

/** From her feed (4.1 item 9): on desktop the quote cards open from a
 *  stack into a fan as the row scrolls in (one CSS variable, `--fan`, that
 *  the cards' transforms read; 1 is the open fan, the state without script
 *  or with reduced motion). Phones show a sideways row instead. */
export function FanScene({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const node = root.current;
      if (!node) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.desktop, () => {
        gsap.fromTo(
          node,
          { "--fan": 0 },
          { "--fan": 1, ease: "none", scrollTrigger: { trigger: node, start: "top 88%", end: "center 52%", scrub: 0.6 } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}

/** Measures every trigger again once the whole page has mounted: the scenes
 *  above change their sections' heights (pins) as they start, after some
 *  triggers inside them were measured. Renders nothing. */
export function ScrollRefresh() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);
  return null;
}
