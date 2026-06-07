// ─────────────────────────────────────────────
//  C8H11NO2 Machine — Step 6: Debug panel
// ─────────────────────────────────────────────

import {
  initAudio, isAudioReady, pauseAudio, resumeAudio,
  playAnticipationAndDrop,
  playBloomCommon, playBloomUncommon, playBloomRare,
  playBloomEpic, playBloomLegendary, playBloomMythic,
  playSettle,
} from './audio';

// ── DOM refs ──────────────────────────────────
const pullBtn     = document.getElementById('pull-btn')     as HTMLButtonElement;
const tierName    = document.getElementById('tier-name')    as HTMLSpanElement;
const counter     = document.getElementById('counter')      as HTMLSpanElement;
const audioStatus = document.getElementById('audio-status') as HTMLSpanElement;

// ── State ─────────────────────────────────────
let molecules       = 0;
let skipAnticipation = false;
let fixedAntDuration: number | null = null; // null = use weighted random

// ── Tier definitions ──────────────────────────
export type Tier = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface TierDef {
  name:            Tier;
  label:           string;
  weight:          number;
  molecules:       number;
  ticks:           number;
  bloomDurationMs: number;
  tickDelayMs:     number;
}

export const TIERS: TierDef[] = [
  { name: 'common',    label: 'COMMON',    weight: 600, molecules: 2,   ticks:  2, bloomDurationMs:  420, tickDelayMs:  420 },
  { name: 'uncommon',  label: 'UNCOMMON',  weight: 250, molecules: 6,   ticks:  6, bloomDurationMs:  650, tickDelayMs:  650 },
  { name: 'rare',      label: 'RARE',      weight: 100, molecules: 15,  ticks: 15, bloomDurationMs: 1050, tickDelayMs: 1050 },
  { name: 'epic',      label: 'EPIC',      weight:  40, molecules: 35,  ticks: 20, bloomDurationMs: 1550, tickDelayMs: 1550 },
  { name: 'legendary', label: 'LEGENDARY', weight:   9, molecules: 100, ticks: 25, bloomDurationMs: 3550, tickDelayMs: 2000 },
  { name: 'mythic',    label: 'MYTHIC',    weight:   1, molecules: 350, ticks: 30, bloomDurationMs: 6100, tickDelayMs: 3500 },
];

// ── Roll ──────────────────────────────────────
function rollTier(): TierDef {
  const total = TIERS.reduce((sum, t) => sum + t.weight, 0); // 1000
  let roll    = Math.floor(Math.random() * total);
  for (const tier of TIERS) {
    if (roll < tier.weight) return tier;
    roll -= tier.weight;
  }
  return TIERS[0]!; // unreachable, satisfies TS
}

// ── Bloom dispatcher ──────────────────────────
function startBloom(tier: TierDef): Promise<void> {
  switch (tier.name) {
    case 'common':    return playBloomCommon();
    case 'uncommon':  return playBloomUncommon();
    case 'rare':      return playBloomRare();
    case 'epic':      return playBloomEpic();
    case 'legendary': return playBloomLegendary();
    case 'mythic':    return playBloomMythic();
  }
}

// ── UI helpers ────────────────────────────────
function setAudioStatus(msg: string): void {
  audioStatus.textContent = msg;
}

function showTier(tier: TierDef): void {
  tierName.className = '';
  tierName.textContent = tier.label;
  tierName.classList.add(`tier-${tier.name}`);
}

function setCounter(value: number): void {
  counter.textContent = String(value);
}

// ── Pull sequence ─────────────────────────────
async function runPull(forcedTier?: TierDef): Promise<void> {
  pullBtn.disabled = true;

  if (!isAudioReady()) {
    await initAudio();
    setAudioStatus('audio ready');
  }

  const tier = forcedTier ?? rollTier();

  // Act 1 + 2 — skip or play based on toggle
  if (!skipAnticipation) {
    await playAnticipationAndDrop(fixedAntDuration ?? undefined);
  }
  showTier(tier);

  // Act 3 — bloom (not awaited for high tiers; ticks overlap)
  void startBloom(tier);

  // Act 4 — ticks after delay
  const startMolecules = molecules;
  const gained         = tier.molecules;

  setTimeout(() => {
    playSettle(tier.ticks, (tickIndex) => {
      const progress = (tickIndex + 1) / tier.ticks;
      setCounter(startMolecules + Math.round(gained * progress));
    });
  }, tier.tickDelayMs);

  const ticksDuration = tier.ticks * 55 + 350;
  const totalDuration = Math.max(tier.bloomDurationMs, tier.tickDelayMs + ticksDuration);

  setTimeout(() => {
    molecules = startMolecules + gained;
    setCounter(molecules);
    pullBtn.disabled = false;
  }, totalDuration);
}

