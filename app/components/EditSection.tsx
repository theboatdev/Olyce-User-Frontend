'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Package, Layers, CreditCard, Sparkles } from 'lucide-react';

const steps = [
  { id: 1, text: "Choose package", icon: Package },
  { id: 2, text: "Select tier", icon: Layers },
  { id: 3, text: "Book & pay", icon: CreditCard },
  { id: 4, text: "We handle everything", icon: Sparkles },
];

export default function EditSection() {
  const [mounted, setMounted] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isIdle, setIsIdle] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-play loop when idle
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isIdle && mounted) {
      timeout = setTimeout(() => {
        setHoveredStep((prev) => (prev === null || prev >= steps.length ? 1 : prev + 1));
      }, 3000); 
    }
    return () => clearTimeout(timeout);
  }, [isIdle, hoveredStep, mounted]);

  if (!mounted) return <section className="w-full bg-surface-container-highest py-xl md:py-[120px] min-h-[400px]"></section>;

  return (
    <section className="w-full bg-surface-container-highest py-xl md:py-[120px] relative overflow-hidden" id="how-it-works">
      
      <div className="max-w-container-max mx-auto bg-surface rounded-none md:rounded-2xl shadow-none md:shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 md:p-20 relative overflow-hidden">
        
        {/* Decorative background element for luxury feel */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-on-surface/10 to-transparent" />

        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-16 md:mb-24 text-center md:text-left"
        >
          How It Works
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start relative z-10">
          {steps.map((step, index) => {
            const isHovered = hoveredStep === step.id;
            const isPast = hoveredStep !== null && hoveredStep > step.id;

            return (
              <React.Fragment key={step.id}>
                {/* Step Container */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center group relative mb-12 md:mb-0 cursor-default"
                  onMouseEnter={() => {
                    setIsIdle(false);
                    setHoveredStep(step.id);
                  }}
                  onMouseLeave={() => {
                    setIsIdle(true);
                    setHoveredStep(null);
                  }}
                >
                  
                  {/* Number Squircle */}
                  <motion.div 
                    className="w-20 h-20 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center border transition-colors duration-500 ease-out relative bg-surface z-10"
                    style={{
                      borderColor: 'var(--color-outline-variant)',
                      color: 'var(--color-outline-variant)'
                    }}
                    animate={{
                      borderColor: isHovered 
                        ? 'transparent' 
                        : isPast 
                          ? 'var(--color-outline-variant)' 
                          : 'var(--color-outline-variant)',
                      color: isHovered 
                        ? 'var(--color-primary)' 
                        : isPast 
                          ? 'var(--color-outline)' 
                          : 'var(--color-outline-variant)'
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    
                    {/* Animated Stroke Outline (SVG drawing effect) */}
                    <svg 
                      className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" 
                      viewBox="0 0 72 72"
                    >
                      <motion.rect
                        x="1" y="1" width="70" height="70" rx="15" ry="15"
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: isHovered ? 1 : 0, 
                          opacity: isHovered ? 1 : 0 
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    </svg>

                    {/* Number / Icon swap */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        {!isHovered ? (
                          <motion.span 
                            key="number"
                            initial={{ opacity: 0, scale: 0.8, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -5 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute font-display-lg text-[22px] italic opacity-50"
                          >
                            {step.id}
                          </motion.span>
                        ) : (
                          <motion.span 
                            key="icon"
                            initial={{ opacity: 0, scale: 0.8, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -5 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute text-primary"
                          >
                            <step.icon className="w-7 h-7 md:w-6 md:h-6" strokeWidth={1} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Subtle inner pulse effect on hover */}
                    <motion.div 
                      className="absolute inset-0 rounded-2xl bg-primary-container -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 0.3 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>

                  {/* Text Label */}
                  <motion.p 
                    className="mt-6 text-center font-body-md max-w-[120px]"
                    style={{
                      color: 'var(--color-on-surface-variant)'
                    }}
                    animate={{
                      color: isHovered ? 'var(--color-on-surface)' : 'var(--color-on-surface-variant)',
                      y: isHovered ? 0 : 2
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {step.text}
                  </motion.p>
                </motion.div>

                {/* Connector Arrow (Hidden on mobile, visible on md+) */}
                {index < steps.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.2 }}
                    className="hidden md:flex items-center justify-center flex-1 mx-4 -mt-10"
                  >
                    <motion.div
                      style={{
                        color: 'var(--color-outline-variant)'
                      }}
                      animate={{
                        x: (isHovered || hoveredStep === step.id + 1) ? 5 : 0,
                        color: (isHovered || hoveredStep === step.id + 1) ? 'var(--color-primary)' : 'var(--color-outline-variant)'
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <ArrowRight strokeWidth={1} className="w-5 h-5 opacity-50" />
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Mobile Connector (Vertical line) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden h-12 w-px bg-gradient-to-b from-outline-variant to-transparent -mt-8 mb-4" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
