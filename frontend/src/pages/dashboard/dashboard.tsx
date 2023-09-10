import { useAppSelector } from '~/libs/hooks/hooks.js';
import {
  type TabName,
  type UserEntityObjectWithGroupAndBusinessT,
} from '~/libs/types/types.js';
import { selectUser } from '~/slices/auth/selectors.js';

import { TrucksTable } from './components/tables/trucks-table.js';

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
        return (
          <div>
            <TrucksTable businessId={user.business.id} />
          </div>
        );
      }
      case 'orders': {
        return <div>Orders</div>;
      }
    }
  };

  return <div> {renderTabContent(selectedTab)}</div>;
};

export { Dashboard };
