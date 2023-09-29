import { AppRoute } from '~/libs/enums/enums.js';
import { useLocation } from '~/libs/hooks/hooks.js';

import { Orders } from './components/orders/orders.js';
import {
  DriverTable,
  PaymentsTable,
  TruckTable,
} from './components/tables/tables.js';
import styles from './styles.module.scss';

const Dashboard: React.FC = () => {
  const location = useLocation();

  const getScreen = (path: string): React.ReactNode => {
    switch (path) {
      case AppRoute.DASHBOARD_ORDERS: {
        return <Orders />;
      }
      case AppRoute.DASHBOARD_TRUCKS: {
        return <TruckTable />;
      }
      case AppRoute.DASHBOARD_DRIVERS: {
        return <DriverTable />;
      }
      case AppRoute.DASHBOARD_PAYMENTS: {
        return <PaymentsTable />;
      }
      default: {
        return null;
      }
    }
  };

  return <div className={styles.container}>{getScreen(location.pathname)}</div>;
};

export { Dashboard };
