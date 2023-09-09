import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { type TabName } from '~/libs/types/types.js';
import { selectUser } from '~/slices/auth/selectors.js';
import { findAllTrucksForBusiness } from '~/slices/trucks/actions.js';

import { TrucksTable } from './components/tables/trucks-table.js';

type Properties = {
  selectedTab: TabName;
};

const Dashboard: React.FC<Properties> = ({ selectedTab }: Properties) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) {
      void dispatch(findAllTrucksForBusiness(user.id)).unwrap();
    }
  }, [dispatch, user]);

  const renderTabContent = (selectedTab: TabName): React.ReactNode => {
    switch (selectedTab) {
      case 'drivers': {
        return <div>Drivers</div>;
      }
      case 'trucks': {
        return (
          <div>
            <TrucksTable />
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
