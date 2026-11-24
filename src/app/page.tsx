import { ContactBand } from "@/components/ContactBand";
import { Eyebrow } from "@/components/Eyebrow";
import PageTransition from "@/components/PageTransition";
import { hero } from "@/content/home";

// Stand-in home page inside the site chrome, until the home milestone builds
// the full page (hero, proof row, pillars, journey, night band, hiring).
export default function Home() {
  return (
    <PageTransition>
      <section className="site-hero" aria-labelledby="home-title">
        <div className="site-wrap">
          <div className="site-hero-content">
            <Eyebrow variant="hero">{hero.eyebrow}</Eyebrow>
            <h1 id="home-title">{hero.name}</h1>
          </div>
        </div>
      </section>
      <ContactBand surface="sand" />
    </PageTransition>
  );
}
