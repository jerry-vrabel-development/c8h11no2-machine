# Card & Creature Bible — The C8H11NO2 Machine

> **Status:** Draft v0.1 — template with starter entries
> Every creature in the game. Add entries here BEFORE creating art.

---

## Conventions

- **ID format:** `{family}-{number}` e.g., `C-01`, `H-07`, `N-02`
- **Names:** Short, evocative, slightly absurd. Reference the element where possible.
- **Flavor text:** 1–2 lines, in-world voice, often punny.
- **Rarity:** Common / Uncommon / Rare / Epic / Legendary / Mythic
- **Editions:** All creatures available in Standard, Holo, Shiny, First Edition, Gold.

## Family count targets (v1)

| Family | Target count | Rarity distribution |
|---|---|---|
| Carbon (C) | 8 | 4 Common, 2 Uncommon, 1 Rare, 1 Epic |
| Hydrogen (H) | 8 | 4 Common, 2 Uncommon, 1 Rare, 1 Epic |
| Nitrogen (N) | 6 | 1 Common, 2 Uncommon, 2 Rare, 1 Epic |
| Oxygen (O) | 6 | 2 Common, 2 Uncommon, 1 Rare, 1 Epic |
| Legendaries | 3 | 1 per "common" family (C, H, O) |
| Mythics | 2 | Both Dopamine family |

**Total: ~33 unique creatures.**

---

## Creature entry template

```markdown
### [ID] — [Name]
- **Family:** [C / H / N / O / Dopamine]
- **Rarity:** [Tier]
- **Visual:** [1–2 line description of pixel art — palette, silhouette, key features]
- **Animation idle:** [What does it do when shown? bob, sparkle, breathe?]
- **Flavor text:** "[in-character flavor]"
- **Lore hook:** [One sentence connecting to real-world chemistry]
- **Stats (for v1.5 game layer):**
  - Stability: [1–10] — how hard it is to remove from play
  - Reactivity: [1–10] — offensive/interaction strength
  - Mass: [1–10] — board presence / resource cost
  - Charm: [1–10] — special effect strength / utility
- **Keyword (for v1.5):** [one keyword, see game-design-future.md]
- **Edition variants:**
  - Standard: [base notes]
  - Holo: [foil treatment notes]
  - Shiny: [alt palette notes]
  - Gold: [premium treatment]
```

> **Note:** Stats and keywords are designed in now but **not used in v1.0**.
> Locked in here so we don't have to retrofit 33 creatures later.

---

## Carbon family (starter entries)

### C-01 — Graphyte
- **Family:** Carbon
- **Rarity:** Common
- **Visual:** A small, shy creature shaped like a hexagonal flake; graphite-gray with a soft pencil-like sheen. Two dot eyes.
- **Animation idle:** Gently rotates 5° back and forth.
- **Flavor text:** *"Soft, layered, and surprisingly easy to smudge."*
- **Lore hook:** Graphite is one of carbon's stable allotropes — sheets of hexagons that slide past each other.
- **Edition variants:**
  - Standard: gray flake
  - Holo: shimmering pencil-lead rainbow
  - Shiny: deep blue-black like fresh graphite
  - Gold: literal gold leaf flake

### C-02 — Diamond Sprite *(placeholder)*
- **Rarity:** Epic — the chase Carbon
- **Visual:** TBD — crystalline, refractive, 16×16 pixel art with prismatic sparkle

### C-03 through C-08 — TBD
_Suggested directions: charcoal critter, fullerene (soccer-ball shape), nanotube serpent, coal lump, organic chain wiggler, methane bubble._

---

## Hydrogen family (starter entries)

### H-01 — Protonpuff
- **Family:** Hydrogen
- **Rarity:** Common
- **Visual:** A tiny, semi-transparent puffball with a single dot center (the proton). Pale blue glow.
- **Animation idle:** Floats up and down 2px on a slow sine wave.
- **Flavor text:** *"One proton, big personality."*
- **Lore hook:** Hydrogen — the simplest atom, one proton, often one electron, and the most abundant in the universe.
- **Edition variants:**
  - Standard: pale blue puff
  - Holo: rainbow plasma swirl
  - Shiny: bright magenta (excited state)
  - Gold: glowing gold halo

### H-02 through H-08 — TBD
_Suggested directions: water-droplet sprite, sun flare wisp, balloon spirit, plasma serpent, fusion star (Epic), tritium ghost (Rare, half-life joke)._

---

## Nitrogen family (starter entries)

