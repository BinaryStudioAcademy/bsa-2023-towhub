import { AppRoute } from '~/libs/enums/enums.js';
import { useLocation } from '~/libs/hooks/hooks.js';

import { DriversOrderHistory } from '../drivers-order-history/drivers-order-history.js';
import styles from './styles.module.scss';

const DriversDashboard: React.FC = () => {
  const location = useLocation();

  const getScreen = (path: string): React.ReactNode => {
    switch (path) {
      case AppRoute.DRIVERS_DASHBOARD_ORDERS: {
        return <DriversOrderHistory />;
      }
      case AppRoute.DRIVERS_DASHBOARD_TRUCKS: {
        return <div>Trucks</div>;
      }
      default: {
        return null;
      }
    }
  };

  return <div className={styles.container}>{getScreen(location.pathname)}</div>;
};

export { DriversDashboard };
