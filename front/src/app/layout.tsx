import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import AppProvider from '@/store/Provider';
import './globals.css';
import ToastProvider from '@/components/toaster';

import { ThemeProvider } from '@/components/theme-provider';

const inter = Poppins({
  weight: ['100', '300', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      {/* <AuthProvider> */}
      <html lang='en'>
        <body className={` ${inter.className} dark:!bg-gray-800`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
      {/* </AuthProvider> */}
    </AppProvider>
  );
}
