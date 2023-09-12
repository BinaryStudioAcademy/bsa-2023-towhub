import { AppRoute } from '~/libs/enums/enums.js';
import { useLocation } from '~/libs/hooks/hooks.js';

import { TrucksTable } from './components/tables/tables.js';
import styles from './styles.module.scss';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const getScreen = (screen: string): React.ReactNode => {
    switch (screen) {
      case AppRoute.DASHBOARD_ORDERS: {
        return <div>Orders</div>;
      }
      case AppRoute.DASHBOARD_TRUCKS: {
        return <TrucksTable />;
      }
      case AppRoute.DASHBOARD_DRIVERS: {
        return <div>Drivers</div>;
      }
      default: {
        return null;
      }
    }
  };

  return <div className={styles.container}>{getScreen(location.pathname)}</div>;
};

export { Dashboard };
