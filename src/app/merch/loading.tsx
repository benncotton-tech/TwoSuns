export default function MerchLoading() {
  return (
    <div
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="sr-only">Loading merch</p>
      <div className="h-3 w-24 animate-pulse bg-gold/30" />
      <div className="mt-4 h-12 w-80 max-w-full animate-pulse bg-cream/10" />
      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <div className="aspect-[3/4] animate-pulse bg-cream/5" />
            <div className="mt-4 h-3 w-16 animate-pulse bg-gold/20" />
            <div className="mt-2 h-8 w-40 animate-pulse bg-cream/10" />
          </div>
        ))}
      </div>
    </div>
  )
}
