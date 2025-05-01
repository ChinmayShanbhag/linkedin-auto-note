# LinkedIn Auto Note

A lightweight Chrome extension that automatically fills in a personalized connection message when you click "Add a note" on someone's LinkedIn profile.

## Features

- Detects the first name from LinkedIn profiles
- Auto-fills your custom connection message
- Works with LinkedIn’s single-page navigation (SPA)
- Toggle to enable or disable the extension as needed

## Installation (Unpacked)

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer Mode** (top right)
4. Click **Load Unpacked**
5. Select the folder containing this extension

## Customize Your Message

Edit `content.js` inside the `insertNoteIfReady()` function to change the message:

```javascript
const message = `Hi ${storedFirstName}, 
I’m expanding my network and exploring potential opportunities. I’d be glad to connect and learn more about any roles that might align with my background.

Looking forward to connecting!`;
