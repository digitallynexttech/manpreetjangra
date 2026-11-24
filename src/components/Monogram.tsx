// The MJ monogram (spec 8.4; she signs as MJ, F004): paper strokes on a
// vermilion-ink square, the same paths as src/app/icon.svg. The square uses
// the `fill-vermilion-ink` utility so the colour stays a token.
export function Monogram({ size = 40, title, className }: { size?: number; title?: string; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={["text-paper", className].filter(Boolean).join(" ")}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <rect width="64" height="64" rx="4" className="fill-vermilion-ink" />
      <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="butt" strokeLinejoin="round">
        <path d="M9 47V17L19 33L29 17V47" />
        <path d="M44 17H53V38A7.5 7.5 0 0 1 38 38" />
      </g>
    </svg>
  );
}
