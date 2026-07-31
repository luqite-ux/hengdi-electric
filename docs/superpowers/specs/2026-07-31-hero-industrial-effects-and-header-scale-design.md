# Hero Industrial Effects and Header Scale Design

## Goal

Make the right-side industrial product scene feel active and engineered while increasing the desktop navigation presence by one clear size step.

## Hero Effects

- Keep the existing 14-second scene drift.
- Add a cyan scanning beam that crosses only the right 64% of the Hero every 9 seconds.
- Add three restrained energy markers positioned over the busbar, switchgear and cable-tray areas. Each marker uses a small core and expanding ring with staggered timing.
- Add a low, elliptical floor glow beneath the foreground cable tray with a slow breathing cycle.
- All effect layers are decorative, pointer-events disabled, and sit below text and controls.
- Effects are hidden on mobile to preserve clarity and performance.
- `prefers-reduced-motion: reduce` disables scanning, marker pulses and floor breathing.

## Desktop Header Scale

- Header height: 76px to 84px at `md` and above.
- Logo container: 44px to 48px at `md` and above.
- Brand name, navigation links and quote button: 15px to 16px at `md` and above.
- Navigation spacing increases one step on large screens.
- Mobile header, logo, typography and menu button remain unchanged.

## Verification

- Source regression tests cover each effect layer, reduced-motion handling and exact responsive header sizes.
- Run tests, typecheck, lint, build and diff checks.
- Verify desktop and mobile homepage in a real browser and confirm no text overlap or horizontal overflow.
