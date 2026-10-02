/**
 * Auto-reset Next.js error UI after a frozen Safari tab comes back.
 * Module-level cap so a real render bug cannot loop forever.
 */

const WINDOW_MS = 12_000
const MAX_AUTO = 2

let attempts = 0
let windowStarted = 0

export function consumeRecoveryAttempt() {
  const now = Date.now()
  if (now - windowStarted > WINDOW_MS) {
    attempts = 0
    windowStarted = now
  }
  if (attempts >= MAX_AUTO) return false
  attempts += 1
  return true
}

export function bindResumeRecovery(reset: () => void) {
  const run = () => {
    if (!consumeRecoveryAttempt()) return
    try {
      reset()
    } catch {
      /* reset itself can throw if the tree is gone */
    }
  }

  const onPageShow = () => run()
  const onVisible = () => {
    if (document.visibilityState === "visible") run()
  }

  window.addEventListener("pageshow", onPageShow)
  document.addEventListener("visibilitychange", onVisible)
  const timer = window.setTimeout(run, 80)

  return () => {
    window.removeEventListener("pageshow", onPageShow)
    document.removeEventListener("visibilitychange", onVisible)
    window.clearTimeout(timer)
  }
}
