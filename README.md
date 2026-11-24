# Manpreet Jangra

The personal website of Manpreet Jangra, Chief Operating Officer of Digitally Next, New Delhi. Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4. Six pages (Home, About, Work, Writing, Careers, Contact) plus a branded 404, all prerendered as static pages. It shares its engineering and motion with the sibling site of Deepak Goel, Group CEO of the same group, and has its own look: warm paper, vermilion and marigold, Newsreader serif.

## Run locally

```sh
pnpm install
pnpm dev
```

Open http://localhost:3100. Port 3100 is set in `package.json` so the site never collides with another project on port 3000.

```sh
pnpm typecheck   # tsc --noEmit
pnpm lint        # eslint
pnpm build       # production build into .next
pnpm start       # serves that build on port 3100
```

Development writes to `.next-dev`; production builds and `start` use the default `.next` (which Vercel expects), so a build never overwrites a running development server. `NEXT_DIST_DIR` can override either location. Run all three checks (`typecheck`, `lint`, `build`) before every commit; `build` must list every route as static (○).

After deleting a route, run `pnpm build` before `pnpm typecheck`: until the next build, the stale `.next/types/validator.ts` still names the deleted route and fails with TS2344.

## Structure

- `src/app/`: the pages in the `(site)` route group, which does not change their URLs (`(site)/page.tsx` for Home, then `(site)/about/`, `work/`, `writing/`, `careers/`, `contact/`, and `(site)/layout.tsx`, which adds the header, footer and scroll reveals through `src/components/SiteChrome.tsx`), `not-found.tsx` (the 404, wrapped in the same `SiteChrome`), `layout.tsx` (fonts, root metadata, the skip link, JSON-LD), `sitemap.ts` and `robots.ts` (served as `/sitemap.xml` and `/robots.txt`), `icon.svg` (the MJ monogram favicon) and `globals.css`.
- `src/app/globals.css`: the site's single stylesheet, in a fixed order: motion tokens, design tokens (`@theme`), base styles, components in `@layer components`, then the motion rules unlayered. Light theme only.
- `src/components/`: one file per component. Only `Header`, `Motion`, `Counter`, `Disclosure`, `VentureList`, `EnquiryForm`, `CopyButton` and `LocalTime` run in the browser (`"use client"`); everything else renders on the server.
- `src/content/`: every word, number, link and image reference on the site, as typed data (see Content model).
- `src/lib/site.ts`: the site address, `pageMetadata()` (title, description, canonical, Open Graph and Twitter tags per page), the JSON-LD builders, `plural()`, `formatLongDate()` and `attributionOf()`. It imports only types from `src/content/`, so it never pulls content into a browser bundle.
- `src/lib/views.tsx`: server-only helpers that turn content objects into the plain props the components need (timeline years, quote attributions, venture hostnames, education lines).
- `public/images/`: the portrait, the podium photo, two venture screenshots and four textures. `public/social-card.jpg`: the 1200x630 image shown in link previews.
- `docs/`: the reasoning behind the site, copied from the project's planning folder: `decisions.md` (every structural and content decision with its reason), `design-decision.md` (palette, type, imagery and motion, with the contrast table) and `CONTENT-REVIEW.md` (the open questions for Manpreet and Karan).

## Content model

All copy lives in `src/content/*.ts`, one file per page (`home.ts`, `about.ts`, `work.ts`, `writing.ts`, `careers.ts`, `contact.ts`) plus `shared.ts` (footer, contact band, 404, Hiring pill), `navigation.ts` (menu, footer links, social profiles), `quotes.ts` (every quotation, verbatim, with source and date), `roles.ts` (open roles), `images.ts` (every picture and the intro backdrops) and `types.ts`. Components never contain copy; pages read these files and pass plain values down.

