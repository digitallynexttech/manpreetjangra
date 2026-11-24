import type { HomeHero, Portrait as PortraitData } from "@/content/types";
import { keepSeparators } from "@/lib/site";
import { Accent } from "./Accent";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";
import { Portrait } from "./Portrait";
import { TextLink } from "./TextLink";

/** The id of the home H1 (her name); the hero section is labelled by it. */
export const HERO_TITLE_ID = "hero-title";

// The home hero (spec 4.1.1). From lg: words in columns 1-7, the portrait in
// columns 8-12 (right-aligned, sized so the whole frame fits the first
// screen). Below lg the words come first, so her name is the first thing
// read and the text is the largest paint on phones; the portrait follows.
//
// Not `data-reveal`: the hero has its own entrance (eyebrow, name,
// statement, buttons, credential line one after another) and, from lg, a
// little scroll depth. Both are CSS only, in globals.css.
export function Hero({ hero, portrait, hasRoles }: { hero: HomeHero; portrait: PortraitData; hasRoles: boolean }) {
  // With no open roles the secondary link points at how she hires (spec 4.9).
  const secondary = hasRoles ? hero.secondary : hero.secondaryEmpty;
  return (
    <section className="site-hero" aria-labelledby={HERO_TITLE_ID}>
      <div className="site-wrap">
        <div className="site-hero-content">
          <Eyebrow variant="hero">{hero.eyebrow}</Eyebrow>
          <h1 id={HERO_TITLE_ID}>{hero.name}</h1>
          <p className="site-hero-statement">
            <Accent text={hero.statement} accent={hero.accent} />
          </p>
          <div className="site-hero-ctas">
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
            <TextLink href={secondary.href}>{secondary.label}</TextLink>
          </div>
          <p className="site-hero-credential">{keepSeparators(hero.credential)}</p>
        </div>
        <Portrait portrait={portrait} />
      </div>
    </section>
  );
}
