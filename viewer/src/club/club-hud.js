// The club layer's HUD: same ghost-text-on-void language as the root
// viewer, plus the totem composer. One violet pill per view (Plant); when
// armed it flips amber. Note panel slides in on the right as a mirrored
// scrim — still no boxes, no borders.

import { animate, stagger } from 'animejs';
import { MAX_GLYPHS, capState, setHandle } from './totems.js';

const PALETTE = [
  '🐆', '✨', '🔥', '🌊', '🌙', '☀️', '🌿',
  '🌸', '🍄', '🦋', '🐍', '🦉', '👁️', '🗝️',
  '🚪', '🌀', '⚡', '💎', '🕯️', '🎭', '📖',
  '🎨', '🎵', '♾️', '⭐', '🪶', '🫀', '🌋'
];

export function buildClubHud({ locations, author, layer, onSelectView, onArmChange, onExport }) {
  const root = document.createElement('div');
  root.className = 'hud';

  const brand = document.createElement('div');
  brand.className = 'hud-brand';
  brand.innerHTML = '<span class="brand-mark">▲</span> ISC — JAGUAR · CLUB';
  root.appendChild(brand);

  const modeBadge = document.createElement('div');
  modeBadge.className = 'hud-mode';
  root.appendChild(modeBadge);

  // --- track stops (reused from the origin layer) ---
  const trackLabel = document.createElement('div');
  trackLabel.className = 'hud-section-label';
  trackLabel.textContent = 'The Track';
  root.appendChild(trackLabel);

  const menu = document.createElement('div');
  menu.className = 'hud-menu';
  root.appendChild(menu);

  locations.forEach((location) => {
    const stop = document.createElement('div');
    stop.className = 'hud-stop';
    const button = document.createElement('button');
    button.className = 'hud-stop-button';
    button.textContent = location.label;
    button.addEventListener('click', () => onSelectView(location.views[0]));
    stop.appendChild(button);
    menu.appendChild(stop);
  });

  animate(menu.querySelectorAll('.hud-stop'), {
    opacity: [0, 1],
    translateX: [-12, 0],
    delay: stagger(70),
    duration: 500,
    ease: 'outCubic'
  });

  // --- totem composer ---
  const composeLabel = document.createElement('div');
  composeLabel.className = 'hud-section-label';
  composeLabel.textContent = 'Compose a Totem';
  root.appendChild(composeLabel);

  const compose = document.createElement('div');
  compose.className = 'hud-compose';
  root.appendChild(compose);

  const palette = document.createElement('div');
  palette.className = 'compose-palette';
  compose.appendChild(palette);

  const stackRow = document.createElement('div');
  stackRow.className = 'compose-stack';
  compose.appendChild(stackRow);

  const stackGlyphs = document.createElement('span');
  stackGlyphs.className = 'compose-stack-glyphs';
  stackRow.appendChild(stackGlyphs);

  const stackEmpty = document.createElement('span');
  stackEmpty.className = 'compose-stack-empty';
  stackEmpty.textContent = `stack up to ${MAX_GLYPHS} — order matters`;
  stackRow.appendChild(stackEmpty);

  const clear = document.createElement('button');
  clear.className = 'compose-clear';
  clear.textContent = 'clear stack';
  compose.appendChild(clear);

  const plant = document.createElement('button');
  plant.className = 'compose-plant';
  compose.appendChild(plant);

  const count = document.createElement('div');
  count.className = 'compose-count';
  compose.appendChild(count);

  const handleInput = document.createElement('input');
  handleInput.className = 'compose-handle';
  handleInput.placeholder = 'handle (optional, never shown)';
  handleInput.value = author.handle ?? '';
  handleInput.addEventListener('change', () => setHandle(handleInput.value));
  compose.appendChild(handleInput);

  // --- export ---
  const filesLabel = document.createElement('div');
  filesLabel.className = 'hud-section-label';
  filesLabel.textContent = 'Take the Layer With You';
  root.appendChild(filesLabel);

  const files = document.createElement('div');
  files.className = 'hud-files';
  const exportLink = document.createElement('a');
  exportLink.className = 'hud-file-link';
  exportLink.href = '#';
  exportLink.innerHTML = 'export layer <span>.json</span>';
  exportLink.addEventListener('click', (e) => {
    e.preventDefault();
    onExport();
  });
  files.appendChild(exportLink);
  const note = document.createElement('div');
  note.className = 'hud-file-soon';
  note.textContent = 'PR it back — the world compounds';
  files.appendChild(note);
  root.appendChild(files);

  const hint = document.createElement('div');
  hint.className = 'hud-hint';
  hint.innerHTML =
    '<b>drag</b> look · <b>M</b> free-roam/track · <b>WASD</b> move (free) · compose, then <b>plant</b> and click the world';
  root.appendChild(hint);

  document.body.appendChild(root);

  // --- plant-mode hint (center bottom) ---
  const plantHint = document.createElement('div');
  plantHint.className = 'plant-hint';
  plantHint.hidden = true;
  plantHint.textContent = 'click anywhere in the world to plant';
  document.body.appendChild(plantHint);

  // --- state ---
  let glyphStack = [];
  let armed = false;

  PALETTE.forEach((glyph) => {
    const b = document.createElement('button');
    b.className = 'compose-glyph';
    b.type = 'button';
    b.textContent = glyph;
    b.addEventListener('click', () => {
      if (glyphStack.length >= MAX_GLYPHS) return;
      glyphStack.push(glyph);
      syncCompose();
    });
    palette.appendChild(b);
  });

  clear.addEventListener('click', () => {
    glyphStack = [];
    setArmed(false);
    syncCompose();
  });

  plant.addEventListener('click', () => setArmed(!armed));

  function setArmed(next) {
    armed = next && glyphStack.length > 0;
    plant.classList.toggle('compose-plant--armed', armed);
    plantHint.hidden = !armed;
    syncCompose();
    onArmChange(armed);
  }

  function syncCompose() {
    stackGlyphs.textContent = glyphStack.join(' ');
    stackEmpty.style.display = glyphStack.length ? 'none' : '';
    const caps = capState(layer, author.id);
    count.textContent = `${caps.total} / ${layer.cap.total ?? '∞'} planted in this layer`;
    if (caps.blocked) {
      plant.disabled = true;
      plant.textContent = caps.totalFull ? 'layer full' : 'quota spent';
    } else {
      plant.disabled = glyphStack.length === 0;
      plant.textContent = armed ? 'click the world…' : 'plant totem';
    }
  }

  syncCompose();

  return {
    setMode(mode) {
      modeBadge.textContent = mode === 'free' ? 'Free-roam · author' : 'Track · story';
      modeBadge.classList.toggle('hud-mode--free', mode === 'free');
    },
    getStack: () => [...glyphStack],
    consumeStack() {
      const used = glyphStack;
      glyphStack = [];
      setArmed(false);
      syncCompose();
      return used;
    },
    disarm: () => setArmed(false),
    isArmed: () => armed,
    refreshCaps: syncCompose
  };
}

