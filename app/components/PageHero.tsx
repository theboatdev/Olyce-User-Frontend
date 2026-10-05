import Image from 'next/image'

type PageHeroProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  imageSrc: string
  imageAlt: string
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
}: PageHeroProps) {
  return (
    <section className="relative w-full min-h-[320px] h-[42vh] sm:min-h-[380px] sm:h-[48vh] max-h-[560px] overflow-hidden mt-[70px] sm:mt-[78px]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 py-10 sm:py-14 text-center">
          {eyebrow ? (
            <p className="hero-copy text-center text-[11px] sm:text-[12px] uppercase tracking-[1.2px] font-semibold text-[var(--gsm-gold)] mb-2 sm:mb-3">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-heading text-white text-[32px] sm:text-[42px] md:text-[52px] font-semibold leading-[1.15] mb-3 mx-auto max-w-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p
              className="hero-copy text-center mx-auto text-white/85 text-[15px] sm:text-[16px] md:text-[18px] font-light leading-relaxed"
              style={{ maxWidth: '36rem', width: '100%' }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
