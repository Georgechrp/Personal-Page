// Static, flicker-free ambient background on #bg-canvas (theme-aware)
(() => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w, h;

  const getVars = () => {
    const s = getComputedStyle(document.documentElement);
    return {
      accent: s.getPropertyValue('--accent').trim(),
      accent2: s.getPropertyValue('--accent-2').trim(),
      spot: s.getPropertyValue('--spot').trim()
    };
  };
  let vars = getVars();

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    render();
  }

  function hexToRgba(hex, a) {
    let h = hex.replace('#', '').trim();
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const n = parseInt(h, 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return `rgba(${r},${g},${b},${a})`;
  }

  // deterministic “seeded” rand για σταθερή διάταξη
  function seeded(seed) { let x = Math.sin(seed) * 10000; return x - Math.floor(x); }

  function render() {
    ctx.clearRect(0, 0, w, h);

    // Βάση: απαλό radial κέντρο
    const baseR = Math.max(w, h) * 0.45;
    const cx = w * 0.5, cy = h * 0.45;
    let g0 = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR);
    g0.addColorStop(0, hexToRgba(vars.accent, 0.10));
    g0.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g0;
    ctx.fillRect(0, 0, w, h);

    // 3-4 static “aurora blobs”
    for (let i = 0; i < 4; i++) {
      const t = i * 97.3;
      const x = w * (0.25 + seeded(t) * 0.5);
      const y = h * (0.2 + seeded(t + 1) * 0.6);
      const r = Math.max(w, h) * (0.18 + seeded(t + 2) * 0.25);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, hexToRgba(vars.accent, 0.08));
      g.addColorStop(0.6, hexToRgba(vars.accent2, 0.06));
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Πολύ απαλό “spot” που σέβεται --spot
    const sg = ctx.createRadialGradient(w * 0.8, -h * 0.1, 0, w * 0.8, -h * 0.1, Math.max(w, h) * 0.9);
    sg.addColorStop(0, hexToRgba(vars.spot, 0.08));
    sg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(0, 0, w, h);
  }

  const obs = new MutationObserver(() => { vars = getVars(); render(); });
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  window.addEventListener('resize', resize, { passive: true });

  // αρχικοποίηση
  resize();
})();