# Game Design Document — The C8H11NO2 Machine

> **Status:** Draft v0.1
> The mechanical bible. All numbers here are starting points — tune in playtesting.

---

## 1. The core loop

```
   ┌──────────────┐
   │  Pull lever  │ ◄────────────┐
   └──────┬───────┘              │
          │                       │
          ▼                       │
   ┌──────────────┐               │
   │   Animation  │               │
   │  + suspense  │               │
   └──────┬───────┘               │
          │                       │
          ▼                       │
   ┌──────────────┐               │
   │ Tier reveal  │               │
   │ Card awarded │               │
   │ Molecules +  │               │
   └──────┬───────┘               │
          │                       │
          ▼                       │
   ┌──────────────┐               │
   │ Collection   │               │
   │ updates,     │               │
   │ badges check ├───────────────┘
   └──────────────┘
```

## 2. Rarity tiers

| Tier | Color | Base drop rate | Molecules awarded | Visual treatment |
|---|---|---|---|---|
| Common | Gray | 60% | 1–3 | Soft chime, small confetti |
| Uncommon | Green | 25% | 4–8 | Brighter chime, particle burst |
| Rare | Blue | 10% | 10–20 | Screen pulse, sustained sparkle |
| Epic | Purple | 4% | 25–50 | Screen shake, particle explosion |
| Legendary | Gold | 0.9% | 75–150 | Full takeover, fanfare, banner |
| Mythic | Rainbow | 0.1% | 250–500 | The works — flash, fireworks, "blessed" message |

**Pity timer:** If a user hits 100 pulls without a Legendary+, the next pull guarantees one. Invisible to user (but visible in transparency mode).

## 3. Card families (the atomic makeup of C₈H₁₁NO₂)

Drop rates within a pull are weighted by atomic frequency in the molecule:

| Family | Atoms | Weight | "Personality" |
|---|---|---|---|
| Carbon (C) | 8 | 36% | Structural, crystalline, foundational |
| Hydrogen (H) | 11 | 50% | Light, floaty, energetic |
| Nitrogen (N) | 1 | 4% | Electric, sharp, prized |
| Oxygen (O) | 2 | 9% | Combustive, bubbly, reactive |
| Dopamine (full molecule) | — | 1% | Apex tier — only appears as Mythic |

Note: family weight is *separate* from tier weight. Roll tier first, then family within that tier (Dopamine family only available at Mythic).

## 4. Editions

Each creature exists in multiple editions. Edition is rolled independently after creature is determined.

| Edition | Probability | Visual |
|---|---|---|
| Standard | 90% | Base art |
| Holo | 8% | Animated CSS gradient overlay |
| Shiny | 1.5% | Alternate color palette |
| First Edition | special | Only available in user's first 100 pulls; stamp on card |
| Gold | 0.5% | Gilded frame, premium chime |

A "complete set" = every creature × every edition. ~30 creatures × 5 editions = **150 unique cards**.

## 5. Molecule economy

**Earning:** Every pull awards molecules per the tier table above. Average pull ≈ 6 molecules.

**Reservoir:** Filling 10,000 molecules = ~1,600 pulls. Estimate ~50 pulls/day for engaged user → ~32 days to first fill. **Tune this.**

**Reservoir reward:**
- Guaranteed Mythic pull
- Permanent trophy ("Reservoir #1 Filled")
- Meter resets to 0
- Subsequent reservoirs: each one requires 1.5× the previous (10k, 15k, 22.5k, …) — long-tail goal

**Molecules cannot be spent.** They are pure progress markers. (Could change post-v1 — e.g., "10 molecules for a guaranteed Uncommon+ pull.")

## 6. Pull economy

**Decision needed — pick one:**

- **Option A: Unlimited free pulls.** Pure vibes. Risk: novelty fades fast.
- **Option B: Cooldown (30s).** Adds anticipation, limits compulsive use. The "right" answer for the ethics framing.
- **Option C: Stockpile.** 1 pull every 60s, max 10 stockpiled. Rewards return visits without punishing absence.

**Recommendation:** Option C, with a "force pull" button that *works* but logs to the Compulsion badge.

## 7. Badges

15 starter badges, mix of obvious and discoverable.

### Pull-count
- **First Pull** — your first
- **Hundred Club** — 100 pulls
- **Thousand Pulls** — 1,000 pulls

### Collection
- **Carbon Completionist** — all C creatures, any edition
- **Hydrogen Hoarder** — all H creatures
- **Nitrogen Noble** — all N creatures (hardest standard family)
- **Oxygen Obsessive** — all O creatures
- **Holographic** — own 10 holo editions
- **Gilded** — own a single Gold edition

### Lucky
- **Beat the Odds** — Legendary in first 10 pulls
- **Blessed** — first Mythic
- **Hot Hand** — 3 Epics in a row

### Behavioral
- **Restraint** — 24h between two pulls (the *good* badge)
- **Night Owl** — pull between 2–5am local time
- **Compulsion** — 50 pulls within 1 hour (app shows a gentle concern message)

### Meta
- **Behind the Curtain** — toggle the RNG transparency mode for the first time
- **Reservoir #1 Filled** — fill first reservoir

Badge unlocks should themselves be small dopamine hits: distinct sound, brief notification card, optional share.

## 8. Pull animation (timing)

Total time: ~3.5s for common, up to ~8s for mythic.

1. **0.0s** — lever pull / pack tap. Haptic.
2. **0.3s** — variable delay (0.0–1.5s — *the unpredictability is the hit*)
3. **Reveal start** — depends on pick:
   - Slot reels spin and align
   - Pack rips open
   - Card flips
4. **Tier flash** — color burst matching tier
5. **Card lands** — name + flavor text
6. **Molecule counter** ticks up
7. **Continue button** appears

For Legendary/Mythic, add 2–4s of additional celebration before continue.

## 9. Edge cases & policies

- **Duplicates:** Always allowed. Track count per card; first duplicate awards a small molecule bonus.
- **Network loss:** All pulls work offline. Stats sync if/when cloud sync ships (post-v1).
- **Time manipulation (clock spoofing for badges):** Detect, soft-disable time-based badges. Don't punish.
- **State reset:** User can wipe progress from settings. Confirms twice. Gives back nothing.

## 10. Open balance questions

- Is 0.1% mythic too rare or just rare enough?
- 10,000 molecules = motivating or punishing?
- Should Holo/Shiny/Gold be separate edition rolls or chained (rarer overrides)?
- Pity timer at 100 — too generous, too punishing?

---

## 📝 Template usage prompt

```
You are helping balance the Game Design Document for "The C8H11NO2 Machine."

Project context: collectible PWA where users pull a slot/loot mechanism to gather
pixel-art creatures themed to atoms (C, H, N, O) and the dopamine molecule. Currency
is "dopamine molecules" — 10,000 fills the first reservoir.

When I share a section:
- Run the math. If I say "drops every 100 pulls" and the rate is 0.9%, check whether
  that's actually what the user will experience.
- Surface unintended consequences. Will this number make the game grindy? Trivial?
- Compare against established design patterns (gacha games, TCGs, loot box systems)
  but don't copy uncritically — we want to satirize, not replicate.
- Always tie balance choices back to the ethics framing — would this number feel
  exploitative to a real user?
- Suggest playtesting questions to answer before locking numbers in.
```
