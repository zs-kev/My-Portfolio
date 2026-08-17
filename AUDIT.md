# Portfolio Site Audit

**Repo:** `zs-kev/my-portfolio` · **Audited:** 17 Aug 2026 · **Branch:** `claude/portfolio-site-audit-0sgv3v`

---

## 1. Where the project actually stands

129 commits between May and December 2023, then dormant for ~2.7 years. The good news first, because it matters for how we plan:

**The foundations are sound.** This is not a rewrite job.

- The production build **compiles and type-checks cleanly** with zero TypeScript errors and only two trivial ESLint warnings. That is unusual for a project left alone this long.
- The App Router structure is correct — route groups `(user)` and `(admin)` cleanly separate the public site from the embedded Sanity Studio.
- `globals.css` contains a real design system: a fluid type scale built on `clamp()`, semantic colour tokens, and a light/dark theming layer. The dark-mode wiring via `next-themes` is **correct** (it uses the `data-theme` attribute, which is that library's default, and the CSS matches).
- The Sanity schema is genuinely well modelled — field groups, fieldsets, validation rules, a hotspot plugin. Someone thought about the authoring experience.

**What's missing is the last 30%,** and it's the 30% that makes a site shippable: the contact form doesn't submit anywhere, project detail pages fetch the wrong document type, and the whole site is hidden behind a 7.5-second loader that also hides it from Google.

**Verdict:** roughly 70% built. Two to three focused sessions gets it live.

### Audit method

A six-dimension review (correctness, architecture, SEO, accessibility, performance, completeness), where every candidate finding was then handed to an independent agent instructed to *refute* it. **120 candidate findings → 70 confirmed, 50 refuted.** Everything below survived that adversarial pass or was verified by hand against a real build. The refuted half is not in this report, which is the point.

---

## 2. Ship blockers

These six stop the site from doing its job. Nothing else should be worked on before them.

### B1 · Project detail pages fetch a document type that doesn't exist
`src/app/(user)/[slug]/page.tsx:14`

```groq
*[_type=='post' && slug.current == $slug][0]
```

The schema defines the document type as `portfolio` (`src/sanity/schemas/portfolio.ts:4`). There is no `post` type anywhere in the studio. Every project case study — the entire substance of a portfolio — returns `null` and then throws.

**Fix:** one word, `'post'` → `'portfolio'`. Do this first; you can't manually test anything else on the detail page until you do.

### B2 · The contact form submits nowhere
`src/app/(user)/contact/page.tsx:29`

`<form method="POST">` with no `action`, no `onSubmit`, and no server action. There are **zero route handlers in the entire repo** (`find src -name route.ts` returns nothing). The five `useState` values are written but never read after being set.

A visitor fills in the form, hits Submit, and the browser does a native POST to `/contact`, which Next answers with **405 Method Not Allowed**. The message is destroyed silently. The footer "Let's Chat" CTA and the `/portfolio` sidebar both funnel here — this is the site's only conversion path, and it's the one thing a hire-me site has to get right.

**Fix:** `onSubmit` handler → `src/app/api/contact/route.ts` → Resend (or Formspree if you'd rather not manage a key). Plus success/error states, which the components are already shaped for.

### B3 · Every page server-renders an empty document
`src/lib/providers/LoaderProvider/ProviderLoader.tsx:8,32` + `src/app/(user)/layout.tsx:34-38`

```tsx
return <>{loaderFinished ? children : <Loader timeline={timeLine} />}</>;
```

`loaderFinished` starts `false`, so during SSR the ternary picks the loader. `Header`, `<main>`, and `Footer` are **not rendered at all** — they aren't in the HTML, they aren't in the DOM.

The HTML served to Google, to LinkedIn's link-preview bot, to every LLM scraper, and to any visitor whose JS fails is a full-screen overlay containing 54 decorative words. No `<h1>`. No nav. No project names. The string "Kevin Simon" does not appear in the body of any page.

**Fix:** always render `children`; make the loader a fixed-position *sibling* that overlays and then fades out.

```tsx
return <>{children}{!loaderFinished && <Loader timeline={timeLine} />}</>;
```

### B4 · The loader runs 7.5 seconds — on every single load
`src/components/home/loader/Animations.ts` · `ProviderLoader.tsx:28`

Adding up the GSAP timeline: 5s intro + 5s progress sweep (concurrent) + 0.5s + 3s collapse ≈ **7.5 seconds** before content mounts.

Worse, the "only show this once" guard doesn't work. `sessionStorage.setItem("hasSeenLoader", ...)` is written **inside the effect's cleanup function** (line 28), which doesn't run on a normal page load — so the flag is rarely set and returning visitors sit through the full 7.5s again. Combined with B3, LCP is ~7.5s by construction on every page. Google's "poor" threshold is 4s.

**Fix:** set the flag in the timeline's `onComplete` alongside `setLoaderFinished(true)`, cut the timeline to ≲1.2s, and add a skip control.

### B5 · Unknown URLs return 500 instead of 404
`src/app/(user)/[slug]/page.tsx:24-51`

`[slug]` sits at the route root, so it matches *every* unmatched top-level path. The GROQ query ends in `[0]` (returns `null` on no match), and there's no guard before `post.theChallenge` (line 26) and `post.client.title` (line 32).

`/foo`, a typo'd link, a deleted project, a crawler probing an old URL — all throw `TypeError: Cannot read properties of null` and serve a **500**. Search engines treat removed projects as server errors rather than gone. There's no `not-found.tsx` or `error.tsx` either.

**Fix:** `if (!post) notFound();` plus `not-found.tsx` and `error.tsx`.

### B6 · "Selected Projects" is mostly empty placeholder tiles
`src/components/portfolio/selectedSection/PortfolioSelected.tsx:64-117`

This grid renders on **both the homepage and the About page** — the first impression of your work on your two highest-traffic pages. Of six tiles:

| Tile | State |
|------|-------|
| 1 | Intro text — fine |
| 2 | Real, CMS-driven (`featuredOne`) |
| 3 | Empty grey block, `href=""` |
| 4 | Hardcoded Huddle logo, `href=""` |
| 5 | Hardcoded testimonial |
| 6, 7 | Empty grey blocks, `href=""` |

The schema already defines `featuredTwo` … `featuredFive` (`src/sanity/schemas/featured.ts:14-37`) — the GROQ query just never dereferences them. Four `<Link href="">` elements are focusable, announce as links, and reload the current page when clicked.

**Fix:** dereference all five in the query and map over them. Better: replace the five fixed slots with a single `array of reference to portfolio`.

---

## 3. Dependency and runtime currency

Everything is roughly three years stale. `npm audit` reports **45 vulnerabilities (4 critical, 16 high, 20 moderate)**.

| Package | Current | Latest | Gap |
|---|---|---|---|
| `next` | 13.4.3 | 16.3.1 | **3 major** |
| `react` / `react-dom` | 18.2.0 | 19.2.8 | 1 major |
| `sanity` | 3.17.0 | 6.9.2 | **3 major** |
| `next-sanity` | 5.5.5 | 13.3.3 | **8 major** |
| `typescript` | 5.0.4 | 7.0.2 | 2 major |
| `eslint` | 8.40.0 | 10.8.1 | 2 major |
| `eslint-config-next` | 13.4.3 | 16.3.1 | 3 major |
| `framer-motion` | 10.12.16 | 13.1.0 | 3 major + **package renamed to `motion`** |
| `@commitlint/cli` | 17.6.5 | 21.2.2 | 4 major |
| `@sanity/color-input` | 3.1.0 | 6.1.3 | 3 major |
| `@sanity/image-url` | 1.0.2 | 2.1.1 | 1 major |
| `styled-components` | 5.2.3 | 6.5.3 | 1 major — **see note** |
| `prettier` | 2.8.8 | 3.9.6 | 1 major |
| `husky` | 8.0.3 | 9.1.7 | 1 major |
| `next-themes` | 0.2.1 | 0.4.6 | minor |
| `embla-carousel-react` | 8.0.0-rc11 | 8.6.0 | **release candidate in production** |
| `gsap` | 3.12.2 | 3.15.0 | minor |
| `react-content-loader` | 6.2.1 | 7.1.2 | 1 major (unused — delete) |

**`styled-components` is not dead code.** It's a required peer dependency of `sanity@3.17` (`peerDependencies: { styled-components: "^5.2" }`), which is exactly why it's pinned without a caret. Don't remove it; it moves when Sanity moves.

### The constraint that shapes the whole upgrade

The versions are coupled, so this can't be done piecemeal:

- `sanity@3.x` peers `react: ^18` → **React 19 is blocked until Sanity 4+**
- `next-sanity@6+` requires **Next 14 minimum**
- `next@16` requires **Node 20.9+, React 19.2, TypeScript 5.1+**
- Next 16 **removes** synchronous `params`/`searchParams` (your `[slug]` page uses the sync form)
- Next 16 replaces `next lint` with the ESLint CLI, and ESLint 9+ needs flat config (`eslint.config.js`), so `.eslintrc.json` must be converted
- Sanity renamed `deskTool` → `structureTool` (`sanity/desk` → `sanity/structure`) in 3.24; your `sanity.config.ts:6` still uses the old import
- Sanity 4+ requires importing `@sanity/ui/styles.css` explicitly — styles are no longer auto-injected

So: **React, Sanity, and Next have to move together.** There's a CLI codemod for most of it (`npx @next/codemod@latest upgrade`) and a Sanity codemod for the desk rename.

### Also needs attention

- **`.nvmrc` says `lts/hydrogen`** — Node 18, EOL since April 2025. Needs Node 22 or 24. (Note: the `engines: { node: ">=18.15.0" }` floor is *not* blocking anything — it has no upper bound.)
- **`next.config.js` uses `images.domains`** — still valid in Next 13, but removed in Next 16. Becomes `remotePatterns` during the upgrade.
- **`@types/next-auth@3.15.0`** is a deprecated stub package that just depends on `next-auth`. Nothing in `src/` imports it, but it drags the whole of `next-auth` into the tree — which is where the `cookie` and `jose` vulnerabilities come from. Delete it.
- **`.husky` hook format changed in v9** — the `#!/usr/bin/env sh` + `. husky.sh` preamble must be removed.
- **Prettier 3** changes the default `trailingComma` to `"all"`, so expect one large reformat commit. Do it on its own.

---

## 4. SEO

For a site whose entire purpose is being found by recruiters and clients, this is the weakest area after the ship blockers.

**Beyond B3 (empty server HTML), which is the dominant SEO problem:**

- **All five routes serve an identical title and description** — `"Kevin Simon"` / `"My Portfolio Website"`. Home, About, Contact, Portfolio, and *every project page*. Three of them (`page.tsx`, `about`, `contact`) are `"use client"`, so they **physically cannot** export metadata until they're split into server wrappers.
- **No `generateMetadata` on `[slug]`** — the richest content on the site, and there's no technical obstacle here, it's just omitted. Every case study is titled "Kevin Simon".
- **No Open Graph or Twitter Card metadata anywhere.** Every time this gets pasted into LinkedIn, Slack, or WhatsApp — the primary distribution channel for a portfolio — it renders as a naked URL.
- **No JSON-LD / `Person` structured data**, despite four social profiles being hardcoded in three separate places. No `sameAs`, so Google can't consolidate the entity.
- **The homepage `<h1>` is the single word "Kevin".** "Simon" is an `<h2>` purely for visual sizing (`page.tsx:42-53`). The string "Kevin Simon" exists nowhere as one contiguous heading.
- **The meta description is a placeholder.** "My Portfolio Website" contains none of the terms anyone searches — not "full-stack developer", not "React", not "Johannesburg". The good copy is already written on the About page; use it.
- **`/studio` is fully indexable** — no `noindex`. Google will index your CMS login screen.
- **Project titles are never fetched or displayed.** The `/portfolio` GROQ query omits `title` entirely; cards are headed by the *client* name, so every internal link to a case study carries no descriptive anchor text.
- **Project thumbnails ship `alt=""`** even though the CMS stores alt text and the query fetches it.
- **No `sitemap.ts`, no `robots.ts`, no `metadataBase`, no canonicals.**
- **Footer says "© 2023"** on every page — the cheapest credibility leak on the site.

---

## 5. Accessibility

18 confirmed issues. The two that are genuinely serious:

- **Mobile navigation is unreachable by keyboard.** The hamburger is a bare `<div onClick>` (`Header.tsx:97-119`) — no `tabIndex`, no `role`, no `onKeyDown`, no accessible name, no `aria-expanded`. Below 62rem the desktop nav is `display:none`, so this div is the *only* route to About/Portfolio/Contact. Keyboard and screen-reader users cannot navigate the site on mobile at all.
- **`outline: 0` on every input and textarea with no replacement** (`globals.css:187-190`). This is the only `:focus` rule in the codebase. All five contact fields lose their focus ring and gain nothing back — you cannot see where you are in the form.

Also confirmed:

- `--gray` (`#9393a5`) computes to **3.01:1 on white** — below the 4.5:1 AA minimum — and it's used for nav links, form labels, and body copy.
- **`prefers-reduced-motion` is honoured nowhere.** Zero hits across the codebase. The 7.5s loader, the per-character hero stagger, the 100vh menu sweep, and every framer-motion transition all run unconditionally.
- **SplitType shatters the `h1`, `h2`, and intro paragraph into per-character `<div>`s** with no `aria-label` compensation, destroying their accessible text.
- Mobile menu has **no focus management, no Escape handler**, and leaves background content tabbable behind the overlay.
- Carousel prev/next buttons have **no accessible name** — both announce as just "button".
- Theme toggle announces as **"Light Dark"** with no `aria-pressed`/`role="switch"`.
- Active nav item is indicated **by colour alone**, no `aria-current`.
- Three `<a href="">` elements with **completely empty content** — focusable, no name, no destination.
- **No `autoComplete`** on any field (name/email/tel).
- Hero `h1`/`h2`/intro are **`opacity: 0` in CSS**, revealed only if GSAP completes.

---

## 6. Performance

- **1.89 MiB of fonts, all preloaded on every route.** Nine unsubsetted `.ttf` faces. I confirmed all nine are emitted to `.next/static/media/` with the `-s.p.ttf` (preload) marker, so every route pays for all of them. Converting to `woff2` and subsetting to Latin typically cuts this by ~70% → ~500KB. This is the single biggest performance win available and it's mechanical work.
- **Hero LCP image is a 533×704 PNG** (181KB) declared `width="0" height="0" sizes="100vw"`. The `sizes` value overstates its rendered width considerably, so the browser fetches a larger candidate than needed.
- **`width="0" height="0"` on four `<Image>` call sites** removes the aspect-ratio box, so no space is reserved until load → layout shift. The signature image (`page.tsx:174-179`) has `width="0" height="0"` and **no `sizes` at all**.
- **`PortfolioSelected` fetches client-side in a `useEffect`**, shipping the Sanity client and GROQ query into the browser bundle on the two most-visited pages, creating a request waterfall, and rendering `<Image src="">` on first paint (browsers resolve an empty `src` to the current document URL and re-download the page as an image).
- **`gsap` and `framer-motion` are both in the root-layout bundle**, so they load on all five routes including Contact, which animates nothing.
- **`/portfolio` is baked at build time with no revalidation.** Publishing a new project in Sanity changes nothing on the live site until a redeploy. (The `[slug]` route is *not* affected — without `generateStaticParams` it renders dynamically. Verified against a real build.)

---

## 7. Completeness punch-list

**The case study template renders 12 of 23 schema fields.** Four of six authoring groups produce zero output. You can fill these in the Studio today and nothing appears:

`mainImage` · `featuresImage` · `hotspots` (the whole image-hotspot plugin) · `quote` + `quoteName` · `firstImage` · `secondImage` · `thirdImage` · `fourthImage` · `finalWords`

Zero images appear on a project page. `featureImage` only shows on the index.

**Other gaps:**

- `featuredTwo`–`featuredFive` authored but never queried (root cause of B6)
- Client schema: `mainLogo`, `description`, and two of three brand colours never rendered
- `/portfolio` "All Projects" link is `href="#"` — reads as a filter control, does nothing
- Testimonial is hardcoded, unattributed, unsourced; heading reads "What they saying"
- Social links hardcoded in **three** separate places (`page.tsx`, `portfolio/page.tsx`, `Socials.tsx`) — two are copy-paste identical
- Experience section has one entry, ending 2021
- `var(--sansProSemiBold)` in `PortfolioSelected.module.css:38` is missing the `font-` prefix → undefined variable, silently falls back

---

## 8. Engineering hygiene

- **No CI.** No `.github/` directory at all. The `pre-push` hook runs a full `next build` locally instead.
- **No tests.** No framework, no test files.
- **README is unmodified `create-next-app` boilerplate** — it still tells you to edit `app/page.tsx` and describes loading Inter, which the project doesn't use.
- **No `.env.example`**, despite three required env vars. `src/lib/sanity.client.ts:5` reads `NEXT_PUBLIC_SANITY_API_VERSION` **with no fallback**, and the Sanity client throws `Invalid API version string` at module load if it's unset — taking down every page. (`src/sanity/env.ts:1` defaults it correctly; the two clients disagree.)
- **Two duplicate Sanity clients.** `src/lib/sanity.client.ts` (used, `useCdn: true`, no apiVersion fallback) and `src/sanity/lib/client.ts` (never imported, `useCdn: false`, correct fallback). Delete the unused one and fix the used one.
- **Genuinely dead code:** `src/components/contentLoader.tsx` (never imported) · `react-content-loader` · `BaseTemplate` · `@types/next-auth` · `src/sanity/lib/*` · `public/next.svg` + `public/vercel.svg`
- **Four `console.log` calls** in production paths, including `console.log(post.theChallenge)` which is itself a crash site.
- **Missing `suppressHydrationWarning`** on both `<html>` elements — `next-themes` requires it; without it React logs an "Extra attributes from the server" warning on every load.
- **`reactStrictMode` not enabled** — it's off by default in Next 13 and would surface the effect bugs in B4/B5. Turning it on becomes automatic when you upgrade.

**One thing to check yourself:** the repo self-hosts **Cerebri Sans Pro**, which is a commercial typeface from Hanken Design Co. Self-hosting on a public site normally needs a webfont licence, and the `.ttf` files are committed to a public GitHub repo. Butler is free for commercial use, so that one's fine. Worth confirming you're covered before the site goes public — I'd rather flag it now than after launch.

---

## 9. Recommended plan

Bug-fixing on the old stack and then immediately upgrading means doing some work twice — particularly around `params`, metadata, and the client/server split, which all change shape in Next 16. So the sequence below front-loads the one-line fix that unblocks manual testing, then upgrades, then builds.

**Phase 0 — Unblock (30 min)**
Recover the Sanity project ID and dataset, add `.env.example`, fix the `_type=='post'` typo (B1), fix the missing `apiVersion` fallback. Goal: the site runs locally and you can see project pages.

**Phase 1 — The upgrade (1 session)**
In this order, committing separately at each step so a regression is bisectable:
1. Node 22/24 · `.nvmrc` · `engines`
2. Tooling: Prettier 3 (reformat commit on its own), Husky 9, commitlint 21, ESLint flat config
3. `npm audit fix`; delete `@types/next-auth`
4. Framework, all together: Next 13→16 via `npx @next/codemod@latest upgrade`, React 19, Sanity 3→6, `next-sanity` 5→13, `styled-components` 6, `deskTool`→`structureTool`, `images.domains`→`remotePatterns`, async `params`
5. `embla-carousel-react` off the release candidate

**Phase 2 — Ship blockers (1 session)**
B2 contact form · B3 loader/SSR · B4 loader timing · B5 404 handling · B6 featured grid. This is the phase that makes it launchable.

**Phase 3 — Findable and usable (1 session)**
Split the three client pages into server wrappers so they can export metadata · `generateMetadata` for `[slug]` · OG tags · JSON-LD · sitemap/robots · keyboard-accessible hamburger · focus indicators · contrast · reduced-motion · fonts to woff2.

**Phase 4 — Finish the work**
Build out the case study template (the 11 unrendered fields) · portfolio filtering · testimonials in the CMS · replace hardcoded content.

**Then:** CI on GitHub Actions, and deploy.

### Two things I need from you

1. **Do you still have the Sanity project credentials** (project ID, dataset, and studio access)? If the project was deleted or the org lapsed, we need to know now — it changes Phase 0 from "find the env vars" into "recreate the dataset and re-enter the content."
2. **Is there real project content in Sanity?** The audit can see the schema but not the data. If the CMS is empty, Phase 4 is content work as much as code work, and we should plan for that.
