import type { Metadata } from "next"
import { Bodoni_Moda, Geist, Geist_Mono } from "next/font/google"
import { SiteShell } from "@/components/site-shell"
import { site } from "@/lib/site"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "TwoSuns — Boutique film production, Stockholm",
    template: "%s · TwoSuns",
  },
  description: site.description,
  applicationName: site.name,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "TwoSuns",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en",
    type: "website",
    images: [{ url: "/twosuns-logo.png", alt: "TwoSuns" }],
  },
}

const soundUnmuteScript = `(function(){
  if (window.__twosunsSoundBound) return;
  window.__twosunsSoundBound = true;
  document.addEventListener("click", function(event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var btn = target.closest("[data-sound-toggle]");
    if (!btn) return;
    var video = document.querySelector("[data-landing-reel]");
    if (!video) return;
    window.__twosunsSoundStamp = event.timeStamp;
    var soundOn = video.muted;
    video.muted = !soundOn;
    video.volume = 1;
    if (soundOn) {
      var play = video.play();
      if (play && play.catch) play.catch(function(){});
    }
    btn.setAttribute("aria-pressed", soundOn ? "true" : "false");
    btn.setAttribute("aria-label", soundOn ? "Mute showreel" : "Unmute showreel");
    var label = btn.querySelector("[data-sound-label]");
    if (label) label.textContent = soundOn ? "Mute" : "Sound";
    if (typeof window.__twosunsOnSound === "function") window.__twosunsOnSound(soundOn);
  }, true);
})();`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <script dangerouslySetInnerHTML={{ __html: soundUnmuteScript }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
