import { Suspense } from "react"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { HomeHashScroll } from "@/components/home-hash-scroll"
import { CinematicLanding } from "@/components/landing/cinematic-landing"
import { NewsSection } from "@/components/news-section"
import { SiteFooter } from "@/components/site-footer"
import { WorkSection } from "@/components/work-section"

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <HomeHashScroll />
      </Suspense>
      <CinematicLanding />
      <div className="site-frame relative bg-ink">
        <div className="film-grain !absolute" aria-hidden />
        <WorkSection />
        <NewsSection />
        <AboutSection />
        <ContactSection />
        <SiteFooter />
      </div>
    </>
  )
}
