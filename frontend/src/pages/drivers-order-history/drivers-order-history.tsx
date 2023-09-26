import { Dropdown } from '~/libs/components/components.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';

import { DriverOrderListWrapper } from './libs/components/components.js';
import { OrderStatus } from './libs/enums/enums.js';
import { useFilter } from './libs/hooks/use-filter.hook.js';
import styles from './styles.module.scss';

const DriversOrderHistory: React.FC = () => {
  const options = [
    { label: 'Any', value: '' },
    { label: 'Done', value: OrderStatus.DONE },
    { label: 'Pending', value: OrderStatus.PENDING },
    { label: 'Canceled', value: OrderStatus.CANCELED },
    { label: 'Confirmed', value: OrderStatus.CONFIRMED },
    { label: 'Picking up', value: OrderStatus.PICKING_UP },
  ] as SelectOption[];

  const { listHook, handleChangeFilter } = useFilter();
  const [defaultValue] = options;

  return (
    <div className={styles.container}>
      <section className={styles.mainSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.header}>Orders</div>
          <div className={styles.filterText}>Sort by</div>
          <div className={styles.filter}>
            <Dropdown
              options={options}
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