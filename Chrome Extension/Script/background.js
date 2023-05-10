// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var selectedText = request.text;
  // Perform the desired action with the selected text (e.g., copy to clipboard)
  // Implement your logic here
});
