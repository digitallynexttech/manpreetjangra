import { contactBand } from "@/content/shared";
import { withBase } from "@/lib/versions";
import { Button } from "./Button";
import { SectionHead, titleId } from "./SectionHead";
import { TextLink } from "./TextLink";

// Contact band (spec 3.6): the closing call to action on Home, About and
// Work. Writing, Careers and Contact end with their own. From lg the text
// takes columns 1-7 and the actions columns 9-12, level with the lede's
// last line; on phones they stack. `base` is the edition's address prefix
// ("/v1"), given to the Get in touch link.
export function ContactBand({ surface, base = "" }: { surface: "sand" | "paper"; base?: string }) {
  const band = contactBand;
  return (
    <section
      id={band.id}
      aria-labelledby={titleId(band.id)}
      className={`site-section ${surface === "sand" ? "bg-sand" : "bg-paper"}`}
    >
      <div className="site-wrap site-grid">
        <SectionHead
          id={band.id}
          eyebrow={band.eyebrow}
          title={band.title}
          accent={band.accent}
          lede={band.lede}
          className="lg:col-span-7 lg:mb-0"
        />
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-4 lg:col-span-4 lg:col-start-9 lg:self-end lg:justify-end"
          data-reveal
        >
          <Button href={withBase(band.primary.href, base)}>{band.primary.label}</Button>
          <TextLink href={band.secondary.href} external={band.secondary.external}>
            {band.secondary.label}
          </TextLink>
        </div>
      </div>
    </section>
  );
}
