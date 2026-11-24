import type { ReactNode } from "react";
import { keepSeparators } from "@/lib/site";

// Eyebrow (spec 3.7): the vermilion thread, then the label in Geist Mono
// uppercase. The thread is 32 px in section heads and 48/64 px in the hero;
// it draws itself in when its block is revealed (globals.css 6.10). A text
// label never ends a line on a middle dot (keepSeparators).
export function Eyebrow({
  children,
  variant = "section",
  tone = "light",
  className,
}: {
  children: ReactNode;
  variant?: "hero" | "section";
  /** Night is automatic inside `.band-night`; this forces it elsewhere. */
  tone?: "light" | "night";
  className?: string;
}) {
  return (
    <p className={["site-eyebrow", tone === "night" && "site-eyebrow--night", className].filter(Boolean).join(" ")}>
      <span className={variant === "hero" ? "mj-thread mj-thread--hero" : "mj-thread"} aria-hidden="true" />
      <span className="site-eyebrow-label">{typeof children === "string" ? keepSeparators(children) : children}</span>
    </p>
  );
}
