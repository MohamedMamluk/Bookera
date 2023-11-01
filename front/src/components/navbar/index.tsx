'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import SearchForm from '../search';
import Image from 'next/image';
import { useAppSelector } from '@/store';
import UserNav from '../dashboard/components/user-nav';

const MainNav = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector((state) => state.authSlice);

  return (
    <header className={`flex items-center w-full bg-transparent py-4 lg:py-0`}>
      <div className='container'>
        <div className='relative flex items-center justify-between -mx-4'>
          <div className='px-4 w-72 relative'>
            <Link href='/home' className='block w-full py-5'>
              <Image
                fill
                src='/logo.png'
                alt='logo'
                className='w-full object-contain '
              />
            </Link>
          </div>
          <div className='hidden w-full max-w-[300px] md:block'>
            <SearchForm />
          </div>
          <div className='flex items-center justify-between w-full px-4'>
            <div>
              <button
                onClick={() => setOpen(!open)}
                type='button'
                title='menu'
                id='navbarToggler'
                className={` ${
                  open && 'navbarTogglerActive'
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden z-10`}
              >
                <span className='relative my-[6px] block h-[2px] w-[30px] bg-black'></span>
                <span className='relative my-[6px] block h-[2px] w-[30px] bg-black'></span>
                <span className='relative my-[6px] block h-[2px] w-[30px] bg-black'></span>
              </button>

              <nav
                id='navbarCollapse'
                className={`absolute right-4 top-full w-full max-w-[300px] rounded-lg bg-white lg:bg-transparent py-5 px-6 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none z-10 ${
                  !open && 'hidden'
                } `}
              >
                <ul className='block lg:flex'>
                  <ListItem
                    navItemStyles='text-dark hover:text-primary'
                    NavLink='/home'
                  >
                    Home
                  </ListItem>
                  <ListItem
                    navItemStyles='text-dark hover:text-primary'
                    NavLink='/books'
                  >
                    Books
                  </ListItem>
                  <ListItem
                    navItemStyles='text-dark hover:text-primary'
                    NavLink='/#'
                  >
                    About
                  </ListItem>
                </ul>
                <div className='md:hidden'>
                  <SearchForm />
                </div>
                <div className='flex w-full items-center justify-center flex-wrap lg:hidden'>
                  {user ? (
                    <UserNav />
                  ) : (
                    <>
                      <Link
                        href='/login'
                        className='py-3 text-base  font-medium px-7 text-dark hover:text-primary'
                      >
                        Sign in
                      </Link>

                      <Link
                        href='/register'
                        className='py-3 text-base font-medium text-white rounded-lg bg-primary px-7 hover:bg-opacity-90'
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
            <div className='hidden lg:block'>
              {user ? (
                <UserNav />
              ) : (
                <div className='justify-end  pr-16 md:flex lg:pr-0'>
                  <Link
                    href='/login'
                    className='py-3 text-base font-medium px-7 text-dark hover:text-primary'
                  >
                    Sign in
                  </Link>

                  <Link
                    href='/register'
                    className='py-3 text-base font-medium text-white rounded-lg bg-primary px-7 hover:bg-opacity-90'
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNav;

const ListItem = ({
  children,
  navItemStyles,
  NavLink,
}: {
  children: React.ReactNode;
  navItemStyles: string;
  NavLink: string;
}) => {
  return (
    <>
      <li>
        <Link
          href={NavLink}
          className={`flex py-2 text-base font-medium lg:ml-12 lg:inline-flex ${navItemStyles}`}
        >
          {children}
        </Link>
      </li>
    </>
  );
};
