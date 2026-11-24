import { Fragment } from "react";
import { socialLinks } from "@/content/navigation";

// Her LinkedIn and Instagram profiles as icon and label rows (footer), or
// icon, label and handle rows (`showHandles`, Contact page). lucide-react 1.x
// has no brand icons, so the paths are inline, the same ones the sibling
// site's footer uses (E:\deepkgoel\app\components\UI.tsx, `footerSocials`).

const paths: Record<(typeof socialLinks)[number]["key"], string> = {
  linkedin:
    "M5.372 24H.398V7.982h4.974zM2.882 5.797a2.884 2.884 0 1 1 0-5.768 2.884 2.884 0 0 1 0 5.768zM24 24h-4.974v-7.794c0-1.858-.038-4.249-2.589-4.249-2.591 0-2.988 2.025-2.988 4.115V24H8.475V7.982h4.776v2.185h.068c.665-1.26 2.288-2.589 4.71-2.589C23.067 7.578 24 10.896 24 15.206z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
};

/** A handle may break after a slash ("linkedin.com/in/" then the name)
 *  rather than inside the name (QA3-05). The stored handle stays verbatim;
 *  `overflow-wrap: anywhere` on the Contact details is only the fallback. */
function breakAfterSlashes(handle: string) {
  return handle.split("/").map((part, index, parts) => (
    <Fragment key={index}>
      {part}
      {index < parts.length - 1 ? (
        <>
          /<wbr />
        </>
      ) : null}
    </Fragment>
  ));
}

export function SocialLinks({
  tone = "light",
  showHandles = false,
  className,
}: {
  /** Icon colour follows the surface: ink-muted on light, on-night-muted on night. */
  tone?: "light" | "night";
  showHandles?: boolean;
  className?: string;
}) {
  return (
    <div className={["site-social", tone === "night" && "site-social--night", className].filter(Boolean).join(" ")}>
      {socialLinks.map((link) => (
        <a key={link.key} href={link.href} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            <path d={paths[link.key]} fillRule="evenodd" />
          </svg>
          <span>
            {link.label}
            {showHandles ? <span className="site-social-handle">{breakAfterSlashes(link.handle)}</span> : null}
          </span>
          <span className="site-sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}
