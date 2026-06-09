// ── Rich POI system for City Explorer ─────────────────────────────────────────
// Overrides renderPOIs from script.js to add popup cards + 360° panorama modal

let cityActivePopup = null;

// ── Mobile modal (touch devices) ─────────────────────────────────────────────
const isCityTouch = ('ontouchstart' in window) || window.matchMedia('(hover: none)').matches;
let cityMModal = null;

if (isCityTouch) {
  const mStyle = document.createElement('style');
  mStyle.textContent = `
    #city-m-modal {
      display: none; position: fixed; inset: 0; z-index: 9000;
      align-items: center; justify-content: center;
      background: rgba(0,0,0,0.45); backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px); padding: 24px;
    }
    #city-m-modal.open { display: flex; }
    #city-m-card {
      width: min(90vw, 340px); border-radius: 20px; overflow: hidden;
      background: rgba(235,235,232,0.97); border: 1px solid rgba(255,255,255,0.45);
      box-shadow: 0 0 0 0.5px rgba(255,255,255,0.5) inset, 0 20px 60px rgba(0,0,0,0.35);
      max-height: 80vh; overflow-y: auto; overscroll-behavior: contain;
    }
    #city-m-card .popup-img-wrap { cursor: default; height: 180px; }
    @keyframes cityMIn { from { opacity:0; transform: translateY(14px) scale(0.97); } to { opacity:1; transform:none; } }
  `;
  document.head.appendChild(mStyle);

  cityMModal = document.createElement('div');
  cityMModal.id = 'city-m-modal';
  cityMModal.innerHTML = '<div id="city-m-card"></div>';
  document.body.appendChild(cityMModal);
  cityMModal.addEventListener('click', e => {
    if (e.target === cityMModal) cityMModal.classList.remove('open');
  });
}

// Override hidePOIs to also clean up popups
const _baseHidePOIs = hidePOIs;
hidePOIs = function () {
  document.querySelectorAll('.city-popup').forEach(el => el.remove());
  cityActivePopup = null;
  _baseHidePOIs();
};

// Override renderPOIs with rich version
renderPOIs = function (pois) {
  document.querySelectorAll('.city-popup').forEach(el => el.remove());
  cityActivePopup = null;
  poiLayer.innerHTML = '';

  if (!pois || !pois.length) return;

  pois.forEach((poi, i) => {
    // ── Marker ──────────────────────────────────────────────────
    const marker = document.createElement('div');
    marker.className = 'poi';
    marker.style.left = poi.x + '%';
    marker.style.top  = poi.y + '%';
    marker.style.animationDelay = (i * 80) + 'ms';
    marker.innerHTML = `
      <div class="poi-btn"></div>
      <div class="poi-name">${poi.label}</div>
    `;

    const btn = marker.querySelector('.poi-btn');
    btn.addEventListener('click', (e) => { e.stopPropagation(); cityTogglePopup(poi); });
    btn.addEventListener('touchstart', (e) => {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
      cityTogglePopup(poi);
    }, { passive: false });

    poiLayer.appendChild(marker);

    // ── Popup ────────────────────────────────────────────────────
    buildCityPopup(poi);
  });
};

// ── Build popup card ──────────────────────────────────────────────────────────
function buildCityPopup(poi) {
  const popup = document.createElement('div');
  popup.className = 'city-popup';
  popup.id = 'city-popup-' + poi.id;
  const imgSrc  = poi.img  || 'images/POI_001.jpg';
  const panoSrc = poi.panorama360 || null;

  popup.innerHTML = `
    <div class="popup-img-wrap" data-drag="true">
      <img class="popup-img" src="${imgSrc}" alt="${poi.title}" draggable="false">
      <button class="popup-close-btn" onclick="cityClosePopup('${poi.id}')">
        <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <line x1="1" y1="1" x2="7" y2="7"/><line x1="7" y1="1" x2="1" y2="7"/>
        </svg>
      </button>
    </div>
    <div class="popup-body">
      <div class="popup-tag">${poi.tag || ''}</div>
      <div class="popup-title">${poi.title}</div>
      <div class="popup-desc">${poi.desc || ''}</div>
      ${panoSrc ? `
      <button class="popup-360-btn" onclick="cityOpenPano('${panoSrc}')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
          <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z"/>
        </svg>
        Ver 360°
      </button>` : ''}
    </div>
  `;

  document.body.appendChild(popup);
  makeCityDraggable(popup);
}