- **Fact ids.** Every claim on the site is backed by research in `research/facts.json` (in the project folder, outside this repository). Each content object carries a `facts` array of ids such as `F010`. `src/content/facts.ts` lists only the ids whose status is publish or flag, so a content object that cites a hold fact fails `pnpm typecheck`. The arrays are never rendered and never reach the browser.
- **Placeholders.** Details only Manpreet can give are stored as `{{CONFIRM: ...}}` strings (type `Confirm`). The server checks them with `isConfirmed()`: until one is replaced, the line or item it belongs to is simply not shown, and the string never reaches the browser. Items that need several answers (the 2026 entry-level article, the Japanese delegation session) carry a `gate` and appear only when every field in it is confirmed. Seven items wait for answers in all; `docs/CONTENT-REVIEW.md` section A lists each one and the field to edit.
- **Switches.** `SHOW_DIRECTORSHIP` in `about.ts` shows or hides all five mentions of her BFG Market Consult directorship at once (Home journey, About story, About journey, the bio, Work). `COO_SINCE` in `about.ts` turns the "Now" journey entries into "Since {year}" once it is confirmed.
- **Quotes.** Quotation marks are drawn by CSS, never typed into the data. Attributions are built by `attributionOf()` from the speaker, source and date, so every quote is credited the same way.
- **Server and browser.** Content files are imported only by server components. Client components receive finished values as props: no `facts` array and no placeholder is ever sent to the browser.
- **Writing rules.** No long dashes (U+2013, U+2014) anywhere: use a hyphen, comma, colon, middle dot or full stop. Store straight apostrophes. Never add a number, title, client, award or testimonial that is not in the fact base.

## Updating roles, numbers and facts

