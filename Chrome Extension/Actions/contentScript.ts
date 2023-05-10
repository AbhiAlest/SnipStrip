async function translateText(text: string): Promise<void> {
  const response = await fetch('https://translation.googleapis.com/language/translate/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      target: 'en', 
      format: 'text',
      source: 'auto',
    }),
  });

  const data = await response.json();

  const translatedText = data.data.translations[0].translatedText;

  alert('Translated Text: ' + translatedText);
}

function searchOnPlatform(text: string, platform: string): void {
  let searchUrl: string;

  if (platform === 'Reddit') {
    searchUrl = `https://www.reddit.com/search?q=${encodeURIComponent(text)}`;
  } else if (platform === 'Twitter') {
    searchUrl = `https://twitter.com/search?q=${encodeURIComponent(text)}`;
  } else if (platform === 'Facebook') {
    searchUrl = `https://www.facebook.com/search/top/?q=${encodeURIComponent(text)}`;
  } else {
    return;
  }

  chrome.tabs.create({ url: searchUrl });
}

function shareOnPlatform(text: string, platform: string): void {
  let shareUrl: string;

  if (platform === 'Twitter') {
    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  } else if (platform === 'Facebook') {
    shareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(text)}`;
  } else if (platform === 'LinkedIn') {
    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(text)}`;
  } else {
    return;
  }

  window.open(shareUrl, '_blank');
}

chrome.runtime.onMessage.addListener(function (request: { action: string; text: string }, sender, sendResponse) {
  const { action, text } = request;

  if (action === 'translate') {
    translateText(text);
  } else if (action === 'search') {
    const platform: string = 'Reddit';
    searchOnPlatform(text, platform);
  } else if (action === 'share') {
    const platform: string = 'Twitter';
    shareOnPlatform(text, platform);
  }
});
