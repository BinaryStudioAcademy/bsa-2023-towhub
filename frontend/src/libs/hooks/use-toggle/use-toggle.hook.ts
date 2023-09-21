import { useState } from 'react';

type UseToggleHook = [boolean, () => void];

const useToggle = (initialValue = false): UseToggleHook => {
  const [value, setValue] = useState<boolean>(initialValue);

  const handleToggle = (): void => {
    setValue((previousValue) => !previousValue);
  };

  return [value, handleToggle];
};

export { useToggle };
