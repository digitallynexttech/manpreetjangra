// The curved edge out of a night section above (the home Feature's curve,
// Lando's soft section joins): placed first inside the section below, it
// carries the night down in a curve instead of a straight line. The header
// reads it as night. Styles: `.v2-curve` (home.css, loaded on every /v2 page).
export function NightCurve() {
  return (
    <svg className="v2-curve" data-v2-theme="night" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M0 0 H1440 V18 C 1120 118 320 118 0 18 Z" />
    </svg>
  );
}
