import { PDFViewer } from '@/components/pdf_viewer';
import React from 'react';
import BooksBoughtWrapper from './_components/BooksBoughtWrapper';

const BoughtBooks = () => {
  return (
    <div className='bg-white flex justify-center items-center'>
      {/* <PDFViewer /> */}
      <BooksBoughtWrapper />
    </div>
  );
};

export default BoughtBooks;
