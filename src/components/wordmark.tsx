import Image from "next/image"
import { cn } from "@/lib/utils"

export function Wordmark({
  className,
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src="/twosuns-logo.png"
      alt="TwoSuns"
      width={941}
      height={420}
      priority={priority}
      className={cn("h-auto w-full", className)}
    />
  )
}
