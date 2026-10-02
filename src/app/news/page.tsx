import { Suspense } from "react"
import { SectionAlias } from "@/components/section-alias"

export default function NewsPage() {
  return (
    <Suspense fallback={null}>
      <SectionAlias hash="news" />
    </Suspense>
  )
}
