import type { Metadata } from "next";
import { EditionsIndex } from "@/components/editions/EditionsIndex";
import { editionsMeta } from "@/content/editions";

// The root: the editions index (plan/versions-spec.md 2.4), where the five
// editions of the portfolio can be opened and compared. The classic site
// lives at /v1. The index is a way in, not a page of the portfolio, so it is
// noindex (the sitemap lists the /v1 pages). It has its own small chrome (in
// EditionsIndex) inside the root layout, which adds the skip link and the
// structured data.

export const metadata: Metadata = {
  title: { absolute: editionsMeta.title },
  description: editionsMeta.description,
  robots: { index: false, follow: true },
};

export default function EditionsPage() {
  return <EditionsIndex />;
}
