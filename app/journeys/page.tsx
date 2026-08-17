'use client';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { motion } from 'framer-motion'

const JOURNEYS = [
  {
    id: 1,
    title: "Echoes of the Emerald Isle",
    category: "Heritage & Wildlife",
    date: "June 2026",
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80",
    excerpt: "A profound exploration into the ancient ruins of Sigiriya, blending history with the untouched elegance of Sri Lanka's cultural heart.",
  },
  {
    id: 2,
    title: "Whispers of the Tea Valleys",
    category: "Luxury Retreat",
    date: "July 2026",
    image: "https://images.unsplash.com/photo-1526462706352-70b9ebf17227?auto=format&fit=crop&q=80",
    excerpt: "Wake up to misty mornings overlooking endless green estates. Discover the art of Ceylon tea while staying in restored colonial bungalows.",
  },
  {
    id: 3,
    title: "Tides of the Southern Edge",
    category: "Coastal Escapes",
    date: "August 2026",
    image: "https://images.unsplash.com/photo-1546890975-7596e98cd928?auto=format&fit=crop&q=80",
    excerpt: "Where the azure Indian Ocean meets untouched golden shores. Experience marine wildlife and exclusive beachfront luxury like never before.",
  },
  {
    id: 4,
    title: "The Safari Chronicle",
    category: "Wild Encounters",
    date: "September 2026",
    image: "https://images.unsplash.com/photo-1544641619-3382fb5a388b?auto=format&fit=crop&q=80",
    excerpt: "Venture deep into Yala for intimate encounters with leopards. A journey that balances thrilling wilderness with ethereal comforts.",
  }
]

export default function JourneysPage() {
  return (
    <>
      <Navbar forceSolid={true} />
      
      <main className="flex-grow pt-32 pb-20 bg-background">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-lg text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="block text-[11px] uppercase tracking-[0.3em] font-bold text-on-surface/40 mb-6"
          >
            The Journal
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-on-surface mb-5"
          >
            Curated <span className="italic">Journeys</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-on-surface/60 text-base leading-relaxed max-w-2xl mx-auto"
          >
            Immerse yourself in our collection of stories, guides, and ethereal travel experiences.
          </motion.p>
        </div>

        {/* Featured Post */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-6xl mx-auto px-margin-mobile md:px-lg mb-20"
        >
          <Link 
            href={`/journeys/${JOURNEYS[0].id}`} 
            className="group block relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            <img 
              src={JOURNEYS[0].image} 
              alt={JOURNEYS[0].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4 text-white/90">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{JOURNEYS[0].category}</span>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span className="text-[10px] uppercase tracking-[0.3em]">{JOURNEYS[0].date}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white mb-4 leading-tight max-w-2xl">
                {JOURNEYS[0].title}
              </h2>
              <p className="text-white/85 text-sm md:text-base mb-6 leading-relaxed max-w-xl">
                {JOURNEYS[0].excerpt}
              </p>
              <span className="inline-block text-white text-[11px] uppercase tracking-[0.3em] font-bold border-b-2 border-white/30 pb-1 group-hover:border-white transition-all">
                Read Story →
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Grid Posts */}
        <div className="max-w-6xl mx-auto px-margin-mobile md:px-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {JOURNEYS.slice(1).map((post, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={post.id}
              >
                <Link href={`/journeys/${post.id}`} className="group block">
                  <div className="relative overflow-hidden aspect-[4/5] mb-4 rounded-sm">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-3 text-on-surface/50">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold">{post.category}</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-outline-variant/50" />
                    <span className="text-[9px] uppercase tracking-[0.3em]">{post.date}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-on-surface mb-3 leading-tight group-hover:text-on-surface/60 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-on-surface/60 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface group-hover:text-on-surface/50 transition-colors">
                    Read More →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
