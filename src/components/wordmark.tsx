import Image from "next/image"

const SRC = "/twosuns-wordmark.png"
const WIDTH = 900
const HEIGHT = 366

export function Wordmark({
  className = "h-auto w-full",
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src={SRC}
      alt="TwoSuns"
      width={WIDTH}
      height={HEIGHT}
      priority={priority}
      unoptimized
      className={className}
    />
  )
}
