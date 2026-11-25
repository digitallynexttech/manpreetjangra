"use client";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { ScrollTrigger } from "./gsap";

// A big row that opens to its details (spec 4.2, 4.3: the About journey),
// with the classic Disclosure's behaviour (src/components/Disclosure.tsx):
// the panel grows and shrinks smoothly instead of snapping, a click mid-way
// reverses from where the panel is, rows sharing a `group` open one at a
// time, and reduced motion switches at once. It is a real <details>: without
// JavaScript the browser opens and closes it, and the `name` attribute keeps
// one row of a group open at a time. Once the script runs, the group is kept
// by the script instead (the attribute would close the previous row
// instantly, cutting its closing animation short), so the attribute is
// dropped on mount.
//
// The open or closed panel changes the page's height, so every scroll trigger
// below it is measured again when the panel settles.

const running = new WeakMap<HTMLDetailsElement, Animation>();

/** The classic Disclosure's `setOpen`, on the v2 row's panel. */
function setOpen(block: HTMLDetailsElement, opening: boolean, animate: boolean) {
  const panel = block.querySelector<HTMLElement>(":scope > .v2-row-panel");
  running.get(block)?.cancel();
  if (!panel || !animate || typeof panel.animate !== "function") {
    block.open = opening;
    delete block.dataset.closing;
    ScrollTrigger.refresh();
    return;
  }
  const from = block.open ? panel.getBoundingClientRect().height : 0;
  if (opening) {
    block.open = true;
    delete block.dataset.closing;
  } else {
    block.dataset.closing = "true";
  }
  const to = opening ? panel.scrollHeight : 0;
  // Clipped only while it moves, so focus rings inside are never cut.
  panel.style.overflow = "clip";
  const animation = panel.animate(
    { height: [`${from}px`, `${to}px`], opacity: opening ? [from ? 1 : 0, 1] : [1, 0] },
    { duration: 460, easing: "cubic-bezier(0.32, 0.72, 0, 1)" },
  );
  running.set(block, animation);
  animation.onfinish = () => {
    running.delete(block);
    panel.style.removeProperty("overflow");
    if (!opening) {
      block.open = false;
      delete block.dataset.closing;
    }
    ScrollTrigger.refresh();
  };
}

export function RowDisclosure({
  summary,
  children,
  group,
  defaultOpen = false,
}: {
  summary: ReactNode;
  children: ReactNode;
  /** Rows with the same group keep only one of them open. */
  group?: string;
  defaultOpen?: boolean;
}) {
  const details = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    details.current?.removeAttribute("name");
  }, []);

  function toggle(event: MouseEvent) {
    const block = details.current;
    if (!block) return;
    event.preventDefault();
    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const opening = !block.open || block.dataset.closing === "true";
    if (opening && group) {
      const others = document.querySelectorAll<HTMLDetailsElement>(`details[data-v2-group="${CSS.escape(group)}"]`);
      for (const other of others) {
        if (other !== block && other.open && other.dataset.closing !== "true") setOpen(other, false, animate);
      }
    }
    setOpen(block, opening, animate);
  }

  return (
    <details ref={details} name={group} open={defaultOpen} data-v2-group={group}>
      <summary className="v2-row-inner" onClick={toggle}>
        {summary}
      </summary>
      <div className="v2-row-panel">
        <div className="v2-row-detail">{children}</div>
      </div>
    </details>
  );
}
