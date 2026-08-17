'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence, type PanInfo } from 'framer-motion'

export interface Destination {
  _id: string
  name: string
  slug: string
  duration: string
  category?: string | null
  priceStandard: number
  pricePremium: number
  images: any[]
}

const getValidImageUrl = (image: any): string | null => {
  if (!image) return null
  if (typeof image === 'string' && image.length > 0) return image
  if (image.asset?.url) return image.asset.url
  if (image.url) return image.url
  return null
}

const MAX_CARDS = 8
const SWIPE_THRESHOLD = 50

/* ── Hook: detect mobile (<768px) ── */
function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const onChange = () => setMobile(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return mobile
}

/* ── Expanded package row (alternating layout, scroll-triggered) ── */
function PackageRow({
  destination,
  index,
  isPremium,
}: {
  destination: Destination
  index: number
  isPremium: boolean
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rowRef, { once: true, margin: '-8% 0px' })
  const isEven = index % 2 === 0

  const validImages = destination.images
    .map((img: any) => getValidImageUrl(img))
    .filter(Boolean) as string[]

  const textContent = (
    <div className="flex flex-col justify-center py-6 px-5 md:py-16 md:px-14 lg:px-20">
      <span className="text-[10px] uppercase tracking-[0.35em] text-on-surface/40 mb-3 md:mb-4">
        {String(index + 1).padStart(2, '0')} — {destination.category ?? 'Explore'}
      </span>
      <h3 className="font-headline-lg text-xl md:text-4xl lg:text-5xl uppercase tracking-wider text-on-surface leading-tight mb-3 md:mb-4">
        {destination.name}
      </h3>
      <p className="text-[10px] uppercase tracking-[0.3em] text-on-surface/50 mb-4 md:mb-6">
        {destination.duration} · From{' '}
        <span className="text-on-surface font-medium">
          ${isPremium ? destination.pricePremium.toLocaleString() : destination.priceStandard.toLocaleString()}
        </span>
        <span className="text-on-surface/40"> / person</span>
      </p>
      <Link
        href={`/packages/${destination.slug}`}
        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-on-surface/70 border-b border-on-surface/20 pb-1 hover:text-on-surface hover:border-on-surface/50 transition-all duration-300 w-fit"
      >
        View Package <span className="text-sm leading-none">→</span>
      </Link>
    </div>
  )

  const imageContent = (
    <div className="relative overflow-hidden">
      {/* Scroll hint — mobile only */}
      <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10 flex flex-col items-center gap-1 md:hidden pointer-events-none">
        <span className="text-on-surface/20 text-lg animate-pulse">›</span>
      </div>
      <div className="relative h-[240px] md:h-[480px] overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory">
        <div className="flex gap-2.5 md:gap-3 h-full px-5 md:px-6 py-3 md:py-6 min-w-max">
          {validImages.map((url, i) => (
            <div key={i} className="relative h-full aspect-[3/4] rounded-sm overflow-hidden flex-shrink-0 snap-start">
              <Image
                src={url}
                alt={`${destination.name} ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105 active:scale-100"
                sizes="(max-width: 768px) 65vw, 35vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-outline-variant/30"
    >
      {/* Mobile: always image first, then text */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Mobile layout */}
        <div className="md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-surface-variant/20"
          >
            {imageContent}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {textContent}
          </motion.div>
        </div>

        {/* Desktop layout — alternating */}
        {isEven ? (
          <>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:flex"
            >
              {textContent}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:block bg-surface-variant/30"
            >
              {imageContent}
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:block bg-surface-variant/30"
            >
              {imageContent}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:flex"
            >
              {textContent}
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}

/* ── Mobile swipeable card ── */
const mobileCardVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-50%' : '50%', opacity: 0 }),
}

export default function DestinationsCarousel({ destinations = [] }: { destinations?: Destination[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPremium, setIsPremium] = useState(false)
  const [direction, setDirection] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-15% 0px' })
  const isMobile = useIsMobile()

  const cards = destinations.slice(0, MAX_CARDS)
  const centerPoint = cards.length / 2

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= cards.length) return
    setDirection(idx > activeIndex ? 1 : -1)
    setActiveIndex(idx)
  }, [activeIndex, cards.length])

  const nextSlide = () => goTo(activeIndex + 1)
  const prevSlide = () => goTo(activeIndex - 1)

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD && activeIndex < cards.length - 1) nextSlide()
    else if (info.offset.x > SWIPE_THRESHOLD && activeIndex > 0) prevSlide()
  }

  if (cards.length === 0) return null

  return (
    <>
    <section
      ref={sectionRef}
      id="featured"
      className="relative w-full bg-surface-container overflow-hidden select-none flex flex-col h-[100svh]"
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-4 md:px-12 pt-6 md:pt-8 pb-3 md:pb-4 shrink-0">
        <span className="uppercase tracking-[0.25em] md:tracking-[0.3em] text-[9px] md:text-[11px] font-light text-on-surface/40">
          Featured
        </span>

        {/* Standard / Premium toggle */}
        <div className="flex items-center border border-outline-variant overflow-hidden">
          <button
            onClick={() => setIsPremium(false)}
            className={`px-3 md:px-4 py-1.5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] transition-colors duration-300 ${
              !isPremium ? 'bg-on-surface text-surface' : 'text-on-surface/50 hover:text-on-surface/80'
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setIsPremium(true)}
            className={`px-3 md:px-4 py-1.5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] transition-colors duration-300 ${
              isPremium ? 'bg-on-surface text-surface' : 'text-on-surface/50 hover:text-on-surface/80'
            }`}
          >
            Premium
          </button>
        </div>
      </div>

      {/* ── MOBILE: swipeable full-card carousel ── */}
      {isMobile ? (
        <div className="relative flex-1 min-h-0 mx-4 mb-2 overflow-hidden rounded-sm">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={cards[activeIndex]._id}
              custom={direction}
              variants={mobileCardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              {/* Image */}
              {getValidImageUrl(cards[activeIndex].images?.[0]) ? (
                <Image
                  src={getValidImageUrl(cards[activeIndex].images[0])!}
                  alt={cards[activeIndex].name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-surface-variant" />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Info */}
              <div className="absolute bottom-6 left-5 right-5">
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/50 mb-1.5">
                  {cards[activeIndex].category ? `${cards[activeIndex].category} · ` : ''}
                  {cards[activeIndex].duration}
                </p>
                <h2 className="font-headline-md text-2xl uppercase tracking-wider text-white mb-1.5 leading-tight">
                  {cards[activeIndex].name}
                </h2>
                <p className="text-xs font-light text-white/65 mb-4">
                  From{' '}
                  <span className="text-white font-medium text-sm">
                    ${isPremium
                      ? cards[activeIndex].pricePremium.toLocaleString()
                      : cards[activeIndex].priceStandard.toLocaleString()}
                  </span>
                  <span className="text-white/35 text-[10px]"> / person</span>
                </p>
                <Link
                  href={`/packages/${cards[activeIndex].slug}`}
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/75 border-b border-white/25 pb-0.5"
                >
                  View Package <span className="text-sm leading-none">→</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Swipe hint overlay */}
          <div className="absolute top-4 right-4 z-10 pointer-events-none">
            <span className="text-white/20 text-[8px] uppercase tracking-[0.3em]">Swipe</span>
          </div>
        </div>
      ) : (
        /* ── DESKTOP: accordion track ── */
        <div className="flex items-stretch gap-1.5 md:gap-2 px-4 md:px-8 w-full flex-1 min-h-0">
          {cards.map((destination, index) => {
            const isActive = index === activeIndex
            const imgUrl = getValidImageUrl(destination.images?.[0])
            const distFromCenter = index - centerPoint
            const spreadX = distFromCenter < 0 ? -120 : 120

            return (
              <motion.div
                key={destination._id}
                initial={{ x: spreadX, opacity: 0, scale: 0.85 }}
                animate={isInView ? { x: 0, opacity: 1, scale: 1 } : { x: spreadX, opacity: 0, scale: 0.85 }}
                transition={{
                  duration: 0.9,
                  delay: 0.08 * (cards.length - 1 - Math.abs(Math.floor(distFromCenter))),
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setActiveIndex(index)}
                className="relative cursor-pointer overflow-hidden h-full rounded-sm"
                style={{
                  transition: 'flex 900ms cubic-bezier(0.25, 1, 0.2, 1), filter 500ms ease',
                  flex: isActive ? '5 1 0%' : '0.7 1 0%',
                  filter: !isActive ? 'brightness(0.45) saturate(0.2)' : 'none',
                }}
              >
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={destination.name}
                    fill
                    className="object-cover"
                    style={{
                      transition: 'transform 1200ms cubic-bezier(0.25, 1, 0.2, 1)',
                      transform: isActive ? 'scale(1.02)' : 'scale(1.15)',
                    }}
                    sizes="60vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface-variant" />
                )}

                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent"
                  style={{ opacity: isActive ? 1 : 0.3, transition: 'opacity 600ms ease' }}
                />
                <div
                  className="absolute bottom-10 left-10 max-w-[90%]"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 500ms ease 280ms, transform 500ms ease 280ms',
                  }}
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-2">
                    {destination.category ? `${destination.category} · ` : ''}{destination.duration}
                  </p>
                  <h2 className="font-headline-lg text-3xl lg:text-[2.5rem] uppercase tracking-wider text-white mb-2 leading-tight">
                    {destination.name}
                  </h2>
                  <p className="text-sm font-light text-white/70 mb-5">
                    From{' '}
                    <span className="text-white font-medium text-base">
                      ${isPremium ? destination.pricePremium.toLocaleString() : destination.priceStandard.toLocaleString()}
                    </span>
                    <span className="text-white/40 text-xs"> / person</span>
                  </p>
                  <Link
                    href={`/packages/${destination.slug}`}
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/80 border-b border-white/30 pb-0.5 hover:text-white hover:border-white transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Package <span className="text-sm leading-none">→</span>
                  </Link>
                </div>

                {/* Inactive sliver — vertical title */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ opacity: !isActive ? 1 : 0, transition: 'opacity 400ms ease' }}
                >
                  <span
                    className="text-white/30 text-[9px] uppercase tracking-[0.4em] whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    {destination.name}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Footer row — counter + controls (touch-friendly on mobile) */}
      <div className="flex items-center justify-between px-4 md:px-12 py-4 md:py-5 shrink-0">
        {/* Dot indicators on mobile, counter on desktop */}
        {isMobile ? (
          <div className="flex gap-1.5 items-center">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-5 h-1.5 bg-on-surface/70'
                    : 'w-1.5 h-1.5 bg-on-surface/20'
                }`}
              />
            ))}
          </div>
        ) : (
          <span className="text-[10px] uppercase tracking-[0.3em] text-on-surface/30">
            {String(activeIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
          </span>
        )}

        <div className="flex gap-2 md:gap-6">
          <button
            onClick={prevSlide}
            disabled={activeIndex === 0}
            className={`min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center text-[10px] uppercase tracking-[0.25em] font-light transition-colors duration-300 focus:outline-none ${
              activeIndex === 0
                ? 'text-on-surface/15 cursor-not-allowed'
                : 'text-on-surface/40 hover:text-on-surface active:text-on-surface cursor-pointer'
            }`}
            aria-label="Previous"
          >
            <span className="md:hidden text-lg">‹</span>
            <span className="hidden md:inline">[ Prev ]</span>
          </button>
          <button
            onClick={nextSlide}
            disabled={activeIndex === cards.length - 1}
            className={`min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center text-[10px] uppercase tracking-[0.25em] font-light transition-colors duration-300 focus:outline-none ${
              activeIndex === cards.length - 1
                ? 'text-on-surface/15 cursor-not-allowed'
                : 'text-on-surface/40 hover:text-on-surface active:text-on-surface cursor-pointer'
            }`}
            aria-label="Next"
          >
            <span className="md:hidden text-lg">›</span>
            <span className="hidden md:inline">[ Next ]</span>
          </button>
        </div>
      </div>
    </section>

    {/* ── Expanded package rows — scroll-triggered alternating layout ── */}
    <div className="w-full bg-background">
      {cards.map((destination, i) => (
        <PackageRow
          key={destination._id}
          destination={destination}
          index={i}
          isPremium={isPremium}
        />
      ))}
    </div>
    </>
  )
}
