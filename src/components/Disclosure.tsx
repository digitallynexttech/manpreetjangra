"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

// Ported from the sibling site (E:\deepkgoel\app\components\Disclosure.tsx).
// The logic is unchanged; the differences are the props: `title: string` is
// widened to `summary: ReactNode` (the About journey puts a year and an <h3>
// in it), the panel is `.site-disclosure-panel` around `.site-disclosure-body`,
// and `reveal={false}` drops the block's own `data-reveal` when its parent (a
// timeline row) already carries one.

// The animation each block is currently running, if any.
const running = new WeakMap<HTMLDetailsElement, Animation>();

// Opens or closes one block, growing or shrinking its panel when `animate` is
// set. `data-closing` marks a block that is still open only because its
// closing animation is playing.
function setOpen(block: HTMLDetailsElement, opening: boolean, animate: boolean) {
  const body = block.querySelector<HTMLElement>(":scope > .site-disclosure-panel");
  running.get(block)?.cancel();
  if (!body || !animate || typeof body.animate !== "function") {
    block.open = opening;
    delete block.dataset.closing;
    return;
  }
  // Start from the height on screen now, so a click mid-animation reverses
  // smoothly from where the panel is.
  const from = block.open ? body.getBoundingClientRect().height : 0;
  if (opening) {
    block.open = true;
    delete block.dataset.closing;
  } else {
    block.dataset.closing = "true";
  }
  const to = opening ? body.scrollHeight : 0;
  const animation = body.animate(
    {
      height: [`${from}px`, `${to}px`],
      opacity: opening ? [from ? 1 : 0, 1] : [1, 0],
    },
    { duration: 460, easing: "cubic-bezier(0.32, 0.72, 0, 1)" },
  );
  running.set(block, animation);
  animation.onfinish = () => {
    running.delete(block);
    if (!opening) {
      block.open = false;
      delete block.dataset.closing;
    }
  };
}

// A <details> block that opens and closes smoothly instead of snapping. Blocks
// that share a `group` behave like an accordion: opening one closes the
// others. It is still a real <details>, so it works without JavaScript, and it
// switches instantly when the visitor asks for reduced motion.
export function Disclosure({
  summary,
  children,
  defaultOpen = false,
  group,
  reveal = true,
  className,
}: {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  /** Blocks with the same group name keep only one of them open. */
  group?: string;
  /** False when the parent already reveals on scroll (a timeline row). */
  reveal?: boolean;
  className?: string;
}) {
  const details = useRef<HTMLDetailsElement>(null);

  function toggle(event: MouseEvent) {
    const block = details.current;
    if (!block) return;
    event.preventDefault();
    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const opening = !block.open || block.dataset.closing === "true";
    if (opening && group) {
      const others = document.querySelectorAll<HTMLDetailsElement>(`details[data-group="${CSS.escape(group)}"]`);
      for (const other of others) {
        if (other !== block && other.open && other.dataset.closing !== "true") setOpen(other, false, animate);
      }
    }
    setOpen(block, opening, animate);
  }

  return (
    <details
      ref={details}
      className={className ? `site-disclosure ${className}` : "site-disclosure"}
      open={defaultOpen}
      data-group={group}
      data-reveal={reveal ? "" : undefined}
    >
      <summary onClick={toggle}>
        {summary}
        <span className="site-disclosure-icon" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="site-disclosure-panel">
        <div className="site-disclosure-body">{children}</div>
      </div>
    </details>
  );
}
