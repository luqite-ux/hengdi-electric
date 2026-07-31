# Desktop Navigation Scale Adjustment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase the desktop navigation scale while preserving the current mobile header and navigation behavior.

**Architecture:** Keep all behavior in the existing `SiteHeader` component and adjust only responsive Tailwind classes. Add a source-level regression contract that distinguishes compact mobile dimensions from larger `md` dimensions.

**Tech Stack:** Next.js 16, React, TypeScript, Tailwind CSS, Node test runner.

## Global Constraints

- Desktop header height is 76px at `md` and above.
- Desktop logo container is 44px at `md` and above.
- Desktop brand, navigation and quote-button text use 15px sizing.
- Mobile dimensions and behavior remain unchanged.
- Transparent dark-Hero and scrolled light-header color states remain unchanged.

---

### Task 1: Responsive Navigation Scale

**Files:**
- Modify: `tests/catalog-pages.test.mjs`
- Modify: `components/site-header.tsx`

**Interfaces:**
- Consumes: Existing `SiteHeader()` component and Tailwind responsive utilities.
- Produces: A 64px mobile / 76px desktop header with 36px mobile / 44px desktop logo and 15px desktop typography.

- [ ] **Step 1: Write the failing regression contract**

Add a test that reads `components/site-header.tsx` and requires `h-16 md:h-[76px]`, `size-9 md:size-11`, desktop `md:text-[15px]` navigation typography and the unchanged mobile `text-sm`/`size-10` controls.

- [ ] **Step 2: Run the test to verify RED**

Run: `pnpm test`

Expected: FAIL because the responsive desktop scale classes do not exist.

- [ ] **Step 3: Implement the responsive classes**

Update the header container, logo wrapper, logo image dimensions, brand name, navigation links and quote button. Preserve all routing, state and color logic.

- [ ] **Step 4: Verify GREEN and production quality**

Run: `pnpm test; pnpm typecheck; pnpm lint; pnpm build; git diff --check`

Expected: all commands exit 0.

- [ ] **Step 5: Browser verification**

Capture the products page at 1440x900 and 390x844. Confirm the desktop header is visibly larger, the page heading is not overlapped and mobile dimensions remain compact.

- [ ] **Step 6: Commit and deploy**

Stage only the plan, test and header files, commit with `fix: increase desktop navigation scale`, push to `main`, wait for Vercel READY and repeat desktop/mobile production screenshots.
