chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'statusUpdate') {
      chrome.storage.local.set({ addedCount: message.addedCount });
    }
  });
  
