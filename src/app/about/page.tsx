import { Suspense } from "react"
import { SectionAlias } from "@/components/section-alias"

export default function AboutPage() {
  return (
    <Suspense fallback={null}>
      <SectionAlias hash="about" />
    </Suspense>
  )
}
