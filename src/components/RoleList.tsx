import { ArrowUpRight } from "lucide-react";
import type { RoleGroupView } from "@/content/types";
import { plural } from "@/lib/site";

// The open roles at Digitally Next (spec 4.5.2): one block per group, in the
// order of roles.ts, each with its heading, a count ("1 role", "7 roles")
// and hairline rows. Every row is one link to the role's own listing on
// digitallynext.com, so the agency's page stays the source of truth.
// The parent renders nothing here when no role is listed (spec 4.9).
export function RoleList({
  groups,
  countLabel,
  className,
}: {
  groups: readonly RoleGroupView[];
  /** The count under each group heading: "1 role", "{n} roles" (careers.ts). */
  countLabel: { one: string; many: string };
  className?: string;
}) {
  return (
    <div className={className ? `site-role-groups ${className}` : "site-role-groups"}>
      {groups.map((group) => (
        <div key={group.key} className="site-role-group" data-reveal="group">
          <div className="site-role-group-head" data-reveal>
            <h3 className="text-h4">{group.heading}</h3>
            <p className="site-caption site-tabular">{plural(group.count, countLabel.one, countLabel.many)}</p>
          </div>
          <ul className="site-rows">
            {group.roles.map((role) => (
              <li key={role.href} data-reveal>
                <a className="site-row site-role" href={role.href} target="_blank" rel="noopener noreferrer">
                  <span className="site-role-title">{role.title}</span>
                  {/* An internship's department repeats its group heading,
                      so it is shown only where it adds something. */}
                  {role.department !== group.heading ? (
                    <span className="site-caption site-role-department">{role.department}</span>
                  ) : null}
                  <span className="site-sr-only"> (opens in a new tab)</span>
                  <ArrowUpRight className="site-arrow site-role-arrow" size={18} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
