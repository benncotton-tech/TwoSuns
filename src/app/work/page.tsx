import { Suspense } from "react"
import { SectionAlias } from "@/components/section-alias"

export default function WorkPage() {
  return (
    <Suspense fallback={null}>
      <SectionAlias hash="work" />
    </Suspense>
  )
}
