import { Button } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useLocation, useNavigate } from '~/libs/hooks/hooks.js';
import { type TabName } from '~/libs/types/types.js';

import { checkActiveTab } from './libs/helpers.js';
import styles from './styles.module.scss';
import { TABS } from './tabs.js';

type Properties = {
  isCollapsed?: boolean;
};

const Sidebar: React.FC<Properties> = ({ isCollapsed = false }: Properties) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = useCallback(
    (tabName: TabName) => () => {
      navigate(`${AppRoute.DASHBOARD}/${tabName}`);
    },
    [navigate],
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
            className={getValidClassNames(
              styles.item,
              selectedTab === tab.name && styles.active,
            )}
            key={tab.name}
          >
            <Button
              {...(isCollapsed && { label: tab.name })}
              className={[
                'h5',
                styles.btn,
                {
                  [styles.active]: checkActiveTab(location.pathname, tab.name),
                },
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
