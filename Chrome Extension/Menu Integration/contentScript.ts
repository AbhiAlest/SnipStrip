function handleContextMenuClick(info: chrome.contextMenus.OnClickData): void {
  const selectedText = info.selectionText;

  if (selectedText) {
    chrome.runtime.sendMessage({ action: info.menuItemId, text: selectedText });
  }
}

chrome.contextMenus.create({
  id: 'translate',
  title: 'Translate',
  contexts: ['selection'], 
});

chrome.contextMenus.create({
  id: 'search',
  title: 'Search',
  contexts: ['selection'], 
});

chrome.contextMenus.create({
  id: 'share',
  title: 'Share',
  contexts: ['selection'], 
});

chrome.contextMenus.onClicked.addListener(handleContextMenuClick);
