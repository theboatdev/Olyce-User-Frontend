'use client';

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const LuxuryCursorEffect = dynamic(() => import('./LuxuryCursorEffect'), { ssr: false })

export default function HeroSection() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
    };

    const handleError = () => {
      setVideoError(true);
      setVideoLoaded(true); // Show fallback
    };

    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('error', handleError);

    // Check if video is already loaded
    if (video.readyState >= 3) {
      setVideoLoaded(true);
    }

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <section 
      className="relative w-full bg-surface-container-highest overflow-hidden min-h-[500px] md:min-h-0 md:aspect-video"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Fallback Image - Shows while video loads or if video fails */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'}`}
      >
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070"
          alt="Sri Lanka Beach"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Video Background */}
      {!videoError && (
        <video 
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
        >
          <source src="/video/14923503_3840_2160_24fps.mp4" type="video/mp4" />
        </video>
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center px-margin-mobile max-w-container-max mx-auto">
        <Link
          href="#featured"
          className="inline-flex text-white px-xl py-md font-label-lg text-label-lg uppercase tracking-widest border border-white hover:bg-white hover:text-black transition-colors duration-500 ease-in-out fade-in-up rounded-sm"
        >
          Explore Now
        </Link>
      </div>

      {/* Cursor Effect - Only loads on Desktop and when hovering */}
      {isDesktop && isHovering && <LuxuryCursorEffect />}
    </section>
  )
}
