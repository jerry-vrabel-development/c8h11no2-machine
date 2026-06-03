# Audio Design — The C8H11NO2 Machine

> **Status:** Draft v0.1
> Sound IS the dopamine. This doc is more important than it looks.

---

## Principles

1. **Every interaction has a sound.** Silence is the absence of reward.
2. **Tier reveals are distinct on a single playthrough.** A user with their eyes closed should be able to tell common from epic.
3. **No harsh sounds.** No nails-on-chalkboard, no clipping, no fatigue-inducing high-end.
4. **Mute-friendly.** Default-on audio, prominent mute toggle, *no* feature requires sound.
5. **Lab-y, not casino-y.** Soft electronic tones, gentle synths, no slot-machine cha-chings.

## Sound catalog

### UI / interaction
| ID | Description | Length | Notes |
|---|---|---|---|
| `ui.tap` | Soft button tap | 50ms | Subtle, used for nav |
| `ui.toggle` | Toggle/switch | 80ms | Distinct on/off variants |
| `ui.error` | Soft warning blip | 150ms | Non-aggressive |
| `ui.modal_open` | Whoosh in | 200ms | Spatial, slight reverb |

### Pull mechanic
| ID | Description | Length | Notes |
|---|---|---|---|
| `pull.lever` | Mechanical pull / click | 400ms | Tactile, satisfying clunk |
| `pull.suspense` | Rising hum | variable | 0.3–1.5s, anticipation |
| `pull.reveal_start` | Whoosh / spin start | 800ms | Tied to reveal animation |

### Tier reveals (each must feel distinct)
| ID | Tier | Length | Vibe |
|---|---|---|---|
| `tier.common` | Common | 400ms | Soft chime, single note |
| `tier.uncommon` | Uncommon | 600ms | Two-note chime, brighter |
| `tier.rare` | Rare | 1.0s | Sustained chord, sparkle layer |
| `tier.epic` | Epic | 1.5s | Big arpeggio, sub-bass pulse |
| `tier.legendary` | Legendary | 2.5s | Fanfare — short brass-synth flourish + sustained pad |
| `tier.mythic` | Mythic | 4–5s | Full event — choral pad, rising arpeggio, final hit |

### Collection / progression
| ID | Description | Length | Notes |
|---|---|---|---|
| `card.flip` | Card flip | 250ms | Paper-card whoosh |
| `card.land` | Card settles into collection | 200ms | Soft thunk |
| `molecule.tick` | Counter tick | 30ms | Plays per N molecules during count-up |
| `molecule.reservoir_fill` | Reservoir filled celebration | 6s | Major event, builds and resolves |
| `badge.unlock` | Badge earned | 1.2s | Distinct from tier reveals — more "achievement" feel |

### Ambient
| ID | Description | Length | Notes |
|---|---|---|---|
| `ambient.machine_hum` | Background machine hum | loop | Very low volume, optional |
| `ambient.collection` | Collection screen pad | loop | Calmer, more "library" feel |

## Implementation

- **Web Audio API**, not `<audio>` tags. Better control over polyphony and latency.
- **Preload all sounds** on first interaction (browsers gate audio on user gesture).
- **Single audio context**, pooled buffer sources for repeated sounds.
- **Volume tiers** in settings:
  - Master
  - UI sounds
  - Reveal sounds
  - Ambient
- **Pause on tab blur** — see ethics.md.
- **`prefers-reduced-motion`** does NOT auto-mute, but offers a prompt to do so.

## Sourcing plan

Three viable paths:
1. **CC0 / Creative Commons libraries** — Freesound, Pixabay, Zapsplat. Free, varied quality, attribution sometimes required.
2. **Commission a sound designer** — small project, ~$500–1500 for full catalog. Best result.
3. **Generate with synths** — Tone.js can produce all UI + tier sounds procedurally. Free, infinitely tweakable, costs dev time.

**Recommendation:** Tone.js for tier reveals (procedural feels more "lab"), CC0 library for UI/foley, commission only for the mythic and reservoir-fill events.

## Haptics (mobile companion to audio)

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

## Don'ts

- No looping celebration sounds (becomes annoying fast).
- No voice acting / narration.
- No "you lost" sounds. There is no losing.
- No sounds layered over each other for non-stack events (use cancel-and-replace).

---

## 📝 Template usage prompt

```
You are helping design audio for "The C8H11NO2 Machine," a self-aware PWA dopamine
machine. The aesthetic is "lab-clinical, not casino" — soft electronic tones, gentle
synths, no harsh transients.

When I describe an event needing sound:
1. Suggest 2–3 distinct sound concepts (describe sonically, not by genre name).
2. Recommend implementation path (Tone.js procedural / CC0 library / commission).
3. If using Tone.js, sketch the synth chain (oscillator type, envelope, effects).
4. Note the length and how it should fit with adjacent sounds in the sequence.
5. Confirm it satisfies: distinct from neighboring sounds, mute-safe, non-fatiguing.

When I share an existing sound to evaluate:
- Test it against the "lab not casino" principle.
- Check it's distinct from sounds for adjacent tiers.
- Flag if it's too long for an event that may fire dozens of times per session.
```
