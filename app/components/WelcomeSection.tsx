import Image from 'next/image'
import Link from 'next/link'

export default function WelcomeSection() {
  return (
    <section id="story" className="travel-pattern w-full py-14 sm:py-20 md:py-24">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="section-title mb-5 sm:mb-6">Welcome</h2>
            <div className="space-y-4 text-[15px] sm:text-[16px] leading-7 font-light text-[var(--gsm-body)]">
              <p>
                Olyce is built for travellers who want Sri Lanka without the guesswork. We connect
                you with thoughtfully sequenced routes so you spend less time coordinating transfers
                and more time in the places you came to see.
              </p>
              <p>
                Whether you are drawn to wildlife in the south, tea country by rail, or quiet
                heritage towns off the main circuit, our packages pair clear inclusions with Standard
                and Premium options. You pick the pace and comfort level; we handle the structure
                behind the scenes.
              </p>
            </div>
            <Link href="/story" className="btn-gold-sm mt-7 sm:mt-8">
              About Us <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] order-first md:order-none">
            <Image
              src="/images/abdulla-faiz-7yPjauuz858-unsplash.jpg"
              alt="Traveler exploring Sri Lanka"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
