import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { IntroImage } from "@/content/types";
import { Accent } from "./Accent";
import { Eyebrow } from "./Eyebrow";

// Page intro (spec 3.5): the heading block at the top of every inner page and
// the 404 page. Paper, with a faint picture behind the heading (IntroBackdrop),
// the eyebrow, the H1 (one italic accent phrase at most), the lede and
// optional children (the Hiring pill, buttons). The entrance animation is in
// globals.css ("First appearance of the heading on every inner page").

/** The id of the intro heading; the section is labelled by it. */
export const PAGE_TITLE_ID = "page-title";

/** The faint picture behind an inner page's heading. Ported from the sibling
 *  site's `IntroBackdrop` (E:\deepkgoel\app\components\UI.tsx); here it sits
 *  on paper, starts `start` across the section and fades toward the words
 *  (CSS mask), so the heading stays easy to read. Its settings per page are
 *  `introImages` in src/content/images.ts. */
export function IntroBackdrop({ image }: { image: IntroImage }) {
  return (
    <div
      className="site-intro-backdrop"
      aria-hidden="true"
      style={
        {
          "--intro-opacity": image.opacity,
          "--intro-position": image.position,
          "--intro-start": image.start,
        } as CSSProperties
      }
    >
      {/* It sits at the top of the page, so it loads with the page. */}
      <Image src={image.src} alt="" fill sizes="62vw" loading="eager" fetchPriority="low" />
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  accent,
  lede,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lede: ReactNode;
  image: IntroImage;
  /** Shown 32 px below the lede: the Hiring pill, buttons, links. */
  children?: ReactNode;
}) {
  return (
    <section className="site-page-intro" aria-labelledby={PAGE_TITLE_ID}>
      <IntroBackdrop image={image} />
      <div className="site-wrap">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 id={PAGE_TITLE_ID}>
          <Accent text={title} accent={accent} />
        </h1>
        <p className="site-lede site-intro-lede">{lede}</p>
        {children ? <div className="site-intro-actions">{children}</div> : null}
      </div>
    </section>
  );
}
