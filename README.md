# Algo Media — Agency Site

Consumer-facing site for a social media growth agency operating 24 media
brands, 45.4M followers, and 128M+ monthly impressions. Dark editorial hero
with interactive 3D chrome cards, and the full portfolio in a draggable,
auto-rotating 3D carousel.

Live: https://mgrugan.github.io/agency/

## Run it

```sh
npm install
npm run dev      # local dev server
npm run build    # type-check + production bundle
```

Pushes to the default branch auto-deploy to GitHub Pages via
`.github/workflows/deploy.yml` (Pages source must be set to "GitHub Actions").

## Stack

- **Vite + React 18 + TypeScript** — no UI framework; all 3D is hand-rolled
  CSS transforms driven by pointer events and requestAnimationFrame.
- **Design tokens** live in [`DESIGN.md`](./DESIGN.md) and are mirrored in
  `src/styles/tokens.css`.
- **Fonts** self-hosted via Fontsource: Instrument Serif (display),
  Instrument Sans (body), IBM Plex Mono (labels). No Inter, Roboto, or Arial.

## Signature pieces

- **Chrome cards** (`ChromeCard.tsx`) — Instagram account cards with a
  conic-gradient metallic rim that rotates with the pointer, a glossy sheen
  sweep, and a radial pointer-tracked highlight.
- **Hero cluster** (`Hero.tsx`) — three cards fanned in 3D space; the whole
  cluster parallaxes with the mouse and each card lifts on hover.
- **3D carousel** (`Carousel3D.tsx`) — all 24 accounts on a ~1,000px-radius
  ring: slow idle drift, drag-to-spin with momentum that decays back to the
  drift, back arc hidden via backface culling. Auto-rotation disables under
  `prefers-reduced-motion`.
