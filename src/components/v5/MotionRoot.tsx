"use client";
import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

// motion's settings for /v5: with reduced motion asked for, motion components
// skip transform and layout animations (the dock highlight jumps instead of
// sliding). The hand-driven springs in Tile, SpringNumber, StackCards and
// QuoteCarousel check the preference themselves.
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
