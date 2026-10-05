import Link from 'next/link'
import {
  Plane,
  MapPin,
  Compass,
  Camera,
  Luggage,
  Palmtree,
  Mountain,
  Ship,
  Sun,
  Globe,
  Tent,
  Binoculars,
  TrainFront,
  Sailboat,
} from 'lucide-react'

const FOOTER_ICONS = [
  { Icon: Plane, className: 'top-[12%] left-[6%] w-10 h-10 sm:w-14 sm:h-14 rotate-[-18deg] opacity-[0.14]' },
  { Icon: Palmtree, className: 'hidden sm:block top-[28%] left-[18%] w-16 h-16 rotate-[8deg] opacity-[0.12]' },
  { Icon: Compass, className: 'top-[8%] left-[42%] w-9 h-9 sm:w-12 sm:h-12 rotate-[22deg] opacity-[0.15]' },
  { Icon: Mountain, className: 'top-[18%] right-[22%] w-12 h-12 sm:w-[72px] sm:h-[72px] rotate-[-6deg] opacity-[0.13]' },
  { Icon: Camera, className: 'hidden md:block top-[42%] right-[8%] w-12 h-12 rotate-[14deg] opacity-[0.14]' },
  { Icon: MapPin, className: 'bottom-[28%] left-[10%] w-10 h-10 sm:w-14 sm:h-14 rotate-[-10deg] opacity-[0.12]' },
  { Icon: Ship, className: 'hidden sm:block top-[55%] left-[32%] w-16 h-16 rotate-[4deg] opacity-[0.11]' },
  { Icon: Luggage, className: 'hidden md:block bottom-[22%] left-[48%] w-12 h-12 rotate-[-16deg] opacity-[0.13]' },
  { Icon: Sun, className: 'top-[14%] right-[8%] w-10 h-10 sm:w-14 sm:h-14 rotate-[30deg] opacity-[0.14]' },
  { Icon: TrainFront, className: 'hidden sm:block bottom-[36%] right-[18%] w-14 h-14 rotate-[9deg] opacity-[0.12]' },
  { Icon: Globe, className: 'hidden md:block top-[48%] left-[4%] w-16 h-16 rotate-[-24deg] opacity-[0.11]' },
  { Icon: Tent, className: 'bottom-[18%] right-[34%] w-9 h-9 sm:w-12 sm:h-12 rotate-[12deg] opacity-[0.13]' },
  { Icon: Binoculars, className: 'hidden sm:block top-[62%] right-[42%] w-14 h-14 rotate-[-8deg] opacity-[0.12]' },
  { Icon: Sailboat, className: 'bottom-[12%] left-[70%] w-10 h-10 sm:w-16 sm:h-16 rotate-[16deg] opacity-[0.14]' },
]

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[var(--gsm-footer)] text-white pt-12 sm:pt-16 pb-8">
      {/* Scattered travel icons */}
      <div className="pointer-events-none absolute inset-0 z-0 text-white" aria-hidden>
        {FOOTER_ICONS.map(({ Icon, className }, i) => (
          <Icon key={i} className={`absolute ${className}`} strokeWidth={1.25} />
        ))}
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-white/10">
          <div className="w-full sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-headline-md text-[20px] tracking-[0.14em] uppercase text-white block mb-4"
            >
              Olyce
            </Link>
            <p
              className="w-full text-[14px] font-light text-white/70 leading-relaxed text-justify"
              style={{ width: '100%', maxWidth: '100%' }}
            >
              Olyce designs Sri Lanka travel around clarity: structured packages, honest tier
              choices, and routes that balance culture, nature, and time to breathe.
            </p>
          </div>

          <div>
            <h5 className="font-heading text-[18px] font-semibold text-[var(--gsm-gold)] mb-4 sm:mb-5">
              Quick Links
            </h5>
            <ul className="space-y-3 text-[14px] text-white/75">
              <li>
                <Link href="/" className="hover:text-[var(--gsm-gold)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/story" className="hover:text-[var(--gsm-gold)] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#featured" className="hover:text-[var(--gsm-gold)] transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/journeys" className="hover:text-[var(--gsm-gold)] transition-colors">
                  Journeys
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--gsm-gold)] hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-heading text-[18px] font-semibold text-[var(--gsm-gold)] mb-4 sm:mb-5">
              Explore
            </h5>
            <ul className="space-y-3 text-[14px] text-white/75">
              <li>
                <Link href="/edit" className="hover:text-[var(--gsm-gold)] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/journeys" className="hover:text-[var(--gsm-gold)] transition-colors">
                  All Packages
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--gsm-gold)] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-heading text-[18px] font-semibold text-[var(--gsm-gold)] mb-4 sm:mb-5">
              Contact Info
            </h5>
            <ul className="space-y-3 text-[14px] text-white/75">
              <li>Sri Lanka</li>
              <li>
                <Link href="#" className="hover:text-[var(--gsm-gold)] transition-colors">
                  Make an Enquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-left text-[12px] sm:text-[13px] text-white/50">
            Copyright © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
