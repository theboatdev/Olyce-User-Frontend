'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { createBookingRecord, createPaymentIntent } from '@/lib/api';
import StripePaymentForm from './StripePaymentForm';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// Dynamically import InteractiveMap to avoid SSR issues with Leaflet
const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-surface-container rounded-lg flex items-center justify-center border border-outline-variant/30">
      <span className="font-label-sm text-on-surface/40 italic">Loading map...</span>
    </div>
  ),
});

// Helper function to validate and extract image URLs
const getValidImageUrl = (image: any): string | null => {
  if (!image) return null;
  if (typeof image === 'string' && image.length > 0) return image;
  if (image.asset?.url) return image.asset.url;
  if (image.url) return image.url;
  return null;
};

interface ItineraryDay {
  day: string;
  description: string;
  image?: any;
  location?: {
    lat: number;
    lng: number;
    name?: string;
  };
}

interface Hotel {
  name: string;
  category: string;
  description: string;
  image?: any;
}

interface PackageData {
  _id: string;
  name: string;
  slug: string;
  duration: string;
  category?: string;
  priceStandard: number;
  pricePremium: number;
  description?: string;
  images?: any[];
  itinerary?: ItineraryDay[];
  included?: string[];
  notIncluded?: string[];
  standardHotel?: Hotel;
  premiumHotel?: Hotel;
  mapImage?: any;
}

