import { ArrowUpRight } from "lucide-react";
import { socialLinks } from "@/content/navigation";
import { labels } from "@/content/v5";
import { BrandIcon } from "./Chip";
import { breakAfterSlashes } from "./Heads";

// Her two profiles as rows (brand icon, name, handle, arrow), for the socials
// tile of the home and the "Elsewhere" tiles of the inner pages. Each row
// opens the profile in a new tab and says so to screen readers.
export function SocialList({ className }: { className?: string }) {
  return (
    <ul className={["v5-social-list", className].filter(Boolean).join(" ")}>
      {socialLinks.map((link) => (
        <li key={link.key}>
          <a className="v5-social" href={link.href} target="_blank" rel="noopener noreferrer">
            <span className="v5-social-icon">
              <BrandIcon name={link.key} size={18} />
            </span>
            <span className="v5-social-text">
              <span className="v5-social-label">{link.label}</span>
              <span className="v5-social-handle">{breakAfterSlashes(link.handle)}</span>
            </span>
            <ArrowUpRight className="v5-social-arrow" size={18} strokeWidth={2} aria-hidden="true" />
            <span className="v5-sr">{labels.newTab}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
