# Design decision: "Ink, Vermilion and Marigold"

> Copy kept in the repository so the code carries its own rationale. The original lives in the project's `plan/` folder (outside this repository), copied on 24 November 2026. Paths such as `plan/`, `research/`, `assets/` and `.work/` refer to that project folder; `site/` is this repository. The repository branch is `master` (the plan says `main`). Edited for the copy: one detail of a personal photo in section 4.3 is shortened. Content now lives in `src/content/` (decisions.md D04), not `src/data/`.

Judge: design-judge agent, 2026-11-23. Status: FINAL. The planner and the builder follow this file; nothing in it is open.
Subject: personal site of Manpreet Jangra, Chief Operating Officer, Digitally Next (BFG Market Consult Pvt Ltd), New Delhi.

Inputs read in full: `plan/proposal-her-evidence.md`, `plan/proposal-executive-credibility.md`, `plan/proposal-agency-continuity.md`, `plan/deepak-goel-parity.md`, `research/find-critique.md` (sections 7, 9, 10, 12), `research/find-social.md` (sections 3, 4, 6), `research/find-references.md` (section 4), `research/seed-facts.md`, `research/facts.md` (sections 5, 6, 8, 9), `assets/photos/README.md`, Deepak's `app/globals.css`, `app/layout.tsx`, `app/icon.svg`, and the scaffold's `site/src/app/{globals.css,layout.tsx}` and `site/package.json`.
Photos looked at: `assets/photos/portrait-isocial-2019-bw-transparent.png`, `assets/refs/social/linkedin-profile-400.jpg`, `ig-2025-10-17-diwali-a.jpg`, `ig-2025-09-02-coffee.jpg`, and the Codex sample `plan/assets/her-evidence/zari-vermilion-16x9-sample.png`.
Own work files (re-runnable): `E:\manpreetjangraportfolio\.work\design-judge\contrast_final.py` and its output `contrast_final.md`; composites `cutout-on-vermilion.png` and `cutout-on-paper.png` (the hero portrait on both candidate grounds).

---

## 1. Verdict

**Synthesis, built on the Executive-credibility proposal ("Ink & Vermilion") as the base**, with three grafts from Her-evidence and three from Agency-continuity, and with every motion and engineering choice replaced by the Deepak Goel parity requirements.

Why the base is Executive-credibility: it is the only proposal that (a) already uses the prepared 720 x 848 cut-out as the hero, on the vermilion ground the group itself used for her in 2019 (F214), (b) keeps the accent hers (hue 8 degrees, her Diwali silk) while staying clear of the agency red (hue 358 degrees), (c) has a complete, computed contrast table with a UI-border token split, and (d) rations colour the way the credible executive references do (one accent on paper, ink for text: sandycarter.net, aprildunford.com, paulfey.me; find-references 4b-9). Its palette hexes survive almost unchanged; its motion plan, its texture list and its hero stamp do not.

### 1.1 What was grafted

| From | What | Why it earns a place |
|---|---|---|
| Her-evidence | **Gold as vermilion's partner** (renamed `marigold`, value from Executive's softened amber #F3B35C) used as the offset "print" backing of the primary button and of the hero frame, as the text-selection colour, and as the accent text colour on the night band | Vermilion silk with gold zari is the single strongest piece of her own colour choice (Diwali 2025, F212); marigold garlands (F212) and the stage light in the podium photo (F210) repeat it. Pairing the two turns a "red site" into a "her site". It also echoes, in her colours, the offset-backed button of the sibling site (Deepak's yellow), which the parity doc requires mechanically |
| Her-evidence | **The "MJ" monogram** for favicon and footer sign-off | She calls herself MJ (F004, publish). The only mark invented for her is one she already uses |
| Her-evidence | **The rule that draws in**, reworked as the site's one signature motion ("the vermilion thread", section 5.2) and **the already generated zari texture** (used once, at low opacity, behind the night band) | Restrained, hers, and costs no new asset: the zari sample exists and is on-palette (dominant #701103 to #D9934B) |
| Agency-continuity | **`Portrait` data with intrinsic size and a `kind` switch** (`cutout` / `photo`) | Lets a future 2000 px colour original drop into the same frame without layout work (section 4.2) |
| Agency-continuity | **The red budget**: at most three vermilion things per viewport (one thread or rule, one accent word, one primary button); plus the QA test "if any viewport could pass as a page of digitallynext.com, the budget is exceeded" | An enforceable rule a reviewer can check on a screenshot; it is the guard that keeps a red-family accent from reading as the agency |
| Agency-continuity | **No pill buttons** | Pill CTAs are the agency's idiom (find-company section 4.4); near-square 2 px buttons are a visible difference at zero cost |

