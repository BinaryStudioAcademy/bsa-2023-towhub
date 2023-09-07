import { Dropdown } from '../dropdown/dropdown.js';
import styles from './styles.module.scss';

const TruckFilter: React.FC = () => {
  return (
    <div className={styles.truckFilter}>
      <div className={styles.locationFilter}>
        <span className={styles.filterTitle}>Location</span>
        <div className={styles.dropdownWrapper}>
          <Dropdown
            options={[{ label: 'option', value: 'option' }]}
            placeholder="Select location..."
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
            />
          </div>
        </div>
        <div className={styles.filterBlock}>
          <span className={styles.filterTitle}>Capacity</span>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              options={[{ label: 'option', value: 'option' }]}
              placeholder="Select capacity..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { TruckFilter };
