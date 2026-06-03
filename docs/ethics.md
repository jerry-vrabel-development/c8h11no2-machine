# Ethics & Self-Awareness — The C8H11NO2 Machine

> **Status:** Draft v0.1
> The joke only lands if we're actually thoughtful. This doc draws the line.

---

## The core tension

This app uses real psychological manipulation patterns (variable-ratio reinforcement, near-misses, collection completion drive) for entertainment. That's fine *if* and *only if*:

1. There's nothing real to lose.
2. The user is in on the joke.
3. We do not deploy the patterns at full intensity.
4. We make it easy to stop and trivial to ignore.

If we drift from any of these, we stop being satire and become the thing we're satirizing.

## Hard "nevers"

- **No real money.** Ever. Not for cosmetics, not for pulls, not for cloud sync, not for a "thank you" tip jar. Removes the whole gambling-adjacency question.
- **No FOMO mechanics.** No expiring content, no daily streak penalties, no "you missed it" messaging.
- **No social pressure mechanics.** No friend leaderboards that humiliate, no "X friends just pulled — did you?"
- **No dark-pattern notifications.** Default OFF. If we add them, the *content* of the notification mocks the act of sending it.
- **No personalized addiction optimization.** No tuning drop rates based on individual user behavior to maximize engagement.
- **No data sales.** We don't have an ad model. We don't need data.

## Active protections we ship

- **Transparency mode** — a toggle that shows the actual RNG roll, the actual drop rates, and the actual pity timer state. Available from day one.
- **Compulsion badge** — awarded for 50 pulls in an hour. Comes with a gentle in-app note: "Hey — this is on purpose. You good?" Never blocks play.
- **Restraint badge** — positively reinforces waiting 24h between pulls. The *good* badge.
- **Session reminders** (opt-in) — "You've been pulling for 20 minutes. Want a break?" User-configurable.
- **One-tap reset** — wipe all progress, no recovery, no guilt-tripping.
- **No background sounds when tabbed away.** Audio pauses when the PWA loses focus.
- **Loud "this is satire" framing** in the about page, install prompt, and first-run experience.

## Self-awareness as a design tool

The app should *show its work*. Examples:

- Stats page brags about "Dopamine dispensed today: 47 hits" — honest, slightly ominous, ultimately funny.
- The Compulsion badge description: *"You earned this. We also feel a little bad about awarding it."*
- The first-run intro acknowledges the manipulation directly before any pull happens.
- Reservoir-fill celebration includes a wink: *"The reservoir is full. Your brain is also tired. Both can be true."*

## Gray areas we should decide on

- **Push notifications, even satirical?** Soft-no for v1. Push is the most weaponizable surface. If we ever add them, content must be self-aware and they default off.
- **Daily login bonus?** No — even a "free daily pull" creates the obligation we're trying to avoid. Use cooldown / stockpile instead.
- **Sharing screenshots?** Yes — easy to share a card. No virality mechanics ("share to get a free pull").
- **Sound on autoplay?** No. Muted by default; one tap to enable.

## What "user in on the joke" actually requires

Before any persuasion mechanic ships, ask:

1. Does a casual user, looking at this for 30 seconds, understand it's satire?
2. If they didn't understand, would they feel deceived?
3. Is the mechanic harmful even if they *do* get the joke (e.g., still wastes meaningful time)?

If the answer to #1 is no, add framing. If #2 is yes, redesign. If #3 is yes, cut.

## Review cadence

- Re-read this doc before adding any new persuasion mechanic.
- Annual "would we still ship this?" review of all live mechanics.
- If a user reports the app made them feel bad — investigate. One report is signal.

---

## 📝 Template usage prompt

```
You are reviewing a proposed feature for "The C8H11NO2 Machine" against the project's
ethics doc. The app is a self-aware satire of dopamine-driven engagement loops.

Hard rules that cannot be violated:
- No real money
- No FOMO / loss aversion
- No dark-pattern notifications
- No data sales
- Transparency mode must always work
- Reset must always work

When I share a proposed feature:
1. Identify which (if any) hard rules it touches.
2. Identify which protections it stresses or weakens.
3. Ask: would a casual user, in 30 seconds, understand this is satire? If no, redesign.
4. Suggest the smallest possible change that preserves the design intent and ethics.
5. If the feature can't be salvaged ethically, say so plainly. Don't try to rescue it.

Bias toward cutting features. The product is small on purpose.
```
