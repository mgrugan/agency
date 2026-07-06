---
name: Algo Media
colors:
  primary: "#111513"
  secondary: "#627067"
  accent: "#22C55E"
  neutral: "#F5F8F4"
typography:
  h1:
    fontFamily: Fraunces
    fontSize: 3.5rem
  h2:
    fontFamily: Fraunces
    fontSize: 2.25rem
  body-md:
    fontFamily: Geist
    fontSize: 1rem
  label-caps:
    fontFamily: Geist Mono
    fontSize: 0.75rem
rounded:
  sm: 8px
  md: 14px
  lg: 24px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
---

# Algo Media — Design System

Premium social media growth agency managing 100M+ monthly organic impressions.
The interface reads as Bloomberg Terminal × Linear × Stripe: data-first,
editorial, restrained.

## Brand personality

- Elite social media growth partner — data-first, creative-second
- Premium and understated; confident without being loud
- Enterprise-quality analytics
- Every animation reinforces momentum and scale

## Color

| Token       | Value     | Role |
| ----------- | --------- | ---- |
| `primary`   | `#111513` | Deep charcoal-green. Headings, primary text, dark surfaces. |
| `secondary` | `#627067` | Muted sage-gray. Metadata, secondary labels, borders. |
| `accent`    | `#22C55E` | Growth green. Upward trends, hovers, active nav, CTAs, positive metrics, progress. |
| `neutral`   | `#F5F8F4` | Soft warm background. Never pure white. |

### Derived chart colors

`#22C55E` sits at 2.13:1 against the neutral surface — below the 3:1 floor for
chart marks — so **data marks use `#16A34A`** (3.0:1+, CVD-validated). The
brighter `#22C55E` is reserved for UI accents, fills at ~10% opacity, and text
on dark surfaces. Comparison / previous-period series use de-emphasized sage
(`#8A9990`), always paired with a legend and direct labels.

## Typography

| Style        | Family     | Use |
| ------------ | ---------- | --- |
| `h1`, `h2`   | Fraunces   | Display and section headings. Editorial, high-contrast serif. |
| `body-md`    | Geist      | Body copy, values, UI labels. |
| `label-caps` | Geist Mono | Uppercase micro-labels, table columns, axis ticks, deltas. |

Never use Inter, Roboto, or Arial. Big standalone figures use proportional
figures; `tabular-nums` only in aligned columns.

## Shape & space

- Radii: 8 / 14 / 24 px. Spacing rhythm: 8 / 16 / 32 px.
- Thin 1px borders in sage at low alpha; shadows are subtle and layered.
- Generous whitespace. No gradients-as-decoration, no glass cards, no blobs.

## Motion

- Charts draw themselves over 600–1000 ms; numbers count up with an
  ease-out odometer; cards fade + slide 12 px upward on scroll reveal.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` — decisive, never bouncy.
- Hover: portfolio cards lift 2 px and reveal secondary analytics.
