/* Dark mode follows the system until a visitor chooses a preference. */
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const label = document.querySelector('.theme-label');
  const storageKey = 'lucas-villamil-theme';
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function savedPreference() {
    try {
      const value = window.localStorage.getItem(storageKey);
      return value === 'dark' || value === 'light' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const accessibleLabel = `Switch to ${nextTheme} theme`;
    toggle.setAttribute('aria-label', accessibleLabel);
    toggle.setAttribute('title', accessibleLabel);
    label.textContent = `${nextTheme === 'dark' ? 'Dark' : 'Light'} mode`;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#151d1a' : '#f6f5f0');
  }

  applyTheme(savedPreference() || (systemPrefersDark.matches ? 'dark' : 'light'));

  toggle.addEventListener('click', () => {
    const selected = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(selected);
    try {
      window.localStorage.setItem(storageKey, selected);
    } catch (error) {
      // Theme still works for this visit if storage is unavailable.
    }
  });

  systemPrefersDark.addEventListener?.('change', (event) => {
    if (!savedPreference()) applyTheme(event.matches ? 'dark' : 'light');
  });
})();
