const DEFAULT_SHORTCUT = 'c';

const form = document.getElementById('options');
const input = document.getElementById('shortcut-key');
const status = document.getElementById('status');

chrome.storage.sync.get({ shortcutKey: DEFAULT_SHORTCUT }, (settings) => {
  input.value = settings.shortcutKey;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const key = input.value.trim();

  // Letters and digits only: symbols depend on the keyboard layout
  if (!/^[a-zA-Z0-9]$/.test(key)) {
    status.textContent = 'Use a single letter or digit.';
    return;
  }

  chrome.storage.sync.set({ shortcutKey: key }, () => {
    input.value = key;
    status.textContent = 'Saved. Reload your GitLab tabs to apply.';
  });
});
