# Audio Design — The C8H11NO2 Machine

> **Status:** Updated from v0.1 prototype — **not locked**. See refinement backlog below.
> Sound IS the dopamine. This doc is more important than it looks.

---

## Refinement backlog (deferred, lower priority than shipping forward)

These items are *known unfinished* but explicitly deprioritized to keep v0.3
moving. Revisit before v0.8 polish, or earlier if a fundamental issue surfaces.

- [ ] **Validate fatigue:** Does 50 commons in a row stay non-annoying for the
      builder? For fresh ears? (Untested as of v0.1 spike.)
- [ ] **Validate Mythic shareability:** Does the Mythic reveal still hit on
      fresh ears after a 10-minute break? Does it pass the "would you show
      a friend?" bar?
- [ ] **Mythic length check:** Currently 6.0s. Hearthstone Golden Legendary is
      ~4.5s for reference. Verify 6.0s doesn't fatigue on repeat plays.
- [ ] **High-frequency safety:** The C7 sparkle at 5.0s of Mythic is 2093Hz —
      verify it doesn't pierce after repeated plays.
- [ ] **Outside listening sessions:** 5–8 people, structured questions per
      qualitative protocol. Likely best run after v0.3 when audio is attached
      to real visuals.
- [ ] **Sound catalog gaps:** UI sounds (tap, toggle, error, modal_open) and
      collection sounds (card.flip, card.land, badge.unlock, ambient loops)
      are still speculative — only the pull-reveal loop was prototyped.
- [ ] **Reservoir-fill celebration:** Not yet designed. Major event, will
      eventually need its own composition pass.

---

## Principles

1. **Every interaction has a sound.** Silence is the absence of reward.
2. **Tier reveals are distinct on a single playthrough.** A user with their
   eyes closed should be able to identify the tier from Act 3 alone.
3. **No harsh sounds.** No nails-on-chalkboard, no clipping, no fatigue-inducing
   high-end above ~8kHz.
4. **Mute-friendly.** Default-on audio, prominent mute toggle, *no* feature
   requires sound.
5. **Lab-clinical, not casino.** Soft electronic tones, gentle synths, no
   slot-machine cha-chings.
6. **Anti-fatigue on repeated sounds.** Any sound that plays >100 times per
   session needs variation built in (see molecule tick below).

---

## The 4-act pull-reveal structure (validated in v0.1 prototype)

Every pull is a composed sonic sequence in four acts. The structure itself
is locked — only the per-tier parameters are subject to refinement.

### Act 1 — Anticipation (variable, weighted short)

- **Duration:** 0.3s–1.5s, weighted 70% short (0.3–0.6s) / 30% drawn out (0.6–1.5s)
- **Synth:** Sawtooth oscillator
- **Filter:** Low-pass with rising cutoff (200Hz → 4000Hz over duration)
- **Pitch sweep:** 80Hz → 600Hz over duration
- **Gain:** 0.08 (background tension, not foreground)

### Act 2 — The Drop (single transient, ~75ms)

- **Synth:** White noise burst
- **Filter:** Bandpass centered at 800Hz
- **Timing:** Tier name appears in UI at this exact moment
- **Per-tier variation:**
  - Common/Uncommon: soft, dampened
  - Rare+: sharper, brighter
  - Mythic: sub-bass + high sparkle layered

### Act 3 — The Bloom (tier-specific)

The validated bloom parameters from the v0.1 prototype:

| Tier | Length | Composition |
|---|---|---|
| Common | 0.4s | Single sine chime, C5, light reverb |
| Uncommon | 0.6s | Two-note ascending chime, C5→F5 (perfect 4th) |
| Rare | 1.0s | Major-third chord C5+E5, high sparkle layer |
| Epic | 1.5s | Four-note arpeggio C5→E5→G5→C6, sub-bass pulse |
| Legendary | 3.5s | Four-voice detuned brass fanfare C5→G5→C6 + triangle pad C5+E5+G5 + 55Hz sub drone |
| Mythic | 6.0s | Detuned choral pad (maj-7, ±5 cent shimmer) + deliberate arpeggio (0.5s/note) + filtered noise swell at 3.0s + 41Hz sub drone + C7 sparkle at 5.0s |

Note: Legendary length grew from spec's 2.5s → 3.5s. Mythic grew from 4.0s → 6.0s.
Both still need fatigue validation.

### Act 4 — The Settle (every pull)

- **Molecule tick synth:** Triangle oscillator, 880Hz base
- **Anti-fatigue:** ±2 semitone random pitch variation per tick
- **Spacing:** 55ms between ticks
- **Critical design decision:** Tick count is **decoupled** from molecule
  reward count. Capped at 2–30 ticks regardless of molecules awarded, so
  high-reward tiers (350-molecule Mythic) don't tick for 19 seconds.
- **Tick overlap:** Ticks for Legendary and Mythic begin *during* the bloom
  (Legendary: 2.0s in; Mythic: 3.5s in) so celebration and reward feel
  integrated rather than sequential.
- **Final settle:** 48Hz sub-bass thump when counter completes

---

## Tier roll logic (locked, from v0.1)

Single weighted draw, no pity timer in v0.1. Pity timer returns in v0.3.

| Tier | Weight | Probability | Molecules |
|---|---|---|---|
| Common | 600 | 60.0% | +2 |
| Uncommon | 250 | 25.0% | +6 |
| Rare | 100 | 10.0% | +15 |
| Epic | 40 | 4.0% | +35 |
| Legendary | 9 | 0.9% | +100 |
| Mythic | 1 | 0.1% | +350 |

---

## Sound catalog

Bold = validated in v0.1 prototype. Plain = speculative, needs design pass.

