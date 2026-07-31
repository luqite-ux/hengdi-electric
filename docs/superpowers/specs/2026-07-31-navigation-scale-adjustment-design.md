# Hengdi Navigation Scale Adjustment

## Goal

Increase the perceived scale and authority of the desktop navigation on wide screens without making the mobile header oversized or reducing page usability.

## Approved Direction

Use the recommended balanced scale increase:

- Increase desktop header height from 64px to 76px.
- Increase the desktop logo container from 36px to 44px.
- Increase the desktop brand name from 14px to 15px.
- Increase desktop navigation and quote-button text from 14px to 15px.
- Slightly increase desktop spacing so the larger elements do not feel crowded.
- Keep the mobile header height, logo size, menu control and mobile menu typography unchanged.

## Responsive Behavior

The larger scale applies at the `md` breakpoint and above. Below that breakpoint, the current compact dimensions remain in place. The existing transparent white navigation over the dark homepage Hero and the light scrolled/navigation state remain unchanged.

## Accessibility and Interaction

- Preserve current focus-visible states and link targets.
- Preserve the minimum 40px mobile menu-button target.
- Maintain readable foreground/background contrast in both transparent and scrolled states.
- Do not change navigation labels, routing or mobile-menu behavior.

## Verification

- Run the existing regression suite, TypeScript check, ESLint and production build.
- Visually verify the header at 1440px desktop and 390px mobile widths.
- Confirm the larger desktop header does not overlap page headings and that the mobile header remains unchanged.