// ─────────────────────────────────────────────
//  DEBUG PANEL
// ─────────────────────────────────────────────

function buildDebugPanel(): void {
  // ── Toggle button (always visible, bottom-right) ──
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'dbg-open-btn';
  toggleBtn.textContent = 'DBG';
  toggleBtn.setAttribute('aria-label', 'Toggle debug panel');

  // ── Panel ─────────────────────────────────────────
  const panel = document.createElement('div');
  panel.id = 'debug-panel';
  panel.setAttribute('aria-hidden', 'true');
  panel.innerHTML = `
    <div class="dbg-header">
      <span class="dbg-title">debug</span>
      <button class="dbg-close" id="dbg-close-btn" aria-label="Close debug panel">✕</button>
    </div>

    <div class="dbg-section">
      <div class="dbg-label">force tier</div>
      <div class="dbg-tier-btns">
        ${TIERS.map(t => `
          <button class="dbg-tier-btn" data-tier="${t.name}"
            style="color:var(--c-${t.name})">
            ${t.label}
          </button>`).join('')}
      </div>
    </div>

    <div class="dbg-section">
      <div class="dbg-row">
        <button class="dbg-toggle" id="dbg-skip-toggle" aria-pressed="false">
          skip anticipation
        </button>
      </div>
    </div>

    <div class="dbg-section" id="dbg-ant-section">
      <div class="dbg-label">
        anticipation duration
        <span id="dbg-ant-value">random</span>
      </div>
      <input type="range" id="dbg-ant-slider"
        min="0" max="150" step="1" value="0"
        class="dbg-slider" />
      <div class="dbg-slider-labels">
        <span>random</span><span>0.3s</span><span>1.5s</span>
      </div>
    </div>

    <div class="dbg-section">
      <button class="dbg-btn" id="dbg-reset">reset counter</button>
    </div>
  `;

  document.body.appendChild(toggleBtn);
  document.body.appendChild(panel);
  applyDebugStyles();
  wireDebugPanel(panel);

  // ── Open / close ──────────────────────────────────
  function openPanel(): void {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    toggleBtn.classList.add('active');
  }
  function closePanel(): void {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    toggleBtn.classList.remove('active');
  }

  toggleBtn.addEventListener('click', () => {
    panel.classList.contains('open') ? closePanel() : openPanel();
  });
  panel.querySelector('#dbg-close-btn')!.addEventListener('click', closePanel);
}

function wireDebugPanel(panel: HTMLElement): void {
  // Force tier buttons
  panel.querySelectorAll<HTMLButtonElement>('.dbg-tier-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (pullBtn.disabled) return;
      const name = btn.dataset['tier'] as Tier;
      const tier = TIERS.find(t => t.name === name);
      if (tier) void runPull(tier);
    });
  });

  // Skip anticipation toggle
  const skipToggle  = panel.querySelector<HTMLButtonElement>('#dbg-skip-toggle')!;
  const antSection  = panel.querySelector<HTMLDivElement>('#dbg-ant-section')!;
  const antSlider   = panel.querySelector<HTMLInputElement>('#dbg-ant-slider')!;
  const antValue    = panel.querySelector<HTMLSpanElement>('#dbg-ant-value')!;

  skipToggle.addEventListener('click', () => {
    skipAnticipation = !skipAnticipation;
    skipToggle.setAttribute('aria-pressed', String(skipAnticipation));
    skipToggle.classList.toggle('active', skipAnticipation);
    antSection.style.opacity = skipAnticipation ? '0.35' : '1';
    antSection.style.pointerEvents = skipAnticipation ? 'none' : 'auto';
  });

  // Anticipation duration slider
  // value 0 = random, 1–150 maps to 0.3s–1.5s
  antSlider.addEventListener('input', () => {
    const v = Number(antSlider.value);
    if (v === 0) {
      fixedAntDuration = null;
      antValue.textContent = 'random';
    } else {
      // map 1–150 → 0.3–1.5
      fixedAntDuration = 0.3 + (v - 1) / 149 * 1.2;
      antValue.textContent = fixedAntDuration.toFixed(2) + 's';
    }
  });

  // Reset counter
  panel.querySelector('#dbg-reset')!.addEventListener('click', () => {
    molecules = 0;
    setCounter(0);
    tierName.className = '';
    tierName.textContent = '';
  });
}

