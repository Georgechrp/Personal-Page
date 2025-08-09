(function () {
  const root = document.documentElement;
  const STORAGE_KEY = 'theme'; // 'light' | 'dark'
  const btn = document.getElementById('themeToggle');

  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function setMetaThemeColor(color) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', color);
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      btn?.setAttribute('aria-pressed', 'true');
      setMetaThemeColor('#0b0f14');
    } else {
      root.removeAttribute('data-theme'); // light ως default
      btn?.setAttribute('aria-pressed', 'false');
      setMetaThemeColor('#f7f9fc');
    }
  }

  const initial = getInitialTheme();
  applyTheme(initial);

  // Αν δεν υπάρχει explicit επιλογή, sync με αλλαγές συστήματος
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const mediaListener = (e) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) applyTheme(e.matches ? 'dark' : 'light');
  };
  if (media.addEventListener) media.addEventListener('change', mediaListener);
  else media.addListener(mediaListener);

  btn?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
})();