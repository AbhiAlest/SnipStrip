function displayHistory(): void {
  chrome.storage.local.get(['history'], function (result) {
    const history: TextHistoryEntry[] = result.history || [];

    const historyList = document.getElementById('historyList');
    if (historyList) {
      historyList.innerHTML = '';

      if (history.length === 0) {
        historyList.innerHTML = '<p>No history entries.</p>';
        return;
      }

      history.forEach((entry) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${entry.text}</span><button class="removeButton" data-id="${entry.id}">Remove</button>`;
        historyList.appendChild(listItem);
      });
    }

    const removeButtons = document.getElementsByClassName('removeButton');
    Array.from(removeButtons).forEach((button) => {
      button.addEventListener('click', function () {
        const id = button.getAttribute('data-id');
        if (id) {
          chrome.runtime.sendMessage({ action: 'removeFromHistory', id });
        }
      });
    });
  });
}

function clearHistory(): void {
  chrome.runtime.sendMessage({ action: 'clearHistory' });
}

function initializeOptions(): void {
  displayHistory();

  const clearButton = document.getElementById('clearButton');
  if (clearButton) {
    clearButton.addEventListener('click', function () {
      clearHistory();
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  initializeOptions();
});
