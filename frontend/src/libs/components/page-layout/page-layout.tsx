import { type FC } from 'react';

import { useCallback, useState } from '~/libs/hooks/hooks.js';
import { type TabName } from '~/libs/types/types.js';
import { Sidebar } from '~/pages/dashboard/components/sidebar/sidebar.js';

import { Header } from '../header/header.js';
import { RouterOutlet } from '../router/router.js';
import styles from './styles.module.scss';

type Properties = {
  isHeaderHidden?: boolean;
  isSidebarHidden?: boolean;
  children?: JSX.Element | ((a: TabName) => JSX.Element);
};

const PageLayout: FC<Properties> = ({
  isHeaderHidden = false,
  isSidebarHidden = false,
  children,
}: Properties) => {
  const [selectedTab, setSelectedTab] = useState<TabName>('orders');

  const handleTabSelect = useCallback(
    (tabName: TabName) => setSelectedTab(tabName),
    [],
  );

  return (
    <div className={styles.container}>
      {!isHeaderHidden && (
        <div className={styles.header}>
          <Header />
        </div>
      )}
      {!isSidebarHidden && (
        <div className={styles.sidebar}>
          <Sidebar selectedTab={selectedTab} onTabClick={handleTabSelect} />
        </div>
      )}
      <main className={styles.content}>
        <RouterOutlet />
        {typeof children === 'function' ? children(selectedTab) : children}
      </main>
    </div>
  );
};

export { PageLayout };
