import type { Metadata, Viewport } from "next"
import { Bodoni_Moda, Geist, Geist_Mono } from "next/font/google"
import { SiteShell } from "@/components/site-shell"
import { robotsMetadata } from "@/lib/indexing"
import { landingControlsScript } from "@/lib/landing-controls-script"
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
  robots: robotsMetadata(),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "TwoSuns",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "TwoSuns",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TwoSuns",
    description: site.description,
    images: ["/og.jpg"],
  },
}

export const viewport: Viewport = {
  themeColor: "#050505",
  viewportFit: "cover",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <script dangerouslySetInnerHTML={{ __html: landingControlsScript }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
