// Theme: Auto (follows the OS, default), Light, Dark. Loaded synchronously in <head>, before the stylesheet, so the saved
// choice is on <html data-theme> before first paint (no flash, no inline script). Auto = no data-theme attribute.
(function () {
  var KEY = "sempere-theme", root = document.documentElement;
  var order = ["auto", "light", "dark"], names = { auto: "Auto", light: "Light", dark: "Dark" };
  function read() { try { var v = localStorage.getItem(KEY); return v === "light" || v === "dark" ? v : "auto"; } catch (e) { return "auto"; } }
  function save(v) { try { if (v === "auto") localStorage.removeItem(KEY); else localStorage.setItem(KEY, v); } catch (e) { /* private mode, blocked storage */ } }
  function apply(v) { if (v === "auto") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", v); }
  var state = read();
  apply(state);
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    var label = btn.querySelector(".theme-label");
    function paint() {
      var next = order[(order.indexOf(state) + 1) % 3];
      btn.setAttribute("data-state", state);
      if (label) label.textContent = names[state];
      btn.setAttribute("aria-label", "Theme: " + names[state] + ". Activate to switch to " + names[next] + ".");
      btn.title = "Theme: " + names[state] + (state === "auto" ? " (follows your device)" : "") + ". Click to change.";
    }
    btn.hidden = false;
    paint();
    btn.addEventListener("click", function () {
      state = order[(order.indexOf(state) + 1) % 3];
      save(state); apply(state); paint();
    });
  });
})();
