chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'addFriends') {
    const count = message.count;
    let addedCount = 0;
    let retryAttempts = 0;
    const maxRetries = 10; 

    function sendFriendRequests() {
      const addFriendButtons = Array.from(document.querySelectorAll('span'))
        .filter(span => span.innerText.trim() === 'Add friend');
      
      console.log(`Found ${addFriendButtons.length} "Add friend" buttons.`);

      for (let i = 0; i < addFriendButtons.length && addedCount < count; i++) {
        try {
          addFriendButtons[i].click(); 
          addedCount++;
          console.log(`Friend request ${addedCount} sent.`);
        } catch (error) {
          console.error(`Error sending friend request ${addedCount + 1}:`, error);
        }
      }

      if (addedCount < count && retryAttempts < maxRetries) {
        console.log('Not enough buttons found, scrolling to load more suggestions...');
        window.scrollBy(0, window.innerHeight); 
        retryAttempts++;
        setTimeout(sendFriendRequests, 2000);
      } else {
       
        setTimeout(() => {
          if (addedCount >= count) {
            console.log(`Successfully sent ${addedCount} friend requests.`);
            chrome.runtime.sendMessage({ action: 'requestsCompleted', addedCount });
            alert(`Successfully sent ${addedCount} friend requests!`);
          } else {
            console.error('Failed to send the required number of friend requests.');
            chrome.runtime.sendMessage({ action: 'requestsCompleted', addedCount });
            alert(`Unable to send ${count} friend requests. Only ${addedCount} requests were sent.`);
          }
        }, 1000); 
      }
    }

    sendFriendRequests();
  }
});










