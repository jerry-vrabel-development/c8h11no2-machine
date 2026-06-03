# Product Requirements Document — The C8H11NO2 Machine

> **Status:** Draft v0.1
> **Last updated:** _fill in_
> **Owner:** _you_

---

## 1. Vision (one sentence)

A self-aware, beautifully crafted PWA that satirizes and celebrates variable-ratio reinforcement by letting users pull a slot/loot mechanism to collect pixel-art "creatures" themed to the atoms that make up dopamine (C₈H₁₁NO₂), while transparently showing them the manipulation underneath.

## 2. The problem / opportunity

People love collecting. People love reward loops. Most apps that use these mechanics either hide them (gambling, mobile games) or moralize about them. There's a gap for something that **is honest about being a Skinner box** — playful, well-designed, and ultimately harmless because it gives nothing real away and refuses to weaponize FOMO.

## 3. Target user

_Fill in. Starter hypotheses:_
- **Primary:** Design/dev-curious folks who appreciate meta-humor and well-crafted micro-experiences. They'll install it, show friends, and ironically check it daily.
- **Secondary:** Collectors / completionists who genuinely enjoy filling a set, regardless of the joke.
- **Anti-persona:** Anyone seeking real reward, gambling, or a serious productivity tool.

## 4. Core value proposition

1. **The hit** — a satisfying, sensory-rich pull animation that delivers a small dopamine reward.
2. **The collection** — a long-term goal (complete the set, in every edition) that survives past the novelty.
3. **The joke** — self-awareness that turns "I'm being manipulated" into "I'm in on it."

## 5. Goals & success metrics

| Goal | Metric | Target (v1) |
|---|---|---|
| Engagement without exploitation | DAU / installed users | >30% in first 2 weeks, declining is *fine* |
| Collection depth resonates | % users who fill first reservoir | >20% of returning users |
| Joke lands | Shares / "show a friend" events | qualitative — social mentions |
| Healthy use | Median session length | <5 min (a short hit is a successful hit) |

Explicitly **not** optimizing for: total time in app, push notification CTR, retention via FOMO.

## 6. Scope — v1 (MVP)

**In:**
- Pull mechanic with tiered reveal (5 rarity tiers)
- 5 card families (C, H, N, O, Dopamine) with ~30 unique creatures total
- 3 editions per creature (Standard, Holo, Gold) — expand later
- Dopamine molecule currency + first reservoir (10,000 molecules)
- Collection grid view
- Badge system (~15 badges at launch)
- Local persistence (IndexedDB)
- Installable PWA, offline-capable
- Sound + haptic feedback
- "Behind the curtain" RNG transparency toggle

**Out (post-v1):**
- Push notifications (intentionally deferred — ethics review first)
- Trading between users
- Seasonal events / limited-time creatures
- Cloud sync
- Account system
- Duplicate fusion / crafting

## 7. Non-goals

- Real-money purchases — never.
- Loss aversion mechanics — no streak-loss penalties, no expiring content.
- Aggressive notifications — defaults are *off*.
- Social comparison / leaderboards in v1 (could enable later if done carefully).

## 8. Key risks & open questions

- **Joke fatigue** — how do we keep the self-aware framing fresh past pull #100?
- **Audio reliance** — many users browse muted; how much do we lean on sound?
- **Pixel art volume** — 30 creatures × 3 editions = 90 assets. Sourcing plan?
- **Ethics line** — see ethics.md. Where exactly is the line for *this* project?

## 9. Definition of done (v1)

- [ ] Can pull, get a card, see it animate into collection
- [ ] All 5 families have creatures defined and arted
- [ ] First reservoir fill triggers mythic pull + permanent trophy
- [ ] 15 badges implemented and unlockable
- [ ] PWA installable on iOS + Android + desktop Chrome
- [ ] Works offline
- [ ] State persists across sessions
- [ ] Lighthouse PWA score >90

---

## 📝 Template usage prompt

Use this prompt with an AI assistant when revising or expanding the PRD:

```
You are helping refine the Product Requirements Document for "The C8H11NO2 Machine,"
a self-aware PWA dopamine-machine that lets users collect pixel-art creatures themed
to the atoms in the dopamine molecule (C8H11NO2 = Carbon, Hydrogen, Nitrogen, Oxygen,
plus the molecule itself as a legendary tier).

Project pillars (don't violate these):
1. Honest, not exploitative — the satire only works if we actually behave ethically.
2. No real money, no loss aversion, no dark-pattern notifications.
3. The craft (animation, sound, art) IS the product — polish matters more than features.
4. Collection depth provides long-term goal; per-pull hit provides short-term reward.

When I share a section to revise:
- Push back on vagueness. "Users will love it" is not a requirement.
- Flag scope creep against the v1 scope list.
- Surface anything that conflicts with the ethics doc.
- Suggest measurable success criteria, not aspirational ones.
- Keep it to 1 page where possible.
```
