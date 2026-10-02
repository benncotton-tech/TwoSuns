export default function ContactLoading() {
  return (
    <div
      className="mx-auto grid w-full max-w-6xl gap-16 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="sr-only">Loading contact</p>
      <div>
        <div className="h-3 w-24 animate-pulse bg-gold/30" />
        <div className="mt-6 h-12 w-64 animate-pulse bg-cream/10" />
        <div className="mt-6 h-24 animate-pulse bg-cream/5" />
      </div>
      <div className="space-y-4 border border-cream/10 p-8">
        <div className="h-11 animate-pulse bg-cream/5" />
        <div className="h-11 animate-pulse bg-cream/5" />
        <div className="h-36 animate-pulse bg-cream/5" />
        <div className="h-12 w-40 animate-pulse bg-gold/20" />
      </div>
    </div>
  )
}
