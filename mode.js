(function () {
  const root = document.documentElement;
  const STORAGE_KEY = 'theme';
  const btn = document.getElementById('themeToggle');

  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function setMetaThemeColorFromCSS() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--meta-theme')
      .trim();
    if (value) meta.setAttribute('content', value);
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      btn?.setAttribute('aria-pressed', 'true');
    } else {
      root.removeAttribute('data-theme');
      btn?.setAttribute('aria-pressed', 'false');
    }
    setMetaThemeColorFromCSS();
  }

  const initial = getInitialTheme();
  applyTheme(initial);

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