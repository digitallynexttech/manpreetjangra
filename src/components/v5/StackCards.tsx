"use client";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotionPref } from "./media";
import type { Tone } from "./Tile";

// Stacking cards (plan/versions-spec.md, V5: "a stacking cards section, where
// the journey chapters stick and scale down as the next card slides over",
// with useScroll and useTransform). Every card sits in a sticky slot, each a
// step lower than the one before, so the cards pile up with their top edges
// showing. While the list scrolls past, each card scales down (from its top
// edge) and dims a little as the cards after it slide over it.
//
// The stacking itself is CSS (sticky), so it works without JavaScript; the
// scaling and dimming need it. With reduced motion the slots are not sticky
// (v5.css) and nothing scales: a plain list of cards.

export type StackCard = { key: string; tone: Tone; labelledBy?: string; content: ReactNode };

function Card({
  index,
  count,
  progress,
  still,
  card,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  still: boolean;
  card: StackCard;
}) {
  // A card starts to shrink and dim once the next card begins to slide over
  // it (a little after it has stuck), and ends at 4 % smaller per card above.
  const below = count - 1 - index;
  const start = Math.min(1, (index + 0.55) / count);
  const scale = useTransform(progress, [start, 1], [1, 1 - below * 0.04]);
  const shade = useTransform(progress, [start, 1], [0, Math.min(0.42, below * 0.085)]);
  return (
    <li className="v5-stack-slot" style={{ "--i": index } as CSSProperties}>
      <motion.article
        className="v5-tile v5-stack-card"
        data-tone={card.tone}
        aria-labelledby={card.labelledBy}
        style={still ? undefined : { scale }}
      >
        {card.content}
        <motion.span className="v5-stack-shade" aria-hidden="true" style={{ opacity: still ? 0 : shade }} />
      </motion.article>
    </li>
  );
}

export function StackCards({ cards, className }: { cards: readonly StackCard[]; className?: string }) {
  const list = useRef<HTMLOListElement>(null);
  const still = useReducedMotionPref();
  const { scrollYProgress } = useScroll({ target: list, offset: ["start start", "end end"] });
  return (
    <ol ref={list} className={["v5-stack", className].filter(Boolean).join(" ")}>
      {cards.map((card, index) => (
        <Card key={card.key} index={index} count={cards.length} progress={scrollYProgress} still={still} card={card} />
      ))}
    </ol>
  );
}
