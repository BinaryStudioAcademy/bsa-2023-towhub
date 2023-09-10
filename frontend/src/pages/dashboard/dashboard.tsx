import { useAppSelector } from '~/libs/hooks/hooks.js';
import {
  type TabName,
  type UserEntityObjectWithGroupAndBusinessT,
} from '~/libs/types/types.js';
import { selectUser } from '~/slices/auth/selectors.js';

import { TrucksTable } from './components/tables/tables.js';
import styles from './styles.module.scss';

type Properties = {
  selectedTab: TabName;
};

const Dashboard: React.FC<Properties> = ({ selectedTab }: Properties) => {
  const user = useAppSelector(
    selectUser,
  ) as UserEntityObjectWithGroupAndBusinessT;
  const renderTabContent = (selectedTab: TabName): React.ReactNode => {
    switch (selectedTab) {
      case 'drivers': {
        return <div>Drivers</div>;
      }
      case 'trucks': {
        return <TrucksTable businessId={user.business.id} />;
      }
      case 'orders': {
        return <div>Orders</div>;
      }
    }
  };

  return (
    <div className={styles.container}> {renderTabContent(selectedTab)}</div>
  );
};

export { Dashboard };
