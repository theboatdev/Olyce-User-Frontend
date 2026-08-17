'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  {
    id: 1,
    quote: "A truly transformative experience. Every detail was curated with an exceptional level of care and understanding of what luxury really means.",
    author: "Eleanor Vance",
    location: "London, UK",
  },
  {
    id: 2,
    quote: "We were guided through landscapes untouched by time. The ethereal quality of the journey left us breathless and profoundly moved.",
    author: "Marcus & Sophia",
    location: "New York, USA",
  },
  {
    id: 3,
    quote: "From the secluded villas to the exclusive heritage tours, this wasn't just a trip; it was a masterful composition of unforgettable moments.",
    author: "Isabella Rossi",
    location: "Milan, Italy",
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full py-24 md:py-32 bg-background overflow-hidden flex items-center justify-center my-16 md:my-32 border-y border-outline-variant/10">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-outline-variant/10" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-outline-variant/10" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full perspective-[1000px]">
        <div className="text-center mb-16">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-on-surface/50">
            Client Reflections
          </span>
        </div>

        <div className="relative h-[250px] md:h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, rotateX: -15, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: 15, y: -20, scale: 0.95 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] // Ethereal luxury ease
              }}
              className="absolute w-full text-center flex flex-col items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-on-surface leading-tight md:leading-snug max-w-3xl italic">
                "{TESTIMONIALS[currentIndex].quote}"
              </p>
              
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="w-8 h-px bg-on-surface/30" />
                <span className="font-sans text-sm font-semibold tracking-wide text-on-surface mt-2">
                  {TESTIMONIALS[currentIndex].author}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-on-surface/50">
                  {TESTIMONIALS[currentIndex].location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicators */}
        <div className="mt-12 flex justify-center gap-3">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="group py-2 px-1 focus:outline-none"
              aria-label={`Go to testimonial ${idx + 1}`}
            >
              <div 
                className={`h-[1px] transition-all duration-500 ease-out ${
                  idx === currentIndex 
                    ? 'w-8 bg-on-surface' 
                    : 'w-4 bg-outline-variant/30 group-hover:bg-outline-variant group-hover:w-6'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
