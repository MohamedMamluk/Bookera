import React from 'react';
import CreateBook from './_components/create_book_form';

const CreateBookPage = () => {
  return (
    <div className='mt-10 space-y-4'>
      <h1 className='font-bold text-xl'>Create book</h1>
      <CreateBook />
    </div>
  );
};

export default CreateBookPage;
