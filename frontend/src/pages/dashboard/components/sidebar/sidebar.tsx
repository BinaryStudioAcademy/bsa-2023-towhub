import { Button } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type TabName } from '~/libs/types/types.js';

import styles from './styles.module.scss';
import { TABS } from './tabs.js';

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
          <li
            className={
              selectedTab === tab.name
                ? getValidClassNames(styles.item, styles.active)
                : getValidClassNames(styles.item)
            }
            key={tab.name}
          >
            <Button
              label={isCollapsed ? '' : tab.name}
              className={[
                'h5',
                styles.btn,
                { [styles.active]: selectedTab === tab.name },
              ]}
              variant="text"
              onClick={handleTabClick(tab.name)}
            >
              <span className={'visually-hidden'}>{tab.name}</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Sidebar };
