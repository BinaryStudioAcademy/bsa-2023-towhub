import clsx from 'clsx';

const getClassNames = (...classNames: string[]): string => {
  return clsx(...classNames);
};

export { getClassNames };
