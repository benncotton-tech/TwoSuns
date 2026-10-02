export default function WorkLoading() {
  return (
    <div
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="sr-only">Loading the slate</p>
      <div className="h-3 w-24 animate-pulse bg-gold/30" />
      <div className="mt-4 h-10 w-72 max-w-full animate-pulse bg-cream/10" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <div className="aspect-[2/3] animate-pulse bg-cream/5" />
            <div className="mt-4 h-3 w-20 animate-pulse bg-gold/20" />
            <div className="mt-2 h-8 w-32 animate-pulse bg-cream/10" />
          </div>
        ))}
      </div>
    </div>
  )
}
