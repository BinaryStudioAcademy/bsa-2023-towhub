import { useLocation } from 'react-router-dom';

import { AddTruckForm } from './components/add-truck-form/libs/add-truck-form/add-truck-form.js';
import styles from './styles.module.css';

const Truck: React.FC = () => {
  const location = useLocation();

  const isTrucksPath = location.pathname === '/trucks';

  return <div className={styles.page}>{isTrucksPath && <AddTruckForm />}</div>;
};

export { Truck };
