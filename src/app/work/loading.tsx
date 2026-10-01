export default function WorkLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="h-3 w-24 animate-pulse bg-gold/30" />
      <div className="mt-6 h-12 w-72 max-w-full animate-pulse bg-cream/10" />
      <div className="mt-6 h-20 max-w-xl animate-pulse bg-cream/5" />
      <div className="mt-14 space-y-0 divide-y divide-cream/10 border-y border-cream/10">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="grid gap-6 py-8 md:grid-cols-[7rem_1fr_10rem]">
            <div className="h-4 w-8 animate-pulse bg-gold/20" />
            <div className="space-y-3">
              <div className="h-8 w-48 animate-pulse bg-cream/10" />
              <div className="h-4 w-full max-w-md animate-pulse bg-cream/5" />
            </div>
            <div className="aspect-[3/4] w-full max-w-[10rem] animate-pulse bg-cream/5 md:justify-self-end" />
          </div>
        ))}
      </div>
    </div>
  )
}
