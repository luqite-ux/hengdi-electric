# Sanbang-Inspired Immersive Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current pale split Hero with a full-width dark industrial product scene, featured Cable Tray card, integrated trust rail, and desktop product-series bridge inspired by the reference site's hierarchy.

**Architecture:** `components/hero.tsx` remains the Hero boundary and owns the immersive scene, proof chips, actions, featured product card, and trust rail. A new dark-background generated bitmap under `public/catalog/hero/` provides the primary scene; a small `components/hero-product-bridge.tsx` keeps the desktop overlap transition focused and reusable from `app/page.tsx`.

**Tech Stack:** Next.js 16, React 19 Server Components, Tailwind CSS, next/image, lucide-react, Node test runner, Playwright CLI, built-in image generation.

## Global Constraints

- Use only Hengdi assets, routes, and verified facts.
- Do not reuse the reference site's customers, partner brands, history, export reach, product counts, production lines, UL certification, factory claims, or response-time promises.
- Preserve English-only visible copy, Supabase integration, SEO structure, and all later homepage sections.
- Do not modify shared huanqiu-admin code, tenant data, or other customer sites.
- Keep one page `h1`, WCAG AA text contrast, visible keyboard focus, and reduced-motion compatibility.
- At 390x844 and 360x800, the first viewport must include the headline, actions, and beginning of the product visual.

---

### Task 1: Lock the Immersive Hero Contract

**Files:**
- Modify: `tests/catalog-pages.test.mjs`
- Test: `tests/catalog-pages.test.mjs`

**Interfaces:**
- Consumes: `components/hero.tsx`, `components/hero-product-bridge.tsx`, and `app/page.tsx` source.
- Produces: regression assertions for the new dark hero asset, proof chips, featured series card, trust rail, desktop bridge, and removal of the current metric-card structure.

- [ ] **Step 1: Replace the existing hero assertion with the new contract**

```js
test('homepage hero uses the immersive Hengdi product scene and verified trust content', () => {
  const hero = read('components/hero.tsx')
  const bridge = read('components/hero-product-bridge.tsx')
  assert.match(hero, /hengdi-immersive-hero\.webp/)
  assert.match(hero, /CCC Certified/)
  assert.match(hero, /ISO 9001 Quality System/)
  assert.match(hero, /OEM \/ ODM Available/)
  assert.match(hero, /Cable Tray Series/)
  assert.match(hero, /\/products\/cable-tray-series/)
  assert.match(hero, /6 Core Product Series/)
  assert.match(hero, /Approx\. 15-Day Lead Time/)
  assert.match(hero, /Project-Based Quotation/)
  assert.match(bridge, /Cable Tray Systems/)
  assert.match(bridge, /Busbar Trunking/)
  assert.match(bridge, /Switchgear &amp; Distribution/)
  assert.doesNotMatch(hero, /6300A|IP66|Live Capacity|300t|2000m/)
})
```

- [ ] **Step 2: Run the suite and verify failure**

Run: `pnpm test`

Expected: FAIL because the new asset, featured card, bridge, and proof/trust text do not exist and the old evidence chips remain.

### Task 2: Generate the Dark Industrial Product Scene

**Files:**
- Create: `scripts/generated/hengdi-immersive-hero-source.png`
- Create: `public/catalog/hero/hengdi-immersive-hero.webp`

**Interfaces:**
- Consumes: approved cable tray, busbar trunking, and XL switchgear product references.
- Produces: `/catalog/hero/hengdi-immersive-hero.webp`, a dark wide scene with products concentrated on the right.

- [ ] **Step 1: Generate the source image with the built-in image tool**

Use this prompt:

```text
Use case: product-mockup. Asset type: full-width homepage hero background for Hengdi Electric.
Create a wide deep-navy industrial studio scene using the supplied Hengdi cable tray, enclosed busbar trunking, and two XL low-voltage switchgear references. Place the blue ladder cable tray in the foreground leading from center-left toward the right, the silver enclosed busbar in the middle distance, and the two switchgear cabinets upright on the far right. Keep the left 38% dark, quiet, and low-detail for white website copy. Use realistic neutral metals, directional cool lighting, subtle cyan rim light, restrained floor reflections, and a navy-to-steel-blue atmospheric background. Products remain separate, fully visible, and recognizable. No text, logos, dimensions, people, factory, warehouse, landscape, floating parts, extra products, invented features, or watermark.
```

