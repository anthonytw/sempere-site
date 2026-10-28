// Copies the demo key to the clipboard. The key is public on purpose (see /demo).
(function () {
  var button = document.getElementById("copy-key");
  if (!button) return;
  var status = document.getElementById("copy-status");
  button.addEventListener("click", function () {
    var box = document.getElementById(button.getAttribute("data-target"));
    if (!box) return;
    box.focus();
    box.select();
    var done = function (ok) { if (status) status.textContent = ok ? "Copied." : "Select the text and copy it by hand."; };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(box.value).then(function () { done(true); }, function () { done(document.execCommand("copy")); });
    } else {
      done(document.execCommand("copy"));
    }
  });
})();
