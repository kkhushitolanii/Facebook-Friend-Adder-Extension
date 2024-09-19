document.getElementById('addFriendsButton').addEventListener('click', () => {
  const friendCount = parseInt(document.getElementById('friendCount').value);

  if (isNaN(friendCount) || friendCount < 1) {
    document.getElementById('status').innerText = 'Please enter a valid number.';
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'addFriends', count: friendCount });
  });

  document.getElementById('status').innerText = `Processing ${friendCount} friend requests...`;

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'requestsCompleted') {
      document.getElementById('status').innerText = `Successfully sent ${message.addedCount} friend requests!`;
    }
  });
});




