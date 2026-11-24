import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { footer } from "@/content/shared";
import { LocalTime } from "./LocalTime";
import { Monogram } from "./Monogram";
import { SocialLinks } from "./SocialLinks";

// Footer (spec 3.4): the night surface at the end of every page. From lg a
// 12-column grid of three blocks (brand, site links, elsewhere); below lg
// they stack 40 px apart. Only the local time runs in the browser.
export function Footer() {
  // Evaluated when the page is built.
  const credit = footer.credit.text.replace("{year}", String(new Date().getFullYear()));
  return (
    <footer className="site-footer">
      <div className="site-wrap">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <Monogram size={40} />
            <p className="site-footer-wordmark mt-5">{footer.wordmark}</p>
            <p className="mt-2">{footer.role.text}</p>
            <p className="site-caption mt-3">
              <LocalTime prefix={footer.place.prefix} />
            </p>
          </div>
          <nav className="site-footer-site" aria-labelledby="site-footer-site-title">
            <h2 id="site-footer-site-title" className="site-footer-heading">
              {footer.siteHeading}
            </h2>
            <ul className="site-footer-links">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="site-footer-elsewhere">
            <h2 className="site-footer-heading">{footer.elsewhereHeading}</h2>
            <SocialLinks tone="night" />
          </div>
        </div>
        <p className="site-footer-bottom">{credit}</p>
      </div>
    </footer>
  );
}
