import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/footer/indexx';
import MainNav from '@/components/navbar';
import { Suspense } from 'react';
import Loading from '@/components/loading';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <AuthProvider>
        <Suspense fallback={<Loading className='h-screen' />}>
          <MainNav />
          {children}
          <Footer />
        </Suspense>
      </AuthProvider>
    </body>
  );
}
