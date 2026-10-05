import Link from 'next/link'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import { Package, Layers, CreditCard, Sparkles } from 'lucide-react'

const steps = [
  { id: 1, text: 'Choose package', detail: 'Browse curated Sri Lanka journeys', icon: Package },
  { id: 2, text: 'Select tier', detail: 'Pick Standard or Premium stays', icon: Layers },
  { id: 3, text: 'Book & pay', detail: 'Secure checkout in a few steps', icon: CreditCard },
  { id: 4, text: 'We handle everything', detail: 'Relax, we take care of the rest', icon: Sparkles },
]

export default function EditPage() {
  return (
    <div className="olyce-home">
      <main className="grow bg-white pb-16 sm:pb-24">
        <PageHero
          eyebrow="The Edit"
          title="How It Works"
          subtitle="A simple path from discovery to departure, designed around you."
          imageSrc="/images/ishan-kahapola-arachchi-5wpeSsXZ93s-unsplash.jpg"
          imageAlt="Tropical beach with palms and ocean in Sri Lanka"
        />

        <section className="travel-pattern w-full py-12 sm:py-16 mt-2 sm:mt-4">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
              {steps.map((step) => (
                <div key={step.id} className="text-center px-4 bg-white/70 rounded-[10px] py-8 sm:py-10">
                  <div className="mx-auto mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-[10px] bg-[var(--gsm-teal)]/10 text-[var(--gsm-teal)] flex items-center justify-center">
                    <step.icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
                  </div>
                  <p className="text-center text-[12px] uppercase tracking-[1.2px] text-[var(--gsm-gold)] font-semibold mb-2">
                    Step {String(step.id).padStart(2, '0')}
                  </p>
                  <h3 className="font-heading text-[20px] sm:text-[22px] font-semibold text-[var(--gsm-teal)] mb-2">
                    {step.text}
                  </h3>
                  <p className="text-center text-[15px] font-light text-[var(--gsm-body)]">{step.detail}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10 sm:mt-14">
              <Link href="/#featured" className="btn-gold">
                Browse Tours <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
