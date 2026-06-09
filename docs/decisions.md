# Design Decisions Log

> Running log of design decisions. Newest at the top. Each entry: **date — decision — context — alternatives considered**.
> When you find yourself re-arguing a settled point, add it here.

---

## Format

```
### YYYY-MM-DD — [Short decision title]

**Decision:** One-line statement of what we decided.

**Context:** Why this came up.

**Alternatives considered:**
- Option A — why rejected
- Option B — why rejected

**Trade-offs accepted:** What we knowingly gave up.

**Revisit when:** Conditions under which this should be reopened.
```

---

## Entries

### 2026-XX-XX — Audio updated, not locked

**Decision:** Update `audio-design.md` with v0.1 prototype values and ship into v0.3 with audio as known-pending refinement, rather than blocking on full validation. Refinement backlog is documented at the top of the audio doc.

**Context:** v0.1 prototype validated the 4-act reveal structure and produced working synth parameters for all six tiers. Two outstanding validations (50-commons fatigue, fresh-ears Mythic) remain unanswered, and no recording was captured. Blocking v0.3 on these would stall the project on subjective polish that is better evaluated when audio is attached to real visuals.

**Alternatives considered:**
- Lock audio fully before v0.3 — too cautious, stalls forward motion on subjective polish
- Ignore the gaps — dishonest, would re-emerge as bigger problems at v0.8
- Restart audio design from scratch — premature, prototype is genuinely good

**Trade-offs accepted:**
- Audio may need significant rework at v0.8 polish if refinement reveals fatal issues
- No recording of v0.1 audio exists — future iterations have only synth parameters to recreate the feel from
- Outside listening sessions deferred to post-v0.3

**Revisit when:** v0.3 ships and audio is attached to real card art + reveals. Run outside listening sessions then.

---

### 2026-XX-XX — Game layer added as v1.5, not v1.0

**Decision:** A Medium-weight card game ships as v1.5, after v1.0 (collection-only) is live and validated. Card-bible.md gets stats and keywords designed in now to avoid retrofitting later.

**Context:** During design refinement, the question arose whether the project is a "dopamine machine that has cards" or a "card game that uses dopamine-machine acquisition." Both are valid, but they're different products. MTG, Pokémon TCG, and Marvel Snap are *all* dopamine machines — the satire actually strengthens with a game layer, not weakens.

**Alternatives considered:**
- v1.0 ships both together — too much scope, risks shipping nothing
- Never add a game — caps the design ceiling, cards remain just images
- Light tier (War-style) — too shallow to give cards real meaning
- Heavy tier (full TCG) — eats the project

**Trade-offs accepted:**
- v1.0 stays a sticker album in some users' eyes — fine, the pull is still the centerpiece
- Card stats designed before they're used → some will be wrong, will need balancing in v1.5
- Roadmap effectively doubles in length

**Revisit when:** v1.0 ships and we see whether users actually want more depth, or are happy collecting.

---

### 2026-XX-XX — Card families derive from C₈H₁₁NO₂ atoms

**Decision:** The five card families are Carbon, Hydrogen, Nitrogen, Oxygen, and Dopamine (the full molecule, Mythic only).

**Context:** Need a thematic structure for collectibles that ties to the dopamine molecule.

**Alternatives considered:**
- Generic rarity tiers without family — too flat, no completionist hook
- Brain regions / neurotransmitter pathway as families — too clinical, harder to art

**Trade-offs accepted:** Some families (Nitrogen) have far fewer atoms in the molecule, which we map to lower drop rates → some users will find N hardest to complete. Feature, not bug.

**Revisit when:** Adding expansion packs based on other neurotransmitters.

---

### 2026-XX-XX — No real money, ever

**Decision:** The app will never accept payment in any form.

**Context:** Satire only works if we're outside the system we're satirizing.

**Alternatives considered:**
- Optional tip jar — still creates the framing problem
- Pay for cosmetics — diluted the joke

**Trade-offs accepted:** No revenue. Project remains hobby-scale forever.

**Revisit when:** Never.

---

_Add new entries above this line._
