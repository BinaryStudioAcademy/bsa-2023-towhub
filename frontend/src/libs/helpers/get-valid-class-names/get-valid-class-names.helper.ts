import { type ClassValue, clsx } from 'clsx';

const getValidClassNames = (...classNames: ClassValue[]): string => {
  return clsx(...classNames);
};

export { getValidClassNames };
