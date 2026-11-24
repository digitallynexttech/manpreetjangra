# Content review: questions for Manpreet and Karan

> Copy kept in the repository so the code carries its own rationale. The original lives in the project's `plan/` folder (outside this repository), copied on 24 November 2026. Paths such as `plan/`, `research/`, `assets/` and `.work/` refer to that project folder; `site/` is this repository. The repository branch is `main`. Edited for the copy: the A2 and A3 field paths match the code (`education.entries[...]`).

Date: 2026-11-24 (updated after `plan/audit-1.md`). The site is built to be complete without any answer below: anything unconfirmed is simply not shown. Each answer is a small edit in one data file under `site/src/content/`, listed in the "Where" column. Fact ids (F###) point to `research/facts.md`. Placeholder keys "spec C1-C7" refer to the table in `plan/spec.md` section 4.8 (not to section C of this file).

How to answer: reply against the item numbers (A1, B2, ...). "Yes", "No" or the missing detail is enough.

---

## A. Placeholders waiting for you (hidden on the site until filled)

| # | Question for Manpreet | Shown now | Shown after your answer | Where |
|---|---|---|---|---|
| A1 | In which year did you become Chief Operating Officer of Digitally Next? (The public record only places it between September 2023 and December 2025.) [F041] | Timeline says "Now" | "Since {year}" on Home and About | `about.ts` `COO_SINCE` (the only copy; `home.ts` imports it) (spec C1) |
| A2 | In which year did you complete your B.Sc. (Hons) Physics at the University of Delhi? [F050] | "University of Delhi" | "University of Delhi, {year}" | `about.ts` `education.entries[0].year` (spec C2) |
| A3 | Where and in which year did you do your MBA in HR & Marketing? [F051] | The degree only; the institution column is left empty | "{institution}, {year}" (if you give only one, only that one shows) | `about.ts` `education.entries[1].institution`, `.year` (spec C3, two fields) |
| A4 | Your 2026 article on how the entry-level job is changing in the AI era. Three fields, all needed before it shows: (1) the headline, (2) the LinkedIn post link, (3) the Lokmat Times edition and date (a scan or photo of the clipping helps us check it). Also: may we quote "The first rung of the career ladder is changing." and "This is not the end of work for graduates."? [F063, F064, F103] | Not shown | A second "Featured" item on Writing | `writing.ts` `entryLevel.headline`, `.href`, `.edition` (spec C4, three strings) |
| A5 | The August 2026 session with the Japanese CEO and Government Delegation. Five fields, all needed before it shows: (1) the date, (2) the venue, (3) the organiser, (4) your role (speaker, panellist, moderator, representing iMET Global?), (5) the link to your post. [F080] | Not shown | A row under "On stage" on Writing, with your quote from the post | `writing.ts` `japanSession.date`, `.venue`, `.organiser`, `.role`, `.href` (spec C5, five strings) |
| A6 | Which event is your current LinkedIn podium photo from, and in which year? [F082, F210] | No caption (the section is already headed "On stage") | Caption "{event, year}" under the photo, for example "Name of event, 2025" | `writing.ts` `stage.photoEvent` (spec C6) |
| A7 | Should enquiries from the contact form go to your own @digitallynext.com address? If yes, which one? (Today they go to contact@digitallynext.com, marked for your attention; careers enquiries go to careers@digitallynext.com.) [F180, F181, F144] | contact@ | your address | `contact.ts` `CONTACT.directEmail` (spec C7) |

---

## B. Facts on the site that still need your confirmation (flag status)

| # | What the site says | Question | Where |
|---|---|---|---|
| B1 | "B.Sc. (Hons) Physics, University of Delhi" (About, Education) [F050] | Correct as written? (Taken from your LinkedIn About text.) | `about.ts` |
| B2 | "MBA in HR & Marketing" (About, Education) [F051] | Correct as written? | `about.ts` |
| B3 | Your podium photo, shown small (200 px) on the Writing page beside "On stage" [F082, F210] | May we use it? Can you get the organiser's high-resolution original? | `images.ts` |
| B4 | The 2019 black-and-white portrait (from iSoCIAL's video thumbnail) as the home-page portrait, credited "Portrait (2019): iSoCIAL" [F214, F035] | May we use it until a new portrait exists? Is the credit right? | `images.ts`, footer |

---

## C. Wording to sign off (public facts, but in your name)

| # | Text on the site | Question | Where |
|---|---|---|---|
| C1 | Eyebrow and title: "Chief Operating Officer · Digitally Next · New Delhi" [F010] | Is "Chief Operating Officer" the exact title you want? (The company website names no leadership, so this comes from your Instagram bio and the WER feature.) | Home hero, footer, page titles (`home.ts`, `navigation.ts`, `lib/site.ts`) |
| C2 | Hero, in your voice: "I run how Digitally Next works and who joins it, and I am building its AI Decision and Acceleration Center." [F010, F012, F011] | Happy with this sentence in first person? | Home hero (`home.ts` `hero`) |
| C3 | Credential line: "Heading talent acquisition for digital, AI and data · Featured in Women Entrepreneurs Review, 2026" [F011, F100] | OK? | Home hero (`home.ts` `hero`) |
| C4 | "Director of BFG Market Consult Pvt Ltd, since 2024" [F013] | Do you want this board seat shown at all? | Home (journey, 2024 row), About (story paragraph 5, journey 2024 entry, bio), Work (the group, Digitally Next row). One switch: `SHOW_DIRECTORSHIP` in `about.ts`. Set it to `false` and all five mentions go; the bio switches to its version without the directorship |
| C5 | "I have fronted Digitally Next's hiring since 2018" (Home pillar 2, Work Talent paragraph, Careers intro) and the heading "Hiring in my name since 2018." (Work Talent) [F012, F032, F038] | Accurate? (Your earliest public job posts are from January 2018 on Instahyre; every Digitally Next listing on Cutshort from February 2023 to August 2024 was posted by you.) | Home (`home.ts`), Work (Talent, `work.ts`), Careers (`careers.ts`) |
| C6 | The client story: "three years with Avi, a client in Jerusalem in luxury, lifestyle and art", with the numbers from your 2022 post (3 years, 5+ websites, 6+ brand activations, 4 artists) [F037, F195] | OK to name Avi by first name, as in your post? | Work (client story names Avi); About (story and journey mention the client without the name) |
| C7 | (Moved to D13: the personal Instagram-bio line is no longer on the site.) | - | - |
| C8 | The "MJ" monogram used as the browser icon and the footer sign-off [F004] | Do you like "MJ" for this? | `src/app/icon.svg`, `Monogram.tsx` |
| C9 | Short bio for organisers (About): "Manpreet Jangra is Chief Operating Officer of Digitally Next, a New Delhi digital marketing agency founded in 2010, and a director of BFG Market Consult Pvt Ltd, the company behind it. She leads the agency's operations and talent acquisition and is building its AI Decision and Acceleration Center. She has worked across the group, including iMET Global and iSoCIAL, for nearly a decade." If you say no in C4, the bio drops ", and a director of BFG Market Consult Pvt Ltd, the company behind it". | Approve, or send your preferred bio. | About (`about.ts` `bio`) |
| C10 | Hiring lines quoted from the Digitally Next job posts published in your name on Cutshort, 2023-2024 (for example "We don't like experts, we prefer people who are always willing to learn and are able to learn quickly") [F141, F142, F143] | OK to show these as your hiring philosophy? | Home (hiring), Work (Talent quote), Careers (What I look for) |
| C11 | Lines written in your voice from public facts (listed below) | Please read and approve each one, or send a change | Home, Work, Careers, Contact |

### C11. Every first-person line, for your approval
Written from the public record (fact ids in brackets); none adds a claim beyond it. C2, C5 and C10 above are not repeated.

Home
1. What I lead, lede: "Three responsibilities at Digitally Next, the New Delhi agency where I am Chief Operating Officer." [F010, F002]
2. Pillar 2, Talent and hiring: "I have posted the agency's roles under my own name, on Instahyre in 2018 and on Cutshort from 2023 to 2024." [F012, F032, F038] (reworded in the design polish)
2a. Pillar 3, AI Decision and Acceleration Center: "I am building it at Digitally Next. The agency's own line for it: 'Not all work needs AI. Some need judgment.'" [F011, F116] (reworded in the design polish)
3. Hiring, lede (after the job-post quote): "That line runs through the Digitally Next job posts published in my name." [F038, F012]

Work
4. Intro, lede: "I am Chief Operating Officer of Digitally Next, a digital marketing agency in New Delhi founded in 2010. This is what I run, and where the agency sits in its group." [F010, F110, F111, F124]
5. AI Decision and Acceleration Center: "My LinkedIn headline puts it first: 'Building AI Decision and Acceleration Center @Digitally Next'." [F011]
6. How I work, lede: "Two things I have posted about agencies and their audiences." [F069, F067]
7. Client story, lede: "In September 2022 I wrote about three years with Avi, a client in Jerusalem in luxury, lifestyle and art. These are the numbers from that post." [F037, F195]
8. Where I work, lede: "Digitally Next, iMET Global and iSoCIAL are part of the BFG group founded by Deepak Goel. My work has touched all three." [F124, F113, F031]

Careers
9. Intro, lede: "I have fronted Digitally Next's hiring since 2018. Here is what is open now, and what I look for." [F012, F032]
10. What I look for, lede: "These lines run through the Digitally Next job posts published in my name on Cutshort, 2023 to 2024." [F038, F141, F142]
11. Mentorship, lede: "In June 2025 I wrote this about our summer interns." [F070]
12. Questions, answer 4: "Use the contact form and choose Careers and internships. It prepares an email to careers@digitallynext.com, marked for my attention." [F144, F181]

Contact
13. Intro, lede: "For partnerships with Digitally Next, invitations to speak, press, or careers. Your message is prepared as an email to the Digitally Next team, marked for my attention." [F010, F181]
14. Form heading: "Tell me a little about it."

About and Writing are written in the third person and quote you only verbatim, with the source named.

---

## D. Left out for now: tell us if you want any of these added

| # | Item | What we would need |
|---|---|---|
| D1 | The agency's WASME Global Excellence Awards 2025 trophy, shown as Digitally Next's (never as yours) [F091] | Your OK and a photo of the plaque or certificate to confirm the wording |
| D2 | Testimonials (Deepak Goel, clients, former interns or hires; your LinkedIn recommendations) [F018, F046] | Names, titles and their written consent |
| D3 | Clients and case studies you worked on (for example Signia, NeoTech Genomics, Advent Global, Hard2Soft) [F119, F120] | Which clients may carry your name, and your part in each |
| D4 | Directorships of Pradurbhav Foundation and BOTING for Better World Foundation (since 2024) [F014, F015] | Yes or no |
| D5 | Earlier titles: "AVP - Digital Campaigns & Talent Acquisition", "HR Lead", "Lead - Learning & Development" and their years [F040, F039] | Titles and years |
| D6 | The month and year you joined the group, which company hired you, and total years of experience (the site now says "nearly a decade") [F030, F045, F192] | The dates |
| D7 | Talks, panels, jury roles or podcasts (a Speaking list) [F084] | Event, date, organiser, link |
| D8 | Numbers for the home proof row that are yours: hires made, team size you run, campaigns, markets you handled [F200] | Figures you are comfortable publishing |
| D9 | The iMET Global executive certificate [F052] | Programme name and year |
| D10 | Threads link (@manpreetjangraofficial) [F172] | Yes or no |
| D11 | Any "Career Talks - HR Corner" posts on digitallynext.com that you wrote [F073] | Which ones |
| D12 | The JioStar x Digitally Next creative that features you [F094] | The original, who posted it and when, and permission |
| D13 | A personal line on About, for example your Instagram bio "Digital \| AI \| Good Life" [F005, F159] | Yes or no (and the line you would like, if not this one) |

---

## E. Photos and originals needed (top priority after A)

1. **A new executive portrait** (replaces the 2019 photo in the hero without any redesign) [F223]:
   - 4:5 master plus a 3:2 crop, 2000 px or more on the short edge.
   - Plain warm backdrop: cream seamless, or mid-grey seamless (so it can be cut out onto the vermilion field).
   - Soft window light from the left; you in cream, white or black; glasses optional; eyes to camera or just off; head in the upper third with clear space above.
   - The photographer's name for the credit.
2. **The high-resolution original of the podium photo** and the event name (B3, A6).
3. **The original stage photo from the August 2026 delegation session**, with the organiser or photographer credit (A5).
4. Optional, with consent: the café portrait from 2 September 2025 (we would crop out the mug), the Diwali 2025 photos, the June 2025 intern photo (needs the consent of everyone pictured) [F211, F212, F213].

---

## F. Domain (for Karan, before anything goes live)

- Register **manpreetjangra.com** and **manpreetjangra.in** now: both were unregistered on 23 November 2026, and unregistered name domains get taken by spam sites [F175].
- The site already uses `https://manpreetjangra.com` for canonical links, the sitemap and share tags (`site/src/lib/site.ts`). Until the domain points at Vercel, set `NEXT_PUBLIC_SITE_URL` to the preview address.
- Hosting: Vercel, same as Deepak's site.

---

## G. The single colour question (for Manpreet)

> "We built your site around the vermilion red and gold of your Diwali 2025 outfit, deliberately not the Digitally Next red: is that a colour you would choose to represent you, or is there a colour you would rather it be?"

Background: you have not named a favourite colour anywhere public [F161]; your Diwali 2025 outfit is the one colour choice that is clearly yours [F212]. If you prefer another colour, the change is three values in one file, not a redesign (a maroon alternative is already prepared).

---

## H. For Karan before launch

| # | Task | How |
|---|---|---|
| H1 | Refresh her LinkedIn follower and post counts (29,490 and 699 on 23 Nov 2026) [F190, F191] | Edit `stats` and `LINKEDIN_AS_OF` in `site/src/content/home.ts`; the proof-row caption date is built from `LINKEDIN_AS_OF` |
| H2 | Refresh the open roles from digitallynext.com/careers (21 full-time + 7 internships on 23 Nov 2026) [F140, F196] | Edit `roles` and `ROLES_AS_OF` in `site/src/content/roles.ts`; every count, the Hiring pill, the ADAC list and both "as of" captions update. With no roles the site switches to its empty state (spec 4.9) |
| H3 | "Genetic Counsellor" and "Genetic Care Coordinator" are listed under the agency's Marketing Services Group and may be client-embedded roles [F140] | If so, delete those two objects from `roles.ts` |
| H4 | Confirm she is happy with contact enquiries going to contact@digitallynext.com (A7) | - |
| H5 | Analytics: none installed (no cookie banner needed). Decide whether to add any | - |
| H6 | The build made local git commits per milestone on the `main` branch of `site/`; nothing was pushed or deployed | Review, then push and deploy when you are ready |
| H7 | Not used, by design: the agency logo and red, and the agency font Stack Sans (licence unknown) [F222] | No action unless you want them |
| H8 | If any generated texture could not be made, the build report says which page reuses another texture | Re-run the Codex prompt from `plan/images.md` |
