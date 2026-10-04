import { DualSun } from "@/components/dual-sun"
import { Wordmark } from "@/components/wordmark"
import { founders, house, nav, site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-cream/10 bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8 lg:py-16">
        <div>
          <Wordmark className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver">
            {site.tagline}
          </p>
        </div>
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
            House
          </p>
          <p className="mt-3 text-sm text-cream/90">
            {house.city}
            <span className="text-silver"> · {house.country}</span>
          </p>
          <ul className="mt-4 space-y-1 text-sm text-cream/90">
            {founders.map((person) => (
              <li key={person.id}>
                {person.name}
                <span className="text-silver"> · {person.craft}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-6">
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-[0.7rem] uppercase tracking-[0.28em] text-cream/80 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-silver">
              © {site.name} · {site.domain}
            </p>
            <DualSun className="h-6 w-10" />
          </div>
        </div>
      </div>
    </footer>
  )
}
