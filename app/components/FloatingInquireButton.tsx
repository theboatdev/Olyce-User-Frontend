import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export default function FloatingInquireButton() {
  return (
    <Link
      href="#"
      aria-label="Enquire with Olyce"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[70] inline-flex h-14 w-14 shrink-0 items-center justify-center bg-[var(--gsm-gold)] text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-[#e0a500] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gsm-gold)]"
      style={{ borderRadius: '50%' }}
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2} />
    </Link>
  )
}
