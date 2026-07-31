# Hengdi Electric Catalog-Driven Frontend Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace invented Hengdi website imagery and three generic product records with a verified, English, catalog-driven product experience built from the supplied 76-page company catalog.

**Architecture:** A deterministic catalog-asset pipeline produces cropped local assets and a reviewed manifest. Typed static series data supplies safe fallback content and the tenant seed script writes the same hierarchy to Supabase; production images are uploaded to R2. Existing async server pages, ISR, admin proxy, inquiries, and SEO helpers remain in place while public components consume the expanded product model.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Supabase/Postgres, Cloudflare R2, Node test runner, Python/Pillow for deterministic image processing.

## Global Constraints

- The website remains English-only.
- The source pages `企业资料_01.png` through `企业资料_76.png` are read-only.
- Remove repeated catalog headers, footers, page numbers, decorative bars, and excess whitespace from all derived website assets.
- Do not generatively redraw products, diagrams, certificates, factory imagery, or text.
- Do not use the existing generated factory or product images on public pages.
- Preserve the existing Supabase, R2, `/admin`, inquiry, ISR, SEO, and Vercel architecture.
- Use exact-path staging only; never run `git add .` or `git add -A`.

---

### Task 1: Isolated workspace and verified catalog manifest

**Files:**
- Create: `scripts/catalog-assets.json`
- Create: `scripts/process-catalog-assets.py`
- Create: `tests/catalog-source.test.mjs`

**Interfaces:**
- Consumes: the 76 source PNG files supplied by the customer.
- Produces: a manifest with `id`, `sourcePage`, `kind`, `output`, `crop`, and `alt` for each derived asset, plus `public/catalog/**` outputs.

- [ ] Write a failing Node test asserting that every manifest entry has a unique output path, a source page between 1 and 76, a non-empty English alt string, and a crop rectangle with positive dimensions.
- [ ] Run `node --test tests/catalog-source.test.mjs` and confirm failure because the manifest does not exist.
- [ ] Inspect all source pages at full resolution and define crop rectangles only for verified company, product, technical-diagram, and certificate content.
- [ ] Implement the Pillow script to crop without altering source files, normalize orientation, apply mild contrast/sharpness only, and export WebP/PNG based on content type.
- [ ] Run the processing script and verify every expected asset is decodable and does not intersect the catalog header/footer exclusion zones defined in the manifest.
- [ ] Run the catalog test and confirm it passes.
- [ ] Commit the manifest, script, test, and exact generated assets.

### Task 2: Verified product hierarchy and contact data

**Files:**
- Modify: `lib/site.ts`
- Modify: `lib/products-db.ts`
- Create: `tests/catalog-products.test.mjs`

**Interfaces:**
- Consumes: product names, series, specifications, applications, and processed asset paths from Task 1.
- Produces: `Product` records for 16 product groups with unique slugs, `category`, `subcategory`, `gallery`, and source-reference metadata.

- [ ] Write failing tests asserting exactly three top-level categories, all 16 approved product groups, unique slugs, catalog-backed images, the second phone number, and postcode.
- [ ] Run the product test and confirm it fails against the existing three-record dataset.
- [ ] Extend the `Product` type with the minimal category/gallery/source fields required by listing, detail, seed, SEO, and admin mapping.
- [ ] Replace the three fallback production entries with the 16 verified series records while retaining concise category summaries separately for fallback navigation.
- [ ] Update the Supabase row mapper to preserve category, gallery, source metadata, and optional technical tables from `extra_data`.
- [ ] Run the product tests and all existing tests.
- [ ] Commit the typed catalog data and tests.

### Task 3: Product and company public pages

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/hero.tsx`
- Modify: `app/products/page.tsx`
- Modify: `app/products/[slug]/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `lib/navigation.ts`
- Create: `tests/catalog-pages.test.mjs`

**Interfaces:**
- Consumes: expanded `Product` records and processed catalog assets.
- Produces: factual Home, Products, product-detail, About, Contact, header, and footer output.

- [ ] Write failing source-level regression tests rejecting the old generated asset paths and requiring the second phone number, catalog hierarchy labels, gallery rendering, and factory-render disclosure.
- [ ] Run the page tests and confirm expected failures.
- [ ] Replace the Home hero/supporting imagery with processed catalog assets and verified statements.
- [ ] Rebuild Products as grouped category sections with independent cards for every series.
- [ ] Update product detail pages to render catalog galleries, semantic specification tables, source-supported applications, and related products from the same category.
- [ ] Rewrite About to distinguish the supplied factory planning/render image from real photography.
- [ ] Add the second telephone number and postcode to Contact and Footer.
- [ ] Run page tests, existing tests, typecheck, and lint.
- [ ] Commit the public-page changes.

### Task 4: Certifications experience

