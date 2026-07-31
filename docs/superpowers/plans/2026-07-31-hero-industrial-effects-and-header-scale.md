# Hero Industrial Effects and Header Scale Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add right-side industrial light effects and enlarge the desktop header one step.

**Architecture:** Decorative Hero layers are static JSX elements animated by reusable CSS keyframes. Header scaling remains responsive Tailwind classes in the existing `SiteHeader` component.

**Tech Stack:** Next.js 16, React, TypeScript, Tailwind CSS v4, CSS keyframes.

## Global Constraints

- No JavaScript animation loop and no external dependency.
- Hero effects do not cover the left copy or intercept pointer events.
- Effects are hidden on mobile and disabled for reduced-motion users.
- Mobile header dimensions remain unchanged.

---

### Task 1: Regression Contracts

**Files:**
- Modify: `tests/catalog-pages.test.mjs`

- [ ] Add a failing test for scan beam, three energy markers, floor glow and reduced-motion handling.
- [ ] Add a failing test for 84px desktop header, 48px desktop logo and 16px desktop typography.
- [ ] Run `pnpm test` and confirm both contracts fail for the missing behavior.

### Task 2: Implement and Verify

**Files:**
- Modify: `app/globals.css`
- Modify: `components/hero.tsx`
- Modify: `components/site-header.tsx`

- [ ] Add CSS keyframes and decorative Hero layers.
- [ ] Update responsive desktop header classes.
- [ ] Run `pnpm test; pnpm typecheck; pnpm lint; pnpm build; git diff --check`.
- [ ] Verify homepage at 1440x900, 1920x1080 and 390x844.
- [ ] Commit, push to main, wait for Vercel READY and repeat production verification.
