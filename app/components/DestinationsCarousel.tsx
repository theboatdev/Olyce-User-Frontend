'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface Destination {
  _id: string
  name: string
  slug: string
  duration: string
  category?: string | null
  priceStandard: number
  pricePremium: number
  description?: string
  images: any[]
}

const getValidImageUrl = (image: any): string | null => {
  if (!image) return null
  if (typeof image === 'string' && image.length > 0) return image
  if (image.asset?.url) return image.asset.url
  if (image.url) return image.url
  return null
}

export default function DestinationsCarousel({ destinations = [] }: { destinations?: Destination[] }) {
  const [isPremium, setIsPremium] = useState(false)

  if (destinations.length === 0) return null

  return (
    <section id="featured" className="travel-pattern w-full py-14 sm:py-20 md:py-24">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="section-title mb-4">Explore Our Tours</h2>
          <p className="text-[15px] sm:text-[16px] leading-7 font-light text-[var(--gsm-body)]">
            Browse published packages from our catalogue, each with duration, tier pricing, and a full
            detail page when you are ready to compare or book.
          </p>

          <div className="inline-flex items-center border border-[var(--gsm-teal)]/25 mt-6 sm:mt-8 overflow-hidden rounded-[10px]">
            <button
              type="button"
              onClick={() => setIsPremium(false)}
              className={`px-4 sm:px-5 py-2.5 text-[11px] sm:text-[12px] uppercase tracking-[1.2px] font-semibold transition-colors ${
                !isPremium
                  ? 'bg-[var(--gsm-teal)] text-white'
                  : 'text-[var(--gsm-teal)] hover:bg-[var(--gsm-teal)]/5'
              }`}
            >
              Standard
            </button>
            <button
              type="button"
              onClick={() => setIsPremium(true)}
              className={`px-4 sm:px-5 py-2.5 text-[11px] sm:text-[12px] uppercase tracking-[1.2px] font-semibold transition-colors ${
                isPremium
                  ? 'bg-[var(--gsm-teal)] text-white'
                  : 'text-[var(--gsm-teal)] hover:bg-[var(--gsm-teal)]/5'
              }`}
            >
              Premium
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-10 sm:gap-y-12">
          {destinations.map((destination) => {
            const imgUrl = getValidImageUrl(destination.images?.[0])
            const price = isPremium ? destination.pricePremium : destination.priceStandard
            const blurb =
              destination.description?.trim() ||
              `A ${destination.duration} ${destination.category?.toLowerCase() ?? 'curated'} journey through Sri Lanka.`

            return (
              <article key={destination._id} className="flex flex-col">
                <Link href={`/packages/${destination.slug}`} className="block mb-4 sm:mb-5">
                  <div className="relative w-full overflow-hidden rounded-[10px] aspect-[353/250] bg-[#e8eef0]">
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={destination.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : null}
                  </div>
                </Link>

                <h3 className="tour-title mb-3">
                  <Link href={`/packages/${destination.slug}`} className="hover:opacity-80">
                    {destination.name}
                  </Link>
                </h3>

                <p className="text-[15px] leading-6 font-light text-[var(--gsm-body)] mb-3 line-clamp-3 flex-1">
                  {blurb}
                </p>

                <p className="text-[13px] sm:text-[14px] text-[var(--gsm-body)] mb-4">
                  {destination.duration}
                  {destination.category ? ` · ${destination.category}` : ''} · From{' '}
                  <span className="font-semibold text-[var(--gsm-teal)]">${price.toLocaleString()}</span>
                </p>

                <Link
                  href={`/packages/${destination.slug}`}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--gsm-teal)] hover:text-[var(--gsm-gold)] transition-colors w-fit"
                >
                  Learn More <span aria-hidden>→</span>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
