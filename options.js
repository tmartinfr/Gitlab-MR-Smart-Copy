const DEFAULTS = { shortcutKey: 'c', idShortcutKey: 'i' };

const form = document.getElementById('options');
const inputs = {
  shortcutKey: document.getElementById('shortcut-key'),
  idShortcutKey: document.getElementById('id-shortcut-key'),
};
const status = document.getElementById('status');

chrome.storage.sync.get(DEFAULTS, (settings) => {
  for (const name in inputs) inputs[name].value = settings[name];
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const keys = {};
  for (const name in inputs) keys[name] = inputs[name].value.trim();

  // Letters and digits only: symbols depend on the keyboard layout
  if (!Object.values(keys).every((key) => /^[a-zA-Z0-9]$/.test(key))) {
    status.textContent = 'Use a single letter or digit.';
    return;
  }
  if (keys.shortcutKey === keys.idShortcutKey) {
    status.textContent = 'Use a different key for each shortcut.';
    return;
  }

  chrome.storage.sync.set(keys, () => {
    for (const name in inputs) inputs[name].value = keys[name];
    status.textContent = 'Saved. Reload your GitLab tabs to apply.';
  });
});
