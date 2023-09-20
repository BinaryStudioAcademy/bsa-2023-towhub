import { useLocation } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/app-route.enum.js';

import { Orders } from './components/orders/orders.js';
import { DriverTable } from './components/table/drivers-table/driver-table.js';
import styles from './styles.module.scss';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const getScreen = (path: string): React.ReactNode => {
    switch (path) {
      case AppRoute.DASHBOARD_ORDERS: {
        return <Orders />;
      }
      case AppRoute.DASHBOARD_TRUCKS: {
        return <div>Trucks</div>;
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
