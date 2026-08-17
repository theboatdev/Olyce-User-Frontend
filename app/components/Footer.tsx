import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full py-xl bg-background border-t border-outline-variant/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-container-max mx-auto px-margin-mobile md:px-xl">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-2 mb-12 md:mb-0 fade-in-up">
          <Link
            href="/"
            className="font-headline-md text-headline-md tracking-widest text-on-surface mb-sm block hover:text-primary transition-colors"
          >
            OLYCE
          </Link>
          <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface/60">
            © 2024 OLYCE. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Links Column */}
        <div className="col-span-1 flex flex-col gap-3 fade-in-up delay-1">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface/70 mb-xs block">
            Information
          </span>
          <Link
            href="#"
            className="font-body-md text-body-md font-bold text-on-surface opacity-80 hover:opacity-100 underline transition-all duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="font-body-md text-body-md text-on-surface/60 opacity-80 hover:opacity-100 underline transition-all duration-300 hover:text-primary"
          >
            Terms of Service
          </Link>
        </div>

        {/* Links Column 2 */}
        <div className="col-span-1 flex flex-col gap-3 fade-in-up delay-2">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface/70 mb-xs block">
            Company
          </span>
          <Link
            href="#"
            className="font-body-md text-body-md text-on-surface/60 opacity-80 hover:opacity-100 underline transition-all duration-300 hover:text-primary"
          >
            Sustainability
          </Link>
          <Link
            href="#"
            className="font-body-md text-body-md text-on-surface/60 opacity-80 hover:opacity-100 underline transition-all duration-300 hover:text-primary"
          >
            Press
          </Link>
        </div>
      </div>
    </footer>
  )
}
