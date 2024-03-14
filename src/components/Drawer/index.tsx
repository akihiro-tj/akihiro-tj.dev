import { clsx } from 'clsx';

import useDrawer from './hooks';

import type { ReactNode, FC, MouseEventHandler } from 'react';

//
type IconProps = {
  type: 'menu' | 'close';
  onClick: MouseEventHandler<Element>;
};

const Icon: FC<IconProps> = ({ type, onClick }) => {
  return (
    <svg
      className="size-full cursor-pointer"
      viewBox="0 0 24 24"
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
    >
      <path
        className="fill-white"
        d={
          type === 'menu'
            ? 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'
            : 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
        }
      />
    </svg>
  );
};

//
type DrawerProps = {
  children?: ReactNode;
};

const Drawer: FC<DrawerProps> = ({ children }) => {
  const { isOpen, handleOpen, handleClose } = useDrawer();

  return (
    <>
      <div className="size-7">
        <Icon type="menu" onClick={handleOpen} />
      </div>
      <div
        className={clsx(
          'fixed right-0 top-0 size-full overflow-y-scroll bg-base-900 p-4 transition-all',
          {
            'translate-x-full': !isOpen,
          },
        )}
      >
        <div className="mb-4 ml-auto size-7">
          <Icon type="close" onClick={handleClose} />
        </div>
        {children}
      </div>
    </>
  );
};

export default Drawer;
