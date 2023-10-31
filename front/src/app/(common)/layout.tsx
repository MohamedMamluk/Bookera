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
      <Suspense>
        <MainNav />
        {children}
        <Footer />
      </Suspense>
    </body>
  );
}
