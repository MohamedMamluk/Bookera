'use client';

import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import BookeraBackend from '@/lib/axiosInstance';
import axios from 'axios';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { Icons } from '@/components/icons';

export default function PaymentForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(stripe, elements);
    setLoading(true);
    try {
      if (!elements) {
        return;
      }
      const { error }: any = await stripe?.confirmPayment({
        elements: elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window.location.origin}/payment/completed`,
        },
      });
      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24'>
      <div className='mx-auto w-full max-w-lg'>
        <h1 className='relative text-2xl font-medium text-gray-700 sm:text-3xl'>
          Secure Checkout
          <span className='mt-2 block h-1 w-10 bg-teal-600 sm:w-20'></span>
        </h1>
        <form onSubmit={onSubmit} className='mt-10 flex flex-col space-y-4'>
          <PaymentElement id='payment-element' />
          <button
            type='submit'
            disabled={loading}
            className='disabled:bg-gray-500 mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg'
          >
            {loading ? (
              <span className='flex items-center'>
                <Icons.spinner className='w-5 h-5' /> Attempting Payment
              </span>
            ) : (
              <span>Place Order</span>
            )}
          </button>
        </form>
        <p className='mt-10 text-center text-sm font-semibold text-gray-500'>
          By placing this order you agree to the{' '}
          <a
            href='#'
            className='whitespace-nowrap text-teal-400 underline hover:text-teal-600'
          >
            Terms and Conditions
          </a>
        </p>
      </div>
    </div>
  );
}
