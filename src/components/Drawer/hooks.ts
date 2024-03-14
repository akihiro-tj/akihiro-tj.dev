import { useState, type MouseEventHandler, useCallback } from 'react';

const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen: MouseEventHandler<Element> = useCallback(() => {
    document.body.classList.add('overflow-hidden');
    setIsOpen(true);
  }, []);

  const handleClose: MouseEventHandler<Element> = useCallback(() => {
    document.body.classList.remove('overflow-hidden');
    setIsOpen(false);
  }, []);

  return { isOpen, handleOpen, handleClose };
};

export default useDrawer;
