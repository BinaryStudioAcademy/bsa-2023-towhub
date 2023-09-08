import { type SingleValue } from 'react-select';

import { useCallback, useEffect, useState } from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';
import { type TruckFilters } from '~/libs/types/truck-filters.type.js';

import { Dropdown } from '../dropdown/dropdown.js';
import { TruckFilterField } from './libs/truck-filter-field.enum.js';
import styles from './styles.module.scss';

type Properties = {
  onChange: (filters: TruckFilters) => void;
};

const TruckFilter = ({ onChange }: Properties): JSX.Element => {
  const [filters, setFilters] = useState<TruckFilters>({
    location: null,
    price: null,
    capacity: null,
  });

  const handleSelectChange = useCallback(
    (fieldName: string, option: SingleValue<SelectOption>) => {
      const newFilters = {
        ...filters,
        [fieldName]: option?.value ?? null,
      };

      setFilters(newFilters);
    },
    [filters],
  );

  const handleLocationChange = useCallback(
    (option: SingleValue<SelectOption>) =>
      handleSelectChange(TruckFilterField.LOCATION, option),
    [handleSelectChange],
  );
  const handlePriceChange = useCallback(
    (option: SingleValue<SelectOption>) =>
      handleSelectChange(TruckFilterField.PRICE, option),
    [handleSelectChange],
  );
  const handleCapacityChange = useCallback(
    (option: SingleValue<SelectOption>) =>
      handleSelectChange(TruckFilterField.CAPACITY, option),
    [handleSelectChange],
  );

  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  return (
    <form className={styles.truckFilter}>
      <div className={styles.locationFilter}>
        <span className={styles.filterTitle}>Location</span>
        <div className={styles.dropdownWrapper}>
          <Dropdown
            options={[{ label: 'option', value: 'option' }]}
            placeholder="Select location..."
            onChange={handleLocationChange}
          />
        </div>
      </div>
      <div className={styles.filterBar}>
        <div className={styles.filterBlock}>
          <span className={styles.filterTitle}>Price</span>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              options={[{ label: 'option', value: 'option' }]}
              placeholder="Select price..."
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div className={styles.filterBlock}>
          <span className={styles.filterTitle}>Capacity</span>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              options={[{ label: 'option', value: 'option' }]}
              placeholder="Select capacity..."
              onChange={handleCapacityChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export { TruckFilter };
