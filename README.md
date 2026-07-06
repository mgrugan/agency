# Algo Media — Growth Terminal

Premium dashboard for a social media marketing agency managing 24 accounts,
45.4M followers, and 128M+ monthly organic impressions. Bloomberg Terminal ×
Linear × Stripe: data-first, editorial typography, restrained growth-green
accent.

## Run it

```sh
npm install
npm run dev      # local dev server
npm run build    # type-check + production bundle
npm run preview  # serve the production bundle
```

## Stack

- **Vite + React 18 + TypeScript** — no UI framework, no chart library;
  every chart is hand-rolled SVG for full control of the draw-on animations.
- **Design tokens** live in [`DESIGN.md`](./DESIGN.md) (lints clean with
  `npx @google/design.md lint DESIGN.md`) and are mirrored in
  `src/styles/tokens.css`.
- **Fonts** are self-hosted via Fontsource: Fraunces (display), Geist Sans
  (body), Geist Mono (labels/analytics). No Inter, Roboto, or Arial anywhere.

## What's inside

| Section | Components |
| --- | --- |
| Overview | KPI stat tiles with odometer count-ups and sparklines, network impressions timeline (crosshair + tooltip, YoY comparison, 3M/6M/12M ranges), campaign pipeline, recent wins |
| Portfolio | 24 branded account cards with pointer-tracked 3D tilt, hover-revealed 12-month trend sparklines |
| Performance | Client performance table, revenue analytics columns, engagement heatmap (day × 2-hour slots), audience demographics |
| Operations | Content calendar week strip, team activity feed |

## Chart color discipline

The accent `#22C55E` measures 2.13:1 against the `#F5F8F4` surface — below
the 3:1 floor for chart marks — so data marks use the validated `#16A34A`
and the bright accent is reserved for UI states and 10%-opacity area washes.
The funnel's ordinal ramp (`#22C55E → #166534`) passes monotone-lightness and
light-end-contrast checks; comparison series use de-emphasized sage with a
legend and direct labels so identity never rides on color alone.
