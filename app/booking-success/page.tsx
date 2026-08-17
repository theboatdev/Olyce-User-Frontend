'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    const redirectStatus = searchParams.get('redirect_status');

    if (redirectStatus === 'succeeded') {
      setStatus('success');
    } else if (redirectStatus === 'failed') {
      setStatus('error');
    } else {
      setStatus('loading');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-surface-container border border-outline-variant rounded-xl p-8 md:p-12 text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin material-symbols-outlined text-6xl text-on-surface mb-6">
              progress_activity
            </div>
            <h1 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4">
              Processing your payment...
            </h1>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="material-symbols-outlined text-6xl text-green-600 mb-6">
              check_circle
            </div>
            <h1 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4">
              Booking Confirmed!
            </h1>
            <p className="font-body-lg text-on-surface/70 mb-8">
              Thank you for your booking. We've sent a confirmation email with all the details.
              Our team will reach out to you within 24 hours to finalize your itinerary.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-on-surface text-surface rounded-sm font-label-sm text-sm uppercase tracking-widest hover:bg-on-surface/90 transition-colors shadow-lg"
            >
              Return to Homepage
              <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="material-symbols-outlined text-6xl text-red-600 mb-6">
              error
            </div>
            <h1 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4">
              Payment Failed
            </h1>
            <p className="font-body-lg text-on-surface/70 mb-8">
              Unfortunately, your payment could not be processed. Please try again or contact our support team.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-on-surface text-surface rounded-sm font-label-sm text-sm uppercase tracking-widest hover:bg-on-surface/90 transition-colors shadow-lg"
            >
              Return to Homepage
              <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function BookingSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-surface-container border border-outline-variant rounded-xl p-8 md:p-12 text-center">
          <div className="animate-spin material-symbols-outlined text-6xl text-on-surface mb-6">
            progress_activity
          </div>
          <h1 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4">
            Loading...
          </h1>
        </div>
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  );
}
