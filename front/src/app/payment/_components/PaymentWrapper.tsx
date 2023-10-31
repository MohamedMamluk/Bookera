'use client';
import { Elements } from '@stripe/react-stripe-js';

import PaymentForm from './PaymentForm';
import getStripe from '@/utils/get-stripejs';
import { useAppSelector } from '@/store';
import PaymentDetails from './PaymentDetails';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = getStripe();
export default function PaymentWrapper() {
  const { payment } = useAppSelector((store) => store.paymentSlice);

  return (
    <div className=' space-y-4 md:flex w-full gap-4'>
      <PaymentDetails />
      {payment && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: payment.client_secret }}
        >
          <div className='w-full'>
            <PaymentForm clientSecret={payment.client_secret} />
          </div>
        </Elements>
      )}
    </div>
  );
}
