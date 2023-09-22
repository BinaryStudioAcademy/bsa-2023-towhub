import { AppRoute } from '~/libs/enums/enums.js';
import { useLocation } from '~/libs/hooks/hooks.js';

import { DriverTable, TruckTable } from './components/tables/tables.js';
import styles from './styles.module.scss';

const Dashboard: React.FC = () => {
  const location = useLocation();

  const getScreen = (path: string): React.ReactNode => {
    switch (path) {
      case AppRoute.DASHBOARD_ORDERS: {
        return <div>Orders</div>;
      }
      case AppRoute.DASHBOARD_TRUCKS: {
        return <TruckTable />;
      }
      case AppRoute.DASHBOARD_DRIVERS: {
        return <DriverTable />;
      }
      default: {
        return null;
      }
    }
  };

  return <div className={styles.container}>{getScreen(location.pathname)}</div>;
};

export { Dashboard };
