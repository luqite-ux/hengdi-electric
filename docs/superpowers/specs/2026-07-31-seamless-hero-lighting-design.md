# Seamless Hero Lighting Design

## Goal

Remove the visually divisive diagonal scan band from the desktop hero while preserving restrained industrial motion.

## Design

- Delete the narrow directional scan beam and its animation entirely.
- Add one broad, blurred radial ambient-light layer over the product side. Its gradient must fade to transparent without a visible edge.
- Keep three energy markers, but reduce ring brightness and spread so they read as product highlights rather than interface targets.
- Reduce the floor glow intensity and keep all decorative effects behind content with `pointer-events: none`.
- Keep the existing scene drift. Hide the ambient light, markers and floor glow on mobile and for reduced-motion users.

## Verification

- A source regression test rejects the former scan-beam class and scan keyframes.
- The test requires the seamless ambient-light layer, three markers, floor glow and reduced-motion handling.
- Verify desktop and mobile screenshots in a real browser with no hard lighting seam or horizontal overflow.
