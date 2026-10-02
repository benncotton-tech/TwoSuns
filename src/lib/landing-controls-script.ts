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
    safePause(watch);
    overlay.remove();
    document.body.style.overflow = window.__twosunsOverflow || "";
    var bg = landingVideo();
    if (bg && !bg.hasAttribute("data-reel-hold")) safePlay(bg);
    if (typeof window.__twosunsOnWatch === "function") window.__twosunsOnWatch(false);
  }

  function openShowreel() {
    if (document.getElementById("twosuns-showreel")) return;
    var bg = landingVideo();
    var src = (bg && (bg.currentSrc || bg.getAttribute("src"))) || "/landing/reel.mp4";
    var poster = (bg && bg.getAttribute("poster")) || "/landing/poster.jpg";
    window.__twosunsOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (bg) safePause(bg);

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
    var closeBtn = overlay.querySelector(".twosuns-showreel-x");
    if (closeBtn && closeBtn.focus) closeBtn.focus();

    overlay.addEventListener("click", function (event) {
      var close = event.target && event.target.closest && event.target.closest("[data-showreel-close]");
      if (close) closeShowreel();
    });

    var watch = overlay.querySelector("video");
    if (watch) {
      watch.muted = false;
      try { watch.volume = 1; } catch (e) {}
      safePlay(watch);
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

      var menuBtn = target.closest("[data-menu-toggle]");
      if (menuBtn) {
        window.__twosunsMenuStamp = event.timeStamp;
        var menu = document.getElementById("twosuns-mobile-menu");
        if (menu && menu.showModal && !menu.open) {
          try { menu.showModal(); } catch (e) {}
        } else if (menu && menu.open && menu.close) {
          try { menu.close(); } catch (e) {}
        }
        return;
      }

      var menuClose = target.closest("[data-menu-close]");
      if (menuClose) {
        var closing = document.getElementById("twosuns-mobile-menu");
        if (closing && closing.open && closing.close) {
          try { closing.close(); } catch (e) {}
        }
        return;
      }

      var menuLink = target.closest("#twosuns-mobile-menu a");
      if (menuLink) {
        var linked = document.getElementById("twosuns-mobile-menu");
        if (linked && linked.open && linked.close) {
          try { linked.close(); } catch (e) {}
        }
      }

      var soundBtn = target.closest("[data-sound-toggle]");
      if (soundBtn) {
        var video = landingVideo();
        if (!video) return;
        window.__twosunsSoundStamp = event.timeStamp;
        var soundOn = video.muted;
        video.muted = !soundOn;
        try { video.volume = 1; } catch (e) {}
        if (soundOn) safePlay(video);
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
          var html = document.documentElement;
          var prev = html.style.scrollBehavior;
          html.style.scrollBehavior = "auto";
          window.scrollTo(0, y < 0 ? 0 : y);
          html.style.scrollBehavior = prev;
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, "", "/#" + hash);
          }
        }
      }
    },
    true
  );

  function safePause(el) {
    if (!el) return;
    try { el.pause(); } catch (e) {}
  }

  function safePlay(el) {
    if (!el || document.hidden) return;
    try {
      if (el.error) {
        try { el.load(); } catch (e) { return; }
      }
      var play = el.play();
      if (play && play.catch) play.catch(function () {});
    } catch (e) {}
  }

  function pauseHouseMedia() {
    var list = document.querySelectorAll("video");
    for (var i = 0; i < list.length; i++) {
      if (!list[i].paused) list[i].setAttribute("data-was-playing", "1");
      safePause(list[i]);
    }
  }

  function resumeHouseMedia() {
    if (document.hidden) return;
    var overlay = document.getElementById("twosuns-showreel");
    if (overlay) {
      safePlay(overlay.querySelector("video"));
      return;
    }
    var marked = document.querySelectorAll("video[data-was-playing='1']");
    for (var m = 0; m < marked.length; m++) {
      marked[m].removeAttribute("data-was-playing");
      safePlay(marked[m]);
    }
    var bg = landingVideo();
    if (bg && !bg.hasAttribute("data-reel-hold")) safePlay(bg);
  }

  function isIgnorableReason(reason) {
    if (!reason) return false;
    var name = reason.name || "";
    var msg = String(reason.message || reason || "");
    if (name === "AbortError" || name === "NotAllowedError" || name === "NotSupportedError") {
      return true;
    }
    return /play\(\)|interrupted|aborted|Load failed|Failed to fetch|The operation was aborted|media resource|fetching process for the media/i.test(msg);
  }

  window.addEventListener("unhandledrejection", function (event) {
    if (isIgnorableReason(event.reason)) event.preventDefault();
  });

  if (!window.__twosunsResumeBound) {
    window.__twosunsResumeBound = true;
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") pauseHouseMedia();
      else resumeHouseMedia();
    });
    window.addEventListener("pageshow", resumeHouseMedia);
    window.addEventListener("pagehide", pauseHouseMedia);
    document.addEventListener("freeze", pauseHouseMedia);
    document.addEventListener("resume", resumeHouseMedia);
  }

  document.addEventListener("keydown", function (event) {
    var overlay = document.getElementById("twosuns-showreel");
    if (!overlay) return;
    if (event.key === "Escape") {
      closeShowreel();
      return;
    }
    if (event.key !== "Tab") return;
    var focusable = overlay.querySelectorAll("a[href], button, video");
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();`
