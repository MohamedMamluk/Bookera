'use client';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BookeraBackend from '@/lib/axiosInstance';
import { useAppSelector } from '@/store';
import Link from 'next/link';
import React, { useEffect } from 'react';

export function RecentSales() {
  const { user } = useAppSelector((store) => store.authSlice);
  const [sales, setSales] = React.useState<any[]>([]);
  useEffect(() => {
    (async () => {
      if (user?.access_token) {
        const { data } = await BookeraBackend.get('/books-sold?limit=4', {
          headers: { Authorization: 'Bearer ' + user?.access_token },
        });
        console.log(data);
        setSales(data);
      }
    })();
  }, [user?.access_token]);
  if (!sales.length) {
    return <Icons.spinner />;
  }

  return (
    <div className='space-y-8 max-w-full '>
      {sales.map((book, index) => {
        return (
          <div key={index} className='flex items-center flex-wrap'>
            <Avatar className='h-9 w-9'>
              <AvatarImage src={book.bookId.cover} alt='Avatar' />
            </Avatar>
            <div className='ml-4 space-y-1 max-w-[30ch]'>
              <p className='text-sm  text-muted-foreground overflow-hidden text-ellipsis'>
                {book.bookId.title}
              </p>
            </div>
            <div className='ml-auto font-medium'>+${book.bookId.price}</div>
          </div>
        );
      })}
      <div>
        <Link href='/dashboard/transactions'>View All Sales</Link>
      </div>
    </div>
  );
}
