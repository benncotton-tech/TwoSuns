export function isPasswordProtected() {
  return Boolean(process.env.SITE_PASSWORD)
}

export function robotsMetadata() {
  if (!isPasswordProtected()) {
    return { index: true, follow: true }
  }

  return {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nosnippet: true,
    },
  }
}

export const noindexHeader = "noindex, nofollow, noarchive"
