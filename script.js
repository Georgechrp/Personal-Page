// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const header = document.querySelector('.site-header');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  document.body.classList.toggle('nav-open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.body.classList.remove('nav-open'));
});

// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Background animated blobs on canvas (lightweight)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d', { alpha: true });

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

function rand(min, max) { return Math.random() * (max - min) + min; }

const colors = [
  'rgba(102,224,194,0.35)',
  'rgba(122,162,247,0.35)',
  'rgba(122,162,247,0.22)',
  'rgba(102,224,194,0.22)'
];

const blobCount = Math.max(8, Math.floor((w * h) / 160000)); // scale with screen
const blobs = Array.from({ length: blobCount }).map(() => ({
  x: rand(0, w),
  y: rand(0, h),
  r: rand(80, 200),
  vx: rand(-0.2, 0.2),
  vy: rand(-0.2, 0.2),
  color: colors[Math.floor(rand(0, colors.length))]
}));

function step() {
  ctx.clearRect(0, 0, w, h);
  for (const b of blobs) {
    // move
    b.x += b.vx;
    b.y += b.vy;

    // bounce
    if (b.x < -b.r) b.x = w + b.r;
    if (b.x > w + b.r) b.x = -b.r;
    if (b.y < -b.r) b.y = h + b.r;
    if (b.y > h + b.r) b.y = -b.r;

    // draw
    const grad = ctx.createRadialGradient(b.x, b.y, b.r * 0.1, b.x, b.y, b.r);
    grad.addColorStop(0, b.color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }
  if (!prefersReduced) requestAnimationFrame(step);
}

if (!prefersReduced) step();




