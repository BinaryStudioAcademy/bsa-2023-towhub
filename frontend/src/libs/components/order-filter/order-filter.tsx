import { type SingleValue } from 'react-select';

import { useCallback } from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';
import { type OrderStatusValues } from '~/libs/types/types.js';

import { Dropdown } from '../dropdown/dropdown.js';
import { dropdownOptions } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onChange: (filters: { status: OrderStatusValues | 'all' }) => void;
};

const OrderFilter = ({ onChange }: Properties): JSX.Element => {
  const handleStatusChange = useCallback(
    (option: SingleValue<SelectOption>) => {
      if (!option) {
        return;
      }
      onChange({ status: option.value as OrderStatusValues | 'all' });
    },
    [onChange],
  );

  return (
    <form className={styles.filter}>
      <div className={styles.filterItem}>
        <span className={styles.filterTitle}>Status</span>
        <div className={styles.dropdownWrapper}>
          <Dropdown
            options={dropdownOptions}
            defaultValue={{ label: 'All', value: 'all' }}
            placeholder="Select order status"
            onChange={handleStatusChange}
            className={styles.input}
          />
        </div>
      </div>
    </form>
  );
};

export { OrderFilter };
