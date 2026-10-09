// Some browsers refuse muted autoplay (Brave with autoplay blocked, Safari's per-site setting, iOS Low
// Power Mode). A looping clip has no controls, so when play() is rejected or the clip stays paused,
// show the native controls so it can be started by hand.
(function () {
  var videos = document.querySelectorAll("video");
  Array.prototype.forEach.call(videos, function (v) {
    var show = function () { v.controls = true; };
    var p = v.play();
    if (p && p.catch) p.catch(show);
    setTimeout(function () { if (v.paused) show(); }, 1500);
  });
})();
