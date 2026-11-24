import { hiringPill } from "@/content/shared";
import { plural } from "@/lib/site";

// "Hiring now · 28 open roles" (spec 6.6, 7.2): blush pill, vermilion-ink
// text, a vermilion dot drawn by CSS. The count comes from roles.ts; the
// parent renders nothing when there are no roles.
export function HiringPill({ count, className }: { count: number; className?: string }) {
  return (
    <p className={className ? `site-pill ${className}` : "site-pill"}>
      {hiringPill.prefix}
      {plural(count, hiringPill.one, hiringPill.many)}
    </p>
  );
}
