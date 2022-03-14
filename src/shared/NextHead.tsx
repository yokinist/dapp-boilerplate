import { PAGE_PATH_AND_NAME } from '@/constants';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useMemo } from 'react';

export const NextHead: React.VFC = () => {
  const router = useRouter();
  const currentPage = useMemo(() => {
    return PAGE_PATH_AND_NAME.find((p) => p.href === router.asPath ?? '/');
  }, [router]);
  return (
    <Head>
      <title>{currentPage?.name}</title>
    </Head>
  );
};
