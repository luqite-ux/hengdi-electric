# Wide-Screen Layout Expansion

## Goal

Remove the "everything squeezed into the middle" feel on 1920px screens by widening the global content container from 1280px to 1536px, so header, hero, product grids and footer use more of the viewport while text readability stays intact.

## Approved Direction

- Globally widen the shared `max-w-7xl` container class to 96rem (1536px) in `app/globals.css`.
- Applies to all pages and components using the shared container (header, hero, product list/detail, about, contact, certifications, news, footer).
- Long-form paragraphs keep their own `max-w-*` text limits; only outer containers widen.
- Mobile and tablet layouts unchanged (padding classes stay as-is).
- No new top info bar; no change to navigation typography or height.

## Verification

- Regression test asserts the 96rem override exists in globals.css.
- Full test suite, typecheck, lint, build, diff check.
- Browser screenshots at 1920x1080 desktop and 390x844 mobile for home and products pages; confirm wider grid and no overflow.
