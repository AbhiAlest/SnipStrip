import * as Sentry from '@sentry/browser';



interface TextHistoryEntry {
  id: string;
  text: string;
  timestamp: number;
}

function getHistory(callback: (history: TextHistoryEntry[]) => void): void {
  chrome.storage.local.get(['history'], function (result) {
    const history: TextHistoryEntry[] = result.history || [];
    callback(history);
  });
}

function saveToHistory(text: string): void {
  getHistory(function (history) {
    const id = Date.now().toString();
    const entry: TextHistoryEntry = {
      id,
      text,
      timestamp: Date.now(),
    };
    history.push(entry);
    chrome.storage.local.set({ history });
  });
}

function removeFromHistory(id: string): void {
  getHistory(function (history) {
    const updatedHistory = history.filter((entry) => entry.id !== id);
    chrome.storage.local.set({ history: updatedHistory });
  });
}

function clearHistory(): void {
  chrome.storage.local.remove(['history']);
}

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
      Sentry.captureException(error); // Log translation error to Sentry
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
      Sentry.captureMessage('Platform not specified for search action'); // Log warning to Sentry
    }
  } else if (action === 'share') {
    if (platform) {
      shareOnPlatform(text, platform);
    } else {
      console.error('Platform not specified for share action');
      Sentry.captureMessage('Platform not specified for share action'); // Log warning to Sentry
    }
  }

  saveToHistory(text);
});

chrome.commands.onCommand.addListener(function (command) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab?.id!, { action: command });
  });
});

chrome.runtime.onMessage.addListener(function (
  request: { action: string; id?: string },
  sender,
  sendResponse
) {
  if (request.action === 'removeFromHistory' && request.id) {
    removeFromHistory(request.id);
    syncHistory(history); // Sync history after removing an entry
  } else if (request.action === 'clearHistory') {
    clearHistory();
    syncHistory(history); // Sync history after clearing all entries
  } else if (request.action === 'updatePreferences' && request.preferences) {
    preferences = request.preferences;
    syncPreferences(preferences);
  }
});

function syncPreferences(preferences: UserPreferences): void {
  chrome.storage.sync.set({ preferences }, function () {
    console.log('Preferences synced successfully');
  });
}

function syncHistory(history: TextHistoryEntry[]): void {
  chrome.storage.sync.set({ history }, function () {
    console.log('History synced successfully');
  });
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.get(['preferences'], function (result) {
    const syncedPreferences: UserPreferences | undefined = result.preferences;
    if (syncedPreferences) {
      preferences = syncedPreferences;
      console.log('Preferences synced on install/update');
    } else {
      syncPreferences(preferences);
    }
  });
  chrome.storage.sync.get(['history'], function (result) {
    const syncedHistory: TextHistoryEntry[] | undefined = result.history;
    if (syncedHistory) {
      history = syncedHistory;
      console.log('History synced on install/update');
    } else {
      syncHistory(history);
    }
  });
});

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
});

function handleError(error: any): void {
  console.error('An error occurred:', error);
  Sentry.captureException(error);
}

function handleWarning(warning: any): void {
  console.warn('A warning occurred:', warning);
  Sentry.captureMessage(warning);
}

