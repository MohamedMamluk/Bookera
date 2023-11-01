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
    <article className='hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] md:max-w-[50%]'>
      <div className='rounded-[10px] bg-white p-4 !pt-20 sm:p-6 '>
        <div className='w-full  aspect-square'>
          <img src={book.cover} className='w-full h-full object-contain' />
        </div>
        <h3 className='mt-0.5 text-lg font-medium text-gray-900  '>
          {book.title.replaceAll('_', ' ')}
        </h3>
        <h4 className='mt-0.5 text-base font-medium text-gray-900 '>
          {USDCurrencyFormatter.format(+book.price)}
        </h4>

        <div className='mt-4 flex flex-wrap gap-1'>
          <Badge>{book.category}</Badge>
        </div>
      </div>
    </article>
  );
};

export default PaymentDetails;
