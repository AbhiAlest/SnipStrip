document.addEventListener("mouseup", function(event) {
  var selectedText = window.getSelection().toString();
  if (selectedText) {
    chrome.runtime.sendMessage({ text: selectedText });
  }
});
