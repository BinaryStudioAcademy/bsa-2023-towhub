import clsx from 'clsx';

/** A wrapper for clsx tool */
const getValidClassNames = (...inputs: clsx.ClassValue[]): string => {
  return clsx(...inputs);
};

export { getValidClassNames };