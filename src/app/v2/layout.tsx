import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ClassicLink } from "@/components/v2/ClassicLink";
import { FieldPortrait } from "@/components/v2/FieldPortrait";
import { SmoothScroll } from "@/components/v2/SmoothScroll";
import { V2Footer } from "@/components/v2/V2Footer";
import { V2Header } from "@/components/v2/V2Header";
import { hero } from "@/content/home";
import { podium, portrait, zari } from "@/content/images";
import { headerCta, socialLinks } from "@/content/navigation";
import { labels, toV2, v2Nav, wordmark } from "@/content/v2";
import "./v2.css";
// The page styles load with the layout, so moving between /v2 pages (and
// the link prefetches that come before it) never fetches a stylesheet the
// current page does not use; every rule in them is scoped to its own v2-
// classes.
import "./home.css";
import "./inner.css";

// The scroll edition of the site (plan/v2-spec.md 3.1): its own chrome (the
// header with its full-screen menu, the main landmark the skip link targets,
// the footer card) around the /v2 pages, inside one smooth-scroll provider.
// The root layout still gives fonts, metadata, the skip link and JSON-LD.
//
// /v2 is an alternative edition of the same content, so it is kept out of
// search results (each page's canonical link names its classic page) and out
// of the sitemap.

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

/** The three pictures of the open menu (after Lando's photo grid): her
 *  portrait on its field, then the podium photograph (two rows tall) and the
 *  zari texture in warm monochrome (colour on hover). A blank texture tile
 *  read as a missing picture, so there is none.
 *  Decorative: the menu's links carry the meaning. */
function MenuTiles() {
  const sizes = "(min-width: 1024px) 22vw, 1px";
  const tile = (index: number, child: ReactNode, mono = true, tall = false) => (
    <div
      key={index}
      className={`v2-menu-tile${mono ? " v2-menu-tile--mono" : ""}${tall ? " v2-menu-tile--tall" : ""}`}
      style={{ "--i": index } as CSSProperties}
    >
      {child}
    </div>
  );
  return (
    <>
      {tile(0, <FieldPortrait portrait={portrait} sizes={sizes} decorative />, false)}
      {tile(1, <Image src={podium.src} alt="" width={podium.width} height={podium.height} sizes={sizes} />, true, true)}
      {tile(2, <Image src={zari.src} alt="" width={zari.width} height={zari.height} sizes={sizes} />)}
    </>
  );
}

/** Under the menu's links: the contact line, her profiles, the classic site. */
function MenuFoot() {
  return (
    <>
      <Link className="v2-menu-small" href={toV2(hero.primary.href)}>
        {hero.primary.label}
      </Link>
      <div className="v2-menu-socials">
        {socialLinks.map((link) => (
          <a key={link.key} className="v2-menu-small" href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
            <span className="v2-sr-only">{labels.newTab}</span>
          </a>
        ))}
        <ClassicLink className="v2-menu-small">{labels.classicSite}</ClassicLink>
      </div>
    </>
  );
}

export default function V2Layout({ children }: LayoutProps<"/v2">) {
  return (
    <div className="v2">
      <SmoothScroll>
        <V2Header
          nav={v2Nav}
          wordmark={wordmark}
          contact={{ label: headerCta.label, href: toV2(headerCta.href) as `/${string}` }}
          labels={{ openMenu: labels.openMenu, closeMenu: labels.closeMenu, menu: labels.menu }}
          menuTiles={<MenuTiles />}
          menuFoot={<MenuFoot />}
        />
        <main id="site-content" tabIndex={-1}>
          {children}
        </main>
        <V2Footer />
      </SmoothScroll>
    </div>
  );
}
