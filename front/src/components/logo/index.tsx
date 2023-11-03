import Link from 'next/link';
import React from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href='/home' prefetch={false}>
      <div className='w-40 px-4 relative flex items-center'>
        <AspectRatio
          ratio={16 / 9}
          className='flex items-center justify-center'
        >
          <Image
            priority
            fill
            src='/logo.png'
            alt='Bookera Logo'
            className='dark:filter dark:invert object-contain'
          />
        </AspectRatio>
      </div>
    </Link>
  );
};

export default Logo;
