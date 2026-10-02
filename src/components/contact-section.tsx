import { ContactForm } from "@/components/contact-form"
import { HemisphereClocks } from "@/components/hemisphere-clocks"
import { PageIntro } from "@/components/page-intro"
import { site } from "@/lib/site"

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-cream/10"
      aria-label="Contact"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <PageIntro heading="h2" eyebrow="Contact" title="Write to Stockholm.">
              <p>
                One inbox. Billy and Benjamin read it. We answer as people, not
                as a no-reply address.
              </p>
            </PageIntro>
            <p className="mt-8 font-heading text-2xl text-gold">
              <a href={`mailto:${site.email}`} className="hover:text-cream">
                {site.email}
              </a>
            </p>
            <p className="mt-3 text-sm text-silver">
              Based in Stockholm · {site.domain}
            </p>
            <div className="mt-12">
              <HemisphereClocks />
            </div>
          </div>
          <div className="border border-cream/15 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
