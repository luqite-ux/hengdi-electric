# Seamless Hero Lighting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hero's hard diagonal scan band with seamless ambient industrial lighting.

**Architecture:** Keep the effect CSS-only and decorative. Replace the scan element with a broad radial layer, soften existing marker and floor-glow styling, and retain responsive and reduced-motion behavior.

**Tech Stack:** Next.js, React, Tailwind CSS, global CSS, Node test runner

## Global Constraints

- Desktop-only decorative effects must not intercept pointer events.
- Mobile and reduced-motion modes must hide the added lighting effects.
- No directional beam or visible gradient boundary may remain.

---

### Task 1: Replace the divided scan effect

**Files:**
- Modify: `tests/catalog-pages.test.mjs`
- Modify: `components/hero.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing hero decorative layers and motion classes
- Produces: `.hero-ambient-light`, softened `.hero-energy-marker`, and `.hero-floor-glow`

- [ ] **Step 1: Write the failing regression test**

Require `hero-ambient-light`, reject `hero-scan-beam` and `@keyframes hero-scan`, and preserve marker, floor-glow and reduced-motion assertions.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern="seamless ambient" tests/catalog-pages.test.mjs`

Expected: FAIL because the old scan beam remains and the ambient-light class is absent.

- [ ] **Step 3: Implement the minimal visual change**

Replace the scan JSX layer with `.hero-ambient-light`; use a broad radial gradient with blur and slow opacity breathing; soften marker rings and floor glow; update reduced-motion selectors.

- [ ] **Step 4: Run full verification**

Run: `pnpm test; pnpm typecheck; pnpm lint; pnpm build; git diff --check`

Expected: all commands pass.

- [ ] **Step 5: Verify and deploy**

Capture desktop and mobile screenshots, commit the exact files, push to `main`, wait for Vercel Production, and repeat the viewport checks online.
