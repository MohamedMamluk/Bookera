import React from 'react';
import EditBookForm from './_components/edit_book_form';

const EditBookPage = async ({ params }: { params: { id: string } }) => {
  const book = await (
    await fetch('http://localhost:3001/book/' + params.id)
  ).json();
  return (
    <div className='mt-10 space-y-4'>
      <h1 className='font-bold text-xl'>Edit book</h1>
      <EditBookForm bookDetails={book} />
    </div>
  );
};

export default EditBookPage;
