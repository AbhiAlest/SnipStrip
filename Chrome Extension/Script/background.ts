import { chrome } from 'chrome';

chrome.runtime.onMessage.addListener(function(request: { text: string }, sender, sendResponse) {
  const selectedText = request.text;
  
  function copyToClipboard(text: string) {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
  
  function highlightText(text: string) {
    const youtubeVideo = document.querySelector("video");
    if (youtubeVideo) {
      const videoText = youtubeVideo.innerText;
      const highlightedText = videoText.replace(new RegExp(text, "gi"), function(match) {
        return "<span style='background-color: yellow'>" + match + "</span>";
      });
      youtubeVideo.innerHTML = highlightedText;
    }
  }
  
  if (selectedText) {
    const userChoice = confirm("Do you want to copy or highlight the selected text?");
    if (userChoice) {
      copyToClipboard(selectedText);
      alert("Text copied to the clipboard!");
    } else {
      highlightText(selectedText);
      alert("Text highlighted in the video!");
    }
  }
});
