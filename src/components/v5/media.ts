"use client";
import { useSyncExternalStore } from "react";

// Media queries as React state, read with useSyncExternalStore: the server
// and the first (hydrating) render see `serverValue`, then the browser's
// answer, so nothing mismatches and no effect has to set state.

export const REDUCED = "(prefers-reduced-motion: reduce)";
/** A mouse or trackpad, with motion allowed: tilt and magnetic pulls. */
export const FINE_MOTION = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

const subscribers = new Map<string, (onChange: () => void) => () => void>();

function subscriberFor(query: string) {
  let subscribe = subscribers.get(query);
  if (!subscribe) {
    subscribe = (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    };
    subscribers.set(query, subscribe);
  }
  return subscribe;
}

export function useMedia(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    subscriberFor(query),
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** True when the visitor asks for reduced motion (false on the server). */
export function useReducedMotionPref(): boolean {
  return useMedia(REDUCED);
}

/** Reads the preference outside React (in effects and handlers). */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(REDUCED).matches;
}

const noop = () => () => {};
/** False on the server and while hydrating, true afterwards: for behaviour
 *  that only exists with JavaScript (a drag track replacing native scroll). */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
