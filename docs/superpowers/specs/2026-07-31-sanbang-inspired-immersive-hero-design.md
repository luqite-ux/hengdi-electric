# Sanbang-Inspired Immersive Hero Design

## Objective

Replace the current split-layout Hengdi homepage hero with an immersive, full-width industrial product scene inspired by the structural strengths of the Sanbang Cable homepage. Borrow its hierarchy and pacing, not its branding, claims, customers, factory imagery, or product content.

## Reference Principles

The reference homepage succeeds because its hero behaves as one scene rather than separate text and dashboard panels:

- atmospheric full-width industrial imagery;
- small certification and experience proof points above the headline;
- a concise headline with strong foreground/background contrast;
- trust content integrated into the lower portion of the hero;
- a featured product visual that overlaps the scene;
- the following business-proof section visually connected to the hero.

Hengdi will adopt those compositional principles while using only Hengdi materials and verified facts.

## Scope

- Replace `components/hero.tsx` and its supporting hero bitmap.
- Adjust the homepage transition immediately after the Hero only when required for the overlapping product-series preview.
- Preserve navigation, routes, English copy, product data, Supabase integration, SEO structure, and all later homepage sections.
- Do not modify shared admin code, tenant records, or other customer websites.

## Desktop Composition

### Immersive Background

- Use a full-width deep navy and steel-blue hero instead of a pale two-column card layout.
- Create one wide industrial product composition containing cable tray, busbar trunking, and low-voltage switchgear.
- Product imagery occupies the right 58-65% and extends visually toward the center rather than sitting inside a white rectangular card.
- A dark left-to-right overlay protects headline contrast while allowing the products to remain clearly visible.
- Subtle technical grid lines, thin cyan arcs, and a restrained spotlight may add depth. They must remain decorative, low-opacity, and pointer-events-none.

### Content Hierarchy

- Top proof row:
  - `CCC Certified`
  - `ISO 9001 Quality System`
  - `OEM / ODM Available`
- Main headline remains `Power Distribution, Engineered to Last.`
- Supporting paragraph is limited to two or three desktop lines and names the verified company and three principal product families.
- Primary action: `Explore Products`.
- Secondary action: `Request a Quote`.
- Add a compact `Six Product Series` link beneath or beside the actions; it must route to `/products` and must not behave like a separate third primary button.

### Featured Product Card

- Place one compact translucent/dark product card in the lower-right portion of the hero, inspired by the reference site's featured-product treatment.
- Default featured item: `Cable Tray Series`.
- Card contains the processed cable-tray image, product name, short factual descriptor, and `View series` link.
- The card is a real link to `/products/cable-tray-series`.
- It must not contain invented model numbers, ratings, availability, prices, or sales claims.

### Integrated Trust Rail

- Replace the current four equal capability blocks with one visually continuous rail inside the bottom of the hero.
- Verified items:
  - `6 Core Product Series`
  - `1-Year Warranty`
  - `Approx. 15-Day Lead Time`
  - `Project-Based Quotation`
- Use compact separators and a single dark translucent surface so the rail reads as part of the scene rather than a dashboard.

## Transition to the Product Section

- Add a small three-item product-series preview overlapping the bottom edge of the Hero by 40-60px on desktop.
- Preview items:
  - `Cable Tray Systems`
  - `Busbar Trunking`
  - `Switchgear & Distribution`
- Each item uses an existing processed Hengdi product image and links to `/products` or the matching series route.
- The preview does not replace the existing six-card product section; it acts as a visual bridge and may be omitted on narrow mobile widths when it would create crowding.

## Mobile Composition

- Use a dark full-width background with the same product visual, repositioned below the headline.
- Order:
  1. proof chips;
  2. headline;
  3. concise company description;
  4. two actions plus understated six-series link;
  5. product composition;
  6. featured Cable Tray card;
  7. horizontally scrollable or two-column trust rail.
- Do not place the three-item overlapping preview inside the mobile Hero; start the regular product section cleanly after it.
- No delayed intersection animation may leave the product visual or card invisible.
- At 390x844, at least the top portion of the product visual must appear before the initial viewport ends.

## Product Asset Direction

- Generate a new wide hero composition derived from the approved cable tray, busbar, and XL switchgear references.
- Use case: photorealistic industrial product montage suitable for a dark blue background.
- Products must remain recognizable and separate:
  - blue ladder cable tray in the foreground;
  - silver enclosed busbar in the middle distance;
  - two low-voltage switchgear cabinets behind them.
- Use directional cool lighting with subtle cyan rim light and realistic neutral metal surfaces.
- Background should be a deep navy industrial studio scene, not a factory, warehouse, city, or landscape.
- No text, logos, people, dimensions, floating parts, invented product features, or watermark.

## Visual System

- Base background: `#04152f` to `#082a50`.
- Main text: white.
- Supporting text: no lower than white/75.
- Accent: cyan/teal consistent with the current primary brand color.
- Cards and rails: navy/70 to navy/85 with visible cyan or white/15 borders.
- Buttons retain existing brand cyan for the primary action and a white/15 outline for the secondary action.
- Avoid large white cards, dashboard metrics, oversized floating number chips, heavy glass blur, and repetitive glowing lines.

## Motion

- Background product composition may use one slow initial scale from 1.02 to 1.0.
- Featured product card may reveal with a short upward transition.
- Trust values may fade in together.
- Do not use continuous floating, looping light trails, auto-rotating carousels, or parallax that affects readability.
- Respect reduced-motion preferences.

## Content and Data Integrity

- Do not reuse Sanbang's `20+ years`, `50+ countries`, `100+ clients`, partner brands, product counts, production lines, UL certification, response-time promises, or factory claims.
- Do not present Hengdi's planning rendering as a real operating factory photograph.
- Use only claims already verified in Hengdi source materials and existing approved site data.

## Accessibility and Performance

- Keep exactly one page `h1`.
- Use explicit white and white/75 foregrounds on the dark Hero.
- Ensure buttons, chips, card borders, and focus states meet at least 3:1 non-text contrast.
- Ensure regular text meets WCAG AA 4.5:1.
- Use `next/image`, responsive `sizes`, and eager loading only for the primary above-the-fold hero image.
- Product preview images below the primary scene remain lazily loaded.
- Decorative overlays use `aria-hidden` and `pointer-events-none`.

## Acceptance Criteria

- The Hero reads as one immersive industrial scene, not a text column beside a white product card.
- The visual structure clearly reflects the reference site's hierarchy without copying its content or identity.
- No unverified customer, factory, export, production, certification, or capacity claim appears.
- The product composition remains clear at 1440x900 and 1024x768.
- At 390x844 and 360x800, the first viewport includes headline, actions, and the beginning of the product visual.
- There is no horizontal overflow, clipped product content, invisible delayed content, broken imagery, or illegible text.
- Automated tests, typecheck, lint, and production build pass.
- Desktop and mobile local screenshots are visually reviewed before deployment, then repeated on Production.
