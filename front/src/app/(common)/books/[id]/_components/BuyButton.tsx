'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useAppSelector, store } from '@/store';
import { initiatePayment } from '@/store/features/payment-slice';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import React from 'react';

const BuyButton = ({ bookId }: { bookId: string }) => {
  const router = useRouter();
  const { user } = useAppSelector((store) => store.authSlice);
  const { loading } = useAppSelector((store) => store.paymentSlice);
  const pathname = usePathname();
  const initiate = async () => {
    if (user?.access_token) {
      const response = await store.dispatch(
        initiatePayment({
          userToken: user.access_token,
          bookId,
        })
      );
      if (response.meta.requestStatus == 'fulfilled') {
        router.push('/payment/' + response.payload.paymentId);
      }
    }
  };

  return (
    <>
      {!user?.access_token ? (
        <Link
          className='w-full h-full block'
          href={'/login?redirect_to=' + pathname}
        >
          <Button className='flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded'>
            Login to buy
          </Button>
        </Link>
      ) : (
        <Button
          className='flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded'
          disabled={loading}
          onClick={async () => {
            await initiate();
          }}
        >
          {loading ? <Icons.spinner className='animate-spin' /> : null}
          Buy
        </Button>
      )}
    </>
  );
};

export default BuyButton;