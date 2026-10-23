# Art Plan & Card Game Path — The C8H11NO2 Machine

> **Status:** Draft v0.1 — proposed, parked until Quest Log matures
> **Last updated:** 2026-10-23
> **Purpose:** How the creatures get art without art blocking the project, and how the
> v1.5 game layer can ship first as a physical card game. Read alongside
> [`game-design-future.md`](game-design-future.md), [`card-bible.md`](card-bible.md)
> and [`visual-style.md`](visual-style.md).

---

## The problem

Art is the blocker. 33 creatures (plus editions) need illustrations, and doing that right
means finding the right artist, paying them fairly, and rewarding them as the project
succeeds. Commissioning everything up front, before anyone has played the game, is the
most expensive way to find out whether the game is fun.

## Principles

1. **Art never blocks play.** The game must be testable with no illustrations at all.
2. **Artists are partners, not vendors.** Fair upfront pay, credit on every card, and a
   share of what their work earns.
3. **Pay from proven demand.** Big art spend comes after people are buying and playing.
4. **AI imagery is prototype-only.** Matches the existing sourcing decision (AI-assisted
   Phase 1, commissioned Phase 2). Nothing AI-generated ships in a sold product.

## Phased plan

### Phase 0 — Art-free playtest deck (no artist needed)

- Each card shows a **procedurally drawn molecule/atom diagram** (orbitals, bonds,
  family color + shape) generated in code from the creature's data. It fits the
  retro-lab look and gives every card a distinct face for free.
- Card frame, stats (Cost / Stability / Reactivity / Mass / Charm), keyword, flavor text.
- Printed at home; played with friends. Goal: **is the game fun?**
- Engineering side: a TypeScript **rules engine + heuristic AI**, used to simulate
  thousands of matches and find broken cards before humans do. The same engine later
  powers the in-app v1.5 game, so nothing is throwaway.

### Phase 1 — Print-and-play release

- Sell a PDF on itch.io, Etsy and Gumroad (no inventory, no shipping).
- Still art-free (Phase 0 look), or with a small number of commissioned hero pieces.
- Goal: **will people pay for it?** Revenue from here funds Phase 2.

### Phase 2 — Commissioned art, artist partnership

- Start small: commission the **two Mythics or the five family "parents"** first.
- Expand to the full set as revenue allows.
- Holo / Gold **artist editions** (already on the roadmap): named artist, their credit
  on the card, and a royalty on that edition.

### Phase 3 — Print-on-demand physical decks

- The Game Crafter or DriveThruCards print and ship each order. Still no inventory.

### Optional, any phase — the designer paints

Jerry paints. The creatures don't have to be pixel art; a painted set (or just the
Mythics) by the game's designer is a story in itself. Revisit `visual-style.md` if so.

---

## Finding an artist

**Where to look**
- itch.io (asset creators), ArtStation, Bluesky and Instagram art tags
- r/HungryArtists and r/gameDevClassifieds (posting a paid job, not asking for free work)
- Local: art schools and Chicago-area illustrators

**What to look for**
- A portfolio that already has *small, characterful creatures* with readable silhouettes
- Clear published rates or a commissions page (signals a professional)
- Experience with sets or consistent series, not just one-off pieces
- Comfortable with a card-game format and print resolution

**Red flags**
- Portfolio that looks AI-generated, or no process work at all
- Unwilling to put terms in writing

## Paying and rewarding the artist

Options, from simplest to most generous:

| Model | Upfront | Ongoing | Notes |
|---|---|---|---|
| Flat fee per piece | Full price | None | Simple; artist doesn't share in success |
| Fee + royalty | Full or slightly reduced | % of sales of products using their art | Fair default; rewards success |
| Artist edition | Fee for the edition | Royalty on that edition only | Fits the existing editions program |

Always: **credit on every card** that uses their work, name in the rulebook and on the
store page, and a free copy of everything.

Rights to settle in writing (worth a review by someone qualified before signing; this is
not legal advice): license vs ownership, which products and formats, print and digital,
exclusivity, and what happens if the project ends.

## Artist brief (template)

> **Project:** The C8H11NO2 Machine — a small, honest collecting game and card game
> themed on the atoms of the dopamine molecule (Carbon, Hydrogen, Nitrogen, Oxygen,
> and Dopamine itself as Mythic).
> **Look:** "Retro-lab": playful creatures presented in a clean lab frame. See
> `visual-style.md`. Open to the artist's own style.
> **First scope:** [2 Mythics / 5 family parents], one illustration each, card format
> [size], print-ready at 300 dpi, plus a web-size export.
> **Example creature:** C-01 Graphyte — a small, shy hexagonal flake, graphite gray with
> a pencil-like sheen. (Full entries in `card-bible.md`.)
> **Pay:** [fee] per piece + [x]% of sales of products using the art, credit on every card.
> **Timeline:** [dates]. Indie project; flexible, honest communication.

## Pitch message (template)

> Hi [name], I'm Jerry, a developer building The C8H11NO2 Machine, a small card and
> collecting game about the atoms in dopamine. Your [specific piece] is exactly the kind
> of characterful creature I'm hoping for. I'd like to commission [scope] as a paid
> start, with credit on every card and a share of sales if the game takes off. Are you
> open to commissions? Happy to send the brief and creature descriptions.

---

## Open questions

- Pixel art, painted, or the artist's own style? (Affects who we pitch.)
- First commission: Mythics (chase cards, most impact) or family parents (most cards)?
- Royalty percentage and how it's tracked and paid.
- Does the card game ship in this repo or a sibling repo?

---

## 📝 Template usage prompt

```
You are helping with the art plan for "The C8H11NO2 Machine." Read docs/art-plan.md,
docs/card-bible.md and docs/visual-style.md first. Principles: art never blocks play;
artists are partners (fair pay, credit, a share of success); big art spend only after
demand is proven; AI imagery is prototype-only. Help me with: [finding artists / writing
a brief / drafting a pitch / comparing payment models / Phase 0 procedural card art].
```
