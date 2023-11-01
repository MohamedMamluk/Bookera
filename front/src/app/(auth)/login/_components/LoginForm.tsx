'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import zod from 'zod';

import { useForm } from 'react-hook-form';

import { loginFormSchema } from '../_schema/login_form.schema';

import { zodResolver } from '@hookform/resolvers/zod';

import { store, useAppSelector } from '@/store';
import { loginUser } from '@/store/features/auth-slice';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [errors, setErrors] = React.useState<string[]>([]);
  const searchParams = useSearchParams();

  const router = useRouter();
  const { loading } = useAppSelector((store) => store.authSlice);
  const loginForm = useForm<zod.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const login = async (data: zod.infer<typeof loginFormSchema>) => {
    const { meta } = await store.dispatch(loginUser(data));
    if (meta.requestStatus == 'fulfilled') {
      toast.success('Logged in!!');
      router.push(searchParams.get('redirect_to') || '/home');
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={loginForm.handleSubmit(login)}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              placeholder='name@example.com'
              // type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              {...loginForm.register('email')}
              disabled={loading}
            />
            <small className='text-red-400 text-center block h-3'>
              {loginForm?.formState?.errors['email']?.message}
            </small>
          </div>

          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='password'>
              Password
            </Label>
            <Input
              id='password'
              placeholder='!Aa123456789'
              type='password'
              autoComplete='password'
              {...loginForm.register('password')}
              disabled={loading}
            />
            <small className='text-red-400 text-center block h-3'>
              {loginForm?.formState?.errors['password']?.message}
            </small>
          </div>
          <Button disabled={loading}>
            {loading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
            Sign In
          </Button>
        </div>
      </form>
      {errors.length
        ? errors.map((error, index) => (
            <small className='text-red-400 text-center block h-3' key={index}>
              {error}
            </small>
          ))
        : null}

      <Link href='/register' className=''>
        <Button
          variant='outline'
          className='w-full'
          type='button'
          disabled={loading}
        >
          Register
        </Button>
      </Link>
    </div>
  );
}