**Files:**
- Create: `lib/certifications.ts`
- Create: `app/certifications/page.tsx`
- Create: `components/certificate-gallery.tsx`
- Modify: `lib/navigation.ts`
- Modify: `app/sitemap.ts`
- Create: `tests/certifications.test.mjs`

**Interfaces:**
- Consumes: processed certificate assets and verified catalog document groupings.
- Produces: typed certificate entries, accessible thumbnails/previews, route metadata, and Sitemap coverage.

- [ ] Write failing tests requiring certificate groups, unique assets, accurate scope notes, route metadata, and Sitemap inclusion.
- [ ] Run the certificate tests and confirm failure because the module/page do not exist.
- [ ] Implement typed certificate data without claiming that every document applies to every product.
- [ ] Implement an accessible gallery with keyboard-operable previews, focus return, Escape close, and broken-image fallback text.
- [ ] Add the route to navigation and Sitemap with unique metadata and canonical.
- [ ] Run certificate tests, existing tests, typecheck, and lint.
- [ ] Commit the Certifications page and data.

### Task 5: Supabase hierarchy seed and R2 migration

**Files:**
- Create: `D:/Cursor/Grand/huanqiu-admin/scripts/seed-hengdi-electric-catalog.mjs`
- Modify only if required: `D:/Cursor/Grand/huanqiu-admin/scripts/upload-local-product-images-to-r2.mjs`

**Interfaces:**
- Consumes: the verified typed catalog and `public/catalog/**` assets.
- Produces: three parent categories, child category rows, 16 active products, `extra_data` mappings, and absolute R2 image URLs for tenant `3be44d64-97ed-4190-af7c-d63ca0c2353d`.

- [ ] Implement a dry-run mode that prints deterministic category/product counts without writing.
- [ ] Run dry-run and require 3 parent categories, the approved child hierarchy, and 16 products.
- [ ] Implement idempotent upserts keyed by tenant/domain/category slug/product slug; do not delete unrelated tenant records until the new rows verify successfully.
- [ ] Run the seed against Supabase and query back exact category/product counts and slugs.
- [ ] Upload all production product and certification assets to R2 and update product image/gallery URLs to absolute HTTPS R2 URLs.
- [ ] Deactivate the three obsolete generic rows only after all replacement rows and images pass query-back validation.
- [ ] Verify shared admin category tree, product thumbnails, and unchanged-value product save.
- [ ] Commit the exact admin script changes separately from customer-site code.

### Task 6: SEO, Sitemap, and structured data expansion

**Files:**
- Modify: `lib/seo.ts`
- Modify: `app/sitemap.ts`
- Modify: `app/products/[slug]/page.tsx`
- Modify: `app/certifications/page.tsx`
- Modify: `tests/seo.test.mjs`

**Interfaces:**
- Consumes: 16 live product series, canonical site origin, R2 images, and certification route.
- Produces: unique metadata, canonical/OG/Twitter output, Product/Breadcrumb JSON-LD, and complete dynamic Sitemap entries.

- [ ] Add failing SEO assertions for all product slugs, absolute R2 images, Certifications canonical, and no inactive/generic product URLs.
- [ ] Run SEO tests and confirm expected failures.
- [ ] Update metadata and structured-data builders only as needed for gallery/category-aware product records.
- [ ] Update Sitemap data flow to include live series timestamps and Certifications.
- [ ] Run SEO tests and all existing tests.
- [ ] Commit SEO changes.

### Task 7: Full verification, deployment, and delivery records

**Files:**
- Modify only if values changed: Feishu customer record A-L via the existing sync script.

**Interfaces:**
- Consumes: completed frontend, Supabase catalog, R2 assets, Vercel environment, and admin proxy.
- Produces: verified Production deployment and coherent internal delivery record.

- [ ] Run the complete local suite: `pnpm test`, `pnpm typecheck`, `pnpm lint`, and `pnpm build`.
- [ ] Inspect Git diff for unintended generated assets, secrets, CRLF noise, and files outside the approved scope.
- [ ] Commit exact remaining customer-site files and push the customer `main` branch.
- [ ] Wait for Vercel READY and verify the deployment commit SHA matches GitHub.
- [ ] Browser-check Home, Products, all 16 product details, Certifications, About, Contact, FAQ, mobile navigation, product galleries, tables, inquiry success, and `/admin` proxy save.
- [ ] Run automated accessibility/SEO checks and manually inspect desktop/mobile screenshots for every public route class.
- [ ] Request `robots.txt`, `sitemap.xml`, and every Sitemap URL; reject 4xx/5xx, wrong hosts, duplicates, placeholders, or inactive products.
- [ ] Query Supabase for exact category/product counts and absolute R2 URLs; verify the shared admin shows the same catalog.
- [ ] Update and read back the Feishu A-L row if any tracked URL, project, domain, admin, or database value changed.
- [ ] Confirm both relevant worktrees are clean and local/remote/deployment SHAs match.
