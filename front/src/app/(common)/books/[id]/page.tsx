import BreadCrumbs from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Book } from '@/store/features/book-slice';
import React from 'react';
import BuyButton from './_components/BuyButton';

const getBookDetails = async (bookId: string): Promise<Book> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_LINK! + `/book/${bookId}`
  );
  // const json = await response.json();
  return response.json();
};
const page = async ({ params }: { params: { id: string } }) => {
  console.log(params);
  const book = await getBookDetails(params.id);
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return (
    <div className=''>
      <section className='text-gray-700 body-font overflow-hidden bg-white'>
        <div className='container px-5 py-24 mx-auto space-y-10'>
          <div className='flex items-center'>
            <BreadCrumbs />
            <span className='text-ellipsis w-[12ch] sm:w-[40ch] md:w-max overflow-hidden whitespace-nowrap'>
              {book.title}
            </span>
          </div>
          <div className='lg:w-4/5 mx-auto flex flex-wrap justify-center lg:justify-evenly'>
            <div className='w-full max-w-sm'>
              <img
                alt={book.title}
                className='w-full object-cover object-center rounded border border-gray-200'
                src={book.cover}
              />
            </div>
            <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
              <h2 className='text-sm title-font text-gray-500 tracking-widest'>
                {book.category}
              </h2>
              <h2 className='text-sm title-font text-gray-500 tracking-widest'>
                {book.author}
              </h2>
              <h1 className='text-gray-900 text-3xl title-font font-medium mb-1'>
                {book.title}
              </h1>
              <div className='flex mb-4 flex-wrap items-center'>
                <span className='flex items-center'>
                  <svg
                    fill='currentColor'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    className='w-4 h-4 text-red-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <svg
                    fill='currentColor'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    className='w-4 h-4 text-red-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <svg
                    fill='currentColor'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    className='w-4 h-4 text-red-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <svg
                    fill='currentColor'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    className='w-4 h-4 text-red-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    className='w-4 h-4 text-red-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <span className='text-gray-600 ml-3'>4 Reviews</span>
                </span>
                <span className='flex ml-3 pl-3 py-2 border-l-2 border-gray-200'>
                  <a className='text-gray-500'>
                    <svg
                      fill='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      className='w-5 h-5'
                      viewBox='0 0 24 24'
                    >
                      <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
                    </svg>
                  </a>
                  <a className='ml-2 text-gray-500'>
                    <svg
                      fill='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      className='w-5 h-5'
                      viewBox='0 0 24 24'
                    >
                      <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
                    </svg>
                  </a>
                  <a className='ml-2 text-gray-500'>
                    <svg
                      fill='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      className='w-5 h-5'
                      viewBox='0 0 24 24'
                    >
                      <path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'></path>
                    </svg>
                  </a>
                </span>
                <span className='ml-3 pl-3 py-2 border-l-2 border-gray-200'>
                  stock:{book.stock}
                </span>
              </div>
              <p className='leading-relaxed'>{book.description}</p>

              <div className='flex mt-4'>
                <span className='title-font font-medium text-2xl text-gray-900'>
                  {USDollar.format(book.price)}
                </span>
                <BuyButton bookId={book._id} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
