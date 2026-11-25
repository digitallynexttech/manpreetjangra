import type { InternalHref } from "@/content/types";

// The site has five editions of one portfolio, each under its own address
// prefix: /v1 (the classic site) to /v5 (plan/versions-spec.md). The content
// files keep the classic page addresses ("/about", "/contact?type=speaking");
// an edition turns them into its own with `withBase`. Only types are imported,
// so a client component may import this file.

/** The classic edition's prefix. Its canonical links and the sitemap use it. */
export const V1_BASE = "/v1";

/**
 * The address of a page of this site inside an edition: "/" with base "/v1"
 * gives "/v1", "/about#bio" gives "/v1/about#bio", "/#x" gives "/v1#x" and
 * "/?a=b" gives "/v1?a=b". An empty base returns the address as it is. Links
 * to other sites, mailto: links and in-page anchors ("#id") pass unchanged,
 * and so does an address that already starts with the base.
 */
export function withBase(href: InternalHref, base: string): InternalHref;
export function withBase(href: string, base: string): string;
export function withBase(href: string, base: string): string {
  if (!base || !href.startsWith("/") || href.startsWith("//")) return href;
  if (href === base || href.startsWith(`${base}/`) || href.startsWith(`${base}#`) || href.startsWith(`${base}?`))
    return href;
  if (href === "/") return base;
  if (href.startsWith("/#") || href.startsWith("/?")) return `${base}${href.slice(1)}`;
  return `${base}${href}`;
}

/** The /v1 address of a classic page ("/careers#criteria" -> "/v1/careers#criteria"). */
export function toV1(href: InternalHref): InternalHref;
export function toV1(href: string): string;
export function toV1(href: string): string {
  return withBase(href, V1_BASE);
}
