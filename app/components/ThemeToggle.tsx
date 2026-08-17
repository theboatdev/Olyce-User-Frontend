'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggle({ solid = true }: { solid?: boolean }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return <div className="w-8 h-8" />

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className={`relative w-8 h-8 flex items-center justify-center overflow-hidden transition-colors duration-300 ${
        solid
          ? 'text-on-surface/60 hover:text-on-surface'
          : 'text-white/50 hover:text-white'
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'light' : 'dark'}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="material-symbols-outlined absolute"
          style={{ fontSize: '18px', fontVariationSettings: "'FILL' 0, 'wght' 200" }}
        >
          {isDark ? 'light_mode' : 'dark_mode'}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
