import type { ReactNode } from "react";

// A small rounded label at the top of a tile ("What I lead", "Now"). `dot`
// adds the vermilion live dot (pulsing unless reduced motion; v5.css), which
// always sits beside text, so colour is never the only signal.
export function Chip({
  children,
  dot = false,
  icon,
  className,
}: {
  children: ReactNode;
  dot?: boolean;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span className={["v5-chip", className].filter(Boolean).join(" ")}>
      {dot ? <span className="v5-dot" aria-hidden="true" /> : null}
      {icon}
      <span>{children}</span>
    </span>
  );
}

/** Her LinkedIn and Instagram marks. lucide-react 1.x has no brand icons,
 *  so the paths are inline, the same ones the classic footer uses
 *  (src/components/SocialLinks.tsx). Decorative: the link text names them. */
const BRAND_PATHS = {
  linkedin:
    "M5.372 24H.398V7.982h4.974zM2.882 5.797a2.884 2.884 0 1 1 0-5.768 2.884 2.884 0 0 1 0 5.768zM24 24h-4.974v-7.794c0-1.858-.038-4.249-2.589-4.249-2.591 0-2.988 2.025-2.988 4.115V24H8.475V7.982h4.776v2.185h.068c.665-1.26 2.288-2.589 4.71-2.589C23.067 7.578 24 10.896 24 15.206z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
} as const;

export function BrandIcon({ name, size = 20 }: { name: keyof typeof BRAND_PATHS; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <path d={BRAND_PATHS[name]} fillRule="evenodd" />
    </svg>
  );
}

/** The MJ monogram (she signs as MJ, F004): the paths of src/app/icon.svg,
 *  drawn in the current colour. Decorative. */
export function MonogramMark({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="butt" strokeLinejoin="round">
        <path d="M9 47V17L19 33L29 17V47" />
        <path d="M44 17H53V38A7.5 7.5 0 0 1 38 38" />
      </g>
    </svg>
  );
}
