// Prevent anything from running unless enabled
chrome.storage.sync.get(['enabled'], (result) => {
    const isEnabled = result.enabled ?? true; // default ON
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
  
    function extractFirstNameFromProfile() {
      const nameHeading = document.querySelector('h1');
      if (nameHeading && nameHeading.innerText.trim()) {
        const fullName = nameHeading.innerText.trim();
        storedFirstName = fullName.split(" ")[0];
        console.log(`✅ Stored first name: ${storedFirstName}`);
      } else {
        console.log("❌ Could not find <h1> element for name.");
      }
    }
  
    function insertNoteIfReady() {
      const noteBox = document.querySelector('textarea[name="message"]');
      if (noteBox && storedFirstName && !noteBox.value) {
        const message = `Hi ${storedFirstName}, 
I’m expanding my network and exploring potential opportunities. I’d be glad to connect and learn more about any roles that might align with my background.
  
Looking forward to connecting!`;
  
        noteBox.value = message;
        noteBox.dispatchEvent(new Event('input', { bubbles: true }));
        console.log("✅ Note box filled with custom message.");
      }
    }
  
    // Watch for profile URL changes (SPA navigation)
    const urlWatcher = setInterval(() => {
      if (location.href !== lastProfileUrl) {
        lastProfileUrl = location.href;
        storedFirstName = null;
        console.log("🔄 Profile URL changed, re-extracting name...");
        setTimeout(extractFirstNameFromProfile, 1000);
      }
    }, 500);
  
    // Watch for the Add Note modal
    const observer = new MutationObserver(() => {
      const noteBox = document.querySelector('textarea[name="message"]');
      if (noteBox) {
        setTimeout(insertNoteIfReady, 300);
      }
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  
    // On first load
    window.addEventListener('load', () => {
      setTimeout(extractFirstNameFromProfile, 1000);
    });
  }
  