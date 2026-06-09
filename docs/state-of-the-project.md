# State of the Project — The C8H11NO2 Machine

> **Status:** Living snapshot. Updated periodically as a "where are we / where are we going" doc.
> **Last updated:** _fill in date_
> **Purpose:** Read this when you come back after a week away, or when you need to explain the project to someone in 5 minutes.

---

## What we're building, in one paragraph

The C8H11NO2 Machine is a self-aware Progressive Web App that satirizes and
celebrates variable-ratio reinforcement. Users pull a slot/loot mechanism to
collect pixel-art creatures themed to the atoms in the dopamine molecule —
Carbon, Hydrogen, Nitrogen, Oxygen, and the molecule itself as Mythic tier.
Dopamine molecules are the currency; 10,000 fills a reservoir. The satire only
works because we genuinely uphold strong ethical constraints: no real money,
no FOMO mechanics, no dark-pattern notifications, transparency mode showing
real RNG, and a "Compulsion" badge that comes with a gentle note of concern.

## Where we are right now

**v0.1 audio spike complete.** A throwaway Vite + TypeScript + Tone.js
prototype proved the 4-act pull-reveal audio loop (anticipation → drop →
bloom → settle) can feel compelling with fully procedural sound, no audio
files. All six tier reveals were built, the anti-fatigue molecule tick
(±2 semitone variation) was validated as a baseline pattern, and key
implementation gotchas were captured.

The audio is **updated, not locked.** Refinement backlog is documented at
the top of audio-design.md. The project is moving forward with audio as
known-pending refinement rather than blocking on full validation.

**Where we're heading next:** v0.3 — Mechanics Complete. Establishing the
architectural foundation the rest of the project will build on. Deliberately
uglier and simpler than the original roadmap suggested — proves the data
flow end-to-end without trying to polish every system.

---

## Decisions made so far

### Locked (in decisions.md)

- **Five card families** map to the atoms in C₈H₁₁NO₂ (C, H, N, O, plus
  Dopamine as Mythic-only)
- **No real money, ever.** Hard rule, non-negotiable.
- **v1.5 game layer** is planned (Medium-weight, Marvel Snap-adjacent depth),
  not v1.0. Card stat blocks designed in now to avoid retrofit later.
- **Audio updated not locked** — v0.1 prototype values documented, refinement
  deferred to post-v0.3.

### Pending (open issues / decision docs)

- **Pull economy** — recommendation: Option C (stockpile + force-pull). Not
  yet formally locked.
- **Visual aesthetic** — recommendation: retro-lab. Not yet formally locked.
- **Pixel art sourcing** — decision made: AI-assisted prototype (Phase 1)
  → commission artist editions (Phase 2). Needs formal logging.
- **Tone.js vs commissioned audio** — effectively decided by v0.1 (procedural
  is sufficient). Commission optional.
- **React vs Solid** — pending; default React unless reason to switch.
- **Auth strategy** — three versions documented in auth-strategy.md. Default
  plan: Version B (no-identity cloud sync) at v0.8.

### GitHub issues created

5 open issues from earlier in the design phase, plus implied issues from the
auth doc and pixel-art-sourcing decision. Worth a triage pass before v0.3.

---

## The full roadmap (current view)

- **v0.1 — Audio spike** ✅ complete
- **v0.3 — Mechanics complete** ← currently scoping
- **v0.5 — Feature-complete alpha** — all systems present, polish low
- **v0.8 — Polish + PWA + (likely) Version B auth**
- **v1.0 — Public launch**
- **v1.5 — Game layer** (planned, not committed until v1.0 ships)
- **Post-v1.5** — speculative (artist editions program, expansion sets, etc.)

---

## Satellite efforts

The app is the core deliverable, but two other workstreams are running
alongside it. These are *parked in separate handoff docs* so they don't
contaminate strategy conversations about the app itself.

### "Dopamine Development" — the book

**Status:** Parked. Handoff prompt ready in `docs/book-concept-handoff.md`.

**What it is:** A book project that uses the C8H11NO2 Machine build as a
running case study about designing engagement loops ethically. Working
thesis: *"Build it honest"* — a practical guide that fills the gap between
manipulation guides (Hooked) and moral hand-wringing (Stolen Focus).

**Strategy:** Three-part structure (The Patterns / The Build / The Framework).
Dev-log writing starts during app development to capture raw material; book
proposal goes out only after v1.0 ships.

**Why it matters to the app:** The book provides credibility with a broader
audience (operators, founders, designers, journalists) that the shipped app
alone wouldn't reach. The two reinforce each other — book gives the app
context, app gives the book proof.

**Current next step:** Open the book-concept-handoff prompt in a separate
conversation when ready to engage a publishing strategist role. Not yet done.

### Social / dev-log presence

**Status:** Not yet established. Discussed but not designed.

**What's implied by the book strategy:** A Substack, blog, or similar venue
where the build gets documented in public. This becomes:
- A built-in audience for app launch
- Raw material for book chapters
- Distribution proof for publishers
- A forcing function for articulating thinking clearly

**Open questions (not yet addressed in any doc):**
- Substack vs personal blog vs Twitter/X thread vs all three?
- Cadence: weekly post? Per-milestone post? Per-decision post?
- Naming: "Dopamine Development" as the venue name, or distinct from book title?
- When to start: now (during v0.3) or at v0.5 when there's more to show?
- What does post #1 actually say?

**Recommendation:** This deserves its own scoping conversation soon — probably
right after we finish scoping v0.3. The dev-log strategy is part of the book
strategy, which is part of the credibility strategy. Worth thinking through
deliberately rather than starting reactively.

---

## What's missing / not yet addressed

Honest list of things this project doesn't yet have an answer for:

- **Domain name** — no domain registered yet
- **Hosting decision** — Cloudflare Pages, Netlify, Vercel all candidates
- **License** — README says "TBD (probably MIT)"
- **Privacy policy / about page content** — needed before public launch
- **Analytics strategy** — defaults to none; needs explicit decision before
  launch ("we collect nothing" is itself a position worth stating publicly)
- **Launch strategy** — where to announce (HN, Reddit, Twitter, dev-log
  subscribers)? Timing? Pre-launch list?
- **Trademark / IP** — "C8H11NO2 Machine" as a project name is presumably
  fine but unverified
- **Pixel art commission contracts** — Phase 2 of sourcing plan needs
  template agreements before approaching artists

---

## Health check — how the project actually feels

A periodic gut-check section. Update honestly each time.

**As of this snapshot:**
- Design phase is mature; documentation is solid
- v0.1 audio spike validated the core hypothesis
- Architecture is unwritten but conceptually clear
- Scope is well-managed; not feeling overwhelmed
- Ethics framing is holding under pressure
- Energy is sustainable — no burnout signals

**Watch for:**
- v0.3 is genuinely bigger than v0.1; risk of scope creep is real
- Book / dev-log strategy could pull focus from app shipping if not
  carefully managed
- Auth decision at v0.5/v0.8 needs to actually happen, not drift
- Outside ears on audio still owed (post-v0.3 listening sessions)

---

## How to use this doc

- **Update after each milestone.** v0.3 ships? Update.
- **Update when a major decision is made.** Auth chosen? Update.
- **Read this first when returning to the project after a break.**
- **Share this with anyone you want to bring up to speed quickly.**
- **Don't let it get out of sync with reality.** A stale snapshot is
  worse than no snapshot.