function applyDebugStyles(): void {
  const style = document.createElement('style');
  style.textContent = `
    /* ── DBG open button ── */
    #dbg-open-btn {
      position: fixed;
      bottom: 16px; right: 16px;
      font-family: var(--font);
      font-size: 9px;
      letter-spacing: 0.18em;
      padding: 6px 10px;
      background: #0e0e12;
      border: 1px solid #1e1e28;
      color: var(--text-dim);
      cursor: pointer;
      z-index: 200;
      transition: border-color 0.15s, color 0.15s;
    }
    #dbg-open-btn:hover,
    #dbg-open-btn.active {
      border-color: #3a3a50;
      color: var(--text-mid);
    }

    /* ── Panel: mobile-first, slides up from bottom ── */
    #debug-panel {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      background: #0e0e12;
      border-top: 1px solid #1e1e28;
      padding: 16px 16px 32px;
      font-family: var(--font);
      font-size: 11px;
      color: var(--text-mid);
      letter-spacing: 0.08em;
      z-index: 150;
      transform: translateY(100%);
      transition: transform 0.25s ease;
      max-height: 80vh;
      overflow-y: auto;
    }
    #debug-panel.open {
      transform: translateY(0);
    }

    /* ── On desktop: restore original fixed top-right panel ── */
    @media (min-width: 768px) {
      #debug-panel {
        top: 16px; right: 16px;
        bottom: auto; left: auto;
        width: 210px;
        border: 1px solid #1e1e28;
        border-top: 1px solid #1e1e28;
        padding: 12px;
        transform: translateX(calc(100% + 24px));
        transition: transform 0.2s ease;
        max-height: none;
        overflow-y: visible;
      }
      #debug-panel.open {
        transform: translateX(0);
      }
      #dbg-open-btn {
        bottom: auto;
        top: 16px; right: 16px;
      }
      #dbg-open-btn.active {
        right: calc(210px + 24px);
      }
    }

    /* ── Panel header ── */
    .dbg-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }
    .dbg-title {
      font-size: 9px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--text-dim);
    }
    .dbg-close {
      font-family: var(--font);
      font-size: 11px;
      background: none;
      border: none;
      color: var(--text-dim);
      cursor: pointer;
      padding: 0 2px;
      line-height: 1;
    }
    .dbg-close:hover { color: var(--text-mid); }

    /* ── Sections ── */
    .dbg-section { margin-bottom: 14px; }
    .dbg-label {
      font-size: 9px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
    }
    .dbg-tier-btns {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .dbg-tier-btn {
      font-family: var(--font);
      font-size: 11px;
      letter-spacing: 0.1em;
      padding: 6px 10px;
      background: #111116;
      border: 1px solid #1e1e28;
      cursor: pointer;
      transition: border-color 0.1s;
      min-height: 36px;
    }
    .dbg-tier-btn:hover { border-color: #3a3a50; }
    .dbg-toggle {
      font-family: var(--font);
      font-size: 11px;
      letter-spacing: 0.1em;
      padding: 8px 10px;
      background: #111116;
      border: 1px solid #1e1e28;
      color: var(--text-mid);
      cursor: pointer;
      width: 100%;
      text-align: left;
      transition: border-color 0.1s, color 0.1s;
      min-height: 36px;
    }
    .dbg-toggle.active {
      border-color: #3a3a50;
      color: var(--text-bright);
      background: #16161e;
    }
    .dbg-toggle.active::before { content: '✓  '; }
    .dbg-slider {
      width: 100%;
      -webkit-appearance: none;
      appearance: none;
      height: 3px;
      background: #1e1e28;
      outline: none;
      margin: 6px 0;
    }
    .dbg-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px; height: 18px;
      border-radius: 50%;
      background: var(--text-mid);
      cursor: pointer;
    }
    .dbg-slider-labels {
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: var(--text-dim);
      margin-top: 2px;
    }
    .dbg-btn {
      font-family: var(--font);
      font-size: 11px;
      letter-spacing: 0.1em;
      padding: 8px 10px;
      background: #111116;
      border: 1px solid #1e1e28;
      color: var(--text-mid);
      cursor: pointer;
      width: 100%;
      text-align: left;
      transition: border-color 0.1s, color 0.1s;
      min-height: 36px;
    }
    .dbg-btn:hover {
      border-color: #3a3a50;
      color: var(--text);
    }
    .dbg-row { display: flex; gap: 6px; }

    /* Desktop: smaller touch targets are fine */
    @media (min-width: 768px) {
      .dbg-tier-btn, .dbg-toggle, .dbg-btn { min-height: unset; font-size: 9px; padding: 3px 6px; }
      .dbg-toggle { padding: 4px 8px; }
      .dbg-btn { padding: 4px 8px; }
      .dbg-slider::-webkit-slider-thumb { width: 10px; height: 10px; }
    }
  `;
  document.head.appendChild(style);
}

// ── Event wiring ──────────────────────────────
pullBtn.addEventListener('click', () => { void runPull(); });

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    pauseAudio();
    setAudioStatus('paused');
  } else if (isAudioReady()) {
    resumeAudio();
    setAudioStatus('audio ready');
  }
});

// ── Init ──────────────────────────────────────
setCounter(0);
setAudioStatus('click PULL to initialise audio');
buildDebugPanel();
