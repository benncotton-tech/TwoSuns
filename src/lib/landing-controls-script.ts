export const landingControlsScript = `(function () {
  if (window.__twosunsControlsBound) return;
  window.__twosunsControlsBound = true;

  function landingVideo() {
    return document.querySelector("[data-landing-reel]");
  }

  function closeShowreel() {
    var overlay = document.getElementById("twosuns-showreel");
    if (!overlay) return;
    var watch = overlay.querySelector("video");
    if (watch) watch.pause();
    overlay.remove();
    document.body.style.overflow = window.__twosunsOverflow || "";
    var bg = landingVideo();
    if (bg) {
      var play = bg.play();
      if (play && play.catch) play.catch(function () {});
    }
    if (typeof window.__twosunsOnWatch === "function") window.__twosunsOnWatch(false);
  }

  function openShowreel() {
    if (document.getElementById("twosuns-showreel")) return;
    var bg = landingVideo();
    var src = (bg && (bg.currentSrc || bg.getAttribute("src"))) || "/landing/reel.mp4";
    var poster = (bg && bg.getAttribute("poster")) || "/landing/poster.jpg";
    window.__twosunsOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (bg) bg.pause();

    var overlay = document.createElement("div");
    overlay.id = "twosuns-showreel";
    overlay.className = "twosuns-showreel";
    overlay.innerHTML =
      '<button type="button" class="twosuns-showreel-backdrop" data-showreel-close="true" aria-label="Close film"></button>' +
      '<div class="twosuns-showreel-panel" role="dialog" aria-modal="true" aria-labelledby="watch-title">' +
        '<button type="button" class="twosuns-showreel-x" data-showreel-close="true" aria-label="Close film">×</button>' +
        '<div class="twosuns-showreel-frame">' +
          '<video src="' + src + '" poster="' + poster + '" autoplay controls playsinline></video>' +
        "</div>" +
        '<div class="twosuns-showreel-copy">' +
          '<p class="twosuns-showreel-kicker">Stockholm</p>' +
          '<h2 id="watch-title">Showreel</h2>' +
          '<p>Pictures from the house. Mute stays on until you ask for sound.</p>' +
          '<a href="/#work">On the slate</a>' +
        "</div>" +
      "</div>";
    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (event) {
      var close = event.target && event.target.closest && event.target.closest("[data-showreel-close]");
      if (close) closeShowreel();
    });

    var watch = overlay.querySelector("video");
    if (watch) {
      watch.muted = false;
      watch.volume = 1;
      var play = watch.play();
      if (play && play.catch) play.catch(function () {});
    }
    if (typeof window.__twosunsOnWatch === "function") window.__twosunsOnWatch(true);
  }

  window.__twosunsOpenShowreel = openShowreel;
  window.__twosunsCloseShowreel = closeShowreel;

  document.addEventListener(
    "click",
    function (event) {
      var target = event.target;
      if (!target || !target.closest) return;

      var soundBtn = target.closest("[data-sound-toggle]");
      if (soundBtn) {
        var video = landingVideo();
        if (!video) return;
        window.__twosunsSoundStamp = event.timeStamp;
        var soundOn = video.muted;
        video.muted = !soundOn;
        video.volume = 1;
        if (soundOn) {
          var play = video.play();
          if (play && play.catch) play.catch(function () {});
        }
        soundBtn.setAttribute("aria-pressed", soundOn ? "true" : "false");
        soundBtn.setAttribute("aria-label", soundOn ? "Mute showreel" : "Unmute showreel");
        var label = soundBtn.querySelector("[data-sound-label]");
        if (label) label.textContent = soundOn ? "Mute" : "Sound";
        if (typeof window.__twosunsOnSound === "function") window.__twosunsOnSound(soundOn);
        return;
      }

      var showBtn = target.closest("[data-showreel-toggle]");
      if (showBtn) {
        window.__twosunsWatchStamp = event.timeStamp;
        openShowreel();
        return;
      }

      var link = target.closest('a[href*="#"]');
      if (link) {
        var href = link.getAttribute("href") || "";
        var hash = href.split("#")[1] || "";
        var section = hash && document.getElementById(hash);
        if (section && (href.charAt(0) === "#" || href.indexOf("/#") === 0)) {
          event.preventDefault();
          event.stopPropagation();
          var y =
            section.getBoundingClientRect().top +
            (window.pageYOffset || document.documentElement.scrollTop);
          window.scrollTo(0, y < 0 ? 0 : y);
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, "", "/#" + hash);
          }
        }
      }
    },
    true
  );

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeShowreel();
  });
})();`
