function translateText(text: string): void {
  const translationAPIKey = 'YOUR_TRANSLATION_API_KEY';
  const translateEndpoint = `https://translation-api.com/api/v1/translate?key=${translationAPIKey}&text=${encodeURIComponent(
    text
  )}&target=TARGET_LANGUAGE_CODE`;

  fetch(translateEndpoint)
    .then((response) => response.json())
    .then((data) => {
      const translatedText = data.translation;
      console.log(`Translation: ${translatedText}`);
    })
    .catch((error) => {
      console.error('Translation error:', error);
    });
}

function searchOnPlatform(text: string, platform: string): void {
  switch (platform) {
    case 'Reddit':
      console.log(`Search on Reddit: ${text}`);
      break;
    case 'Twitter':
      console.log(`Search on Twitter: ${text}`);
      break;
    case 'Facebook':
      console.log(`Search on Facebook: ${text}`);
      break;
    default:
      console.log(`Unsupported platform: ${platform}`);
  }
}

function shareOnPlatform(text: string, platform: string): void {
  switch (platform) {
    case 'Twitter':
      console.log(`Share on Twitter: ${text}`);
      break;
    case 'Facebook':
      console.log(`Share on Facebook: ${text}`);
      break;
    case 'LinkedIn':
      console.log(`Share on LinkedIn: ${text}`);
      break;
    default:
      console.log(`Unsupported platform: ${platform}`);
  }
}

chrome.runtime.onMessage.addListener(function (
  request: { action: string; text: string; platform?: string },
  sender,
  sendResponse
) {
  const { action, text, platform } = request;

  if (action === 'translate') {
    translateText(text);
  } else if (action === 'search') {
    if (platform) {
      searchOnPlatform(text, platform);
    } else {
      console.error('Platform not specified for search action');
    }
  } else if (action === 'share') {
    if (platform) {
      shareOnPlatform(text, platform);
    } else {
      console.error('Platform not specified for share action');
    }
  }
});

chrome.commands.onCommand.addListener(function (command) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id!, { action: command });
  });
});

