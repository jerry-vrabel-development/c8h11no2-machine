# Auth Strategy — The C8H11NO2 Machine

> **Status:** Decision pending
> **Owner:** _you_
> **Decide by:** v0.5 (auth choice affects v0.8 architecture; v0.3 and v0.5 stay local-only regardless)

---

## Why this doc exists

The original PRD assumed no account system. Local-first state in IndexedDB,
per-device, no backend. That's still a valid choice — but it has real downsides
that grow as the project matures:

- Users lose everything when they get a new phone
- No cross-device play (phone + desktop)
- No foundation for future features that might want identity
- "I got a Mythic" sharing is harder without persistent identity

This doc lays out three credible versions of auth and the trade-offs of each,
so the decision can be made deliberately rather than drifted into.

---

## The three versions

### Version A — No auth, ever

**What it is:** Pure local-first. IndexedDB on each device. Export/import as
JSON for manual portability. Sharing happens via screenshots and shareable
card images.

**Pros:**
- Zero infrastructure cost
- Zero privacy surface area
- Zero login friction
- Fits the ethics framing perfectly ("no data we don't need")
- Forever-simple to maintain solo
- Aligns with current PRD scope

**Cons:**
- Users lose everything on device loss or reinstall
- No cross-device play
- No path to future features that genuinely need identity
- Export/import is a poor UX for "casual restore from new phone"

**Cost:** ~0 dollars, ~0 maintenance, ~1 evening to add export/import

**Trigger to choose this:** If the project remains personal-scale forever, or
if any backend dependency feels like betraying the project's principles.

---

### Version B — Optional cloud sync, no identity

**What it is:** "Backup code" model. User generates a recovery code (e.g., a
12-word phrase or a long random string). The app uploads encrypted state to
a blob store keyed by that code. On a new device, paste the code to restore.
No email, no password, no account, no PII.

**Implementation sketch:**
- Cloudflare R2 or Backblaze B2 for storage (~free at this scale)
- Cloudflare Workers for the upload/download API (~free tier)
- Client encrypts state with a key derived from the recovery code
- Server stores only opaque blobs; cannot read user data
- Sync is opt-in, post-engagement (e.g., offered after first reservoir fill)

**Pros:**
- Solves the lose-your-phone problem
- Enables cross-device play
- Zero login friction at first-run (sync is opt-in, not required)
- No PII, no GDPR concern, no email-list responsibility
- Backend stays trivial (a single blob store + auth-by-code)
- Aligns with ethics framing — no identifying data collected
- Preserves option to upgrade to Version C later without breaking users
- Strong "show your friend" story without account creation friction

**Cons:**
- Lost recovery code = lost data forever (no email-recovery path)
- Some minor backend infrastructure to maintain
- Encryption-at-rest decisions add complexity to implementation
- Cloud sync is fundamentally network-dependent for those who opt in

**Cost:** ~$0-10/month at small scale, ~1-2 weeks to build, ongoing
maintenance ~1 hour/month

**Trigger to choose this:** Project ships publicly, users start treating their
collection as something they care about preserving.

---

### Version C — Real accounts

**What it is:** Email + password (or magic link, or OAuth via Google/Apple).
Backend user records. Cross-device sync. Foundation for any future feature
that needs persistent identity (trading, leaderboards, social).

**Implementation sketch:**
- Auth provider (Clerk, Supabase Auth, or roll-your-own with magic links)
- User database (Postgres or SQLite)
- API layer for state sync
- Password reset / account recovery flows
- GDPR / privacy policy / terms of service
- Account deletion flow

**Pros:**
- The "real app" experience users expect from anything they invest time in
- Foundation for any future identity-dependent feature
- Standard recovery flows (forgot password, change email)
- Easier to add social features later if the anti-roadmap ever changes

**Cons:**
- Login friction at first-run (huge drop-off risk for "just pull the lever")
- PII collection requires privacy policy, terms, possibly GDPR compliance
- Real security responsibility (breaches, password resets, account recovery)
- Ongoing infrastructure cost
- Significant architectural commitment
- Tension with ethics framing — collecting data we don't strictly need
- Maintenance burden grows non-linearly with user count

