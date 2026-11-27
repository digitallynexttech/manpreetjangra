# Manpreet Jangra

The personal website of Manpreet Jangra, Chief Operating Officer of Digitally Next, New Delhi. Built with Next.js 16 (App Router), React 19, TypeScript, GSAP and Lenis. Six pages (Home, About, Work, Writing, Careers, Contact) plus a branded 404, all prerendered as static pages. The structure and scroll choreography follow landonorris.com, adapted to an executive's portfolio, in the site's own look: warm paper, vermilion and marigold, Newsreader serif with Geist.

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

- `src/app/`: `layout.tsx` (fonts, root metadata, the skip link, JSON-LD and the site's chrome: `V2Header` with its full-screen menu, the main landmark and `V2Footer`, all inside `SmoothScroll`), `page.tsx` (Home), `about/`, `work/`, `writing/`, `careers/`, `contact/`, `not-found.tsx` (the 404), `sitemap.ts` and `robots.ts` (served as `/sitemap.xml` and `/robots.txt`) and `icon.svg` (the MJ monogram favicon).
- Stylesheets, all loaded by the root layout: `globals.css` (Tailwind's reset, the design tokens, base styles and the few shared `site-` components: buttons, the enquiry form, the copy button, the Hiring pill, the website preview, page transitions), `v2.css` (the chrome and the shared primitives), `home.css` and `inner.css` (the pages). Every rule in the last three is scoped to `.v2` or a `v2-` class. Tailwind scans no files (`source(none)`), since no component uses utility classes.
- `src/components/v2/`: the site's components. The page sections live in `home/`, `about/`, `work/`, `writing/`, `careers/` and `contact/`; the shared pieces sit at the top level (see Motion). `src/components/` holds the behaviour components the pages reuse: `EnquiryForm`, `CopyButton`, `HiringPill`, `LocalTime`, `PageTransition`, `ParaText`, `Button` and `JsonLd`.
- `src/content/`: every word, number, link and image reference on the site, as typed data (see Content model).
- `src/lib/site.ts`: the site address, `ROUTES`, `pageMetadata()` (title, description, canonical, Open Graph and Twitter tags per page), the JSON-LD builders, `plural()`, `formatLongDate()` and `attributionOf()`. It imports only types from `src/content/`, so it never pulls content into a browser bundle.
- `src/lib/views.tsx`: server-only helpers that turn content objects into the plain props the components need (timeline years, quote attributions, venture hostnames, education lines).
- `public/images/`: the portrait, the podium photo, two venture screenshots, the zari texture and the From her feed pictures. `public/social-card.jpg`: the 1200x630 image shown in link previews.
- `docs/`: the reasoning behind the site, copied from the project's planning folder: `decisions.md`, `design-decision.md` and `CONTENT-REVIEW.md` (the open questions for Manpreet and Karan). They were written for the first design of the site; the content decisions and the open questions still hold.
- `next.config.ts`: the site once had five editions at `/v1` to `/v5`. This design (the former `/v2`) is now the site, and permanent redirects send any old edition address to the same page here.

## Content model

All copy lives in `src/content/*.ts`, one file per page (`home.ts`, `about.ts`, `work.ts`, `writing.ts`, `careers.ts`, `contact.ts`) plus `shared.ts` (footer, contact band, 404, Hiring pill), `navigation.ts` (menu, footer links, social profiles), `quotes.ts` (every quotation, verbatim, with source and date), `roles.ts` (open roles), `images.ts` (every picture), `v2.ts` (the menu links, the wordmark and the neutral labels the design adds: section labels and control names, never a claim) and `types.ts`. Components never contain copy; pages read these files and pass plain values down.

- **Fact ids.** Every claim on the site is backed by research in `research/facts.json` (in the project folder, outside this repository). Each content object carries a `facts` array of ids such as `F010`. `src/content/facts.ts` lists only the ids whose status is publish or flag, so a content object that cites a hold fact fails `pnpm typecheck`. The arrays are never rendered and never reach the browser.
- **Placeholders.** Details only Manpreet can give are stored as `{{CONFIRM: ...}}` strings (type `Confirm`). The server checks them with `isConfirmed()`: until one is replaced, the line or item it belongs to is simply not shown, and the string never reaches the browser. Items that need several answers (the 2026 entry-level article, the Japanese delegation session) carry a `gate` and appear only when every field in it is confirmed. Seven items wait for answers in all; `docs/CONTENT-REVIEW.md` section A lists each one and the field to edit.
- **Switches.** `SHOW_DIRECTORSHIP` in `about.ts` shows or hides all five mentions of her BFG Market Consult directorship at once (Home journey, About story, About journey, the bio, Work). `COO_SINCE` in `about.ts` turns the "Now" journey entries into "Since {year}" once it is confirmed.
- **Quotes.** Quotation marks are drawn by CSS, never typed into the data. Attributions are built by `attributionOf()` from the speaker, source and date, so every quote is credited the same way.
- **Server and browser.** Content files are imported only by server components. Client components receive finished values as props: no `facts` array and no placeholder is ever sent to the browser.
- **Writing rules.** No long dashes (U+2013, U+2014) anywhere: use a hyphen, comma, colon, middle dot or full stop. Store straight apostrophes. Never add a number, title, client, award or testimonial that is not in the fact base.

## Updating roles, numbers and facts

- **Open roles** (from https://www.digitallynext.com/careers): edit the `roles` array in `src/content/roles.ts`, titles exactly as the agency lists them, and set `ROLES_AS_OF` to the date you checked. Every count on the site is derived from the array: the Hiring pill, the home proof row, the Work talent line and ADAC list, the Careers groups and FAQ, and both "as listed on" captions. With no roles the site switches to its empty state ("No roles are listed right now." plus the CV address); one role reads "1 open role".
- **LinkedIn figures:** edit the numbers in `stats` and `LINKEDIN_AS_OF` in `src/content/home.ts`; the caption under the In numbers figures is built from the date.
- **A confirmed answer from Manpreet:** replace the matching `{{CONFIRM: ...}}` string with the answer (for example `COO_SINCE = "2024"`). Nothing else changes: the item appears on the next build. `docs/CONTENT-REVIEW.md` names the file and field for every question.
- **A new claim:** check its id and status in `research/facts.json`. If it is publish or flag but missing from `src/content/facts.ts`, add the id to `PUBLISH` or `FLAG` there. Then write the copy in the right content file with the id in its `facts` array. Hold facts never go on the site.
- **A new page:** add its folder under `src/app/`, its copy and `meta` in a new content file, `export const metadata = pageMetadata(meta)` in the page, and its path in `ROUTES` (`src/lib/site.ts`) so the sitemap lists it. Wrap the page in `PageTransition` and open it with `V2PageHero`.

After any change: `pnpm typecheck`, `pnpm lint`, `pnpm build`, and look at the page at 390 and 1520 px wide.

## Motion

The pages move with the scroll, as on landonorris.com: pinned scenes, a horizontal journey track on desktop, words that light up, strokes drawn by the scroll, and pages that fade into one another.

- **Libraries:** GSAP 3.15.1 with ScrollTrigger and SplitText, `@gsap/react` 2.1.2 and Lenis 1.3.27, pinned. `components/v2/gsap.ts` registers the plugins and holds the `gsap.matchMedia()` conditions (`reduce`, `motion`, `desktop` from 1024 px, `small`).
- **Smooth scrolling:** `SmoothScroll` runs one Lenis instance on GSAP's ticker, sends its scroll to ScrollTrigger, scrolls new pages to the top and refreshes the triggers once the fonts are in. With reduced motion there is no Lenis. `v2.css` turns CSS `scroll-behavior: smooth` off while the site is mounted (`html:has(.v2)`): otherwise ScrollTrigger would see a smooth-scrolling page and write an inline `scroll-behavior` back after every refresh.
- **Chrome:** `V2Header` (fixed, transparent, follows the `data-v2-theme="paper|night"` of the surface under it, hides on the way down) with its full-screen menu (a modal dialog: focus trap, Escape, focus back on the menu button, scrolling stopped), and `V2Footer` (the night card with a tab, on the marigold end of the page).
- **Shared pieces:** `ThreadField` (the field of thin threads behind a surface), `ThreadDraw` (one stroke drawn by the scroll, on load or on hover: `loop`, `underline` with a `line`, `circle` or `wave` shape, and `word`), `MixedHeading` (the bold sans and serif voices, lines rising into place), `WordReveal`, `Reveal`, `PillButton`, `RoundArrowButton`, `NotchCard`, `Marquee`, `BigCounter`, `CaptionLabel`, `FieldPortrait`, `V2PageHero` (with `FitLine`), `BigFigure`, `BigRows` and `VentureRows`. The home scenes are in `home/HomeScenes.tsx`. Each says in its header comment what it does and how it behaves with reduced motion; none hides content before JavaScript runs.
- **Moving between pages** is handled by `src/components/PageTransition.tsx` (React's `<ViewTransition>`), which wraps the content of every page and the 404; pages cross-fade.
- **Timings** for the CSS motion live at the top of `src/app/globals.css`: `--ease-ios` and two springs, `--spring` and `--spring-bouncy`.

Everything respects the visitor's "reduce motion" setting: there is no smooth scrolling, no pinning and no scrubbing, every stroke is simply drawn and every block is visible.

## Fonts and performance

`layout.tsx` loads three families through `next/font/google`, self-hosted at build time: Newsreader roman and italic (variable, with the optical-size axis), Geist and Geist Mono (Geist Mono is not preloaded). A page downloads four woff2 files, 331,304 bytes (323.5 KB) in all, which is 24 KB over the 300 KB the design decision and spec 10.2.2 aim for. The overrun is accepted on purpose: almost all of it is Newsreader's optical-size axis, which keeps the 76 px name and the large headings fine and the 19 to 22 px ledes sturdy. A build without the axis weighed 175,048 bytes but drew the headings visibly wider and softer and re-wrapped the ledes, so the axis stays. If the budget ever matters more than that look, remove `axes: ["opsz"]` from the Newsreader call.

## Images and where they came from

`src/content/sources.json` records every image: what it shows, where it came from, how it was processed and whether it was generated.

- `images/portrait/manpreet-2019-cutout.png`: her 2019 black-and-white portrait from an iSoCIAL video thumbnail, background removed, shown on its vermilion field (home hero, About, the menu). Credited in the footer.
- `images/stage/manpreet-podium.jpg`: her LinkedIn podium photo (event not identified, so its caption names no event), on the home journey track, in the podium scene and in the menu.
- `images/ventures/digitally-next.webp`, `imet-global.webp`: homepage screenshots of the two group websites, reused from the sibling site, for the Work page previews.
- `images/textures/zari.webp`: a **generated image, not a photograph** (Codex image generation; full prompt in `sources.json`), behind the home feature and in the menu.
- `images/feed/`: the pictures behind the From her feed cards. The reel cover and the two June 2025 intern photos come from her own posts (the intern photos need the consent of everyone pictured before launch); `still-language.webp`, `still-smarter.webp` and `still-audience.webp` are **generated still lifes, not photographs**, for the LinkedIn posts, which have no image of their own.
- `social-card.jpg`: a 1200x630 screenshot of the home hero, rendered from the production build by `.work/qa/social-card.mjs` in the project folder (Playwright, reduced motion, JPEG quality 85). Re-run it after any change to the hero: `pnpm build`, then `node E:\manpreetjangraportfolio\.work\qa\social-card.mjs` (it starts the QA server on port 3101 if none is running, and stops it again afterwards).

The images are prepared by `.work/scripts/prepare_images.py` (Pillow) in the project folder. A new portrait needs no redesign: put the file in `public/images/portrait/` and update `portrait` in `src/content/images.ts` (`src`, `width`, `height`, `kind: "photo"`, `alt`, `caption`, `focal`), then re-render the social card. `docs/CONTENT-REVIEW.md` section E has the brief for the shoot.

## Search and sharing

- `layout.tsx` sets the site-wide defaults: the title template `%s · Manpreet Jangra`, description, keywords, Open Graph and Twitter cards with `social-card.jpg`.
- Each page calls `pageMetadata(meta)` from `src/lib/site.ts` with the `meta` object in its content file, which sets its own title, description, canonical address and sharing tags. Descriptions stay between 100 and 160 characters.
- The root layout renders JSON-LD for a `Person` (job title, employer, city, LinkedIn and Instagram as `sameAs`, the Women Entrepreneurs Review feature) and the `WebSite`. Add `alumniOf` only once her education details are confirmed.
- The 404 page is not indexed (Next.js adds `noindex`).

## Deploying to Vercel

The repository is on GitHub (`digitallynexttech/manpreetjangra`); nothing is deployed yet. When it is time:

1. Import the repository in Vercel. The Next.js preset and pnpm (from `pnpm-lock.yaml`) are detected; keep the default build command and output. This is a normal Next.js deployment, not a static export, so image optimisation, `/sitemap.xml` and `/robots.txt` work as they do locally.
2. The site's own address comes from `NEXT_PUBLIC_SITE_URL` and defaults to `https://manpreetjangra.com`, which is not registered yet (`docs/CONTENT-REVIEW.md` section F). Until it is, set `NEXT_PUBLIC_SITE_URL` to the Vercel address (for example `https://your-project.vercel.app`) for Production and Preview, so canonical links, the sitemap, the JSON-LD and the share image point at a live site. It is read at build time: redeploy after changing it.
3. Once the domain is registered, add it in Vercel's Domains settings and set `NEXT_PUBLIC_SITE_URL` to `https://manpreetjangra.com` (or remove it to use the default), then redeploy.

No other environment variables, no analytics, no cookies and no backend: the contact form prepares an email draft in the visitor's own mail app.

## Open content questions

What only Manpreet or Karan can answer (the year she became COO, her education details, two hidden Writing items, the podium photo's event, where enquiries should go, which first-person lines she approves, the domain) is listed in `docs/CONTENT-REVIEW.md`, with the exact file and field to edit for each answer. The site is complete without them: anything unconfirmed stays hidden.
