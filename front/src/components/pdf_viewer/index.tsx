'use client';
import { useAppSelector } from '@/store';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

export function PDFViewer({ bookId }: { bookId: string }) {
  const { books_bought } = useAppSelector((store) => store.dashboardSlice);
  return (
    <div className='h-screen w-full'>
      <iframe
        src={books_bought?.find((book) => book._id === bookId)?.link}
        className='w-full h-full'
        width={200}
      ></iframe>
    </div>
  );
}
