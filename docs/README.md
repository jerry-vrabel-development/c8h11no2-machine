# The C8H11NO2 Machine

> A self-aware PWA dopamine machine. Pull the lever, collect pixel-art creatures themed to the atoms of the dopamine molecule, fill the reservoir. Honest about being a Skinner box.

**Status:** Pre-development — design docs in progress.

## What is this?

`C₈H₁₁NO₂` is the molecular formula for dopamine. This app is a slot/loot-box mechanic dressed up as a chemistry lab, where each pull yields a pixel-art creature themed to one of the atoms — Carbon, Hydrogen, Nitrogen, Oxygen — or, occasionally, the full molecule itself (Mythic tier).

Currency is **dopamine molecules**. Collect 10,000 to fill the reservoir. Multiple editions per creature. Badges for both compulsion and restraint.

## Design philosophy

The mechanic is the satire. We use real variable-ratio reinforcement patterns *and* show the user the strings. No money changes hands. No FOMO. Reset is one tap away. See [`docs/ethics.md`](docs/ethics.md) for the line.

## Documentation index

All planning lives in [`docs/`](docs/):

| Doc | Purpose |
|---|---|
| [PRD.md](docs/PRD.md) | What we're building and why |
| [GDD.md](docs/GDD.md) | Mechanics, drop rates, economy |
| [card-bible.md](docs/card-bible.md) | Every creature, every edition |
| [ethics.md](docs/ethics.md) | What we will and won't do |
| [visual-style.md](docs/visual-style.md) | Palette, typography, motion |
| [audio-design.md](docs/audio-design.md) | Sound catalog & sourcing |
| [wireframes.md](docs/wireframes.md) | Screens and IA |
| [tech-spec.md](docs/tech-spec.md) | Stack, architecture, data model |
| [roadmap.md](docs/roadmap.md) | Milestones and anti-roadmap |
| [decisions.md](docs/decisions.md) | Running log of design decisions |

Each doc includes a **template usage prompt** at the bottom for working on it with an AI assistant.

## Development

Not yet — design phase. Stack will be Vite + React + TypeScript + IndexedDB. See [tech-spec.md](docs/tech-spec.md).

## License

TBD (probably MIT).