### Pull mechanic
| ID | Description | Status |
|---|---|---|
| **`pull.anticipation`** | **Act 1 sweep, 0.3–1.5s variable** | **Validated** |
| **`pull.drop`** | **Act 2 noise burst, ~75ms** | **Validated** |

### Tier reveals (Act 3 blooms)
| ID | Tier | Status |
|---|---|---|
| **`tier.common`** | **Common, 0.4s** | **Validated** |
| **`tier.uncommon`** | **Uncommon, 0.6s** | **Validated** |
| **`tier.rare`** | **Rare, 1.0s** | **Validated** |
| **`tier.epic`** | **Epic, 1.5s** | **Validated** |
| **`tier.legendary`** | **Legendary, 3.5s** | **Validated** |
| **`tier.mythic`** | **Mythic, 6.0s** | **Validated, length pending refinement** |

### Settle / counter
| ID | Description | Status |
|---|---|---|
| **`molecule.tick`** | **Counter tick w/ ±2 semitone variation** | **Validated** |
| **`molecule.settle`** | **Final 48Hz sub-bass thump** | **Validated** |

### UI / interaction (not yet prototyped)
| ID | Description | Length | Notes |
|---|---|---|---|
| `ui.tap` | Soft button tap | 50ms | Subtle, used for nav |
| `ui.toggle` | Toggle/switch | 80ms | Distinct on/off variants |
| `ui.error` | Soft warning blip | 150ms | Non-aggressive |
| `ui.modal_open` | Whoosh in | 200ms | Spatial, slight reverb |

### Collection / progression (not yet prototyped)
| ID | Description | Length | Notes |
|---|---|---|---|
| `card.flip` | Card flip | 250ms | Paper-card whoosh |
| `card.land` | Card settles into collection | 200ms | Soft thunk |
| `badge.unlock` | Badge earned | 1.2s | Distinct from tier reveals — "achievement" feel |
| `molecule.reservoir_fill` | Reservoir filled celebration | ~6s | Major event, builds and resolves |

### Ambient (not yet prototyped)
| ID | Description | Notes |
|---|---|---|
| `ambient.machine_hum` | Background machine hum, loop | Very low volume, optional |
| `ambient.collection` | Collection screen pad, loop | Calmer, "library" feel |

---

## Implementation notes (from v0.1)

- **Web Audio API via Tone.js**, fully procedural — no sound files.
- **Initialize Tone.js context on first user gesture** (browser autoplay rules).
- **Pre-warm reverb instances at startup** rather than per-pull. Significant
  perceived-latency improvement.
- **`await reverb.ready` before scheduling** any reverbed sound. Tone.js gotcha
  that costs ~30 min of debugging if missed.
- **Pause on tab blur** — see ethics.md.
- **`prefers-reduced-motion`** does NOT auto-mute, but should offer a prompt
  to do so.
- **Volume tiers** to expose in settings: Master, UI, Reveal, Ambient.

---

## Sourcing plan (revised after v0.1)

The v0.1 prototype proved Tone.js procedural audio is sufficient for the
entire pull-reveal loop including Mythic. Original plan ("commission for
Mythic and reservoir-fill") may not be needed.

**Revised plan:**
1. **Tone.js procedural** for all pull-reveal sounds — validated. Carry into v0.3.
2. **CC0 libraries** (Freesound, Pixabay) for UI/foley if procedural feels
   too synthetic for tap/toggle sounds.
3. **Commission optional, not required.** Revisit at v0.8 if a specific event
   (reservoir-fill?) demands hand-crafted treatment.

---

## Haptics (mobile companion to audio)

Designed in early. Not implemented in v0.1 prototype (desktop only).

| Event | Pattern |
|---|---|
| Pull lever | Single sharp tap |
| Common reveal | None |
| Uncommon | Single light tap |
| Rare | Double tap |
| Epic | Three taps, slight delay |
| Legendary | Long pulse + double tap |
| Mythic | Sustained vibration pattern, ~1.5s |
| Badge unlock | Single medium tap |

Vibration API is iOS-limited; degrade gracefully.

---

## Don'ts

- No looping celebration sounds (becomes annoying fast).
- No voice acting / narration.
- No "you lost" sounds. There is no losing.
- No sounds layered over each other for non-stack events (use cancel-and-replace).
- No high-frequency content above ~8kHz at noticeable amplitude.

---

## 📝 Template usage prompt

```
You are helping refine the audio design for "The C8H11NO2 Machine," a self-aware
PWA dopamine machine. The aesthetic is "lab-clinical, not casino" — soft
electronic tones, gentle synths, no harsh transients.

The 4-act pull-reveal structure is VALIDATED (v0.1 prototype) and locked:
Act 1 Anticipation (variable sweep) → Act 2 Drop (noise burst) → Act 3 Bloom
(tier-specific) → Act 4 Settle (decoupled ticks + sub-bass thump).

The specific synth parameters per tier are NOT locked — they are current-best
from v0.1 and subject to refinement. The refinement backlog at the top of
audio-design.md lists what's known-unfinished.

When I describe an event needing sound:
1. Suggest 2–3 distinct sound concepts (describe sonically, not by genre name).
2. Recommend implementation path (Tone.js procedural / CC0 library / commission).
3. If using Tone.js, sketch the synth chain (oscillator type, envelope, effects).
4. Note the length and how it fits within or alongside the 4-act structure.
5. Confirm it satisfies: distinct from neighboring sounds, mute-safe, non-fatiguing.

When I share an existing sound to evaluate:
- Test it against the "lab not casino" principle.
- Check it's distinct from sounds for adjacent tiers.
- Flag if it's too long for an event that may fire dozens of times per session.
- For repeated sounds (>100x/session), verify anti-fatigue variation exists.
```
