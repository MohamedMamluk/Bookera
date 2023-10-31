'use client';
import { DataTable } from '@/components/dashboard/components/data-table';
import Link from 'next/link';
import BookeraBackend from '@/lib/axiosInstance';
import { columns } from '@/components/dashboard/components/columns';

import React from 'react';
import { useAppSelector } from '@/store';

const BooksPage = () => {
  const { user } = useAppSelector((store) => store.authSlice);
  const [books, setBooks] = React.useState<any[]>([]);
  React.useEffect(() => {
    (async () => {
      if (user?.access_token) {
        const res = await BookeraBackend.get('/dashboard/books', {
          headers: { Authorization: `Bearer ${user?.access_token}` },
        });
        const data = res.data;
        setBooks(data);
      }
    })();
  }, [user?.access_token]);
  // const books = await (await fetch('http://localhost:3001/book')).json();
  return (
    <div>
      <DataTable data={books} columns={columns} />
    </div>
  );
};

export default BooksPage;
