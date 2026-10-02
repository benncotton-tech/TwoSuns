import type { Metadata } from "next"
import { Bodoni_Moda, Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <Script src="/landing-sound.js" strategy="beforeInteractive" />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
