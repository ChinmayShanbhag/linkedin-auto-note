const toggle = document.getElementById('toggle');

chrome.storage.sync.get(['enabled'], (result) => {
  toggle.checked = result.enabled ?? true; // default ON
});

toggle.addEventListener('change', () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
});
