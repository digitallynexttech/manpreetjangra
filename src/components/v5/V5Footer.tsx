import Link from "next/link";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import { LocalTime } from "@/components/LocalTime";
import { socialLinks } from "@/content/navigation";
import { footer } from "@/content/shared";
import { footage, labels, v5Nav } from "@/content/v5";
import { BrandIcon, MonogramMark } from "./Chip";

// The footer tile of every /v5 page (plan/versions-spec.md, V5: "a footer
// tile with links, the credit line and All editions"): one night tile with
// her name, role and the live New Delhi time, the pages, her profiles, and a
// base line with the credit, the footage credit and the way back to the
// editions index.
//
// The classic credit's last sentence is about the generated textures behind
// the classic headings and quotes; /v5 shows none of them, so only its first
// two sentences are used here (the words themselves are unchanged).

function creditLine(): string {
  const text = footer.credit.text.replace("{year}", String(new Date().getFullYear()));
  const sentences = text.split(/(?<=\.)\s+/);
  return sentences.slice(0, 2).join(" ");
}

export function V5Footer() {
  return (
    <footer className="v5-footer v5-wrap">
      <div className="v5-tile v5-footer-tile" data-tone="night">
        <div className="v5-footer-brand">
          <span className="v5-footer-mark" aria-hidden="true">
            <MonogramMark size={30} />
          </span>
          <p className="v5-footer-name">{footer.wordmark}</p>
          <p className="v5-footer-role">{footer.role.text}</p>
          <p className="v5-footer-time">
            <span className="v5-dot v5-dot--still" aria-hidden="true" />
            <LocalTime prefix={footer.place.prefix} />
          </p>
        </div>

        <nav className="v5-footer-col" aria-labelledby="v5-footer-pages">
          <h2 id="v5-footer-pages" className="v5-footer-heading">
            {labels.pages}
          </h2>
          <ul className="v5-footer-links">
            {v5Nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="v5-footer-col">
          <h2 className="v5-footer-heading">{footer.elsewhereHeading}</h2>
          <ul className="v5-footer-links">
            {socialLinks.map((link) => (
              <li key={link.key}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <BrandIcon name={link.key} size={16} />
                  {link.label}
                  <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                  <span className="v5-sr">{labels.newTab}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="v5-footer-base">
          <p>{creditLine()}</p>
          <p>
            {footage.label}: {footage.providers}
          </p>
          {/* A full page load: the index has its own chrome and styles. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- the editions index is left with a full load on purpose */}
          <a className="v5-footer-editions" href="/">
            <LayoutGrid size={16} strokeWidth={2} aria-hidden="true" />
            {labels.allEditions}
          </a>
        </div>
      </div>
    </footer>
  );
}
