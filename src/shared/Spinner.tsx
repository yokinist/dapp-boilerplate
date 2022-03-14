import classNames from 'classnames';
import React from 'react';
import { SpinnerCircular } from 'spinners-react';

type Props = {
  loading: boolean;
  theme?: 'screen' | 'default';
};

export const Spinner: React.VFC<Props> = ({ loading, theme = 'screen' }) => (
  <div
    className={classNames('w-full', 'h-full', 'flex', 'items-center', 'justify-center', 'flex-col', {
      'min-h-screen': theme === 'screen',
    })}
  >
    <SpinnerCircular
      size={48}
      thickness={140}
      speed={160}
      color={'#5a67d8'}
      secondaryColor="rgba(172, 167, 57, 0.06)"
      enabled={loading}
    />
  </div>
);
