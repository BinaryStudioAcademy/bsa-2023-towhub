import { Dropdown } from '../dropdown/dropdown.js';
import styles from './style.module.scss';

const TruckFilter: React.FC = () => {
  return (
    <div className={styles.truckFilter}>
      <div className={styles.locationFilter}>
        <span className={styles.filterTitle}>Location</span>
        <div className={styles.dropdownWrapper}>
          <Dropdown
            options={[{ label: 'option', value: 'option' }]}
            placeholder="Select location..."
            insideInput={false}
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
              insideInput={false}
            />
          </div>
        </div>
        <div className={styles.filterBlock}>
          <span className={styles.filterTitle}>Capacity</span>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              options={[{ label: 'option', value: 'option' }]}
              placeholder="Select capacity..."
              insideInput={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { TruckFilter };
