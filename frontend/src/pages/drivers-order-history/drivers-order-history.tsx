import { Dropdown } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';

import { DriverOrderList } from './libs/components/components.js';
import { OrderStatus } from './libs/enums/enums.js';
import { useFilter } from './libs/hooks/use-filter.hook.js';
import styles from './styles.module.scss';

const DriversOrderHistory: React.FC = () => {
  const { orders, total, dataStatus } = useAppSelector((state) => state.orders);

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
          <DriverOrderList
            {...listHook}
            orders={orders}
            totalElements={total}
            isLoading={dataStatus === DataStatus.PENDING}
          />
        </div>
      </section>
    </div>
  );
};

export { DriversOrderHistory };
