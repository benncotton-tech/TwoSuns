import { cn } from "@/lib/utils"

export function PageIntro({
  eyebrow,
  title,
  children,
  className,
  heading: Heading = "h1",
}: {
  eyebrow: string
  title: string
  children?: React.ReactNode
  className?: string
  heading?: "h1" | "h2"
}) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
      <Heading className="mt-4 font-heading text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
        {title}
      </Heading>
      {children ? (
        <div className="mt-6 space-y-4 text-base leading-relaxed text-silver sm:text-lg">
          {children}
        </div>
      ) : null}
    </header>
  )
}
