'use client';
import SelectCategories from '@/components/selectCategory';
import SortBy from '@/components/sort';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export const FiltersAndSortingMobile = () => {
  return (
    <div className='mt-8  space-y-3 lg:hidden'>
      <div className='flex flex-wrap items-center gap-3'>
        <SelectCategories />
        <SortBy />
      </div>
      <PriceFilter />
    </div>
  );
};

export const FiltersAndSortingLarge = () => {
  return (
    <div className='hidden space-y-4 lg:block'>
      <SortBy />

      <div>
        <p className='block text-xs font-medium text-gray-700 dark:text-gray-100'>
          Filters
        </p>

        <div className='mt-1 space-y-2'>
          <SelectCategories />
          <PriceFilter />
        </div>
      </div>
    </div>
  );
};

export const PriceFilter = () => {
  const navigate = useRouter();
  const query = useSearchParams();
  const [price, setPrice] = useState({ min: 0, max: 0 });

  const filterByPrice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newParams = new URLSearchParams(query.toString());
    newParams.set('min', price.min.toString());
    if (price.max >= price.min) {
      newParams.set('max', price.max.toString());
    }
    navigate.push('/books?' + newParams.toString());
  };

  return (
    <details className='overflow-hidden rounded border border-gray-300 dark:border-gray-600 w-full max-w-md [&_summary::-webkit-details-marker]:hidden'>
      <summary className='flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition'>
        <span className='text-sm font-medium dark:text-gray-100'> Price </span>

        <span className='transition group-open:-rotate-180'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-4 w-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 8.25l-7.5 7.5-7.5-7.5'
            />
          </svg>
        </span>
      </summary>

      <div className='border-t border-gray-200  dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100'>
        <header className='flex items-center justify-between p-4'>
          <button
            type='button'
            className='text-sm text-gray-900 dark:text-gray-100 underline underline-offset-4'
          >
            Reset
          </button>
        </header>

        <form onSubmit={filterByPrice} className='border-t border-gray-200 p-4'>
          <div className='flex justify-between gap-4'>
            <label
              htmlFor='FilterPriceFrom'
              className='flex items-center gap-2'
            >
              <span className='text-sm text-gray-600 dark:text-gray-100'>
                $
              </span>

              <input
                type='number'
                id='FilterPriceFrom'
                placeholder='From'
                value={price.min}
                onChange={(e) =>
                  setPrice((prev) => ({ ...prev, min: Number(e.target.value) }))
                }
                className='w-full rounded-md border border-gray-200 shadow-sm sm:text-sm py-1 px-2'
              />
            </label>

            <label htmlFor='FilterPriceTo' className='flex items-center gap-2'>
              <span className='text-sm text-gray-600 dark:text-gray-100'>
                $
              </span>

              <input
                type='number'
                id='FilterPriceTo'
                placeholder='To'
                value={price.max}
                onChange={(e) =>
                  setPrice((prev) => ({ ...prev, max: Number(e.target.value) }))
                }
                className='w-full rounded-md border-gray-200 shadow-sm sm:text-sm py-1 px-2 border'
              />
            </label>
          </div>
          <Button className='my-2'>Filter</Button>
        </form>
      </div>
    </details>
  );
};
