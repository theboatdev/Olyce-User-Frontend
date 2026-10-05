'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const FEATURES = [
  {
    title: 'Curated Routes',
    description: 'Every itinerary is built around real highlights, not rushed stopovers.',
  },
  {
    title: 'Clear Tiers',
    description: 'Choose Standard or Premium stays with pricing you can compare at a glance.',
  },
  {
    title: 'End to End Support',
    description: 'From your first question to when you land home, our team stays in touch.',
  },
]

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => setVideoLoaded(true)
    const handleError = () => {
      setVideoError(true)
      setVideoLoaded(true)
    }

    video.addEventListener('canplaythrough', handleCanPlay)
    video.addEventListener('error', handleError)
    if (video.readyState >= 3) setVideoLoaded(true)

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [])

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'}`}
      >
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070"
          alt="Sri Lanka landscape"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {!videoError && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/video/289235_medium.mp4" type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-black/35" />

      {/* Hero copy */}
      <div className="relative z-20 flex min-h-screen items-center pb-56 sm:pb-48 md:pb-40">
        <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 pt-24 sm:pt-28">
          <h1 className="font-heading text-white text-[36px] sm:text-[48px] md:text-[62px] font-semibold leading-[1.15] sm:leading-[1.2] uppercase max-w-[640px] mb-4 sm:mb-5">
            Sri Lanka
            <br />
            Crafted With Olyce
          </h1>
          <p className="hero-copy text-left text-white text-[15px] sm:text-[18px] font-light leading-relaxed max-w-[520px] mb-6 sm:mb-8">
            Plan a journey through ancient cities, misty highlands, and warm coastal towns, with
            packages shaped around how you actually want to travel.
          </p>
          <Link href="#featured" className="btn-gold">
            Enquire Now <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* Feature strip over hero bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-[var(--gsm-feature)]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-6 sm:py-8 md:py-10 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-0 sm:divide-x divide-white/20">
          {FEATURES.map((f) => (
            <div key={f.title} className="sm:px-6 md:px-8 first:sm:pl-0 last:sm:pr-0">
              <h3 className="font-heading text-white text-[20px] sm:text-[22px] md:text-[28px] font-semibold mb-1.5 sm:mb-2">
                {f.title}
              </h3>
              <p className="hero-copy text-left text-white/85 text-[14px] sm:text-[15px] leading-relaxed font-light">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
