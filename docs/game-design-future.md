# Game Design (Future) — The C8H11NO2 Machine v1.5

> **Status:** Scratchpad — speculative
> This doc explores the v1.5 game layer. It is **not** authoritative for v1.0 development.
> When v1.5 work begins, this graduates into the main GDD.

---

## Thesis

A Medium-weight, single-player card game that uses the existing collection.
Adds **meaning** to pulls — every card might be playable, so every pull has
two questions: "is it new?" and "is it good?"

The game feeds the dopamine machine. Winning matches awards molecules.
The two systems reinforce each other.

## Anchoring references

- **Marvel Snap** — match length, 3-round structure, board state simplicity
- **Slay the Spire** — single-player progression, deckbuilding from a pool
- **Hearthstone Battlegrounds** — solo vs AI feel
- **Magic: Pauper format** — using only common-tier cards is viable; complexity from interactions

## Match structure (proposed)

- 3 rounds, ~5 min total per match
- Three "lanes" on the board (one per major element family pair?)
- Each round, both players play 1–2 cards face-down to chosen lanes
- All cards reveal simultaneously at round end (Snap-style)
- After round 3, total each lane: highest stat sum wins lane, most lanes wins match
- Match win → molecule reward scaled by difficulty + margin

## Card anatomy

Every card has:
- **Cost** (1–6) — limits how many you can play per round
- **Stability** (1–10) — defensive value; lane total
- **Reactivity** (1–10) — offensive trigger threshold for keywords
- **Mass** (1–10) — board-state weight (some keywords care about lane mass)
- **Charm** (1–10) — keyword power multiplier
- **Keyword** (1) — one ability per card

> Tier and family map predictably to stat distribution. A Common Hydrogen
> is small-cost, low-stat. A Mythic Dopamine has every stat at 8+.

## Keyword design (target: ~15 keywords for v1.5)

Rough sketches — not committed.

| Keyword | Effect | Found on |
|---|---|---|
| **Catalyst** | Doubles adjacent card's Reactivity | Carbon |
| **Volatile** | Discards after triggering once | Oxygen |
| **Bond** | +2 Stability per same-family card in lane | Carbon |
| **Excite** | When played, +1 to all other H cards on board | Hydrogen |
| **Fix** | Locks an opponent's lane (no more plays) | Nitrogen |
| **Reduce** | Halves an opponent card's Reactivity | Oxygen |
| **Resonate** | If you play another card with same keyword, both gain +3 Charm | All |
| **Decay** | -1 Stability per turn after play | Mythic only — adds risk to mythic plays |
| **Crystallize** | Becomes immovable; cannot be removed by opponent effects | Carbon, rare |
| **Photolytic** | Returns to hand at end of round | Oxygen |
| **Inert** | Unaffected by opponent keywords | Noble-gas reference, special card? |
| **Chain** | Triggers another Chain card in same lane | All |
| **Polarize** | Swaps Stability and Reactivity values | Special |
| **Receptor** | Costs 0 if a Dopamine card is in your deck | Dopamine synergy |
| **Reservoir** | Each card with this keyword in lane: +1 molecule on win | Meta |

15 keywords. Mix of static, triggered, and synergy effects. Avoid timing
complexity (no "at start of next round" stuff) — keep resolution simple.

## AI opponent

Two difficulty modes for v1.5:

- **The Apprentice** — plays cards somewhat randomly, weighted by cost.
  Tutorial-friendly. Wins reward 25 molecules.
- **The Machine** — uses simple heuristics: maximize expected lane value,
  plays keyword synergies when possible. Wins reward 75 molecules.

No ML, no minimax. Heuristic AI is plenty for v1.5. Reassess if it feels
trivial to beat after first balance pass.

## Deck-building

- Decks are exactly 10 cards
- No duplicates of same creature (across editions counts as same creature)
- Can include any creatures user owns
- Save up to 5 decks
- Quick-deck button: auto-builds a legal deck from collection

## Open design questions

- **Lanes:** Are there 3 of them or just "the board"? Snap uses 3 with lane
  abilities; we could go simpler.
- **Mana / cost system:** Hard cap per round, or building mana economy?
  Lean toward hard cap (simpler).
- **Card removal:** Can cards leave play during a round? Or only at round end?
- **Edition matters?** Should Holo / Gold editions have any mechanical
  difference, or purely cosmetic? Strong vote for **purely cosmetic** to
  avoid pay-to-win optics (even though there's no pay).
- **Family bonuses:** Does playing 3 Carbon cards in one lane do something?
  Could create deck archetypes.

## What NOT to add (yet)

- **Multiplayer** — out of scope for v1.5. Adds matchmaking, anti-cheat,
  servers. Defer to v2.0 if ever.
- **Ranked play / ELO** — promotes the worst behaviors. Defer indefinitely.
- **Tournaments / leaderboards** — see ethics.md. No.
- **Trading** — separate question, separate doc.
- **Card abilities with text longer than 1 sentence** — keyword discipline.
- **Resource generation beyond mana** — keep economy simple.

## Balance philosophy

- Avoid mandatory cards. No single card should be in 80%+ of decks.
- Reward synergies, not raw power. A clever deck of Commons should beat
  a random pile of Legendaries.
- Mythics are *interesting*, not *strictly better*. Decay keyword on
  Dopa Prime is the model: powerful but with a real cost.
- Every keyword should be on at least 3 cards across rarities, so any
  rarity can build any strategy.

## Pre-v1.5 work that pays off here

Things to do *during v1.0* that make v1.5 cheaper:
- [ ] Backfill stat blocks in card-bible.md for all 33 creatures
- [ ] Assign a keyword to each creature (even tentatively)
- [ ] In the IndexedDB schema, leave space for `gameStats` on card records
- [ ] Reserve UI slot for "Play" tab in nav (don't ship it, just plan space)

---

## 📝 Template usage prompt

```
You are exploring the v1.5 game design for "The C8H11NO2 Machine." This is a
SPECULATIVE doc — nothing here is committed, and v1.5 won't be built until v1.0
ships and is validated.

Project context:
- v1.0 is a collection-focused dopamine machine (slot/loot mechanic)
- v1.5 adds a Medium-weight card game using the existing collection
- Target: Marvel Snap-adjacent depth, solitaire vs AI, 5-min matches
- ~15 keywords total, single-keyword cards

Hard constraints (from project ethics):
- No multiplayer, no ranked, no leaderboards in v1.5
- Editions remain cosmetic — never mechanical
- No card is mandatory for competitive decks
- AI opponent uses heuristics only, no ML

When I share an idea for the game:
1. Check it against the constraints above.
2. Estimate complexity vs the Marvel Snap baseline (simpler/similar/deeper).
3. Flag if it requires multiplayer infrastructure.
4. Suggest how it interacts with the existing keyword list.
5. Push back if the idea creates a "must-have" card or a card-power arms race.

Bias toward fewer keywords with more synergy depth, not more keywords with
shallow effects.
```
