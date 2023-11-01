import RequireAuthProvider from '@/components/RequireAuthProvider';
import { MainNav } from '@/components/dashboard/components/main-nav';
import UserNav from '@/components/dashboard/components/user-nav';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuthProvider>
      <main className=' max-w-7xl mx-auto '>
        <div className='flex items-center border-b relative'>
          <div className='flex h-auto items-center px-4 flex-wrap'>
            <div className='relative w-32 aspect-video'>
              <Image
                src='/logo.png'
                className='w-full object-contain'
                fill={true}
                alt='bookera logo'
              />
            </div>
            <MainNav className='mx-6' />
          </div>
          <div className='ml-auto flex items-center space-x-4 mr-12'>
            <UserNav />
          </div>
        </div>
        {children}
      </main>
    </RequireAuthProvider>
  );
}
