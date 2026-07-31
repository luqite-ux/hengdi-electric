# Product Card Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the six inconsistent product collages with normalized catalog-authentic hero images and a unified industrial card system.

**Architecture:** The asset processor will produce one subject-focused 4:3 image per product series from manifest-defined source crops. The product list and homepage will share those assets through existing product data and use a consistent image-stage/card treatment without changing routes or Supabase integration.

**Tech Stack:** Next.js 16, React Server Components, Tailwind CSS, next/image, Pillow, Node test runner, Playwright.

## Global Constraints

- Keep exactly the six catalog-verified product series.
- Do not modify shared huanqiu-admin code or other tenant data.
- Do not invent product specifications or unsupported visual features.
- All visible copy remains English.
- Use AI generation only when a clean catalog-authentic subject cannot be isolated.

---

### Task 1: Lock the visual contract with regression tests

**Files:**
- Modify: `tests/catalog-assets.test.mjs`
- Modify: `tests/catalog-content.test.mjs`

**Interfaces:**
- Consumes: `scripts/catalog-assets.json` and `app/products/page.tsx`.
- Produces: assertions that prohibit multi-crop collages and series-number labels.

- [ ] **Step 1: Write failing assertions**

Assert that every product manifest entry has one `crop`, no `crops` array, and that the products page omits `Product Series {index}` while retaining the six expected product links.

- [ ] **Step 2: Run tests to verify failure**

Run: `pnpm test`

Expected: FAIL because the cable tray and busbar entries still contain `crops`, and the page renders numbered labels.

- [ ] **Step 3: Keep the failing output as the implementation target**

Do not weaken expected product count, slugs, or source-page traceability.

### Task 2: Produce normalized single-subject product assets

**Files:**
- Modify: `scripts/catalog-assets.json`
- Modify: `scripts/process-catalog-assets.py`
- Regenerate: `public/catalog/product-cards/*.webp`

**Interfaces:**
- Consumes: one normalized crop rectangle and optional `canvas` positioning metadata per manifest entry.
- Produces: six 4:3 WebP images on a uniform near-white stage.

- [ ] **Step 1: Replace collage definitions**

Select one representative catalog crop per series. Remove every `crops` array and preserve `sourcePage`, `output`, and `alt`.

- [ ] **Step 2: Implement normalized canvas placement**

Crop the subject, trim empty margins conservatively, resize it within a 1600x1200 canvas, and center it with consistent padding. Preserve catalog authenticity and avoid clipping.

- [ ] **Step 3: Regenerate assets**

Run the processor against the original rendered catalog page directory and inspect all six outputs at full size.

- [ ] **Step 4: Run asset tests**

Run: `pnpm test`

Expected: asset contract passes; the page-label assertion still fails until Task 3.

### Task 3: Rebuild product cards and homepage image stages

**Files:**
- Modify: `app/products/page.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: existing `Product` records and normalized image paths.
- Produces: responsive accessible product links with aligned visual hierarchy.

- [ ] **Step 1: Remove numbered labels and oversized styling**

Make the product name the first heading, use a compact category marker only where supported by data, reduce radius, and align the action at the bottom.

- [ ] **Step 2: Normalize the image stage**

Use a shared 4:3 stage, subtle cool-gray background, consistent image padding, and restrained hover zoom. Apply the same image treatment to homepage product cards.

- [ ] **Step 3: Add keyboard and hover states**

Use `focus-visible` ring styles and preserve full-card semantics without nested interactive controls.

- [ ] **Step 4: Run tests**

Run: `pnpm test`

Expected: PASS.

### Task 4: Verify, deploy, and review production

**Files:**
- No source additions expected.

**Interfaces:**
- Consumes: the completed customer-site change.
- Produces: verified production deployment and desktop/mobile evidence.

- [ ] **Step 1: Run static verification**

Run: `pnpm typecheck`, `pnpm lint`, and `pnpm build`.

Expected: all exit 0.

- [ ] **Step 2: Review local browser screenshots**

At 1440px and 390px widths, verify six cards, no broken images, no overflow, consistent image scale, readable copy, keyboard focus, and aligned actions.

- [ ] **Step 3: Commit and push exact files**

Stage only the design/plan, tests, manifest, processor, six image files, and the two page files. Push the customer repository `main` branch.

- [ ] **Step 4: Verify Vercel production**

Wait for `READY`, then repeat desktop/mobile checks against the production URL and confirm the deployed commit matches GitHub `main`.
