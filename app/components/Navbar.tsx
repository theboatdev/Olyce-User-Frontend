'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Destinations', href: '/#featured' },
  { label: 'Journeys',     href: '/journeys' },
  { label: 'The Edit',     href: '/#edit' },
  { label: 'Our Story',    href: '/#story' },
]

function NavLink({ href, label, solid }: { href: string; label: string; solid: boolean }) {
  return (
    <Link
      href={href}
      className={`relative group font-sans text-[13px] tracking-[0.01em] font-normal transition-colors duration-300 ${
        solid ? 'text-on-surface/70 hover:text-on-surface' : 'text-white/60 hover:text-white'
      }`}
    >
      {label}
      {/* Underline — grows from left on hover */}
      <span
        className={`absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out ${
          solid ? 'bg-on-surface' : 'bg-white'
        }`}
      />
    </Link>
  )
}

export default function Navbar({ forceSolid = false }: { forceSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const solid = forceSolid || scrolled

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        id="navbar"
        className={`z-50 fixed top-0 w-full transition-all duration-500 ease-in-out ${
          solid
            ? 'bg-background/90 backdrop-blur-md border-b border-outline-variant/20'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-lg h-16 md:h-20">

          {/* Brand */}
          <Link
            href="/"
            className={`font-headline-md text-[15px] uppercase tracking-[0.12em] font-semibold transition-colors duration-500 ${
              solid ? 'text-on-surface' : 'text-white'
            }`}
          >
            Olyce
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.label} href={l.href} label={l.label} solid={solid} />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Inquire — desktop */}
            <Link
              href="#"
              className={`hidden md:inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 px-5 py-2.5 rounded-sm ${
                solid
                  ? 'bg-on-surface text-background hover:bg-on-surface/80'
                  : 'bg-white text-black hover:bg-white/85'
              }`}
            >
              Inquire
            </Link>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className={`md:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px] transition-colors duration-300 ${
                solid ? 'text-on-surface' : 'text-white'
              }`}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block w-5 h-px bg-current origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-px bg-current origin-center"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block w-5 h-px bg-current origin-center"
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-xl flex flex-col"
          >
            {/* Links */}
            <nav className="flex flex-col justify-center flex-1 px-margin-mobile gap-0">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-sans block text-[15px] tracking-[0.01em] font-normal text-on-surface/60 hover:text-on-surface py-5 border-b border-outline-variant/20 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              {/* Inquire — mobile drawer */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, delay: 0.06 * NAV_LINKS.length, ease: [0.22, 1, 0.36, 1] }}
                className="pt-10"
              >
                <Link
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="font-sans inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-on-surface/50 border-b border-on-surface/15 pb-1 hover:text-on-surface hover:border-on-surface/40 transition-all duration-300"
                >
                  Make an Enquiry <span className="text-sm leading-none">→</span>
                </Link>
              </motion.div>
            </nav>

            {/* Footer strip */}
            <div className="px-margin-mobile pb-10 flex items-center justify-center">
              <span className="font-headline-md text-[11px] uppercase tracking-[0.3em] font-semibold text-on-surface/20">Olyce</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
