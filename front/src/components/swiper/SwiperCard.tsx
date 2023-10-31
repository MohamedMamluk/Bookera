'use client';
import Image from 'next/image';
import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { Button } from '../ui/button';

const SwiperCard = () => {
  return (
    <>
      <div className='max-w-sm min-w-[200px] aspect-[16/12] relative'>
        <Image
          src='/rdpd.jpg'
          fill={true}
          className='object-contain'
          alt='rich dad poor dad'
        />
      </div>
      <div className='flex flex-col gap-2 text-center md:text-left'>
        <h2 className='text-xl font-bold'>Rich Dad Poor Dad</h2>
        <p className='text-gray-600'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
          minus!
        </p>
        <span className='block text-bold font-semibold'>$270</span>
        <Button className='block w-full rounded bg-[#f59d27] px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto'>
          Buy Now{' '}
        </Button>
      </div>
    </>
  );
};

export default SwiperCard;
