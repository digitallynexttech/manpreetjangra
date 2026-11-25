// The small looping thread mark over a section label (the home manifesto's
// mark), in the theme's stroke colour: vermilion on paper, marigold on
// night. Decorative.
export function ThreadMark({ className }: { className?: string }) {
  return (
    <svg className={["v2-inner-mark", className].filter(Boolean).join(" ")} viewBox="0 0 64 40" aria-hidden="true" focusable="false">
      <path d="M4 30 C 14 30 18 8 30 8 C 40 8 38 26 30 26 C 22 26 26 10 40 10 C 50 10 54 22 60 22" />
    </svg>
  );
}
