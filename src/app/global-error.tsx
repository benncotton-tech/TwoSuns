"use client"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className="dark h-full">
      <body
        style={{
          margin: 0,
          minHeight: "100%",
          background: "#050505",
          color: "#e5dfd3",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <main
          style={{
            maxWidth: "36rem",
            margin: "0 auto",
            padding: "6rem 1.5rem",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.7rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#bba97b",
            }}
          >
            Fault
          </p>
          <h1
            style={{
              margin: "1rem 0 0",
              fontSize: "2.25rem",
              fontWeight: 500,
              color: "#e5dfd3",
            }}
          >
            The projector stopped.
          </h1>
          <p
            style={{
              margin: "1rem 0 0",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              color: "#c9c9c7",
            }}
          >
            Something in the house failed. Try again, or leave and come back
            through the front.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                height: "2.75rem",
                padding: "0 1.5rem",
                border: 0,
                background: "#bba97b",
                color: "#050505",
                fontSize: "0.7rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => {
                // global-error replaces the root layout; stay off next/link here.
                // eslint-disable-next-line @next/next/no-location-assign-relative-destination
                window.location.href = "/"
              }}
              style={{
                display: "inline-flex",
                height: "2.75rem",
                alignItems: "center",
                padding: "0 1.5rem",
                border: "1px solid rgb(229 223 211 / 30%)",
                background: "transparent",
                color: "#e5dfd3",
                fontSize: "0.7rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Home
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
