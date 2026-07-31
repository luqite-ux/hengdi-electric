# Product Card Visual Redesign

## Objective

Replace the inconsistent catalog-crop collage with a restrained industrial product presentation while preserving the six catalog-verified product series and all existing backend routes.

## Visual Direction

- Present one dominant product subject per series; never tile unrelated crops inside a card.
- Use a consistent 4:3 image stage with a subtle cool-gray background and controlled subject scale.
- Remove decorative series numbering. Product name is the first textual element.
- Keep card heights, image stages, title area, description length, and action alignment consistent.
- Use blue only for the small category marker, action, focus, and hover state.
- Use a calm border and a restrained shadow; avoid oversized radii and strong floating-card effects.

## Product Imagery

- Cable Tray: one representative ladder tray composition from catalog page 25.
- Busbar Trunking: one representative busbar assembly from catalog page 46.
- XL, JXF, SDY, and PZ30: retain catalog-authentic products, crop tightly, and normalize their scale on the common stage.
- Remove page furniture, captions, dimensions, tables, and unrelated adjacent products.
- AI generation is allowed only when a usable catalog subject cannot be isolated. Any generated image must follow the actual parameter drawing and must not invent unsupported branding or features.

## Page Layout

- Desktop: three columns with compact vertical cards.
- Tablet: two columns.
- Mobile: one column.
- The full card remains a link with a visible keyboard focus state.
- Images use meaningful alt text from product data.
- Homepage product cards use the same normalized assets and visual stage.

## Acceptance Criteria

- Exactly six active product cards remain.
- No product card contains a multi-tile collage.
- All image stages share the same ratio and subject scale feels visually consistent.
- Cards align by image, heading, description, and action across each row.
- Desktop and mobile have no broken images or horizontal overflow.
- Production build, typecheck, lint, and automated tests pass.
- Browser screenshots are reviewed at desktop and mobile widths before deployment.
