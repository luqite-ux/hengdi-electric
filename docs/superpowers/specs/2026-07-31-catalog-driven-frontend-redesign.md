# Hengdi Electric Catalog-Driven Frontend Redesign

## Objective

Rebuild the English customer-facing website around the verified 76-page Hengdi Electric company catalog. Preserve the working Supabase, customer-admin, inquiry, SEO, and deployment architecture while replacing invented imagery and overly broad product summaries with verifiable catalog-derived content.

## Source of Truth

- Primary source: `D:/Cursor/Grand/建站客户资料/1361-镇江恒迪智能/企业资料/企业资料_01.png` through `企业资料_76.png`.
- The source pages contain a repeated catalog header, footer, page number, and decorative framing. Those elements must not appear in website product imagery.
- Existing English copy may be retained only where it can be traced to the catalog or the confirmed FAQ material.
- Product names, model codes, ratings, standards, certifications, contact details, and company claims must not exceed what the customer materials support.

## Chosen Approach

Use a catalog-driven product architecture with three top-level categories and independently addressable product-series pages. Process source pages deterministically by cropping and tonal cleanup; do not generatively redraw products, factories, certificates, diagrams, or technical tables.

The existing visual system remains the foundation, but product presentation changes from three generic showcase cards to a factual industrial catalog. Existing backend integration remains authoritative after the expanded catalog is seeded.

## Information Architecture

### Public navigation

- Home
- Products
- Certifications
- About
- FAQ
- Contact

News remains available only when published articles exist. It must not contain invented news content.

### Product hierarchy

1. Cable Tray Systems
   - Ladder-Type Cable Tray
   - Trough/Channel-Type Cable Tray
   - Perforated Cable Tray
   - Long-Span Cable Tray
   - Cable Shaft
   - Cable Tray Fittings and Accessories
2. Busbar Trunking Systems
   - HDCMC-T Copper Dense Busbar
   - HDCMC-L Aluminum Dense Busbar
   - HDKFW-2A High-Strength / Air-Insulated Busbar
   - HDNHMC Fire-Resistant Busbar
   - HDCMC-G High-Voltage Busbar
   - Busbar Fittings and Accessories
3. Switchgear and Distribution
   - XL Series Low-Voltage Switchgear
   - JXF Series Switchgear Cabinet
   - SDY Series Dual-Power Distribution Box
   - PZ20 / PZ30 Distribution Board

Series must be represented as separate product rows in Supabase. Top-level categories and applicable subcategories must use `product_categories.parent_id`, not only `extra_data`.

## Page Design

### Home

- Retain the established Hengdi blue identity and English-only interface.
- Replace the generated factory image with the catalog factory planning/render image and label it accurately as a factory overview/rendering.
- Replace generated product imagery with processed catalog-derived product assets.
- Present the three top-level product categories and representative real series.
- Retain only verified capacity and certification statements.
- Add a compact certifications section linking to the full Certifications page.

### Products index

- Display the three top-level categories with filters or anchored sections.
- Display each real product series as a card with its processed source image, model family, and short verified summary.
- Make all cards link to an independent `/products/[slug]` detail page.
- Avoid using parameter tables as card cover images.

### Product detail

- Show a clean catalog-derived hero image without the original catalog header/footer/page number.
- Include overview, applications, verified highlights, model codes, and technical specifications.
- Convert legible catalog tables to semantic HTML rather than embedding entire scanned pages.
- Use cropped technical diagrams where they materially help selection or installation.
- Add a source-aware disclaimer that final configurations are confirmed per project.
- Include Product and Breadcrumb JSON-LD derived from the actual product row.

### Certifications

- Group documents into business qualifications, management-system certificates, compulsory/product certifications, type-test reports, inspection reports, and credit/honor certificates.
- Use cropped certificate thumbnails that exclude the catalog header/footer but preserve the certificate itself.
- Open a larger accessible preview on selection.
- Describe only what is visible and verifiable. Do not imply every certificate applies to every product.

### About

- Use the company introduction from the catalog as the factual basis for English copy.
- Identify the supplied factory image as a planning/render image unless separate real-site photography exists.
- Remove any wording or imagery that suggests an automated factory, robotics, or production scale not evidenced by the source.
- Show the full verified address, both telephone numbers, email, and postcode.

