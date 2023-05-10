chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var selectedText = request.text;
  
  function copyToClipboard(text) {
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
  
  function highlightText(text) {
    var youtubeVideo = document.querySelector("video");
    if (youtubeVideo) {
      var videoText = youtubeVideo.innerText;
      var highlightedText = videoText.replace(new RegExp(text, "gi"), function(match) {
        return "<span style='background-color: yellow'>" + match + "</span>";
      });
      youtubeVideo.innerHTML = highlightedText;
    }
  }
  
  if (selectedText) {
    var userChoice = confirm("Do you want to copy or highlight the selected text?");
    if (userChoice) {
      copyToClipboard(selectedText);
      alert("Text copied to the clipboard!");
    } else {
      highlightText(selectedText);
      alert("Text highlighted in the video!");
    }
  }
});
