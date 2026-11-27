import type { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import { MixedHeading } from "@/components/v2/MixedHeading";
import { PillButton } from "@/components/v2/PillButton";
import { ThreadField } from "@/components/v2/ThreadField";
import { notFound } from "@/content/shared";

// The branded 404 (spec 4.7) inside the site's chrome: the 404 label, the
// heading and lede from the content, a way back home and three shortcuts.
// Next adds the noindex tag to this page itself.

export const metadata: Metadata = { title: notFound.title, description: null, openGraph: null, twitter: null };

export default function NotFound() {
  return (
    <PageTransition>
      <section className="v2-surface v2-inner-section v2-nope" data-v2-theme="paper" aria-labelledby="v2-nope-title">
        <ThreadField seed={13} count={10} />
        <div className="v2-wrap v2-nope-inner">
          <p className="v2-label v2-inner-eyebrow">{notFound.eyebrow}</p>
          <MixedHeading as="h1" id="v2-nope-title" size="title" parts={[{ text: notFound.heading, voice: "sans" }]} />
          <p className="v2-body v2-nope-lede">{notFound.lede}</p>
          <div className="v2-nope-actions">
            <PillButton href={notFound.back.href}>{notFound.back.label}</PillButton>
            {notFound.links.map((link) => (
              <Link key={link.href} className="v2-nope-link" href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
