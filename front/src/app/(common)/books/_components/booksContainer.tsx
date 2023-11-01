import React from 'react';
import Book from './book';

const BooksContainer = ({ books }: { books: any[] }) => {
  return (
    <div className='lg:col-span-3'>
      <ul className='grid gap-4 sm:grid-cols-2  md:grid-cols-3'>
        {books.map((book, index) => (
          <Book key={index} data={book} />
        ))}
      </ul>
    </div>
  );
};

export default BooksContainer;
