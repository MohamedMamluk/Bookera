import React from 'react';
import { FiltersAndSortingLarge } from './filter-sorting';
import BooksContainer from './booksContainer';

const BooksLayout = ({ books }: { books: any[] }) => {
  return (
    <div className='mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8'>
      <FiltersAndSortingLarge />
      {books.length ? (
        <BooksContainer books={books} />
      ) : (
        <div className='text-center lg:col-span-3'>
          <h1>We could not find books with those filters </h1>
        </div>
      )}
    </div>
  );
};

export default BooksLayout;
