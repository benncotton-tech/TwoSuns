import Image from "next/image"
import { cn } from "@/lib/utils"

const SRC = "/twosuns-wordmark.png"
const WIDTH = 916
const HEIGHT = 382

export function Wordmark({
  className,
  priority = false,
  inFrame = false,
}: {
  className?: string
  priority?: boolean
  inFrame?: boolean
}) {
  return (
    <div
      className={cn(
        inFrame ? "wordmark-in-frame w-full" : "inline-block",
        className
      )}
    >
      <Image
        src={SRC}
        alt="TwoSuns"
        width={WIDTH}
        height={HEIGHT}
        priority={priority}
        unoptimized
        className={cn(
          "block",
          inFrame ? "relative h-auto w-full" : "h-full w-auto max-w-full"
        )}
      />
    </div>
  )
}
