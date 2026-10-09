// Rotates the home page phrases, one at a time: fade in 3 s, hold 6 s, fade out 3 s, then the next (never a cross-fade, so
// two phrases are never on screen together). A shuffled queue: every phrase once before any repeats, never the same twice
// in a row. Paused while the tab is hidden. With reduced motion it shows one random phrase and does not rotate. Without
// this script the first (English) phrase stays.
(function () {
  var box = document.querySelector("[data-tagline]");
  if (!box) return;
  var lines = Array.prototype.slice.call(box.querySelectorAll(".tag-line"));
  if (lines.length < 2) return;
  var FADE = 3000, HOLD = 6000;
  var current = -1;
  var queue = [];
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function next() {
    if (!queue.length) {
      queue = shuffle(lines.map(function (_, i) { return i; }));
      if (queue[queue.length - 1] === current) { var t = queue[0]; queue[0] = queue[queue.length - 1]; queue[queue.length - 1] = t; }
    }
    return queue.pop();
  }
  function setOn(i, on) { lines[i].classList.toggle("is-on", on); }
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  lines.forEach(function (l, i) { l.classList.remove("is-on"); });
  if (reduce) { setOn(Math.floor(Math.random() * lines.length), true); return; }

  var timer = null, step = "idle", started = 0, remaining = 0;
  // steps: in (fade in) -> hold -> out (fade out) -> in ...
  function run(name, ms) {
    step = name; started = Date.now(); remaining = ms;
    timer = setTimeout(done, ms);
  }
  function done() {
    timer = null;
    if (step === "in") run("hold", HOLD);
    else if (step === "hold") { setOn(current, false); run("out", FADE); }
    else { current = current; var n = next(); current = n; setOn(n, true); run("in", FADE); }
  }
  function begin() { var n = next(); current = n; void box.offsetWidth; setOn(n, true); run("in", FADE); }
  begin();
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      // Pause: freeze the timer (the running fade finishes, the next step waits).
      if (timer) { clearTimeout(timer); timer = null; remaining = Math.max(0, remaining - (Date.now() - started)); }
    } else if (!timer) {
      started = Date.now(); timer = setTimeout(done, remaining);
    }
  });
})();
