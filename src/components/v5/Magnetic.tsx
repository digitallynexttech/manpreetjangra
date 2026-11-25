"use client";
import type { PointerEvent, ReactNode } from "react";
import { motion, useSpring } from "motion/react";
import { FINE_MOTION, useMedia } from "./media";

// A magnetic wrapper for a button (plan/versions-spec.md, V5): while a mouse
// pointer is over the button or the band around it, the button leans toward
// the pointer on a spring and springs back when the pointer leaves. Touch,
// pen and reduced motion get a still button. The wrapper is an inline block
// with a slightly larger hit area (v5.css `.v5-magnet`), so the pull starts
// just before the pointer reaches the button.

const SPRING = { stiffness: 220, damping: 14, mass: 0.5 };

export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  /** How far the button follows the pointer (0 to 1 of the offset, at most
   *  12 px across and 8 px up or down). */
  strength?: number;
  className?: string;
}) {
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const active = useMedia(FINE_MOTION);

  const onPointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (!active || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    const pull = (offset: number, limit: number) => Math.max(-limit, Math.min(limit, offset * strength));
    x.set(pull(event.clientX - (box.left + box.width / 2), 12));
    y.set(pull(event.clientY - (box.top + box.height / 2), 8));
  };
  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className={["v5-magnet", className].filter(Boolean).join(" ")}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.span className="v5-magnet-inner" style={{ x, y }}>
        {children}
      </motion.span>
    </motion.span>
  );
}
