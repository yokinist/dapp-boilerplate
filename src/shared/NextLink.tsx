import Link, { LinkProps } from 'next/link';
import React, { ReactNode } from 'react';

export type NextLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
} & Omit<JSX.IntrinsicElements['a'], 'href'>;

export const NextLink: React.VFC<NextLinkProps> = ({ children, className, href, passHref, ...rest }) => (
  <Link href={href} passHref={passHref}>
    <a className={className} {...rest}>
      {children}
    </a>
  </Link>
);
