'use client';
import { useAppSelector } from '@/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export function PDFViewer({ bookId }: { bookId: string }) {
  const { books_bought } = useAppSelector((store) => store.dashboardSlice);
  const router = useRouter();
  const book = useMemo(() => {
    return books_bought?.find((book) => book._id === bookId);
  }, [bookId, books_bought]);

  if (!books_bought) {
    return <Link href='/dashboard/bought'>Return to books bought</Link>;
  }

  return (
    <div className='h-screen w-full p-5 space-y-4'>
      <div className='space-y-2'>
        <h1>{book?.title}</h1>
        <h2>By: {book?.author}</h2>
      </div>
      <iframe src={book?.link} className='w-full h-full'></iframe>
    </div>
  );
}
