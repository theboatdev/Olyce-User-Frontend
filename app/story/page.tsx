import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import { MapPinned, Layers, Headset } from 'lucide-react'

export default function StoryPage() {
  return (
    <div className="olyce-home">
      <main className="grow bg-white pb-16 sm:pb-24">
        <PageHero
          eyebrow="About Olyce"
          title="Our Story"
          subtitle="Built for travellers who want Sri Lanka without the guesswork."
          imageSrc="/images/mike-swigunski-zDDQZgZjFtM-unsplash.jpg"
          imageAlt="Aerial view of Sigiriya rock fortress in Sri Lanka"
        />

        <section className="travel-pattern w-full py-12 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <h2 className="section-title mb-5 sm:mb-6">Welcome</h2>
                <div className="space-y-4 text-[15px] sm:text-[16px] leading-7 font-light text-[var(--gsm-body)]">
                  <p>
                    Olyce is built for travellers who want Sri Lanka without the guesswork. We
                    connect you with thoughtfully sequenced routes so you spend less time
                    coordinating transfers and more time in the places you came to see.
                  </p>
                  <p>
                    Whether you are drawn to wildlife in the south, tea country by rail, or quiet
                    heritage towns off the main circuit, our packages pair clear inclusions with
                    Standard and Premium options. You pick the pace and comfort level; we handle the
                    structure behind the scenes.
                  </p>
                </div>
                <Link href="/#featured" className="btn-gold-sm mt-7 sm:mt-8">
                  Explore Tours <span aria-hidden>→</span>
                </Link>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] order-first md:order-none">
                <Image
                  src="/images/Ella-Rock-view.jpg"
                  alt="View from Ella Rock in Sri Lanka"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                title: 'Curated Routes',
                text: 'Every itinerary is built around real highlights, not rushed stopovers.',
                icon: MapPinned,
              },
              {
                title: 'Clear Tiers',
                text: 'Choose Standard or Premium stays with pricing you can compare at a glance.',
                icon: Layers,
              },
              {
                title: 'End to End Support',
                text: 'From your first question to when you land home, our team stays in touch.',
                icon: Headset,
              },
            ].map((item) => (
              <div key={item.title} className="text-center px-2 sm:px-4">
                <div className="mx-auto mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-[10px] bg-[var(--gsm-teal)]/10 text-[var(--gsm-teal)] flex items-center justify-center">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-[20px] sm:text-[22px] font-semibold text-[var(--gsm-teal)] mb-3">
                  {item.title}
                </h3>
                <p className="text-center text-[15px] font-light text-[var(--gsm-body)] leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
