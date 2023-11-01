'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import BookeraBackend from '@/lib/axiosInstance';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import zod from 'zod';
import { useForm } from 'react-hook-form';
import { formSchema } from '../_schema/registerFormSchema';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<string[]>([]);
  const router = useRouter();
  const registerForm = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const register = async (data: zod.infer<typeof formSchema>) => {
    //  event.preventDefault();
    setIsLoading(true);
    try {
      const response = await BookeraBackend.post('/user', data);
      toast.success('Successfully registered!!');
      router.push('/login');
      setErrors([]);

      console.log(response.data);
    } catch (error: any) {
      toast.error('Something went wrong, Please check the error messages');
      if (error.response.status === 409) {
        setErrors([error.response.data.message]);
        console.log(errors, error);
        return;
      }
      setErrors(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
    console.log(data);
  };
  async function onError(event: any) {}

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={registerForm.handleSubmit(register, onError)}>
        <div className='grid gap-2'>
          {/* form field */}
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='name'>
              Name
            </Label>
            <Input
              id='name'
              placeholder='John Doe'
              // type='email'
              autoComplete='name'
              autoCorrect='off'
              {...registerForm.register('name')}
              disabled={isLoading}
            />
            <small className='text-red-400 text-center block h-3'>
              {registerForm?.formState?.errors['name']?.message}
            </small>
          </div>
          {/* form field */}
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
              {...registerForm.register('email')}
              disabled={isLoading}
            />
            <small className='text-red-400 text-center block h-3'>
              {registerForm?.formState?.errors['email']?.message}
            </small>
          </div>
          {/* form field */}
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='password'>
              Password
            </Label>
            <Input
              id='password'
              placeholder='!Aa123456789'
              type='password'
              autoComplete='password'
              {...registerForm.register('password')}
              disabled={isLoading}
            />
            <small className='text-red-400 text-center block h-3'>
              {registerForm?.formState?.errors['password']?.message}
            </small>
          </div>
          {/* form field */}
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='address'>
              Address
            </Label>
            <Input
              id='address'
              placeholder='123 second roe, New York, United States'
              // type='email'
              autoComplete='address'
              {...registerForm.register('address')}
              disabled={isLoading}
            />
            <small className='text-red-400 text-center block h-3'>
              {registerForm?.formState?.errors['address']?.message}
            </small>
          </div>
          {/* form field */}
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='phone'>
              Phone Number
            </Label>
            <Input
              id='phone'
              placeholder='01123456789'
              // type='phone_number'
              autoCapitalize='none'
              autoComplete='phone'
              autoCorrect='off'
              {...registerForm.register('phone_number')}
              disabled={isLoading}
            />
            <small className='text-red-400 text-center block h-3'>
              {registerForm?.formState?.errors['phone_number']?.message}
            </small>
          </div>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='phone'>
              Role
            </Label>
            <Label htmlFor='phone'>Role</Label>
            <RadioGroup defaultValue='BUYER' className='flex gap-3'>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value='BUYER'
                  id='buyer'
                  {...registerForm.register('role')}
                />
                <Label htmlFor='buyer'>Buyer</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value='SELLER'
                  id='seller'
                  {...registerForm.register('role')}
                />
                <Label htmlFor='seller'>Seller</Label>
              </div>
            </RadioGroup>

            <small className='text-red-400 text-center block h-3'>
              {registerForm?.formState?.errors['role']?.message}
            </small>
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            Sign Up
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
      <Button
        variant='outline'
        className='w-full'
        type='button'
        disabled={isLoading}
      >
        <Link href='/login' className=''>
          Login
        </Link>
      </Button>
    </div>
  );
}
