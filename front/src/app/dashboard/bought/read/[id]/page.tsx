import { PDFViewer } from '@/components/pdf_viewer';
import React from 'react';

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className='bg-white flex justify-center  w-full h-[90vh] dark:bg-gray-800'>
      <PDFViewer bookId={params.id} />
      {/* <BooksBoughtWrapper /> */}
    </div>
  );
};

export default page;