**Cost:** ~$20-100/month at small scale, ~3-6 weeks to build well,
ongoing maintenance ~5-10 hours/month minimum

**Trigger to choose this:** A specific feature genuinely requires identity
(trading between specific users, friend leaderboards, etc.) — and crucially,
most such features are already in the anti-roadmap. So this trigger is
unlikely to fire honestly.

---

## Honest comparison

| Dimension | A — No auth | B — No-identity sync | C — Real accounts |
|---|---|---|---|
| First-run friction | None | None (opt-in later) | Significant |
| Lose-phone protection | Manual export only | Yes, with code | Yes |
| Cross-device | No | Yes | Yes |
| Privacy posture | Perfect | Excellent | Standard-acceptable |
| Infrastructure | None | Trivial | Real |
| Ethics doc fit | Perfect | Excellent | Tension |
| Cost to build | ~1 evening | 1-2 weeks | 3-6 weeks |
| Cost to maintain | ~0 | ~1 hr/month | ~5-10 hr/month |
| Foundation for future | None | Some | Maximum |
| Reversibility | Easy → B or C | Easy → C | Hard to undo |

---

## Recommendation (for decision-time discussion)

**Default plan: Version B at v0.8.**

The reasoning:
- Version A leaves real users in a bad spot when they replace devices, and
  that pain compounds as the project matures
- Version C is over-engineered for a project whose ethical framing
  deliberately avoids identity-dependent features
- Version B threads the needle: solves the real pain (data loss), enables
  the obvious benefit (cross-device), and preserves the ethical posture
  (no identity, no PII)

Ship local-only through v0.5. Add Version B sync in v0.8 alongside the PWA
install polish, when the product is real enough that losing data hurts.

Treat the "would we ever want Version C" question as **revisit only when a
specific feature genuinely requires it.** Don't speculatively build for it.

---

## Open questions if Version B is chosen

- **Recovery code format:** 12-word BIP39 phrase (familiar to crypto users,
  weird to others) or random alphanumeric (less familiar but more neutral)?
- **Encryption scheme:** Client-side encryption with key derived from code,
  or server-side encryption with code as auth token?
- **Sync trigger:** Auto-sync on every change (chatty) or sync on
  natural boundaries (badge unlock, reservoir fill, app close)?
- **Conflict resolution:** Last-write-wins (simple, occasional data loss) or
  merge (complex, no data loss)? Probably last-write-wins given the data
  shape — collection state is mostly append-only.
- **Backup code storage UX:** How do we get users to actually save the code?
  This is the hardest UX problem of Version B.
- **What about the dev-log audience?** If readers want to try the app and
  cross-device-sync, does opt-in sync make sense as part of v1.0 launch
  rather than v0.8 polish?

---

## Decision triggers

Revisit this doc when any of these happen:

- v0.5 is complete and we're planning v0.8
- A user requests cross-device sync before v0.8
- The book/dev-log audience grows large enough that data-loss complaints
  would damage the project's reputation
- A feature is proposed that genuinely requires identity (and isn't in the
  anti-roadmap)

---

## 📝 Template usage prompt

```
You are helping refine the auth strategy for "The C8H11NO2 Machine," a
privacy-respecting PWA dopamine machine with strong ethical constraints
(no real money, no PII collection unless necessary, no dark patterns).

Three auth versions are on the table (full detail in auth-strategy.md):
- Version A: No auth, ever. Pure local-first.
- Version B: Optional cloud sync, no identity (recovery code model).
- Version C: Real accounts (email/password or OAuth).

Default plan is Version B at v0.8. v0.3 and v0.5 stay local-only.

When I share a question or a feature proposal:
1. Identify which version(s) it implies or requires.
2. Flag if it pushes toward Version C — and whether that push is justified
   by a real feature need or just speculative future-proofing.
3. Check it against the ethics doc — does it collect data we don't need?
4. Estimate the smallest implementation that solves the user's actual problem.
5. If you think we should change the default plan, say so plainly.

Bias toward Version B. Be skeptical of Version C suggestions unless backed
by a specific feature requirement. Be skeptical of Version A if it leaves
real users in genuine pain.
```
