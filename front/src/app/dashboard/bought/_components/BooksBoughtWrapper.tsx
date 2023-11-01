'use client';
import React, { useEffect } from 'react';
import BookCard from './BookCard';
import { store, useAppSelector } from '@/store';
import { getBooksBought } from '@/store/features/dashboard-slice';
import { Icons } from '@/components/icons';
import { Skeleton } from '@/components/ui/skeleton';

const BooksBoughtWrapper = () => {
  const { books_bought, loading } = useAppSelector(
    (store) => store.dashboardSlice
  );
  const { user } = useAppSelector((store) => store.authSlice);
  useEffect(() => {
    (async () => {
      if (user) await store.dispatch(getBooksBought(user.access_token));
    })();
  }, [user]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-3'>
      {loading ? <Skeleton className='w-full h-[500px]' /> : null}
      {books_bought?.length == 0 && 'Purchase books to read them from here'}
      {books_bought?.map((book) => {
        return book ? <BookCard book={book} key={book?._id} /> : null;
      })}
    </div>
  );
};

export default BooksBoughtWrapper;
