# Information Architecture & Wireframes — The C8H11NO2 Machine

> **Status:** Draft v0.1 — text wireframes; replace with image sketches as design progresses

---

## Screen map

```
                  ┌─────────────┐
                  │  First-run  │
                  │   Intro     │
                  └──────┬──────┘
                         │
                  ┌──────▼──────┐
        ┌────────►│   Machine   │◄────────┐
        │         │  (default)  │         │
        │         └──────┬──────┘         │
        │                │ (reveal)       │
        │         ┌──────▼──────┐         │
        │         │ Card Reveal │         │
        │         │   Overlay   │         │
        │         └──────┬──────┘         │
        │                │                │
   ┌────┴────┐    ┌──────▼─────┐   ┌──────┴──────┐
   │ Badges  │◄───┤ Collection │──►│ Card Detail │
   └─────────┘    └──────┬─────┘   └─────────────┘
                         │
                  ┌──────▼──────┐
                  │   Stats     │
                  └──────┬──────┘
                         │
                  ┌──────▼──────┐
                  │  Settings   │
                  └─────────────┘
```

## Navigation pattern

Bottom tab bar on mobile, left rail on desktop. Four primary destinations: **Machine**, **Collection**, **Badges**, **Stats**. Settings tucked into a corner icon.

## Screen 1 — Machine (default landing)

```
┌─────────────────────────────────────┐
│ ⚛  C8H11NO2 MACHINE        ⚙       │  ← header w/ settings
├─────────────────────────────────────┤
│                                     │
│  🧪 Reservoir #1                    │  ← molecule progress
│  ▓▓▓▓░░░░░░░░░░░░  1,247 / 10,000   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│                                     │
│         ┌───────────────┐           │
│         │               │           │
│         │   THE MACHINE │           │  ← visual centerpiece
│         │               │           │
│         │  (idle anim)  │           │
│         │               │           │
│         └───────────────┘           │
│                                     │
│                                     │
│         ┌─────────────┐             │
│         │  PULL  ⟿    │             │  ← big juicy button
│         └─────────────┘             │
│                                     │
│         Last pull: H-03 ✨           │  ← reference to recent
│                                     │
├──────┬──────────┬──────────┬────────┤
│ ⚛    │   📇     │    🏆    │   📊  │  ← nav: machine|collection|badges|stats
│Machine│Collection│  Badges  │ Stats │
└──────┴──────────┴──────────┴────────┘
```

## Screen 2 — Card Reveal (overlay)

```
┌─────────────────────────────────────┐
│                                     │
│  (full-screen takeover, dim bg)     │
│                                     │
│  ╔═══════════════════════╗          │
│  ║                       ║          │
│  ║      [PIXEL ART]      ║   ← animated reveal
│  ║       Graphyte        ║
│  ║   Common · Carbon     ║
│  ║                       ║
│  ║  "Soft, layered,      ║
│  ║   and surprisingly    ║
│  ║   easy to smudge."    ║
│  ║                       ║
│  ╚═══════════════════════╝
│                                     │
│         +2 molecules 🧪              │
│                                     │
│         [  Continue  ]              │
│         [ Pull Again ]              │
└─────────────────────────────────────┘
```

Tier-specific treatment: common = minimal, mythic = full screen takeover with extended celebration.

## Screen 3 — Collection

```
┌─────────────────────────────────────┐
│ COLLECTION              23 / 150    │
├─────────────────────────────────────┤
│ [All] [C] [H] [N] [O] [D]  filters  │
├─────────────────────────────────────┤
│ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐       │
│ │  │ │░░│ │  │ │  │ │░░│ │░░│   ← grid of cards
│ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘       │   gray = unowned
│ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐       │
│ │  │ │  │ │░░│ │  │ │░░│ │░░│       │
│ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘       │
│                                     │
│ Family: Carbon  ────  6 / 8         │   ← per-family progress
│ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐       │
│ │  │ │  │ │  │ │  │ │  │ │░░│       │
│ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘       │
└─────────────────────────────────────┘
```

Tap any card → card detail. Long-press → quick edition stats.

## Screen 4 — Card Detail

