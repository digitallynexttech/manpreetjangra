import Link from "next/link";
import { LocalTime } from "@/components/LocalTime";
import { hasRoles, roles } from "@/content/roles";
import { footer, hiringPill } from "@/content/shared";
import { labels, toV4, v4Sections } from "@/content/v4";
import { plural } from "@/lib/site";
import { Nameplate } from "./Nameplate";
import { SectionBar } from "./SectionBar";

// The top of every /v4 page (plan/versions-spec.md, V4 navigation): the
// ears (dateline with the time in New Delhi, the edition, and the hiring
// count as a promo), the nameplate, the double rule, then the section bar,
// which is a sibling of the masthead so that it can stay stuck to the top
// of the whole sheet. The masthead names the view timeline the slim bar
// reads (`--v4-masthead`, v4.css).

export function Masthead() {
  const name = footer.wordmark;
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("");
  return (
    <>
      <header className="v4-masthead">
        <div className="v4-ears">
          <p className="v4-ear v4-ear--left">
            <LocalTime prefix={footer.place.prefix} />
          </p>
          <p className="v4-ear v4-ear--centre">{labels.edition}</p>
          <p className="v4-ear v4-ear--right">
            {hasRoles ? (
              <Link href={toV4("/careers")}>
                <span className="v4-live-dot" aria-hidden="true" />
                {hiringPill.prefix}
                {plural(roles.length, hiringPill.one, hiringPill.many)}
              </Link>
            ) : (
              footer.role.text
            )}
          </p>
        </div>
        <Nameplate name={name} frontPage={labels.frontPage} />
        <div className="v4-masthead-foot">
          <span className="v4-double-rule" aria-hidden="true" />
        </div>
      </header>
      <SectionBar
        items={v4Sections}
        name={name}
        initials={initials}
        label={labels.sections}
        frontPage={labels.frontPage}
      />
    </>
  );
}
