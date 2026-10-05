'use client'

import { Package, Layers, CreditCard, Sparkles } from 'lucide-react'

const steps = [
  { id: 1, text: 'Choose package', detail: 'Browse curated Sri Lanka journeys', icon: Package },
  { id: 2, text: 'Select tier', detail: 'Pick Standard or Premium stays', icon: Layers },
  { id: 3, text: 'Book & pay', detail: 'Secure checkout in a few steps', icon: CreditCard },
  { id: 4, text: 'We handle everything', detail: 'Relax, we take care of the rest', icon: Sparkles },
]

export default function EditSection() {
  return (
    <section id="edit" className="travel-pattern w-full py-14 sm:py-20 md:py-24">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="section-title mb-4">How It Works</h2>
          <p className="text-center text-[15px] sm:text-[16px] leading-7 font-light text-[var(--gsm-body)]">
            A simple path from discovery to departure, designed around you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
          {steps.map((step) => (
            <div key={step.id} className="text-center px-2 sm:px-4">
              <div className="mx-auto mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-[10px] bg-[var(--gsm-teal)]/10 text-[var(--gsm-teal)] flex items-center justify-center">
                <step.icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
              </div>
              <p className="text-center text-[12px] uppercase tracking-[1.2px] text-[var(--gsm-gold)] font-semibold mb-2">
                Step {String(step.id).padStart(2, '0')}
              </p>
              <h3 className="font-heading text-[20px] sm:text-[22px] font-semibold text-[var(--gsm-teal)] mb-2">
                {step.text}
              </h3>
              <p className="text-center text-[15px] font-light text-[var(--gsm-body)]">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
