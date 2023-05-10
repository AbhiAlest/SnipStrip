document.addEventListener("mouseup", (event: MouseEvent) => {
  const selectedText = window.getSelection()?.toString();
  if (selectedText) {
    chrome.runtime.sendMessage({ text: selectedText });
  }
});
