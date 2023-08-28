import { Icon } from '~/libs/components/components.js';
import { IconName } from '~/libs/enums/icon-name.enum.js';
import { TabNames } from '~/libs/enums/sidebar-tabs.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type TabName, type TabsType } from '~/libs/types/types.js';

import styles from './styles.module.scss';

const TABS: TabsType[] = [
  {
    name: TabNames.ORDERS,
    icon: IconName.LIST,
  },
  {
    name: TabNames.TRUCKS,
    icon: IconName.TRUCK,
  },
  {
    name: TabNames.DRIVERS,
    icon: IconName.USERS,
  },
];

type Properties = {
  isCollapsed?: boolean;
  selectedTab: TabName | null;
  onTabClick: (tabName: TabName) => void;
};

const Sidebar: React.FC<Properties> = ({
  isCollapsed = false,
  selectedTab,
  onTabClick,
}: Properties) => {
  const handleTabClick = useCallback(
    (tabName: TabName) => () => onTabClick(tabName),
    [onTabClick],
  );

  return (
    <div
      className={getValidClassNames(
        styles.container,
        isCollapsed && styles.collapsed,
      )}
    >
      <ul className={styles.list}>
        {TABS.map((tab) => (
          <li className={styles.list__item} key={tab.name}>
            <button
              className={getValidClassNames(
                'h5',
                styles.btn,
                selectedTab === tab.name && styles.active,
              )}
              onClick={handleTabClick(tab.name)}
            >
              <Icon iconName={tab.icon} />
              <span
                className={getValidClassNames(
                  styles.tab_name,
                  isCollapsed && 'visually-hidden',
                )}
              >
                {tab.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Sidebar };