export default function PackageDetailView({ packageData }: { packageData: PackageData }) {
  const [isPremium, setIsPremium] = useState(false);
  const [activeTab, setActiveTab] = useState<'Itinerary' | 'Inclusions' | 'Hotels' | 'Map'>('Itinerary');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelDate: '',
    numberOfGuests: 1,
    tier: 'standard',
    specialRequests: '',
  });

  const currentPrice = isPremium ? packageData.pricePremium : packageData.priceStandard;
  const totalPrice = currentPrice * bookingForm.numberOfGuests;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Calculate end date based on duration
      const startDate = new Date(bookingForm.travelDate);
      const durationDays = parseInt(packageData.duration.split(' ')[0]) || 7;
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + durationDays);

      // Split full name into first and last name
      const nameParts = bookingForm.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || firstName;

      // Create booking record with correct structure
      const bookingData = {
        packageId: packageData._id,
        packageSnapshot: {
          name: packageData.name,
          tierSelected: bookingForm.tier,
        },
        customer: {
          firstName: firstName,
          lastName: lastName,
          email: bookingForm.email,
          phone: bookingForm.phone,
          specialRequests: bookingForm.specialRequests || undefined,
        },
        travelDates: {
          startDate: bookingForm.travelDate,
          endDate: endDate.toISOString().split('T')[0],
        },
        travelers: {
          adults: bookingForm.numberOfGuests,
          children: 0,
        },
        financials: {
          subTotal: totalPrice,
          taxes: 0,
          totalAmount: totalPrice,
          currency: 'USD',
        },
      };

      const booking = await createBookingRecord(bookingData);
      setBookingId(booking._id);

      // Create payment intent
      const paymentIntent = await createPaymentIntent(booking._id);
      setClientSecret(paymentIntent.clientSecret);

      // Show payment modal
      setShowBookingModal(false);
      setShowPaymentModal(true);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || 'Failed to create booking. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    // Reset form
    setBookingForm({
      fullName: '',
      email: '',
      phone: '',
      travelDate: '',
      numberOfGuests: 1,
      tier: 'standard',
      specialRequests: '',
    });
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
    setShowBookingModal(true);
    setClientSecret(null);
  };

  return (
    <div className="relative w-full -mt-24 md:-mt-32">
      
      {/* Full-Width Hero Image */}
      <div className="relative w-full h-[58vh] sm:h-[70vh] md:h-[75vh] overflow-hidden">
        {packageData.images && packageData.images.length > 0 && getValidImageUrl(packageData.images[0]) ? (
           <Image 
             src={getValidImageUrl(packageData.images[0])!}
             alt={packageData.name}
             fill
             priority
             className="object-cover"
             sizes="100vw"
           />
        ) : (
          <div className="w-full h-full bg-surface-container flex items-center justify-center">
            <span className="font-label-sm text-on-surface/40 italic">{packageData.name}</span>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
        
        {/* Back Link */}
        <div className="absolute top-24 sm:top-28 md:top-36 left-0 right-0 max-w-container-max mx-auto px-margin-mobile md:px-gutter z-10">
          <Link href="/#featured" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors font-label-sm uppercase tracking-widest text-xs">
            <span className="material-symbols-outlined text-sm">arrow_left_alt</span> All Packages
          </Link>
        </div>
        
        {/* Package Info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-8 sm:pb-12 md:pb-16 z-10">
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-sm text-xs font-label-sm uppercase tracking-widest text-white">{packageData.duration}</span>
            {packageData.category && (
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-sm text-xs font-label-sm uppercase tracking-widest text-white">{packageData.category}</span>
            )}
          </div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-white font-semibold mb-0 tracking-tight text-[28px] sm:text-[40px] md:text-[56px] leading-tight">
            {packageData.name}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-10 sm:py-16 md:py-20">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-20 items-start">
        
        {/* Left Content Area */}
        <div className="flex-1 w-full lg:w-2/3 order-2 lg:order-1">
          
          {/* Header Info */}
          <div className="mb-8 sm:mb-12">
            {packageData.description && (
              <p className="font-body-lg text-body-lg text-on-surface/80 max-w-3xl mb-6 sm:mb-8 leading-relaxed text-[15px] sm:text-base">
                {packageData.description}
              </p>
            )}
          </div>

          {/* Tabs */}
          <div className="border-b border-outline-variant/30 flex gap-5 sm:gap-8 mb-6 sm:mb-8 overflow-x-auto no-scrollbar scrollbar-hide">
            {['Itinerary', 'Inclusions', 'Hotels', 'Map'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 font-label-sm text-sm tracking-wide transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'text-on-surface border-b-2 border-on-surface font-bold' 
                    : 'text-on-surface/60 hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Areas */}
          <div className="min-h-[280px] sm:min-h-[400px]">
            {activeTab === 'Itinerary' && (
              <div className="relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-on-surface/20 via-on-surface/40 to-on-surface/20 hidden md:block"></div>
                
                <div className="flex flex-col gap-10 sm:gap-16 md:gap-20">
                  {packageData.itinerary?.length ? (
                    packageData.itinerary.map((day, idx) => {
                      const isEven = idx % 2 === 0;
                      const hasImage = getValidImageUrl(day.image);
                      
                      return (
                        <div 
                          key={idx} 
                          className="relative group"
                        >
                          {/* Timeline Node — desktop only */}
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full bg-surface border-2 border-on-surface/30 flex items-center justify-center transition-all duration-500 group-hover:border-on-surface group-hover:scale-110 group-hover:shadow-lg">
                                <span className="font-label-sm text-xs font-bold text-on-surface">{idx + 1}</span>
                              </div>
                              <div className="absolute inset-0 rounded-full bg-on-surface/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                            </div>
                          </div>

                          {/* Content Container */}
                          <div className={`flex flex-col md:flex-row gap-5 sm:gap-6 md:gap-12 items-stretch md:items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                            {/* Image Side */}
                            {hasImage && (
                              <div className={`w-full md:w-[calc(50%-3rem)] ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                <div className="relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl transition-all duration-700 group-hover:shadow-2xl group-hover:scale-[1.02]">
                                  <Image
                                    src={getValidImageUrl(day.image)!}
                                    alt={day.day}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 45vw"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                  
                                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-surface/95 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
                                    <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface">Day {idx + 1}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Text Side */}
                            <div className={`w-full md:w-[calc(50%-3rem)] ${!hasImage ? 'md:w-full' : ''}`}>
                              <div className={`bg-surface-container/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-outline-variant/20 transition-all duration-500 group-hover:bg-surface-container group-hover:border-outline-variant/40 group-hover:shadow-lg ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                {!hasImage && (
                                  <span className="inline-block mb-3 text-[11px] uppercase tracking-widest font-semibold text-on-surface/50 md:hidden">
                                    Day {idx + 1}
                                  </span>
                                )}
                                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-on-surface/40 mt-2"></div>
                                  <h4 className="font-headline-md text-lg sm:text-xl md:text-2xl text-on-surface font-semibold leading-tight">
                                    {day.day}
                                  </h4>
                                </div>
                                
                                {day.description && (
                                  <p className="font-body-md text-[15px] sm:text-base text-on-surface/75 leading-relaxed ml-5 sm:ml-6">
                                    {day.description}
                                  </p>
                                )}
                                
                                <div className={`mt-5 sm:mt-6 flex ${isEven ? 'justify-start' : 'md:justify-end justify-start'}`}>
                                  <div className="h-1 w-16 bg-gradient-to-r from-on-surface/20 to-transparent rounded-full"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 sm:p-12 text-center font-label-sm text-on-surface/50 italic border border-outline-variant/30 rounded-2xl bg-surface-container/30">
                      Itinerary details coming soon.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'Inclusions' && (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h4 className="font-label-sm uppercase tracking-widest text-on-surface mb-4 pb-2 border-b border-outline-variant/30">Included ✓</h4>
                  <ul className="flex flex-col gap-4 mt-6">
                    {packageData.included?.length ? packageData.included.map((item, i) => (
                      <li key={i} className="font-body-md text-on-surface/90 pb-4 border-b border-outline-variant/10">{item}</li>
                    )) : <li className="text-on-surface/50 italic">No items listed.</li>}
                  </ul>
                </div>
                <div className="flex-1">
                  <h4 className="font-label-sm uppercase tracking-widest text-on-surface mb-4 pb-2 border-b border-outline-variant/30">Not Included ✕</h4>
                  <ul className="flex flex-col gap-4 mt-6">
                    {packageData.notIncluded?.length ? packageData.notIncluded.map((item, i) => (
                      <li key={i} className="font-body-md text-on-surface/70 pb-4 border-b border-outline-variant/10">{item}</li>
                    )) : <li className="text-on-surface/50 italic">No items listed.</li>}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'Hotels' && (
              <div className="flex flex-col md:flex-row gap-6">
                {/* Standard Hotel Card */}
                <div className="flex-1 border border-outline-variant/30 rounded-lg overflow-hidden bg-surface flex flex-col">
                  <div className="h-48 bg-surface-container flex items-center justify-center relative">
                     {getValidImageUrl(packageData.standardHotel?.image) ? (
                        <Image src={getValidImageUrl(packageData.standardHotel?.image)!} alt="Standard Hotel" fill className="object-cover"/>
                     ) : (
                        <span className="font-label-sm text-on-surface/30 italic text-xs">Standard Hotel Image Placeholder</span>
                     )}
                  </div>
                  <div className="p-6">
                    <h4 className="font-headline-sm text-on-surface font-bold mb-1">{packageData.standardHotel?.name || 'Standard Accommodation'}</h4>
                    <span className="font-label-sm text-xs text-on-surface/50 block mb-4">★★★ {packageData.standardHotel?.category || '3-star category'}</span>
                    <p className="font-body-sm text-on-surface/80">{packageData.standardHotel?.description || 'Comfortable, well-located property with breakfast included.'}</p>
                  </div>
                </div>

                {/* Premium Hotel Card */}
                <div className="flex-1 border border-outline-variant/30 rounded-lg overflow-hidden bg-surface flex flex-col">
                  <div className="h-48 bg-surface-container flex items-center justify-center relative">
                     {getValidImageUrl(packageData.premiumHotel?.image) ? (
                        <Image src={getValidImageUrl(packageData.premiumHotel?.image)!} alt="Premium Hotel" fill className="object-cover"/>
                     ) : (
                        <span className="font-label-sm text-on-surface/30 italic text-xs">Premium Hotel Image Placeholder</span>
                     )}
                  </div>
                  <div className="p-6">
                    <h4 className="font-headline-sm text-on-surface font-bold mb-1">{packageData.premiumHotel?.name || 'Premium Accommodation'}</h4>
                    <span className="font-label-sm text-xs text-on-surface/50 block mb-4">★★★★★ {packageData.premiumHotel?.category || '5-star category'}</span>
                    <p className="font-body-sm text-on-surface/80">{packageData.premiumHotel?.description || 'Boutique luxury with pool, spa, and curated dining experience.'}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Map' && (
              <InteractiveMap itinerary={packageData.itinerary} packageName={packageData.name} />
            )}
          </div>
        </div>

        {/* Right Sticky Booking Sidebar — first on mobile for quicker booking */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32 space-y-5 sm:space-y-6 order-1 lg:order-2">
          <div className="bg-surface-container/30 border border-outline-variant/30 rounded-xl p-5 sm:p-8 backdrop-blur-sm shadow-sm">
            <h3 className="font-headline-md text-xl sm:text-2xl text-on-surface mb-5 sm:mb-6 font-semibold">Reserve Your Journey</h3>
            
            {/* Premium Toggle */}
            <div className="flex bg-surface-variant/50 rounded-lg p-1 mb-6 sm:mb-8">
              <button 
                onClick={() => setIsPremium(false)}
                className={`flex-1 py-2.5 sm:py-3 rounded-md font-label-sm text-xs uppercase tracking-widest transition-all duration-300 ${!isPremium ? 'bg-surface text-on-surface shadow-sm font-bold' : 'text-on-surface/60 hover:text-on-surface'}`}
              >
                Standard
              </button>
              <button 
                onClick={() => setIsPremium(true)}
                className={`flex-1 py-2.5 sm:py-3 rounded-md font-label-sm text-xs uppercase tracking-widest transition-all duration-300 ${isPremium ? 'bg-surface text-on-surface shadow-sm font-bold' : 'text-on-surface/60 hover:text-on-surface'}`}
              >
                Premium
              </button>
            </div>

            {/* Price Display */}
            <div className="flex items-end gap-2 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-outline-variant/20">
              <span className="font-display-lg text-4xl sm:text-5xl text-on-surface font-semibold">${currentPrice.toLocaleString()}</span>
              <span className="font-label-sm text-sm text-on-surface/60 mb-1.5 sm:mb-2">/ person</span>
            </div>

            {/* Quick summary highlights */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface/50 text-xl">schedule</span>
                <span className="font-body-md text-on-surface/80">{packageData.duration}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface/50 text-xl">bed</span>
                <span className="font-body-md text-on-surface/80">
                  {isPremium ? '5-Star Luxury Accommodations' : '3-4 Star Handpicked Hotels'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface/50 text-xl">restaurant</span>
                <span className="font-body-md text-on-surface/80">Daily Breakfast Included</span>
              </li>
            </ul>

            <button 
              onClick={() => setShowBookingModal(true)}
              className="w-full py-4 bg-on-surface text-surface rounded-sm font-label-sm text-sm uppercase tracking-widest hover:bg-on-surface/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              Begin Booking
              <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
            </button>
            

          </div>
          
          {/* Need help card */}
          <div className="bg-surface-container/20 border border-outline-variant/20 rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-on-surface/30 text-3xl mb-2">support_agent</span>
            <h4 className="font-headline-sm text-on-surface font-bold mb-2">Need a tailored touch?</h4>
            <p className="font-body-sm text-on-surface/70 mb-4">Connect with our luxury travel concierge to customize this itinerary.</p>
            <Link href="#" className="font-label-sm text-xs uppercase tracking-widest text-on-surface hover:text-primary transition-colors underline underline-offset-4">
              Contact Concierge
            </Link>
          </div>
        </div>

        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowBookingModal(false)}>
          <div className="bg-background rounded-t-2xl sm:rounded-lg max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 sm:p-8 md:p-12">
              <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-on-surface mb-6 sm:mb-8">Complete your booking</h2>

              <form className="flex flex-col gap-6" onSubmit={handleBookingSubmit}>
                {/* Full Name */}
                <div>
                  <label className="block font-label-sm text-sm text-on-surface/80 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={bookingForm.fullName}
                    onChange={(e) => setBookingForm({...bookingForm, fullName: e.target.value})}
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:border-on-surface transition-colors"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-label-sm text-sm text-on-surface/80 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:border-on-surface transition-colors"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-label-sm text-sm text-on-surface/80 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:border-on-surface transition-colors"
                    required
                  />
                </div>

                {/* Travel Date */}
                <div>
                  <label className="block font-label-sm text-sm text-on-surface/80 mb-2">Travel Date</label>
                  <input
                    type="date"
                    value={bookingForm.travelDate}
                    onChange={(e) => setBookingForm({...bookingForm, travelDate: e.target.value})}
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-sm text-on-surface focus:outline-none focus:border-on-surface transition-colors"
                    required
                  />
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block font-label-sm text-sm text-on-surface/80 mb-2">Number of Guests</label>
                  <input
                    type="number"
                    min="1"
                    value={bookingForm.numberOfGuests}
                    onChange={(e) => setBookingForm({...bookingForm, numberOfGuests: parseInt(e.target.value) || 1})}
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-sm text-on-surface focus:outline-none focus:border-on-surface transition-colors"
                    required
                  />
                </div>

                {/* Selected Tier */}
                <div>
                  <label className="block font-label-sm text-sm text-on-surface/80 mb-3">Selected Tier</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tier"
                        value="standard"
                        checked={bookingForm.tier === 'standard'}
                        onChange={(e) => setBookingForm({...bookingForm, tier: e.target.value})}
                        className="w-5 h-5 accent-on-surface"
                      />
                      <span className="font-body-md text-on-surface">Standard</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tier"
                        value="premium"
                        checked={bookingForm.tier === 'premium'}
                        onChange={(e) => setBookingForm({...bookingForm, tier: e.target.value})}
                        className="w-5 h-5 accent-on-surface"
                      />
                      <span className="font-body-md text-on-surface">Premium</span>
                    </label>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block font-label-sm text-sm text-on-surface/80 mb-2">Special Requests</label>
                  <textarea
                    placeholder="Dietary requirements, accessibility needs, celebrations..."
                    value={bookingForm.specialRequests}
                    onChange={(e) => setBookingForm({...bookingForm, specialRequests: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:border-on-surface transition-colors resize-none"
                  />
                </div>

                {/* Upload Documents */}
                <div>
                  <label className="block font-label-sm text-sm text-on-surface/80 mb-2">Upload Supporting Documents (optional)</label>
                  <div className="border-2 border-dashed border-outline-variant rounded-sm p-8 text-center bg-surface-container/30 hover:bg-surface-container/50 transition-colors cursor-pointer">
                    <p className="font-body-md text-on-surface/60 italic">Drop files here or click to browse</p>
                    <p className="font-label-sm text-xs text-on-surface/40 mt-1">(Passport scan, travel insurance, dietary PDF)</p>
                  </div>
                </div>

                {/* Total Price */}
                <div className="bg-surface-container border border-outline-variant rounded-sm p-4 mt-2">
                  <p className="font-body-lg text-on-surface">
                    {bookingForm.numberOfGuests} guest{bookingForm.numberOfGuests > 1 ? 's' : ''} × ${bookingForm.tier === 'premium' ? packageData.pricePremium : packageData.priceStandard}pp = <span className="font-bold">${totalPrice} total</span>
                  </p>
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 rounded-sm p-4 mt-2">
                    <p className="text-red-800 text-sm">{errorMessage}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    disabled={isProcessing}
                    className="flex-1 px-6 py-3 border border-outline-variant text-on-surface rounded-sm font-label-sm text-xs uppercase tracking-widest hover:bg-surface-variant transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 px-6 py-3 bg-on-surface text-surface rounded-sm font-label-sm text-xs uppercase tracking-widest hover:bg-on-surface/90 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span>
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Booking <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && clientSecret && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-background rounded-t-2xl sm:rounded-lg max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="p-5 sm:p-8 md:p-12">
              <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-on-surface mb-6 sm:mb-8">Payment</h2>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripePaymentForm
                  amount={totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onCancel={handlePaymentCancel}
                />
              </Elements>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
