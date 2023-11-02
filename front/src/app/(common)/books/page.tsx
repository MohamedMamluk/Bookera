import React, { Suspense } from 'react';
import BooksHeader from './_components/header';
import { FiltersAndSortingMobile } from './_components/filter-sorting';
import BooksLayout from './_components/booksLayout';
import BreadCrumbs from '@/components/breadcrumbs';

type Book = {
  _id: string;
  title: string;
  description: string;
  author: string;
  price: number;
  stock: number;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
};
const getBooks = async (searchParams: Record<'search' | 'sortBy', string>) => {
  const encodedValues = Object.entries(searchParams).map(
    ([key, value]) => `${key}=${encodeURIComponent(value)}`
  );

  console.log('encoded values', encodedValues);
  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_LINK! + `/book?${encodedValues.join('&')}`,
    { cache: 'no-cache' }
  );
  if (!response.ok) {
    throw new Error(
      'Failed to fetch data from the server, try again in a few seconds'
    );
  }
  const json = await response.json();
  return json;
};
const page = async ({
  searchParams,
}: {
  searchParams: Record<'search' | 'sortBy', string>;
}) => {
  console.log(process.env.NEXT_PUBLIC_SERVER_LINK);
  console.log('search params from /books', searchParams);
  const books = await getBooks(searchParams);
  return (
    <section className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 space-y-3'>
        <BreadCrumbs />
        <BooksHeader />
        <FiltersAndSortingMobile />

        <BooksLayout books={books} />
      </div>
    </section>
  );
};

export default page;
