import { cn } from "@/lib/utils"

export function DualSun({
  className,
  gold = "var(--gold)",
  silver = "var(--silver)",
}: {
  className?: string
  gold?: string
  silver?: string
}) {
  return (
    <svg
      viewBox="0 0 80 48"
      className={cn("text-gold", className)}
      aria-hidden
    >
      <circle cx="30" cy="24" r="18" fill={gold} />
      <circle cx="50" cy="24" r="18" fill={silver} fillOpacity="0.78" />
    </svg>
  )
}

export function DualRule({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-[2px] w-20", className)} aria-hidden>
      <span className="absolute inset-x-0 top-0 h-px bg-gold" />
      <span className="absolute inset-x-0 top-px h-px translate-x-3 bg-silver/80" />
    </div>
  )
}
