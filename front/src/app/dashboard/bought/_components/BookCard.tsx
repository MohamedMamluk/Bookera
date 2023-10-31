import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Book } from '@/store/features/dashboard-slice';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const BookCard = ({ book }: { book: Book }) => {
  return (
    <Link
      href={`/dashboard/bought/read/${book._id}`}
      className=' max-w-md mx-auto relative shadow-md rounded-lg cursor-pointer group'
    >
      <img
        src={book.cover}
        alt='Img by Meriç Dağlı https://unsplash.com/@meric'
        className='w-full h-auto object-cover rounded-lg'
      />
      <div className='absolute bottom-0 left-0 right-0 h-48  py-4 bg-gray-700 bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg space-y-5'>
        <Badge className='absolute -translate-y-10 right-1/2 translate-x-1/2  p-3 text-lg group-hover:bg-red-600 group-hover:text-white'>
          Read
        </Badge>
        <h1
          className='text-xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis'
          title={book.title}
        >
          {book.title.replaceAll('_', ' ').substring(0, 50)}
        </h1>
        <div>
          <Badge variant='secondary'>{book.category}</Badge>
        </div>
        <p
          className='mt-2 whitespace-nowrap overflow-hidden text-ellipsis'
          title={book.description}
        >
          {book.description.replaceAll('_', ' ')}
        </p>
      </div>
    </Link>
  );
};

export default BookCard;
