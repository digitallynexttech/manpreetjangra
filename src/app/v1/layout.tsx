import { SiteChrome } from "@/components/SiteChrome";
import { V1_BASE } from "@/lib/versions";

// The classic site (Home, About, Work, Writing, Careers, Contact), the first
// of the five editions, served at /v1 (plan/versions-spec.md 2.1). This
// layout only adds v1's chrome, which the root layout rendered before /v2
// existed (plan/v2-spec.md 3.1); the chrome and the pages give every link of
// this site the /v1 prefix, so a visitor stays in this edition.
export default function V1Layout({ children }: LayoutProps<"/v1">) {
  return <SiteChrome base={V1_BASE}>{children}</SiteChrome>;
}
