import type { Metadata } from 'next';
import { Inter, Nunito_Sans } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
// import 'modern-normalize/modern-normalize.css'; <--doesn't work(creates style override issues)
import './globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const nunito = Nunito_Sans({
  variable: '--font-nunito',
  subsets: ['latin', 'cyrillic'],
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Clothica',
  description: 'Online clothing store',
  keywords: ['clothing', 'fashion', 'store'],
  openGraph: {
    type: 'website',
    title: 'Clothica',
    description: 'Online clothing store',
    // url: 'https://[].vercel.app',
    siteName: 'Clothica',
    images: [
      {
        url: '/Cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Clothica - Online clothing store',
      },
    ],
  },
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} ${nunito.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            {modal}
            {children}
          </AuthProvider>
          <ReactQueryDevtools />
          {/*^^DELETE THIS ON PRODUCTION*/}
        </TanStackProvider>
        <Toaster />
      </body>
    </html>
  );
}
