import { Book } from '@/store/features/book-slice';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Book = ({ data }: { data: Book }) => {
  return (
    <li className='relative  border dark:border-gray-600 border-gray-300'>
      <Link
        href={`/books/${data._id}`}
        className='group block overflow-hidden '
      >
        <div className='h-[450px] w-full  sm:h-[450px] dark:bg-gray-200'>
          <img
            src={data.cover}
            alt={data.title}
            className='w-full h-full object-cover transition duration-500 group-hover:scale-105'
          />
        </div>

        <div className='relative dark:bg-gray-800 h-full py-3 pl-2'>
          <h3 className='text-xs text-gray-700 dark:text-gray-100 group-hover:underline group-hover:underline-offset-4'>
            {data.title}
          </h3>

          <p className='mt-2'>
            <span className='sr-only'> Regular Price </span>

            <span className='tracking-wider text-gray-900 dark:text-gray-300'>
              {' '}
              £{data.price}.00 GBP{' '}
            </span>
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Book;
