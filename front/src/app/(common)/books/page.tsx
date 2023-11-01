import SelectCategories from '@/components/selectCategory';
import SortBy from '@/components/sort';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import { SidebarNav } from './_components/sidebar-nav';
import BooksHeader from './_components/header';
import { FiltersAndSortingMobile } from './_components/filter-sorting';
import BooksLayout from './_components/booksLayout';
import { store } from '@/store';
import { getAllBooks, setBooks } from '@/store/features/book-slice';
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
export const revalidate = 10;
const getBooks = async (searchParams: Record<'search' | 'sortBy', string>) => {
  const encodedValues = Object.entries(searchParams).map(
    ([key, value]) => `${key}=${encodeURIComponent(value)}`
  );

  console.log('encoded values', encodedValues);
  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_LINK! + `/book?${encodedValues.join('&')}`,
    { cache: 'no-cache' }
  );
  const json = await response.json();
  return json;
};
const page = async ({
  searchParams,
}: {
  searchParams: Record<'search' | 'sortBy', string>;
}) => {
  console.log('search params from /books', searchParams);
  const books = await getBooks(searchParams);
  return (
    <section className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 space-y-3'>
        <Suspense fallback={<h1>Loading....</h1>}>
          <BreadCrumbs />
          <BooksHeader />
          <FiltersAndSortingMobile />
          <BooksLayout books={books} />
        </Suspense>
      </div>
    </section>
  );
};

export default page;
