import { useState } from 'react';

type ToogleReturnType = [boolean, () => void];

const useToggle = (initialValue = false): ToogleReturnType => {
  const [value, setValue] = useState<boolean>(initialValue);

  const handleToggle = (): void => {
    setValue((previousValue) => !previousValue);
  };

  return [value, handleToggle];
};

export { useToggle };
