'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'A truly transformative experience. Every detail was curated with an exceptional level of care and understanding of what luxury really means.',
    author: 'Eleanor Vance',
    location: 'Tourist From UK',
    image: '/images/etienne-boulanger-J7LiHL7jAgU-unsplash.jpg',
  },
  {
    id: 2,
    quote:
      'We were guided through landscapes untouched by time. The ethereal quality of the journey left us breathless and profoundly moved.',
    author: 'Marcus & Sophia',
    location: 'Tourists From USA',
    image: '/images/shashank-hudkar-KYBc1eq0dJo-unsplash.jpg',
  },
  {
    id: 3,
    quote:
      'From the secluded villas to the exclusive heritage tours, this wasn’t just a trip; it was a masterful composition of unforgettable moments.',
    author: 'Isabella Rossi',
    location: 'Tourist From Italy',
    image: '/images/chathura-anuradha-subasinghe-40uQmE9Zq8g-unsplash.jpg',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [currentIndex])

  const current = TESTIMONIALS[currentIndex]

  return (
    <section className="relative w-full min-h-[460px] sm:min-h-[520px] overflow-hidden">
      {/* Background images: all mounted, active one fades in */}
      {TESTIMONIALS.map((item, idx) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
          }`}
          aria-hidden={idx !== currentIndex}
        >
          <Image
            src={item.image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={idx === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 z-[2] bg-black/55" />

      <div className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-8 py-14 sm:py-24 text-center flex flex-col items-center justify-center min-h-[460px] sm:min-h-[520px]">
        <h2 className="font-heading text-[28px] sm:text-[36px] md:text-[48px] font-semibold text-white mb-3 sm:mb-4">
          What Our Customers Say
        </h2>
          <p className="text-center text-[15px] sm:text-[16px] leading-7 font-light text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto">
          Guests share how Olyce journeys felt on the ground, from guides and pacing to the small
          details that made the trip feel personal.
        </p>

        <div
          key={current.id}
          className="flex flex-col items-center animate-[fadeInUp_0.45s_ease-out]"
        >
          <p className="text-center font-heading text-[18px] sm:text-[24px] md:text-[32px] font-semibold text-white leading-snug mb-6 sm:mb-8 max-w-3xl">
            “{current.quote}”
          </p>
          <span className="font-heading text-[18px] font-semibold text-[var(--gsm-gold)]">
            {current.author}
          </span>
          <span className="text-[14px] text-white/75 mt-1">{current.location}</span>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-[var(--gsm-gold)]' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
