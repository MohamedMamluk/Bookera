import RequireAuthProvider from '@/components/RequireAuthProvider';
import { MainNav } from '@/components/dashboard/components/main-nav';
import UserNav from '@/components/dashboard/components/user-nav';
import Logo from '@/components/logo';
import { ThemeSwitcher } from '@/components/theme-switch';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuthProvider>
      <main className='   dark:bg-gray-800 min-h-screen'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center border-b relative border-gray-600'>
            <div className='flex h-auto items-center px-4 flex-wrap'>
              <Logo />
              <MainNav className='mx-6' />
            </div>
            <div className='ml-auto flex items-center space-x-4 mr-12'>
              <UserNav />
            </div>
            <ThemeSwitcher />
          </div>
          {children}
        </div>
      </main>
    </RequireAuthProvider>
  );
}
