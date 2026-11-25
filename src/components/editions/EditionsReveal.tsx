"use client";
import { useEffect } from "react";

// The index's scroll reveal (plan/versions-spec.md 2.4, "a light scroll
// reveal"), the same pattern as v1's Motion: cards below the first screen
// wait (faded, a little lower) and rise into place as they come into view,
// those arriving together one after another. Cards on the first screen keep
// their CSS entrance (editions.css). Nothing is hidden without JavaScript or
// with reduced motion, and a card is handed back to its own hover once it
// has arrived. Renders nothing.
export function EditionsReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    // An arrived card is `is-shown`: no reveal classes, and no first-screen
    // entrance either (editions.css), so its hover works as usual.
    const settle = (card: HTMLElement) => {
      if (card.classList.contains("is-waiting")) card.classList.add("is-shown");
      card.classList.remove("is-waiting", "is-in");
      card.style.removeProperty("--editions-delay");
    };
    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const card = entry.target as HTMLElement;
          const delay = Math.min(order++, 3) * 110;
          card.style.setProperty("--editions-delay", `${delay}ms`);
          card.classList.add("is-in");
          observer.unobserve(card);
          timers.push(setTimeout(() => settle(card), delay + 1300));
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -24px 0px" },
    );
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".editions-card"));
    for (const card of cards) {
      if (card.getBoundingClientRect().top < window.innerHeight) continue;
      card.classList.add("is-waiting");
      observer.observe(card);
    }
    // Keyboard focus inside a waiting card shows it at once.
    const focus = (event: FocusEvent) => {
      const card = event.target instanceof Element ? event.target.closest<HTMLElement>(".editions-card.is-waiting") : null;
      if (!card || card.classList.contains("is-in")) return;
      card.classList.add("is-in");
      observer.unobserve(card);
      timers.push(setTimeout(() => settle(card), 1300));
    };
    document.addEventListener("focusin", focus);
    return () => {
      document.removeEventListener("focusin", focus);
      observer.disconnect();
      timers.forEach(clearTimeout);
      cards.forEach(settle);
    };
  }, []);
  return null;
}
