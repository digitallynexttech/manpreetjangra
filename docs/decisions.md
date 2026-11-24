# Decision log: Manpreet Jangra site

> Copy kept in the repository so the code carries its own rationale. The original lives in the project's `plan/` folder (outside this repository), copied on 24 November 2026. Paths such as `plan/`, `research/`, `assets/` and `.work/` refer to that project folder; `site/` is this repository. The repository branch is `main`. Edited for the copy: one row in section G no longer names the employer-review sites it rules out.

Status: FINAL, 2026-11-24, audit-1 fixes applied (section I). Planner: site-planner agent. Every decision below is closed; the builder follows `spec.md`. Visual decisions were made by the design judge in `design-decision.md` and are restated here only where the planner had to apply them (D17-D21); they are not re-opened.

Evidence keys: `F###` = fact id in `research/facts.json` (status in brackets where it matters); "refs 4a/4b/4c/4d" = `research/find-references.md` section 4; "critique 9-12" = `research/find-critique.md`; "parity" = `plan/deepak-goel-parity.md`; "DD" = `plan/design-decision.md`.

## A. Stack and engineering

**D01. Stack is fixed: Next.js 16.4.6 App Router + TypeScript, React 19.3, Tailwind CSS 4.3 via `@tailwindcss/turbopack`, lucide-react, next/font, React Compiler, pnpm, Vercel target (not a static export).**
Reason: set by Karan for the run, and identical to the sibling site so both can be maintained the same way (parity 5). Vercel keeps next/image optimisation, `sitemap.ts` and `robots.ts` native. Evidence: `site/package.json`, `site/next.config.ts` (already phase-based with `.next-dev` / `.next` and `reactCompiler: true`). Rejected: static export (loses image optimisation), any animation library (parity 1; `motion` already removed).

**D02. One stylesheet (`src/app/globals.css`) in fixed sections, Tailwind utilities for layout, component CSS in `@layer components`, motion engine CSS unlayered.**
Reason: Deepak's site uses one stylesheet and its motion rules are ported nearly verbatim; keeping them unlayered preserves their precedence (reveal states must beat utilities). A single file also avoids depending on `@import` chains through the Turbopack CSS loader. Rejected: splitting into several CSS files (more moving parts, no benefit at this size).

**D03. Class prefix `site-` for everything ported from the sibling engine (reveal, header, transitions, preview, intro), plus `mj-thread` for her one bespoke motif.**
Reason: DD already names `.site-reveal-ready`, `site-hero-*` keyframes and `mj-thread-draw`; reusing Deepak's names makes porting mechanical and reviewable side by side.

