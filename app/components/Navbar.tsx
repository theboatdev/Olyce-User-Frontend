'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Destinations', href: '/#featured' },
  { label: 'Journeys', href: '/journeys' },
  { label: 'The Edit', href: '/edit' },
  { label: 'Our Story', href: '/story' },
]

export default function Navbar({ forceSolid = false }: { forceSolid?: boolean }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = pathname === '/'
  const solid = forceSolid || scrolled || !isHome

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <header
        id="navbar"
        className={`z-50 fixed top-0 w-full transition-all duration-300 ${
          solid ? 'bg-white shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="flex justify-between items-center max-w-[1280px] mx-auto px-5 sm:px-8 h-[70px] sm:h-[78px]">
          <Link
            href="/"
            className={`font-headline-md text-[18px] uppercase tracking-[0.14em] font-semibold transition-colors ${
              solid ? 'text-[var(--gsm-teal)]' : 'text-white'
            }`}
          >
            Olyce
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => {
              const active = isActive(l.href)
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`font-[family-name:var(--font-lato)] text-[14px] font-semibold transition-colors ${
                    active
                      ? 'text-[var(--gsm-gold)]'
                      : solid
                        ? 'text-[#333] hover:text-[var(--gsm-gold)]'
                        : 'text-white hover:text-[var(--gsm-gold)]'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={`lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px] ${
              solid ? 'text-[#333]' : 'text-white'
            }`}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-current origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-px bg-current"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-current origin-center"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white pt-24 sm:pt-28 px-5 sm:px-8"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-[family-name:var(--font-lato)] text-lg font-semibold text-[var(--gsm-teal)] py-3 border-b border-black/5"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