// ── Toggle / close popup ──────────────────────────────────────────────────────
function cityTogglePopup(poi) {
  const popup = document.getElementById('city-popup-' + poi.id);
  if (!popup) return;

  if (isCityTouch && cityMModal) {
    // Mobile: clone popup content into the body-level modal to avoid
    // fixed-inside-overflow clipping on iOS Safari
    const card = document.getElementById('city-m-card');
    card.innerHTML = popup.innerHTML;
    card.style.animation = 'none';
    requestAnimationFrame(() => { card.style.animation = 'cityMIn 0.28s cubic-bezier(0.34,1.4,0.64,1) both'; });
    cityMModal.classList.add('open');
    if (typeof track === 'function') track('poi_open', { poi: poi.id, cena: typeof currentScene !== 'undefined' ? currentScene : '' });
    return;
  }

  // Desktop: draggable floating popup
  if (popup.classList.contains('open')) {
    cityClosePopup(poi.id);
  } else {
    if (cityActivePopup) cityActivePopup.classList.remove('open');
    const popH = popup.offsetHeight || 420;
    popup.style.left = Math.round((window.innerWidth - 300) / 2) + 'px';
    popup.style.top  = Math.max(10, Math.round((window.innerHeight - popH) / 2)) + 'px';
    popup.classList.add('open');
    cityActivePopup = popup;
    if (typeof track === 'function') track('poi_open', { poi: poi.id, cena: typeof currentScene !== 'undefined' ? currentScene : '' });
  }
}

function cityClosePopup(id) {
  if (isCityTouch && cityMModal) {
    cityMModal.classList.remove('open');
    return;
  }
  const popup = document.getElementById('city-popup-' + id);
  if (popup) popup.classList.remove('open');
  if (cityActivePopup === popup) cityActivePopup = null;
}

window.cityClosePopup = cityClosePopup;

