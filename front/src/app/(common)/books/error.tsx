'use client';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='min-h-[50vh] w-full flex flex-col items-center justify-center p-4 text-center'>
      <h2 className='text-2xl'>{error.message}</h2>
      <Button onClick={() => reset()} className='flex items-center'>
        <Loader />
        Try again
      </Button>
    </div>
  );
}