// --- note panel ------------------------------------------------------------

export function buildNotePanel({ onSave, onRemove }) {
  const panel = document.createElement('div');
  panel.className = 'note-panel';
  panel.hidden = true;
  panel.innerHTML = `
    <div class="note-label">Totem Note</div>
    <div class="note-glyphs"></div>
    <textarea class="note-text" placeholder="What does this mark? A memory, a claim, a dare, a seed of a story…"></textarea>
    <div class="note-status"></div>
    <div class="note-actions">
      <button class="note-done">done</button>
      <button class="note-remove">remove totem</button>
    </div>
  `;
  document.body.appendChild(panel);

  const glyphsEl = panel.querySelector('.note-glyphs');
  const textEl = panel.querySelector('.note-text');
  const statusEl = panel.querySelector('.note-status');

  let current = null;
  let statusTimer = null;

  textEl.addEventListener('input', () => {
    if (!current) return;
    current.text = textEl.value;
    onSave(current);
    statusEl.textContent = 'saved';
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => (statusEl.textContent = ''), 1200);
  });

  panel.querySelector('.note-done').addEventListener('click', () => close());
  panel.querySelector('.note-remove').addEventListener('click', () => {
    if (!current) return;
    const doomed = current;
    close();
    onRemove(doomed);
  });

  function open(totem) {
    current = totem;
    glyphsEl.textContent = totem.glyphs.join(' ');
    textEl.value = totem.text ?? '';
    statusEl.textContent = '';
    panel.hidden = false;
    animate(panel, { translateX: [40, 0], opacity: [0, 1], duration: 350, ease: 'outCubic' });
    textEl.focus();
  }

  function close() {
    current = null;
    panel.hidden = true;
  }

  return { open, close, isOpen: () => !panel.hidden };
}
