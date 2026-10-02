import { Suspense } from "react"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { HomeHashScroll } from "@/components/home-hash-scroll"
import { CinematicLanding } from "@/components/landing/cinematic-landing"
import { NewsSection } from "@/components/news-section"
import { SiteFooter } from "@/components/site-footer"
import { WorkSection } from "@/components/work-section"
import { filmLanes, type FilmLane } from "@/lib/films"

function laneFromParam(value: string | string[] | undefined): FilmLane {
  const lane = Array.isArray(value) ? value[0] : value
  return filmLanes.some((item) => item.id === lane) ? (lane as FilmLane) : "all"
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ lane?: string | string[] }>
}) {
  const params = await searchParams
  const lane = laneFromParam(params.lane)

  return (
    <>
      <Suspense fallback={null}>
        <HomeHashScroll />
      </Suspense>
      <CinematicLanding />
      <div className="site-frame relative bg-ink">
        <div className="film-grain !absolute" aria-hidden />
        <WorkSection lane={lane} />
        <NewsSection />
        <AboutSection />
        <ContactSection />
        <SiteFooter />
      </div>
    </>
  )
}
