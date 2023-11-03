'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import SearchForm from '../search';
import Image from 'next/image';
import { useAppSelector } from '@/store';
import UserNav from '../dashboard/components/user-nav';
import Logo from '../logo';
import { ThemeSwitcher } from '../theme-switch';

const MainNav = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector((state) => state.authSlice);

  return (
    <header
      className={`flex items-center w-full bg-transparent py-4 lg:py-0 dark:bg-gray-900 dark:border-b dark:border-gray-600`}
    >
      <div className='container'>
        <div className='relative flex items-center justify-between -mx-4'>
          <Logo />
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
                } absolute right-10 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden z-10`}
              >
                <span className='relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-slate-50'></span>
                <span className='relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-slate-50'></span>
                <span className='relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-slate-50'></span>
              </button>

              <nav
                id='navbarCollapse'
                className={`absolute right-4 top-full w-full max-w-[300px] dark:bg-gray-800 rounded-lg bg-white lg:dark:bg-gray-900 lg:bg-transparent py-5 px-6 shadow dark:shadow-gray-600 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none z-10 ${
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
                <div className='flex w-full items-center justify-center gap-2 flex-wrap lg:hidden'>
                  {user ? (
                    <UserNav />
                  ) : (
                    <>
                      <Link
                        href='/login'
                        className='py-3 text-base  font-medium px-7 text-dark hover:text-primary dark:border dark:border-gray-100 rounded-lg'
                      >
                        Sign in
                      </Link>

                      <Link
                        href='/register'
                        className='py-3 text-base font-medium text-white rounded-lg bg-primary px-7 hover:bg-opacity-90 dark:text-gray-800 '
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
                <div className='justify-end gap-2  pr-16 md:flex lg:pr-0'>
                  <Link
                    href='/login'
                    className='py-3 text-base font-medium px-7 text-dark hover:text-primary dark:border dark border-gray-100 rounded-md'
                  >
                    Sign in
                  </Link>

                  <Link
                    href='/register'
                    className='py-3 text-base font-medium text-white dark:text-gray-800 rounded-lg bg-primary px-7 hover:bg-opacity-90'
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
          <ThemeSwitcher />
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
