(() => {
  const explorer = document.querySelector('[data-project-explorer]');
  if (explorer) {
    const tabs = [...explorer.querySelectorAll('[data-project-tab]')];
    const panels = [...explorer.querySelectorAll('[data-project-panel]')];
    const bar = explorer.querySelector('.explorer-tabs');
    bar.hidden = false;
    bar.setAttribute('role', 'tablist');
    const select = (index, focus = false) => {
      tabs.forEach((tab, i) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].setAttribute('role', 'tabpanel');
        panels[i].hidden = i !== index;
      });
      if (focus) tabs[index].focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (event) => {
        let index;
        if (event.key === 'ArrowRight') index = (i + 1) % tabs.length;
        if (event.key === 'ArrowLeft') index = (i - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') index = 0;
        if (event.key === 'End') index = tabs.length - 1;
        if (index !== undefined) { event.preventDefault(); select(index, true); }
      });
    });
    select(0);
  }
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', async () => {
      const status = document.getElementById(button.getAttribute('aria-describedby'));
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        status.textContent = button.dataset.success || 'Copied.';
      } catch {
        status.textContent = `Copy this: ${button.dataset.copy}`;
      }
    });
  });
})();
