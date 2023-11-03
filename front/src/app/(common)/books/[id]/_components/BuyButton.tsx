'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useAppSelector, store, useAppDispatch } from '@/store';
import { getBooksBought } from '@/store/features/dashboard-slice';
import { initiatePayment } from '@/store/features/payment-slice';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const BuyButton = ({ bookId }: { bookId: string }) => {
  const router = useRouter();
  const { user } = useAppSelector((store) => store.authSlice);
  const dispatch = useAppDispatch();
  const { books_bought } = useAppSelector((store) => store.dashboardSlice);
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
      } else {
        toast.error(response.payload.message);
      }
    }
  };
  useEffect(() => {
    (async () => {
      if (user) await dispatch(getBooksBought(user?.access_token));
    })();
  }, [dispatch, user]);
  if (books_bought?.find((book) => book._id === bookId)) {
    return (
      <>
        <Button
          className='flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded'
          disabled={true}
        >
          {loading ? <Icons.spinner className='animate-spin' /> : null}
          You already own this book
        </Button>
      </>
    );
  }
  return (
    <>
      {!user?.access_token ? (
        <Link
          className='w-full h-full block w-max'
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
