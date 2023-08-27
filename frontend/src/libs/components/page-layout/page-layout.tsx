import { type FC } from 'react';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';
import { type TabsName } from '~/libs/types/types.js';
import { Sidebar } from '~/pages/dashboard/components/sidebar/sidebar.js';

import { App } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  isHeaderHidden?: boolean;
  isSidebarHidden?: boolean;
  isBackgroundBlue?: boolean;
  children: JSX.Element;
};

const PageLayout: FC<Properties> = ({
  isHeaderHidden = false,
  isSidebarHidden = false,
  isBackgroundBlue = false,
  children,
}: Properties) => {
  const [selectedTab, setSelectedTab] = useState<TabsName>('orders');

  const handleTabSelect = useCallback(
    (tabName: TabsName) => setSelectedTab(tabName),
    [],
  );

  return (
    <div
      className={getValidClassNames(
        styles.container,
        isBackgroundBlue ? styles.background_blue : styles.background_light,
      )}
    >
      {!isHeaderHidden && (
        <div className={styles.header}>
          <App />
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
