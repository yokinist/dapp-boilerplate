import classNames from 'classnames';

type Props = JSX.IntrinsicElements['button'] & {
  children: React.ReactNode;
  theme?: 'primary' | 'secondary' | 'danger';
};

export const Button: React.VFC<Props> = ({ children, theme = 'primary', ...props }) => {
  return (
    <button
      className={classNames({
        'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500':
          theme === 'primary',
        'bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500':
          theme === 'secondary',
        'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm':
          theme === 'danger',
        'cursor-not-allowed': !!props?.disabled,
      })}
      style={{ minWidth: 'fit-content' }}
      {...props}
    >
      {children}
    </button>
  );
};
