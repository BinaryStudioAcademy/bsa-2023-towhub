import { TabsName } from '~/libs/enums/sidebar-tabs.enum.js';
import { type TabName } from '~/libs/types/sidebar.type.js';

import { DriverTable } from './components/table/drivers-table/driver-table.js';
import styles from './styles.module.scss';

type Properties = {
  selectedTab: TabName;
};

const Dashboard: React.FC<Properties> = ({ selectedTab }: Properties) => {
  const getScreen = (): React.ReactNode => {
    switch (selectedTab) {
      case TabsName.ORDERS: {
        return <div>Orders</div>;
      }
      case TabsName.TRUCKS: {
        return <div>Trucks</div>;
      }
      case TabsName.DRIVERS: {
        return <DriverTable />;
      }
      default: {
        return null;
      }
    }
  };

  return <div className={styles.container}>{getScreen()}</div>;
};

export { Dashboard };
