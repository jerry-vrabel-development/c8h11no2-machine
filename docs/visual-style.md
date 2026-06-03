# Visual Style Guide — The C8H11NO2 Machine

> **Status:** Draft v0.1 — proposed direction, not locked

---

## Direction (proposed)

**"Retro-lab" aesthetic** — pixel-art creatures (Game Boy / GBC palette adjacent) presented inside a clean, slightly clinical lab-themed UI shell. The contrast between playful pixel critters and serious lab framing IS the joke.

> ⚠️ **Decision pending:** user has not locked a final aesthetic. See PRD §4 question.

## Palette

### Base UI (lab-clinical)

| Token | Hex | Use |
|---|---|---|
| `--bg-base` | `#0E1116` | App background (deep slate, not pure black) |
| `--bg-surface` | `#161A22` | Cards, panels |
| `--bg-elevated` | `#1F242E` | Modals, overlays |
| `--border-subtle` | `#2A3140` | Hairline borders |
| `--text-primary` | `#E8ECF3` | Headlines, primary copy |
| `--text-secondary` | `#9AA4B5` | Labels, captions |
| `--text-muted` | `#5C6577` | Disabled, deemphasized |

### Tier colors (mapped from common → mythic)

| Tier | Token | Hex | Notes |
|---|---|---|---|
| Common | `--tier-common` | `#9AA4B5` | Cool gray |
| Uncommon | `--tier-uncommon` | `#5BCB7F` | Healthy green |
| Rare | `--tier-rare` | `#4A90E2` | Sky blue |
| Epic | `--tier-epic` | `#A864F0` | Saturated purple |
| Legendary | `--tier-legendary` | `#F2B341` | Warm gold |
| Mythic | `--tier-mythic` | `linear-gradient(...)` | Animated rainbow gradient |

### Family accents (for card frames)

| Family | Hex | Element-coded |
|---|---|---|
| Carbon | `#3A3A40` | Graphite gray |
| Hydrogen | `#7BCDEC` | Plasma cyan |
| Nitrogen | `#E8E03D` | Lightning yellow |
| Oxygen | `#FF7A6B` | Combustion orange-red |
| Dopamine | rainbow gradient | Apex |

## Typography

- **UI / body:** `Inter`, system fallback. 14–16px base.
- **Headlines:** `Inter` SemiBold or Bold. Tight letter-spacing.
- **Card names:** A pixel font (e.g., `Press Start 2P` or `Silkscreen`) — used sparingly, only on cards and tier-reveal banners. Pixel font everywhere else = unreadable.
- **Numbers / counters:** Tabular figures, monospaced feel. `JetBrains Mono` for the molecule counter and stats.

## Pixel art

- **Grid:** 32×32 base, rendered at 4× (128×128) display via `image-rendering: pixelated`. Allows enough detail for varied creatures while staying clearly pixel-art.
- **Palette per creature:** 8–12 colors max. Hand-tuned per creature, not auto-generated.
- **Outlines:** Optional. Mix is fine — outline some, leave others rim-lit.
- **Edition variants:**
  - Standard: base sprite, no overlay
  - Holo: animated diagonal CSS gradient overlay at ~30% opacity, `mix-blend-mode: color-dodge`
  - Shiny: alternate palette swap; full re-art not required, just hue shift + value adjustment
  - Gold: gilded frame around the card + warm sheen overlay on sprite

## Card layout (~3:4 ratio)

```
┌─────────────────────┐
│ [Family icon]  C-01 │  ← top bar, family color
├─────────────────────┤
│                     │
│      [SPRITE]       │  ← 60% of card height
│      (animated)     │
│                     │
├─────────────────────┤
│ Graphyte            │  ← name in pixel font
│ Common · Carbon     │  ← meta line
├─────────────────────┤
│ "Soft, layered,     │  ← flavor text, italic
│  and surprisingly   │
│  easy to smudge."   │
└─────────────────────┘
```

## Motion principles

- **Snappy not slow.** UI transitions 150–250ms. Card reveals are the exception.
- **Easing:** Default `cubic-bezier(0.34, 1.56, 0.64, 1)` for satisfying overshoot on pulls.
- **Particle systems** for tier reveals: confetti (common), particle bursts (rare+), screen-takeover fireworks (mythic).
- **Idle animations** on every creature in the collection — small loops (2–4 frames), keeps the grid alive.
- **Respect `prefers-reduced-motion`** — provide a non-animated fallback for every reveal.

## Iconography

Minimal. Lucide or Heroicons. Element icons (C, H, N, O) hand-set in monospace for a periodic-table feel.

## Spacing

8px base unit. 8 / 16 / 24 / 32 / 48 / 64.

## Accessibility floor

- Color contrast WCAG AA minimum on all text
- Tier and family **never communicated by color alone** — always paired with text label or icon
- Keyboard navigation through pull button, collection grid, badges
- All animations have reduced-motion alternatives
- Sound is always optional, never required to play

---

## 📝 Template usage prompt

```
You are helping refine the Visual Style Guide for "The C8H11NO2 Machine,"
a PWA with pixel-art collectibles inside a clean, slightly clinical "lab" UI.

Active palette tokens are defined in the guide. When I share a screen or component:
- Use existing tokens — don't invent new colors unless I ask.
- Flag any contrast that falls below WCAG AA.
- Flag any case where rarity tier or family is communicated by color alone.
- Suggest specific motion behavior (duration, easing) with each interactive element.
- Keep pixel font usage limited to cards and tier-reveal moments only.

If I propose a visual direction that conflicts with "retro-lab" (e.g., neon
everywhere, glassmorphism, skeuomorphic slot machine), flag the tension and ask
me to confirm a direction change before adjusting tokens.
```
