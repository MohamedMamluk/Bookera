import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { UserAuthForm } from './_components/LoginForm';
import Logo from '@/components/logo';

export default function AuthenticationPage() {
  return (
    <>
      <div className='container relative dark:bg-gray-800  h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex justify-center'>
              <Logo />
            </div>

            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email and password below.
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900/80'>
            <Image
              src='/loglib.jpg'
              fill={true}
              objectFit='cover'
              alt='registeration image'
              className='mix-blend-overlay'
            />
          </div>
          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className='text-sm'>Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
}
