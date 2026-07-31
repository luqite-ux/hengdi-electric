# Product Visual Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dashboard-like homepage hero with a compact product-led industrial composition featuring verified product families, evidence chips, and a dark capability strip.

**Architecture:** `components/hero.tsx` remains the single homepage hero boundary and becomes a server-compatible presentational component. One AI-composited hero bitmap under `public/catalog/hero/` supplies the coordinated product focal point, while all geometry, evidence chips, calls to action, and responsive behavior remain semantic HTML and Tailwind CSS.

**Tech Stack:** Next.js 16, React 19 Server Components, Tailwind CSS, next/image, lucide-react, Node test runner, Playwright CLI, built-in image generation.

## Global Constraints

- Modify only the Hengdi customer site's homepage hero and its supporting asset/tests/docs.
- Preserve English-only visible copy, current routes, Supabase integration, and verified company facts.
- Do not modify shared huanqiu-admin code or any tenant data.
- Use only `6300A`, `IP66`, and `15 Days` as hero evidence values.
- Keep the page's single `h1`, visible keyboard focus, WCAG AA contrast, and reduced-motion compatibility.
- The mobile hero must not rely on delayed intersection animations or fragile absolute evidence-chip placement.

---

### Task 1: Lock the Hero Content and Structure Contract

**Files:**
- Modify: `tests/catalog-pages.test.mjs`
- Test: `tests/catalog-pages.test.mjs`

**Interfaces:**
- Consumes: source text from `components/hero.tsx`.
- Produces: regression assertions for the product hero asset, verified evidence values, capability strip, and removal of the dashboard implementation.

- [ ] **Step 1: Write the failing hero regression test**

Add a test that reads `components/hero.tsx` and asserts:

```js
test('homepage hero is product-led and uses only verified evidence', () => {
  const hero = read('components/hero.tsx')
  assert.match(hero, /\/catalog\/hero\/hengdi-product-hero\.webp/)
  assert.match(hero, /6300A/)
  assert.match(hero, /IP66/)
  assert.match(hero, /15 Days/)
  assert.match(hero, /Project-Based Quotation/)
  assert.doesNotMatch(hero, /Live Capacity|300t|2000m|animate-trail|animate-float-slow/)
})
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run: `pnpm test`

Expected: FAIL because the hero still contains `Live Capacity`, production-capacity values, animated trails, and no product hero asset.

- [ ] **Step 3: Preserve existing public-page assertions**

Do not weaken the six-product, company-contact, or catalog-image tests.

### Task 2: Generate and Prepare the Product Hero Asset

**Files:**
- Create: `scripts/generated/hengdi-product-hero-source.png`
- Create: `public/catalog/hero/hengdi-product-hero.webp`

**Interfaces:**
- Consumes: approved product references for cable tray, busbar trunking, and XL switchgear.
- Produces: a wide background-matched bitmap at `/catalog/hero/hengdi-product-hero.webp`.

- [ ] **Step 1: Generate one coordinated product composition**

Use the built-in image generation tool with this production specification:

```text
Use case: product-mockup.
Asset type: transparent-look homepage hero product composition for Hengdi Electric.
Subject: blue ladder cable tray in the foreground entering from lower left; silver enclosed busbar trunking in the midground extending toward upper right; two beige low-voltage switchgear cabinets standing in the background.
Style: premium photorealistic industrial catalog render using the approved product references.
Lighting: soft neutral studio light from upper left with restrained contact shadows.
Composition: wide landscape, all products fully visible, concentrated in the center-right, generous clean padding.
Background: perfectly flat pale cool gray #F3F6F8 so it can blend into the webpage.
Constraints: no text, logos, dimensions, people, factory, technical diagram, decorative props, unsupported product features, or watermark.
```

Save the generated source as `scripts/generated/hengdi-product-hero-source.png`.

- [ ] **Step 2: Create the optimized WebP**

Use the bundled Python/Pillow runtime to fit the source into a 1600x1100 canvas with background `#F3F6F8`, preserving aspect ratio and product edges, then save `public/catalog/hero/hengdi-product-hero.webp` at WebP quality 90.

