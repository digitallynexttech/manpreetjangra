import Link from "next/link";
import { LocalTime } from "@/components/LocalTime";
import { socialLinks } from "@/content/navigation";
import { footer } from "@/content/shared";
import { chapters, labels } from "@/content/v3";
import { copyrightLine, footageCredit } from "@/lib/v3";

// The /v3 footer, set like the last card of a film's credits: centred, her
// name and role, the chapters, her profiles, then the small print: the
// footage credit (spec 1: "Motion footage: ..." listing only the providers of
// the sequences /v3 plays), the copyright line and the way back to the
// editions index ("All editions", spec 1).
export function V3Footer() {
  return (
    <footer className="v3-footer">
      <div className="v3-footer-inner">
        <p className="v3-footer-name">{footer.wordmark}</p>
        <p className="v3-footer-role">{footer.role.text}</p>
        <p className="v3-footer-place">
          <LocalTime prefix={footer.place.prefix} />
        </p>
        <nav className="v3-footer-nav" aria-label={labels.chapters}>
          <ol>
            {chapters.map((chapter) => (
              <li key={chapter.href}>
                <Link href={chapter.href}>
                  <span className="v3-footer-number" aria-hidden="true">
                    {chapter.number}
                  </span>
                  {chapter.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <ul className="v3-footer-social" aria-label={labels.follow}>
          {socialLinks.map((link) => (
            <li key={link.key}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
                <span className="v3-sr-only">{labels.newTab}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="v3-footer-small">
          <p>
            {labels.motionFootage}: {footageCredit()}
          </p>
          <p>{copyrightLine()}</p>
          <p>
            <Link href="/" className="v3-footer-editions" prefetch={false}>
              {labels.allEditions}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