### N-01 — Bolt Mite
- **Family:** Nitrogen
- **Rarity:** Uncommon
- **Visual:** Small, jagged electric-yellow creature with a zigzag body. Crackles faintly.
- **Animation idle:** Periodic spark flash every 3s.
- **Flavor text:** *"Lightning fixes me in the soil. Then I make plants happy."*
- **Lore hook:** Lightning storms fix atmospheric nitrogen into forms plants can absorb.
- **Edition variants:**
  - Standard: yellow zigzag
  - Holo: full-spectrum lightning shimmer
  - Shiny: violet plasma
  - Gold: gilded lightning crown

### N-02 through N-06 — TBD
_Suggested directions: ammonia cloud, laughing-gas spirit (literally laughs on tap), liquid-nitrogen ghost, atmosphere wisp (Epic — represents the 78% of air), nitrate root critter._

---

## Oxygen family (starter entries)

### O-01 — Bubbleling
- **Family:** Oxygen
- **Rarity:** Common
- **Visual:** Spherical bubble creature, pale cyan, surface tension highlights.
- **Animation idle:** Surface ripples once per 2s.
- **Flavor text:** *"Pop me and I'm gone. But there's always more."*
- **Lore hook:** Oxygen makes up ~21% of Earth's atmosphere and most aquatic life depends on dissolved O₂.
- **Edition variants:**
  - Standard: cyan bubble
  - Holo: oil-slick rainbow surface
  - Shiny: deep ocean blue
  - Gold: golden champagne bubble

### O-02 through O-06 — TBD
_Suggested directions: ozone wisp (triangle of three), combustion sprite (Epic), rust beetle, peroxide fizz, photosynthesis leaf-spirit._

---

## Legendary creatures

### L-01 — The Buckyball
- **Family:** Carbon
- **Rarity:** Legendary
- **Visual:** Soccer-ball-pattern sphere of 60 carbon atoms, glowing softly. Rotates slowly.
- **Flavor text:** *"Sixty atoms, perfectly arranged. Sometimes geometry is enough."*
- **Lore hook:** Buckminsterfullerene (C₆₀), discovered 1985, won a Nobel Prize.

### L-02 — Star Forger
- **Family:** Hydrogen
- **Rarity:** Legendary
- **Visual:** A miniature star — bright core, plasma halo, occasional flare.
- **Flavor text:** *"Four protons in, one helium out. The universe runs on this trick."*

### L-03 — Combustor
- **Family:** Oxygen
- **Rarity:** Legendary
- **Visual:** Flame elemental, multi-color tongues, smoke trail.
- **Flavor text:** *"I don't burn. I let others burn."*

---

## Mythic creatures (Dopamine family)

### M-01 — Dopa Prime
- **Family:** Dopamine
- **Rarity:** Mythic
- **Visual:** The full C₈H₁₁NO₂ molecular structure rendered as a luminous pixel-art mandala. Slow rainbow shimmer across all bonds.
- **Animation idle:** Bonds pulse rhythmically, atoms emit tiny sparks.
- **Flavor text:** *"You made me. And I made you want to make me again."*
- **Lore hook:** The literal molecular structure of dopamine. The whole point.

### M-02 — The Receptor
- **Family:** Dopamine
- **Rarity:** Mythic
- **Visual:** A stylized D2 receptor with a Dopa Prime nestled inside, glowing at the moment of binding.
- **Flavor text:** *"Fit. Bind. Fire. Repeat."*

---

## Open questions

- Are 33 creatures enough variety, or should v1 ship ~50?
- Do we want any "Easter egg" creatures (e.g., levodopa, serotonin cameo)?
- Pixel art commission vs AI-assisted vs self-made — decide before scaling up.

---

## 📝 Template usage prompt

```
You are helping populate the Card & Creature Bible for "The C8H11NO2 Machine."

Each creature must have:
1. A name that's short, evocative, and chemistry-adjacent (puns welcome).
2. A visual description specific enough that a pixel artist can draw it.
3. Flavor text in the creature's "voice" — 1–2 lines, witty.
4. A lore hook tying it to real chemistry.

Family personalities:
- Carbon: structural, foundational, crystalline
- Hydrogen: light, energetic, floaty
- Nitrogen: electric, prized, sharp
- Oxygen: reactive, bubbly, combustive
- Dopamine: apex/divine — only Mythic tier

When I share a slot like "C-04 (Carbon, Uncommon, TBD)":
- Suggest 3 distinct creature concepts that fit the slot.
- For each, draft full entry per template.
- Avoid duplicating concepts already in the bible.
- Flag if the concept's complexity exceeds 16×16 pixel art capacity.
```