// Close on backdrop click / Escape
document.addEventListener('click', (e) => {
  if (cityActivePopup && !e.target.closest('.city-popup') && !e.target.closest('.poi-btn')) {
    cityActivePopup.classList.remove('open');
    cityActivePopup = null;
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cityClosePopup(cityActivePopup?.id?.replace('city-popup-', '') || '');
});

// ── Draggable popup ───────────────────────────────────────────────────────────
function makeCityDraggable(el) {
  let sx, sy, sl, st, dragging = false;

  const start = (cx, cy) => {
    dragging = true;
    sx = cx; sy = cy;
    sl = parseInt(el.style.left) || el.getBoundingClientRect().left;
    st = parseInt(el.style.top)  || el.getBoundingClientRect().top;
    el.style.left = sl + 'px';
    el.style.top  = st + 'px';
  };
  const move = (cx, cy) => {
    if (!dragging) return;
    el.style.left = Math.max(0, Math.min(window.innerWidth  - el.offsetWidth,  sl + cx - sx)) + 'px';
    el.style.top  = Math.max(0, Math.min(window.innerHeight - el.offsetHeight, st + cy - sy)) + 'px';
  };
  const end = () => { dragging = false; };

  el.addEventListener('mousedown', (e) => { if (!e.target.closest('[data-drag]')) return; if (e.cancelable) e.preventDefault(); start(e.clientX, e.clientY); });
  document.addEventListener('mousemove', (e) => move(e.clientX, e.clientY));
  document.addEventListener('mouseup', end);

  el.addEventListener('touchstart', (e) => { if (!e.target.closest('[data-drag]') || e.target.closest('button')) return; if (e.cancelable) e.preventDefault(); start(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
  document.addEventListener('touchmove', (e) => { if (!dragging) return; if (e.cancelable) e.preventDefault(); move(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
  document.addEventListener('touchend', end);
}

// ── 360° Panorama Modal ───────────────────────────────────────────────────────
let panoRenderer = null, panoRaf = null, panoCtl = null;

function cityOpenPano(src) {
  if (cityActivePopup) { cityActivePopup.classList.remove('open'); cityActivePopup = null; }
  if (isCityTouch && cityMModal) cityMModal.classList.remove('open');
  const modal = document.getElementById('pano-modal');
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('pano-loading').classList.remove('hidden');
  document.getElementById('pano-hint').classList.remove('hidden');

  if (panoCtl) { panoCtl.abort(); panoCtl = null; }
  if (panoRaf) { cancelAnimationFrame(panoRaf); panoRaf = null; }
  if (panoRenderer) { panoRenderer.dispose(); panoRenderer = null; }

  panoCtl = new AbortController();
  const sig = panoCtl.signal;

  requestAnimationFrame(() => {
    const canvas = document.getElementById('pano-canvas');
    const box    = document.getElementById('pano-modal-box');
    const w = box.clientWidth, h = box.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    THREE.ColorManagement.enabled = false;
    panoRenderer = renderer;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 200);
    const geo    = new THREE.SphereGeometry(100, 64, 32);
    geo.scale(-1, 1, 1);

    // Resize / orientation change — same signal so abort() cleans it up too
    window.addEventListener('resize', () => {
      const W = box.clientWidth, H = box.clientHeight;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    }, { signal: sig });

    new THREE.TextureLoader().load(src, (tex) => {
      tex.colorSpace = THREE.LinearSRGBColorSpace;
      scene.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex })));

      document.getElementById('pano-loading').classList.add('hidden');
      const hint = document.getElementById('pano-hint');
      setTimeout(() => hint.classList.add('hidden'), 3000);

      // Drag state
      let isDragging = false;
      let startX, startY, startLon, startLat;
      let prevCx = 0, prevCy = 0;
      let lon = 0, lat = 0;
      let velLon = 0, velLat = 0;

      // Pinch-zoom state
      let pinchDist0 = 0, fovAtPinch = camera.fov;

      const onMove = (cx, cy) => {
        if (!isDragging) return;
        velLon = -(cx - prevCx) * 0.2;
        velLat =  (cy - prevCy) * 0.2;
        prevCx = cx; prevCy = cy;
        lon = startLon - (cx - startX) * 0.2;
        lat = Math.max(-85, Math.min(85, startLat + (cy - startY) * 0.2));
      };

      // Mouse
      canvas.addEventListener('mousedown', (e) => {
        isDragging = true; velLon = 0; velLat = 0;
        startX = prevCx = e.clientX; startY = prevCy = e.clientY;
        startLon = lon; startLat = lat;
      }, { signal: sig });
      document.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY), { signal: sig });
      document.addEventListener('mouseup',   () => { isDragging = false; }, { signal: sig });

      // Touch — 1 finger drag + 2 finger pinch-zoom
      canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          isDragging = true; velLon = 0; velLat = 0;
          startX = prevCx = e.touches[0].clientX;
          startY = prevCy = e.touches[0].clientY;
          startLon = lon; startLat = lat;
        } else if (e.touches.length === 2) {
          isDragging = false;
          pinchDist0 = Math.hypot(
            e.touches[1].clientX - e.touches[0].clientX,
            e.touches[1].clientY - e.touches[0].clientY
          );
          fovAtPinch = camera.fov;
        }
      }, { passive: true, signal: sig });

      canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2 && pinchDist0 > 0) {
          const d = Math.hypot(
            e.touches[1].clientX - e.touches[0].clientX,
            e.touches[1].clientY - e.touches[0].clientY
          );
          camera.fov = Math.max(30, Math.min(100, fovAtPinch * (pinchDist0 / d)));
          camera.updateProjectionMatrix();
        } else if (e.touches.length === 1) {
          onMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true, signal: sig });

      canvas.addEventListener('touchend', () => { isDragging = false; pinchDist0 = 0; }, { signal: sig });

      // Wheel zoom
      canvas.addEventListener('wheel', (e) => {
        camera.fov = Math.max(30, Math.min(100, camera.fov + e.deltaY * 0.05));
        camera.updateProjectionMatrix();
      }, { passive: true, signal: sig });

      // Render loop — camera.lookAt lives here so inertia keeps spinning after release
      const tick = () => {
        panoRaf = requestAnimationFrame(tick);
        if (!isDragging) {
          lon += velLon;
          lat = Math.max(-85, Math.min(85, lat + velLat));
          velLon *= 0.88;
          velLat *= 0.88;
        }
        const phi   = THREE.MathUtils.degToRad(90 - lat);
        const theta = THREE.MathUtils.degToRad(lon);
        camera.lookAt(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta));
        renderer.render(scene, camera);
      };
      tick();
    });
  });
}

window.cityOpenPano = cityOpenPano;

function cityClosePano() {
  if (panoCtl) { panoCtl.abort(); panoCtl = null; }
  if (panoRaf) { cancelAnimationFrame(panoRaf); panoRaf = null; }
  if (panoRenderer) { panoRenderer.dispose(); panoRenderer = null; }
  const modal = document.getElementById('pano-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
}

window.cityClosePano = cityClosePano;
