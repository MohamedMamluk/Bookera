'use client';
import React, { useEffect } from 'react';
import BookCard from './BookCard';
import { store, useAppSelector } from '@/store';
import { getBooksBought } from '@/store/features/dashboard-slice';
import { Icons } from '@/components/icons';

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
  if (loading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Icons.spinner className='w-40' />
      </div>
    );
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-3'>
      {books_bought?.map((book) => (
        <BookCard book={book} key={book._id} />
      ))}
    </div>
  );
};

export default BooksBoughtWrapper;
