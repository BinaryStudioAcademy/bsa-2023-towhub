import { useState } from 'react';

type ReturnType = [boolean, () => void];

const useToggle = (initialValue = false): ReturnType => {
  const [value, setValue] = useState<boolean>(initialValue);

  const handleToggle = (): void => {
    setValue((previousValue) => !previousValue);
  };

  return [value, handleToggle];
};

export { useToggle };
