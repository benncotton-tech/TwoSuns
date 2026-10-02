const SRC = "/twosuns-wordmark.png"
const WIDTH = 2859
const HEIGHT = 1181

export function Wordmark({
  className = "h-auto w-full",
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <img
      src={SRC}
      alt="TwoSuns"
      width={WIDTH}
      height={HEIGHT}
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={className}
    />
  )
}
