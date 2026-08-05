// Neon-glass HUD: layer picker (the fork chain) -> location menu (stops on
// the active layer's track) -> author-mode readout. Plain DOM, no framework.

import { layerLineage } from './layers/index.js';

export function buildHud({ layers, onSelectView, onSelectLayer }) {
  const root = document.createElement('div');
  root.className = 'hud';

  const brand = document.createElement('div');
  brand.className = 'hud-brand';
  brand.textContent = 'ISC ✦ JAGUAR';
  root.appendChild(brand);

  const modeBadge = document.createElement('div');
  modeBadge.className = 'hud-mode';
  root.appendChild(modeBadge);

  const layerRow = document.createElement('div');
  layerRow.className = 'hud-layers';
  root.appendChild(layerRow);

  const lineage = document.createElement('div');
  lineage.className = 'hud-lineage';
  root.appendChild(lineage);

  const menu = document.createElement('div');
  menu.className = 'hud-menu';
  root.appendChild(menu);

  const readout = document.createElement('div');
  readout.className = 'hud-readout';
  readout.hidden = true;
  root.appendChild(readout);

  const hint = document.createElement('div');
  hint.className = 'hud-hint';
  hint.innerHTML =
    '<b>drag</b> look · <b>M</b> free-roam/track · <b>WASD</b> move (free) · <b>P</b> capture waypoint (free)';
  root.appendChild(hint);

  document.body.appendChild(root);

  const chips = new Map();

  function renderMenu(layer) {
    menu.replaceChildren();
    layer.locations.forEach((location) => {
      const stop = document.createElement('div');
      stop.className = 'hud-stop';

      const stopButton = document.createElement('button');
      stopButton.className = 'hud-stop-button';
      stopButton.textContent = location.label;
      stop.appendChild(stopButton);

      const views = document.createElement('div');
      views.className = 'hud-views';
      views.hidden = location.views.length > 1;

      location.views.forEach((view) => {
        const viewButton = document.createElement('button');
        viewButton.className = 'hud-view-button';
        viewButton.textContent = view.label;
        viewButton.addEventListener('click', () => onSelectView(view));
        views.appendChild(viewButton);
      });

      stopButton.addEventListener('click', () => {
        if (location.views.length === 1) {
          onSelectView(location.views[0]);
          return;
        }
        const wasHidden = views.hidden;
        menu.querySelectorAll('.hud-views').forEach((el) => (el.hidden = true));
        views.hidden = !wasHidden;
      });

      stop.appendChild(views);
      menu.appendChild(stop);
    });
  }

  function setActiveLayer(layer) {
    document.documentElement.style.setProperty('--accent', layer.tint || '#00f0ff');
    chips.forEach((chip, id) =>
      chip.classList.toggle('hud-layer-chip--active', id === layer.id)
    );
    const chain = layerLineage(layer, layers);
    lineage.innerHTML =
      'lineage: ' + chain.map((id, i) => (i === chain.length - 1 ? `<b>${id}</b>` : id)).join(' → ');
    renderMenu(layer);
  }

  layers.forEach((layer) => {
    const chip = document.createElement('button');
    chip.className = 'hud-layer-chip';
    chip.textContent = layer.title;
    chip.title = `${layer.description ?? ''}\nauthor: ${layer.author}` +
      (layer.forkedFrom ? `\nforked from: ${layer.forkedFrom}` : '\nroot layer');
    chip.addEventListener('click', () => onSelectLayer(layer));
    chips.set(layer.id, chip);
    layerRow.appendChild(chip);
  });

  return {
    setMode(mode) {
      modeBadge.textContent = mode === 'free' ? 'FREE-ROAM ✦ AUTHOR' : 'TRACK ✦ STORY';
      modeBadge.classList.toggle('hud-mode--free', mode === 'free');
    },
    setActiveLayer,
    showReadout(snippetText) {
      readout.hidden = false;
      readout.textContent = snippetText;
    }
  };
}

// Full-screen loading portal shown while the splats stream in.
export function buildPortal() {
  const el = document.createElement('div');
  el.className = 'portal';
  el.innerHTML = `
    <div class="portal-title">ISC ✦ JAGUAR</div>
    <div class="portal-sub">ENTERING GRAY AREA</div>
    <div class="portal-bar"><div class="portal-bar-fill"></div></div>
    <div class="portal-pct">0.0%</div>
  `;
  document.body.appendChild(el);

  const fill = el.querySelector('.portal-bar-fill');
  const pct = el.querySelector('.portal-pct');

  return {
    progress(fraction) {
      const clamped = Math.max(0, Math.min(1, fraction));
      fill.style.width = `${(clamped * 100).toFixed(1)}%`;
      pct.textContent = `${(clamped * 100).toFixed(1)}%`;
    },
    close() {
      el.classList.add('portal--gone');
      setTimeout(() => el.remove(), 1000);
    },
    fail(message) {
      pct.textContent = message;
    }
  };
}
