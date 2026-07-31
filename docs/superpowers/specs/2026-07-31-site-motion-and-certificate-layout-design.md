# Site Motion and Certificate Layout Design

## Goal

Add restrained, professional motion across the Hengdi site and correct the two sideways business-license previews without altering the original legal-document image files.

## Motion Direction

- Hero content enters in a short staggered sequence; the industrial scene uses a very slow scale-and-drift loop.
- The background grid drifts subtly and the featured Hero card floats gently.
- Product bridge cards enter sequentially.
- Shared page headers animate breadcrumb, eyebrow, title and description on load.
- Existing scroll Reveal animation remains the standard for content sections.
- Product and certificate cards gain a restrained hover lift, image scale and one-pass light sweep.
- Homepage production figures count from zero when they enter the viewport.
- Navigation links use a smooth underline/foreground response.
- All continuous and entrance motion is disabled by `prefers-reduced-motion: reduce`.

## Certificate Correction

- Preserve the original business-license PNG files byte-for-byte.
- Mark the two affected records with `orientation: 'clockwise'`.
- Render business qualifications as two wide landscape cards rather than portrait cards.
- Rotate only the displayed image layer by 90 degrees clockwise and scale it to fill the landscape preview.
- Apply the same corrected orientation inside the full-screen preview.
- Other certificate groups retain the three-column portrait-card template.

## Verification

- Source contracts cover motion classes, count-up component, reduced-motion rules and certificate orientation metadata.
- Run tests, TypeScript, ESLint, production build and diff checks.
- Verify homepage, products and certifications at desktop and mobile sizes in a real browser.

