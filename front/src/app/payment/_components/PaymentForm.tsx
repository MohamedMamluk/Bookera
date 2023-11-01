'use client';

import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import BookeraBackend from '@/lib/axiosInstance';
import axios from 'axios';
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

export default function PaymentForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(stripe, elements);
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
    }
  };

  return (
    <form onSubmit={onSubmit} className=''>
      <PaymentElement id='payment-element' />

      <Button type='submit'>Submit</Button>
    </form>
  );
}
