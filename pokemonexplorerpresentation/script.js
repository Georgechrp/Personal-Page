
(function(){
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  if(saved === 'light') document.body.classList.add('light');
  if(saved === 'dark') document.body.classList.remove('light');
  if(!saved && !prefersDark) document.body.classList.add('light');

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    themeToggle.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Accordion
  document.querySelectorAll('.acc-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const panel = btn.nextElementSibling;
      panel.classList.toggle('open');
    });
  });

  // Replace video source easily if missing
  const video = document.getElementById('demoVideo');
  if(video){
    video.addEventListener('error', () => {
      console.warn('Video source not found. Replace assets/demo.mp4 with your own file or URL.');
    });
  }
})();
