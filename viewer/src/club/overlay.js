// Renders planted totems as camera-facing DOM billboards — a vertical
// cartouche of emoji projected over the splat scene each frame. DOM (not
// sprites) keeps native emoji rendering and easy clicks, and matches the
// ghost-text HUD aesthetic: the glyphs are the only saturated thing.

import * as THREE from 'three';

const _v = new THREE.Vector3();

export function createTotemOverlay({ camera, onSelect }) {
  const root = document.createElement('div');
  root.className = 'totem-overlay';
  document.body.appendChild(root);

  let entries = []; // { totem, el }

  function elementFor(totem) {
    const el = document.createElement('button');
    el.className = 'totem';
    el.type = 'button';
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      onSelect(totem);
    });
    const stack = document.createElement('span');
    stack.className = 'totem-stack';
    el.appendChild(stack);
    const stem = document.createElement('span');
    stem.className = 'totem-stem';
    el.appendChild(stem);
    return el;
  }

  function sync(totems) {
    root.replaceChildren();
    entries = totems.map((totem) => {
      const el = elementFor(totem);
      root.appendChild(el);
      return { totem, el };
    });
    refresh();
  }

  // re-read note state (violet = unwritten, verdant = has a note)
  function refresh() {
    for (const { totem, el } of entries) {
      el.querySelector('.totem-stack').textContent = totem.glyphs.join('\n');
      el.classList.toggle('totem--noted', Boolean(totem.text?.trim()));
    }
  }

  function update() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (const { totem, el } of entries) {
      _v.set(totem.pos[0], totem.pos[1], totem.pos[2]).project(camera);
      const behind = _v.z > 1 || _v.z < -1;
      if (behind) {
        el.style.display = 'none';
        continue;
      }
      el.style.display = '';
      const dist = camera.position.distanceTo(
        _v.set(totem.pos[0], totem.pos[1], totem.pos[2])
      );
      const scale = THREE.MathUtils.clamp(2.4 / dist, 0.55, 1.5);
      _v.set(totem.pos[0], totem.pos[1], totem.pos[2]).project(camera);
      const x = (_v.x * 0.5 + 0.5) * w;
      const y = (-_v.y * 0.5 + 0.5) * h;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -100%) scale(${scale.toFixed(3)})`;
    }
  }

  return { sync, refresh, update };
}
