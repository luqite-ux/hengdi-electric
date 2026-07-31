# Wide-Screen Layout Implementation Plan

> **For agentic workers:** Use inline execution. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Widen global content container from 80rem to 96rem site-wide.

**Architecture:** Single unlayered CSS override in `app/globals.css` for `.max-w-7xl`, plus a source-level regression test.

**Tech Stack:** Tailwind CSS v4, Node test runner.

## Global Constraints

- `.max-w-7xl` resolves to 96rem after the override.
- No component class names change.
- Mobile layout unchanged.

### Task 1: Container Widen

**Files:**
- Modify: `tests/catalog-pages.test.mjs`
- Modify: `app/globals.css`

- [ ] Step 1: Add failing test asserting globals.css contains `.max-w-7xl` with `96rem`.
- [ ] Step 2: Run `pnpm test`, expect RED.
- [ ] Step 3: Add override at end of globals.css.
- [ ] Step 4: Run full verification: `pnpm test; pnpm typecheck; pnpm lint; pnpm build; git diff --check`.
- [ ] Step 5: Browser screenshots at 1920x1080 and 390x844 (home + products); confirm no horizontal overflow.
- [ ] Step 6: Commit `fix: widen layout container for large screens`, push to main, wait for Vercel READY, production screenshots at 1920x1080.
