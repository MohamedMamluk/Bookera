'use client';
import { store, useAppSelector } from '@/store';
import { updatePayment } from '@/store/features/payment-slice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Congratulations = ({
  paymentId,
  status,
}: {
  paymentId: string;
  status: string;
}) => {
  const { user } = useAppSelector((store) => store.authSlice);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (user?.access_token) {
        const res = await store.dispatch(
          updatePayment({
            userToken: user.access_token,
            paymentId,
            status,
          })
        );
        setTimeout(router.push, 3000, '/dashboard');
        // router.push('/dashboard');
      }
    })();
  }, [user, router, paymentId, status]);

  return (
    <div className=' p-6  md:mx-auto'>
      <div className='max-w-xs aspect-video mx-auto relative'>
        <Link href='/home'>
          <Image
            src='/logo.png'
            alt='Bookera Logo'
            fill
            className='w-full h-full object-contain'
          />
        </Link>
      </div>

      <div className=' w-24 h-24 mx-auto relative'>
        <Image
          src='/completed.gif'
          alt='completed'
          fill
          className='w-full h-full object-contain'
        />
      </div>
      <div className='text-center'>
        <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
          Payment Done!
        </h3>
        <p className='text-gray-600 my-2'>
          Thank you for completing your secure online payment.
        </p>
        <p> We will redirect you shortly </p>
      </div>
    </div>
  );
};

export default Congratulations;
