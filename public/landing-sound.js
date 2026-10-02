(() => {
  if (window.__twosunsSoundBound) return
  window.__twosunsSoundBound = true
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const btn = target.closest("[data-sound-toggle]")
      if (!btn) return
      const video = document.querySelector("[data-landing-reel]")
      if (!(video instanceof HTMLVideoElement)) return
      window.__twosunsSoundStamp = event.timeStamp
      const soundOn = video.muted
      video.muted = !soundOn
      video.volume = 1
      if (soundOn) {
        const play = video.play()
        if (play && play.catch) play.catch(() => undefined)
      }
      btn.setAttribute("aria-pressed", soundOn ? "true" : "false")
      btn.setAttribute("aria-label", soundOn ? "Mute showreel" : "Unmute showreel")
      const label = btn.querySelector("[data-sound-label]")
      if (label) label.textContent = soundOn ? "Mute" : "Sound"
      if (typeof window.__twosunsOnSound === "function") {
        window.__twosunsOnSound(soundOn)
      }
    },
    true
  )
})()
