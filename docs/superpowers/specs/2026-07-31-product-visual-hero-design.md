# Product Visual Hero Redesign

## Objective

Redesign the Hengdi Electric homepage hero as a product-led industrial composition that feels substantial and visually layered without becoming busy. Replace the dashboard-like capacity card and repetitive light trails with a clear product focal point.

## Scope

- Modify only the homepage hero and its supporting product-visual asset.
- Preserve the existing English navigation, verified company claims, product routes, contact route, and backend integration.
- Do not change shared admin code or any tenant data.

## Composition

### Desktop

- Use a two-column layout inside a controlled hero height of approximately 760-820px below the header.
- Left column contains the certification eyebrow, headline, concise company description, and two actions.
- Right column contains one coordinated product composition featuring cable tray, busbar trunking, and switchgear in front-to-back depth.
- Place a dark navy geometric plane behind the products to create contrast and establish a strong right-side visual anchor.
- Add restrained engineering-line details and a soft cyan glow behind the product group. Decorative layers must remain pointer-events-none.
- Replace the large capacity dashboard with three compact evidence chips positioned around the product composition.
- Add a dark capability strip at the bottom of the hero for warranty, lead time, OEM/ODM, and certified production.

### Mobile

- Stack content in this order: eyebrow, headline, concise description, actions, product visual, evidence chips, capability strip.
- Keep all evidence chips in normal document flow; do not use fragile absolute positioning.
- Do not use delayed intersection animations that can leave blank regions during fast scrolling.

## Content

- Headline: retain the current verified positioning, `Power Distribution, Engineered to Last.`
- Description: reduce the current paragraph to the company name, three verified product families, applicable project types, and quotation-oriented statement.
- Evidence chips must use only documented facts:
  - `6300A` / `Busbar rated current`
  - `IP66` / `Available protection grade`
  - `15 Days` / `Approx. lead time`
- Capability strip:
  - `1-Year Warranty`
  - `CCC & ISO 9001`
  - `OEM / ODM Welcome`
  - `Project-Based Quotation`

## Product Visual Asset

- Produce one wide transparent or background-matched product composition using the approved coordinated product imagery.
- Foreground: blue ladder cable tray entering from the lower-left toward the center.
- Midground: silver busbar trunking extending toward the upper-right.
- Background: two verified-style low-voltage switchgear cabinets standing vertically.
- Use consistent studio lighting and material rendering.
- No text, logos, captions, technical dimensions, people, factory scenery, or unsupported product features inside the image.
- The image may be AI-composited from the approved product references because the source catalog does not contain a single unified hero photograph.

## Visual System

- Background: very light cool gray with a localized cyan glow, not a full-screen uniform grid.
- Primary geometry: deep navy panel with a subtle blue-to-cyan edge accent.
- Typography remains dark navy on the light area; text on the dark capability strip is explicitly white or white/75.
- Use blue/cyan only for emphasis, actions, borders, and small data markers.
- Avoid glass-dashboard styling, large empty regions, multiple competing gradients, and continuous animated light trails.

## Motion

- One subtle initial reveal for the product group is allowed.
- Evidence chips may use very small hover translation on pointer devices.
- Respect `prefers-reduced-motion` through existing global motion rules.
- Do not animate the product group continuously.

## Accessibility and Performance

- Hero heading remains the page's single `h1`.
- Product visual uses descriptive alt text when it communicates product content; decorative layers remain hidden.
- Links retain visible keyboard focus states.
- Foreground/background contrast must meet WCAG AA.
- Use `next/image`, responsive `sizes`, and eager loading for the above-the-fold product visual.

## Acceptance Criteria

- The right half of the desktop hero has a clear product focal point rather than a dashboard card.
- Hero height stays within the intended range and does not leave a large unused lower region.
- All factual claims are traceable to existing company materials.
- Desktop and mobile show no broken images, horizontal overflow, clipped text, or invisible content.
- The visual remains coherent at 1440x900, 1024x768, 390x844, and 360x800.
- Automated tests, typecheck, lint, and production build pass.
- Final local and production screenshots receive visual review before completion.
