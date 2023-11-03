'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function LoadingComponent({
  className,
}: {
  className?: string;
}) {
  const [timer, setTimer] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setTimer(
        'We are experiencing heavy traffic at the moment, \n Sorry about the wait'
      );
    }, 2500);
  }, []);
  return (
    <div
      className={cn(
        'min-h-[50vh] w-full flex flex-col items-center justify-center p-4 text-center bg-white  dark:bg-gray-800 gap-3',
        className
      )}
    >
      <div className='w-28 h-28 rounded-lg overflow-hidden bg-white dark:bg-gray-800 animate-pulse  relative'>
        <Image
          src='/loading.png'
          fill
          className='w-full h-full dark:invert dark:filter'
          alt='Loading...'
        />
      </div>
      <p>{timer}</p>
    </div>
  );
}