- **Open roles** (from https://www.digitallynext.com/careers): edit the `roles` array in `src/content/roles.ts`, titles exactly as the agency lists them, and set `ROLES_AS_OF` to the date you checked. Every count on the site is derived from the array: the Hiring pill, the home proof row, the Work talent line and ADAC list, the Careers groups and FAQ, and both "as listed on" captions. With no roles the site switches to its empty state ("No roles are listed right now." plus the CV address); one role reads "1 open role".
- **LinkedIn figures:** edit the numbers in `stats` and `LINKEDIN_AS_OF` in `src/content/home.ts`; the caption under the proof row is built from the date.
- **A confirmed answer from Manpreet:** replace the matching `{{CONFIRM: ...}}` string with the answer (for example `COO_SINCE = "2024"`). Nothing else changes: the item appears on the next build. `docs/CONTENT-REVIEW.md` names the file and field for every question.
- **A new claim:** check its id and status in `research/facts.json`. If it is publish or flag but missing from `src/content/facts.ts`, add the id to `PUBLISH` or `FLAG` there. Then write the copy in the right content file with the id in its `facts` array. Hold facts never go on the site.
- **A new page:** add its folder under `src/app/(site)/`, its copy and `meta` in a new content file, `export const metadata = pageMetadata(meta)` in the page, and its path in `ROUTES` (`src/lib/site.ts`) so the sitemap lists it. Wrap the page in `PageTransition` and give it a `PageIntro` with an `introImages` entry.

After any change: `pnpm typecheck`, `pnpm lint`, `pnpm build`, and look at the page at 390 and 1520 px wide.

## Motion

The site moves the way iOS does: quick presses, springy releases, and pages that slide and fade into one another. There is no animation library; everything is CSS plus a few small components, ported from the sibling Deepak Goel site.

- **Timings** live at the top of `src/app/globals.css`: `--ease-ios` (the curve iOS uses for sheets and navigation) and two springs, `--spring` and `--spring-bouncy`. Use these instead of inventing new easings.
- **Moving between pages** is handled by `src/components/PageTransition.tsx` (React's `<ViewTransition>`), which wraps the content of every page and the 404. Pages cross-fade by default. A link that passes `transitionTypes={["nav-forward"]}` slides forward (the Home teaser links into inner pages); `["nav-back"]` slides back (the 404's "Back to home"). While a page change runs, the header takes its own view-transition name (`:root:active-view-transition .site-header`), so it stays still. At rest it has no name: a named element cannot blur what lies behind it, and the frosted header would show the page through it sharp.
- **Blocks that appear as you scroll** carry a `data-reveal` attribute (`data-reveal="zoom"` grows in instead of rising; `data-reveal="group"` staggers its children). The script is `src/components/Motion.tsx`; new sections only need the attribute. Never put a Tailwind `translate-*` or `scale-*` class on an element with `data-reveal`.
- **The vermilion thread** (`.mj-thread`) is the site's one signature motif: a 2 px line beside each section eyebrow that draws itself in when its heading appears. `.mj-thread--static` never draws.
- **The home hero** plays a short entrance as the page loads (the portrait settles onto its vermilion field while the eyebrow, her name, the statement, the buttons and the credential line rise in one after another), and on desktop it has a little depth while you scroll: the portrait moves at a different speed from the words (`animation-timeline: scroll()`, only where the browser supports it).
- **Components with their own motion:** `Counter` (the numbers count up once when 30 % visible; the final values are in the page source), `Disclosure` (the About journey and the Careers FAQ open and close smoothly; a shared `group` keeps one open at a time; real `<details>`, so they work without JavaScript), `VentureList` (hovering or focusing the Digitally Next or iMET Global row shows a small screenshot of that website that follows the pointer; phones get a separate preview button) and `Header` (transparent at the top, frosted after scrolling, hides when you scroll down and returns when you scroll up, never while it holds focus or the menu is open; below lg the menu is a paper sheet that drops in with a spring, its links following one after another, and lifts away on close, as on the sibling site).
- **Press feedback:** controls shrink slightly under the finger (0.94 for small controls, 0.985 for large surfaces), text links dim, and the primary button presses into its marigold backing and springs back.

Everything respects the visitor's "reduce motion" setting: animations, transitions, the thread, the counters, the hero depth and the page transitions all switch off, and every block is visible. View transitions and the hero depth need a recent browser; older ones skip them and the site works as before.

## The scroll edition at /v2

`/v2` is a second edition of the same content with the structure and scroll choreography of landonorris.com, in this site's palette and fonts. The plan is `plan/v2-spec.md` in the project folder; the classic pages do not change.

- **Where it lives:** `src/app/v2/` (its layout, pages and `v2.css`, the only stylesheet it adds; every rule is scoped to `.v2` or a `v2-` class, because Next can keep it loaded after a visitor moves to a classic page), `src/components/v2/` (its components), `src/content/v2.ts` (the /v2 addresses and the few neutral labels it adds; every other word comes from the content files above) and `src/lib/v2.ts` (`v2Metadata`). `globals.css` leaves these files out of its Tailwind scan, so the classic stylesheet is byte for byte what it was.
- **Search engines:** every /v2 page is `noindex, follow` with its canonical link on the matching classic page, and /v2 is not in the sitemap.
- **Libraries (v2 only):** GSAP 3.15.1 with ScrollTrigger and SplitText, `@gsap/react` 2.1.2 and Lenis 1.3.27, pinned. Only files under `src/app/v2` and `src/components/v2` import them, so the classic pages never load them. `components/v2/gsap.ts` registers the plugins and holds the `gsap.matchMedia()` conditions (`reduce`, `motion`, `desktop` from 1024 px, `small`).
- **Smooth scrolling:** `SmoothScroll` runs one Lenis instance on GSAP's ticker, sends its scroll to ScrollTrigger, scrolls new pages to the top and refreshes the triggers once the fonts are in. With reduced motion there is no Lenis. `v2.css` turns the classic `scroll-behavior: smooth` off while a /v2 page is mounted (`html:has(.v2)`): otherwise ScrollTrigger would see a smooth-scrolling page and write an inline `scroll-behavior` back after every refresh.
- **Chrome:** `V2Header` (fixed, transparent, follows the `data-v2-theme="paper|night"` of the surface under it, hides on the way down) with its full-screen menu (a modal dialog: focus trap, Escape, focus back on the menu button, scrolling stopped), and `V2Footer` (the night card with a tab, on the marigold end of the page).
- **Shared pieces:** `ThreadField` (the field of thin threads behind a surface), `ThreadDraw` (one stroke drawn by the scroll, on load or on hover: `loop`, `underline`, `word`), `MixedHeading` (the bold sans and serif voices, lines rising into place), `WordReveal`, `PillButton`, `RoundArrowButton`, `NotchCard`, `Marquee`, `BigCounter`, `CaptionLabel`, `FieldPortrait`, `V2PageHero` (with `FitLine`), `BigFigure` and `BigRows`. Each says in its header comment what it does and how it behaves with reduced motion; none hides content before JavaScript runs.

## Fonts and performance

`layout.tsx` loads three families through `next/font/google`, self-hosted at build time: Newsreader roman and italic (variable, with the optical-size axis), Geist and Geist Mono (Geist Mono is not preloaded). A page downloads four woff2 files, 331,304 bytes (323.5 KB) in all, which is 24 KB over the 300 KB the design decision and spec 10.2.2 aim for. The overrun is accepted on purpose: almost all of it is Newsreader's optical-size axis, which keeps the 76 px name and the large headings fine and the 19 to 22 px ledes sturdy. A build without the axis weighed 175,048 bytes but drew the headings visibly wider and softer and re-wrapped the ledes, so the axis stays. If the budget ever matters more than that look, remove `axes: ["opsz"]` from the Newsreader call.

## Images and where they came from

`src/content/sources.json` records every image: what it shows, where it came from, how it was processed and whether it was generated.

- `images/portrait/manpreet-2019-cutout.png`: her 2019 black-and-white portrait from an iSoCIAL video thumbnail, background removed, shown only on the vermilion field of the home hero. Credited in the footer.
- `images/stage/manpreet-podium.jpg`: her LinkedIn podium photo (event not identified, so it has no caption), shown at 200 px on Writing.
- `images/ventures/digitally-next.webp`, `imet-global.webp`: homepage screenshots of the two group websites, reused from the sibling site, for the Work page previews.
- `images/textures/zari.webp`, `silk-ivory.webp`, `marble-ivory.webp`, `thread-paper.webp`: **generated images, not photographs** (made with Codex image generation; full prompts in `sources.json`). They sit faintly behind page headings and behind the home night band. The footer says so on every page.
- `social-card.jpg`: a 1200x630 screenshot of the home hero, rendered from the production build by `.work/qa/social-card.mjs` in the project folder (Playwright, reduced motion, JPEG quality 85). Re-run it after any change to the hero: `pnpm build`, then `node E:\manpreetjangraportfolio\.work\qa\social-card.mjs` (it starts the QA server on port 3101 if none is running, and stops it again afterwards).

The images are prepared by `.work/scripts/prepare_images.py` (Pillow) in the project folder. A new portrait needs no redesign: put the file in `public/images/portrait/` and update `portrait` in `src/content/images.ts` (`src`, `width`, `height`, `kind: "photo"`, `alt`, `caption`, `focal`), then re-render the social card. `docs/CONTENT-REVIEW.md` section E has the brief for the shoot.

## Search and sharing

- `layout.tsx` sets the site-wide defaults: the title template `%s · Manpreet Jangra`, description, keywords, Open Graph and Twitter cards with `social-card.jpg`.
- Each page calls `pageMetadata(meta)` from `src/lib/site.ts` with the `meta` object in its content file, which sets its own title, description, canonical address and sharing tags. Descriptions stay between 100 and 160 characters.
- The root layout renders JSON-LD for a `Person` (job title, employer, city, LinkedIn and Instagram as `sameAs`, the Women Entrepreneurs Review feature) and the `WebSite`. Add `alumniOf` only once her education details are confirmed.
- The 404 page is not indexed (Next.js adds `noindex`).

## Deploying to Vercel

Nothing has been pushed or deployed; that waits for Karan's go-ahead. When it is time:

1. Push this repository to GitHub and import it in Vercel. The Next.js preset and pnpm (from `pnpm-lock.yaml`) are detected; keep the default build command and output. This is a normal Next.js deployment, not a static export, so image optimisation, `/sitemap.xml` and `/robots.txt` work as they do locally.
2. The site's own address comes from `NEXT_PUBLIC_SITE_URL` and defaults to `https://manpreetjangra.com`, which is not registered yet (`docs/CONTENT-REVIEW.md` section F). Until it is, set `NEXT_PUBLIC_SITE_URL` to the Vercel address (for example `https://your-project.vercel.app`) for Production and Preview, so canonical links, the sitemap, the JSON-LD and the share image point at a live site. It is read at build time: redeploy after changing it.
3. Once the domain is registered, add it in Vercel's Domains settings and set `NEXT_PUBLIC_SITE_URL` to `https://manpreetjangra.com` (or remove it to use the default), then redeploy.

No other environment variables, no analytics, no cookies and no backend: the contact form prepares an email draft in the visitor's own mail app.

## Open content questions

What only Manpreet or Karan can answer (the year she became COO, her education details, two hidden Writing items, the podium photo's event, where enquiries should go, which first-person lines she approves, the domain) is listed in `docs/CONTENT-REVIEW.md`, with the exact file and field to edit for each answer. The site is complete without them: anything unconfirmed stays hidden.
