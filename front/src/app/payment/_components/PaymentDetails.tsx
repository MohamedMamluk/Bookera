'use client';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store';
import BookeraBackend from '@/lib/axiosInstance';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
type Book = {
  author: string;
  category: string;
  cover: string;
  description: string;
  price: string;
  title: string;
};
const USDCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const PaymentDetails = () => {
  const { payment } = useAppSelector((store) => store.paymentSlice);
  const [book, setBook] = useState<Book>();
  useEffect(() => {
    (async () => {
      if (payment?.book) {
        const { data } = await BookeraBackend.get('/book/' + payment.book);
        setBook(data);
      }
    })();
  }, [payment?.book]);
  if (!book) {
    return <Icons.spinner />;
  }
  return (
    <div className='relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24'>
      <h2 className='sr-only'>Order summary</h2>
      <div>
        <img
          src='https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
          alt=''
          className='absolute inset-0 h-full w-full object-cover'
        />
        <div className='absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95'></div>
      </div>
      <div className='relative'>
        <ul className='space-y-5'>
          <li className='flex justify-between'>
            <div className='inline-flex'>
              <img src={book.cover} alt='' className='max-h-16' />
              <div className='ml-3'>
                <p className='text-base font-semibold text-white'>
                  {book.title}
                </p>
                <p className='text-sm font-medium text-white text-opacity-80'>
                  {book.author}
                </p>
              </div>
            </div>
            <p className='text-sm font-semibold text-white'>
              {USDCurrencyFormatter.format(+book.price)}
            </p>
          </li>
        </ul>
        <div className='my-5 h-0.5 w-full bg-white bg-opacity-30'></div>
        <div className='space-y-2'>
          <p className='flex justify-between text-lg font-bold text-white'>
            <span>Total price:</span>
            <span> {USDCurrencyFormatter.format(+book.price)}</span>
          </p>
          {/* <p className='flex justify-between text-sm font-medium text-white'>
            <span>Vat: 10%</span>
            <span>$55.00</span>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
