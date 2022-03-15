import classNames from 'classnames';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { NextLink } from '.';
import { PAGE_PATH_AND_NAME, SERVICE_LOGO } from '@/constants';

type Props = {
  //
};

export const Header: React.VFC<Props> = ({}) => {
  const router = useRouter();

  return (
    <div className="border-b border-gray-200 px-4 py-2 flex">
      <Link href="/">
        <a>
          <img src={SERVICE_LOGO} className="h-8" alt="service logo" />
        </a>
      </Link>
      <div className="sm:flex sm:items-baseline">
        <div className="mt-4 sm:mt-0 sm:ml-10">
          <nav className="-mb-px flex space-x-8">
            {PAGE_PATH_AND_NAME.map((tab) => {
              const isCurrent = router.asPath === tab.href;
              return (
                <NextLink
                  href={tab.href}
                  key={tab.name}
                  className={classNames('whitespace-nowrap pb-4 pt-1 px-1 border-b-2 font-medium text-sm', {
                    'border-indigo-500 text-indigo-600': isCurrent,
                    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': !isCurrent,
                  })}
                >
                  {tab.name}
                </NextLink>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
