export default function NewsLoading() {
  return (
    <div
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="sr-only">Loading news</p>
      <div className="h-3 w-24 animate-pulse bg-gold/30" />
      <div className="mt-6 h-12 w-80 max-w-full animate-pulse bg-cream/10" />
      <div className="mt-6 h-20 max-w-xl animate-pulse bg-cream/5" />
      <div className="mt-14 space-y-0 divide-y divide-cream/10 border-y border-cream/10">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="grid gap-3 py-8 sm:grid-cols-[7.5rem_1fr]">
            <div className="h-4 w-20 animate-pulse bg-gold/20" />
            <div className="space-y-3">
              <div className="h-3 w-16 animate-pulse bg-cream/10" />
              <div className="h-8 w-64 max-w-full animate-pulse bg-cream/10" />
              <div className="h-4 w-full max-w-md animate-pulse bg-cream/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
