import { Dropdown } from '~/libs/components/components.js';

import { DriverOrderListWrapper } from './libs/components/components.js';
import { useFilter } from './libs/hooks/use-filter.hook.js';
import { orderStatusOptions } from './libs/options/options.js';
import styles from './styles.module.scss';

const DriversOrderHistory: React.FC = () => {
  const { listHook, handleChangeFilter } = useFilter();
  const [defaultValue] = orderStatusOptions;

  return (
    <div className={styles.container}>
      <section className={styles.mainSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.header}>Orders</div>
          <div className={styles.filterText}>Sort by</div>
          <div className={styles.filter}>
            <Dropdown
              options={orderStatusOptions}
              onChange={handleChangeFilter}
              defaultValue={defaultValue}
            />
          </div>
        </div>
        <div className={styles.orders}>
          <DriverOrderListWrapper {...listHook} />
        </div>
      </section>
    </div>
  );
};

export { DriversOrderHistory };
