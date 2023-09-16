import { type RefObject } from 'react';

import { useEffect } from '~/libs/hooks/hooks.js';

const useBindEnterToClick = <T extends HTMLElement>(
  reference: RefObject<T>,
): void => {
  useEffect(() => {
    const handleKeyUp = (): void => {
      if (!reference.current) {
        return;
      }

      reference.current.click();
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [reference]);
};

export { useBindEnterToClick };
