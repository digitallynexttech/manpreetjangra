import type { ElementType, ReactNode } from "react";

// A card with one notched corner (spec 2: radius 10 px, a 28 px diagonal cut
// bottom left or top right, made with clip-path), Lando's helmet cards. The
// fill is the theme's card colour (night-raised on night, sand on paper), and
// an optional caption row sits under a hairline (name, year).
export function NotchCard({
  as: Tag = "div",
  corner = "bl",
  caption,
  className,
  children,
}: {
  as?: ElementType;
  corner?: "bl" | "tr";
  caption?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={["v2-notch", `v2-notch--${corner}`, className].filter(Boolean).join(" ")}>
      {children}
      {caption ? <div className="v2-notch-caption v2-label">{caption}</div> : null}
    </Tag>
  );
}
