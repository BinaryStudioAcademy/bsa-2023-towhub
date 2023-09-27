import { type SingleValue } from 'react-select';

import { TruckFilterField } from '~/libs/enums/enums.js';
import {
  useAppForm,
  useCallback,
  useFormController,
} from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';
import { type TruckFilters } from '~/libs/types/truck-filters.type.js';
import {
  type LocationChangeHandler,
  type ValueOf,
} from '~/libs/types/types.js';

import { Autocomplete } from '../components.js';
import { Dropdown } from '../dropdown/dropdown.js';
import { FilterOption, FilterValue } from './libs/enums/enums.js';
import styles from './styles.module.scss';

type Properties = {
  onFilterChange: (filters: TruckFilters) => void;
  onLocationChange: LocationChangeHandler;
};

const TruckFilter = ({
  onFilterChange,
  onLocationChange,
}: Properties): JSX.Element => {
  const {
    control: priceControl,
    setValue: setPriceValue,
    resetField: resetPriceField,
  } = useAppForm<{
    priceDropdown: ValueOf<typeof FilterValue>;
  }>({
    defaultValues: { priceDropdown: undefined },
    mode: 'onChange',
  });

  const {
    control: capacityControl,
    setValue: setCapacityValue,
    resetField: resetCapacityField,
  } = useAppForm<{
    capacityDropdown: ValueOf<typeof FilterValue>;
  }>({
    defaultValues: { capacityDropdown: undefined },
    mode: 'onChange',
  });

  const { field: priceDropdownField } = useFormController({
    name: 'priceDropdown',
    control: priceControl,
  });

  const { field: capacityDropdownField } = useFormController({
    name: 'capacityDropdown',
    control: capacityControl,
  });

  const handleSelectChange = useCallback(
    (
      fieldName: ValueOf<typeof TruckFilterField>,
      option: SingleValue<SelectOption>,
    ) => {
      onFilterChange({
        id: fieldName,
        desc: option?.value === FilterValue.DESC,
      });
    },
    [onFilterChange],
  );

  const handlePriceChange = useCallback(
    (option: SingleValue<SelectOption>) => {
      handleSelectChange(TruckFilterField.PRICE, option);
      setPriceValue(
        'priceDropdown',
        option?.value === FilterValue.DESC ? FilterValue.DESC : FilterValue.ASC,
      );
      resetCapacityField('capacityDropdown', { defaultValue: undefined });
    },
    [handleSelectChange, resetCapacityField, setPriceValue],
  );
  const handleCapacityChange = useCallback(
    (option: SingleValue<SelectOption>) => {
      handleSelectChange(TruckFilterField.CAPACITY, option);
      setCapacityValue(
        'capacityDropdown',
        option?.value === FilterValue.DESC ? FilterValue.DESC : FilterValue.ASC,
      );
      resetPriceField('priceDropdown', { defaultValue: undefined });
    },
    [handleSelectChange, resetPriceField, setCapacityValue],
  );

  return (
    <form className={styles.truckFilter}>
      <div className={styles.locationFilter}>
        <span className={styles.title}>Location</span>
        <div className={styles.wrapper}>
          <Autocomplete
            placeholder="Select location..."
            inputStyles={styles.input}
            handlePlaceChanged={onLocationChange}
          />
        </div>
      </div>
      <div className={styles.filterBar}>
        <div className={styles.filterBlock}>
          <span className={styles.title}>Price</span>
          <div className={styles.wrapper}>
            <Dropdown
              name="priceDropdown"
              control={priceControl}
              field={priceDropdownField}
              options={[
                { label: FilterOption.LOW_TO_HIGH, value: FilterValue.ASC },
                { label: FilterOption.HIGH_TO_LOW, value: FilterValue.DESC },
              ]}
              placeholder="Select price..."
              onChange={handlePriceChange}
              isValueRenderControlled
            />
          </div>
        </div>
        <div className={styles.filterBlock}>
          <span className={styles.title}>Capacity</span>
          <div className={styles.wrapper}>
            <Dropdown
              name="capacityDropdown"
              control={capacityControl}
              field={capacityDropdownField}
              options={[
                { label: FilterOption.LOW_TO_HIGH, value: FilterValue.ASC },
                { label: FilterOption.HIGH_TO_LOW, value: FilterValue.DESC },
              ]}
              placeholder="Select capacity..."
              onChange={handleCapacityChange}
              isValueRenderControlled
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export { TruckFilter };
