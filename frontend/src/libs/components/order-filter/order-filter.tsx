import { type SingleValue } from 'react-select';

import { useCallback } from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';
import { type OrderQueryParameters } from '~/libs/types/types.js';

import { Dropdown } from '../dropdown/dropdown.js';
import styles from './styles.module.scss';

type Properties = {
  onChange: (filters: { status: OrderQueryParameters['status'] }) => void;
};

const options = [
  { label: 'Pending', value: 'pending' },
  { label: 'On the way', value: 'confirmed' },
  { label: 'Arrived', value: 'picking_up' },
  { label: 'Canceled', value: 'canceled' },
  { label: 'Done', value: 'done' },
  { label: 'All', value: 'all' },
];

const OrderFilter = ({ onChange }: Properties): JSX.Element => {
  const handleStatusChange = useCallback(
    (option: SingleValue<SelectOption>) => {
      if (!option) {
        return;
      }
      onChange({
        'status': option.value,
      });
    },
    [onChange],
  );

  return (
    <form className={styles.filter}>
      <div className={styles.filterItem}>
        <span className={styles.filterTitle}>Status</span>
        <div className={styles.dropdownWrapper}>
          <Dropdown
            options={options}
            defaultValue={{ label: 'All', value: 'all' }}
            placeholder="Select order status"
            onChange={handleStatusChange}
          />
        </div>
      </div>
    </form>
  );
};

export { OrderFilter };
