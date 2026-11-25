import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import type { ReactNode } from "react";
import type { Para } from "@/content/types";
import { labels, toV3 } from "@/content/v3";
import type { SequenceName } from "@/lib/sequences";
import { chapterNumber } from "@/lib/v3";
import { FootageScene } from "./Scenes";
import { ledeText, withAccent } from "./text";

// Server building blocks of the /v3 inner pages (plan/versions-spec.md 3, V3
// Inner pages): the title scene each page opens with, section heads, links
// and the end card. They only arrange copy the pages pass in.

/** The id of a section's heading, for `aria-labelledby`. */
export const headId = (id: string) => `${id}-title`;

/** A link inside /v3, with an arrow. */
export function ForwardLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link className={className ?? "v3-link"} href={toV3(href)}>
      {children}
      <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}

/** A link to another site, in a new tab. */
export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a className={className ?? "v3-link"} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
      <span className="v3-sr-only">{labels.newTab}</span>
    </a>
  );
}

/** A link by its address: mailto: as a plain link with the mail icon,
 *  https in a new tab, anything else inside /v3. */
export function AnyLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  if (href.startsWith("mailto:"))
    return (
      <a className={className ?? "v3-link"} href={href}>
        {children}
        <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
      </a>
    );
  if (/^https?:\/\//.test(href))
    return (
      <ExternalLink href={href} className={className}>
        {children}
      </ExternalLink>
    );
  return (
    <ForwardLink href={href} className={className}>
      {children}
    </ForwardLink>
  );
}

/** The page's main button (gold outline), by its address like `AnyLink`. */
export function SceneButton({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("mailto:"))
    return (
      <a className="v3-button" href={href}>
        {children}
        <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
      </a>
    );
  if (/^https?:\/\//.test(href))
    return (
      <a className="v3-button" href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
        <span className="v3-sr-only">{labels.newTab}</span>
      </a>
    );
  return (
    <Link className="v3-button" href={toV3(href)}>
      {children}
      <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}

/** A section head: the slate (eyebrow), the heading and an optional lede.
 *  Pass `rise` to let it rise into place with the blocks of a `Rise`. */
export function SceneHead({
  id,
  eyebrow,
  title,
  accent,
  lede,
  className,
  rise = false,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string | Para;
  className?: string;
  rise?: boolean;
  children?: ReactNode;
}) {
  const flag = rise ? { "data-v3-in": "" } : {};
  return (
    <div className={className ? `v3-head ${className}` : "v3-head"}>
      <p className="v3-slate" {...flag}>
        {eyebrow}
      </p>
      <h2 id={headId(id)} className="v3-head-title" {...flag}>
        {withAccent(title, accent)}
      </h2>
      {lede ? (
        <p className="v3-lede" {...flag}>
          {ledeText(lede)}
        </p>
      ) : null}
      {children}
    </div>
  );
}

/** The scene each inner page opens with: its footage fills the screen between
 *  letterbox bars, with the page's chapter number on the bottom bar, its
 *  eyebrow, the H1 and the lede. Scrolling opens the bars and plays the
 *  footage, then the title drifts up as the scene cuts to the page. */
export function TitleScene({
  href,
  sequence,
  eyebrow,
  title,
  accent,
  lede,
  short = false,
  focusX,
  focusY,
  children,
}: {
  /** The page's /v3 address, for its chapter number. */
  href: string;
  sequence: SequenceName;
  eyebrow: string;
  title: string;
  accent?: string;
  lede: string;
  /** A shorter run (the contact page, where the form is the point). */
  short?: boolean;
  focusX?: number;
  focusY?: number;
  children?: ReactNode;
}) {
  return (
    <section className={title.length > 44 ? "v3-opening v3-opening--long" : "v3-opening"} aria-labelledby="v3-page-title">
      <FootageScene
        kind="title"
        sequence={sequence}
        priority
        focusX={focusX}
        focusY={focusY}
        className={short ? "v3-scene--brief" : undefined}
      >
        <span className="v3-dim" aria-hidden="true" />
        <span className="v3-shade" aria-hidden="true" />
        <div className="v3-opening-copy" data-v3-title>
          <p className="v3-slate v3-opening-slate">{eyebrow}</p>
          <h1 id="v3-page-title" className="v3-opening-title">
            <span className="v3-opening-title-in">{withAccent(title, accent)}</span>
          </h1>
          <p className="v3-opening-lede">{lede}</p>
          {children}
        </div>
        <span className="v3-matte v3-matte--top" aria-hidden="true" />
        <span className="v3-matte v3-matte--bottom" aria-hidden="true" />
        <div className="v3-opening-foot" aria-hidden="true" data-v3-cue>
          <span className="v3-opening-chapter">
            {labels.chapter} {chapterNumber(href)}
          </span>
          <span className="v3-cue">
            {labels.scroll}
            <span className="v3-cue-line" />
          </span>
        </div>
      </FootageScene>
    </section>
  );
}

/** The last card of a page: a call to action set like the end of a film's
 *  credits (the classic contact band on About and Work, Apply on Careers). */
export function EndCard({
  id,
  eyebrow,
  title,
  accent,
  lede,
  primary,
  secondary,
}: {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string | Para;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section id={id} className="v3-endcard" aria-labelledby={headId(id)}>
      <div className="v3-endcard-inner">
        <span className="v3-rule" aria-hidden="true" />
        <p className="v3-slate">{eyebrow}</p>
        <h2 id={headId(id)} className="v3-scene-title v3-endcard-title">
          {withAccent(title, accent)}
        </h2>
        {lede ? <p className="v3-lede v3-endcard-lede">{ledeText(lede)}</p> : null}
        <div className="v3-actions v3-endcard-actions">
          <SceneButton href={primary.href}>{primary.label}</SceneButton>
          {secondary ? <AnyLink href={secondary.href}>{secondary.label}</AnyLink> : null}
        </div>
      </div>
    </section>
  );
}
