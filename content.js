chrome.storage.sync.get(['enabled'], (result) => {
  const isEnabled = result.enabled ?? true;
  if (isEnabled) {
    console.log("✅ Auto Note is enabled.");
    initAutoNote();
  } else {
    console.log("🛑 Auto Note is disabled.");
  }
});

function initAutoNote() {
  let storedFirstName = null;
  let lastProfileUrl = location.href;

  // Store name string immediately on connect click
  document.addEventListener("mousedown", (e) => {
    const btn = e.target.closest("button[aria-label*='Invite']");
    if (btn && btn.innerText.trim() === "Connect") {
      const aria = btn.getAttribute("aria-label");
      const match = aria?.match(/Invite (.+?) to connect/i);
      if (match && match[1]) {
        storedFirstName = match[1].split(" ")[0];
        console.log("🕵️ Stored name from click:", storedFirstName);
      }
    }
  });

  // Try extracting name from profile page if available
  function extractFirstNameFromProfile() {
    const profileHeader = document.querySelector('h1');
    if (profileHeader && profileHeader.innerText.trim()) {
      storedFirstName = profileHeader.innerText.trim().split(" ")[0];
      console.log("✅ Name from profile page:", storedFirstName);
    }
  }

  // Insert note message if all conditions are met
  function insertNoteIfReady(retry = 0) {
    const noteBox = document.querySelector('textarea[name="message"]');

    if (noteBox && storedFirstName && !noteBox.value) {
      const message = `Hi ${storedFirstName}, `;

      noteBox.value = message;
      noteBox.dispatchEvent(new Event('input', { bubbles: true }));
      console.log("✅ Note inserted.");
    } else if (!noteBox && retry < 10) {
      setTimeout(() => insertNoteIfReady(retry + 1), 250);
      console.log(`⏳ Waiting for note box... Retry ${retry + 1}`);
    } else {
      if (!noteBox) console.log("❌ Note box still not found.");
      if (!storedFirstName) console.log("❌ First name not available.");
      if (noteBox?.value) console.log("⚠️ Note already filled.");
    }
  }

  // Watch for LinkedIn SPA navigation
  const urlWatcher = setInterval(() => {
    if (location.href !== lastProfileUrl) {
      lastProfileUrl = location.href;
      storedFirstName = null;
      console.log("🔄 URL changed. Resetting name.");
      setTimeout(extractFirstNameFromProfile, 1000);
    }
  }, 500);

  // Watch DOM mutations for the Add Note modal
  const observer = new MutationObserver(() => {
    const noteBox = document.querySelector('textarea[name="message"]');
    if (noteBox && storedFirstName && !noteBox.value) {
      insertNoteIfReady();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // On initial load
  window.addEventListener('load', () => {
    setTimeout(extractFirstNameFromProfile, 1000);
  });
}
