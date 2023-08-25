import { type ReactNode } from 'react';

import styles from './styles.module.scss';

type Properties = {
  children: ReactNode;
};

const Container = ({ children }: Properties): JSX.Element => {
  return <div className={styles.container}>{children}</div>;
};

export { Container };