**D04. Content lives in `src/content/*.ts` (the run's task) rather than `src/data/content.ts` (DD 4.2); `sources.json` sits beside it.**
Reason: the task brief names `content/`; DD's path was illustrative. The `Portrait` type from DD 4.2 is kept unchanged.

**D05. Fact ids are a TypeScript union of the 74 publish + 33 flag ids; hold ids do not exist in the type.**
Reason: makes "no hold facts on the site" a compile-time check, not a review habit. Evidence: id lists computed from `facts.json` on 2026-11-24 (74 / 33 / 37).

**D06. `{{CONFIRM: ...}}` placeholders live only in data, are resolved on the server, never rendered and never shipped to the browser; there are seven items holding fourteen strings (spec 4.8).**
Reason: Karan expects a finished site tomorrow; Manpreet's answers must be drop-in. Hiding unconfirmed items keeps every page complete. Server-side resolution keeps the strings out of client JS and RSC payloads (QA greps for them). Items that need several answers (the entry-level article, the Japanese delegation session) are typed objects whose every unknown field is `X | Confirm` and listed in a `gate`; the item renders only when the whole gate passes, so a half-answered item never shows (spec 7.3 `EntryLevel`, `JapanSession`).

**D07. All routes static; the contact form reads `?type=` on the client with `new URLSearchParams(window.location.search)` inside a `useEffect` and writes it to the select through a ref; never `useSearchParams` or `searchParams`.**
Reason: `searchParams` would make `/contact` dynamic and `useSearchParams` needs a Suspense boundary that bails the page out of static prerendering; reading `window.location` after mount keeps the page static and avoids a state update inside an effect (React Compiler lint). Option values are the type keys; the draft prints the labels (spec 4.6.2).

**D08. Local IST clock uses `useSyncExternalStore` with an empty server snapshot.**
Reason: avoids hydration mismatch and the set-state-in-effect lint rule; the craft detail "New Delhi · IST hh:mm" comes from refs 4b-12.

**D09. Git: local milestone commits on `main`, never pushed or deployed.**
Reason: the run asks for milestone commits; Karan's standing rule is that nothing is published without his go-ahead, so no remote, push or deploy happens.

## B. Information architecture

**D10. Multi-page: Home, About, Work, Writing, Careers, Contact, plus a branded 404.**
Reason: page transitions are a parity requirement, and each audience has a clear destination (spec 1.2). The facts support each page: About (F010-F017, F031-F038, F050-F051, F060), Work (F010-F013, F110-F124, F140, F195), Writing (F060-F070, F100-F102), Careers (F012, F038, F070, F140-F144), Contact (F170, F171, F181).

**D11. Pages merged or dropped.**
- No Speaking page: no talks, panels or juries are documented (F084 hold); the one event (F080) is flagged and self-reported; the podium photo has no event (F082 flag). It becomes the "On stage" section of Writing, with an invitation and a hidden slot for the confirmed event.
- No Press page: one editorial feature exists (F100) and one unverified print reprint (F103 flag); trade press has nothing (F105 hold). The feature is the "Featured" block of Writing.
- No Recognition / Awards page: no personal award exists (F096 hold); company awards are unverified or company-level (F091-F095).
- No Clients / Case studies page: the client list and results are the agency's claims and need her say-so (F119, F120 flag).
- No Testimonials: recommendation snippets are anonymous (F018 hold); Deepak Goel's comments need his consent (F046).
- Careers kept as its own page: hiring is her longest-documented remit (F012, F032, F038) and no reference site has this block (refs 4a-7), so it is a differentiator.
- Contact kept separate: the form, routing note and details need a page; the home and inner pages end with a short contact band instead.

**D12. Nav labels: About, Work, Writing, Careers, with Contact as the header button.**
Reason: plain words, five items at most (refs 4c-4 venture-sprawl warning). "Work" over "Leadership" (shorter, concrete); "Writing" over "Voice" (credible register for a COO, matches the sibling site; the page also holds video and reel quotes, which "Writing" still covers as her published words).

**D13. Header CTA is an outline button; the hero has the only primary (vermilion) button in its viewport.**
Reason: DD red budget (max three vermilion things per viewport: thread, accent phrase, primary button). A vermilion header button would make four in the hero. How to count is fixed in spec 2.5: each primary button, the accent phrase and the Hiring pill count once each; all thread-family graphics together (eyebrow threads, static quote rules, timeline spine and nodes, active-nav underline) count as one; the hero field, the plate and the footer monogram are exempt; maximum 3. This follows DD 5.2 (the thread is one motif repeated, not new ideas).

**D14. One primary CTA: "Start a conversation" to `/contact`; one secondary: "See open roles". Each page ends with one primary only.**
Reason: refs 4c-9 (multiple competing primary CTAs); the two largest audiences are partners/organisers (contact) and talent (careers). Applied: the Home hiring card's "See open roles" is an outline button, so the Contact band primary below it is the only primary in that viewport; on Writing "Read the feature" is an external text link, and the page ends with On stage and its primary "Invite her to speak" instead of a Contact band (as Careers ends with Apply). Contact bands appear on Home, About and Work only.

**D15. Transition types: nav-forward for teaser links from Home into an inner page, nav-back for the 404 "Back to home", cross-fade elsewhere.**
Reason: the site has no detail pages; this gives both directional slides a meaningful, consistent use (parity 1).

**D16. Page order of sections (spec 2.4): record first, convictions second, then hiring and contact.**
Reason: DD 6.7 (the night band follows the journey); refs 4a order (hero, proof, pillars, timeline, thinking, hiring, contact).

## C. Voice and copy

**D17. Person: first person where she states what she runs or looks for (Home hero and "What I lead", Work, Careers, Contact); third person for records (About story, journey, bio, Writing annotations); her words only as verbatim, attributed quotes.**
Reason: her own register is first person, candid and direct (F067, F069, F070, F150); the hero and hiring copy should sound like her. Biography in third person can be lifted by press and organisers unchanged and avoids putting a narrative in her mouth. Every first-person claim is short and backed by a fact id; CONTENT-REVIEW C asks her to sign off the first-person lines: C2 (hero), C5 (hiring since 2018), C10 (job-post lines) and C11, which lists every other first-person line on Home, Work, Careers and Contact verbatim.

**D18. Hero formula: eyebrow (role · company · city) + H1 her name + one first-person statement with one italic accent phrase + one CTA + a credential line.**
Reason: refs 4b-1 and 4b-2 (role-stating hero and credential strip); refs 4c-1 warns against a bare name H1, so the statement directly under it carries the positioning. The credential line uses her own LinkedIn headline (F011) and the WER feature (F100). The directorship (F013, publish) is not in the hero because its note asks whether she wants board seats shown; it appears on Home (journey), About and Work behind one switch, `SHOW_DIRECTORSHIP` in `about.ts` (spec 4.9; CONTENT-REVIEW C4).

**D19. Quotes chosen without long dashes: WER quotes 1-5 are used; quote 6 and the intern-caption lines with long dashes are excluded.**
Reason: the no-long-dash rule applies to all copy, and a verbatim quote cannot be edited to remove one. Evidence: `research/wer_article.md` line 33 (quote 6 contains U+2014).

**D20. The reporter's paraphrase (F102) appears without quotation marks and is attributed to the magazine; the editor's summary (F101) is quoted and attributed to the magazine.**
Reason: F102 note; facts.md 6 "Not her words".

**D21. Agency words are always attributed to the agency: "Not all work needs AI. Some need judgment." (F116), "Modern DAD" (F116), service lines (F117), careers line (F129).**
Reason: facts.md 6 "Not her words"; facts.md 1 ("Every agency figure must be labelled as Digitally Next's").

**D22. A ready-to-copy bio for organisers on About.**
Reason: press and event organisers are a named audience; a 63-word third-person bio built only from publish facts plus a Copy button serves them better than a press kit page that would have no photos to offer yet. A second variant without the directorship follows `SHOW_DIRECTORSHIP`. Organisers reach it in one click from Home through the night band's "Bio for organisers" link.

**D23. Straight apostrophes in data; quotation marks drawn by `<q>` and `<blockquote>` styling.**
Reason: keeps verbatim text verbatim and avoids JSX escaping issues; typographic quote marks still render.

## D. Proof, numbers and hiring

**D24. Home proof row = three animated counters: 29K+ LinkedIn followers (F190), 699 LinkedIn posts plus 3 articles (F191), open roles (F196, computed).**
Reason: three publish numbers exist, so the counter pattern applies (parity 1). DD 1.2 sets them quietly on sand, not spotlit. Agency figures are kept out of her proof row so they are never read as hers (F194 note). Each number carries an "as of" date because it changes.

**D25. Her 2022 client-story numbers (3 years, 5+ websites, 6+ activations, 4 artists) get their own counters on Work.**
Reason: F195 is "the only personal delivery numbers on record", from her own post; they deserve proof treatment but belong with their story, not on the home row.

**D26. No invented proof numbers; tenure as COO, hires made, team size, markets personally handled stay out.**
Reason: F200 hold. CONTENT-REVIEW asks her for them.

**D27. Roles are static data with a dated "as listed on" line and a link to the agency's live page; counts are computed from the array; every date and count is derived, never typed.**
Reason: F140 says refresh at build and launch; fetching digitallynext.com during a Vercel build would make builds depend on another site. A dated static list is honest and stable; Karan refreshes it (CONTENT-REVIEW H). The captions are built from `ROLES_AS_OF` and `LINKEDIN_AS_OF` with `formatLongDate` (en-GB long date, Asia/Kolkata), and every count goes through `plural()`, with defined singular and empty states (spec 4.9): with no roles, the pill, the third proof counter, the ADAC list and the role list disappear and Careers says "No roles are listed right now."

**D28. All 28 listed roles are shown, including the two genetics roles, exactly as the agency lists them.**
Reason: they are public listings on the agency's own careers page (F140, publish) and the site links each to its source; omitting them would make the site's count disagree with the agency page. The F140 note says to confirm before featuring them, so they are not highlighted anywhere and CONTENT-REVIEW H asks Karan; deleting two objects updates every count.

**D29. Hiring philosophy uses her verbatim job-post lines (F141-F143) and her intern post (F070), framed as "from the job posts published in my name".**
Reason: F141 note (the copy may be house style; quote as from the posts she fronts). The H1 of Careers is her own line "A mentor, not a manager. A chance, not a checklist." (F070, F152).

## E. Contact

**D30. The enquiry form prepares an email draft (mailto) to contact@digitallynext.com, or careers@digitallynext.com for careers; no phone, no WhatsApp, no backend.**
Reason: only official @digitallynext.com addresses are allowed (F181, F144); her own address is not public (F180 flag), so a placeholder (spec 4.8 C7, CONTENT-REVIEW A7) swaps it in later. Deepak's form pattern is reused (parity, refs 4b-11). No WhatsApp because no phone number may be carried.

**D31. Social links: LinkedIn and Instagram only.**
Reason: F182. Threads is new and small (F172 flag, link only if she wants it); X is dormant since 2019 (F173); Facebook and Quora never (F174, F074).

**D32. No analytics, no cookie banner.**
Reason: privacy, performance, and refs 4c-3 (overlays before content); Karan's analytics preference is still open (facts.md Q26), so the safe default is none.

## F. Visual system as applied (from DD, not re-litigated)

**D33. Palette, type, radius, shadows, light-only theme and the red budget are exactly DD 2-6.**
Reason: DD is final. Applied choices the planner had to make inside it: eyebrow labels are ink-muted (not vermilion-ink) so the thread carries the accent and the red budget holds; timeline nodes are 8 px squares (DD: nothing but dots and the pill is rounded); quote rules inside the night band are static (DD 5.2: never more than one thread drawing per screen); the zari texture is hidden below lg (DD 6.7: never under text); below md every intro backdrop starts at 55 % of the width at 0.7x its opacity so muted text keeps 4.5:1; marigold focus rings only inside `.band-night` and `.site-footer` (DD wrote `footer`, which would also catch QuoteCard attributions on paper at 1.72:1).

**D34. Inner page H1s use the `h2` token size, not `display`.**
Reason: DD 3.1 reserves `display` for her name in the hero; inner pages still get one H1 each.

**D35. Intro backdrops: About silk-ivory, Work marble-ivory, Writing zari, Careers thread-paper, Contact zari, 404 thread-paper.**
Reason: DD 4.4 assigns thread-paper to the hiring/contact page and the 404, and says extra pages reuse textures in the order zari, silk-ivory, marble-ivory, thread-paper. Splitting Careers and Contact creates one extra page, which takes zari.

**D36. Imagery: the 2019 cut-out in the hero, the podium photo at 200 px on Writing, two venture screenshots, zari, three generated textures. No other photos of her.**
Reason: DD 4.1-4.4; every other photo needs consent or is too small (F211-F221). The site is complete without them; CONTENT-REVIEW E asks for originals.

**D37. iSoCIAL row has no website preview.**
Reason: no screenshot exists and none can be taken in this run; the sibling site ships the same row without a preview. The row still links to isocialconnect.in (live, F017).

**D38. No photo carousel.**
Reason: parity says to use it only if there are enough real photos; there are not (DD 5.1).

**D39. Footer carries a provenance line: "Portrait (2019): iSoCIAL. The textures behind headings and quotes are generated images, not photographs."**
Reason: parity 5 (generated images must never be mistaken for real events) and F214 (the portrait is the group's 2019 image).

## G. Left out on purpose (and what would bring each back)

| Item | Facts | Why left out of v1 | Upgrade path |
|---|---|---|---|
| Awards and recognition (WASME ICSME 2025 company award, CorporateLiveWire badge, JioStar "Empaneled Agency Partner", BRICS+ invitation, "LinkedIn WonderWoman" certificate) | F091 (publish, company), F092-F095, F083, F090 (hold) | None is a personal, independently verified award (F096). WASME is the agency's and its title exists only in the CEO's post; showing a company trophy on her site reads as hers. The WonderWoman item is a company-internal gesture | She confirms she wants WASME shown as the agency's, with a photo of the plaque (CONTENT-REVIEW D) |
| Testimonials | F018 (hold), F046 | Anonymous snippets; Deepak Goel's comments need his consent | Names, titles and consent (CONTENT-REVIEW D) |
| Client names, logos and case-study results | F119, F120 (flag) | Agency claims; her involvement unconfirmed | She names the clients and cases she may carry |
| JioStar / IPL creative featuring her | F093, F094, F220 (hold) | Self-claim; provenance unknown | Original file, posting details, permission |
| Foundation directorships (Pradurbhav, BOTING) | F014, F015 (flag) | Her call whether foundation seats belong on a personal site | She says yes |
| Titles "AVP - Digital Campaigns & Talent Acquisition" and "HR Lead" | F040, F039 (flag) | Undated or unverified | She confirms titles and years |
| Joining year 2016, "10+ years" | F030, F045 (flag) | No primary source for the month or entity; "nearly a decade" (F192) is used instead | She confirms |
| Executive certificate from iMET Global | F052 (flag, low) | Summary-only evidence, group's own school | She confirms name and year |
| Group reach numbers (iSoCIAL 8000+/34000+, iMET 15000+) | F199 (flag) | Group claims, not hers | She wants them, labelled as the group's |
| Internshala figures | F128, F201 (flag) | Company-level | She agrees they reflect her programme |
| Instagram, Threads and X follower counts | F171, F198 | Unstable or small | Not planned |
| Threads and X links | F172, F173 | New / dormant | She asks for Threads |
| The 2026 entry-level article and Lokmat reprint | F063, F064, F103 (flag) | Post URL and clipping not found; quoting needs her text | Built as a hidden slot (C4) |
| The August 2026 Japanese delegation session | F080 (flag), F081 (hold) | Self-reported; she is not named in coverage; "voice of Indian universities" is Goel's phrase | Built as a hidden slot (C5) |
| Galgotias event photos | F221 (hold) | She is not identified; rights not cleared | Her own stage photo |
| Agency blog "Career Talks - HR Corner" posts | F073 (hold) | No byline; authorship unproven | She confirms authorship |
| Agency logo and red #E21F26, Stack Sans | F222, DD 1.2 | The site must read as hers; agency colour fails as text; font licence unknown | Not planned |
| Languages (Spanish, Italian) | F160 (hold) | Ambiguous | She confirms |
| A personal line on About (Instagram bio "Digital \| AI \| Good Life", festival posts) | F005, F071, F159 (publish) | F071 and F159 are tone evidence, "not as copy"; two festival posts in two years do not support a general statement | She opts in (CONTENT-REVIEW D13) |
| Revenue, funding, headcount precision | F127 (hold), F115 | Not for a personal site; headcount only as "about 30" | Not planned |
| The 2015 internship | F044 (hold) | Directory-only, possible namesake merge | She volunteers it |
| Personal Facebook and Quora material, and employer-review sites | F174, F074, F126 (hold) | Privacy and scope rules | Never |

## H. Reference patterns adopted and avoided (refs 4b, 4c)

Adopted: role-stating hero with credential strip (4b-1, 4b-2); three-stat proof row (4b-3); dated timeline (4b-7); thesis paragraph for purpose (4b-8, used as "What drives her"); one accent on paper, ink for text (4b-9); restrained motion (4b-10, implemented with the parity engine instead of Lenis); mailto on the company domain plus LinkedIn (4b-11); local-time line and "Hiring now" (4b-12).
Not adopted: greyscale stage/press logo strip (4b-4) and named testimonials (4b-5), because the material does not exist yet (D11, section G); outcome-led story titles (4b-6), because no personal outcome data exists beyond F195, which is used.
Avoided: name-only H1 (4c-1, mitigated by the statement), builder-default palettes (4c-2), overlays before content (4c-3), venture-sprawl nav (4c-4), superlatives and SEO-stuffed titles (4c-5), blog-first home (4c-6), stale content (4c-7: dated "as of" lines), unregistered domain (4c-8: CONTENT-REVIEW F), competing primary CTAs (4c-9).

## I. Audit fixes applied

Source: `plan/audit-1.md` (2026-11-24; verdict PASS, 0 block, 22 fix, 34 nit). Every fix item and every nit is resolved in place in `spec.md`, `CONTENT-REVIEW.md`, `images.md` and the decisions above. Spec section numbers refer to the current `spec.md`.

| Audit # | Sev | Resolution | Where |
|---|---|---|---|
| A1 | fix | About story paragraph 3 now reads "In 2019 she led admissions counselling and outreach for iMET Global, the group's School of Digital Social Media & IoT, writing about skilling and freedom at work and signing off 'Happy Learning & Growing :)'. By July 2021 she was listed on mba.com as the school's application contact." [F034, F062, F157, F036, F016]. The 2021 journey entry also says "By July 2021" | spec 4.2.2, 4.2.3 |
| A2 | fix | Work How I work lede: "Two things I have posted about agencies and their audiences."; F069 attributions read "Instagram reel caption, 28 May 2025" (Work, Writing theme 2, quote registry `reel-vendors`, `reel-babysit`) | spec 4.3.5, 4.4.3, App. B |
| A3 | fix | Operations H2 "Five service lines, clients in 12 markets." [F117, F118]; "Digitally Next is a team of about 30 people." added to the paragraph [F115, F194]; caption "Agency figures: team size from Digitally Next's LinkedIn page; markets as listed on digitallynext.com, November 2026." | spec 4.3.2 |
| A4 | fix | About story paragraph 6 deleted (five paragraphs); F071 and F159 removed from every `facts` array; the personal line is now an opt-in, CONTENT-REVIEW D13; CONTENT-REVIEW C7 marked as moved; section G row added | spec 4.2.2; CONTENT-REVIEW C7, D13; section G |
| A5 | fix | Work row 1 role: "Chief Operating Officer. Director of BFG Market Consult Pvt Ltd, the company behind it, since 2024." [F010, F013] | spec 4.3.7 |
| A6 | fix | `SHOW_DIRECTORSHIP` in `about.ts` gates all five mentions (Home journey 2024 row, About story paragraph 5 first sentence, About journey 2024 entry, bio via `bio.withoutDirectorship`, Work row 1 second sentence); C4 "Where" lists Home, About, Work; D18 corrected | spec 4.9, 4.1.4, 4.2.2, 4.2.3, 4.2.6, 4.3.7; CONTENT-REVIEW C4; D18 |
| A7 | nit | Work Talent: "I have fronted Digitally Next's hiring since 2018, posting its roles under my own name on Instahyre in 2018 and on Cutshort from 2023 to 2024." The Careers intro uses the same "fronted" wording, so one phrasing goes to her in C5 | spec 4.3.3, 4.5.1 |
| A8 | nit | 2016 journey entry titled "Earliest article on LinkedIn" | spec 4.2.3 |
| A9 | nit | "The agency describes ADAC in its own words:" | spec 4.3.4 |
| A10 | nit | JSON-LD Person `image` is `/images/portrait/manpreet-2019-cutout.png` | spec 9.4; images.md S1 |
| A11 | fix | CONTENT-REVIEW C11 lists every other first-person line on Home, Work, Careers and Contact verbatim, with fact ids; D17 names C2, C5, C10 and C11 | CONTENT-REVIEW C11; D17 |
| A12 | nit | C5 "Where" includes Work (Talent); A6 and spec 4.4.5 both use "{event, year}" | CONTENT-REVIEW A6, C5; spec 4.4.5 |
| C1 | fix | Mentorship blockquote marks both omissions with `.site-quote-gap` (U+2026, sr-only "Lines omitted.") before lines 3 and 4; attribution "Selected lines from an Instagram caption, 29 June 2025" | spec 4.5.4, 6.7, App. B note |
| C2 | nit | No full stop inside the F142 `<q>` on the Home hiring lede | spec 4.1.6 |
| D1 | fix | Stage width `min(28.75rem, (100svh - var(--spacing-header) - 8rem) * 0.8, 100%)` on the grid item; portrait `sizes="(min-width: 1280px) 460px, (min-width: 1024px) 38vw, (min-width: 768px) 360px, calc(100vw - 52px)"`; fit table and success criterion 3 include 1024x768 and 1152x768; QA checks it | spec 1.3 #3, 4.1.1, 13; images.md R1 |
| D2 | fix | Counting rule in spec 2.5 (primary buttons, accent phrase, Hiring pill once each; thread family as one; hero field, plate and footer monogram exempt; max 3), referenced from 1.3 #6, the page sections and QA | spec 2.5, 1.3, 13; D13 |
| D3 | fix | `.band-night :focus-visible, .site-footer :focus-visible { outline-color: var(--color-marigold); }`; QA checks a QuoteCard link on paper | spec 6.2, 13; D33 |
| D4 | nit | Plate offset 8 px below lg, with the media rule written out; tablet stage `min(100% - 8px, 22.5rem)` | spec 4.1.1 |
| D5 | nit | Article quotes use `text-lede` (Newsreader never below 19 px) | spec 4.4.4 |
| D6 | nit | 404 H1 uses `text-h2` (DD 3.1 wins over DD 4.4), noted | spec 4.7 |
| D7 | fix | `.site-hero { position: relative; overflow: clip; }`; depth and lift run only inside `@media (prefers-reduced-motion: no-preference) and (width >= 64rem)` within `@supports`; QA scroll check at 1520 and 390 | spec 4.1.1, 6.11, 13 |
| D8 | nit | `::placeholder { color: var(--color-ink-muted); opacity: 1; }` | spec 6.13 |
| D9 | nit | Footer line "The textures behind headings and quotes are generated images, not photographs." | spec 3.4; D39 |
| D10 | nit | Below md, CSS moves every intro backdrop to start at 55 % at 0.7x opacity | spec 3.5; images.md G0; D33 |
| E1 | nit | Carousel row cites D38; dropped-pages note cites D11 | spec 14, 2.1 |
| E2 | nit | `pageMetadata({ ..., image = SOCIAL_IMAGE })` | spec 7.4 |
| E3 | nit | `.site-contact-details` sticky rule (right column) added beside the editorial grid | spec 6.12, 4.6.2, 14 |
| F1 | fix | `Header` takes `{ nav, cta }` props from the server layout; it never imports content values (type-only import allowed) | spec 3.1, 3.3, 7.2, 7.5 |
| F2 | fix | Typed `EntryLevel` (gate headline, href, edition) and `JapanSession` (gate date, venue, organiser, role, href); all placeholders use `{{CONFIRM: ...}}`; seven items, fourteen strings | spec 0.5, 4.4.2, 4.4.5, 4.8, 7.3; CONTENT-REVIEW A4, A5; D06 |
| F3 | fix | `HomeHero`, `TimelineView`, `QuoteView`, `VentureView`, `RoleGroupView` defined; export list per content file; `attributionOf` = speaker (WER only) + source + dateLabel | spec 7.3, 7.4, 4.4.3, App. B |
| F4 | fix | Pillar cards are one `<Link>` each with a `span.site-text-link--static` label; QA greps built HTML for nested anchors | spec 4.1.3, 6.8, 13 |
| F5 | fix | Preselect via `new URLSearchParams(window.location.search)` in `useEffect`; `<option value={key}>`; mailto built with `encodeURIComponent` | spec 4.6.2; D07 |
| F6 | fix | `LINKEDIN_AS_OF` and `ROLES_AS_OF` feed both captions through `formatLongDate`; the talent sentence counts from data; no hand-typed dates or role ranges | spec 4.1.2, 4.3.3, 4.5.2, 7.4; CONTENT-REVIEW H1, H2; D27 |
| F7 | fix | `plural()` in `lib/site.ts`; empty and singular states for pill, counter, ADAC, Careers H2, FAQ 2, hero and hiring links; QA builds with 0 and 1 roles | spec 4.9, 4.5.5, 7.4, 13; D27 |
| F8 | fix | Button label "Email your CV"; `.site-button { max-width: 100%; }` and wrapping below 40 rem; `.site-contact-details a { overflow-wrap: anywhere; }` | spec 4.5.2, 4.5.6, 6.8, 6.12 |
| F9 | fix | Featured article title is `<h2 id="featured-title" className="text-h3">`; the section is `aria-labelledby="featured-title"` | spec 4.4.2, 10.1 |
| F10 | nit | Night band zari `sizes="55vw" loading="lazy"` | spec 4.1.5; images.md G0 |
| F11 | nit | Hero grid CSS written out | spec 4.1.1 |
| F12 | nit | `social-card.mjs` marked "the builder writes it" | spec 8.5, 14; images.md S1 |
| F13 | nit | Alpha of column x=707 set to 0 after the crop, verified by the script | spec 8.1, 7.6; images.md R1, section 3 |
| F14 | nit | Single `COO_SINCE` in `about.ts`, imported by `home.ts` | spec 4.8, 7.3; CONTENT-REVIEW A1 |
| F15 | nit | Heading levels stated per element | spec 10.1 and the page sections |
| F16 | nit | Menu sheet z-index 49 dropped | spec 6.5, 6.9 |
| F17 | nit | Tokens referenced through utilities or CSS classes; QA checks all 17 `--color-*` variables in the built CSS | spec 6.2, 7.2 `Monogram`, 13 |
| F18 | nit | Counter rows keyed by label | spec 7.2 |
| G1 | fix | Home hiring button outline; Writing Featured link is a TextLink; Writing ends with On stage (no Contact band); 2.4 and 3.6 updated | spec 2.4, 3.6, 4.1.6, 4.4.2, 4.4.5; D14 |
| G2 | nit | Pillar 2 ends after "since 2018." and links "How I hire" to `/careers#criteria` | spec 4.1.3 |
| G3 | nit | Writing lede ends "with an open invitation to speak"; night band adds "Bio for organisers" (`/about#bio`, nav-forward) | spec 4.4.1, 4.1.5, 2.3; D22 |
| G4 | nit | MBA institution column left empty until confirmed (no "India" fallback) | spec 4.2.5; CONTENT-REVIEW A3 |
| G5 | nit | About timeline oldest first, "Now" last and open; H2 "Milestones, 2016 to now." | spec 4.2.3, 7.2 |
| G6 | nit | No podium caption until C6 is confirmed | spec 4.4.5; images.md R2 |
| G7 | nit | Writing theme 2 label "Ownership" | spec 4.4.3, App. B |
| G8 | nit | "See the roles" | spec 4.1.2 |
| G9 | nit | "What independence means to her." | spec 4.1.5 |
| G10 | nit | Apply eyebrow "Apply" | spec 4.5.6 |
| G11 | nit | About journey lede "Most entries link to their source." | spec 4.2.3 |

Also tidied in this pass (consistency, no new claims): the podium-caption key is `stage.photoEvent` everywhere (spec 4.4.5, 4.8, 7.3; CONTENT-REVIEW A6); the footer monogram is named as exempt from the red budget; CONTENT-REVIEW section C gained a "Where" column and its A table names placeholder keys as "spec C1-C7" so they are not confused with its own section C; D22 states the bio's real length (63 words).