Also adopted from `find-references` 4d: its structure recommendation ("Option A typography on Option B structure": role-stating hero, credential line, proof row, pillars, timeline, thinking, contact). Rejected from the same recommendation: its palette (#FAFAFA / #0A0A0A + agency red #E21F26 + teal micro-accents), for the reasons given against Agency-continuity below.

### 1.2 Why each losing choice lost

**Her-evidence ("Vermilion, zari and ivory")**
- *Fraunces display (SOFT, WONK, opsz 9-144).* Its soft, ornamental optical sizes are exactly the "wedding card instead of a COO" drift its own author lists as risk 3; the three-axis variable file is also the heaviest option (risk 7). Newsreader gives the same warmth in a newsprint register that matches the press she actually has (WER feature F100; the Lokmat reprint).
- *Instrument Sans body.* The author's own fallback note concedes it can feel narrow under Windows ClearType, which is where Karan reviews (1520 x 776). Geist is hinted for that and has a metric-matched mono sibling.
- *Walnut dark #271C19.* Flagged by its author as muddy on dim panels (risk 4). The night band uses the warm ink #1C1816 instead: one near-black for text and for the band, so paper-on-night is the exact inverse of ink-on-paper.
- *Five generated textures (zari, ivory silk, marble, marigold bokeh, walnut grain) across hero, proof row, timeline spine, nav and footer.* Too much ornament for an operator, and a 700 KB budget for decoration. Only the existing zari sample survives on the home page; two quiet textures are generated for inner-page intro backdrops only (section 4.4).
- *Hero built on a 176 px podium "stamp".* Written before the 720 x 848 cut-out existed. A thumbnail cannot carry a premium hero when a larger, cleaner portrait is available.
- *Gold as decorative hairlines on light (1.82:1).* Kept only as a filled offset backing and selection colour, where its low contrast with paper carries no meaning.
- *`motion` library, static-export image settings.* Both superseded by the fixed stack (no animation library; Vercel with next/image optimisation).

**Executive-credibility (base; parts that lost)**
- *`accent-vivid` allowed as text at 24 px and above.* Replaced by a simpler, unbreakable rule: vivid vermilion is never text. All accent text uses `vermilion-ink` (6.19:1), which passes at any size, so no builder or editor has to judge a font size.
- *The arch-masked podium stamp overlapping the hero frame.* Two portraits seven years apart in one hero read as a collage of "then and now" and split attention; the 400 px source is better spent as a crisp 200 px image beside the "On stage" item.
- *Dark proof band with amber numerals.* The verifiable numbers are modest (29K+ LinkedIn followers F190, 699 posts F191, 28 open roles F196). Spotlit in gold on black they look inflated; set quietly in ink serif on sand they look exact. The one dramatic surface goes to her own words instead (WER quotes, F100), her strongest verified asset.
- *Textures G2 to G5 (paper grain overlay, stage light, sandstone, share-card field).* Paper grain over every section costs paint time for an effect nobody names; the share card is a Playwright screenshot of the hero (parity section 4); sandstone and stage light have no place in the final layout.
- *Motion spec (motion 14, no page transitions).* Replaced wholesale by the parity motion language.

**Agency-continuity**
- *Agency red #E21F26 and #B71C1C as her accent, #0A0A0A as her ink.* The brief says the site must read as hers, not the agency's; using the agency's exact triad does the opposite. #E21F26 also fails as text on paper (4.41:1), so it cannot even carry links.
- *The "agency window" dark band in agency tokens with the agency logo and markets.* It puts a digitallynext.com microsite inside her page. The company is present on her site as her employer (text, the venture row and its website preview), not as a second brand.
- *Raw #FFAD01 amber.* Its source is the 2018 X banner, a HOLD fact (F215, colour reference only), it is 1.69:1 on paper, and at full saturation it reads as a warning colour. The softened #F3B35C keeps the evidence (garlands, stage light) and passes 9.58:1 on the night band.
- *Pure white cards on ivory paper.* Two near-whites make a muddy hierarchy; sand #F2ECE3 does the same job with intent.
- *Teal (already excluded there), the walking-X, marquees, `{ 01 }` cards.* Agency devices; none appear.

**Sibling check against Deepak's site.** Same engine (tokens, reveal, transitions, header, press feedback, counters, previews), different identity: his is dark glass, yellow #F4D62B, Space Grotesk, skewed offset buttons; hers is warm paper, vermilion with marigold, Newsreader serif, straight-edged offset buttons. Side by side they read as one group, two people.

---

## 2. Final palette

### 2.1 Evidence base (measured; see also section 7)

| Observation | Value | Source (fact id, status) |
|---|---|---|
| Diwali 2025 silk she chose | #E4270C 25 %, #F53B13 23 % (quantised) | `ig-2025-10-17-diwali-a.jpg`, find-social 3 (F212 flag) |
| Zari on the same outfit; marigold garlands at the office door | #C6A079 to #F0C79E; #F6AF5A, #FABC69 | same; `ig-2025-10-17-diwali-b.jpg` (F212 flag) |
| Group's 2019 presentation of her | b/w cut-out on orange-red #F84C11 | iSoCIAL banner (F214 flag) |
| Cream / ivory around her | podium blazer #FFFCD5, Diwali wall #E7E2DD, aggregate #F6F5EF | F210 flag, F212 flag, find-social 3 |
| Charcoal around her | aggregate #221D21, #121314; glasses, black tops | find-social 3, 6b |
| Stage light in her podium photo | #FDBB6E | F210 flag |
| Agency palette (to stay clear of) | red #E21F26 (hue 358), teal #0EC8C5, #0A0A0A, #FAFAFA | find-company 4; seed-facts |

Hue check (computed): vermilion #E4270C hue 8, vermilion-ink #B4220B hue 8, vermilion-deep #8C1A09 hue 8; agency red #E21F26 hue 358. The accent stays on her side of red: orange-leaning, never blue-leaning.

### 2.2 Tokens (17 colours: 11 light, 6 night)

| Token | Hex | Role | Reason (evidence) |
|---|---|---|---|
| `--color-paper` | #FAF7F2 | Page background, header glass base, text on vermilion fills | Warm off-white between her cream walls / blazer (#E7E2DD, #FFFCD5) and the reference papers (#faf9f6 sandycarter, #fbf4f2 ericaorange). Deliberately warmer than the agency's #FAFAFA |
| `--color-sand` | #F2ECE3 | Inset bands (proof row, alternating section), cards | Lightened from her measured warm neutrals (#DCD1C4, #D6C3A9) and the marble floor; same job as sandycarter's `--color-paper-deep` |
| `--color-blush` | #F9E4DC | Row hover on lists (ventures, press), the "Hiring now" pill, highlighted list item | The blush the red wall casts in her photos (#E7CBBB, #D3B2A0); paper with a trace of the accent |
| `--color-ink` | #1C1816 | All text on light, icons, header text | Warm near-black of her black tops and glasses (#221D21, #121314) and cafe wood (#211611). Not the agency's #0A0A0A |
| `--color-ink-muted` | #5C544E | Secondary text, captions, meta, timeline years | Warm grey; 6.94:1 on paper keeps captions comfortably readable |
| `--color-line` | #E3DBD1 | Hairline dividers, photo-frame hairlines | Sand hairline (#DCD1C4 family). Decorative only, never a control boundary |
| `--color-line-strong` | #8A7F77 | Input and outline-button borders | The lightest warm grey that clears 3:1 on paper (3.65) and sand (3.32): WCAG 1.4.11 |
| `--color-vermilion` | #E4270C | **Graphic only**: the signature thread, timeline nodes, active-nav underline, the hero field highlight, status dots | Her Diwali silk as measured. 4.28:1 on paper: fine for non-text (3:1), and by rule never used as text |
| `--color-vermilion-ink` | #B4220B | **All accent text**: links, the accent phrase in the hero statement, accent eyebrows; primary button fill; focus ring on light; the hero field's shadow | Her silk hue (8 degrees) darkened until it passes as body text at any size (6.19:1). Sits between her silk #E4270C and the office wall #AE1112, and is visibly more orange than #E21F26 |
| `--color-vermilion-deep` | #8C1A09 | Link and primary-button hover / pressed | One step darker (8.67:1). Hover darkens, never brightens (brightening is the agency's `--accent-hover` behaviour) |
| `--color-marigold` | #F3B35C | Offset backing of the primary button and the hero frame; `::selection` and skip-link background (with ink text); accent text, links and focus ring on night; night-band button face | Marigold garlands #F6AF5A, stage light #FDBB6E, zari highlights #F0C79E. Absent from the agency palette. **Never text on light** (1.72:1) |
| `--color-night` | #1C1816 | The one home-page dark band and the footer | Same value as `ink`, named for its role so the band can be tuned without touching text colour. One warm near-black in the whole system |
| `--color-night-raised` | #2A2421 | Cards and the venture preview window on night | Ink lifted one step, kept warm |
| `--color-on-night` | #F4EEE6 | Text on night | Paper transposed, dimmed one step against halation (15.29:1) |
| `--color-on-night-muted` | #B9AEA3 | Secondary text on night | Sand transposed (8.10:1) |
| `--color-night-line` | #3D3531 | Hairlines on night | Decorative only |
| `--color-night-line-strong` | #9A8F86 | Input and outline-button borders on night | 5.58:1 on night, 4.84:1 on raised |

Usage rules (enforced in review):
1. **Vivid vermilion is never text.** Accent text on light is `vermilion-ink`; accent text on night is `marigold`.
2. **Marigold is never text on light.** On light it is a filled backing or a selection background with ink text.
3. **Red budget**: at most three vermilion things per viewport (one thread or rule, one accent phrase, one primary button). Vermilion never fills a section or a card. The only vermilion field on the site is the hero portrait frame.
4. Colour is never the only signal: links are underlined, the active nav item also carries `aria-current` and weight, status dots sit beside a text label.
5. No gradients except the hero field (section 4.1) and the masks on backdrops; no glows; no duotone on her photographs.
6. Excluded on purpose: agency red #E21F26 / #E53935, teal #0EC8C5, #0A0A0A, #FAFAFA, cobalt, lavender, pure #000 and #FFF as surfaces.

Interaction colours: inline links `vermilion-ink`, 1 px underline at `text-underline-offset: 0.2em`; hover `vermilion-deep` and 2 px underline. Nav links `ink` with a vermilion underline that draws in (section 5). Focus: `outline: 2px solid var(--color-vermilion-ink); outline-offset: 3px` on light, `outline-color: var(--color-marigold)` inside `.band-night` and the footer. `::selection { background: var(--color-marigold); color: var(--color-ink); }`.

### 2.3 WCAG 2.1 contrast, computed

Method: `python -I E:\manpreetjangraportfolio\.work\design-judge\contrast_final.py` (relative luminance per WCAG 2.1, ratio = (L1 + 0.05) / (L2 + 0.05)). Thresholds: text 4.5:1; large text and UI boundaries 3:1; "-" rows are decorative or forbidden pairs listed so nobody mistakes them for usable text colours. The header glass is checked at its worst case: paper at 86 % over the night band = #DBD8D3.

| Foreground | Background | Use | Ratio | Needs | Result |
|---|---|---|---|---|---|
| ink #1C1816 | paper #FAF7F2 | Body and headings on the page | 16.49:1 | 4.5 | PASS |
| ink #1C1816 | sand #F2ECE3 | Body on sand bands (proof row, cards) | 15.01:1 | 4.5 | PASS |
| ink #1C1816 | blush #F9E4DC | Body on blush (row hover, highlighted item) | 14.40:1 | 4.5 | PASS |
| ink-muted #5C544E | paper #FAF7F2 | Secondary text, captions | 6.94:1 | 4.5 | PASS |
| ink-muted #5C544E | sand #F2ECE3 | Secondary text on sand | 6.31:1 | 4.5 | PASS |
| ink-muted #5C544E | blush #F9E4DC | Secondary text on blush | 6.06:1 | 4.5 | PASS |
| vermilion-ink #B4220B | paper #FAF7F2 | Links, accent phrase, accent eyebrows | 6.19:1 | 4.5 | PASS |
| vermilion-ink #B4220B | sand #F2ECE3 | Links and accent words on sand | 5.63:1 | 4.5 | PASS |
| vermilion-ink #B4220B | blush #F9E4DC | Accent text on blush hover / Hiring pill | 5.41:1 | 4.5 | PASS |
| vermilion-deep #8C1A09 | paper #FAF7F2 | Link hover / pressed text | 8.67:1 | 4.5 | PASS |
| vermilion-deep #8C1A09 | sand #F2ECE3 | Link hover on sand | 7.89:1 | 4.5 | PASS |
| paper #FAF7F2 | vermilion-ink #B4220B | Primary button label | 6.19:1 | 4.5 | PASS |
| paper #FAF7F2 | vermilion-deep #8C1A09 | Primary button label, hover and pressed | 8.67:1 | 4.5 | PASS |
| ink #1C1816 | marigold #F3B35C | Text selection; skip link; night-band button label | 9.58:1 | 4.5 | PASS |
| ink #1C1816 | glass worst #DBD8D3 | Header text on glass over the night band | 12.40:1 | 4.5 | PASS |
| ink-muted #5C544E | glass worst #DBD8D3 | Header secondary text on glass | 5.21:1 | 4.5 | PASS |
| vermilion-ink #B4220B | paper #FAF7F2 | Focus ring on paper (2 px, offset 3 px) | 6.19:1 | 3.0 | PASS |
| vermilion-ink #B4220B | sand #F2ECE3 | Focus ring on sand | 5.63:1 | 3.0 | PASS |
| vermilion-ink #B4220B | paper #FAF7F2 | Primary button boundary against paper | 6.19:1 | 3.0 | PASS |
| line-strong #8A7F77 | paper #FAF7F2 | Input and outline-button border | 3.65:1 | 3.0 | PASS |
| line-strong #8A7F77 | sand #F2ECE3 | Input and outline-button border on sand | 3.32:1 | 3.0 | PASS |
| vermilion #E4270C | paper #FAF7F2 | Signature thread, timeline nodes, active-nav underline | 4.28:1 | 3.0 | PASS |
| vermilion #E4270C | sand #F2ECE3 | Thread and nodes on sand | 3.89:1 | 3.0 | PASS |
| line #E3DBD1 | paper #FAF7F2 | Hairline divider (decorative) | 1.28:1 | - | decorative |
| marigold #F3B35C | paper #FAF7F2 | Offset backing of button and hero frame | 1.72:1 | - | decorative |
| vermilion #E4270C | paper #FAF7F2 | Vermilion as small text | 4.28:1 | - | forbidden (graphic only) |
| on-night #F4EEE6 | night #1C1816 | Body on the night band and footer | 15.29:1 | 4.5 | PASS |
| on-night #F4EEE6 | night-raised #2A2421 | Body on raised cards / preview window | 13.27:1 | 4.5 | PASS |
| on-night-muted #B9AEA3 | night #1C1816 | Secondary text on night | 8.10:1 | 4.5 | PASS |
| on-night-muted #B9AEA3 | night-raised #2A2421 | Secondary text on raised cards | 7.03:1 | 4.5 | PASS |
| marigold #F3B35C | night #1C1816 | Accent text, eyebrows, links on night | 9.58:1 | 4.5 | PASS |
| marigold #F3B35C | night-raised #2A2421 | Accent text on raised cards | 8.31:1 | 4.5 | PASS |
| night #1C1816 | marigold #F3B35C | Night-band button label on marigold face | 9.58:1 | 4.5 | PASS |
| marigold #F3B35C | night #1C1816 | Focus ring on night; night button boundary | 9.58:1 | 3.0 | PASS |
| night-line-strong #9A8F86 | night #1C1816 | Input / outline-button border on night | 5.58:1 | 3.0 | PASS |
| night-line-strong #9A8F86 | night-raised #2A2421 | Border on raised cards | 4.84:1 | 3.0 | PASS |
| vermilion #E4270C | night #1C1816 | Thread and quote rule on night (graphic) | 3.86:1 | 3.0 | PASS |
| night-line #3D3531 | night #1C1816 | Hairline on night (decorative) | 1.47:1 | - | decorative |
| vermilion-ink #B4220B | night #1C1816 | Vermilion-ink as text on night | 2.66:1 | - | forbidden (use marigold) |

Fix applied while iterating: the header glass was first specified at paper 78 % (Deepak-style translucency); over the night band that gives #C9C6C2, where `ink-muted` drops to 4.36:1. Raised to 86 % (worst case #DBD8D3): every header pair passes, and the header carries ink text only.

All required pairs pass. The five "-" rows are decorative or forbidden by rule 1 and 2 above.

### 2.4 Tailwind v4 tokens (drop-in for `site/src/app/globals.css`, replacing the scaffold file)

The scaffold's `:root` background/foreground pair and its `@media (prefers-color-scheme: dark)` block are deleted (light only, section 6.6). Namespaces are reset so only these tokens exist: no default red-500, no rounded-xl, no stray shadows.

```css
@import "tailwindcss";

/* Motion tokens: copied verbatim from E:\deepkgoel\app\globals.css (lines 75-79 and the
   @supports block, lines 81-148, with both 29-stop linear() springs). Timing tokens only;
   Deepak's brand and venture colour variables are not copied. Unlayered on purpose. */
:root {
  /* The curve iOS uses for sheets and navigation. */
  --ease-ios: cubic-bezier(0.32, 0.72, 0, 1);
  /* Approximations for browsers that cannot draw a real spring. */
  --spring: cubic-bezier(0.3, 1.25, 0.5, 1);
  --spring-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1);
}
/* @supports (transition-timing-function: linear(0, 1)) { :root { --spring: linear(...); --spring-bouncy: linear(...); } }
   paste verbatim from Deepak's file */

@theme {
  --color-*: initial;
  /* light */
  --color-paper: #FAF7F2;
  --color-sand: #F2ECE3;
  --color-blush: #F9E4DC;
  --color-ink: #1C1816;
  --color-ink-muted: #5C544E;
  --color-line: #E3DBD1;
  --color-line-strong: #8A7F77;
  --color-vermilion: #E4270C;        /* graphic only, never text */
  --color-vermilion-ink: #B4220B;    /* all accent text, primary button */
  --color-vermilion-deep: #8C1A09;   /* hover / pressed */
  --color-marigold: #F3B35C;         /* never text on light */
  /* night band and footer */
  --color-night: #1C1816;
  --color-night-raised: #2A2421;
  --color-on-night: #F4EEE6;
  --color-on-night-muted: #B9AEA3;
  --color-night-line: #3D3531;
  --color-night-line-strong: #9A8F86;

  --text-*: initial;
  --text-display: clamp(2.75rem, 1.967rem + 3.478vw, 4.75rem);
  --text-display--line-height: 1;
  --text-display--letter-spacing: -0.02em;
  --text-display--font-weight: 400;
  --text-statement: clamp(1.3125rem, 1.141rem + 0.761vw, 1.75rem);
  --text-statement--line-height: 1.3;
  --text-h2: clamp(2rem, 1.609rem + 1.739vw, 3rem);
  --text-h2--line-height: 1.08;
  --text-h2--letter-spacing: -0.015em;
  --text-h2--font-weight: 400;
  --text-h3: clamp(1.5rem, 1.353rem + 0.652vw, 1.875rem);
  --text-h3--line-height: 1.2;
  --text-h3--letter-spacing: -0.005em;
  --text-h3--font-weight: 500;
  --text-h4: clamp(1.1875rem, 1.114rem + 0.326vw, 1.375rem);
  --text-h4--line-height: 1.3;
  --text-h4--letter-spacing: -0.01em;
  --text-h4--font-weight: 600;
  --text-lede: clamp(1.1875rem, 1.114rem + 0.326vw, 1.375rem);
  --text-lede--line-height: 1.45;
  --text-body: clamp(1rem, 0.976rem + 0.109vw, 1.0625rem);
  --text-body--line-height: 1.65;
  --text-small: 0.875rem;
  --text-small--line-height: 1.5;
  --text-eyebrow: 0.75rem;
  --text-eyebrow--line-height: 1.3;
  --text-eyebrow--letter-spacing: 0.14em;
  --text-eyebrow--font-weight: 500;
  --text-caption: 0.75rem;
  --text-caption--line-height: 1.45;
  --text-caption--letter-spacing: 0.02em;
  --text-stat: clamp(2.75rem, 2.261rem + 2.174vw, 4rem);
  --text-stat--line-height: 1;
  --text-stat--letter-spacing: -0.02em;
  --text-quote: clamp(1.5rem, 1.206rem + 1.304vw, 2.25rem);
  --text-quote--line-height: 1.3;
  --text-button: 0.9375rem;
  --text-button--line-height: 1.25rem;
  --text-button--font-weight: 500;
  --text-nav: 0.875rem;
  --text-nav--line-height: 1.25rem;
  --text-nav--font-weight: 500;

  --radius-*: initial;
  --radius-xs: 2px;      /* buttons, inputs, tags, photo frames */
  --radius-md: 6px;      /* cards, venture preview window */
  --radius-full: 9999px; /* status dots, the Hiring pill only */

  --shadow-*: initial;
  --shadow-header: 0 1px 0 rgb(227 219 209 / 0.9), 0 8px 24px rgb(28 24 22 / 0.06);
  --shadow-preview: 0 18px 48px rgb(28 24 22 / 0.35);

  --container-site: 80rem;   /* 1280 px content width */
  --container-lede: 44rem;
  --container-prose: 38rem;  /* about 68 characters of Geist at 17 px */

  --spacing-gutter: clamp(1.25rem, 4.5vw, 4rem);
  --spacing-section: clamp(4rem, 2.826rem + 5.217vw, 7rem);
  --spacing-header: 4rem;    /* 64 px; 4.5rem (72 px) from lg */
}

@theme inline {
  --font-display: var(--font-newsreader), "Iowan Old Style", Georgia, serif;
  --font-sans: var(--font-geist), system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, "Cascadia Mono", monospace;
}

@layer base {
  html { color-scheme: light; scroll-behavior: smooth; background: var(--color-paper); }
  body { background: var(--color-paper); color: var(--color-ink); font-family: var(--font-sans);
         font-size: var(--text-body); line-height: var(--text-body--line-height); }
  ::selection { background: var(--color-marigold); color: var(--color-ink); }
  :focus-visible { outline: 2px solid var(--color-vermilion-ink); outline-offset: 3px; }
  .band-night :focus-visible, footer :focus-visible { outline-color: var(--color-marigold); }
}
.band-night { background: var(--color-night); color: var(--color-on-night); }
```

Breakpoints stay at Tailwind's defaults (not reset): sm 640, md 768, lg 1024, xl 1280, 2xl 1536.

If Manpreet later rejects red altogether (section 7), the pre-computed fallback ramp is maroon from the same photos (find-social 6b, #6B2335 family): `vermilion` #A33A52 (5.98:1 on paper), `vermilion-ink` #8E2C44 (7.58:1), `vermilion-deep` #6B2335 (10.25:1). On night, #A33A52 is 2.76:1, so under that ramp the night-band thread switches to `marigold`. Swap = three hex values plus a re-run of `contrast_final.py`; no component changes.

---

## 3. Typography

Three Google Fonts families via `next/font/google` (self-hosted at build, no runtime request), all SIL Open Font License, all present in the installed catalogue (`site/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json`, checked 2026-11-23): Newsreader (wght 200-800, opsz 6-72, normal + italic), Geist (wght 100-900), Geist Mono (wght 100-900). Stack Sans (the agency face) is not used: it would make the site read as the agency's, whatever its licence.

| Role | Face | Loaded | Used | Why |
|---|---|---|---|---|
| Display: H1 name, hero statement, H2, H3, ledes, pull quotes, stat numerals, header wordmark | **Newsreader** (Production Type) | variable, `style: ["normal","italic"]`, `axes: ["opsz"]`, latin | 400 (display, H2, statement, quotes, stats), 500 (H3, wordmark); italic 400 for quotes and the one accent phrase. Never bold, never all caps, never below 19 px | A transitional editorial serif in the register of the commercial faces the credible references use (Tiempos on gracewalker.ca, Bitter italics on ericaorange.com) but open-licensed. Its optical-size axis keeps 76 px headings crisp and 19-22 px ledes sturdy. Newsprint roots fit the press she actually has (WER feature F100; a print reprint). Two of three proposals converged on it |
| Body and UI: paragraphs, nav, buttons, H4, forms, lists | **Geist** | variable, latin | 400 body, 500 nav / buttons / labels, 600 H4 | Neutral grotesk that lets the serif carry the voice; excellent hinting at 14-17 px on Windows (Karan's review setup); metric partner of Geist Mono so labels and body align; visibly different from both Stack Sans (agency) and Space Grotesk / Inter (Deepak) |
| Labels: eyebrows, years, stat units, captions, "New Delhi · IST hh:mm" | **Geist Mono** | variable, latin, `preload: false` | 400 captions, 500 eyebrows (uppercase, 0.14em tracking) | The operator register: dates and numbers get their own texture without a fourth family; tabular figures line the timeline up. Her own headline uses the pipe idiom "Digital \| AI \| Good Life" (F005); mono eyebrows with middle dots echo it |

`site/src/app/layout.tsx`:

```ts
import { Newsreader, Geist, Geist_Mono } from "next/font/google";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false });
// <html lang="en-IN" data-scroll-behavior="smooth" className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`}>
```

Font budget: about four woff2 files (Newsreader roman and italic, Geist, Geist Mono), under 300 KB in total; the LCP element is the H1 text in Newsreader roman.

OpenType and setting rules: `font-optical-sizing: auto` (default); `text-wrap: balance` on H1-H3 and the statement, `text-wrap: pretty` on paragraphs; stats and timeline years `font-variant-numeric: lining-nums tabular-nums`; body measure `max-width: var(--container-prose)`; the hero statement `max-width: 32ch`; exactly one italic phrase per heading or statement, coloured `vermilion-ink` only in the hero statement and ink everywhere else.

### 3.1 Scale

Fluid between a 360 px and a 1280 px viewport (clamp slope = (max - min) / 920 px); 1 rem = 16 px. At Karan's 1520 px window every size is at its desktop value.

| Token / role | Face, weight | Mobile (360) | Desktop (>= 1280) | clamp() | Line-height | Tracking |
|---|---|---|---|---|---|---|
| `display` H1 (her name, hero only) | Newsreader 400 | 44 px | 76 px | `clamp(2.75rem, 1.967rem + 3.478vw, 4.75rem)` | 1.0 | -0.02em |
| `statement` hero positioning line | Newsreader 400 (+ italic phrase) | 21 px | 28 px | `clamp(1.3125rem, 1.141rem + 0.761vw, 1.75rem)` | 1.3 | 0 |
| `h2` section titles | Newsreader 400 | 32 px | 48 px | `clamp(2rem, 1.609rem + 1.739vw, 3rem)` | 1.08 | -0.015em |
| `h3` sub-sections, story and timeline chapter titles | Newsreader 500 | 24 px | 30 px | `clamp(1.5rem, 1.353rem + 0.652vw, 1.875rem)` | 1.2 | -0.005em |
| `h4` list and card titles | Geist 600 | 19 px | 22 px | `clamp(1.1875rem, 1.114rem + 0.326vw, 1.375rem)` | 1.3 | -0.01em |
| `lede` first paragraph under H2 | Newsreader 400 | 19 px | 22 px | `clamp(1.1875rem, 1.114rem + 0.326vw, 1.375rem)` | 1.45 | 0 |
| `body` | Geist 400 | 16 px | 17 px | `clamp(1rem, 0.976rem + 0.109vw, 1.0625rem)` | 1.65 | 0 |
| `small` meta, footer | Geist 400 | 14 px | 14 px | fixed `0.875rem` | 1.5 | 0 |
| `eyebrow` above every H2 and the H1 | Geist Mono 500, uppercase | 12 px | 12 px | fixed `0.75rem` | 1.3 | 0.14em |
| `caption` photo captions, timeline years, attributions | Geist Mono 400 | 12 px | 12 px | fixed `0.75rem` | 1.45 | 0.02em |
| `stat` proof numerals | Newsreader 400, tabular lining | 44 px | 64 px | `clamp(2.75rem, 2.261rem + 2.174vw, 4rem)` | 1.0 | -0.02em |
| `quote` pull quotes (night band) | Newsreader italic 400 | 24 px | 36 px | `clamp(1.5rem, 1.206rem + 1.304vw, 2.25rem)` | 1.3 | 0 |
| `button` | Geist 500 | 15 px | 15 px | fixed | 20 px | 0 |
| `nav` | Geist 500 | 14 px (menu sheet: Newsreader 400, 28 px) | 14 px | fixed | 20 px | 0 |
| Header wordmark "Manpreet Jangra" | Newsreader 500 | 18 px | 20 px | `clamp(1.125rem, 1.076rem + 0.217vw, 1.25rem)` | 1 | -0.01em |

Spacing between type: eyebrow to heading 12 px; H2 to lede 20 px; lede to content 40 px; paragraph gap 1em; H1 to statement 20 px; statement to CTA row 32 px.

---

## 4. Hero and imagery plan

### 4.1 The hero now (2019 b/w cut-out)

Asset preparation (build step, scripted with Pillow, result committed in `site/public/images/portrait/`): take `assets/photos/portrait-isocial-2019-bw-transparent.png` (RGBA, 720 x 848) and crop to x 0-707 (`box=(0, 0, 708, 848)`), which removes an 11 px opaque residue column at x 709-719 found by the alpha scan (it shows as a pale stripe at the right edge). Output `manpreet-2019-cutout.png`, 708 x 848. Use the RGBA file, not the `-gray` one: on the vermilion field the slight orange fringe at the hair edges is invisible (checked: `cutout-on-vermilion.png`); on paper it shows and the white shirt dissolves into the background (checked: `cutout-on-paper.png`). **Rule: the cut-out is only ever placed on the vermilion field.**

Composition, desktop (lg, >= 1024 px): 12-column grid, 24 px gaps, inside the site wrapper.
- Columns 1-7, vertically centred: eyebrow line (the vermilion thread, 64 px long, then Geist Mono "Chief Operating Officer · Digitally Next · New Delhi" in `ink-muted`); H1 = her name in `display`; the positioning `statement` (max 32 ch, one italic phrase in `vermilion-ink`); CTA row (one primary button, one secondary text link with an arrow); credential line in `caption` mono, `ink-muted`. Final wording is the copy step's, from publish/flag facts only.
- Columns 8-12, right-aligned: **the portrait frame**. Aspect 4:5, `border-radius: 2px`, `overflow: clip`. Width `min(28.75rem, (100svh - var(--spacing-header) - 8rem) * 0.8)`, so the 460 x 575 frame always fits the first screen (at 1520 x 776 it is 460 x 575 with about 64 px to spare top and bottom; at 1280 x 720 it shrinks to fit). Layers, back to front:
  1. **Marigold offset plate**: a pseudo-element the frame's size, offset 12 px right and 12 px down (8 px below lg), `--color-marigold`. Silk and zari: her pairing.
  2. **Field**: `radial-gradient(120% 90% at 30% 20%, var(--color-vermilion) 0%, var(--color-vermilion-ink) 70%)`. A lit backdrop, brighter top-left, deepening to the ink-safe red bottom-right. Echoes the group's own 2019 treatment (F214) in her hue.
  3. **Figure**: `next/image` of the cut-out, absolutely positioned `left: 0; right: 0; bottom: 0; height: 96%`, `object-fit: contain; object-position: 50% 100%`. At 96 % height the 708 x 848 figure is exactly the frame's width (0.835 x 0.96 = 0.80), with 4 % of field above her head. `preload` (Next 16 replacement for `priority`), `sizes="(min-width: 1024px) 460px, (min-width: 768px) 360px, calc(100vw - 52px)"`, `quality` default 75; next/image serves AVIF/WebP with alpha (`images.formats: ["image/avif", "image/webp"]` in `next.config.ts`).
- Caption under the frame, left-aligned, 16 px gap: `caption` mono `ink-muted`, "Portrait, 2019" (date from F214). Alt text: "Manpreet Jangra, black-and-white portrait on a vermilion background".
- Hero section: paper, `min-height: min(calc(100svh - var(--spacing-header)), 56rem)`, content vertically centred, padding-block `clamp(2.5rem, 6vh, 5rem)`. Below it, a `line` hairline and the proof row on sand.
- Sharpness: 848 source px over 575 CSS px is 1.47 x: crisp at 1x, slightly soft at 2x, which a monochrome image tolerates (the README's "up to about 700 px rendered height" ceiling is respected).

Tablet (md, 768-1023): single column; text block; then the frame at width `min(100% - 12px, 22.5rem)` (360 x 450), left-aligned, caption below.
Phone (< 768): eyebrow (thread 48 px), H1 (44 px, balanced onto one or two lines), statement, primary button full width, secondary link, credential line, then the frame at `min(100% - 8px, 20rem)` (at 390 x 844 the top 280 px of the portrait is visible above the fold, inviting the scroll). Text first so the LCP is text and her name is the first thing read.

### 4.2 The hero later (a 2000 px+ colour original) with no redesign

Content model (in `src/data/content.ts`, adapted from Agency-continuity):

```ts
export type Portrait = {
  src: StaticImageData;          // imported, so width/height/blur come with it
  kind: "cutout" | "photo";      // cutout: transparent PNG on the vermilion field; photo: full-frame image
  alt: string;
  caption: string;               // "Portrait, 2019" now; photographer credit and year later
  focal?: string;                // object-position for kind "photo", e.g. "50% 28%"
};
```

- `kind: "photo"`: the field and the 96 % figure box are not rendered; the image fills the same 4:5 frame with `object-fit: cover; object-position: var(--focal, 50% 30%)`; marigold plate, caption, entrance, scroll depth and every size stay identical. A 2000 x 2500 source in a 460 x 575 frame is 4.3 x: crisp on any screen.
- `kind: "cutout"` also accepts any future keyed portrait at any size; a 2000 px cut-out simply gets sharper.
- The swap is one import line and one object. Nothing in CSS changes.
- Brief for the shoot (goes into CONTENT-REVIEW for Manpreet): 4:5 master plus a 3:2 crop, 2000 px or more on the short edge; plain warm backdrop (cream seamless, or a mid-grey seamless that can be keyed onto the vermilion field); soft window light from the left; she wears cream, white or black (all documented on her), glasses optional (both looks are documented: F210 without, the 2019 cut-out and cafe photo with); eyes to camera or just off; head in the upper third with clear space above.

### 4.3 Other real photos

| File | Decision | Size on site | Reason |
|---|---|---|---|
| `refs/social/linkedin-profile-400.jpg` (podium, F082 / F210 flag) | **Used** beside the "On stage" / speaking item, square, 1 px `line` frame | max 200 x 200 CSS px (2.0 x) | Her only executive "now" image; crisp at that size. Caption "On stage" only: the event is unidentified, so no event name or year is printed |
| `refs/social/ig-2025-10-17-diwali-a.jpg`, `-b.jpg` (F212 flag) | **Not published in v1.** Colour evidence only | - | Festive register, consent; the site is complete without them |
| `refs/social/ig-2025-09-02-coffee.jpg` (F211 flag) | **Not published in v1.** Listed in CONTENT-REVIEW as an optional About portrait (crop x 120-760, y 230-1030 removes the mug) | would be max 360 CSS px wide | Casual register; needs her choice and consent. No empty slot is reserved for it |
| `refs/social/ig-2025-06-29-genz-interns*.jpg` (F213 flag) | **Not published in v1** | - | Needs consent of everyone pictured |
| `refs/social/wer-article-photo.jpg`, avatars, reel cover, X banner/avatar, certificate, JioStar creative | **Not published** | - | Resolution, hold status (F215-F220) or provenance |
| `refs/events/upjapan-2026-galgotias/*` | **Never published as her** | - | She is not identified in any of them; rights not cleared (F221) |
| `E:\deepkgoel\public\images\ventures\digitally-next.webp`, `imet-global.webp` | **Used** in the venture previews (copied to `site/public/images/ventures/`) | preview window 320 px wide | Real homepage screenshots of the group's sites, reused as the parity doc allows. iSoCIAL row, if shown, has no preview (domain does not resolve) |
| Agency logos (`refs/company/logo1*.webp`, F222 flag) | **Not used** | - | The company is present as text and through its website preview; no second brand mark on her page |

Photo treatment everywhere: no colour grading, no duotone; `radius-xs`; 1 px `line` hairline on paper; explicit `width`/`height` or `fill` with `sizes`; meaningful alt text; images not selectable or draggable (parity 3). Total home-page image weight under 500 KB.

### 4.4 Generated assets (no faces, no text, no logos), Codex first

Route per the global instructions: Codex CLI (`.work/codex/gen.sh <id> "<prompt>"` already moves outputs from Codex's folder to `assets/generated/`), one attempt each, convert to WebP at 1600 px on the long edge, then copy into `site/public/images/textures/`. Every generated file is recorded in `site/src/data/sources.json` with `"generated": true` and its prompt, so it is never mistaken for a real event or object. Each texture has a flat-colour fallback; the layout never depends on one.

| Id | Status | Where | Treatment | Prompt |
|---|---|---|---|---|
| `zari` | **Exists**: `E:\manpreetjangraportfolio\plan\assets\her-evidence\zari-vermilion-16x9-sample.png` (1672 x 941). Reuse, do not regenerate | Home night band ("In her words"), right 55 %; also the Writing / Voice page intro backdrop | Night band: opacity 0.16, `mask-image: radial-gradient(80% 90% at 100% 40%, #000 30%, transparent 75%)`, never under text. Intro backdrop: Deepak's pattern (below) at opacity 0.22 | (already generated) |
| `silk-ivory` | Generate | About page intro backdrop | Intro backdrop, opacity 0.35 (pale source) | "Generate one image: soft folds of ivory cream raw silk fabric filling the whole frame, gentle diagonal folds, matte with a faint sheen, soft diffuse daylight from the upper left, pale warm shadows, minimal and calm, very low contrast. Aspect about 16:9 (1600x900). No text, no people, no faces, no hands, no logos, no embroidery, no pattern, no objects." |
| `marble-ivory` | Generate | Journey / career page intro backdrop | Intro backdrop, opacity 0.35 | "Generate one image: top-down photograph of pale ivory marble with faint warm grey and honey-coloured veins, polished but matte, even soft light, very low contrast and subtle. Aspect about 16:9 (1600x900). No text, no objects, no people, no reflections, no logos." |
| `thread-paper` | Generate | Contact / hiring page intro backdrop; the 404 page | Intro backdrop, opacity 0.4; the thread ties to the signature motif | "Generate one image: a sheet of warm ivory handmade cotton paper filling the frame, very faint fibre texture, evenly lit, and a single thin vermilion-orange silk thread lying in a loose gentle curve across the lower third, casting a soft shadow. Minimal, calm, photographic. Aspect about 16:9 (1600x900). No text, no other objects, no people, no hands, no logos." |

Inner-page intro backdrop rule (parity `IntroBackdrop`): `position: absolute; inset: 0 0 0 var(--intro-start, 38%); z-index: -1; opacity: var(--intro-opacity); mask-image: linear-gradient(90deg, transparent, #000 58%)` (Deepak's mask, verbatim), `object-fit: cover`, entrance `site-intro-backdrop-in` 1.6 s. If the planner adds more inner pages than textures, reuse in the order zari, silk-ivory, marble-ivory, thread-paper.

Marks and share assets:
- `app/icon.svg`: 64 x 64, a `radius 4` square in #B4220B with "MJ" drawn as stroked geometric paths in #FAF7F2 (stroke 6, no font dependency), built the same way as Deepak's stroked "DG" icon. Evidence for "MJ": F004.
- `public/social-card.jpg`: 1200 x 630 Playwright screenshot of the home hero at 1200 x 630 (parity 4). No separate generated share art.
- `not-found.tsx`: paper page, `thread-paper` backdrop, H1 in `display`, one primary button home.

---

## 5. Motion

### 5.1 Adopted verbatim from Deepak (parity doc section 1, values from `E:\deepkgoel\app\globals.css`)

No animation library; CSS plus small client components. `motion` is not in `site/package.json` (confirmed) and must not come back.

| Pattern | Spec (verbatim values) | Where on her site |
|---|---|---|
| Timing tokens | `--ease-ios: cubic-bezier(0.32, 0.72, 0, 1)`; `--spring`, `--spring-bouncy` with cubic-bezier fallbacks and the sampled `linear()` springs under `@supports` | Everywhere; no other easing is invented |
| Scroll reveal | `data-reveal` blocks; `data-reveal="zoom"` (scale 0.94) and `data-reveal="group"`; IntersectionObserver threshold 0.08, rootMargin `0px 0px -24px 0px`; 80 ms stagger, max 5 steps; hidden in a layout effect before paint; blocks on screen at load are skipped; classes removed after reveal; opacity 0.7 s, translate 22 px 0.9 s, scale 0.9 s, all `var(--ease-ios)`; uses `translate`/`scale`/`opacity`, not `transform`; print forces visible | Section heads, lists, cards, timeline entries, quotes (group), proof row (group) |
| Hero entrance | keyframes declaring only `from`: field `site-hero-photo-in` 1.5 s `var(--ease-ios)` 0.12 s (opacity 0, scale 1.08); marigold plate `site-fade-in` 1.2 s ease-out 0.1 s (Deepak's hero-shadow role); figure `site-fade-in` 0.5 s + `site-hero-figure-in` 1.2 s (translate 2.5 % 3 %); H1 `site-rise-in` 0.9 s at 0.12 s; statement 0.22 s; CTA row 0.32 s; credential line 0.42 s | Home hero |
| Scroll-driven hero depth | inside `@supports (animation-timeline: scroll())` and `prefers-reduced-motion: no-preference`: frame `site-hero-depth` (to translate 0 14 %) over 0-100vh; text column `site-hero-lift` (to opacity 0.15, translate 0 -7 %) over 12vh-100vh, `scroll(root block)` | Home hero (frame = Deepak's hero stage) |
| Page transitions | `PageTransition` wraps each page in React `<ViewTransition>`; `page-out` 0.18 s ease-in, `page-in` 0.38 s ease-out 0.1 s; `nav-forward` / `nav-back` slides (-56 / 72 px, 0.5 / 0.6 s `var(--ease-ios)`); header keeps `view-transition-name: site-header` | All routes; detail links pass `transitionTypes={["nav-forward"]}`, back links `["nav-back"]` |
| Header | transparent over the hero, glass once scrolled (`backdrop-filter: blur(16px) saturate(115%)`, 20 px when scrolled; her glass = paper at 86 % + `--shadow-header`); hides on scroll down, returns on scroll up (8 px hysteresis, clamped for overscroll, rAF batched); never hides while it holds focus or the menu is open; nav underline `scaleX` 0.45 s `var(--ease-ios)` in **vermilion** | Global |
| Press feedback | small controls `scale: 0.94` on `:active`, 0.09 s ease-out; large surfaces `0.985`; text links `opacity: 0.55` (0.06 s); the primary button presses into its offset backing (`translate(3px, 3px)`, backing shifts back by 3 px) and springs back (`transform 0.55s var(--spring)`); hover lifts buttons 2 px and nudges the arrow `translate(2px, -2px)` with `var(--spring)` | Buttons (vermilion-ink face, marigold backing offset 4 px / 4 px; on night: marigold face, vermilion backing), list rows and cards (0.985), menu toggle, social icons (0.94), text links (0.55) |
| Counters | IntersectionObserver 0.3; 1.8 s ease-out-cubic; 60 ms stagger; final value in an `sr-only` span and in the server HTML | Proof row (only publish numbers: F190, F191, F196) |
| Disclosure | animated open/close, shared `group` keeps one open | Journey details and any FAQ-style list |
| Venture previews | pointer-following screenshot (18 px offset, flips near edges, 16 px inside the viewport, rAF batched); Escape, outside click or scroll closes; phones get a "Preview website" button | "Where I work" rows: Digitally Next, iMET Global. Window: `night-raised`, 1 px `rgb(244 238 230 / 0.18)` border, `radius-md`, `--shadow-preview` |
| Sticky heading column | heading column `position: sticky; top: calc(var(--spacing-header) + 32px)`, moving to 48 px when the header hides, `transition: top 0.5s var(--ease-ios)` | Two-column editorial sections from lg (About, Writing) |
| Intro backdrops | section 4.4 | Every inner page |
| Photo carousel | **Not used in v1**: there are not enough cleared photos (parity says "only if there are enough real photos") | - |
| Reduced motion | every animation, transition, counter and view transition off under `prefers-reduced-motion: reduce` (view-transition pseudo-elements `animation-duration: 0s !important`); counters render final values | Global |

### 5.2 Her signature moment: the vermilion thread

One bespoke idea, used with restraint: **a 2 px vermilion line that draws itself from the left, like a single silk thread being laid down.** It is the gold-and-vermilion outfit reduced to one stitch, and it is the only motion on the site that is not Deepak's.

- Hero (once, on first load): the 64 px thread before the eyebrow draws in after the field settles. `@keyframes mj-thread-draw { from { scale: 0 1; } }`, `animation: mj-thread-draw 0.9s var(--ease-ios) 0.45s both; transform-origin: left center;`.
- Section heads: every H2 eyebrow carries a 32 px thread. While its block is `.site-reveal-ready:not(.is-visible)` the thread sits at `scale: 0 1`; the thread always has `transition: scale 0.9s var(--ease-ios) calc(var(--reveal-delay, 0s) + 0.12s)`, so it draws just after its heading rises, and stays drawn after the reveal classes are removed.
- Journey timeline: the 1 px spine draws top-down (`scale: 1 0` to `1 1`, origin top, 1.2 s `var(--ease-ios)`) when the list reveals, and each vermilion node pops with `site-pop-in` 0.55 s `var(--spring-bouncy)` on its own reveal. Same motif, no new idea.
- Never: looping, scroll-scrubbed, on hover, or more than one thread drawing per screen at once.
- Reduced motion: threads are simply present.

Explicitly not added: marquees, cursor followers, smooth-scroll libraries, parallax beyond the parity hero depth, letter-by-letter typing, autoplay video, glows.

---

## 6. Spacing, radius, shadows, containers, breakpoints, dark sections, theme

### 6.1 Spacing
- Base: Tailwind's default `--spacing: 0.25rem` (4 px). Used stops: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 112 px.
- Section padding: `--spacing-section` = `clamp(4rem, 2.826rem + 5.217vw, 7rem)` (64 px phone, 112 px desktop). Hero: `clamp(2.5rem, 6vh, 5rem)` block padding (sized for Karan's 776 px-tall window).
- Gutter: `--spacing-gutter` = `clamp(1.25rem, 4.5vw, 4rem)` (20 px at 360-444 px, 64 px from 1422 px).
- Inside sections: eyebrow to H2 12 px; H2 to lede 20 px; lede to content 40 px; list rows 24 px padding with a `line` hairline between; card padding 24 px (phone) / 32 px (lg); grid gap 24 px, 32 px from xl; stat row gap 48 px.

### 6.2 Containers and grid
- Site wrapper: `width: min(100%, calc(var(--container-site) + 2 * var(--spacing-gutter))); padding-inline: var(--spacing-gutter); margin-inline: auto;` (1280 px content).
- Prose: `--container-prose` 38 rem; ledes `--container-lede` 44 rem; hero statement 32 ch.
- Grid: 12 columns from lg; single column below. Editorial two-column sections: `grid-template-columns: 1fr 1.35fr` (Deepak's ratio), gap 80 px at xl, 48 px at lg.
- Header: 64 px below lg, 72 px from lg (`--spacing-header`; override with an unlayered `@media (width >= 64rem) { :root { --spacing-header: 4.5rem; } }`). Wordmark left (Newsreader 500), links right from lg; below lg a Lucide `Menu`/`X` toggle opening a solid paper sheet with links in Newsreader 28 px and the thread under the current page.

### 6.3 Breakpoints
Tailwind defaults, unchanged: sm 640, md 768, lg 1024, xl 1280, 2xl 1536. Layout changes happen only at md (tablet hero) and lg (two-column hero, inline nav, sticky columns, 12-column grid). Verification widths (parity 6): 360, 390 x 844, 768, 1024, 1520 x 776, 1920 x 969; no horizontal overflow at any of them.

### 6.4 Radius
`radius-xs` 2 px: buttons, inputs, tags, photo frames, the hero frame. `radius-md` 6 px: cards, the venture preview window. `radius-full`: status dots and the "Hiring now" pill only. Nothing else is rounded: her artefacts are printed, framed and stitched, not inflated; pills are the agency's idiom.

### 6.5 Shadows and depth
No blurred drop shadows on content. Depth comes from sand bands, hairlines and two solid offsets: the marigold plate behind the hero frame (12 / 8 px) and the marigold backing of the primary button (4 px). Two blurred shadows exist, both required by parity patterns: `--shadow-header` on the scrolled glass header and `--shadow-preview` on the venture preview window. No glows, no coloured shadows. Stacking order (Deepak's): header 50, venture preview 220, skip link 1000.

### 6.6 Light only (decided)
**Light only, no dark mode.** Reasons: (1) the warm paper is the identity, and all three proposals agree on it; (2) Deepak's site also ships a single approved theme, so this is parity, not a gap; (3) contrast and rhythm are already supplied by the night band and footer; (4) a dark mode would need a second ramp with no evidence behind it, and would turn the vermilion-field portrait into a different composition needing its own QA. Implementation: `color-scheme: light`, `<meta name="theme-color" content="#FAF7F2">` via `viewport` export, scaffold dark-mode block deleted. Tokens are role-named, so a future dark theme can redefine them under `[data-theme="dark"]` without touching components.

### 6.7 Dark-section policy
- Home page: **exactly one night band**, "In her words": her WER quotes (F100, publish; prefer quotes 1, 3 and 5 of facts.md 6A, which contain no long dash), Newsreader italic `quote` size in `on-night`, a marigold opening quote mark (Newsreader 96 px), attribution and source link in mono (`on-night-muted`, link `marigold`), a 2 px vermilion thread above each quote, the zari texture at 0.16 on the right. Placed after the journey and before writing / hiring / contact, so the reader meets her record first and her convictions second.
- Footer: night. Wordmark, links in `on-night` with `marigold` hover, "New Delhi · IST hh:mm" in mono, social links as inline SVG icons (lucide-react 1.x has no brand icons; Deepak's `UI.tsx` uses inline SVG paths the same way).
- Never two night surfaces adjacent: at least one paper or sand section between the band and the footer. Never a night hero. Inner pages: no night band, footer only.
- Inside night: text `on-night`, secondary `on-night-muted`, accent text and links `marigold`, borders `night-line-strong`, hairlines `night-line`, cards `night-raised`, buttons marigold face with night label and a vermilion backing; vermilion only as threads and rules.

### 6.8 Component defaults (so the builder does not guess)
- **Primary button**: min-height 48 px, padding 0 22 px, `button` text, `radius-xs`, face `vermilion-ink`, label `paper`, `::after` backing `marigold` offset 4 px / 4 px; hover: face `vermilion-deep`, lift 2 px, arrow nudge; active: press into the backing (5.1).
- **Secondary**: text link with Lucide `ArrowUpRight` (external) or `ArrowRight` (internal), `ink` text, vermilion-ink underline on hover; or an outline button (1 px `line-strong`, `ink` label, hover border `ink`) where a box is needed.
- **Lists** (credentials, press, roles): typographic rows with hairlines, never card grids; year or date in `caption` mono on the left rail; hover fill `blush`; press 0.985.
- **Cards** (only the three "what she leads" pillars and the hiring block): `sand` fill, 1 px `line`, `radius-md`, no shadow; hover border `line-strong`.
- **Hiring pill**: `blush` fill, `vermilion-ink` text, 8 px `vermilion` dot, `radius-full`: "Hiring now · 28 open roles" style, with the live number from F196 refreshed at build.
- **Icons**: lucide-react, 20 px, stroke 1.5, `ink-muted` on light / `on-night-muted` on night; never decorative-only without a label.
- **Skip link**: first focusable element, `marigold` background, `ink` text.

---

## 7. Favourite colour: the frank statement

**Manpreet has not stated a favourite colour anywhere.** find-social section 4 searched for it directly (favourite, loves, hobby, interview, podcast) and found nothing; find-critique 9.1 and 10.10 record the same gap. Her only explicit "favourite" of any kind is a season: "Fav time of the year! 🍁" and "Not ready to leave #october" (Threads, Oct 2026, F072).

What the palette rests on instead, strongest first:
1. **Her own clothing choice for Diwali 2025**: vermilion silk (#E4270C / #F53B13) with gold zari embroidery, photographed against an ivory wall (F071 publish, F212 flag). This is the only colour decision in the record that is unambiguously hers, and it supplies both accents (vermilion, marigold) and the paper.
2. **How her own group presented her in 2019**: a black-and-white cut-out on an orange-red field (F214 flag). The hero repeats that treatment in her hue.
3. **Cream and charcoal around her**: the cream blazer at the podium (F210), ivory walls, black tops and black-framed glasses across 2018-2025 (find-social 3).
4. **Gold accents**: marigold garlands (F212), the warm stage light in the podium photo (F210), and an amber band on her 2018 X banner (F215, hold, colour reference only).
5. **Circumstantial, given little weight**: red tops in 2018 and 2019 images (F215, hold) and the red office wall behind four of her five profile pictures, which is the agency's wall, not her choice. This is why the accent is her orange-leaning vermilion and not the agency red.

So the palette is an evidence-based hypothesis, not her stated taste. It is built so that her answer costs three hex values, not a redesign (fallback ramp in 2.4).

**The single question to ask her** (goes into CONTENT-REVIEW as the colour item):

> "We built your site around the vermilion red and gold of your Diwali 2025 outfit, deliberately not the Digitally Next red: is that a colour you would choose to represent you, or is there a colour you would rather it be?"
