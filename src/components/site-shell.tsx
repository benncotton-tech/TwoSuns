import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-frame relative flex min-h-full flex-1 flex-col">
      <div className="film-grain" aria-hidden />
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  )
}
