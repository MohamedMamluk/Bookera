'use client';
import React from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { LucideHome } from 'lucide-react';
import Link from 'next/link';
const BreadCrumbs = () => {
  const params = usePathname();
  const segments = params.split('/').slice(1, -1);
  return (
    <nav aria-label='Breadcrumb'>
      <ol className='flex items-center gap-1 text-sm text-gray-600 dark:text-gray-100 flex-wrap'>
        <li>
          <Link href='/' className='block transition hover:text-gray-700'>
            <span className='sr-only'> Home </span>
            <LucideHome />
          </Link>
        </li>
        {segments.map((segment, index) => {
          return (
            <div key={index} className='flex items-center'>
              <li className='rtl:rotate-180'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </li>

              <li>
                <Link
                  href={`/${segments.slice(0, index + 1).join('/')}`}
                  className='block transition hover:text-gray-700 dark:hover:text-gray-500 capitalize'
                >
                  {segment}
                </Link>
              </li>
            </div>
          );
        })}
        <li className='rtl:rotate-180'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
