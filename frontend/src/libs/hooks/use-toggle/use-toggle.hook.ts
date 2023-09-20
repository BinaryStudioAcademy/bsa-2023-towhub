import { useState } from 'react';

type ReturnType = [boolean, () => void];

const useToggle = (initialValue = false): ReturnType => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (): void => {
    setValue((previousValue) => !previousValue);
  };

  return [value, toggle];
};

export { useToggle };
