import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { editions, editionsIndex, type Edition } from "@/content/editions";
import { footer } from "@/content/shared";
import { EditionsReveal } from "./EditionsReveal";
import "./editions.css";

// The editions index at / (plan/versions-spec.md 2.4): her name, the label,
// then one card per edition with its preview, number, name, concept line and
// motion technique, linking to the edition's home page. Quiet, in v1's
// tokens; every class is `editions-` and lives in editions.css (no Tailwind
// classes: this folder is kept out of the classic stylesheet's scan).
//
// Previews are first-screen captures at 1520x776 in public/editions/vN.webp.
// The page is static, so the check for each file runs at build time: an
// edition whose capture is not there yet shows a plain night panel with its
// number instead of a broken image.
//
// The cards use plain <a> links, not next/link: each edition has its own
// chrome, scroll engine and libraries, so a full page load is the clean way
// in (and nothing is prefetched for an edition that is not deployed).

const PREVIEW = { width: 1520, height: 776 };
// One column on phones, two from 768 px, three (then two) from 1280 px.
const SIZES = "(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 100vw";

function previewOf(edition: Edition): string | null {
  const file = `editions/v${edition.number}.webp`;
  return existsSync(join(process.cwd(), "public", file)) ? `/${file}` : null;
}

export function EditionsIndex() {
  const credit = footer.credit.text.replace("{year}", String(new Date().getFullYear()));
  return (
    <div className="editions">
      <main id="site-content" tabIndex={-1} className="editions-main">
        <div className="editions-wrap">
          <header className="editions-intro">
            <p className="editions-label">
              <span className="editions-thread" aria-hidden="true" />
              {editionsIndex.label}
            </p>
            <h1 className="editions-title">{footer.wordmark}</h1>
            <p className="editions-role">{footer.role.text}</p>
          </header>

          <ol className="editions-grid" aria-label={editionsIndex.listLabel}>
            {editions.map((edition, index) => {
              const preview = previewOf(edition);
              return (
                <li key={edition.number} className="editions-card">
                  <div className="editions-card-media">
                    {preview ? (
                      <Image
                        src={preview}
                        alt=""
                        width={PREVIEW.width}
                        height={PREVIEW.height}
                        sizes={SIZES}
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                    ) : (
                      <span className="editions-card-fallback" aria-hidden="true">
                        {edition.code}
                      </span>
                    )}
                  </div>
                  <div className="editions-card-body">
                    <h2 className="editions-card-name">
                      {/* The link covers the whole card (::after); its name is
                          the code and the edition name ("V3 Cinema"). */}
                      <a className="editions-card-link" href={edition.href}>
                        <span className="editions-card-code">{edition.code}</span> {edition.name}
                      </a>
                    </h2>
                    <p className="editions-card-concept">{edition.concept}</p>
                    <p className="editions-card-motion">
                      <span className="editions-card-motion-label">{editionsIndex.motionLabel}</span>
                      {edition.motion}
                    </p>
                    <p className="editions-card-open" aria-hidden="true">
                      {editionsIndex.open} {edition.code}
                      <ArrowRight size={18} strokeWidth={1.5} />
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </main>
      <footer className="editions-foot">
        <div className="editions-wrap">
          <p>{credit}</p>
        </div>
      </footer>
      <EditionsReveal />
    </div>
  );
}
