import { type FC } from 'react';

import { Sidebar } from '~/pages/dashboard/components/sidebar/sidebar.js';

import { Header } from '../header/header.js';
import { RouterOutlet } from '../router/router.js';
import styles from './styles.module.scss';

type Properties = {
  isHeaderHidden?: boolean;
  isSidebarHidden?: boolean;
  children?: JSX.Element;
};

const PageLayout: FC<Properties> = ({
  isHeaderHidden = false,
  isSidebarHidden = false,
  children,
}: Properties) => {
  return (
    <div className={styles.container}>
      {!isHeaderHidden && (
        <div className={styles.header}>
          <Header />
        </div>
      )}
      {!isSidebarHidden && (
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      )}
      <main className={styles.content}>
        <RouterOutlet />
        {children}
      </main>
    </div>
  );
};

export { PageLayout };
