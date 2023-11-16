import Head from 'next/head';
import { Inter } from 'next/font/google';
import './globals.css';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Continuity Compass v0.1',
  description: 'USDWS compliance check tool',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <Head>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className={inter.className}>
                {children}
        </body>
    </html>
  );
}