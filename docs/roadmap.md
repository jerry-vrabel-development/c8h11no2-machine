# Roadmap — The C8H11NO2 Machine

> **Status:** Draft v0.1

---

## v0.1 — Spike (≈1 week of evenings)

**Goal:** Prove the core loop works and feels good.

- [ ] Vite + React + TS scaffold
- [ ] Single pull button → 1 of 5 hardcoded creatures
- [ ] Basic reveal animation
- [ ] No persistence, no sound, no PWA
- [ ] Plays on localhost

**Exit criteria:** You pull, you smile, you want to pull again. If not, the concept needs rethinking before more investment.

## v0.3 — Mechanics complete

**Goal:** All systems present in rough form.

- [ ] 5 tiers with correct drop rates
- [ ] All 5 families represented
- [ ] At least 10 creatures arted (placeholder art OK)
- [ ] Editions: Standard + Holo
- [ ] Molecule counter + reservoir
- [ ] IndexedDB persistence
- [ ] Basic collection grid

**Exit criteria:** Pull → card → save → see it in collection. Full data flow works.

## v0.5 — Feature-complete alpha

**Goal:** Everything from v1 scope present, polish low.

- [ ] All 33 creatures defined and arted
- [ ] All 5 editions
- [ ] 15 badges implemented
- [ ] Sound design layer in (procedural OK)
- [ ] Transparency mode
- [ ] First-run experience
- [ ] Settings screen
- [ ] All screens navigable

**Exit criteria:** Playable end-to-end. Could show a friend without apologizing.

## v0.8 — Polish & PWA

**Goal:** Ship-ready quality.

- [ ] PWA manifest + service worker + offline
- [ ] Installable on iOS, Android, desktop
- [ ] All animations at 60fps on mid-range phone
- [ ] Sound design final
- [ ] Lighthouse PWA score >90
- [ ] Accessibility audit clean
- [ ] Reduced-motion fallback verified
- [ ] Error handling + state recovery

**Exit criteria:** You'd put your name on it publicly.

## v1.0 — Launch

**Goal:** Public release.

- [ ] Hosted on real domain
- [ ] About / credits page
- [ ] Final ethics review pass
- [ ] Share with 5 friends, observe their first 10 minutes
- [ ] Fix the top 3 things they trip on
- [ ] Post somewhere (HN? Show HN?)

## v1.5 — Game layer (planned)

**Goal:** Add a Medium-weight card game that gives cards meaning beyond collecting.

**Scope:**
- Stats already designed in (card-bible.md)
- ~15 keywords with light interactions (Marvel Snap-adjacent depth)
- Solitaire / vs-the-Machine AI opponent only — no multiplayer in v1.5
- 3-round matches, ~5 min each
- 10-card decks built from owned collection
- Wins award molecules → game feeds the pull loop
- Tutorial mode
- Light balance pass on initial keyword set

**Exit criteria:** Game mode is fun enough that users play it after a pull, not just to grind molecules.

**Not in v1.5:** PvP, ranked play, tournaments, alternate game modes.

## Post-v1.5 ideas (not commitments)

- **Trading** — between users, no money, possibly via QR-code-encoded card exchanges
- **Seasonal creatures** — holidays / Nobel announcements bring temporary entries
- **Crafting / fusion** — duplicates combine into something
- **Cloud sync** — optional account, lets you play across devices
- **Sound packs** — different audio aesthetics (chiptune, lab, ambient)
- **Notification mode** — opt-in, satirical, default off, ethics review required first
- **Stats sharing** — generate a shareable card-style image of your progress
- **Other neurotransmitters?** — serotonin (C₁₀H₁₂N₂O), oxytocin, etc. as expansion sets

---

## Anti-roadmap (things we're deliberately not building)

- Real-money store / cosmetics / "tip jar"
- Friend leaderboards
- Trading marketplace (any form involving exchange of value)
- Personalized drop rate tuning per user
- Streak-loss / FOMO mechanics
- Ad integration

If a future feature lands in this list, the answer is no.

---

## 📝 Template usage prompt

```
You are helping evaluate roadmap proposals for "The C8H11NO2 Machine," a small,
ethically-designed satirical PWA. Current version: [fill in].

Project values:
- Small on purpose. Bias toward cutting features.
- Ethical line is non-negotiable (see ethics.md).
- Polish > features.
- Sporadic maintenance — must remain maintainable solo.

When I propose adding something to the roadmap:
1. Does it fit a current milestone, or push another item out?
2. Does it conflict with the anti-roadmap?
3. Estimate effort in evenings (1 evening = 2–3 focused hours).
4. Suggest what to cut to fit it in, if needed.
5. Recommend "yes / yes but later / no, here's why."

Default to "later" unless the feature is in scope for the current milestone.
```
