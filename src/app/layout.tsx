import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jup Visualizer',
  description: 'Visualize Jup aggregator trades.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}>
        <Navbar />
        <main className='mx-auto py-20 min-h-svh flex flex-col justify-center items-stretch container'>
          <Hero />
          {children}
        </main>
      </body>
    </html>
  );
}
