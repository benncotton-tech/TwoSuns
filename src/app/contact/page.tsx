import { Suspense } from "react"
import { SectionAlias } from "@/components/section-alias"

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <SectionAlias hash="contact" />
    </Suspense>
  )
}
