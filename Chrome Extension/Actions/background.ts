chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { action, text } = request;

  if (action === 'translate') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'translate', text });
    });
  } else if (action === 'search') {
    const platform: string = 'Reddit';
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'search', text, platform });
    });
  } else if (action === 'share') {
    const platform: string = 'Twitter';
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'share', text, platform });
    });
  }
});