## Image Processing Rules

- Preserve the original source files unchanged.
- Produce website assets under a dedicated `public/catalog/` hierarchy.
- Remove repeated page headers, company footers, page numbers, decorative bars, and excessive page whitespace.
- Crop to the core product, certificate, diagram, or factory-content rectangle.
- Where a page contains multiple distinct products, create separate crops with stable descriptive filenames.
- Apply only deterministic operations: crop, rotate, perspective correction when required, background normalization, mild contrast/sharpness correction, and export optimization.
- Do not use generative fill, object invention, brand replacement, or text reconstruction.
- Do not remove labels that are part of a technical diagram or certificate.
- Export photographic/rendered assets as WebP or optimized JPEG; export line drawings and text-heavy images as PNG or lossless WebP.
- Provide meaningful English alt text based on the visible subject.

## Data Model and Backend

- Expand the tenant from three generic product rows to the verified product-series rows listed above.
- Preserve the three generic static entries only as emergency fallback category summaries, not as production Supabase products.
- Store series-specific technical data in `specs`, verified selling points in `features`, and structured source metadata in `extra_data`.
- Upload every production product and certification asset to Cloudflare R2; database URLs must be absolute R2 URLs.
- Keep ISR at 60 seconds and dynamic product slugs enabled.
- Maintain admin editability and the existing customer `/admin` proxy/login flow.
- Ensure category hierarchy is visible and manageable in the shared admin.

## Contact Information

- Company: Zhenjiang Hengdi Intelligent Electric Co., Ltd.
- Address: No. 3-1, No. 1 Sanfeng Road, Sanmao Street, Yangzhong, Zhenjiang, Jiangsu, China.
- Telephone 1: +86 182 0528 3908.
- Telephone 2: +86 131 5167 2088.
- Email: 641320694@qq.com.
- Postcode: 212200.

## SEO

- Add unique server-generated metadata and canonical URLs for every real product-series page.
- Include every active series in the dynamic sitemap and exclude inactive/placeholder rows.
- Use public absolute R2 images for Open Graph and Product JSON-LD.
- Add a canonical Certifications page with Organization context.
- Keep robots exclusions for `/admin`, `/api`, login, and other private paths.

## Error Handling and Fallback

- If Supabase is unavailable, render the verified static category summaries without showing invented imagery.
- Missing product imagery uses a neutral branded fallback, never an unrelated stock or generated product.
- Missing series data must not produce an empty specification table.
- Failed certificate previews retain their document title and an accessible unavailable state.

## Testing and Verification

- Unit tests validate the expanded product hierarchy, source-asset mapping, contact data, unique product slugs, and metadata construction.
- Image-processing validation confirms each exported asset is non-empty, decodable, within expected dimensions, and materially excludes the repeated header/footer regions.
- Build, typecheck, lint, and all existing tests must pass.
- Browser verification covers Home, Products, every product detail, Certifications, About, Contact, mobile navigation, and inquiry submission.
- Visual review covers desktop and mobile layouts, all cropped product images, certificate previews, tables, contrast, focus states, and overflow.
- Backend verification confirms categories, product rows, absolute R2 URLs, admin visibility, and unchanged-value product save through the customer proxy.
- SEO verification confirms canonical, metadata, Open Graph, JSON-LD, robots, sitemap completeness, and successful responses for every sitemap URL.

## Acceptance Criteria

- No generated factory or product imagery remains on public pages.
- No processed catalog asset contains the repeated catalog header, footer, or page number.
- The public catalog contains the three categories and all sixteen specified series/product groups.
- Each series has its own working, indexed product URL backed by Supabase.
- Technical claims and images are traceable to customer materials.
- Certifications are presented with accurate scope and without overclaiming.
- Both telephone numbers and the postcode appear in the appropriate contact surfaces.
- Desktop and mobile views contain no broken images, unreadable text, horizontal overflow, or placeholder content.
- Supabase, R2, admin, inquiry, ISR, SEO, sitemap, deployment, and Feishu delivery records remain coherent after the catalog expansion.