Save the source as `scripts/generated/hengdi-immersive-hero-source.png`.

- [ ] **Step 2: Optimize the final WebP**

Use bundled Pillow to resize within 1920x1080, apply restrained sharpening, and save `public/catalog/hero/hengdi-immersive-hero.webp` at quality 90.

- [ ] **Step 3: Inspect both assets**

Reject and regenerate if products cross into the left copy-safe zone, contain false text/marks, clip at the edges, merge together, or lose their catalog-recognizable construction.

### Task 3: Implement the Immersive Hero and Product Bridge

**Files:**
- Modify: `components/hero.tsx`
- Create: `components/hero-product-bridge.tsx`
- Modify: `app/page.tsx`
- Test: `tests/catalog-pages.test.mjs`

**Interfaces:**
- Consumes: `company.fullName`, `products`, the new immersive hero asset, and existing processed product-card assets.
- Produces: `Hero()` and `HeroProductBridge()` server components.

- [ ] **Step 1: Rebuild the Hero scene**

Use a deep navy section with the generated image as an absolute right-weighted `next/image`, a dark left-to-right overlay, and low-opacity decorative grid/arcs. Keep proof chips, headline, paragraph, actions, and `Six Product Series` link in a relative foreground container.

- [ ] **Step 2: Add the featured Cable Tray card**

Create one linked card to `/products/cable-tray-series` containing `/catalog/product-cards/cable-tray-series.webp`, `Cable Tray Series`, `Cable management for power and control routing`, and `View series`.

- [ ] **Step 3: Add the integrated trust rail**

Render one continuous dark translucent surface with `6 Core Product Series`, `1-Year Warranty`, `Approx. 15-Day Lead Time`, and `Project-Based Quotation`, separated by borders rather than individual dashboard cards.

- [ ] **Step 4: Create the desktop bridge**

`HeroProductBridge()` renders three linked image items for Cable Tray Systems, Busbar Trunking, and Switchgear & Distribution. Apply `hidden lg:grid`, a negative top margin of 40-60px, and lazy images. Insert it immediately after `<Hero />` in `app/page.tsx` and reduce the following Stats section's top conflict if required.

- [ ] **Step 5: Run tests**

Run: `pnpm test`

Expected: all tests pass.

- [ ] **Step 6: Perform React/accessibility review**

Confirm both components remain server components, static arrays are module-scoped, the primary image has `priority` and responsive `sizes`, bridge images remain lazy, links have visible focus styles, dark text colors are explicit, and decorative layers are hidden from assistive technology.

### Task 4: Verify and Deliver Production

**Files:**
- No additional source files expected.

**Interfaces:**
- Consumes: the completed implementation.
- Produces: a verified customer-site `main` deployment.

- [ ] **Step 1: Run full static verification**

Run `pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build`, and `git diff --check`. Every command must exit 0.

- [ ] **Step 2: Verify local rendering**

At 1440x900, 1024x768, 390x844, and 360x800 verify one `h1`, loaded hero image, visible proof chips/actions/trust rail, desktop-only bridge behavior, no broken images, and no horizontal overflow. Review screenshots visually.

- [ ] **Step 3: Commit exact files and push main**

Stage only the plan, test, Hero, bridge, homepage, generated source, and optimized asset. Commit `feat: build immersive industrial homepage hero`, then push `HEAD:main` using the existing company token flow.

- [ ] **Step 4: Wait for Vercel and verify Production**

Wait until the Vercel deployment for the pushed SHA is `READY`. Repeat desktop/mobile browser checks against `https://hengdi-electric.vercel.app/`, verify the asset returns HTTP 200, and confirm local, GitHub main, and deployment SHAs match.
