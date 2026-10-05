'use client'

import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import Link from 'next/link'
import { motion } from 'framer-motion'

const JOURNEYS = [
  {
    id: 1,
    title: 'Echoes of the Emerald Isle',
    category: 'Heritage & Wildlife',
    date: 'June 2026',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80',
    excerpt:
      "A profound exploration into the ancient ruins of Sigiriya, blending history with the untouched elegance of Sri Lanka's cultural heart.",
  },
  {
    id: 2,
    title: 'Whispers of the Tea Valleys',
    category: 'Luxury Retreat',
    date: 'July 2026',
    image: 'https://images.unsplash.com/photo-1526462706352-70b9ebf17227?auto=format&fit=crop&q=80',
    excerpt:
      'Wake up to misty mornings overlooking endless green estates. Discover the art of Ceylon tea while staying in restored colonial bungalows.',
  },
  {
    id: 3,
    title: 'Tides of the Southern Edge',
    category: 'Coastal Escapes',
    date: 'August 2026',
    image: 'https://images.unsplash.com/photo-1546890975-7596e98cd928?auto=format&fit=crop&q=80',
    excerpt:
      'Where the azure Indian Ocean meets untouched golden shores. Experience marine wildlife and exclusive beachfront luxury like never before.',
  },
  {
    id: 4,
    title: 'The Safari Chronicle',
    category: 'Wild Encounters',
    date: 'September 2026',
    image: 'https://images.unsplash.com/photo-1544641619-3382fb5a388b?auto=format&fit=crop&q=80',
    excerpt:
      'Venture deep into Yala for intimate encounters with leopards. A journey that balances thrilling wilderness with ethereal comforts.',
  },
]

export default function JourneysPage() {
  return (
    <div className="olyce-home">
      <main className="grow bg-white pb-16 sm:pb-24">
        <PageHero
          eyebrow="The Journal"
          title="Curated Journeys"
          subtitle="Immerse yourself in our collection of stories, guides, and ethereal travel experiences."
          imageSrc="/images/hendrik-cornelissen-jpTT_SAU034-unsplash.jpg"
          imageAlt="Blue train crossing the Nine Arch Bridge in Ella, Sri Lanka"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="max-w-[1280px] mx-auto px-5 sm:px-8 mt-10 sm:mt-16 mb-10 sm:mb-16"
        >
          <Link
            href={`/journeys/${JOURNEYS[0].id}`}
            className="group block relative w-full h-[380px] sm:h-[460px] md:h-[520px] overflow-hidden rounded-[10px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={JOURNEYS[0].image}
              alt={JOURNEYS[0].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 z-20 flex items-end justify-center p-6 sm:p-10 md:p-12">
              <div className="w-full max-w-3xl text-center">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 text-white/90">
                  <span className="text-[11px] uppercase tracking-[1.2px] font-semibold text-[var(--gsm-gold)]">
                    {JOURNEYS[0].category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <span className="text-[11px] uppercase tracking-[1.2px]">{JOURNEYS[0].date}</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl text-white mb-3 sm:mb-4 leading-tight font-semibold">
                  {JOURNEYS[0].title}
                </h2>
                <p
                  className="text-center text-white/85 text-[14px] sm:text-[15px] md:text-[16px] mb-5 sm:mb-6 leading-relaxed font-light mx-auto"
                  style={{ maxWidth: '36rem', width: '100%' }}
                >
                  {JOURNEYS[0].excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] uppercase tracking-[1.2px] font-semibold text-white border-b border-white/40 pb-1 group-hover:border-[var(--gsm-gold)] group-hover:text-[var(--gsm-gold)] transition-colors">
                  Read Story <span aria-hidden>→</span>
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-10 sm:gap-y-12">
            {JOURNEYS.slice(1).map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Link href={`/journeys/${post.id}`} className="group block">
                  <div className="relative overflow-hidden aspect-[4/3] mb-5 rounded-[10px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-3 text-[var(--gsm-body)]">
                    <span className="text-[11px] uppercase tracking-[1.2px] font-semibold text-[var(--gsm-teal)]">
                      {post.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[var(--gsm-body)]/40" />
                    <span className="text-[11px] uppercase tracking-[1.2px]">{post.date}</span>
                  </div>
                  <h3 className="tour-title mb-3 group-hover:opacity-80 transition-opacity">
                    {post.title}
                  </h3>
                  <p className="text-[15px] leading-6 font-light text-[var(--gsm-body)] mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--gsm-teal)] group-hover:text-[var(--gsm-gold)] transition-colors">
                    Read More <span aria-hidden>→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
