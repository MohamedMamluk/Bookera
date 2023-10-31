'use client';
import React, { useEffect, useMemo } from 'react';
import Image from 'next/image';
import BookeraBackend from '@/lib/axiosInstance';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Overview } from '@/components/dashboard/components/overview';
import { RecentSales } from '@/components/dashboard/components/recent-sales';
import { useAppSelector } from '@/store';

const Stats = () => {
  const { user } = useAppSelector((store) => store.authSlice);

  const [stats, setStats] = React.useState<any[]>([]);
  const balance = useMemo(() => {
    const USDCurrencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    const totalBalance = stats.reduce(
      (prev, current) => (prev += current.totalPrice),
      0
    );
    return USDCurrencyFormatter.format(totalBalance);
  }, [stats]);
  const salesPerMonth = useMemo(() => {
    const totalBalance = stats.reduce(
      (prev, current) => (prev += current.totalPrice),
      0
    );
    return totalBalance;
  }, [stats]);
  const booksSold = useMemo(() => {
    const count = stats.reduce(
      (prev, current) => (prev += current.booksSold),
      0
    );
    return count;
  }, [stats]);
  const bestSeller = useMemo(() => {
    return stats[0] || null;
  }, [stats]);
  useEffect(() => {
    (async () => {
      if (user?.access_token) {
        const { data } = await BookeraBackend.get('/books-sold/stats', {
          headers: { Authorization: 'Bearer ' + user?.access_token },
        });
        console.log(data);
        setStats(data);
      }
    })();
  }, [user?.access_token]);
  return (
    <Tabs defaultValue='overview' className='space-y-4'>
      <TabsList className='flex flex-wrap items-start justify-start'>
        <TabsTrigger value='overview'>Overview</TabsTrigger>
      </TabsList>
      <TabsContent value='overview' className='space-y-4'>
        <div className='md:grid w-full gap-4  md:grid-cols-2 lg:grid-cols-3'>
          {/* Balance */}
          <Card className=''>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Balance</CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='h-4 w-4 text-muted-foreground'
              >
                <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold transition ease-in'>
                {!stats.length ? 'Calculating...' : balance}
              </div>
              <p className='text-xs text-muted-foreground'></p>
            </CardContent>
          </Card>

          {/* Total */}
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Sales</CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='h-4 w-4 text-muted-foreground'
              >
                <rect width='20' height='14' x='2' y='5' rx='2' />
                <path d='M2 10h20' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{booksSold}</div>
            </CardContent>
          </Card>
          {/* best seller */}
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Best Seller</CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='h-4 w-4 text-muted-foreground'
              >
                <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {bestSeller ? bestSeller.book.title : ''}
              </div>
              <p className='text-xs text-muted-foreground'>
                sold {bestSeller ? bestSeller.booksSold : 0} so far
              </p>
            </CardContent>
          </Card>
        </div>
        {/* graph */}
        <div className='md:grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <Card className='md:col-span-4'>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className='pl-2'>
              <Overview />
            </CardContent>
          </Card>
          <Card className='col-span-3'>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You made {booksSold} sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Stats;
