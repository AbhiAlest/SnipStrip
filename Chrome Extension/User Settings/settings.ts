document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.sync.get(["setting1", "setting2"], function(result) {
    const setting1Checkbox = document.getElementById("setting1") as HTMLInputElement;
    const setting2Input = document.getElementById("setting2") as HTMLInputElement;
    setting1Checkbox.checked = result.setting1 ?? false;
    setting2Input.value = result.setting2 ?? "";
  });

  const saveBtn = document.getElementById("saveBtn");
  saveBtn.addEventListener("click", function() {
    const setting1Checkbox = document.getElementById("setting1") as HTMLInputElement;
    const setting2Input = document.getElementById("setting2") as HTMLInputElement;

    const settings = {
      setting1: setting1Checkbox.checked,
      setting2: setting2Input.value,
    };

    chrome.storage.sync.set(settings, function() {
      alert("Settings saved successfully!");
    });
  });
});
