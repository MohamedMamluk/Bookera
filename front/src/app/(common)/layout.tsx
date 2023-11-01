import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/footer/indexx';
import MainNav from '@/components/navbar';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <AuthProvider>
        <Suspense>
          <MainNav />
          {children}
          <Footer />
        </Suspense>
      </AuthProvider>
    </body>
  );
}
