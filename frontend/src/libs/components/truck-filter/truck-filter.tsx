import { type DeepPartial, type FieldValues } from 'react-hook-form';

import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';

import { Dropdown } from '../dropdown/dropdown.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  defaultValues: DeepPartial<T>;
  onSubmit: (payload: T) => void;
};

const TruckFilter = <T extends FieldValues = FieldValues>({
  defaultValues,
  onSubmit,
}: Properties<T>): JSX.Element => {
  const { control, handleSubmit } = useAppForm<T>({
    defaultValues,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <form className={styles.truckFilter} onSubmit={handleFormSubmit}>
      <div className={styles.locationFilter}>
        <span className={styles.filterTitle}>Location</span>
        <div className={styles.dropdownWrapper}>
          <Dropdown
            options={[{ label: 'option', value: 'option' }]}
            placeholder="Select location..."
            control={control}
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
              control={control}
            />
          </div>
        </div>
        <div className={styles.filterBlock}>
          <span className={styles.filterTitle}>Capacity</span>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              options={[{ label: 'option', value: 'option' }]}
              placeholder="Select capacity..."
              control={control}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export { TruckFilter };
