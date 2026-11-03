// Apply the saved theme before styles load; core content needs no JavaScript.
(() => {
  const root = document.documentElement;
  let preference = 'dark';
  try { preference = localStorage.getItem('portfolio-theme') || 'dark'; } catch {}
  const apply = (value) => {
    const theme = value === 'light' ? 'light' : 'dark';
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.hidden = false;
      button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
      button.setAttribute('aria-pressed', String(theme === 'light'));
    });
  };
  apply(preference);
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        apply(theme);
        try { localStorage.setItem('portfolio-theme', theme); } catch {}
      });
    });
  });
  window.addEventListener('storage', (event) => {
    if (event.key === 'portfolio-theme') apply(event.newValue);
  });
})();
