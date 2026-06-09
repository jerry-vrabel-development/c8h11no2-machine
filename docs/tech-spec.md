# Technical Specification — The C8H11NO2 Machine

> **Status:** Draft v0.1
> All technology choices are starting recommendations. Decide before building.

---

## Stack recommendation

| Layer | Choice | Why |
|---|---|---|
| Build tool | Vite | Fast, simple, great PWA story via `vite-plugin-pwa` |
| Framework | React (or Solid) | Component model fits the screen breakdown; either works |
| Language | TypeScript | Strong types for cards/badges/state pays off fast here |
| Styling | CSS modules + CSS vars | Tokens from visual-style.md map directly |
| Animation | Framer Motion (or vanilla CSS + JS) | Card reveals deserve a real animation lib |
| State | Zustand or React Context | Simple; no Redux needed |
| Persistence | IndexedDB (via `idb` lib) | localStorage is too small for 150+ cards w/ counts |
| Audio | Web Audio API + Tone.js for procedural sounds | See audio-design.md |
| Pixel art | PNG sprites + CSS `image-rendering: pixelated` | Or SVG with manual pixel grids |
| PWA | `vite-plugin-pwa` (Workbox under the hood) | Generates manifest + service worker |

## Architecture

```
┌──────────────────────────────────────────┐
│              UI (React)                   │
│   ┌──────────┐  ┌──────────┐ ┌────────┐  │
│   │ Machine  │  │Collection│ │ Badges │  │
│   └──────────┘  └──────────┘ └────────┘  │
└────────────────┬─────────────────────────┘
                 │
┌────────────────▼─────────────────────────┐
│           Game Engine (TS)                │
│  - RNG + pity timer                       │
│  - Rarity & family rolls                  │
│  - Edition rolls                          │
│  - Badge evaluator                        │
│  - Molecule accumulator                   │
└────────────────┬─────────────────────────┘
                 │
┌────────────────▼─────────────────────────┐
│         Persistence Layer (idb)           │
│  - User profile (1 row)                   │
│  - Card inventory (per card × edition)    │
│  - Pull history (rolling 1000)            │
│  - Badge state                            │
│  - Settings                               │
└──────────────────────────────────────────┘
```

## Data model

```ts
type Tier = "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic";
type Family = "C" | "H" | "N" | "O" | "D";
type Edition = "standard" | "holo" | "shiny" | "firstEdition" | "gold";

interface Creature {
  id: string;            // "C-01"
  name: string;
  family: Family;
  tier: Tier;
  flavor: string;
  spriteUrl: string;     // PNG path
}

interface CardInstance {
  creatureId: string;
  edition: Edition;
  acquiredAt: number;    // timestamp
  pullNumber: number;    // which pull # produced this
}

interface UserState {
  profileCreatedAt: number;
  totalPulls: number;
  molecules: number;
  reservoirsFilled: number;
  pityCounter: number;   // pulls since last legendary+
  inventory: Map<string /* `${creatureId}-${edition}` */, CardInstance[]>;
  badges: Set<BadgeId>;
  settings: Settings;
  pullHistory: PullRecord[];  // bounded ring buffer
}
```

## RNG

- Use `crypto.getRandomValues` for fairness. Avoid `Math.random`.
- Roll order: tier → family (constrained by tier) → creature within family/tier → edition.
- Pity timer: increment on every non-legendary pull, force a legendary+ at threshold, reset on legendary+.
- Transparency mode: log every roll's pre-decision values into a viewable log.

## Performance budget

| Metric | Target |
|---|---|
| First contentful paint | <1.5s on 4G |
| Time to interactive | <2.5s on 4G |
| Pull animation FPS | 60 sustained |
| Total bundle (gzipped) | <300KB JS + <500KB images for MVP |
| Lighthouse PWA score | >90 |

## PWA specifics

- **Manifest:** `name`, `short_name: "C8H11NO2"`, theme color matching `--bg-base`, icons 192/512 + maskable.
- **Service worker:** Workbox precache strategy for all sprites + sounds. Runtime cache for any future API.
- **Install prompt:** Trigger after first reservoir milestone (5%? 10%?), not on first load — avoid being pushy.
- **iOS limits:** No PWA push notifications on iOS < 16.4 — design without them anyway.
- **Offline:** Full functionality offline. All assets precached.

## Storage strategy

- **IndexedDB** via `idb` wrapper.
- Single database, separate object stores: `user`, `cards`, `history`, `badges`.
- **Migration discipline:** version every schema change.
- **Backup/export:** settings option to dump state as JSON. Pairs with the "reset" option in ethics.md.

## Testing

- **Unit:** RNG distributions over 100k simulated pulls — verify tier rates within tolerance.
- **Unit:** Badge unlock conditions.
- **Integration:** Pull → state update → render cycle.
- **Manual:** Animation feel, sound design, on-device PWA install.
- **Accessibility audit:** Lighthouse + manual keyboard nav + screen reader pass.

## Build & deploy

- Build: `vite build` → static `dist/`
- Host: Cloudflare Pages, Netlify, or Vercel (all free for this scale)
- Domain: optional; works on any subdomain
- CI: GitHub Actions running build + tests on PR

## Out of scope (v1)

- Backend / API
- User accounts / auth
- Multi-device sync
- Analytics (defer; if added, privacy-respecting only — e.g., Plausible)
- A/B testing infrastructure

## Tone.js gotchas (learned in v0.1 prototype)

Carry these forward to avoid re-learning:

- **Audio context requires user gesture** — initialize Tone.js inside the
  first button click handler, not on page load.
- **`await reverb.ready` before scheduling** — Reverb instances have async
  setup. Scheduling sound through an unready reverb silently fails. Costs
  ~30 min of debugging.
- **Pre-warm reverb instances at startup** rather than per-pull. Significant
  perceived-latency improvement on the first reveal of each tier.
- **Tick count must be decoupled from molecule reward count** — capped at
  2–30 regardless of molecules awarded, so a 350-molecule Mythic doesn't
  tick for 19 seconds.
- **±2 semitone random variation per repeated sound** is the validated
  anti-fatigue baseline. Apply to anything that plays >50 times per session.

## Open technical questions

- React vs Solid — Solid would be lighter for an animation-heavy app, but the ecosystem is smaller.
- Sprites in PNG vs SVG — PNG simpler, SVG infinitely scalable but more work per creature.
- Should we ship a Capacitor wrapper for native app stores? Probably no for v1.

---

## 📝 Template usage prompt

```
You are helping evaluate technical decisions for "The C8H11NO2 Machine," a PWA built
with Vite + React + TypeScript, persisting state in IndexedDB, with no backend.

Constraints:
- Must work fully offline after first load
- <300KB gzipped JS bundle for MVP
- Must run 60fps on mid-range Android
- Lighthouse PWA score >90
- Privacy: no analytics, no third-party calls

When I propose a library, dependency, or architecture change:
1. Estimate bundle size impact (KB gzipped).
2. Check it works offline / in service worker context.
3. Verify it doesn't require a network call at runtime.
4. Flag if it conflicts with the privacy stance.
5. Suggest the smallest alternative that solves the same problem.

Bias toward boring, well-supported libraries over clever new ones. This project
will be maintained sporadically.
```
