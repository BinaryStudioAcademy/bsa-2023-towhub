import { type SingleValue } from 'react-select';

import { TruckFilterField } from '~/libs/enums/enums.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type LocationChangeHandler,
  type SelectOption,
  type TruckFilters,
  type ValueOf,
} from '~/libs/types/types.js';

import { Autocomplete } from '../autocomplete/autocomplete.js';
import { Dropdown } from '../dropdown/dropdown.js';
import { FilterValue } from './libs/enums/enums.js';
import { Fields } from './libs/fields/fields.js';
import styles from './styles.module.scss';

const DEFAULT_VALUES = {
  userLocation: '',
  priceDropdown: undefined,
  capacityDropdown: undefined,
};

type FormType = {
  userLocation: string;
  priceDropdown: ValueOf<typeof FilterValue>;
  capacityDropdown: ValueOf<typeof FilterValue>;
};

type Properties = {
  filters: TruckFilters;
  onFilterChange: (filters: TruckFilters) => void;
  onLocationChange: LocationChangeHandler;
};

const TruckFilter = ({
  filters,
  onFilterChange,
  onLocationChange,
}: Properties): JSX.Element => {
  const { control } = useAppForm<FormType>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  const shouldRenderPrice = filters.id === TruckFilterField.PRICE;
  const shouldRenderCapacity = filters.id === TruckFilterField.CAPACITY;

  const handlePriceChange = useCallback(
    (option: SingleValue<SelectOption>) => {
      onFilterChange({
        id: TruckFilterField.PRICE,
        desc: option?.value === FilterValue.DESC,
      });
    },
    [onFilterChange],
  );

  const handleCapacityChange = useCallback(
    (option: SingleValue<SelectOption>) => {
      onFilterChange({
        id: TruckFilterField.CAPACITY,
        desc: option?.value === FilterValue.DESC,
      });
    },
    [onFilterChange],
  );

  return (
    <form className={styles.truckFilter}>
      <div className={styles.locationFilter}>
        <span className={styles.title}>Location</span>
        <div className={styles.wrapper}>
          <Autocomplete
            {...Fields[0]}
            inputStyles={styles.input}
            onPlaceChanged={onLocationChange}
          />
        </div>
      </div>
      <div className={styles.filterBar}>
        <div className={styles.filterBlock}>
          <span className={styles.title}>Price</span>
          <div className={styles.wrapper}>
            <Dropdown
              options={[]}
              {...Fields[1]}
              control={control}
              onChange={handlePriceChange}
              controlShouldRenderValue={shouldRenderPrice}
            />
          </div>
        </div>
        <div className={styles.filterBlock}>
          <span className={styles.title}>Capacity</span>
          <div className={styles.wrapper}>
            <Dropdown
              options={[]}
              {...Fields[2]}
              control={control}
              onChange={handleCapacityChange}
              controlShouldRenderValue={shouldRenderCapacity}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export { TruckFilter };
