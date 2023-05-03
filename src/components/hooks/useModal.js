import { useCallback, useState } from "react";

export const useModal = (defaultState = false) => {
  const [isOpen, setIsOpen] = useState(defaultState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    open,
    close,
  };
};
