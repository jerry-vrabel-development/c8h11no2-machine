// ─────────────────────────────────────────────
//  C8H11NO2 Machine — audio.ts
//  Step 5: All 6 tier blooms + Acts 1/2/4
// ─────────────────────────────────────────────

import * as Tone from 'tone';

// ── State ─────────────────────────────────────
let _ready = false;

// ── Init ──────────────────────────────────────
export async function initAudio(): Promise<void> {
  if (_ready) return;
  await Tone.start();
  _ready = true;
}

export function isAudioReady(): boolean {
  return _ready;
}

// ── Pause / resume ────────────────────────────
export function pauseAudio(): void {
  if (_ready) {
    const raw = Tone.getContext().rawContext as AudioContext;
    void raw.suspend();
  }
}

export function resumeAudio(): void {
  if (_ready) void Tone.getContext().resume();
}

// ── Utilities ─────────────────────────────────
function semisToRatio(semitones: number): number {
  return Math.pow(2, semitones / 12);
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function anticipationDuration(): number {
  return Math.random() < 0.7
    ? rand(0.3, 0.6)
    : rand(0.6, 1.5);
}

/** Schedule a single sine note. Returns array of nodes for cleanup. */
function scheduleNote(
  freq: number,
  gainVal: number,
  attackTime: number,
  decayTime: number,
  sustainTime: number,
  startT: number,
  reverb: Tone.Reverb,
  detuneCents = 0,
): Tone.ToneAudioNode[] {
  const env = new Tone.AmplitudeEnvelope({
    attack:  attackTime,
    decay:   decayTime,
    sustain: 0,
    release: 0.05,
  }).connect(reverb);

  const gain = new Tone.Gain(gainVal).connect(env);
  const osc  = new Tone.Oscillator({
    type:      'sine',
    frequency: freq,
    detune:    detuneCents,
  }).connect(gain);

  const dur = attackTime + sustainTime;
  env.triggerAttackRelease(dur, startT);
  osc.start(startT).stop(startT + dur + 0.15);

  return [osc, gain, env];
}

/** Schedule a sawtooth note (for brass). Returns nodes for cleanup. */
function scheduleSawNote(
  freq: number,
  gainVal: number,
  attackTime: number,
  decayTime: number,
  sustainTime: number,
  startT: number,
  reverb: Tone.Reverb,
  detuneCents = 0,
): Tone.ToneAudioNode[] {
  const env = new Tone.AmplitudeEnvelope({
    attack:  attackTime,
    decay:   decayTime,
    sustain: 0.3,
    release: 0.1,
  }).connect(reverb);

  const gain = new Tone.Gain(gainVal).connect(env);
  const osc  = new Tone.Oscillator({
    type:      'sawtooth',
    frequency: freq,
    detune:    detuneCents,
  }).connect(gain);

  const dur = attackTime + sustainTime;
  env.triggerAttackRelease(dur, startT);
  osc.start(startT).stop(startT + dur + 0.2);

  return [osc, gain, env];
}

/** Dispose an array of nodes safely. */
function disposeAll(nodes: Tone.ToneAudioNode[]): void {
  for (const n of nodes) {
    try { n.dispose(); } catch (_) { /* already gone */ }
  }
}

/** Wrap a scheduled bloom in a Promise that resolves after durationMs. */
function bloomPromise(
  durationMs: number,
  schedule: (reverb: Tone.Reverb) => Tone.ToneAudioNode[],
  reverbOptions: Partial<Tone.ReverbOptions>,
): Promise<void> {
  return new Promise(async (resolve) => {
    if (!_ready) { resolve(); return; }

    const reverb = new Tone.Reverb(reverbOptions).toDestination();
    await reverb.ready;

    const nodes = schedule(reverb);

    setTimeout(() => {
      disposeAll(nodes);
      try { reverb.dispose(); } catch (_) { /* gone */ }
      resolve();
    }, durationMs);
  });
}

// ─────────────────────────────────────────────
//  ACT 1 — Anticipation + ACT 2 — Drop
// ─────────────────────────────────────────────

export function playAnticipationAndDrop(fixedDuration?: number): Promise<void> {
  return new Promise((resolve) => {
    if (!_ready) { resolve(); return; }

    const duration = fixedDuration ?? anticipationDuration();
    const now      = Tone.now() + 0.02;
    const dropT    = now + duration;

    const filter  = new Tone.Filter({ type: 'lowpass', frequency: 200, rolloff: -24 }).toDestination();
    const antGain = new Tone.Gain(0.08).connect(filter);
    const antOsc  = new Tone.Oscillator({ type: 'sawtooth', frequency: 80 }).connect(antGain);

    antOsc.frequency.setValueAtTime(80, now);
    antOsc.frequency.exponentialRampToValueAtTime(600, dropT);
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(4000, dropT);
    antOsc.start(now).stop(dropT);

    const dropFilter = new Tone.Filter({ type: 'bandpass', frequency: 800, Q: 1.2 }).toDestination();
    const dropEnv    = new Tone.AmplitudeEnvelope({ attack: 0.001, decay: 0.06, sustain: 0, release: 0.01 }).connect(dropFilter);
    const dropGain   = new Tone.Gain(0.15).connect(dropEnv);
    const dropNoise  = new Tone.Noise('white').connect(dropGain);

    dropEnv.triggerAttackRelease(0.065, dropT);
    dropNoise.start(dropT).stop(dropT + 0.1);

    setTimeout(() => {
      try { antOsc.dispose(); }     catch (_) { /* gone */ }
      try { antGain.dispose(); }    catch (_) { /* gone */ }
      try { filter.dispose(); }     catch (_) { /* gone */ }
      try { dropNoise.dispose(); }  catch (_) { /* gone */ }
      try { dropGain.dispose(); }   catch (_) { /* gone */ }
      try { dropEnv.dispose(); }    catch (_) { /* gone */ }
      try { dropFilter.dispose(); } catch (_) { /* gone */ }
      resolve();
    }, (duration + 0.15) * 1000);
  });
}

// ─────────────────────────────────────────────
//  ACT 3 — Blooms
// ─────────────────────────────────────────────

// ── Common ─ 0.4s ─ single soft chime ─────────
//  sine C5 (523Hz), reverb decay 0.8s wet 0.25
export async function playBloomCommon(): Promise<void> {
  return bloomPromise(
    420,
    (reverb) => scheduleNote(523, 0.18, 0.008, 0.35, 0.28, Tone.now() + 0.02, reverb),
    { decay: 0.8, preDelay: 0.01, wet: 0.25 },
  );
}

// ── Uncommon ─ 0.6s ─ two-note ascending chime ─
//  C5 then F5 (perfect 4th), 0.15s apart
export async function playBloomUncommon(): Promise<void> {
  return bloomPromise(
    650,
    (reverb) => {
      const now   = Tone.now() + 0.02;
      const nodes: Tone.ToneAudioNode[] = [];
      nodes.push(...scheduleNote(523, 0.20, 0.008, 0.30, 0.20, now,        reverb));
      nodes.push(...scheduleNote(698, 0.20, 0.008, 0.30, 0.20, now + 0.15, reverb));
      return nodes;
    },
    { decay: 0.8, preDelay: 0.01, wet: 0.25 },
  );
}

// ── Rare ─ 1.0s ─ major-third chord + sparkle ──
//  C5+E5 simultaneously, C7 sparkle at onset
export async function playBloomRare(): Promise<void> {
  return bloomPromise(
    1050,
    (reverb) => {
      const now   = Tone.now() + 0.02;
      const nodes: Tone.ToneAudioNode[] = [];
      // Major third chord
      nodes.push(...scheduleNote(523, 0.20, 0.010, 0.55, 0.35, now, reverb));
      nodes.push(...scheduleNote(659, 0.20, 0.010, 0.55, 0.35, now, reverb));
      // Sparkle: high C7, very brief
      nodes.push(...scheduleNote(2093, 0.08, 0.001, 0.09, 0.05, now + 0.01, reverb));
      return nodes;
    },
    { decay: 1.2, preDelay: 0.01, wet: 0.30 },
  );
}

// ── Epic ─ 1.5s ─ arpeggio + sub pulse ─────────
//  C5→E5→G5→C6, notes 0.2s apart, slight detune
//  sub-bass pulse at onset
export async function playBloomEpic(): Promise<void> {
  return bloomPromise(
    1550,
    (reverb) => {
      const now   = Tone.now() + 0.02;
      const nodes: Tone.ToneAudioNode[] = [];

      const arpFreqs   = [523, 659, 784, 1047];
      const arpDetunes = [3, -3, 2, -2];  // slight detune per note
      arpFreqs.forEach((freq, i) => {
        nodes.push(...scheduleNote(
          freq, 0.18, 0.008, 0.30, 0.20,
          now + i * 0.2, reverb,
          arpDetunes[i] ?? 0,
        ));
      });

      // Sub-bass pulse
      const subEnv  = new Tone.AmplitudeEnvelope({ attack: 0.001, decay: 0.30, sustain: 0, release: 0.05 }).toDestination();
      const subGain = new Tone.Gain(0.35).connect(subEnv);
      const subOsc  = new Tone.Oscillator({ type: 'sine', frequency: 55 }).connect(subGain);
      subEnv.triggerAttackRelease(0.30, now);
      subOsc.start(now).stop(now + 0.45);
      nodes.push(subOsc, subGain, subEnv);

      return nodes;
    },
    { decay: 1.4, preDelay: 0.01, wet: 0.35 },
  );
}

// ── Legendary ─ 3.5s ─ thick brass fanfare + pad + sub drone ──
//  Brass : C5→G5→C6, four saw voices per note (±8, ±12 cents)
//  Pad   : C5+E5+G5, triangle, slow attack, long decay
//  Sub   : 55Hz triangle, fades in over 0.6s
//  Ticks overlap at 2.0s
export async function playBloomLegendary(): Promise<void> {
  return bloomPromise(
    3550,
    (reverb) => {
      const now   = Tone.now() + 0.02;
      const nodes: Tone.ToneAudioNode[] = [];

      // Brass fanfare: four detuned saw voices per note
      const fanfareNotes = [
        { freq: 523,  t: now },
        { freq: 784,  t: now + 0.45 },
        { freq: 1047, t: now + 0.95 },
      ];
      for (const { freq, t } of fanfareNotes) {
        nodes.push(...scheduleSawNote(freq, 0.15, 0.02, 0.25, 0.45, t, reverb, -12));
        nodes.push(...scheduleSawNote(freq, 0.15, 0.02, 0.25, 0.45, t, reverb,  -8));
        nodes.push(...scheduleSawNote(freq, 0.15, 0.02, 0.25, 0.45, t, reverb,  +8));
        nodes.push(...scheduleSawNote(freq, 0.15, 0.02, 0.25, 0.45, t, reverb, +12));
      }

      // Sustained pad: triangle C5+E5+G5, slow attack, long fade
      const padFreqs = [523, 659, 784];
      for (const freq of padFreqs) {
        const env  = new Tone.AmplitudeEnvelope({ attack: 0.30, decay: 2.60, sustain: 0, release: 0.15 }).connect(reverb);
        const gain = new Tone.Gain(0.12).connect(env);
        const osc  = new Tone.Oscillator({ type: 'triangle', frequency: freq }).connect(gain);
        env.triggerAttackRelease(2.8, now);
        osc.start(now).stop(now + 3.4);
        nodes.push(osc, gain, env);
      }

      // Sub drone: 55Hz triangle, slow fade in, just weight
      const subEnv  = new Tone.AmplitudeEnvelope({ attack: 0.60, decay: 2.20, sustain: 0, release: 0.20 }).toDestination();
      const subGain = new Tone.Gain(0.30).connect(subEnv);
      const subOsc  = new Tone.Oscillator({ type: 'triangle', frequency: 55 }).connect(subGain);
      subEnv.triggerAttackRelease(2.6, now);
      subOsc.start(now).stop(now + 3.6);
      nodes.push(subOsc, subGain, subEnv);

      return nodes;
    },
    { decay: 2.5, preDelay: 0.01, wet: 0.42 },
  );
}

// ── Mythic ─ 6.0s ─ thick choral pad + arpeggio + swell + sparkle
//  Pad        : C5+E5+G5+B5 major-7, two sine layers per note (±5 cents)
//  Arpeggio   : C5→E5→G5→B5→C6, 0.5s apart, deliberate
//  Mid swell  : filtered noise whoosh at 3.0s
//  Sub drone  : 41Hz sine, slow fade in
//  Final sparkle: C7 at 5.0s
//  Ticks overlap at 3.5s
export async function playBloomMythic(): Promise<void> {
  return bloomPromise(
    6100,
    (reverb) => {
      const now   = Tone.now() + 0.02;
      const nodes: Tone.ToneAudioNode[] = [];

      // Choral pad: major-7 chord, two detuned voices per note
      const padFreqs = [523, 659, 784, 988]; // C5 E5 G5 B5
      for (const freq of padFreqs) {
        for (const detune of [-5, 5]) {
          const env  = new Tone.AmplitudeEnvelope({ attack: 0.40, decay: 5.00, sustain: 0, release: 0.25 }).connect(reverb);
          const gain = new Tone.Gain(0.10).connect(env);
          const osc  = new Tone.Oscillator({ type: 'sine', frequency: freq, detune }).connect(gain);
          env.triggerAttackRelease(5.2, now);
          osc.start(now).stop(now + 6.0);
          nodes.push(osc, gain, env);
        }
      }

      // Rising arpeggio: slower and more deliberate (0.5s apart)
      const arpFreqs = [523, 659, 784, 988, 1047]; // C5→E5→G5→B5→C6
      arpFreqs.forEach((freq, i) => {
        nodes.push(...scheduleNote(freq, 0.18, 0.008, 0.45, 0.35, now + i * 0.5, reverb));
      });

      // Mid swell: filtered noise whoosh at 3.0s — signals something still happening
      const swellFilter = new Tone.Filter({ type: 'bandpass', frequency: 1200, Q: 0.8 }).connect(reverb);
      const swellEnv    = new Tone.AmplitudeEnvelope({ attack: 0.15, decay: 0.50, sustain: 0, release: 0.15 }).connect(swellFilter);
      const swellGain   = new Tone.Gain(0.12).connect(swellEnv);
      const swellNoise  = new Tone.Noise('white').connect(swellGain);
      swellEnv.triggerAttackRelease(0.55, now + 3.0);
      swellNoise.start(now + 3.0).stop(now + 3.9);
      nodes.push(swellNoise, swellGain, swellEnv, swellFilter);

      // Sub drone: 41Hz sine (low A), very slow fade in, adds physical weight
      const subEnv  = new Tone.AmplitudeEnvelope({ attack: 1.20, decay: 4.00, sustain: 0, release: 0.30 }).toDestination();
      const subGain = new Tone.Gain(0.28).connect(subEnv);
      const subOsc  = new Tone.Oscillator({ type: 'sine', frequency: 41 }).connect(subGain);
      subEnv.triggerAttackRelease(5.0, now);
      subOsc.start(now).stop(now + 6.2);
      nodes.push(subOsc, subGain, subEnv);

      // Final sparkle at 5.0s — after ticks have settled
      nodes.push(...scheduleNote(2093, 0.12, 0.001, 0.30, 0.15, now + 5.0, reverb));

      return nodes;
    },
    { decay: 4.0, preDelay: 0.01, wet: 0.52 },
  );
}

// ─────────────────────────────────────────────
//  ACT 4 — The Settle
// ─────────────────────────────────────────────

const TICK_BASE_HZ = 880;
const TICK_GAIN    = 0.12;
const TICK_SPACING = 0.055;
const THUMP_HZ     = 48;
const THUMP_GAIN   = 0.42;

export function playSettle(
  tickCount: number,
  onTick: (index: number) => void
): void {
  if (!_ready) return;

  const now = Tone.now() + 0.02;

  for (let i = 0; i < tickCount; i++) {
    const t    = now + i * TICK_SPACING;
    const freq = TICK_BASE_HZ * semisToRatio(rand(-2, 2));

    const env  = new Tone.AmplitudeEnvelope({ attack: 0.001, decay: 0.025, sustain: 0, release: 0.005 }).toDestination();
    const gain = new Tone.Gain(TICK_GAIN).connect(env);
    const osc  = new Tone.Oscillator({ type: 'triangle', frequency: freq }).connect(gain);

    env.triggerAttackRelease(0.03, t);
    osc.start(t).stop(t + 0.06);

    setTimeout(() => {
      try { osc.dispose(); }  catch (_) { /* gone */ }
      try { gain.dispose(); } catch (_) { /* gone */ }
      try { env.dispose(); }  catch (_) { /* gone */ }
    }, (i * TICK_SPACING + 0.2) * 1000);

    setTimeout(() => onTick(i), i * TICK_SPACING * 1000);
  }

  const thumpT    = now + tickCount * TICK_SPACING;
  const thumpEnv  = new Tone.AmplitudeEnvelope({ attack: 0.001, decay: 0.20, sustain: 0, release: 0.04 }).toDestination();
  const thumpGain = new Tone.Gain(THUMP_GAIN).connect(thumpEnv);
  const thumpOsc  = new Tone.Oscillator({ type: 'sine', frequency: THUMP_HZ }).connect(thumpGain);

  thumpEnv.triggerAttackRelease(0.22, thumpT);
  thumpOsc.start(thumpT).stop(thumpT + 0.35);

  setTimeout(() => {
    try { thumpOsc.dispose(); }  catch (_) { /* gone */ }
    try { thumpGain.dispose(); } catch (_) { /* gone */ }
    try { thumpEnv.dispose(); }  catch (_) { /* gone */ }
  }, (tickCount * TICK_SPACING + 0.6) * 1000);
}