```
┌─────────────────────────────────────┐
│ ←   Graphyte                        │
├─────────────────────────────────────┤
│      ┌───────────────┐              │
│      │               │              │
│      │  [LARGE ART]  │              │  ← 2× normal card display
│      │               │              │
│      └───────────────┘              │
│                                     │
│  Common · Carbon                    │
│  "Soft, layered, and surprisingly   │
│   easy to smudge."                  │
│                                     │
│  Lore: Graphite is one of carbon's  │  ← lore hook
│  stable allotropes...               │
│                                     │
├─────────────────────────────────────┤
│ Editions owned:                     │
│  Standard:    ×4 ✓                  │
│  Holo:        ×1 ✓                  │
│  Shiny:       —                     │
│  First Ed:    —                     │
│  Gold:        —                     │
└─────────────────────────────────────┘
```

## Screen 5 — Badges

```
┌─────────────────────────────────────┐
│ BADGES                    8 / 15    │
├─────────────────────────────────────┤
│                                     │
│  ✨ Earned (8)                       │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐           │
│  │🥇│ │💯│ │🌙│ │🔬│ │🧪│           │
│  └──┘ └──┘ └──┘ └──┘ └──┘           │
│                                     │
│  🔒 Locked (7)                       │
│  ┌──┐ ┌──┐ ┌──┐                     │
│  │？│ │？│ │？│  ← some shown, some hidden
│  └──┘ └──┘ └──┘                     │
│                                     │
│  Tap badge for description          │
└─────────────────────────────────────┘
```

Hidden badges show as `?` until earned (preserves surprise).

## Screen 6 — Stats (the satirical screen)

```
┌─────────────────────────────────────┐
│ STATS                               │
├─────────────────────────────────────┤
│ Total pulls               1,247     │
│ Today                        47     │
│ This week                   312     │
│                                     │
│ Dopamine dispensed today   47 hits  │  ← honest, slightly ominous
│ Average hits per minute     2.3     │
│                                     │
│ Rarest card     Buckyball (Legendary)│
│ Luckiest day    Tuesday, 3 Mythics  │
│                                     │
│ Pity counter                  73    │  ← visible in transparency mode
│ Next legendary forced at     100    │
│                                     │
│ ▼ Behind the curtain                │  ← collapsible
│   [Transparency mode toggle]        │
│   Recent rolls (raw RNG output...)  │
└─────────────────────────────────────┘
```

## Screen 7 — Settings

```
┌─────────────────────────────────────┐
│ ← SETTINGS                          │
├─────────────────────────────────────┤
│ Sound                               │
│   Master volume    ──●────          │
│   Reveal sounds    ──●────          │
│   UI sounds        ──●────          │
│   Ambient          ─●─────          │
│                                     │
│ Motion                              │
│   Reduce motion    [ ]              │
│   Haptics          [✓]              │
│                                     │
│ Transparency                        │
│   Show RNG rolls   [ ]              │
│   Show drop rates  [ ]              │
│                                     │
│ Session                             │
│   Break reminder   ──●────  20 min  │
│                                     │
│ Data                                │
│   Export progress  [download]       │
│   Reset progress   [reset]          │  ← double-confirm
│                                     │
│ About / Credits                     │
└─────────────────────────────────────┘
```

## First-run experience

Single overlay before first pull. Cannot be skipped. Must scroll to confirm.

```
Welcome to the C8H11NO2 Machine.

This is a satirical PWA built around variable-ratio
reinforcement — the same psychology that powers slot
machines and loot boxes.

You will pull a lever. You will collect cards. You
will probably want to do this more than you intended.
That's the point we're making.

Nothing here costs money. Nothing expires. You can
reset everything at any time.

Have fun. Watch yourself.

           [  I understand. Start.  ]
```

---

## 📝 Template usage prompt

```
You are helping refine wireframes for "The C8H11NO2 Machine," a PWA with these
screens: Machine (pull), Card Reveal (overlay), Collection (grid), Card Detail,
Badges, Stats, Settings, First-Run.

Design constraints:
- Mobile-first (PWA, will be installed on phones)
- Bottom tab bar on mobile, left rail on desktop
- Pull button is the single most important interaction; nothing competes with it
- Transparency mode must be reachable in <=2 taps from anywhere
- Reset progress must always be reachable but never accidental

When I share a wireframe or describe a new screen:
1. Identify the primary action and confirm it's visually dominant.
2. Check that navigation is consistent (same tab bar / rail across screens).
3. Flag any screen with more than one competing CTA.
4. Verify mobile usability (thumb zones, tap targets >44px).
5. Suggest specific component patterns from the visual style guide.
```
