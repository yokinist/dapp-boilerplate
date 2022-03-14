import { Header, NextHead } from '@/shared';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHead />
      <Header />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
export default MyApp;
