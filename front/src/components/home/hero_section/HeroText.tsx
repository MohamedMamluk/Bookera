import Link from 'next/link';
import React from 'react';

const HeroText = () => {
  return (
    <section className='relative bg-[url(/books.webp)] bg-cover bg-center bg-no-repeat w-full '>
      <div className='absolute inset-0 bg-[#fdf9ed]/75 sm:from-[#fdf9ed]/25 sm:to-[#ecedf2]/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l dark:invert dark:filter'></div>

      <div className='relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[calc(100vh-200px)] lg:items-center lg:px-8'>
        <div className='max-w-xl text-center sm:text-left rtl:sm:text-right'>
          <h1 className='text-3xl font-semibold sm:text-5xl'>
            Welcome to{' '}
            <span className='text-rose-700 font-extrabold'>Bookera</span>.
            Online Book Store
          </h1>

          <p className='mt-4 max-w-lg sm:text-xl/relaxed'>
            The largest selection of books online, with the best prices
          </p>

          <div className='mt-8 flex flex-wrap gap-4 text-center'>
            <Link
              href='/books'
              className='block w-full rounded bg-[#f59d27] px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto'
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroText;
