import type { MetadataRoute } from "next"
import { isPasswordProtected } from "@/lib/indexing"
import { site } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  if (isPasswordProtected()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: site.url,
  }
}
