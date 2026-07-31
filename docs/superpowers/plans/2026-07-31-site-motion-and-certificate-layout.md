# Site Motion and Certificate Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add consistent restrained motion and correct the sideways business-license presentation.

**Architecture:** CSS owns reusable entrance, ambient and hover motion; existing React components opt into those classes. A small client `CountUp` component animates numeric statistics. Certificate metadata controls orientation without modifying source documents.

**Tech Stack:** Next.js 16, React, TypeScript, Tailwind CSS v4, CSS keyframes, IntersectionObserver, requestAnimationFrame.

## Global Constraints

- No external animation dependency.
- Continuous movement remains subtle and slower than 5 seconds.
- `prefers-reduced-motion: reduce` disables motion and preserves visible content.
- Original certificate assets remain unchanged.

---

### Task 1: Motion System and Count-Up

**Files:**
- Modify: `tests/catalog-pages.test.mjs`
- Modify: `app/globals.css`
- Create: `components/count-up.tsx`
- Modify: `components/hero.tsx`
- Modify: `components/hero-product-bridge.tsx`
- Modify: `components/page-header.tsx`
- Modify: `components/site-header.tsx`
- Modify: `app/page.tsx`
- Modify: `app/products/page.tsx`

- [ ] Add failing source contracts for the motion system, CountUp and reduced-motion coverage.
- [ ] Run `pnpm test` and confirm RED.
- [ ] Add reusable CSS motion classes and reduced-motion overrides.
- [ ] Wire Hero, page headers, bridge cards, navigation, stats and product cards.
- [ ] Run tests and confirm GREEN.

### Task 2: Business-License Layout

**Files:**
- Modify: `lib/certifications.ts`
- Modify: `components/certificate-gallery.tsx`
- Modify: `app/certifications/page.tsx`

- [ ] Add failing contracts for orientation metadata and wide business-qualification layout.
- [ ] Run `pnpm test` and confirm RED.
- [ ] Add orientation-aware landscape cards and modal preview.
- [ ] Add Reveal wrappers to certificate groups.
- [ ] Run full verification and browser screenshots.
- [ ] Commit, push to main, wait for Vercel READY and verify production.
