import { Button } from '~/libs/components/components.js';
import { type AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useLocation, useNavigate } from '~/libs/hooks/hooks.js';
import { type TabsType, type ValueOf } from '~/libs/types/types.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';
import { useAuthUser } from '~/slices/auth/auth.js';

import { EndShiftButton } from './components/end-shift-button/end-shift-button.js';
import { checkActiveTab } from './libs/helpers/check-active-tab.helper.js';
import { BUSINESS_TABS, DRIVER_TABS } from './libs/tabs.js';
import styles from './styles.module.scss';

type Properties = {
  isCollapsed?: boolean;
};

const Sidebar: React.FC<Properties> = ({ isCollapsed = false }: Properties) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthUser();

  const isDriver = user?.group.key === UserGroupKey.DRIVER;

  const getTabs = useCallback((): TabsType[] => {
    return isDriver ? DRIVER_TABS : BUSINESS_TABS;
  }, [isDriver]);

  const handleTabClick = useCallback(
    (tabName: ValueOf<typeof AppRoute>) => () => {
      navigate(tabName);
    },
    [navigate],
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
          onClick={handleTabClick(tab.path)}
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
      {isDriver && <EndShiftButton />}
    </div>
  );
};

export { Sidebar };
