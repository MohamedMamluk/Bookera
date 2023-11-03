import React from 'react';

const BooksHeader = () => {
  return (
    <header>
      <h2 className='text-xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100'>
        Books
      </h2>

      <p className='mt-4 max-w-md text-gray-500 dark:text-gray-300'>
        Browse our collection of books, from classic novels to modern
        bestsellers. We have something for everyone!
      </p>
    </header>
  );
};

export default BooksHeader;
