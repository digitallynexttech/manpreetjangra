import type { ElementType } from "react";

// A mono uppercase caption ("2019 · NEW DELHI", spec 3.4). The parts are
// joined with a middle dot; the dot is real text, so the line reads the same
// to everyone. Empty parts (an unconfirmed detail) are left out.
export function CaptionLabel({
  parts,
  as: Tag = "span",
  small = false,
  className,
  id,
}: {
  parts: readonly (string | undefined | null | false)[];
  as?: ElementType;
  small?: boolean;
  className?: string;
  id?: string;
}) {
  const shown = parts.filter((part): part is string => typeof part === "string" && part.trim() !== "");
  return (
    <Tag id={id} className={["v2-label v2-caption", small && "v2-label--small", className].filter(Boolean).join(" ")}>
      {shown.map((part, index) => (
        <span key={index}>
          {index > 0 ? (
            // Real spaces around the dot, so screen readers and copied text
            // keep the words apart; v2.css pulls the gap back to its look.
            <span className="v2-caption-dot">{" · "}</span>
          ) : null}
          {part}
        </span>
      ))}
    </Tag>
  );
}
