import { type FC } from 'react';

import { useCallback, useState } from '~/libs/hooks/hooks.js';
import { type MenuItem, type TabName } from '~/libs/types/types.js';
import { Sidebar } from '~/pages/dashboard/components/sidebar/sidebar.js';

import { Header } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  isHeaderHidden?: boolean;
  isSidebarHidden?: boolean;
  menuItems?: MenuItem[];
  children: JSX.Element;
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
          <Header isAuth={false} />
        </div>
      )}
      {!isSidebarHidden && (
        <div className={styles.sidebar}>
          <Sidebar selectedTab={selectedTab} onTabClick={handleTabSelect} />
        </div>
      )}
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export { PageLayout };
