import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { PageIntro } from "@/components/PageIntro";
import PageTransition from "@/components/PageTransition";
import { SiteChrome } from "@/components/SiteChrome";
import { TextLink } from "@/components/TextLink";
import { introImages } from "@/content/images";
import { notFound } from "@/content/shared";
import { V1_BASE, toV1 } from "@/lib/versions";

// The branded 404 (spec 4.7): the page intro on the thread-paper texture, a
// way back home that slides back (nav-back, spec 2.3) and three shortcuts.
// Next adds the noindex tag to this page itself. It stays in the classic
// style, and its links lead into the classic edition at /v1
// (plan/versions-spec.md 2.5).

export const metadata: Metadata = { title: notFound.title, description: null, openGraph: null, twitter: null };

export default function NotFound() {
  return (
    <SiteChrome base={V1_BASE}>
      <PageTransition>
        <PageIntro eyebrow={notFound.eyebrow} title={notFound.heading} lede={notFound.lede} image={introImages.notFound}>
          <Button href={toV1(notFound.back.href)} transitionTypes={["nav-back"]}>
            {notFound.back.label}
          </Button>
          {notFound.links.map((link) => (
            <TextLink key={link.href} href={toV1(link.href)}>
              {link.label}
            </TextLink>
          ))}
        </PageIntro>
      </PageTransition>
    </SiteChrome>
  );
}
