import { Button } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useLocation, useNavigate } from '~/libs/hooks/hooks.js';
import { type TabName, type TabsType } from '~/libs/types/types.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';
import { useAuthUser } from '~/slices/auth/auth.js';

import { checkActiveTab } from './libs/helpers.js';
import { BUSINESS_TABS, DRIVER_TABS } from './libs/tabs.js';
import styles from './styles.module.scss';

type Properties = {
  isCollapsed?: boolean;
};

const Sidebar: React.FC<Properties> = ({ isCollapsed = false }: Properties) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthUser();
  const group = user?.group.key;

  const getTabs = useCallback((): TabsType[] => {
    return group === UserGroupKey.BUSINESS ? BUSINESS_TABS : DRIVER_TABS;
  }, [group]);

  const handleTabClick = useCallback(
    (tabName: TabName) => () => {
      group === UserGroupKey.BUSINESS
        ? navigate(`${AppRoute.DASHBOARD}/${tabName}`)
        : navigate(`${AppRoute.DRIVERS_DASHBOARD}/${tabName}`);
    },
    [navigate, group],
  );

  const renderTabs = useCallback(() => {
    const tabs = getTabs();

    return tabs.map((tab) => (
      <li
        className={getValidClassNames(
          styles.item,
          checkActiveTab(location.pathname, tab.path) && styles.active,
        )}
        key={tab.name}
      >
        <Button
          {...(!isCollapsed && { label: tab.name })}
          className={getValidClassNames(
            'h5',
            styles.btn,
            checkActiveTab(location.pathname, tab.path) && styles.active,
          )}
          frontIcon={tab.icon}
          variant="text"
          onClick={handleTabClick(tab.name)}
        >
          <span className={'visually-hidden'}>{tab.name}</span>
        </Button>
      </li>
    ));
  }, [getTabs, handleTabClick, isCollapsed, location.pathname]);

  return (
    <div
      className={getValidClassNames(
        styles.container,
        isCollapsed && styles.collapsed,
      )}
    >
      <ul className={styles.list}>{renderTabs()}</ul>
    </div>
  );
};

export { Sidebar };
