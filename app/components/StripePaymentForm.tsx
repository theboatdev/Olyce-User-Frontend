'use client';

import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface StripePaymentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  amount: number;
}

export default function StripePaymentForm({ onSuccess, onCancel, amount }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking-success`,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'Payment failed');
        setIsProcessing(false);
      } else {
        onSuccess();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-label-lg text-lg text-on-surface mb-4">Payment Details</h3>
        <div className="bg-surface-container border border-outline-variant rounded-sm p-4">
          <PaymentElement />
        </div>
      </div>

      <div className="bg-surface-container border border-outline-variant rounded-sm p-4">
        <p className="font-body-lg text-on-surface">
          Total Amount: <span className="font-bold">${amount}</span>
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-sm p-4">
          <p className="text-red-800 text-sm">{errorMessage}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1 px-6 py-3 border border-outline-variant text-on-surface rounded-sm font-label-sm text-xs uppercase tracking-widest hover:bg-surface-variant transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 px-6 py-3 bg-on-surface text-surface rounded-sm font-label-sm text-xs uppercase tracking-widest hover:bg-on-surface/90 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span>
              Processing...
            </>
          ) : (
            <>
              Pay ${amount}
              <span className="material-symbols-outlined text-sm">lock</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
