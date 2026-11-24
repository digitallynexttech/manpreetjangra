import { SiteChrome } from "@/components/SiteChrome";

// The classic site (Home, About, Work, Writing, Careers, Contact). The route
// group keeps the URLs as they were; this layout only adds v1's chrome, which
// the root layout rendered before /v2 existed (plan/v2-spec.md 3.1).
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteChrome>{children}</SiteChrome>;
}