- [ ] **Step 3: Inspect the source and optimized output**

Verify no clipping, text, invented brand marks, strong background seam, or inconsistent product lighting. Reject and regenerate if any are present.

### Task 3: Rebuild the Hero Component

**Files:**
- Modify: `components/hero.tsx`
- Test: `tests/catalog-pages.test.mjs`

**Interfaces:**
- Consumes: `company.fullName`, `/catalog/hero/hengdi-product-hero.webp`, `/products`, and `/contact`.
- Produces: the complete responsive homepage hero as `export function Hero()`.

- [ ] **Step 1: Remove client-only and dashboard code**

Delete `'use client'`, the `trails` array, continuous trail markup, `Live Capacity`, `300t`, `2000m`, and `animate-float-slow`.

- [ ] **Step 2: Implement the desktop product-led composition**

Build a `lg:grid-cols-12` layout with:

- left content occupying 6 columns;
- right product stage occupying 6 columns;
- a deep navy geometric plane behind the product image;
- three compact evidence cards for `6300A`, `IP66`, and `15 Days`;
- a hero content height of `lg:min-h-[760px] lg:max-h-[820px]` rather than viewport height.

Render the image with:

```tsx
<Image
  src="/catalog/hero/hengdi-product-hero.webp"
  alt="Hengdi cable tray, busbar trunking and low-voltage switchgear"
  fill
  priority
  sizes="(min-width: 1024px) 50vw, 100vw"
  className="object-contain"
/>
```

- [ ] **Step 3: Implement mobile flow and capability strip**

Keep evidence chips in a responsive three-column/stacked grid below the image on small screens. Add the full-width dark strip with:

- `1-Year Warranty`
- `CCC & ISO 9001`
- `OEM / ODM Welcome`
- `Project-Based Quotation`

Use explicit white foreground and `white/70` secondary text on the navy background.

- [ ] **Step 4: Run the regression suite**

Run: `pnpm test`

Expected: all tests pass.

- [ ] **Step 5: Review React and accessibility quality**

Confirm no client hook is required, no inline component is declared inside `Hero`, the hero image has responsive `sizes` and `priority`, both links have visible focus styles, and decorative geometry has `aria-hidden` plus `pointer-events-none`.

### Task 4: Browser Verification and Production Delivery

**Files:**
- No additional source files expected.

**Interfaces:**
- Consumes: completed hero implementation.
- Produces: verified customer-site `main` deployment.

- [ ] **Step 1: Run complete static verification**

Run:

```powershell
pnpm test
pnpm typecheck
pnpm lint
pnpm build
git diff --check
```

Expected: all commands exit 0 and the build includes the homepage route.

- [ ] **Step 2: Verify local rendering at four viewports**

Using Playwright CLI, inspect `1440x900`, `1024x768`, `390x844`, and `360x800`. At every viewport assert:

- exactly one `h1`;
- hero product image has non-zero natural dimensions;
- no horizontal overflow;
- evidence chips and capability strip are visible;
- product stage does not clip the cable tray or cabinets;
- both calls to action are keyboard reachable.

- [ ] **Step 3: Commit exact files and push customer main**

Stage only the plan, tests, hero component, generated source, and optimized hero asset. Commit with `feat: redesign homepage product hero`, then push `HEAD:main` using the existing company GitHub token flow.

- [ ] **Step 4: Wait for Vercel Production**

Query the linked Vercel project until the deployment commit matches local/GitHub `main` and `readyState` is `READY`.

- [ ] **Step 5: Repeat production browser verification**

Open `https://hengdi-electric.vercel.app/` at desktop and mobile widths. Confirm the product hero image loads from the deployed site, there are no console errors, no broken images, no overflow, and the visual hierarchy matches the approved design.
